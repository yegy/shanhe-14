/* 山河十四卷 v1.0 · 包 A：山门与修行地 */
(function (root) {
  "use strict";
  const JY = root.JY;

  JY.ENEMIES.kunlun_vanguard = {
    id: "kunlun_vanguard", name: "昆仑掠阵客", d: 6, hp: 1150, atk: 51, def: 20, exp: 420, gold: 245,
    art: "assets/foe-guardian.webp", desc: "趁光明顶守备换班前来夺粮的外来刀客。",
    intents: [
      { type: "iron", name: "横刀护阵", shield: 155, hint: "架刀坚守，可用破甲拆开架势" },
      { type: "flurry", name: "回身叠浪刀", mul: 1.5, fx: { bleed: 1 }, hint: "两记回身快刀，可闪身或用护体接招" },
      { type: "charge", name: "落岩重劈", mul: 2.1, hint: "举刀蓄力，可用点穴打断" }
    ]
  };

  JY.registerRegion("songshan", {
    entry: "songshan_gate", isPlaceholder: false,
    rooms: {
      songshan_gate: {
        name: "少室山山门", x: 1, y: 2, tag: "入口", art: "assets/scene-shaolin.webp",
        desc: "过了百余级窄石阶，山门才从古柏后露出来。门边一只木桶装着挑到半程的泉水，水上浮着柏枝。",
        nightDesc: "前院拴起风铃，砌在山门下的白石一级一级发亮。守门僧凭石阶上的脚步声便知来人走到了哪一级。",
        exits: ["songshan_inner", "ss_wood"], travelOut: true
      },
      songshan_inner: {
        name: "罗汉堂", x: 1, y: 1, tag: "堂", art: "assets/scene-shaolin.webp",
        desc: "堂前一字排开凹了面的石墩，习拳的弟子踩着墩旁粉线走步。拳打到第三式，便有腕上木珠齐声一响。",
        exits: ["songshan_gate", "ss_library", "ss_damo"],
        npcs: [{ id: "sect_shaolin", name: "慧行", art: "assets/npc-monk.webp", role: "罗汉堂知客",
          talk: "先看他们打完这一趟。收拳时两脚若仍压得住线，便有余力护身。你若愿受本寺规矩，我领你去登记法名。",
          sectJoin: "shaolin", teach: [{ id: "luohan", gold: 90 }, { id: "dajin", gold: 380 }, { id: "jinzhong", gold: 420 }] }]
      },
      ss_library: {
        name: "藏经阁", x: 0, y: 1, tag: "经", art: "assets/scene-shaolin.webp",
        desc: "竹帘隔着飞尘，晒经架从窗边一直排到墙角。经架底座嵌了薄薄一片木楔，楔上有扫帚擦出的新痕。",
        nightDesc: "楼里只剩扫帚擦过地砖的声音。桌上一排晾干的补页被压平，能看见灯在每一页背面留下的光。",
        exits: ["songshan_inner", "ss_court"],
        npcs: [{ id: "ss_restorer", name: "智补", art: "assets/npc-monk.webp", role: "藏经阁补经僧",
          talk: "轻些翻。越是从来没人看的那一卷，越容易错把两页当作一页，这便漏过中间那句了。" }],
        search: { id: "sr_ss_bookwedge", text: "你把歪了的经架木楔塞正，从架脚拾起一包给修经人治纸伤的金疮药。", reward: { item: "jinchuang", exp: 75 } }
      },
      ss_court: {
        name: "藏经阁后院", x: 0, y: 0, tag: "院", art: "assets/scene-shaolin.webp",
        desc: "石榴枝拨过经阁后窗，院角一只陶瓮接着檐水。水瓮四周被扫得干净，能看见几道旧扫帚留下的细纹。",
        exits: ["ss_library"]
      },
      ss_damo: {
        name: "达摩院侧廊", x: 2, y: 1, tag: "秘", art: "assets/scene-shaolin.webp",
        desc: "青砖上刻同样大小的掌印，唯北柱下那枚偏转了半寸。磨得发亮的蒲团靠墙叠起，旁边留着一把拂尘。",
        nightDesc: "檐外月光爬到北柱时，被凸起的石雕截成两段。缺去的一段恰好落在一处几乎看不出的地砖暗缝。",
        exits: ["songshan_inner"],
        search: { id: "sr_ss_column", nightOnly: true, text: "你顺着柱影按开松动的地砖，取出一只护指和一枚油纸裹着的大还丹。", reward: { item: "dahuandan", exp: 90 } }
      },
      ss_wood: {
        name: "塔林柴房", x: 0, y: 2, tag: "采", art: "assets/scene-wild.webp",
        desc: "柴房背后石塔成排，泉水绕过碑座，滋养着一带药草。坡下有人叠了新石堆，掩着劫道用的短刀与干粮。",
        exits: ["songshan_gate"], gather: { herb_common: 3, herb_ginseng: 1 }, enemies: ["shanzei"]
      }
    }
  });

  JY.registerRegion("wudang", {
    entry: "wudang_gate", isPlaceholder: false,
    rooms: {
      wudang_gate: {
        name: "解剑岩", x: 1, y: 2, tag: "入口", art: "assets/scene-wudang.webp",
        desc: "临路巨岩斜伸而出，岩下剑架空了半边。守山的道童将湿滑处扫了又扫，提醒香客靠里侧上行。",
        exits: ["wudang_inner", "wd_spring"], travelOut: true
      },
      wudang_inner: {
        name: "紫霄宫", x: 1, y: 1, tag: "宫", art: "assets/scene-wudang.webp",
        desc: "殿前秋风过处，练拳的道士任衣袖飘动，身形始终留在砖缝围成的一尺方地内。",
        nightDesc: "殿里光线很低，仍看得见祖师白须飘动。阶前一枚铜钱在风中转动，声歇下来时，那套慢拳也刚收势。",
        exits: ["wudang_gate", "wd_nanyan", "wd_summit"],
        npcs: [{ id: "zhangsanfeng", name: "张三丰", art: "assets/npc-zhangsf.webp", role: "武当祖师",
          talk: "且莫忙着催劲。你试推我的袖子，觉出空处便停。若有意学这一门，先学会给对手留半步。",
          sectJoin: "wudang", teach: [{ id: "taijiquan", gold: 400 }] }]
      },
      wd_nanyan: {
        name: "南岩挂剑台", x: 0, y: 1, tag: "剑", art: "assets/scene-wudang.webp",
        desc: "岩缝尽头留有旧剑切入的深槽，颜色比周遭石皮沉。槽下半截悬着的麻绳久经雨水，竟还结得牢。",
        exits: ["wudang_inner", "wd_spring"],
        search: { id: "sr_wd_bladerack", text: "你提起槽下麻绳，拉出一只包铁的旧剑鼻，磨去浮锈后仍可当精铁用。", reward: { item: "ore_iron", exp: 85 } }
      },
      wd_summit: {
        name: "金顶铜殿", x: 2, y: 1, tag: "顶", art: "assets/scene-peak.webp",
        desc: "晒热的铜瓦有一股微涩的气味。石栏外是翻涌着的云海，下风口靠着几包专供登顶香客使用的药材。",
        nightDesc: "风转到云海上方，铜瓦失了白昼的暖色。执灯道长收起挡风木牌，露出栏杆内侧封药的小格。",
        exits: ["wudang_inner"],
        npcs: [{ id: "wd_yu_lianzhou", name: "俞莲舟", art: "assets/npc-taoist.webp", role: "武当二侠",
          talk: "下山经南岩，看到松树横生便贴岩行。伤了筋骨，得多歇几个时辰才宜再走。" }],
        search: { id: "sr_wd_copperhall", nightOnly: true, text: "你按执灯道长所指掀开小格，取出一丸留给夜归行脚人的玉露丸。", reward: { item: "yulu", exp: 95 } }
      },
      wd_spring: {
        name: "磨针涧", x: 0, y: 2, tag: "采", art: "assets/scene-wild.webp",
        desc: "流石上有细长的磨迹，涧边长了一片鸭跖草。山贼用折断的树枝挡在斜坡上，逼过路药农走向他们藏身的洼处。",
        exits: ["wudang_gate", "wd_nanyan"], gather: { herb_common: 2, ore_iron: 1 }, enemies: ["shanzei"]
      }
    }
  });

  JY.registerRegion("huashan", {
    entry: "huashan_gate", isPlaceholder: false,
    rooms: {
      huashan_gate: {
        name: "千尺幢石梯", x: 1, y: 2, tag: "入口", art: "assets/scene-huashan.webp",
        desc: "石梯挟在一线山缝中，两边铁链磨得透亮。转过第一处歇脚台，东面通剑堂，西面能攀上后山。",
        exits: ["huashan_inner", "hs_siguoya"], travelOut: true
      },
      huashan_inner: {
        name: "有所不为轩", x: 1, y: 1, tag: "堂", art: "assets/scene-huashan.webp",
        desc: "练剑人用布带束住袖口，剑尖掠窗时飞絮才散开。门外有斑驳的旧剑架，半数剑位挂着新削的木剑。",
        exits: ["huashan_gate", "hs_siguoya", "hs_swordpit"],
        npcs: [{ id: "sect_huashan", name: "梁照川", art: "assets/foe-master.webp", role: "华山传功师兄",
          talk: "肯拜师就随我从木剑练。剑先到，人后到，手腕一僵便反过来了。别拿石壁上的快招乱比。",
          sectJoin: "huashan", teach: [{ id: "hsjian", gold: 100 }] }]
      },
      hs_siguoya: {
        name: "思过崖", x: 0, y: 1, tag: "崖", art: "assets/scene-huashan.webp",
        desc: "石坪背靠一面似裂未裂的岩壁。崖外飞鸟掠过，隔着半天云雾，只看见翼尖在日光下亮了一瞬。",
        nightDesc: "崖风把酒味吹得满坪皆是。月光从顶上一道狭缝落下，洞口那排剑刻的走向渐渐分明。",
        exits: ["huashan_gate", "huashan_inner", "hs_cave"],
        npcs: [{ id: "linghu", mateId: "linghu", name: "令狐冲", art: "assets/mate-linghu.webp", role: "华山剑客",
          talk: "有酒便坐会儿，没酒也坐会儿。你看石壁左边这剑往上挑，偏又有人从右边凿了一道封死它。" }]
      },
      hs_cave: {
        name: "破壁石窟", x: 0, y: 0, tag: "秘", art: "assets/scene-gumu.webp",
        desc: "窟壁有人以剑尖刻招，刻到急处连剑柄也磕进了石面。一笔深过一笔，末尾的断痕才悄然转向。",
        nightDesc: "缝隙漏进月光，使最后一道刻痕和一块松脱石片连了起来。碎石滚到脚边，还带着半截白灰线。",
        exits: ["hs_siguoya"],
        search: { id: "sr_hs_carving", nightOnly: true, text: "你提起沿刻痕松开的石片，见其下夹着一枚冲脉丹，连丹衣都用蜡封住。", reward: { item: "dan_chongmai", exp: 110 } }
      },
      hs_swordpit: {
        name: "断剑冢", x: 2, y: 1, tag: "采", art: "assets/scene-cliff.webp",
        desc: "石罅里有遗下的钝剑，闻风便在同一块青石上来回磕碰。朝阳面生了矮药草，裸出的矿脉也可采挖。",
        exits: ["huashan_inner"], gather: { ore_iron: 3, herb_common: 1 }, enemies: ["zuo_lengchan"],
        search: { id: "sr_hs_brokensword", text: "你从钝剑旁拾得一截玄色剑尖，剑身碎了，留下的一片天外寒铁仍可重入炉。", reward: { item: "ore_xuantie", exp: 80 } }
      }
    }
  });

  JY.registerRegion("emei", {
    entry: "emei_gate", isPlaceholder: false,
    rooms: {
      emei_gate: {
        name: "接引石桥", x: 1, y: 2, tag: "入口", art: "assets/scene-emei.webp",
        desc: "两崖之间搭一座窄石桥，桥面缝里积着新落的针叶。登山人歇足后多走殿前山道，早起采药的则沿涧上行。",
        exits: ["emei_hall", "em_herbgully"], travelOut: true
      },
      emei_hall: {
        name: "金顶正殿", x: 1, y: 1, tag: "殿", art: "assets/scene-emei.webp",
        desc: "云海擦过殿门，山下两条深溪的水声时近时远。周芷若在殿前练剑，每逢变招便顿住片刻，倾耳听水。",
        exits: ["emei_gate", "em_swordcourt", "emei_inner"],
        npcs: [{ id: "zhouzhiruo", mateId: "zhouzhiruo", name: "周芷若", art: "assets/mate-zhouzhiruo.webp", role: "峨眉弟子",
          talk: "桥下两道水各走各的，合起来倒比一条更响。师姐说我一心求快，少侠且替我看看收剑时可站稳了。",
          teach: [{ id: "yitian", reqAff: 30, gold: 320 }, { id: "jiuyinzhua", reqAff: 55, gold: 560 }] }]
      },
      em_swordcourt: {
        name: "松风练剑院", x: 0, y: 1, tag: "武", art: "assets/scene-emei.webp",
        desc: "院里扫成横竖分明的几块，弟子换了身位，松针落下的位置才重新露出来。墙边叠着练剑磨破的手衣。",
        nightDesc: "松影盖了半边练剑地，木剑收拢后仍在架上微颤。案头一盏灯照清了各人指套上磨损的位置。",
        exits: ["emei_hall"],
        npcs: [{ id: "sect_emei", name: "静玄", art: "assets/npc-heroine.webp", role: "峨眉知客",
          talk: "愿拜师，便先把院地扫完，回来我看你步子乱没乱。静下来再练剑，松声里自有可学的快慢。",
          sectJoin: "emei", teach: [{ id: "songfeng", gold: 160 }] }],
        search: { id: "sr_em_swordcourt", text: "你替师姐挪开受潮的手衣，在匣底捡到一包给练剑弟子敷手的草药。", reward: { item: "herb_common", exp: 65 } }
      },
      emei_inner: {
        name: "金顶伏虎台", x: 2, y: 1, tag: "秘", art: "assets/scene-peak.webp",
        desc: "云从台面漫过去，石上两道刀痕乍看一样深，摸到末端才知其一是顺锋而退。",
        nightDesc: "佛灯从崖后照来，短刀痕收势处透出细光。原来台下有人借刀痕方位留了个手臂深的穴。",
        exits: ["emei_hall"], enemies: ["miejue_boss"],
        search: { id: "sr_em_bladegroove", nightOnly: true, text: "你循短痕伸手探去，摸出一瓷瓶护身用的玉露丸，瓶外还缠着防磕碎的绒布。", reward: { item: "yulu", exp: 95 } }
      },
      em_herbgully: {
        name: "白猿药涧", x: 2, y: 2, tag: "采", art: "assets/scene-wild.webp",
        desc: "溪石间都是落果，几串猿足印停在山参旁，没有踩上参叶。陡坎下还能掘些入药的岩间根须。",
        exits: ["emei_gate"], gather: { herb_common: 3, herb_ginseng: 1 }
      }
    }
  });

  JY.registerRegion("zhongnan", {
    entry: "zhongnan_gate", isPlaceholder: false,
    rooms: {
      zhongnan_gate: {
        name: "松门古道", x: 1, y: 2, tag: "入口", art: "assets/scene-gumu.webp",
        desc: "道旁石柱横斜，挑柴人把松结留在上边标路。沿坡上去是重阳宫旧址，另一头的溪谷更近后山。",
        exits: ["zhongnan_inner", "zn_stream"], travelOut: true
      },
      zhongnan_inner: {
        name: "重阳宫旧址", x: 1, y: 1, tag: "旧", art: "assets/scene-wudang.webp",
        desc: "旧殿石基还在，梁木只剩一截焦头。几方没被搬下山的门槛垒成坐处，来人能歇脚看谷中薄云。",
        nightDesc: "山风把枯松枝拖过空殿的砖基。守碑人挪灯去照残碑，地面留下一串清晰的梁钉旧孔。",
        exits: ["zhongnan_gate", "zn_stonecave", "zn_steps"],
        npcs: [{ id: "zn_steward", name: "尹石泉", art: "assets/npc-taoist.webp", role: "旧宫守碑人",
          talk: "碑眼朝山，旧砖便该朝山放。你若找那位爱玩的老人，去石洞听响，他总要往石壁上拍两掌才肯出声。" }],
        search: { id: "sr_zn_columnseat", text: "你从梁钉长孔里抽出一包防潮蜡纸，里面几粒旧日行气所用的药丸只剩一颗完好。", reward: { item: "dan_chongmai", exp: 80 } }
      },
      zn_stonecave: {
        name: "回声石洞", x: 0, y: 1, tag: "拳", art: "assets/scene-gumu.webp",
        desc: "抬手击壁，左边先响，右边迟半拍。泥地上画着两只圆，一只用右脚兜出来，一只却从左边起圈。",
        exits: ["zhongnan_inner"],
        npcs: [{ id: "zhoubotong", name: "周伯通", art: "assets/npc-zhoubt.webp", role: "老顽童",
          talk: "你左手伸直，右手别跟着它。我空空地打一拳，你偏要伸掌去接，下一拳可就进得来了！",
          teach: [{ id: "kongming", gold: 360 }, { id: "zuoyou", gold: 680 }] }]
      },
      zn_steps: {
        name: "西岭残阶", x: 2, y: 1, tag: "秘", art: "assets/scene-cliff.webp",
        desc: "石级尽处地势忽然断下，横木是樵夫后来补的。断口旁有水痕，晴日里摸上去也凉得出奇。",
        nightDesc: "星光映进横木下的小水槽，水槽照出倒悬的路标。原来下面还有一级凿平的旧阶。",
        exits: ["zhongnan_inner", "zn_stream"],
        search: { id: "sr_zn_steps", nightOnly: true, text: "你探到横木下的旧阶，在路标背面拾得一包老参片，皮纸还干爽。", reward: { item: "herb_ginseng", exp: 90 } }
      },
      zn_stream: {
        name: "枕松溪谷", x: 2, y: 2, tag: "采", art: "assets/scene-wild.webp",
        desc: "几株松树贴水生长，树根把药草从溪沙里隔开。下游有一堆弃置的空货袋，其中一只还绣着官道商号。",
        exits: ["zhongnan_gate", "zn_steps"], gather: { herb_common: 3, herb_ginseng: 1 }, enemies: ["shanzei"]
      }
    }
  });

  JY.registerRegion("gumu", {
    entry: "gumu_gate", isPlaceholder: false,
    rooms: {
      gumu_gate: {
        name: "断龙石前", x: 1, y: 2, tag: "入口", art: "assets/scene-gumu.webp",
        desc: "荒草遮起巨石半面，旁边仅有一条够单人侧身的墓道。杨过正以剑鞘拨开压住小路的荆棘。",
        nightDesc: "墓道向外吐着寒气，巨石上的细纹一根根显出。剑鞘沿地轻轻一顿，像是给夜归人示意落脚之处。",
        exits: ["gumu_hall", "gm_bees"], travelOut: true,
        npcs: [{ id: "yangguo", mateId: "yangguo", name: "杨过", art: "assets/mate-yangguo.webp", role: "神雕侠士",
          talk: "这石头且莫乱碰，从我扫出的窄处过去就是了。进去说话轻些，此间风也能把你的声音送过三重门。" }]
      },
      gumu_hall: {
        name: "寒玉石室", x: 1, y: 1, tag: "室", art: "assets/scene-gumu.webp",
        desc: "寒玉床贴着西壁，石案上倒扣着一只裂沿药罐。小龙女在案旁收拾白绸，折到末尾才露出绸上练剑留下的孔。",
        exits: ["gumu_gate", "gumu_inner", "gm_waterway"],
        npcs: [{ id: "xiaolongnv", mateId: "xiaolongnv", name: "小龙女", art: "assets/mate-xiaolongnv.webp", role: "古墓传人",
          talk: "你若想学，先把白绸提起来，试试不让它沾地。古墓常年这样冷，肯住下来再说拜师。",
          sectJoin: "gumu", teach: [{ id: "yunvjian", gold: 200 }] }]
      },
      gumu_inner: {
        name: "寒玉床西侧", x: 0, y: 1, tag: "秘", art: "assets/scene-gumu.webp",
        desc: "床沿冷雾在地面铺开，唯西角一小块先化成水。石板上横着一根旧木尺，尺脚挡住了石床底的半月缺口。",
        exits: ["gumu_hall"],
        search: { id: "sr_gm_coldbed", text: "你抽起木尺，从半月缺口内勾出以蜡封严的细筒，筒里是一丸冲脉丹。", reward: { item: "dan_chongmai", exp: 95 } }
      },
      gm_waterway: {
        name: "暗河石槽", x: 2, y: 1, tag: "潜", art: "assets/scene-gumu.webp",
        desc: "汉白石坡悄悄没入水里，暗流裹着白日洞外漏进的光，让浅处看上去也深不可测。",
        nightDesc: "外头潭水暗下去，摸黑时反倒听清了石槽两股水的分流。较浅那股漏进石缝，下面有一处贴壁的干台。",
        exits: ["gumu_hall"],
        search: { id: "sr_gm_waterway", nightOnly: true, text: "你沿漏水的石槽摸到干台，在褪尽颜色的行囊里取出一瓶玉露丸。", reward: { item: "yulu", exp: 105 } }
      },
      gm_bees: {
        name: "玉蜂石圃", x: 0, y: 2, tag: "采", art: "assets/scene-wild.webp",
        desc: "石砌蜂巢已有年头，白蜂绕过散落的药草梗飞向花丛。药圃边缘用卵石圈着，过路人得以绕开蜂行。",
        exits: ["gumu_gate"], gather: { herb_common: 3, herb_ginseng: 1 }
      }
    }
  });

  JY.registerRegion("wuliang", {
    entry: "wuliang_gate", isPlaceholder: false,
    rooms: {
      wuliang_gate: {
        name: "剑湖渡石", x: 1, y: 2, tag: "入口", art: "assets/scene-dali.webp",
        desc: "浅水上的踏石打磨成剑脊形，踩在中间才稳。瀑声沿水面迎上来，去剑湖宫与去涧边的人在岸角分路。",
        exits: ["wl_palace", "wl_waterfall"], travelOut: true
      },
      wl_palace: {
        name: "剑湖宫", x: 1, y: 1, tag: "宫", art: "assets/scene-dali.webp",
        desc: "几盏油灯排在朝湖的木窗下，能隐隐照出对岸石壁。在院里练剑的人时不时停下手，望那壁上有没有移动的光。",
        nightDesc: "透窗的灯照不到对岸，偶有峰上月光从湖雾漏过，在石壁上投下一截若有若无的剑影。",
        exits: ["wuliang_gate", "wuliang_inner", "wl_matstone", "wl_cave"],
        npcs: [{ id: "wl_keeper", name: "左青舟", art: "assets/foe-master.webp", role: "剑湖宫看剑人",
          talk: "剑影来时你别跟着练，先看它从哪儿起。瀑下岔洞里那方玉像，有人当作石头，有人却跟它学了步子。" }]
      },
      wuliang_inner: {
        name: "琅嬛福地", x: 0, y: 1, tag: "洞", art: "assets/scene-gumu.webp",
        desc: "玉像衣褶顺着水光泛蓝。垫脚蒲团已经磨薄，旁边有一张八卦图，一半用炭笔画，一半直接刻在石地上。",
        exits: ["wl_palace", "wl_waterfall"],
        npcs: [{ id: "sect_xiaoyao", name: "苏归真", art: "assets/npc-taoist.webp", role: "逍遥派引路人",
          talk: "对着地上的八卦走一圈，从你站的地方起步。走完还能回到这里，我便替你引见门中长辈。",
          sectJoin: "xiaoyao", teach: [{ id: "yanzi", gold: 160 }, { id: "baihong", gold: 360 }] }],
        search: { id: "sr_wl_mat", text: "你掀起潮裂的一角蒲团，替它换去吸饱水的旧衬，拿出压在干层的玉露丸。", reward: { item: "yulu", exp: 100 } }
      },
      wl_matstone: {
        name: "卧剑观壁台", x: 2, y: 1, tag: "秘", art: "assets/scene-dali.webp",
        desc: "几块松石排成可供席地而坐的方台。最前一块开了指宽深的短槽，用来接从上方滴落的水。",
        nightDesc: "水槽收满才反出月光。你在倒影里看见石台下方还刻了一道细线，那处接缝一直藏在白日水影后。",
        exits: ["wl_palace"],
        search: { id: "sr_wl_reflection", nightOnly: true, text: "你借反光寻到台底细缝，从中勾出一粒封存久了仍无潮痕的冲脉丹。", reward: { item: "dan_chongmai", exp: 110 } }
      },
      wl_cave: {
        name: "剑湖石窟", x: 1, y: 0, tag: "棋", art: "assets/scene-gumu.webp",
        desc: "湖声从窟顶几处细孔传下来。入口石案上的棋盘划歪了一道，偏有一枚黑子落在歪线与横线相交的地方。",
        exits: ["wl_palace"], enemies: ["jiumozhi"]
      },
      wl_waterfall: {
        name: "回珠瀑底", x: 0, y: 2, tag: "采", art: "assets/scene-dali.webp",
        desc: "瀑脚的水珠沿下风飘，崖脚被冲成黑亮的夹缝。浅沟里积着清水，粗根药草与露岩上的铁砂都可采取。",
        exits: ["wuliang_gate", "wuliang_inner"], gather: { herb_common: 2, herb_ginseng: 1, ore_iron: 1 }
      }
    }
  });

  JY.registerRegion("guangming", {
    entry: "guangming_gate", isPlaceholder: false,
    rooms: {
      guangming_gate: {
        name: "昆仑照壁", x: 1, y: 2, tag: "入口", art: "assets/scene-cliff.webp",
        desc: "白灰火纹刻在黑石上，替赶路的人标出背风坡。守山弟子把粮袋堆到照壁后，挡住山口卷来的沙。",
        exits: ["gm_hall", "guangming_inner"], travelOut: true
      },
      gm_hall: {
        name: "圣火大殿", x: 1, y: 1, tag: "殿", art: "assets/scene-cliff.webp",
        desc: "圣火旁的方桌摊开运粮簿，张无忌把一碗还温着的药推给伤员。殿外山风很紧，门内却没有半点烟。",
        nightDesc: "排灯熄了大半，只留圣火照亮放粮签的桌案。张无忌守在灯边替最后几名换岗弟子诊看箭伤。",
        exits: ["guangming_gate", "gl_tunnel", "gl_infirmary"],
        npcs: [{ id: "zhangwj", mateId: "zhangwj", name: "张无忌", art: "assets/mate-zhangwj.webp", role: "明教教主",
          talk: "来坐近些，把手伸给我，我瞧瞧可冻伤了。想入教也好，愿意替伤者熬一锅药，这就帮得上忙。",
          sectJoin: "mingjiao" }]
      },
      gl_tunnel: {
        name: "圣火地道", x: 0, y: 1, tag: "潜", art: "assets/scene-gumu.webp",
        desc: "越往里走越能听出殿外脚步透过石孔的回声。矿脉旁那块隔风板掩住了几处旧栓孔，留手细摸便知。",
        nightDesc: "石孔上方有换岗提灯慢慢经过。提灯挪走的瞬间，隔风板后一线光反而亮了，似有薄铜映在暗处。",
        exits: ["gm_hall", "guangming_inner"], gather: { ore_iron: 2, herb_common: 1 },
        search: { id: "sr_gl_tunnel", nightOnly: true, text: "你借石孔漏光找到卡在铜栓上的黑色垫片，去掉铜锈，露出其内的一片天外寒铁。", reward: { item: "ore_xuantie", exp: 125 } }
      },
      gl_infirmary: {
        name: "药石偏殿", x: 2, y: 1, tag: "丹", art: "assets/scene-alchemy.webp",
        desc: "伤员的木牌悬在床头，灶上几只药罐轮换着烧。药案前侧放一抽屉用旧的称纸，下面垫着完整的木薄板。",
        exits: ["gm_hall"], alchemy: true, shop: ["jinchuang", "dahuandan", "herb_common"],
        npcs: [{ id: "gl_medic", name: "柳怀朴", art: "assets/npc-hermit.webp", role: "明教药堂弟子",
          talk: "西面地道常渗水，顺湿处走就到粮道。若见短旗倒放，便是有人劫粮，我这里备了急用的伤药。" }],
        search: { id: "sr_gl_tray", text: "你按药堂弟子说的掀起抽屉底板，拣出一枚放在外侧留作急救的大还丹。", reward: { item: "dahuandan", exp: 90 } }
      },
      guangming_inner: {
        name: "乱石粮道", x: 0, y: 2, tag: "战", art: "assets/scene-cliff.webp",
        desc: "翻倒的粮篓卡在石隙，洒出的碎米被风刮成线。一支短旗倒插在外口，来掠粮的刀客还在弯后的石掩间守候。",
        exits: ["guangming_gate", "gl_tunnel"], enemies: ["kunlun_vanguard", "cheng_kun"],
        idle: { name: "护送昆仑粮队", expPerMin: 66, goldPerMin: 30, mat: "ore_iron" }
      }
    }
  });
})(window);
