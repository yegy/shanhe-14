/* 山河十四卷 v1.0 · 包 A：险地与秘境 */
(function (root) {
  "use strict";
  const JY = root.JY;

  JY.ENEMIES.tower_guard = {
    id: "tower_guard", name: "宝塔领班", d: 5, hp: 1040, atk: 49, def: 19, exp: 400, gold: 225,
    art: "assets/foe-mongol.webp", desc: "掌管宝塔梯门钥匙的守卒头领，护臂和长枪配合严密。",
    intents: [
      { type: "iron", name: "横枪封阶", shield: 150, hint: "横枪固守楼梯，破甲可拆招" },
      { type: "charge", name: "迎阶贯枪", mul: 2.15, hint: "蓄力突刺，可用点穴打断或闪身躲开" }
    ]
  };
  JY.ENEMIES.valley_crocodile = {
    id: "valley_crocodile", name: "鳄潭恶鳄", d: 5, hp: 1020, atk: 51, def: 21, exp: 390, gold: 160,
    art: "assets/foe-croc.webp", desc: "盘踞潭边浅水的老鳄，往往先静卧，再猛然扑向岸边。",
    intents: [
      { type: "attack", name: "横尾扫岸", mul: 1.1, hint: "扫尾带起碎石，留意护体" },
      { type: "charge", name: "伏水猛噬", mul: 2.2, fx: { bleed: 1 }, hint: "伏水准备跃起，可用闪身躲过" }
    ]
  };
  JY.ENEMIES.ice_wolf = {
    id: "ice_wolf", name: "冰岭头狼", d: 6, hp: 1160, atk: 54, def: 18, exp: 460, gold: 180,
    art: "assets/foe-wolf.webp", desc: "在岛上冰沟伏猎的白狼，落爪时容易与雪声混在一起。",
    intents: [
      { type: "flurry", name: "跃雪连扑", mul: 1.45, fx: { bleed: 1 }, hint: "短促连扑，可用闪身避开" },
      { type: "charge", name: "俯身锁喉", mul: 2.25, hint: "贴伏雪面蓄势，护体可减伤" }
    ]
  };

  JY.registerRegion("heimuya", {
    entry: "heimuya_gate", isPlaceholder: false,
    rooms: {
      heimuya_gate: {
        name: "猩猩滩石埠", x: 1, y: 2, tag: "入口", art: "assets/scene-cliff.webp",
        desc: "河水绕过暗红的石面，木栈通到崖下。绳盘依着石壁堆放，最高那几圈还挂着从上头带下来的碎叶。",
        exits: ["hm_gate", "hm_recess"], travelOut: true
      },
      hm_gate: {
        name: "吊篮栈厅", x: 1, y: 1, tag: "崖", art: "assets/scene-cliff.webp",
        desc: "长索贯穿厅梁，搬运人都知道先用肩膀扛住篮沿。田伯光偏坐在迎风处，把酒碗稳稳搁在晃荡的栏杆上。",
        exits: ["heimuya_gate", "heimuya_inner", "hm_winch"],
        npcs: [{ id: "tianbg", mateId: "tianbg", name: "田伯光", art: "assets/mate-tianbg.webp", role: "快刀客",
          talk: "你要走规矩路，且等这篮子上来。我从栈后踩两脚石坎便到了，敢不敢跟？",
          teach: [{ id: "wuhu", reqAff: 25, gold: 180 }] }]
      },
      heimuya_inner: {
        name: "成德殿前坪", x: 1, y: 0, tag: "战", art: "assets/scene-cliff.webp",
        desc: "丹墀前铺着浅灰细沙，一道人影从殿边帷帐下掠过，地面却几乎没留下脚印。最上一级石阶落着一枚新穿线的细针。",
        nightDesc: "帷帐背后的烛火矮了一半，帐上飞丝却一根根照得清楚。有人持了半幅未绣完的红花立在檐下。",
        exits: ["hm_gate", "hm_hall"], enemies: ["dongfang_boss"]
      },
      hm_hall: {
        name: "成德殿", x: 2, y: 0, tag: "殿", art: "assets/scene-cliff.webp",
        desc: "重帘掩去殿外天光，屏风脚下拖出一缕红线。殿边几张待客的椅子全移到了墙根，中间让出一块阔地。",
        exits: ["heimuya_inner"]
      },
      hm_winch: {
        name: "背崖绞盘房", x: 2, y: 1, tag: "潜", art: "assets/scene-gumu.webp",
        desc: "屋内两架绞盘一新一旧，铜销上涂的油各不相同。值守人把废铜销放进窗旁窄槽，等着归库。",
        nightDesc: "崖风每停一回，屋里就能听见绳索吃紧的细响。绞盘师把夜间才取用的销盒搁在窗边，一角露出垫布。",
        exits: ["hm_gate"],
        npcs: [{ id: "hm_rigger", name: "薛扣索", art: "assets/npc-hermit.webp", role: "吊篮绞盘师",
          talk: "风急便退半尺，绳子绷得越直越容易伤人。栏下落过一片废销，是个好铁料，你愿意可拾去。" }],
        search: { id: "sr_hm_pinhole", nightOnly: true, text: "你从暗槽抽出销盒下垫的黑片，表面一抹银亮，正是难得的天外寒铁。", reward: { item: "ore_xuantie", exp: 130 } }
      },
      hm_recess: {
        name: "赤石风凹", x: 0, y: 2, tag: "采", art: "assets/scene-cliff.webp",
        desc: "风沿红石一层层剥出凹槽，底部留住几丛抗风药草。草茎压弯了一小片，那里露着革袋的缝线。",
        exits: ["heimuya_gate"], gather: { ore_iron: 3, herb_common: 1 },
        search: { id: "sr_hm_windbag", text: "你捡出被风塞进石凹的革袋，从扎紧的里兜里找到一丸玉露丸。", reward: { item: "yulu", exp: 90 } }
      }
    }
  });

  JY.registerRegion("wanan", {
    entry: "wanan_gate", isPlaceholder: false,
    rooms: {
      wanan_gate: {
        name: "万安寺外门", x: 1, y: 2, tag: "入口", art: "assets/scene-wanan.webp",
        desc: "寺门留了一扇半开，香客在门洞外便取香点燃。赵敏立在题额下转着折扇，抬眼记下守塔人换钥的时辰。",
        nightDesc: "香火撤进门房，只留浮烟从门洞散去。赵敏用扇骨在掌上轻敲，正对上两道巡灯绕塔交错的那一刻。",
        exits: ["wa_courtyard", "wa_well"], travelOut: true,
        npcs: [{ id: "zhaomin", mateId: "zhaomin", name: "赵敏", art: "assets/mate-zhaomin.webp", role: "汝阳王府郡主",
          talk: "我若问你想从哪儿进塔，你多半说正门。先去看看井栏，回来再答我，说不定还算个聪明人。" }]
      },
      wa_courtyard: {
        name: "钟下回廊", x: 1, y: 1, tag: "廊", art: "assets/scene-wanan.webp",
        desc: "大钟不响时，挂钟的木梁也会吱呀作声。廊边添了一截可推的护栏，木漆和原来的相差一层。",
        exits: ["wanan_gate", "wa_tower", "wa_service"],
        npcs: [{ id: "wa_bellkeeper", name: "了缘", art: "assets/npc-monk.webp", role: "护钟僧",
          talk: "梁响三下才到转角，别跟着钟声走。塔侧有条窄廊，旧护栏后备的伤药拿着，真用得上便不算多。" }],
        search: { id: "sr_wa_railing", text: "你推开颜色较新的护栏，从固定木轴下取出装在细布袋里的金疮药。", reward: { item: "jinchuang", exp: 95 } }
      },
      wanan_inner: {
        name: "宝塔高阁", x: 1, y: 0, tag: "战", art: "assets/scene-wanan.webp",
        desc: "塔梯绕着内壁走了几转，头顶传来一串钥匙碰在一起的声音。一名领班手持长枪，守在囚门与梯口之间。",
        exits: ["wa_tower", "wa_service"], enemies: ["tower_guard"]
      },
      wa_tower: {
        name: "万安寺宝塔", x: 2, y: 1, tag: "塔", art: "assets/scene-wanan.webp",
        desc: "塔脚焦木未清，走近能闻到潮炭气。塔门虚掩，门槛上几条深沟都是拖动楼梯底锁时划出来的。",
        exits: ["wa_courtyard", "wanan_inner"]
      },
      wa_service: {
        name: "夹壁灯道", x: 0, y: 1, tag: "潜", art: "assets/scene-gumu.webp",
        desc: "点灯杂役时常带着竹梯上下，狭道因而擦了几道齐肩的白印。壁缝里偶能收到半句楼上交谈。",
        nightDesc: "上下两层灯影有一刻同时偏向东边，这条狭道便落进全暗。侧墙一块砖掀开后，正好能摸到储灯的小柜背。",
        exits: ["wa_courtyard", "wanan_inner", "wa_well"],
        search: { id: "sr_wa_lampcabinet", nightOnly: true, text: "你借巡灯交错的片刻探过夹壁，摸到一丸藏在灯柜后的大还丹。", reward: { item: "dahuandan", exp: 135 } }
      },
      wa_well: {
        name: "后寺旧井", x: 0, y: 2, tag: "采", art: "assets/scene-wild.webp",
        desc: "井边爬满耐阴的叶草，矮墙后总有细风从塔基方向吹出。碎砖在墙角排成两道，标出通夹壁的缺口。",
        exits: ["wanan_gate", "wa_service"], gather: { herb_common: 3, herb_ginseng: 1 }
      }
    }
  });

  JY.registerRegion("jueqing", {
    entry: "jueqing_gate", isPlaceholder: false,
    rooms: {
      jueqing_gate: {
        name: "曲水石门", x: 1, y: 2, tag: "入口", art: "assets/scene-jueqing.webp",
        desc: "两岸峭岩把水路收成一道，石门从谷中这一侧才好推开。门槛外长的花有刺，门槛内则拴着一张旧渔网。",
        exits: ["jq_flower", "jq_pool"], travelOut: true
      },
      jq_flower: {
        name: "情花圃", x: 1, y: 1, tag: "采", art: "assets/scene-jueqing.webp",
        desc: "花开在石篱外，叶背有细刺。园中另圈出几垄寻常药草，沿小石子铺的白线走，便不会踩进深处。",
        nightDesc: "花瓣收拢，药篱边的白石被潮气洗得发亮。园中小径远看像断了，走近才有浅白的石子接上来。",
        exits: ["jueqing_gate", "jueqing_inner", "jq_cliff"], gather: { herb_common: 3, herb_ginseng: 1 },
        npcs: [{ id: "gongsun_lue", name: "公孙绿萼", art: "assets/npc-maiden.webp", role: "绝情谷采药人",
          talk: "少侠先把袖口束紧，别让衣襟扫过情花。篱内寻常草药尽可取，青石旁还有一包我留下的治伤药。" }],
        search: { id: "sr_jq_herbbed", text: "你按绿萼所说沿白线走到青石旁，在叶下找着用棕线扎紧的金疮药。", reward: { item: "jinchuang", exp: 90 } }
      },
      jueqing_inner: {
        name: "谷中药室", x: 2, y: 1, tag: "丹", art: "assets/scene-alchemy.webp",
        desc: "每一屉花叶分得很开，案角一册药录亦留出许多空白。外面时有风袭，屋里却只闻见清苦的药气。",
        exits: ["jq_flower"], alchemy: true, shop: ["jinchuang", "yulu", "dahuandan"],
        npcs: [{ id: "jq_apothecary", name: "温婆婆", art: "assets/npc-hermit.webp", role: "谷中煎药人",
          talk: "别把花香都当药香。到了断肠崖，只认阶旁刻过记号的瓶子，旁边的枯花枝碰都不要碰。" }]
      },
      jq_cliff: {
        name: "断肠崖", x: 0, y: 1, tag: "秘", art: "assets/scene-cliff.webp",
        desc: "石壁中央那行旧刻已让雨水刷浅，没刻完的一笔一直伸到阶边。阶侧有枯花枝团在一处，风吹也散不开。",
        nightDesc: "崖底雾气退下一层，夜露把石阶上的断笔续了起来，露出刻记后面的干燥小穴。",
        exits: ["jq_flower", "jq_pool"],
        search: { id: "sr_jq_cliffmark", nightOnly: true, text: "你绕过枯枝，从断笔后的小穴取出有刻记的石瓶，里头收着一颗备用的玉露丸。", reward: { item: "yulu", exp: 125 } }
      },
      jq_pool: {
        name: "鳄鱼潭", x: 0, y: 2, tag: "战", art: "assets/scene-jueqing.webp",
        desc: "水面漂着离群的几朵情花，稍一碰便陷入水中。碎网绊在浅滩上，网外两点浑黄的光移近了岸。",
        exits: ["jueqing_gate", "jq_cliff"], enemies: ["valley_crocodile"]
      }
    }
  });

  JY.registerRegion("dali", {
    entry: "dali_gate", isPlaceholder: false,
    rooms: {
      dali_gate: {
        name: "洱海南关", x: 1, y: 2, tag: "入口", art: "assets/scene-dali.webp",
        desc: "故道朝湖水缓缓低下去，两面白墙上挂着晨市的竹篓。药贩沿墙摆货，未及洗净的药草还带着新泥。",
        nightDesc: "驿门点了风灯，北归的驮队把马铃用布裹住。铺石下的水声清亮，从空出来的街面一直传到湖口。",
        exits: ["dali_inner", "dl_lanternlane", "dl_road"], travelOut: true, gather: { herb_common: 2 }
      },
      dali_inner: {
        name: "天龙寺经院", x: 1, y: 1, tag: "经", art: "assets/scene-dali.webp",
        desc: "经院石廊里处处可见点指后留下的凹痕。小沙弥用布擦过前几处，末尾一处却只拿布覆盖。",
        exits: ["dali_gate", "dl_inn", "dl_mansion"],
        npcs: [{ id: "dl_monk", name: "本澄", art: "assets/npc-monk.webp", role: "天龙寺习指僧",
          talk: "点灯时只取一点火，练指时也只用一点劲。收劲之后仍能随手端杯，这趟功夫才算练得。",
          teach: [{ id: "yiyangzhi", gold: 450 }] }],
        search: { id: "sr_dl_fingermark", text: "你揭起覆盖石痕的旧布，斜凹中卡住一枚细陶管，里头盛着一丸大还丹。", reward: { item: "dahuandan", exp: 110 } }
      },
      dl_mansion: {
        name: "镇南王府偏院", x: 2, y: 1, tag: "府", art: "assets/scene-dali.webp",
        desc: "廊下挂着褪色的行旅图，山口以细红线相连。案桌摆有一只刻到一半的马头镇纸，木屑被扫到图角。",
        exits: ["dali_inner"],
        npcs: [{ id: "dl_scout", name: "石望川", art: "assets/foe-master.webp", role: "王府巡道官",
          talk: "北来的白马驮着半张图，卸鞍时只剩缰绳。有意问图，夜里去白瓦巷看换货的马贩，先问来处再问价。" }]
      },
      dl_inn: {
        name: "照洱客栈", x: 0, y: 1, tag: "宿", art: "assets/scene-inn.webp",
        desc: "木廊朝向一面碎银似的湖水。蒸笼用石片压着，香气绕开廊柱往楼上客房里钻。",
        exits: ["dali_inner", "dl_lanternlane"], inn: true, kitchen: true, bounty: true,
        shop: ["jinchuang", "yulu", "food_fowl", "wine_nver"]
      },
      dl_lanternlane: {
        name: "白瓦巷", x: 0, y: 2, tag: "夜市", art: "assets/scene-nightmarket.webp",
        desc: "瓦叠得密，午后阳光也只能在墙下落半步宽。临门的铁钩挂着一副闲鞍，侧袋外露出半条打了结的皮索。",
        nightDesc: "巷口青灯才亮，就有人来交旧马鞍和捆好的行旅图。交易完的马匹由后门牵出，鞍上的侧兜仍鼓着。",
        exits: ["dali_gate", "dl_inn"], nightMarket: ["treasure_map", "dan_chongmai", "wine_monkey"],
        search: { id: "sr_dl_saddle", nightOnly: true, text: "你循打结的皮索翻开旧鞍侧袋，从内衬抽出一张边角被磨白的残破藏宝图。", reward: { item: "treasure_map", exp: 115 } }
      },
      dl_road: {
        name: "西门古道", x: 2, y: 2, tag: "道", art: "assets/scene-dali.webp",
        desc: "石道在驿亭外分岔，最窄的一条没入茶商队踩出的泥印。有人在石缝里竖了半片白色马掌，给后来的行旅认方向。",
        exits: ["dali_gate"]
      }
    }
  });

  JY.registerRegion("taohua", {
    entry: "taohua_gate", isPlaceholder: false,
    rooms: {
      taohua_gate: {
        name: "桃浪石埠", x: 1, y: 2, tag: "入口", art: "assets/scene-island.webp",
        desc: "海浪将花瓣冲进石阶的缺齿里，待退潮又一片片吐出来。埠头后方的石子路特意用花落不到的浅色石砌成。",
        exits: ["th_maze", "th_stone", "th_ferry"], travelOut: true,
        npcs: [{ id: "th_oarsman", name: "阿蒲", art: "assets/npc-hermit.webp", role: "岛上看船人",
          talk: "脚下浅石尽头若有两枝对生桃，你便绕左。赶夜潮回来听竹哨，潮洞里响第二声时路才宽。" }]
      },
      th_maze: {
        name: "五行桃径", x: 1, y: 1, tag: "阵", art: "assets/scene-island.webp",
        desc: "花影盖住所有岔路，只有两株并生桃的枝尖没有交叠。试走一段再回头，先前的枝影已隔在另一面。",
        nightDesc: "夜色里花色都淡了，枝梢下的白石反而好认。一阵箫声从不见石子的小道背后传来。",
        exits: ["taohua_gate", "taohua_inner", "th_scorepavilion"]
      },
      taohua_inner: {
        name: "试剑竹亭", x: 1, y: 0, tag: "武", art: "assets/scene-island.webp",
        desc: "亭内挂两支竹箫，一支有裂缝，一支塞着红绸。石桌上无棋无香，只放着一捧刚挑好的桃核。",
        exits: ["th_maze"],
        npcs: [{ id: "huangyaoshi", name: "黄药师", art: "assets/npc-huangys.webp", role: "桃花岛主",
          talk: "枝影本来会动，你硬背路数有何用？且拣颗桃核弹到第一根竹上。若能落对地方，我再教你如何收指。",
          teach: [{ id: "tanzhi", gold: 520 }] }]
      },
      th_scorepavilion: {
        name: "碧海琴台", x: 2, y: 1, tag: "琴", art: "assets/scene-island.webp",
        desc: "琴台三面对海，唯一能避风的那一面却没有坐处。案下夹着一块吸饱了海雾的软木塞。",
        exits: ["th_maze", "th_stone"],
        search: { id: "sr_th_scoreplug", text: "你拔开琴案下的软木塞，从竹筒里卷开一份纸色尚新的古琴谱。", reward: { item: "guqin_score", exp: 100 } }
      },
      th_ferry: {
        name: "桃花渡", x: 0, y: 1, tag: "渡", art: "assets/scene-island.webp",
        desc: "退潮露出两排缆桩，近岸一排肩上堆满了盐粒。等船的人都站在桩影没及脚踝的地方，免得海水突然合围。",
        exits: ["taohua_gate"]
      },
      th_stone: {
        name: "潮音石室", x: 2, y: 2, tag: "采", art: "assets/scene-cliff.webp",
        desc: "潮水退出洞底，浅洼里留着涤伤药草和几颗经海水打磨的矿石。洞顶一片黄白贝壳与外面滩头的不同。",
        nightDesc: "竹哨一声从埠头传来，一阵浪头退去便响第二声。贝壳在夜潮过后反白，照出石壁的浅缝。",
        exits: ["taohua_gate", "th_scorepavilion"], gather: { herb_common: 2, ore_iron: 2 }, enemies: ["mei_chaofeng"],
        search: { id: "sr_th_tidecache", nightOnly: true, text: "你等第二声哨后探手入缝，抓住最后一波回潮没能卷走的黑铁片。", reward: { item: "ore_xuantie", exp: 120 } }
      }
    }
  });

  JY.registerRegion("binghuo", {
    entry: "binghuo_gate", isPlaceholder: false,
    rooms: {
      binghuo_gate: {
        name: "浮冰砾滩", x: 1, y: 2, tag: "入口", art: "assets/scene-binghuo.webp",
        desc: "浮冰擦过卵石滩，发出碎瓷碰在一起的响声。滩上两列石堆高低有别，高的那列通向烟气升起的地方。",
        nightDesc: "海面黯下去，脚下碎冰逐渐发白。高石堆后出现一条被热泉蒸干的窄带，正好避开涨水的岸脚。",
        exits: ["bh_spring", "bh_ridge"], travelOut: true
      },
      bh_spring: {
        name: "硫泉暖谷", x: 1, y: 1, tag: "采", art: "assets/scene-binghuo.webp",
        desc: "热气贴着黑色流石滚出去，草只在温冷交界的地方扎根。来取水的人都把陶盏搁在背风的石沿。",
        exits: ["binghuo_gate", "binghuo_inner", "bh_cave"], gather: { herb_common: 2, ore_iron: 2 },
        npcs: [{ id: "bh_tracker", name: "韩千帆", art: "assets/npc-hermit.webp", role: "漂流猎户",
          talk: "石沿外忽热忽冷，别光看白气厚薄。去冰脊见到双排爪印，先横走几步，别正撞上那条白狼。" }]
      },
      binghuo_inner: {
        name: "石屋旧灶", x: 0, y: 1, tag: "旧", art: "assets/scene-gumu.webp",
        desc: "石屋墙面留有握刀比划的长刻线，灶边还摆着一只洗净的石碗。炭灰里横了一块三角挡火片。",
        exits: ["bh_spring"],
        search: { id: "sr_bh_hearth", text: "你取出挡火片边一截包锡的旧柄，削去烟垢，露出内里仍能锻打的精铁。", reward: { item: "ore_iron", exp: 95 } }
      },
      bh_cave: {
        name: "冰火石窟", x: 2, y: 1, tag: "秘", art: "assets/scene-binghuo.webp",
        desc: "窟下红黑相间的石面多孔，风一大，每个孔便各响一声。谢逊盘腿坐在石罅内，手边横着一柄未入鞘的宽背刀。",
        nightDesc: "热雾往石面下沉，冻结的小孔纷纷泛白。一处从不冒气的缝隙露出灰黑线，色泽与附近岩壳相异。",
        exits: ["bh_spring", "bh_ridge"],
        npcs: [{ id: "xie_xun", name: "谢逊", art: "assets/npc-xiexun.webp", role: "金毛狮王",
          talk: "坐近些，海风起来便听不清话。别用碗边刮石板，真有脚步从外头过，全叫这声儿盖住了。" }],
        search: { id: "sr_bh_coldseam", nightOnly: true, text: "你沿不冒气的缝挑开薄壳，剥下贴在其中的一片天外寒铁。", reward: { item: "ore_xuantie", exp: 140 } }
      },
      bh_ridge: {
        name: "伏狼冰脊", x: 2, y: 2, tag: "战", art: "assets/scene-peak.webp",
        desc: "脊上积雪被风推成反坡，狼足印从石背绕向视线下方。两道换爪的印迹在拐角前突然并到了一起。",
        exits: ["binghuo_gate", "bh_cave"], enemies: ["ice_wolf"], gather: { herb_ginseng: 1 }
      }
    }
  });

  JY.registerRegion("yanmen", {
    entry: "yanmen_gate", isPlaceholder: false,
    rooms: {
      yanmen_gate: {
        name: "塞口瓮城", x: 1, y: 3, tag: "入口", art: "assets/scene-yanmen.webp",
        desc: "两重城门错开朝向，赶路人进第一重还要转过一道弯。守卒以石块压住掀翻的告示，循城砖上各处豁口巡查。",
        nightDesc: "风把沙从第一重门灌进来，第二重却静得只剩旗绳作响。巡卒把火光留在转角，照亮仍可通行的行边道。",
        exits: ["ym_tower", "yanmen_inner", "ym_snow_ridge"], travelOut: true
      },
      ym_tower: {
        name: "烽台望楼", x: 1, y: 1, tag: "关", art: "assets/scene-yanmen.webp",
        desc: "望楼窗台堆着逐日换下的旗绳，断口都朝外放。远处山坳使旗影突然转折，楼火随之侧过一尺。",
        exits: ["yanmen_gate", "ym_cliff", "ym_camp"], bounty: true,
        npcs: [{ id: "ym_sentry", name: "曹守义", art: "assets/foe-master.webp", role: "雁门烽卒",
          talk: "从这里认得两处断墙，近的通旧战场，远的接碑崖。看见楼里那捆新绳没有？原先断在山坳，捡回一截时里面已经裹了东西。" }],
        search: { id: "sr_ym_ropes", text: "你翻开叠放得最整齐的一捆旧旗绳，从解散的绳心里取出一小袋刻有军炉号的精铁。", reward: { item: "ore_iron", exp: 110 } }
      },
      ym_cliff: {
        name: "关外绝壁", x: 0, y: 1, tag: "旧", art: "assets/scene-yanmen.webp",
        desc: "一行大字凿得极深，前三字还清楚，后面的石皮却被风剥下一层。崖脚伏着一块刻字的掉片。",
        nightDesc: "月光从城垛之间斜进来，石字的断笔在地上拖出影。一片掉下的旧石横在影子里，恰好能补上缺笔。",
        exits: ["ym_tower", "yanmen_inner"],
        npcs: [{ id: "ym_witness", name: "耶律野", art: "assets/npc-hermit.webp", role: "在地牧人",
          talk: "你接着那缺笔往下看。风一天天把石皮刮走，真有人要留下话，还得有人肯替他记。" }],
        search: { id: "sr_ym_engravedrock", nightOnly: true, text: "你将掉片按回石字的阴边，发现原先被它遮住的小石槽，槽里留着一口皮囊烈酒。", reward: { item: "wine_strong", exp: 145 } }
      },
      ym_camp: {
        name: "弃阵荒垒", x: 2, y: 1, tag: "战", art: "assets/scene-wild.webp",
        desc: "木楔钉过的洞沿新草长出一截，有人将倒盾重新撑了起来。盾后掩着马蹄印和弯刀下明晃晃的刃口。",
        exits: ["ym_tower"], enemies: ["xiangyang_spy_elite", "jinlun_boss"],
        idle: { name: "雁门轮岗巡边", expPerMin: 82, goldPerMin: 36, mat: "ore_iron" }
      },
      yanmen_inner: {
        name: "龙泉背风沟", x: 0, y: 2, tag: "采", art: "assets/scene-wild.webp",
        desc: "风急时山坳外站不稳脚，沟底反能听见泉声。石上星星点点露出铁矿，草药只长在泉水舔不到的坡腰。",
        exits: ["yanmen_gate", "ym_cliff"], gather: { ore_iron: 3, herb_common: 2 }
      },
      ym_snow_lodge: {
        name: "雪岭旧庄", x: 1, y: 0, tag: "宿", art: "assets/scene-inn.webp",
        desc: "风口过后有一排低屋，半旧的竹帘垂在膝高的雪上。从窗纸看去，炉旁仍搁有几双烘着的走山靴。",
        exits: ["ym_snow_ridge"], inn: true
      },
      ym_snow_ridge: {
        name: "雪岭冰梁", x: 2, y: 2, tag: "险", art: "assets/scene-peak.webp",
        desc: "冰梁下松根抱住四散的碎石，半新的一行鞋印压到梁边就不见了。冰上系着引人去旧庄的细麻绳。",
        exits: ["yanmen_gate", "ym_snow_lodge"]
      }
    }
  });

  JY.registerRegion("huading", {
    entry: "huading_gate", isPlaceholder: false,
    rooms: {
      huading_gate: {
        name: "上清石脊", x: 1, y: 3, tag: "入口", art: "assets/scene-peak.webp",
        desc: "石脊两面都是空谷，攀索拴在自然裂缝撑开的地方。末段迎风，落脚的位置被有心人凿成几枚窄窝。",
        nightDesc: "暗处听不见谷底，只听见攀索沿石缝反复摩擦。有人在收风的几处落脚点留了一抹白灰指路。",
        exits: ["hd_shelter", "hd_cairn"], travelOut: true
      },
      hd_shelter: {
        name: "候剑避风棚", x: 1, y: 2, tag: "亭", art: "assets/scene-peak.webp",
        desc: "棚顶立了两层短木，头茬山风先从中间漏掉一半。来的剑客把包袱系在里侧，板凳才不至被一同掀翻。",
        exits: ["huading_gate", "huading_inner", "hd_crack"], inn: true,
        npcs: [{ id: "hd_steward", name: "秦拂石", art: "assets/npc-hermit.webp", role: "论剑看场人",
          talk: "带兵刃去峰顶前先在这儿歇歇，气血稳了才说试剑。去避风的东裂隙，也许能找到前人留的丹药。" }]
      },
      huading_inner: {
        name: "论剑绝顶", x: 1, y: 0, tag: "战", art: "assets/scene-peak.webp",
        desc: "乱云翻上峰头，转瞬又被高风吹下去。一柄无鞘长剑斜插石坪，王重阳整袖立在剑旁，留出一块能容过招的石地。",
        nightDesc: "四山融成墨色，峰顶的落脚处反因薄霜泛白。王重阳立在长剑旁，等云遮尽月光才抬起右手。",
        exits: ["hd_shelter", "hd_crack"], enemies: ["wangcy_boss"]
      },
      hd_cairn: {
        name: "试剑石垛", x: 0, y: 3, tag: "剑", art: "assets/scene-huashan.webp",
        desc: "松动的石片被来客按年叠起，垛沿薄得像有刃。看垛的老客提着麻刷，正替剑痕清掉石灰。",
        exits: ["huading_gate"],
        npcs: [{ id: "hd_swordsman", name: "闻从岳", art: "assets/foe-master.webp", role: "历届观剑人",
          talk: "看这垛石你先看落脚印，再看剑痕，两处对上了才知剑手把力送到了哪里。风大时走里圈，能稳住身形就已有收获。" }],
        search: { id: "sr_hd_steelshard", text: "你替老客扫去最底下的石灰，拾出一小截留在旧剑痕内的天外寒铁。", reward: { item: "ore_xuantie", exp: 130 } }
      },
      hd_crack: {
        name: "藏云东隙", x: 2, y: 1, tag: "采", art: "assets/scene-cliff.webp",
        desc: "东侧岩隙收住了草种和水气，崖上的药草都长在这里。挤过去有道窄凸檐，够人在乱风中贴壁攀上石坪。",
        nightDesc: "岩隙无风，贴得近能听到细小水声。有块突出的石片替药草遮住露水，内沿显出了以刻痕标记的存药孔。",
        exits: ["hd_shelter", "huading_inner"], gather: { herb_ginseng: 1, ore_iron: 2 },
        search: { id: "sr_hd_ledge", nightOnly: true, text: "你摸到刻痕后包在厚油纸里的旧葫芦，拧开木塞取出一粒九转丹。", reward: { item: "dan_jiuzhuan", exp: 170 } }
      }
    }
  });
})(window);
