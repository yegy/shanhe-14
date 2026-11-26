(function (root) {
  "use strict";
  const JY = root.JY;
  const hero = "assets/hero-portrait.webp";
  const min = "assets/mate-zhaomin.webp";
  const zhang = "assets/mate-zhangwj.webp";
  const zhou = "assets/mate-zhouzhiruo.webp";

  JY.registerQuest("ts_yi", {
    title: "倚天屠龙记 · 两柄寒锋",
    tianshuId: "yi",
    summary: "从万安寺撤下六派人质，循救命的欠账往冰火岛和峨眉查验刀剑，最后在光明顶开匣。",
    episodes: [
      {
        id: "yi_ep1",
        title: "第一幕 · 塔下改筹",
        hint: "到「万安寺 · 万安寺外门」，向赵敏索看宝塔人质名册。",
        trigger: { region: "wanan", room: "wanan_gate", npc: "zhaomin" },
        steps: [
          { nar: "赵敏将一排竹筹拨进漏壶盖里。你用掌心接住漏出来的那根，竹筹上墨写「武当」，背面却刻着一扇并不存在的窗。" },
          { show: { left: hero, right: min, active: "right" }, say: ["赵敏", "你这双手倒不闲。塔上人一层一个门派，救哪一层，点哪一根筹；两根一齐点，便要看看你有几双手。"] },
          { show: { active: "left" }, say: ["主角", "先把假窗那根拿开。人若数错了，救完五层，还剩一层烟。"] },
          { nar: "她将扇柄插进筹孔一绞，壶盖原来有个活套，套里又倒出一根短筹。你将它与武当筹并在一起，短筹上只划了个「药」字。" },
          { ifMate: "zhangwj", show: { left: zhang, active: "left" }, say: ["张无忌", "赵姑娘，记账也好，提条件也好，请先把解药留在塔下。我接人下来，未必腾得出手再讨。"] },
          { show: { left: hero, active: "right" }, say: ["赵敏", "嘴上说得客气，算盘拨得我一响也听不见。给，药账在这里，欠我的日后再还。"] },
          { nar: "你拨开药箱上的铜锁，数清一格空瓶，又将短筹顶在漏壶下。壶水细细淌了一线，她把拔门闩时辰写在筹头。" },
          { choice: [
            { text: "【先顾人命】让每层先领一瓶解药，携撤人时辰去看塔", effect: { moral: 8, exp: 135, aff: { zhangwj: 8 }, setFlag: "yi_ep1_done" }, reply: ["赵敏", "好，每层一瓶。我倒要瞧一瞧，下楼以后有谁肯替对头扶一扶栏杆。"] },
            { text: "【攥住药账】预扣牢门口令，向管库人收银再换回药箱", effect: { moral: -7, exp: 105, gold: 160, setFlag: "yi_ep1_done", setFlag2: "yi_paid_orders" }, reply: ["赵敏", "账谁都能做，手脚可要比管库人还快。药箱你拿稳。"] }
          ] }
        ]
      },
      {
        id: "yi_ep2",
        title: "第二幕 · 火塔落索",
        hint: "前往「万安寺 · 万安寺宝塔」，与看塔人接应六派。",
        reqFlag: "yi_ep1_done",
        trigger: { region: "wanan", room: "wa_tower", npc: "tower_keeper" },
        steps: [
          { nar: "看塔人拨开横木，炭屑一股脑滚下台阶。你撑住晃动的楼梯，把解药箱推到墙根，头顶的锁链一紧，下一层有人试着翻窗。" },
          { show: { left: hero, right: "assets/npc-hermit.webp", active: "right" }, say: ["看塔人", "第三层有伤腿的！喊他翻栏没用，得先把底下那根接人的索撑住。"] },
          { ifFlag: "yi_paid_orders", say: ["看塔人", "管库的挨个问谁动了口令，药还没敢往上递。幸好箱子在你手里，待我把漏下的两层补齐。"] },
          { unlessFlag: "yi_paid_orders", say: ["看塔人", "各层方才都点过药瓶。武当那位手松得快，已经摸下两级，我请他替我扶这根索。"] },
          { show: { active: "left" }, say: ["主角", "你打结，我扯住梁。药先递给能搀人的，楼上的便听得见他来接。"] },
          { nar: "看塔人把满手炉灰拍在索头，绕住石柱。张无忌抄起一截横杆凌空一托，一个人落到你身旁，鞋尖擦过火盆边缘。" },
          { show: { right: zhang, active: "right" }, say: ["张无忌", "下一位是峨眉的。她若不肯让我伸手，你把索扔高些，我在下面。"] },
          { nar: "你将索头越过断栏抛出，伸脚踢开掉下来的焦木。落到最后的老者把一片刻有狮纹的刀鞘铜箍递给你，拄着栏杆吐出两口热气。" },
          { show: { active: "right" }, say: ["张无忌", "义父守过这口刀。劳你带铜箍往冰火岛去，他摸得出这处旧缺。"] },
          { choice: [
            { text: "【撤尽六派】确认最上一层无人，再携铜箍去见谢逊", effect: { moral: 9, exp: 175, aff: { zhangwj: 12 }, setFlag: "yi_ep2_done" }, reply: ["看塔人", "算上我，下面人数齐了。那根救人的索，我留在这里。"] },
            { text: "【借救人收账】让获救的富客认下一纸救命债，留下冰火岛路引", effect: { moral: -8, exp: 135, gold: 210, setFlag: "yi_ep2_done", setFlag2: "yi_tower_debt" }, reply: ["主角", "脚站稳再按印。塔上的烟散了，你们山门的账慢慢算。"] }
          ] }
        ]
      },
      {
        id: "yi_ep3",
        title: "第三幕 · 狮王听刃",
        hint: "前往「冰火岛 · 冰火石窟」，请谢逊辨认刀鞘铜箍。",
        reqFlag: "yi_ep2_done",
        trigger: { region: "binghuo", room: "bh_cave", npc: "xie_xun" },
        steps: [
          { nar: "你把铜箍搁到冰上，刚敲一下，谢逊便转身伸出左手。他捻住缺口，往另一边一滑，屠龙刀的鞘跟着在干草中擦出一阵沙响。" },
          { show: { left: hero, right: "assets/npc-xiexun.webp", active: "right" }, say: ["谢逊", "无忌小时候曾拿它敲石头。敲了三下，说第三声空。我当他胡闹，直到这两年才听见。"] },
          { show: { active: "left" }, say: ["主角", "刀背沉，空声却从近柄处来。若另有同样一口空鞘，是否便知道刃里压的是什么？"] },
          { nar: "谢逊一掌拍在刀柄上，细冰碎成三片。他用刀鞘推过一撮干草，让草尖贴住刀背一道暗纹；纹路只到中段便停。" },
          { show: { active: "right" }, say: ["谢逊", "另一截在倚天剑下。你带这个去问峨眉，别替老夫许她天下，也别替她许我一条命。"] },
          { nar: "你把干草压入铜箍，刃口忽映起红光。谢逊将刀收横，你趁他转鞘时抄下柄端刻着的半圈剑纹。" },
          { show: { active: "left" }, say: ["主角", "我只带纹去。谁把剑递给我，便让谁在旁看着开匣。"] },
          { choice: [
            { text: "【为义父守刀】归还铜箍，仅持阴刻副样上峨眉", effect: { moral: 8, exp: 160, aff: { zhangwj: 10 }, setFlag: "yi_ep3_done" }, reply: ["谢逊", "好。再见无忌，叫他莫惦记岛上柴够不够。"] },
            { text: "【以箍作押】保留铜箍与卖主的拜帖，向峨眉亮出自己的筹码", effect: { moral: -7, exp: 130, item: "ore_xuantie", setFlag: "yi_ep3_done", setFlag2: "yi_kept_ferrule" }, reply: ["谢逊", "铜箍可以押，人的话押不住。老夫认得你的鞋声。"] }
          ] }
        ]
      },
      {
        id: "yi_ep4",
        title: "第四幕 · 金顶验鞘",
        hint: "到「峨眉山 · 金顶正殿」，与周芷若合验刀剑纹。",
        reqFlag: "yi_ep3_done",
        trigger: { region: "emei", room: "emei_hall", npc: "zhouzhiruo" },
        steps: [
          { nar: "周芷若把倚天剑放上供案，鞘尾碰掉三粒香灰。你压着刀纹沿鞘底找去，手指在一道新缠的丝带处顿住。" },
          { show: { left: hero, right: zhou, active: "right" }, say: ["周芷若", "那条丝是师父生前裹的。你问刀剑，我可给你看；若来问我许过什么，今日恕我难答。"] },
          { show: { active: "left" }, say: ["主角", "我只问纹。刀上的纹到了中途，与你这条丝下的或可相合。"] },
          { nar: "她将丝带一寸寸退出铜箍，指甲碰触石案竟颤了一下。你用空茶盘接住落下的两枚扁铜片，将两件兵器的印痕在盘中合拢。" },
          { show: { active: "right" }, say: ["周芷若", "先师把他们当作句誓言，山下人把他们当作两件兵器。你到光明顶，问张教主打算怎样收拾。"] },
          { nar: "你把扁铜片用纸隔开，铜面又微微错动。一行极浅的火焰记号从缝里露出来，她将灯移近，还替纸束多绕一扣。" },
          { choice: [
            { text: "【弈棋 Lv2】按对称棋格拼全错位印痕，请周芷若亲封双拓", reqLife: { chess: 2 }, effect: { moral: 10, exp: 195, aff: { zhouzhiruo: 15 }, setFlag: "yi_ep4_done" }, reply: ["周芷若", "劳你替我留着这一半手迹。到了圣火前，由我自己启封。"] },
            { text: "【两家同验】当面封好印样，约在光明顶请两家开匣", effect: { moral: 7, exp: 150, aff: { zhouzhiruo: 8 }, setFlag: "yi_ep4_done" }, reply: ["周芷若", "既有两家，落款便空出两行。谁也不要替谁写。"] },
            { text: "【另抄备用】另制副样作交易筹码，持封样上光明顶", effect: { moral: -8, exp: 130, gold: 185, setFlag: "yi_ep4_done", setFlag2: "yi_private_pattern" }, reply: ["周芷若", "纸角还湿，台阶风大。你既做了两份，便看好两份。"] }
          ] }
        ]
      },
      {
        id: "yi_ep5",
        title: "第五幕 · 圣火开匣",
        hint: "前往「光明顶 · 圣火大殿」，将双印呈给张无忌。",
        reqFlag: "yi_ep4_done",
        trigger: { region: "guangming", room: "gm_hall", npc: "zhangwj" },
        steps: [
          { nar: "大殿石案上横放两道空鞘。你剪开封线，张无忌将双印压在一处，周芷若伸手扶住将滑的铜片，两人的手各据一边。" },
          { show: { left: hero, right: zhang, active: "right" }, say: ["张无忌", "刀能挥出去，活人不能挥回去。周姑娘，到这一刻，咱们且把各自手里的刃放平。"] },
          { show: { right: zhou, active: "right" }, say: ["周芷若", "张教主，先把军书摊开。我的手会留在这儿，等你读完头一行。"] },
          { nar: "你以半圆铜印压住卷缘，卷内一份行军图与一册记刃的薄书分开。火盆里爆起青光，张无忌已经把最后一道门打开，让席外诸人也能看见案面。" },
          { show: { active: "left" }, say: ["主角", "军书给识军阵的人。这册记录刀剑来处，还得有人按字留全。"] },
          { nar: "大殿梁影猛地一暗！混元霹雳手成昆竟借圣火烟幕潜入大殿，幻阴指直点案上刀剑秘匣，意图将六派与明教一网打尽！" },
          { show: { right: "assets/foe-poison.webp", active: "right" }, say: ["成昆", "桀桀桀！张无忌，今日圣火大殿便是尔等葬身之地！秘匣老夫笑纳了！"] },
          { battle: "cheng_kun", winReward: { exp: 300, item: "dan_chongmai" },
            winNar: "你与张无忌联手化解幻阴毒寒，重创成昆并将其逐出光明顶！" },
          { show: { left: hero, right: zhou, active: "right" }, nar: "火势重稳。周芷若把书轻轻折到封面，避开里页一点旧血锈。张无忌接过空鞘，将案边的铜夹递给你夹住卷边。" },
          { show: { right: zhang, active: "right" }, say: ["张无忌", "《倚天屠龙记》便托付少侠。你若留下看火，待会儿我还能给你找一把椅子。"] },
          { choice: [
            { text: "【共存兵书】公开军书，领天书与倚天剑护匣", effect: { moral: 12, exp: 430, tianshu: "yi", legendary: "yitian_sword", aff: { zhangwj: 15, zhouzhiruo: 8 }, setFlag: "yi_completed" }, reply: ["张无忌", "剑交你守，匣仍放在众人都看得见的地方。"] },
            { text: "【收锋交易】将开匣底本交明教，换取天书与屠龙刀", effect: { moral: -10, exp: 370, tianshu: "yi", legendary: "tulong_blade", setFlag: "yi_completed", setFlag2: "yi_blade_bargain" }, reply: ["张无忌", "你既取刀，就请亲手收鞘。今日这桌只开一回。"] }
          ] }
        ]
      }
    ]
  });
})(window);
