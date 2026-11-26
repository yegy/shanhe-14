/* =====================================================================
   山河十四卷 v1.0 · 示范区域子房间包（4大核心区域 × 22间精装子房间）
   同时作为「外包包 A（其余 22 区 110+ 房间）」的 100% 标准结构范本
   ===================================================================== */
(function (root) {
  "use strict";
  const JY = root.JY;

  // 1. 悦来镇（6 间精装子房间：新手起手与散修奇遇发源地）
  JY.registerRegion("yuelai", {
    entry: "yl_gate",
    rooms: {
      yl_gate: {
        name: "镇口牌坊", x: 1, y: 2, tag: "入口", art: "assets/scene-town.webp",
        desc: "青石牌坊下柳絮轻扬，南来北往的商旅与负剑侠客在此歇脚，官道西通襄阳城外。",
        nightDesc: "夜雾笼罩青石牌坊，两盏白灯笼在晚风里轻轻摇晃，偶有夜行人策马疾驰而过。",
        exits: ["yl_street", "yl_forest"],
        travelOut: true,
        search: { id: "sr_yl_gate", text: "你在牌坊石狮底座缝隙里摸出一张皱巴巴的旧纸条，上面画着城外乱葬古碑的记号，还沾着淡淡药香。", reward: { gold: 25, exp: 30, item: "herb_common" } }
      },
      yl_street: {
        name: "青石长街", x: 1, y: 1, tag: "市", art: "assets/scene-town.webp",
        desc: "悦来镇最热闹的十字街口，茶楼酒旗招展，铁铺叮当，街角贴着几张崭新的江湖悬赏榜。",
        nightDesc: "白日喧嚣散去，唯有福来客栈与悦来茶楼还透着几缕暖黄灯火。",
        exits: ["yl_gate", "yl_teahouse", "yl_dojo", "yl_inn"],
        bounty: true,
        shop: ["jinchuang", "yulu", "food_fowl", "food_ham", "wine_nver", "treasure_map"]
      },
      yl_teahouse: {
        name: "悦来茶楼", x: 0, y: 1, tag: "茶", art: "assets/scene-inn.webp",
        desc: "二楼临窗雅座茶香四溢，说书人百晓生轻摇折扇，正将中原近况与江湖奇闻娓娓道来。",
        nightDesc: "茶楼打烊前只剩三两老客，百晓生独自在灯下整理江湖密录，似乎正等有缘人前来。",
        exits: ["yl_street"],
        npcs: [
          { id: "baixiaosheng", name: "百晓生", art: "assets/npc-baixiaosheng.webp", role: "江湖百晓",
            talk: "少侠面生得很！如今天下纷乱，拜入门派可得成体系绝学；若甘做江湖散修，茶楼里正有一桩「无名残页」奇闻等你查探。",
            quests: ["ts_she", "sanxiu_arc"] }
        ]
      },
      yl_dojo: {
        name: "王氏武馆", x: 2, y: 1, tag: "武", art: "assets/scene-town.webp",
        desc: "青砖演武场上兵器架排列整齐，王教头正带着几名镇上少年演练太祖长拳，呼喝声震天。",
        nightDesc: "演武场空无一人，月光洒在木人桩上，正是独自运功体悟招式的好时机。",
        exits: ["yl_street"],
        npcs: [
          { id: "wang_coach", name: "王教头", art: "assets/foe-master.webp", role: "武馆教头",
            talk: "练武讲究招式连携与见招拆招！敌蓄力便点穴打断，敌铁壁便用破甲拆解——老夫这里有几门入门好武艺，你可随时请教。",
            teach: [
              { id: "wuhu", gold: 80 },
              { id: "songfeng", gold: 80 },
              { id: "dianxue", gold: 120 },
              { id: "guixi", gold: 120 },
              { id: "yanzi", gold: 100 }
            ] }
        ]
      },
      yl_inn: {
        name: "福来客栈", x: 1, y: 0, tag: "宿", art: "assets/scene-inn.webp",
        desc: "大堂飘着酱肉与女儿红的香气，后厨灶火正旺，楼上客房干净雅致，可歇息恢复或等候入夜。",
        exits: ["yl_street"],
        inn: true,
        kitchen: true,
        search: { id: "sr_yl_inn", nightOnly: true, text: "你趁夜色在客栈二楼走廊暗角拾得一枚掉落的「天外寒铁」碎块，似是某位过路刀客所遗！", reward: { item: "ore_xuantie", exp: 40 } }
      },
      yl_forest: {
        name: "镇东后林", x: 2, y: 2, tag: "野", art: "assets/scene-wild.webp",
        desc: "翠竹古松掩映山径，林间常生野草药，偶尔也有落单山贼潜伏林中伺机劫掠。",
        exits: ["yl_gate"],
        gather: { herb_common: 2, food_fowl: 1 },
        enemies: ["shanzei"],
        idle: { name: "后林练手", expPerMin: 26, goldPerMin: 12, mat: "herb_common" }
      }
    }
  });

  // 2. 襄阳城（9 间精装子房间：中原大城标杆，含昼夜黑市、郭府、神兵铁匠、药王堂、北城箭楼）
  JY.registerRegion("xiangyang", {
    entry: "xy_gate",
    rooms: {
      xy_gate: {
        name: "南城门官道", x: 1, y: 3, tag: "入口", art: "assets/scene-xiangyang.webp",
        desc: "巍峨青砖城墙高逾三丈，守城宋兵盘查严格，城外战云密布却挡不住中原侠客汇聚于此。",
        nightDesc: "城门紧闭，吊桥高悬，城头火把连成一线，冷风卷着远处蒙古营地的马嘶声。",
        exits: ["xy_square"],
        travelOut: true
      },
      xy_square: {
        name: "朱雀大街", x: 1, y: 2, tag: "市", art: "assets/scene-xiangyang.webp",
        desc: "襄阳城中轴闹市，酒楼林立、车马如龙，街心告示牌贴满六扇门与郭府发出的抗蒙悬赏。",
        exits: ["xy_gate", "xy_forge", "xy_herb", "xy_guofu_hall", "xy_gaibang", "xy_alley"],
        bounty: true,
        shop: ["jinchuang", "dahuandan", "yulu", "dan_chongmai", "food_fowl", "food_ham", "wine_nver", "wine_strong", "treasure_map"]
      },
      xy_forge: {
        name: "百炼铁匠铺", x: 0, y: 2, tag: "锻", art: "assets/scene-forge.webp",
        desc: "炉火熊熊，铁砧火星四溅。老铁匠常年替守城将士打磨刀枪，也接手江湖客的神兵锻造。",
        exits: ["xy_square"],
        forge: true,
        npcs: [
          { id: "blacksmith", name: "老铁匠", art: "assets/npc-smith.webp", role: "神兵巧匠",
            talk: "寻常白板兵器哪砍得动蒙古重甲？带齐百炼精铁或天外寒铁，老夫在「技艺·锻造」里替你打带词条的利刃，甚至重铸玄铁重剑！" }
        ]
      },
      xy_herb: {
        name: "药王堂", x: 2, y: 2, tag: "丹", art: "assets/scene-alchemy.webp",
        desc: "满室百草清香，青铜丹炉文火轻燃，柜台摆着各类解毒丹、冲脉丹与长白老参。",
        exits: ["xy_square"],
        alchemy: true,
        shop: ["jinchuang", "dahuandan", "dan_chongmai", "herb_common", "herb_ginseng"]
      },
      xy_guofu_hall: {
        name: "郭府正厅", x: 1, y: 1, tag: "府", art: "assets/scene-xiangyang.webp",
        desc: "青砖灰瓦、陈设朴素，中堂高悬「侠之大者」牌匾。郭靖正伏案研究襄阳城防舆图。",
        nightDesc: "正厅烛火通明，郭靖与守城将领彻夜议事，后院却隐约传来细碎脚步声。",
        exits: ["xy_square", "xy_guofu_yard", "xy_wall"],
        npcs: [
          { id: "guojing", mateId: "guojing", name: "郭靖", art: "assets/mate-guojing.webp", role: "襄阳巨侠",
            talk: "侠之大者，为国为民。少侠若愿助守襄阳，郭某必倾囊相待。",
            quests: ["ts_she"],
            teach: [{ id: "xianglong", reqFlag: "she_completed", gold: 600 }] }
        ]
      },
      xy_guofu_yard: {
        name: "郭府后院", x: 2, y: 1, tag: "院", art: "assets/scene-xiangyang.webp",
        desc: "桂树成荫、石桌摆着残局与香茗，黄蓉正托腮盘算城防粮草，目光灵动。",
        nightDesc: "三更梆子声起，桂影婆娑，石井旁似乎有黑影贴着书房窗棂鬼鬼祟祟！",
        exits: ["xy_guofu_hall"],
        kitchen: true,
        npcs: [
          { id: "huangrong", mateId: "huangrong", name: "黄蓉", art: "assets/mate-huangrong.webp", role: "丐帮帮主",
            talk: "咯咯，瞧你眉宇间颇有几分灵气！要是会做「玉笛谁家听落梅」，本姑娘可要刮目相看啦。",
            quests: ["ts_she"],
            teach: [{ id: "luoying", reqAff: 25, gold: 220 }, { id: "dagou", reqAff: 60, gold: 450 }] }
        ],
        search: { id: "sr_guofu_well", nightOnly: true, text: "你在后院古井青石下摸出一枚沾着蜡封的蒙古狼牙密信，上面写着「暗巷黑市·亥时接头」！", reward: { exp: 90, setFlag: "found_guofu_note" } }
      },
      xy_gaibang: {
        name: "丐帮分舵", x: 0, y: 1, tag: "帮", art: "assets/scene-xiangyang.webp",
        desc: "大院里数十名净衣、污衣弟子正盘膝论拳，鲁有脚长老坐镇堂中调度中原眼线。",
        exits: ["xy_square"],
        inn: true,
        npcs: [
          { id: "luyoujiao", name: "鲁有脚", art: "assets/foe-master.webp", role: "丐帮长老",
            talk: "天下消息最灵通处，除了悦来茶楼便是咱们丐帮！想拜入丐帮或学打狗入门功夫，尽管开口。",
            sectJoin: "gaibang",
            teach: [{ id: "tiesha", gold: 100 }, { id: "kongming", reqLv: 3, gold: 320 }] }
        ]
      },
      xy_alley: {
        name: "暗巷黑市", x: 2, y: 3, tag: "夜市", art: "assets/scene-nightmarket.webp",
        desc: "白日里这里只是条荒僻死胡同，墙角堆着空酒坛，空无一人。（提示：戌时至丑时入夜后黑市才会开张！）",
        nightDesc: "入夜后幽幽鬼火般的灯笼亮起，斗笠客们低声交易秘籍残页、藏宝图与禁药，杀机与机遇并存。",
        exits: ["xy_square"],
        nightMarket: ["ore_xuantie", "dan_chongmai", "dan_jiuzhuan", "wine_monkey", "guqin_score", "jade_fan", "yufeng_jar", "hanshui_silk", "poison_gall", "treasure_map"],
        enemies: ["xiangyang_spy_elite"]
      },
      xy_wall: {
        name: "北城箭楼", x: 1, y: 0, tag: "战", art: "assets/scene-xiangyang.webp",
        desc: "登临北城最高箭楼，北风猎猎，城外蒙古大军营帐连绵十里，千夫长巴图随时可能突袭城关！",
        exits: ["xy_guofu_hall"],
        enemies: ["xiangyang_spy_elite", "mongol_commander"],
        idle: { name: "箭楼守城练兵", expPerMin: 72, goldPerMin: 35, mat: "ore_iron" }
      }
    }
  });

  // 3. 襄阳城外（4 间精装子房间：野外打怪、采集矿石草药、散修古碑机关）
  JY.registerRegion("chengwai", {
    entry: "cw_road",
    rooms: {
      cw_road: {
        name: "官道荒亭", x: 1, y: 1, tag: "入口", art: "assets/scene-wild.webp",
        desc: "十里长亭残破斑驳，荒草齐腰。往东回悦来镇，往西直抵襄阳南门，北面小径通往山贼营寨与古碑。",
        exits: ["cw_camp", "cw_stele", "cw_mine"],
        travelOut: true,
        enemies: ["shanzei"]
      },
      cw_camp: {
        name: "黑风山寨", x: 0, y: 0, tag: "寨", art: "assets/scene-wild.webp",
        desc: "木栅环绕的山贼营盘，篝火噼啪作响，黑风寨大当家正扛着大刀巡视劫来的商队财货。",
        exits: ["cw_road"],
        enemies: ["shanzei", "bandit_boss"],
        idle: { name: "剿匪练功", expPerMin: 48, goldPerMin: 22, mat: "ore_iron" },
        search: { id: "sr_cw_camp", text: "你在大当家虎皮椅后的暗箱里翻出一袋碎银与一张「残破藏宝图」！", reward: { gold: 140, item: "treasure_map" } }
      },
      cw_stele: {
        name: "乱葬古碑", x: 1, y: 0, tag: "秘", art: "assets/scene-gumu.webp",
        desc: "密林深处矗立着一座前朝游侠残碑，碑身剑痕纵横，似乎暗藏着江湖散修遗留的秘闻与奇遇。",
        nightDesc: "月光照在古碑剑痕上，隐约映出几行奇异经脉走气路线，四周鸦雀无声。",
        exits: ["cw_road"],
        npcs: [
          { id: "hermit_stele", name: "隐世奇人", art: "assets/npc-hermit.webp", role: "散修前辈",
            talk: "无门无派未必低人一等。能寻到此碑，说明你福缘不浅。",
            quests: ["sanxiu_arc", "ts_she"],
            teach: [{ id: "tanzhi", reqFlag: "sanxiu_ep2_done", gold: 240 }, { id: "xuantie", reqFlag: "sanxiu_ep3_done", gold: 600 }] }
        ],
        search: { id: "sr_cw_stele", text: "你细细抚摸古碑背面，竟抠出一颗封蜡完好的「冲脉丹」与 80 点武学修为感悟！", reward: { item: "dan_chongmai", exp: 80 } }
      },
      cw_mine: {
        name: "松林矿脉", x: 2, y: 1, tag: "采", art: "assets/scene-wild.webp",
        desc: "山壁裸露着青黑色精铁矿石，溪畔更生有罕见的长白老参与金银草，是锻造炼丹的天然宝地。",
        exits: ["cw_road"],
        gather: { ore_iron: 2, herb_common: 2, herb_ginseng: 1 }
      }
    }
  });

  // 4. 聚贤庄（3 间精装子房间：乔峰豪情与英雄大会前哨）
  JY.registerRegion("juxian", {
    entry: "juxian_gate",
    rooms: {
      juxian_gate: {
        name: "聚贤庄大门", x: 1, y: 2, tag: "入口", art: "assets/scene-juxian.webp",
        desc: "朱漆大门高挂英雄帖，来自五湖四海的江湖群雄正陆续入庄，门前气氛剑拔弩张。",
        exits: ["juxian_hall"],
        travelOut: true
      },
      juxian_hall: {
        name: "聚贤演武厅", x: 1, y: 1, tag: "厅", art: "assets/scene-juxian.webp",
        desc: "百余张酒席环列，烈酒香气与肃杀之气交织。人群中央，乔峰正孤身端碗长笑，豪气冲天！",
        exits: ["juxian_gate", "juxian_cellar"],
        enemies: ["juxian_elite"],
        npcs: [
          { id: "qiaofeng", mateId: "qiaofeng", name: "乔峰", art: "assets/mate-qiaofeng.webp", role: "盖世豪侠",
            talk: "哈哈！天下人皆视乔某为契丹恶贼，少侠却敢在此与我共饮一碗，真乃痛快人！",
            quests: ["juxian_story"] }
        ]
      },
      juxian_cellar: {
        name: "后院酒窖", x: 2, y: 1, tag: "秘", art: "assets/scene-gumu.webp",
        desc: "阴凉酒窖里排列着几十坛陈年老酒，墙角似乎还藏着一处通往庄外的秘密暗门。",
        exits: ["juxian_hall"],
        search: { id: "sr_jx_cellar", text: "你在最深处的酒坛后翻出一坛「塞外烈烧刀」与 150 两私藏银票！", reward: { item: "wine_strong", gold: 150 } }
      }
    }
  });

  // ---------- 其余 22 个大区域的自动兜底入口房（待外包包 A 丢入 data/world/*.js 即无缝替换扩充成 120+ 间） ----------
  Object.keys(JY.REGIONS_META).forEach(rid => {
    if (JY.REGIONS[rid]) return;
    const m = JY.REGIONS_META[rid];
    const mateHere = JY.MATES.filter(x => x.loc === rid);
    const sectKey = Object.keys(JY.SECTS).find(k => JY.SECTS[k].loc === rid);
    const npcs = mateHere.map(mt => ({
      id: mt.id, mateId: mt.id, name: mt.name, art: mt.art, role: mt.gender === "f" ? "江湖红颜" : "武林豪杰",
      talk: mt.intro
    }));
    if (sectKey) {
      npcs.push({ id: "sect_" + sectKey, name: JY.SECTS[sectKey].name + "长老", art: "assets/foe-master.webp", role: "门派引路", talk: JY.SECTS[sectKey].intro, sectJoin: sectKey });
    }
    const foe = rid === "huading" ? ["wangcy_boss"] : rid === "heimuya" ? ["dongfang_boss"] : m.d >= 5 ? ["mongol_commander"] : ["bandit_boss"];
    JY.registerRegion(rid, {
      entry: rid + "_gate",
      isPlaceholder: true,
      rooms: {
        [rid + "_gate"]: {
          name: m.name + "·前庭", x: 1, y: 1, tag: "入口", art: m.art,
          desc: m.desc + "（当前为核心示范版基础入口，放入外包包 A 的区域文件后将自动展开 4–8 间精细子房间。）",
          exits: [rid + "_inner"],
          travelOut: true,
          npcs: npcs,
          inn: m.kind === "city"
        },
        [rid + "_inner"]: {
          name: m.name + (m.kind === "peak" ? "·论剑绝顶" : "·深处秘境"), x: 2, y: 1, tag: m.kind === "peak" ? "战" : "秘", art: m.art,
          desc: `深入${m.name}腹地，劲风猎猎，高人遗迹与强敌皆隐于此。`,
          exits: [rid + "_gate"],
          enemies: foe,
          gather: { herb_ginseng: 1, ore_iron: 2 },
          idle: { name: `${m.name}潜修`, expPerMin: 20 + m.d * 14, goldPerMin: 10 + m.d * 6, mat: m.d >= 5 ? "ore_xuantie" : "herb_common" }
        }
      }
    });
  });
})(window);
