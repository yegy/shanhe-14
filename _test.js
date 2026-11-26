// 山河十四卷 v1.0 · 全量数据与核心引擎自动化单元测试（8 大测试套件）
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

const ROOT = __dirname;
const store = {};
const sandbox = {
  console, Math, Date, JSON, Object, Array, Set, RegExp, parseInt, isNaN,
  encodeURIComponent, decodeURIComponent, btoa, atob,
  setInterval: () => 1,
  clearInterval: () => {},
  setTimeout: fn => { if (typeof fn === "function") fn(); return 1; },
  localStorage: {
    getItem: k => store[k] || null,
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: k => { delete store[k]; }
  },
  document: {
    body: { classList: { toggle() {} } },
    getElementById: () => null,
    querySelectorAll: () => [],
    createElement: () => ({ className: "", innerHTML: "" })
  }
};
sandbox.window = sandbox;
vm.createContext(sandbox);

// 按 js/modules.json 真实顺序加载全部数据模块与核心引擎
const allModules = JSON.parse(fs.readFileSync(path.join(ROOT, "js", "modules.json"), "utf8"));
const scripts = allModules.filter(src => src.startsWith("data/") || src.startsWith("js/core/"));

scripts.forEach(rel => vm.runInContext(fs.readFileSync(path.join(ROOT, rel), "utf8"), sandbox, { filename: rel }));

const JY = sandbox.JY;
let endingModalCalls = 0;
JY.UI = {
  curModal: null,
  renderAll() {}, renderTopbar() {}, renderCombat() {}, renderTheater() {},
  setStageMode() {}, openModal() {}, closeModal() {}, bootGame() {}, toast() {},
  showEndingModal() { endingModalCalls++; }, appendLogLine() {}
};

// 1. 全量世界、剧本、门派、同道、武功与神兵闭环检查
JY.S = JY.freshState("测试少侠", "sanxiu", { str: 5, agi: 5, int: 5, con: 0, luck: 0 });
assert.strictEqual(Object.keys(JY.REGIONS).length, 26, "应包含全部 26 个江湖大区域");
const detailedCount = Object.values(JY.REGIONS).filter(r => !r.isPlaceholder).length;
assert.strictEqual(detailedCount, 26, "全部 26 个大区域均应已精装");
const totalRooms = Object.values(JY.REGIONS).reduce((sum, r) => sum + Object.keys(r.rooms).length, 0);
assert(totalRooms >= 140, `子房间总数应 >= 140，实际 ${totalRooms}`);
assert(Object.keys(JY.QUESTS).length >= 37, `剧本数应 >= 37，实际 ${Object.keys(JY.QUESTS).length}`);
JY.MATES.forEach(m => {
  assert(JY.REGIONS[m.loc] && JY.REGIONS[m.loc].rooms[m.room], `同道 ${m.id} 的 room 指向应合法`);
  assert(JY.ITEMS[m.favGift], `同道 ${m.id} 的挚爱礼物 ${m.favGift} 应存在于 ITEMS`);
});

// 2. 子房间移动、BFS自动循路、六卷主线状态机、跨区赶路与昼夜推进
JY.World.moveRoom("yl_street");
assert.strictEqual(JY.S.room, "yl_street");
JY.World.moveRoom("yl_inn");
JY.World.restAtInn(true);
assert.strictEqual(JY.isNight(), true, "投宿至入夜后应处于夜间状态");
// 测试非相邻子房间 BFS 一步直达
assert.strictEqual(JY.World.walkToRoom("yl_forest"), true, "BFS 自动循路应可从福来客栈直达镇东后林");
assert.strictEqual(JY.S.room, "yl_forest");
const mlInit = JY.World.getMainlineState();
assert.strictEqual(mlInit.current.id, "ch1", "新角色开局主线应指向第一卷茶楼听风");
JY.World.guideNavigate("yuelai", "yl_teahouse", "baixiaosheng");
assert.strictEqual(JY.S.room, "yl_teahouse", "主线一键循路应直达悦来茶楼");
JY.World.travelRegion("suzhou");
assert.strictEqual(JY.S.region, "suzhou");
JY.World.moveRoom("sz_xingzi");
assert.strictEqual(JY.S.room, "sz_xingzi", "苏州应可走入杏子林");

