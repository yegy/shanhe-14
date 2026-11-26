(function (root) {
  "use strict";
  const JY = root.JY;
  const hero = "assets/hero-portrait.webp";
  const yang = "assets/mate-yangguo.webp";
  const long = "assets/mate-xiaolongnv.webp";
  const elder = "assets/npc-hermit.webp";

  JY.registerQuest("ts_shen", {
    title: "神雕侠侣 · 石上归期",
    tianshuId: "shen",
    summary: "古墓石室的蜂蜡封着一个地名。跨情花圃、下断肠崖，把改动过的归期带回襄阳郭府。",
    episodes: [
      {
        id: "shen_ep1",
        title: "第一幕 · 墓门白丝",
        hint: "前往「活死人墓 · 断龙石前」，将门缝里的白丝交给杨过。",
        trigger: { region: "gumu", room: "gumu_gate", npc: "yangguo" },
        steps: [
          { nar: "墓门合到只余一线，杨过以重剑挑住石梁，你屈膝从梁底钩出一根白丝。地上两枚蜂尸尚未被风吹走，他用剑尖拨开，露出白丝另一头的活扣。" },
          { show: { left: hero, right: yang, active: "right" }, say: ["杨过", "这扣是她打的。我认得它松的时候怎么散，旁人便打成十个，我也认得。"] },
          { show: { active: "left" }, say: ["主角", "扣下穿着铜片，片上一个「谷」字，另一面却冻在蜡里。"] },
          { nar: "杨过用衣袖裹着铜片，指节贴近剑身借力。冻蜡啪地裂开一星，你托起片角，看见背后另钻了半个孔。" },
          { show: { active: "right" }, say: ["杨过", "原该再接一片。少侠，请你去石室问她。我若一开口，她只管问我身上还痛不痛。"] },
          { nar: "门梁又下沉一寸，你塞入一块平石，让绷直的门缝松下来。杨过拔剑时，石上的铜环随之滚到你脚边。" },
          { show: { active: "left" }, say: ["主角", "铜环还在这儿。我进去时将门留一线，你若想说什么，便从这一线说。"] },
          { choice: [
            { text: "【托还白丝】照原样束好白丝，把铜片送进石室", effect: { moral: 7, exp: 115, aff: { yangguo: 8 }, setFlag: "shen_ep1_done" }, reply: ["杨过", "有劳。我在这里看着，门合不上。"] },
            { text: "【另拓一份】暗摹背面暗记，为自己留一份谷中路引", effect: { moral: -5, exp: 95, gold: 90, setFlag: "shen_ep1_done", setFlag2: "shen_silk_copy" }, reply: ["主角", "真片交给她，这张纸我收着。两道门总要有一道肯为我开。"] }
          ] }
        ]
      },
      {
        id: "shen_ep2",
        title: "第二幕 · 寒玉蜂痕",
        hint: "到「活死人墓 · 寒玉石室」，请小龙女辨认铜片。",
        reqFlag: "shen_ep1_done",
        trigger: { region: "gumu", room: "gumu_hall", npc: "xiaolongnv" },
        steps: [
          { nar: "小龙女在寒玉床边掀起石匣一角，一只玉蜂从匣缝挤出来。你以瓷碟接住它脚上沾的蜂蜡，把铜片放到碟边，两色蜡痕恰能拼拢。" },
          { show: { left: hero, right: long, active: "right" }, say: ["小龙女", "我以为过儿早把旧铜片扔了。他嫌它硌手，寻不到时却把整副袖子都翻过来。"] },
          { show: { active: "left" }, say: ["主角", "这旁边还刻着花圃的篱门。它原要领谁入绝情谷？"] },
          { ifMate: "yangguo", show: { left: yang, active: "left" }, say: ["杨过", "姑姑，这回留我随你看罢。你若又嫌我跟得紧，我只在你还伸得到手的地方站着。"] },
          { nar: "小龙女把铜片往石隙里一压，另一半从匣底翘起。你将两片并置在石床冷光里，顺着接合处数出三根斜篱和一口覆井。" },
          { show: { left: hero, active: "right" }, say: ["小龙女", "取藤药的人须从三根斜篱过去。第四根不能碰，原是给带花毒的人留的一道门。"] },
          { nar: "你抬袖护住碟边缓行的玉蜂，手背被石床凉气激得一缩；细蜡正好在这时从铜片上剥落下来。" },
          { choice: [
            { text: "【炼丹 Lv2】取少量蜂蜡验看，只留下解情花毒的线索", reqLife: { alchemy: 2 }, effect: { moral: 9, exp: 165, aff: { xiaolongnv: 14 }, item: "dahuandan", setFlag: "shen_ep2_done" }, reply: ["小龙女", "剩下的蜡给蜂用罢。这丸药你拿去，到了花下先看脚。"] },
            { text: "【代行】归还铜片，照篱门走向记下进谷路线", effect: { moral: 6, exp: 125, aff: { xiaolongnv: 8 }, setFlag: "shen_ep2_done" }, reply: ["小龙女", "有人立在青石上，你便问她。从花下只听得响动，听不得人话。"] },
            { text: "【收作凭据】用门路做筹码，留下半片铜符和一份药料", effect: { moral: -6, exp: 105, item: "herb_ginseng", setFlag: "shen_ep2_done", setFlag2: "shen_valley_token" }, reply: ["小龙女", "铜片可以给你。到时肯让开的若是人，你莫只拿铜片给她看。"] }
          ] }
        ]
      },
      {
        id: "shen_ep3",
        title: "第三幕 · 情花让路",
        hint: "前往「绝情谷 · 情花圃」，请公孙绿萼指明断肠崖入口。",
        reqFlag: "shen_ep2_done",
        trigger: { region: "jueqing", room: "jq_flower", npc: "gongsun_lue" },
        steps: [
          { nar: "你数着斜篱落脚，指尖方碰到第四根，公孙绿萼已把剪柄递到眼前。她替你剪断袖边缠着的花枝，再将剪下的刺尖倒扣在泥里。" },
          { show: { left: hero, right: "assets/npc-maiden.webp", active: "right" }, say: ["公孙绿萼", "把手收一收。你若是寻药，此处没有完整的那一丸；你若是寻人，我倒可以把门让开。"] },
          { show: { active: "left" }, say: ["主角", "我寻的是一条能回来的人走的路。那口井上为什么又压了第三根梁？"] },
          { nar: "她踏过两块青石，在井盖边转动一枚铜钉。梁脚泛起一道浅印，你蹲下摸见刻在底下的三道水纹。" },
          { show: { active: "right" }, say: ["公孙绿萼", "崖下有船。敲梁三下才放绳，若见斜着垂下来的白布，就等船过去再摇。"] },
          { nar: "她本要把井盖重新落锁，听见外头有人唤，便把钥匙塞进井沿断瓦下，侧身让你站在不会踩花的一边。" },
          { show: { active: "left" }, say: ["主角", "门若合上，我记得水纹。姑娘若要回去，钥匙还在你手上。"] },
          { choice: [
            { text: "【替人掩门】藏好钥匙，持三水纹暗记赴断肠崖", effect: { moral: 8, exp: 150, aff: { yangguo: 8 }, setFlag: "shen_ep3_done" }, reply: ["公孙绿萼", "好。倘若船家问是谁叫你来的，你便说是看花的人。"] },
            { text: "【借门牟利】扣住钥匙换一笔送客钱，再去寻船", effect: { moral: -7, exp: 125, gold: 180, setFlag: "shen_ep3_done", setFlag2: "shen_valley_toll" }, reply: ["公孙绿萼", "你既把开门算作人情，就把欠下的也记明白。船在崖下，走罢。"] }
          ] }
        ]
      },
      {
        id: "shen_ep4",
        title: "第四幕 · 绝壁闻潮",
        hint: "前往「绝情谷 · 断肠崖」，按暗号与谷底船妇会合。",
        reqFlag: "shen_ep3_done",
        trigger: { region: "jueqing", room: "jq_cliff", npc: "valley_boatwoman" },
        steps: [
          { nar: "你以剑鞘敲崖梁三声，第二声被水吞了半截；第三声刚落，船妇抛来的索头擦着青苔滑过去。你俯身把它挂上石角。" },
          { show: { left: hero, right: elder, active: "right" }, say: ["谷底船妇", "留半尺活头！水涨起来，这索子得跟着动。你瞧崖刻旁那笔白，是去年水位。"] },
          { show: { active: "left" }, say: ["主角", "旧刻上说十六年。底下那一道浅线却指向水面，莫非只是叫人等到水退？"] },
          { nar: "船妇用桨挑起贴壁的细竹筒，你趁船身一抬将它接住。筒口的蜡已被水泡软，一捏便吐出刻着「襄阳」的薄木签。" },
          { show: { active: "right" }, say: ["谷底船妇", "上头刻字的人有上头的约，底下划船的人只认刻水的线。这签子原是我替那位断臂客捎的。"] },
          { nar: "你将木签横压进掌心，鞋底一滑，船妇反手拽住绳尾。水退到白线下，石缝终于露出能踏过去的半块窄台。" },
          { show: { active: "left" }, say: ["主角", "先系稳你的船。我上去时会把活绳留在这边，下一位寻路的人也够得着。"] },
          { choice: [
            { text: "【留活路】替船妇重系渡索，带归期木签回襄阳", effect: { moral: 8, exp: 160, aff: { xiaolongnv: 8 }, setFlag: "shen_ep4_done" }, reply: ["谷底船妇", "这索留得好。你到郭府便问郭大侠，他给崖刻作过见证。"] },
            { text: "【独掌归途】收存下崖路线，把木签带往郭府议价", effect: { moral: -7, exp: 125, gold: 190, setFlag: "shen_ep4_done", setFlag2: "shen_private_ferry" }, reply: ["主角", "木签在我这儿。岸上人若要找这条路，就让他先找我。"] }
          ] }
        ]
      },
      {
        id: "shen_ep5",
        title: "第五幕 · 襄阳双影",
        hint: "前往「襄阳城 · 郭府正厅」，向郭靖交验归期木签。",
        reqFlag: "shen_ep4_done",
        trigger: { region: "xiangyang", room: "xy_guofu_hall", npc: "guojing" },
        steps: [
          { nar: "郭靖把灯往前挪，木签的影子斜过两只空茶盏。他翻开一轴旧城图，你接住将坠的卷轴，露出下头压着的两封旧信。" },
          { show: { left: hero, right: "assets/mate-guojing.webp", active: "right" }, say: ["郭靖", "一封说人能回来，一封说代她把话带到。我笨，当年两封的话都信了，也一直给两个人留着座。"] },
          { ifFlag: "shen_private_ferry", say: ["郭靖", "船家说水涨过一回，郭府派去的人摸不到渡口，没能去帮她。等会儿我想向你讨要那份路线。"] },
          { unlessFlag: "shen_private_ferry", say: ["郭靖", "船家送口信说有根新索。我让守城的人顺索送了新桨下去，回话说桨正合她那条船。"] },
          { show: { active: "left" }, say: ["主角", "木签上的归期是旧的，崖底的渡索却新系过。到门口看一眼，也许就用不上这两封信了。"] },
          { nar: "话音刚落，府门外骤然响起金铁破空呼啸！蒙古国师金轮法王携五轮杀入郭府，欲趁襄阳城防空虚强劫郭靖！" },
          { show: { right: "assets/foe-jinlun.webp", active: "right" }, say: ["金轮法王", "郭大侠，十层龙象般若今日请教！这小辈既在此处，便一并接下本座五轮罢！"] },
          { battle: "jinlun_boss", winReward: { exp: 320, item: "ore_xuantie" },
            winNar: "你与郭靖合力破去金轮法王的五轮金甲阵，国师受创纵身遁出城外！" },
          { nar: "厅外硝烟未散，有人轻叩两声。郭靖来不及扶正帽翅，便跨过门槛；杨过用剑鞘轻抵门扇，小龙女绕过他的剑，径向郭靖欠身。" },
          { show: { left: yang, right: long, active: "left" }, say: ["杨过", "郭伯伯，我把姑姑的座带回来了。至于我的，劳您往旁边并一并。"] },
          { show: { active: "right" }, say: ["小龙女", "也留一盏给这位少侠。他知道下面有船。"] },
          { nar: "郭靖把旧信并着木签装入薄木套，从里头抽出一册《神雕侠侣》，轻搁在你擦干净的那方桌角。" },
          { choice: [
            { text: "【共饮归来酒】归还旧信与木签，受天书和杨过所赠重剑", effect: { moral: 12, exp: 380, tianshu: "shen", legendary: "xuantie_sword", aff: { yangguo: 14, xiaolongnv: 10 }, setFlag: "shen_completed" }, reply: ["杨过", "这柄剑在墓门用过，留有一处磕痕。往后你要开一扇门，也记得让人从里头走出来。"] },
            { text: "【以路易书】用崖下通路换天书和盘缠，把旧信留给郭府", effect: { moral: -9, exp: 320, tianshu: "shen", gold: 430, setFlag: "shen_completed", setFlag2: "shen_sold_passage" }, reply: ["郭靖", "银子给你，这条路我让人守着。来的是寻亲的人，我照旧让他过去。"] }
          ] }
        ]
      }
    ]
  });
})(window);
