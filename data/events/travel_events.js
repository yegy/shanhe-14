/* =====================================================================
   山河十四卷 v1.0 · 跨城旅途随机奇遇池（10 种鲜活江湖路遇，让闯荡大世界活起来）
   ===================================================================== */
(function (root) {
  "use strict";
  const JY = root.JY;

  JY.TRAVEL_EVENTS = [
    {
      id: "tr_escort", title: "官道劫镖", tag: "侠义",
      art: "assets/foe-bandit.webp",
      desc: "行至半途荒坡，忽见一伙蒙面悍匪围住福威镖局的红旗镖车，镖头肩头中刀，眼看便要撑不住！",
      choices: [
        { text: "⚔ 拔刀相助，击退劫匪护镖", battle: "shanzei",
          winReward: { moral: 8, exp: 95, gold: 85 },
          winNar: "你三两招击溃劫匪，镖头抱拳重谢，奉上酬银 85 两！" },
        { text: "💊 抛去一包金疮药助其脱险，自己不恋战（耗金疮药×1）", reqItem: "jinchuang",
          effect: { moral: 5, exp: 75, gold: 45 },
          msg: "镖师接药止血杀出重围，临别高声赞你义气！" },
        { text: "绕道山林避开是非，继续赶路", effect: {}, msg: "你勒马绕行林间小径，平安抵达目的地。" }
      ]
    },
    {
      id: "tr_merchant", title: "西域神秘行商", tag: "奇珍",
      art: "assets/npc-baixiaosheng.webp",
      desc: "路旁驼队歇脚，一名碧眼胡商见你气度不凡，压低声音掀开毡布：「少侠，急着赶路脱手一批好货，半价结个善缘！」",
      choices: [
        { text: "💰 120 两抢购「冲脉丹」×1（原价 240 两）", reqGold: 120,
          effect: { gold: -120, item: "dan_chongmai" },
          msg: "胡商哈哈一笑，将封蜡完好的冲脉丹递到你手中。" },
        { text: "💰 110 两抢购「天外寒铁」×1（原价 220 两）", reqGold: 110,
          effect: { gold: -110, item: "ore_xuantie" },
          msg: "沉甸甸的玄色奇矿入手冰凉，正是绝佳锻造神料！" },
        { text: "💰 80 两买下「残破藏宝图」×1（原价 150 两）", reqGold: 80,
          effect: { gold: -80, item: "treasure_map" },
          msg: "你收起泛黄藏宝图，准备寻机一探究竟。" },
        { text: "拱手谢绝，继续前行", effect: {}, msg: "你向胡商拱手告别，策马继续上路。" }
      ]
    },
    {
      id: "tr_wounded_hermit", title: "古庙负伤高人", tag: "奇遇",
      art: "assets/npc-hermit.webp",
      desc: "你在官道破庙避风，竟见一名白发老者靠柱喘息，胸口带毒掌印，身旁散落几卷发黄武学札记。",
      choices: [
        { text: "💊 赠予「金疮药」并替他运功护脉（耗金疮药×1）", reqItem: "jinchuang",
          effect: { moral: 10, exp: 185, item: "dan_chongmai" },
          msg: "老者服药稳住内息，大喜之下指点你三招破敌心得，并赠你冲脉丹一粒！" },
        { text: "🔥【炼丹 Lv2】就地采草配解毒散相救", reqLife: { alchemy: 2 },
          effect: { moral: 12, exp: 230, attr: { con: 1 } },
          msg: "你妙手解毒令老者叹服，他以精纯内力替你疏通经脉，根骨永久 +1！" },
        { text: "趁机顺走几两散碎银钱便走", effect: { moral: -10, gold: 90 },
          msg: "你暗中摸走一袋散银匆匆离去，心中隐有不安。" }
      ]
    },
    {
      id: "tr_tea_gossip", title: "十里茶寮听风", tag: "线索",
      art: "assets/npc-baixiaosheng.webp",
      desc: "道旁茅草茶寮炊烟袅袅，几名走镖汉子正高谈阔论天下大事，你不妨坐下歇一口茶，顺便打探消息。",
      choices: [
        { text: "🍵 花 10 两请众人喝茶，打听江湖秘闻（+20精力 +随机剧情线索）", reqGold: 10,
          effect: { gold: -10, exp: 60 },
          onPick: function () {
            JY.S.P.energy = Math.min(JY.S.P.maxEnergy, JY.S.P.energy + 20);
            const openQ = Object.values(JY.QUESTS).find(q => q.episodes.some(JY.Story.meetsRequirements));
            const ep = openQ && openQ.episodes.find(JY.Story.meetsRequirements);
            if (ep) JY.addLog(`🍵 茶客低声透露线索：【${openQ.title}】— ${ep.hint}`, "talk");
          },
          msg: "一杯热茶下肚，精力大复，还顺道听来一条鲜活的江湖风声！" },
        { text: "只喝凉水歇脚（免费恢复 12 点精力）", effect: {},
          onPick: function () { JY.S.P.energy = Math.min(JY.S.P.maxEnergy, JY.S.P.energy + 12); },
          msg: "稍作歇息后你精神一振，继续踏上行程。" }
      ]
    },
    {
      id: "tr_chess_stall", title: "路边残局棋摊", tag: "雅趣",
      art: "assets/npc-hermit.webp",
      desc: "古槐树下摆着一盘「七星聚会」江湖残局，摆摊老叟捋须笑道：「十两银子一局，破得开老夫赔你十倍彩头！」",
      choices: [
        { text: "♟【弈棋 Lv2】一眼看破暗劫，落子破局赢彩头！", reqLife: { chess: 2 },
          effect: { gold: 130, exp: 120 },
          msg: "三步之后老叟目瞪口呆，拱手认输奉上 130 两彩银！" },
        { text: "♟ 花 10 两试手切磋，顺便精进棋艺", reqGold: 10,
          effect: { gold: -10, exp: 75 },
          onPick: function () { if (JY.gainLifeExp) JY.gainLifeExp("chess", 35); else JY.S.P.lifeExp.chess = (JY.S.P.lifeExp.chess || 0) + 35; },
          msg: "虽未全胜却学到几手奇招，弈棋感悟大增！" },
        { text: "笑笑走开，不贪小利", effect: {}, msg: "你微微一笑转身离去。" }
      ]
    },
    {
      id: "tr_ambush", title: "山道黑影截杀", tag: "险境",
      art: "assets/foe-bandit.webp",
      desc: "山谷雾起，数道寒光从林梢扑落！竟是听闻你身怀重宝的江湖绿林悍匪半路设伏！",
      choices: [
        { text: "⚔ 正面迎敌，杀他个片甲不留！", battle: "canal_robber",
          winReward: { exp: 130, gold: 95, item: "ore_iron" },
          winNar: "你干净利落击溃伏兵，缴获百炼精铁与一袋盘缠！" },
        { text: "💨 施展轻功抽身掠过山坡（-6精力）", effect: { exp: 40 },
          onPick: function () { JY.S.P.energy = Math.max(0, JY.S.P.energy - 6); },
          msg: "你身法如烟掠出包围圈，令伏兵扑了个空！" }
      ]
    },
    {
      id: "tr_herb_valley", title: "幽谷奇药灵泉", tag: "采掘",
      art: "assets/scene-wild.webp",
      desc: "马蹄踏过溪畔松林，一阵清冽药香扑鼻而来——山岩缝间竟生长着几株难得一见的野山参与金银草！",
      choices: [
        { text: "🌿 驻足采药并饮一口灵泉（+草药/老参 +气血恢复）",
          effect: { item: "herb_ginseng", exp: 55 },
          onPick: function () {
            const st = JY.getStats(JY.S.P);
            JY.S.P.inv.herb_common = (JY.S.P.inv.herb_common || 0) + 2;
            JY.S.P.hp = Math.min(st.maxHp, JY.S.P.hp + 120);
          },
          msg: "你采得长白老参×1、金银草×2，饮泉后精神焕发！" },
        { text: "不耽误行程，直接策马而过", effect: {}, msg: "你记下山谷方位，继续快马赶路。" }
      ]
    },
    {
      id: "tr_music_scholar", title: "竹亭落魄琴师", tag: "雅趣",
      art: "assets/npc-hermit.webp",
      desc: "溪边竹亭中一位落魄琴师抱琴叹息，琴弦已断两根，正缺盘缠修琴。",
      choices: [
        { text: "🎵【音律 Lv2】替他重张琴弦并合奏一曲", reqLife: { music: 2 },
          effect: { moral: 6, exp: 140, item: "guqin_score" },
          msg: "琴师听罢拍案称绝，将珍藏的《清心普善残谱》慷慨相赠！" },
        { text: "💰 赠他 30 两银子修琴结缘", reqGold: 30,
          effect: { gold: -30, moral: 8, exp: 110 },
          msg: "琴师感激涕零，赠你一曲清音壮行，你心境澄明修为大增！" },
        { text: "默默听罢残曲离去", effect: {}, msg: "你在溪声与残弦中驻足片刻，继续赶路。" }
      ]
    }
  ];
})(window);