// 3. 奇经八脉冲穴 + 生活技艺炼丹/烹饪/锻造词条装备 + 神兵防重复折算
JY.S.P.exp = 2000;
JY.S.P.inv.herb_common = 6;
JY.S.P.inv.herb_ginseng = 3;
JY.S.P.inv.ore_iron = 6;
JY.S.P.life.alchemy = 2;
JY.Systems.craftRecipe("alchemy", "r_cm");
assert(JY.S.P.inv.dan_chongmai >= 1, "炼丹应成功产出冲脉丹");
const atkBefore = JY.getStats(JY.S.P).atk;
JY.Systems.unlockMeridian("du");
assert.strictEqual(JY.S.P.meridians.du, 1, "应成功打通督脉第一穴");
assert(JY.getStats(JY.S.P).atk > atkBefore, "冲脉后攻击力应实际提升");

JY.Systems.craftRecipe("forge", "f_wpn");
assert.strictEqual(JY.S.P.bagGear.length, 1, "锻造应生成带词条装备");
assert.strictEqual(JY.S.P.bagGear[0].affixes.length, 2, "锻造装备应含 2 条随机词条");
JY.Systems.equipGear(0);
assert(JY.S.P.gear.weapon, "应成功穿戴词条武器");

JY.applyEffect({ legendary: "dagou_staff" });
const goldBeforeDup = JY.S.P.gold;
JY.applyEffect({ legendary: "dagou_staff" });
assert.strictEqual(JY.S.P.bagGear.filter(g => g.id === "dagou_staff").length, 1, "重复神兵不应重复入库");
assert.strictEqual(JY.S.P.gold, goldBeforeDup + 300, "重复神兵应折算为银两与修为");

// 4. 策略回合战斗：意图预告 + 点穴打断蓄力 + 全部 12 位同道合击特效验证
JY.S.P.morality = 20;
JY.Systems.recruitMate("huangrong");
JY.Combat.start("bandit_boss");
assert(JY.Combat.active, "策略回合战应启动");
JY.Combat.active.foe.intentIdx = 2; // 设为蓄力绝杀意图
JY.Combat.active.mp = 6;
JY.Combat.castSkill("dianxue"); // 点穴打断蓄力
assert(JY.Combat.active.logs.some(l => l.includes("完美打断")), "点穴手打断蓄力应触发完美打断提示");

// 遍历测试全部 12 位同道合击，确认无异常且各带专属特效
JY.MATES.forEach(m => {
  JY.Combat.start("wangcy_boss");
  JY.Combat.active.mate = m;
  JY.Combat.active.foe.intentIdx = 2; // charge
  JY.Combat.active.foe.st.bleed = 2;
  JY.Combat.active.foe.st.break = 1;
  JY.Combat.active.synergy = 100;
  JY.Combat.castMateCombo();
  assert(JY.Combat.active.logs.some(l => l.includes(m.comboName)), `${m.name} 合击日志应包含 ${m.comboName}`);
  JY.Combat.stopAuto();
  JY.Combat.active = null;
});

// 5. 立绘剧情剧场：历练门槛校验 + 黄蓉随行插话 + 烹饪检定 + 分支真后果
JY.S.region = "xiangyang";
JY.S.room = "xy_guofu_yard";
JY.S.P.flags.she_ep2_done = true;
JY.S.timeIdx = 10; // 入夜
assert.strictEqual(JY.Story.findAvailableEpisode("huangrong"), null, "未达武功Lv3与1次悬赏门槛前不应触发射雕第3幕");
assert(JY.Story.findLockedEpisodesForNpc("huangrong").length >= 1, "未达历练门槛时 NPC 应返回明确的资格核验提示");
JY.S.P.learned.taizu.lv = 3;
JY.S.P.bountyDone.bnt_c_road_toll = 1;
const av = JY.Story.findAvailableEpisode("huangrong");
assert(av && av.ep.id === "she_ep3", "满足武功Lv3与悬赏门槛后入夜前往郭府后院应能触发射雕第3幕");
JY.Story.play(av.quest, av.ep);
JY.Story.step(); // 郭靖对话
JY.Story.step(); // 黄蓉随行专属插话
assert.strictEqual(JY.Story.active.speaker, "黄蓉", "携黄蓉随行时应自动触发黄蓉专属插话");
JY.Story.step(); // 到达抉择
assert(JY.Story.active.choices && JY.Story.active.choices.length === 4);
JY.Story.choose(0); // 选黄蓉奇谋分支
assert.strictEqual(JY.S.P.flags.she_trap_plan, true, "选黄蓉奇谋应写入世界变量 she_trap_plan");

