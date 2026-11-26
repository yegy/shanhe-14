(function (root) {
  "use strict";
  const JY = root.JY;
  const hero = "assets/hero-portrait.webp";
  const elder = "assets/npc-hermit.webp";

  JY.registerQuest("ts_lian", {
    title: "连城诀 · 金身无价",
    tianshuId: "lian",
    summary: "替狄云读出剑招里藏错的唐诗，循丁典的花盆、水笙的雪火和天宁寺旧物，看看人人争抢的金身值几条命。",
    episodes: [
      {
        id: "lian_ep1",
        title: "第一幕 · 唐诗缺字",
        hint: "到「华山 · 思过崖」，替狄云辨认剑痕旁的唐诗。",
        trigger: { region: "huashan", room: "hs_siguoya", npc: "di_yun" },
        steps: [
          { nar: "狄云把一根枯木当剑，照着壁上最深的一痕向左劈。木梢方到半途便撞碎了，你捡起断梢，那一小截恰好横在石壁两字之间。" },
          { show: { left: hero, right: "assets/npc-diyun.webp", active: "right" }, say: ["狄云", "师父教时，我总怕记错。现下见墙上也刻错一个字，反倒不知是不是我错。"] },
          { show: { active: "left" }, say: ["主角", "字错得有用。你看把这个位置抹去，留下的三处空格，刚好排成剑换手的次序。"] },
          { nar: "你以石末涂平一个缺口。狄云用枯枝余段重走一遍，这一回木头擦过石壁，敲得剑痕里半截铜钱从石粉中滑了出来。" },
          { show: { active: "right" }, say: ["狄云", "这枚钱是丁大哥割的，少半边正好收不进人的钱袋。他在客栈候信，钱到他才肯开窗。"] },
          { nar: "你托起铜钱，狄云把木剑折去沾石粉的一头，留平整那半截给你作书签。" },
          { choice: [
            { text: "【替狄云送信】抄诗补字，带半枚铜钱请丁典核对", effect: { moral: 8, exp: 120, setFlag: "lian_ep1_done" }, reply: ["狄云", "遇到丁大哥，先跟他说我的手能握住剑了。那半枚钱，倒在其次。"] },
            { text: "【错诗留市】散出错句误导寻宝人，携送钱凭证下山", effect: { moral: -7, exp: 100, gold: 135, setFlag: "lian_ep1_done", setFlag2: "lian_false_verse" }, reply: ["主角", "他们拿整首换钱，我只取空格。空着的地方，到了客栈自会有话填。"] }
          ] }
        ]
      },
      {
        id: "lian_ep2",
        title: "第二幕 · 窗下一盆花",
        hint: "前往「洛阳城 · 白马客栈」，把半枚铜钱交给丁典。",
        reqFlag: "lian_ep1_done",
        trigger: { region: "luoyang", room: "ly_inn", npc: "ding_dian" },
        steps: [
          { nar: "丁典半开窗牖，将一盆花缓缓推到外沿。你把铜钱放在盆底的缺口，缺口一塞，他立即收回手，猛地合上了半扇窗。" },
          { show: { left: hero, right: "assets/foe-master.webp", active: "right" }, say: ["丁典", "低些声。霜华养花，雨大时才把盆挪半步。今晨有人搬进搬出三回，土也不是昨日的土。"] },
          { show: { active: "left" }, say: ["主角", "这层湿的在下面，干的却露在外头。花没换，叫人挪来盖住盆底的物事了。"] },
          { nar: "他用剪下的枯茎点进盆眼，你接住推出的一枚空竹节。竹内藏着一行诗，旁边粘一小撮只有雪落过才肯伏平的草籽。" },
          { show: { active: "right" }, say: ["丁典", "去问水姑娘。这两笔从雪里抄下来的，有人踩乱过，我记的那句也未必全。"] },
          { nar: "你把花土沿根须压实，丁典趁机让盆沿离开格条一寸。光斑从花上挪到空窗，他一抬手，把最冷那格窗纸遮了起来。" },
          { choice: [
            { text: "【保住花信】恢复盆土，只拿走写在竹内的诗句", effect: { moral: 9, exp: 150, item: "yulu", setFlag: "lian_ep2_done" }, reply: ["丁典", "花还在，便还有人能认得我的窗。告诉狄云，字认准了再练。"] },
            { text: "【留一份花信】抄取两处暗记，将较完整的一份握在手里", effect: { moral: -7, exp: 120, gold: 175, setFlag: "lian_ep2_done", setFlag2: "lian_flower_copy" }, reply: ["丁典", "你想留那张纸也可。把笔收了，莫再用这盆花同别人谈价。"] }
          ] }
        ]
      },
      {
        id: "lian_ep3",
        title: "第三幕 · 雪火煮经",
        hint: "前往「雁门关 · 雪岭旧庄」，请水笙补全雪地所记诗句。",
        reqFlag: "lian_ep2_done",
        trigger: { region: "yanmen", room: "ym_snow_lodge", npc: "shui_sheng" },
        steps: [
          { nar: "水笙把湿页塞在两片火烤过的木板间，你替她挑起火边的湿靴，靴筒里倒出一串硬雪。她用手背一划，雪上竟有一道完整的劈痕。" },
          { show: { left: hero, right: "assets/npc-maiden.webp", active: "right" }, say: ["水笙", "你数数这步有多长。雪谷里人都说狄大哥害了他们，我从这条痕里看见的，明明是他退一步把路让了。"] },
          { show: { active: "left" }, say: ["主角", "步尾多一个脚点。给我看纸的最下边，少写的那一字该在他回头的位置。"] },
          { nar: "你用两块木板夹正湿页，水笙慢慢翻过来。她从纸和板之间抽出一粒金箔，放在火外，箔边一个「宁」字映得清亮。" },
          { ifMate: "xiaolongnv", show: { left: "assets/mate-xiaolongnv.webp", right: elder, active: "left" }, say: ["小龙女", "人在雪里走不稳，肯把活路让给旁人，已是很费力的事。你若看清他这一脚，便把它写进去。"] },
          { show: { left: hero, right: "assets/npc-maiden.webp", active: "right" }, say: ["水笙", "我写好另一份给狄大哥。他将天宁寺的旧物带到少林借瓮收着，等有人把这页的字补上。"] },
          { nar: "你把两块木板错开，湿页终于可揭。水笙一只手提走煮水的罐，另一只将写干的纸避过它滴落的黑水。" },
          { choice: [
            { text: "【烹饪 Lv2】控住灶温烘平湿页，让水笙留下完整一份", reqLife: { cook: 2 }, effect: { moral: 11, exp: 190, item: "dish_chicken", setFlag: "lian_ep3_done" }, reply: ["水笙", "纸平了，靴也干了。往寺里去时，就穿这双。"] },
            { text: "【双证同封】封住金箔与字据，把退步的真相带给狄云", effect: { moral: 9, exp: 155, setFlag: "lian_ep3_done" }, reply: ["水笙", "让他自己看罢。我在这儿留一回火，倘若他还走这一程，也好烤脚。"] },
            { text: "【换去金箔】以金身线索引开夺书人，领取他们的看线费", effect: { moral: -8, exp: 130, gold: 220, setFlag: "lian_ep3_done", setFlag2: "lian_gold_decoy" }, reply: ["主角", "给他们一点会发亮的东西。我收好这张发不了亮的。"] }
          ] }
        ]
      },
      {
        id: "lian_ep4",
        title: "第四幕 · 佛腹落尘",
        hint: "到「嵩山少林寺 · 藏经阁后院」，找狄云开天宁寺遗物。",
        reqFlag: "lian_ep3_done",
        trigger: { region: "songshan", room: "ss_court", npc: "di_yun" },
        steps: [
          { nar: "狄云将透湿的布从瓮口揭下，你托瓮向旁稍稍一侧，一块佛腹金片便沿瓮沿滑出来。片后斑斑点点，挨上新水便发黑。" },
          { show: { left: hero, right: "assets/npc-diyun.webp", active: "right" }, say: ["狄云", "他们拿金子先往嘴里送，说咬得动便是真金。我倒想，有谁肯替那个人尝他咬过以后的苦？"] },
          { ifFlag: "lian_gold_decoy", say: ["狄云", "山下两个人拿你的金箔来讨价。我给他们看了手上发黑的那一块，他们便把自己的扔进沟了。"] },
          { unlessFlag: "lian_gold_decoy", say: ["狄云", "水笙让人送了另一封字据来。我托和尚替我逐字念过，她说的话与石上错诗全不相干。"] },
          { show: { active: "left" }, say: ["主角", "让我先夹走金片。瓮底有一册书，外封是净的，你把你的木签递来撑一下。"] },
          { nar: "一道刺目血影猛然翻过院墙！血刀老祖怪笑声未落，软刀已卷着腥风直扑陶瓮，誓要独吞天宁寺秘宝与剑谱！" },
          { show: { right: "assets/foe-bandit.webp", active: "right" }, say: ["血刀老祖", "嘿嘿，小杂种藏得好深！佛腹真金和连城剑诀，全给老祖交出来罢！"] },
          { battle: "he_taichong", winReward: { exp: 180, item: "dahuandan" },
            winNar: "你见招拆招大破血刀诡技，将血刀老祖重创逼退院外！" },
          { show: { left: hero, right: "assets/npc-diyun.webp", active: "right" }, nar: "风雪散尽。狄云把木签伸进瓮内，你从下面抽出书册。金片滑到砖缝中，他用脚踏住，并不低头再瞧一眼。" },
          { show: { active: "right" }, say: ["狄云", "《连城诀》在你手上。中间夹了一张纸，说的是他们欠谁几条命。我数不清那样多，你让会数的人看。"] },
          { nar: "你把金片拢进用剩的布，折口朝里。狄云束紧瓮盖，剩下那点绳被他截断，绕到水笙送来的字据角上。" },
          { choice: [
            { text: "【封金留话】将遗金封交少林，传下狄云证词并收天书", effect: { moral: 13, exp: 385, tianshu: "lian", item: "dan_jiuzhuan", setFlag: "lian_completed" }, reply: ["狄云", "有字的人看字就好。我回去砍柴，砍柴再不用先认一句诗。"] },
            { text: "【分走买路钱】将金身位置卖给富客，带天书远离旧账", effect: { moral: -11, exp: 325, tianshu: "lian", gold: 460, setFlag: "lian_completed", setFlag2: "lian_sold_temple_lead" }, reply: ["狄云", "书归你。金身的事我会让僧人封上，有人还来敲瓮，是他自己的事。"] }
          ] }
        ]
      }
    ]
  });
})(window);
