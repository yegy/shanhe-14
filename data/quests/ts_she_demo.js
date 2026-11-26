/* =====================================================================
   山河十四卷 v1.0 · 示范长篇天书剧本：《射雕英雄传 · 襄阳暗战》（5幕跨城立绘剧场）
   本文件同时作为「外包包 B（其余 13 部天书长线剧本）」的 100% 标准 DSL 范本
   ===================================================================== */
(function (root) {
  "use strict";
  const JY = root.JY;

  JY.registerQuest("ts_she", {
    title: "射雕英雄传 · 襄阳暗战",
    tianshuId: "she",
    summary: "从悦来镇茶楼一桩离奇密闻起，追查襄阳城外古碑线索、入夜潜伏郭府捉拿蒙古细作（支持黄蓉插话与厨艺破局）、暗巷截密信，最终血战北城箭楼击退千夫长！",
    episodes: [
      {
        id: "she_ep1",
        title: "第一幕 · 茶楼风声",
        hint: "前往「悦来镇 · 悦来茶楼」寻百晓生打听襄阳近况",
        trigger: { region: "yuelai", room: "yl_teahouse", npc: "baixiaosheng" },
        steps: [
          { nar: "悦来茶楼二楼微风穿窗，说书人百晓生啪地合拢折扇，神色忽然凝重起来，压低声音把你唤到桌边。" },
          { show: { left: "assets/hero-portrait.webp", right: "assets/npc-baixiaosheng.webp", active: "right" },
            say: ["百晓生", "少侠来得正好！昨夜一名浑身是血的丐帮信使跌进镇口，临晕前只吐出八个字——「城防图泄，古碑有鬼」。"] },
          { show: { left: "assets/hero-portrait.webp", right: "assets/npc-baixiaosheng.webp", active: "left" },
            say: ["主角", "襄阳城乃大宋门户，郭大侠坐镇其中，怎会轻易走漏城防图？莫非城里出了内鬼？"] },
          { show: { left: "assets/hero-portrait.webp", right: "assets/npc-baixiaosheng.webp", active: "right" },
            say: ["百晓生", "正是！那信使怀里掉出半枚草原狼牙印。你要是胆大，不妨先去「襄阳城外 · 乱葬古碑」查探虚实，再进襄阳郭府禀报郭大侠。"] },
          { choice: [
              { text: "【侠义当先】此事关乎襄阳百姓安危，我即刻动身去查古碑！",
                effect: { moral: 8, exp: 60, setFlag: "she_ep1_done" },
                reply: ["百晓生", "好男儿！老夫最敬重你这份肝胆。去城外乱葬古碑务必小心埋伏！"] },
              { text: "【重利慎行】天下没有白跑的腿，先把这半枚狼牙印和盘缠给我再说。",
                effect: { moral: -4, gold: 80, exp: 40, setFlag: "she_ep1_done" },
                reply: ["百晓生", "（苦笑递过碎银）少侠果然精明。拿去罢，查清此事自有大回报！"] }
            ] }
        ]
      },
      {
        id: "she_ep2",
        title: "第二幕 · 古碑截杀",
        hint: "前往「襄阳城外 · 乱葬古碑」与隐世奇人交谈或查探碑文",
        reqFlag: "she_ep1_done",
        trigger: { region: "chengwai", room: "cw_stele", npc: "hermit_stele" },
        steps: [
          { nar: "你拨开齐腰荒草走近乱葬古碑，碑座泥土竟是新翻的！正欲俯身细看，树梢骤然传来三声短促鹰哨！" },
          { show: { left: "assets/hero-portrait.webp", right: "assets/foe-mongol.webp", active: "right" },
            say: ["蒙古暗桩死士", "哼，中原小贼鼻子倒灵！既撞破了我们与城内接头的暗记，今日便留在这里给古碑作伴罢！"] },
          { nar: "话音未落，弯刀寒光已劈面袭来——此人善使淬毒暗刃与蓄力突刺，切记见招拆招！" },
          { battle: "xiangyang_spy_elite", onWinFlag: "she_ep2_done",
            winNar: "你一招制敌逼退暗桩，从其掉落的皮囊中搜出一张密笺，上面竟绘着「襄阳郭府后院古井」的草图！",
            winReward: { exp: 140, gold: 100, item: "herb_ginseng" } }
        ]
      },
      {
        id: "she_ep3",
        title: "第三幕 · 郭府夜捉细作",
        hint: "【入夜（戌时~丑时）· 需任一武功Lv3且完成1次悬赏】前往「襄阳城 · 郭府后院」与黄蓉或郭靖会合查捉内鬼",
        reqFlag: "she_ep2_done",
        reqSkillLv: 3,
        reqBounties: 1,
        trigger: { region: "xiangyang", room: "xy_guofu_yard", time: "night", npc: "huangrong" },
        steps: [
          { nar: "三更梆子敲过，郭府后院桂影斑驳。你与郭靖隐在假山后，只见一名挑水杂役鬼鬼祟祟贴近书房窗棂，袖口晃出一截草原狼牙坠！" },
          { show: { left: "assets/hero-portrait.webp", right: "assets/mate-guojing.webp", active: "right" },
            say: ["郭靖", "（眉头紧锁，压低嗓音）难怪蒙古人屡屡摸清我军换防时辰，内鬼果然藏在府中！少侠，你觉得该立刻拿下还是静观其变？"] },
          { ifMate: "huangrong",
            show: { left: "assets/mate-huangrong.webp", right: "assets/mate-guojing.webp", active: "left" },
            say: ["黄蓉", "（掩嘴狡黠一笑）靖哥哥莫急呀！那厮刚才往井边青石下塞了蜡丸。咱们把真图换成假布防图，引城外那个蒙古千夫长钻进口袋里，岂不妙哉？"] },
          { choice: [
              { text: "【黄蓉奇谋】将计就计调包假布防图，诱敌深入！（需携黄蓉随行或好感≥25）",
                reqAnyMate: "huangrong",
                effect: { moral: 12, exp: 180, aff: { huangrong: 15, guojing: 10 }, setFlag: "she_ep3_done", setFlag2: "she_trap_plan" },
                reply: ["黄蓉", "咯咯，还是你机灵！这计一旦成了，北城箭楼定叫巴图有来无回！"] },
              { text: "【厨艺试探】借口送夜宵进厨房套出幕后上线（需烹饪 ≥ Lv2）",
                reqLife: { cook: 2 },
                effect: { moral: 8, exp: 160, aff: { huangrong: 12 }, setFlag: "she_ep3_done", setFlag2: "she_trap_plan" },
                reply: ["黄蓉", "哟，没想到你这手厨艺还能拿来破案！这盘夜宵香气一散，那细作果然露了马脚！"] },
              { text: "【雷霆出手】飞身点穴当场擒下，拷问暗巷接头人！",
                effect: { moral: 6, exp: 140, aff: { guojing: 8 }, setFlag: "she_ep3_done" },
                reply: ["郭靖", "痛快！他已招认今夜北城箭楼将有蒙古千夫长突袭，咱们速去北城御敌！"] },
              { text: "【暗中交易】放他逃走，趁机勒索蒙古密令与四百两赏金（邪道）",
                effect: { moral: -20, gold: 400, exp: 120, setFlag: "she_ep3_done", setFlag2: "she_evil_route" },
                reply: ["主角", "（冷笑收起沉甸甸的银袋）郭大侠的仁义太重，这江湖还是银子与实力最实在……"] }
            ] }
        ]
      },
      {
        id: "she_ep4",
        title: "第四幕 · 箭楼血战千夫长",
        hint: "【需任一武功Lv4 · 通2处经脉 · 穿戴1件装备】前往「襄阳城 · 郭府正厅」向郭靖请战迎敌",
        reqFlag: "she_ep3_done",
        reqSkillLv: 4,
        reqMeridians: 2,
        reqGear: 1,
        trigger: { region: "xiangyang", room: "xy_guofu_hall", npc: "guojing" },
        steps: [
          { nar: "北城烽火骤燃，鼓声震天！蒙古千夫长巴图亲率铁骑扑至北城箭楼之下，寒光弯刀直指城头大旗！" },
          { show: { left: "assets/hero-portrait.webp", right: "assets/foe-mongol.webp", active: "right" },
            say: ["蒙古千夫长·巴图", "哈哈哈哈！中原无人了吗，竟派一个毛头小子来挡本将的玄铁重甲阵？！"] },
          { show: { left: "assets/hero-portrait.webp", right: "assets/mate-guojing.webp", active: "right" },
            say: ["郭靖", "少侠小心！巴图身披玄铁重甲，须以「破甲」招式击碎铁壁，遇其蓄力破城刀务必「点穴打断」或「轻功闪身」！"] },
          { battle: "mongol_commander", onWinFlag: "she_completed",
            winNar: "巴图惨呼一声坠下云梯，蒙古铁骑仓皇退去！襄阳城头欢声雷动，郭靖与黄蓉并肩走上箭楼，郑重将珍藏的《射雕英雄传》残卷与「白金丝手套」交予你手！",
            winReward: { exp: 420, gold: 350, tianshu: "she", legendary: "jinsi_gloves", aff: { guojing: 18, huangrong: 18 } } }
        ]
      }
    ]
  });
})(window);
