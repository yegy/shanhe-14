/* 山河十四卷 v1.0 · 包 A：江南与中原 */
(function (root) {
  "use strict";
  const JY = root.JY;

  JY.ENEMIES.canal_robber = {
    id: "canal_robber", name: "运河水匪", d: 2, hp: 340, atk: 29, def: 9, exp: 95, gold: 52,
    art: "assets/foe-pirate.webp", desc: "专在芦苇深处伏击货船的水匪，惯用短刀快砍。",
    intents: [
      { type: "attack", name: "挑篙横打", mul: 1.0, hint: "一篙横扫，当心正面受击" },
      { type: "flurry", name: "分水双刀", mul: 1.4, hint: "短刀连斩，可用闪身避锋" }
    ]
  };

  JY.registerRegion("niujia", {
    entry: "niujia_gate", isPlaceholder: false,
    rooms: {
      niujia_gate: {
        name: "村口老渡", x: 1, y: 2, tag: "入口", art: "assets/scene-wild.webp",
        desc: "堤岸的柳根横卧水面，撑渡船的老艄公正捡石头压席。沿土路可入村，顺水则到旧居后面的田埂。",
        nightDesc: "老艄公把一盏灯搁在船板上，隔岸归人只需敲两下空竹筒，船便循声靠过去。",
        exits: ["nj_winehouse", "nj_reeds"], travelOut: true,
        npcs: [{ id: "nj_ferryman", name: "冯艄公", art: "assets/npc-hermit.webp", role: "渡船人",
          talk: "村里换了几茬人，这段堤还是老样子。青砖上有枪尖划出的三道横纹，你走访杨家旧屋时留个眼。" }]
      },
      nj_winehouse: {
        name: "曲家酒舍", x: 1, y: 1, tag: "宿", art: "assets/scene-inn.webp",
        desc: "布帘褪成了灰蓝色，灶上炖着鸡汤。酒舍给行脚客留了两张通铺，墙上木钩还挂着磨亮的旧衣架。",
        exits: ["niujia_gate", "niujia_inner", "nj_cellar"], inn: true, kitchen: true,
        shop: ["jinchuang", "food_fowl", "wine_nver"],
        npcs: [{ id: "nj_innkeeper", name: "曲二娘", art: "assets/npc-innkeeper.webp", role: "酒舍掌柜",
          talk: "住店便在灶边烘衣裳。旧屋檐下的铁件你若翻出来，拿去用罢，也省得小孩捡来划手。" }]
      },
      niujia_inner: {
        name: "杨家旧居", x: 0, y: 1, tag: "旧", art: "assets/scene-town.webp",
        desc: "门闩断过一回，用麻绳重新缠起。墙根两块青砖留着一高一低的枪痕，像有人拿它标过孩子的身量。",
        exits: ["nj_winehouse"],
        search: { id: "sr_nj_oldhouse", text: "你按住最低那道旧痕，撬起砖沿，取出一枚裹在残布里的精铁枪箍。", reward: { item: "ore_iron", exp: 35 } }
      },
      nj_cellar: {
        name: "晒谷棚地窖", x: 2, y: 1, tag: "夜市", art: "assets/scene-nightmarket.webp",
        desc: "稻草底下露出木盖，盖上压着一把空秤。白天借棚晒谷的人来回走动。",
        nightDesc: "有人拨开稻草掀起木盖，把各村换来的货摊在窖口。破秤旁的陶罐倒扣着，罐底露出一叠油纸。",
        exits: ["nj_winehouse"], nightMarket: ["yulu", "wine_nver", "treasure_map"],
        search: { id: "sr_nj_cellar", nightOnly: true, text: "你从陶罐下抽出一包封好的伤药，油纸上还印着旧药铺的葫芦记。", reward: { item: "jinchuang", exp: 45 } }
      },
      nj_reeds: {
        name: "白鹭芦湾", x: 0, y: 2, tag: "野", art: "assets/scene-wild.webp",
        desc: "白鹭踩着浅滩觅鱼，药草沿背风的田埂长成一线。有人扯断芦秆开出了一道小口，脚印通往被盗的渔篓。",
        exits: ["niujia_gate"], gather: { herb_common: 2, food_fowl: 1 }, enemies: ["shanzei"]
      }
    }
  });

  JY.registerRegion("jiaxing", {
    entry: "jiaxing_gate", isPlaceholder: false,
    rooms: {
      jiaxing_gate: {
        name: "南湖石埠", x: 1, y: 2, tag: "入口", art: "assets/scene-jiangnan.webp",
        desc: "雨脚一阵紧过一阵，载酒小舟却还往返不休。石阶下扎着成排竹篙，最靠外的一支缺了半寸尖。",
        nightDesc: "埠头只亮着两盏防雨纱灯，巡湖舟把竹篙横起来挡风，留下朝芦滩的水道。",
        exits: ["jiaxing_inner", "jx_reeds"], travelOut: true,
        npcs: [{ id: "jx_oarsman", name: "沈篙儿", art: "assets/npc-hermit.webp", role: "南湖船工",
          talk: "船过芦滩时伏低些。近来总有割缆的水匪，偏连粮船和载药的船也不放过。" }]
      },
      jiaxing_inner: {
        name: "烟雨楼", x: 1, y: 1, tag: "楼", art: "assets/scene-jiangnan.webp",
        desc: "窗格一扇扇向湖心支起。临水桌留着几处碗底烧出的圆印，一枚骰子深嵌在窗台的旧裂缝旁。",
        exits: ["jiaxing_gate", "jx_inn", "jx_boathouse"], bounty: true,
        npcs: [{ id: "zhucong", name: "朱聪", art: "assets/npc-baixiaosheng.webp", role: "江南七怪",
          talk: "楼里的人盯着我袖子，我便让他们盯。少侠若能看出窗格哪根木头新换过，眼力已有三分火候。",
          teach: [{ id: "dianxue", gold: 140 }] }],
        search: { id: "sr_jx_lakewindow", text: "你沿窗台新木与旧漆的接缝探去，摸到一截芦管，管中藏着十五两碎银。", reward: { gold: 15, exp: 45 } }
      },
      jx_inn: {
        name: "听雨客栈", x: 0, y: 1, tag: "宿", art: "assets/scene-inn.webp",
        desc: "店家在每张床前备了木盆接漏，地下烘着湖鱼和蓑衣。檐角挂着价牌，写明热汤与酒钱各算。",
        exits: ["jiaxing_inner"], inn: true, kitchen: true, shop: ["jinchuang", "food_ham", "wine_nver"]
      },
      jx_boathouse: {
        name: "鸳鸯泊船棚", x: 2, y: 1, tag: "夜市", art: "assets/scene-nightmarket.webp",
        desc: "废船搁在木架上，两只油布包拴在梁间，渔人说那是修补船篷的旧料。",
        nightDesc: "水面第一只灯船经过后，棚中解下油布包换货。废船底翻过来当柜台，船肋上压着无人来取的零碎。",
        exits: ["jiaxing_inner", "jx_reeds"], nightMarket: ["yulu", "jade_fan", "treasure_map"],
        search: { id: "sr_jx_boatrib", nightOnly: true, text: "你用手拨开船肋间的水草，拾得一包红纸裹着的玉露丸。", reward: { item: "yulu", exp: 50 } }
      },
      jx_reeds: {
        name: "分水芦滩", x: 2, y: 2, tag: "野", art: "assets/scene-wild.webp",
        desc: "芦叶在回水处长得齐肩高，沙岸开着成片白色草花。两条快船压在芦秆上，船头的刀架尚沾着泥。",
        exits: ["jiaxing_gate", "jx_boathouse"], gather: { herb_common: 3 }, enemies: ["canal_robber"]
      }
    }
  });

  JY.registerRegion("suzhou", {
    entry: "suzhou_gate", isPlaceholder: false,
    rooms: {
      suzhou_gate: {
        name: "燕子坞水门", x: 1, y: 2, tag: "入口", art: "assets/scene-jiangnan.webp",
        desc: "船桨拨开一帘水柳，几级磨得发滑的青石阶通向院中。水门偏西另有一条废栈道，板下看得见鱼影。",
        exits: ["suzhou_inner", "sz_pier"], travelOut: true,
        npcs: [{ id: "azhu", name: "阿朱", art: "assets/npc-maiden.webp", role: "燕子坞侍女",
          talk: "庄上客房是能借住的。若有人在西栈道唱采莲调，您听最后一句，错了韵便是借歌做暗号。" }]
      },
      suzhou_inner: {
        name: "参合庄书斋", x: 1, y: 1, tag: "庄", art: "assets/scene-jiangnan.webp",
        desc: "案上书卷以砚台齐齐压住，惟独一本夹着未干的荷叶。后窗望得见湖上的旧栈道。",
        exits: ["suzhou_gate", "sz_camellia", "sz_guesthouse"],
        npcs: [{ id: "sz_copyist", name: "陆闻书", art: "assets/npc-baixiaosheng.webp", role: "参合庄抄书人",
          talk: "这册剑诀被潮气黏了页，幸好招名另有抄本。你若有兴致，且看同一剑路如何走出两种收势。",
          teach: [{ id: "songfeng", gold: 140 }] }],
        search: { id: "sr_sz_inkstone", text: "你挪过案上缺角的旧砚，从砚匣隔层取出两页可供合练的古琴谱。", reward: { item: "guqin_score", exp: 65 } }
      },
      sz_camellia: {
        name: "曼陀山庄茶圃", x: 0, y: 0, tag: "采", art: "assets/scene-island.webp",
        desc: "石渠沿着茶花畦打了几个弯，近水低畦生着止血草。园墙外湖鸟落下，抖了一地湿翅上的水。",
        exits: ["suzhou_inner"], gather: { herb_common: 2, herb_ginseng: 1 }
      },
      sz_guesthouse: {
        name: "水榭客舍", x: 2, y: 1, tag: "宿", art: "assets/scene-inn.webp",
        desc: "四面垂纱以挡湖风，食盘上是温过的酒和几碟时蔬。隔间备着更换湿衣的干布。",
        nightDesc: "纱帐被风吹得一收一放，烛台都压到地板上。船过水榭时，连船帮碰桩的闷响也听得清。",
        exits: ["suzhou_inner"], inn: true, kitchen: true, shop: ["food_fowl", "food_ham", "wine_nver"]
      },
      sz_pier: {
        name: "旧栈道船寮", x: 0, y: 2, tag: "夜市", art: "assets/scene-nightmarket.webp",
        desc: "断桩扎在荷塘尾端，废船寮门上挂着一串缺口贝壳，栈道下偶有鬼祟的小舟经过。",
        nightDesc: "入夜有小舟停在断桩外。船夫唱歪最后一句采莲曲，寮里便放下一条绳梯，递上用旧帆布裹着的货物。",
        exits: ["suzhou_gate"], nightMarket: ["jade_fan", "herb_ginseng", "treasure_map"], enemies: ["canal_robber"],
        search: { id: "sr_sz_ropeladder", nightOnly: true, text: "你在绳梯最末一格摸到个硬结，拆开湿麻绳，里头竟是一块暖润的玉扇坠。", reward: { item: "jade_fan", exp: 75 } }
      }
    }
  });

  JY.registerRegion("yangzhou", {
    entry: "yangzhou_gate", isPlaceholder: false,
    rooms: {
      yangzhou_gate: {
        name: "运河钞关", x: 1, y: 2, tag: "入口", art: "assets/scene-yangzhou.webp",
        desc: "钞关前停着待验的货船，盐篓与布箱堵了一道石阶。河风吹来，岸上引船进城的梆声又急了几分。",
        nightDesc: "验货木牌翻成黑底，守关人把横过河心的绳索收紧。滞留货船的灯影挤在桥洞外。",
        exits: ["yangzhou_inner", "yz_lakeside"], travelOut: true
      },
      yangzhou_inner: {
        name: "盐市长街", x: 1, y: 1, tag: "市", art: "assets/scene-yangzhou.webp",
        desc: "盐包过秤声和挑夫号子夹在一起。药铺檐下张了悬赏榜，旁边用新麻绳拴着一把押货用的旧朴刀。",
        exits: ["yangzhou_gate", "yz_inn", "yz_alley"], bounty: true,
        shop: ["jinchuang", "dahuandan", "herb_common", "food_ham", "wine_nver"],
        npcs: [{ id: "yz_broker", name: "方双秤", art: "assets/npc-baixiaosheng.webp", role: "盐市牙人",
          talk: "官秤看的是斤两，行商看的是货先落谁手。你若过桥走夜路，见一串空钱穿在红线上，便拐进去。" }],
        search: { id: "sr_yz_scale", text: "你托起榜旁一枚空心秤砣，从松脱的铁底里找到一包给押货人应急的伤药。", reward: { item: "jinchuang", exp: 50 } }
      },
      yz_inn: {
        name: "小秦淮客栈", x: 0, y: 0, tag: "宿", art: "assets/scene-inn.webp",
        desc: "木窗临着小河，低头便能看见洗菜的竹篮。隔墙传来丽春院试弦的声音，常与店伙上菜的报号抢拍。",
        exits: ["yangzhou_inner"], inn: true, kitchen: true,
        npcs: [{ id: "yz_waiter", name: "顾小满", art: "assets/npc-innkeeper.webp", role: "客栈跑堂",
          talk: "我替你拣背河的屋子，夜里少听一半琵琶。要找清静，从钞关侧边上瘦西湖堤，药商常在那里挖草根。" }]
      },
      yz_alley: {
        name: "铜钱桥暗巷", x: 2, y: 1, tag: "夜市", art: "assets/scene-nightmarket.webp",
        desc: "桥后窄巷尽是歇脚用的石墩。墙钉上晾着一串旧铜钱，穿钱的红线从砖缝伸进去。",
        nightDesc: "夜风拨响红线上的几枚空钱，半扇墙板便向里转开。卖药、收旧书的摊主各执一盏遮光纸灯。",
        exits: ["yangzhou_inner"], nightMarket: ["dan_chongmai", "jade_fan", "hanshui_silk", "treasure_map"],
        search: { id: "sr_yz_copperwall", nightOnly: true, text: "墙板转开时露出一层浮砖，你从砖后抽到一张沿运河画着记号的残破藏宝图。", reward: { item: "treasure_map", exp: 70 } }
      },
      yz_lakeside: {
        name: "瘦西湖柳堤", x: 0, y: 2, tag: "采", art: "assets/scene-jiangnan.webp",
        desc: "柳荫把堤岸分成明暗两截，背阴坡生着药草。断桥下泊着一条遮了船号的小划子，有刀鞘磕碰船板的动静。",
        exits: ["yangzhou_gate"], gather: { herb_common: 3, herb_ginseng: 1 }, enemies: ["canal_robber"]
      }
    }
  });

  JY.registerRegion("luoyang", {
    entry: "luoyang_gate", isPlaceholder: false,
    rooms: {
      luoyang_gate: {
        name: "洛阳南门", x: 1, y: 2, tag: "入口", art: "assets/scene-capital.webp",
        desc: "进城的花农提着竹篮，牡丹叶上兜着水珠。车辙间长了些耐踩的草药，守卒把过重的板车劝到边道去。",
        nightDesc: "墙头梆声把归城的人催得更急。留给挑担行人的小门还透着一线灯，护城河对岸已看不见路了。",
        exits: ["luoyang_inner", "ly_alley"], travelOut: true, gather: { herb_common: 2 }
      },
      luoyang_inner: {
        name: "牡丹长街", x: 1, y: 1, tag: "市", art: "assets/scene-capital.webp",
        desc: "卖花人与唱曲人共用一排檐廊。墙边旧榜上贴了新悬赏，贴榜人的红浆糊尚未晾干。",
        exits: ["luoyang_gate", "ly_bamboo", "ly_inn", "ly_alley"], bounty: true,
        shop: ["jinchuang", "dahuandan", "wine_nver", "treasure_map"]
      },
      ly_bamboo: {
        name: "绿竹巷", x: 0, y: 1, tag: "琴", art: "assets/scene-luoyang.webp",
        desc: "竹篱里一方石案，琴弦的余音绕过篱笆传到街上。沾过松烟的半截绢纸从琴案底探出一角。",
        nightDesc: "屋里熄了灯，任盈盈借月光调弦。弹到换指处，她留出半拍，听了一会竹叶摩擦的声音才接着弹。",
        exits: ["luoyang_inner"],
        npcs: [{ id: "renyingying", mateId: "renyingying", name: "任盈盈", art: "assets/mate-renyingying.webp", role: "日月圣姑",
          talk: "巷口卖花的人走了，琴声才听得清。你若分得出方才那一声是竹梢还是断弦，便坐下来听完这一曲。",
          teach: [{ id: "songfeng", gold: 120 }] }],
        search: { id: "sr_ly_bamboo", text: "你在琴案底拈起断了一半的谱页，以袖拂去松烟，露出上面的减字指法。", reward: { item: "guqin_score", exp: 80 } }
      },
      ly_inn: {
        name: "白马客栈", x: 2, y: 1, tag: "宿", art: "assets/scene-inn.webp",
        desc: "临街座上搁着刚开的酒坛，院里有人替马刷掉长路的浮尘。店中总留一间阁楼给错过城门时辰的旅人。",
        exits: ["luoyang_inner"], inn: true, kitchen: true,
        npcs: [{ id: "ly_host", name: "许三娘", art: "assets/npc-innkeeper.webp", role: "客栈掌柜",
          talk: "要找夜市，认旧戥子铺的灯。灭灯时往前走也没用，坐店里喝口水，等城头过了戌时梆再去。" }]
      },
      ly_alley: {
        name: "旧戥子铺", x: 2, y: 2, tag: "夜市", art: "assets/scene-nightmarket.webp",
        desc: "空铺门上斜贴一张褪色红花纸，门阶只剩半块。有人沿墙挖开排水沟，又拿碎瓷把沟盖回去。",
        nightDesc: "红花纸背透出低低烛光，卖药人从门缝往外递货。门阶下几片碎瓷被夜露浸湿，拼成一朵不完整的花。",
        exits: ["luoyang_gate", "luoyang_inner"], nightMarket: ["dan_chongmai", "guqin_score", "jade_fan", "yufeng_jar"],
        search: { id: "sr_ly_redmark", nightOnly: true, text: "你掀起红纹碎瓷，从沟沿的干处取出一个红花火漆封住的小药囊，里头是颗冲脉丹。", reward: { item: "dan_chongmai", exp: 80 } }
      }
    }
  });

  JY.registerRegion("changan", {
    entry: "changan_gate", isPlaceholder: false,
    rooms: {
      changan_gate: {
        name: "灞桥东关", x: 1, y: 2, tag: "入口", art: "assets/scene-capital.webp",
        desc: "驼队沿着带霜的桥面入关，骆铃在空阔河面上拖得很远。桥脚旁有挑草药的小贩，也有护镖人留下的歇脚灰堆。",
        nightDesc: "桥头挑起一盏纸灯，残雪映着守关人踩出的湿脚印。远处的驼铃走得极慢，每响一声便显得河上又静了一分。",
        exits: ["ca_market", "changan_inner"], travelOut: true, gather: { herb_common: 2 },
        search: { id: "sr_ca_bridge", text: "你拨开灰堆下的冻土，一包工工整整用细麻缠着的精铁钉露了出来。", reward: { item: "ore_iron", exp: 75 } }
      },
      ca_market: {
        name: "西市胡商街", x: 1, y: 1, tag: "市", art: "assets/scene-capital.webp",
        desc: "胡饼出炉时满街芝麻香，卖药的摊子把最烈的酒摆在外头。蛇杖轻敲青砖的声音穿过一排驼铃。",
        exits: ["changan_gate", "ca_inn", "ca_cellar"], bounty: true, forge: true,
        shop: ["dahuandan", "herb_ginseng", "ore_iron", "wine_strong", "poison_gall"],
        npcs: [{ id: "oyfeng", mateId: "oyfeng", name: "欧阳锋", art: "assets/mate-oyfeng.webp", role: "白驼山主",
          talk: "西域人拣药，先嗅后问价。你若只懂听摊主怎么夸，白驼山的山脚都还没摸到。",
          teach: [{ id: "tiesha", reqAff: 25, gold: 240 }] }]
      },
      ca_inn: {
        name: "雪灯客栈", x: 0, y: 1, tag: "宿", art: "assets/scene-inn.webp",
        desc: "毡门帘沉甸甸挡住冷风，水壶在炭炉上咕嘟作响。几柄行脚刀靠在门口化雪，水流沿砖缝聚进浅盘。",
        exits: ["ca_market"], inn: true, kitchen: true,
        npcs: [{ id: "ca_host", name: "何兆雪", art: "assets/npc-innkeeper.webp", role: "雪灯掌柜",
          talk: "刀冻住了就搁炉旁化，别硬抽。近来有人在关外废驿守着藏货，替官府赶路的都改走了大路。" }]
      },
      ca_cellar: {
        name: "西市秤房", x: 2, y: 1, tag: "夜市", art: "assets/scene-nightmarket.webp",
        desc: "一整排公秤套在麻布里，窗台高处只留一条透气细缝。门前白石用算盘珠垫着才勉强站稳。",
        nightDesc: "窗缝夹出一线灯光，秤房换了小号砝码。须臾交割完一批药材，经手人收起珠盘，地上留了一块黑铁。",
        exits: ["ca_market", "changan_inner"], nightMarket: ["ore_xuantie", "dan_chongmai", "wine_monkey"],
        search: { id: "sr_ca_weighstone", nightOnly: true, text: "你拾起掉在珠盘底的黑色砝码，掂来比同等大小的铁块重许多，原来掺有天外寒铁。", reward: { item: "ore_xuantie", exp: 100 } }
      },
      changan_inner: {
        name: "关外废驿", x: 2, y: 2, tag: "战", art: "assets/scene-wild.webp",
        desc: "旧驿牌歪在雪地，门后响了一声铁环。黑风寨的头目把劫来的货暂存在马槽后，马缰上还捆着一枚官道驿签。",
        exits: ["changan_gate", "ca_cellar"], enemies: ["bandit_boss", "ouyang_ke"], gather: { ore_iron: 2 }
      }
    }
  });
})(window);
