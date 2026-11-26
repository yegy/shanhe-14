/* =====================================================================
   山河十四卷 v1.0 · 示范剧情包：江湖散修专属长线 + 聚贤庄乔峰风波
   本文件同时作为「外包包 C（八大门派/散修/12同道红颜深剧情）」的黄金范本
   ===================================================================== */
(function (root) {
  "use strict";
  const JY = root.JY;

  // 江湖散修专属 3 幕立绘长线（不加入门派也能走出的独立主角传奇）
  JY.registerQuest("sanxiu_arc", {
    title: "江湖散修 · 无名残页血案",
    summary: "不依附八大门派，以天地为师！从悦来茶楼残页奇闻起步，勇闯乱葬古碑悟散手绝艺，终得隐世高人指点重剑无锋之道。",
    episodes: [
      {
        id: "san_ep1",
        title: "散修第一幕 · 天地为师",
        hint: "在「悦来镇 · 悦来茶楼」与百晓生谈论江湖散修之道",
        trigger: { region: "yuelai", room: "yl_teahouse", npc: "baixiaosheng" },
        steps: [
          { show: { left: "assets/hero-portrait.webp", right: "assets/npc-baixiaosheng.webp", active: "right" },
            say: ["百晓生", "哈哈，看你这身打扮，是不打算受名门清规戒律束缚、想做个逍遥江湖的「散修」罢？"] },
          { show: { left: "assets/hero-portrait.webp", right: "assets/npc-baixiaosheng.webp", active: "left" },
            say: ["主角", "名门武学虽成体系，但未免门户之见太深。我倒想凭一双脚走遍天下，集百家奇遇于一身！"] },
          { show: { left: "assets/hero-portrait.webp", right: "assets/npc-baixiaosheng.webp", active: "right" },
            say: ["百晓生", "有志气！百年前「剑魔」与「黄裳」皆是散修成道。城外乱葬古碑下近来有奇人现身，去拜会一番，定有大机缘！"] },
          { choice: [
              { text: "【潜心问道】多谢前辈指点，我这便去乱葬古碑寻访奇人！",
                effect: { exp: 90, gold: 60, item: "dan_chongmai", setFlag: "sanxiu_ep1_done" },
                reply: ["百晓生", "这颗「冲脉丹」赠你护身，莫忘了在「武学与经脉」里打通第一重穴位！"] }
            ] }
        ]
      },
      {
        id: "san_ep2",
        title: "散修第二幕 · 古碑悟散手",
        hint: "前往「襄阳城外 · 乱葬古碑」拜见隐世奇人",
        reqFlag: "sanxiu_ep1_done",
        trigger: { region: "chengwai", room: "cw_stele", npc: "hermit_stele" },
        steps: [
          { nar: "古碑前落叶无风自旋，一名枯瘦老僧正以竹帚在青石地上划出玄妙轨迹，竟暗合「破甲、点穴、闪身」三大散手奥义。" },
          { show: { left: "assets/hero-portrait.webp", right: "assets/npc-hermit.webp", active: "right" },
            say: ["隐世奇人", "阿弥陀佛。门派弟子按部就班，散修却须融会贯通——老衲考你一问：遇敌横练铁壁、又蓄杀招时，当如何应对？"] },
          { choice: [
              { text: "「破甲碎其铁壁，点穴截其蓄力，借连携一击破之！」",
                effect: { exp: 160, attr: { int: 1, luck: 1 }, skill: "kongming", setFlag: "sanxiu_ep2_done" },
                reply: ["隐世奇人", "善哉！孺子可教！这门至柔至空的「空明拳」便传于你，今后还可向老衲请教弹指神通与玄铁剑法！"] },
              { text: "「管他什么花哨架势，我自一力降十会硬劈过去！」",
                effect: { exp: 130, attr: { str: 2 }, skill: "tiesha", setFlag: "sanxiu_ep2_done" },
                reply: ["隐世奇人", "倒也痛快！既然偏爱刚猛毒辣，这路「铁砂掌」拿去防身罢。"] }
            ] }
        ]
      },
      {
        id: "san_ep3",
        title: "散修第三幕 · 重剑问道",
        hint: "击败黑风寨大当家或修为渐成后，再赴「乱葬古碑」向隐世奇人问道",
        reqFlag: "sanxiu_ep2_done",
        trigger: { region: "chengwai", room: "cw_stele", npc: "hermit_stele" },
        steps: [
          { show: { left: "assets/hero-portrait.webp", right: "assets/npc-hermit.webp", active: "right" },
            say: ["隐世奇人", "你气息比初见时沉稳许多，已颇具散修宗师气象。古碑后藏着一缕昔年剑魔遗意，且接老衲三成内力试手罢！"] },
          { battle: "bandit_boss", onWinFlag: "sanxiu_ep3_done",
            winNar: "你以散手连携大破强敌，隐世奇人抚掌大笑，赠你天外寒铁两块与《重剑心得》，从此可在铁匠铺重铸「玄铁重剑」并请教绝学「玄铁剑法」！",
            winReward: { exp: 320, gold: 200, item: "ore_xuantie" } }
        ]
      }
    ]
  });

  // 聚贤庄 · 乔峰豪饮示范剧情（展现重大分支后果）
  JY.registerQuest("juxian_story", {
    title: "天龙前奏 · 聚贤庄义酒",
    summary: "聚贤庄百雄环伺，你是与乔峰共饮绝交酒力战群雄，还是袖手旁观？",
    episodes: [
      {
        id: "jx_ep1",
        title: "聚贤庄 · 义薄云天",
        hint: "前往「聚贤庄 · 聚贤演武厅」寻乔峰",
        trigger: { region: "juxian", room: "juxian_hall", npc: "qiaofeng" },
        steps: [
          { nar: "演武厅中百名武林高手手按兵刃，将乔峰团团围住。乔峰却仰天大笑，连干三碗烈酒，目光如电扫过全场！" },
          { show: { left: "assets/hero-portrait.webp", right: "assets/mate-qiaofeng.webp", active: "right" },
            say: ["乔峰", "这位小兄弟面善得很！今日聚贤庄杀机四伏，你若要与乔某喝绝交酒，便请上来干了这一碗！"] },
          { choice: [
              { text: "【豪气干云】「我敬乔帮主是大英雄！这碗不是绝交酒，是生死酒！」",
                effect: { moral: 15, exp: 200, recruit: "qiaofeng", aff: { qiaofeng: 35 }, setFlag: "juxian_sided_qiao" },
                battle: "juxian_elite",
                winNar: "你与乔峰并肩击退聚贤庄悍客！乔峰虎目含泪大笑：「好兄弟！从此天涯海角，乔某这条命便是你的！」（乔峰已加入同道！）" },
              { text: "【明哲保身】拱手退开，不愿与天下正道为敌。",
                effect: { moral: -5, exp: 90, gold: 120, setFlag: "juxian_neutral" },
                reply: ["乔峰", "（淡然一笑）人各有志，乔某绝不勉强。保重！"] }
            ] }
        ]
      }
    ]
  });
})(window);