// 6. choice.battle 战败不应提前发放奖励，胜利后才入队与置旗标
JY.S.region = "juxian";
JY.S.room = "juxian_hall";
const jx = JY.Story.findAvailableEpisode("qiaofeng");
assert(jx && jx.ep.id === "jx_ep1", "聚贤庄大厅应可触发乔峰剧情");
JY.Story.play(jx.quest, jx.ep);
JY.Story.step();
JY.Story.step(); // 到达抉择
JY.Story.choose(0); // 选择与乔峰并肩血战
assert(!JY.S.P.mates.includes("qiaofeng"), "聚贤庄战前不应提前招募乔峰");
assert(!JY.S.P.flags.juxian_sided_qiao, "聚贤庄战前不应提前置 juxian_sided_qiao");
JY.Combat.active.foe.hp = 0;
JY.Combat.victory();
assert(JY.S.P.mates.includes("qiaofeng"), "聚贤庄战后胜利应正式招募乔峰");
assert.strictEqual(JY.S.P.flags.juxian_sided_qiao, true, "聚贤庄战后胜利应置 juxian_sided_qiao");

// 7. 悬赏自动结算 + 藏宝图挖掘 + 挚爱赠礼 1.5x 加成
JY.S.region = "chengwai";
JY.S.room = "cw_road";
JY.Systems.acceptBounty("bnt_bandit1");
JY.Systems.checkBountyKill("shanzei");
assert.strictEqual(JY.S.P.bountyDone.bnt_bandit1, 1, "击杀目标后悬赏应自动结算");

JY.S.P.inv.yufeng_jar = 1;
JY.Systems.recruitMate("xiaolongnv");
const affBefore = JY.S.P.aff.xiaolongnv || 0;
JY.Systems.giftMate("xiaolongnv", "yufeng_jar");
assert.strictEqual(JY.S.P.aff.xiaolongnv, affBefore + 36, "小龙女收玉蜂浆坛应触发 1.5 倍挚爱加成(+36)");

JY.S.P.inv.treasure_map = 1;
JY.Systems.useItem("treasure_map");
assert(JY.S.P.treasureTarget, "展开藏宝图应生成藏宝目标");
JY.S.region = JY.S.P.treasureTarget.region;
JY.S.room = JY.S.P.treasureTarget.room;
JY.World.searchRoom();
assert.strictEqual(JY.S.P.treasureTarget, null, "在目标房间搜查应挖出秘藏并清除藏宝图");

// 8. v3.0 存档读写一致性
assert.strictEqual(JY.saveSlot(1), true);
JY.S = null;
assert.strictEqual(JY.loadSlot(1), true);
assert.strictEqual(JY.S.P.name, "测试少侠");

// 9. 战后无缝续播立绘剧场（《飞狐》第4幕战凤天南后回到剧场领天书）
JY.S.region = "yanmen";
JY.S.room = "ym_snow_lodge";
JY.S.P.flags.fei_ep3_done = true;
const feiEp = JY.Story.findAvailableEpisode("cheng_lingsu");
assert(feiEp && feiEp.ep.id === "fei_ep4", "雪岭旧庄应可触发飞狐第4幕");
JY.Story.play(feiEp.quest, feiEp.ep);
let safety = 0;
while (JY.Story.active && !JY.Combat.active && safety++ < 25) JY.Story.step();
assert(JY.Combat.active && JY.Combat.active.foe.id === "feng_tiannan", "飞狐第4幕应触发凤天南 Boss 战");
JY.Combat.active.foe.hp = 0;
JY.Combat.victory();
assert(JY.Story.active && JY.Story.active.ep.id === "fei_ep4", "击败凤天南后应无缝切回立绘剧场继续收尾");
while (JY.Story.active && !JY.Story.active.choices && safety++ < 40) JY.Story.step();
assert(JY.Story.active && JY.Story.active.choices, "战后剧场应到达最终领天书抉择");
JY.Story.choose(1);
while (JY.Story.active && safety++ < 50) JY.Story.step();
assert.strictEqual(JY.S.P.tianshu.fei, true, "飞狐终幕应成功发放天书《飞狐外传》");

