/* 山河十四卷 v1.0 · 八大门派师门长卷与江湖散修后续 */
(function (root) {
  "use strict";
  const JY = root.JY;

  function cast(name, art = "assets/foe-master.webp") {
    return {
      say: (text) => ({ show: { right: art, active: "right" }, say: [name, text] }),
      reply: (text) => [name, text]
    };
  }

  function hero(text) {
    return { show: { active: "left" }, say: ["主角", text] };
  }

  function scene(regionId, ...roomIds) {
    const region = JY.REGIONS[regionId];
    return { region: regionId, room: roomIds.find(id => region.rooms[id]) || region.entry };
  }

  function locationHint(trigger, activity) {
    const region = JY.REGIONS_META[trigger.region];
    const room = JY.REGIONS[trigger.region].rooms[trigger.room];
    return `到「${region.name} · ${room.name}」${activity}`;
  }

  function registerSect(sect, title, summary, episodes) {
    const phases = ["trial", "tournament", "crisis"];
    JY.registerQuest("sect_arc_" + sect, {
      title,
      summary,
      episodes: episodes.map((episode, index) => ({
        id: `${sect}_${phases[index]}`,
        reqSect: sect,
        ...(index > 0 ? { reqFlag: `${sect}_${phases[index - 1]}_played` } : {}),
        ...episode,
        hint: locationHint(episode.trigger, episode.hint)
      }))
    });
  }

  const huicheng = cast("慧澄", "assets/npc-monk.webp");
  registerSect("shaolin", "少林长卷 · 空匣满山", "从一只漏雨的米斗追查藏经阁空匣失踪的真相，决定寺里如何保住冬粮。", [
    {
      title: "入门试炼 · 借米问心",
      trigger: scene("songshan"),
      hint: "接受慧澄的试炼。",
      steps: [
        huicheng.say("今日头一门功课，替粥棚补上缺的三斗米。库房钥匙在我这里，谁开口借，都要记名字。"),
        hero("山门外已经排了十几个人。再把他们挨个问一遍，今晨这顿就要过了。"),
        huicheng.say("昨日也有人这么说，今日库里少了一袋，谁都道没见过。急着开门容易，关门以后呢？"),
        hero("地上这道白线从库门一直到柴房。那袋米也许是被拖走的。"),
        huicheng.say("近前看，白线是裂底漏下来的，柴房里也果然有半袋。拿走它的人还知道搁一只干斗在底下。"),
        hero("半袋还能煮，剩的就要借。若在账上只写我一个，往后追问也只该找我。"),
        huicheng.say("写你一个，丢米的人也就藏进了你名字底下。可以先看米袋，也可以把这锅粥先端出去。"),
        hero("鼓还没响。今日第一笔账，我得知道自己在替谁记。"),
        { choice: [
          { text: "先补粥棚，再以自己的名义立一笔限期查补的账", effect: { moral: 4, exp: 180, skill: "luohan", setFlag: "shaolin_pledged_rice" }, reply: huicheng.reply("你肯签名，老衲便在底下添自己的。明早天冷，煮粥时先把斗烘干。") },
          { text: "查清漏米的缘故，把余粮另装一袋再启仓", effect: { exp: 200, gold: 80, skill: "luohan" }, reply: huicheng.reply("记下袋口这道横针线。米袋是从藏经阁搬出来的，库房自己的袋子都缝直针。") }
        ] }
      ]
    },
    {
      title: "门派大比 · 木人巷一袋米",
      trigger: scene("songshan", "ss_wood", "songshan_inner"),
      hint: "参加木人巷大比。",
      steps: [
        huicheng.say("木人巷改了规矩。背袋米过关，米少一撮，纵打脱七具木人的胳膊也得判负。"),
        hero("巷道干了大半，唯独第三具木人底下有一片新米糠。"),
        huicheng.say("昨夜寺里没动过木人。你可踏着前四名的步子过去，也可验一验那块脚板。"),
        hero("踩下便有人看见脚板升降。若拆开来查，比赛的锣就过了。"),
        { ...huicheng.say("你那笔账还没结。粥棚的人今晨捡到几根断针，针孔跟米袋上的横线一样细。"), ifFlag: "shaolin_pledged_rice" },
        { ...huicheng.say("你留下的破袋我带来了。木人缝里也卡着这色麻线，两处兴许是同一把针。"), unlessFlag: "shaolin_pledged_rice" },
        hero("有人在比赛里再借一袋米，败者只会以为自己走得不稳。"),
        huicheng.say("前头的人过了，锣让我拦住了。你打算同哪一边的人一起看清楚？"),
        hero("我想让他们亲手量袋。米粒进了谁家仓，木人不会开口。"),
        { choice: [
          { text: "请落败弟子共同拆验脚板，当众更正大比结果", effect: { moral: 3, exp: 320, item: "dan_chongmai", setFlag: "shaolin_open_hearing" }, reply: huicheng.reply("明日藏经阁开门，你请这些弟子也来。米斗交给他们执。") },
          { text: "保留原封麻袋，记下脚板异响后照常走完大比", effect: { exp: 280, gold: 180, item: "dahuandan" }, reply: huicheng.reply("我记下你这一趟的足音，明日当着库僧的面再走。") }
        ] }
      ]
    },
    {
      title: "师门危机 · 藏经阁空匣",
      trigger: scene("songshan", "ss_library", "songshan_inner"),
      hint: "查问藏经阁空匣。",
      steps: [
        huicheng.say("天快亮时，阁里一口书箱让人抬走了。里头搁的原是空匣，借米的账夹在隔板里。"),
        hero("箱脚的铜包角裂了一枚，地上每隔三步便有弧痕。抬箱的人还没走远。"),
        { ...huicheng.say("昨晚那几名落败弟子替我们守着运粮门，把箱拦下了。他们只等亲眼看账。"), ifFlag: "shaolin_open_hearing" },
        { ...huicheng.say("我和库僧验过木板，押运的掌柜吃了惊，今晨雇黑风寨的人到寺外抢箱。"), unlessFlag: "shaolin_open_hearing" },
        hero("账里有粥棚领米人的名字。真要开匣，先把他们的名帖取出来。"),
        huicheng.say("那掌柜卖过庙里的米，买来的却是他病儿的药。这个缘故也要留下，省得他明年还是只能偷。"),
        hero("把他每次出米的数目和药钱留下。让领米人来辨账之前，先给病孩子一顿饭。"),
        huicheng.say("留账归留账。那三斗米往后三个月怎样补，今夜就得有人守着第一车走回来。"),
        hero("我去库门等车，寺外若有人拦，我也等在那里。"),
        { ifFlag: "shaolin_open_hearing", choice: [
          { text: "与大比同门共验借米账，按议定份额追回冬粮", effect: { exp: 520, moral: 6, skill: "yijinjing", item: "dahuandan" }, reply: huicheng.reply("第一车回来了。易筋一篇我抄在清账的背后，墨没干，你拿平些。") }
        ] },
        { unlessFlag: "shaolin_open_hearing", battle: "jiumozhi", winReward: { exp: 520, gold: 280, skill: "yijinjing" }, winNar: "你以少林禅功力挫趁乱闯阁的吐蕃国师鸠摩智，追回借米账并护住冬粮，慧澄将易筋经抄卷交到你手上。" }
      ]
    }
  ]);

  const yucen = cast("武当俞岑", "assets/npc-taoist.webp");
  registerSect("wudang", "武当长卷 · 云梯寿席", "守住风雨中的山道，择一条平常人也能走的路，赴一席百岁寿宴。", [
    {
      title: "入门试炼 · 紫霄问心",
      trigger: scene("wudang"),
      hint: "问俞岑入门功课。",
      steps: [
        yucen.say("试炼便在山门。今日挑灯上山，不许熄火，灯油能留几分全看你自己。"),
        hero("风从连廊底下卷上来。在灯外搭一层纱，火倒稳，提灯的人就看不见脚下了。"),
        yucen.say("山路尽头还住着一位盲了多年的贺伯。天晚了，他听这儿的铜灯摇响认门。"),
        hero("灯底的铜铃有一道缺口，只有崖边那段会响。风把旧灯吹倒了？"),
        yucen.say("昨日有人取去桥栏的一枚楔子做寿礼，桥索松了，灯也倾向山下。"),
        hero("灯须上山，桥还得有人走。难道宫里只有一盏灯？"),
        yucen.say("师兄们等着看你轻功，贺伯等着一声响。你可教他们一起搬灯，也可自己先到对岸挂铃。"),
        hero("好，等贺伯过了桥，再问竹签上是谁的名次。"),
        { choice: [
          { text: "请同门结伴搬灯，沿途按次序换手护焰", effect: { exp: 210, item: "dan_chongmai", setFlag: "wudang_shared_lantern" }, reply: yucen.reply("手换了三双，火一直安稳。真武七截练的便是这口不断的气。") },
          { text: "轻身先过，替贺伯把铃挂到桥头扶手上", effect: { exp: 180, skill: "yanzi", attr: { agi: 1 } }, reply: yucen.reply("你收了掠廊的劲，铃响却半点未少。再上山，记得回头听一听。") }
        ] }
      ]
    },
    {
      title: "门派大比 · 真武七截护桥阵",
      trigger: scene("wudang", "wd_nanyan", "wudang_inner"),
      hint: "参加真武七截大比。",
      steps: [
        yucen.say("论阵那块石台，先借给山下来的轿夫。大比移到桥上，七人从对面往回走。"),
        hero("轿夫这双湿鞋像刚从河里捞出来。开锣时外山还无雪，怎么一眨眼都化成了水？"),
        yucen.say("上游泄了水。明日贺寿的客人还在路上，大比得顺便试出桥最多受得住几个人。"),
        { ...hero("昨晚提灯的人已认得换手顺序。照那个站法，就算有人跌脚也有同伴扶。"), ifFlag: "wudang_shared_lantern" },
        { ...hero("桥头那只铜铃一摇，崖面便有第二声回响。从对岸也能听出这里少了几人。"), unlessFlag: "wudang_shared_lantern" },
        yucen.say("阵眼可以留半步，也可以追求一式七响，那样七人都走得快些。"),
        hero("留半步，倒下的人有地方站。齐步过去，桥西的木栈道更早拿到药。"),
        yucen.say("两边都有你的同门。落子前想想明日上山的，还有走得动多快的人。"),
        hero("让每个人踏到该踏的那块桥板吧。最后一锣等人都到岸再敲。"),
        { choice: [
          { text: "留半步给风雨大的时候，改练逐人轮换护桥", effect: { moral: 3, exp: 330, skill: "taijiquan", setFlag: "wudang_reserved_step" }, reply: yucen.reply("缺了半步还能稳，这是太极劲。明日把慢的客人先接进来。") },
          { text: "让七人齐步通过，抢先把药送往桥西", effect: { exp: 380, skill: "tiyun" }, reply: yucen.reply("七步踏得像一步。桥西正好缺人手，明日你去迎寿客。") }
        ] }
      ]
    },
    {
      title: "师门危机 · 百岁寿席的大雨",
      trigger: scene("wudang", "wudang_inner"),
      hint: "赴百岁寿席。",
      steps: [
        yucen.say("寿钟只响了一声。贺寿的二十八家客人都堵在桥西，前头的人还扛了沉得动不了的礼箱。"),
        hero("等雨止也来不及了。桥上有人涉水往回走，看那步子是贺伯。"),
        { ...yucen.say("照你昨日留的半步，桥头已经接下来六个人。铃还在响，可以让他跟着走。"), ifFlag: "wudang_reserved_step" },
        { ...yucen.say("昨日送去的药保住了贺伯的腿。桥下水急，弟兄们可从山腰绕到他身后，再迎他下去。"), unlessFlag: "wudang_reserved_step" },
        hero("贺伯手上是一把寿面。他说自己煮的一锅，不来尝一口，今日便还算不上大寿。"),
        yucen.say("主桌少一把椅子就少一把。怕的是山西那些客人看见门关了，再往桥上挤。"),
        hero("在西岸也开席，先厚着脸皮把贺伯那锅面分了。礼箱搬开做席凳。"),
        yucen.say("寿星肯自己在檐下端一只碗。你先拿碗给抱孩子的人，他们下山这一身还是湿的。"),
        hero("等这阵雨歇了，咱们再一起把没响完的寿钟敲了。"),
        { ifFlag: "wudang_reserved_step", choice: [
          { text: "以护桥阵接住慢行客，在西岸分席", effect: { exp: 530, moral: 6, skill: "taijijian", item: "dahuandan" }, reply: yucen.reply("今日谁也没落在桥上。这一路太极剑，先学让身，再学递剑。") }
        ] },
        { unlessFlag: "wudang_reserved_step", battle: "cheng_kun", winReward: { exp: 560, gold: 260, skill: "taijijian", item: "dan_chongmai" }, winNar: "你于风雨木栈道上以柔克刚击退趁乱闯山窥探谢逊下落的混元霹雳手成昆，护住西岸百岁寿席，俞岑当场传授太极剑精要！" }
      ]
    }
  ]);

  const luyoujiao = cast("鲁有脚");
  const huangrong = cast("黄蓉", "assets/mate-huangrong.webp");
  registerSect("gaibang", "丐帮长卷 · 杏灯照旧约", "从襄阳施粥的错号追至旧杏林，在争执中决定一纸救济名册留在谁手里。", [
    {
      title: "入门试炼 · 巡城识三碗",
      trigger: scene("xiangyang", "xy_gaibang"),
      hint: "接鲁有脚的巡城差事。",
      steps: [
        luyoujiao.say("手里三只碗，城东城西城北各送一只。碗空着，回来时你说得出每只碗该盛几碗粥就行。"),
        hero("城东墙边同一户领了两只，问却各说各姓。是换了姓来冒领？"),
        luyoujiao.say("昨晚搬进来的是祖孙，老的从北城粥棚领碗，小的在城西织席，户牌还挂在原地。"),
        hero("两人都该吃。城北的碗也不能因此短一只，得给没来的人另留着。"),
        luyoujiao.say("留粥易，记号难。净衣派想写名字，污衣派习惯用竹筹，各有各的理。"),
        hero("竹筹扔了，也换得一只新的。写了姓，又怕有仇家认出来。"),
        luyoujiao.say("给对面两位执碗人准备同一个说法。下回帮会大比，拿它来试一试。"),
        hero("这三只碗我都送完了。胡同尽头还有人没上册，册子今天得留一行空字。"),
        { choice: [
          { text: "按巷补录旧户牌，请执碗人核对重名", effect: { exp: 230, gold: 70, setFlag: "gaibang_kept_names" }, reply: luyoujiao.reply("领粥人来验账时，只向他念自己那行。册子由我锁着。") },
          { text: "请各巷做有记号的竹筹，持筹领粥", effect: { exp: 180, moral: 4, item: "dish_chicken" }, reply: luyoujiao.reply("多余一根也封起来，不叫没领粥的人受屈。") }
        ] }
      ]
    },
    {
      title: "门派大比 · 君山传筹",
      trigger: scene("xiangyang", "xy_gaibang"),
      hint: "参加君山大比襄阳分场。",
      steps: [
        huangrong.say("咯咯，今年君山大比在各舵先验功课。咱们比接三根筹，谁能在喝完一碗粥前找齐人，谁就有彩头。"),
        hero("第一根筹丢在灯下，第二根在门闩后，第三根怎么让人削去了尾巴？"),
        huangrong.say("后厨送来的粥少了两桶。靖哥哥路过城北，见有人给外乡人换新筹，还收银钱。"),
        { ...hero("我有一册旧户牌，可以核对后来添上的人。那本册子还锁在鲁长老手里。"), ifFlag: "gaibang_kept_names" },
        { ...hero("各巷竹筹上有不同的缺口。这几根长得太齐整，都是同一把刀刻的。"), unlessFlag: "gaibang_kept_names" },
        huangrong.say("本姑娘能算出账从哪个柜子改过。想捉个现行，还要晓得何时有人去买筹。"),
        hero("若当街揭穿，掏钱买过筹的孩子往后就不敢来领了。"),
        huangrong.say("好耳力。听见他们捏着铜钱响了？本姑娘留了三根干净筹，给你定个章程。"),
        hero("粥先留着。过会儿不论谁先找到人，门都开半扇。"),
        { choice: [
          { text: "（烹饪 Lv2）从粥桶、火候与出锅时辰追认后厨缺额", reqLife: { cook: 2 }, effect: { exp: 320, skill: "dagou", item: "dish_yudi", setFlag: "gaibang_proved_kitchen" }, reply: huangrong.reply("盖子里水汽还热，是新煮的粥！原汤原簿在这儿，杏林那边要带上。") },
          { text: "把原筹交回巷里，让三个粥棚的伙计共同清点重开", effect: { moral: 4, exp: 300, item: "dan_chongmai", skill: "dagou" }, reply: huangrong.reply("三家都肯再开锅。有人写帖子邀他们到姑苏杏子林，咱们得带着旧筹去分个是非。") }
        ] }
      ]
    },
    {
      title: "师门危机 · 老杏林风波",
      trigger: scene("suzhou", "sz_xingzi", "suzhou_inner"),
      hint: "赴丐帮杏林之会。",
      steps: [
        luyoujiao.say("林子里埋了三十只灯，一家一盏。方才有人写我徇私，把帖子挂在最小的灯上。"),
        hero("写字的人认得我在巡城时放的空行。他兴许也有一户人没能领到粥。"),
        { ...luyoujiao.say("黄帮主把后厨验过的原汤送来了，这几位执灯人已认出换筹的是谁。"), ifFlag: "gaibang_proved_kitchen" },
        { ...luyoujiao.say("三个粥棚都来了。也有人雇了黑风山贼来拔这排灯，怕各区的筹对在一处。"), unlessFlag: "gaibang_proved_kitchen" },
        hero("请他们把灯挪到石碑旁，先让孩子过去。谁说哪一户少领，就让哪一户先说。"),
        luyoujiao.say("我糊涂时答应看净衣污衣两份账，忘了粮仓只有一间。两份账合了，差额也要有人认。"),
        hero("明日补粥时我在棚里候着。谁交钱换过筹，也能凭原来的碗领。"),
        luyoujiao.say("好。丐帮的灯不是什么帮规的一柱香，落在人脚边就该照着他回家。"),
        hero("请长老守住最小那盏。这边晃得厉害，我先过去。"),
        { ifFlag: "gaibang_proved_kitchen", choice: [
          { text: "凭原汤原簿对账，让领粥各巷选一人同管名册", effect: { exp: 520, moral: 6, item: "dish_yudi", skill: "xianglong" }, reply: luyoujiao.reply("总账今夜就分三处保管。待你练降龙掌，第一招先打空处，试试收劲。") }
        ] },
        { unlessFlag: "gaibang_proved_kitchen", battle: "bandit_boss", winReward: { exp: 470, gold: 210, skill: "xianglong" }, winNar: "你护住杏林灯阵，执碗人与帮中长老合了两份粥簿。鲁有脚借一截杏枝演示降龙十八掌的起式。" }
      ]
    }
  ]);

  const linghu = cast("令狐冲", "assets/mate-linghu.webp");
  registerSect("huashan", "华山长卷 · 崖上无名", "剑气大比起于山路护索，终于思过崖上一场关系两宗弟子的翻案。", [
    {
      title: "入门试炼 · 朝阳索桥",
      trigger: scene("huashan"),
      hint: "与令狐冲试走索桥。",
      steps: [
        linghu.say("这柄木剑送去对岸。过桥不论招式，酒坛不洒便算过一关。"),
        hero("桥下翻云，桥板少了半截。我若蹲下来补，坛口就会斜。"),
        linghu.say("会补桥是你的本事，会把坛子交给别人也算。左边那位是气宗来的师弟，右边是剑宗来的。"),
        hero("两位都不肯先伸手，昨日他们是不是比了剑？"),
        linghu.say("只比三招，比完了八句门规，倒比三百招还累。"),
        hero("拾剑那人手心有茧，掌势等着托桥栏。另一个看见断板，早把鞋尖挪开了。"),
        linghu.say("你眼力好。他俩若都肯替对方伸一次手，剩下这截路连风也省三分。"),
        hero("坛子给他们。我拿木剑来横试一下两边的绳宽。"),
        { choice: [
          { text: "请两宗各一人接力递坛，结伴修补桥板", effect: { exp: 200, skill: "hsjian", moral: 3, setFlag: "huashan_shared_rope" }, reply: linghu.reply("酒还在，桥也在。等大比点名时，别漏了替人接坛子的那个。") },
          { text: "请各自留守一端，亲赴断板处量绳试脚", effect: { exp: 210, skill: "hsjian", item: "ore_iron" }, reply: linghu.reply("稳得很。去告诉对岸，能踏住断板这事，单凭一门功夫也能成。") }
        ] }
      ]
    },
    {
      title: "门派大比 · 剑气换位",
      trigger: scene("huashan", "hs_court", "huashan_inner"),
      hint: "参加剑气大比。",
      steps: [
        linghu.say("台上摆两块借来的石屏，上头刻剑谱。裁判规定剑气各守一侧，换位便算犯规。"),
        hero("若屏上有写反的字，须从另一侧看，怎么能守在原地？"),
        { ...linghu.say("昨日替你抬酒的两位师弟愿意作证。你敢请他们当众换位，就有人敢跟着看。"), ifFlag: "huashan_shared_rope" },
        { ...linghu.say("大比的见证只有那位裁判；他固执些，倒也会低头看你剑尖到底指着哪儿。"), unlessFlag: "huashan_shared_rope" },
        hero("剑谱上反了一字，两边却各说对方刻错。看笔划，这似乎是块从整片石壁上卸下来的屏。"),
        linghu.say("思过崖还有后半块。上回有人去看，石屏旁的铁桩拔了，那人的手指也伤了。"),
        hero("比试一误，两边都会在同一个错字上争到明年。"),
        linghu.say("那就挑明，或赢完再拿你的办法请他们上崖。你若需要一个后退的借口，酒坛就在台下。"),
        hero("我能让裁判看剑锋落点。至于那块遗石，怕得两宗一起去认。"),
        { choice: [
          { text: "请两宗互换石屏投影，当众更正招谱", effect: { exp: 350, skill: "zixia", setFlag: "huashan_swapped_screens" }, reply: linghu.reply("他们换手的时候都笑了。明日跟我上思过崖，原处是怎样的，该一起瞧。") },
          { text: "守规完成比试，把错字拓印与个人铜签一并交给裁判", effect: { exp: 300, gold: 160, item: "dan_chongmai" }, reply: linghu.reply("这铜签能让他肯开口。去思过崖时别走得太急，那条栈道又窄又滑。") }
        ] }
      ]
    },
    {
      title: "师门危机 · 思过崖卸剑",
      trigger: scene("huashan", "hs_siguoya", "huashan_inner"),
      hint: "去查验思过崖原刻。",
      steps: [
        linghu.say("外门请来的五岳见证堵了山道。石洞里有人收剑谱，赶在天亮前要盖翕门。"),
        hero("墙上那字下的刻痕接着一条裂缝。原来屏上的一撇是石头自己裂开的。"),
        { ...linghu.say("昨晚换过位的两队弟子早把那片壁沿拓了两份。见证不让他们进去，他们就在栈道上摊开。"), ifFlag: "huashan_swapped_screens" },
        { ...linghu.say("裁判愿意替你举拓片。有人却从聚贤庄请了拳客，要先让你把铜签留下。"), unlessFlag: "huashan_swapped_screens" },
        hero("铜签刻的是我，崖上留下的黑字得由大家认。先把盖门用的磐石搁回去。"),
        linghu.say("两边都想抢回自己的一份剑谱。留一本在崖上，让再来的弟子都能看，倒未必有人肯做。"),
        hero("拓片可带走，原处留空。回去把那些错认的剑式也添上年份，让后人看清前人也会读错。"),
        linghu.say("上山前我温了一坛酒。你留下哪式剑，等他们平心静气了再问。"),
        hero("那便先把手从剑柄上拿开，留一只手去扶住石扉。"),
        { ifFlag: "huashan_swapped_screens", choice: [
          { text: "展两份原刻拓片，当场把石屏归给两宗共同看守", effect: { exp: 560, moral: 5, skill: "dugu", item: "wine_monkey" }, reply: linghu.reply("改字那一撇交回山风。这卷独孤九剑你收好，它最怕拿一句成法挡住人。") }
        ] },
        { unlessFlag: "huashan_swapped_screens", battle: "zuo_lengchan", winReward: { exp: 560, gold: 280, skill: "dugu" }, winNar: "你力破左冷禅的寒冰真气守住思过崖原刻！见证亲手去掉了误写的一笔，令狐冲在石扉半开处留给你九剑初卷。" }
      ]
    }
  ]);

  const zhiruo = cast("周芷若", "assets/mate-zhouzhiruo.webp");
  registerSect("emei", "峨眉长卷 · 剑留西窗", "守住金顶一册病簿，把一场试剑留下的人情和承诺带到万安寺。", [
    {
      title: "入门试炼 · 金顶清修",
      trigger: scene("emei", "emei_hall"),
      hint: "同周芷若值更。",
      steps: [
        zhiruo.say("师父命我看守香案上的剑。你今夜与我一道值更，若有人来讨药，先问他从哪条山路上来。"),
        hero("这几张问诊纸都剪去了一角，是拿来垫香炉的？"),
        zhiruo.say("原是看病的凭帖。去年有位从汉水来的妇人不识字，我折一角给她认。后来人人都折，便容易混。"),
        hero("方才有个孩子在西窗下等，捏着的凭帖没有折角。"),
        zhiruo.say("他来过两次，担心领了药会叫人瞧见他娘的病。她在山下替我们缝过三季衣裳。"),
        hero("那就让西窗能递得出东西。我们值更，也守那扇窗。"),
        zhiruo.say("若由你递药，剑便须我一人看。若你肯看剑，我可以替他端一碗汤。你信得过谁？"),
        hero("信得过今夜还有人来。所以香案的灯留着，西窗的也留着。"),
        { choice: [
          { text: "（炼丹 Lv2）接过药炉，照病簿分药并回查剪角凭帖", reqLife: { alchemy: 2 }, effect: { exp: 250, item: "dan_chongmai", setFlag: "emei_kept_prescriptions" }, reply: zhiruo.reply("你手稳，字也写得明白。我把剩下的凭帖交给你，谁也不会少。") },
          { text: "留下看守香案，请周芷若从西窗把药递给孩子", effect: { moral: 5, exp: 190, item: "jinchuang" }, reply: zhiruo.reply("他走得轻，回头却向这扇窗拜了拜。今日算我们两人当值。") }
        ] }
      ]
    },
    {
      title: "门派大比 · 金顶试停剑",
      trigger: scene("emei", "em_swordcourt", "emei_hall", "emei_inner"),
      hint: "参加试剑大比。",
      steps: [
        zhiruo.say("今日试剑，剑尖停在三寸之外方算一筹。打落对手的簪子，反倒要扣一筹。"),
        hero("师姐的袖口又湿，又沾着几缕勒丝。比试前她还走了一趟山下？"),
        { ...zhiruo.say("你的凭帖有一张被人带去了万安寺。她替我问过，也没问到那户人归家没有。"), ifFlag: "emei_kept_prescriptions" },
        { ...zhiruo.say("西窗下等药的孩子今早带来一枚塔铃。他说母亲在万安寺帮工，那里已经三日闭门。"), unlessFlag: "emei_kept_prescriptions" },
        hero("她手还在发抖，刚才的第一剑已尽力停住了。再比下去只会让她难过。"),
        zhiruo.say("你可以先让一筹，但擅自下台，那面白旗会记在你头上。"),
        hero("若同她比两趟递剑的步子，又怎么判？山路上也常有人比这更急。"),
        zhiruo.say("师门重规矩。你选的法子，总该能当着所有人说清缘由。"),
        hero("裁剑之前，请记下台下有人等她。这一笔同我的名次一道念。"),
        { choice: [
          { text: "请同门轮替试剑，把大比用的旗改来召集接应", effect: { exp: 350, moral: 4, skill: "yitian", setFlag: "emei_raised_relief_flag" }, reply: zhiruo.reply("我记作你先请停剑。旗先由受伤的师姐收着，她若还能走，明日第一个去。") },
          { text: "完成试剑，取胜后用彩头换万安寺的帮工名单", effect: { exp: 310, gold: 180, skill: "yitian" }, reply: zhiruo.reply("名单上没有外来杂役，病簿上的几个人写在背页。去塔下时记得翻看。") }
        ] }
      ]
    },
    {
      title: "师门危机 · 万安寺塔铃",
      trigger: scene("wanan", "wa_tower", "wanan_inner"),
      hint: "接应受困的帮工。",
      steps: [
        zhiruo.say("塔铃塌下一串，第三层还有脚步。领工的扣了借据，非要人按手印才放走。"),
        hero("门下湿泥有往返的鞋印。住在三层的妇人刚才下过楼，有人逼她再上去。"),
        { ...zhiruo.say("咱们的白旗在塔南，守门人只有一双眼，师姐们已经接了七个人下梯。"), ifFlag: "emei_raised_relief_flag" },
        { ...zhiruo.say("名单上的人都在塔里。我叫了他们名字，一名蒙古暗桩听见，立刻抽刀去锁门。"), unlessFlag: "emei_raised_relief_flag" },
        hero("那口箱里全是手印，不带箱子走，将来又有人找他们要银子。"),
        zhiruo.say("师父给我的剑原是用来护山门的。山门之外那些人等我们一句话，该不该也算？"),
        hero("把孩子那枚塔铃挂回去。铜声响一次，名单上还剩一户没走。"),
        zhiruo.say("我站在下梯处听，你在门口看清人。若一定要落剑，回来让我验过刃口。"),
        hero("待最后一户下塔，我陪你回峨眉把名单交还给他们自己。"),
        { ifFlag: "emei_raised_relief_flag", choice: [
          { text: "趁同门接应，把借据当着众人交还每户", effect: { exp: 530, moral: 7, skill: "jiuyin", item: "dahuandan" }, reply: zhiruo.reply("这一页九阴总纲是我读过最难的一页。你先拿去，批注明日我补给你。") }
        ] },
        { unlessFlag: "emei_raised_relief_flag", battle: "miejue_boss", winReward: { exp: 560, gold: 260, skill: "jiuyin" }, winNar: "你挺身接下灭绝师太三成剑威的试剑绝招，护住塔门放走帮工，周芷若临行默写一页九阴总纲交你收存。" }
      ]
    }
  ]);

  const dragon = cast("小龙女", "assets/mate-xiaolongnv.webp");
  const yangguo = cast("杨过", "assets/mate-yangguo.webp");
  registerSect("gumu", "古墓长卷 · 白丝渡谷", "从寒玉石室牵出一截白丝，决定情花开遍的山谷怎样留下第二条路。", [
    {
      title: "入门试炼 · 寒玉听水",
      trigger: scene("gumu", "gumu_inner", "gumu_hall"),
      hint: "按小龙女的嘱咐听滴水。",
      steps: [
        dragon.say("在床边坐一炷香。只数水滴，旁的声响由它去。"),
        hero("前九滴一样响，第十滴像掉进了空瓮。石墙后面还有一间屋？"),
        dragon.say("是一条去玉蜂房的槽。昨夜水线变了，石缝里有朽木。"),
        hero("数到五十声，它还会更低。若我离席去看，刚才这炷香便要重来。"),
        dragon.say("你要去便去。记下走前听见了什么，以便坐回来时认得。"),
        hero("我想沿木槽系一根白丝。这一路纵然走得慢，回头也看得见。"),
        dragon.say("丝放床背了。你也可等水滴自己露出破口，别碰松动的石板。"),
        hero("第二声来了，旧槽和新槽之间只隔一掌远。"),
        { choice: [
          { text: "用白丝标出穿墓水槽，绕过去清掉浮木", effect: { exp: 220, skill: "yunvjian", setFlag: "gumu_marked_thread" }, reply: dragon.reply("这根丝等你收起来。路已记在手上，下次从哪头走都好。") },
          { text: "守听至香尽，靠滴声判断堵塞所在", effect: { exp: 210, attr: { int: 1 }, skill: "yunvjian" }, reply: dragon.reply("你起身时没有踩到空板。待滴声听得熟了，玉女剑也会稳。") }
        ] }
      ]
    },
    {
      title: "门派大比 · 白丝试双剑",
      trigger: scene("gumu", "gm_waterway", "gumu_hall", "gumu_inner"),
      hint: "参加双剑较技。",
      steps: [
        yangguo.say("说什么门派大比，也只有这几个人。我同姑姑摆了两把木剑，一根旧练丝，你来了便认一种走法。"),
        hero("丝绷在剑身上，越用力反倒越容易断。比双剑的阵脚也要随水声变么？"),
        { ...yangguo.say("认得墙上这几段白丝？就沿你清木槽那条路比，折身还够踏一步。"), ifFlag: "gumu_marked_thread" },
        { ...yangguo.say("姑姑说你坐得住。那就闭一闭眼，学着在最轻的那滴上应剑。"), unlessFlag: "gumu_marked_thread" },
        hero("对手忽然落剑，剑下那一格进水了。有人拆了槽末新换的木闸？"),
        yangguo.say("绝情谷捎来一段同样的白丝，说是上游老闸年久不肯开，谷里人被水逼进花圃。"),
        hero("练过的这截丝可以拿去量水，却未必人人都能从木闸旁过。"),
        yangguo.say("重剑无锋，开闸靠的是下得住手。我想练两套遇断还能接的剑，你看如何？"),
        hero("先试一人失手的时候。这一剑收住了，你从另一边接。"),
        { choice: [
          { text: "以双剑递丝，练出交接后仍能彼此护住的绳路", effect: { exp: 340, moral: 3, item: "ore_xuantie", setFlag: "gumu_rehearsed_line" }, reply: yangguo.reply("线的两头都有人接了。这一丈留给谷里，到了花圃先找能下脚的石头。") },
          { text: "以落剑的余劲托住水闸，专练一人开闸的重势", effect: { exp: 330, skill: "xuantie", item: "dahuandan" }, reply: yangguo.reply("重势练成了。若旧闸不肯开，我在石坝那头接你。") }
        ] }
      ]
    },
    {
      title: "师门危机 · 情花圃涨水",
      trigger: scene("jueqing", "jq_flower", "jueqing_inner"),
      hint: "接应受困谷民。",
      steps: [
        dragon.say("水把石路盖了。头一道坡上还有两个人，花枝压得低，谁走都容易碰刺。"),
        hero("东头水涨得快，花棚支脚还在。若先到柱下，便可让他们背朝花墙下来。"),
        { ...dragon.say("过儿把比剑时那丈白丝带来了。扶绳的人相互照看，一回送一人。"), ifFlag: "gumu_rehearsed_line" },
        { ...dragon.say("过儿站在石坝下，闸能松一指宽。你在上面托着，我来叫坡上的人趁水落下来。"), unlessFlag: "gumu_rehearsed_line" },
        hero("还有一条船拴在树后。船主人叫我们先顾人，那棵树若倒了，他也愿意换根桩。"),
        dragon.say("有人在花圃立过誓，说这路一辈子都不走。我瞧现在肯走的人，都盼着平安到岸。"),
        hero("先带孩子下去。走到岸上，再慢慢问他想把船拴在哪里。"),
        dragon.say("你守的这头，我来守另一头。眼前见得着就好。"),
        hero("等他们登船，某日还可以沿这条白线走回来。"),
        { ifFlag: "gumu_rehearsed_line", choice: [
          { text: "让白丝留给谷民引路，护住原闸与渔船", effect: { exp: 530, moral: 6, skill: "anran", item: "dahuandan" }, reply: dragon.reply("路留下了。过儿那一掌使过便懂，你同他去坝上看一遍。") }
        ] },
        { unlessFlag: "gumu_rehearsed_line", battle: "valley_crocodile", winReward: { exp: 520, gold: 220, skill: "anran", item: "ore_xuantie" }, winNar: "你跃下石坝斩退趁涨水扑岸的鳄潭恶鳄，护送谷民平安登船，杨过与小龙女在坝上将黯然销魂掌诀倾囊相授！" }
      ]
    }
  ]);

  const jingwu = cast("逍遥静梧", "assets/npc-taoist.webp");
  registerSect("xiaoyao", "逍遥长卷 · 三让换一局", "一盘珍珑下到无人应劫，旧日同门却循棋谱归山，只为取回一块被除名的木牌。", [
    {
      title: "入门试炼 · 珍珑一口气",
      trigger: scene("wuliang", "wl_cave"),
      hint: "听静梧讲珍珑。",
      steps: [
        jingwu.say("棋盘上十四个空眼。第一回且别算活，拣一处你觉得不该下的地方。"),
        hero("角上留一口气，两边的子都靠它活。落子之后，我这一边也没路退。"),
        jingwu.say("这盘先前的主人从来只留给一方。学他容易，少一步就得另想。"),
        hero("盘脚垫的木牌写着一个宁字。先前的主人叫宁？"),
        jingwu.say("是一位早年出山的师兄。他把山下求药人的名字也刻在牌后，师门只认正面那个字。"),
        hero("他这局没有落完，白方八颗让出半角，今人却多摆了一子。"),
        jingwu.say("你可从正局解它，或将那颗新添的子拿掉。选了都得自己收棋。"),
        hero("我把剩下那一点空处先留着。肯回来的人，得还有地方坐。"),
        { choice: [
          { text: "（弈棋 Lv2）按棋势复盘，把多添的白子捡回木盒", reqLife: { chess: 2 }, effect: { exp: 260, skill: "hanbing", setFlag: "xiaoyao_restored_board" }, reply: jingwu.reply("你也看见少的那一点了。木牌先交给你，记得翻过来读。") },
          { text: "在死角试落一子，请静梧带走已无气的棋子", effect: { exp: 190, item: "dan_chongmai", skill: "hanbing" }, reply: jingwu.reply("送走一片，反能多出三回合。可记住这是怎么得来的。") }
        ] }
      ]
    },
    {
      title: "门派大比 · 缥缈峰借局",
      trigger: scene("wuliang", "wl_matstone", "wuliang_inner", "wl_cave"),
      hint: "参加逍遥大比。",
      steps: [
        jingwu.say("缥缈峰捎一盘棋来。赢的人须把最后一手送回山去，放在比试的人没见过的那个地方。"),
        hero("客人说这盘叫星棋，里面几颗棋倒扣着，背面都是缺笔的名字。"),
        { ...jingwu.say("你保留了木牌全貌。倒棋所缺的那几笔，恰好能和木牌后的人名缀成一处。"), ifFlag: "xiaoyao_restored_board" },
        { ...jingwu.say("照你上回的收局法，棋盒里正剩下几颗早先无气的。翻过来，能看见它们原来也刻过字。"), unlessFlag: "xiaoyao_restored_board" },
        hero("有人把下山求药的姓名分在两边。他们到了山门又互相辨不出来。"),
        jingwu.say("取走棋盘的人出自星宿门下，说掌门争棋争了十年，也该给山下欠药的人算一算。"),
        hero("先算欠下的药，人就知道这局和自己有关。他若仍要讨旧账，我明日把棋带来。"),
        jingwu.say("要么请求药人同来补字，要么换回残局，给他一席明白说话的地方。也许两事都有人不愿。"),
        hero("我留他那把椅子。但我们今日收的是棋，还要看看椅子背后有没有旁人的名字。"),
        { choice: [
          { text: "把两边棋子交原主补字，令星宿来客也在场核对", effect: { exp: 360, skill: "beiming", setFlag: "xiaoyao_invited_witnesses" }, reply: jingwu.reply("求药人肯同来。棋盘搬去石窟，把石案四面都挪出一席来。") },
          { text: "以赛中问到的原局换回木牌，约来客次日面谈", effect: { exp: 330, gold: 170, item: "herb_ginseng", skill: "beiming" }, reply: jingwu.reply("他要从石窟背后登山。路上跟着闲人，明日早些去候。") }
        ] }
      ]
    },
    {
      title: "师门危机 · 星宿还牌",
      trigger: scene("wuliang", "wl_cave", "wuliang_inner"),
      hint: "会见星宿来客。",
      steps: [
        jingwu.say("牌立回山门了，正面向里。他自署宁姓，却认不得我们这些年添上去的号。"),
        hero("他身后有两个孩子抱药罐。罐口盖了棋巾，烫得两个人一路换手。"),
        { ...jingwu.say("你请来补字的乡人认出了他。是药进了谁家的嘴，待他们当面认一遍。"), ifFlag: "xiaoyao_invited_witnesses" },
        { ...jingwu.say("面谈的闲人封了下山路，一名曾替蒙古探路的死士想夺他的名单。那人今日不肯让开。"), unlessFlag: "xiaoyao_invited_witnesses" },
        hero("木牌上宁字背对屋里，外头的人就看得见了。写过的名字没有改，只是换了面说话。"),
        jingwu.say("若山门准他重挂名牌，往后照谁的旧约放药？他说愿意交还师传，只求把那一项写清。"),
        hero("药不该靠辨谁哪一门。先给两只罐另找稳当的盖，再去找伙伴一起读人名。"),
        jingwu.say("这一步是你来落了。眼下那把椅子是空的，我可以扶着它等。"),
        hero("等这条路清了，我陪宁前辈把两只罐搬下来。"),
        { ifFlag: "xiaoyao_invited_witnesses", choice: [
          { text: "让山民对照牌背补录药债，在石窟席间重订领药约", effect: { exp: 550, moral: 5, item: "herb_ginseng", skill: "lingbo" }, reply: jingwu.reply("上山的人从左来，下山的人从右归。凌波的第一步，请你踏在中间。") }
        ] },
        { unlessFlag: "xiaoyao_invited_witnesses", battle: "jiumozhi", winReward: { exp: 560, gold: 280, skill: "lingbo" }, winNar: "你力破大轮明王鸠摩智的火焰刀绝学，守住无量石窟与药约，静梧以凌波微步带你绕过暗水。" }
      ]
    }
  ]);

  const wuji = cast("张无忌", "assets/mate-zhangwj.webp");
  registerSect("mingjiao", "明教长卷 · 六封守火信", "一叠借灯信卷入光明顶围山事变。每封信都有人等，要在天亮前找到可以送它下山的路。", [
    {
      title: "入门试炼 · 圣火巡山",
      trigger: scene("guangming", "gm_hall"),
      hint: "领取巡山用的灯信。",
      steps: [
        wuji.say("这六封信先送山脚。信上只写借灯，各自封着，村里人会认灯纸上的字。"),
        hero("有一封无名，封口还沾了山北营墙的药泥。那里已立旁派的望旗。"),
        wuji.say("我写给昨晚扶下山的守路人。手裂了还能扶人，他也许睡过了药时。"),
        hero("他认得咱们的灯么？挂错灯，另几营的人也会以为我们起了兵。"),
        wuji.say("所以有一封你得当面递。若他不方便接，就请相邻的营帮他看着，别在路上争门派。"),
        hero("另外五封还要赶在天亮前送到。若他醒不了，我可以坐一会，再走便要找同伴。"),
        wuji.say("这不是谁跑得快的试炼。你选如何分送，晚时算漏信的人来找我。"),
        hero("灯纸别拧得太严，剩一点空能让看信的人伸进手。"),
        { choice: [
          { text: "与巡山同门分送五封，亲自在北营等伤者醒来", effect: { exp: 230, moral: 4, item: "dahuandan", setFlag: "mingjiao_waited_for_guard" }, reply: wuji.reply("他醒了，问过我送灯的是谁。我给他留了把干椅子，下次他还可以来。") },
          { text: "把北营灯信请邻营伤医转交，先确保六营同时收信", effect: { exp: 210, gold: 100, item: "dan_chongmai" }, reply: wuji.reply("邻营也有人等着治手，多留了一盏灯，这个你算得准。") }
        ] }
      ]
    },
    {
      title: "门派大比 · 五散人挪灯",
      trigger: scene("guangming", "gm_platform", "guangming_inner", "gm_hall"),
      hint: "参加五散人大比。",
      steps: [
        wuji.say("五散人各自守一面铜罩。比试用的都是空灯，要在他们一轮掌风里护住最后那点灯焰。"),
        hero("有人把一面铜罩换作北营旧灯，我认得灯纸上的药泥。小旗上写的是借火两字。"),
        { ...wuji.say("守路人亲手带来的，说六派围山，北营有人想和我们借一条抬伤者的路。"), ifFlag: "mingjiao_waited_for_guard" },
        { ...wuji.say("邻营伤医寄来的，说药快见底，营里的人商量提早封山门。"), unlessFlag: "mingjiao_waited_for_guard" },
        hero("铜罩各有合缝，灯要轮流借一阵，掌风来了才看得见哪一面有破处。"),
        wuji.say("可把那盏旧灯一直亮着，教人认路。也可先把火分进两只小灯，在两侧暗道里做记号。"),
        hero("两条路不能结一个死扣。若误会起来，有了光，至少能看见先走过来的人空着手。"),
        wuji.say("今日的名次若让大家分了也好，衣裳给抬担架的弟子多备几件。"),
        hero("待换过这一轮罩子，请各位再试试护住另一盏。"),
        { choice: [
          { text: "把旧灯留在明处，各营按原路派人合护", effect: { exp: 380, moral: 4, skill: "qiankun", setFlag: "mingjiao_kept_open_lamp" }, reply: wuji.reply("我替你看住火。来人认得灯以后，先请他坐下换双干鞋。") },
          { text: "分灯守暗道，先安置六营中走不动的人", effect: { exp: 350, skill: "qiankun", item: "herb_ginseng" }, reply: wuji.reply("暗道里有一口井，搬过去便能接药。先请会下井的弟兄把水提上来。") }
        ] }
      ]
    },
    {
      title: "师门危机 · 六派围山借灯",
      trigger: scene("guangming", "gm_hall", "guangming_inner"),
      hint: "应对六派围山。",
      steps: [
        wuji.say("外头打了三次报时，第三回没人应。六派营里都有伤者，有人趁乱拿了北营的旗。"),
        hero("月亮沉到松梢，朝山下望，六道旗影只剩五道。那面失旗的营要让人先下去。"),
        { ...wuji.say("明灯一夜都没熄。北营那边已经有人来同咱们对信，请祭灯时先让这些人开口。"), ifFlag: "mingjiao_kept_open_lamp" },
        { ...wuji.say("暗道的伤者已安置。蒙古千夫长巴图带人扛假旗堵住井口，想叫双方误以为是夺井。"), unlessFlag: "mingjiao_kept_open_lamp" },
        hero("井水够六营用，旗却够叫两边打起来。只要看过那六封信，就能辨出谁来借过灯。"),
        wuji.say("还有两封被人踩破了。可以照样念名字，也可请还认得彼此的伤者先扶一扶。"),
        hero("念到没有回声的那一封，请旁边的人等一等，也许他的脚还不好抬。"),
        wuji.say("我守在火盆后面。拜山的礼我晚些再收，眼下每盏灯都得让人看得清下一步。"),
        hero("师兄弟拿布护在灯底。若井口还有人夺路，我去认认那面旗。"),
        { ifFlag: "mingjiao_kept_open_lamp", choice: [
          { text: "请六营伤者认领灯信，盟约议定后共护下山道路", effect: { exp: 580, moral: 7, skill: "jiuyang", item: "dan_chongmai" }, reply: wuji.reply("今日的门先让抱灯的人走。九阳一卷你收在袍里，外面风冷，慢些翻。") }
        ] },
        { unlessFlag: "mingjiao_kept_open_lamp", battle: "cheng_kun", winReward: { exp: 640, gold: 320, skill: "jiuyang" }, winNar: "你识破并力克幕后黑手成昆，夺回假旗并将井水送至六营！张无忌将九阳神功手抄册郑重递给你。" }
      ]
    }
  ]);

  const huangyaoshi = cast("黄药师", "assets/npc-huangys.webp");
  const hermit = cast("隐世奇人", "assets/npc-hermit.webp");
  const tideRoom = scene("taohua", "th_stone", "taohua_inner");
  const swordGrave = scene("huashan", "hs_swordpit", "hs_siguoya", "huashan_inner");
  JY.registerQuest("sanxiu_followup", {
    title: "江湖散修 · 残页渡风",
    summary: "续查无名残页血案。在桃花岛辨出残页没有写完的后半句，再赴华山还一卷旧剑谱。",
    episodes: [
      {
        id: "san_followup_4",
        title: "散修第四幕 · 潮音续页",
        reqUnaligned: true,
        reqFlag: "sanxiu_ep3_done",
        trigger: tideRoom,
        hint: locationHint(tideRoom, "辨认残页出处。"),
        steps: [
          huangyaoshi.say("冷铁上的线是渡船留下的，才不是哪家师门的暗号。你把碑上那张纸拿来，我看墨渗到了哪边。"),
          hero("纸背这点咸味连悦来茶楼的先生也提过。先在船上写，就难怪有一笔洇进裂缝。"),
          huangyaoshi.say("岛上旧谱末页少了半句。早年一个抄谱人把那页带走，终南山避雪时借抄半截，剩下这半截随他下了山。"),
          hero("就是古碑底下那道？残页上说可以留命渡人。撕走的那边，到底写了谁走？"),
          huangyaoshi.say("有人言他失约携谱杀人。当日我在岛上数着风，船倒是少了一条，回港的脚印却多了三双。"),
          hero("那人把船给了旁人，自己没回来。后半句或许写在替他回港的那三人手里。"),
          huangyaoshi.say("此洞涨潮有四声停顿，第一声应他抄谱的指法。你若耳朵好，可以在潮上找一找余音。"),
          hero("听不着也无妨。我替他们理一遍船索，看哪一根留得下当年的旧结。"),
          { choice: [
            { text: "（音律 Lv2）循潮声落音，补记抄谱人的自注", reqLife: { music: 2 }, effect: { exp: 440, skill: "tanzhi", setFlag: "sanxiu_recovered_sound" }, reply: huangyaoshi.reply("是‘先还船，再还谱’六个字。吹得不差，谱去华山问。终南樵人已经上路，带的是当年还船的木契。") },
            { text: "依旧船索找回乘船名单，请归港人记下所见", effect: { exp: 400, item: "ore_xuantie", moral: 4 }, reply: huangyaoshi.reply("写名字的是回来的三个。终南樵人带旧契上华山，你带着名单追上去。") }
          ] }
        ]
      },
      {
        id: "san_followup_5",
        title: "散修第五幕 · 剑冢留空名",
        reqUnaligned: true,
        reqFlag: "san_followup_4_played",
        trigger: swordGrave,
        hint: locationHint(swordGrave, "与隐世奇人核对终南来信。"),
        steps: [
          hermit.say("终南来客把木契交给我了。三人各留一笔指印，未在剑冢刻名，说怕把欠他的船说成欠他的武功。"),
          hero("古碑上那一条血案传闻，许多年来只剩抄谱人的姓。新木契一摆，至少能问清血案先后。"),
          { ...hermit.say("你从涛声里钩出六字，全然合了契约背书。今日只需请来客把那半页放回原处。"), ifFlag: "sanxiu_recovered_sound" },
          { ...hermit.say("人名与木契已对上，倒有个聚贤客拿着旧收帖堵在外头。他认定死案先有，除非你接他一场公断。"), unlessFlag: "sanxiu_recovered_sound" },
          hero("若案子还得验，我留在这里陪他验。写完那页之后，想看的人也应该看得。"),
          hermit.say("你初来古碑求门路，自称往后谁也不依。从这里下山，同行的人多了，这话还肯作数么？"),
          hero("他们结伴时也不必认同一个门。到了下一条渡口，我愿意先问他们想往哪边走。"),
          hermit.say("有一柄重剑我借来堵住墓门，它足够沉，却始终没在上头刻主人的名字。"),
          hero("留那一面空着吧。下个来问的人或许有自己的写法。"),
          { ifFlag: "sanxiu_recovered_sound", choice: [
            { text: "合谱重立无名碑，将渡人旧约抄给过路人", effect: { exp: 720, skill: "xuantie", attr: { int: 2, luck: 1 }, setFlag: "sanxiu_followup_completed" }, reply: hermit.reply("这一剑托在手里，走过一回渡船就知道该怎么收。江湖上若有人问师门，只报你自己的名字。") }
          ] },
          { unlessFlag: "sanxiu_recovered_sound", battle: "juxian_elite", onWinFlag: "sanxiu_followup_completed",
            winReward: { exp: 660, skill: "xuantie", attr: { str: 1, luck: 1 }, item: "ore_xuantie" },
            winNar: "旧收帖比还船木契晚三日。聚贤客验过指印，亲手擦去了血案刻字。隐世奇人留下重剑余诀，明日的来客仍可随意借看。" }
        ]
      }
    ]
  });
})(window);
