/* =====================================================================
   山河十四卷 v1.0 · 全局核心注册表（所有外包数据模块的唯一权威 ID 底座）
   ===================================================================== */
(function (root) {
  "use strict";
  const JY = (root.JY = root.JY || {});

  // 统一资源路径解析：兼容线上 WebP 与单文件离线版 window.__ASSETS__
  JY.assetUrl = function (p) {
    if (!p) return "";
    return (typeof window !== "undefined" && window.__ASSETS__ && window.__ASSETS__[p]) || p;
  };

  // 动态注册容器（供 data/world、data/quests、data/stories、data/events 热插拔）
  JY.REGIONS = {};     // id -> 区域完整定义（含 rooms 子房间）
  JY.QUESTS = {};      // id -> 长篇多幕立绘剧本
  JY.STORIES = {};     // id -> 门派/散修/同道独立剧情
  JY.EVENTS = [];      // 动态悬赏/黑市/藏宝图奇遇池

  JY.registerRegion = function (id, def) {
    JY.REGIONS[id] = Object.assign({ id }, JY.REGIONS[id] || {}, def);
  };
  JY.registerQuest = function (id, def) {
    JY.QUESTS[id] = Object.assign({ id }, def);
  };
  JY.registerStory = function (id, def) {
    JY.STORIES[id] = Object.assign({ id }, def);
  };
  JY.registerEvents = function (list) {
    if (Array.isArray(list)) JY.EVENTS.push(...list);
  };

  // ---------- 12 时辰与昼夜四段 ----------
  JY.SHICHEN = [
    { idx: 0, name: "子时", period: "night", label: "深夜", desc: "万籁俱寂，暗巷黑市与夜探潜入正当时。" },
    { idx: 1, name: "丑时", period: "night", label: "深更", desc: "寒露渐重，巡夜灯火稀疏。" },
    { idx: 2, name: "寅时", period: "dawn",  label: "黎明", desc: "东方微白，早起练功事半功倍。" },
    { idx: 3, name: "卯时", period: "dawn",  label: "清晨", desc: "晨雾散去，城门大开、市集渐喧。" },
    { idx: 4, name: "辰时", period: "day",   label: "上午", desc: "阳光明媚，茶楼酒肆人声鼎沸。" },
    { idx: 5, name: "巳时", period: "day",   label: "日中", desc: "商旅往来不绝，拜师切磋皆宜。" },
    { idx: 6, name: "午时", period: "day",   label: "正午", desc: "烈日当空，武林豪杰聚于酒肆。" },
    { idx: 7, name: "未时", period: "day",   label: "午后", desc: "微风拂面，最宜游历山川寻访高人。" },
    { idx: 8, name: "申时", period: "dusk",  label: "薄暮", desc: "斜阳西照，炊烟袅袅。" },
    { idx: 9, name: "酉时", period: "dusk",  label: "黄昏", desc: "暮色四合，各路奇人渐现行踪。" },
    { idx: 10, name: "戌时", period: "night", label: "入夜", desc: "华灯初上，黑市开张，暗流涌动。" },
    { idx: 11, name: "亥时", period: "night", label: "夜半", desc: "月影清冷，最宜夜探密室或雪夜寻踪。" }
  ];

  // ---------- 全江湖 26 大区域元数据（大地图连通网 + 默认画卷） ----------
  // 示范 4 区由 demo_regions.js 提供完整 22 间精装子房间；其余 22 区由外包包 A 扩充，未扩充前自动生成可游玩过渡房间
  JY.REGIONS_META = {
    yuelai:    { name: "悦来镇",     d: 1, kind: "city",  x: 600, y: 270, art: "assets/scene-town.webp",      links: ["chengwai", "niujia", "jiaxing"], desc: "江南安宁小镇，茶楼百晓生消息灵通，初入江湖的起点。" },
    chengwai:  { name: "襄阳城外",   d: 1, kind: "wild",  x: 520, y: 240, art: "assets/scene-wild.webp",      links: ["yuelai", "xiangyang", "juxian"], desc: "官道荒草与密林交错，山贼流寇与古碑奇遇并存。" },
    xiangyang: { name: "襄阳城",     d: 3, kind: "city",  x: 455, y: 215, art: "assets/scene-xiangyang.webp", links: ["chengwai", "luoyang", "wudang", "juxian"], desc: "南宋边关重镇，郭府与丐帮总舵所在，暗流涌动。" },
    juxian:    { name: "聚贤庄",     d: 4, kind: "sect",  x: 495, y: 170, art: "assets/scene-juxian.webp",    links: ["chengwai", "xiangyang", "luoyang"], desc: "游氏双雄庄园，天下群雄英雄大会风云际会之地。" },
    niujia:    { name: "牛家村",     d: 2, kind: "wild",  x: 665, y: 315, art: "assets/scene-jiangnan.webp",  links: ["yuelai", "jiaxing"], desc: "临安郊外渔村，风雪旧事与杨铁心故居暗藏玄机。" },
    jiaxing:   { name: "嘉兴烟雨楼", d: 2, kind: "city",  x: 720, y: 280, art: "assets/scene-jiangnan.webp",  links: ["yuelai", "niujia", "suzhou", "yangzhou"], desc: "南湖烟雨迷蒙，江南七怪与全真道士赌约之所。" },
    suzhou:    { name: "苏州燕子坞", d: 4, kind: "sect",  x: 775, y: 245, art: "assets/scene-jiangnan.webp",  links: ["jiaxing", "yangzhou", "taohua"], desc: "太湖水乡、曼陀山庄与姑苏慕容参合庄静卧烟波。" },
    yangzhou:  { name: "扬州城",     d: 3, kind: "city",  x: 725, y: 200, art: "assets/scene-yangzhou.webp",  links: ["jiaxing", "suzhou", "luoyang"], desc: "运河繁华商埠，丽春院、瘦西湖与地下黑市鱼龙混杂。" },
    luoyang:   { name: "洛阳城",     d: 3, kind: "city",  x: 560, y: 145, art: "assets/scene-luoyang.webp",   links: ["xiangyang", "juxian", "yangzhou", "songshan", "changan"], desc: "九朝古都，绿竹巷清音袅袅，红花会暗记遍布。" },
    songshan:  { name: "嵩山少林寺", d: 4, kind: "sect",  x: 630, y: 155, art: "assets/scene-shaolin.webp",   links: ["luoyang", "zhongnan"], desc: "禅宗祖庭，藏经阁、罗汉堂与达摩院气象森严。" },
    changan:   { name: "长安城",     d: 5, kind: "city",  x: 385, y: 140, art: "assets/scene-capital.webp",   links: ["luoyang", "huashan", "wudang", "zhongnan", "dali", "yanmen"], desc: "关中雄都，雪夜江湖客与西市奇珍汇集之枢纽。" },
    wudang:    { name: "武当山",     d: 5, kind: "sect",  x: 450, y: 270, art: "assets/scene-wudang.webp",    links: ["xiangyang", "changan", "zhongnan"], desc: "道家圣地，紫霄宫与金顶云海太极圆转。" },
    zhongnan:  { name: "终南山",     d: 5, kind: "wild",  x: 390, y: 205, art: "assets/scene-gumu.webp",      links: ["songshan", "changan", "wudang", "gumu", "emei"], desc: "重阳宫旧址与古林深谷，隐士与老顽童出没其间。" },
    gumu:      { name: "活死人墓",   d: 5, kind: "sect",  x: 402, y: 248, art: "assets/scene-gumu.webp",      links: ["zhongnan", "jueqing"], desc: "终南后山幽邃石窟，寒玉床与玉蜂巢清冷绝尘。" },
    jueqing:   { name: "绝情谷",     d: 6, kind: "wild",  x: 350, y: 265, art: "assets/scene-jueqing.webp",   links: ["gumu", "emei"], desc: "幽谷情花遍野，断肠崖与鳄鱼潭暗藏生死劫。" },
    emei:      { name: "峨眉山",     d: 5, kind: "sect",  x: 275, y: 295, art: "assets/scene-emei.webp",      links: ["zhongnan", "jueqing", "dali"], desc: "蜀中仙山金顶佛光，峨眉剑派薪火相传。" },
    huashan:   { name: "华山",       d: 5, kind: "sect",  x: 465, y: 105, art: "assets/scene-huashan.webp",   links: ["changan", "huading", "heimuya"], desc: "奇险天下第一山，思过崖秘洞与剑冢深藏绝壁。" },
    huading:   { name: "华山之巅",   d: 9, kind: "peak",  x: 465, y: 55,  art: "assets/scene-peak.webp",      links: ["huashan"], desc: "云海孤峰，天下英雄华山论剑与终局问鼎之地。" },
    wanan:     { name: "万安寺",     d: 6, kind: "wild",  x: 565, y: 82,  art: "assets/scene-wanan.webp",     links: ["luoyang", "heimuya"], desc: "大都宝塔戒备森严，六大派高手曾被囚于高阁。" },
    heimuya:   { name: "黑木崖",     d: 7, kind: "sect",  x: 655, y: 78,  art: "assets/scene-cliff.webp",     links: ["huashan", "wanan", "guangming"], desc: "日月神教总坛，千仞悬崖与成德殿杀机凛冽。" },
    dali:      { name: "大理城",     d: 6, kind: "city",  x: 215, y: 350, art: "assets/scene-dali.webp",      links: ["changan", "emei", "wuliang", "guangming"], desc: "南诏风花雪月之都，天龙寺与镇南王府气象万千。" },
    wuliang:   { name: "无量山",     d: 6, kind: "sect",  x: 280, y: 380, art: "assets/scene-dali.webp",      links: ["dali", "taohua"], desc: "剑湖宫飞瀑深涧，琅嬛福地玉像藏逍遥绝学。" },
    taohua:    { name: "东海桃花岛", d: 6, kind: "wild",  x: 845, y: 325, art: "assets/scene-island.webp",    links: ["suzhou", "wuliang", "binghuo"], desc: "五行奇门桃花迷阵，东邪黄药师隐居海上桃源。" },
    binghuo:   { name: "冰火岛",     d: 7, kind: "wild",  x: 865, y: 120, art: "assets/scene-binghuo.webp",   links: ["taohua", "guangming"], desc: "北海火山寒冰奇岛，屠龙刀秘密与金毛狮王旧地。" },
    guangming: { name: "光明顶",     d: 7, kind: "sect",  x: 155, y: 165, art: "assets/scene-cliff.webp",     links: ["dali", "heimuya", "binghuo", "yanmen"], desc: "西域昆仑明教总坛，圣火大殿与明教密道机关重重。" },
    yanmen:    { name: "雁门关",     d: 8, kind: "wild",  x: 300, y: 78,  art: "assets/scene-yanmen.webp",    links: ["changan", "guangming"], desc: "塞外雄关朔风凛冽，北宋辽金血战与绝壁刻字犹存。" }
  };

  // ---------- 八大门派注册表 ----------
  JY.SECTS = {
    shaolin:  { name: "少林寺", loc: "songshan", style: "刚猛护体 · 佛门正宗", intro: "天下武功出少林，以易筋经与金刚护体傲视武林。" },
    wudang:   { name: "武当派", loc: "wudang",   style: "以柔克刚 · 破招反击", intro: "太极圆转绵绵不绝，擅长化劲反震与后发制人。" },
    gaibang:  { name: "丐帮",   loc: "xiangyang",style: "连击破阵 · 侠义豪情", intro: "天下第一大帮，降龙十八掌与打狗棒法刚柔并济。" },
    huashan:  { name: "华山派", loc: "huashan",  style: "破甲剑宗 · 迅捷致命", intro: "剑气交锋古派，独孤九剑料敌机先、破尽天下招式。" },
    emei:     { name: "峨眉派", loc: "emei",     style: "凌厉斩杀 · 正暗双修", intro: "倚天剑意清冽如霜，亦可涉足九阴幽微之道。" },
    gumu:     { name: "古墓派", loc: "gumu",     style: "轻灵闪避 · 双剑合璧", intro: "活死人墓清幽隐世，轻功绝尘、玉女素心独步天下。" },
    xiaoyao:  { name: "逍遥派", loc: "wuliang",  style: "吸内控场 · 逍遥凌波", intro: "北冥神功吸星纳海，凌波微步飘然难测。" },
    mingjiao: { name: "明教",   loc: "guangming",style: "九阳炽烈 · 乾坤挪移", intro: "昆仑圣火不灭，乾坤大挪移借力反噬、九阳真气澎湃。" }
  };

  // ---------- 12 位同道与红颜统一注册表 ----------
  JY.MATES = [
    { id: "huangrong",   name: "黄蓉",   gender: "f", loc: "xiangyang", room: "xy_guofu_yard",art: "assets/mate-huangrong.webp",   skill: "luoying",   comboName: "兰心破阵", comboDesc: "造成高额伤害并施加 2 层破甲 + 1 回合点穴", favGift: "dish_yudi",    moralMin: 0,   relic: "软猬甲残片", intro: "冰雪聪明、厨艺绝佳的桃花岛主之女。" },
    { id: "xiaolongnv",  name: "小龙女", gender: "f", loc: "gumu",      room: "gumu_hall",    art: "assets/mate-xiaolongnv.webp",  skill: "yunvjian",  comboName: "双剑合璧", comboDesc: "双段剑气连斩并赋予主角 1 回合闪身",         favGift: "yufeng_jar",   moralMin: -25, relic: "玉蜂琼浆",   intro: "清冷绝尘的古墓传人，白衣胜雪。" },
    { id: "zhouzhiruo",  name: "周芷若", gender: "f", loc: "emei",      room: "emei_hall",    art: "assets/mate-zhouzhiruo.webp",  skill: "yitian",    comboName: "金顶惊鸿", comboDesc: "凌厉斩杀并附加流血，若敌血<40%伤害翻倍",     favGift: "hanshui_silk", moralMin: -60, relic: "玄铁指环",   intro: "外柔内刚的峨眉高徒，剑心藏郁。" },
    { id: "zhaomin",     name: "赵敏",   gender: "f", loc: "wanan",     room: "wanan_gate",   art: "assets/mate-zhaomin.webp",     skill: "tanzhi",    comboName: "天地奇谋", comboDesc: "打断敌方蓄力、破甲并为主角回血 18%",         favGift: "jade_fan",     moralMin: -60, relic: "黑玉断续膏", intro: "灿若玫瑰、智谋百出的汝阳王府郡主。" },
    { id: "renyingying", name: "任盈盈", gender: "f", loc: "luoyang",   room: "ly_bamboo",    art: "assets/mate-renyingying.webp", skill: "songfeng",  comboName: "清心普善", comboDesc: "净化主角全部负面状态、回真气 +3 并伤敌",     favGift: "guqin_score",  moralMin: -70, relic: "笑傲曲谱",   intro: "绿竹巷抚琴待知音的日月神教圣姑。" },
    { id: "guojing",     name: "郭靖",   gender: "m", loc: "xiangyang", room: "xy_guofu_hall",art: "assets/mate-guojing.webp",     skill: "xianglong", comboName: "亢龙护城", comboDesc: "刚猛掌力重创敌军并为主角套上厚重护体",       favGift: "dish_chicken", moralMin: 20,  relic: "汗血马鞭",   intro: "侠之大者、镇守襄阳的一代巨侠。" },
    { id: "linghu",      name: "令狐冲", gender: "m", loc: "huashan",   room: "hs_siguoya",   art: "assets/mate-linghu.webp",      skill: "dugu",      comboName: "独孤破招", comboDesc: "无视防御破招斩击，若敌在蓄力则必定暴击",     favGift: "wine_monkey",  moralMin: -30, relic: "猴儿陈酿",   intro: "嗜酒重情、无拘无束的华山浪子。" },
    { id: "yangguo",     name: "杨过",   gender: "m", loc: "gumu",      room: "gumu_gate",    art: "assets/mate-yangguo.webp",     skill: "anran",     comboName: "黯然重剑", comboDesc: "无视闪避重创敌人并引爆所有流血/破甲",       favGift: "wine_nver",    moralMin: -30, relic: "玄铁剑意",   intro: "孤傲深情、独臂仗重剑的神雕大侠。" },
    { id: "zhangwj",     name: "张无忌", gender: "m", loc: "guangming", room: "gm_hall",      art: "assets/mate-zhangwj.webp",     skill: "jiuyang",   comboName: "九阳乾坤", comboDesc: "反弹下一次攻击并回复气血 20% 与真气 +2",     favGift: "herb_ginseng", moralMin: 15,  relic: "圣火残令",   intro: "仁厚宽和、兼修九阳乾坤的明教教主。" },
    { id: "qiaofeng",    name: "乔峰",   gender: "m", loc: "juxian",    room: "juxian_hall",  art: "assets/mate-qiaofeng.webp",    skill: "xianglong", comboName: "降龙震岳", comboDesc: "排山倒海巨额真伤并震晕敌人 1 回合",         favGift: "wine_strong",  moralMin: -30, relic: "聚贤烈酒",   intro: "豪气干云、义薄云天的盖世豪侠。" },
    { id: "tianbg",      name: "田伯光", gender: "m", loc: "heimuya",   room: "hm_gate",      art: "assets/mate-tianbg.webp",      skill: "wuhu",      comboName: "万里快刀", comboDesc: "疾风三连斩并叠加 2 层流血",                 favGift: "wine_nver",    moralMax: -10, relic: "飞沙刀谱",   intro: "轻功刀法俱绝的浪荡快刀客。" },
    { id: "oyfeng",      name: "欧阳锋", gender: "m", loc: "changan",   room: "ca_market",    art: "assets/mate-oyfeng.webp",      skill: "tiesha",    comboName: "蛤蟆剧毒", comboDesc: "释放 3 层剧毒并立即触发一次毒伤爆裂",         favGift: "poison_gall",  moralMax: -15, relic: "白驼蛇杖",   intro: "逆行经脉、雄才大略的西域毒宗。" }
  ];

  // ---------- 十四天书总目 ----------
  JY.TIANSHU_META = [
    { id: "fei",  ch: "飞", name: "飞狐外传",   startRegion: "yuelai",    hint: "悦来镇福来客栈，胡斐替一个孩子留了半碗汤。" },
    { id: "xue",  ch: "雪", name: "雪山飞狐",   startRegion: "changan",   hint: "长安西市的裴脚夫刚从雪岭背来一口旧箱。" },
    { id: "lian", ch: "连", name: "连城诀",     startRegion: "huashan",   hint: "思过崖石壁留着唐诗与剑痕，狄云正在对照。" },
    { id: "tian", ch: "天", name: "天龙八部",   startRegion: "suzhou",    hint: "苏州杏子林散席后，吴长风仍守着一封旧信。" },
    { id: "she",  ch: "射", name: "射雕英雄传", startRegion: "yuelai",    hint: "从悦来茶楼传闻至襄阳郭府捉细作、北城御敌。" },
    { id: "bai",  ch: "白", name: "白马啸西风", startRegion: "dali",      hint: "大理西门古道，李文秀的白马衔来一块塞外旧毡。" },
    { id: "lu",   ch: "鹿", name: "鹿鼎记",     startRegion: "yangzhou",  hint: "韦小宝在扬州运河钞关晾晒一册落水的四十二章经。" },
    { id: "xiao", ch: "笑", name: "笑傲江湖",   startRegion: "luoyang",   hint: "洛阳绿竹巷，任盈盈的琴少了半拍，匣里多了一张门帖。" },
    { id: "shu",  ch: "书", name: "书剑恩仇录", startRegion: "luoyang",   hint: "陈家洛在洛阳白马客栈为西来的客人留着一套空茶盏。" },
    { id: "shen", ch: "神", name: "神雕侠侣",   startRegion: "gumu",      hint: "杨过守在活死人墓断龙石前，石缝下卡着一根白丝。" },
    { id: "xia",  ch: "侠", name: "侠客行",     startRegion: "taohua",    hint: "到桃花渡帮石破天辨认压船缆的铁令。" },
    { id: "yi",   ch: "倚", name: "倚天屠龙记", startRegion: "wanan",     hint: "万安寺外门的赵敏手里有一排不易读懂的竹筹。" },
    { id: "bi",   ch: "碧", name: "碧血剑",     startRegion: "wudang",    hint: "武当南岩挂剑台，守廊道人发现一道蛇形刻痕。" },
    { id: "yuan", ch: "鸳", name: "鸳鸯刀",     startRegion: "emei",      hint: "峨眉金顶正殿，萧中慧的双刀袋里只剩下了一口刀。" }
  ];

  // ---------- 出身选项（创建角色） ----------
  JY.ORIGINS = [
    { id: "sanxiu", name: "江湖散修", badge: "散修奇遇 +15%", desc: "无门无派，以天地为师。开局即启「无名残页血案」散修长线，福缘 +3，搜查与奇遇触发率显著提升。", bonus: { luck: 3, agi: 1 }, gold: 100 },
    { id: "shidi",  name: "名门遗孤", badge: "悟性修为加成", desc: "身负家传残卷，悟性 +3、臂力 +1，修炼武功与冲脉消耗修为降低 12%，极易获正派名宿赏识。", bonus: { int: 3, str: 1 }, gold: 120 },
    { id: "langzi", name: "市井奇才", badge: "黑市/技艺专精", desc: "混迹扬州襄阳三教九流，身法 +2、福缘 +2，初始烹饪与锻造即达 Lv2，黑市砍价 85 折。", bonus: { agi: 2, luck: 2 }, gold: 180, life: { cook: 2, forge: 2 } }
  ];
})(window);
