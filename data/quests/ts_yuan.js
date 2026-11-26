(function (root) {
  "use strict";
  const JY = root.JY;
  const hero = "assets/hero-portrait.webp";
  const xiao = "assets/npc-heroine.webp";
  const yuan = "assets/foe-master.webp";
  const lin = "assets/foe-guardian.webp";

  JY.registerQuest("ts_yuan", {
    title: "鸳鸯刀 · 双刀开席",
    tianshuId: "yuan",
    summary: "一口鸯刀令山道四侠争不清包袱，顺着失物到客栈试一回夫妻刀法，再回金顶让双刀照面。",
    episodes: [
      {
        id: "yuan_ep1",
        title: "第一幕 · 单刀偏袋",
        hint: "前往「峨眉山 · 金顶正殿」，替萧中慧整理带往寿席的刀袋。",
        trigger: { region: "emei", room: "emei_hall", npc: "xiao_zhonghui" },
        steps: [
          { nar: "萧中慧将刀袋往肩上一提，袋口便歪到右手。你托住左角，抖出两把旧穗和一张写着寿字的请帖，刀只响了一声。" },
          { show: { left: hero, right: xiao, active: "right" }, say: ["萧中慧", "我提了三次，它回回只响一声。刀少了一口，偷刀的人倒不晓得把另一把穗也带走。"] },
          { show: { active: "left" }, say: ["主角", "看左边的扣。线是扯开的，还夹着一枚官道茶摊的竹签。"] },
          { nar: "她挑指将单刀从袋中推出半寸，刃槽内果然还嵌着一股断线。你把竹签抵过去，签尾有几道涂乱的指印。" },
          { show: { active: "right" }, say: ["萧中慧", "出门让我撞着四位大侠，他们一人抢了一下袋子。你先找那个肯跟他们讲理的袁书生，他手比四个都多一只。"] },
          { nar: "你把寿帖移到袋外，顺势系回一把刀穗。萧中慧把空出的左袋束紧，试着原地转身，袋子这一次没撞上供案。" },
          { choice: [
            { text: "【替寿客找刀】只携竹签出门，替萧中慧留住单刀", effect: { moral: 8, exp: 120, setFlag: "yuan_ep1_done" }, reply: ["萧中慧", "先问谁的包袱，后问是谁的刀。可别学那四位先争谁最大。"] },
            { text: "【收一笔寻刀钱】用请帖作保议定赏银，再拿竹签去官道", effect: { moral: -6, exp: 95, gold: 130, setFlag: "yuan_ep1_done", setFlag2: "yuan_search_fee" }, reply: ["萧中慧", "这银子算你我约好的。四位大侠若再凑一份，你须照收四人四回谢。"] }
          ] }
        ]
      },
      {
        id: "yuan_ep2",
        title: "第二幕 · 四手争一包",
        hint: "前往「襄阳城外 · 官道荒亭」，帮袁冠南解开太岳四侠争抢的包袱。",
        reqFlag: "yuan_ep1_done",
        trigger: { region: "chengwai", room: "cw_road", npc: "yuan_guannan" },
        steps: [
          { nar: "袁冠南托着包袱底，四只手分别扯住包角。你把竹签横在捆绳下，赌物未开谁也不得伸手，四人这才各退半步。" },
          { show: { left: hero, right: yuan, active: "right" }, say: ["袁冠南", "他们说谁扯得紧便是谁的。在下托的是底，倘若在下撤手，该是谁的先着地？"] },
          { show: { active: "left" }, say: ["主角", "先撤手的替余人端茶。我数三声，怎么都不许它沾地。"] },
          { nar: "第三声还没数完，四个人已一齐放开。你赶紧伸臂一捞，袁冠南用胳膊夹住脱绳的刀鞘，包角上却翻出一对缝歪了的双喜字。" },
          { ifMate: "tianbg", show: { left: "assets/mate-tianbg.webp", active: "left" }, say: ["田伯光", "四个人不如一根绳，绳还晓得往一处扯呢。要我说，头一位付茶钱，后三位跑堂。"] },
          { show: { left: hero, active: "right" }, say: ["袁冠南", "这倒省了一桌争先。福来客栈有对夫妇认得双喜下的刀结，烦请带鞘去讨教。"] },
          { nar: "你把空包铺平，逐一将四角交回各人手里。袁冠南收走缝歪的双喜，给你留下一枚系着红线的鞘环。" },
          { choice: [
            { text: "【公公平平】让四人各验包角才收鞘，持红线赴福来客栈", effect: { moral: 8, exp: 150, setFlag: "yuan_ep2_done" }, reply: ["袁冠南", "包袱空了，四位总不会分出四口刀。多谢少侠托底。"] },
            { text: "【开价竞认】收四人认领钱，拿走他们都说不清来历的刀鞘", effect: { moral: -8, exp: 125, gold: 180, setFlag: "yuan_ep2_done", setFlag2: "yuan_four_claims" }, reply: ["袁冠南", "据说四位是拜过把子的，不知回去时还剩几个把子。"] }
          ] }
        ]
      },
      {
        id: "yuan_ep3",
        title: "第三幕 · 掌勺学合刀",
        hint: "到「悦来镇 · 福来客栈」，请林玉龙与任飞燕辨认双喜刀结。",
        reqFlag: "yuan_ep2_done",
        trigger: { region: "yuelai", room: "yl_inn", npc: "lin_yulong" },
        steps: [
          { nar: "林玉龙抡着木勺从灶边跨出，任飞燕一手托锅一手推他的肩。你把刀鞘举到与锅沿齐平，木勺歪了一寸，竟顺着鞘口滑过来。" },
          { show: { left: hero, right: lin, active: "right" }, say: ["林玉龙", "她头一招比我急，第二招却要我等。少侠评评，我是不是该把这一勺先下锅？"] },
          { show: { right: xiao, active: "right" }, say: ["任飞燕", "等我把锅挪正！你那一勺倒进来，我先接住的是你的袖子。"] },
          { nar: "你挪开灶边火砖，给二人脚下再腾半步。勺口一转，锅沿向里一收，汤稳稳落在中央，刀鞘上的红扣也被同一回劲拨开。" },
          { show: { active: "left" }, say: ["主角", "原来一人先让半步，才有第二个人的刀能出鞘。请把这叶双喜叠上去，再试一回。"] },
          { nar: "任飞燕把锅轻轻放平，两人以勺柄夹起红结。你顺着被抻直的两股线，抽出一张落款萧半和的寿席补帖。" },
          { show: { right: lin, active: "right" }, say: ["林玉龙", "人家请的是一双客。你带着两样东西回金顶罢。我这一勺出不得灶门，她说还少了半把盐。"] },
          { choice: [
            { text: "【烹饪 Lv2】配合二人收锅走步，端一份合做的寿礼登金顶", reqLife: { cook: 2 }, effect: { moral: 11, exp: 190, item: "dish_chicken", setFlag: "yuan_ep3_done" }, reply: ["任飞燕", "你会掌灶，倒省我教一个人让开另一个人。汤留半锅，给他们再学。"] },
            { text: "【留步成双】依两人的步子解扣，带补帖赴寿宴", effect: { moral: 8, exp: 155, setFlag: "yuan_ep3_done" }, reply: ["林玉龙", "我等了她这半步，成了。她再叫我等，可也要告诉我等到几时。"] },
            { text: "【收钱授半招】拿席间的演刀帖换银，自己独领金顶补帖", effect: { moral: -8, exp: 125, gold: 200, setFlag: "yuan_ep3_done", setFlag2: "yuan_half_form" }, reply: ["任飞燕", "你只教出去半招，也只收半份钱罢。另一半叫他们找下一双手。"] }
          ] }
        ]
      },
      {
        id: "yuan_ep4",
        title: "第四幕 · 四字满堂",
        hint: "返回「峨眉山 · 金顶正殿」，把刀鞘与寿帖交给萧半和。",
        reqFlag: "yuan_ep3_done",
        trigger: { region: "emei", room: "emei_hall", npc: "xiao_banhe" },
        steps: [
          { nar: "萧半和把主座往旁边拉开，袁冠南与萧中慧各放一刀在桌上。你拨去两把刀上缠成一团的红穗，四处阴刻分在不同位置。" },
          { show: { left: hero, right: yuan, active: "right" }, say: ["萧半和", "有人搬一口刀回去，觉得赶明儿能成天下第一。把这两口翻齐，且看他愿不愿意认这四个字。"] },
          { ifFlag: "yuan_half_form", say: ["萧半和", "宾客里有三位买了你的半招，席还没开，半张桌子已经让他们挪走了。待会儿教他们一道抬回来。"] },
          { unlessFlag: "yuan_half_form", say: ["萧半和", "林贤弟让人把寿礼送到，递盒的时候夫妻两个各让了一步。三位寿客在桌旁学到如今，还没有撞着头。"] },
          { show: { right: xiao, active: "right" }, say: ["萧中慧", "我的刀先翻了一半。袁相公，当心刀背，桌上还摆着我今天最想吃的那碟菜。"] },
          { nar: "你把菜碟拨远一寸，两把刀由各自的主人翻过来。茶水照进阴刻，先是「仁者」，随后两字随桌面亮作「无敌」。" },
          { show: { active: "left" }, say: ["主角", "桌上本凑不齐四个字。你们肯挪开两个座，就放得下两把刀。"] },
          { nar: "萧半和拍松寿礼木盒，案后递来一卷《鸳鸯刀》。你刚解一扣，两把穗已被萧中慧并起来，系在给寿客开着的门上。" },
          { show: { right: yuan, active: "right" }, say: ["萧半和", "书给你，菜给她。坐一桌才叫寿席，别又用这本书抢头一个座。"] },
          { choice: [
            { text: "【留刀同席】把双刀留还两人，领天书和寿礼", effect: { moral: 12, exp: 370, tianshu: "yuan", item: "dish_yudi", setFlag: "yuan_completed" }, reply: ["萧中慧", "菜我留了一筷子，刀你留了一双。赶明儿再遇着，咱们换一道菜吃。"] },
            { text: "【卖字走刀】卖双刀字样给寿客，持谢银与天书下山", effect: { moral: -9, exp: 310, tianshu: "yuan", gold: 420, setFlag: "yuan_completed", setFlag2: "yuan_sold_motto" }, reply: ["萧半和", "买字的人今儿也请坐下。等他们吃完，教他们把钱数清，把字另读一回。"] }
          ] }
        ]
      }
    ]
  });
})(window);
