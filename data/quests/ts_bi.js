(function (root) {
  "use strict";
  const JY = root.JY;
  const hero = "assets/hero-portrait.webp";
  const elder = "assets/npc-hermit.webp";
  const yuan = "assets/foe-master.webp";
  const wen = "assets/npc-heroine.webp";

  JY.registerQuest("ts_bi", {
    title: "碧血剑 · 蛇钩旧字",
    tianshuId: "bi",
    summary: "武当南岩揭出一片残剑拓痕。与袁承志、温青青和何红药逐层核对金蛇郎君的遗物。",
    episodes: [
      {
        id: "bi_ep1",
        title: "第一幕 · 南岩揭纸",
        hint: "到「武当山 · 南岩挂剑台」，与守廊道人查看壁上暗痕。",
        trigger: { region: "wudang", room: "wd_nanyan", npc: "old_swordkeeper" },
        steps: [
          { nar: "你扶住被山风掀起的油纸，守廊道人用湿帚按平另一角。底下原有一道浅槽，全长不过一尺，末梢却分成了三尖。" },
          { show: { left: hero, right: "assets/npc-taoist.webp", active: "right" }, say: ["守廊道人", "昨日有人说是镇殿的剑，伸手要把它凿出来。石槽够浅，倒够把凿剑人的脸都照清。"] },
          { show: { active: "left" }, say: ["主角", "剑尖曲向侧面。若真是一口金蛇剑，凿石头不如先问认得它的人。"] },
          { nar: "道人扳动半块砖，你以袍襟兜住滑出的铜拓。他换手托砖，你便看见红绳上夹着一只写有华山的旧信封。" },
          { show: { active: "right" }, say: ["守廊道人", "袁少侠前日替老人家送信，上崖时腰间正有一把剑。把这信递还给他，再看他肯不肯扶你过石眼。"] },
          { nar: "你捻开裹拓的红绳，道人将砖推回暗槽。砖角蹭下一层石粉，沾在铜拓尾端，显出一枚短蛇的眼。" },
          { choice: [
            { text: "【守印归信】封好石槽，携旧信上华山逐一核实", effect: { moral: 8, exp: 120, setFlag: "bi_ep1_done" }, reply: ["守廊道人", "把他原来的信给他，我这里便只剩一阵风。"] },
            { text: "【拓印待价】留下空纸迷惑寻宝人，收存真拓与信封", effect: { moral: -7, exp: 100, gold: 130, setFlag: "bi_ep1_done", setFlag2: "bi_kept_impression" }, reply: ["主角", "等他们在石下再挖一层，我与认剑的人谈完也不迟。"] }
          ] }
        ]
      },
      {
        id: "bi_ep2",
        title: "第二幕 · 崖上验钩",
        hint: "前往「华山 · 思过崖」，请袁承志用剑验看铜拓。",
        reqFlag: "bi_ep1_done",
        trigger: { region: "huashan", room: "hs_siguoya", npc: "yuan_chengzhi" },
        steps: [
          { nar: "袁承志把金蛇剑用布托住，剑尖不肯安安稳稳平躺，总朝石面翘起。你垫了两枚碎瓦，铜拓才能紧挨剑身，不被钩棱挑远。" },
          { show: { left: hero, right: yuan, active: "right" }, say: ["袁承志", "真剑在这一处缺了针尖大的一点。铜上的蛇眼比它全，这拓本倒比我见着的剑还老。"] },
          { show: { active: "left" }, say: ["主角", "蛇眼底下有个温字。拓它时，剑是为一个人留下，还是为一家人留下？"] },
          { nar: "袁承志把布朝里折，裹进半截刃，换一手从剑鞘底摸出一截女式旧带。你将带结横过铜片，缺针尖的那处刚好顶在一个「青」字旁。" },
          { ifMate: "linghu", show: { left: "assets/mate-linghu.webp", active: "left" }, say: ["令狐冲", "这眼比华山的石眼还小，偏藏得住许多麻烦。袁兄若要下崖，我请你喝杯看不见蛇的酒。"] },
          { show: { left: hero, active: "right" }, say: ["袁承志", "先去西市找青青。隔着剑说话容易听岔，带子还她，让她来认。"] },
          { nar: "你把拓印塞回信封。袁承志抬手让你先过最窄一段，剑钩勾住信封封线，替你截下了那根被石缝拉住的丝。" },
          { choice: [
            { text: "【护旧物】依袁承志所请，只把带结和印迹交还温青青", effect: { moral: 8, exp: 150, aff: { linghu: 6 }, setFlag: "bi_ep2_done" }, reply: ["袁承志", "她见到这条带，自会把话说完。剑留在我这里便好。"] },
            { text: "【收剑谱短抄】用真拓换取金蛇剑势的图样，再带旧物赴西市", effect: { moral: -7, exp: 125, item: "ore_iron", setFlag: "bi_ep2_done", setFlag2: "bi_snake_copy" }, reply: ["主角", "图我卷上了。旧带另裹一层，等见到肯认它的人再拆。"] }
          ] }
        ]
      },
      {
        id: "bi_ep3",
        title: "第三幕 · 青带两结",
        hint: "前往「长安城 · 西市胡商街」，将金蛇旧带交给温青青。",
        reqFlag: "bi_ep2_done",
        trigger: { region: "changan", room: "ca_market", npc: "wen_qingqing" },
        steps: [
          { nar: "温青青抽去带结里一根旧丝，再拉出几根新丝。你替她捉住散落的一端，只见带面有两处极近的灼痕，一深一浅。" },
          { show: { left: hero, right: wen, active: "right" }, say: ["温青青", "爹每回折带都折两道。姓温的人只学过一道，便敢指着它说他欠了本家一口剑。"] },
          { show: { active: "left" }, say: ["主角", "深印与铜拓同岁。另一头似乎留着谁的短签，倒像只拆开了一半。"] },
          { nar: "她把青带覆在市口铜灯上，浅印旁渐露出「红药」两笔。你托着带边不使它卷过火口，另有一纸从夹里滑到她鞋尖。" },
          { show: { active: "right" }, say: ["温青青", "她也该认一认这张旧纸。去南岩给她看，你别先说我肯原谅谁。"] },
          { nar: "你把纸摊到板凳上，温青青用签首点住信上日期，她另一只手将两处带结重新系好。" },
          { choice: [
            { text: "【炼丹 Lv2】辨出旧药斑的先后，原封存证送往南岩", reqLife: { alchemy: 2 }, effect: { moral: 10, exp: 185, item: "herb_ginseng", setFlag: "bi_ep3_done" }, reply: ["温青青", "先后你说得清，便别替他们去写该相恨多久。"] },
            { text: "【请两家见面】留好青带折痕，带信找何红药当面核对", effect: { moral: 8, exp: 150, setFlag: "bi_ep3_done" }, reply: ["温青青", "信尾别沾油。我娘当年收它时，怕字洇，放了三层布。"] },
            { text: "【以名换宝】留信尾副本，向温家索回保存遗物的银两", effect: { moral: -8, exp: 125, gold: 195, setFlag: "bi_ep3_done", setFlag2: "bi_wen_bargain" }, reply: ["温青青", "你真要拿姓字压价，出去压，莫压在我爹那一笔上。"] }
          ] }
        ]
      },
      {
        id: "bi_ep4",
        title: "第四幕 · 何人留字",
        hint: "返回「武当山 · 南岩挂剑台」，把署名信件交给何红药。",
        reqFlag: "bi_ep3_done",
        trigger: { region: "wudang", room: "wd_nanyan", npc: "he_hongyao" },
        steps: [
          { nar: "何红药将信贴在廊柱上，先按住「红」字，才往下读。你用掌背挡住风，纸仍从她指下抖出一寸，露出与铜拓同形的钩角。" },
          { show: { left: hero, right: elder, active: "right" }, say: ["何红药", "当年他写字也这样，前一笔直，后一笔躲开去。那时我只当他怕墨沾手。"] },
          { ifFlag: "bi_wen_bargain", say: ["何红药", "温家先递来半张纸，要我认。他们说你把有姓名的那半留在了市口，我只好亲自来认全。"] },
          { unlessFlag: "bi_wen_bargain", say: ["何红药", "青青自己叫人送信，说原本在你手里。她既没替我烧掉，我也不叫你替我藏一笔。"] },
          { show: { right: yuan, active: "right" }, say: ["袁承志", "剑在此。你要砸，先容我卸下剑鞘，鞘里还有姑娘家要带回去的物事。"] },
          { nar: "何红药以铜拓套住剑钩，钩尾一挑，石槽侧面应声露出一道窄缝。你伸手托住掉出的布包，布上另缝了一张字条。" },
          { nar: "陡听廊外双鞘撞响，一名尾随窥伺金蛇遗宝的双鞘悍客纵身扑入挂剑台，伸爪便夺布包！" },
          { battle: "rare_copper_sheath", healBetween: 0.35, winReward: { exp: 195, gold: 130 }, winNar: "你与袁承志剑掌相合震退夺宝悍客，稳稳护住金蛇遗包！" },
          { show: { left: hero, active: "left" }, say: ["主角", "旧剑归剑。包里是当年记下的往来和《碧血剑》，最末一页留了两行未填。"] },
          { nar: "她抽走那张缝条，把一半纸留在袁承志袖边；你从轻下来的布包里取书，抖出夹在封面里的几粒灰。" },
          { show: { right: elder, active: "right" }, say: ["何红药", "空行不必逼谁补。我把写过的认了，余下的请你自己收着。"] },
          { choice: [
            { text: "【遗物还人】归还青带与旧信，受天书与南岩护身宝甲", effect: { moral: 12, exp: 390, tianshu: "bi", legendary: "tiancan_armor", setFlag: "bi_completed" }, reply: ["袁承志", "替我把布包口留半寸。也许有人还想来，把自己的字放进去。"] },
            { text: "【留拓作价】用暗槽钥样向守廊人换银，携天书离去", effect: { moral: -9, exp: 330, tianshu: "bi", gold: 460, setFlag: "bi_completed", setFlag2: "bi_sold_slot" }, reply: ["何红药", "石头随你作价，旧信我带走。且看他们能从空槽里凿出甚么来。"] }
          ] }
        ]
      }
    ]
  });
})(window);
