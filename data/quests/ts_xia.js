(function (root) {
  "use strict";
  const JY = root.JY;
  const hero = "assets/hero-portrait.webp";
  const shi = "assets/npc-shipotian.webp";
  const elder = "assets/npc-hermit.webp";

  JY.registerQuest("ts_xia", {
    title: "侠客行 · 字外见路",
    tianshuId: "xia",
    summary: "渡口少年认不得玄铁令的字，却能听出一首诗的走向。过无量山再返海边，随他从石壁上读出自己的路。",
    episodes: [
      {
        id: "xia_ep1",
        title: "第一幕 · 铁令压缆",
        hint: "前往「东海桃花岛 · 桃花渡」，替石破天辨识玄铁令。",
        trigger: { region: "taohua", room: "th_ferry", npc: "shi_potian" },
        steps: [
          { nar: "渡船乍靠，石破天拍下石桩上的玄铁令，正好卡住脱出的缆环。你拉紧绳子，他用两根指头捏起铁令，让你看底下湿出来的细线。" },
          { show: { left: hero, right: shi, active: "right" }, say: ["石破天", "大哥，这上头画的是把刀吗？我横着看有一把，倒过来，看着又像人伸了脚。"] },
          { show: { active: "left" }, say: ["主角", "那一边是字。伸脚的一笔反而有趣，照船缆走向挪一挪，你看脚落在哪儿。"] },
          { nar: "少年用铁令尖角拨正水里的绳，你撑住船沿，让一道极细的槽在背光处露出来。槽内嵌着半枚石质黑棋。" },
          { show: { active: "right" }, say: ["石破天", "我喂狗时见过白爷爷拿这种石头排队。你替我问他去，他说排好了，能从剑湖一直走到海边。"] },
          { nar: "你把黑棋松下来，缆环离桩又起了一跳。石破天脚下一踩，空出手来替你把令上的水擦干。" },
          { choice: [
            { text: "【替少年问路】将铁令交还石破天，只携黑棋往剑湖", effect: { moral: 8, exp: 120, setFlag: "xia_ep1_done" }, reply: ["石破天", "那你走好。渡船到下一趟，我还在这里牵绳。"] },
            { text: "【冒领持令人】收取围观客的问令银，携黑棋赴约", effect: { moral: -6, exp: 100, gold: 145, setFlag: "xia_ep1_done", setFlag2: "xia_claimed_token" }, reply: ["石破天", "钱收你的，船还是他们一同搭。别忘把缆给我。"] }
          ] }
        ]
      },
      {
        id: "xia_ep2",
        title: "第二幕 · 棋石换位",
        hint: "前往「无量山 · 剑湖石窟」，请白自在辨认那枚黑棋。",
        reqFlag: "xia_ep1_done",
        trigger: { region: "wuliang", room: "wl_cave", npc: "bai_zizai" },
        steps: [
          { nar: "白自在把石案拍得一响，三枚黑棋跳离方格，你接住最外那枚。把渡口拾的半子一并，断口恰好严丝合缝。" },
          { show: { left: hero, right: "assets/foe-guardian.webp", active: "right" }, say: ["白自在", "荒唐！老夫下过上千盘，谁家的棋子自己从海里游回剑湖了？"] },
          { show: { active: "left" }, say: ["主角", "来了一半，另一半你打落了。两枚合时，格下那道槽倒能通到底。"] },
          { nar: "你在石案矮处塞进一片瓦。齐起的棋石渐向槽眼滑过去，白自在用食指定住正中那子，晚一瞬便要一同坠下。" },
          { ifMate: "linghu", show: { left: "assets/mate-linghu.webp", active: "left" }, say: ["令狐冲", "前辈，让那一子输罢。它若下去，咱们倒能看看石案底下有没有第二盘酒。"] },
          { show: { left: hero, active: "right" }, say: ["白自在", "酒在渡口，叫张三给你！棋子另有个落处，老夫这回放它过去，且看它领谁走。"] },
          { nar: "棋子落进槽底，转开一道小石门。你抄下露出的一轮潮时，白自在抢过黑子，仍把它放回原来缺子的一格。" },
          { choice: [
            { text: "【弈棋 Lv2】舍中腹黑棋，开启侧槽并把原局还给白自在", reqLife: { chess: 2 }, effect: { moral: 11, exp: 185, item: "yulu", setFlag: "xia_ep2_done" }, reply: ["白自在", "这盘棋算你能下。但那子自己掉下去的，可不算老夫输。"] },
            { text: "【试走空格】顺滑槽找出潮时，等到合适时刻回桃花渡", effect: { moral: 8, exp: 150, setFlag: "xia_ep2_done" }, reply: ["白自在", "纸写大些，老夫总不信一道水能比人更识字。"] },
            { text: "【卖个破局】用可复原的棋式换银，保留真正潮时", effect: { moral: -7, exp: 125, gold: 175, setFlag: "xia_ep2_done", setFlag2: "xia_board_fee" }, reply: ["主角", "棋局归你们猜。潮退那刻，我另有去处。"] }
          ] }
        ]
      },
      {
        id: "xia_ep3",
        title: "第三幕 · 酒帖双至",
        hint: "返回「东海桃花岛 · 桃花渡」，按潮时向张三领帖。",
        reqFlag: "xia_ep2_done",
        trigger: { region: "taohua", room: "th_ferry", npc: "zhang_san" },
        steps: [
          { nar: "张三用小刀削掉酒葫芦的封泥，将两杯斟得一满一浅。退潮露出第三根缆桩，你踩住它的影子，见水面果然留出一条贴石细路。" },
          { show: { left: hero, right: elder, active: "right" }, say: ["张三", "客人，你要收帖，手自空着。若要端酒，哪一杯都能端，喝得慢些就是了。"] },
          { show: { active: "left" }, say: ["主角", "我先讨一只空盏。那孩子才从水边回来，咱们看过石路，便给他留一席。"] },
          { nar: "张三屈指推来一枚赏善铜牌，自己把酒端走半盏。你蹲下将铜牌贴到缆桩晚露的刻痕上，刻痕指向一条向内弯的沙脊。" },
          { show: { active: "right" }, say: ["张三", "岛上的客人受惊，是怕一去没了回来路。我这帖两面都能认，正面进洞，反面出来。"] },
          { nar: "话音方落，渡口一名手执竹尺的争帖悍客横步拦在桩前，冷笑道：「想领赏善铜牌，先过我横江尺这一关！」" },
          { battle: "rare_bamboo_ruler", healBetween: 0.35, winReward: { exp: 175, gold: 110 }, winNar: "你拆开竹尺重势将其震退半丈，张三抚掌一笑，将酒葫芦朝你一举！" },
          { show: { left: hero, right: elder, active: "right" }, nar: "你将空盏扣在桩顶，给后到者留一个低潮记号。张三等酒面平下来才松手，连盏边的酒珠也没滴在路上。" },
          { choice: [
            { text: "【让人自决】说清来回路线，把赏善帖留给同去者各照一眼", effect: { moral: 9, exp: 155, setFlag: "xia_ep3_done" }, reply: ["张三", "帖子出去得只够一叶，回来的路却宽。你领得好。"] },
            { text: "【争头一帖】换走先行路牌，借紧俏的座位赚船钱", effect: { moral: -8, exp: 130, gold: 200, setFlag: "xia_ep3_done", setFlag2: "xia_first_passage" }, reply: ["主角", "满盏的可以等我回来再喝。趁路宽，我要先到石门。"] }
          ] }
        ]
      },
      {
        id: "xia_ep4",
        title: "第四幕 · 石壁忘字",
        hint: "到「东海桃花岛 · 潮音石室」，同石破天参看石壁古诗。",
        reqFlag: "xia_ep3_done",
        trigger: { region: "taohua", room: "th_stone", npc: "shi_potian" },
        steps: [
          { nar: "石破天蹲在石壁底下，掌心贴在最后一个字上。你按石洞深浅添了一勺水，几行浅痕同时亮起来，把他的指尖照出一圈冷光。" },
          { show: { left: hero, right: shi, active: "right" }, say: ["石破天", "他们讲了半晌，每个人指的那个字都不同。我看第一撇像只脚，这便跟着走了两步。"] },
          { ifFlag: "xia_first_passage", say: ["石破天", "有人说头一帖才准先走，我请他们站高一块石头看。他们挤着等，板子反倒给潮水推过来了。"] },
          { unlessFlag: "xia_first_passage", say: ["石破天", "张三哥把你留的铜牌给每个人看了。方才有两位送木板回来，等水再低些，咱们便一块儿过去。"] },
          { show: { active: "left" }, say: ["主角", "退半步让我看看。你迈出去时，靠最远的一列石眼是不是自己通了？"] },
          { nar: "少年照说的退一步，石眼里涌出一线潮水。你横过木板接住浮起的匣子，匣底还压着抄壁人忘记取走的最后一页。" },
          { show: { active: "right" }, say: ["石破天", "怪了，就是那一脚我不大明白。那本《侠客行》借你读罢。我再过一趟水，不劳人教字。"] },
          { nar: "他把手从字上挪开，字眼的光很快暗了。你抽走木板翻出匣手，读书的人此时才想起让出下山的洞口。" },
          { choice: [
            { text: "【与众同看】留好水线，让后来人自己走一遍，携天书下山", effect: { moral: 12, exp: 385, tianshu: "xia", item: "dahuandan", setFlag: "xia_completed" }, reply: ["石破天", "那人脚小，你留一块板给他。我们看得见的地方，他也会看见。"] },
            { text: "【藏起石缺】带走匣中拓本和天书，出售看石壁的捷径", effect: { moral: -9, exp: 320, tianshu: "xia", gold: 440, setFlag: "xia_completed", setFlag2: "xia_private_rubbing" }, reply: ["石破天", "给你罢。潮水什么时候来，还是由不得我们开价。"] }
          ] }
        ]
      }
    ]
  });
})(window);