// 10. 华山论剑防速通英雄帖门槛校验 + 三阵连战终局大戏（动态分流第一阵 -> 东方不败 -> 王重阳）
JY.S.region = "huading";
JY.S.room = "hd_shelter";
JY.S.P.morality = 40;
assert.strictEqual(JY.Story.findAvailableEpisode("hd_steward"), null, "未集齐5部天书/6经脉/Lv6武功/3悬赏前绝不可直通华山论剑");
assert.strictEqual(JY.Story.findLockedEpisodesForNpc("hd_steward").length, 1, "秦拂石处应清晰展示未达标的华山论剑资格");
JY.S.P.tianshu = { she: true, fei: true, lian: true, lu: true, xiao: true };
JY.S.P.meridians = { du: 3, ren: 3 };
JY.S.P.learned.taizu.lv = 6;
JY.S.P.bountyDone = { bnt_bandit1: 3 };
const finEp = JY.Story.findAvailableEpisode("hd_steward");
assert(finEp && finEp.ep.id === "huashan_finale_gauntlet", "达成全部论剑资格后华山之巅候剑避风棚应可触发三阵终局连战");
JY.Story.play(finEp.quest, finEp.ep);
const fought = [];
for (let stepGuard = 0; stepGuard < 60 && (JY.Story.active || JY.Combat.active); stepGuard++) {
  if (JY.Combat.active) {
    fought.push(JY.Combat.active.foe.id);
    JY.Combat.active.foe.hp = 0;
    JY.Combat.victory();
  } else {
    JY.Story.step();
  }
}
assert.deepStrictEqual(fought, ["jinlun_boss", "dongfang_boss", "wangcy_boss"], "正道华山论剑应依次连战金轮法王->东方不败->王重阳");
assert.strictEqual(JY.S.P.flags.huashan_gauntlet_won, true, "三阵全胜应标记 huashan_gauntlet_won");

// 11. 锻造全4部位 + 淬炼强化 + 重铸洗词条 + 古琴曲谱 + 珍珑残局 + 门派位阶与客卿无损转门
JY.S.P.inv.ore_iron = 20;
JY.S.P.inv.ore_xuantie = 5;
JY.S.P.inv.herb_common = 10;
JY.S.P.inv.herb_ginseng = 5;
JY.S.P.gold = 3000;
JY.S.P.life.forge = 3;
JY.S.P.life.music = 4;
JY.S.P.life.chess = 4;
JY.S.P.energy = 100;
JY.Systems.craftRecipe("forge", "f_wpn3");
const crafted3 = JY.S.P.bagGear[JY.S.P.bagGear.length - 1];
assert.strictEqual(crafted3.affixes.length, 3, "Tier3 寒铁名刃应生成 3 条随机词条");
JY.Systems.equipGear(JY.S.P.bagGear.length - 1);
const atkPreEnh = JY.getStats(JY.S.P).atk;
JY.Systems.enhanceGear("weapon", true);
assert(JY.getStats(JY.S.P).atk > atkPreEnh, "淬炼强化+1后攻击力应实际提升");
JY.Systems.reforgeGear("weapon", true);
assert.strictEqual(JY.S.P.gear.weapon.affixes.length, 3, "重铸词条后应保留 3 条新词条");

JY.Systems.playMusicSong("song_xiaoao");
assert(JY.S.P.songBuff && JY.S.P.songBuff.id === "song_xiaoao", "弹奏笑傲江湖曲应激活曲谱 Buff");
const intBeforeChess = JY.S.P.attrs.int;
JY.Systems.solveChessPuzzle("pz_1", 0);
assert.strictEqual(JY.S.P.chessSolved.pz_1, true, "珍珑第一局正确落子应破局");
assert.strictEqual(JY.S.P.attrs.int, intBeforeChess + 1, "破局应永久提升悟性");

