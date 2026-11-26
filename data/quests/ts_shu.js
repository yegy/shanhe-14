(function (root) {
  "use strict";
  const JY = root.JY;
  const hero = "assets/hero-portrait.webp";
  const chen = "assets/npc-chenjl.webp";
  const huo = "assets/npc-huoqt.webp";
  const elder = "assets/npc-hermit.webp";

  JY.registerQuest("ts_shu", {
    title: "书剑恩仇录 · 白毡寸诺",
    tianshuId: "shu",
    summary: "红花会的书札走漏了驼队口令。随陈家洛与霍青桐过西市、护关外撤路，再处置盟书和欠下的诺言。",
    episodes: [
      {
        id: "shu_ep1",
        title: "第一幕 · 空盏红花",
        hint: "前往「洛阳城 · 白马客栈」，向陈家洛查问红花会来信。",
        trigger: { region: "luoyang", room: "ly_inn", npc: "chen_jialuo" },
        steps: [
          { nar: "陈家洛将第二套茶杯从木盘中逐一翻正，空杯底下掉出一片干花。你用茶匙把花拢起，盘沿上有一道用指甲划出的顿笔。" },
          { show: { left: hero, right: chen, active: "right" }, say: ["陈家洛", "这一套本该等西来的客。昨夜只到了一片花，其余杯口皆向下，我便知道他们停在城外。"] },
          { show: { active: "left" }, say: ["主角", "花瓣浸过两次茶，一次甜，一次涩。中间难道有人换了信，却没换杯？"] },
          { nar: "他合拢折扇，从扇骨拔下一根短签。你拿来与盘沿的顿笔相对，两头正好指向写有「西市」的茶封角。" },
          { show: { active: "right" }, say: ["陈家洛", "西市等的是霍姑娘。她调过人马，空了三处才留出一条路。你见她时只说缺第三盏，其余让她作主。"] },
          { nar: "你将茶杯一只只套回去，只留刻过痕的那只；陈家洛伸手回来，又将短签摆在杯沿彼此都看得见的一面。" },
          { choice: [
            { text: "【赴约相援】替陈家洛送茶封原件，先听霍青桐调度", effect: { moral: 8, exp: 125, setFlag: "shu_ep1_done" }, reply: ["陈家洛", "多谢。少侠不必许我什么，见到她，依她的话行事。"] },
            { text: "【留签议报】持茶封上路，扣一枚短签作索酬凭据", effect: { moral: -6, exp: 100, gold: 130, setFlag: "shu_ep1_done", setFlag2: "shu_short_tally" }, reply: ["主角", "我替人冒一次险，短签便替我留一次话。"] }
          ] }
        ]
      },
      {
        id: "shu_ep2",
        title: "第二幕 · 驼铃换结",
        hint: "到「长安城 · 西市胡商街」，向霍青桐报出第三盏的暗号。",
        reqFlag: "shu_ep1_done",
        trigger: { region: "changan", room: "ca_market", npc: "huo_qingtong" },
        steps: [
          { nar: "你报出暗号，霍青桐将驼铃一摘，用缰尾把铃口堵住。旁边驼夫依次牵走两匹牲口，剩下那匹鞍上拴着两根同色绳。" },
          { show: { left: hero, right: huo, active: "right" }, say: ["霍青桐", "右边是领路的结，左边是误人的结。我若叫你牵一匹走，你先问我要不要让第三个人看见。"] },
          { show: { active: "left" }, say: ["主角", "那就叫左边的结先出城。右边留下，给背了干粮的小队换一道门走。"] },
          { nar: "霍青桐拨开驼鞍底厚毡，用木块撑住塌下的镫带。你把茶封塞入夹缝，顺手托住从毡里滑出的一枚折尾木箭。" },
          { ifMate: "zhaomin", show: { left: "assets/mate-zhaomin.webp", active: "left" }, say: ["赵敏", "霍姑娘特意把空驼领到街心，等的是那个会问载了多少货的人。这一问，往往比三封密报还值钱。"] },
          { show: { left: hero, active: "right" }, say: ["霍青桐", "箭尾朝外，给雁门向导看。再留一步空地给后面的人，那里有小孩迈不过沟。"] },
          { nar: "你把木箭别在靠外的缰扣，霍青桐交换左右驼铃，捻住铃舌才松开最后那个结。" },
          { choice: [
            { text: "【弈棋 Lv2】以弃子换路，先送空驼过岗并守住撤离口", reqLife: { chess: 2 }, effect: { moral: 11, exp: 190, item: "jade_fan", setFlag: "shu_ep2_done" }, reply: ["霍青桐", "你看到了空处。给我留个活眼，人慢些也能到。"] },
            { text: "【护送驼队】按霍青桐信号护后段，持木箭出关", effect: { moral: 8, exp: 155, setFlag: "shu_ep2_done" }, reply: ["霍青桐", "路窄。你不必赶得比谁快，替我看一看谁掉在后头。"] },
            { text: "【假报货重】拿两份通关账套走差价，照旧把木箭送给向导", effect: { moral: -8, exp: 125, gold: 190, setFlag: "shu_ep2_done", setFlag2: "shu_caravan_margin" }, reply: ["主角", "两边都以为自己的是实账。人照旧走，账等他们自己去合。"] }
          ] }
        ]
      },
      {
        id: "shu_ep3",
        title: "第三幕 · 关前落毡",
        hint: "到「雁门关 · 关外绝壁」，将折尾木箭交给驼队向导。",
        reqFlag: "shu_ep2_done",
        trigger: { region: "yanmen", room: "ym_cliff", npc: "caravan_runner" },
        steps: [
          { nar: "向导趴在崖路转角，把白毡卷塞到石角底下。你递去木箭，他以断尾顶进卷轴，外层白毡松开，里边那一层是土黄色的。" },
          { show: { left: hero, right: elder, active: "right" }, say: ["驼队向导", "都在等白毡过坡。白毡先过，人从另一面走。绳子一放，你听到响也别转头。"] },
          { show: { active: "left" }, say: ["主角", "石坎有人骑马等。若白毡一路滚进沟，他们烧了退路，怎么办？"] },
          { nar: "向导将白毡一角系到残枯木上。你扯着土黄毡遮住队尾一双草鞋，草鞋的主人跨过沟，回手托了一把下一个孩子。" },
          { show: { active: "right" }, say: ["驼队向导", "我守石坎你数人。陈舵主在长安雪灯客栈，登门给他看毡内那行字，才晓得该把信交谁。"] },
          { nar: "正待收绳，山道马蹄如雷，追缉红花会的骁骑统领已率精锐抢上石坎，弯刀直劈断后众人！" },
          { battle: "mongol_commander", healBetween: 0.35, winReward: { exp: 180, gold: 120 }, winNar: "你横刃守住窄坎击退追骑先锋，队尾老幼悉数平安跨过深沟！" },
          { show: { left: hero, right: elder, active: "right" }, nar: "你数到最后一口水袋，将箭重新插回卷轴，白毡立时抖落下去。向导从腰里翻出一卷新绳，把空卷轴留在原处。" },
          { choice: [
            { text: "【断后清点】等人过完再退，留下一条能循回的藏身线", effect: { moral: 9, exp: 165, item: "jinchuang", setFlag: "shu_ep3_done" }, reply: ["驼队向导", "一个也没少。给陈舵主看字时，也请他把人数记全。"] },
            { text: "【白毡作伪】留下空毡误导追兵，带走他们扔下的盘缠", effect: { moral: -7, exp: 130, gold: 225, setFlag: "shu_ep3_done", setFlag2: "shu_seized_pay" }, reply: ["主角", "白毡给他们看，带字的跟我走。追兵若折回来，你只说银袋掉进沟了。"] }
          ] }
        ]
      },
      {
        id: "shu_ep4",
        title: "第四幕 · 扇骨有书",
        hint: "返回「长安城 · 雪灯客栈」，向陈家洛交还驼队消息。",
        reqFlag: "shu_ep3_done",
        trigger: { region: "changan", room: "ca_inn", npc: "chen_jialuo" },
        steps: [
          { nar: "陈家洛把折扇拆成两把空骨。你拿左一片压住毡角，右一片刚入纸缝，扇布内夹着的盟书便缓缓滑下来。" },
          { show: { left: hero, right: chen, active: "right" }, say: ["陈家洛", "我总想一句话换得天下安静。霍姑娘先多走了一道坡，才把该我送的人送出来。"] },
          { show: { right: huo, active: "right" }, say: ["霍青桐", "我走的是人走得通的路。你若真要许话，把沙里那双草鞋的人也写到纸上来。"] },
          { ifFlag: "shu_seized_pay", say: ["霍青桐", "追兵数过空钱袋，又回来找了一遍。走在末尾的两户，等到天亮才翻过山坳。"] },
          { unlessFlag: "shu_seized_pay", say: ["霍青桐", "向导照你留的线找到最后两户时，火还没落。我听着一阵铃，数得人一个也没有少。"] },
          { nar: "你提笔写下人数，笔尖掠过早写好的落款。陈家洛摘掉压纸的红花，挑开一处重新缝过的扇面。" },
          { show: { active: "left" }, say: ["主角", "这张盟书留在客舍。旁边这册记着人如何走出来，倒可送给肯照着走的人。"] },
          { nar: "陈家洛把《书剑恩仇录》抽离扇面，不慎碰翻了墨碟，霍青桐伸起袖沿，替他拦住了漫向姓名的墨水。" },
          { show: { right: chen, active: "right" }, say: ["陈家洛", "幸而字皆在。少侠若要天书，就从还写得清的这一角接去。"] },
          { choice: [
            { text: "【以人重于盟】归还两边署名的旧约，传下天书和驼队故事", effect: { moral: 12, exp: 375, tianshu: "shu", item: "treasure_map", setFlag: "shu_completed" }, reply: ["霍青桐", "毡我留着给人裹身，写了字的纸劳你带好。"] },
            { text: "【旧诺作价】收存盟书的谈判底本，携天书与谢银离开", effect: { moral: -9, exp: 315, tianshu: "shu", gold: 430, setFlag: "shu_completed", setFlag2: "shu_private_treaty" }, reply: ["陈家洛", "我认那上头有我的名字。再有人开价，先叫他看看纸上另有多少人。"] }
          ] }
        ]
      }
    ]
  });
})(window);
