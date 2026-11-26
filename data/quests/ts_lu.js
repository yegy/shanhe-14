(function (root) {
  "use strict";
  const JY = root.JY;
  const hero = "assets/hero-portrait.webp";
  const elder = "assets/npc-hermit.webp";

  JY.registerQuest("ts_lu", {
    title: "鹿鼎记 · 纸背有山",
    tianshuId: "lu",
    summary: "韦小宝从漕船上捞来一册四十二章经。跟着书皮里的碎绢走过客栈、少林与运河，看看宝图最后换来什么。",
    episodes: [
      {
        id: "lu_ep1",
        title: "第一幕 · 货栈晒经",
        hint: "前往「扬州城 · 运河钞关」，查问韦小宝手里的湿经。",
        trigger: { region: "yangzhou", room: "yangzhou_gate", npc: "wei_xiaobao" },
        steps: [
          { nar: "韦小宝蹲在水尺旁晒经，把两枚铜钱压在同一页上。你替他拨开沾纸的水草，发现铜钱底下还有一条扯不开的白线。" },
          { show: { left: hero, right: "assets/npc-weixb.webp", active: "right" }, say: ["韦小宝", "先别撕，佛爷的面皮撕坏了不打紧，我这五十两的书皮可经不起你一根指头。"] },
          { show: { active: "left" }, say: ["主角", "值五十两的是白线罢。船账只写了进八册，出一册，为何掌柜说本本都在？"] },
          { nar: "他用茶水把钱孔润一润，白线滑到你指尖，原是封皮里缝着的一条薄绢。门边账房咳了两声，韦小宝立即将空封皮端端正正盖回去。" },
          { show: { active: "right" }, say: ["韦小宝", "本本都在掌柜的嘴里。你要验货，白马客栈有个会认针脚的好妹子，找她务必先敲桌脚。"] },
          { nar: "你丢开滴水的草绳，把绢条塞进一只干信封。他从秤盘下抽出半张船单，用两枚铜钱压住写客栈的那边。" },
          { choice: [
            { text: "【物归原主】带碎绢给双儿，留下一纸换货回执", effect: { moral: 7, exp: 120, item: "jade_fan", setFlag: "lu_ep1_done" }, reply: ["韦小宝", "还写回执？成，有你这张纸，我在掌柜面前能多赖两天。"] },
            { text: "【卖一本空经】用掉包经皮向货主换脚钱，暗取船单", effect: { moral: -7, exp: 100, gold: 145, setFlag: "lu_ep1_done", setFlag2: "lu_hollow_sutra" }, reply: ["韦小宝", "好眼力！送经的人收的是皮，咱们过河靠的倒是里子。"] }
          ] }
        ]
      },
      {
        id: "lu_ep2",
        title: "第二幕 · 双针补绢",
        hint: "前往「洛阳城 · 白马客栈」，请双儿辨认针脚。",
        reqFlag: "lu_ep1_done",
        trigger: { region: "luoyang", room: "ly_inn", npc: "shuang_er" },
        steps: [
          { nar: "你依言敲了桌脚，双儿在桌对面屈指回了一下。她把油灯移到脚踏下，针尖从绢条背后挑起一个藏得极深的回针。" },
          { show: { left: hero, right: "assets/npc-maiden.webp", active: "right" }, say: ["双儿", "相公总说一眼便瞧穿。这点回针藏在绢背，瞧穿了反倒要漏过去。"] },
          { show: { active: "left" }, say: ["主角", "绢有八角。这一角与船单上的水纹对不上，你看是少了一针，还是有人换过了？"] },
          { nar: "双儿抿断线尾，把一只空杯倒扣在绢面上。你顺杯缘转半圈，褪去颜色的山尖才与水纹合起，尾端还有两个小小的少林字样。" },
          { ifMate: "zhaomin", show: { left: "assets/mate-zhaomin.webp", active: "left" }, say: ["赵敏", "缝反一角便够叫人跑错一座山。韦相公若是有意，回头可得请咱们喝够一壶。"] },
          { show: { left: hero, active: "right" }, say: ["双儿", "澄观师父看过经封。你拿这角去请教，别把相公捞书的事也一齐说出去了。"] },
          { nar: "她以针尖在纸上戳出山尖缺口，你把纸折成经角形状。窗外脚步停了一停，她抽走脚边灯，屋里立刻暗了一半。" },
          { choice: [
            { text: "【护住双儿】留碎绢原角，只把纸样带去少林", effect: { moral: 8, exp: 145, aff: { zhaomin: 5 }, setFlag: "lu_ep2_done" }, reply: ["双儿", "好，真绢我收在袖里。有人替你敲桌脚，我也不会错认。"] },
            { text: "【收下缝样】扣存一份真绢作押，持纸样赴少林", effect: { moral: -6, exp: 115, gold: 175, setFlag: "lu_ep2_done", setFlag2: "lu_map_pledge" }, reply: ["双儿", "我替你封稳。若有人开过，封线断处就容易认了。"] }
          ] }
        ]
      },
      {
        id: "lu_ep3",
        title: "第三幕 · 经字错一格",
        hint: "到「嵩山少林寺 · 藏经阁」，请澄观核对经封纸样。",
        reqFlag: "lu_ep2_done",
        trigger: { region: "songshan", room: "ss_library", npc: "chenguan" },
        steps: [
          { nar: "澄观从经架上连抽四册，页脚竟都比你的纸样短一格。你替他把尺放平，木尺中段却翘起来，恰指向经匣侧面的小孔。" },
          { show: { left: hero, right: "assets/npc-monk.webp", active: "right" }, say: ["澄观", "尺是直的，匣是歪的。若以歪匣量直尺，便成了尺量错，施主请先看清哪一样动过。"] },
          { show: { active: "left" }, say: ["主角", "匣底垫了一层胡桃木。麻烦师父将里头四册都倒出来，再把这层木取下。"] },
          { nar: "你托住木匣，澄观以书签探缝。小孔里咔哒一声，滑出两张等高的船牌，一张有背号，一张画了片上岸的柳叶。" },
          { show: { active: "right" }, say: ["澄观", "船在扬州。两块牌叠好，柳叶的柄就指向那一号船。这个法子是陈施主来借经的时候教我玩的。"] },
          { nar: "你把船牌在窗纸光里叠过，抬起上层恰好露出钞关水尺的印花。澄观抚了抚书角，把靠外的一册推回正位。" },
          { choice: [
            { text: "【弈棋 Lv2】按棋格定位船牌，记下会合号后替澄观归经", reqLife: { chess: 2 }, effect: { moral: 10, exp: 190, item: "dahuandan", setFlag: "lu_ep3_done" }, reply: ["澄观", "原来横竖都数才对。施主去时，替我问陈施主上回那局可曾下完。"] },
            { text: "【复原经架】留副牌供法师记账，携会合号回扬州", effect: { moral: 7, exp: 150, setFlag: "lu_ep3_done" }, reply: ["澄观", "一人带一块也好，记错了还有一块可对。"] },
            { text: "【抢占泊位】持原牌去向船户收取优先卸货钱", effect: { moral: -8, exp: 130, gold: 210, setFlag: "lu_ep3_done", setFlag2: "lu_reserved_dock" }, reply: ["主角", "会合照旧。这一格空出来做什么，等我回扬州再填。"] }
          ] }
        ]
      },
      {
        id: "lu_ep4",
        title: "第四幕 · 船牌落水",
        hint: "返回「扬州城 · 运河钞关」，将船牌交给陈近南。",
        reqFlag: "lu_ep3_done",
        trigger: { region: "yangzhou", room: "yangzhou_gate", npc: "chen_jinnan" },
        steps: [
          { nar: "陈近南把船牌对准钞关水尺，牌上柳叶恰在当下水线。他用指背一点，你将绢碎依水路排开，偏偏最要紧的一条断在下船处。" },
          { show: { left: hero, right: "assets/npc-chenjn.webp", active: "right" }, say: ["陈近南", "纸上留了金银，纸外还站着码头的伙计。谁先得消息，谁便能把他们都叫上船。"] },
          { ifFlag: "lu_reserved_dock", say: ["陈近南", "你预收了钱，那一格已经排了三家船。叫他们各退一尺，总得有人拿着你写的凭帖去说。"] },
          { unlessFlag: "lu_reserved_dock", say: ["陈近南", "澄观师父的副牌还挂在柜上，哪条船也不曾被叫走。待会儿让你自己来喊开不开船。"] },
          { show: { active: "left" }, say: ["主角", "账房已经凑够人。你瞧那数船板的伙计，连后头一艘空船都记成满仓。"] },
          { nar: "钞关栅门轰然倒塌！满洲第一勇士鳌拜竟亲率铁甲死士追至运河，横练铁壁如山岳压来，誓夺四十二章经密册！" },
          { show: { right: "assets/foe-mongol.webp", active: "right" }, say: ["鳌拜", "天地会反贼休走！经书与船牌交出来，免尔等血溅运河！"] },
          { battle: "ao_bai", winReward: { exp: 200, gold: 180 },
            winNar: "你以破甲绝学击碎鳌拜的十三太保金钟罩，逼得满洲铁甲狼狈退走！" },
          { nar: "韦小宝从木桩后冒出脑袋，抖开一件画有同样水纹的褂子。陈近南用指甲挑断最后一个扣眼，将夹层里的薄册递给你。" },
          { show: { right: "assets/npc-weixb.webp", active: "right" }, say: ["韦小宝", "师父，开船号我替他们喊过啦。至于往哪儿开嘛，船家收了另一个人的钱才晓得。"] },
          { nar: "你拨开册后浸湿的布角，露出《鹿鼎记》三个字。水拍木桩，船牌被撞歪一线，陈近南屈指将它按住。" },
          { show: { right: "assets/npc-chenjn.webp", active: "right" }, say: ["陈近南", "书你带走。去开口前想一想，是要散船，还是要这帮人继续等同一个价？"] },
          { choice: [
            { text: "【散金解围】公开调船账，遣伙计携工钱回家，收下天书", effect: { moral: 11, exp: 375, tianshu: "lu", item: "jade_fan", setFlag: "lu_completed" }, reply: ["韦小宝", "伙计有钱拿，船也不用开。下回写账还叫我来，省得你少算那一份。"] },
            { text: "【沽价藏江】出售假泊位，让真线索随天书归己", effect: { moral: -10, exp: 315, tianshu: "lu", gold: 490, setFlag: "lu_completed", setFlag2: "lu_fake_berth" }, reply: ["陈近南", "真泊位上的人我会遣走。你日后用得着这张假牌，莫叫他们当真。"] }
          ] }
        ]
      }
    ]
  });
})(window);