JY.Systems.joinSect("shaolin");
JY.S.P.flags.shaolin_trial_played = true;
JY.S.P.flags.shaolin_tournament_played = true;
JY.S.P.flags.shaolin_crisis_played = true;
JY.S.P.learned.taizu.lv = 6;
const rankSl = JY.getSectRank(JY.S.P);
assert.strictEqual(rankSl.title, "代掌门", "通3幕且武功Lv6应晋升为代掌门");
assert.strictEqual(rankSl.hasGuestToken, true, "通3幕应获得客卿玉牌");
JY.Systems.claimSectStipend();
assert.strictEqual(JY.S.P.sectClaimDay, JY.S.day, "应能领取今日师门俸禄");
JY.Systems.joinSect("wudang");
assert.strictEqual(JY.S.P.sect, "wudang", "凭客卿玉牌应可无损转投武当");
assert.strictEqual(JY.S.P.guestSects.shaolin, true, "原门派应留存客卿记录");

// 12. 旅途奇遇 + 同道默契追击 + 4 阶段战斗平衡实打验证（均用真实 AI 自动打通）
JY.World.resolveTravelChoice("tr_tea_gossip", 1);
function simDuel(setupFn, enemyId) {
  JY.S = JY.freshState("平衡侠", "sanxiu", { str: 4, agi: 4, int: 3, con: 4, luck: 0 });
  setupFn(JY.S.P);
  const st = JY.getStats(JY.S.P);
  JY.S.P.hp = st.maxHp;
  JY.Combat.start(enemyId);
  let turns = 0;
  while (JY.Combat.active && turns++ < 35) JY.Combat.aiPlayerMove();
  return { won: JY.S.P.hp > 0 && !JY.Combat.active && JY.S.logs.some(l => l.text.includes("大获全胜")), turns };
}
const simEarly = simDuel(() => {}, "shanzei");
assert(simEarly.won && simEarly.turns >= 2 && simEarly.turns <= 15, `新手战山贼应稳胜且有节奏(实测${JSON.stringify(simEarly)})`);
const simRushFail = simDuel(() => {}, "mongol_commander");
assert.strictEqual(simRushFail.won, false, `未养成白板角色直冲主线Boss巴图必须落败，逼迫玩家去探索冲脉锻造(实测${JSON.stringify(simRushFail)})`);
const simMid = simDuel(P => {
  P.learned.luoying = { lv: 4 }; P.learned.dianxue = { lv: 4 }; P.learned.guixi = { lv: 4 }; P.learned.yanzi = { lv: 3 };
  P.equipped = { outer: ["luoying", "dianxue", "songfeng"], inner: "guixi", light: "yanzi" };
  P.meridians = { du: 1, chong: 1, ren: 1 };
  P.gear.weapon = { id: "t2", name: "精钢剑", slot: "weapon", atk: 28, enh: 2 };
  P.mates = ["huangrong"]; P.mate = "huangrong"; P.aff.huangrong = 45;
}, "ouyang_ke");
assert(simMid.won, `中期构筑应能击败欧阳克(实测${JSON.stringify(simMid)})`);
const simEnd = simDuel(P => {
  P.sect = "huashan"; P.flags.huashan_crisis_played = true;
  P.learned.dugu = { lv: 9 }; P.learned.xuantie = { lv: 9 }; P.learned.jiuyang = { lv: 9 }; P.learned.lingbo = { lv: 9 };
  P.equipped = { outer: ["dugu", "xuantie", "dianxue", "songfeng"], inner: "jiuyang", light: "lingbo" };
  P.meridians = { du: 3, ren: 3, chong: 3, dai: 3, yangwei: 3, yinqiao: 2 };
  P.gear.weapon = Object.assign({ enh: 4 }, JY.LEGENDARY_GEAR.xuantie_sword);
  P.gear.armor = Object.assign({ enh: 4 }, JY.LEGENDARY_GEAR.tiancan_armor);
  P.gear.trinket = Object.assign({}, JY.LEGENDARY_GEAR.heiyu_jade);
  P.gear.boots = Object.assign({}, JY.LEGENDARY_GEAR.taxue_boots);
  P.foodBuff = Object.assign({ name: "玉笛谁家听落梅" }, JY.ITEMS.dish_yudi.buff);
  P.songBuff = Object.assign({}, JY.MUSIC_SONGS[2]);
  P.mates = ["huangrong"]; P.mate = "huangrong"; P.aff.huangrong = 90;
}, "wangcy_boss");
assert(simEnd.won && simEnd.turns >= 3, `大成终局构筑应能策略击败王重阳且非一刀秒杀(实测${JSON.stringify(simEnd)})`);

