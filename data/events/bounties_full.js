/* =====================================================================
   山河十四卷 v1.0 · 江湖悬赏、秘藏与稀有敌手
   ===================================================================== */
(function (root) {
  "use strict";
  const JY = root.JY;

  // 完整地图中的精装点位优先，示范地图仍可在同区过渡房使用。
  function eventRoom(regionId, preferred, fallback = regionId + "_inner") {
    const region = JY.REGIONS[regionId];
    return [preferred, fallback].find(room => region.rooms[room]) || region.entry;
  }

  function bountyTarget(region, preferredRoom, preferredEnemy, fallbackEnemy = preferredEnemy) {
    const rooms = JY.REGIONS[region].rooms;
    if (rooms[preferredRoom]?.enemies?.includes(preferredEnemy)) {
      return { region, room: preferredRoom, targetEnemy: preferredEnemy };
    }
    const room = Object.keys(rooms).find(id => rooms[id].enemies?.includes(fallbackEnemy));
    if (room) return { region, room, targetEnemy: fallbackEnemy };
    return { region, room: eventRoom(region, preferredRoom), targetEnemy: preferredEnemy, encounter: true };
  }

  function treasure(id, region, preferred, clue, reward) {
    const room = eventRoom(region, preferred);
    const roomName = JY.REGIONS[region].rooms[room].name;
    const location = roomName.startsWith(JY.REGIONS_META[region].name) ? roomName : `${JY.REGIONS_META[region].name} · ${roomName}`;
    return { id, kind: "treasure", region, room, clue: `图上标的是「${location}」。${clue}`, reward };
  }

  Object.assign(JY.ENEMIES, {
    rare_red_kite: {
      id: "rare_red_kite", name: "折纸鸢·裴七", d: 2, hp: 380, atk: 29, def: 8, exp: 115, gold: 72, boss: true,
      art: "assets/foe-bandit.webp", desc: "裴七把红纸鸢系上村童失踪前留下的布条，手腕一抖，刀尖便挑了过来。",
      intents: [
        { type: "attack", name: "割线挑腕", mul: 0.95, hint: "起手刀较轻，可以趁机蓄劲" },
        { type: "flurry", name: "纸鸢三折", mul: 1.3, hint: "刀从三个方向递来，可以闪身避开" },
        { type: "charge", name: "牵线断枝", mul: 1.8, hint: "腕绳绷直便要重劈，用点穴打断或闪身" }
      ]
    },
    rare_plum_seal: {
      id: "rare_plum_seal", name: "假帖客·邵景", d: 4, hp: 910, atk: 43, def: 19, exp: 320, gold: 195, boss: true,
      art: "assets/foe-master.webp", desc: "一方偷刻的梅花印替邵景骗过了庄门，演武厅的敲钟声正好盖住他收拳时的吐气。",
      intents: [
        { type: "iron", name: "抱印守中", shield: 100, hint: "以肘护胸结成铁壁，待护体成形后用破甲击碎" },
        { type: "attack", name: "封门直拳", mul: 1.05, hint: "直拳来得平实，适合兼顾破甲与输出" },
        { type: "charge", name: "沉肘摧阶", mul: 2.1, hint: "抬肘便要重击，用点穴打断或闪身" }
      ]
    },
    rare_brass_bell: {
      id: "rare_brass_bell", name: "负铃人·铁砚", d: 3, hp: 725, atk: 42, def: 15, exp: 275, gold: 165, boss: true,
      art: "assets/foe-guardian.webp", desc: "古铜铃压得他半边肩头塌下，每逢铃声短促，他便腾出另一只手来抢攻。",
      intents: [
        { type: "iron", name: "铜铃护肩", shield: 90, hint: "铜铃将挡住身前，留破甲招式击开铁壁" },
        { type: "flurry", name: "三响抢珠", mul: 1.45, hint: "循铃声变化闪身，或用太极拳护体反制" },
        { type: "iron", name: "反负铜铃", shield: 65, hint: "他换肩再结铁壁，可趁机补给或点穴压住" },
        { type: "charge", name: "撼梁重鸣", mul: 1.9, hint: "甩铃前有短暂蓄力，用点穴打断或闪身" }
      ]
    },
    rare_bamboo_ruler: {
      id: "rare_bamboo_ruler", name: "横江尺·魏湛", d: 5, hp: 1250, atk: 53, def: 21, exp: 495, gold: 306, boss: true,
      art: "assets/foe-master.webp", desc: "拦路人手握一截刻有赈粮刻度的竹尺，报完姓名，脚尖已踏上石道中央。",
      intents: [
        { type: "charge", name: "横尺开江", mul: 1.95, hint: "起手先走重招，用点穴或闪身化开" },
        { type: "attack", name: "点尺敲石", mul: 0.95, hint: "这里有一轮轻击，可为后手回真气" },
        { type: "iron", name: "尺架半山", shield: 150, hint: "竹尺横在身前运劲，待他护体后用破甲" },
        { type: "flurry", name: "量尽三峰", mul: 1.5, hint: "尺尖来回点刺，可用太极拳或闪身应对" }
      ]
    },
    rare_copper_sheath: {
      id: "rare_copper_sheath", name: "双鞘客·段垣", d: 5, hp: 1180, atk: 55, def: 20, exp: 480, gold: 295, boss: true,
      art: "assets/foe-evil.webp", desc: "段垣以两口空铜鞘迎人，第一口撞山响，第二口却缠着厚布，挥出时悄无声息。",
      intents: [
        { type: "flurry", name: "响鞘催步", mul: 1.25, hint: "首轮连招先逼你移步，可用闪身避过" },
        { type: "flurry", name: "暗鞘追踵", mul: 1.62, hint: "第二轮更快，留真气再闪或转用太极拳" },
        { type: "charge", name: "双鞘合关", mul: 2.12, hint: "双鞘合拢前有停顿，用点穴打断或闪身" }
      ]
    },
    rare_night_orchid: {
      id: "rare_night_orchid", name: "夜兰婆·柳雁", d: 6, hp: 1580, atk: 59, def: 23, exp: 650, gold: 412, boss: true,
      art: "assets/foe-evil.webp", desc: "她养的夜兰白日无香，竹筐中却早已备好了两包呛人的花粉。",
      intents: [
        { type: "poison", name: "夜兰初绽", mul: 0.85, fx: { poison: 2 }, hint: "花粉将随掌风撒来，先闪身或架护体" },
        { type: "attack", name: "横筐扫枝", mul: 1.05, hint: "趁她扫枝的空当，可用大还丹净毒" },
        { type: "poison", name: "回风送香", mul: 1.02, fx: { poison: 2 }, hint: "第二拨毒会叠加，预留闪身或护体" },
        { type: "charge", name: "折兰截脉", mul: 1.98, hint: "推掌前需拢袖聚劲，用点穴打断或闪身" }
      ]
    },
    rare_stone_counter: {
      id: "rare_stone_counter", name: "叠筹翁·罗叟", d: 6, hp: 1690, atk: 59, def: 24, exp: 690, gold: 425, boss: true,
      art: "assets/foe-guardian.webp", desc: "罗叟把染色的石筹夹在指缝里。白筹用来挡路，黑筹边缘积着暗绿的药渣。",
      intents: [
        { type: "iron", name: "先垒白筹", shield: 170, hint: "白筹带动护体结成铁壁，预备破甲" },
        { type: "poison", name: "反抛黑筹", mul: 0.95, fx: { poison: 2 }, hint: "黑筹染毒，闪身可避，护体可吸收毒伤" },
        { type: "flurry", name: "乱筹打穴", mul: 1.52, hint: "筹石接连飞来，宜用闪身或太极拳" },
        { type: "iron", name: "余筹围子", shield: 90, hint: "他还会补一层铁壁，可用点穴或持续破甲" }
      ]
    },
    rare_ice_anchor: {
      id: "rare_ice_anchor", name: "冰锚客·樊沉", d: 7, hp: 1990, atk: 67, def: 26, exp: 850, gold: 535, boss: true,
      art: "assets/foe-bandit.webp", desc: "铁锚在冰面拖出一道半圆，樊沉正沿着那道弧线把缴获的船只一艘一艘拖回湾口。",
      intents: [
        { type: "charge", name: "抛锚横冰", mul: 2.07, hint: "铁锚起手便横扫，先以点穴或闪身应对" },
        { type: "iron", name: "锚盘固阵", shield: 185, hint: "锚落地后他架起铁壁，可先蓄劲再破甲" },
        { type: "charge", name: "急索崩冰", mul: 2.18, hint: "第二下重招紧随铁壁，留足真气打断或闪身" },
        { type: "attack", name: "回索撞胸", mul: 1.03, hint: "索回原位尚需片刻，可护体回真气" }
      ]
    },
    rare_ash_sleeves: {
      id: "rare_ash_sleeves", name: "灰袖客·辛戊", d: 7, hp: 2200, atk: 71, def: 27, exp: 935, gold: 590, boss: true,
      art: "assets/foe-jinlun.webp", desc: "辛戊把染过青灰的衣袖缚紧，仍有细粉沿袖缘漏进雪地，顷刻化出几个小洞。",
      intents: [
        { type: "attack", name: "叩炉试刃", mul: 1.03, hint: "轻击过后要藏刃蓄力，可以先回真气" },
        { type: "charge", name: "开炉泻火", mul: 2.25, hint: "刀还压在袖底，抓紧点穴或闪身" },
        { type: "flurry", name: "两袖追星", mul: 1.57, hint: "重劈之后立刻变作快刀，闪身或反制" },
        { type: "poison", name: "灰烬扑火", mul: 0.95, fx: { poison: 3 }, hint: "袖中灰有剧毒，闪身避过或用护体抗毒伤" }
      ]
    },
    rare_horn: {
      id: "rare_horn", name: "断角骑·赫连褚", d: 8, hp: 2600, atk: 76, def: 30, exp: 1100, gold: 690, boss: true,
      art: "assets/foe-mongol.webp", desc: "一截断角拴在刀环上，赫连褚每做一个假动作，角环便响一声，像有人在背后替他数步。",
      intents: [
        { type: "flurry", name: "断角催马", mul: 1.5, hint: "开局提防连击，可用闪身或太极拳" },
        { type: "iron", name: "合环遮身", shield: 225, hint: "他举刀横挡身前，下一招用破甲清盾" },
        { type: "poison", name: "错环挑刃", mul: 1.02, fx: { poison: 2 }, hint: "刀刃淬毒，用闪身或护体，力求保留打断所需的真气" },
        { type: "charge", name: "折旗破关", mul: 2.32, hint: "重斩蓄势时，点穴打断或闪身" }
      ]
    },
    rare_peak_carver: {
      id: "rare_peak_carver", name: "刻碑人·秦峙", d: 9, hp: 3250, atk: 86, def: 35, exp: 1420, gold: 875, boss: true,
      art: "assets/foe-master.webp", desc: "秦峙把历年上山之人的姓名刻在试剑碑背面。诗句只刻了一半，刻刀已转向后来者。",
      intents: [
        { type: "poison", name: "石屑染锋", mul: 1.02, fx: { poison: 3 }, hint: "刻刀挟毒屑而至，闪身或护体抗毒伤" },
        { type: "flurry", name: "三笔横锋", mul: 1.65, hint: "连刀层层相接，闪身或太极拳可破" },
        { type: "charge", name: "倒碑截岭", mul: 2.18, hint: "这是第一段重击，用点穴截断，或用闪身避开" },
        { type: "iron", name: "回锋立碑", shield: 250, hint: "他扶刀运气结成铁壁，可调息蓄气或点穴延缓" },
        { type: "charge", name: "一刻断云", mul: 2.42, hint: "铁壁之后还有更重一刀，优先打断杀招，再处理护盾" }
      ]
    }
  });

  JY.registerEvents([
    // 常规悬赏按事发房间结算，外地同名敌人不计入本榜。
    {
      id: "bnt_c_road_toll", kind: "bounty", title: "荒亭撤绳", region: "chengwai", room: "cw_road", targetEnemy: "shanzei",
      desc: "黑风山贼在荒亭前拉绳要钱，连给襄阳送草药的郎中也被拦在路上。击败守绳的山贼，替郎中清出官道。",
      reward: { gold: 85, exp: 80, moral: 3, item: "herb_common" }
    },
    {
      id: "bnt_c_wall_lantern", kind: "bounty", title: "箭楼换灯", region: "xiangyang", room: "xy_wall", targetEnemy: "xiangyang_spy_elite",
      desc: "北城本以三盏灯传讯，可今晚第三盏早早熄了。查清箭楼中的蒙古暗桩，免得城外误认开门号。",
      reward: { gold: 270, exp: 220, moral: 5, item: "treasure_map" }
    },
    {
      id: "bnt_c_fishing_weir", kind: "bounty", title: "渔栅夺船", ...bountyTarget("niujia", "nj_reeds", "shanzei", "bandit_boss"),
      desc: "村里只有一艘能过风浪的渡船，今早有人割了缆绳，撑船穿进白鹭出没的长芦。替老艄公拦下劫匪。",
      reward: { gold: 95, exp: 85, moral: 3, item: "food_fowl" }
    },
    {
      id: "bnt_c_rain_loan", kind: "bounty", title: "雨楼假契", ...bountyTarget("jiaxing", "jx_reeds", "canal_robber", "bandit_boss"),
      desc: "新来的债主拿一摞借契赶走了说书先生。掌柜认出刻印有假，托人赶在扛契人登船前将假契取回。",
      reward: { gold: 140, exp: 115, moral: 4, item: "wine_nver" }
    },
    {
      id: "bnt_c_lotus_cargo", kind: "bounty", title: "莲埠索货", ...bountyTarget("suzhou", "sz_pier", "canal_robber", "bandit_boss"),
      desc: "送往燕子坞的整船米粮在芦荡断了消息。船夫逃回来说，有人打着走调的采莲曲，将船停进了水坞。",
      reward: { gold: 155, exp: 130, moral: 4, item: "treasure_map" }
    },
    {
      id: "bnt_c_barge_stamp", kind: "bounty", title: "假漕印", ...bountyTarget("yangzhou", "yz_lakeside", "canal_robber", "bandit_boss"),
      desc: "漕帮库房凭铜印放行，连着三天收到同一枚印。库吏在运河边认出了假印主人的船，请你查清货物去向。",
      reward: { gold: 145, exp: 125, moral: 3, item: "food_ham" }
    },
    {
      id: "bnt_c_sutra_carts", kind: "bounty", title: "经车归寺", ...bountyTarget("songshan", "ss_forest", "shanzei", "bandit_boss"),
      desc: "抄经人进山送来两车纸，山贼误当银车劫去。寺中打算照原价补偿纸商，先托你入山拿回这批纸。",
      reward: { gold: 110, exp: 100, moral: 5, item: "ore_iron" }
    },
    {
      id: "bnt_c_west_market", kind: "bounty", title: "西市换函", ...bountyTarget("changan", "changan_inner", "bandit_boss", "mongol_commander"),
      desc: "有匪人扮作识路的驿使，在西市调包了避兵乡民的名册。趁他打开同伙送来的行囊前把真名册取回。",
      reward: { gold: 225, exp: 185, moral: 5, item: "dan_chongmai" }
    },
    {
      id: "bnt_c_wudang_bridge", kind: "bounty", title: "守索桥", ...bountyTarget("wudang", "wd_spring", "shanzei", "mongol_commander"),
      desc: "守桥人病倒之后，有人带刀霸住上山的索桥，趁机高价倒卖草药。替来求药的乡民收回桥头。",
      reward: { gold: 120, exp: 115, moral: 5, item: "herb_ginseng" }
    },
    {
      id: "bnt_c_zhongnan_wood", kind: "bounty", title: "朽木藏印", ...bountyTarget("zhongnan", "zn_stream", "shanzei", "mongol_commander"),
      desc: "山樵把各村互认的避难木印藏进朽木，运木的路却被劫道的人占了。替山樵开道，将木印送到谷中。",
      reward: { gold: 125, exp: 115, moral: 4, item: "ore_iron" }
    },
    {
      id: "bnt_c_gumu_cord", kind: "bounty", title: "墓门被围", ...bountyTarget("gumu", "gm_waterway", "mongol_commander"),
      desc: "闯入的兵卒用麻绳丈量墓道，打算摸清石门的开合。到墓中深处逐退指挥他们的千夫长。",
      reward: { gold: 430, exp: 425, moral: 4, item: "treasure_map" }
    },
    {
      id: "bnt_c_valley_baskets", kind: "bounty", title: "渡花筐", ...bountyTarget("jueqing", "jq_pool", "valley_crocodile", "mongol_commander"),
      desc: "谷民靠空筐吊过涧水来运粮，船夫今晨落水后，再无人敢去岸边拉绳。替他们恢复这条粮道。",
      reward: { gold: 355, exp: 340, moral: 6, item: "herb_ginseng" }
    },
    {
      id: "bnt_c_emei_wick", kind: "bounty", title: "佛灯松脂", ...bountyTarget("emei", "em_herbgully", "bandit_boss", "mongol_commander"),
      desc: "进香人携带的松脂遭人抢走，转眼又被拿来封路点火。截下携松脂堵路的一伙人，给香客留一条下山路。",
      reward: { gold: 190, exp: 175, moral: 6, item: "dan_chongmai" }
    },
    {
      id: "bnt_c_huashan_pass", kind: "bounty", title: "独木梯之围", ...bountyTarget("huashan", "hs_swordpit", "xiangyang_spy_elite", "mongol_commander"),
      desc: "采药人带伤回山，说上坡的木梯全被拔去。逐走守着木梯的人，援手才能替困在峰上的药户重新架梯。",
      reward: { gold: 260, exp: 230, moral: 6, item: "ore_iron" }
    },
    {
      id: "bnt_c_wooden_fish", kind: "bounty", title: "万安听铎", ...bountyTarget("wanan", "wanan_inner", "tower_guard", "mongol_commander"),
      desc: "风铎被塞住，山下再也听不见夜巡的更声。僧人认得扣走塔梯钥匙的是谁，请你为巡夜人夺回钥匙。",
      reward: { gold: 370, exp: 350, moral: 6, item: "dahuandan" }
    },
    {
      id: "bnt_c_cliff_loom", kind: "bounty", title: "红绳问剑", ...bountyTarget("heimuya", "heimuya_inner", "dongfang_boss"),
      desc: "黑木崖下的绣坊织出一幅血红名帖。东方不败托绣坊招人试剑，还说只要一战分出胜负，便撤掉山脚关卡。",
      reward: { gold: 760, exp: 720, moral: 6, item: "dan_jiuzhuan" }
    },
    {
      id: "bnt_c_dali_ferry", kind: "bounty", title: "半牌索鞍", ...bountyTarget("dali", "dl_lanternlane", "bandit_boss", "mongol_commander"),
      desc: "三名运茶脚夫的马匹被人夺走，市面转眼多了标半价的旧马鞍。去会会拿半块渡牌当押金的卖家。",
      reward: { gold: 205, exp: 185, moral: 5, item: "wine_monkey" }
    },
    {
      id: "bnt_c_wuliang_brook", kind: "bounty", title: "续石槽", ...bountyTarget("wuliang", "wl_waterfall", "bandit_boss", "mongol_commander"),
      desc: "山下茶园靠石槽引水，有人卸下石槽给自己的骡马独用。茶农们已备好木车，请你逐走他，再把石槽接回沟上。",
      reward: { gold: 215, exp: 195, moral: 6, item: "herb_ginseng" }
    },
    {
      id: "bnt_c_peach_dike", kind: "bounty", title: "桃汛旧堤", ...bountyTarget("taohua", "th_tidepool", "xiangyang_spy_elite", "mongol_commander"),
      desc: "看船人退潮时瞧见陌生人正在撬缆石，想借暗藏的小艇把抄来的潮汐图送离桃花岛。请趁涨潮前截住此人。",
      reward: { gold: 265, exp: 230, moral: 6, item: "treasure_map" }
    },
    {
      id: "bnt_c_ice_net", kind: "bounty", title: "冰火渔篓", ...bountyTarget("binghuo", "bh_ridge", "ice_wolf", "mongol_commander"),
      desc: "两篓要带上船的鱼干遭抢，一路散落在冰脊上。渔户托人取回剩下那篓，备齐出海的口粮。",
      reward: { gold: 400, exp: 385, moral: 4, item: "dahuandan" }
    },

    // 稀有敌手随悬赏出现，进入榜文所指的房间即可挑战。
    {
      id: "bnt_c_rare_kite", kind: "bounty", rare: true, title: "折线寻童", region: "yuelai", room: "yl_forest", targetEnemy: "rare_red_kite",
      desc: "纸鸢挂上了竹林，放鸢的孩子却没回家。循红线去镇东后林，拦下牵鸢的裴七。",
      reward: { gold: 145, exp: 130, moral: 5, item: "treasure_map" }
    },
    {
      id: "bnt_c_rare_seal", kind: "bounty", rare: true, title: "验英雄帖", region: "juxian", room: "juxian_hall", targetEnemy: "rare_plum_seal",
      desc: "庄上来了两人，各持盖着同一梅花印的英雄帖。到演武厅截下持假帖的邵景。",
      reward: { gold: 320, exp: 275, moral: 6, item: "wine_strong" }
    },
    {
      id: "bnt_c_rare_bell", kind: "bounty", rare: true, title: "问铜铃", region: "luoyang", room: eventRoom("luoyang", "ly_alley", "luoyang_inner"), targetEnemy: "rare_brass_bell",
      desc: "衡具铺后每晚响一声铜铃，随后便有人报失药箱。赶在今夜鸣铃之前，拦下负铃的铁砚。",
      reward: { gold: 270, exp: 235, moral: 6, item: "dan_chongmai" }
    },
    {
      id: "bnt_c_rare_ruler", kind: "bounty", rare: true, title: "竹尺留关", region: "wudang", room: eventRoom("wudang", "wd_nanyan", "wudang_inner"), targetEnemy: "rare_bamboo_ruler",
      desc: "自称粮吏的魏湛在山道上用竹尺过量抽成。武当已有弟子接手放粮，请你到山中擒住他。",
      reward: { gold: 435, exp: 395, moral: 7, item: "treasure_map" }
    },
    {
      id: "bnt_c_rare_sheaths", kind: "bounty", rare: true, title: "双鞘封崖", region: "huashan", room: eventRoom("huashan", "hs_siguoya", "huashan_inner"), targetEnemy: "rare_copper_sheath",
      desc: "段垣封了上下山的险道，放话能在他两口鞘下闯过一轮的人，才配来讨回栈道通行绳。",
      reward: { gold: 435, exp: 410, moral: 6, item: "ore_xuantie" }
    },
    {
      id: "bnt_c_rare_orchid", kind: "bounty", rare: true, title: "夜兰留香", region: "jueqing", room: eventRoom("jueqing", "jq_garden"), targetEnemy: "rare_night_orchid",
      desc: "谷中传信人的信封上落着古怪花粉，送信之后又再未回来。前往绝情谷腹地追查调粉的柳雁。",
      reward: { gold: 525, exp: 470, moral: 7, item: "dahuandan" }
    },
    {
      id: "bnt_c_rare_counters", kind: "bounty", rare: true, title: "石筹赌路", region: "wuliang", room: eventRoom("wuliang", "wl_cave", "wuliang_inner"), targetEnemy: "rare_stone_counter",
      desc: "罗叟在无量山深处摆局，赌客输尽铜钱之后竟要把兵刃押给他。直面罗叟，让他归还被扣的兵刃。",
      reward: { gold: 540, exp: 485, moral: 6, item: "treasure_map" }
    },
    {
      id: "bnt_c_rare_anchor", kind: "bounty", rare: true, title: "冰湾拔锚", region: "binghuo", room: eventRoom("binghuo", "binghuo_gate"), targetEnemy: "rare_ice_anchor",
      desc: "冰湾船帮天亮要趁退潮出海，樊沉却扣着最后几艘船。入岛赴约夺回冰锚。",
      reward: { gold: 620, exp: 550, moral: 6, item: "ore_xuantie" }
    },
    {
      id: "bnt_c_rare_ash", kind: "bounty", rare: true, title: "灰袖盗火", region: "guangming", room: eventRoom("guangming", "gl_tunnel"), targetEnemy: "rare_ash_sleeves",
      desc: "熬药的火种被辛戊偷走，他在光明顶深处借灰藏毒。截住辛戊，把药炉的火种取回。",
      reward: { gold: 665, exp: 605, moral: 7, item: "dan_chongmai" }
    },
    {
      id: "bnt_c_rare_horn", kind: "bounty", rare: true, title: "听角索旗", region: "yanmen", room: eventRoom("yanmen", "ym_camp"), targetEnemy: "rare_horn",
      desc: "换岗旗让人挑走了，关上与关下各认一套号令。去雁门关深处迎战赫连褚，夺回旧旗。",
      reward: { gold: 760, exp: 690, moral: 8, item: "dan_jiuzhuan" }
    },
    {
      id: "bnt_c_rare_carver", kind: "bounty", rare: true, title: "刻碑人之约", region: "huading", room: eventRoom("huading", "hd_cairn"), targetEnemy: "rare_peak_carver",
      desc: "有人在峰顶铲去了前代无名侠士的刻痕，只留下当世掌门的姓名。赴华山绝顶与秦峙试招，赢下重刻石碑之权。",
      reward: { gold: 960, exp: 850, moral: 8, item: "dan_jiuzhuan" }
    },

    treasure("tr_c_town_plank", "yuelai", "yl_gate",
      "牌坊最矮的石柱旁，绘了一块可以抽开的垫木。",
      { gold: 155, exp: 115, item: "ore_iron" }),
    treasure("tr_c_old_stele", "chengwai", "cw_stele",
      "第三块无字矮碑下面压着一枚木匣。",
      { gold: 200, exp: 140, item: "dan_chongmai" }),
    treasure("tr_c_city_loop", "xiangyang", "xy_gate",
      "路旁闲置的拴马环，影子刚好压住东侧砖缝。",
      { gold: 225, exp: 150, item: "jade_fan" }),
    treasure("tr_c_juxian_drum", "juxian", "juxian_gate",
      "歪鼓右脚包着新布，图纸在垫脚的砖下画了一轮墨月。",
      { gold: 245, exp: 180, item: "wine_strong" }),
    treasure("tr_c_niujia_stone", "niujia", "niujia_gate",
      "渡边有一方洗衣石，刻在石尾的两道横痕指着石底。",
      { gold: 185, exp: 125, item: "food_ham" }),
    treasure("tr_c_rain_eaves", "jiaxing", "jiaxing_inner",
      "檐下有一段滴水瓦刻了鱼眼，图上墨点就在瓦正下方。",
      { gold: 205, exp: 145, item: "wine_nver" }),
    treasure("tr_c_lotus_bank", "suzhou", "sz_pier",
      "从断桩边的铜莲钉沿着芦根摸过去，能用指头勾住伏在浅水下的匣盖。",
      { gold: 260, exp: 185, item: "guqin_score" }),
    treasure("tr_c_yangzhou_tally", "yangzhou", "yz_lakeside",
      "半截木筹还能转，转到朝河的那一面，墙角会露出拉环。",
      { gold: 280, exp: 180, item: "dish_yudi" }),
    treasure("tr_c_luoyang_mortar", "luoyang", "ly_alley",
      "一口旧石臼缺了半边，藏宝图把臼下的盲砖涂成了朱红。",
      { gold: 255, exp: 185, item: "guqin_score" }),
    treasure("tr_c_songshan_brick", "songshan", "ss_damo",
      "残壁镶了九枚莲纹砖，独末一枚未刻花瓣，掌心按上去有空响。",
      { gold: 295, exp: 210, item: "ore_iron" }),
    treasure("tr_c_changan_weight", "changan", "ca_cellar",
      "一枚缺斤少两的秤砣画成倒悬，仔细摸它下面的砖。",
      { gold: 320, exp: 230, item: "herb_ginseng" }),
    treasure("tr_c_gumu_pot", "gumu", "gumu_hall",
      "几只空罐口朝上，唯有瓦沿带小缺口的一只倒扣在方石上。",
      { gold: 325, exp: 245, item: "dan_chongmai" }),
    treasure("tr_c_wanan_chain", "wanan", "wa_service",
      "连塔的锈链缺了一节，垂下的断口指向一块带凹槽的厚砖。",
      { gold: 370, exp: 275, item: "ore_xuantie" }),
    treasure("tr_c_dali_petals", "dali", "dali_inner",
      "茶花池外雕着一圈花瓣，第三片花瓣朝里卷起，底下能摸见柜锁。",
      { gold: 380, exp: 290, item: "wine_monkey" }),
    treasure("tr_c_binghuo_stone", "binghuo", "bh_vent",
      "一块烧裂的锚石遇冷便凝出霜线，循着霜线去找石上仅有的圆孔。",
      { gold: 420, exp: 315, item: "ore_xuantie" }),
    treasure("tr_c_yanmen_bead", "yanmen", "ym_tower",
      "旧防墙缺一枚镶珠，另两珠连成的直线指向墙下长砖的北角。",
      { gold: 460, exp: 350, item: "dan_jiuzhuan" })
  ]);
})(window);
