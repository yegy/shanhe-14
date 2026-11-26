// 天书剧本的接引人物与包 A 未收录的杏子林。
(function (root) {
  "use strict";
  const JY = root.JY;

  function addNpc(regionId, roomId, id, name, role, talk, art = "assets/npc-hermit.webp", mateId) {
    const room = JY.REGIONS[regionId].rooms[roomId];
    const npcs = room.npcs || (room.npcs = []);
    if (npcs.some(npc => npc.id === id)) return;
    npcs.push({ id, name, role, talk, art, mateId });
  }

  const suzhou = JY.REGIONS.suzhou.rooms;
  suzhou.sz_xingzi = {
    name: "杏子林", x: 0, y: 1, tag: "林", art: "assets/scene-jiangnan.webp",
    desc: "杏林深处系着几面丐帮号旗，席间还留着一封没收走的折信。",
    exits: ["suzhou_gate"]
  };
  suzhou.suzhou_gate.exits.push("sz_xingzi");

  addNpc("suzhou", "sz_xingzi", "wu_changfeng", "吴长风", "丐帮长老", "送信的人早走了。谁肯坐下听那封信从何处来？");
  addNpc("juxian", "juxian_hall", "xue_muhua", "薛慕华", "聚贤医者", "要我诊伤，先把挡着轿子的群雄请开。");
  addNpc("yanmen", "ym_cliff", "frontier_guide", "戍卒老范", "守关老卒", "别在碑上添字。旧字能不能洗清一桩案，还得看是谁刻的。");
  addNpc("songshan", "ss_library", "shao_novice", "知客僧", "藏经阁值事", "藏经阁的窗闩是从内头拨开的，施主可小声些。", "assets/npc-monk.webp");
  addNpc("songshan", "ss_court", "sweeper", "扫地僧", "藏经阁老僧", "老衲扫院，水在瓮里。施主口渴，自取便是。", "assets/npc-saodiseng.webp");

  addNpc("wanan", "wanan_gate", "sect_messenger", "黛衣信使", "五岳递帖人", "五份门帖只盖了一方印。哪一张才算数？");
  addNpc("heimuya", "hm_hall", "ren_woxing", "任我行", "日月教旧主", "今日上崖者，自择进退。老夫无暇再劝第二回。", "assets/npc-renwx.webp");
  addNpc("heimuya", "hm_gate", "renyingying", "任盈盈", "日月圣姑", "上崖前托你收着的琴，现下可以拿出来了。", "assets/mate-renyingying.webp", "renyingying");

  addNpc("jueqing", "jq_cliff", "valley_boatwoman", "谷底船妇", "绝壁渡人", "绳放下来须等三响，我才知道崖上站的是人。");

  addNpc("wanan", "wa_tower", "tower_keeper", "看塔人", "宝塔更夫", "塔门下的响声不对，怕是有人动了横梁。");

  addNpc("changan", "ca_market", "snow_runner", "裴脚夫", "关东驮客", "这皮箱是从雪岭抬来的，锁上的旧姓我不敢念。");
  addNpc("yanmen", "ym_cliff", "miao_renfeng", "苗人凤", "金面佛", "那年伴我试刀的人，死前从未怨过我一句。", "assets/npc-miaorf.webp");
  addNpc("yanmen", "ym_snow_lodge", "miao_ruolan", "苗若兰", "雪岭来客", "请把窗支开一线，雪真停了么？", "assets/npc-maiden.webp");
  addNpc("yanmen", "ym_snow_ridge", "hu_fei", "胡斐", "雪山飞狐", "我去接他这一刀。劳你看一看冰梁底下那道缝。", "assets/npc-hufei.webp");

  addNpc("yuelai", "yl_inn", "hu_fei", "胡斐", "关东刀客", "檐下那个孩子鞋里全是泥。掌柜，先给他一碗热汤。", "assets/npc-hufei.webp");
  addNpc("chengwai", "cw_road", "road_vendor", "钟婆婆", "道旁茶贩", "骑马的欠我半碗茶钱，那一家子却再没回来还碗。");
  addNpc("changan", "ca_market", "yuan_ziyi", "袁紫衣", "西市过客", "你若要找凤天南，把耳朵借给我，刀先借给你自己。", "assets/npc-heroine.webp");
  addNpc("yanmen", "ym_snow_lodge", "cheng_lingsu", "程灵素", "药王传人", "药先别碰。一个人肯出气说话，总好过让别人替他发言。", "assets/npc-maiden.webp");

  addNpc("yangzhou", "yangzhou_gate", "wei_xiaobao", "韦小宝", "扬州地头蛇", "经书有八本，值钱的纸可不照八本分。", "assets/npc-weixb.webp");
  addNpc("luoyang", "ly_inn", "shuang_er", "双儿", "白马客栈接应", "桌底那盏灯是我留给你的。坐下罢，门闩我来扣。", "assets/npc-maiden.webp");
  addNpc("songshan", "ss_library", "chenguan", "澄观", "少林僧人", "施主来借经？这一册纸薄，指头湿不得。", "assets/npc-monk.webp");
  addNpc("yangzhou", "yangzhou_gate", "chen_jinnan", "陈近南", "天地会总舵主", "船牌给我。你可看清上头写的是人名还是船名？", "assets/npc-chenjn.webp");

  addNpc("luoyang", "ly_inn", "chen_jialuo", "陈家洛", "红花会总舵主", "这壶茶有两套杯子，一套待客，一套等人回来。", "assets/npc-chenjl.webp");
  addNpc("changan", "ca_market", "huo_qingtong", "霍青桐", "西域来使", "拴骆驼的结有两种。会认结的人，才看得懂这封信。", "assets/npc-huoqt.webp");
  addNpc("yanmen", "ym_cliff", "caravan_runner", "驼队向导", "关外递信人", "白毡在我手里。追兵望见白毡，就会跟着走。");
  addNpc("changan", "ca_inn", "chen_jialuo", "陈家洛", "红花会总舵主", "扇骨夹着一页纸。写它容易，送出去却难。", "assets/npc-chenjl.webp");

  addNpc("wudang", "wd_nanyan", "old_swordkeeper", "守廊道人", "南岩值事", "昨夜风大，这道油纸底下露出了一把剑的影子。", "assets/npc-taoist.webp");
  addNpc("huashan", "hs_siguoya", "yuan_chengzhi", "袁承志", "华山弟子", "把剑横着递给我。那一点蛇形，师父也问起过。", "assets/foe-master.webp");
  addNpc("changan", "ca_market", "wen_qingqing", "温青青", "金蛇旧人", "姓温的写在纸上便算数么？拿来，我认得爹的笔。", "assets/npc-heroine.webp");
  addNpc("wudang", "wd_nanyan", "he_hongyao", "何红药", "五毒教旧人", "你若带了他的字来，给我看。你若带了他的话来，自己留着。");

  addNpc("huashan", "hs_siguoya", "di_yun", "狄云", "归山客", "壁上几句唐诗我认不全。你读一句，我给你指一道剑痕。", "assets/npc-diyun.webp");
  addNpc("luoyang", "ly_inn", "ding_dian", "丁典", "旧狱故人", "下边那盆花是谁浇的？我只托你带一句准话。", "assets/foe-master.webp");
  addNpc("yanmen", "ym_snow_lodge", "shui_sheng", "水笙", "雪中寻人", "先烤靴子，别烤那本湿书。页一卷，剑的走向就错了。", "assets/npc-maiden.webp");
  addNpc("songshan", "ss_court", "di_yun", "狄云", "归山客", "天宁寺送出来的东西在瓮里，打开以前，先听我说两句。", "assets/npc-diyun.webp");

  addNpc("taohua", "th_ferry", "shi_potian", "石破天", "渡口少年", "这位大哥，你识得这个铁疙瘩上的字么？", "assets/npc-shipotian.webp");
  addNpc("wuliang", "wl_cave", "bai_zizai", "白自在", "雪山派掌门", "天下认得我白自在，偏这盘棋不认。你来瞧瞧。", "assets/foe-guardian.webp");
  addNpc("taohua", "th_ferry", "zhang_san", "张三", "赏善使者", "喝酒用嘴，收帖用手。这一回，你打算先用哪个？");
  addNpc("taohua", "th_stone", "shi_potian", "石破天", "石壁访客", "他们都向我问诗，可我还没认完第一行字呢。", "assets/npc-shipotian.webp");

  addNpc("dali", "dl_road", "li_wenxiu", "李文秀", "白马旅人", "白马认得头道岔路。过了那道岔口，还是须人认路。", "assets/npc-maiden.webp");
  addNpc("changan", "ca_market", "ji_laoren", "计老人", "古道旧客", "我替你看马，你替我把那张旧毡摊平。");
  addNpc("yanmen", "ym_snow_lodge", "su_pu", "苏普", "塞外牧人", "羊群走错了口子，阿曼还在风里找。你见过她么？", "assets/foe-master.webp");
  addNpc("yanmen", "ym_cliff", "li_wenxiu", "李文秀", "白马旅人", "石门里有他们千里来寻的东西。我来只为还一件旧衣。", "assets/npc-maiden.webp");

  addNpc("emei", "emei_hall", "xiao_zhonghui", "萧中慧", "鸯刀传人", "袋里这口刀总往右偏，是有人把另一口拿走了。", "assets/npc-heroine.webp");
  addNpc("chengwai", "cw_road", "yuan_guannan", "袁冠南", "赶路书生", "在下拾了个包袱。四位太岳大侠硬说那是四个人的。", "assets/foe-master.webp");
  addNpc("yuelai", "yl_inn", "lin_yulong", "林玉龙", "夫妻刀法传人", "她说我先抬脚，我说她先抬刀。少侠替咱们评评理。", "assets/foe-guardian.webp");
  addNpc("emei", "emei_hall", "xiao_banhe", "萧半和", "双刀故主", "刀拿给我，贺礼放到那边，先请袁相公坐下。", "assets/foe-master.webp");
})(window);