// 13. 10 项底层隐患防回归专项验证（神兵身法/太极反震/黯然残血/敌方寒毒流血/防误服药/NPC武功门槛/技艺跨级升级）
JY.S = JY.freshState("防回归侠", "sanxiu", { str: 3, agi: 3, int: 3, con: 3, luck: 3 });
const dodgeBase = JY.getStats(JY.S.P).dodge;
JY.S.P.gear.boots = Object.assign({}, JY.LEGENDARY_GEAR.taxue_boots); // agi: 8, dodge: 0.12
assert(JY.getStats(JY.S.P).dodge > dodgeBase + 0.14, "踏雪无痕履的 agi+8 应计入闪避公式");

// 满血防浪费金疮药 & 战斗满状态防浪费玉露丸
const jcBefore = JY.S.P.inv.jinchuang;
JY.Systems.useItem("jinchuang");
assert.strictEqual(JY.S.P.inv.jinchuang, jcBefore, "满气血时行囊使用金疮药不应扣减数量");

JY.S.P.learned.taijiquan = { lv: 3 };
JY.S.P.learned.anran = { lv: 5 };
JY.Combat.start("zuo_lengchan");
const yuluBefore = JY.S.P.inv.yulu;
JY.Combat.active.mp = JY.Combat.active.mpMax;
JY.Combat.useCombatItem("yulu");
assert.strictEqual(JY.S.P.inv.yulu, yuluBefore, "战斗真气已满时误点玉露丸不应消耗");

// 太极拳 counterHit 借力反震 + 左冷禅寒冰真气 chill 侵脉 + 大还丹全净化
JY.Combat.active.mp = 6;
JY.Combat.active.st.evade = 0;
JY.S.P.gear.boots = null;
JY.S.P.attrs.agi = 1; // 降低闪避确保受击触发反震与寒气
const foeHpBeforeTaiji = JY.Combat.active.foe.hp;
JY.Combat.castSkill("taijiquan");
assert(JY.Combat.active.logs.some(l => l.includes("借力反震")), "太极拳应激活借力反震");
assert(JY.Combat.active.logs.some(l => l.includes("反震") || l.includes("避过")), "敌方出招应触发反震或闪避结算");
JY.Combat.active.st.poison = 2;
JY.Combat.active.st.bleed = 2;
JY.Combat.active.st.chill = 2;
JY.S.P.inv.dahuandan = 1;
JY.Combat.useCombatItem("dahuandan");
assert.strictEqual(JY.Combat.active.st.poison + JY.Combat.active.st.bleed + JY.Combat.active.st.chill, 0, "大还丹应同时清除毒、流血与寒气");

// 黯然销魂掌濒危（<45% HP）增伤验证
JY.Combat.active.mp = 6;
JY.S.P.hp = Math.round(JY.getStats(JY.S.P).maxHp * 0.30);
JY.Combat.castSkill("anran");
assert(JY.Combat.active.logs.some(l => l.includes("黯然销魂！")), "残血施展黯然销魂掌应触发濒危增伤词条");
JY.Combat.stopAuto();
JY.Combat.active = null;

// NPC 武功 reqLv 门槛验证（鲁有脚 空明拳 reqLv: 3）
JY.S = JY.freshState("求学侠", "sanxiu", { str: 3, agi: 3, int: 3, con: 3, luck: 3 });
JY.S.region = "xiangyang";
JY.S.room = "xy_gaibang";
JY.S.P.gold = 1000;
JY.Systems.learnFromNpc("kongming", 320, "luyoujiao");
assert(!JY.S.P.learned.kongming, "最高武功未达 Lv3 时不应能向鲁有脚习得空明拳");
JY.S.P.learned.taizu.lv = 3;
JY.Systems.learnFromNpc("kongming", 320, "luyoujiao");
assert(JY.S.P.learned.kongming, "任一武功达 Lv3 后应可向鲁有脚习得空明拳");

// 技艺经验跨多级连续升级验证
JY.S.P.life.chess = 1;
JY.S.P.lifeExp.chess = 0;
JY.gainLifeExp("chess", 260); // Lv1需80, Lv2需160 -> 应连升至 Lv3 余 20
assert.strictEqual(JY.S.P.life.chess, 3, "gainLifeExp 大额经验应支持跨级连升");
assert.strictEqual(JY.S.P.lifeExp.chess, 20, "跨级连升后应保留溢出经验");

