(function (root) {
  "use strict";
  const JY = root.JY;
  const hero = "assets/hero-portrait.webp";
  const elder = "assets/npc-hermit.webp";
  const hu = "assets/npc-hufei.webp";

  JY.registerQuest("ts_fei", {
    title: "飞狐外传 · 一盏留药",
    tianshuId: "fei",
    summary: "随胡斐追查一碗没喝完的热汤，从道旁茶摊追到西市，再往雪岭替程灵素保住能开口的证人。",
    episodes: [
      {
        id: "fei_ep1",
        title: "第一幕 · 热汤半碗",
        hint: "前往「悦来镇 · 福来客栈」，与胡斐查看孩子留下的汤碗。",
        trigger: { region: "yuelai", room: "yl_inn", npc: "hu_fei" },
        steps: [
          { nar: "孩子两指夹着碗沿，热汤洒了一领口。胡斐替他托住碗底，你将一张破凳拉过来，孩子却转身踩泥出了檐，桌下只剩一双草鞋。" },
          { show: { left: hero, right: hu, active: "right" }, say: ["胡斐", "人饿成这样，碗都不敢端紧。他家那几口人可曾欠着凤老爷的汤钱？"] },
          { show: { active: "left" }, say: ["主角", "碗底写着钟，我在襄阳道上见过这家的摊。孩子来时，还有一辆车把辙往那边压。"] },
          { nar: "胡斐用刀柄挑起草鞋，你顺着鞋绳抽出一截写有「凤记」的布票。布票背面一笔向下拖了很长，像是写字的人被人猛然拽开。" },
          { show: { active: "right" }, say: ["胡斐", "他要再走公道，手里得有一张没被人夺走的票。少侠也肯为不识字的人走这一趟么？"] },
          { nar: "掌柜把门坐抵进旧槽，胡斐回身将碗端入灶房温着。你把两只鞋一起挂到门边，鞋影下恰好能夹稳布票。" },
          { choice: [
            { text: "【替孩子问话】给他留汤和鞋，记下布票上的字去官道茶摊", effect: { moral: 8, exp: 105, item: "jinchuang", setFlag: "fei_ep1_done" }, reply: ["胡斐", "汤我看着。那张票，见到钟婆婆再拿出来。"] },
            { text: "【查凤家赏账】以找回布票为名收下脚钱，带副票上路", effect: { moral: -6, exp: 85, gold: 105, setFlag: "fei_ep1_done", setFlag2: "fei_vendor_contract" }, reply: ["主角", "取票的人若也来了，叫他预备一份能与我说话的价钱。"] }
          ] }
        ]
      },
      {
        id: "fei_ep2",
        title: "第二幕 · 车辙压碗",
        hint: "到「襄阳城外 · 官道荒亭」，向钟婆婆出示布票。",
        reqFlag: "fei_ep1_done",
        trigger: { region: "chengwai", room: "cw_road", npc: "road_vendor" },
        steps: [
          { nar: "钟婆婆把缺口茶碗挪进阴处，碗底一圈车辙泥还没洗。你将布票沿缺口一贴，碗内侧与票背留下了同一道凤形朱印。" },
          { show: { left: hero, right: elder, active: "right" }, say: ["钟婆婆", "那家人把米送了，钱没得。来讨钱，倒叫人从车轮底下拽过一回。你要问他们，我也只见过这只碗。"] },
          { show: { active: "left" }, say: ["主角", "车出了道口往哪边去？没载米的车，压这么深不合情理。"] },
          { nar: "她从茶炉底拨出一只木轮楔，递到你手里。你把楔头抽开，它里面还夹着一枚西市旧牙牌，牙牌孔边粘了一根紫线。" },
          { ifMate: "huangrong", show: { left: "assets/mate-huangrong.webp", active: "left" }, say: ["黄蓉", "奶奶你看，这楔子才从轮下拔过，泥还没干。那人匆匆换车，拿错了楔，正好替咱们留门。"] },
          { show: { left: hero, active: "right" }, say: ["钟婆婆", "西市有个穿紫衣的姑娘问过这枚牌。她要我等肯接茶的人来了再交。"] },
          { nar: "你把温过的茶盏放到她手边，替倒歪的竹炉塞进一片石瓦。车辙边的水缓缓漫过最近一枚蹄印。" },
          { choice: [
            { text: "【认茶摊作证】收牙牌留回执，让钟婆婆有凭据可查", effect: { moral: 8, exp: 135, item: "herb_common", setFlag: "fei_ep2_done" }, reply: ["钟婆婆", "有人自己回来认这只碗，我就替他添茶。你先把牌带去。"] },
            { text: "【藏下牙牌】以货主身份托运下一趟车，收取掩口银", effect: { moral: -7, exp: 105, gold: 165, setFlag: "fei_ep2_done", setFlag2: "fei_freight_cover" }, reply: ["主角", "茶账照算，车户的名帖我拿走。到西市，我要看看他替谁藏人。"] }
          ] }
        ]
      },
      {
        id: "fei_ep3",
        title: "第三幕 · 紫绳缚鞘",
        hint: "前往「长安城 · 西市胡商街」，与袁紫衣核对牙牌上挂的紫线。",
        reqFlag: "fei_ep2_done",
        trigger: { region: "changan", room: "ca_market", npc: "yuan_ziyi" },
        steps: [
          { nar: "你把牙牌从指间转过半圈，紫线忽被人从后轻轻一扯。袁紫衣拿一段同色绳穿回孔里，一头经柱环系住了你带来的空刀鞘。" },
          { show: { left: hero, right: "assets/npc-heroine.webp", active: "right" }, say: ["袁紫衣", "鞘会在你脚边。你若执意出刀，我也不能时时来拴你的手。"] },
          { show: { active: "left" }, say: ["主角", "我来寻押车的那人。他苦挨一场冤告，凤天南倒可以买下一整间店关他的门。"] },
          { nar: "袁紫衣用拇指推开货箱盖，盖下有一行深陷的指印。你勾住箱侧绷断的篾条，她从最底层挑出一张夹着空药包的运单。" },
          { show: { active: "right" }, say: ["袁紫衣", "活着。那车遇大雪，赶车人连他一道送了旧庄。你去见程家妹子，见着凤天南时，让我先走半步。"] },
          { nar: "她抽掉系鞘绳，紫线登时落在你鞋尖。你拾起来折进运单，她将右手腾出，避开了伸来交还牙牌的那一侧。" },
          { choice: [
            { text: "【约好先救人】把运单封好，让袁紫衣自己了结她的话", effect: { moral: 8, exp: 155, item: "yulu", setFlag: "fei_ep3_done" }, reply: ["袁紫衣", "多谢你给我半步。我也给那赶车人留半步，叫他自己走回来。"] },
            { text: "【借凤号打掩护】扣下牙牌套取领车钱，携运单离开", effect: { moral: -8, exp: 125, gold: 195, setFlag: "fei_ep3_done", setFlag2: "fei_used_phoenix_mark" }, reply: ["袁紫衣", "牙牌收得到手，凤家的旧账却烫得很。你拿着时留神袖口。"] }
          ] }
        ]
      },
      {
        id: "fei_ep4",
        title: "第四幕 · 药灯留声",
        hint: "前往「雁门关 · 雪岭旧庄」，把空药包交给程灵素。",
        reqFlag: "fei_ep3_done",
        trigger: { region: "yanmen", room: "ym_snow_lodge", npc: "cheng_lingsu" },
        steps: [
          { nar: "程灵素用木夹翻开药包，只看了一眼便把锅从火上拿下。你支起榻边的枕，让蜷着身子的赶车人坐高一些，湿蓑衣随即滑落在地。" },
          { show: { left: hero, right: "assets/npc-maiden.webp", active: "right" }, say: ["程灵素", "纸包写的是退寒，里头却有人添了药。先不要问他谁添的，能喝下水，才有力气答你。"] },
          { ifFlag: "fei_used_phoenix_mark", say: ["程灵素", "凤家有人凭你那牙牌来领车。我将车推到庄前，他见车上没人便走了，榻上的人还不知道。"] },
          { unlessFlag: "fei_used_phoenix_mark", say: ["程灵素", "袁姑娘托人送来一张空牌，替他退了车契。照看他的人不用再留意门口每一声马铃。"] },
          { show: { active: "left" }, say: ["主角", "纸上凤形印还剩半个。我压在灯下，你从榻边伸手便拿得到。"] },
          { nar: "你把杯放稳，程灵素以白布接去他唇上冷汗。赶车人攥住布边，断断续续念出三个人名，她便把药秤移开，让你在秤盘下写。" },
          { show: { active: "right" }, say: ["程灵素", "人的口供写在药方后罢。若有人先来夺药方，总还有病人记得自己喝的是哪碗。"] },
          { nar: "话音未落，庄门忽被一脚踹开！金背大刀映着雪光劈门而入，佛山恶霸凤天南率人寻踪杀到，直取榻上证人！" },
          { show: { right: "assets/foe-bandit.webp", active: "right" }, say: ["凤天南", "好个多管闲事的小子！把那张运单和病秧子留下，老夫留你一具全尸！"] },
          { battle: "feng_tiannan", winReward: { exp: 140, gold: 120 },
            winNar: "你以精妙招式震飞凤天南的金背大刀，将恶霸一行彻底逐出雪岭旧庄！" },
          { show: { left: hero, right: "assets/npc-maiden.webp", active: "right" }, nar: "庄外雪声重归宁静。程灵素翻出一卷布面医录，把运单和新写的供纸一并夹进去。炉上药香浮起来，你盖紧窗绳，特意留了能看见灯光的窄口。" },
          { show: { active: "right" }, say: ["程灵素", "《飞狐外传》另抄了一册给你。这个病人我留在这儿，留一盏灯便足够。"] },
          { choice: [
            { text: "【炼丹 Lv2】搭手整理药案，公开救治记录并领天书", reqLife: { alchemy: 2 }, effect: { moral: 13, exp: 380, tianshu: "fei", item: "dan_jiuzhuan", setFlag: "fei_completed" }, reply: ["程灵素", "你把救人的一页放在证词前。有人读来觉得药比刀先到，也甚好。"] },
            { text: "【留档护人】把证词交给见证人，带走天书和程灵素的丹药", effect: { moral: 10, exp: 345, tianshu: "fei", item: "dan_chongmai", setFlag: "fei_completed" }, reply: ["程灵素", "走时掩半扇门。他睡时要静，你下山还须看得见路。"] },
            { text: "【带走底账】扣下可议价的运单，留下副证，携天书离庄", effect: { moral: -9, exp: 300, tianshu: "fei", gold: 395, setFlag: "fei_completed", setFlag2: "fei_kept_testimony" }, reply: ["程灵素", "这一份副证我收紧了。你若还想打听他住哪儿，门外就只有风声。"] }
          ] }
        ]
      }
    ]
  });
})(window);
