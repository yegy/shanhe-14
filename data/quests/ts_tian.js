(function (root) {
  "use strict";
  const JY = root.JY;
  const hero = "assets/hero-portrait.webp";
  const qiao = "assets/mate-qiaofeng.webp";
  const elder = "assets/npc-hermit.webp";

  JY.registerQuest("ts_tian", {
    title: "天龙八部 · 雁门旧痕",
    tianshuId: "tian",
    summary: "杏子林一封旧信逼得乔峰离帮。循聚贤庄伤者带来的线索往雁门关查证，随两代人的恩怨走进少室山藏经阁。",
    episodes: [
      {
        id: "tian_ep1",
        title: "第一幕 · 杏林交杖",
        hint: "前往「苏州燕子坞 · 杏子林」，向吴长风问明旧信来历。",
        trigger: { region: "suzhou", room: "sz_xingzi", npc: "wu_changfeng" },
        steps: [
          { nar: "吴长风一脚踩住被风掀起的席角。你替他按下另一角，席下露出打狗棒留下的长印。再远一些，杏树皮上还钉着半块帮旗。" },
          { show: { left: hero, right: elder, active: "right" }, say: ["吴长风", "帮主把棒留下，走的时候谁也没拦。我当年受过他一刀相救，今日倒叫几个空口说话的人挤得连酒都端不稳。"] },
          { show: { active: "left" }, say: ["主角", "有人说信中指他是契丹人。我想问，见过信的人里，可有一个在场见过他是如何长大的？"] },
          { nar: "吴长风解下手腕上的布条，裹住案角露出的一枚木钉。他翻开信封，让你摸内侧一道硬起的蜡筋。" },
          { show: { active: "right" }, say: ["吴长风", "信上只指认襁褓里的孩子。可从此处递到诸长老手上，中间倒换过两次封皮。你看这旧蜡，又是哪只手封的？"] },
          { ifMate: "qiaofeng", show: { left: qiao, active: "left" }, say: ["乔峰", "吴长老，旧日那一刀莫再提了。你把你亲眼所见说完，乔某若有半句不肯听，便当不得你叫过我一声帮主。"] },
          { nar: "你用茶盏圈住散开的旧封蜡。林外辚辚响起车轮声，有人挑着写有「薛」字的药箱绕开了帮旗。" },
          { show: { left: hero, active: "right" }, say: ["吴长风", "那是薛神医的人。聚贤庄今夜摆下酒席，薛先生原是要看病，我只怕满庄子抢着问姓氏，没人让他看脉。"] },
          { choice: [
            { text: "【护住证人】请吴长风收回真信，只抄封蜡纹样去见薛慕华", effect: { moral: 8, exp: 115, aff: { qiaofeng: 8 }, setFlag: "tian_ep1_done" }, reply: ["吴长风", "老叫花子把它缝在衣里。若还有人问见证，先让他报自己的姓名。"] },
            { text: "【以信换路】向递药人出示封皮，换取聚贤庄的席帖和盘缠", effect: { moral: -5, exp: 95, gold: 100, setFlag: "tian_ep1_done", setFlag2: "tian_letter_bargain" }, reply: ["主角", "席帖我收下。封皮带谁去见，得等我从庄里回来再说。"] }
          ] }
        ]
      },
      {
        id: "tian_ep2",
        title: "第二幕 · 聚贤裂席",
        hint: "前往「聚贤庄 · 聚贤演武厅」，请薛慕华诊治轿中伤者。",
        reqFlag: "tian_ep1_done",
        trigger: { region: "juxian", room: "juxian_hall", npc: "xue_muhua" },
        steps: [
          { nar: "酒碗沿着席面一字排开。乔峰喝尽最后一碗，把碗倒扣在桌角；门口一顶小轿被人群挤得往石阶下滑，你赶上去托住轿杆。" },
          { show: { left: hero, right: qiao, active: "right" }, say: ["乔峰", "诸位要算和乔某的账，桌上酒已经饮了。轿里这姑娘既没喝一碗，烦请给郎中留一尺路。"] },
          { nar: "薛慕华从人缝里伸手，搭了搭阿朱的脉，随即把药箱从肩上扯下。一个赴会悍客踢翻脚凳，箱盖刚揭开便重重磕了回去。" },
          { show: { right: elder, active: "right" }, say: ["薛慕华", "脉弱得几乎摸不到。抬进后间，谁再来摇这顶轿子，我就请谁替她撑着这一口气。"] },
          { show: { active: "left" }, say: ["主角", "先生从屏风边走。我来挡住踢凳的那位，放在门里的那封旧账，待抬完轿再看。"] },
          { show: { right: "assets/foe-master.webp", active: "right" }, say: ["聚贤庄悍客", "想把人从此间带出去？好！先迈得过我脚下这只碗。"] },
          { nar: "你把轿杠交到薛慕华手中，一脚将翻倒的凳子推到墙根。悍客踩碎瓷碗，袖口一沉，右掌横着抢向轿帘。" },
          { battle: "juxian_elite", onWinFlag: "tian_ep2_done", winReward: { exp: 175, item: "jinchuang" },
            winNar: "你把悍客迫离轿门。乔峰趁势挑起屏风挡住群雄，薛慕华抬伤者入内，回身将药箱底的戍卒借药单递给你：照单上名字，往雁门关找老范。" }
        ]
      },
      {
        id: "tian_ep3",
        title: "第三幕 · 绝壁指痕",
        hint: "前往「雁门关 · 关外绝壁」，持借药单向戍卒老范寻证。",
        reqFlag: "tian_ep2_done",
        trigger: { region: "yanmen", room: "ym_cliff", npc: "frontier_guide" },
        steps: [
          { nar: "老范把羊皮放在石头上压平，先摸纸上自己的花押，再解下腰间旧水囊。他把水淋到岩面，一排深浅参差的契丹字从尘下显出。" },
          { show: { left: hero, right: elder, active: "right" }, say: ["戍卒老范", "最底下是个「远」字。他当时一手抱孩子，另一手就把名字掐在这石头上。我可只说我瞧见的。"] },
          { show: { active: "left" }, say: ["主角", "那些说拦下的是劫经贼的人，走前看没看过车？"] },
          { nar: "老范蹲下，挪开一块冻在土里的石头。你在泥缝里捡到一枚铜扣，扣眼细得只穿得过襁褓布上的系带。" },
          { show: { active: "right" }, say: ["戍卒老范", "我收车时只见妇人衣物。后来有个少林来的和尚，要我依照这字样拓一张纸，纸藏在阁里《楞伽经》那架。"] },
          { nar: "你把宣纸按上石面，墨一碰就渗进水痕。老范用刀鞘抵住下沿，岩缝里刮出一阵冷风。" },
          { show: { active: "right" }, say: ["戍卒老范", "回去有人问，就说我当年手里只有一截缰绳。哪一位英雄当先拔刀，我没看清。"] },
          { choice: [
            { text: "【炼丹 Lv2】用药箧里的白垩显出刻痕，另留一份拓本护住证人", reqLife: { alchemy: 2 }, effect: { moral: 10, exp: 175, item: "herb_ginseng", setFlag: "tian_ep3_done" }, reply: ["戍卒老范", "字总算留齐了。少侠把纸卷好，入阁时别让他们只撕去落款。"] },
            { text: "【质证】只取铜扣和亲笔证词，请老范自行落款", effect: { moral: 7, exp: 125, aff: { qiaofeng: 8 }, setFlag: "tian_ep3_done" }, reply: ["戍卒老范", "字我来画押。守这道关几十年，今日也该守自己说的一句话。"] },
            { text: "【卖个空名】收下老范的封口钱，用匿名拓本进少林查卷", effect: { moral: -7, exp: 100, gold: 155, setFlag: "tian_ep3_done", setFlag2: "tian_witness_hidden" }, reply: ["戍卒老范", "银子给你。记住我只认纸上写的事，从未请你删去一句。"] }
          ] }
        ]
      },
      {
        id: "tian_ep4",
        title: "第四幕 · 藏经阁双影",
        hint: "前往「嵩山少林寺 · 藏经阁」，向知客僧出示雁门关证据。",
        reqFlag: "tian_ep3_done",
        trigger: { region: "songshan", room: "ss_library", npc: "shao_novice" },
        steps: [
          { nar: "知客僧从梯子上落下，木梯第二级还在晃。你伸手稳住梯腿，他拂去书架横梁的灰，梁下赫然露出一排朝窗外去的脚印。" },
          { show: { left: hero, right: "assets/npc-monk.webp", active: "right" }, say: ["知客僧", "此处经卷每晚核名，独这一函让人取去还回几十回。您来的时候，可瞧见窗边有两个客人？"] },
          { nar: "一页薄纸从《楞伽经》夹层跌出来。你弯腰去拾，左边黑衣人伸手便拦；右边灰衣人一掌拍在架角，纸卷如雪片堕了满地。" },
          { show: { right: "assets/foe-master.webp", active: "right" }, say: ["萧远山", "我儿要问谁把他送进乔家，先问一问你。慕容博，今朝经卷都在，容你挑一页作保。"] },
          { show: { right: "assets/foe-guardian.webp", active: "right" }, say: ["慕容博", "你几次翻的经，比老夫还多。这纸若能要我的命，你何须在墙外等上三十年？"] },
          { nar: "扫地僧把竹帚横在两人之间。袍袖同时翻起，竹枝却只在砖上打了个旋。他捡起萧远山脚边一册书，拍去书脊上的灰。" },
          { show: { right: "assets/npc-saodiseng.webp", active: "right" }, say: ["扫地僧", "两位居士要动手，请移步后院。先休怪经书碍事。日日翻它的人，原是两位自己。"] },
          { choice: [
            { text: "【留存实证】当着二人将证物交还函中，邀知客僧同去作证", effect: { moral: 8, exp: 155, aff: { qiaofeng: 8 }, setFlag: "tian_ep4_done" }, reply: ["知客僧", "我记下函号。若有人说从没见过这张纸，先来翻我今晚的值事簿。"] },
            { text: "【先握筹码】贴身藏起旧函原纸，另给知客僧留下抄件", effect: { moral: -6, exp: 110, item: "dan_chongmai", setFlag: "tian_ep4_done", setFlag2: "tian_original_kept" }, reply: ["主角", "这张抄纸与原件对得上。谁想要原件，便到后院把话当面说完。"] }
          ] }
        ]
      },
      {
        id: "tian_ep5",
        title: "第五幕 · 帚落经开",
        hint: "前往「嵩山少林寺 · 藏经阁后院」，拜见扫地僧。",
        reqFlag: "tian_ep4_done",
        trigger: { region: "songshan", room: "ss_court", npc: "sweeper" },
        steps: [
          { nar: "竹帚歪倚石榴树，院里却听不见扫地声。老僧一手按萧远山背心，一手扶慕容博坐稳，两人的手各自攥着一截对方的袖子。" },
          { show: { left: hero, right: "assets/npc-saodiseng.webp", active: "right" }, say: ["扫地僧", "解开手。两位若连一截布都松不得，老衲总不能替两位松一世。"] },
          { ifFlag: "tian_original_kept", say: ["扫地僧", "藏在你袖里的纸，适才二位曾争着要看。劳你自己取出来，老衲今日只管劝他们看罢再伸手。"] },
          { unlessFlag: "tian_original_kept", say: ["扫地僧", "知客已把原函和值夜簿一同送来。两位若有话，请就在他那一笔后写，莫再叫他把前一笔抹了。"] },
          { nar: "慕容博先松开五指，萧远山的手随后垂下来。你把瓮沿结出的水壳敲开，分出两碗递过去，碗沿在指间碰出一点响声。" },
          { show: { active: "left" }, say: ["主角", "旧事有了证人，往后的话谁来写？这一回，总不能再托一个路过的人替他们起头。"] },
          { show: { right: qiao, active: "right" }, say: ["乔峰", "萧，便写萧。山上山下凡有人来问，我仍用这双手接酒。酒债我接，无端的血债谁也休再往孩子头上添！"] },
          { nar: "扫地僧把一卷薄册从湿瓦底下抽出来，晾到袍袖上。页边旧浆全开了，每一处改字都还看得见底下先前那一笔。" },
          { show: { right: "assets/npc-saodiseng.webp", active: "right" }, say: ["扫地僧", "人各有一只眼，书偏得有两面纸。施主既知来路，这册《天龙八部》便请带下山。"] },
          { choice: [
            { text: "【存名还卷】将两位老人亲笔的话纳进旧档，再领天书", effect: { moral: 12, exp: 385, tianshu: "tian", aff: { qiaofeng: 15 }, setFlag: "tian_completed" }, reply: ["扫地僧", "两纸留在一函便好。下一位取经的人，掀开哪一页都能见另一页。"] },
            { text: "【带书留证】只留可公开的抄纸，把真函与天书一并带走", effect: { moral: -10, exp: 325, tianshu: "tian", gold: 360, setFlag: "tian_completed", setFlag2: "tian_private_archive" }, reply: ["主角", "抄纸挂在阁门。原件随我走，山下若有人追问，便来找我开价。"] }
          ] }
        ]
      }
    ]
  });
})(window);