// 14. 华山论剑终局单次弹窗防重入 + 中途败退防重复刷子阶段奖励验证
JY.S = JY.freshState("论剑侠", "sanxiu", { str: 5, agi: 5, int: 5, con: 0, luck: 0 });
JY.S.region = "huading";
JY.S.room = "hd_shelter";
JY.S.P.tianshu = { she: true, fei: true, lian: true, lu: true, xiao: true };
JY.S.P.meridians = { du: 3, ren: 3 };
JY.S.P.learned.taizu.lv = 6;
JY.S.P.bountyDone = { bnt_bandit1: 3 };
endingModalCalls = 0;
const gEp = JY.Story.findAvailableEpisode("hd_steward");
JY.Story.play(gEp.quest, gEp.ep);
while (JY.Story.active && !JY.Combat.active) JY.Story.step();
const goldBeforeG1 = JY.S.P.gold;
JY.Combat.active.foe.hp = 0;
JY.Combat.victory(); // 赢第一阵
const goldAfterG1 = JY.S.P.gold;
assert(goldAfterG1 > goldBeforeG1, "首通第一阵应正常发放奖励");
while (JY.Story.active && !JY.Combat.active) JY.Story.step();
JY.Combat.defeat(); // 第二阵故意战败
// 重新挑战华山论剑：第一阵子奖励不应被重复刷取
JY.Story.play(gEp.quest, gEp.ep);
while (JY.Story.active && !JY.Combat.active) JY.Story.step();
const goldRetryPre = JY.S.P.gold;
JY.Combat.active.foe.hp = 0;
JY.Combat.victory(); // 重打赢第一阵（仅拿敌基础掉落，不重复领剧情 subReward 280两）
while (JY.Story.active || JY.Combat.active) {
  if (JY.Combat.active) {
    if (JY.Combat.active.foe.id === "wangcy_boss") {
      JY.Combat.active.foe.hp = 0;
      JY.Combat.victory();
      assert.strictEqual(endingModalCalls, 0, "王重阳收剑台词播放完毕前不应提前弹出终局画卷");
    } else {
      JY.Combat.active.foe.hp = 0;
      JY.Combat.victory();
    }
  } else {
    JY.Story.step();
  }
}
assert.strictEqual(endingModalCalls, 1, "华山论剑剧场完整收尾后应精确弹出 1 次终局画卷");

// 15. 少室藏经阁·无尽宗师试炼塔（连闯 1~5 层获四词条绝品传世装备 + 第6层落败零损银验证）
for (let f = 1; f <= 5; f++) {
  JY.Systems.startTowerTrial();
  assert(JY.Combat.active && JY.Combat.active.hooks.isTower, `试炼塔第${f}层应启动`);
  JY.Combat.active.foe.hp = 0;
  JY.Combat.victory();
}
assert.strictEqual(JY.S.P.towerFloor, 5, "连胜5场后试炼塔层数应记录为5");
const towerHeirloom = JY.S.P.bagGear.find(g => g.id && g.id.startsWith("tower_5_"));
assert(towerHeirloom && towerHeirloom.affixes.length === 4, "试炼塔第5层里程碑应必掉4词条传世神装");
const goldPreTowerLoss = JY.S.P.gold;
JY.Systems.startTowerTrial(); // 第6层
JY.Combat.defeat();
assert.strictEqual(JY.S.P.gold, goldPreTowerLoss, "试炼塔幻境落败应绝不扣除银两");

// 16. 二周目宗师轮回传承（New Game+）与跨端存档码导入导出无损验证
JY.S.P.learned.dugu = { lv: 8 };
JY.S.P.bagGear.push(Object.assign({}, JY.LEGENDARY_GEAR.xuantie_sword));
JY.S.P.guestSects = { shaolin: true, huashan: true };
JY.Systems.startNewGamePlus("dugu", "xuantie_sword");
assert.strictEqual(JY.S.P.ngPlus, 1, "应成功进入二周目(ngPlus=1)");
assert.strictEqual(JY.S.P.towerFloor, 5, "二周目应保留试炼塔最高层数纪录");
assert.strictEqual(JY.S.P.guestSects.shaolin, true, "二周目应保留全部客卿玉牌");
assert(JY.S.P.learned.dugu && JY.S.P.learned.dugu.lv === 3, "二周目应继承所选绝学（Lv3起步）");
assert(JY.S.P.bagGear.some(g => g.id === "xuantie_sword"), "二周目应继承所选原著神兵");
assert.strictEqual(Object.keys(JY.S.P.tianshu).length, 0, "二周目应重置十四天书供重新探索");

