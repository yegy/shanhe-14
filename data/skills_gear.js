/* =====================================================================
   山河十四卷 v1.0 · 武学连携库 / 奇经八脉 / 原著神兵与词条 / 五大生活技艺 / 策略敌人
   ===================================================================== */
(function (root) {
  "use strict";
  const JY = (root.JY = root.JY || {});

  // 策略回合状态标签字典（驱动 Combo 连携与破招）
  JY.STATUS_META = {
    break:  { name: "破甲", cls: "red",    desc: "每层使受到的伤害 +18%（上限 3 层），可被重击/破招引爆" },
    chill:  { name: "寒气", cls: "blue",   desc: "每层降敌攻击 8%，叠至 3 层触发「冰封破脉」巨伤并减速" },
    poison: { name: "剧毒", cls: "jade",   desc: "每回合结束造成无视防御毒伤，可被毒系绝技「毒爆」引爆" },
    bleed:  { name: "流血", cls: "red",    desc: "每回合流血失血，触发「斩杀」招式暴击加成" },
    stun:   { name: "点穴", cls: "purple", desc: "封住要穴，打断敌人蓄力杀招并跳过其下回合行动" },
    shield: { name: "护体", cls: "blue",   desc: "吸收直接伤害与剧毒迷雾" },
    evade:  { name: "闪身", cls: "jade",   desc: "大幅提升闪避并必定躲过下一次蓄力杀招" },
    focus:  { name: "蓄劲", cls: "gold",   desc: "下一招外功伤害 +45%" }
  };

  // 核心代表武功库（兼容 68 门武功 ID；基础 24 门精雕细琢，其余门派武功由注册表自动补齐策略属性）
  // type: 0外功 1内功 2轻功；rarity: 0基础 1进阶 2高级 3绝学；cost: 真气消耗(0..4)
  // fx: 施加或引爆状态；counter: 可克制何种敌人意图("charge"蓄力 / "iron"铁壁 / "poison"毒雾 / "flurry"连斩)
  const CORE_SKILLS = [
    // 散修 & 基础
    { id: "taizu",     name: "太祖长拳",   type: 0, rarity: 0, cost: 0, pow: 1.05, fx: { focus: 1 },                  flavor: "起手「冲天炮」接「搬拦捶」，沉稳刚猛，顺势蓄劲！" },
    { id: "wuhu",      name: "五虎断门刀", type: 0, rarity: 1, cost: 1, pow: 1.35, fx: { bleed: 2 },                  flavor: "刀势如五虎下山，连环劈斩撕开血口！" },
    { id: "tiesha",    name: "铁砂掌",     type: 0, rarity: 1, cost: 1, pow: 1.25, fx: { poison: 2 },                 flavor: "双掌漆黑炽热，砂掌阴毒暗劲轰然透体！" },
    { id: "songfeng",  name: "松风剑法",   type: 0, rarity: 1, cost: 1, pow: 1.32, fx: { break: 1 }, counter: "iron", flavor: "剑风飒飒如苍松迎客，斜削破甲！" },
    { id: "dianxue",   name: "点穴手",     type: 0, rarity: 1, cost: 2, pow: 1.10, fx: { stun: 1 },  counter: "charge", flavor: "并指如戟直点膻中要穴，硬生生截断对手蓄力！" },
    { id: "luoying",   name: "落英神剑掌", type: 0, rarity: 2, cost: 2, pow: 1.65, fx: { break: 1, focus: 1 },        flavor: "双掌翻飞如东海落英缤纷，虚实难辨！" },
    { id: "tanzhi",    name: "弹指神通",   type: 0, rarity: 2, cost: 2, pow: 1.60, fx: { stun: 1, break: 1 }, counter: "charge", flavor: "中指微曲一弹，破空劲气瞬间打断敌招！" },
    { id: "yiyangzhi", name: "一阳指",     type: 0, rarity: 2, cost: 2, pow: 1.72, fx: { stun: 1 },  counter: "charge", flavor: "大理段氏纯阳指力凝于食指，破邪点穴！" },
    { id: "kongming",  name: "空明拳",     type: 0, rarity: 2, cost: 2, pow: 1.55, fx: { shield: 85, focus: 1 },      flavor: "至柔至空、以虚击实，柔劲护身再蓄后招！" },
    { id: "xuantie",   name: "玄铁剑法",   type: 0, rarity: 3, cost: 3, pow: 2.35, fx: { break: 2, detonate: "break" }, counter: "iron", flavor: "重剑无锋，大巧不工，引爆破甲一剑崩山！" },
    { id: "zuoyou",    name: "左右互搏",   type: 0, rarity: 3, cost: 3, pow: 1.95, fx: { focus: 1, multi: 2 },        flavor: "左手画方右手画圆，一心二用双招齐发！" },
    // 八大门派招牌绝学与中坚武功
    { id: "luohan",    name: "罗汉拳",     type: 0, rarity: 0, cost: 0, pow: 1.08, fx: { shield: 35 },                flavor: "双拳沉稳一错，黑虎偷心兼具护身架势！" },
    { id: "dajin",     name: "大力金刚掌", type: 0, rarity: 2, cost: 2, pow: 1.78, fx: { break: 2 }, counter: "iron", flavor: "金刚怒目重掌拍落，专碎铁壁横练！" },
    { id: "taijiquan", name: "太极拳",     type: 0, rarity: 2, cost: 2, pow: 1.48, fx: { shield: 110, counterHit: 1 }, counter: "flurry", flavor: "揽雀尾借力打力，化敌连招反震回去！" },
    { id: "taijijian", name: "太极剑",     type: 0, rarity: 3, cost: 3, pow: 2.20, fx: { shield: 120, break: 2 },     flavor: "剑随身走圆转如意，太极双鱼笼罩八方！" },
    { id: "dagou",     name: "打狗棒法",   type: 0, rarity: 2, cost: 2, pow: 1.68, fx: { stun: 1, break: 1 }, counter: "charge", flavor: "绊劈缠戳挑引封转，一棒打断敌方杀招！" },
    { id: "xianglong", name: "降龙十八掌", type: 0, rarity: 3, cost: 3, pow: 2.55, fx: { break: 2, detonate: "break" }, counter: "iron", flavor: "亢龙有悔，龙吟虎啸，引爆破甲排山倒海！" },
    { id: "hsjian",    name: "华山剑法",   type: 0, rarity: 0, cost: 0, pow: 1.08, fx: { bleed: 1 },                  flavor: "剑走轻灵，白虹贯日斜削取血！" },
    { id: "dugu",      name: "独孤九剑",   type: 0, rarity: 3, cost: 2, pow: 2.30, fx: { break: 2, stun: 1 }, counter: "charge", flavor: "总诀式料敌机先，一剑破尽蓄力与铁壁！" },
    { id: "yitian",    name: "倚天剑法",   type: 0, rarity: 2, cost: 2, pow: 1.70, fx: { bleed: 2, detonate: "bleed" }, flavor: "铁画银钩剑意凌厉，流血越深斩杀越狠！" },
    { id: "jiuyinzhua",name: "九阴白骨爪", type: 0, rarity: 3, cost: 3, pow: 2.25, fx: { poison: 2, bleed: 2, detonate: "poison" }, flavor: "五指阴风透骨，引爆剧毒与流血惨绝人寰！" },
    { id: "yunvjian",  name: "玉女剑法",   type: 0, rarity: 1, cost: 1, pow: 1.38, fx: { evade: 1 }, counter: "flurry", flavor: "花前月下轻盈连刺，顺势身法抽离！" },
    { id: "anran",     name: "黯然销魂掌", type: 0, rarity: 3, cost: 3, pow: 2.45, fx: { detonate: "bleed", break: 1 }, flavor: "杞人忧天掌意苍凉，濒危或流血时威力倍增！" },
    { id: "hanbing",   name: "寒冰绵掌",   type: 0, rarity: 1, cost: 1, pow: 1.28, fx: { chill: 2 },                  flavor: "掌心寒霜凝结，寒气透骨减速制敌！" },
    { id: "baihong",   name: "白虹掌力",   type: 0, rarity: 2, cost: 2, pow: 1.62, fx: { chill: 2, detonate: "chill" }, flavor: "曲直如意绕过兵刃，叠满寒气瞬间冰爆！" },
    // 内功（被动 + 主动护体/回气）
    { id: "tuna",      name: "吐纳术",     type: 1, rarity: 0, cost: 0, pow: 0, passive: { hp: 0.12 }, active: { heal: 35, mp: 2 }, flavor: "深吸长气吐故纳新，稳住气血恢复真气。" },
    { id: "guixi",     name: "龟息功",     type: 1, rarity: 1, cost: 0, pow: 0, passive: { def: 0.12, mpRegen: 1 }, active: { shield: 90, mp: 2 }, counter: "poison", flavor: "气息内敛如龟伏渊，生出护体罡气并回气。" },
    { id: "jinzhong",  name: "金钟罩",     type: 1, rarity: 2, cost: 1, pow: 0, passive: { def: 0.20, hp: 0.15 }, active: { shield: 180 }, counter: "poison", flavor: "横练金钟护体，刀枪毒雾难伤分毫！" },
    { id: "zixia",     name: "紫霞神功",   type: 1, rarity: 2, cost: 1, pow: 0, passive: { atk: 0.15, mpRegen: 1 }, active: { focus: 1, mp: 2 }, flavor: "面上紫气微现，真气奔涌且下招大增！" },
    { id: "beiming",   name: "北冥神功",   type: 1, rarity: 2, cost: 1, pow: 1.20, passive: { mpMax: 2 }, active: { drainMp: 3, shield: 110 }, flavor: "气海如百川归海，吸敌内力化为己用！" },
    { id: "qiankun",   name: "乾坤大挪移", type: 1, rarity: 2, cost: 2, pow: 0, passive: { def: 0.16, atk: 0.10 }, active: { shield: 160, reflect: 0.5 }, counter: "flurry", flavor: "借力打力移花接木，反震敌招！" },
    { id: "yijinjing", name: "易筋经",     type: 1, rarity: 3, cost: 1, pow: 0, passive: { hp: 0.28, def: 0.22 }, active: { shield: 260, cleanse: 1, heal: 90 }, counter: "poison", flavor: "佛门无上禅功，涤荡百毒、金刚护体！" },
    { id: "jiuyang",   name: "九阳神功",   type: 1, rarity: 3, cost: 1, pow: 0, passive: { atk: 0.20, hp: 0.25, mpRegen: 1 }, active: { heal: 140, shield: 180, mp: 2 }, counter: "poison", flavor: "九阳真气澎湃炽烈，百毒不侵生生不息！" },
    { id: "jiuyin",    name: "九阴真经",   type: 1, rarity: 3, cost: 2, pow: 1.85, passive: { atk: 0.22, crit: 0.12 }, active: { break: 2, poison: 2 }, flavor: "九阴总纲流转，攻守兼备、破甲施毒！" },
    // 轻功（闪身克制大招/连斩）
    { id: "caofei",    name: "草上飞",     type: 2, rarity: 0, cost: 1, pow: 0, passive: { dodge: 0.06 }, active: { evade: 1 }, counter: "flurry", flavor: "脚尖轻点如秋风掠草，身形疾退！" },
    { id: "yanzi",     name: "燕子三抄水", type: 2, rarity: 1, cost: 1, pow: 0, passive: { dodge: 0.10 }, active: { evade: 1, mp: 1 }, counter: "flurry", flavor: "双足轻点三下掠水腾挪，从容回气！" },
    { id: "tiyun",     name: "梯云纵",     type: 2, rarity: 2, cost: 1, pow: 0, passive: { dodge: 0.14 }, active: { evade: 1, focus: 1 }, counter: "charge", flavor: "凭虚凌空拔起丈余，躲开杀招并蓄劲反打！" },
    { id: "lingbo",    name: "凌波微步",   type: 2, rarity: 3, cost: 1, pow: 0, passive: { dodge: 0.22, mpRegen: 1 }, active: { evade: 2, mp: 2 }, counter: "flurry", flavor: "踏伏羲六十四卦步法，身影如烟似雾不可捉摸！" }
  ];

  JY.SKILLS = {};
  CORE_SKILLS.forEach(s => { JY.SKILLS[s.id] = s; });

  // ---------- 奇经八脉（8 条经脉 × 3 重穴位，打造流派构筑质变） ----------
  JY.MERIDIANS = [
    { id: "du",     name: "督脉", role: "剑宗破招", desc: "贯通脊背阳气，强化「破甲」与打断蓄力收益。", levels: [
      { acupoint: "长强", exp: 180, pill: "dan_chongmai", bonus: { atkPct: 0.06, breakDmg: 0.10 }, txt: "攻击 +6%，破甲增伤额外 +10%" },
      { acupoint: "命门", exp: 420, pill: "dan_chongmai", bonus: { atkPct: 0.12, counterDmg: 0.25 }, txt: "攻击 +12%，破招反击伤害 +25%" },
      { acupoint: "百会", exp: 880, pill: "dan_jiuzhuan", bonus: { atkPct: 0.20, startFocus: 1 }, txt: "攻击 +20%，每战开局自带「蓄劲」" }
    ]},
    { id: "ren",    name: "任脉", role: "气海回元", desc: "总任一身阴经，大幅拓展真气上限与回气效率。", levels: [
      { acupoint: "关元", exp: 180, pill: "dan_chongmai", bonus: { mpMax: 1 }, txt: "最大真气 +1" },
      { acupoint: "膻中", exp: 420, pill: "dan_chongmai", bonus: { mpMax: 2, mpRegen: 1 }, txt: "最大真气 +2，每回合额外回真气 +1" },
      { acupoint: "天突", exp: 880, pill: "dan_jiuzhuan", bonus: { mpMax: 3, mpRegen: 1, startMp: 2 }, txt: "最大真气 +3，开局额外 +2 真气" }
    ]},
    { id: "chong",  name: "冲脉", role: "刚猛霸体", desc: "血海贯通，极大幅提升气血上限与刚猛重击。", levels: [
      { acupoint: "气冲", exp: 180, pill: "dan_chongmai", bonus: { hpPct: 0.10 }, txt: "气血上限 +10%" },
      { acupoint: "幽门", exp: 420, pill: "dan_chongmai", bonus: { hpPct: 0.20, crit: 0.06 }, txt: "气血 +20%，会心率 +6%" },
      { acupoint: "会阴", exp: 880, pill: "dan_jiuzhuan", bonus: { hpPct: 0.32, crit: 0.12 }, txt: "气血 +32%，会心率 +12%" }
    ]},
    { id: "dai",    name: "带脉", role: "护体金刚", desc: "横束诸经，强化防御与护盾吸收。", levels: [
      { acupoint: "带脉", exp: 180, pill: "dan_chongmai", bonus: { defPct: 0.10 }, txt: "防御 +10%" },
      { acupoint: "五枢", exp: 420, pill: "dan_chongmai", bonus: { defPct: 0.18, shieldPct: 0.20 }, txt: "防御 +18%，所有护体盾量 +20%" },
      { acupoint: "维道", exp: 880, pill: "dan_jiuzhuan", bonus: { defPct: 0.28, shieldPct: 0.35 }, txt: "防御 +28%，护体盾量 +35%" }
    ]},
    { id: "yinwei", name: "阴维脉", role: "寒毒爆裂", desc: "维系阴寒毒劲，放大毒伤、寒气与流血威力。", levels: [
      { acupoint: "筑宾", exp: 200, pill: "dan_chongmai", bonus: { dotPct: 0.20 }, txt: "中毒/流血/寒爆伤害 +20%" },
      { acupoint: "府舍", exp: 460, pill: "dan_chongmai", bonus: { dotPct: 0.40 }, txt: "中毒/流血/寒爆伤害 +40%" },
      { acupoint: "廉泉", exp: 920, pill: "dan_jiuzhuan", bonus: { dotPct: 0.65, lifesteal: 0.08 }, txt: "持续/引爆伤害 +65%，外功附带 8% 吸血" }
    ]},
    { id: "yangwei",name: "阳维脉", role: "会心连斩", desc: "阳气透发，提升暴击倍率与斩杀压制。", levels: [
      { acupoint: "金门", exp: 200, pill: "dan_chongmai", bonus: { crit: 0.06 }, txt: "会心率 +6%" },
      { acupoint: "阳交", exp: 460, pill: "dan_chongmai", bonus: { crit: 0.12, critDmg: 0.25 }, txt: "会心 +12%，会心倍率 +25%" },
      { acupoint: "风府", exp: 920, pill: "dan_jiuzhuan", bonus: { crit: 0.18, critDmg: 0.45 }, txt: "会心 +18%，会心倍率 +45%" }
    ]},
    { id: "yinqiao",name: "阴跷脉", role: "轻灵闪避", desc: "司掌矫健身法，闪避后自动反击对手。", levels: [
      { acupoint: "照海", exp: 200, pill: "dan_chongmai", bonus: { dodge: 0.06 }, txt: "闪避率 +6%" },
      { acupoint: "交信", exp: 460, pill: "dan_chongmai", bonus: { dodge: 0.11, riposte: 1 }, txt: "闪避 +11%，成功闪避时自动反击" },
      { acupoint: "睛明", exp: 920, pill: "dan_jiuzhuan", bonus: { dodge: 0.16, riposte: 1, mpOnDodge: 1 }, txt: "闪避 +16%，闪避反击并回真气 +1" }
    ]},
    { id: "yangqiao",name: "阳跷脉", role: "散修奇缘", desc: "通达江湖气运，提升掉宝、搜查与修为收益。", levels: [
      { acupoint: "申脉", exp: 200, pill: "dan_chongmai", bonus: { luck: 3, expPct: 0.10 }, txt: "福缘 +3，修为获取 +10%" },
      { acupoint: "居髎", exp: 460, pill: "dan_chongmai", bonus: { luck: 6, expPct: 0.20, goldPct: 0.15 }, txt: "福缘 +6，修为 +20%，银两 +15%" },
      { acupoint: "风池", exp: 920, pill: "dan_jiuzhuan", bonus: { luck: 10, expPct: 0.30, goldPct: 0.25 }, txt: "福缘 +10，修为 +30%，银两 +25%" }
    ]}
  ];

  // ---------- 原著神兵宝甲（带独特机制特效） + 词条池 ----------
  JY.LEGENDARY_GEAR = {
    yitian_sword: { id: "yitian_sword", name: "倚天剑", slot: "weapon", rarity: 4, atk: 46, crit: 0.12, desc: "武林至尊绝世神剑：外功必定附加 1 层破甲，剑法伤害 +22%。", special: "yitian" },
    tulong_blade: { id: "tulong_blade", name: "屠龙刀", slot: "weapon", rarity: 4, atk: 54, hp: 180,  desc: "号令天下重宝：对气血低于 45% 目标伤害 +35%。", special: "tulong" },
    xuantie_sword:{ id: "xuantie_sword",name: "玄铁重剑", slot: "weapon", rarity: 4, atk: 58, def: 12,  desc: "重剑无锋、大巧不工：攻击无视闪避，暴击时额外震晕。", special: "xuantie" },
    dagou_staff:  { id: "dagou_staff",  name: "绿玉打狗棒", slot: "weapon", rarity: 4, atk: 38, agi: 6,   desc: "丐帮镇帮之宝：点穴/打断招式真气消耗 -1。", special: "dagou" },
    ruanwei_armor:{ id: "ruanwei_armor",name: "软猬甲", slot: "armor",  rarity: 4, def: 34, hp: 220,  desc: "桃花岛奇宝：免疫中毒，受击反弹 25% 伤害。", special: "ruanwei" },
    tiancan_armor:{ id: "tiancan_armor",name: "天蚕宝甲", slot: "armor",  rarity: 4, def: 42, hp: 280,  desc: "刀枪不入：每回合自动获得 45 点护体罡气。", special: "tiancan" },
    jinsi_gloves: { id: "jinsi_gloves", name: "白金丝手套", slot: "trinket",rarity: 3, atk: 20, def: 14,  desc: "掌法与点穴类武功伤害 +18%，免疫兵器反震。", special: "jinsi" },
    heiyu_jade:   { id: "heiyu_jade",   name: "黑玉断续佩", slot: "trinket",rarity: 4, hp: 200, def: 15, desc: "每场战斗首次濒死触发免死并回复 35% 气血。", special: "heiyu" },
    taxue_boots:  { id: "taxue_boots",  name: "踏雪无痕履", slot: "boots",  rarity: 4, dodge: 0.12, agi: 8, desc: "轻功闪身持续回合 +1，野外行路不耗精力。", special: "taxue" }
  };

  JY.AFFIXES = [
    { id: "sharp",   name: "锋锐", stat: "atk",   val: 6,    txt: "攻击 +6" },
    { id: "iron",    name: "坚韧", stat: "def",   val: 5,    txt: "防御 +5" },
    { id: "vital",   name: "厚血", stat: "hp",    val: 65,   txt: "气血 +65" },
    { id: "keen",    name: "破绽", stat: "crit",  val: 0.05, txt: "会心 +5%" },
    { id: "swift",   name: "轻燕", stat: "dodge", val: 0.04, txt: "闪避 +4%" },
    { id: "lucky",   name: "福星", stat: "luck",  val: 3,    txt: "福缘 +3" },
    { id: "leech",   name: "饮血", stat: "lifesteal", val: 0.05, txt: "吸血 +5%" }
  ];

  // ---------- 物品 / 采集材料 / 丹药 / 名菜 / 雅礼 ----------
  JY.ITEMS = {
    // 药品
    jinchuang:    { name: "金疮药",   cat: "med",  price: 40,  heal: 160, desc: "回复气血 160 点。" },
    dahuandan:    { name: "大还丹",   cat: "med",  price: 160, heal: 450, cleanse: 1, desc: "回复气血 450 点并清除剧毒。" },
    yulu:         { name: "玉露丸",   cat: "med",  price: 55,  mp: 3,     desc: "战斗中立刻回复 3 点真气。" },
    dan_chongmai: { name: "冲脉丹",   cat: "pill", price: 240, desc: "打通奇经八脉前两重穴位的必备丹药（可炼丹自制）。" },
    dan_jiuzhuan: { name: "九转还魂丹",cat: "pill", price: 680, heal: 900, desc: "绝世神丹，可冲开奇经八脉第三重圆满穴位。" },
    // 采集原料
    herb_common:  { name: "金银草",   cat: "mat",  price: 15,  desc: "常见止血草药，野外采集可得。" },
    herb_ginseng: { name: "长白老参", cat: "mat",  price: 90,  desc: "百年灵药，炼制冲脉丹与赠张无忌佳品。", gift: 14 },
    ore_iron:     { name: "百炼精铁", cat: "mat",  price: 35,  desc: "打造词条神兵的基础矿石。" },
    ore_xuantie:  { name: "天外寒铁", cat: "mat",  price: 220, desc: "稀有玄铁矿，锻造绝世神兵核心材料。" },
    food_fowl:    { name: "散养土鸡", cat: "mat",  price: 25,  desc: "烹饪叫花鸡与名菜的鲜嫩主料。" },
    food_ham:     { name: "金华火腿", cat: "mat",  price: 45,  desc: "江南名产，烹饪「玉笛谁家听落梅」主料。" },
    // 名菜与雅礼（生活技艺产出，支持战前 Buff 与红颜/同道高额赠礼）
    dish_chicken: { name: "叫花鸡",           cat: "food", price: 110, buff: { atkPct: 0.12, battles: 3 }, gift: 16, desc: "香气扑鼻！食用后 3 场战斗攻击 +12%；郭靖/洪七公最爱。" },
    dish_yudi:    { name: "玉笛谁家听落梅",   cat: "food", price: 220, buff: { atkPct: 0.18, crit: 0.08, battles: 3 }, gift: 24, desc: "黄蓉拿手绝菜！3 战攻 +18% 暴 +8%；赠黄蓉好感 +24。" },
    wine_nver:    { name: "陈年女儿红",       cat: "gift", price: 120, gift: 14, desc: "江南名酒，赠同道好感 +14。" },
    wine_monkey:  { name: "猴儿酒",           cat: "gift", price: 200, gift: 22, desc: "奇珍佳酿，令狐冲挚爱（好感 +22）。" },
    wine_strong:  { name: "塞外烈烧刀",       cat: "gift", price: 180, gift: 22, desc: "烈酒豪情，乔峰挚爱（好感 +22）。" },
    guqin_score:  { name: "清心普善残谱",     cat: "gift", price: 240, gift: 24, desc: "古琴名谱，任盈盈挚爱（好感 +24）。" },
    jade_fan:     { name: "羊脂玉骨折扇",     cat: "gift", price: 240, gift: 24, desc: "风流雅扇，赵敏挚爱（好感 +24）。" },
    yufeng_jar:   { name: "玉蜂浆坛",         cat: "gift", price: 220, gift: 24, desc: "终南玉蜂酿成的清冽蜜浆，小龙女挚爱（好感 +24）。" },
    hanshui_silk: { name: "汉水青丝帕",       cat: "gift", price: 210, gift: 24, desc: "汉水渡口织就的素雅青丝帕，周芷若挚爱（好感 +24）。" },
    poison_gall:  { name: "雪山蛇胆",         cat: "gift", price: 230, gift: 24, desc: "白驼山奇珍异胆，欧阳锋挚爱（好感 +24）。" },
    treasure_map: { name: "残破藏宝图",       cat: "key",  price: 150, desc: "绘有前朝秘宝线索，在行囊中使用可指明藏宝子房间。" }
  };

  // ---------- 五大生活技艺配方 ----------
  JY.RECIPES = {
    alchemy: [
      { id: "r_jc",   name: "炼制金疮药×2", reqLv: 1, mats: { herb_common: 2 }, out: { jinchuang: 2 }, exp: 25 },
      { id: "r_cm",   name: "炼制冲脉丹×1", reqLv: 2, mats: { herb_common: 2, herb_ginseng: 1 }, out: { dan_chongmai: 1 }, exp: 60 },
      { id: "r_jz",   name: "炼制九转还魂丹×1", reqLv: 4, mats: { herb_ginseng: 3, herb_common: 4 }, out: { dan_jiuzhuan: 1 }, exp: 140 }
    ],
    forge: [
      { id: "f_wpn",   name: "打造精钢双词条兵刃",   reqLv: 1, mats: { ore_iron: 3 }, gearSlot: "weapon",  tier: 2, exp: 40 },
      { id: "f_arm",   name: "打造锁子双词条护甲",   reqLv: 1, mats: { ore_iron: 3 }, gearSlot: "armor",   tier: 2, exp: 40 },
      { id: "f_boot",  name: "编造乌蚕双词条轻履",   reqLv: 1, mats: { ore_iron: 2, herb_common: 2 }, gearSlot: "boots", tier: 2, exp: 45 },
      { id: "f_trink", name: "雕琢玉髓双词条护符",   reqLv: 2, mats: { ore_iron: 2, herb_ginseng: 1 }, gearSlot: "trinket", tier: 2, exp: 65 },
      { id: "f_wpn3",  name: "百炼寒铁三词条名刃",   reqLv: 3, mats: { ore_xuantie: 1, ore_iron: 4 }, gearSlot: "weapon", tier: 3, exp: 110 },
      { id: "f_arm3",  name: "织造金丝三词条宝甲",   reqLv: 3, mats: { ore_xuantie: 1, ore_iron: 4 }, gearSlot: "armor",  tier: 3, exp: 110 },
      { id: "f_xt",    name: "重铸神兵「玄铁重剑」", reqLv: 3, mats: { ore_xuantie: 3, ore_iron: 5 }, legendary: "xuantie_sword", exp: 180 }
    ],
    cook: [
      { id: "c_chk",  name: "烹制「叫花鸡」", reqLv: 1, mats: { food_fowl: 1, herb_common: 1 }, out: { dish_chicken: 1 }, exp: 35 },
      { id: "c_yudi", name: "烹制「玉笛谁家听落梅」", reqLv: 2, mats: { food_fowl: 1, food_ham: 1 }, out: { dish_yudi: 1 }, exp: 75 }
    ]
  };

  // ---------- 音律古琴战前曲谱 Buff（与美食 Buff 独立叠加） ----------
  JY.MUSIC_SONGS = [
    { id: "song_pingsha", name: "平沙落雁", reqLv: 1, energy: 10, battles: 3, regenHp: 35,
      desc: "曲调舒缓悠远：接下来 3 场战斗每回合末自动恢复 35 点气血。" },
    { id: "song_bihai",   name: "碧海潮生曲", reqLv: 2, energy: 12, battles: 3, defPct: 0.14, shieldPct: 0.22,
      desc: "东海奇音护心：接下来 3 场战斗防御 +14%、护体盾量 +22%。" },
    { id: "song_xiaoao",  name: "笑傲江湖曲", reqLv: 4, energy: 15, battles: 3, startMp: 2, crit: 0.10, synergyBonus: 15,
      desc: "琴箫合鸣傲世：接下来 3 场战斗开局真气 +2、会心 +10%、同心充能加速！" }
  ];

  // ---------- 弈棋 · 珍珑古谱残局（4 局一次性解谜挑战，破局永久获属性/秘宝） ----------
  JY.CHESS_PUZZLES = [
    {
      id: "pz_1", name: "第一局 · 倒脱靴残角", reqLv: 1,
      prompt: "黑棋角上仅剩两口气，白棋虎口相逼。若按常理连回即成死棋，当如何落子？",
      options: [
        { text: "弃掉三子扑入虎口，待白提子后再反扑成活（倒脱靴）", correct: true,  explain: "妙手！弃小取大，白棋外气收紧反被反杀。" },
        { text: "老实连回角上三子，与白棋硬拼外气",                     correct: false, explain: "白棋顺势一扳，黑棋气短一着，满盘皆输。" },
        { text: "脱先去抢大场，放弃角部生死",                           correct: false, explain: "角部实地损失惨重，全局大势已去。" }
      ],
      reward: { exp: 160, attr: { int: 1 }, item: "dan_chongmai" }
    },
    {
      id: "pz_2", name: "第二局 · 双活渡江", reqLv: 2,
      prompt: "黑白双龙缠斗中腹，双方各只剩一只真眼与两处公气，此时抢先紧气者反死。当如何应对？",
      options: [
        { text: "强行破掉白棋唯一真眼，同归于尽",                       correct: false, explain: "刚一入气便成自杀，反让白龙全活。" },
        { text: "占据外围紧要扳位，留公气成「双活」保全大龙",           correct: true,  explain: "高明！退一步保全主力，外势反成胜机。" },
        { text: "随手打吃边上一颗废子",                                 correct: false, explain: "错失先手，白棋反扑点眼，黑龙阵亡。" }
      ],
      reward: { exp: 260, attr: { con: 1 }, item: "treasure_map" }
    },
    {
      id: "pz_3", name: "第三局 · 珍珑自填一气", reqLv: 3,
      prompt: "无崖子所布珍珑棋局，满盘杀机四伏，进退维谷。唯有破釜沉舟方能绝处逢生——",
      options: [
        { text: "闭目自填一气，亲手送死一大块黑棋以换取通天劫材",       correct: true,  explain: "正是当年虚竹破局之妙！置之死地而后生，豁然开朗！" },
        { text: "步步为营力保每一块黑棋不失",                           correct: false, explain: "越想两全越陷泥潭，终成僵局。" },
        { text: "与白棋一路单官收束",                                   correct: false, explain: "中腹大龙已无活路，收官徒劳。" }
      ],
      reward: { exp: 420, attr: { int: 2, luck: 1 }, item: "guqin_score" }
    },
    {
      id: "pz_4", name: "第四局 · 天元镇乾坤", reqLv: 4,
      prompt: "终极古谱「天元劫」，四角均成连环劫，胜负系于中腹天元一子之联络。",
      options: [
        { text: "急于在右下消劫，先拿一角实利",                         correct: false, explain: "白棋顺势提走中腹三子，四角尽失。" },
        { text: "于天元正中落下一子「镇神头」，遥应四角连环劫",         correct: true,  explain: "宗师气度！一子定乾坤，四角化险为夷！" },
        { text: "于边路长考补厚一断",                                   correct: false, explain: "缓手被白抢占天元，全盘崩塌。" }
      ],
      reward: { exp: 650, attr: { int: 2, str: 1, agi: 1 }, item: "dan_jiuzhuan" }
    }
  ];

  // ---------- 策略回合敌人模板（带意图序列 intents，让每场战都能见招拆招） ----------
  // intent type: attack(普攻) | charge(蓄力大招,可被点穴打断/闪身躲避) | iron(铁壁架势,需破甲) | poison(扬毒,需护体/解毒) | flurry(狂风连斩,需闪身/太极反震)
  JY.ENEMIES = {
    shanzei: {
      id: "shanzei", name: "黑风山贼", d: 1, hp: 220, atk: 24, def: 6, exp: 55, gold: 28,
      art: "assets/foe-bandit.webp", desc: "手持钢刀的悍匪，常在城外官道劫道。",
      intents: [
        { type: "attack", name: "横刀猛劈", mul: 1.0, hint: "普通攻击" },
        { type: "charge", name: "蓄力·力劈华山", mul: 1.85, hint: "下回合重劈！可用「点穴手」打断或「闪身」躲避" }
      ]
    },
    bandit_boss: {
      id: "bandit_boss", name: "黑风寨大当家", d: 2, hp: 520, atk: 34, def: 12, exp: 180, gold: 120, boss: true,
      art: "assets/foe-bandit.webp", desc: "啸聚襄阳城外的绿林悍匪头目，刀势沉重狠辣。",
      drop: [{ item: "ore_iron", rate: 1 }, { item: "treasure_map", rate: 0.45 }],
      intents: [
        { type: "attack", name: "断门狂刀", mul: 1.05, hint: "凶猛劈砍并附带 1 层流血", fx: { bleed: 1 } },
        { type: "iron",   name: "横练铁布衫", shield: 110, hint: "架起护体铁壁！可用「破甲」武功击碎" },
        { type: "charge", name: "绝杀·分金断玉", mul: 2.1, hint: "⚠ 致命蓄力斩！强烈建议点穴打断或轻功闪身" }
      ]
    },
    xiangyang_spy_elite: {
      id: "xiangyang_spy_elite", name: "蒙古暗桩死士", d: 3, hp: 820, atk: 46, def: 18, exp: 280, gold: 175, boss: true,
      art: "assets/foe-mongol.webp", desc: "潜伏在襄阳城内的蒙古精锐密探，善用淬毒弯刀。",
      drop: [{ item: "herb_ginseng", rate: 0.8 }, { item: "ore_iron", rate: 1 }],
      intents: [
        { type: "poison", name: "淬毒暗刃", mul: 0.95, fx: { poison: 2 }, hint: "☠ 准备投毒！护体或大还丹可化解" },
        { type: "flurry", name: "狼牙二连斩", mul: 1.50, hint: "疾风连击！闪身或护体减伤最佳" },
        { type: "charge", name: "穿心夺命刺", mul: 2.15, hint: "⚠ 致命突刺蓄力中！点穴可打断" }
      ]
    },
    mongol_commander: {
      id: "mongol_commander", name: "蒙古千夫长·巴图", d: 5, hp: 1780, atk: 66, def: 30, exp: 720, gold: 460, boss: true,
      art: "assets/foe-mongol.webp", desc: "金轮法王座下悍将，率铁骑奇袭襄阳北城箭楼！",
      drop: [{ item: "ore_xuantie", rate: 1 }, { item: "dan_chongmai", rate: 1 }],
      intents: [
        { type: "iron",   name: "玄铁重甲阵", shield: 260, hint: "🛡 铁壁加身！请以破甲外功击碎" },
        { type: "flurry", name: "铁骑狂岚斩", mul: 1.60, fx: { bleed: 1 }, hint: "连环弯刀斩！轻功闪身可规避" },
        { type: "charge", name: "龙象破城刀", mul: 2.40, hint: "⚠ 蓄力破城一击！务必点穴打断或开启闪身/护体" }
      ]
    },
    juxian_elite: {
      id: "juxian_elite", name: "聚贤庄悍客", d: 4, hp: 860, atk: 48, def: 19, exp: 340, gold: 210, boss: true,
      art: "assets/foe-master.webp", desc: "受游氏双雄邀约赴宴的中原悍将，拳脚刚猛。",
      intents: [
        { type: "attack", name: "连环伏虎拳", mul: 1.1, hint: "刚猛拳击" },
        { type: "charge", name: "崩山裂石掌", mul: 2.05, hint: "⚠ 蓄力刚掌！点穴或闪身破解" }
      ]
    },
    dongfang_boss: {
      id: "dongfang_boss", name: "东方不败", d: 8, hp: 5200, atk: 92, def: 48, exp: 2000, gold: 1350, boss: true,
      art: "assets/foe-dongfang.webp", desc: "日月神教教主，葵花宝典身法快如鬼魅！",
      intents: [
        { type: "flurry", name: "葵花绣花连刺", mul: 1.70, fx: { bleed: 2 }, hint: "鬼魅连击！轻功闪身或太极反震克制" },
        { type: "charge", name: "红影夺魄针", mul: 2.50, hint: "⚠ 必杀蓄力！需立刻点穴打断或闪身" }
      ]
    },
    wangcy_boss: {
      id: "wangcy_boss", name: "王重阳·中神通", d: 9, hp: 7600, atk: 102, def: 54, exp: 3400, gold: 2200, boss: true,
      art: "assets/foe-wangcy.webp", desc: "全真祖师，先天功三态轮转，华山之巅终极试炼！",
      intents: [
        { type: "iron",   name: "先天罡气壁", shield: 480, hint: "🛡 铁壁护体！请破甲击穿" },
        { type: "poison", name: "寒阳双绝劲", mul: 1.20, fx: { chill: 2 }, hint: "寒劲侵体！护体或清心化解" },
        { type: "charge", name: "一气化三清", mul: 2.60, hint: "⚠ 宗师蓄力绝学！点穴/闪身缺一不可" }
      ]
    },
    // ---------- 新增 10 位经典原著机制 Boss ----------
    ouyang_ke: {
      id: "ouyang_ke", name: "白驼少主·欧阳克", d: 3, hp: 620, atk: 38, def: 13, exp: 240, gold: 180, boss: true,
      art: "assets/foe-poison.webp", desc: "白驼山少主，摇折扇御毒蛇，身法刁钻诡谲。",
      drop: [{ item: "poison_gall", rate: 0.7 }, { item: "jade_fan", rate: 0.35 }],
      intents: [
        { type: "poison", name: "神驼雪山毒雾", mul: 0.95, fx: { poison: 2 }, hint: "☠ 施放白驼毒雾！护体或清心解毒" },
        { type: "flurry", name: "瞬息千里扇",   mul: 1.45, hint: "折扇连点要害！闪身或反震克制" },
        { type: "charge", name: "灵蛇吐信击",   mul: 1.95, fx: { poison: 1 }, hint: "⚠ 蓄力毒击！点穴可打断" }
      ]
    },
    feng_tiannan: {
      id: "feng_tiannan", name: "佛山恶霸·凤天南", d: 3, hp: 700, atk: 42, def: 16, exp: 290, gold: 230, boss: true,
      art: "assets/foe-bandit.webp", desc: "五虎门掌门，仗势欺人，手中金背大刀沉猛狠毒。",
      drop: [{ item: "ore_iron", rate: 1 }, { item: "dan_chongmai", rate: 0.5 }],
      intents: [
        { type: "iron",   name: "金背横刀架", shield: 130, hint: "🛡 横刀护体！破甲招式击碎最佳" },
        { type: "attack", name: "五虎裂碑斩", mul: 1.15, fx: { bleed: 1 }, hint: "重刀撕裂附带流血" },
        { type: "charge", name: "断门绝户刀", mul: 2.05, hint: "⚠ 蓄力重斩！务必点穴打断或闪身" }
      ]
    },
    mei_chaofeng: {
      id: "mei_chaofeng", name: "铁尸·梅超风", d: 4, hp: 920, atk: 49, def: 16, exp: 380, gold: 240, boss: true,
      art: "assets/foe-poison.webp", desc: "黑风双煞之一，双目失明却听风辨位，九阴白骨爪阴毒无比！",
      drop: [{ item: "herb_ginseng", rate: 0.8 }, { item: "dan_chongmai", rate: 0.6 }],
      intents: [
        { type: "flurry", name: "白骨连环爪", mul: 1.50, fx: { bleed: 2 }, hint: "阴风连抓叠加流血！轻功闪身化解" },
        { type: "poison", name: "摧心阴风掌", mul: 1.05, fx: { poison: 2 }, hint: "☠ 阴毒掌力侵脉！护体/大还丹应对" },
        { type: "charge", name: "九阴锁喉杀", mul: 2.15, fx: { bleed: 2 }, hint: "⚠ 致命锁喉蓄力！点穴截断最佳" }
      ]
    },
    he_taichong: {
      id: "he_taichong", name: "血刀老祖", d: 5, hp: 1180, atk: 56, def: 19, exp: 520, gold: 340, boss: true,
      art: "assets/foe-bandit.webp", desc: "西藏血刀门邪派魔头，血刀诡异狠辣，越是险境招式越毒！",
      drop: [{ item: "ore_xuantie", rate: 0.6 }, { item: "dahuandan", rate: 0.8 }],
      intents: [
        { type: "flurry", name: "血影三连刀", mul: 1.55, fx: { bleed: 2 }, hint: "诡异软刀三连割血！闪身或反震克制" },
        { type: "attack", name: "反手削骨刀", mul: 1.20, fx: { bleed: 1 }, hint: "刁钻怪招，留心气血" },
        { type: "charge", name: "浴血归元斩", mul: 2.20, fx: { bleed: 2 }, hint: "⚠ 血刀蓄力绝杀！点穴可打断" }
      ]
    },
    ao_bai: {
      id: "ao_bai", name: "满洲勇士·鳌拜", d: 5, hp: 1360, atk: 54, def: 26, exp: 560, gold: 390, boss: true,
      art: "assets/foe-mongol.webp", desc: "大清权臣，天生神力兼修十三太保横练金钟罩，铜皮铁骨！",
      drop: [{ item: "ore_xuantie", rate: 0.7 }, { item: "dan_chongmai", rate: 1 }],
      intents: [
        { type: "iron",   name: "十三太保金钟", shield: 240, hint: "🛡 极厚横练铁壁！必须破甲击穿" },
        { type: "attack", name: "裂石虎抱摔",   mul: 1.25, hint: "千斤巨力正面猛砸" },
        { type: "charge", name: "霸王镇岳崩",   mul: 2.25, hint: "⚠ 蓄力毁天一击！点穴或闪身规避" }
      ]
    },
    jiumozhi: {
      id: "jiumozhi", name: "大轮明王·鸠摩智", d: 6, hp: 1720, atk: 64, def: 26, exp: 820, gold: 520, boss: true,
      art: "assets/foe-jinlun.webp", desc: "吐蕃护国法王，以小无相功催动少林七十二绝技与火焰刀，气焰滔天！",
      drop: [{ item: "dan_chongmai", rate: 1 }, { item: "ore_xuantie", rate: 0.75 }],
      intents: [
        { type: "iron",   name: "小无相金刚壁", shield: 230, hint: "🛡 无相罡气护体！用破甲击碎" },
        { type: "flurry", name: "捻花无相指",   mul: 1.55, hint: "指劲连射！轻功闪身或太极反震" },
        { type: "charge", name: "大轮火焰刀",   mul: 2.30, fx: { bleed: 1 }, hint: "⚠ 灼热刀气蓄力！点穴打断或闪身" }
      ]
    },
    miejue_boss: {
      id: "miejue_boss", name: "峨眉掌门·灭绝师太", d: 6, hp: 1680, atk: 68, def: 25, exp: 840, gold: 480, boss: true,
      art: "assets/foe-master.webp", desc: "峨眉第三代掌门，性烈如火，倚天剑与佛光普照凌厉无匹！",
      drop: [{ item: "hanshui_silk", rate: 0.7 }, { item: "dahuandan", rate: 1 }],
      intents: [
        { type: "flurry", name: "灭剑绝剑连斩", mul: 1.60, fx: { bleed: 2 }, hint: "双剑快攻连斩！闪身或护体化解" },
        { type: "attack", name: "佛光普照掌",   mul: 1.30, hint: "纯阳掌力透胸" },
        { type: "charge", name: "倚天断岳剑",   mul: 2.35, hint: "⚠ 绝世剑意蓄力！务必点穴打断" }
      ]
    },
    zuo_lengchan: {
      id: "zuo_lengchan", name: "嵩山盟主·左冷禅", d: 6, hp: 1800, atk: 66, def: 27, exp: 880, gold: 560, boss: true,
      art: "assets/foe-guardian.webp", desc: "五岳盟主野心勃勃，寒冰真气与大嵩阳神掌寒烈并济！",
      drop: [{ item: "ore_xuantie", rate: 0.8 }, { item: "dan_chongmai", rate: 1 }],
      intents: [
        { type: "poison", name: "寒冰真气掌",   mul: 1.15, fx: { chill: 2 }, hint: "❄ 阴寒掌劲侵骨！护体或清心化解" },
        { type: "iron",   name: "嵩岳镇山架",   shield: 240, hint: "🛡 巍峨铁壁！破甲外功克制" },
        { type: "charge", name: "大嵩阳寒冰破", mul: 2.35, fx: { chill: 1 }, hint: "⚠ 冰封杀招蓄力！点穴或闪身规避" }
      ]
    },
    cheng_kun: {
      id: "cheng_kun", name: "混元霹雳手·成昆", d: 7, hp: 2900, atk: 76, def: 34, exp: 1180, gold: 740, boss: true,
      art: "assets/foe-poison.webp", desc: "圆真和尚真身，阴谋颠覆明教与六大派，幻阴指阴毒致命！",
      drop: [{ item: "dan_jiuzhuan", rate: 0.45 }, { item: "ore_xuantie", rate: 1 }],
      intents: [
        { type: "poison", name: "幻阴指暗劲",   mul: 1.10, fx: { poison: 2, chill: 1 }, hint: "☠ 幻阴毒寒双侵！护体/净化应对" },
        { type: "flurry", name: "少林霹雳连拳", mul: 1.60, hint: "迅猛刚拳连击！闪身或反震破解" },
        { type: "charge", name: "混元霹雳绝杀", mul: 2.40, hint: "⚠ 蓄力绝命杀招！立刻点穴打断" }
      ]
    },
    jinlun_boss: {
      id: "jinlun_boss", name: "蒙古国师·金轮法王", d: 7, hp: 4200, atk: 88, def: 44, exp: 1550, gold: 980, boss: true,
      art: "assets/foe-jinlun.webp", desc: "蒙古第一护国法王，龙象般若功练至第十层，金银铜铁铅五轮齐飞！",
      drop: [{ item: "dan_jiuzhuan", rate: 0.6 }, { item: "ore_xuantie", rate: 1 }],
      intents: [
        { type: "iron",   name: "五轮金甲护阵", shield: 320, hint: "🛡 五轮飞旋护体！破甲击碎" },
        { type: "flurry", name: "金银双轮绞杀", mul: 1.66, fx: { bleed: 1 }, hint: "双轮连击！轻功闪身或太极反震" },
        { type: "charge", name: "十层龙象般若", mul: 2.50, hint: "⚠ 十龙十象巨力蓄力！务必点穴打断或闪身" }
      ]
    },
    miao_renfeng_boss: {
      id: "miao_renfeng_boss", name: "金面佛·苗人凤", d: 6, hp: 1750, atk: 65, def: 25, exp: 840, gold: 480, boss: true,
      art: "assets/npc-miaorf.webp", desc: "打遍天下无敌手，苗家剑法刚柔并济、后发先至！",
      drop: [{ item: "dan_chongmai", rate: 1 }, { item: "ore_xuantie", rate: 0.7 }],
      intents: [
        { type: "flurry", name: "苗家连环摘星剑", mul: 1.56, fx: { bleed: 1 }, hint: "剑势连绵！轻功闪身或太极借力应对" },
        { type: "iron",   name: "洗剑敛锋守势",   shield: 220, hint: "🛡 横剑敛气如山！破甲招式可拆" },
        { type: "charge", name: "冲天掌苏秦背剑", mul: 2.32, hint: "⚠ 虚实杀招蓄力中！点穴打断或闪身" }
      ]
    },
    saodiseng_boss: {
      id: "saodiseng_boss", name: "藏经阁·扫地老僧", d: 10, hp: 7200, atk: 98, def: 54, exp: 3600, gold: 2400, boss: true,
      art: "assets/npc-saodiseng.webp", desc: "少室山藏经阁隐世神僧，三尺无形气墙浑若天成，佛法武学皆臻化境！",
      drop: [{ item: "dan_jiuzhuan", rate: 1 }, { item: "ore_xuantie", rate: 1 }],
      intents: [
        { type: "iron",   name: "三尺无形气墙", shield: 520, hint: "🛡 浑厚佛门气墙！需高阶破甲与连携击穿" },
        { type: "flurry", name: "慈悲佛风拂袖", mul: 1.68, fx: { chill: 1 }, hint: "柔劲化刚连绵而至！闪身或护体应对" },
        { type: "charge", name: "菩提无相渡劫指", mul: 2.60, hint: "⚠ 神僧渡劫一指蓄势！务必点穴截脉或闪身" }
      ]
    }
  };
})(window);
