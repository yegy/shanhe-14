(function (root) {
  "use strict";
  const JY = root.JY;
  const hero = "assets/hero-portrait.webp";
  const li = "assets/npc-maiden.webp";
  const elder = "assets/npc-hermit.webp";

  JY.registerQuest("ts_bai", {
    title: "白马啸西风 · 旧毡归路",
    tianshuId: "bai",
    summary: "从大理古道送白马回塞外，随李文秀寻找落单的人。高昌旧门能打开，归来的人未必同路。",
    episodes: [
      {
        id: "bai_ep1",
        title: "第一幕 · 白马拒辔",
        hint: "前往「大理城 · 西门古道」，与李文秀查看白马衔来的旧毡。",
        trigger: { region: "dali", room: "dl_road", npc: "li_wenxiu" },
        steps: [
          { nar: "白马伸嘴咬住李文秀衣带，前蹄仍朝北。你把倒缠的辔绳解开，它立即用鼻尖从驿亭柱后拱出一块毛毡。" },
          { show: { left: hero, right: li, active: "right" }, say: ["李文秀", "它肯等我，却不肯跟我进城。你看蹄边这块毡，它从头一根驿桩嗅到最后一根。"] },
          { show: { active: "left" }, say: ["主角", "毡角绣了三个铃，簇在一起的两针又都磨断了。莫不是旧时赶路的人另有记号？"] },
          { nar: "李文秀把毡挪到马背试披，白马向左一偏，露出铺在内层的一枚錾花小扣。你摘下扣子，它抖了抖鬃毛，不再拉扯衣带。" },
          { show: { active: "right" }, say: ["李文秀", "计爷爷修的扣。若长安西市还有他用的缝毡针，便有人认得白马要回哪一条道。"] },
          { nar: "你把毛毡折回较宽的一面，让马颈露出来。李文秀把扣压在你手中，抬手示意白马朝自己走一步。" },
          { choice: [
            { text: "【替马归旧主】以原扣问路，给李文秀留下整块旧毡", effect: { moral: 8, exp: 125, setFlag: "bai_ep1_done" }, reply: ["李文秀", "等它愿走了我再走。若你先到，计爷爷认得这只扣就够了。"] },
            { text: "【把古路标价】拓下毡角记号卖给商旅，携扣去西市", effect: { moral: -6, exp: 100, gold: 125, setFlag: "bai_ep1_done", setFlag2: "bai_sold_stitches" }, reply: ["主角", "扣子留真的，路图只画到第一根桩。我也要等有人亲口说出第二段。"] }
          ] }
        ]
      },
      {
        id: "bai_ep2",
        title: "第二幕 · 计家空鞍",
        hint: "到「长安城 · 西市胡商街」，拿錾花小扣给计老人看。",
        reqFlag: "bai_ep1_done",
        trigger: { region: "changan", room: "ca_market", npc: "ji_laoren" },
        steps: [
          { nar: "计老人把扣反转扣进一只空鞍，皮扣只剩一半仍合得牢。你替他拉住鞍带，他却用刀割下覆在最外面的整条新皮。" },
          { show: { left: hero, right: elder, active: "right" }, say: ["计老人", "我换过许多次马鞍。白马若遇到旧鞍才肯停，总不能叫它一辈子拖着个空鞍。"] },
          { show: { active: "left" }, say: ["主角", "这个扣眼底下藏了一粒干草籽，像是你从塞外带回来那种。"] },
          { nar: "他把草籽拈碎，从松散的鞍垫下拽出斜缝地图。你撑开图面，他用断皮带指了一处图上没画水的沟。" },
          { ifMate: "guojing", show: { left: "assets/mate-guojing.webp", active: "left" }, say: ["郭靖", "没有画水，也许春天才有水。放羊的人知道水过哪处，咱们先去问他们。"] },
          { show: { left: hero, active: "right" }, say: ["计老人", "问苏普便是。他若说先找羊，你随他去找。跑丢的一只，有时会领你回来见到一群。"] },
          { nar: "你把皮带从瓦片上解开，计老人卷起地图，让没有路的一面朝外，再用新扣把它扣住。" },
          { choice: [
            { text: "【不问旧姓】只借问水的地图，让计老人收回空鞍", effect: { moral: 8, exp: 155, aff: { guojing: 6 }, setFlag: "bai_ep2_done" }, reply: ["计老人", "好。叫那孩子牵白马过沟时莫坐在背上，她总是不听。"] },
            { text: "【押鞍得图】把空鞍写作路线押物，先领驿费再出关", effect: { moral: -7, exp: 120, gold: 170, setFlag: "bai_ep2_done", setFlag2: "bai_saddle_deposit" }, reply: ["计老人", "鞍留得住，人未必留得住。图带稳罢。"] }
          ] }
        ]
      },
      {
        id: "bai_ep3",
        title: "第三幕 · 羊铃隔风",
        hint: "前往「雁门关 · 雪岭旧庄」，与苏普会合，寻找落单的羊群。",
        reqFlag: "bai_ep2_done",
        trigger: { region: "yanmen", room: "ym_snow_lodge", npc: "su_pu" },
        steps: [
          { nar: "苏普把礁石一样的冻土从井口挪开，井下没有水，却传来三声闷铃。你以靴尖支住提桶，一条旧缰正在下方慢慢拉直。" },
          { show: { left: hero, right: "assets/foe-master.webp", active: "right" }, say: ["苏普", "阿曼追羊去了。我在坡上吹了三次哨，前两次都从这里回答，第三次风把它带走了。"] },
          { show: { active: "left" }, say: ["主角", "别再往坡顶吹。把能拨响的铃给我，且听哪一面回得最慢。"] },
          { nar: "你分左右轻敲井砖。苏普把提桶放低一截，第三声铃从桶沿里拐出，正向着地形图上没水的沟。" },
          { show: { active: "right" }, say: ["苏普", "下面到绝壁就是高昌旧门。阿曼若逆着风，李姑娘在那边等她，能看得见白马。"] },
          { nar: "你把地图压在窗台取下一块炭，用炭侧拓出井砖刻的临时水位。苏普将一条旧领巾系在桶绳顶端，给后来者留了回铃的位置。" },
          { choice: [
            { text: "【音律 Lv2】辨井内外两重回音，沿较近的沟先把羊引出来", reqLife: { music: 2 }, effect: { moral: 11, exp: 190, item: "food_ham", setFlag: "bai_ep3_done" }, reply: ["苏普", "这声我听明白了。你走石门那边，羊听着我接着吹。"] },
            { text: "【结绳找回路】替苏普封好井口，持水位记号去会合", effect: { moral: 8, exp: 150, setFlag: "bai_ep3_done" }, reply: ["苏普", "认领巾便认得回来路。有了羊叫，阿曼也能听见。"] },
            { text: "【另售远路】把回铃较慢的一道附会成藏宝口，领银后自行赴会", effect: { moral: -8, exp: 125, gold: 205, setFlag: "bai_ep3_done", setFlag2: "bai_false_pass" }, reply: ["主角", "他们走地图，我走铃音。让白马知道谁是回来领人的便成。"] }
          ] }
        ]
      },
      {
        id: "bai_ep4",
        title: "第四幕 · 高昌门外",
        hint: "到「雁门关 · 关外绝壁」，循水位刻痕与李文秀会合。",
        reqFlag: "bai_ep3_done",
        trigger: { region: "yanmen", room: "ym_cliff", npc: "li_wenxiu" },
        steps: [
          { nar: "你擦净石门角，李文秀托住门页，下面顶着的不是铁销，竟是一把落了齿的旧梳。门页再开一线，白马身后的阿曼正给一只小羊缠蹄。" },
          { show: { left: hero, right: li, active: "right" }, say: ["李文秀", "他们从南边找金子来。旧门后只有这些东西，拿一把梳子回去，会不会反倒说我们把金子藏了？"] },
          { ifFlag: "bai_false_pass", say: ["李文秀", "远处那伙人还在敲石头，白马不肯朝他们那头走。麻烦你挪开北边那块楔，别让小羊听见。"] },
          { unlessFlag: "bai_false_pass", say: ["李文秀", "阿曼听出了苏普的哨，就在这儿等。先把羊递出去罢，愿意接的人都在沟那一侧。"] },
          { show: { active: "left" }, say: ["主角", "先把梳子换出来，它也不该替人顶一扇门。等羊走稳，这块旧门石再让它合上。"] },
          { nar: "你从雪底找一截木楔抵住石门，李文秀拔出旧梳，用身上的毡擦过断齿。阿曼把包着小羊的皮袍展开，袍里落出一册《白马啸西风》。" },
          { show: { active: "right" }, say: ["李文秀", "把书拿走罢。我见到她，原来能同她说许多话，偏有一句不用再说了。"] },
          { nar: "你接住书，转身见白马已自己走到岔路上。李文秀上前为阿曼扶一把辔，自己仍站在马能看见的这一边。" },
          { choice: [
            { text: "【送人出关】替阿曼留回路，把高昌旧物留在原处并收天书", effect: { moral: 12, exp: 365, tianshu: "bai", item: "treasure_map", setFlag: "bai_completed" }, reply: ["李文秀", "这一阵风朝南。少侠回中原时，我等白马送了他们再走。"] },
            { text: "【空门作价】出售石门见闻、保留白马归路，以谢银和天书作交换", effect: { moral: -9, exp: 310, tianshu: "bai", gold: 425, setFlag: "bai_completed", setFlag2: "bai_sold_empty_vault" }, reply: ["李文秀", "他们爱看空门，请看罢。别在路上牵住那匹白马，它有自己想去的地方。"] }
          ] }
        ]
      }
    ]
  });
})(window);