const exported = JY.exportSaveCode(JY.S.slot);
assert(exported.startsWith("SH14:"), "导出的存档备份码应以 SH14: 开头");
assert.strictEqual(JY.importSaveCode("INVALID_CODE", 2), false, "非法存档码应安全拒绝不抛异常");
assert.strictEqual(JY.importSaveCode(exported, 2), true, "合法 SH14: 存档码应成功导入至栏位 2");
assert.strictEqual(JY.importSaveCode("JYv3:" + exported.slice(5), 3), true, "应向下兼容旧版 JYv3: 存档码导入");
JY.S = null;
assert.strictEqual(JY.loadSlot(2), true, "导入后的栏位 2 应正常读取");
assert.strictEqual(JY.S.P.ngPlus, 1, "导入存档应完整保留二周目数据");

// 17. 全量 38 部剧本 · 115 幕端到端真机状态机推演（确保无任何一幕卡死、抛错或断链！）
JY.S = JY.freshState("全剧本巡检侠", "sanxiu", { str: 5, agi: 5, int: 5, con: 5, luck: 5 });
JY.S.P.gold = 50000;
JY.S.P.exp = 50000;
JY.S.P.life = { alchemy: 5, forge: 5, cook: 5, music: 5, chess: 5 };
JY.MATES.forEach(m => { JY.S.P.mates.push(m.id); JY.S.P.aff[m.id] = 85; });
JY.S.P.mate = "huangrong";
Object.keys(JY.ITEMS).forEach(k => { JY.S.P.inv[k] = 20; });

let walkedEpisodes = 0;
for (const [qid, q] of Object.entries(JY.QUESTS)) {
  for (const ep of q.episodes) {
    if (ep.reqSect) JY.S.P.sect = ep.reqSect;
    if (ep.reqUnaligned) JY.S.P.sect = null;
    if (ep.trigger && ep.trigger.region) JY.S.region = ep.trigger.region;
    if (ep.trigger && ep.trigger.room) JY.S.room = ep.trigger.room;
    JY.Story.play(q, ep);
    let guard = 0;
    while ((JY.Story.active || JY.Combat.active) && guard++ < 120) {
      if (JY.Combat.active) {
        JY.Combat.active.foe.hp = 0;
        JY.Combat.victory();
      } else if (JY.Story.active.choices) {
        const idx = JY.Story.active.choices.findIndex(c => JY.Story.choiceEnabled(c));
        assert(idx >= 0, `剧幕 ${qid}.${ep.id} 至少应有 1 个可选分支`);
        JY.Story.choose(idx);
      } else {
        JY.Story.step();
      }
    }
    assert(guard < 120, `剧幕 ${qid}.${ep.id} 不应陷入死循环`);
    assert.strictEqual(JY.S.P.flags[ep.id + "_played"], true, `剧幕 ${qid}.${ep.id} 跑完后应置 _played 旗标`);
    walkedEpisodes++;
  }
}
assert.strictEqual(Object.keys(JY.S.P.tianshu).length, 14, "跑完全部剧本后应完整集齐 14/14 部天书");

// 18. Web Audio 音效与雅乐引擎无头环境安全轮转验证
["click", "sword", "palm", "acupoint", "crit", "shield", "hit", "guqin", "chess", "fanfare", "warn"].forEach(k => JY.Audio.play(k));
JY.Audio.cycleMode(); // sfx -> all
JY.Audio.cycleMode(); // all -> mute
JY.Audio.cycleMode(); // mute -> sfx
assert.strictEqual(JY.Audio.getMode(), "sfx", "音效模式应支持三态安全切换");

console.log(`ALL SHANHE-14 v1.0 FULL ENGINE, REGRESSION & 100% STORY WALK TESTS PASSED! (18/18 SUITES, ${scripts.length} MODULES, ${totalRooms} ROOMS, ${walkedEpisodes} EPISODES WALKED, 14/14 TIANSHU, SIM=${simEarly.turns}/${simMid.turns}/${simEnd.turns}T)`);
