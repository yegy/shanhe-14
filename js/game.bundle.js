/* 山河十四卷 v1.0 · 自动合并的网页端单一原子包（由 node _bundle.js 从 js/modules.json 生成） */

/* ===== data/core_registry.js ===== */
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


/* ===== data/skills_gear.js ===== */
/* =====================================================================
   山河十四卷 v1.0 · 武学连携库 / 奇经八脉 / 原著神兵与词条 / 五大生活技艺 / 策略敌人
   ===================================================================== */
(function (root) {
  "use strict";
  const JY = (root.JY = root.JY || {});

  // 策略回合状态标签字典（驱动 Combo 连携与破招）
  JY.STATUS_META = {
    break:  { name: "破甲", cls: "red",    desc: "每层使受到的伤害 +18%（上限 3 层），可被重击/破招引爆" },
    chill:  { name: "寒气", cls: "blue",   desc: "每层降敌攻击 8%，叠至 3 层触发「冰封破脉」巨伤并减速" },
    poison: { name: "剧毒", cls: "jade",   desc: "每回合结束造成无视防御毒伤，可被毒系绝技「毒爆」引爆" },
    bleed:  { name: "流血", cls: "red",    desc: "每回合流血失血，触发「斩杀」招式暴击加成" },
    stun:   { name: "点穴", cls: "purple", desc: "封住要穴，打断敌人蓄力杀招并跳过其下回合行动" },
    shield: { name: "护体", cls: "blue",   desc: "吸收直接伤害与剧毒迷雾" },
    evade:  { name: "闪身", cls: "jade",   desc: "大幅提升闪避并必定躲过下一次蓄力杀招" },
    focus:  { name: "蓄劲", cls: "gold",   desc: "下一招外功伤害 +45%" }
  };

  // 核心代表武功库（兼容 68 门武功 ID；基础 24 门精雕细琢，其余门派武功由注册表自动补齐策略属性）
  // type: 0外功 1内功 2轻功；rarity: 0基础 1进阶 2高级 3绝学；cost: 真气消耗(0..4)
  // fx: 施加或引爆状态；counter: 可克制何种敌人意图("charge"蓄力 / "iron"铁壁 / "poison"毒雾 / "flurry"连斩)
  const CORE_SKILLS = [
    // 散修 & 基础
    { id: "taizu",     name: "太祖长拳",   type: 0, rarity: 0, cost: 0, pow: 1.05, fx: { focus: 1 },                  flavor: "起手「冲天炮」接「搬拦捶」，沉稳刚猛，顺势蓄劲！" },
    { id: "wuhu",      name: "五虎断门刀", type: 0, rarity: 1, cost: 1, pow: 1.35, fx: { bleed: 2 },                  flavor: "刀势如五虎下山，连环劈斩撕开血口！" },
    { id: "tiesha",    name: "铁砂掌",     type: 0, rarity: 1, cost: 1, pow: 1.25, fx: { poison: 2 },                 flavor: "双掌漆黑炽热，砂掌阴毒暗劲轰然透体！" },
    { id: "songfeng",  name: "松风剑法",   type: 0, rarity: 1, cost: 1, pow: 1.32, fx: { break: 1 }, counter: "iron", flavor: "剑风飒飒如苍松迎客，斜削破甲！" },
    { id: "dianxue",   name: "点穴手",     type: 0, rarity: 1, cost: 2, pow: 1.10, fx: { stun: 1 },  counter: "charge", flavor: "并指如戟直点膻中要穴，硬生生截断对手蓄力！" },
    { id: "luoying",   name: "落英神剑掌", type: 0, rarity: 2, cost: 2, pow: 1.65, fx: { break: 1, focus: 1 },        flavor: "双掌翻飞如东海落英缤纷，虚实难辨！" },
    { id: "tanzhi",    name: "弹指神通",   type: 0, rarity: 2, cost: 2, pow: 1.60, fx: { stun: 1, break: 1 }, counter: "charge", flavor: "中指微曲一弹，破空劲气瞬间打断敌招！" },
    { id: "yiyangzhi", name: "一阳指",     type: 0, rarity: 2, cost: 2, pow: 1.72, fx: { stun: 1 },  counter: "charge", flavor: "大理段氏纯阳指力凝于食指，破邪点穴！" },
    { id: "kongming",  name: "空明拳",     type: 0, rarity: 2, cost: 2, pow: 1.55, fx: { shield: 85, focus: 1 },      flavor: "至柔至空、以虚击实，柔劲护身再蓄后招！" },
    { id: "xuantie",   name: "玄铁剑法",   type: 0, rarity: 3, cost: 3, pow: 2.35, fx: { break: 2, detonate: "break" }, counter: "iron", flavor: "重剑无锋，大巧不工，引爆破甲一剑崩山！" },
    { id: "zuoyou",    name: "左右互搏",   type: 0, rarity: 3, cost: 3, pow: 1.95, fx: { focus: 1, multi: 2 },        flavor: "左手画方右手画圆，一心二用双招齐发！" },
    // 八大门派招牌绝学与中坚武功
    { id: "luohan",    name: "罗汉拳",     type: 0, rarity: 0, cost: 0, pow: 1.08, fx: { shield: 35 },                flavor: "双拳沉稳一错，黑虎偷心兼具护身架势！" },
    { id: "dajin",     name: "大力金刚掌", type: 0, rarity: 2, cost: 2, pow: 1.78, fx: { break: 2 }, counter: "iron", flavor: "金刚怒目重掌拍落，专碎铁壁横练！" },
    { id: "taijiquan", name: "太极拳",     type: 0, rarity: 2, cost: 2, pow: 1.48, fx: { shield: 110, counterHit: 1 }, counter: "flurry", flavor: "揽雀尾借力打力，化敌连招反震回去！" },
    { id: "taijijian", name: "太极剑",     type: 0, rarity: 3, cost: 3, pow: 2.20, fx: { shield: 120, break: 2 },     flavor: "剑随身走圆转如意，太极双鱼笼罩八方！" },
    { id: "dagou",     name: "打狗棒法",   type: 0, rarity: 2, cost: 2, pow: 1.68, fx: { stun: 1, break: 1 }, counter: "charge", flavor: "绊劈缠戳挑引封转，一棒打断敌方杀招！" },
    { id: "xianglong", name: "降龙十八掌", type: 0, rarity: 3, cost: 3, pow: 2.55, fx: { break: 2, detonate: "break" }, counter: "iron", flavor: "亢龙有悔，龙吟虎啸，引爆破甲排山倒海！" },
    { id: "hsjian",    name: "华山剑法",   type: 0, rarity: 0, cost: 0, pow: 1.08, fx: { bleed: 1 },                  flavor: "剑走轻灵，白虹贯日斜削取血！" },
    { id: "dugu",      name: "独孤九剑",   type: 0, rarity: 3, cost: 2, pow: 2.30, fx: { break: 2, stun: 1 }, counter: "charge", flavor: "总诀式料敌机先，一剑破尽蓄力与铁壁！" },
    { id: "yitian",    name: "倚天剑法",   type: 0, rarity: 2, cost: 2, pow: 1.70, fx: { bleed: 2, detonate: "bleed" }, flavor: "铁画银钩剑意凌厉，流血越深斩杀越狠！" },
    { id: "jiuyinzhua",name: "九阴白骨爪", type: 0, rarity: 3, cost: 3, pow: 2.25, fx: { poison: 2, bleed: 2, detonate: "poison" }, flavor: "五指阴风透骨，引爆剧毒与流血惨绝人寰！" },
    { id: "yunvjian",  name: "玉女剑法",   type: 0, rarity: 1, cost: 1, pow: 1.38, fx: { evade: 1 }, counter: "flurry", flavor: "花前月下轻盈连刺，顺势身法抽离！" },
    { id: "anran",     name: "黯然销魂掌", type: 0, rarity: 3, cost: 3, pow: 2.45, fx: { detonate: "bleed", break: 1 }, flavor: "杞人忧天掌意苍凉，濒危或流血时威力倍增！" },
    { id: "hanbing",   name: "寒冰绵掌",   type: 0, rarity: 1, cost: 1, pow: 1.28, fx: { chill: 2 },                  flavor: "掌心寒霜凝结，寒气透骨减速制敌！" },
    { id: "baihong",   name: "白虹掌力",   type: 0, rarity: 2, cost: 2, pow: 1.62, fx: { chill: 2, detonate: "chill" }, flavor: "曲直如意绕过兵刃，叠满寒气瞬间冰爆！" },
    // 内功（被动 + 主动护体/回气）
    { id: "tuna",      name: "吐纳术",     type: 1, rarity: 0, cost: 0, pow: 0, passive: { hp: 0.12 }, active: { heal: 35, mp: 2 }, flavor: "深吸长气吐故纳新，稳住气血恢复真气。" },
    { id: "guixi",     name: "龟息功",     type: 1, rarity: 1, cost: 0, pow: 0, passive: { def: 0.12, mpRegen: 1 }, active: { shield: 90, mp: 2 }, counter: "poison", flavor: "气息内敛如龟伏渊，生出护体罡气并回气。" },
    { id: "jinzhong",  name: "金钟罩",     type: 1, rarity: 2, cost: 1, pow: 0, passive: { def: 0.20, hp: 0.15 }, active: { shield: 180 }, counter: "poison", flavor: "横练金钟护体，刀枪毒雾难伤分毫！" },
    { id: "zixia",     name: "紫霞神功",   type: 1, rarity: 2, cost: 1, pow: 0, passive: { atk: 0.15, mpRegen: 1 }, active: { focus: 1, mp: 2 }, flavor: "面上紫气微现，真气奔涌且下招大增！" },
    { id: "beiming",   name: "北冥神功",   type: 1, rarity: 2, cost: 1, pow: 1.20, passive: { mpMax: 2 }, active: { drainMp: 3, shield: 110 }, flavor: "气海如百川归海，吸敌内力化为己用！" },
    { id: "qiankun",   name: "乾坤大挪移", type: 1, rarity: 2, cost: 2, pow: 0, passive: { def: 0.16, atk: 0.10 }, active: { shield: 160, reflect: 0.5 }, counter: "flurry", flavor: "借力打力移花接木，反震敌招！" },
    { id: "yijinjing", name: "易筋经",     type: 1, rarity: 3, cost: 1, pow: 0, passive: { hp: 0.28, def: 0.22 }, active: { shield: 260, cleanse: 1, heal: 90 }, counter: "poison", flavor: "佛门无上禅功，涤荡百毒、金刚护体！" },
    { id: "jiuyang",   name: "九阳神功",   type: 1, rarity: 3, cost: 1, pow: 0, passive: { atk: 0.20, hp: 0.25, mpRegen: 1 }, active: { heal: 140, shield: 180, mp: 2 }, counter: "poison", flavor: "九阳真气澎湃炽烈，百毒不侵生生不息！" },
    { id: "jiuyin",    name: "九阴真经",   type: 1, rarity: 3, cost: 2, pow: 1.85, passive: { atk: 0.22, crit: 0.12 }, active: { break: 2, poison: 2 }, flavor: "九阴总纲流转，攻守兼备、破甲施毒！" },
    // 轻功（闪身克制大招/连斩）
    { id: "caofei",    name: "草上飞",     type: 2, rarity: 0, cost: 1, pow: 0, passive: { dodge: 0.06 }, active: { evade: 1 }, counter: "flurry", flavor: "脚尖轻点如秋风掠草，身形疾退！" },
    { id: "yanzi",     name: "燕子三抄水", type: 2, rarity: 1, cost: 1, pow: 0, passive: { dodge: 0.10 }, active: { evade: 1, mp: 1 }, counter: "flurry", flavor: "双足轻点三下掠水腾挪，从容回气！" },
    { id: "tiyun",     name: "梯云纵",     type: 2, rarity: 2, cost: 1, pow: 0, passive: { dodge: 0.14 }, active: { evade: 1, focus: 1 }, counter: "charge", flavor: "凭虚凌空拔起丈余，躲开杀招并蓄劲反打！" },
    { id: "lingbo",    name: "凌波微步",   type: 2, rarity: 3, cost: 1, pow: 0, passive: { dodge: 0.22, mpRegen: 1 }, active: { evade: 2, mp: 2 }, counter: "flurry", flavor: "踏伏羲六十四卦步法，身影如烟似雾不可捉摸！" }
  ];

  JY.SKILLS = {};
  CORE_SKILLS.forEach(s => { JY.SKILLS[s.id] = s; });

  // ---------- 奇经八脉（8 条经脉 × 3 重穴位，打造流派构筑质变） ----------
  JY.MERIDIANS = [
    { id: "du",     name: "督脉", role: "剑宗破招", desc: "贯通脊背阳气，强化「破甲」与打断蓄力收益。", levels: [
      { acupoint: "长强", exp: 180, pill: "dan_chongmai", bonus: { atkPct: 0.06, breakDmg: 0.10 }, txt: "攻击 +6%，破甲增伤额外 +10%" },
      { acupoint: "命门", exp: 420, pill: "dan_chongmai", bonus: { atkPct: 0.12, counterDmg: 0.25 }, txt: "攻击 +12%，破招反击伤害 +25%" },
      { acupoint: "百会", exp: 880, pill: "dan_jiuzhuan", bonus: { atkPct: 0.20, startFocus: 1 }, txt: "攻击 +20%，每战开局自带「蓄劲」" }
    ]},
    { id: "ren",    name: "任脉", role: "气海回元", desc: "总任一身阴经，大幅拓展真气上限与回气效率。", levels: [
      { acupoint: "关元", exp: 180, pill: "dan_chongmai", bonus: { mpMax: 1 }, txt: "最大真气 +1" },
      { acupoint: "膻中", exp: 420, pill: "dan_chongmai", bonus: { mpMax: 2, mpRegen: 1 }, txt: "最大真气 +2，每回合额外回真气 +1" },
      { acupoint: "天突", exp: 880, pill: "dan_jiuzhuan", bonus: { mpMax: 3, mpRegen: 1, startMp: 2 }, txt: "最大真气 +3，开局额外 +2 真气" }
    ]},
    { id: "chong",  name: "冲脉", role: "刚猛霸体", desc: "血海贯通，极大幅提升气血上限与刚猛重击。", levels: [
      { acupoint: "气冲", exp: 180, pill: "dan_chongmai", bonus: { hpPct: 0.10 }, txt: "气血上限 +10%" },
      { acupoint: "幽门", exp: 420, pill: "dan_chongmai", bonus: { hpPct: 0.20, crit: 0.06 }, txt: "气血 +20%，会心率 +6%" },
      { acupoint: "会阴", exp: 880, pill: "dan_jiuzhuan", bonus: { hpPct: 0.32, crit: 0.12 }, txt: "气血 +32%，会心率 +12%" }
    ]},
    { id: "dai",    name: "带脉", role: "护体金刚", desc: "横束诸经，强化防御与护盾吸收。", levels: [
      { acupoint: "带脉", exp: 180, pill: "dan_chongmai", bonus: { defPct: 0.10 }, txt: "防御 +10%" },
      { acupoint: "五枢", exp: 420, pill: "dan_chongmai", bonus: { defPct: 0.18, shieldPct: 0.20 }, txt: "防御 +18%，所有护体盾量 +20%" },
      { acupoint: "维道", exp: 880, pill: "dan_jiuzhuan", bonus: { defPct: 0.28, shieldPct: 0.35 }, txt: "防御 +28%，护体盾量 +35%" }
    ]},
    { id: "yinwei", name: "阴维脉", role: "寒毒爆裂", desc: "维系阴寒毒劲，放大毒伤、寒气与流血威力。", levels: [
      { acupoint: "筑宾", exp: 200, pill: "dan_chongmai", bonus: { dotPct: 0.20 }, txt: "中毒/流血/寒爆伤害 +20%" },
      { acupoint: "府舍", exp: 460, pill: "dan_chongmai", bonus: { dotPct: 0.40 }, txt: "中毒/流血/寒爆伤害 +40%" },
      { acupoint: "廉泉", exp: 920, pill: "dan_jiuzhuan", bonus: { dotPct: 0.65, lifesteal: 0.08 }, txt: "持续/引爆伤害 +65%，外功附带 8% 吸血" }
    ]},
    { id: "yangwei",name: "阳维脉", role: "会心连斩", desc: "阳气透发，提升暴击倍率与斩杀压制。", levels: [
      { acupoint: "金门", exp: 200, pill: "dan_chongmai", bonus: { crit: 0.06 }, txt: "会心率 +6%" },
      { acupoint: "阳交", exp: 460, pill: "dan_chongmai", bonus: { crit: 0.12, critDmg: 0.25 }, txt: "会心 +12%，会心倍率 +25%" },
      { acupoint: "风府", exp: 920, pill: "dan_jiuzhuan", bonus: { crit: 0.18, critDmg: 0.45 }, txt: "会心 +18%，会心倍率 +45%" }
    ]},
    { id: "yinqiao",name: "阴跷脉", role: "轻灵闪避", desc: "司掌矫健身法，闪避后自动反击对手。", levels: [
      { acupoint: "照海", exp: 200, pill: "dan_chongmai", bonus: { dodge: 0.06 }, txt: "闪避率 +6%" },
      { acupoint: "交信", exp: 460, pill: "dan_chongmai", bonus: { dodge: 0.11, riposte: 1 }, txt: "闪避 +11%，成功闪避时自动反击" },
      { acupoint: "睛明", exp: 920, pill: "dan_jiuzhuan", bonus: { dodge: 0.16, riposte: 1, mpOnDodge: 1 }, txt: "闪避 +16%，闪避反击并回真气 +1" }
    ]},
    { id: "yangqiao",name: "阳跷脉", role: "散修奇缘", desc: "通达江湖气运，提升掉宝、搜查与修为收益。", levels: [
      { acupoint: "申脉", exp: 200, pill: "dan_chongmai", bonus: { luck: 3, expPct: 0.10 }, txt: "福缘 +3，修为获取 +10%" },
      { acupoint: "居髎", exp: 460, pill: "dan_chongmai", bonus: { luck: 6, expPct: 0.20, goldPct: 0.15 }, txt: "福缘 +6，修为 +20%，银两 +15%" },
      { acupoint: "风池", exp: 920, pill: "dan_jiuzhuan", bonus: { luck: 10, expPct: 0.30, goldPct: 0.25 }, txt: "福缘 +10，修为 +30%，银两 +25%" }
    ]}
  ];

  // ---------- 原著神兵宝甲（带独特机制特效） + 词条池 ----------
  JY.LEGENDARY_GEAR = {
    yitian_sword: { id: "yitian_sword", name: "倚天剑", slot: "weapon", rarity: 4, atk: 46, crit: 0.12, desc: "武林至尊绝世神剑：外功必定附加 1 层破甲，剑法伤害 +22%。", special: "yitian" },
    tulong_blade: { id: "tulong_blade", name: "屠龙刀", slot: "weapon", rarity: 4, atk: 54, hp: 180,  desc: "号令天下重宝：对气血低于 45% 目标伤害 +35%。", special: "tulong" },
    xuantie_sword:{ id: "xuantie_sword",name: "玄铁重剑", slot: "weapon", rarity: 4, atk: 58, def: 12,  desc: "重剑无锋、大巧不工：攻击无视闪避，暴击时额外震晕。", special: "xuantie" },
    dagou_staff:  { id: "dagou_staff",  name: "绿玉打狗棒", slot: "weapon", rarity: 4, atk: 38, agi: 6,   desc: "丐帮镇帮之宝：点穴/打断招式真气消耗 -1。", special: "dagou" },
    ruanwei_armor:{ id: "ruanwei_armor",name: "软猬甲", slot: "armor",  rarity: 4, def: 34, hp: 220,  desc: "桃花岛奇宝：免疫中毒，受击反弹 25% 伤害。", special: "ruanwei" },
    tiancan_armor:{ id: "tiancan_armor",name: "天蚕宝甲", slot: "armor",  rarity: 4, def: 42, hp: 280,  desc: "刀枪不入：每回合自动获得 45 点护体罡气。", special: "tiancan" },
    jinsi_gloves: { id: "jinsi_gloves", name: "白金丝手套", slot: "trinket",rarity: 3, atk: 20, def: 14,  desc: "掌法与点穴类武功伤害 +18%，免疫兵器反震。", special: "jinsi" },
    heiyu_jade:   { id: "heiyu_jade",   name: "黑玉断续佩", slot: "trinket",rarity: 4, hp: 200, def: 15, desc: "每场战斗首次濒死触发免死并回复 35% 气血。", special: "heiyu" },
    taxue_boots:  { id: "taxue_boots",  name: "踏雪无痕履", slot: "boots",  rarity: 4, dodge: 0.12, agi: 8, desc: "轻功闪身持续回合 +1，野外行路不耗精力。", special: "taxue" }
  };

  JY.AFFIXES = [
    { id: "sharp",   name: "锋锐", stat: "atk",   val: 6,    txt: "攻击 +6" },
    { id: "iron",    name: "坚韧", stat: "def",   val: 5,    txt: "防御 +5" },
    { id: "vital",   name: "厚血", stat: "hp",    val: 65,   txt: "气血 +65" },
    { id: "keen",    name: "破绽", stat: "crit",  val: 0.05, txt: "会心 +5%" },
    { id: "swift",   name: "轻燕", stat: "dodge", val: 0.04, txt: "闪避 +4%" },
    { id: "lucky",   name: "福星", stat: "luck",  val: 3,    txt: "福缘 +3" },
    { id: "leech",   name: "饮血", stat: "lifesteal", val: 0.05, txt: "吸血 +5%" }
  ];

  // ---------- 物品 / 采集材料 / 丹药 / 名菜 / 雅礼 ----------
  JY.ITEMS = {
    // 药品
    jinchuang:    { name: "金疮药",   cat: "med",  price: 40,  heal: 160, desc: "回复气血 160 点。" },
    dahuandan:    { name: "大还丹",   cat: "med",  price: 160, heal: 450, cleanse: 1, desc: "回复气血 450 点并清除剧毒。" },
    yulu:         { name: "玉露丸",   cat: "med",  price: 55,  mp: 3,     desc: "战斗中立刻回复 3 点真气。" },
    dan_chongmai: { name: "冲脉丹",   cat: "pill", price: 240, desc: "打通奇经八脉前两重穴位的必备丹药（可炼丹自制）。" },
    dan_jiuzhuan: { name: "九转还魂丹",cat: "pill", price: 680, heal: 900, desc: "绝世神丹，可冲开奇经八脉第三重圆满穴位。" },
    // 采集原料
    herb_common:  { name: "金银草",   cat: "mat",  price: 15,  desc: "常见止血草药，野外采集可得。" },
    herb_ginseng: { name: "长白老参", cat: "mat",  price: 90,  desc: "百年灵药，炼制冲脉丹与赠张无忌佳品。", gift: 14 },
    ore_iron:     { name: "百炼精铁", cat: "mat",  price: 35,  desc: "打造词条神兵的基础矿石。" },
    ore_xuantie:  { name: "天外寒铁", cat: "mat",  price: 220, desc: "稀有玄铁矿，锻造绝世神兵核心材料。" },
    food_fowl:    { name: "散养土鸡", cat: "mat",  price: 25,  desc: "烹饪叫花鸡与名菜的鲜嫩主料。" },
    food_ham:     { name: "金华火腿", cat: "mat",  price: 45,  desc: "江南名产，烹饪「玉笛谁家听落梅」主料。" },
    // 名菜与雅礼（生活技艺产出，支持战前 Buff 与红颜/同道高额赠礼）
    dish_chicken: { name: "叫花鸡",           cat: "food", price: 110, buff: { atkPct: 0.12, battles: 3 }, gift: 16, desc: "香气扑鼻！食用后 3 场战斗攻击 +12%；郭靖/洪七公最爱。" },
    dish_yudi:    { name: "玉笛谁家听落梅",   cat: "food", price: 220, buff: { atkPct: 0.18, crit: 0.08, battles: 3 }, gift: 24, desc: "黄蓉拿手绝菜！3 战攻 +18% 暴 +8%；赠黄蓉好感 +24。" },
    wine_nver:    { name: "陈年女儿红",       cat: "gift", price: 120, gift: 14, desc: "江南名酒，赠同道好感 +14。" },
    wine_monkey:  { name: "猴儿酒",           cat: "gift", price: 200, gift: 22, desc: "奇珍佳酿，令狐冲挚爱（好感 +22）。" },
    wine_strong:  { name: "塞外烈烧刀",       cat: "gift", price: 180, gift: 22, desc: "烈酒豪情，乔峰挚爱（好感 +22）。" },
    guqin_score:  { name: "清心普善残谱",     cat: "gift", price: 240, gift: 24, desc: "古琴名谱，任盈盈挚爱（好感 +24）。" },
    jade_fan:     { name: "羊脂玉骨折扇",     cat: "gift", price: 240, gift: 24, desc: "风流雅扇，赵敏挚爱（好感 +24）。" },
    yufeng_jar:   { name: "玉蜂浆坛",         cat: "gift", price: 220, gift: 24, desc: "终南玉蜂酿成的清冽蜜浆，小龙女挚爱（好感 +24）。" },
    hanshui_silk: { name: "汉水青丝帕",       cat: "gift", price: 210, gift: 24, desc: "汉水渡口织就的素雅青丝帕，周芷若挚爱（好感 +24）。" },
    poison_gall:  { name: "雪山蛇胆",         cat: "gift", price: 230, gift: 24, desc: "白驼山奇珍异胆，欧阳锋挚爱（好感 +24）。" },
    treasure_map: { name: "残破藏宝图",       cat: "key",  price: 150, desc: "绘有前朝秘宝线索，在行囊中使用可指明藏宝子房间。" }
  };

  // ---------- 五大生活技艺配方 ----------
  JY.RECIPES = {
    alchemy: [
      { id: "r_jc",   name: "炼制金疮药×2", reqLv: 1, mats: { herb_common: 2 }, out: { jinchuang: 2 }, exp: 25 },
      { id: "r_cm",   name: "炼制冲脉丹×1", reqLv: 2, mats: { herb_common: 2, herb_ginseng: 1 }, out: { dan_chongmai: 1 }, exp: 60 },
      { id: "r_jz",   name: "炼制九转还魂丹×1", reqLv: 4, mats: { herb_ginseng: 3, herb_common: 4 }, out: { dan_jiuzhuan: 1 }, exp: 140 }
    ],
    forge: [
      { id: "f_wpn",   name: "打造精钢双词条兵刃",   reqLv: 1, mats: { ore_iron: 3 }, gearSlot: "weapon",  tier: 2, exp: 40 },
      { id: "f_arm",   name: "打造锁子双词条护甲",   reqLv: 1, mats: { ore_iron: 3 }, gearSlot: "armor",   tier: 2, exp: 40 },
      { id: "f_boot",  name: "编造乌蚕双词条轻履",   reqLv: 1, mats: { ore_iron: 2, herb_common: 2 }, gearSlot: "boots", tier: 2, exp: 45 },
      { id: "f_trink", name: "雕琢玉髓双词条护符",   reqLv: 2, mats: { ore_iron: 2, herb_ginseng: 1 }, gearSlot: "trinket", tier: 2, exp: 65 },
      { id: "f_wpn3",  name: "百炼寒铁三词条名刃",   reqLv: 3, mats: { ore_xuantie: 1, ore_iron: 4 }, gearSlot: "weapon", tier: 3, exp: 110 },
      { id: "f_arm3",  name: "织造金丝三词条宝甲",   reqLv: 3, mats: { ore_xuantie: 1, ore_iron: 4 }, gearSlot: "armor",  tier: 3, exp: 110 },
      { id: "f_xt",    name: "重铸神兵「玄铁重剑」", reqLv: 3, mats: { ore_xuantie: 3, ore_iron: 5 }, legendary: "xuantie_sword", exp: 180 }
    ],
    cook: [
      { id: "c_chk",  name: "烹制「叫花鸡」", reqLv: 1, mats: { food_fowl: 1, herb_common: 1 }, out: { dish_chicken: 1 }, exp: 35 },
      { id: "c_yudi", name: "烹制「玉笛谁家听落梅」", reqLv: 2, mats: { food_fowl: 1, food_ham: 1 }, out: { dish_yudi: 1 }, exp: 75 }
    ]
  };

  // ---------- 音律古琴战前曲谱 Buff（与美食 Buff 独立叠加） ----------
  JY.MUSIC_SONGS = [
    { id: "song_pingsha", name: "平沙落雁", reqLv: 1, energy: 10, battles: 3, regenHp: 35,
      desc: "曲调舒缓悠远：接下来 3 场战斗每回合末自动恢复 35 点气血。" },
    { id: "song_bihai",   name: "碧海潮生曲", reqLv: 2, energy: 12, battles: 3, defPct: 0.14, shieldPct: 0.22,
      desc: "东海奇音护心：接下来 3 场战斗防御 +14%、护体盾量 +22%。" },
    { id: "song_xiaoao",  name: "笑傲江湖曲", reqLv: 4, energy: 15, battles: 3, startMp: 2, crit: 0.10, synergyBonus: 15,
      desc: "琴箫合鸣傲世：接下来 3 场战斗开局真气 +2、会心 +10%、同心充能加速！" }
  ];

  // ---------- 弈棋 · 珍珑古谱残局（4 局一次性解谜挑战，破局永久获属性/秘宝） ----------
  JY.CHESS_PUZZLES = [
    {
      id: "pz_1", name: "第一局 · 倒脱靴残角", reqLv: 1,
      prompt: "黑棋角上仅剩两口气，白棋虎口相逼。若按常理连回即成死棋，当如何落子？",
      options: [
        { text: "弃掉三子扑入虎口，待白提子后再反扑成活（倒脱靴）", correct: true,  explain: "妙手！弃小取大，白棋外气收紧反被反杀。" },
        { text: "老实连回角上三子，与白棋硬拼外气",                     correct: false, explain: "白棋顺势一扳，黑棋气短一着，满盘皆输。" },
        { text: "脱先去抢大场，放弃角部生死",                           correct: false, explain: "角部实地损失惨重，全局大势已去。" }
      ],
      reward: { exp: 160, attr: { int: 1 }, item: "dan_chongmai" }
    },
    {
      id: "pz_2", name: "第二局 · 双活渡江", reqLv: 2,
      prompt: "黑白双龙缠斗中腹，双方各只剩一只真眼与两处公气，此时抢先紧气者反死。当如何应对？",
      options: [
        { text: "强行破掉白棋唯一真眼，同归于尽",                       correct: false, explain: "刚一入气便成自杀，反让白龙全活。" },
        { text: "占据外围紧要扳位，留公气成「双活」保全大龙",           correct: true,  explain: "高明！退一步保全主力，外势反成胜机。" },
        { text: "随手打吃边上一颗废子",                                 correct: false, explain: "错失先手，白棋反扑点眼，黑龙阵亡。" }
      ],
      reward: { exp: 260, attr: { con: 1 }, item: "treasure_map" }
    },
    {
      id: "pz_3", name: "第三局 · 珍珑自填一气", reqLv: 3,
      prompt: "无崖子所布珍珑棋局，满盘杀机四伏，进退维谷。唯有破釜沉舟方能绝处逢生——",
      options: [
        { text: "闭目自填一气，亲手送死一大块黑棋以换取通天劫材",       correct: true,  explain: "正是当年虚竹破局之妙！置之死地而后生，豁然开朗！" },
        { text: "步步为营力保每一块黑棋不失",                           correct: false, explain: "越想两全越陷泥潭，终成僵局。" },
        { text: "与白棋一路单官收束",                                   correct: false, explain: "中腹大龙已无活路，收官徒劳。" }
      ],
      reward: { exp: 420, attr: { int: 2, luck: 1 }, item: "guqin_score" }
    },
    {
      id: "pz_4", name: "第四局 · 天元镇乾坤", reqLv: 4,
      prompt: "终极古谱「天元劫」，四角均成连环劫，胜负系于中腹天元一子之联络。",
      options: [
        { text: "急于在右下消劫，先拿一角实利",                         correct: false, explain: "白棋顺势提走中腹三子，四角尽失。" },
        { text: "于天元正中落下一子「镇神头」，遥应四角连环劫",         correct: true,  explain: "宗师气度！一子定乾坤，四角化险为夷！" },
        { text: "于边路长考补厚一断",                                   correct: false, explain: "缓手被白抢占天元，全盘崩塌。" }
      ],
      reward: { exp: 650, attr: { int: 2, str: 1, agi: 1 }, item: "dan_jiuzhuan" }
    }
  ];

  // ---------- 策略回合敌人模板（带意图序列 intents，让每场战都能见招拆招） ----------
  // intent type: attack(普攻) | charge(蓄力大招,可被点穴打断/闪身躲避) | iron(铁壁架势,需破甲) | poison(扬毒,需护体/解毒) | flurry(狂风连斩,需闪身/太极反震)
  JY.ENEMIES = {
    shanzei: {
      id: "shanzei", name: "黑风山贼", d: 1, hp: 220, atk: 24, def: 6, exp: 55, gold: 28,
      art: "assets/foe-bandit.webp", desc: "手持钢刀的悍匪，常在城外官道劫道。",
      intents: [
        { type: "attack", name: "横刀猛劈", mul: 1.0, hint: "普通攻击" },
        { type: "charge", name: "蓄力·力劈华山", mul: 1.85, hint: "下回合重劈！可用「点穴手」打断或「闪身」躲避" }
      ]
    },
    bandit_boss: {
      id: "bandit_boss", name: "黑风寨大当家", d: 2, hp: 520, atk: 34, def: 12, exp: 180, gold: 120, boss: true,
      art: "assets/foe-bandit.webp", desc: "啸聚襄阳城外的绿林悍匪头目，刀势沉重狠辣。",
      drop: [{ item: "ore_iron", rate: 1 }, { item: "treasure_map", rate: 0.45 }],
      intents: [
        { type: "attack", name: "断门狂刀", mul: 1.05, hint: "凶猛劈砍并附带 1 层流血", fx: { bleed: 1 } },
        { type: "iron",   name: "横练铁布衫", shield: 110, hint: "架起护体铁壁！可用「破甲」武功击碎" },
        { type: "charge", name: "绝杀·分金断玉", mul: 2.1, hint: "⚠ 致命蓄力斩！强烈建议点穴打断或轻功闪身" }
      ]
    },
    xiangyang_spy_elite: {
      id: "xiangyang_spy_elite", name: "蒙古暗桩死士", d: 3, hp: 820, atk: 46, def: 18, exp: 280, gold: 175, boss: true,
      art: "assets/foe-mongol.webp", desc: "潜伏在襄阳城内的蒙古精锐密探，善用淬毒弯刀。",
      drop: [{ item: "herb_ginseng", rate: 0.8 }, { item: "ore_iron", rate: 1 }],
      intents: [
        { type: "poison", name: "淬毒暗刃", mul: 0.95, fx: { poison: 2 }, hint: "☠ 准备投毒！护体或大还丹可化解" },
        { type: "flurry", name: "狼牙二连斩", mul: 1.50, hint: "疾风连击！闪身或护体减伤最佳" },
        { type: "charge", name: "穿心夺命刺", mul: 2.15, hint: "⚠ 致命突刺蓄力中！点穴可打断" }
      ]
    },
    mongol_commander: {
      id: "mongol_commander", name: "蒙古千夫长·巴图", d: 5, hp: 1780, atk: 66, def: 30, exp: 720, gold: 460, boss: true,
      art: "assets/foe-mongol.webp", desc: "金轮法王座下悍将，率铁骑奇袭襄阳北城箭楼！",
      drop: [{ item: "ore_xuantie", rate: 1 }, { item: "dan_chongmai", rate: 1 }],
      intents: [
        { type: "iron",   name: "玄铁重甲阵", shield: 260, hint: "🛡 铁壁加身！请以破甲外功击碎" },
        { type: "flurry", name: "铁骑狂岚斩", mul: 1.60, fx: { bleed: 1 }, hint: "连环弯刀斩！轻功闪身可规避" },
        { type: "charge", name: "龙象破城刀", mul: 2.40, hint: "⚠ 蓄力破城一击！务必点穴打断或开启闪身/护体" }
      ]
    },
    juxian_elite: {
      id: "juxian_elite", name: "聚贤庄悍客", d: 4, hp: 860, atk: 48, def: 19, exp: 340, gold: 210, boss: true,
      art: "assets/foe-master.webp", desc: "受游氏双雄邀约赴宴的中原悍将，拳脚刚猛。",
      intents: [
        { type: "attack", name: "连环伏虎拳", mul: 1.1, hint: "刚猛拳击" },
        { type: "charge", name: "崩山裂石掌", mul: 2.05, hint: "⚠ 蓄力刚掌！点穴或闪身破解" }
      ]
    },
    dongfang_boss: {
      id: "dongfang_boss", name: "东方不败", d: 8, hp: 5200, atk: 92, def: 48, exp: 2000, gold: 1350, boss: true,
      art: "assets/foe-dongfang.webp", desc: "日月神教教主，葵花宝典身法快如鬼魅！",
      intents: [
        { type: "flurry", name: "葵花绣花连刺", mul: 1.70, fx: { bleed: 2 }, hint: "鬼魅连击！轻功闪身或太极反震克制" },
        { type: "charge", name: "红影夺魄针", mul: 2.50, hint: "⚠ 必杀蓄力！需立刻点穴打断或闪身" }
      ]
    },
    wangcy_boss: {
      id: "wangcy_boss", name: "王重阳·中神通", d: 9, hp: 7600, atk: 102, def: 54, exp: 3400, gold: 2200, boss: true,
      art: "assets/foe-wangcy.webp", desc: "全真祖师，先天功三态轮转，华山之巅终极试炼！",
      intents: [
        { type: "iron",   name: "先天罡气壁", shield: 480, hint: "🛡 铁壁护体！请破甲击穿" },
        { type: "poison", name: "寒阳双绝劲", mul: 1.20, fx: { chill: 2 }, hint: "寒劲侵体！护体或清心化解" },
        { type: "charge", name: "一气化三清", mul: 2.60, hint: "⚠ 宗师蓄力绝学！点穴/闪身缺一不可" }
      ]
    },
    // ---------- 新增 10 位经典原著机制 Boss ----------
    ouyang_ke: {
      id: "ouyang_ke", name: "白驼少主·欧阳克", d: 3, hp: 620, atk: 38, def: 13, exp: 240, gold: 180, boss: true,
      art: "assets/foe-poison.webp", desc: "白驼山少主，摇折扇御毒蛇，身法刁钻诡谲。",
      drop: [{ item: "poison_gall", rate: 0.7 }, { item: "jade_fan", rate: 0.35 }],
      intents: [
        { type: "poison", name: "神驼雪山毒雾", mul: 0.95, fx: { poison: 2 }, hint: "☠ 施放白驼毒雾！护体或清心解毒" },
        { type: "flurry", name: "瞬息千里扇",   mul: 1.45, hint: "折扇连点要害！闪身或反震克制" },
        { type: "charge", name: "灵蛇吐信击",   mul: 1.95, fx: { poison: 1 }, hint: "⚠ 蓄力毒击！点穴可打断" }
      ]
    },
    feng_tiannan: {
      id: "feng_tiannan", name: "佛山恶霸·凤天南", d: 3, hp: 700, atk: 42, def: 16, exp: 290, gold: 230, boss: true,
      art: "assets/foe-bandit.webp", desc: "五虎门掌门，仗势欺人，手中金背大刀沉猛狠毒。",
      drop: [{ item: "ore_iron", rate: 1 }, { item: "dan_chongmai", rate: 0.5 }],
      intents: [
        { type: "iron",   name: "金背横刀架", shield: 130, hint: "🛡 横刀护体！破甲招式击碎最佳" },
        { type: "attack", name: "五虎裂碑斩", mul: 1.15, fx: { bleed: 1 }, hint: "重刀撕裂附带流血" },
        { type: "charge", name: "断门绝户刀", mul: 2.05, hint: "⚠ 蓄力重斩！务必点穴打断或闪身" }
      ]
    },
    mei_chaofeng: {
      id: "mei_chaofeng", name: "铁尸·梅超风", d: 4, hp: 920, atk: 49, def: 16, exp: 380, gold: 240, boss: true,
      art: "assets/foe-poison.webp", desc: "黑风双煞之一，双目失明却听风辨位，九阴白骨爪阴毒无比！",
      drop: [{ item: "herb_ginseng", rate: 0.8 }, { item: "dan_chongmai", rate: 0.6 }],
      intents: [
        { type: "flurry", name: "白骨连环爪", mul: 1.50, fx: { bleed: 2 }, hint: "阴风连抓叠加流血！轻功闪身化解" },
        { type: "poison", name: "摧心阴风掌", mul: 1.05, fx: { poison: 2 }, hint: "☠ 阴毒掌力侵脉！护体/大还丹应对" },
        { type: "charge", name: "九阴锁喉杀", mul: 2.15, fx: { bleed: 2 }, hint: "⚠ 致命锁喉蓄力！点穴截断最佳" }
      ]
    },
    he_taichong: {
      id: "he_taichong", name: "血刀老祖", d: 5, hp: 1180, atk: 56, def: 19, exp: 520, gold: 340, boss: true,
      art: "assets/foe-bandit.webp", desc: "西藏血刀门邪派魔头，血刀诡异狠辣，越是险境招式越毒！",
      drop: [{ item: "ore_xuantie", rate: 0.6 }, { item: "dahuandan", rate: 0.8 }],
      intents: [
        { type: "flurry", name: "血影三连刀", mul: 1.55, fx: { bleed: 2 }, hint: "诡异软刀三连割血！闪身或反震克制" },
        { type: "attack", name: "反手削骨刀", mul: 1.20, fx: { bleed: 1 }, hint: "刁钻怪招，留心气血" },
        { type: "charge", name: "浴血归元斩", mul: 2.20, fx: { bleed: 2 }, hint: "⚠ 血刀蓄力绝杀！点穴可打断" }
      ]
    },
    ao_bai: {
      id: "ao_bai", name: "满洲勇士·鳌拜", d: 5, hp: 1360, atk: 54, def: 26, exp: 560, gold: 390, boss: true,
      art: "assets/foe-mongol.webp", desc: "大清权臣，天生神力兼修十三太保横练金钟罩，铜皮铁骨！",
      drop: [{ item: "ore_xuantie", rate: 0.7 }, { item: "dan_chongmai", rate: 1 }],
      intents: [
        { type: "iron",   name: "十三太保金钟", shield: 240, hint: "🛡 极厚横练铁壁！必须破甲击穿" },
        { type: "attack", name: "裂石虎抱摔",   mul: 1.25, hint: "千斤巨力正面猛砸" },
        { type: "charge", name: "霸王镇岳崩",   mul: 2.25, hint: "⚠ 蓄力毁天一击！点穴或闪身规避" }
      ]
    },
    jiumozhi: {
      id: "jiumozhi", name: "大轮明王·鸠摩智", d: 6, hp: 1720, atk: 64, def: 26, exp: 820, gold: 520, boss: true,
      art: "assets/foe-jinlun.webp", desc: "吐蕃护国法王，以小无相功催动少林七十二绝技与火焰刀，气焰滔天！",
      drop: [{ item: "dan_chongmai", rate: 1 }, { item: "ore_xuantie", rate: 0.75 }],
      intents: [
        { type: "iron",   name: "小无相金刚壁", shield: 230, hint: "🛡 无相罡气护体！用破甲击碎" },
        { type: "flurry", name: "捻花无相指",   mul: 1.55, hint: "指劲连射！轻功闪身或太极反震" },
        { type: "charge", name: "大轮火焰刀",   mul: 2.30, fx: { bleed: 1 }, hint: "⚠ 灼热刀气蓄力！点穴打断或闪身" }
      ]
    },
    miejue_boss: {
      id: "miejue_boss", name: "峨眉掌门·灭绝师太", d: 6, hp: 1680, atk: 68, def: 25, exp: 840, gold: 480, boss: true,
      art: "assets/foe-master.webp", desc: "峨眉第三代掌门，性烈如火，倚天剑与佛光普照凌厉无匹！",
      drop: [{ item: "hanshui_silk", rate: 0.7 }, { item: "dahuandan", rate: 1 }],
      intents: [
        { type: "flurry", name: "灭剑绝剑连斩", mul: 1.60, fx: { bleed: 2 }, hint: "双剑快攻连斩！闪身或护体化解" },
        { type: "attack", name: "佛光普照掌",   mul: 1.30, hint: "纯阳掌力透胸" },
        { type: "charge", name: "倚天断岳剑",   mul: 2.35, hint: "⚠ 绝世剑意蓄力！务必点穴打断" }
      ]
    },
    zuo_lengchan: {
      id: "zuo_lengchan", name: "嵩山盟主·左冷禅", d: 6, hp: 1800, atk: 66, def: 27, exp: 880, gold: 560, boss: true,
      art: "assets/foe-guardian.webp", desc: "五岳盟主野心勃勃，寒冰真气与大嵩阳神掌寒烈并济！",
      drop: [{ item: "ore_xuantie", rate: 0.8 }, { item: "dan_chongmai", rate: 1 }],
      intents: [
        { type: "poison", name: "寒冰真气掌",   mul: 1.15, fx: { chill: 2 }, hint: "❄ 阴寒掌劲侵骨！护体或清心化解" },
        { type: "iron",   name: "嵩岳镇山架",   shield: 240, hint: "🛡 巍峨铁壁！破甲外功克制" },
        { type: "charge", name: "大嵩阳寒冰破", mul: 2.35, fx: { chill: 1 }, hint: "⚠ 冰封杀招蓄力！点穴或闪身规避" }
      ]
    },
    cheng_kun: {
      id: "cheng_kun", name: "混元霹雳手·成昆", d: 7, hp: 2900, atk: 76, def: 34, exp: 1180, gold: 740, boss: true,
      art: "assets/foe-poison.webp", desc: "圆真和尚真身，阴谋颠覆明教与六大派，幻阴指阴毒致命！",
      drop: [{ item: "dan_jiuzhuan", rate: 0.45 }, { item: "ore_xuantie", rate: 1 }],
      intents: [
        { type: "poison", name: "幻阴指暗劲",   mul: 1.10, fx: { poison: 2, chill: 1 }, hint: "☠ 幻阴毒寒双侵！护体/净化应对" },
        { type: "flurry", name: "少林霹雳连拳", mul: 1.60, hint: "迅猛刚拳连击！闪身或反震破解" },
        { type: "charge", name: "混元霹雳绝杀", mul: 2.40, hint: "⚠ 蓄力绝命杀招！立刻点穴打断" }
      ]
    },
    jinlun_boss: {
      id: "jinlun_boss", name: "蒙古国师·金轮法王", d: 7, hp: 4200, atk: 88, def: 44, exp: 1550, gold: 980, boss: true,
      art: "assets/foe-jinlun.webp", desc: "蒙古第一护国法王，龙象般若功练至第十层，金银铜铁铅五轮齐飞！",
      drop: [{ item: "dan_jiuzhuan", rate: 0.6 }, { item: "ore_xuantie", rate: 1 }],
      intents: [
        { type: "iron",   name: "五轮金甲护阵", shield: 320, hint: "🛡 五轮飞旋护体！破甲击碎" },
        { type: "flurry", name: "金银双轮绞杀", mul: 1.66, fx: { bleed: 1 }, hint: "双轮连击！轻功闪身或太极反震" },
        { type: "charge", name: "十层龙象般若", mul: 2.50, hint: "⚠ 十龙十象巨力蓄力！务必点穴打断或闪身" }
      ]
    },
    miao_renfeng_boss: {
      id: "miao_renfeng_boss", name: "金面佛·苗人凤", d: 6, hp: 1750, atk: 65, def: 25, exp: 840, gold: 480, boss: true,
      art: "assets/npc-miaorf.webp", desc: "打遍天下无敌手，苗家剑法刚柔并济、后发先至！",
      drop: [{ item: "dan_chongmai", rate: 1 }, { item: "ore_xuantie", rate: 0.7 }],
      intents: [
        { type: "flurry", name: "苗家连环摘星剑", mul: 1.56, fx: { bleed: 1 }, hint: "剑势连绵！轻功闪身或太极借力应对" },
        { type: "iron",   name: "洗剑敛锋守势",   shield: 220, hint: "🛡 横剑敛气如山！破甲招式可拆" },
        { type: "charge", name: "冲天掌苏秦背剑", mul: 2.32, hint: "⚠ 虚实杀招蓄力中！点穴打断或闪身" }
      ]
    },
    saodiseng_boss: {
      id: "saodiseng_boss", name: "藏经阁·扫地老僧", d: 10, hp: 7200, atk: 98, def: 54, exp: 3600, gold: 2400, boss: true,
      art: "assets/npc-saodiseng.webp", desc: "少室山藏经阁隐世神僧，三尺无形气墙浑若天成，佛法武学皆臻化境！",
      drop: [{ item: "dan_jiuzhuan", rate: 1 }, { item: "ore_xuantie", rate: 1 }],
      intents: [
        { type: "iron",   name: "三尺无形气墙", shield: 520, hint: "🛡 浑厚佛门气墙！需高阶破甲与连携击穿" },
        { type: "flurry", name: "慈悲佛风拂袖", mul: 1.68, fx: { chill: 1 }, hint: "柔劲化刚连绵而至！闪身或护体应对" },
        { type: "charge", name: "菩提无相渡劫指", mul: 2.60, hint: "⚠ 神僧渡劫一指蓄势！务必点穴截脉或闪身" }
      ]
    }
  };
})(window);


/* ===== data/world/demo_regions.js ===== */
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


/* ===== data/world/regions_jiangnan.js ===== */
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


/* ===== data/world/regions_sects.js ===== */
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


/* ===== data/world/regions_frontier.js ===== */
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


/* ===== data/world/quest_rooms.js ===== */
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


/* ===== data/quests/ts_she_demo.js ===== */
/* =====================================================================
   山河十四卷 v1.0 · 示范长篇天书剧本：《射雕英雄传 · 襄阳暗战》（5幕跨城立绘剧场）
   本文件同时作为「外包包 B（其余 13 部天书长线剧本）」的 100% 标准 DSL 范本
   ===================================================================== */
(function (root) {
  "use strict";
  const JY = root.JY;

  JY.registerQuest("ts_she", {
    title: "射雕英雄传 · 襄阳暗战",
    tianshuId: "she",
    summary: "从悦来镇茶楼一桩离奇密闻起，追查襄阳城外古碑线索、入夜潜伏郭府捉拿蒙古细作（支持黄蓉插话与厨艺破局）、暗巷截密信，最终血战北城箭楼击退千夫长！",
    episodes: [
      {
        id: "she_ep1",
        title: "第一幕 · 茶楼风声",
        hint: "前往「悦来镇 · 悦来茶楼」寻百晓生打听襄阳近况",
        trigger: { region: "yuelai", room: "yl_teahouse", npc: "baixiaosheng" },
        steps: [
          { nar: "悦来茶楼二楼微风穿窗，说书人百晓生啪地合拢折扇，神色忽然凝重起来，压低声音把你唤到桌边。" },
          { show: { left: "assets/hero-portrait.webp", right: "assets/npc-baixiaosheng.webp", active: "right" },
            say: ["百晓生", "少侠来得正好！昨夜一名浑身是血的丐帮信使跌进镇口，临晕前只吐出八个字——「城防图泄，古碑有鬼」。"] },
          { show: { left: "assets/hero-portrait.webp", right: "assets/npc-baixiaosheng.webp", active: "left" },
            say: ["主角", "襄阳城乃大宋门户，郭大侠坐镇其中，怎会轻易走漏城防图？莫非城里出了内鬼？"] },
          { show: { left: "assets/hero-portrait.webp", right: "assets/npc-baixiaosheng.webp", active: "right" },
            say: ["百晓生", "正是！那信使怀里掉出半枚草原狼牙印。你要是胆大，不妨先去「襄阳城外 · 乱葬古碑」查探虚实，再进襄阳郭府禀报郭大侠。"] },
          { choice: [
              { text: "【侠义当先】此事关乎襄阳百姓安危，我即刻动身去查古碑！",
                effect: { moral: 8, exp: 60, setFlag: "she_ep1_done" },
                reply: ["百晓生", "好男儿！老夫最敬重你这份肝胆。去城外乱葬古碑务必小心埋伏！"] },
              { text: "【重利慎行】天下没有白跑的腿，先把这半枚狼牙印和盘缠给我再说。",
                effect: { moral: -4, gold: 80, exp: 40, setFlag: "she_ep1_done" },
                reply: ["百晓生", "（苦笑递过碎银）少侠果然精明。拿去罢，查清此事自有大回报！"] }
            ] }
        ]
      },
      {
        id: "she_ep2",
        title: "第二幕 · 古碑截杀",
        hint: "前往「襄阳城外 · 乱葬古碑」与隐世奇人交谈或查探碑文",
        reqFlag: "she_ep1_done",
        trigger: { region: "chengwai", room: "cw_stele", npc: "hermit_stele" },
        steps: [
          { nar: "你拨开齐腰荒草走近乱葬古碑，碑座泥土竟是新翻的！正欲俯身细看，树梢骤然传来三声短促鹰哨！" },
          { show: { left: "assets/hero-portrait.webp", right: "assets/foe-mongol.webp", active: "right" },
            say: ["蒙古暗桩死士", "哼，中原小贼鼻子倒灵！既撞破了我们与城内接头的暗记，今日便留在这里给古碑作伴罢！"] },
          { nar: "话音未落，弯刀寒光已劈面袭来——此人善使淬毒暗刃与蓄力突刺，切记见招拆招！" },
          { battle: "xiangyang_spy_elite", onWinFlag: "she_ep2_done",
            winNar: "你一招制敌逼退暗桩，从其掉落的皮囊中搜出一张密笺，上面竟绘着「襄阳郭府后院古井」的草图！",
            winReward: { exp: 140, gold: 100, item: "herb_ginseng" } }
        ]
      },
      {
        id: "she_ep3",
        title: "第三幕 · 郭府夜捉细作",
        hint: "【入夜（戌时~丑时）· 需任一武功Lv3且完成1次悬赏】前往「襄阳城 · 郭府后院」与黄蓉或郭靖会合查捉内鬼",
        reqFlag: "she_ep2_done",
        reqSkillLv: 3,
        reqBounties: 1,
        trigger: { region: "xiangyang", room: "xy_guofu_yard", time: "night", npc: "huangrong" },
        steps: [
          { nar: "三更梆子敲过，郭府后院桂影斑驳。你与郭靖隐在假山后，只见一名挑水杂役鬼鬼祟祟贴近书房窗棂，袖口晃出一截草原狼牙坠！" },
          { show: { left: "assets/hero-portrait.webp", right: "assets/mate-guojing.webp", active: "right" },
            say: ["郭靖", "（眉头紧锁，压低嗓音）难怪蒙古人屡屡摸清我军换防时辰，内鬼果然藏在府中！少侠，你觉得该立刻拿下还是静观其变？"] },
          { ifMate: "huangrong",
            show: { left: "assets/mate-huangrong.webp", right: "assets/mate-guojing.webp", active: "left" },
            say: ["黄蓉", "（掩嘴狡黠一笑）靖哥哥莫急呀！那厮刚才往井边青石下塞了蜡丸。咱们把真图换成假布防图，引城外那个蒙古千夫长钻进口袋里，岂不妙哉？"] },
          { choice: [
              { text: "【黄蓉奇谋】将计就计调包假布防图，诱敌深入！（需携黄蓉随行或好感≥25）",
                reqAnyMate: "huangrong",
                effect: { moral: 12, exp: 180, aff: { huangrong: 15, guojing: 10 }, setFlag: "she_ep3_done", setFlag2: "she_trap_plan" },
                reply: ["黄蓉", "咯咯，还是你机灵！这计一旦成了，北城箭楼定叫巴图有来无回！"] },
              { text: "【厨艺试探】借口送夜宵进厨房套出幕后上线（需烹饪 ≥ Lv2）",
                reqLife: { cook: 2 },
                effect: { moral: 8, exp: 160, aff: { huangrong: 12 }, setFlag: "she_ep3_done", setFlag2: "she_trap_plan" },
                reply: ["黄蓉", "哟，没想到你这手厨艺还能拿来破案！这盘夜宵香气一散，那细作果然露了马脚！"] },
              { text: "【雷霆出手】飞身点穴当场擒下，拷问暗巷接头人！",
                effect: { moral: 6, exp: 140, aff: { guojing: 8 }, setFlag: "she_ep3_done" },
                reply: ["郭靖", "痛快！他已招认今夜北城箭楼将有蒙古千夫长突袭，咱们速去北城御敌！"] },
              { text: "【暗中交易】放他逃走，趁机勒索蒙古密令与四百两赏金（邪道）",
                effect: { moral: -20, gold: 400, exp: 120, setFlag: "she_ep3_done", setFlag2: "she_evil_route" },
                reply: ["主角", "（冷笑收起沉甸甸的银袋）郭大侠的仁义太重，这江湖还是银子与实力最实在……"] }
            ] }
        ]
      },
      {
        id: "she_ep4",
        title: "第四幕 · 箭楼血战千夫长",
        hint: "【需任一武功Lv4 · 通2处经脉 · 穿戴1件装备】前往「襄阳城 · 郭府正厅」向郭靖请战迎敌",
        reqFlag: "she_ep3_done",
        reqSkillLv: 4,
        reqMeridians: 2,
        reqGear: 1,
        trigger: { region: "xiangyang", room: "xy_guofu_hall", npc: "guojing" },
        steps: [
          { nar: "北城烽火骤燃，鼓声震天！蒙古千夫长巴图亲率铁骑扑至北城箭楼之下，寒光弯刀直指城头大旗！" },
          { show: { left: "assets/hero-portrait.webp", right: "assets/foe-mongol.webp", active: "right" },
            say: ["蒙古千夫长·巴图", "哈哈哈哈！中原无人了吗，竟派一个毛头小子来挡本将的玄铁重甲阵？！"] },
          { show: { left: "assets/hero-portrait.webp", right: "assets/mate-guojing.webp", active: "right" },
            say: ["郭靖", "少侠小心！巴图身披玄铁重甲，须以「破甲」招式击碎铁壁，遇其蓄力破城刀务必「点穴打断」或「轻功闪身」！"] },
          { battle: "mongol_commander", onWinFlag: "she_completed",
            winNar: "巴图惨呼一声坠下云梯，蒙古铁骑仓皇退去！襄阳城头欢声雷动，郭靖与黄蓉并肩走上箭楼，郑重将珍藏的《射雕英雄传》残卷与「白金丝手套」交予你手！",
            winReward: { exp: 420, gold: 350, tianshu: "she", legendary: "jinsi_gloves", aff: { guojing: 18, huangrong: 18 } } }
        ]
      }
    ]
  });
})(window);


/* ===== data/quests/ts_fei.js ===== */
(function (root) {
  "use strict";
  const JY = root.JY;
  const hero = "assets/hero-portrait.webp";
  const elder = "assets/npc-hermit.webp";
  const hu = "assets/npc-hufei.webp";

  JY.registerQuest("ts_fei", {
    title: "飞狐外传 · 一盏留药",
    tianshuId: "fei",
    summary: "随胡斐追查一碗没喝完的热汤，从道旁茶摊追到西市，再往雪岭替程灵素保住能开口的证人。",
    episodes: [
      {
        id: "fei_ep1",
        title: "第一幕 · 热汤半碗",
        hint: "前往「悦来镇 · 福来客栈」，与胡斐查看孩子留下的汤碗。",
        trigger: { region: "yuelai", room: "yl_inn", npc: "hu_fei" },
        steps: [
          { nar: "孩子两指夹着碗沿，热汤洒了一领口。胡斐替他托住碗底，你将一张破凳拉过来，孩子却转身踩泥出了檐，桌下只剩一双草鞋。" },
          { show: { left: hero, right: hu, active: "right" }, say: ["胡斐", "人饿成这样，碗都不敢端紧。他家那几口人可曾欠着凤老爷的汤钱？"] },
          { show: { active: "left" }, say: ["主角", "碗底写着钟，我在襄阳道上见过这家的摊。孩子来时，还有一辆车把辙往那边压。"] },
          { nar: "胡斐用刀柄挑起草鞋，你顺着鞋绳抽出一截写有「凤记」的布票。布票背面一笔向下拖了很长，像是写字的人被人猛然拽开。" },
          { show: { active: "right" }, say: ["胡斐", "他要再走公道，手里得有一张没被人夺走的票。少侠也肯为不识字的人走这一趟么？"] },
          { nar: "掌柜把门坐抵进旧槽，胡斐回身将碗端入灶房温着。你把两只鞋一起挂到门边，鞋影下恰好能夹稳布票。" },
          { choice: [
            { text: "【替孩子问话】给他留汤和鞋，记下布票上的字去官道茶摊", effect: { moral: 8, exp: 105, item: "jinchuang", setFlag: "fei_ep1_done" }, reply: ["胡斐", "汤我看着。那张票，见到钟婆婆再拿出来。"] },
            { text: "【查凤家赏账】以找回布票为名收下脚钱，带副票上路", effect: { moral: -6, exp: 85, gold: 105, setFlag: "fei_ep1_done", setFlag2: "fei_vendor_contract" }, reply: ["主角", "取票的人若也来了，叫他预备一份能与我说话的价钱。"] }
          ] }
        ]
      },
      {
        id: "fei_ep2",
        title: "第二幕 · 车辙压碗",
        hint: "到「襄阳城外 · 官道荒亭」，向钟婆婆出示布票。",
        reqFlag: "fei_ep1_done",
        trigger: { region: "chengwai", room: "cw_road", npc: "road_vendor" },
        steps: [
          { nar: "钟婆婆把缺口茶碗挪进阴处，碗底一圈车辙泥还没洗。你将布票沿缺口一贴，碗内侧与票背留下了同一道凤形朱印。" },
          { show: { left: hero, right: elder, active: "right" }, say: ["钟婆婆", "那家人把米送了，钱没得。来讨钱，倒叫人从车轮底下拽过一回。你要问他们，我也只见过这只碗。"] },
          { show: { active: "left" }, say: ["主角", "车出了道口往哪边去？没载米的车，压这么深不合情理。"] },
          { nar: "她从茶炉底拨出一只木轮楔，递到你手里。你把楔头抽开，它里面还夹着一枚西市旧牙牌，牙牌孔边粘了一根紫线。" },
          { ifMate: "huangrong", show: { left: "assets/mate-huangrong.webp", active: "left" }, say: ["黄蓉", "奶奶你看，这楔子才从轮下拔过，泥还没干。那人匆匆换车，拿错了楔，正好替咱们留门。"] },
          { show: { left: hero, active: "right" }, say: ["钟婆婆", "西市有个穿紫衣的姑娘问过这枚牌。她要我等肯接茶的人来了再交。"] },
          { nar: "你把温过的茶盏放到她手边，替倒歪的竹炉塞进一片石瓦。车辙边的水缓缓漫过最近一枚蹄印。" },
          { choice: [
            { text: "【认茶摊作证】收牙牌留回执，让钟婆婆有凭据可查", effect: { moral: 8, exp: 135, item: "herb_common", setFlag: "fei_ep2_done" }, reply: ["钟婆婆", "有人自己回来认这只碗，我就替他添茶。你先把牌带去。"] },
            { text: "【藏下牙牌】以货主身份托运下一趟车，收取掩口银", effect: { moral: -7, exp: 105, gold: 165, setFlag: "fei_ep2_done", setFlag2: "fei_freight_cover" }, reply: ["主角", "茶账照算，车户的名帖我拿走。到西市，我要看看他替谁藏人。"] }
          ] }
        ]
      },
      {
        id: "fei_ep3",
        title: "第三幕 · 紫绳缚鞘",
        hint: "前往「长安城 · 西市胡商街」，与袁紫衣核对牙牌上挂的紫线。",
        reqFlag: "fei_ep2_done",
        trigger: { region: "changan", room: "ca_market", npc: "yuan_ziyi" },
        steps: [
          { nar: "你把牙牌从指间转过半圈，紫线忽被人从后轻轻一扯。袁紫衣拿一段同色绳穿回孔里，一头经柱环系住了你带来的空刀鞘。" },
          { show: { left: hero, right: "assets/npc-heroine.webp", active: "right" }, say: ["袁紫衣", "鞘会在你脚边。你若执意出刀，我也不能时时来拴你的手。"] },
          { show: { active: "left" }, say: ["主角", "我来寻押车的那人。他苦挨一场冤告，凤天南倒可以买下一整间店关他的门。"] },
          { nar: "袁紫衣用拇指推开货箱盖，盖下有一行深陷的指印。你勾住箱侧绷断的篾条，她从最底层挑出一张夹着空药包的运单。" },
          { show: { active: "right" }, say: ["袁紫衣", "活着。那车遇大雪，赶车人连他一道送了旧庄。你去见程家妹子，见着凤天南时，让我先走半步。"] },
          { nar: "她抽掉系鞘绳，紫线登时落在你鞋尖。你拾起来折进运单，她将右手腾出，避开了伸来交还牙牌的那一侧。" },
          { choice: [
            { text: "【约好先救人】把运单封好，让袁紫衣自己了结她的话", effect: { moral: 8, exp: 155, item: "yulu", setFlag: "fei_ep3_done" }, reply: ["袁紫衣", "多谢你给我半步。我也给那赶车人留半步，叫他自己走回来。"] },
            { text: "【借凤号打掩护】扣下牙牌套取领车钱，携运单离开", effect: { moral: -8, exp: 125, gold: 195, setFlag: "fei_ep3_done", setFlag2: "fei_used_phoenix_mark" }, reply: ["袁紫衣", "牙牌收得到手，凤家的旧账却烫得很。你拿着时留神袖口。"] }
          ] }
        ]
      },
      {
        id: "fei_ep4",
        title: "第四幕 · 药灯留声",
        hint: "前往「雁门关 · 雪岭旧庄」，把空药包交给程灵素。",
        reqFlag: "fei_ep3_done",
        trigger: { region: "yanmen", room: "ym_snow_lodge", npc: "cheng_lingsu" },
        steps: [
          { nar: "程灵素用木夹翻开药包，只看了一眼便把锅从火上拿下。你支起榻边的枕，让蜷着身子的赶车人坐高一些，湿蓑衣随即滑落在地。" },
          { show: { left: hero, right: "assets/npc-maiden.webp", active: "right" }, say: ["程灵素", "纸包写的是退寒，里头却有人添了药。先不要问他谁添的，能喝下水，才有力气答你。"] },
          { ifFlag: "fei_used_phoenix_mark", say: ["程灵素", "凤家有人凭你那牙牌来领车。我将车推到庄前，他见车上没人便走了，榻上的人还不知道。"] },
          { unlessFlag: "fei_used_phoenix_mark", say: ["程灵素", "袁姑娘托人送来一张空牌，替他退了车契。照看他的人不用再留意门口每一声马铃。"] },
          { show: { active: "left" }, say: ["主角", "纸上凤形印还剩半个。我压在灯下，你从榻边伸手便拿得到。"] },
          { nar: "你把杯放稳，程灵素以白布接去他唇上冷汗。赶车人攥住布边，断断续续念出三个人名，她便把药秤移开，让你在秤盘下写。" },
          { show: { active: "right" }, say: ["程灵素", "人的口供写在药方后罢。若有人先来夺药方，总还有病人记得自己喝的是哪碗。"] },
          { nar: "话音未落，庄门忽被一脚踹开！金背大刀映着雪光劈门而入，佛山恶霸凤天南率人寻踪杀到，直取榻上证人！" },
          { show: { right: "assets/foe-bandit.webp", active: "right" }, say: ["凤天南", "好个多管闲事的小子！把那张运单和病秧子留下，老夫留你一具全尸！"] },
          { battle: "feng_tiannan", winReward: { exp: 140, gold: 120 },
            winNar: "你以精妙招式震飞凤天南的金背大刀，将恶霸一行彻底逐出雪岭旧庄！" },
          { show: { left: hero, right: "assets/npc-maiden.webp", active: "right" }, nar: "庄外雪声重归宁静。程灵素翻出一卷布面医录，把运单和新写的供纸一并夹进去。炉上药香浮起来，你盖紧窗绳，特意留了能看见灯光的窄口。" },
          { show: { active: "right" }, say: ["程灵素", "《飞狐外传》另抄了一册给你。这个病人我留在这儿，留一盏灯便足够。"] },
          { choice: [
            { text: "【炼丹 Lv2】搭手整理药案，公开救治记录并领天书", reqLife: { alchemy: 2 }, effect: { moral: 13, exp: 380, tianshu: "fei", item: "dan_jiuzhuan", setFlag: "fei_completed" }, reply: ["程灵素", "你把救人的一页放在证词前。有人读来觉得药比刀先到，也甚好。"] },
            { text: "【留档护人】把证词交给见证人，带走天书和程灵素的丹药", effect: { moral: 10, exp: 345, tianshu: "fei", item: "dan_chongmai", setFlag: "fei_completed" }, reply: ["程灵素", "走时掩半扇门。他睡时要静，你下山还须看得见路。"] },
            { text: "【带走底账】扣下可议价的运单，留下副证，携天书离庄", effect: { moral: -9, exp: 300, tianshu: "fei", gold: 395, setFlag: "fei_completed", setFlag2: "fei_kept_testimony" }, reply: ["程灵素", "这一份副证我收紧了。你若还想打听他住哪儿，门外就只有风声。"] }
          ] }
        ]
      }
    ]
  });
})(window);


/* ===== data/quests/ts_xue.js ===== */
(function (root) {
  "use strict";
  const JY = root.JY;
  const hero = "assets/hero-portrait.webp";
  const elder = "assets/npc-hermit.webp";
  const sword = "assets/npc-miaorf.webp";

  JY.registerQuest("ts_xue", {
    title: "雪山飞狐 · 冰梁一刀",
    tianshuId: "xue",
    summary: "长安西市捡来半口旧刀匣。踏入雪岭，听苗胡两家各话当年，在冰梁上给悬而未决的一刀留一个落处。",
    episodes: [
      {
        id: "xue_ep1",
        title: "第一幕 · 雪客叩箱",
        hint: "前往「长安城 · 西市胡商街」，同裴脚夫查验雪岭旧箱。",
        trigger: { region: "changan", room: "ca_market", npc: "snow_runner" },
        steps: [
          { nar: "裴脚夫把皮箱从驼背放下，背带一松，半捧旧雪从活扣里泻出来。你拢过一盏灯，灯影照出匣盖上一列被剐去的刀痕。" },
          { show: { left: hero, right: elder, active: "right" }, say: ["裴脚夫", "托运的人让我剐名字，可这口箱子一揭便有胡家的刀声，叫我瞒哪一个去？"] },
          { show: { active: "left" }, say: ["主角", "你撬开过？箱漆掉在外面，锁舌上倒没有硬扳过的印。"] },
          { nar: "裴脚夫将箱沿在阶上顿了两下，铁舌顿时缩回去。你拉住乱晃的背带，托出一只用青布裹着的刀鞘，鞘内只剩一截断刃。" },
          { show: { active: "right" }, say: ["裴脚夫", "匣底的字是我刚拿命换来的。关外绝壁有个姓苗的，人家喊他金面佛。你请他摸摸断面，我可不敢再背见了。"] },
          { nar: "你将断刃包回青布，绕开布上一枚暗红指印。裴脚夫去拽箱带，几次都摸错了扣眼。" },
          { choice: [
            { text: "【送还旧箱】写清过手人的记录，替脚夫携匣出关", effect: { moral: 7, exp: 120, item: "jinchuang", setFlag: "xue_ep1_done" }, reply: ["裴脚夫", "你只说匣子没添一刀。我见过的，便只有这一口匣。"] },
            { text: "【带价出关】把护送写成寻物买卖，取下押箱银", effect: { moral: -6, exp: 95, gold: 130, setFlag: "xue_ep1_done", setFlag2: "xue_box_deposit" }, reply: ["主角", "箱子跟我走。若两家都认，自有人愿出更高的价。"] }
          ] }
        ]
      },
      {
        id: "xue_ep2",
        title: "第二幕 · 苗刀指雪",
        hint: "到「雁门关 · 关外绝壁」，请苗人凤辨认断刃。",
        reqFlag: "xue_ep1_done",
        trigger: { region: "yanmen", room: "ym_cliff", npc: "miao_renfeng" },
        steps: [
          { nar: "苗人凤弯腰折下一枝冻草，拨开匣上雪水。你抽出刀鞘，他两指接过断口，指腹停在离刃一毫的位置。" },
          { show: { left: hero, right: sword, active: "right" }, say: ["苗人凤", "胡一刀和我换过兵器。他出刀前会收半步。这口刃先卷后断，当日遇上的便该是我。"] },
          { show: { active: "left" }, say: ["主角", "若这便是当年那刀，缝里为何还有暗绿色的沫？"] },
          { nar: "他把刀翻过来，你用刀鞘边沿挑开一层旧油纸，刀根显出指甲盖大的颜色。苗人凤将冻草折断，刚挨到锈处便把草抛了。" },
          { show: { active: "right" }, say: ["苗人凤", "我能把招数一式不误地比给你看，当年谁碰过刀，我却不能瞎猜。旧庄里有替人分别记话的，去听听她那一份。"] },
          { nar: "你将刃放回布上，苗人凤解下剑穗缚住匣口。风从绝壁下冒上来，他扶着石沿站了片刻，待你先迈出第一步。" },
          { choice: [
            { text: "【按证问话】以剑穗封好断刃，不把猜测写进证词", effect: { moral: 9, exp: 155, item: "yulu", setFlag: "xue_ep2_done" }, reply: ["苗人凤", "好。我做过的事由我认，旁人做过的，叫他也来认一认。"] },
            { text: "【先留暗证】暗取匣内药渍为筹码，只留封匣记录", effect: { moral: -7, exp: 120, gold: 175, setFlag: "xue_ep2_done", setFlag2: "xue_hidden_residue" }, reply: ["主角", "到旧庄我只摊一面。另一面，要有人肯把旧账翻开才看得见。"] }
          ] }
        ]
      },
      {
        id: "xue_ep3",
        title: "第三幕 · 旧庄分灯",
        hint: "前往「雁门关 · 雪岭旧庄」，与苗若兰对照证词。",
        reqFlag: "xue_ep2_done",
        trigger: { region: "yanmen", room: "ym_snow_lodge", npc: "miao_ruolan" },
        steps: [
          { nar: "苗若兰用火钳挪正灯罩。你把两份证词分别压在窗沿和桌面，窗缝吹来一口冷气，吹起两张纸上同一道缺角。" },
          { show: { left: hero, right: "assets/npc-maiden.webp", active: "right" }, say: ["苗若兰", "这一张写爹爹先劈，另一张写胡伯伯先挡。两人说得都响，谁也没写后来有人把兵刃收走。"] },
          { show: { active: "left" }, say: ["主角", "两处缺角都用浆糊补过，补纸里还有墨划。让我把灯挪近些。"] },
          { nar: "她将补纸按在灯罩旁，你执火钳托住另一角。纸一透亮，夹在里头的日期和雪岭冰梁西侧一行小字渐渐显形。" },
          { ifMate: "qiaofeng", show: { left: "assets/mate-qiaofeng.webp", active: "left" }, say: ["乔峰", "人都没站在那口刀边，落笔倒写得好生痛快。姑娘，乔某愿帮你把两张都带到当事人面前。"] },
          { show: { left: hero, active: "right" }, say: ["苗若兰", "你去罢。我把灯摆在西窗，风若放下，隔冰梁能看见一点黄光。"] },
          { nar: "你推紧北窗，反手支起西窗的木楔。她将字条折进灯下的空封套，一瓣冻住的红梅随纸掉在桌上。" },
          { choice: [
            { text: "【烹饪 Lv2】以灶间隔水温封的手法揭开旧浆，完整保住两份字迹", reqLife: { cook: 2 }, effect: { moral: 10, exp: 175, item: "dish_chicken", setFlag: "xue_ep3_done" }, reply: ["苗若兰", "两张都没糊。灶里还有一包干粮，到了梁上别让手先冻住。"] },
            { text: "【两说并传】封存两份证词，持灯号到冰梁赴约", effect: { moral: 8, exp: 140, setFlag: "xue_ep3_done" }, reply: ["苗若兰", "两纸并着送。少了一张，他们便还要再问几十年。"] },
            { text: "【握住缺角】收起有约期的补纸，先赴冰梁与胡斐议价", effect: { moral: -8, exp: 120, gold: 195, setFlag: "xue_ep3_done", setFlag2: "xue_took_appointment" }, reply: ["苗若兰", "留一只灯给我便是。少了字，桥那边也还有两个人要回来。"] }
          ] }
        ]
      },
      {
        id: "xue_ep4",
        title: "第四幕 · 一刀悬处",
        hint: "到「雁门关 · 雪岭冰梁」，将断刃和证词交给胡斐。",
        reqFlag: "xue_ep3_done",
        trigger: { region: "yanmen", room: "ym_snow_ridge", npc: "hu_fei" },
        steps: [
          { nar: "胡斐踏上冰梁，脚下清鸣一声。你把匣底抵住松根，抽下裹刀青布，另一头的苗人凤已经横剑向前。" },
          { show: { left: hero, right: "assets/npc-hufei.webp", active: "right" }, say: ["胡斐", "我若这一刀砍下去，叫声父亲容易，往后再问那人姓甚么便难了。"] },
          { ifFlag: "xue_took_appointment", say: ["胡斐", "你私下递来的字条说我该早来。我果然先踏上这口梁，进退却只剩这一尺。"] },
          { unlessFlag: "xue_took_appointment", say: ["胡斐", "若兰送来的两张证词，我都认了。苗大侠先请看第一张，第二张一会儿换我拿给你。"] },
          { show: { active: "left" }, say: ["主角", "断刃在松根下。药色、日子都在里头。你二人有一个先踏空，给我看的那一半便再也没人认。"] },
          { show: { left: hero, right: sword, active: "right" }, say: ["苗人凤", "好定力！你要替我们二人压住这口冰梁，先接苗某三招苗家剑，看你脚下稳不稳得住！"] },
          { battle: "miao_renfeng_boss", healBetween: 0.4, winReward: { exp: 220, gold: 140 }, winNar: "冰梁微颤而未折！你稳稳化解金面佛凌厉剑意，苗人凤长剑入鞘，颔首退开半步！" },
          { show: { left: hero, right: "assets/npc-hufei.webp", active: "right" }, nar: "梁底喀喇响了一阵，胡斐举刀停在半空，苗人凤退足也只退得半寸。你将青布抛向他们，西窗一豆微光这时照进雾隙。" },
          { show: { active: "right" }, say: ["胡斐", "灯还亮着。少侠，先替我收好《雪山飞狐》，我怕它比那口刀还经不起这一抖。"] },
          { nar: "他从贴胸处拨出一册，用刀背递过来。你夹住书封，见他手腕稍一送，刀锋越过一片碎雪，就此留在那片雪后。" },
          { show: { active: "left" }, say: ["主角", "书我收了。你要我给屋里人怎么回话，等你亲口说。"] },
          { choice: [
            { text: "【留灯候归】把进退留给二人，取天书返庄照看那盏灯", effect: { moral: 11, exp: 365, tianshu: "xue", legendary: "taxue_boots", setFlag: "xue_completed" }, reply: ["主角", "灯照不到的地方我不替它作证。只要有人回来，屋里就还留着火。"] },
            { text: "【收走断匣】将旧刃作为自己掌握的证物，带走天书", effect: { moral: -9, exp: 310, tianshu: "xue", gold: 410, setFlag: "xue_completed", setFlag2: "xue_kept_blade" }, reply: ["主角", "刀匣跟我下山。日后谁想知道匣里装的是什么，须得亲自来问。"] }
          ] }
        ]
      }
    ]
  });
})(window);


/* ===== data/quests/ts_lian.js ===== */
(function (root) {
  "use strict";
  const JY = root.JY;
  const hero = "assets/hero-portrait.webp";
  const elder = "assets/npc-hermit.webp";

  JY.registerQuest("ts_lian", {
    title: "连城诀 · 金身无价",
    tianshuId: "lian",
    summary: "替狄云读出剑招里藏错的唐诗，循丁典的花盆、水笙的雪火和天宁寺旧物，看看人人争抢的金身值几条命。",
    episodes: [
      {
        id: "lian_ep1",
        title: "第一幕 · 唐诗缺字",
        hint: "到「华山 · 思过崖」，替狄云辨认剑痕旁的唐诗。",
        trigger: { region: "huashan", room: "hs_siguoya", npc: "di_yun" },
        steps: [
          { nar: "狄云把一根枯木当剑，照着壁上最深的一痕向左劈。木梢方到半途便撞碎了，你捡起断梢，那一小截恰好横在石壁两字之间。" },
          { show: { left: hero, right: "assets/npc-diyun.webp", active: "right" }, say: ["狄云", "师父教时，我总怕记错。现下见墙上也刻错一个字，反倒不知是不是我错。"] },
          { show: { active: "left" }, say: ["主角", "字错得有用。你看把这个位置抹去，留下的三处空格，刚好排成剑换手的次序。"] },
          { nar: "你以石末涂平一个缺口。狄云用枯枝余段重走一遍，这一回木头擦过石壁，敲得剑痕里半截铜钱从石粉中滑了出来。" },
          { show: { active: "right" }, say: ["狄云", "这枚钱是丁大哥割的，少半边正好收不进人的钱袋。他在客栈候信，钱到他才肯开窗。"] },
          { nar: "你托起铜钱，狄云把木剑折去沾石粉的一头，留平整那半截给你作书签。" },
          { choice: [
            { text: "【替狄云送信】抄诗补字，带半枚铜钱请丁典核对", effect: { moral: 8, exp: 120, setFlag: "lian_ep1_done" }, reply: ["狄云", "遇到丁大哥，先跟他说我的手能握住剑了。那半枚钱，倒在其次。"] },
            { text: "【错诗留市】散出错句误导寻宝人，携送钱凭证下山", effect: { moral: -7, exp: 100, gold: 135, setFlag: "lian_ep1_done", setFlag2: "lian_false_verse" }, reply: ["主角", "他们拿整首换钱，我只取空格。空着的地方，到了客栈自会有话填。"] }
          ] }
        ]
      },
      {
        id: "lian_ep2",
        title: "第二幕 · 窗下一盆花",
        hint: "前往「洛阳城 · 白马客栈」，把半枚铜钱交给丁典。",
        reqFlag: "lian_ep1_done",
        trigger: { region: "luoyang", room: "ly_inn", npc: "ding_dian" },
        steps: [
          { nar: "丁典半开窗牖，将一盆花缓缓推到外沿。你把铜钱放在盆底的缺口，缺口一塞，他立即收回手，猛地合上了半扇窗。" },
          { show: { left: hero, right: "assets/foe-master.webp", active: "right" }, say: ["丁典", "低些声。霜华养花，雨大时才把盆挪半步。今晨有人搬进搬出三回，土也不是昨日的土。"] },
          { show: { active: "left" }, say: ["主角", "这层湿的在下面，干的却露在外头。花没换，叫人挪来盖住盆底的物事了。"] },
          { nar: "他用剪下的枯茎点进盆眼，你接住推出的一枚空竹节。竹内藏着一行诗，旁边粘一小撮只有雪落过才肯伏平的草籽。" },
          { show: { active: "right" }, say: ["丁典", "去问水姑娘。这两笔从雪里抄下来的，有人踩乱过，我记的那句也未必全。"] },
          { nar: "你把花土沿根须压实，丁典趁机让盆沿离开格条一寸。光斑从花上挪到空窗，他一抬手，把最冷那格窗纸遮了起来。" },
          { choice: [
            { text: "【保住花信】恢复盆土，只拿走写在竹内的诗句", effect: { moral: 9, exp: 150, item: "yulu", setFlag: "lian_ep2_done" }, reply: ["丁典", "花还在，便还有人能认得我的窗。告诉狄云，字认准了再练。"] },
            { text: "【留一份花信】抄取两处暗记，将较完整的一份握在手里", effect: { moral: -7, exp: 120, gold: 175, setFlag: "lian_ep2_done", setFlag2: "lian_flower_copy" }, reply: ["丁典", "你想留那张纸也可。把笔收了，莫再用这盆花同别人谈价。"] }
          ] }
        ]
      },
      {
        id: "lian_ep3",
        title: "第三幕 · 雪火煮经",
        hint: "前往「雁门关 · 雪岭旧庄」，请水笙补全雪地所记诗句。",
        reqFlag: "lian_ep2_done",
        trigger: { region: "yanmen", room: "ym_snow_lodge", npc: "shui_sheng" },
        steps: [
          { nar: "水笙把湿页塞在两片火烤过的木板间，你替她挑起火边的湿靴，靴筒里倒出一串硬雪。她用手背一划，雪上竟有一道完整的劈痕。" },
          { show: { left: hero, right: "assets/npc-maiden.webp", active: "right" }, say: ["水笙", "你数数这步有多长。雪谷里人都说狄大哥害了他们，我从这条痕里看见的，明明是他退一步把路让了。"] },
          { show: { active: "left" }, say: ["主角", "步尾多一个脚点。给我看纸的最下边，少写的那一字该在他回头的位置。"] },
          { nar: "你用两块木板夹正湿页，水笙慢慢翻过来。她从纸和板之间抽出一粒金箔，放在火外，箔边一个「宁」字映得清亮。" },
          { ifMate: "xiaolongnv", show: { left: "assets/mate-xiaolongnv.webp", right: elder, active: "left" }, say: ["小龙女", "人在雪里走不稳，肯把活路让给旁人，已是很费力的事。你若看清他这一脚，便把它写进去。"] },
          { show: { left: hero, right: "assets/npc-maiden.webp", active: "right" }, say: ["水笙", "我写好另一份给狄大哥。他将天宁寺的旧物带到少林借瓮收着，等有人把这页的字补上。"] },
          { nar: "你把两块木板错开，湿页终于可揭。水笙一只手提走煮水的罐，另一只将写干的纸避过它滴落的黑水。" },
          { choice: [
            { text: "【烹饪 Lv2】控住灶温烘平湿页，让水笙留下完整一份", reqLife: { cook: 2 }, effect: { moral: 11, exp: 190, item: "dish_chicken", setFlag: "lian_ep3_done" }, reply: ["水笙", "纸平了，靴也干了。往寺里去时，就穿这双。"] },
            { text: "【双证同封】封住金箔与字据，把退步的真相带给狄云", effect: { moral: 9, exp: 155, setFlag: "lian_ep3_done" }, reply: ["水笙", "让他自己看罢。我在这儿留一回火，倘若他还走这一程，也好烤脚。"] },
            { text: "【换去金箔】以金身线索引开夺书人，领取他们的看线费", effect: { moral: -8, exp: 130, gold: 220, setFlag: "lian_ep3_done", setFlag2: "lian_gold_decoy" }, reply: ["主角", "给他们一点会发亮的东西。我收好这张发不了亮的。"] }
          ] }
        ]
      },
      {
        id: "lian_ep4",
        title: "第四幕 · 佛腹落尘",
        hint: "到「嵩山少林寺 · 藏经阁后院」，找狄云开天宁寺遗物。",
        reqFlag: "lian_ep3_done",
        trigger: { region: "songshan", room: "ss_court", npc: "di_yun" },
        steps: [
          { nar: "狄云将透湿的布从瓮口揭下，你托瓮向旁稍稍一侧，一块佛腹金片便沿瓮沿滑出来。片后斑斑点点，挨上新水便发黑。" },
          { show: { left: hero, right: "assets/npc-diyun.webp", active: "right" }, say: ["狄云", "他们拿金子先往嘴里送，说咬得动便是真金。我倒想，有谁肯替那个人尝他咬过以后的苦？"] },
          { ifFlag: "lian_gold_decoy", say: ["狄云", "山下两个人拿你的金箔来讨价。我给他们看了手上发黑的那一块，他们便把自己的扔进沟了。"] },
          { unlessFlag: "lian_gold_decoy", say: ["狄云", "水笙让人送了另一封字据来。我托和尚替我逐字念过，她说的话与石上错诗全不相干。"] },
          { show: { active: "left" }, say: ["主角", "让我先夹走金片。瓮底有一册书，外封是净的，你把你的木签递来撑一下。"] },
          { nar: "一道刺目血影猛然翻过院墙！血刀老祖怪笑声未落，软刀已卷着腥风直扑陶瓮，誓要独吞天宁寺秘宝与剑谱！" },
          { show: { right: "assets/foe-bandit.webp", active: "right" }, say: ["血刀老祖", "嘿嘿，小杂种藏得好深！佛腹真金和连城剑诀，全给老祖交出来罢！"] },
          { battle: "he_taichong", winReward: { exp: 180, item: "dahuandan" },
            winNar: "你见招拆招大破血刀诡技，将血刀老祖重创逼退院外！" },
          { show: { left: hero, right: "assets/npc-diyun.webp", active: "right" }, nar: "风雪散尽。狄云把木签伸进瓮内，你从下面抽出书册。金片滑到砖缝中，他用脚踏住，并不低头再瞧一眼。" },
          { show: { active: "right" }, say: ["狄云", "《连城诀》在你手上。中间夹了一张纸，说的是他们欠谁几条命。我数不清那样多，你让会数的人看。"] },
          { nar: "你把金片拢进用剩的布，折口朝里。狄云束紧瓮盖，剩下那点绳被他截断，绕到水笙送来的字据角上。" },
          { choice: [
            { text: "【封金留话】将遗金封交少林，传下狄云证词并收天书", effect: { moral: 13, exp: 385, tianshu: "lian", item: "dan_jiuzhuan", setFlag: "lian_completed" }, reply: ["狄云", "有字的人看字就好。我回去砍柴，砍柴再不用先认一句诗。"] },
            { text: "【分走买路钱】将金身位置卖给富客，带天书远离旧账", effect: { moral: -11, exp: 325, tianshu: "lian", gold: 460, setFlag: "lian_completed", setFlag2: "lian_sold_temple_lead" }, reply: ["狄云", "书归你。金身的事我会让僧人封上，有人还来敲瓮，是他自己的事。"] }
          ] }
        ]
      }
    ]
  });
})(window);


/* ===== data/quests/ts_tian.js ===== */
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


/* ===== data/quests/ts_bai.js ===== */
(function (root) {
  "use strict";
  const JY = root.JY;
  const hero = "assets/hero-portrait.webp";
  const li = "assets/npc-maiden.webp";
  const elder = "assets/npc-hermit.webp";

  JY.registerQuest("ts_bai", {
    title: "白马啸西风 · 旧毡归路",
    tianshuId: "bai",
    summary: "从大理古道送白马回塞外，随李文秀寻找落单的人。高昌旧门能打开，归来的人未必同路。",
    episodes: [
      {
        id: "bai_ep1",
        title: "第一幕 · 白马拒辔",
        hint: "前往「大理城 · 西门古道」，与李文秀查看白马衔来的旧毡。",
        trigger: { region: "dali", room: "dl_road", npc: "li_wenxiu" },
        steps: [
          { nar: "白马伸嘴咬住李文秀衣带，前蹄仍朝北。你把倒缠的辔绳解开，它立即用鼻尖从驿亭柱后拱出一块毛毡。" },
          { show: { left: hero, right: li, active: "right" }, say: ["李文秀", "它肯等我，却不肯跟我进城。你看蹄边这块毡，它从头一根驿桩嗅到最后一根。"] },
          { show: { active: "left" }, say: ["主角", "毡角绣了三个铃，簇在一起的两针又都磨断了。莫不是旧时赶路的人另有记号？"] },
          { nar: "李文秀把毡挪到马背试披，白马向左一偏，露出铺在内层的一枚錾花小扣。你摘下扣子，它抖了抖鬃毛，不再拉扯衣带。" },
          { show: { active: "right" }, say: ["李文秀", "计爷爷修的扣。若长安西市还有他用的缝毡针，便有人认得白马要回哪一条道。"] },
          { nar: "你把毛毡折回较宽的一面，让马颈露出来。李文秀把扣压在你手中，抬手示意白马朝自己走一步。" },
          { choice: [
            { text: "【替马归旧主】以原扣问路，给李文秀留下整块旧毡", effect: { moral: 8, exp: 125, setFlag: "bai_ep1_done" }, reply: ["李文秀", "等它愿走了我再走。若你先到，计爷爷认得这只扣就够了。"] },
            { text: "【把古路标价】拓下毡角记号卖给商旅，携扣去西市", effect: { moral: -6, exp: 100, gold: 125, setFlag: "bai_ep1_done", setFlag2: "bai_sold_stitches" }, reply: ["主角", "扣子留真的，路图只画到第一根桩。我也要等有人亲口说出第二段。"] }
          ] }
        ]
      },
      {
        id: "bai_ep2",
        title: "第二幕 · 计家空鞍",
        hint: "到「长安城 · 西市胡商街」，拿錾花小扣给计老人看。",
        reqFlag: "bai_ep1_done",
        trigger: { region: "changan", room: "ca_market", npc: "ji_laoren" },
        steps: [
          { nar: "计老人把扣反转扣进一只空鞍，皮扣只剩一半仍合得牢。你替他拉住鞍带，他却用刀割下覆在最外面的整条新皮。" },
          { show: { left: hero, right: elder, active: "right" }, say: ["计老人", "我换过许多次马鞍。白马若遇到旧鞍才肯停，总不能叫它一辈子拖着个空鞍。"] },
          { show: { active: "left" }, say: ["主角", "这个扣眼底下藏了一粒干草籽，像是你从塞外带回来那种。"] },
          { nar: "他把草籽拈碎，从松散的鞍垫下拽出斜缝地图。你撑开图面，他用断皮带指了一处图上没画水的沟。" },
          { ifMate: "guojing", show: { left: "assets/mate-guojing.webp", active: "left" }, say: ["郭靖", "没有画水，也许春天才有水。放羊的人知道水过哪处，咱们先去问他们。"] },
          { show: { left: hero, active: "right" }, say: ["计老人", "问苏普便是。他若说先找羊，你随他去找。跑丢的一只，有时会领你回来见到一群。"] },
          { nar: "你把皮带从瓦片上解开，计老人卷起地图，让没有路的一面朝外，再用新扣把它扣住。" },
          { choice: [
            { text: "【不问旧姓】只借问水的地图，让计老人收回空鞍", effect: { moral: 8, exp: 155, aff: { guojing: 6 }, setFlag: "bai_ep2_done" }, reply: ["计老人", "好。叫那孩子牵白马过沟时莫坐在背上，她总是不听。"] },
            { text: "【押鞍得图】把空鞍写作路线押物，先领驿费再出关", effect: { moral: -7, exp: 120, gold: 170, setFlag: "bai_ep2_done", setFlag2: "bai_saddle_deposit" }, reply: ["计老人", "鞍留得住，人未必留得住。图带稳罢。"] }
          ] }
        ]
      },
      {
        id: "bai_ep3",
        title: "第三幕 · 羊铃隔风",
        hint: "前往「雁门关 · 雪岭旧庄」，与苏普会合，寻找落单的羊群。",
        reqFlag: "bai_ep2_done",
        trigger: { region: "yanmen", room: "ym_snow_lodge", npc: "su_pu" },
        steps: [
          { nar: "苏普把礁石一样的冻土从井口挪开，井下没有水，却传来三声闷铃。你以靴尖支住提桶，一条旧缰正在下方慢慢拉直。" },
          { show: { left: hero, right: "assets/foe-master.webp", active: "right" }, say: ["苏普", "阿曼追羊去了。我在坡上吹了三次哨，前两次都从这里回答，第三次风把它带走了。"] },
          { show: { active: "left" }, say: ["主角", "别再往坡顶吹。把能拨响的铃给我，且听哪一面回得最慢。"] },
          { nar: "你分左右轻敲井砖。苏普把提桶放低一截，第三声铃从桶沿里拐出，正向着地形图上没水的沟。" },
          { show: { active: "right" }, say: ["苏普", "下面到绝壁就是高昌旧门。阿曼若逆着风，李姑娘在那边等她，能看得见白马。"] },
          { nar: "你把地图压在窗台取下一块炭，用炭侧拓出井砖刻的临时水位。苏普将一条旧领巾系在桶绳顶端，给后来者留了回铃的位置。" },
          { choice: [
            { text: "【音律 Lv2】辨井内外两重回音，沿较近的沟先把羊引出来", reqLife: { music: 2 }, effect: { moral: 11, exp: 190, item: "food_ham", setFlag: "bai_ep3_done" }, reply: ["苏普", "这声我听明白了。你走石门那边，羊听着我接着吹。"] },
            { text: "【结绳找回路】替苏普封好井口，持水位记号去会合", effect: { moral: 8, exp: 150, setFlag: "bai_ep3_done" }, reply: ["苏普", "认领巾便认得回来路。有了羊叫，阿曼也能听见。"] },
            { text: "【另售远路】把回铃较慢的一道附会成藏宝口，领银后自行赴会", effect: { moral: -8, exp: 125, gold: 205, setFlag: "bai_ep3_done", setFlag2: "bai_false_pass" }, reply: ["主角", "他们走地图，我走铃音。让白马知道谁是回来领人的便成。"] }
          ] }
        ]
      },
      {
        id: "bai_ep4",
        title: "第四幕 · 高昌门外",
        hint: "到「雁门关 · 关外绝壁」，循水位刻痕与李文秀会合。",
        reqFlag: "bai_ep3_done",
        trigger: { region: "yanmen", room: "ym_cliff", npc: "li_wenxiu" },
        steps: [
          { nar: "你擦净石门角，李文秀托住门页，下面顶着的不是铁销，竟是一把落了齿的旧梳。门页再开一线，白马身后的阿曼正给一只小羊缠蹄。" },
          { show: { left: hero, right: li, active: "right" }, say: ["李文秀", "他们从南边找金子来。旧门后只有这些东西，拿一把梳子回去，会不会反倒说我们把金子藏了？"] },
          { ifFlag: "bai_false_pass", say: ["李文秀", "远处那伙人还在敲石头，白马不肯朝他们那头走。麻烦你挪开北边那块楔，别让小羊听见。"] },
          { unlessFlag: "bai_false_pass", say: ["李文秀", "阿曼听出了苏普的哨，就在这儿等。先把羊递出去罢，愿意接的人都在沟那一侧。"] },
          { show: { active: "left" }, say: ["主角", "先把梳子换出来，它也不该替人顶一扇门。等羊走稳，这块旧门石再让它合上。"] },
          { nar: "你从雪底找一截木楔抵住石门，李文秀拔出旧梳，用身上的毡擦过断齿。阿曼把包着小羊的皮袍展开，袍里落出一册《白马啸西风》。" },
          { show: { active: "right" }, say: ["李文秀", "把书拿走罢。我见到她，原来能同她说许多话，偏有一句不用再说了。"] },
          { nar: "你接住书，转身见白马已自己走到岔路上。李文秀上前为阿曼扶一把辔，自己仍站在马能看见的这一边。" },
          { choice: [
            { text: "【送人出关】替阿曼留回路，把高昌旧物留在原处并收天书", effect: { moral: 12, exp: 365, tianshu: "bai", item: "treasure_map", setFlag: "bai_completed" }, reply: ["李文秀", "这一阵风朝南。少侠回中原时，我等白马送了他们再走。"] },
            { text: "【空门作价】出售石门见闻、保留白马归路，以谢银和天书作交换", effect: { moral: -9, exp: 310, tianshu: "bai", gold: 425, setFlag: "bai_completed", setFlag2: "bai_sold_empty_vault" }, reply: ["李文秀", "他们爱看空门，请看罢。别在路上牵住那匹白马，它有自己想去的地方。"] }
          ] }
        ]
      }
    ]
  });
})(window);


/* ===== data/quests/ts_lu.js ===== */
(function (root) {
  "use strict";
  const JY = root.JY;
  const hero = "assets/hero-portrait.webp";
  const elder = "assets/npc-hermit.webp";

  JY.registerQuest("ts_lu", {
    title: "鹿鼎记 · 纸背有山",
    tianshuId: "lu",
    summary: "韦小宝从漕船上捞来一册四十二章经。跟着书皮里的碎绢走过客栈、少林与运河，看看宝图最后换来什么。",
    episodes: [
      {
        id: "lu_ep1",
        title: "第一幕 · 货栈晒经",
        hint: "前往「扬州城 · 运河钞关」，查问韦小宝手里的湿经。",
        trigger: { region: "yangzhou", room: "yangzhou_gate", npc: "wei_xiaobao" },
        steps: [
          { nar: "韦小宝蹲在水尺旁晒经，把两枚铜钱压在同一页上。你替他拨开沾纸的水草，发现铜钱底下还有一条扯不开的白线。" },
          { show: { left: hero, right: "assets/npc-weixb.webp", active: "right" }, say: ["韦小宝", "先别撕，佛爷的面皮撕坏了不打紧，我这五十两的书皮可经不起你一根指头。"] },
          { show: { active: "left" }, say: ["主角", "值五十两的是白线罢。船账只写了进八册，出一册，为何掌柜说本本都在？"] },
          { nar: "他用茶水把钱孔润一润，白线滑到你指尖，原是封皮里缝着的一条薄绢。门边账房咳了两声，韦小宝立即将空封皮端端正正盖回去。" },
          { show: { active: "right" }, say: ["韦小宝", "本本都在掌柜的嘴里。你要验货，白马客栈有个会认针脚的好妹子，找她务必先敲桌脚。"] },
          { nar: "你丢开滴水的草绳，把绢条塞进一只干信封。他从秤盘下抽出半张船单，用两枚铜钱压住写客栈的那边。" },
          { choice: [
            { text: "【物归原主】带碎绢给双儿，留下一纸换货回执", effect: { moral: 7, exp: 120, item: "jade_fan", setFlag: "lu_ep1_done" }, reply: ["韦小宝", "还写回执？成，有你这张纸，我在掌柜面前能多赖两天。"] },
            { text: "【卖一本空经】用掉包经皮向货主换脚钱，暗取船单", effect: { moral: -7, exp: 100, gold: 145, setFlag: "lu_ep1_done", setFlag2: "lu_hollow_sutra" }, reply: ["韦小宝", "好眼力！送经的人收的是皮，咱们过河靠的倒是里子。"] }
          ] }
        ]
      },
      {
        id: "lu_ep2",
        title: "第二幕 · 双针补绢",
        hint: "前往「洛阳城 · 白马客栈」，请双儿辨认针脚。",
        reqFlag: "lu_ep1_done",
        trigger: { region: "luoyang", room: "ly_inn", npc: "shuang_er" },
        steps: [
          { nar: "你依言敲了桌脚，双儿在桌对面屈指回了一下。她把油灯移到脚踏下，针尖从绢条背后挑起一个藏得极深的回针。" },
          { show: { left: hero, right: "assets/npc-maiden.webp", active: "right" }, say: ["双儿", "相公总说一眼便瞧穿。这点回针藏在绢背，瞧穿了反倒要漏过去。"] },
          { show: { active: "left" }, say: ["主角", "绢有八角。这一角与船单上的水纹对不上，你看是少了一针，还是有人换过了？"] },
          { nar: "双儿抿断线尾，把一只空杯倒扣在绢面上。你顺杯缘转半圈，褪去颜色的山尖才与水纹合起，尾端还有两个小小的少林字样。" },
          { ifMate: "zhaomin", show: { left: "assets/mate-zhaomin.webp", active: "left" }, say: ["赵敏", "缝反一角便够叫人跑错一座山。韦相公若是有意，回头可得请咱们喝够一壶。"] },
          { show: { left: hero, active: "right" }, say: ["双儿", "澄观师父看过经封。你拿这角去请教，别把相公捞书的事也一齐说出去了。"] },
          { nar: "她以针尖在纸上戳出山尖缺口，你把纸折成经角形状。窗外脚步停了一停，她抽走脚边灯，屋里立刻暗了一半。" },
          { choice: [
            { text: "【护住双儿】留碎绢原角，只把纸样带去少林", effect: { moral: 8, exp: 145, aff: { zhaomin: 5 }, setFlag: "lu_ep2_done" }, reply: ["双儿", "好，真绢我收在袖里。有人替你敲桌脚，我也不会错认。"] },
            { text: "【收下缝样】扣存一份真绢作押，持纸样赴少林", effect: { moral: -6, exp: 115, gold: 175, setFlag: "lu_ep2_done", setFlag2: "lu_map_pledge" }, reply: ["双儿", "我替你封稳。若有人开过，封线断处就容易认了。"] }
          ] }
        ]
      },
      {
        id: "lu_ep3",
        title: "第三幕 · 经字错一格",
        hint: "到「嵩山少林寺 · 藏经阁」，请澄观核对经封纸样。",
        reqFlag: "lu_ep2_done",
        trigger: { region: "songshan", room: "ss_library", npc: "chenguan" },
        steps: [
          { nar: "澄观从经架上连抽四册，页脚竟都比你的纸样短一格。你替他把尺放平，木尺中段却翘起来，恰指向经匣侧面的小孔。" },
          { show: { left: hero, right: "assets/npc-monk.webp", active: "right" }, say: ["澄观", "尺是直的，匣是歪的。若以歪匣量直尺，便成了尺量错，施主请先看清哪一样动过。"] },
          { show: { active: "left" }, say: ["主角", "匣底垫了一层胡桃木。麻烦师父将里头四册都倒出来，再把这层木取下。"] },
          { nar: "你托住木匣，澄观以书签探缝。小孔里咔哒一声，滑出两张等高的船牌，一张有背号，一张画了片上岸的柳叶。" },
          { show: { active: "right" }, say: ["澄观", "船在扬州。两块牌叠好，柳叶的柄就指向那一号船。这个法子是陈施主来借经的时候教我玩的。"] },
          { nar: "你把船牌在窗纸光里叠过，抬起上层恰好露出钞关水尺的印花。澄观抚了抚书角，把靠外的一册推回正位。" },
          { choice: [
            { text: "【弈棋 Lv2】按棋格定位船牌，记下会合号后替澄观归经", reqLife: { chess: 2 }, effect: { moral: 10, exp: 190, item: "dahuandan", setFlag: "lu_ep3_done" }, reply: ["澄观", "原来横竖都数才对。施主去时，替我问陈施主上回那局可曾下完。"] },
            { text: "【复原经架】留副牌供法师记账，携会合号回扬州", effect: { moral: 7, exp: 150, setFlag: "lu_ep3_done" }, reply: ["澄观", "一人带一块也好，记错了还有一块可对。"] },
            { text: "【抢占泊位】持原牌去向船户收取优先卸货钱", effect: { moral: -8, exp: 130, gold: 210, setFlag: "lu_ep3_done", setFlag2: "lu_reserved_dock" }, reply: ["主角", "会合照旧。这一格空出来做什么，等我回扬州再填。"] }
          ] }
        ]
      },
      {
        id: "lu_ep4",
        title: "第四幕 · 船牌落水",
        hint: "返回「扬州城 · 运河钞关」，将船牌交给陈近南。",
        reqFlag: "lu_ep3_done",
        trigger: { region: "yangzhou", room: "yangzhou_gate", npc: "chen_jinnan" },
        steps: [
          { nar: "陈近南把船牌对准钞关水尺，牌上柳叶恰在当下水线。他用指背一点，你将绢碎依水路排开，偏偏最要紧的一条断在下船处。" },
          { show: { left: hero, right: "assets/npc-chenjn.webp", active: "right" }, say: ["陈近南", "纸上留了金银，纸外还站着码头的伙计。谁先得消息，谁便能把他们都叫上船。"] },
          { ifFlag: "lu_reserved_dock", say: ["陈近南", "你预收了钱，那一格已经排了三家船。叫他们各退一尺，总得有人拿着你写的凭帖去说。"] },
          { unlessFlag: "lu_reserved_dock", say: ["陈近南", "澄观师父的副牌还挂在柜上，哪条船也不曾被叫走。待会儿让你自己来喊开不开船。"] },
          { show: { active: "left" }, say: ["主角", "账房已经凑够人。你瞧那数船板的伙计，连后头一艘空船都记成满仓。"] },
          { nar: "钞关栅门轰然倒塌！满洲第一勇士鳌拜竟亲率铁甲死士追至运河，横练铁壁如山岳压来，誓夺四十二章经密册！" },
          { show: { right: "assets/foe-mongol.webp", active: "right" }, say: ["鳌拜", "天地会反贼休走！经书与船牌交出来，免尔等血溅运河！"] },
          { battle: "ao_bai", winReward: { exp: 200, gold: 180 },
            winNar: "你以破甲绝学击碎鳌拜的十三太保金钟罩，逼得满洲铁甲狼狈退走！" },
          { nar: "韦小宝从木桩后冒出脑袋，抖开一件画有同样水纹的褂子。陈近南用指甲挑断最后一个扣眼，将夹层里的薄册递给你。" },
          { show: { right: "assets/npc-weixb.webp", active: "right" }, say: ["韦小宝", "师父，开船号我替他们喊过啦。至于往哪儿开嘛，船家收了另一个人的钱才晓得。"] },
          { nar: "你拨开册后浸湿的布角，露出《鹿鼎记》三个字。水拍木桩，船牌被撞歪一线，陈近南屈指将它按住。" },
          { show: { right: "assets/npc-chenjn.webp", active: "right" }, say: ["陈近南", "书你带走。去开口前想一想，是要散船，还是要这帮人继续等同一个价？"] },
          { choice: [
            { text: "【散金解围】公开调船账，遣伙计携工钱回家，收下天书", effect: { moral: 11, exp: 375, tianshu: "lu", item: "jade_fan", setFlag: "lu_completed" }, reply: ["韦小宝", "伙计有钱拿，船也不用开。下回写账还叫我来，省得你少算那一份。"] },
            { text: "【沽价藏江】出售假泊位，让真线索随天书归己", effect: { moral: -10, exp: 315, tianshu: "lu", gold: 490, setFlag: "lu_completed", setFlag2: "lu_fake_berth" }, reply: ["陈近南", "真泊位上的人我会遣走。你日后用得着这张假牌，莫叫他们当真。"] }
          ] }
        ]
      }
    ]
  });
})(window);


/* ===== data/quests/ts_xiao.js ===== */
(function (root) {
  "use strict";
  const JY = root.JY;
  const hero = "assets/hero-portrait.webp";
  const ying = "assets/mate-renyingying.webp";
  const ling = "assets/mate-linghu.webp";

  JY.registerQuest("ts_xiao", {
    title: "笑傲江湖 · 断弦余音",
    tianshuId: "xiao",
    summary: "从洛阳绿竹巷的琴匣寻到思过崖剑痕，循五岳门帖登黑木崖，亲见琴案与教主之位如何易手。",
    episodes: [
      {
        id: "xiao_ep1",
        title: "第一幕 · 绿竹听琴",
        hint: "前往「洛阳城 · 绿竹巷」拜访任盈盈。",
        trigger: { region: "luoyang", room: "ly_bamboo", npc: "renyingying" },
        steps: [
          { nar: "你掀开竹帘，帘绳撞翻一枚琴雁。帘后女子伸手接住，一拨第七弦，杂音立即止住，连门外卖花人也住了声。" },
          { show: { left: hero, right: ying, active: "right" }, say: ["任盈盈", "少侠找谁？若是寻绿竹翁，他去打水了。若是寻那支曲里的错处，我倒可再弹一遍。"] },
          { show: { active: "left" }, say: ["主角", "头两遍都在这儿少半拍。我闻得门廊有松木烧过的气味，劳驾看看琴匣的底。"] },
          { nar: "任盈盈用护弦布拂过铜扣，倒出一张五岳门帖。你将帖角抵到茶盏旁，压着它朝灯侧偏去，一道反印显出山石轮廓。" },
          { ifMate: "linghu", show: { left: ling, active: "left" }, say: ["令狐冲", "我说墙上怎生多了一张武林英雄的脸，原来是你拿我罚坐过的山崖盖印。盈盈，错半拍的是琴，错拜山头的可别是我。"] },
          { show: { left: hero, active: "right" }, say: ["任盈盈", "他打趣归他打趣。并派的帖原该五门分写，现在这张日子一栏全刮了，只有思过崖那方私印还能认。"] },
          { nar: "她把匣底翻回来，用竹刀挑开一段绒里。你隔着布托起一枚卡在里面的细长松针，针尖沾着鲜红的印泥。" },
          { choice: [
            { text: "【音律 Lv2】接完缺拍，按琴弦余振辨出琴匣里的夹层", reqLife: { music: 2 }, effect: { moral: 9, exp: 175, aff: { renyingying: 16 }, item: "guqin_score", setFlag: "xiao_ep1_done" }, reply: ["任盈盈", "懂得给曲子留一口气的人少见。这一页给你，门帖夹在下面。"] },
            { text: "【相助】请任盈盈保管原帖，只携思过崖印样上山", effect: { moral: 6, exp: 120, aff: { renyingying: 8 }, setFlag: "xiao_ep1_done" }, reply: ["任盈盈", "路上别逢人便问，思过崖上石头硬，乱问可要多碰几个头。"] },
            { text: "【换个价钱】以不揭开琴匣来路为条件，索银和门帖抄件", effect: { moral: -6, exp: 95, gold: 125, setFlag: "xiao_ep1_done", setFlag2: "xiao_sold_silence" }, reply: ["任盈盈", "银子拿去，话也请你一并收好。我只付这一次。"] }
          ] }
        ]
      },
      {
        id: "xiao_ep2",
        title: "第二幕 · 石壁回锋",
        hint: "前往「华山 · 思过崖」，与令狐冲核对门帖印记。",
        reqFlag: "xiao_ep1_done",
        trigger: { region: "huashan", room: "hs_siguoya", npc: "linghu" },
        steps: [
          { nar: "你把门帖贴在崖壁凹处，缺口正与裂纹合上。令狐冲用酒葫芦压住纸，剑尖挑开石缝里的茅草，挑出一截新栓的灰绳。" },
          { show: { left: hero, right: ling, active: "right" }, say: ["令狐冲", "凿石头的人早走光了。这位新来的爷们偏把旗子插得高，是怕我在下面认不出他华山的结？"] },
          { show: { active: "left" }, say: ["主角", "再把火举上去些。绳结压着的是剑路，五派的起手式竟叫同一笔挑断。"] },
          { nar: "令狐冲旋肘挑起一根枯枝，沿着石痕走到第三折。枯枝卡在石眼，他撒手后退一步，枝梢恰好指向一片能活动的薄石。" },
          { show: { active: "right" }, say: ["令狐冲", "拿一招冠你一个门派，那杆旗倒好使。拿它来挡这一剑，怕旗连杆要断两截。"] },
          { nar: "你撬开薄石，剥下夹在背面的一层毛纸。纸上只有一行交接时刻，落处是万安寺宝塔下，旁边压印着五把不同的剑。" },
          { show: { active: "left" }, say: ["主角", "五把剑只领一份回执。有个人想替五家同时说话，我倒想先听听递帖人怎么说。"] },
          { choice: [
            { text: "【护崖】盖回薄石，先用交接回执阻止冒领门帖", effect: { moral: 7, exp: 140, aff: { linghu: 10 }, setFlag: "xiao_ep2_done" }, reply: ["令狐冲", "待这阵过去，你再上山。石头不请客，我请你喝酒。"] },
            { text: "【先拓剑路】将破式摹走，预备拿它与黑木崖交易", effect: { moral: -7, exp: 120, item: "dan_chongmai", setFlag: "xiao_ep2_done", setFlag2: "xiao_wall_rubbing" }, reply: ["令狐冲", "纸上有三折，手上未必有三折。你拿它做买卖，莫把自己的剑也卖出去了。"] }
          ] }
        ]
      },
      {
        id: "xiao_ep3",
        title: "第三幕 · 五帖一印",
        hint: "前往「万安寺 · 万安寺外门」，拦下黛衣信使递出的五岳门帖。",
        reqFlag: "xiao_ep2_done",
        trigger: { region: "wanan", room: "wanan_gate", npc: "sect_messenger" },
        steps: [
          { nar: "黛衣信使把五只信筒插进香炉旁的细沙。你拿纸拓对准第三只筒的底部，筒底刻痕一毫不差，筒身的嵩山签却刚涂上浆。" },
          { show: { left: hero, right: "assets/npc-hermit.webp", active: "right" }, say: ["黛衣信使", "香烧尽，第二拨人才来。他们拿的剑是本派的，袖里的回帖却都得照同一个式样写。"] },
          { show: { active: "left" }, say: ["主角", "那就请你将五封排开。我认得笔画，不认剑。"] },
          { nar: "他用指节一敲，三封帖纸滑出筒底，另两封卡在内圈。你旋过卡住的信筒，倒出一张只盖半印的黑木崖通牌。" },
          { show: { active: "right" }, say: ["黛衣信使", "杨总管的人今夜换岗。这张牌能开铁索口，叫不叫得开成德殿，取决于你肯替谁报名字。"] },
          { nar: "塔门内响了两声铁环。信使踩灭炉边一颗火星，背过身去把门边的鞋印用脚尖抹平。" },
          { show: { active: "left" }, say: ["主角", "你去打水。回来若少了个筒，只说是我当面拿的。"] },
          { choice: [
            { text: "【打散并帖】将真正的五派回执分还各使，持原通牌上崖", effect: { moral: 9, exp: 150, aff: { renyingying: 10 }, setFlag: "xiao_ep3_done" }, reply: ["黛衣信使", "这回五筒分五处送，谁也休想拿一筒顶五次点卯。"] },
            { text: "【混入换岗】用同式回执换来席位和银牌，再扣下真的通牌", effect: { moral: -8, exp: 130, gold: 175, setFlag: "xiao_ep3_done", setFlag2: "xiao_false_dispatch" }, reply: ["主角", "让上头以为五家都照写了。开索的一刻，就是这张空帖最值钱的一刻。"] }
          ] }
        ]
      },
      {
        id: "xiao_ep4",
        title: "第四幕 · 成德殿针影",
        hint: "前往「黑木崖 · 成德殿」，与任我行一道揭开重帘。",
        reqFlag: "xiao_ep3_done",
        trigger: { region: "heimuya", room: "hm_hall", npc: "ren_woxing" },
        steps: [
          { nar: "铁索的余响还在脚下。任我行用指尖勾住重帘，你蹲下拨开帘脚一根红线，线上悬的银针原本正对脚踝。" },
          { show: { left: hero, right: "assets/npc-renwx.webp", active: "right" }, say: ["任我行", "老夫坐过石牢，听过铁门落闩。满殿人向他叫教主，他倒只肯应这一扇帘子里面的声音。"] },
          { ifFlag: "xiao_false_dispatch", say: ["任我行", "守索的见了你的假回执，一路给咱们开门。他若跟上来，要讨还这份功劳，你自己答他。"] },
          { unlessFlag: "xiao_false_dispatch", say: ["任我行", "你拆开送的五封信已到了三封。守索的不肯代五派落款，连那册投名簿也一并拿走了。"] },
          { nar: "帘内一点烛光斜过来。东方不败把绣圈搁在膝头，提起针尖在鬓边抿了一下，屏风边的杨莲亭用手拨开滚到脚下的线团。" },
          { show: { right: "assets/foe-dongfang.webp", active: "right" }, say: ["东方不败", "莲弟，你教他们轻些。到了这一步还只会吵，叫我如何收得匀这一针？"] },
          { show: { active: "left" }, say: ["主角", "山下人等着五岳的回帖，山上人等着教主的答复。把门打开罢，谁来问，便让谁自己听。"] },
          { nar: "任我行用掌风卷走帘子。你侧身挡住冲向琴案的一线银光，剑鞘上豁然添了一点闪亮的新孔。" },
          { show: { active: "right" }, say: ["东方不败", "好胆子。那支针试的是灯，这一支才试你的手。"] },
          { battle: "dongfang_boss", onWinFlag: "xiao_ep4_done", winReward: { exp: 220, item: "yulu" },
            winNar: "你格开疾针，殿中绣圈滚落。任我行要人合上殿门，任盈盈趁帘落从后门递来一张短笺：带琴回吊篮栈厅，她有话同你说。" }
        ]
      },
      {
        id: "xiao_ep5",
        title: "第五幕 · 崖栈合调",
        hint: "返回「黑木崖 · 吊篮栈厅」，把琴交给任盈盈。",
        reqFlag: "xiao_ep4_done",
        trigger: { region: "heimuya", room: "hm_gate", npc: "renyingying" },
        steps: [
          { nar: "你把琴匣放在门槛上，门槛竟随铁索往下轻轻一颤。任盈盈从衣襟取出断弦，将两头摆在琴枕正中。" },
          { show: { left: hero, right: ying, active: "right" }, say: ["任盈盈", "我爹叫人重钉门牌，送帖的每人都要叩一个头。你往后若再上崖，咱们从席间退，我领你走小路。"] },
          { show: { active: "left" }, say: ["主角", "这张琴没撞坏，我照你在竹巷弹的拨过一下。少的那半拍，还空着。"] },
          { nar: "她把断弦抽走，换上一根素弦。第一个散音撞上崖风，你托着琴尾，待铁索那阵急响过去，才往前递了一寸。" },
          { show: { active: "right" }, say: ["任盈盈", "有的半拍留给人接，有的半拍只好空着。旁人填上的，总觉得不合手。"] },
          { nar: "任盈盈将一本青线册塞入琴匣，揭开夹页，露出琴箫两行谱字和后面数张改过落款的江湖旧帖。" },
          { show: { active: "right" }, say: ["任盈盈", "我把曲谱与断帖缝成了《笑傲江湖》。你若听得懂曲，就也知道该在何处收声。"] },
          { choice: [
            { text: "【还曲江湖】将门帖公开归还，持谱与两人作别", effect: { moral: 11, exp: 395, tianshu: "xiao", aff: { renyingying: 16, linghu: 8 }, setFlag: "xiao_completed" }, reply: ["任盈盈", "收好。下回你到了绿竹巷，把帘绳拨开便进来，毋须门帖。"] },
            { text: "【藏去副印】抄下教中私印以备日后议价，带走天书", effect: { moral: -10, exp: 330, tianshu: "xiao", gold: 440, setFlag: "xiao_completed", setFlag2: "xiao_kept_seal" }, reply: ["任盈盈", "你要的是印，曲我仍旧给你。以后听见琴音，请想清楚再敲门。"] }
          ] }
        ]
      }
    ]
  });
})(window);


/* ===== data/quests/ts_shu.js ===== */
(function (root) {
  "use strict";
  const JY = root.JY;
  const hero = "assets/hero-portrait.webp";
  const chen = "assets/npc-chenjl.webp";
  const huo = "assets/npc-huoqt.webp";
  const elder = "assets/npc-hermit.webp";

  JY.registerQuest("ts_shu", {
    title: "书剑恩仇录 · 白毡寸诺",
    tianshuId: "shu",
    summary: "红花会的书札走漏了驼队口令。随陈家洛与霍青桐过西市、护关外撤路，再处置盟书和欠下的诺言。",
    episodes: [
      {
        id: "shu_ep1",
        title: "第一幕 · 空盏红花",
        hint: "前往「洛阳城 · 白马客栈」，向陈家洛查问红花会来信。",
        trigger: { region: "luoyang", room: "ly_inn", npc: "chen_jialuo" },
        steps: [
          { nar: "陈家洛将第二套茶杯从木盘中逐一翻正，空杯底下掉出一片干花。你用茶匙把花拢起，盘沿上有一道用指甲划出的顿笔。" },
          { show: { left: hero, right: chen, active: "right" }, say: ["陈家洛", "这一套本该等西来的客。昨夜只到了一片花，其余杯口皆向下，我便知道他们停在城外。"] },
          { show: { active: "left" }, say: ["主角", "花瓣浸过两次茶，一次甜，一次涩。中间难道有人换了信，却没换杯？"] },
          { nar: "他合拢折扇，从扇骨拔下一根短签。你拿来与盘沿的顿笔相对，两头正好指向写有「西市」的茶封角。" },
          { show: { active: "right" }, say: ["陈家洛", "西市等的是霍姑娘。她调过人马，空了三处才留出一条路。你见她时只说缺第三盏，其余让她作主。"] },
          { nar: "你将茶杯一只只套回去，只留刻过痕的那只；陈家洛伸手回来，又将短签摆在杯沿彼此都看得见的一面。" },
          { choice: [
            { text: "【赴约相援】替陈家洛送茶封原件，先听霍青桐调度", effect: { moral: 8, exp: 125, setFlag: "shu_ep1_done" }, reply: ["陈家洛", "多谢。少侠不必许我什么，见到她，依她的话行事。"] },
            { text: "【留签议报】持茶封上路，扣一枚短签作索酬凭据", effect: { moral: -6, exp: 100, gold: 130, setFlag: "shu_ep1_done", setFlag2: "shu_short_tally" }, reply: ["主角", "我替人冒一次险，短签便替我留一次话。"] }
          ] }
        ]
      },
      {
        id: "shu_ep2",
        title: "第二幕 · 驼铃换结",
        hint: "到「长安城 · 西市胡商街」，向霍青桐报出第三盏的暗号。",
        reqFlag: "shu_ep1_done",
        trigger: { region: "changan", room: "ca_market", npc: "huo_qingtong" },
        steps: [
          { nar: "你报出暗号，霍青桐将驼铃一摘，用缰尾把铃口堵住。旁边驼夫依次牵走两匹牲口，剩下那匹鞍上拴着两根同色绳。" },
          { show: { left: hero, right: huo, active: "right" }, say: ["霍青桐", "右边是领路的结，左边是误人的结。我若叫你牵一匹走，你先问我要不要让第三个人看见。"] },
          { show: { active: "left" }, say: ["主角", "那就叫左边的结先出城。右边留下，给背了干粮的小队换一道门走。"] },
          { nar: "霍青桐拨开驼鞍底厚毡，用木块撑住塌下的镫带。你把茶封塞入夹缝，顺手托住从毡里滑出的一枚折尾木箭。" },
          { ifMate: "zhaomin", show: { left: "assets/mate-zhaomin.webp", active: "left" }, say: ["赵敏", "霍姑娘特意把空驼领到街心，等的是那个会问载了多少货的人。这一问，往往比三封密报还值钱。"] },
          { show: { left: hero, active: "right" }, say: ["霍青桐", "箭尾朝外，给雁门向导看。再留一步空地给后面的人，那里有小孩迈不过沟。"] },
          { nar: "你把木箭别在靠外的缰扣，霍青桐交换左右驼铃，捻住铃舌才松开最后那个结。" },
          { choice: [
            { text: "【弈棋 Lv2】以弃子换路，先送空驼过岗并守住撤离口", reqLife: { chess: 2 }, effect: { moral: 11, exp: 190, item: "jade_fan", setFlag: "shu_ep2_done" }, reply: ["霍青桐", "你看到了空处。给我留个活眼，人慢些也能到。"] },
            { text: "【护送驼队】按霍青桐信号护后段，持木箭出关", effect: { moral: 8, exp: 155, setFlag: "shu_ep2_done" }, reply: ["霍青桐", "路窄。你不必赶得比谁快，替我看一看谁掉在后头。"] },
            { text: "【假报货重】拿两份通关账套走差价，照旧把木箭送给向导", effect: { moral: -8, exp: 125, gold: 190, setFlag: "shu_ep2_done", setFlag2: "shu_caravan_margin" }, reply: ["主角", "两边都以为自己的是实账。人照旧走，账等他们自己去合。"] }
          ] }
        ]
      },
      {
        id: "shu_ep3",
        title: "第三幕 · 关前落毡",
        hint: "到「雁门关 · 关外绝壁」，将折尾木箭交给驼队向导。",
        reqFlag: "shu_ep2_done",
        trigger: { region: "yanmen", room: "ym_cliff", npc: "caravan_runner" },
        steps: [
          { nar: "向导趴在崖路转角，把白毡卷塞到石角底下。你递去木箭，他以断尾顶进卷轴，外层白毡松开，里边那一层是土黄色的。" },
          { show: { left: hero, right: elder, active: "right" }, say: ["驼队向导", "都在等白毡过坡。白毡先过，人从另一面走。绳子一放，你听到响也别转头。"] },
          { show: { active: "left" }, say: ["主角", "石坎有人骑马等。若白毡一路滚进沟，他们烧了退路，怎么办？"] },
          { nar: "向导将白毡一角系到残枯木上。你扯着土黄毡遮住队尾一双草鞋，草鞋的主人跨过沟，回手托了一把下一个孩子。" },
          { show: { active: "right" }, say: ["驼队向导", "我守石坎你数人。陈舵主在长安雪灯客栈，登门给他看毡内那行字，才晓得该把信交谁。"] },
          { nar: "正待收绳，山道马蹄如雷，追缉红花会的骁骑统领已率精锐抢上石坎，弯刀直劈断后众人！" },
          { battle: "mongol_commander", healBetween: 0.35, winReward: { exp: 180, gold: 120 }, winNar: "你横刃守住窄坎击退追骑先锋，队尾老幼悉数平安跨过深沟！" },
          { show: { left: hero, right: elder, active: "right" }, nar: "你数到最后一口水袋，将箭重新插回卷轴，白毡立时抖落下去。向导从腰里翻出一卷新绳，把空卷轴留在原处。" },
          { choice: [
            { text: "【断后清点】等人过完再退，留下一条能循回的藏身线", effect: { moral: 9, exp: 165, item: "jinchuang", setFlag: "shu_ep3_done" }, reply: ["驼队向导", "一个也没少。给陈舵主看字时，也请他把人数记全。"] },
            { text: "【白毡作伪】留下空毡误导追兵，带走他们扔下的盘缠", effect: { moral: -7, exp: 130, gold: 225, setFlag: "shu_ep3_done", setFlag2: "shu_seized_pay" }, reply: ["主角", "白毡给他们看，带字的跟我走。追兵若折回来，你只说银袋掉进沟了。"] }
          ] }
        ]
      },
      {
        id: "shu_ep4",
        title: "第四幕 · 扇骨有书",
        hint: "返回「长安城 · 雪灯客栈」，向陈家洛交还驼队消息。",
        reqFlag: "shu_ep3_done",
        trigger: { region: "changan", room: "ca_inn", npc: "chen_jialuo" },
        steps: [
          { nar: "陈家洛把折扇拆成两把空骨。你拿左一片压住毡角，右一片刚入纸缝，扇布内夹着的盟书便缓缓滑下来。" },
          { show: { left: hero, right: chen, active: "right" }, say: ["陈家洛", "我总想一句话换得天下安静。霍姑娘先多走了一道坡，才把该我送的人送出来。"] },
          { show: { right: huo, active: "right" }, say: ["霍青桐", "我走的是人走得通的路。你若真要许话，把沙里那双草鞋的人也写到纸上来。"] },
          { ifFlag: "shu_seized_pay", say: ["霍青桐", "追兵数过空钱袋，又回来找了一遍。走在末尾的两户，等到天亮才翻过山坳。"] },
          { unlessFlag: "shu_seized_pay", say: ["霍青桐", "向导照你留的线找到最后两户时，火还没落。我听着一阵铃，数得人一个也没有少。"] },
          { nar: "你提笔写下人数，笔尖掠过早写好的落款。陈家洛摘掉压纸的红花，挑开一处重新缝过的扇面。" },
          { show: { active: "left" }, say: ["主角", "这张盟书留在客舍。旁边这册记着人如何走出来，倒可送给肯照着走的人。"] },
          { nar: "陈家洛把《书剑恩仇录》抽离扇面，不慎碰翻了墨碟，霍青桐伸起袖沿，替他拦住了漫向姓名的墨水。" },
          { show: { right: chen, active: "right" }, say: ["陈家洛", "幸而字皆在。少侠若要天书，就从还写得清的这一角接去。"] },
          { choice: [
            { text: "【以人重于盟】归还两边署名的旧约，传下天书和驼队故事", effect: { moral: 12, exp: 375, tianshu: "shu", item: "treasure_map", setFlag: "shu_completed" }, reply: ["霍青桐", "毡我留着给人裹身，写了字的纸劳你带好。"] },
            { text: "【旧诺作价】收存盟书的谈判底本，携天书与谢银离开", effect: { moral: -9, exp: 315, tianshu: "shu", gold: 430, setFlag: "shu_completed", setFlag2: "shu_private_treaty" }, reply: ["陈家洛", "我认那上头有我的名字。再有人开价，先叫他看看纸上另有多少人。"] }
          ] }
        ]
      }
    ]
  });
})(window);


/* ===== data/quests/ts_shen.js ===== */
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


/* ===== data/quests/ts_xia.js ===== */
(function (root) {
  "use strict";
  const JY = root.JY;
  const hero = "assets/hero-portrait.webp";
  const shi = "assets/npc-shipotian.webp";
  const elder = "assets/npc-hermit.webp";

  JY.registerQuest("ts_xia", {
    title: "侠客行 · 字外见路",
    tianshuId: "xia",
    summary: "渡口少年认不得玄铁令的字，却能听出一首诗的走向。过无量山再返海边，随他从石壁上读出自己的路。",
    episodes: [
      {
        id: "xia_ep1",
        title: "第一幕 · 铁令压缆",
        hint: "前往「东海桃花岛 · 桃花渡」，替石破天辨识玄铁令。",
        trigger: { region: "taohua", room: "th_ferry", npc: "shi_potian" },
        steps: [
          { nar: "渡船乍靠，石破天拍下石桩上的玄铁令，正好卡住脱出的缆环。你拉紧绳子，他用两根指头捏起铁令，让你看底下湿出来的细线。" },
          { show: { left: hero, right: shi, active: "right" }, say: ["石破天", "大哥，这上头画的是把刀吗？我横着看有一把，倒过来，看着又像人伸了脚。"] },
          { show: { active: "left" }, say: ["主角", "那一边是字。伸脚的一笔反而有趣，照船缆走向挪一挪，你看脚落在哪儿。"] },
          { nar: "少年用铁令尖角拨正水里的绳，你撑住船沿，让一道极细的槽在背光处露出来。槽内嵌着半枚石质黑棋。" },
          { show: { active: "right" }, say: ["石破天", "我喂狗时见过白爷爷拿这种石头排队。你替我问他去，他说排好了，能从剑湖一直走到海边。"] },
          { nar: "你把黑棋松下来，缆环离桩又起了一跳。石破天脚下一踩，空出手来替你把令上的水擦干。" },
          { choice: [
            { text: "【替少年问路】将铁令交还石破天，只携黑棋往剑湖", effect: { moral: 8, exp: 120, setFlag: "xia_ep1_done" }, reply: ["石破天", "那你走好。渡船到下一趟，我还在这里牵绳。"] },
            { text: "【冒领持令人】收取围观客的问令银，携黑棋赴约", effect: { moral: -6, exp: 100, gold: 145, setFlag: "xia_ep1_done", setFlag2: "xia_claimed_token" }, reply: ["石破天", "钱收你的，船还是他们一同搭。别忘把缆给我。"] }
          ] }
        ]
      },
      {
        id: "xia_ep2",
        title: "第二幕 · 棋石换位",
        hint: "前往「无量山 · 剑湖石窟」，请白自在辨认那枚黑棋。",
        reqFlag: "xia_ep1_done",
        trigger: { region: "wuliang", room: "wl_cave", npc: "bai_zizai" },
        steps: [
          { nar: "白自在把石案拍得一响，三枚黑棋跳离方格，你接住最外那枚。把渡口拾的半子一并，断口恰好严丝合缝。" },
          { show: { left: hero, right: "assets/foe-guardian.webp", active: "right" }, say: ["白自在", "荒唐！老夫下过上千盘，谁家的棋子自己从海里游回剑湖了？"] },
          { show: { active: "left" }, say: ["主角", "来了一半，另一半你打落了。两枚合时，格下那道槽倒能通到底。"] },
          { nar: "你在石案矮处塞进一片瓦。齐起的棋石渐向槽眼滑过去，白自在用食指定住正中那子，晚一瞬便要一同坠下。" },
          { ifMate: "linghu", show: { left: "assets/mate-linghu.webp", active: "left" }, say: ["令狐冲", "前辈，让那一子输罢。它若下去，咱们倒能看看石案底下有没有第二盘酒。"] },
          { show: { left: hero, active: "right" }, say: ["白自在", "酒在渡口，叫张三给你！棋子另有个落处，老夫这回放它过去，且看它领谁走。"] },
          { nar: "棋子落进槽底，转开一道小石门。你抄下露出的一轮潮时，白自在抢过黑子，仍把它放回原来缺子的一格。" },
          { choice: [
            { text: "【弈棋 Lv2】舍中腹黑棋，开启侧槽并把原局还给白自在", reqLife: { chess: 2 }, effect: { moral: 11, exp: 185, item: "yulu", setFlag: "xia_ep2_done" }, reply: ["白自在", "这盘棋算你能下。但那子自己掉下去的，可不算老夫输。"] },
            { text: "【试走空格】顺滑槽找出潮时，等到合适时刻回桃花渡", effect: { moral: 8, exp: 150, setFlag: "xia_ep2_done" }, reply: ["白自在", "纸写大些，老夫总不信一道水能比人更识字。"] },
            { text: "【卖个破局】用可复原的棋式换银，保留真正潮时", effect: { moral: -7, exp: 125, gold: 175, setFlag: "xia_ep2_done", setFlag2: "xia_board_fee" }, reply: ["主角", "棋局归你们猜。潮退那刻，我另有去处。"] }
          ] }
        ]
      },
      {
        id: "xia_ep3",
        title: "第三幕 · 酒帖双至",
        hint: "返回「东海桃花岛 · 桃花渡」，按潮时向张三领帖。",
        reqFlag: "xia_ep2_done",
        trigger: { region: "taohua", room: "th_ferry", npc: "zhang_san" },
        steps: [
          { nar: "张三用小刀削掉酒葫芦的封泥，将两杯斟得一满一浅。退潮露出第三根缆桩，你踩住它的影子，见水面果然留出一条贴石细路。" },
          { show: { left: hero, right: elder, active: "right" }, say: ["张三", "客人，你要收帖，手自空着。若要端酒，哪一杯都能端，喝得慢些就是了。"] },
          { show: { active: "left" }, say: ["主角", "我先讨一只空盏。那孩子才从水边回来，咱们看过石路，便给他留一席。"] },
          { nar: "张三屈指推来一枚赏善铜牌，自己把酒端走半盏。你蹲下将铜牌贴到缆桩晚露的刻痕上，刻痕指向一条向内弯的沙脊。" },
          { show: { active: "right" }, say: ["张三", "岛上的客人受惊，是怕一去没了回来路。我这帖两面都能认，正面进洞，反面出来。"] },
          { nar: "话音方落，渡口一名手执竹尺的争帖悍客横步拦在桩前，冷笑道：「想领赏善铜牌，先过我横江尺这一关！」" },
          { battle: "rare_bamboo_ruler", healBetween: 0.35, winReward: { exp: 175, gold: 110 }, winNar: "你拆开竹尺重势将其震退半丈，张三抚掌一笑，将酒葫芦朝你一举！" },
          { show: { left: hero, right: elder, active: "right" }, nar: "你将空盏扣在桩顶，给后到者留一个低潮记号。张三等酒面平下来才松手，连盏边的酒珠也没滴在路上。" },
          { choice: [
            { text: "【让人自决】说清来回路线，把赏善帖留给同去者各照一眼", effect: { moral: 9, exp: 155, setFlag: "xia_ep3_done" }, reply: ["张三", "帖子出去得只够一叶，回来的路却宽。你领得好。"] },
            { text: "【争头一帖】换走先行路牌，借紧俏的座位赚船钱", effect: { moral: -8, exp: 130, gold: 200, setFlag: "xia_ep3_done", setFlag2: "xia_first_passage" }, reply: ["主角", "满盏的可以等我回来再喝。趁路宽，我要先到石门。"] }
          ] }
        ]
      },
      {
        id: "xia_ep4",
        title: "第四幕 · 石壁忘字",
        hint: "到「东海桃花岛 · 潮音石室」，同石破天参看石壁古诗。",
        reqFlag: "xia_ep3_done",
        trigger: { region: "taohua", room: "th_stone", npc: "shi_potian" },
        steps: [
          { nar: "石破天蹲在石壁底下，掌心贴在最后一个字上。你按石洞深浅添了一勺水，几行浅痕同时亮起来，把他的指尖照出一圈冷光。" },
          { show: { left: hero, right: shi, active: "right" }, say: ["石破天", "他们讲了半晌，每个人指的那个字都不同。我看第一撇像只脚，这便跟着走了两步。"] },
          { ifFlag: "xia_first_passage", say: ["石破天", "有人说头一帖才准先走，我请他们站高一块石头看。他们挤着等，板子反倒给潮水推过来了。"] },
          { unlessFlag: "xia_first_passage", say: ["石破天", "张三哥把你留的铜牌给每个人看了。方才有两位送木板回来，等水再低些，咱们便一块儿过去。"] },
          { show: { active: "left" }, say: ["主角", "退半步让我看看。你迈出去时，靠最远的一列石眼是不是自己通了？"] },
          { nar: "少年照说的退一步，石眼里涌出一线潮水。你横过木板接住浮起的匣子，匣底还压着抄壁人忘记取走的最后一页。" },
          { show: { active: "right" }, say: ["石破天", "怪了，就是那一脚我不大明白。那本《侠客行》借你读罢。我再过一趟水，不劳人教字。"] },
          { nar: "他把手从字上挪开，字眼的光很快暗了。你抽走木板翻出匣手，读书的人此时才想起让出下山的洞口。" },
          { choice: [
            { text: "【与众同看】留好水线，让后来人自己走一遍，携天书下山", effect: { moral: 12, exp: 385, tianshu: "xia", item: "dahuandan", setFlag: "xia_completed" }, reply: ["石破天", "那人脚小，你留一块板给他。我们看得见的地方，他也会看见。"] },
            { text: "【藏起石缺】带走匣中拓本和天书，出售看石壁的捷径", effect: { moral: -9, exp: 320, tianshu: "xia", gold: 440, setFlag: "xia_completed", setFlag2: "xia_private_rubbing" }, reply: ["石破天", "给你罢。潮水什么时候来，还是由不得我们开价。"] }
          ] }
        ]
      }
    ]
  });
})(window);


/* ===== data/quests/ts_yi.js ===== */
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


/* ===== data/quests/ts_bi.js ===== */
(function (root) {
  "use strict";
  const JY = root.JY;
  const hero = "assets/hero-portrait.webp";
  const elder = "assets/npc-hermit.webp";
  const yuan = "assets/foe-master.webp";
  const wen = "assets/npc-heroine.webp";

  JY.registerQuest("ts_bi", {
    title: "碧血剑 · 蛇钩旧字",
    tianshuId: "bi",
    summary: "武当南岩揭出一片残剑拓痕。与袁承志、温青青和何红药逐层核对金蛇郎君的遗物。",
    episodes: [
      {
        id: "bi_ep1",
        title: "第一幕 · 南岩揭纸",
        hint: "到「武当山 · 南岩挂剑台」，与守廊道人查看壁上暗痕。",
        trigger: { region: "wudang", room: "wd_nanyan", npc: "old_swordkeeper" },
        steps: [
          { nar: "你扶住被山风掀起的油纸，守廊道人用湿帚按平另一角。底下原有一道浅槽，全长不过一尺，末梢却分成了三尖。" },
          { show: { left: hero, right: "assets/npc-taoist.webp", active: "right" }, say: ["守廊道人", "昨日有人说是镇殿的剑，伸手要把它凿出来。石槽够浅，倒够把凿剑人的脸都照清。"] },
          { show: { active: "left" }, say: ["主角", "剑尖曲向侧面。若真是一口金蛇剑，凿石头不如先问认得它的人。"] },
          { nar: "道人扳动半块砖，你以袍襟兜住滑出的铜拓。他换手托砖，你便看见红绳上夹着一只写有华山的旧信封。" },
          { show: { active: "right" }, say: ["守廊道人", "袁少侠前日替老人家送信，上崖时腰间正有一把剑。把这信递还给他，再看他肯不肯扶你过石眼。"] },
          { nar: "你捻开裹拓的红绳，道人将砖推回暗槽。砖角蹭下一层石粉，沾在铜拓尾端，显出一枚短蛇的眼。" },
          { choice: [
            { text: "【守印归信】封好石槽，携旧信上华山逐一核实", effect: { moral: 8, exp: 120, setFlag: "bi_ep1_done" }, reply: ["守廊道人", "把他原来的信给他，我这里便只剩一阵风。"] },
            { text: "【拓印待价】留下空纸迷惑寻宝人，收存真拓与信封", effect: { moral: -7, exp: 100, gold: 130, setFlag: "bi_ep1_done", setFlag2: "bi_kept_impression" }, reply: ["主角", "等他们在石下再挖一层，我与认剑的人谈完也不迟。"] }
          ] }
        ]
      },
      {
        id: "bi_ep2",
        title: "第二幕 · 崖上验钩",
        hint: "前往「华山 · 思过崖」，请袁承志用剑验看铜拓。",
        reqFlag: "bi_ep1_done",
        trigger: { region: "huashan", room: "hs_siguoya", npc: "yuan_chengzhi" },
        steps: [
          { nar: "袁承志把金蛇剑用布托住，剑尖不肯安安稳稳平躺，总朝石面翘起。你垫了两枚碎瓦，铜拓才能紧挨剑身，不被钩棱挑远。" },
          { show: { left: hero, right: yuan, active: "right" }, say: ["袁承志", "真剑在这一处缺了针尖大的一点。铜上的蛇眼比它全，这拓本倒比我见着的剑还老。"] },
          { show: { active: "left" }, say: ["主角", "蛇眼底下有个温字。拓它时，剑是为一个人留下，还是为一家人留下？"] },
          { nar: "袁承志把布朝里折，裹进半截刃，换一手从剑鞘底摸出一截女式旧带。你将带结横过铜片，缺针尖的那处刚好顶在一个「青」字旁。" },
          { ifMate: "linghu", show: { left: "assets/mate-linghu.webp", active: "left" }, say: ["令狐冲", "这眼比华山的石眼还小，偏藏得住许多麻烦。袁兄若要下崖，我请你喝杯看不见蛇的酒。"] },
          { show: { left: hero, active: "right" }, say: ["袁承志", "先去西市找青青。隔着剑说话容易听岔，带子还她，让她来认。"] },
          { nar: "你把拓印塞回信封。袁承志抬手让你先过最窄一段，剑钩勾住信封封线，替你截下了那根被石缝拉住的丝。" },
          { choice: [
            { text: "【护旧物】依袁承志所请，只把带结和印迹交还温青青", effect: { moral: 8, exp: 150, aff: { linghu: 6 }, setFlag: "bi_ep2_done" }, reply: ["袁承志", "她见到这条带，自会把话说完。剑留在我这里便好。"] },
            { text: "【收剑谱短抄】用真拓换取金蛇剑势的图样，再带旧物赴西市", effect: { moral: -7, exp: 125, item: "ore_iron", setFlag: "bi_ep2_done", setFlag2: "bi_snake_copy" }, reply: ["主角", "图我卷上了。旧带另裹一层，等见到肯认它的人再拆。"] }
          ] }
        ]
      },
      {
        id: "bi_ep3",
        title: "第三幕 · 青带两结",
        hint: "前往「长安城 · 西市胡商街」，将金蛇旧带交给温青青。",
        reqFlag: "bi_ep2_done",
        trigger: { region: "changan", room: "ca_market", npc: "wen_qingqing" },
        steps: [
          { nar: "温青青抽去带结里一根旧丝，再拉出几根新丝。你替她捉住散落的一端，只见带面有两处极近的灼痕，一深一浅。" },
          { show: { left: hero, right: wen, active: "right" }, say: ["温青青", "爹每回折带都折两道。姓温的人只学过一道，便敢指着它说他欠了本家一口剑。"] },
          { show: { active: "left" }, say: ["主角", "深印与铜拓同岁。另一头似乎留着谁的短签，倒像只拆开了一半。"] },
          { nar: "她把青带覆在市口铜灯上，浅印旁渐露出「红药」两笔。你托着带边不使它卷过火口，另有一纸从夹里滑到她鞋尖。" },
          { show: { active: "right" }, say: ["温青青", "她也该认一认这张旧纸。去南岩给她看，你别先说我肯原谅谁。"] },
          { nar: "你把纸摊到板凳上，温青青用签首点住信上日期，她另一只手将两处带结重新系好。" },
          { choice: [
            { text: "【炼丹 Lv2】辨出旧药斑的先后，原封存证送往南岩", reqLife: { alchemy: 2 }, effect: { moral: 10, exp: 185, item: "herb_ginseng", setFlag: "bi_ep3_done" }, reply: ["温青青", "先后你说得清，便别替他们去写该相恨多久。"] },
            { text: "【请两家见面】留好青带折痕，带信找何红药当面核对", effect: { moral: 8, exp: 150, setFlag: "bi_ep3_done" }, reply: ["温青青", "信尾别沾油。我娘当年收它时，怕字洇，放了三层布。"] },
            { text: "【以名换宝】留信尾副本，向温家索回保存遗物的银两", effect: { moral: -8, exp: 125, gold: 195, setFlag: "bi_ep3_done", setFlag2: "bi_wen_bargain" }, reply: ["温青青", "你真要拿姓字压价，出去压，莫压在我爹那一笔上。"] }
          ] }
        ]
      },
      {
        id: "bi_ep4",
        title: "第四幕 · 何人留字",
        hint: "返回「武当山 · 南岩挂剑台」，把署名信件交给何红药。",
        reqFlag: "bi_ep3_done",
        trigger: { region: "wudang", room: "wd_nanyan", npc: "he_hongyao" },
        steps: [
          { nar: "何红药将信贴在廊柱上，先按住「红」字，才往下读。你用掌背挡住风，纸仍从她指下抖出一寸，露出与铜拓同形的钩角。" },
          { show: { left: hero, right: elder, active: "right" }, say: ["何红药", "当年他写字也这样，前一笔直，后一笔躲开去。那时我只当他怕墨沾手。"] },
          { ifFlag: "bi_wen_bargain", say: ["何红药", "温家先递来半张纸，要我认。他们说你把有姓名的那半留在了市口，我只好亲自来认全。"] },
          { unlessFlag: "bi_wen_bargain", say: ["何红药", "青青自己叫人送信，说原本在你手里。她既没替我烧掉，我也不叫你替我藏一笔。"] },
          { show: { right: yuan, active: "right" }, say: ["袁承志", "剑在此。你要砸，先容我卸下剑鞘，鞘里还有姑娘家要带回去的物事。"] },
          { nar: "何红药以铜拓套住剑钩，钩尾一挑，石槽侧面应声露出一道窄缝。你伸手托住掉出的布包，布上另缝了一张字条。" },
          { nar: "陡听廊外双鞘撞响，一名尾随窥伺金蛇遗宝的双鞘悍客纵身扑入挂剑台，伸爪便夺布包！" },
          { battle: "rare_copper_sheath", healBetween: 0.35, winReward: { exp: 195, gold: 130 }, winNar: "你与袁承志剑掌相合震退夺宝悍客，稳稳护住金蛇遗包！" },
          { show: { left: hero, active: "left" }, say: ["主角", "旧剑归剑。包里是当年记下的往来和《碧血剑》，最末一页留了两行未填。"] },
          { nar: "她抽走那张缝条，把一半纸留在袁承志袖边；你从轻下来的布包里取书，抖出夹在封面里的几粒灰。" },
          { show: { right: elder, active: "right" }, say: ["何红药", "空行不必逼谁补。我把写过的认了，余下的请你自己收着。"] },
          { choice: [
            { text: "【遗物还人】归还青带与旧信，受天书与南岩护身宝甲", effect: { moral: 12, exp: 390, tianshu: "bi", legendary: "tiancan_armor", setFlag: "bi_completed" }, reply: ["袁承志", "替我把布包口留半寸。也许有人还想来，把自己的字放进去。"] },
            { text: "【留拓作价】用暗槽钥样向守廊人换银，携天书离去", effect: { moral: -9, exp: 330, tianshu: "bi", gold: 460, setFlag: "bi_completed", setFlag2: "bi_sold_slot" }, reply: ["何红药", "石头随你作价，旧信我带走。且看他们能从空槽里凿出甚么来。"] }
          ] }
        ]
      }
    ]
  });
})(window);


/* ===== data/quests/ts_yuan.js ===== */
(function (root) {
  "use strict";
  const JY = root.JY;
  const hero = "assets/hero-portrait.webp";
  const xiao = "assets/npc-heroine.webp";
  const yuan = "assets/foe-master.webp";
  const lin = "assets/foe-guardian.webp";

  JY.registerQuest("ts_yuan", {
    title: "鸳鸯刀 · 双刀开席",
    tianshuId: "yuan",
    summary: "一口鸯刀令山道四侠争不清包袱，顺着失物到客栈试一回夫妻刀法，再回金顶让双刀照面。",
    episodes: [
      {
        id: "yuan_ep1",
        title: "第一幕 · 单刀偏袋",
        hint: "前往「峨眉山 · 金顶正殿」，替萧中慧整理带往寿席的刀袋。",
        trigger: { region: "emei", room: "emei_hall", npc: "xiao_zhonghui" },
        steps: [
          { nar: "萧中慧将刀袋往肩上一提，袋口便歪到右手。你托住左角，抖出两把旧穗和一张写着寿字的请帖，刀只响了一声。" },
          { show: { left: hero, right: xiao, active: "right" }, say: ["萧中慧", "我提了三次，它回回只响一声。刀少了一口，偷刀的人倒不晓得把另一把穗也带走。"] },
          { show: { active: "left" }, say: ["主角", "看左边的扣。线是扯开的，还夹着一枚官道茶摊的竹签。"] },
          { nar: "她挑指将单刀从袋中推出半寸，刃槽内果然还嵌着一股断线。你把竹签抵过去，签尾有几道涂乱的指印。" },
          { show: { active: "right" }, say: ["萧中慧", "出门让我撞着四位大侠，他们一人抢了一下袋子。你先找那个肯跟他们讲理的袁书生，他手比四个都多一只。"] },
          { nar: "你把寿帖移到袋外，顺势系回一把刀穗。萧中慧把空出的左袋束紧，试着原地转身，袋子这一次没撞上供案。" },
          { choice: [
            { text: "【替寿客找刀】只携竹签出门，替萧中慧留住单刀", effect: { moral: 8, exp: 120, setFlag: "yuan_ep1_done" }, reply: ["萧中慧", "先问谁的包袱，后问是谁的刀。可别学那四位先争谁最大。"] },
            { text: "【收一笔寻刀钱】用请帖作保议定赏银，再拿竹签去官道", effect: { moral: -6, exp: 95, gold: 130, setFlag: "yuan_ep1_done", setFlag2: "yuan_search_fee" }, reply: ["萧中慧", "这银子算你我约好的。四位大侠若再凑一份，你须照收四人四回谢。"] }
          ] }
        ]
      },
      {
        id: "yuan_ep2",
        title: "第二幕 · 四手争一包",
        hint: "前往「襄阳城外 · 官道荒亭」，帮袁冠南解开太岳四侠争抢的包袱。",
        reqFlag: "yuan_ep1_done",
        trigger: { region: "chengwai", room: "cw_road", npc: "yuan_guannan" },
        steps: [
          { nar: "袁冠南托着包袱底，四只手分别扯住包角。你把竹签横在捆绳下，赌物未开谁也不得伸手，四人这才各退半步。" },
          { show: { left: hero, right: yuan, active: "right" }, say: ["袁冠南", "他们说谁扯得紧便是谁的。在下托的是底，倘若在下撤手，该是谁的先着地？"] },
          { show: { active: "left" }, say: ["主角", "先撤手的替余人端茶。我数三声，怎么都不许它沾地。"] },
          { nar: "第三声还没数完，四个人已一齐放开。你赶紧伸臂一捞，袁冠南用胳膊夹住脱绳的刀鞘，包角上却翻出一对缝歪了的双喜字。" },
          { ifMate: "tianbg", show: { left: "assets/mate-tianbg.webp", active: "left" }, say: ["田伯光", "四个人不如一根绳，绳还晓得往一处扯呢。要我说，头一位付茶钱，后三位跑堂。"] },
          { show: { left: hero, active: "right" }, say: ["袁冠南", "这倒省了一桌争先。福来客栈有对夫妇认得双喜下的刀结，烦请带鞘去讨教。"] },
          { nar: "你把空包铺平，逐一将四角交回各人手里。袁冠南收走缝歪的双喜，给你留下一枚系着红线的鞘环。" },
          { choice: [
            { text: "【公公平平】让四人各验包角才收鞘，持红线赴福来客栈", effect: { moral: 8, exp: 150, setFlag: "yuan_ep2_done" }, reply: ["袁冠南", "包袱空了，四位总不会分出四口刀。多谢少侠托底。"] },
            { text: "【开价竞认】收四人认领钱，拿走他们都说不清来历的刀鞘", effect: { moral: -8, exp: 125, gold: 180, setFlag: "yuan_ep2_done", setFlag2: "yuan_four_claims" }, reply: ["袁冠南", "据说四位是拜过把子的，不知回去时还剩几个把子。"] }
          ] }
        ]
      },
      {
        id: "yuan_ep3",
        title: "第三幕 · 掌勺学合刀",
        hint: "到「悦来镇 · 福来客栈」，请林玉龙与任飞燕辨认双喜刀结。",
        reqFlag: "yuan_ep2_done",
        trigger: { region: "yuelai", room: "yl_inn", npc: "lin_yulong" },
        steps: [
          { nar: "林玉龙抡着木勺从灶边跨出，任飞燕一手托锅一手推他的肩。你把刀鞘举到与锅沿齐平，木勺歪了一寸，竟顺着鞘口滑过来。" },
          { show: { left: hero, right: lin, active: "right" }, say: ["林玉龙", "她头一招比我急，第二招却要我等。少侠评评，我是不是该把这一勺先下锅？"] },
          { show: { right: xiao, active: "right" }, say: ["任飞燕", "等我把锅挪正！你那一勺倒进来，我先接住的是你的袖子。"] },
          { nar: "你挪开灶边火砖，给二人脚下再腾半步。勺口一转，锅沿向里一收，汤稳稳落在中央，刀鞘上的红扣也被同一回劲拨开。" },
          { show: { active: "left" }, say: ["主角", "原来一人先让半步，才有第二个人的刀能出鞘。请把这叶双喜叠上去，再试一回。"] },
          { nar: "任飞燕把锅轻轻放平，两人以勺柄夹起红结。你顺着被抻直的两股线，抽出一张落款萧半和的寿席补帖。" },
          { show: { right: lin, active: "right" }, say: ["林玉龙", "人家请的是一双客。你带着两样东西回金顶罢。我这一勺出不得灶门，她说还少了半把盐。"] },
          { choice: [
            { text: "【烹饪 Lv2】配合二人收锅走步，端一份合做的寿礼登金顶", reqLife: { cook: 2 }, effect: { moral: 11, exp: 190, item: "dish_chicken", setFlag: "yuan_ep3_done" }, reply: ["任飞燕", "你会掌灶，倒省我教一个人让开另一个人。汤留半锅，给他们再学。"] },
            { text: "【留步成双】依两人的步子解扣，带补帖赴寿宴", effect: { moral: 8, exp: 155, setFlag: "yuan_ep3_done" }, reply: ["林玉龙", "我等了她这半步，成了。她再叫我等，可也要告诉我等到几时。"] },
            { text: "【收钱授半招】拿席间的演刀帖换银，自己独领金顶补帖", effect: { moral: -8, exp: 125, gold: 200, setFlag: "yuan_ep3_done", setFlag2: "yuan_half_form" }, reply: ["任飞燕", "你只教出去半招，也只收半份钱罢。另一半叫他们找下一双手。"] }
          ] }
        ]
      },
      {
        id: "yuan_ep4",
        title: "第四幕 · 四字满堂",
        hint: "返回「峨眉山 · 金顶正殿」，把刀鞘与寿帖交给萧半和。",
        reqFlag: "yuan_ep3_done",
        trigger: { region: "emei", room: "emei_hall", npc: "xiao_banhe" },
        steps: [
          { nar: "萧半和把主座往旁边拉开，袁冠南与萧中慧各放一刀在桌上。你拨去两把刀上缠成一团的红穗，四处阴刻分在不同位置。" },
          { show: { left: hero, right: yuan, active: "right" }, say: ["萧半和", "有人搬一口刀回去，觉得赶明儿能成天下第一。把这两口翻齐，且看他愿不愿意认这四个字。"] },
          { ifFlag: "yuan_half_form", say: ["萧半和", "宾客里有三位买了你的半招，席还没开，半张桌子已经让他们挪走了。待会儿教他们一道抬回来。"] },
          { unlessFlag: "yuan_half_form", say: ["萧半和", "林贤弟让人把寿礼送到，递盒的时候夫妻两个各让了一步。三位寿客在桌旁学到如今，还没有撞着头。"] },
          { show: { right: xiao, active: "right" }, say: ["萧中慧", "我的刀先翻了一半。袁相公，当心刀背，桌上还摆着我今天最想吃的那碟菜。"] },
          { nar: "你把菜碟拨远一寸，两把刀由各自的主人翻过来。茶水照进阴刻，先是「仁者」，随后两字随桌面亮作「无敌」。" },
          { show: { active: "left" }, say: ["主角", "桌上本凑不齐四个字。你们肯挪开两个座，就放得下两把刀。"] },
          { nar: "萧半和拍松寿礼木盒，案后递来一卷《鸳鸯刀》。你刚解一扣，两把穗已被萧中慧并起来，系在给寿客开着的门上。" },
          { show: { right: yuan, active: "right" }, say: ["萧半和", "书给你，菜给她。坐一桌才叫寿席，别又用这本书抢头一个座。"] },
          { choice: [
            { text: "【留刀同席】把双刀留还两人，领天书和寿礼", effect: { moral: 12, exp: 370, tianshu: "yuan", item: "dish_yudi", setFlag: "yuan_completed" }, reply: ["萧中慧", "菜我留了一筷子，刀你留了一双。赶明儿再遇着，咱们换一道菜吃。"] },
            { text: "【卖字走刀】卖双刀字样给寿客，持谢银与天书下山", effect: { moral: -9, exp: 310, tianshu: "yuan", gold: 420, setFlag: "yuan_completed", setFlag2: "yuan_sold_motto" }, reply: ["萧半和", "买字的人今儿也请坐下。等他们吃完，教他们把钱数清，把字另读一回。"] }
          ] }
        ]
      }
    ]
  });
})(window);


/* ===== data/stories/sanxiu_demo.js ===== */
/* =====================================================================
   山河十四卷 v1.0 · 示范剧情包：江湖散修专属长线 + 聚贤庄乔峰风波
   本文件同时作为「外包包 C（八大门派/散修/12同道红颜深剧情）」的黄金范本
   ===================================================================== */
(function (root) {
  "use strict";
  const JY = root.JY;

  // 江湖散修专属 3 幕立绘长线（不加入门派也能走出的独立主角传奇）
  JY.registerQuest("sanxiu_arc", {
    title: "江湖散修 · 无名残页血案",
    summary: "不依附八大门派，以天地为师！从悦来茶楼残页奇闻起步，勇闯乱葬古碑悟散手绝艺，终得隐世高人指点重剑无锋之道。",
    episodes: [
      {
        id: "san_ep1",
        title: "散修第一幕 · 天地为师",
        hint: "在「悦来镇 · 悦来茶楼」与百晓生谈论江湖散修之道",
        trigger: { region: "yuelai", room: "yl_teahouse", npc: "baixiaosheng" },
        steps: [
          { show: { left: "assets/hero-portrait.webp", right: "assets/npc-baixiaosheng.webp", active: "right" },
            say: ["百晓生", "哈哈，看你这身打扮，是不打算受名门清规戒律束缚、想做个逍遥江湖的「散修」罢？"] },
          { show: { left: "assets/hero-portrait.webp", right: "assets/npc-baixiaosheng.webp", active: "left" },
            say: ["主角", "名门武学虽成体系，但未免门户之见太深。我倒想凭一双脚走遍天下，集百家奇遇于一身！"] },
          { show: { left: "assets/hero-portrait.webp", right: "assets/npc-baixiaosheng.webp", active: "right" },
            say: ["百晓生", "有志气！百年前「剑魔」与「黄裳」皆是散修成道。城外乱葬古碑下近来有奇人现身，去拜会一番，定有大机缘！"] },
          { choice: [
              { text: "【潜心问道】多谢前辈指点，我这便去乱葬古碑寻访奇人！",
                effect: { exp: 90, gold: 60, item: "dan_chongmai", setFlag: "sanxiu_ep1_done" },
                reply: ["百晓生", "这颗「冲脉丹」赠你护身，莫忘了在「武学与经脉」里打通第一重穴位！"] }
            ] }
        ]
      },
      {
        id: "san_ep2",
        title: "散修第二幕 · 古碑悟散手",
        hint: "前往「襄阳城外 · 乱葬古碑」拜见隐世奇人",
        reqFlag: "sanxiu_ep1_done",
        trigger: { region: "chengwai", room: "cw_stele", npc: "hermit_stele" },
        steps: [
          { nar: "古碑前落叶无风自旋，一名枯瘦老僧正以竹帚在青石地上划出玄妙轨迹，竟暗合「破甲、点穴、闪身」三大散手奥义。" },
          { show: { left: "assets/hero-portrait.webp", right: "assets/npc-hermit.webp", active: "right" },
            say: ["隐世奇人", "阿弥陀佛。门派弟子按部就班，散修却须融会贯通——老衲考你一问：遇敌横练铁壁、又蓄杀招时，当如何应对？"] },
          { choice: [
              { text: "「破甲碎其铁壁，点穴截其蓄力，借连携一击破之！」",
                effect: { exp: 160, attr: { int: 1, luck: 1 }, skill: "kongming", setFlag: "sanxiu_ep2_done" },
                reply: ["隐世奇人", "善哉！孺子可教！这门至柔至空的「空明拳」便传于你，今后还可向老衲请教弹指神通与玄铁剑法！"] },
              { text: "「管他什么花哨架势，我自一力降十会硬劈过去！」",
                effect: { exp: 130, attr: { str: 2 }, skill: "tiesha", setFlag: "sanxiu_ep2_done" },
                reply: ["隐世奇人", "倒也痛快！既然偏爱刚猛毒辣，这路「铁砂掌」拿去防身罢。"] }
            ] }
        ]
      },
      {
        id: "san_ep3",
        title: "散修第三幕 · 重剑问道",
        hint: "击败黑风寨大当家或修为渐成后，再赴「乱葬古碑」向隐世奇人问道",
        reqFlag: "sanxiu_ep2_done",
        trigger: { region: "chengwai", room: "cw_stele", npc: "hermit_stele" },
        steps: [
          { show: { left: "assets/hero-portrait.webp", right: "assets/npc-hermit.webp", active: "right" },
            say: ["隐世奇人", "你气息比初见时沉稳许多，已颇具散修宗师气象。古碑后藏着一缕昔年剑魔遗意，且接老衲三成内力试手罢！"] },
          { battle: "bandit_boss", onWinFlag: "sanxiu_ep3_done",
            winNar: "你以散手连携大破强敌，隐世奇人抚掌大笑，赠你天外寒铁两块与《重剑心得》，从此可在铁匠铺重铸「玄铁重剑」并请教绝学「玄铁剑法」！",
            winReward: { exp: 320, gold: 200, item: "ore_xuantie" } }
        ]
      }
    ]
  });

  // 聚贤庄 · 乔峰豪饮示范剧情（展现重大分支后果）
  JY.registerQuest("juxian_story", {
    title: "天龙前奏 · 聚贤庄义酒",
    summary: "聚贤庄百雄环伺，你是与乔峰共饮绝交酒力战群雄，还是袖手旁观？",
    episodes: [
      {
        id: "jx_ep1",
        title: "聚贤庄 · 义薄云天",
        hint: "前往「聚贤庄 · 聚贤演武厅」寻乔峰",
        trigger: { region: "juxian", room: "juxian_hall", npc: "qiaofeng" },
        steps: [
          { nar: "演武厅中百名武林高手手按兵刃，将乔峰团团围住。乔峰却仰天大笑，连干三碗烈酒，目光如电扫过全场！" },
          { show: { left: "assets/hero-portrait.webp", right: "assets/mate-qiaofeng.webp", active: "right" },
            say: ["乔峰", "这位小兄弟面善得很！今日聚贤庄杀机四伏，你若要与乔某喝绝交酒，便请上来干了这一碗！"] },
          { choice: [
              { text: "【豪气干云】「我敬乔帮主是大英雄！这碗不是绝交酒，是生死酒！」",
                effect: { moral: 15, exp: 200, recruit: "qiaofeng", aff: { qiaofeng: 35 }, setFlag: "juxian_sided_qiao" },
                battle: "juxian_elite",
                winNar: "你与乔峰并肩击退聚贤庄悍客！乔峰虎目含泪大笑：「好兄弟！从此天涯海角，乔某这条命便是你的！」（乔峰已加入同道！）" },
              { text: "【明哲保身】拱手退开，不愿与天下正道为敌。",
                effect: { moral: -5, exp: 90, gold: 120, setFlag: "juxian_neutral" },
                reply: ["乔峰", "（淡然一笑）人各有志，乔某绝不勉强。保重！"] }
            ] }
        ]
      }
    ]
  });
})(window);


/* ===== data/stories/sects_long.js ===== */
/* 山河十四卷 v1.0 · 八大门派师门长卷与江湖散修后续 */
(function (root) {
  "use strict";
  const JY = root.JY;

  function cast(name, art = "assets/foe-master.webp") {
    return {
      say: (text) => ({ show: { right: art, active: "right" }, say: [name, text] }),
      reply: (text) => [name, text]
    };
  }

  function hero(text) {
    return { show: { active: "left" }, say: ["主角", text] };
  }

  function scene(regionId, ...roomIds) {
    const region = JY.REGIONS[regionId];
    return { region: regionId, room: roomIds.find(id => region.rooms[id]) || region.entry };
  }

  function locationHint(trigger, activity) {
    const region = JY.REGIONS_META[trigger.region];
    const room = JY.REGIONS[trigger.region].rooms[trigger.room];
    return `到「${region.name} · ${room.name}」${activity}`;
  }

  function registerSect(sect, title, summary, episodes) {
    const phases = ["trial", "tournament", "crisis"];
    JY.registerQuest("sect_arc_" + sect, {
      title,
      summary,
      episodes: episodes.map((episode, index) => ({
        id: `${sect}_${phases[index]}`,
        reqSect: sect,
        ...(index > 0 ? { reqFlag: `${sect}_${phases[index - 1]}_played` } : {}),
        ...episode,
        hint: locationHint(episode.trigger, episode.hint)
      }))
    });
  }

  const huicheng = cast("慧澄", "assets/npc-monk.webp");
  registerSect("shaolin", "少林长卷 · 空匣满山", "从一只漏雨的米斗追查藏经阁空匣失踪的真相，决定寺里如何保住冬粮。", [
    {
      title: "入门试炼 · 借米问心",
      trigger: scene("songshan"),
      hint: "接受慧澄的试炼。",
      steps: [
        huicheng.say("今日头一门功课，替粥棚补上缺的三斗米。库房钥匙在我这里，谁开口借，都要记名字。"),
        hero("山门外已经排了十几个人。再把他们挨个问一遍，今晨这顿就要过了。"),
        huicheng.say("昨日也有人这么说，今日库里少了一袋，谁都道没见过。急着开门容易，关门以后呢？"),
        hero("地上这道白线从库门一直到柴房。那袋米也许是被拖走的。"),
        huicheng.say("近前看，白线是裂底漏下来的，柴房里也果然有半袋。拿走它的人还知道搁一只干斗在底下。"),
        hero("半袋还能煮，剩的就要借。若在账上只写我一个，往后追问也只该找我。"),
        huicheng.say("写你一个，丢米的人也就藏进了你名字底下。可以先看米袋，也可以把这锅粥先端出去。"),
        hero("鼓还没响。今日第一笔账，我得知道自己在替谁记。"),
        { choice: [
          { text: "先补粥棚，再以自己的名义立一笔限期查补的账", effect: { moral: 4, exp: 180, skill: "luohan", setFlag: "shaolin_pledged_rice" }, reply: huicheng.reply("你肯签名，老衲便在底下添自己的。明早天冷，煮粥时先把斗烘干。") },
          { text: "查清漏米的缘故，把余粮另装一袋再启仓", effect: { exp: 200, gold: 80, skill: "luohan" }, reply: huicheng.reply("记下袋口这道横针线。米袋是从藏经阁搬出来的，库房自己的袋子都缝直针。") }
        ] }
      ]
    },
    {
      title: "门派大比 · 木人巷一袋米",
      trigger: scene("songshan", "ss_wood", "songshan_inner"),
      hint: "参加木人巷大比。",
      steps: [
        huicheng.say("木人巷改了规矩。背袋米过关，米少一撮，纵打脱七具木人的胳膊也得判负。"),
        hero("巷道干了大半，唯独第三具木人底下有一片新米糠。"),
        huicheng.say("昨夜寺里没动过木人。你可踏着前四名的步子过去，也可验一验那块脚板。"),
        hero("踩下便有人看见脚板升降。若拆开来查，比赛的锣就过了。"),
        { ...huicheng.say("你那笔账还没结。粥棚的人今晨捡到几根断针，针孔跟米袋上的横线一样细。"), ifFlag: "shaolin_pledged_rice" },
        { ...huicheng.say("你留下的破袋我带来了。木人缝里也卡着这色麻线，两处兴许是同一把针。"), unlessFlag: "shaolin_pledged_rice" },
        hero("有人在比赛里再借一袋米，败者只会以为自己走得不稳。"),
        huicheng.say("前头的人过了，锣让我拦住了。你打算同哪一边的人一起看清楚？"),
        hero("我想让他们亲手量袋。米粒进了谁家仓，木人不会开口。"),
        { choice: [
          { text: "请落败弟子共同拆验脚板，当众更正大比结果", effect: { moral: 3, exp: 320, item: "dan_chongmai", setFlag: "shaolin_open_hearing" }, reply: huicheng.reply("明日藏经阁开门，你请这些弟子也来。米斗交给他们执。") },
          { text: "保留原封麻袋，记下脚板异响后照常走完大比", effect: { exp: 280, gold: 180, item: "dahuandan" }, reply: huicheng.reply("我记下你这一趟的足音，明日当着库僧的面再走。") }
        ] }
      ]
    },
    {
      title: "师门危机 · 藏经阁空匣",
      trigger: scene("songshan", "ss_library", "songshan_inner"),
      hint: "查问藏经阁空匣。",
      steps: [
        huicheng.say("天快亮时，阁里一口书箱让人抬走了。里头搁的原是空匣，借米的账夹在隔板里。"),
        hero("箱脚的铜包角裂了一枚，地上每隔三步便有弧痕。抬箱的人还没走远。"),
        { ...huicheng.say("昨晚那几名落败弟子替我们守着运粮门，把箱拦下了。他们只等亲眼看账。"), ifFlag: "shaolin_open_hearing" },
        { ...huicheng.say("我和库僧验过木板，押运的掌柜吃了惊，今晨雇黑风寨的人到寺外抢箱。"), unlessFlag: "shaolin_open_hearing" },
        hero("账里有粥棚领米人的名字。真要开匣，先把他们的名帖取出来。"),
        huicheng.say("那掌柜卖过庙里的米，买来的却是他病儿的药。这个缘故也要留下，省得他明年还是只能偷。"),
        hero("把他每次出米的数目和药钱留下。让领米人来辨账之前，先给病孩子一顿饭。"),
        huicheng.say("留账归留账。那三斗米往后三个月怎样补，今夜就得有人守着第一车走回来。"),
        hero("我去库门等车，寺外若有人拦，我也等在那里。"),
        { ifFlag: "shaolin_open_hearing", choice: [
          { text: "与大比同门共验借米账，按议定份额追回冬粮", effect: { exp: 520, moral: 6, skill: "yijinjing", item: "dahuandan" }, reply: huicheng.reply("第一车回来了。易筋一篇我抄在清账的背后，墨没干，你拿平些。") }
        ] },
        { unlessFlag: "shaolin_open_hearing", battle: "jiumozhi", winReward: { exp: 520, gold: 280, skill: "yijinjing" }, winNar: "你以少林禅功力挫趁乱闯阁的吐蕃国师鸠摩智，追回借米账并护住冬粮，慧澄将易筋经抄卷交到你手上。" }
      ]
    }
  ]);

  const yucen = cast("武当俞岑", "assets/npc-taoist.webp");
  registerSect("wudang", "武当长卷 · 云梯寿席", "守住风雨中的山道，择一条平常人也能走的路，赴一席百岁寿宴。", [
    {
      title: "入门试炼 · 紫霄问心",
      trigger: scene("wudang"),
      hint: "问俞岑入门功课。",
      steps: [
        yucen.say("试炼便在山门。今日挑灯上山，不许熄火，灯油能留几分全看你自己。"),
        hero("风从连廊底下卷上来。在灯外搭一层纱，火倒稳，提灯的人就看不见脚下了。"),
        yucen.say("山路尽头还住着一位盲了多年的贺伯。天晚了，他听这儿的铜灯摇响认门。"),
        hero("灯底的铜铃有一道缺口，只有崖边那段会响。风把旧灯吹倒了？"),
        yucen.say("昨日有人取去桥栏的一枚楔子做寿礼，桥索松了，灯也倾向山下。"),
        hero("灯须上山，桥还得有人走。难道宫里只有一盏灯？"),
        yucen.say("师兄们等着看你轻功，贺伯等着一声响。你可教他们一起搬灯，也可自己先到对岸挂铃。"),
        hero("好，等贺伯过了桥，再问竹签上是谁的名次。"),
        { choice: [
          { text: "请同门结伴搬灯，沿途按次序换手护焰", effect: { exp: 210, item: "dan_chongmai", setFlag: "wudang_shared_lantern" }, reply: yucen.reply("手换了三双，火一直安稳。真武七截练的便是这口不断的气。") },
          { text: "轻身先过，替贺伯把铃挂到桥头扶手上", effect: { exp: 180, skill: "yanzi", attr: { agi: 1 } }, reply: yucen.reply("你收了掠廊的劲，铃响却半点未少。再上山，记得回头听一听。") }
        ] }
      ]
    },
    {
      title: "门派大比 · 真武七截护桥阵",
      trigger: scene("wudang", "wd_nanyan", "wudang_inner"),
      hint: "参加真武七截大比。",
      steps: [
        yucen.say("论阵那块石台，先借给山下来的轿夫。大比移到桥上，七人从对面往回走。"),
        hero("轿夫这双湿鞋像刚从河里捞出来。开锣时外山还无雪，怎么一眨眼都化成了水？"),
        yucen.say("上游泄了水。明日贺寿的客人还在路上，大比得顺便试出桥最多受得住几个人。"),
        { ...hero("昨晚提灯的人已认得换手顺序。照那个站法，就算有人跌脚也有同伴扶。"), ifFlag: "wudang_shared_lantern" },
        { ...hero("桥头那只铜铃一摇，崖面便有第二声回响。从对岸也能听出这里少了几人。"), unlessFlag: "wudang_shared_lantern" },
        yucen.say("阵眼可以留半步，也可以追求一式七响，那样七人都走得快些。"),
        hero("留半步，倒下的人有地方站。齐步过去，桥西的木栈道更早拿到药。"),
        yucen.say("两边都有你的同门。落子前想想明日上山的，还有走得动多快的人。"),
        hero("让每个人踏到该踏的那块桥板吧。最后一锣等人都到岸再敲。"),
        { choice: [
          { text: "留半步给风雨大的时候，改练逐人轮换护桥", effect: { moral: 3, exp: 330, skill: "taijiquan", setFlag: "wudang_reserved_step" }, reply: yucen.reply("缺了半步还能稳，这是太极劲。明日把慢的客人先接进来。") },
          { text: "让七人齐步通过，抢先把药送往桥西", effect: { exp: 380, skill: "tiyun" }, reply: yucen.reply("七步踏得像一步。桥西正好缺人手，明日你去迎寿客。") }
        ] }
      ]
    },
    {
      title: "师门危机 · 百岁寿席的大雨",
      trigger: scene("wudang", "wudang_inner"),
      hint: "赴百岁寿席。",
      steps: [
        yucen.say("寿钟只响了一声。贺寿的二十八家客人都堵在桥西，前头的人还扛了沉得动不了的礼箱。"),
        hero("等雨止也来不及了。桥上有人涉水往回走，看那步子是贺伯。"),
        { ...yucen.say("照你昨日留的半步，桥头已经接下来六个人。铃还在响，可以让他跟着走。"), ifFlag: "wudang_reserved_step" },
        { ...yucen.say("昨日送去的药保住了贺伯的腿。桥下水急，弟兄们可从山腰绕到他身后，再迎他下去。"), unlessFlag: "wudang_reserved_step" },
        hero("贺伯手上是一把寿面。他说自己煮的一锅，不来尝一口，今日便还算不上大寿。"),
        yucen.say("主桌少一把椅子就少一把。怕的是山西那些客人看见门关了，再往桥上挤。"),
        hero("在西岸也开席，先厚着脸皮把贺伯那锅面分了。礼箱搬开做席凳。"),
        yucen.say("寿星肯自己在檐下端一只碗。你先拿碗给抱孩子的人，他们下山这一身还是湿的。"),
        hero("等这阵雨歇了，咱们再一起把没响完的寿钟敲了。"),
        { ifFlag: "wudang_reserved_step", choice: [
          { text: "以护桥阵接住慢行客，在西岸分席", effect: { exp: 530, moral: 6, skill: "taijijian", item: "dahuandan" }, reply: yucen.reply("今日谁也没落在桥上。这一路太极剑，先学让身，再学递剑。") }
        ] },
        { unlessFlag: "wudang_reserved_step", battle: "cheng_kun", winReward: { exp: 560, gold: 260, skill: "taijijian", item: "dan_chongmai" }, winNar: "你于风雨木栈道上以柔克刚击退趁乱闯山窥探谢逊下落的混元霹雳手成昆，护住西岸百岁寿席，俞岑当场传授太极剑精要！" }
      ]
    }
  ]);

  const luyoujiao = cast("鲁有脚");
  const huangrong = cast("黄蓉", "assets/mate-huangrong.webp");
  registerSect("gaibang", "丐帮长卷 · 杏灯照旧约", "从襄阳施粥的错号追至旧杏林，在争执中决定一纸救济名册留在谁手里。", [
    {
      title: "入门试炼 · 巡城识三碗",
      trigger: scene("xiangyang", "xy_gaibang"),
      hint: "接鲁有脚的巡城差事。",
      steps: [
        luyoujiao.say("手里三只碗，城东城西城北各送一只。碗空着，回来时你说得出每只碗该盛几碗粥就行。"),
        hero("城东墙边同一户领了两只，问却各说各姓。是换了姓来冒领？"),
        luyoujiao.say("昨晚搬进来的是祖孙，老的从北城粥棚领碗，小的在城西织席，户牌还挂在原地。"),
        hero("两人都该吃。城北的碗也不能因此短一只，得给没来的人另留着。"),
        luyoujiao.say("留粥易，记号难。净衣派想写名字，污衣派习惯用竹筹，各有各的理。"),
        hero("竹筹扔了，也换得一只新的。写了姓，又怕有仇家认出来。"),
        luyoujiao.say("给对面两位执碗人准备同一个说法。下回帮会大比，拿它来试一试。"),
        hero("这三只碗我都送完了。胡同尽头还有人没上册，册子今天得留一行空字。"),
        { choice: [
          { text: "按巷补录旧户牌，请执碗人核对重名", effect: { exp: 230, gold: 70, setFlag: "gaibang_kept_names" }, reply: luyoujiao.reply("领粥人来验账时，只向他念自己那行。册子由我锁着。") },
          { text: "请各巷做有记号的竹筹，持筹领粥", effect: { exp: 180, moral: 4, item: "dish_chicken" }, reply: luyoujiao.reply("多余一根也封起来，不叫没领粥的人受屈。") }
        ] }
      ]
    },
    {
      title: "门派大比 · 君山传筹",
      trigger: scene("xiangyang", "xy_gaibang"),
      hint: "参加君山大比襄阳分场。",
      steps: [
        huangrong.say("咯咯，今年君山大比在各舵先验功课。咱们比接三根筹，谁能在喝完一碗粥前找齐人，谁就有彩头。"),
        hero("第一根筹丢在灯下，第二根在门闩后，第三根怎么让人削去了尾巴？"),
        huangrong.say("后厨送来的粥少了两桶。靖哥哥路过城北，见有人给外乡人换新筹，还收银钱。"),
        { ...hero("我有一册旧户牌，可以核对后来添上的人。那本册子还锁在鲁长老手里。"), ifFlag: "gaibang_kept_names" },
        { ...hero("各巷竹筹上有不同的缺口。这几根长得太齐整，都是同一把刀刻的。"), unlessFlag: "gaibang_kept_names" },
        huangrong.say("本姑娘能算出账从哪个柜子改过。想捉个现行，还要晓得何时有人去买筹。"),
        hero("若当街揭穿，掏钱买过筹的孩子往后就不敢来领了。"),
        huangrong.say("好耳力。听见他们捏着铜钱响了？本姑娘留了三根干净筹，给你定个章程。"),
        hero("粥先留着。过会儿不论谁先找到人，门都开半扇。"),
        { choice: [
          { text: "（烹饪 Lv2）从粥桶、火候与出锅时辰追认后厨缺额", reqLife: { cook: 2 }, effect: { exp: 320, skill: "dagou", item: "dish_yudi", setFlag: "gaibang_proved_kitchen" }, reply: huangrong.reply("盖子里水汽还热，是新煮的粥！原汤原簿在这儿，杏林那边要带上。") },
          { text: "把原筹交回巷里，让三个粥棚的伙计共同清点重开", effect: { moral: 4, exp: 300, item: "dan_chongmai", skill: "dagou" }, reply: huangrong.reply("三家都肯再开锅。有人写帖子邀他们到姑苏杏子林，咱们得带着旧筹去分个是非。") }
        ] }
      ]
    },
    {
      title: "师门危机 · 老杏林风波",
      trigger: scene("suzhou", "sz_xingzi", "suzhou_inner"),
      hint: "赴丐帮杏林之会。",
      steps: [
        luyoujiao.say("林子里埋了三十只灯，一家一盏。方才有人写我徇私，把帖子挂在最小的灯上。"),
        hero("写字的人认得我在巡城时放的空行。他兴许也有一户人没能领到粥。"),
        { ...luyoujiao.say("黄帮主把后厨验过的原汤送来了，这几位执灯人已认出换筹的是谁。"), ifFlag: "gaibang_proved_kitchen" },
        { ...luyoujiao.say("三个粥棚都来了。也有人雇了黑风山贼来拔这排灯，怕各区的筹对在一处。"), unlessFlag: "gaibang_proved_kitchen" },
        hero("请他们把灯挪到石碑旁，先让孩子过去。谁说哪一户少领，就让哪一户先说。"),
        luyoujiao.say("我糊涂时答应看净衣污衣两份账，忘了粮仓只有一间。两份账合了，差额也要有人认。"),
        hero("明日补粥时我在棚里候着。谁交钱换过筹，也能凭原来的碗领。"),
        luyoujiao.say("好。丐帮的灯不是什么帮规的一柱香，落在人脚边就该照着他回家。"),
        hero("请长老守住最小那盏。这边晃得厉害，我先过去。"),
        { ifFlag: "gaibang_proved_kitchen", choice: [
          { text: "凭原汤原簿对账，让领粥各巷选一人同管名册", effect: { exp: 520, moral: 6, item: "dish_yudi", skill: "xianglong" }, reply: luyoujiao.reply("总账今夜就分三处保管。待你练降龙掌，第一招先打空处，试试收劲。") }
        ] },
        { unlessFlag: "gaibang_proved_kitchen", battle: "bandit_boss", winReward: { exp: 470, gold: 210, skill: "xianglong" }, winNar: "你护住杏林灯阵，执碗人与帮中长老合了两份粥簿。鲁有脚借一截杏枝演示降龙十八掌的起式。" }
      ]
    }
  ]);

  const linghu = cast("令狐冲", "assets/mate-linghu.webp");
  registerSect("huashan", "华山长卷 · 崖上无名", "剑气大比起于山路护索，终于思过崖上一场关系两宗弟子的翻案。", [
    {
      title: "入门试炼 · 朝阳索桥",
      trigger: scene("huashan"),
      hint: "与令狐冲试走索桥。",
      steps: [
        linghu.say("这柄木剑送去对岸。过桥不论招式，酒坛不洒便算过一关。"),
        hero("桥下翻云，桥板少了半截。我若蹲下来补，坛口就会斜。"),
        linghu.say("会补桥是你的本事，会把坛子交给别人也算。左边那位是气宗来的师弟，右边是剑宗来的。"),
        hero("两位都不肯先伸手，昨日他们是不是比了剑？"),
        linghu.say("只比三招，比完了八句门规，倒比三百招还累。"),
        hero("拾剑那人手心有茧，掌势等着托桥栏。另一个看见断板，早把鞋尖挪开了。"),
        linghu.say("你眼力好。他俩若都肯替对方伸一次手，剩下这截路连风也省三分。"),
        hero("坛子给他们。我拿木剑来横试一下两边的绳宽。"),
        { choice: [
          { text: "请两宗各一人接力递坛，结伴修补桥板", effect: { exp: 200, skill: "hsjian", moral: 3, setFlag: "huashan_shared_rope" }, reply: linghu.reply("酒还在，桥也在。等大比点名时，别漏了替人接坛子的那个。") },
          { text: "请各自留守一端，亲赴断板处量绳试脚", effect: { exp: 210, skill: "hsjian", item: "ore_iron" }, reply: linghu.reply("稳得很。去告诉对岸，能踏住断板这事，单凭一门功夫也能成。") }
        ] }
      ]
    },
    {
      title: "门派大比 · 剑气换位",
      trigger: scene("huashan", "hs_court", "huashan_inner"),
      hint: "参加剑气大比。",
      steps: [
        linghu.say("台上摆两块借来的石屏，上头刻剑谱。裁判规定剑气各守一侧，换位便算犯规。"),
        hero("若屏上有写反的字，须从另一侧看，怎么能守在原地？"),
        { ...linghu.say("昨日替你抬酒的两位师弟愿意作证。你敢请他们当众换位，就有人敢跟着看。"), ifFlag: "huashan_shared_rope" },
        { ...linghu.say("大比的见证只有那位裁判；他固执些，倒也会低头看你剑尖到底指着哪儿。"), unlessFlag: "huashan_shared_rope" },
        hero("剑谱上反了一字，两边却各说对方刻错。看笔划，这似乎是块从整片石壁上卸下来的屏。"),
        linghu.say("思过崖还有后半块。上回有人去看，石屏旁的铁桩拔了，那人的手指也伤了。"),
        hero("比试一误，两边都会在同一个错字上争到明年。"),
        linghu.say("那就挑明，或赢完再拿你的办法请他们上崖。你若需要一个后退的借口，酒坛就在台下。"),
        hero("我能让裁判看剑锋落点。至于那块遗石，怕得两宗一起去认。"),
        { choice: [
          { text: "请两宗互换石屏投影，当众更正招谱", effect: { exp: 350, skill: "zixia", setFlag: "huashan_swapped_screens" }, reply: linghu.reply("他们换手的时候都笑了。明日跟我上思过崖，原处是怎样的，该一起瞧。") },
          { text: "守规完成比试，把错字拓印与个人铜签一并交给裁判", effect: { exp: 300, gold: 160, item: "dan_chongmai" }, reply: linghu.reply("这铜签能让他肯开口。去思过崖时别走得太急，那条栈道又窄又滑。") }
        ] }
      ]
    },
    {
      title: "师门危机 · 思过崖卸剑",
      trigger: scene("huashan", "hs_siguoya", "huashan_inner"),
      hint: "去查验思过崖原刻。",
      steps: [
        linghu.say("外门请来的五岳见证堵了山道。石洞里有人收剑谱，赶在天亮前要盖翕门。"),
        hero("墙上那字下的刻痕接着一条裂缝。原来屏上的一撇是石头自己裂开的。"),
        { ...linghu.say("昨晚换过位的两队弟子早把那片壁沿拓了两份。见证不让他们进去，他们就在栈道上摊开。"), ifFlag: "huashan_swapped_screens" },
        { ...linghu.say("裁判愿意替你举拓片。有人却从聚贤庄请了拳客，要先让你把铜签留下。"), unlessFlag: "huashan_swapped_screens" },
        hero("铜签刻的是我，崖上留下的黑字得由大家认。先把盖门用的磐石搁回去。"),
        linghu.say("两边都想抢回自己的一份剑谱。留一本在崖上，让再来的弟子都能看，倒未必有人肯做。"),
        hero("拓片可带走，原处留空。回去把那些错认的剑式也添上年份，让后人看清前人也会读错。"),
        linghu.say("上山前我温了一坛酒。你留下哪式剑，等他们平心静气了再问。"),
        hero("那便先把手从剑柄上拿开，留一只手去扶住石扉。"),
        { ifFlag: "huashan_swapped_screens", choice: [
          { text: "展两份原刻拓片，当场把石屏归给两宗共同看守", effect: { exp: 560, moral: 5, skill: "dugu", item: "wine_monkey" }, reply: linghu.reply("改字那一撇交回山风。这卷独孤九剑你收好，它最怕拿一句成法挡住人。") }
        ] },
        { unlessFlag: "huashan_swapped_screens", battle: "zuo_lengchan", winReward: { exp: 560, gold: 280, skill: "dugu" }, winNar: "你力破左冷禅的寒冰真气守住思过崖原刻！见证亲手去掉了误写的一笔，令狐冲在石扉半开处留给你九剑初卷。" }
      ]
    }
  ]);

  const zhiruo = cast("周芷若", "assets/mate-zhouzhiruo.webp");
  registerSect("emei", "峨眉长卷 · 剑留西窗", "守住金顶一册病簿，把一场试剑留下的人情和承诺带到万安寺。", [
    {
      title: "入门试炼 · 金顶清修",
      trigger: scene("emei", "emei_hall"),
      hint: "同周芷若值更。",
      steps: [
        zhiruo.say("师父命我看守香案上的剑。你今夜与我一道值更，若有人来讨药，先问他从哪条山路上来。"),
        hero("这几张问诊纸都剪去了一角，是拿来垫香炉的？"),
        zhiruo.say("原是看病的凭帖。去年有位从汉水来的妇人不识字，我折一角给她认。后来人人都折，便容易混。"),
        hero("方才有个孩子在西窗下等，捏着的凭帖没有折角。"),
        zhiruo.say("他来过两次，担心领了药会叫人瞧见他娘的病。她在山下替我们缝过三季衣裳。"),
        hero("那就让西窗能递得出东西。我们值更，也守那扇窗。"),
        zhiruo.say("若由你递药，剑便须我一人看。若你肯看剑，我可以替他端一碗汤。你信得过谁？"),
        hero("信得过今夜还有人来。所以香案的灯留着，西窗的也留着。"),
        { choice: [
          { text: "（炼丹 Lv2）接过药炉，照病簿分药并回查剪角凭帖", reqLife: { alchemy: 2 }, effect: { exp: 250, item: "dan_chongmai", setFlag: "emei_kept_prescriptions" }, reply: zhiruo.reply("你手稳，字也写得明白。我把剩下的凭帖交给你，谁也不会少。") },
          { text: "留下看守香案，请周芷若从西窗把药递给孩子", effect: { moral: 5, exp: 190, item: "jinchuang" }, reply: zhiruo.reply("他走得轻，回头却向这扇窗拜了拜。今日算我们两人当值。") }
        ] }
      ]
    },
    {
      title: "门派大比 · 金顶试停剑",
      trigger: scene("emei", "em_swordcourt", "emei_hall", "emei_inner"),
      hint: "参加试剑大比。",
      steps: [
        zhiruo.say("今日试剑，剑尖停在三寸之外方算一筹。打落对手的簪子，反倒要扣一筹。"),
        hero("师姐的袖口又湿，又沾着几缕勒丝。比试前她还走了一趟山下？"),
        { ...zhiruo.say("你的凭帖有一张被人带去了万安寺。她替我问过，也没问到那户人归家没有。"), ifFlag: "emei_kept_prescriptions" },
        { ...zhiruo.say("西窗下等药的孩子今早带来一枚塔铃。他说母亲在万安寺帮工，那里已经三日闭门。"), unlessFlag: "emei_kept_prescriptions" },
        hero("她手还在发抖，刚才的第一剑已尽力停住了。再比下去只会让她难过。"),
        zhiruo.say("你可以先让一筹，但擅自下台，那面白旗会记在你头上。"),
        hero("若同她比两趟递剑的步子，又怎么判？山路上也常有人比这更急。"),
        zhiruo.say("师门重规矩。你选的法子，总该能当着所有人说清缘由。"),
        hero("裁剑之前，请记下台下有人等她。这一笔同我的名次一道念。"),
        { choice: [
          { text: "请同门轮替试剑，把大比用的旗改来召集接应", effect: { exp: 350, moral: 4, skill: "yitian", setFlag: "emei_raised_relief_flag" }, reply: zhiruo.reply("我记作你先请停剑。旗先由受伤的师姐收着，她若还能走，明日第一个去。") },
          { text: "完成试剑，取胜后用彩头换万安寺的帮工名单", effect: { exp: 310, gold: 180, skill: "yitian" }, reply: zhiruo.reply("名单上没有外来杂役，病簿上的几个人写在背页。去塔下时记得翻看。") }
        ] }
      ]
    },
    {
      title: "师门危机 · 万安寺塔铃",
      trigger: scene("wanan", "wa_tower", "wanan_inner"),
      hint: "接应受困的帮工。",
      steps: [
        zhiruo.say("塔铃塌下一串，第三层还有脚步。领工的扣了借据，非要人按手印才放走。"),
        hero("门下湿泥有往返的鞋印。住在三层的妇人刚才下过楼，有人逼她再上去。"),
        { ...zhiruo.say("咱们的白旗在塔南，守门人只有一双眼，师姐们已经接了七个人下梯。"), ifFlag: "emei_raised_relief_flag" },
        { ...zhiruo.say("名单上的人都在塔里。我叫了他们名字，一名蒙古暗桩听见，立刻抽刀去锁门。"), unlessFlag: "emei_raised_relief_flag" },
        hero("那口箱里全是手印，不带箱子走，将来又有人找他们要银子。"),
        zhiruo.say("师父给我的剑原是用来护山门的。山门之外那些人等我们一句话，该不该也算？"),
        hero("把孩子那枚塔铃挂回去。铜声响一次，名单上还剩一户没走。"),
        zhiruo.say("我站在下梯处听，你在门口看清人。若一定要落剑，回来让我验过刃口。"),
        hero("待最后一户下塔，我陪你回峨眉把名单交还给他们自己。"),
        { ifFlag: "emei_raised_relief_flag", choice: [
          { text: "趁同门接应，把借据当着众人交还每户", effect: { exp: 530, moral: 7, skill: "jiuyin", item: "dahuandan" }, reply: zhiruo.reply("这一页九阴总纲是我读过最难的一页。你先拿去，批注明日我补给你。") }
        ] },
        { unlessFlag: "emei_raised_relief_flag", battle: "miejue_boss", winReward: { exp: 560, gold: 260, skill: "jiuyin" }, winNar: "你挺身接下灭绝师太三成剑威的试剑绝招，护住塔门放走帮工，周芷若临行默写一页九阴总纲交你收存。" }
      ]
    }
  ]);

  const dragon = cast("小龙女", "assets/mate-xiaolongnv.webp");
  const yangguo = cast("杨过", "assets/mate-yangguo.webp");
  registerSect("gumu", "古墓长卷 · 白丝渡谷", "从寒玉石室牵出一截白丝，决定情花开遍的山谷怎样留下第二条路。", [
    {
      title: "入门试炼 · 寒玉听水",
      trigger: scene("gumu", "gumu_inner", "gumu_hall"),
      hint: "按小龙女的嘱咐听滴水。",
      steps: [
        dragon.say("在床边坐一炷香。只数水滴，旁的声响由它去。"),
        hero("前九滴一样响，第十滴像掉进了空瓮。石墙后面还有一间屋？"),
        dragon.say("是一条去玉蜂房的槽。昨夜水线变了，石缝里有朽木。"),
        hero("数到五十声，它还会更低。若我离席去看，刚才这炷香便要重来。"),
        dragon.say("你要去便去。记下走前听见了什么，以便坐回来时认得。"),
        hero("我想沿木槽系一根白丝。这一路纵然走得慢，回头也看得见。"),
        dragon.say("丝放床背了。你也可等水滴自己露出破口，别碰松动的石板。"),
        hero("第二声来了，旧槽和新槽之间只隔一掌远。"),
        { choice: [
          { text: "用白丝标出穿墓水槽，绕过去清掉浮木", effect: { exp: 220, skill: "yunvjian", setFlag: "gumu_marked_thread" }, reply: dragon.reply("这根丝等你收起来。路已记在手上，下次从哪头走都好。") },
          { text: "守听至香尽，靠滴声判断堵塞所在", effect: { exp: 210, attr: { int: 1 }, skill: "yunvjian" }, reply: dragon.reply("你起身时没有踩到空板。待滴声听得熟了，玉女剑也会稳。") }
        ] }
      ]
    },
    {
      title: "门派大比 · 白丝试双剑",
      trigger: scene("gumu", "gm_waterway", "gumu_hall", "gumu_inner"),
      hint: "参加双剑较技。",
      steps: [
        yangguo.say("说什么门派大比，也只有这几个人。我同姑姑摆了两把木剑，一根旧练丝，你来了便认一种走法。"),
        hero("丝绷在剑身上，越用力反倒越容易断。比双剑的阵脚也要随水声变么？"),
        { ...yangguo.say("认得墙上这几段白丝？就沿你清木槽那条路比，折身还够踏一步。"), ifFlag: "gumu_marked_thread" },
        { ...yangguo.say("姑姑说你坐得住。那就闭一闭眼，学着在最轻的那滴上应剑。"), unlessFlag: "gumu_marked_thread" },
        hero("对手忽然落剑，剑下那一格进水了。有人拆了槽末新换的木闸？"),
        yangguo.say("绝情谷捎来一段同样的白丝，说是上游老闸年久不肯开，谷里人被水逼进花圃。"),
        hero("练过的这截丝可以拿去量水，却未必人人都能从木闸旁过。"),
        yangguo.say("重剑无锋，开闸靠的是下得住手。我想练两套遇断还能接的剑，你看如何？"),
        hero("先试一人失手的时候。这一剑收住了，你从另一边接。"),
        { choice: [
          { text: "以双剑递丝，练出交接后仍能彼此护住的绳路", effect: { exp: 340, moral: 3, item: "ore_xuantie", setFlag: "gumu_rehearsed_line" }, reply: yangguo.reply("线的两头都有人接了。这一丈留给谷里，到了花圃先找能下脚的石头。") },
          { text: "以落剑的余劲托住水闸，专练一人开闸的重势", effect: { exp: 330, skill: "xuantie", item: "dahuandan" }, reply: yangguo.reply("重势练成了。若旧闸不肯开，我在石坝那头接你。") }
        ] }
      ]
    },
    {
      title: "师门危机 · 情花圃涨水",
      trigger: scene("jueqing", "jq_flower", "jueqing_inner"),
      hint: "接应受困谷民。",
      steps: [
        dragon.say("水把石路盖了。头一道坡上还有两个人，花枝压得低，谁走都容易碰刺。"),
        hero("东头水涨得快，花棚支脚还在。若先到柱下，便可让他们背朝花墙下来。"),
        { ...dragon.say("过儿把比剑时那丈白丝带来了。扶绳的人相互照看，一回送一人。"), ifFlag: "gumu_rehearsed_line" },
        { ...dragon.say("过儿站在石坝下，闸能松一指宽。你在上面托着，我来叫坡上的人趁水落下来。"), unlessFlag: "gumu_rehearsed_line" },
        hero("还有一条船拴在树后。船主人叫我们先顾人，那棵树若倒了，他也愿意换根桩。"),
        dragon.say("有人在花圃立过誓，说这路一辈子都不走。我瞧现在肯走的人，都盼着平安到岸。"),
        hero("先带孩子下去。走到岸上，再慢慢问他想把船拴在哪里。"),
        dragon.say("你守的这头，我来守另一头。眼前见得着就好。"),
        hero("等他们登船，某日还可以沿这条白线走回来。"),
        { ifFlag: "gumu_rehearsed_line", choice: [
          { text: "让白丝留给谷民引路，护住原闸与渔船", effect: { exp: 530, moral: 6, skill: "anran", item: "dahuandan" }, reply: dragon.reply("路留下了。过儿那一掌使过便懂，你同他去坝上看一遍。") }
        ] },
        { unlessFlag: "gumu_rehearsed_line", battle: "valley_crocodile", winReward: { exp: 520, gold: 220, skill: "anran", item: "ore_xuantie" }, winNar: "你跃下石坝斩退趁涨水扑岸的鳄潭恶鳄，护送谷民平安登船，杨过与小龙女在坝上将黯然销魂掌诀倾囊相授！" }
      ]
    }
  ]);

  const jingwu = cast("逍遥静梧", "assets/npc-taoist.webp");
  registerSect("xiaoyao", "逍遥长卷 · 三让换一局", "一盘珍珑下到无人应劫，旧日同门却循棋谱归山，只为取回一块被除名的木牌。", [
    {
      title: "入门试炼 · 珍珑一口气",
      trigger: scene("wuliang", "wl_cave"),
      hint: "听静梧讲珍珑。",
      steps: [
        jingwu.say("棋盘上十四个空眼。第一回且别算活，拣一处你觉得不该下的地方。"),
        hero("角上留一口气，两边的子都靠它活。落子之后，我这一边也没路退。"),
        jingwu.say("这盘先前的主人从来只留给一方。学他容易，少一步就得另想。"),
        hero("盘脚垫的木牌写着一个宁字。先前的主人叫宁？"),
        jingwu.say("是一位早年出山的师兄。他把山下求药人的名字也刻在牌后，师门只认正面那个字。"),
        hero("他这局没有落完，白方八颗让出半角，今人却多摆了一子。"),
        jingwu.say("你可从正局解它，或将那颗新添的子拿掉。选了都得自己收棋。"),
        hero("我把剩下那一点空处先留着。肯回来的人，得还有地方坐。"),
        { choice: [
          { text: "（弈棋 Lv2）按棋势复盘，把多添的白子捡回木盒", reqLife: { chess: 2 }, effect: { exp: 260, skill: "hanbing", setFlag: "xiaoyao_restored_board" }, reply: jingwu.reply("你也看见少的那一点了。木牌先交给你，记得翻过来读。") },
          { text: "在死角试落一子，请静梧带走已无气的棋子", effect: { exp: 190, item: "dan_chongmai", skill: "hanbing" }, reply: jingwu.reply("送走一片，反能多出三回合。可记住这是怎么得来的。") }
        ] }
      ]
    },
    {
      title: "门派大比 · 缥缈峰借局",
      trigger: scene("wuliang", "wl_matstone", "wuliang_inner", "wl_cave"),
      hint: "参加逍遥大比。",
      steps: [
        jingwu.say("缥缈峰捎一盘棋来。赢的人须把最后一手送回山去，放在比试的人没见过的那个地方。"),
        hero("客人说这盘叫星棋，里面几颗棋倒扣着，背面都是缺笔的名字。"),
        { ...jingwu.say("你保留了木牌全貌。倒棋所缺的那几笔，恰好能和木牌后的人名缀成一处。"), ifFlag: "xiaoyao_restored_board" },
        { ...jingwu.say("照你上回的收局法，棋盒里正剩下几颗早先无气的。翻过来，能看见它们原来也刻过字。"), unlessFlag: "xiaoyao_restored_board" },
        hero("有人把下山求药的姓名分在两边。他们到了山门又互相辨不出来。"),
        jingwu.say("取走棋盘的人出自星宿门下，说掌门争棋争了十年，也该给山下欠药的人算一算。"),
        hero("先算欠下的药，人就知道这局和自己有关。他若仍要讨旧账，我明日把棋带来。"),
        jingwu.say("要么请求药人同来补字，要么换回残局，给他一席明白说话的地方。也许两事都有人不愿。"),
        hero("我留他那把椅子。但我们今日收的是棋，还要看看椅子背后有没有旁人的名字。"),
        { choice: [
          { text: "把两边棋子交原主补字，令星宿来客也在场核对", effect: { exp: 360, skill: "beiming", setFlag: "xiaoyao_invited_witnesses" }, reply: jingwu.reply("求药人肯同来。棋盘搬去石窟，把石案四面都挪出一席来。") },
          { text: "以赛中问到的原局换回木牌，约来客次日面谈", effect: { exp: 330, gold: 170, item: "herb_ginseng", skill: "beiming" }, reply: jingwu.reply("他要从石窟背后登山。路上跟着闲人，明日早些去候。") }
        ] }
      ]
    },
    {
      title: "师门危机 · 星宿还牌",
      trigger: scene("wuliang", "wl_cave", "wuliang_inner"),
      hint: "会见星宿来客。",
      steps: [
        jingwu.say("牌立回山门了，正面向里。他自署宁姓，却认不得我们这些年添上去的号。"),
        hero("他身后有两个孩子抱药罐。罐口盖了棋巾，烫得两个人一路换手。"),
        { ...jingwu.say("你请来补字的乡人认出了他。是药进了谁家的嘴，待他们当面认一遍。"), ifFlag: "xiaoyao_invited_witnesses" },
        { ...jingwu.say("面谈的闲人封了下山路，一名曾替蒙古探路的死士想夺他的名单。那人今日不肯让开。"), unlessFlag: "xiaoyao_invited_witnesses" },
        hero("木牌上宁字背对屋里，外头的人就看得见了。写过的名字没有改，只是换了面说话。"),
        jingwu.say("若山门准他重挂名牌，往后照谁的旧约放药？他说愿意交还师传，只求把那一项写清。"),
        hero("药不该靠辨谁哪一门。先给两只罐另找稳当的盖，再去找伙伴一起读人名。"),
        jingwu.say("这一步是你来落了。眼下那把椅子是空的，我可以扶着它等。"),
        hero("等这条路清了，我陪宁前辈把两只罐搬下来。"),
        { ifFlag: "xiaoyao_invited_witnesses", choice: [
          { text: "让山民对照牌背补录药债，在石窟席间重订领药约", effect: { exp: 550, moral: 5, item: "herb_ginseng", skill: "lingbo" }, reply: jingwu.reply("上山的人从左来，下山的人从右归。凌波的第一步，请你踏在中间。") }
        ] },
        { unlessFlag: "xiaoyao_invited_witnesses", battle: "jiumozhi", winReward: { exp: 560, gold: 280, skill: "lingbo" }, winNar: "你力破大轮明王鸠摩智的火焰刀绝学，守住无量石窟与药约，静梧以凌波微步带你绕过暗水。" }
      ]
    }
  ]);

  const wuji = cast("张无忌", "assets/mate-zhangwj.webp");
  registerSect("mingjiao", "明教长卷 · 六封守火信", "一叠借灯信卷入光明顶围山事变。每封信都有人等，要在天亮前找到可以送它下山的路。", [
    {
      title: "入门试炼 · 圣火巡山",
      trigger: scene("guangming", "gm_hall"),
      hint: "领取巡山用的灯信。",
      steps: [
        wuji.say("这六封信先送山脚。信上只写借灯，各自封着，村里人会认灯纸上的字。"),
        hero("有一封无名，封口还沾了山北营墙的药泥。那里已立旁派的望旗。"),
        wuji.say("我写给昨晚扶下山的守路人。手裂了还能扶人，他也许睡过了药时。"),
        hero("他认得咱们的灯么？挂错灯，另几营的人也会以为我们起了兵。"),
        wuji.say("所以有一封你得当面递。若他不方便接，就请相邻的营帮他看着，别在路上争门派。"),
        hero("另外五封还要赶在天亮前送到。若他醒不了，我可以坐一会，再走便要找同伴。"),
        wuji.say("这不是谁跑得快的试炼。你选如何分送，晚时算漏信的人来找我。"),
        hero("灯纸别拧得太严，剩一点空能让看信的人伸进手。"),
        { choice: [
          { text: "与巡山同门分送五封，亲自在北营等伤者醒来", effect: { exp: 230, moral: 4, item: "dahuandan", setFlag: "mingjiao_waited_for_guard" }, reply: wuji.reply("他醒了，问过我送灯的是谁。我给他留了把干椅子，下次他还可以来。") },
          { text: "把北营灯信请邻营伤医转交，先确保六营同时收信", effect: { exp: 210, gold: 100, item: "dan_chongmai" }, reply: wuji.reply("邻营也有人等着治手，多留了一盏灯，这个你算得准。") }
        ] }
      ]
    },
    {
      title: "门派大比 · 五散人挪灯",
      trigger: scene("guangming", "gm_platform", "guangming_inner", "gm_hall"),
      hint: "参加五散人大比。",
      steps: [
        wuji.say("五散人各自守一面铜罩。比试用的都是空灯，要在他们一轮掌风里护住最后那点灯焰。"),
        hero("有人把一面铜罩换作北营旧灯，我认得灯纸上的药泥。小旗上写的是借火两字。"),
        { ...wuji.say("守路人亲手带来的，说六派围山，北营有人想和我们借一条抬伤者的路。"), ifFlag: "mingjiao_waited_for_guard" },
        { ...wuji.say("邻营伤医寄来的，说药快见底，营里的人商量提早封山门。"), unlessFlag: "mingjiao_waited_for_guard" },
        hero("铜罩各有合缝，灯要轮流借一阵，掌风来了才看得见哪一面有破处。"),
        wuji.say("可把那盏旧灯一直亮着，教人认路。也可先把火分进两只小灯，在两侧暗道里做记号。"),
        hero("两条路不能结一个死扣。若误会起来，有了光，至少能看见先走过来的人空着手。"),
        wuji.say("今日的名次若让大家分了也好，衣裳给抬担架的弟子多备几件。"),
        hero("待换过这一轮罩子，请各位再试试护住另一盏。"),
        { choice: [
          { text: "把旧灯留在明处，各营按原路派人合护", effect: { exp: 380, moral: 4, skill: "qiankun", setFlag: "mingjiao_kept_open_lamp" }, reply: wuji.reply("我替你看住火。来人认得灯以后，先请他坐下换双干鞋。") },
          { text: "分灯守暗道，先安置六营中走不动的人", effect: { exp: 350, skill: "qiankun", item: "herb_ginseng" }, reply: wuji.reply("暗道里有一口井，搬过去便能接药。先请会下井的弟兄把水提上来。") }
        ] }
      ]
    },
    {
      title: "师门危机 · 六派围山借灯",
      trigger: scene("guangming", "gm_hall", "guangming_inner"),
      hint: "应对六派围山。",
      steps: [
        wuji.say("外头打了三次报时，第三回没人应。六派营里都有伤者，有人趁乱拿了北营的旗。"),
        hero("月亮沉到松梢，朝山下望，六道旗影只剩五道。那面失旗的营要让人先下去。"),
        { ...wuji.say("明灯一夜都没熄。北营那边已经有人来同咱们对信，请祭灯时先让这些人开口。"), ifFlag: "mingjiao_kept_open_lamp" },
        { ...wuji.say("暗道的伤者已安置。蒙古千夫长巴图带人扛假旗堵住井口，想叫双方误以为是夺井。"), unlessFlag: "mingjiao_kept_open_lamp" },
        hero("井水够六营用，旗却够叫两边打起来。只要看过那六封信，就能辨出谁来借过灯。"),
        wuji.say("还有两封被人踩破了。可以照样念名字，也可请还认得彼此的伤者先扶一扶。"),
        hero("念到没有回声的那一封，请旁边的人等一等，也许他的脚还不好抬。"),
        wuji.say("我守在火盆后面。拜山的礼我晚些再收，眼下每盏灯都得让人看得清下一步。"),
        hero("师兄弟拿布护在灯底。若井口还有人夺路，我去认认那面旗。"),
        { ifFlag: "mingjiao_kept_open_lamp", choice: [
          { text: "请六营伤者认领灯信，盟约议定后共护下山道路", effect: { exp: 580, moral: 7, skill: "jiuyang", item: "dan_chongmai" }, reply: wuji.reply("今日的门先让抱灯的人走。九阳一卷你收在袍里，外面风冷，慢些翻。") }
        ] },
        { unlessFlag: "mingjiao_kept_open_lamp", battle: "cheng_kun", winReward: { exp: 640, gold: 320, skill: "jiuyang" }, winNar: "你识破并力克幕后黑手成昆，夺回假旗并将井水送至六营！张无忌将九阳神功手抄册郑重递给你。" }
      ]
    }
  ]);

  const huangyaoshi = cast("黄药师", "assets/npc-huangys.webp");
  const hermit = cast("隐世奇人", "assets/npc-hermit.webp");
  const tideRoom = scene("taohua", "th_stone", "taohua_inner");
  const swordGrave = scene("huashan", "hs_swordpit", "hs_siguoya", "huashan_inner");
  JY.registerQuest("sanxiu_followup", {
    title: "江湖散修 · 残页渡风",
    summary: "续查无名残页血案。在桃花岛辨出残页没有写完的后半句，再赴华山还一卷旧剑谱。",
    episodes: [
      {
        id: "san_followup_4",
        title: "散修第四幕 · 潮音续页",
        reqUnaligned: true,
        reqFlag: "sanxiu_ep3_done",
        trigger: tideRoom,
        hint: locationHint(tideRoom, "辨认残页出处。"),
        steps: [
          huangyaoshi.say("冷铁上的线是渡船留下的，才不是哪家师门的暗号。你把碑上那张纸拿来，我看墨渗到了哪边。"),
          hero("纸背这点咸味连悦来茶楼的先生也提过。先在船上写，就难怪有一笔洇进裂缝。"),
          huangyaoshi.say("岛上旧谱末页少了半句。早年一个抄谱人把那页带走，终南山避雪时借抄半截，剩下这半截随他下了山。"),
          hero("就是古碑底下那道？残页上说可以留命渡人。撕走的那边，到底写了谁走？"),
          huangyaoshi.say("有人言他失约携谱杀人。当日我在岛上数着风，船倒是少了一条，回港的脚印却多了三双。"),
          hero("那人把船给了旁人，自己没回来。后半句或许写在替他回港的那三人手里。"),
          huangyaoshi.say("此洞涨潮有四声停顿，第一声应他抄谱的指法。你若耳朵好，可以在潮上找一找余音。"),
          hero("听不着也无妨。我替他们理一遍船索，看哪一根留得下当年的旧结。"),
          { choice: [
            { text: "（音律 Lv2）循潮声落音，补记抄谱人的自注", reqLife: { music: 2 }, effect: { exp: 440, skill: "tanzhi", setFlag: "sanxiu_recovered_sound" }, reply: huangyaoshi.reply("是‘先还船，再还谱’六个字。吹得不差，谱去华山问。终南樵人已经上路，带的是当年还船的木契。") },
            { text: "依旧船索找回乘船名单，请归港人记下所见", effect: { exp: 400, item: "ore_xuantie", moral: 4 }, reply: huangyaoshi.reply("写名字的是回来的三个。终南樵人带旧契上华山，你带着名单追上去。") }
          ] }
        ]
      },
      {
        id: "san_followup_5",
        title: "散修第五幕 · 剑冢留空名",
        reqUnaligned: true,
        reqFlag: "san_followup_4_played",
        trigger: swordGrave,
        hint: locationHint(swordGrave, "与隐世奇人核对终南来信。"),
        steps: [
          hermit.say("终南来客把木契交给我了。三人各留一笔指印，未在剑冢刻名，说怕把欠他的船说成欠他的武功。"),
          hero("古碑上那一条血案传闻，许多年来只剩抄谱人的姓。新木契一摆，至少能问清血案先后。"),
          { ...hermit.say("你从涛声里钩出六字，全然合了契约背书。今日只需请来客把那半页放回原处。"), ifFlag: "sanxiu_recovered_sound" },
          { ...hermit.say("人名与木契已对上，倒有个聚贤客拿着旧收帖堵在外头。他认定死案先有，除非你接他一场公断。"), unlessFlag: "sanxiu_recovered_sound" },
          hero("若案子还得验，我留在这里陪他验。写完那页之后，想看的人也应该看得。"),
          hermit.say("你初来古碑求门路，自称往后谁也不依。从这里下山，同行的人多了，这话还肯作数么？"),
          hero("他们结伴时也不必认同一个门。到了下一条渡口，我愿意先问他们想往哪边走。"),
          hermit.say("有一柄重剑我借来堵住墓门，它足够沉，却始终没在上头刻主人的名字。"),
          hero("留那一面空着吧。下个来问的人或许有自己的写法。"),
          { ifFlag: "sanxiu_recovered_sound", choice: [
            { text: "合谱重立无名碑，将渡人旧约抄给过路人", effect: { exp: 720, skill: "xuantie", attr: { int: 2, luck: 1 }, setFlag: "sanxiu_followup_completed" }, reply: hermit.reply("这一剑托在手里，走过一回渡船就知道该怎么收。江湖上若有人问师门，只报你自己的名字。") }
          ] },
          { unlessFlag: "sanxiu_recovered_sound", battle: "juxian_elite", onWinFlag: "sanxiu_followup_completed",
            winReward: { exp: 660, skill: "xuantie", attr: { str: 1, luck: 1 }, item: "ore_xuantie" },
            winNar: "旧收帖比还船木契晚三日。聚贤客验过指印，亲手擦去了血案刻字。隐世奇人留下重剑余诀，明日的来客仍可随意借看。" }
        ]
      }
    ]
  });
})(window);


/* ===== data/stories/mates_deep.js ===== */
/* =====================================================================
   山河十四卷 v1.0 · 同道长卷：十二位同道的两幕立绘支线
   ===================================================================== */
(function (root) {
  "use strict";
  const JY = root.JY;
  const lifeNames = { cook: "烹饪", music: "音律", chess: "弈棋", alchemy: "炼丹" };

  const MATE_VARIETY = {
    // 6 场武戏实战高潮（对话中途自然爆发护友/立威切磋，战后无缝切回剧场收束）
    zhaomin_1: {
      duel: {
        atTurn: 4,
        intro: "话音未落，一名宝塔领班提枪带卒自寺门巡出，指着木匠赊账纸喝令封桥拿人！赵敏合扇微退半步，含笑睨向你。",
        foe: "tower_guard",
        reward: { exp: 95, gold: 60 },
        winNar: "你数招挑落领班长枪震退巡卒，赵敏唇角微扬，重又展开折扇指向残局。"
      }
    },
    linghu_1: {
      duel: {
        atTurn: 4,
        intro: "正说话间，一名赴山观剑的悍客大步闯到崖下，伸手便要夺过小弟子的木剑折断立威！令狐冲眉头一挑，按杯看向你。",
        foe: "juxian_elite",
        reward: { exp: 110, aff: { linghu: 4 } },
        winNar: "你纵身掠下石坪，三招逼退夺剑悍客护住木剑，再跃回崖沿与令狐冲碰了一记空杯！"
      }
    },
    yangguo_2: {
      duel: {
        atTurn: 4,
        intro: "高坡草丛忽地弓弦骤响！黑风寨一伙猎匪循雁鸣摸上山坡，张网便朝草窝扑来！杨过神色一凛，单臂护住伤雁。",
        foe: "bandit_boss",
        reward: { exp: 130, aff: { yangguo: 5 } },
        winNar: "你横剑拦在坡前干净利落击溃猎匪，林间重归清静，头顶雁阵正低低盘旋等候。"
      }
    },
    qiaofeng_2: {
      duel: {
        atTurn: 4,
        intro: "夜色陡沉，渡口芦苇丛中寒星暴起——原来是潜伏挑拨两队火并的蒙古暗桩死士正欲再施冷箭！乔峰虎目如电喝道：「拿下他！」",
        foe: "xiangyang_spy_elite",
        reward: { exp: 135, moral: 4, aff: { qiaofeng: 5 } },
        winNar: "你与乔峰左右夹击生擒暗桩掷于阵前，两队商旅见真凶落网，登时面露愧色收起了兵刃！"
      }
    },
    tianbg_2: {
      duel: {
        atTurn: 4,
        intro: "麻袋后一名做贼心虚的水匪头目见凭条败露，猛地掀翻桌案拔刀便要将湿凭条劈碎灭口！",
        foe: "canal_robber",
        reward: { exp: 100, gold: 55, aff: { tianbg: 4 } },
        winNar: "刀光一闪，你抢先震飞恶徒短刀保住凭条，田伯光吹了声口哨抱臂笑道：「痛快！」"
      }
    },
    oyfeng_1: {
      duel: {
        atTurn: 4,
        intro: "假药铺内一名锦衣恶客见行迹败露，竟扬手撒出一蓬白驼毒粉妄图夺路逃窜！欧阳锋冷哼一声铁杖顿地。",
        foe: "ouyang_ke",
        reward: { exp: 120, item: "herb_common", aff: { oyfeng: 4 } },
        winNar: "你屏息欺身破开毒雾将那恶客反手制住，西市买药百姓纷纷聚拢上前见证！"
      }
    },
    // 6 组多段互动回应（打破单调连点 8 句对话，在中途加入性格回应分支）
    huangrong_1: {
      mid: {
        atTurn: 4,
        choices: [
          { text: "「鱼尾归大厨，我替你尝尝汤底咸淡便够。」", effect: { aff: { huangrong: 3 }, exp: 25 }, reply: ["黄蓉", "算你识相！不过本姑娘心情好，待会儿鱼腹最嫩那块偷偷拨给你。"] },
          { text: "「先顾檐下吹冷风的巡卒，咱们垫后吃更香。」", effect: { moral: 3, aff: { huangrong: 3 } }, reply: ["黄蓉", "这话倒像靖哥哥说的——好，那咱们手脚再麻利些！"] }
        ]
      }
    },
    xiaolongnv_1: {
      mid: {
        atTurn: 4,
        choices: [
          { text: "解下外袍挡在石门风口，替玉蜂隔开风雪", effect: { aff: { xiaolongnv: 4 }, exp: 25 }, reply: ["小龙女", "……你的衣裳比石板暖些。别站太外面，雪会落进领口。"] },
          { text: "静静蹲在箱旁不惊扰她，递过干净软布", effect: { aff: { xiaolongnv: 3 }, moral: 2 }, reply: ["小龙女", "多谢。你呼吸很轻，它们没有怕你。"] }
        ]
      }
    },
    zhouzhiruo_1: {
      mid: {
        atTurn: 4,
        choices: [
          { text: "「受人一碗粥便记一辈子，这正是周姑娘难得之处。」", effect: { aff: { zhouzhiruo: 4 }, exp: 25 }, reply: ["周芷若", "（耳根微热，低头拨了拨碗沿）少侠莫取笑我心窄便好。"] },
          { text: "「师门规矩是死的，救人济困才是活理。」", effect: { moral: 3, aff: { zhouzhiruo: 3 } }, reply: ["周芷若", "若是师父在此定要罚跪，但今日听你一劝，心里倒松快许多。"] }
        ]
      }
    },
    renyingying_1: {
      mid: {
        atTurn: 4,
        choices: [
          { text: "闭目倾听雨打竹叶的节拍，轻轻以指叩案相和", effect: { aff: { renyingying: 4 }, exp: 30 }, reply: ["任盈盈", "（眸光微亮）原来你也听得出第四拍落在竹叶上。"] },
          { text: "替她把快凉的茶盏换上温茶，静候她理顺曲意", effect: { aff: { renyingying: 3 }, moral: 2 }, reply: ["任盈盈", "有劳。茶还热着，这首旧调倒也没那么冷清了。"] }
        ]
      }
    },
    guojing_1: {
      mid: {
        atTurn: 4,
        choices: [
          { text: "「守城靠将士，也靠修梯挑水的百姓，一碗也不能漏。」", effect: { moral: 4, aff: { guojing: 4 } }, reply: ["郭靖", "正是此理！少侠一语道破郭某心中所想！"] },
          { text: "先拿干净布巾替小童包好带给姐姐的干粮", effect: { moral: 3, aff: { guojing: 3 }, exp: 25 }, reply: ["郭靖", "少侠心细如发，比郭某周到多了。"] }
        ]
      }
    },
    zhangwj_1: {
      mid: {
        atTurn: 4,
        choices: [
          { text: "「医者仁心不论门户，张教主这份胸襟令人佩服。」", effect: { moral: 3, aff: { zhangwj: 4 } }, reply: ["张无忌", "教主虚名罢了，能少见一个人带伤下山才算实在。"] },
          { text: "主动挽袖帮他把受潮的绷带拿到圣火旁烘烤", effect: { aff: { zhangwj: 3 }, exp: 30 }, reply: ["张无忌", "多谢相助！烘干这六卷，今夜山道换岗便够用了。"] }
        ]
      }
    }
  };

  // 第 2 幕满羁绊收官礼赠（确保全部 12 位同道无论走技艺线或同行线均获专属永久馈赠）
  const ACT2_KEEPSAKE = {
    xiaolongnv: { item: "yufeng_jar", attr: { agi: 1 } },
    zhouzhiruo: { item: "hanshui_silk", attr: { int: 1 } },
    renyingying:{ item: "guqin_score", attr: { luck: 1 } },
    guojing:    { attr: { con: 1 } },
    linghu:     { attr: { agi: 1 } },
    yangguo:    { item: "ore_xuantie", attr: { str: 1 } },
    zhangwj:    { attr: { con: 1 } },
    qiaofeng:   { attr: { str: 1 } },
    tianbg:     { attr: { agi: 1 } },
    oyfeng:     { item: "poison_gall", attr: { int: 1 } }
  };

  function registerMateStory(mateId, title, summary, acts) {
    const mate = JY.MATES.find(m => m.id === mateId);
    const firstId = "mate_deep_" + mateId + "_1";
    const firstTestFlag = firstId + "_tested";
    const episodes = acts.map((act, index) => {
      const id = "mate_deep_" + mateId + "_" + (index + 1);
      const varKey = mateId + "_" + (index + 1);
      const spec = MATE_VARIETY[varKey] || {};
      const affinity = index === 0 ? 40 : 70;
      const [skill, level] = Object.entries(act.test)[0];
      const steps = [
        { show: { right: mate.art, active: "right" }, nar: act.scene }
      ];

      // 次幕分别承接技艺解法和协作解法，玩家无需为推动剧情补练技艺。
      if (act.carry) {
        steps.push(
          { ifFlag: firstTestFlag, say: [mate.name, act.carry[0]] },
          { unlessFlag: firstTestFlag, say: [mate.name, act.carry[1]] }
        );
      }

      act.talk.forEach((line, turn) => {
        if (spec.duel && turn === spec.duel.atTurn) {
          steps.push(
            { nar: spec.duel.intro },
            { battle: spec.duel.foe, healBetween: 0.35, winReward: spec.duel.reward, winNar: spec.duel.winNar },
            { show: { left: "assets/hero-portrait.webp", right: mate.art, active: "right" }, nar: "风波平息，两人相视一笑，重又回到方才的话题。" }
          );
        }
        if (spec.mid && turn === spec.mid.atTurn) {
          steps.push({ show: { active: "right" }, choice: spec.mid.choices });
        }
        const isMate = turn % 2 === 0;
        steps.push({ show: { active: isMate ? "right" : "left" }, say: [isMate ? mate.name : "主角", line] });
      });

      const extraKeep = index === 1 ? (ACT2_KEEPSAKE[mateId] || {}) : {};
      const mergeRew = (base, keep) => {
        const out = Object.assign({}, keep, base);
        if (keep.attr || base.attr) out.attr = Object.assign({}, keep.attr || {}, base.attr || {});
        return out;
      };
      const finalChoices = [
        {
          text: `【${lifeNames[skill]} Lv${level}】${act.trained.text}`,
          reqLife: act.test,
          effect: Object.assign({ aff: { [mateId]: 8 }, setFlag: id + "_tested" }, mergeRew(act.trained.reward, extraKeep)),
          reply: [mate.name, act.trained.reply]
        },
        {
          text: act.shared.text,
          effect: Object.assign({ aff: { [mateId]: 6 }, setFlag: id + "_shared" }, mergeRew(act.shared.reward, extraKeep)),
          reply: [mate.name, act.shared.reply]
        }
      ];
      if (index === 1 && !spec.duel) {
        finalChoices.push({
          text: `【并肩论武】与${mate.name}印证「${mate.comboName}」招意，共话此后江湖归处`,
          effect: Object.assign({ aff: { [mateId]: 10 }, exp: 210, setFlag: id + "_shared" }, mergeRew({}, extraKeep)),
          reply: [mate.name, `${act.shared.reply} 往后江湖路远，你我这一式合击，便留给最险的关口。`]
        });
      }
      steps.push({
        show: { active: "right" },
        choice: finalChoices
      });
      return {
        id,
        title: act.title,
        hint: `与${mate.name}结伴且好感达到 ${affinity}，回到「${JY.REGIONS_META[mate.loc].name}」找${mate.name}交谈。`,
        reqAff: { [mateId]: affinity },
        ...(index === 0 ? {} : { reqFlag: firstId + "_played" }),
        trigger: { region: mate.loc, npc: mateId },
        steps
      };
    });
    JY.registerQuest("mate_deep_" + mateId, { title, summary, episodes });
  }

  registerMateStory("huangrong", "黄蓉 · 灯下尝羹", "一锅跑了味的鱼汤，把守城的疲惫与郭府的笑声都勾了出来。", [
    {
      title: "借你半勺月亮",
      scene: "郭府后院的灶火还亮着。黄蓉踮脚去够吊在梁下的小篮，袖口蹭了一道面粉。",
      test: { cook: 2 },
      talk: [
        "来得巧！靖哥哥忙到现在还没吃饭。本姑娘煮了鲫鱼羹，第一口给你试，苦了可不许跑。",
        "灶边放着三只碗。你自己那碗，怎么比试味的还小？",
        "这个叫厨子先占便宜。鱼尾最香，我可舍不得分给你们。",
        "那我帮你取篮子。你再踮一会儿，梁上的面粉就全成你的发髻了。",
        "咯咯，嘴倒比上回利落。小篮里是炙过的橘皮，雨天容易返潮，偏偏这锅又少一点清气。",
        "我听见门外有人咳了两声。北城巡夜的也来了吗？",
        "是换下来的小卒，怕把泥踩进来，站在檐角等勺热的。我们得让这锅羹够四个人。",
        "行，你守着锅。我先把第四只碗端出来。"
      ],
      trained: {
        text: "以炙橘皮收汤，添一盏热米浆匀成四碗。",
        reward: { exp: 120, item: "dish_yudi" },
        reply: "鱼鲜、米软，连雨味都化开啦。咯咯，这勺火候算你赢，明日许你来给本姑娘打下手。"
      },
      shared: {
        text: "把自己的羹让给小卒，留下陪黄蓉烤半块饼。",
        reward: { exp: 85, moral: 4, item: "dish_chicken" },
        reply: "吃慢些，你那半块面上有我偷偷抹的蜜。嘘，靖哥哥要是闻见了，半块也保不住。"
      }
    },
    {
      title: "一城灯火，一点甜",
      scene: "北城送来几袋受潮的米。黄蓉把一张灶单压在窗棂上，单背画了两个人守着一盏灯。",
      test: { cook: 3 },
      carry: [
        "巡夜的把你那勺鱼羹夸到北城去了。几个伙夫学着晒橘皮，连我取料的小篮都认得。",
        "那小卒说，世上最不该让的便是饿肚子的那碗饭。他今日抱了两捆柴，专等给你烤饼。"
      ],
      talk: [
        "这袋米晒过还能用。本姑娘有两桩差事可派你，先选好了，才给你瞧灶单背面。",
        "瞧见一些，只有两个人。靖哥哥若回来，又该添一盏灯。",
        "他回来就负责洗碗。下回谁也别抢我写灯下小画的工夫。",
        "你在灶单最下头标了个‘甜’，这一城的人都有份？",
        "做熟的饭能送上城楼，甜的却只剩一小包糖。你若掌大灶，我便匀一点给每个守夜人。",
        "若我去送热饭呢？孩子们看见提篮的人回来，肯放下门闩去睡了。",
        "好主意。那一小包糖我就留着蒸两块年糕，你回来，在我窗前敲三下。",
        "我记三下。第一下催你开窗，后两下等着听你笑。"
      ],
      trained: {
        text: "以旺火蒸米，出锅洒糖，给今夜全班守卒分食。",
        reward: { exp: 230, moral: 6, item: "dish_yudi", legendary: "dagou_staff", attr: { int: 1 } },
        reply: "一人薄薄一层甜，整座城都记你的灶火。这根绿玉打狗棒暂托你佩着，再近一点，我替你擦去眉上那粒糖。"
      },
      shared: {
        text: "挨家送热饭报平安，回来和她分年糕。",
        reward: { exp: 165, moral: 8, item: "wine_nver", legendary: "dagou_staff" },
        reply: "敲两下时我就到窗边啦，最后一下舍不得省。绿玉打狗棒交你护身，年糕一人一块，粘住了，今晚谁也别急着走。"
      }
    }
  ]);

  registerMateStory("xiaolongnv", "小龙女 · 墓门松雪", "寒风吹坏了古墓的蜂箱。两次落雪之间，一枚铃和一盏灯成了等人回来的记号。", [
    {
      title: "雪中有回音",
      scene: "石门积着薄雪，一只玉蜂跌在白衣袖上。小龙女将它捧近石壁避风。",
      test: { cook: 2 },
      talk: [
        "蜂箱进了雪。它们还活着，只是没有力气爬回去。",
        "我生小火，用一碟温水。你先把它放在干布上。",
        "过儿小时候被蜇过，也替我捡过这样一只。他以为我没看见。",
        "你看见了，总等旁人以为你没看见，才肯说出来。",
        "世人总爱争来争去。说慢一些，有些话便只给该听的人听。",
        "灶下有蜜。若怕隔火化坏，便借陶盏外面的暖气。",
        "也可以不用火。我去挡风，你留在这里，把带雪的巢片挑开。",
        "你的手这样冷。等忙完，我把余下半盏水给你捂手。"
      ],
      trained: {
        text: "隔水缓温蜜浆，顺箱沿抹下一道细线引蜂回巢。",
        reward: { exp: 115, item: "herb_ginseng" },
        reply: "它们肯跟着你这道蜜线走。石门的蜂铃也给你一枚，过来时轻碰它一次，我会听见。"
      },
      shared: {
        text: "陪她封住风口，把尚暖的巢片逐一移入内室。",
        reward: { exp: 90, item: "herb_common", moral: 4 },
        reply: "窗缝已经不漏了。你留在这儿等水沸，手冷的也该捧碗，我去取第二只。"
      }
    },
    {
      title: "为归人留一灯",
      scene: "第二场雪夜，石室外有脚步徘徊。小龙女攥着一截旧灯芯，灯罩映出细小蜂影。",
      test: { music: 3 },
      carry: [
        "你那夜走后，玉蜂仍沿蜜线回巢。那枚小铃响了两回，我知道第二回是你。",
        "旧巢移进来之后，蜂群一直安静。我把那块干布叠好，还放在你坐的地方。"
      ],
      talk: [
        "外面是迷路的山客，连声问这是不是活死人墓。他不敢进。",
        "雪把他的脚印擦掉了。留着灯，他还能看见归路。",
        "山风会吹熄灯。过儿昨晚让人捎话，说用低一点的弦音可以穿过石门。",
        "弦音引他下来，还能把门外的风铃听清。我曾试过两音应答。",
        "我去送人也可以。你留在门口，我回来的时候把灯举高一些。",
        "你担心的是路滑，还是我一走以后，石室里又只有你自己的脚步？",
        "都有。今夜的石头太静，我想等到你回来才关门。",
        "我会守到最后一星火。困了便靠门坐，还听得见你的脚步。"
      ],
      trained: {
        text: "拨两声低弦与山客呼应，沿烛影将他引回山道。",
        reward: { exp: 215, item: "guqin_score", attr: { int: 1 } },
        reply: "山下也举灯了，他找到路了。最后这一音弹给我。你站在这里，灯就不必急着灭。"
      },
      shared: {
        text: "举灯与她结伴送人下坡，同回石室守到天明。",
        reward: { exp: 165, moral: 9, item: "jinchuang" },
        reply: "你走在外侧，肩上落雪比我多。让我拂掉。今夜我有你同走，有你在便好。"
      }
    }
  ]);

  registerMateStory("zhouzhiruo", "周芷若 · 水纹留字", "峨眉山上的一只旧碗，牵出渡口欠下的人情，也让严苛的山规有了一扇能推开的门。", [
    {
      title: "碗底汉水痕",
      scene: "峨眉山廊下，周芷若对着一只缺口陶碗练字。砚里一点水干了又添。",
      test: { alchemy: 2 },
      talk: [
        "山下有几户人家捎来药钱，师门账册没有这条规矩。我若收下，总得给他们个交代。",
        "你把钱放在碗里，是要退回去，还是先替他们收着？",
        "汉水有年涨得凶，船家分我一碗粥，自己却挨了饿。临走我也想还钱，那老人把我手合了回去。",
        "这只碗，就是那位老人留你的？",
        "他不记我的名字，只说日后有余粮，记得请旁人吃一碗。偏偏我一算师门的药材，倒先算起自己够不够。",
        "账上还剩些金银草。你若肯教我看药渣，我们能分清干净的和受潮的。",
        "山下还有位懂药的婆婆。我原想独自把事办好，免得旁人说峨眉怕担责。",
        "有我陪你看一回账，担责时也有个人替你作证。"
      ],
      trained: {
        text: "挑净潮草，分出可用药材，留下有交代的药册。",
        reward: { exp: 125, item: "dan_chongmai", moral: 4 },
        reply: "我把你的名字写在自己旁边。谁来查账，先找我们两个。这只缺碗，你可愿帮我收着片刻？"
      },
      shared: {
        text: "陪她拜访药婆，请药婆主持收药与退钱。",
        reward: { exp: 95, item: "herb_ginseng", moral: 6 },
        reply: "婆婆收的是空碗，送回的是满碗药。你方才没催我开口，我终于能把汉水那件事讲完。"
      }
    },
    {
      title: "仍有一席留空",
      scene: "山雾刚散，小小茶席摆了三张凳。药钱已经结清，留在桌上的只有那只缺碗和几颗棋子。",
      test: { chess: 3 },
      carry: [
        "留了药册，山下的人如今凭名取药。师姊翻到我们那页，添了四个字：准以此例。",
        "药婆认得每一户人家，已替我把该还的钱送回去。她托你收下这只洗过的碗，叫我莫再替她道谢。"
      ],
      talk: [
        "我一向照师父说的，把空着的一处围严了，才敢坐下来喝茶。",
        "师父教你围棋也这样？我看白子右边有条路，本就可以留着。",
        "留着，黑子便能钻出去。师父曾说，峨眉弟子若敢留活路，就要想明白活下来的人往哪儿去。",
        "不妨摆两子作灯，让山下的人看见入口在哪。你的这席是给他们留的吗？",
        "也留给你。回来时不必向谁通报一声，我给你把凳挪近便是。",
        "棋若下到尽处，只能分输赢。要是把它当山里的图，还能分出路来。",
        "你若推得出来，就替我把路画在棋纸上。若嫌石子硌手，我们把第三张凳留给第一个走进来的人。",
        "我坐你旁边。客人来了，自会知道第三张凳上放着谁的茶。"
      ],
      trained: {
        text: "以双活解局，把棋上的空眼画成两处登山歇脚点。",
        reward: { exp: 230, attr: { int: 1 }, item: "treasure_map" },
        reply: "这张路图我会挂在廊下。你那席不画进去，免得谁以为你只是过路。"
      },
      shared: {
        text: "收起残局，陪周芷若轮流给最先上山的客人倒茶。",
        reward: { exp: 170, moral: 8, item: "dan_chongmai" },
        reply: "茶给客人喝，咱们喝碗里最后一口。今日我肯留这席，明日也愿留。"
      }
    }
  ]);

  registerMateStory("zhaomin", "赵敏 · 扇骨题款", "万安寺外摆来一盘没下完的棋。赵敏等人接局，也等人认出权衡之外的一点心思。", [
    {
      title: "郡主让你一先",
      scene: "万安寺外，赵敏拿一柄折扇拦住去路。扇面遮着木匠留下的赊账纸。",
      test: { chess: 2 },
      talk: [
        "本郡主今日兴致好，让你一先。赢了棋，我把这张赊账纸上的名字给你看。",
        "你若真想藏，这张纸早进袖子了。是哪个木匠欠你人情？",
        "是守桥的木匠不收我的钱。雨冲走一截桥，过河的人要一掌宽的好木。我找得到木，找不到肯署名领木的人。",
        "你怕我猜出你的名字，还是怕我把这个机会推给旁人？",
        "怕你笨，把我摆在明面上的棋当真。看左下，一块角地能换一条渡口。",
        "黑棋退三路，才能把那条渡口给白棋。你愿意退吗？",
        "本郡主分得清什么该退一步。你要是不通棋，也可以陪我抬两趟木头，功劳记在你头上。",
        "功劳可写木匠的名字。你要留款，等这扇子合上，我替你留。"
      ],
      trained: {
        text: "弃掉角地换外势，让两边都能领木从渡口运料。",
        reward: { exp: 135, gold: 90, item: "jade_fan" },
        reply: "桥两头的人已经肯共同领木。好眼力。扇骨里这一笔是我刚画的，你什么时候看懂了，什么时候归我讨赏。"
      },
      shared: {
        text: "卷袖和她一同抬桥木，签木匠的名字交工。",
        reward: { exp: 95, moral: 7, item: "ore_iron" },
        reply: "记木匠的功，黑板上便少了你我两个。往后谁问我是谁抬的，我小声把你的名字告诉他，他可未必敢乱传。"
      }
    },
    {
      title: "落款是两个人",
      scene: "新桥开了半日，桥柱旁的缆绳起了毛。一条小渡舟停在下游，船头系着赵敏的扇坠。",
      test: { music: 3 },
      carry: [
        "上回棋局换到的两支木工队都来了。如今他们一队补东柱，一队修西缆，谢礼要本郡主亲手转给你。",
        "木匠带了你的那份谢银。桥底还留着他刻的一对搬木小人，你挽袖的样子画得尤其实在。"
      ],
      talk: [
        "上游雨还没停。雾盖下来时船夫看不见岸，敲锣又会叫桥上人误以为停行。",
        "你把扇坠挂在船头，是在试哪种声响能过桥洞？",
        "风里清楚，水下便浑。你若肯替我试一段声音，本郡主可以在对岸给你回拍。",
        "练琴时有两手合声，我们可拿三拍作左、一拍作右。有人回拍，船夫才往前摇。",
        "你是信船夫能记住，还是信我每一拍都答得上？",
        "若我看你手势，这雾再浓也猜得出来。你若肯同行，这一趟还能坐头船。",
        "我原想叫你猜扇骨里那一笔，你偏要把我带上船。好，才合本郡主的意。",
        "等桥修好，就在旧扇题上今天的功劳。一边一个名字，由你写。"
      ],
      trained: {
        text: "调出两种易辨的短节拍，在两岸与她呼应引渡。",
        reward: { exp: 240, gold: 150, item: "guqin_score", legendary: "heiyu_jade", attr: { int: 1 } },
        reply: "雾里你敲第一拍时，我便知道你在。船全过了，这枚黑玉断续佩和扇坠一并给你。今后听到响声，本郡主可会认领。"
      },
      shared: {
        text: "陪她领乘客走上坡绕道，合写修桥题款。",
        reward: { exp: 175, moral: 7, item: "jade_fan", legendary: "heiyu_jade" },
        reply: "本郡主平生写自己名字写得最稳，今天手心竟出了汗。黑玉断续佩你贴身戴着，桥上太挤，把扇子递来，我挨着你慢慢落笔。"
      }
    }
  ]);

  registerMateStory("renyingying", "任盈盈 · 竹影答弦", "绿竹巷里丢了几页散谱，喑哑的琴弦还能替旧友道别，也能为新曲留下一拍。", [
    {
      title: "琴案给你留半边",
      scene: "绿竹巷檐下雨丝垂得很低。任盈盈拿纸压住受潮的旧谱，琴案上并着两杯还热的茶。",
      test: { music: 2 },
      talk: [
        "这几页是位竹匠借我的。他今日要离洛阳，原想请我替他弹一支故乡的小调。",
        "墨都漫到琴案边了。你若哼得一句，我替你记着。",
        "我还记得开头三音。第四声收在竹敲窗上，那年我总嫌他教得太慢。",
        "你嫌他慢，倒记得几时听到竹敲窗。他听你弹时，看出你在想这些吗？",
        "看出来也不会说。竹子最懂留白，我学了许久，仍怕余下的几拍被人当成忘词。",
        "若把前三音转到低弦，再等竹响一声，最后轻回起音，空拍就不会显得孤单。",
        "你想伴我弹，我便请竹匠坐到雨停。若是还拿不准弦位，陪我去埠头学一句他故乡的话也好。",
        "琴案给我留半边罢。日后我们再遇见想家的人，也有地方坐下来。"
      ],
      trained: {
        text: "用记得的三音织成回句，与她合奏送别。",
        reward: { exp: 130, item: "guqin_score" },
        reply: "竹匠听出来了，把原谱留给了我们。拿去晒，我等你来弹第二遍，这次我坐近些。"
      },
      shared: {
        text: "陪她到埠头送竹匠，记下乡音补在空白曲页。",
        reward: { exp: 95, moral: 5, item: "wine_nver" },
        reply: "他那句‘水长，慢走’，我打算写进尾声。方才人多，你在我身边替我留了个能说话的空隙，我记得。"
      }
    },
    {
      title: "等你回那一拍",
      scene: "巷尾挂起两支新竹管。一名小徒在门边坐着，等师父从远处捎来第一封信。",
      test: { music: 3 },
      carry: [
        "竹匠在船上还哼了那支曲，小徒说想学齐整，往后也能送别离巷的人。",
        "竹匠把埠头的乡音教给小徒，小徒说读着像曲子。我想把你写的那几字借给下一支歌。"
      ],
      talk: [
        "他总站在雨檐下等，是想听见师父同他说‘回来见’。这句太短，落在曲里我接不住。",
        "第二个人回一拍，才有‘见’字。你把弦旁边那块地方空给他吧。",
        "平时我嫌回音多，今日却想同一个人多合几拍。他学会以后，或许也会等自己的朋友。",
        "竹管有高低，换过来就有一声像叩门。你若肯先弹，他便有路进来。",
        "若他怕在生人眼前弹错，便陪我替他写一封信，曲谱留封底，请竹匠回一小段。",
        "他会选一样。你想回的那一拍，又打算留给谁？",
        "你若听得出，便从第二拍进来。每次我把琴案擦一半，剩下半边就想留给你拾掇。",
        "好。下回我到得早，留一半给你，免得你走近了还要问这一席有没有人。"
      ],
      trained: {
        text: "合奏空拍并教小徒答弦，让竹巷有了送友的新曲。",
        reward: { exp: 250, attr: { int: 1 }, item: "guqin_score", moral: 4 },
        reply: "静下来，听尾声。他会接了。下回只你我两个人，回拍留久一些，我想听你从自己心里进来。"
      },
      shared: {
        text: "陪她和小徒写信，把没填满的一页曲谱托船捎去。",
        reward: { exp: 180, moral: 8, item: "wine_monkey" },
        reply: "我替小徒封了师父的信。这里还有一封给你，写的是‘回来见’，若你今晚便回来，仍可以读。"
      }
    }
  ]);

  registerMateStory("guojing", "郭靖 · 城头分炊", "郭靖要在守城的军册里找出一群没有领到饭的人，还要请他们在城门上亲自署名。", [
    {
      title: "军册少了几行",
      scene: "郭府大堂摊开霜打过的名册。郭靖用指头一行行数，旁边坐着替工匠送饭的小童。",
      test: { cook: 2 },
      talk: [
        "我点了三回，册里确实少了人。昨夜搬箭杆的木匠不是兵，领饭时就没有他的份。",
        "夹页还写着挑水和补鞋。谁能半夜去城上干活，早晨却下不了城领饭？",
        "忙不过来时常是孩子跑腿。小童急着回去，他手里这包糠还要带给姐姐。",
        "有一篮灶上刚蒸的饼。城头冷，直接端上去不出一炷香就硬了。",
        "蓉儿说大锅小锅同样要顾得上火。我脑子笨，守一处尚可，你能帮我再守一处么？",
        "锅多烧片刻，饼裹住热羹，就能叫最远那班人吃上一口热的。",
        "也可先把守城将卒的饭让出去，我去给将卒说明。总不能因我写漏几行，叫他们跟着挨饿。",
        "你去讲，我来端。小童走得快，叫他带我们认路。"
      ],
      trained: {
        text: "将热羹与饼分装，照工匠的换岗时刻送到各处。",
        reward: { exp: 135, item: "dish_chicken", moral: 5 },
        reply: "你分锅前先问了各班几时换工。那几位木匠让小童把饭食时辰写在册尾，今后不必由我猜了。"
      },
      shared: {
        text: "先给漏记的人挨个送饭，再与郭靖找将卒补上。",
        reward: { exp: 100, item: "food_fowl", moral: 9 },
        reply: "你把头一碗递给小童，她姐姐在城上看见，方肯吃自己手里那份。这事我会记牢。"
      }
    },
    {
      title: "把名字刻在楼上",
      scene: "北城收旗，郭靖带来几块画着箭楼的木牌。一旁有块空碑，正等工匠来量尺寸。",
      test: { chess: 3 },
      carry: [
        "你定下的换岗饭时已贴到城楼，饭一到便有人交班。如今军册已经把他们一一记上了。",
        "挨户送饭那日认得的面孔，我都记在册上了。有两家忘了报姓名，今天小童带我去补。"
      ],
      talk: [
        "我想给这几班工匠留名。碑摆在城内，乡亲们却看不见城上谁在昼夜做活。",
        "刻在哪边，取决于夜里往哪里撤人。若能让碑兼作路标，他们的名字会被常常念起。",
        "兵阵行正道，木工却从小梯上下。我摆了半天兵位，背后的几块木牌总护不到。",
        "可以从最后一个退的人倒着摆。刀箭来时，他身边要有人同他走。",
        "最晚的是修天窗的木匠，只有那条窄梯。往下一级是送饼的小童，两人能彼此照应。",
        "若不用摆，也可以请每班自己走一遍，在路口写一个能让后人找着的字。",
        "让他们自己题名妥当。我跟着走一次，知道落笔时何处最费力。",
        "我同你走末班。回来的时候，带小童看看她已经会写的名字。"
      ],
      trained: {
        text: "从断后的位置逆推轮撤路线，为各班定下会合点。",
        reward: { exp: 240, moral: 7, attr: { int: 1 }, item: "treasure_map" },
        reply: "三处会合点交给三班守，不论谁先撤，都有人接。咱们请他们把自己的名字刻在亲手修过的梯口。"
      },
      shared: {
        text: "随工匠实走夜路，请每班给最险一段路题名。",
        reward: { exp: 175, moral: 10, item: "dish_yudi" },
        reply: "小童先在梯口写了一个‘家’。稍后补名，我请她把那一笔留下。人一心护自家，才护得住这一城。"
      }
    }
  ]);

  registerMateStory("linghu", "令狐冲 · 空杯悬崖", "思过崖下传来剑风，失了名册的小弟子也想在山门里练出一点自己的样子。", [
    {
      title: "三声未落杯",
      scene: "两只空杯搁在石沿，崖下有人把木剑挥得呜呜作响。令狐冲用杯底敲了敲石面。",
      test: { music: 2 },
      talk: [
        "我听了半壶酒的工夫。底下那位每到第三剑就把腕一扭，他师兄叫他好好站桩，只许练前两招。",
        "你听他换手的时候，杯子碰了石头，也断了一拍。",
        "我偏爱有断处的剑。要是每招都紧挨着前一招，江湖上对手可等不及看你排完。",
        "你想告诉他怎么接第三剑，还是想让他自己听出来？",
        "我一下去，他便以为又有师叔来考教。我给他吹两声罢，顺便问问他肯不肯帮我捎酒。",
        "余风都往坡上来。回声有一拍迟，吹满三拍便听不见他落剑。",
        "那就两拍。若你嫌我吹得难听，借你石沿这两只杯，下去跟他对上几剑。",
        "对完得让他自己试一次，把第三剑留给他。"
      ],
      trained: {
        text: "以两拍笛音留下一拍空处，引崖下弟子自己接剑。",
        reward: { exp: 130, item: "wine_monkey" },
        reply: "第三剑比咱们想的更野，哈哈！他把两拍刻在杯沿了，下回谁来罚站，这只杯归谁使。"
      },
      shared: {
        text: "带木剑下崖陪练，只对两招，由那位弟子创第三招。",
        reward: { exp: 95, item: "wine_nver", moral: 5 },
        reply: "你接歪那一下，他倒把剑接正了。行，第三招写他自个儿的名字，谁也别冒领。"
      }
    },
    {
      title: "留一路给后来剑",
      scene: "崖下放着三只杯。小弟子被问及擅传剑法，特地留了一只替自己壮胆。",
      test: { chess: 3 },
      carry: [
        "他把那只刻两拍的杯挂在练剑处。如今好几个师兄弟知道隔一拍再攻，反倒嫌他没把第三拍教清楚。",
        "那位小弟子把自己的第三剑教给你也教给我，传练的名单上只写了他一个人。得请他把余下同练的名字添上。"
      ],
      talk: [
        "管事问他旧谱里哪里写了第三剑。他愣了半日，说木剑上倒有一道缺口，可以指给人看。",
        "让他把木剑带来。谁接过他那一招，谁知道剑上为何留痕。",
        "我可以先摆个小局。大龙若一步挤死后手，你问管事这一步到底是照谱，还是僵住了。",
        "一着看十着。要叫管事见新剑的生处，咱们先让他占了木剑上那道缺口。",
        "还有一个法子。我拿三只杯设两处桩，叫管事亲自护杯。他手里有剑，便没空拘泥册子。",
        "他若护住两只，第三只便给小弟子接。要是全打翻呢？",
        "那该我赔杯。他肯当真接这三剑，总好过说一屋子的门规。",
        "我也来护一只。夜里喝酒时，恐怕还要找你借杯。"
      ],
      trained: {
        text: "摆棋示出留手的三种后路，请管事凭实招录入新剑。",
        reward: { exp: 245, attr: { int: 1 }, item: "wine_monkey" },
        reply: "谱上准留一式空名，让那小子将来自己填。倒省一口气，咱俩把这杯喝完再替他庆贺。"
      },
      shared: {
        text: "邀管事实地护杯，请各位师兄弟旁观作证。",
        reward: { exp: 175, moral: 7, item: "ore_iron" },
        reply: "只有一杯倒，赔得起。以后谁说他擅传，就来试着护另外两杯。今夜余酒你我一人一口。"
      }
    }
  ]);

  registerMateStory("yangguo", "杨过 · 不折雁翅", "杨过在活死人墓外捡到一只不肯低头的伤雁，养伤时想通了一把剑该朝哪里挥。", [
    {
      title: "一页伤翎",
      scene: "墓门旁多了一窝软草。伤雁昂头去啄杨过伸出来的手，杨过躲得比它还快。",
      test: { alchemy: 2 },
      talk: [
        "姑姑说它把伤翅缩起来，是怕人来捉。它倒比那几个说要养它的猎户更懂保命。",
        "箭伤避开了骨，伤口沾着灰。你想放了它，先得叫它有力气站起来。",
        "大的创口我见过，细翎底下那一寸皮我没收拾过。只怕给它敷药，惊飞便又裂了。",
        "可以取行囊的外伤药，请它先闻干净的裹布。旁边放谷粒，急不得。",
        "你见我一只手，倒敢叫我捧鸟。它要是咬住不放，我只有这只给它了。",
        "你托着草窝便行。我腾得开手，它看不见你的手也安心。",
        "若它不肯碰药，山口有位看鹰的老人认得鸟。去问他，不用让猎户知道它在哪。",
        "我跟你一起守着。先把剑搁在这窝草外头。"
      ],
      trained: {
        text: "辨明可用的外伤药，和杨过配合替伤雁护翅。",
        reward: { exp: 135, item: "dahuandan" },
        reply: "它啄了一口你手上的谷。药罐你收着，下次有人说这翅膀飞不了，且领来让它先啄一嘴。"
      },
      shared: {
        text: "请看鹰老人处理伤翅，与杨过守在草窝外换食水。",
        reward: { exp: 100, moral: 7, item: "jinchuang" },
        reply: "老人看得准，方才已经肯站起来了。说起来，是你头一个肯蹲下来等它自己站的。"
      }
    },
    {
      title: "剑尖朝地",
      scene: "墓外归雁掠过。杨过拿剑鞘压着一角草垫，生怕站在风口的伤雁看见寒光。",
      test: { music: 3 },
      carry: [
        "依你那日敷药法子，隔两日检查一次翎根，它能自己跳出窝了。如今不必再伸手捧它。",
        "看鹰老人拖着板车来了。他说这雁最先认得谷声，故意把食盏倒扣起来，让它往外多走两步。"
      ],
      talk: [
        "笛借到了。有只雁飞过这处便回头，恐怕听见了它的叫声。",
        "留笛子在风口吹，归群的能听见。只怕声音陌生，它把头又缩回窝里。",
        "我听姑姑吹过三声，第一声圆，后一声短，留最空一拍给石崖。回音在左边，雁就会找过去。",
        "声音若落在林里，便让吹笛人先离它远一些。你在此守着，记得把剑朝地。",
        "重剑无锋，剑朝哪边，总还有个人要掂量。把窝搬上高坡也可，旁人不许跟去惊它。",
        "你走上坡时提剑，剑穗拖在草里给我看。我押后，替你挡住来瞧的人。",
        "往常都是别人盯着杨某这一剑要劈哪儿。今日若它肯走，我宁可叫人看不见剑。",
        "那就把剑留在石上。等它飞过高坡，剩我们回来取。"
      ],
      trained: {
        text: "用圆短两音配山壁回声，帮伤雁循声重归雁阵。",
        reward: { exp: 245, attr: { agi: 1 }, item: "ore_xuantie" },
        reply: "它穿过队尾，已经找到自己的位置。石上压着我留给你的一块寒铁，随你拿去打什么。"
      },
      shared: {
        text: "陪杨过搬窝上高坡，挡住围观者，让伤雁自行起飞。",
        reward: { exp: 175, moral: 9, item: "dan_chongmai" },
        reply: "它还绕了咱们半圈。不用追，你我就坐在这里，听它飞得越来越远。"
      }
    }
  ]);

  registerMateStory("zhangwj", "张无忌 · 药匣六格", "光明顶有一匣没人肯先拿的药，张无忌想让山内山外的人都开得了盖。", [
    {
      title: "空格也登记",
      scene: "圣火大殿边的药匣空了两格。张无忌蹲在匣前，先把裂盖重新绑牢。",
      test: { alchemy: 2 },
      talk: [
        "伤者都说不要紧。后来我数出六卷用过的裹布，才知他们以为不报伤便能留药给别人。",
        "空格容易让人当成缺药，况且山下送来的药都还没写名。",
        "外伤用药先取出来，山道上有人摔伤，守门人一听说是外派的，就来问我匣子开不开。",
        "先问伤在何处。你若要我帮你腾格子，可以先认柜里哪些药已受潮。",
        "对，伤情比来路要紧。也可把药全送到我这里，请他们直接来找我，不用过守门那一关。",
        "若你明天不在呢？匣里空格也记来去，愿照着做的人便能接手。",
        "许多人肯顾别人，都怕自己做主后顾错。今日我与你一同守，由你来记第一笔。",
        "第一笔便写过路行旅，来取外伤药，不记姓派。"
      ],
      trained: {
        text: "验看药材，与张无忌分格重装并写明用途。",
        reward: { exp: 140, item: "dan_chongmai", moral: 5 },
        reply: "常用的放这两格，我让守门人用新账按伤领药。留一格专收下山行旅添的东西。"
      },
      shared: {
        text: "陪张无忌守匣诊问、抄录用药，让第二位守匣人跟着学。",
        reward: { exp: 100, moral: 8, item: "herb_ginseng" },
        reply: "守门的替我写了第二笔。受伤那位拿到药才敢报姓名，弟兄们问他坐哪儿歇脚。"
      }
    },
    {
      title: "山上山下共一匣",
      scene: "两名采药人从山下赶到。张无忌手里一张旧图缺了边，他从案角另找出一块能续上的布。",
      test: { chess: 3 },
      carry: [
        "峡口捎来一袋新药，按你的匣签分好。以后守匣的人不用等我辨完，能先发常用的了。",
        "第二位守匣人已有独自处理的册子。两个采药人问哪里能先放下一格药，不必总往殿里送。"
      ],
      talk: [
        "有些人来不及上山，有些夜里不敢走峡谷。我想在两道关中各搁一匣，先从这里拨出来。",
        "若分匣之后哪一处临时用尽，得有别人接力替他送去。",
        "我在图上用黑子代山上，白子代山下。摆过两次，最快那条道被骤雨冲过，不宜天天走。",
        "得把补匣的路留两条，把求药的路写在纸上。只剩一条时，总有人不敢走。",
        "也可今日先跟采药人走这条缓路。我把空着的匣都背上，遇行人便问哪里肯代收。",
        "遇到从前结过怨的人，也照同一张纸写么？",
        "他有不便，我听着。药照发，等缓过这一口气，愿意再讲旧事时就讲。",
        "我替你守一处。若另一处人少，咱们也肯走回去看看。"
      ],
      trained: {
        text: "用棋子演算两路互济，定下雨天出入和补药次序。",
        reward: { exp: 250, item: "dan_jiuzhuan", attr: { int: 1 }, moral: 5 },
        reply: "两处都能收药，也都能送急件。我把你的名字写在守匣轮值首行，请各派有闲人都来续。"
      },
      shared: {
        text: "沿缓路挨户拜访，与采药人先安一处就近取药点。",
        reward: { exp: 180, moral: 10, item: "dahuandan" },
        reply: "山口那家人已肯代管这匣。你瞧，半日来往的人，里头有两个昨天不肯同桌吃饭。"
      }
    }
  ]);

  registerMateStory("qiaofeng", "乔峰 · 雄关旧鼓", "一面破鼓从塞北流落聚贤庄，乔峰要请两边认得鼓声的人都来见一面。", [
    {
      title: "碗底认故音",
      scene: "聚贤庄散了宴，乔峰将酒碗倒扣在空鼓旁。几个少年在远处张望，谁也不肯先过来。",
      test: { music: 2 },
      talk: [
        "他们说这是关外的鼓，敲一下，屋里的人便要想起仇。乔某年少时听它叫过一村人吃饭。",
        "鼓面上横着好几道刀痕。你还能认出村里人怎样敲？",
        "头两下快，最后一下慢，隔着田埂也听得明白。辽人汉人在那地方都这么叫孩子回家。",
        "他们的长辈教过他们敲别的调子，难怪隔着门也要争。",
        "敲得像的那人先喝酒。要是大家都不肯过来，我便给每人舀一碗，隔着门喝也成。",
        "旧鼓上有缺，碗底也能代响。先把那三声轻轻敲出来，问他们是不是也听过。",
        "你敲乔某就应。若你愿意去请他们，不妨带这只空碗过去，看有谁肯把它盛满。",
        "我要叫他们听一回故音。最末一碗给你留着。"
      ],
      trained: {
        text: "用两处碗沿敲出长短音，引少年合敲故乡鼓调。",
        reward: { exp: 135, item: "wine_strong", moral: 4 },
        reply: "最后一声慢得真好。小子们肯露面了。乔某方才多听一会儿，竟忘了自己身在庄里。"
      },
      shared: {
        text: "拿空碗去向少年讨酒，邀请他们各讲一件故乡旧事。",
        reward: { exp: 100, item: "wine_nver", moral: 8 },
        reply: "给我盛酒的孩子说，他家也是打三下鼓便开饭。来，共饮一碗。今晚诸位的乡音都留在席上。"
      }
    },
    {
      title: "一声鼓下卸弓",
      scene: "庄门前立着两队分别打乡旗的商旅，听传有人在渡路设伏，连夜赶来讨说法。",
      test: { chess: 3 },
      carry: [
        "少年们已经会合敲那三声。他们一个认得河路，一个认得返乡车，我已经请二人站到鼓边。",
        "那晚说起乡事的少年先往渡口走了一遭。回来时他拎着两队遗下的绳索，说他爹的车也丢过一根。"
      ],
      talk: [
        "两队都有车没回来，各以为对方夺货。乔某下去拦得一阵，黑了天又有人射箭。",
        "能不能先各找一辆车？这路只有两条，若双方同时走同一条，又要起冲突。",
        "只请乔某和你前去么？他们少几个人赌气，未必就肯坐下喝酒。",
        "两边各留一半人照应火把，其余错开进山。若能一起看见断路的地方，这口气就好讲了。",
        "若不肯依次出发，我愿给两队牵马，让他们先在庄门外把弓卸下，再慢慢对账。",
        "卸弓的人想听你作证。你先拍三下鼓，叫他们认出是今夜的约定。",
        "乔某忧的是孩子把鼓声听成出征。真找出货车，头一声先请他们敲。",
        "等这顿饭开起来，分坐两排也喝得到同一坛。"
      ],
      trained: {
        text: "按两路相错的棋势排查，邀双方同见卡在塌口的车。",
        reward: { exp: 240, item: "wine_strong", attr: { int: 1 }, moral: 5 },
        reply: "车都卡在塌口，两边愿合力推出来。等着，乔某先拾柴，等他们回庄仍有热饭。"
      },
      shared: {
        text: "与乔峰给两队牵马卸弓，按绳记核对遗车去向。",
        reward: { exp: 175, moral: 10, item: "treasure_map" },
        reply: "认出车上的绳记，连骂得最响的也肯替人牵马。乔某今日端这碗酒，敬肯放下弓的人。"
      }
    }
  ]);

  registerMateStory("tianbg", "田伯光 · 刀背有账", "轻功过得了黑木崖窄索，过不了被田伯光赖下的一本旧账。", [
    {
      title: "腿快也得排队",
      scene: "黑木崖索桥头挤了一群歇脚的脚夫，一个婆婆手里翻着田伯光的欠条。",
      test: { cook: 2 },
      talk: [
        "田某要赖账，早一阵风过了崖。还站在这里听她念，是要看谁敢借我一口锅。",
        "婆婆说了，锅给排在前边的人。你抢先走过几回，她只好把你的名字写在后头。",
        "这双腿天下有数，我在她这儿倒要排到第六。她还写了哪几笔？",
        "给脚夫煮过六顿饭，柴是她捡的，过索桥时要等你第二回送过去。",
        "那会儿我把她屋檐上的柴拿走，打算明日才还。这一拖便是半年。你来站灶，我给你切肉。",
        "刀快切得齐，也得等一锅熟了再端。若还不够，咱们现去找柴。",
        "行。要是我拿这把快刀劈柴，有人笑话，你就领他来试试他劈得多快。",
        "笑话尽管听。我们先替婆婆把她的活还上。"
      ],
      trained: {
        text: "把齐整的食料分两锅下灶，先后给赶时辰的脚夫。",
        reward: { exp: 135, item: "dish_chicken", moral: 4 },
        reply: "头锅刚够前六人，你记得真准。婆婆在账上画了半个圈，另一半要我明夜自个儿来。"
      },
      shared: {
        text: "陪他拾柴劈柴，给索桥歇脚处补足七日用柴。",
        reward: { exp: 100, item: "food_ham", moral: 7 },
        reply: "柴齐了，婆婆还给田某摆了一张凳。你替我数着，下回过桥我要排到哪个便排哪个。"
      }
    },
    {
      title: "如今怎么算你",
      scene: "管索桥的人把凭条铺在麻袋上，有人在其中夹了田伯光的名字，想由他替另一个人顶账。",
      test: { chess: 3 },
      carry: [
        "婆婆照那日教我的分锅法，自己就照顾得了六班人。她说我往锅里添了东西，不能再代旁人欠一笔。",
        "柴记给田某，锅另欠人情。婆婆把两笔写开了，叫我若看不惯偷挪名字，就自己去管索的地方问。"
      ],
      talk: [
        "有人听我认了欠账，把脚夫落水没交的桥钱也挑给我。数不多，名头是替人认个逃差。",
        "真认下了，那脚夫回来又怎么过桥？他得知道自己的凭条还在。",
        "我趁夜把扔水里的几张捞回来了。只是这凭条上三道戳，每道都说自己盖得先。",
        "把先后三个位置排成局，盯住哪一格总有人绕过去。谁盖了空戳，自会看得出来。",
        "也可以找当日上索的几个人当场对号。你问人，我去喊管索的送来真章。",
        "你要堂堂正正去喊，别把人从半空拎来。",
        "田某肯走回头路，已经费了天大的心。行，我给门敲两下等他开，手不扶刀。",
        "咱们把应补的数说明白，也给落水的人留个认领凭条的地方。"
      ],
      trained: {
        text: "用棋势复排三道桥戳，找出调换落水凭条的经手人。",
        reward: { exp: 235, item: "jade_fan", attr: { agi: 1 }, moral: 5 },
        reply: "经手的认了，把十几张凭条都换回来。婆婆说我认账挑得准，今晚可先挑一张离火近的凳。"
      },
      shared: {
        text: "请同船脚夫和管索的逐一对号，让失主自行领回。",
        reward: { exp: 170, item: "wine_nver", moral: 9 },
        reply: "他领回头一张，走之前又问我吃过饭没有。多年前我从他摊上拿了两串肉，等过桥咱们去一道还。"
      }
    }
  ]);

  registerMateStory("oyfeng", "欧阳锋 · 蛇杖不响", "长安西市有人冒白驼山之名卖药。欧阳锋追着假名到了空棚，发现最难辨的是自己早年留下的真痕迹。", [
    {
      title: "落款前留三寸",
      scene: "西市的旧医棚挂了白驼旗。欧阳锋站在门槛外，铁杖头在石板上转了半圈。",
      test: { alchemy: 2 },
      talk: [
        "桀桀，借本座的名头也罢了。货柜里连干净药罐都没有，还敢说是白驼秘药。",
        "一家铺说先要花钱试药，另一家说试过才给方。你要先揭哪一处？",
        "两处的封纸各留了三寸。白驼山从前留地方打验记，这两家却用空白遮柜里的次货。",
        "这手法与本座旧例挨得也太近。遇到来买药的人，让他们看封记，还得看药柜。",
        "知道得不少。你若懂得察药，我就许你开一屉验看，看完请买主自己上前辨。",
        "若先让货商报来路，以前跟人领过药的人也能站出来认账。",
        "敢冒我的名，便该当面对一回账。若有一个人见我便跑，我只拦门，不动手。",
        "我站在门里。对完药，我问买的人肯不肯作一份见证。"
      ],
      trained: {
        text: "辨查封记与药材，将认出的假货封存给买主查验。",
        reward: { exp: 145, item: "dan_chongmai" },
        reply: "买主自己认出了两罐，你只指出一罐。很好，辨真假的眼力叫人学了去，本座也不怕。"
      },
      shared: {
        text: "请铺主和买主当面对账，借账册厘清来源与欠款。",
        reward: { exp: 100, item: "herb_ginseng", moral: 6 },
        reply: "有个人认出我，仍敢站到你身边对账。白驼旧印我拿回来，余下赔还的银数由他们写。"
      }
    },
    {
      title: "荒棚撤去旧旗",
      scene: "白驼旗落在桌上。一车过路人的行囊还扣在假药铺里，欧阳锋用拐杖抵着要合拢的后门。",
      test: { chess: 3 },
      carry: [
        "认过假药的两位买主给西市各铺写了新告示。这家要搬柜跑，他们先来堵住了车。",
        "你讲清的来路已经在账上，药商一一按过指印。失主照着账赶来认行囊，比本座想的齐。"
      ],
      talk: [
        "十袋行囊扣着抵银。铺主打算趁门开时带二辆车走，我看错一次，他倒以为能再骗一次。",
        "你若在前门挡他，后门的小工便要赶车往市口撞。得有人先把他要经过的摊位空出来。",
        "摆盘棋。两车伸不开头处是这道门，两侧若还能落子，便可请双方自己慢慢退下来。",
        "把最窄处让给迎回行囊的人，铺主仍有路去账房。那里几位商人都等着作证。",
        "我也能亲手卸车，打开一包让买主来认，再让货商赔足钱。那面旗我揭掉，省得明日还有人照着画。",
        "旗角这个印是你先前私用的，右下多了一笔。既拿回来了，想给谁看？",
        "本座还没想好。你方才叫我当着那么多人承认旧印，我肯照做一回，已够你吹嘘。",
        "我替你把旧印折进旗里，让下一位来对账的人先看自己的名字。"
      ],
      trained: {
        text: "算准双车错开的路，护买主取囊，再送铺主到商会。",
        reward: { exp: 255, gold: 145, item: "ore_xuantie", attr: { int: 1 } },
        reply: "两车一停，所有人都看见货主自己领回了东西。桀桀，你连对面还剩哪一步也算了，本座记着。"
      },
      shared: {
        text: "与他卸车逐包核验，公开撤旗并请商会登记退款。",
        reward: { exp: 180, moral: 9, item: "dahuandan" },
        reply: "旗还给本座，旧印给商会挂着，下回若卖假药的敢印，他们便认得。有人问是谁起的头，叫他来问我。"
      }
    }
  ]);
})(window);


/* ===== data/stories/finale_huashan.js ===== */
/* =====================================================================
   山河十四卷 v1.0 · 华山论剑终局大戏（命运总汇演 + 道德分流三阵剧情连战）
   ===================================================================== */
(function (root) {
  "use strict";
  const JY = root.JY;

  JY.registerQuest("finale_huashan", {
    title: "终局大戏 · 华山论剑问鼎天下",
    summary: "登临华山之巅，携一路结交之同道红颜、门派渊源与所集天书，迎战天下绝顶高手三阵连战！",
    episodes: [
      {
        id: "huashan_finale_gauntlet",
        title: "华山之巅 · 三阵问鼎",
        hint: "【论剑英雄帖资格：集5部天书 · 武功Lv6 · 通6处经脉 · 3次江湖悬赏】前往「华山之巅 · 候剑避风棚」寻秦拂石开启三阵终局连战！",
        reqTianshu: 5,
        reqSkillLv: 6,
        reqMeridians: 6,
        reqBounties: 3,
        trigger: { region: "huading", room: "hd_shelter", npc: "hd_steward" },
        onComplete: function () {
          if (!JY.S || !JY.S.P) return;
          JY.S.P.flags.v3_ending = true;
          JY.S.P.flags.huashan_gauntlet_won = true;
          JY.addChronicle("华山之巅三阵连克天下群雄，问鼎武林至尊！");
          setTimeout(() => JY.UI.showEndingModal(), 250);
        },
        steps: function (P) {
          const heroArt = "assets/hero-portrait.webp";
          const tsCnt = Object.keys(P.tianshu || {}).length;
          const sectInfo = P.sect ? JY.SECTS[P.sect] : null;
          const rankName = JY.moralityRank ? JY.moralityRank(P.morality) : "江湖侠客";
          const mate = P.mate ? JY.MATES.find(m => m.id === P.mate) : null;
          const conf = P.confidant ? JY.MATES.find(m => m.id === P.confidant) : null;

          // 按道德阵营动态决定第一阵强敌与江湖群雄点评
          const firstFoe = P.morality >= 20
            ? { id: "jinlun_boss", name: "金轮法王", art: "assets/foe-jinlun.webp",
                line: "哼！中原正道近年尽传你的侠名。今日华山之巅，便让本座十层龙象般若功称一称你的斤两！" }
            : P.morality <= -20
              ? { id: "zuo_lengchan", name: "左冷禅", art: "assets/foe-guardian.webp",
                  line: "魔道狂徒也敢登华山绝顶？今日左某便以寒冰真气替五岳正道清理门户！" }
              : { id: "jiumozhi", name: "鸠摩智", art: "assets/foe-jinlun.webp",
                  line: "阿弥陀佛！施主无拘无束、博采百家，正合小僧以火焰刀与小无相功切磋印证！" };

          // 汇总玩家一路留下的重大江湖抉择回顾
          const deeds = [];
          if (P.flags.she_trap_plan || P.flags.she_ep4_done) deeds.push("襄阳城头力破蒙古铁骑");
          if (P.flags.juxian_sided_qiao) deeds.push("聚贤庄与乔峰共饮生死绝交酒");
          if (P.flags.xiao_ep4_done) deeds.push("黑木崖成德殿正面接下绣花疾针");
          if (P.flags.sanxiu_followup_completed) deeds.push("无门无派以散修之身重立剑冢无名碑");
          if (sectInfo) deeds.push(`承袭「${sectInfo.name}」衣钵扬名武林`);
          if (tsCnt >= 14) deeds.push("竟已集齐全部十四部天书，世所罕见");
          else if (tsCnt >= 7) deeds.push(`身负 ${tsCnt} 部天书秘闻，震动黑白两道`);
          const deedLine = deeds.length
            ? `山下群雄早把你的名号传遍——${deeds.slice(0, 3).join("，")}！`
            : "你虽出身微末，却凭一双铁掌与一身胆气硬生生闯上这万仞绝顶！";

          const list = [
            { nar: "朔风卷云，华山之巅石坪四周早已立满天下各大门派观礼名宿。秦拂石敲响三声青铜论剑钟，群雄霎时鸦雀无声！" },
            { show: { left: heroArt, right: "assets/npc-hermit.webp", active: "right" },
              say: ["秦拂石", `${P.name}少侠，你以「${rankName}」之名登顶。${deedLine} 今日华山论剑三阵连战，敢否一气闯过？`] },
            { show: { active: "left" },
              say: ["主角", "既已踏上这华山绝顶，便无退步之理。天下英雄，请出招罢！"] }
          ];

          // 随行同道或红颜知己战前专属助威
          const cheerMate = mate || conf;
          if (cheerMate) {
            list.push({
              show: { left: cheerMate.art, right: "assets/npc-hermit.webp", active: "left" },
              say: [cheerMate.name, conf && conf.id === cheerMate.id
                ? `山风再大，我都在场边替你看着每一招。放手去打，今夜咱们在云海之上同饮庆功酒！`
                : `好生痛快！有我在旁助阵，管他什么绝顶宗师，尽管上阵便是！`]
            });
          }

          // 第一阵：立威之战
          list.push(
            { show: { left: heroArt, right: firstFoe.art, active: "right" },
              nar: `第一阵钟响！${firstFoe.name}纵身跃入石坪中央，狂风骤起，杀气直逼面门！` },
            { say: [firstFoe.name, firstFoe.line] },
            { battle: firstFoe.id, healBetween: 0.45,
              winReward: { exp: 420, gold: 280 },
              winNar: `第一阵告捷！你力克${firstFoe.name}，石坪四周爆发震天喝彩，稍微运功调息恢复四成半气血！` },
            // 第二阵：绝巅之战 · 东方不败
            { show: { left: heroArt, right: "assets/foe-dongfang.webp", active: "right" },
              nar: "未待尘埃落定，一抹红影如鬼魅般飘落场中，绣花针在日光下折射出摄魂寒芒——第二阵，东方不败！" },
            { say: ["东方不败", "咯咯，能赢第一阵倒还有些意思。只是不知你的身法，快不快得过我手中这根绣花针？"] },
            { battle: "dongfang_boss", healBetween: 0.55,
              winReward: { exp: 650, gold: 420, item: "dahuandan" },
              winNar: "第二阵再胜！你竟正面破去葵花疾影，令东方不败抚袖叹服退场！你运功调息，气血回复五成半，迎接最后一阵！" },
            // 第三阵：天下第一 · 王重阳
            { show: { left: heroArt, right: "assets/foe-wangcy.webp", active: "right" },
              nar: "云海豁然洞开，道袍拂风而至。中神通王重阳拔起插在石坪中央的无鞘长剑，气度渊渟岳峙，宛如高山仰止！" },
            { say: ["王重阳", `${tsCnt >= 14 ? "十四天书尽归一人，百年武林未有之盛事！" : "好个后起之秀，连闯两阵而气势不衰！"} 来罢，接贫道这最后一阵「先天功」，今日华山第一之名，便看你能否亲手接下！`] },
            { battle: "wangcy_boss",
              onWinFlag: "huashan_gauntlet_won",
              winReward: { exp: 1200, gold: 888, item: "dan_jiuzhuan" },
              winNar: "三阵全胜！先天罡气散作漫天流云，王重阳收剑长笑，天下群雄齐声拱手称尊！" },
            { show: { left: heroArt, right: "assets/foe-wangcy.webp", active: "right" },
              say: ["王重阳", `长江后浪推前浪。从今日起，「${P.name}」三字，当刻于华山绝顶之上，与日月同辉！`] }
          );
          return list;
        }
      }
    ]
  });
})(window);


/* ===== data/events/bounties_demo.js ===== */
/* =====================================================================
   山河十四卷 v1.0 · 动态悬赏池与藏宝图奇遇池（外包包 C 可直接扩充本池）
   ===================================================================== */
(function (root) {
  "use strict";
  const JY = root.JY;

  JY.registerEvents([
    { id: "bnt_bandit1", kind: "bounty", title: "清剿镇东山贼", desc: "悦来镇东后林频现山贼劫掠樵夫，剿灭一名黑风山贼即可领赏。", targetEnemy: "shanzei", reward: { gold: 90, exp: 80, moral: 4 } },
    { id: "bnt_boss1",   kind: "bounty", title: "悬赏：黑风寨大当家", desc: "襄阳官府悬红缉拿黑风寨大当家（襄阳城外·黑风山寨）。", targetEnemy: "bandit_boss", reward: { gold: 240, exp: 190, moral: 8, item: "ore_iron" } },
    { id: "bnt_spy",     kind: "bounty", title: "肃清蒙古暗桩", desc: "襄阳城暗巷夜探或城外古碑发现蒙古死士，斩草除根奖厚银与冲脉丹。", targetEnemy: "xiangyang_spy_elite", reward: { gold: 320, exp: 260, moral: 10, item: "dan_chongmai" } },
    { id: "bnt_juxian",  kind: "bounty", title: "聚贤庄试手切磋", desc: "前往聚贤庄演武厅击败一名聚贤庄悍客，扬名中原。", targetEnemy: "juxian_elite", reward: { gold: 360, exp: 310, item: "wine_strong" } },
    { id: "bnt_mongol",  kind: "bounty", title: "襄阳北城御敌令", desc: "登襄阳北城箭楼击退蒙古千夫长巴图，获巨额军功赏赐！", targetEnemy: "mongol_commander", reward: { gold: 650, exp: 580, moral: 15, item: "ore_xuantie" } },
    // 藏宝图挖宝目标池
    { id: "tr_1", kind: "treasure", region: "yuelai",    room: "yl_forest",     clue: "藏宝图绘着悦来镇东竹林深处的三棵古松下……", reward: { gold: 220, exp: 120, item: "herb_ginseng" } },
    { id: "tr_2", kind: "treasure", region: "chengwai",  room: "cw_mine",       clue: "藏宝图指向襄阳城外松林矿脉溪畔的一块青石板下……", reward: { gold: 260, exp: 140, item: "ore_xuantie" } },
    { id: "tr_3", kind: "treasure", region: "xiangyang", room: "xy_alley",      clue: "藏宝图隐约标出襄阳暗巷最深处断墙的暗砖……", reward: { gold: 340, exp: 180, item: "dan_chongmai" } },
    { id: "tr_4", kind: "treasure", region: "juxian",    room: "juxian_cellar", clue: "藏宝图画着聚贤庄后院酒窖最里排的空酒坛底……", reward: { gold: 380, exp: 200, legendary: "ruanwei_armor" } }
  ]);
})(window);


/* ===== data/events/bounties_full.js ===== */
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


/* ===== data/events/travel_events.js ===== */
/* =====================================================================
   山河十四卷 v1.0 · 跨城旅途随机奇遇池（10 种鲜活江湖路遇，让闯荡大世界活起来）
   ===================================================================== */
(function (root) {
  "use strict";
  const JY = root.JY;

  JY.TRAVEL_EVENTS = [
    {
      id: "tr_escort", title: "官道劫镖", tag: "侠义",
      art: "assets/foe-bandit.webp",
      desc: "行至半途荒坡，忽见一伙蒙面悍匪围住福威镖局的红旗镖车，镖头肩头中刀，眼看便要撑不住！",
      choices: [
        { text: "⚔ 拔刀相助，击退劫匪护镖", battle: "shanzei",
          winReward: { moral: 8, exp: 95, gold: 85 },
          winNar: "你三两招击溃劫匪，镖头抱拳重谢，奉上酬银 85 两！" },
        { text: "💊 抛去一包金疮药助其脱险，自己不恋战（耗金疮药×1）", reqItem: "jinchuang",
          effect: { moral: 5, exp: 75, gold: 45 },
          msg: "镖师接药止血杀出重围，临别高声赞你义气！" },
        { text: "绕道山林避开是非，继续赶路", effect: {}, msg: "你勒马绕行林间小径，平安抵达目的地。" }
      ]
    },
    {
      id: "tr_merchant", title: "西域神秘行商", tag: "奇珍",
      art: "assets/npc-baixiaosheng.webp",
      desc: "路旁驼队歇脚，一名碧眼胡商见你气度不凡，压低声音掀开毡布：「少侠，急着赶路脱手一批好货，半价结个善缘！」",
      choices: [
        { text: "💰 120 两抢购「冲脉丹」×1（原价 240 两）", reqGold: 120,
          effect: { gold: -120, item: "dan_chongmai" },
          msg: "胡商哈哈一笑，将封蜡完好的冲脉丹递到你手中。" },
        { text: "💰 110 两抢购「天外寒铁」×1（原价 220 两）", reqGold: 110,
          effect: { gold: -110, item: "ore_xuantie" },
          msg: "沉甸甸的玄色奇矿入手冰凉，正是绝佳锻造神料！" },
        { text: "💰 80 两买下「残破藏宝图」×1（原价 150 两）", reqGold: 80,
          effect: { gold: -80, item: "treasure_map" },
          msg: "你收起泛黄藏宝图，准备寻机一探究竟。" },
        { text: "拱手谢绝，继续前行", effect: {}, msg: "你向胡商拱手告别，策马继续上路。" }
      ]
    },
    {
      id: "tr_wounded_hermit", title: "古庙负伤高人", tag: "奇遇",
      art: "assets/npc-hermit.webp",
      desc: "你在官道破庙避风，竟见一名白发老者靠柱喘息，胸口带毒掌印，身旁散落几卷发黄武学札记。",
      choices: [
        { text: "💊 赠予「金疮药」并替他运功护脉（耗金疮药×1）", reqItem: "jinchuang",
          effect: { moral: 10, exp: 185, item: "dan_chongmai" },
          msg: "老者服药稳住内息，大喜之下指点你三招破敌心得，并赠你冲脉丹一粒！" },
        { text: "🔥【炼丹 Lv2】就地采草配解毒散相救", reqLife: { alchemy: 2 },
          effect: { moral: 12, exp: 230, attr: { con: 1 } },
          msg: "你妙手解毒令老者叹服，他以精纯内力替你疏通经脉，根骨永久 +1！" },
        { text: "趁机顺走几两散碎银钱便走", effect: { moral: -10, gold: 90 },
          msg: "你暗中摸走一袋散银匆匆离去，心中隐有不安。" }
      ]
    },
    {
      id: "tr_tea_gossip", title: "十里茶寮听风", tag: "线索",
      art: "assets/npc-baixiaosheng.webp",
      desc: "道旁茅草茶寮炊烟袅袅，几名走镖汉子正高谈阔论天下大事，你不妨坐下歇一口茶，顺便打探消息。",
      choices: [
        { text: "🍵 花 10 两请众人喝茶，打听江湖秘闻（+20精力 +随机剧情线索）", reqGold: 10,
          effect: { gold: -10, exp: 60 },
          onPick: function () {
            JY.S.P.energy = Math.min(JY.S.P.maxEnergy, JY.S.P.energy + 20);
            const openQ = Object.values(JY.QUESTS).find(q => q.episodes.some(JY.Story.meetsRequirements));
            const ep = openQ && openQ.episodes.find(JY.Story.meetsRequirements);
            if (ep) JY.addLog(`🍵 茶客低声透露线索：【${openQ.title}】— ${ep.hint}`, "talk");
          },
          msg: "一杯热茶下肚，精力大复，还顺道听来一条鲜活的江湖风声！" },
        { text: "只喝凉水歇脚（免费恢复 12 点精力）", effect: {},
          onPick: function () { JY.S.P.energy = Math.min(JY.S.P.maxEnergy, JY.S.P.energy + 12); },
          msg: "稍作歇息后你精神一振，继续踏上行程。" }
      ]
    },
    {
      id: "tr_chess_stall", title: "路边残局棋摊", tag: "雅趣",
      art: "assets/npc-hermit.webp",
      desc: "古槐树下摆着一盘「七星聚会」江湖残局，摆摊老叟捋须笑道：「十两银子一局，破得开老夫赔你十倍彩头！」",
      choices: [
        { text: "♟【弈棋 Lv2】一眼看破暗劫，落子破局赢彩头！", reqLife: { chess: 2 },
          effect: { gold: 130, exp: 120 },
          msg: "三步之后老叟目瞪口呆，拱手认输奉上 130 两彩银！" },
        { text: "♟ 花 10 两试手切磋，顺便精进棋艺", reqGold: 10,
          effect: { gold: -10, exp: 75 },
          onPick: function () { if (JY.gainLifeExp) JY.gainLifeExp("chess", 35); else JY.S.P.lifeExp.chess = (JY.S.P.lifeExp.chess || 0) + 35; },
          msg: "虽未全胜却学到几手奇招，弈棋感悟大增！" },
        { text: "笑笑走开，不贪小利", effect: {}, msg: "你微微一笑转身离去。" }
      ]
    },
    {
      id: "tr_ambush", title: "山道黑影截杀", tag: "险境",
      art: "assets/foe-bandit.webp",
      desc: "山谷雾起，数道寒光从林梢扑落！竟是听闻你身怀重宝的江湖绿林悍匪半路设伏！",
      choices: [
        { text: "⚔ 正面迎敌，杀他个片甲不留！", battle: "canal_robber",
          winReward: { exp: 130, gold: 95, item: "ore_iron" },
          winNar: "你干净利落击溃伏兵，缴获百炼精铁与一袋盘缠！" },
        { text: "💨 施展轻功抽身掠过山坡（-6精力）", effect: { exp: 40 },
          onPick: function () { JY.S.P.energy = Math.max(0, JY.S.P.energy - 6); },
          msg: "你身法如烟掠出包围圈，令伏兵扑了个空！" }
      ]
    },
    {
      id: "tr_herb_valley", title: "幽谷奇药灵泉", tag: "采掘",
      art: "assets/scene-wild.webp",
      desc: "马蹄踏过溪畔松林，一阵清冽药香扑鼻而来——山岩缝间竟生长着几株难得一见的野山参与金银草！",
      choices: [
        { text: "🌿 驻足采药并饮一口灵泉（+草药/老参 +气血恢复）",
          effect: { item: "herb_ginseng", exp: 55 },
          onPick: function () {
            const st = JY.getStats(JY.S.P);
            JY.S.P.inv.herb_common = (JY.S.P.inv.herb_common || 0) + 2;
            JY.S.P.hp = Math.min(st.maxHp, JY.S.P.hp + 120);
          },
          msg: "你采得长白老参×1、金银草×2，饮泉后精神焕发！" },
        { text: "不耽误行程，直接策马而过", effect: {}, msg: "你记下山谷方位，继续快马赶路。" }
      ]
    },
    {
      id: "tr_music_scholar", title: "竹亭落魄琴师", tag: "雅趣",
      art: "assets/npc-hermit.webp",
      desc: "溪边竹亭中一位落魄琴师抱琴叹息，琴弦已断两根，正缺盘缠修琴。",
      choices: [
        { text: "🎵【音律 Lv2】替他重张琴弦并合奏一曲", reqLife: { music: 2 },
          effect: { moral: 6, exp: 140, item: "guqin_score" },
          msg: "琴师听罢拍案称绝，将珍藏的《清心普善残谱》慷慨相赠！" },
        { text: "💰 赠他 30 两银子修琴结缘", reqGold: 30,
          effect: { gold: -30, moral: 8, exp: 110 },
          msg: "琴师感激涕零，赠你一曲清音壮行，你心境澄明修为大增！" },
        { text: "默默听罢残曲离去", effect: {}, msg: "你在溪声与残弦中驻足片刻，继续赶路。" }
      ]
    }
  ];
})(window);


/* ===== js/core/state.js ===== */
/* =====================================================================
   山河十四卷 v1.0 · 核心引擎 1：状态管理、12时辰、综合属性公式、三栏位存档
   ===================================================================== */
(function (root) {
  "use strict";
  const JY = root.JY;

  JY.SAVE_VER = 30;
  JY.SAVE_META = "jyjh_v3_meta";
  JY.SAVE_PRE = "jyjh_v3_slot_";
  JY.S = null; // 全局当前会话

  JY.clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  JY.rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  JY.pick = arr => arr[Math.floor(Math.random() * arr.length)];
  JY.esc = s => String(s || "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  JY.freshState = function (name, originId, alloc) {
    const ori = JY.ORIGINS.find(x => x.id === originId) || JY.ORIGINS[0];
    const attrs = { str: 10, agi: 10, int: 10, con: 10, luck: 10 };
    if (ori.bonus) Object.keys(ori.bonus).forEach(k => { attrs[k] += ori.bonus[k]; });
    if (alloc) Object.keys(alloc).forEach(k => { attrs[k] += (alloc[k] || 0); });
    const life = { alchemy: 1, forge: 1, cook: 1, music: 1, chess: 1 };
    if (ori.life) Object.assign(life, ori.life);

    const P = {
      name: (name || "").trim() || "无名少侠",
      origin: ori.id,
      sect: null,
      attrs,
      gold: ori.gold || 100,
      exp: 120,           // 武学修为池（用于升级武功与打通奇经八脉）
      morality: 0,
      energy: 100,        // 精力（采集/锻造/远行消耗，客栈歇息回复）
      maxEnergy: 100,
      learned: {
        taizu: { lv: 2 },
        songfeng: { lv: 1 },
        dianxue: { lv: 1 },
        tuna: { lv: 2 },
        caofei: { lv: 1 }
      },
      equipped: { outer: ["taizu", "songfeng", "dianxue"], inner: "tuna", light: "caofei" },
      meridians: {},      // meridianId -> 0..3
      gear: { weapon: null, armor: null, trinket: null, boots: null },
      bagGear: [],        // 备用词条装备/神兵
      inv: { jinchuang: 3, yulu: 2, herb_common: 2, food_fowl: 1, food_ham: 1 },
      life,               // 五大生活技艺等级
      lifeExp: { alchemy: 0, forge: 0, cook: 0, music: 0, chess: 0 },
      foodBuff: null,     // { name, atkPct, crit, battles }
      songBuff: null,     // { id, name, battles, regenHp, defPct, shieldPct, startMp, crit, synergyBonus }
      chessSolved: {},    // 已破珍珑残局 id -> true
      sectClaimDay: 0,    // 上次领取门派每日俸禄的江湖日数
      guestSects: {},     // 已获客卿玉牌的门派 key -> true
      travelCd: 0,        // 跨城奇遇冷却步数
      towerFloor: 0,      // 藏经阁无尽宗师试炼塔已通最高层数
      ngPlus: 0,          // 宗师轮回重修周目数（0=一周目，1=二周目...）
      mates: [],          // 已结交同道/红颜 id
      mate: null,         // 当前随行同道 id
      aff: {},            // id -> 0..100
      confidant: null,
      tianshu: {},        // 14 天书 id -> true
      flags: {},          // 全局世界变量（真分支后果）
      searched: {},       // 已搜查房间暗格 id -> true
      bounties: [],       // 当前已接悬赏 id 列表
      bountyDone: {},     // 已完成悬赏计数
      treasureTarget: null, // 当前藏宝图指向 { id, region, room, clue }
      chronicle: ["踏出悦来镇牌坊，一段属于你的江湖传奇正式启幕。"],
      hp: 0
    };
    const st = JY.getStats(P);
    P.hp = st.maxHp;
    return {
      v: JY.SAVE_VER,
      slot: 1,
      day: 1,
      timeIdx: 4, // 辰时·白昼开局
      region: "yuelai",
      room: "yl_gate",
      P,
      idle: null,
      logs: []
    };
  };

  JY.moralityRank = function (m) {
    if (m >= 60) return "一代大侠";
    if (m >= 20) return "侠义之士";
    if (m >= -19) return "江湖散人";
    if (m >= -59) return "亦正亦邪";
    return "魔道巨擘";
  };

  // 计算当前门派 4 阶位阶与专属师门被动光环（完成 3 幕自动获客卿玉牌可无损转投他门）
  JY.SECT_AURAS = {
    shaolin:  { stat: "hpPct",   per: 0.06, stat2: "defPct", per2: 0.05, desc: "金刚禅体：气血与防御随位阶提升" },
    wudang:   { stat: "shieldPct",per:0.10, stat2: "defPct", per2: 0.05, desc: "太极圆转：护体盾量与防御随位阶提升" },
    gaibang:  { stat: "breakDmg",per: 0.06, stat2: "goldPct",per2: 0.08, desc: "天下大帮：破甲增伤与银两收益随位阶提升" },
    huashan:  { stat: "crit",    per: 0.04, stat2: "atkPct", per2: 0.05, desc: "华山剑心：会心率与攻击随位阶提升" },
    emei:     { stat: "dotPct",  per: 0.12, stat2: "atkPct", per2: 0.05, desc: "金顶剑意：流血/持续伤害与攻击随位阶提升" },
    gumu:     { stat: "dodge",   per: 0.04, stat2: "atkPct", per2: 0.04, desc: "玉女轻身：闪避与攻击随位阶提升" },
    xiaoyao:  { stat: "mpMax",   per: 1,    stat2: "crit",   per2: 0.03, desc: "逍遥气海：真气上限与会心随位阶提升" },
    mingjiao: { stat: "atkPct",  per: 0.06, stat2: "hpPct",  per2: 0.05, desc: "九阳圣火：攻击与气血随位阶提升" }
  };

  JY.getSectRank = function (P) {
    if (!P || !P.sect || !JY.SECTS[P.sect]) return null;
    const sk = P.sect;
    const done1 = !!P.flags[sk + "_trial_played"];
    const done2 = !!P.flags[sk + "_tournament_played"];
    const done3 = !!P.flags[sk + "_crisis_played"];
    if (done3) P.guestSects = Object.assign(P.guestSects || {}, { [sk]: true });
    const maxSkLv = Math.max(1, ...Object.values(P.learned || {}).map(x => x.lv || 1));
    let tier = 0;
    if (done3 && maxSkLv >= 6) tier = 3;
    else if (done3 || done2) tier = 2;
    else if (done1 || maxSkLv >= 4) tier = 1;
    const titles = ["外门弟子", "内门精英", "护法长老", "代掌门"];
    return {
      tier,
      title: titles[tier],
      hasGuestToken: done3,
      aura: JY.SECT_AURAS[sk] || null
    };
  };

  JY.isNight = function (S) {
    const s = S || JY.S;
    if (!s) return false;
    return JY.SHICHEN[s.timeIdx % 12].period === "night";
  };

  JY.advanceTime = function (steps) {
    if (!JY.S) return;
    const total = JY.S.timeIdx + (steps || 1);
    JY.S.day += Math.floor(total / 12);
    JY.S.timeIdx = total % 12;
    JY.S.P.energy = Math.min(JY.S.P.maxEnergy, JY.S.P.energy + (steps || 1) * 4);
  };

  // 汇总奇经八脉、装备词条、神兵、内轻功被动与美食 Buff
  JY.getStats = function (P) {
    const A = P.attrs;
    let strAdd = 0, agiAdd = 0, intAdd = 0, conAdd = 0;
    ["weapon", "armor", "trinket", "boots"].forEach(sl => {
      const g = P.gear && P.gear[sl];
      if (!g) return;
      strAdd += g.str || 0;
      agiAdd += g.agi || 0;
      intAdd += g.int || 0;
      conAdd += g.con || 0;
    });
    let atk = 18 + (A.str + strAdd) * 2.4;
    let def = 8 + (A.con + conAdd) * 1.4;
    let maxHp = 220 + (A.con + conAdd) * 18;
    let mpMax = 6 + Math.floor((A.int + intAdd) / 6);
    let mpRegen = 2;
    let crit = 0.08 + A.luck * 0.004;
    let critDmg = 1.55;
    let dodge = 0.06 + (A.agi + agiAdd) * 0.005;
    let atkPct = 0, defPct = 0, hpPct = 0, shieldPct = 0, dotPct = 0, lifesteal = 0;
    let startFocus = 0, startMp = 0, riposte = 0, mpOnDodge = 0, breakDmg = 0, counterDmg = 0;
    let expPct = 0, goldPct = 0, luckAdd = 0;
    const specials = {};

    // 装备与原著神兵 + 强化淬炼(+1..+5) + 随机词条
    ["weapon", "armor", "trinket", "boots"].forEach(sl => {
      const g = P.gear && P.gear[sl];
      if (!g) return;
      const enhMul = 1 + (g.enh || 0) * 0.14;
      atk += Math.round((g.atk || 0) * enhMul);
      def += Math.round((g.def || 0) * enhMul);
      maxHp += Math.round((g.hp || 0) * enhMul);
      crit += g.crit || 0;
      dodge += g.dodge || 0;
      luckAdd += g.luck || 0;
      lifesteal += g.lifesteal || 0;
      if (g.special) specials[g.special] = true;
      (g.affixes || []).forEach(af => {
        if (af.stat === "atk") atk += af.val;
        else if (af.stat === "def") def += af.val;
        else if (af.stat === "hp") maxHp += af.val;
        else if (af.stat === "crit") crit += af.val;
        else if (af.stat === "dodge") dodge += af.val;
        else if (af.stat === "luck") luckAdd += af.val;
        else if (af.stat === "lifesteal") lifesteal += af.val;
      });
    });

    // 内功/轻功被动（随层数成长）
    [P.equipped.inner, P.equipped.light].filter(Boolean).forEach(sid => {
      const sk = JY.SKILLS[sid], le = P.learned[sid];
      if (!sk || !le || !sk.passive) return;
      const m = 1 + (le.lv - 1) * 0.1;
      const ps = sk.passive;
      if (ps.atk) atkPct += ps.atk * m;
      if (ps.def) defPct += ps.def * m;
      if (ps.hp) hpPct += ps.hp * m;
      if (ps.dodge) dodge += ps.dodge * m;
      if (ps.crit) crit += ps.crit * m;
      if (ps.mpMax) mpMax += ps.mpMax;
      if (ps.mpRegen) mpRegen += ps.mpRegen;
    });

    // 奇经八脉加成
    JY.MERIDIANS.forEach(mer => {
      const lv = (P.meridians && P.meridians[mer.id]) || 0;
      for (let i = 0; i < lv; i++) {
        const b = mer.levels[i].bonus;
        if (b.atkPct) atkPct += b.atkPct;
        if (b.defPct) defPct += b.defPct;
        if (b.hpPct) hpPct += b.hpPct;
        if (b.mpMax) mpMax += b.mpMax;
        if (b.mpRegen) mpRegen += b.mpRegen;
        if (b.crit) crit += b.crit;
        if (b.critDmg) critDmg += b.critDmg;
        if (b.dodge) dodge += b.dodge;
        if (b.shieldPct) shieldPct += b.shieldPct;
        if (b.dotPct) dotPct += b.dotPct;
        if (b.lifesteal) lifesteal += b.lifesteal;
        if (b.startFocus) startFocus = 1;
        if (b.startMp) startMp += b.startMp;
        if (b.riposte) riposte = 1;
        if (b.mpOnDodge) mpOnDodge += b.mpOnDodge;
        if (b.breakDmg) breakDmg += b.breakDmg;
        if (b.counterDmg) counterDmg += b.counterDmg;
        if (b.expPct) expPct += b.expPct;
        if (b.goldPct) goldPct += b.goldPct;
        if (b.luck) luckAdd += b.luck;
      }
    });

    // 烹饪名菜战前 Buff + 音律古琴曲谱 Buff + 八大门派位阶光环
    if (P.foodBuff && P.foodBuff.battles > 0) {
      atkPct += P.foodBuff.atkPct || 0;
      crit += P.foodBuff.crit || 0;
    }
    let regenHp = 0, synergyBonus = 0;
    if (P.songBuff && P.songBuff.battles > 0) {
      defPct += P.songBuff.defPct || 0;
      shieldPct += P.songBuff.shieldPct || 0;
      startMp += P.songBuff.startMp || 0;
      crit += P.songBuff.crit || 0;
      regenHp += P.songBuff.regenHp || 0;
      synergyBonus += P.songBuff.synergyBonus || 0;
    }
    const sRank = JY.getSectRank(P);
    if (sRank && sRank.aura) {
      const lvMul = sRank.tier + 1;
      const addAura = (k, v) => {
        if (k === "atkPct") atkPct += v;
        else if (k === "defPct") defPct += v;
        else if (k === "hpPct") hpPct += v;
        else if (k === "shieldPct") shieldPct += v;
        else if (k === "dotPct") dotPct += v;
        else if (k === "breakDmg") breakDmg += v;
        else if (k === "goldPct") goldPct += v;
        else if (k === "crit") crit += v;
        else if (k === "dodge") dodge += v;
        else if (k === "mpMax") mpMax += Math.min(2, Math.floor(v * lvMul / 2));
      };
      addAura(sRank.aura.stat, sRank.aura.per * lvMul);
      addAura(sRank.aura.stat2, sRank.aura.per2 * lvMul);
    }

    return {
      atk: Math.round(atk * (1 + atkPct)),
      def: Math.round(def * (1 + defPct)),
      maxHp: Math.round(maxHp * (1 + hpPct)),
      mpMax: Math.min(12, mpMax),
      mpRegen,
      crit: Math.min(0.75, crit),
      critDmg,
      dodge: Math.min(0.62, dodge),
      shieldPct, dotPct, lifesteal, startFocus, startMp, riposte, mpOnDodge, breakDmg, counterDmg,
      regenHp, synergyBonus,
      expMul: 1 + expPct,
      goldMul: 1 + goldPct,
      luck: A.luck + luckAdd,
      specials
    };
  };

  JY.addLog = function (text, cls) {
    if (!JY.S) return;
    const c = cls || "nar";
    JY.S.logs.push({ text, cls: c });
    if (JY.S.logs.length > 90) JY.S.logs.shift();
    if (JY.UI && JY.UI.appendLogLine) JY.UI.appendLogLine(text, c);
    if (c === "warn" && JY.Audio) JY.Audio.play("warn");
    if (JY.UI && JY.UI.curModal && JY.UI.toast && (c === "warn" || c === "rew" || c === "sys")) {
      JY.UI.toast(text, c);
    }
  };

  JY.gainLifeExp = function (cat, amount) {
    if (!JY.S || !JY.S.P) return;
    const P = JY.S.P;
    const names = { alchemy: "炼丹", forge: "锻造", cook: "烹饪", music: "音律", chess: "弈棋" };
    P.life = P.life || { alchemy: 1, forge: 1, cook: 1, music: 1, chess: 1 };
    P.lifeExp = P.lifeExp || { alchemy: 0, forge: 0, cook: 0, music: 0, chess: 0 };
    P.lifeExp[cat] = (P.lifeExp[cat] || 0) + (amount || 0);
    let leveled = false;
    while (P.lifeExp[cat] >= (P.life[cat] || 1) * 80) {
      P.lifeExp[cat] -= (P.life[cat] || 1) * 80;
      P.life[cat] = (P.life[cat] || 1) + 1;
      leveled = true;
      JY.addLog(`✦ ${names[cat] || "生活技艺"}造诣突破至 Lv${P.life[cat]}！`, "rew");
    }
    if (leveled && JY.Audio) JY.Audio.play("fanfare");
    return leveled;
  };

  JY.addChronicle = function (txt) {
    if (!JY.S) return;
    const r = JY.REGIONS_META[JY.S.region];
    const line = `第${JY.S.day}日 · ${r ? r.name : "江湖"}：${txt}`;
    JY.S.P.chronicle.push(line);
    if (JY.S.P.chronicle.length > 40) JY.S.P.chronicle.shift();
  };

  JY.applyEffect = function (eff) {
    if (!eff || !JY.S) return;
    const P = JY.S.P, st = JY.getStats(P);
    if (eff.gold) {
      const g = eff.gold > 0 ? Math.round(eff.gold * st.goldMul) : eff.gold;
      P.gold = Math.max(0, P.gold + g);
      JY.addLog(`${g >= 0 ? "获得" : "花费"}银两 ${Math.abs(g)} 两。`, g >= 0 ? "rew" : "dim");
    }
    if (eff.exp) {
      const e = Math.round(eff.exp * st.expMul);
      P.exp += e;
      JY.addLog(`获得武学修为 +${e}。`, "rew");
    }
    if (eff.moral) {
      P.morality = JY.clamp(P.morality + eff.moral, -100, 100);
      JY.addLog(`【立场变化】道德 ${eff.moral > 0 ? "+" : ""}${eff.moral}（${JY.moralityRank(P.morality)}）。`, eff.moral > 0 ? "sys" : "warn");
    }
    if (eff.item && JY.ITEMS[eff.item]) {
      P.inv[eff.item] = (P.inv[eff.item] || 0) + 1;
      JY.addLog(`收入行囊：「${JY.ITEMS[eff.item].name}」×1。`, "rew");
    }
    if (eff.legendary && JY.LEGENDARY_GEAR[eff.legendary]) {
      const owned = Object.values(P.gear).some(x => x && x.id === eff.legendary) ||
        P.bagGear.some(x => x.id === eff.legendary);
      const lg = Object.assign({}, JY.LEGENDARY_GEAR[eff.legendary]);
      if (owned) {
        P.gold += 300;
        P.exp += 200;
        JY.addLog(`✦ 你已珍藏神兵「${lg.name}」，额外折算为银两 +300、修为 +200。`, "rew");
      } else {
        P.bagGear.push(lg);
        if (JY.Audio) JY.Audio.play("fanfare");
        JY.addLog(`✦ 获得原著神兵宝甲：「${lg.name}」（已入装备库）！`, "rew");
        JY.addChronicle(`获得绝世神兵「${lg.name}」`);
      }
    }
    if (eff.skill && JY.SKILLS[eff.skill] && !P.learned[eff.skill]) {
      P.learned[eff.skill] = { lv: 1 };
      if (JY.Audio) JY.Audio.play("fanfare");
      JY.addLog(`✦ 习得武功：「${JY.SKILLS[eff.skill].name}」！`, "rew");
      JY.addChronicle(`习得武功「${JY.SKILLS[eff.skill].name}」`);
    }
    if (eff.attr) {
      Object.keys(eff.attr).forEach(k => {
        P.attrs[k] = (P.attrs[k] || 10) + eff.attr[k];
      });
      JY.addLog(`✦ 脱胎换骨，根骨资质获得永久提升！`, "rew");
    }
    if (eff.tianshu && !P.tianshu[eff.tianshu]) {
      P.tianshu[eff.tianshu] = true;
      if (JY.Audio) JY.Audio.play("fanfare");
      const meta = JY.TIANSHU_META.find(t => t.id === eff.tianshu);
      JY.addLog(`✦✦✦ 寻得十四天书之一：《${meta ? meta.name : eff.tianshu}》！`, "rew");
      JY.addChronicle(`寻得天书《${meta ? meta.name : eff.tianshu}》`);
    }
    if (eff.recruit && !P.mates.includes(eff.recruit)) {
      P.mates.push(eff.recruit);
      if (!P.mate) P.mate = eff.recruit;
      if (JY.Audio) JY.Audio.play("fanfare");
      const mt = JY.MATES.find(x => x.id === eff.recruit);
      JY.addLog(`✦ 「${mt ? mt.name : eff.recruit}」加入同道，与你并肩闯荡江湖！`, "rew");
      JY.addChronicle(`结交「${mt ? mt.name : eff.recruit}」为江湖同道`);
    }
    if (eff.aff) {
      Object.keys(eff.aff).forEach(mid => {
        const before = P.aff[mid] || 0;
        const m = JY.MATES.find(x => x.id === mid);
        const cap = (m && m.gender === "f" && P.confidant && P.confidant !== mid) ? 89 : 100;
        P.aff[mid] = JY.clamp(before + eff.aff[mid], 0, cap);
        if (m) JY.addLog(`♥ ${m.name}好感 ${eff.aff[mid] >= 0 ? "+" : ""}${eff.aff[mid]}（当前 ${P.aff[mid]}）。`, "rew");
      });
    }
    if (eff.setFlag) P.flags[eff.setFlag] = true;
    if (eff.setFlag2) P.flags[eff.setFlag2] = true;
  };

  // ---------- 3 栏位存档与导入导出 ----------
  JY.readMeta = function () { try { return JSON.parse(localStorage.getItem(JY.SAVE_META) || "{}"); } catch (e) { return {}; } };
  JY.writeMeta = function (m) { try { localStorage.setItem(JY.SAVE_META, JSON.stringify(m)); } catch (e) {} };
  JY.saveSlot = function (slot) {
    if (!JY.S) return false;
    JY.S.slot = slot || JY.S.slot || 1;
    try {
      localStorage.setItem(JY.SAVE_PRE + JY.S.slot, JSON.stringify(JY.S));
      const m = JY.readMeta();
      const rm = JY.REGIONS_META[JY.S.region];
      m[JY.S.slot] = {
        name: JY.S.P.name,
        sect: JY.S.P.sect ? JY.SECTS[JY.S.P.sect].name : "江湖散修",
        region: rm ? rm.name : "江湖",
        day: JY.S.day,
        ts: Date.now()
      };
      JY.writeMeta(m);
      return true;
    } catch (e) { return false; }
  };
  JY.normalizeState = function (d) {
    if (!d || !d.P) return d;
    const P = d.P;
    P.attrs = Object.assign({ str: 10, agi: 10, int: 10, con: 10, luck: 10 }, P.attrs || {});
    P.learned = P.learned || { taizu: { lv: 1 } };
    P.equipped = Object.assign({ outer: ["taizu"], inner: null, light: null }, P.equipped || {});
    if (!Array.isArray(P.equipped.outer)) P.equipped.outer = ["taizu"];
    P.meridians = P.meridians || {};
    P.gear = Object.assign({ weapon: null, armor: null, trinket: null, boots: null }, P.gear || {});
    P.bagGear = Array.isArray(P.bagGear) ? P.bagGear : [];
    P.inv = P.inv || {};
    P.life = Object.assign({ alchemy: 1, forge: 1, cook: 1, music: 1, chess: 1 }, P.life || {});
    P.lifeExp = Object.assign({ alchemy: 0, forge: 0, cook: 0, music: 0, chess: 0 }, P.lifeExp || {});
    P.chessSolved = P.chessSolved || {};
    P.guestSects = P.guestSects || {};
    P.towerFloor = P.towerFloor || 0;
    P.ngPlus = P.ngPlus || 0;
    P.mates = Array.isArray(P.mates) ? P.mates : [];
    P.aff = P.aff || {};
    P.tianshu = P.tianshu || {};
    P.flags = P.flags || {};
    P.searched = P.searched || {};
    P.bounties = Array.isArray(P.bounties) ? P.bounties : [];
    P.bountyDone = P.bountyDone || {};
    P.chronicle = Array.isArray(P.chronicle) ? P.chronicle : [];
    d.logs = Array.isArray(d.logs) ? d.logs : [];
    if (!JY.REGIONS[d.region]) { d.region = "yuelai"; d.room = "yl_gate"; }
    else if (!JY.REGIONS[d.region].rooms[d.room]) { d.room = JY.REGIONS[d.region].entry; }
    return d;
  };

  JY.loadSlot = function (slot) {
    try {
      const raw = localStorage.getItem(JY.SAVE_PRE + slot);
      if (!raw) return false;
      const d = JSON.parse(raw);
      if (!d || d.v !== JY.SAVE_VER || !d.P) return false;
      JY.S = JY.normalizeState(d);
      JY.S.slot = slot;
      return true;
    } catch (e) { return false; }
  };
  JY.deleteSlot = function (slot) {
    try {
      localStorage.removeItem(JY.SAVE_PRE + slot);
      const m = JY.readMeta(); delete m[slot]; JY.writeMeta(m);
    } catch (e) {}
  };

  JY.exportSaveCode = function (slot) {
    try {
      const raw = slot ? localStorage.getItem(JY.SAVE_PRE + slot) : (JY.S ? JSON.stringify(JY.S) : null);
      if (!raw) return "";
      const bytes = encodeURIComponent(raw).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16)));
      return "SH14:" + (typeof btoa === "function" ? btoa(bytes) : Buffer.from(raw, "utf8").toString("base64"));
    } catch (e) { return ""; }
  };

  JY.importSaveCode = function (code, slot) {
    try {
      const clean = String(code || "").trim();
      if (!clean.startsWith("SH14:") && !clean.startsWith("JYv3:")) return false;
      const b64 = clean.slice(5);
      const jsonStr = typeof atob === "function"
        ? decodeURIComponent(Array.from(atob(b64), ch => "%" + ("00" + ch.charCodeAt(0).toString(16)).slice(-2)).join(""))
        : Buffer.from(b64, "base64").toString("utf8");
      const d = JSON.parse(jsonStr);
      if (!d || d.v !== JY.SAVE_VER || !d.P) return false;
      const targetSlot = slot || 1;
      JY.normalizeState(d);
      d.slot = targetSlot;
      localStorage.setItem(JY.SAVE_PRE + targetSlot, JSON.stringify(d));
      const m = JY.readMeta();
      const rm = JY.REGIONS_META[d.region];
      m[targetSlot] = {
        name: d.P.name,
        sect: d.P.sect && JY.SECTS[d.P.sect] ? JY.SECTS[d.P.sect].name : "江湖散修",
        region: rm ? rm.name : "江湖",
        day: d.day || 1,
        ts: Date.now()
      };
      JY.writeMeta(m);
      return true;
    } catch (e) { return false; }
  };
})(window);


/* ===== js/core/audio.js ===== */
/* =====================================================================
   山河十四卷 v1.0 · 零体积纯前端 Web Audio API 国风音效与五声雅乐引擎
   支持：刀剑破空 / 拳掌气劲 / 点穴金石 / 会心铜钲 / 古琴泛音 / 落子清响 / 雅乐开关
   ===================================================================== */
(function (root) {
  "use strict";
  const JY = (root.JY = root.JY || {});
  const AUDIO_KEY = "jyjh_v3_audio";

  let ctx = null;
  let bgmTimer = null;
  let bgmStep = 0;

  // mode: "all" (音效+雅乐) | "sfx" (仅音效，默认最清爽) | "mute" (静音)
  let mode = "sfx";
  try {
    const saved = localStorage.getItem(AUDIO_KEY);
    if (saved === "all" || saved === "sfx" || saved === "mute") mode = saved;
  } catch (e) {}

  function ensureCtx() {
    if (mode === "mute") return null;
    try {
      if (!ctx) {
        const AC = root.AudioContext || root.webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
      }
      if (ctx.state === "suspended") ctx.resume().catch(() => {});
      return ctx;
    } catch (e) {
      return null;
    }
  }

  function tone(freq, dur, opts) {
    const ac = ensureCtx();
    if (!ac) return;
    try {
      const o = opts || {};
      const now = ac.currentTime + (o.delay || 0);
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = o.type || "sine";
      osc.frequency.setValueAtTime(freq, now);
      if (o.endFreq) osc.frequency.exponentialRampToValueAtTime(Math.max(20, o.endFreq), now + dur);
      const vol = o.vol || 0.08;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(vol, now + Math.min(0.015, dur * 0.2));
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start(now);
      osc.stop(now + dur + 0.02);
    } catch (e) {}
  }

  function noiseBurst(dur, opts) {
    const ac = ensureCtx();
    if (!ac) return;
    try {
      const o = opts || {};
      const now = ac.currentTime + (o.delay || 0);
      const len = Math.max(1, Math.floor(ac.sampleRate * dur));
      const buf = ac.createBuffer(1, len, ac.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, o.decay || 1.8);
      const src = ac.createBufferSource();
      src.buffer = buf;
      const filter = ac.createBiquadFilter();
      filter.type = o.filterType || "bandpass";
      filter.frequency.setValueAtTime(o.freq || 1400, now);
      if (o.endFreq) filter.frequency.exponentialRampToValueAtTime(o.endFreq, now + dur);
      filter.Q.value = o.q || 1.6;
      const gain = ac.createGain();
      gain.gain.setValueAtTime(o.vol || 0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      src.connect(filter);
      filter.connect(gain);
      gain.connect(ac.destination);
      src.start(now);
      src.stop(now + dur + 0.02);
    } catch (e) {}
  }

  // 五声音阶（宫商角徵羽：D4 E4 F#4 A4 B4 D5 E5 F#5 A5）
  const PENTA = [293.66, 329.63, 369.99, 440.00, 493.88, 587.33, 659.25, 739.99, 880.00];
  const MELODY = [0, 2, 3, 5, 3, 2, 1, 0, 3, 4, 5, 7, 5, 4, 3, 2];

  function playGuqinNote(freq, delay, vol) {
    tone(freq, 0.95, { type: "triangle", delay: delay || 0, vol: vol || 0.055, endFreq: freq * 0.996 });
    tone(freq * 2, 0.42, { type: "sine", delay: (delay || 0) + 0.01, vol: (vol || 0.055) * 0.45 });
  }

  function startAmbientLoop() {
    stopAmbientLoop();
    if (mode !== "all") return;
    bgmTimer = setInterval(() => {
      if (mode !== "all" || !ctx || ctx.state !== "running") return;
      const isCombat = JY.Combat && JY.Combat.active;
      const idx = MELODY[bgmStep++ % MELODY.length];
      const f = PENTA[idx] * (isCombat ? 1.25 : 0.75);
      playGuqinNote(f, 0, isCombat ? 0.028 : 0.024);
      if (bgmStep % 3 === 0) playGuqinNote(PENTA[(idx + 3) % PENTA.length] * 0.5, 0.36, 0.018);
    }, 1850);
  }

  function stopAmbientLoop() {
    if (bgmTimer) { clearInterval(bgmTimer); bgmTimer = null; }
  }

  JY.Audio = {
    getMode: () => mode,
    label: () => mode === "all" ? "🎵 雅乐" : mode === "sfx" ? "🔊 音效" : "🔇 静音",
    cycleMode() {
      mode = mode === "sfx" ? "all" : mode === "all" ? "mute" : "sfx";
      try { localStorage.setItem(AUDIO_KEY, mode); } catch (e) {}
      if (mode === "mute") {
        stopAmbientLoop();
      } else {
        ensureCtx();
        JY.Audio.play("click");
        if (mode === "all") startAmbientLoop();
        else stopAmbientLoop();
      }
      if (JY.UI && JY.UI.renderTopbar && JY.S) JY.UI.renderTopbar();
      if (JY.UI && JY.UI.toast) {
        const msg = mode === "all" ? "已开启：国风音效 + 古琴五声雅乐" : mode === "sfx" ? "已切换：仅开启招式与交互音效" : "已静音";
        JY.UI.toast(msg, "sys");
      }
    },
    unlock() {
      if (mode === "mute") return;
      ensureCtx();
      if (mode === "all" && !bgmTimer) startAmbientLoop();
    },
    play(kind) {
      if (mode === "mute") return;
      switch (kind) {
        case "click":
          tone(520, 0.045, { type: "triangle", endFreq: 380, vol: 0.032 });
          break;
        case "sword":
          noiseBurst(0.14, { freq: 2600, endFreq: 900, q: 2.8, vol: 0.08 });
          tone(980, 0.12, { type: "sawtooth", endFreq: 420, vol: 0.045 });
          break;
        case "palm":
          noiseBurst(0.18, { filterType: "lowpass", freq: 480, endFreq: 140, q: 1.2, vol: 0.11 });
          tone(150, 0.19, { type: "sine", endFreq: 58, vol: 0.095 });
          break;
        case "acupoint":
          tone(1174.66, 0.16, { type: "sine", endFreq: 880, vol: 0.07 });
          tone(1760, 0.22, { type: "triangle", delay: 0.04, vol: 0.055 });
          break;
        case "crit":
          noiseBurst(0.20, { freq: 1800, endFreq: 520, q: 1.8, vol: 0.10 });
          tone(220, 0.36, { type: "triangle", endFreq: 110, vol: 0.09 });
          tone(659.25, 0.28, { type: "sine", delay: 0.03, vol: 0.07 });
          break;
        case "shield":
          tone(440, 0.22, { type: "sine", endFreq: 587.33, vol: 0.055 });
          tone(659.25, 0.26, { type: "triangle", delay: 0.05, vol: 0.045 });
          break;
        case "hit":
          noiseBurst(0.12, { filterType: "lowpass", freq: 360, endFreq: 110, vol: 0.09 });
          tone(125, 0.12, { type: "triangle", endFreq: 62, vol: 0.08 });
          break;
        case "guqin":
          [0, 2, 3, 5].forEach((n, i) => playGuqinNote(PENTA[n], i * 0.11, 0.06));
          break;
        case "chess":
          noiseBurst(0.035, { freq: 3200, q: 4.5, vol: 0.07 });
          tone(1320, 0.05, { type: "sine", endFreq: 920, vol: 0.05 });
          break;
        case "fanfare":
          [0, 2, 3, 5, 8].forEach((n, i) => playGuqinNote(PENTA[n], i * 0.09, 0.065));
          break;
        case "warn":
          tone(240, 0.12, { type: "sawtooth", endFreq: 180, vol: 0.04 });
          break;
      }
    }
  };

  if (typeof root.addEventListener === "function") {
    root.addEventListener("pointerdown", () => JY.Audio.unlock(), { once: true, passive: true });
  }
})(window);


/* ===== js/core/world.js ===== */
/* =====================================================================
   山河十四卷 v1.0 · 核心引擎 2：大世界与子房间探索、搜查、采集、客栈、轻挂机
   ===================================================================== */
(function (root) {
  "use strict";
  const JY = root.JY;
  JY.World = {};

  JY.World.curRegion = function () { return JY.REGIONS[JY.S.region]; };
  JY.World.curRoom = function () {
    const reg = JY.World.curRegion();
    return reg && reg.rooms[JY.S.room];
  };

  // 子房间内自由移动（只需相连）
  JY.World.moveRoom = function (targetRoomId) {
    if (JY.Combat.active || JY.Story.active) return;
    const reg = JY.World.curRegion();
    const cur = JY.World.curRoom();
    if (!reg || !reg.rooms[targetRoomId]) return;
    if (targetRoomId === JY.S.room) return;
    if (!cur.exits.includes(targetRoomId)) {
      JY.addLog("此处与目标房间并不直接相通，请先移步相邻处。", "dim");
      return;
    }
    JY.S.room = targetRoomId;
    const rm = reg.rooms[targetRoomId];
    const night = JY.isNight();
    JY.addLog(`【${JY.REGIONS_META[JY.S.region].name} · ${rm.name}】${(night && rm.nightDesc) ? rm.nightDesc : rm.desc}`, "nar");
    JY.UI.renderAll();
  };

  // 本区子房间 BFS 最短路自动循路（点击舆图任意房间或主线指引一键直达）
  JY.World.walkToRoom = function (targetRoomId) {
    if (JY.Combat.active || JY.Story.active) return false;
    const reg = JY.World.curRegion();
    if (!reg || !reg.rooms[targetRoomId]) return false;
    if (targetRoomId === JY.S.room) return true;
    const queue = [[JY.S.room]];
    const seen = new Set([JY.S.room]);
    let found = null;
    while (queue.length) {
      const path = queue.shift();
      const last = path[path.length - 1];
      if (last === targetRoomId) { found = path; break; }
      for (const nx of (reg.rooms[last].exits || [])) {
        if (!seen.has(nx) && reg.rooms[nx]) {
          seen.add(nx);
          queue.push(path.concat(nx));
        }
      }
    }
    if (!found) {
      JY.addLog("暂未找到通往目标房间的路径。", "dim");
      return false;
    }
    const via = found.slice(1).map(id => reg.rooms[id].name).join(" → ");
    JY.S.room = targetRoomId;
    const rm = reg.rooms[targetRoomId];
    const night = JY.isNight();
    if (JY.Audio) JY.Audio.play("click");
    JY.addLog(`🧭 循路前往：${via}`, "sys");
    JY.addLog(`【${JY.REGIONS_META[JY.S.region].name} · ${rm.name}】${(night && rm.nightDesc) ? rm.nightDesc : rm.desc}`, "nar");
    JY.UI.renderAll();
    return true;
  };

  // 一键跨区/本区寻路并自动开启目标人物交互（主线指引核心跳转入口）
  JY.World.guideNavigate = function (regionId, roomId, npcId) {
    if (!JY.S || !JY.S.P) return;
    if (JY.Combat.active || JY.Story.active) {
      if (JY.UI && JY.UI.toast) JY.UI.toast("当前正处于剧情或战斗中，请先完成当前回合。", "warn");
      return;
    }
    if (!JY.World.curRegion() && JY.normalizeState) JY.normalizeState(JY.S);
    if (JY.UI && JY.UI.closeModal) JY.UI.closeModal();
    let moved = false;
    if (regionId && regionId !== JY.S.region) {
      JY.World.travelRegion(regionId);
      // 若精力不足未成行，或中途触发了旅途随机奇遇弹窗，则先停在当前状态
      if (JY.S.region !== regionId || (JY.UI && JY.UI.curModal)) return;
      moved = true;
    }
    const reg = JY.World.curRegion();
    const targetRoom = (roomId && reg && reg.rooms[roomId]) ? roomId : (reg && reg.entry);
    if (targetRoom && targetRoom !== JY.S.room) {
      moved = JY.World.walkToRoom(targetRoom) || moved;
    }
    const rm = JY.World.curRoom();
    if (npcId && JY.UI && JY.UI.openNpcModal) {
      if (rm && (rm.npcs || []).some(n => n.id === npcId)) {
        JY.UI.openNpcModal(npcId);
        return;
      }
    }
    if (!moved && rm && JY.UI && JY.UI.toast) {
      JY.UI.toast(`你已身处「${rm.name}」，可直接在下方操作坞迎战、搜查或交互！`, "sys");
    }
  };

  // 动态计算「山河六卷主线脉络」与当前最明确的一步指引（含强制探索/打怪/冲脉/锻造分流引导）
  JY.World.getMainlineState = function () {
    const P = JY.S.P;
    const tsCnt = Object.keys(P.tianshu || {}).length;
    const maxSkLv = Math.max(1, ...Object.values(P.learned || {}).map(x => x.lv || 1));
    const merCnt = Object.values(P.meridians || {}).reduce((s, v) => s + (v || 0), 0);
    const bountyCnt = Object.values(P.bountyDone || {}).reduce((s, v) => s + (v || 0), 0);
    const wornCnt = ["weapon", "armor", "trinket", "boots"].filter(sl => P.gear && P.gear[sl]).length;

    const findQuestNext = (qid) => {
      const q = JY.QUESTS[qid];
      if (!q) return null;
      const ep = q.episodes.find(JY.Story.meetsRequirements);
      return ep ? { q, ep } : null;
    };
    const sheNext = findQuestNext("ts_she");
    let anyTsNext = sheNext;
    if (!anyTsNext) {
      for (const [qid, q] of Object.entries(JY.QUESTS)) {
        if (!qid.startsWith("ts_")) continue;
        const ep = q.episodes.find(JY.Story.meetsRequirements);
        if (ep) { anyTsNext = { q, ep }; break; }
      }
    }

    // 根据未达标的历练短板智能分流引导（迫使并帮助玩家深度体验悬赏/锻造/冲脉/探索）
    const ch2Target = maxSkLv < 3
      ? { region: "yuelai", room: "yl_forest", label: "去镇东后林剿匪攒修为" }
      : { modal: ["quest", "bounty"], label: "揭江湖悬赏打怪扬名" };
    const ch3Target = (P.mates || []).length < 1
      ? { region: "xiangyang", room: "xy_guofu_yard", npc: "huangrong", label: "前往襄阳郭府寻黄蓉" }
      : wornCnt < 1
        ? { region: "xiangyang", room: "xy_forge", npc: "blacksmith", label: "赴百炼铁匠铺锻造装备" }
        : { modal: ["martial", "meridians"], label: "打通奇经八脉穴位" };
    const ch5Target = tsCnt < 5
      ? (anyTsNext && anyTsNext.ep.trigger
        ? { region: anyTsNext.ep.trigger.region, room: anyTsNext.ep.trigger.room, npc: anyTsNext.ep.trigger.npc, label: `追寻《${anyTsNext.q.title.split(" · ")[0]}》` }
        : { modal: ["quest", "tianshu"], label: "查看十四天书总目" })
      : merCnt < 6
        ? { modal: ["martial", "meridians"], label: "继续冲开奇经八脉" }
        : bountyCnt < 3
          ? { modal: ["quest", "bounty"], label: "完成江湖悬赏扬名" }
          : { modal: ["martial", "skills"], label: "修炼主力绝学至 Lv6" };

    const stages = [
      {
        id: "ch1", num: "第一卷", name: "茶楼听风 · 初入江湖",
        done: !!(P.flags.she_ep1_done || P.flags.sanxiu_ep1_done),
        desc: "前往悦来镇「悦来茶楼」拜会百晓生，听中原风云并开启首部天书《射雕英雄传》或散修长线。",
        target: { region: "yuelai", room: "yl_teahouse", npc: "baixiaosheng", label: "前往悦来茶楼寻百晓生" }
      },
      {
        id: "ch2", num: "第二卷", name: "习武历练 · 扬名乡野",
        done: maxSkLv >= 3 && bountyCnt >= 1,
        desc: `主线强敌凶险，须先夯实根基：将任一武功修至 Lv3（当前 Lv${maxSkLv}），并揭榜完成至少 1 次江湖悬赏（当前 ${bountyCnt}/1）。`,
        target: ch2Target
      },
      {
        id: "ch3", num: "第三卷", name: "结伴锻兵 · 贯通经脉",
        done: (P.mates || []).length > 0 && wornCnt >= 1 && merCnt >= 2,
        desc: `闯荡襄阳备战强敌：结交首位同道（${(P.mates || []).length}/1）、穿戴至少 1 件锻造/神兵装备（${wornCnt}/1）并打通 2 处奇经八脉（${merCnt}/2）。`,
        target: ch3Target
      },
      {
        id: "ch4", num: "第四卷", name: "襄阳烽火 · 首得天书",
        done: tsCnt >= 1,
        desc: sheNext
          ? `实力已成！推进《射雕英雄传》【${sheNext.ep.title}】：${sheNext.ep.hint}`
          : "力战襄阳北城千夫长巴图（或完成任意一部十四天书终幕），赢取首部天书与绝世神兵！",
        target: sheNext && sheNext.ep.trigger
          ? { region: sheNext.ep.trigger.region, room: sheNext.ep.trigger.room, npc: sheNext.ep.trigger.npc, label: `前往《射雕》·${sheNext.ep.title}` }
          : { region: "xiangyang", room: "xy_guofu_hall", npc: "guojing", label: "前往襄阳郭府正厅" }
      },
      {
        id: "ch5", num: "第五卷", name: "纵横山河 · 筹备论剑",
        done: tsCnt >= 5 && maxSkLv >= 6 && merCnt >= 6 && bountyCnt >= 3,
        desc: `获华山论剑英雄帖须达成四项历练：集天书 ${tsCnt}/5 部 · 经脉 ${merCnt}/6 穴 · 悬赏 ${bountyCnt}/3 次 · 绝学 Lv${maxSkLv}/6（推荐兼修门派、强化装备与抚琴烹菜备战）。`,
        target: ch5Target
      },
      {
        id: "ch6", num: "第六卷", name: "华山论剑 · 问鼎天下",
        done: !!P.flags.v3_ending,
        desc: "英雄帖四大资格已全数达成！携绝学、强化神兵与红颜同道登临「华山之巅 · 候剑避风棚」寻秦拂石开启三阵终局连战！",
        target: { region: "huading", room: "hd_shelter", npc: "hd_steward", label: "登临华山之巅论剑" }
      }
    ];

    let current = stages.find(s => !s.done);
    if (!current) {
      current = {
        id: "post", num: "终章", name: "武道极境 · 藏经试炼与十四卷圆满",
        done: false,
        desc: `已问鼎华山！可继续集齐十四天书（${tsCnt}/14）、冲击少室藏经阁无尽试炼塔（已通 ${P.towerFloor || 0} 层），或开启二周目宗师轮回传承！`,
        target: { modal: ["martial", "tower"], label: "进入藏经阁试炼塔 / 二周目" }
      };
    }
    const doneCount = stages.filter(s => s.done).length;
    return { stages, current, doneCount, total: stages.length };
  };

  // 大世界跨区域赶路（推进 1 时辰并进入目标区入口房）
  JY.World.travelRegion = function (targetRegionId) {
    if (JY.Combat.active || JY.Story.active) return;
    const meta = JY.REGIONS_META[targetRegionId];
    const reg = JY.REGIONS[targetRegionId];
    if (!meta || !reg) return;
    const st = JY.getStats(JY.S.P);
    if (targetRegionId !== JY.S.region) {
      if (!st.specials.taxue) {
        if (JY.S.P.energy < 8) {
          JY.addLog("你舟车劳顿精力不足（需 8 点），先去客栈歇息或打坐恢复吧。", "warn");
          if (JY.UI && JY.UI.toast) JY.UI.toast("精力不足（需 8 点），请先打坐调息或去客栈歇息！", "warn");
          return;
        }
        JY.S.P.energy -= 8;
      }
      JY.advanceTime(1);
    }
    JY.S.region = targetRegionId;
    JY.S.room = reg.entry;
    const rm = reg.rooms[reg.entry];
    JY.addLog(`你快马加鞭抵达【${meta.name} · ${rm.name}】。（时辰推进至 ${JY.SHICHEN[JY.S.timeIdx].name}）`, "sys");
    JY.addLog((JY.isNight() && rm.nightDesc) ? rm.nightDesc : rm.desc, "nar");
    JY.UI.closeModal();
    // 跨城旅途随机江湖奇遇（冷却 2 步防高频打扰，可随时绕道）
    const P = JY.S.P;
    if (targetRegionId !== JY.S.lastTravelFrom && JY.TRAVEL_EVENTS && JY.TRAVEL_EVENTS.length) {
      if ((P.travelCd || 0) > 0) {
        P.travelCd--;
      } else if (Math.random() < 0.34) {
        P.travelCd = 2;
        const ev = JY.pick(JY.TRAVEL_EVENTS);
        JY.UI.renderAll();
        JY.UI.openModal("travel", null, ev);
        return;
      }
    }
    JY.S.lastTravelFrom = targetRegionId;
    JY.UI.renderAll();
  };

  // 处理旅途奇遇选项
  JY.World.resolveTravelChoice = function (evId, choiceIdx) {
    const ev = (JY.TRAVEL_EVENTS || []).find(x => x.id === evId);
    if (!ev || !ev.choices[choiceIdx]) return;
    const ch = ev.choices[choiceIdx], P = JY.S.P;
    if (ch.reqGold && P.gold < ch.reqGold) { JY.addLog(`银两不足（需 ${ch.reqGold} 两）。`, "warn"); return; }
    if (ch.reqItem && !(P.inv[ch.reqItem] > 0)) { JY.addLog(`缺少物品「${JY.ITEMS[ch.reqItem].name}」。`, "warn"); return; }
    if (ch.reqLife) {
      for (const k of Object.keys(ch.reqLife)) {
        if ((P.life[k] || 1) < ch.reqLife[k]) { JY.addLog("生活技艺等级不足。", "warn"); return; }
      }
    }
    JY.UI.closeModal();
    if (ch.reqItem) P.inv[ch.reqItem]--;
    if (ch.battle) {
      JY.Combat.start(ch.battle, {
        onWin: () => {
          if (ch.winReward) JY.applyEffect(ch.winReward);
          if (ch.winNar) JY.addLog(`🐎【旅途奇遇·${ev.title}】${ch.winNar}`, "rew");
        }
      });
      return;
    }
    if (ch.effect) JY.applyEffect(ch.effect);
    if (ch.onPick) ch.onPick();
    if (ch.msg) JY.addLog(`🐎【旅途奇遇·${ev.title}】${ch.msg}`, "talk");
    JY.UI.renderAll();
  };

  // 搜查当前房间（暗格线索 + 藏宝图挖宝）
  JY.World.searchRoom = function () {
    const P = JY.S.P, rm = JY.World.curRoom();
    if (!rm) return;
    // 1. 藏宝图挖掘判定
    if (P.treasureTarget && P.treasureTarget.region === JY.S.region && P.treasureTarget.room === JY.S.room) {
      const tr = P.treasureTarget;
      P.treasureTarget = null;
      JY.addLog(`✦✦ 你循着藏宝图记号掘开暗格，果然挖出前朝秘藏！`, "rew");
      JY.applyEffect(tr.reward);
      JY.UI.renderAll();
      return;
    }
    // 2. 房间固定搜查点
    if (rm.search) {
      if (rm.search.nightOnly && !JY.isNight()) {
        JY.addLog("白日人多眼杂，看不出异样——或许等入夜（戌时至丑时）再来暗中搜查。", "dim");
        return;
      }
      if (P.searched[rm.search.id]) {
        JY.addLog("你已把此处细细翻查过一遍，再无新发现。", "dim");
        return;
      }
      P.searched[rm.search.id] = true;
      JY.addLog(`🔍 ${rm.search.text}`, "rew");
      JY.applyEffect(rm.search.reward);
      JY.UI.renderAll();
      return;
    }
    // 3. 普通细查（福缘偶发小惊喜）
    if (P.energy < 4) { JY.addLog("精力不足，先歇息片刻。", "dim"); return; }
    P.energy -= 4;
    const st = JY.getStats(P);
    if (Math.random() < 0.25 + st.luck * 0.012) {
      const bonus = JY.rand(12, 35);
      P.gold += bonus;
      JY.addLog(`你在角落仔细搜寻，意外拾得散落碎银 ${bonus} 两。`, "rew");
    } else {
      JY.addLog("你环顾四周细细查探，暂未发现暗格或异样。", "dim");
    }
    JY.UI.renderAll();
  };

  // 野外采集草药 / 矿石 / 食材
  JY.World.gatherRoom = function () {
    const P = JY.S.P, rm = JY.World.curRoom();
    if (!rm || !rm.gather) return;
    if (P.energy < 10) { JY.addLog("精力不足（需 10 点），请先去客栈或打坐恢复。", "warn"); return; }
    P.energy -= 10;
    JY.advanceTime(1);
    const got = [];
    Object.keys(rm.gather).forEach(itemId => {
      const cnt = JY.rand(1, rm.gather[itemId]);
      P.inv[itemId] = (P.inv[itemId] || 0) + cnt;
      got.push(`${JY.ITEMS[itemId].name}×${cnt}`);
    });
    JY.addLog(`🌿 你在「${rm.name}」一番采掘，收获：${got.join("、")}。`, "rew");
    JY.UI.renderAll();
  };

  // 客栈歇息 / 推进时辰（快速切换白昼↔入夜，方便体验夜间黑市与潜入剧情）
  JY.World.restAtInn = function (toNight) {
    const P = JY.S.P, st = JY.getStats(P);
    if (P.gold < 15) { JY.addLog("盘缠不足 15 两，无法投宿。", "warn"); return; }
    P.gold -= 15;
    P.hp = st.maxHp;
    P.energy = P.maxEnergy;
    if (toNight) {
      const target = 10; // 戌时·入夜
      const diff = (target - JY.S.timeIdx + 12) % 12 || 12;
      JY.advanceTime(diff);
      JY.addLog("你在客栈安歇调息至「戌时·入夜」，气血与精力尽复！城中黑市与夜探事件现已开启。", "sys");
    } else {
      const target = 4; // 辰时·白昼
      const diff = (target - JY.S.timeIdx + 12) % 12 || 12;
      JY.advanceTime(diff);
      JY.addLog("一夜好眠至「辰时·白昼」，神清气爽，气血与精力全部回满。", "sys");
    }
    JY.UI.renderAll();
  };

  // 原地打坐调息（免费回血回精力，推进 1 时辰）
  JY.World.meditate = function () {
    const P = JY.S.P, st = JY.getStats(P);
    const heal = Math.min(st.maxHp - P.hp, Math.round(st.maxHp * 0.35));
    P.hp += heal;
    P.energy = Math.min(P.maxEnergy, P.energy + 25);
    JY.advanceTime(1);
    JY.addLog(`你盘膝运功调息一个时辰，恢复气血 +${heal}、精力 +25。`, "sys");
    JY.UI.renderAll();
  };

  // 轻度挂机（免肝辅助，随时收工）
  JY.World.toggleIdle = function () {
    const rm = JY.World.curRoom();
    if (JY.S.idle) {
      const elapsedMin = Math.max(0.5, (Date.now() - JY.S.idle.start) / 60000);
      const cap = Math.min(elapsedMin, 480);
      const expG = Math.max(15, Math.round(JY.S.idle.expPerMin * cap));
      const goldG = Math.max(8, Math.round(JY.S.idle.goldPerMin * cap));
      JY.applyEffect({ exp: expG, gold: goldG, item: cap >= 1 ? JY.S.idle.mat : null });
      JY.addLog(`◇ 收工结算「${JY.S.idle.name}」：耗时 ${cap.toFixed(1)} 分钟，满载而归。`, "sys");
      JY.S.idle = null;
      JY.UI.renderAll();
      return;
    }
    if (!rm || !rm.idle) return;
    JY.S.idle = Object.assign({ start: Date.now() }, rm.idle);
    JY.addLog(`◇ 开始轻挂机「${rm.idle.name}」（约 ${rm.idle.expPerMin} 修为/分、${rm.idle.goldPerMin} 银/分），可随时点「收工」结算。`, "sys");
    JY.UI.renderAll();
  };
})(window);


/* ===== js/core/combat.js ===== */
/* =====================================================================
   山河十四卷 v1.0 · 核心引擎 3：策略回合战斗引擎（意图预警/真气/破招/连携/同道合击/自动倍速）
   ===================================================================== */
(function (root) {
  "use strict";
  const JY = root.JY;

  JY.Combat = {
    active: null,
    autoTimer: null
  };

  function cloneEnemy(enemyId) {
    const base = JY.ENEMIES[enemyId] || JY.ENEMIES.shanzei;
    return {
      id: base.id, name: base.name, d: base.d, boss: !!base.boss,
      hp: base.hp, maxHp: base.hp, atk: base.atk, def: base.def,
      exp: base.exp, gold: base.gold, art: base.art, desc: base.desc,
      drop: base.drop || [],
      intents: base.intents || [{ type: "attack", name: "猛攻", mul: 1.0, hint: "普通攻击" }],
      intentIdx: 0,
      shield: 0,
      st: { break: 0, chill: 0, poison: 0, bleed: 0, stun: 0 }
    };
  }

  JY.Combat.start = function (enemyId, hooks) {
    const P = JY.S.P, stats = JY.getStats(P);
    if (P.hp < 1) P.hp = Math.round(stats.maxHp * 0.5);
    const foe = (hooks && hooks.customFoe) ? hooks.customFoe : cloneEnemy(enemyId);
    const mateDef = P.mate ? JY.MATES.find(x => x.id === P.mate) : null;
    JY.Combat.stopAuto();
    JY.Combat.active = {
      foe,
      turn: 1,
      mp: Math.min(stats.mpMax, 3 + stats.startMp),
      mpMax: stats.mpMax,
      shield: stats.specials.tiancan ? 45 : 0,
      heiyuUsed: false,
      synergy: 0,         // 同道同心值（满 100 可手动释放专属合击！）
      mate: mateDef,
      st: { evade: 0, focus: stats.startFocus ? 1 : 0, poison: 0, bleed: 0, chill: 0, reflect: 0 },
      auto: false,
      fast: false,
      busy: false,
      pops: [],           // 战斗浮动飘字队列 [{ side:'hero'|'foe', text, cls }]
      shake: { hero: false, foe: false, arena: false },
      logs: [`⚔ 遭遇「${foe.name}」！${foe.desc}`],
      hooks: hooks || null
    };
    const nextInt = JY.Combat.curIntent();
    JY.Combat.pushLog(`敌方起手意图：【${nextInt.name}】— ${nextInt.hint}`);
    JY.UI.setStageMode("combat");
    JY.UI.renderAll();
  };

  JY.Combat.curIntent = function () {
    const c = JY.Combat.active;
    if (!c) return null;
    return c.foe.intents[c.foe.intentIdx % c.foe.intents.length];
  };

  JY.Combat.pushLog = function (txt) {
    const c = JY.Combat.active;
    if (!c) return;
    c.logs.push(txt);
    if (c.logs.length > 40) c.logs.shift();
  };

  JY.Combat.pushPop = function (side, text, cls) {
    const c = JY.Combat.active;
    if (!c) return;
    c.pops.push({ side, text, cls: cls || "dmg" });
  };

  JY.Combat.stopAuto = function () {
    if (JY.Combat.autoTimer) { clearInterval(JY.Combat.autoTimer); JY.Combat.autoTimer = null; }
  };

  JY.Combat.toggleAuto = function () {
    const c = JY.Combat.active; if (!c) return;
    c.auto = !c.auto;
    JY.Combat.stopAuto();
    if (c.auto) {
      JY.Combat.autoTimer = setInterval(() => {
        if (!JY.Combat.active || !JY.Combat.active.auto) return JY.Combat.stopAuto();
        JY.Combat.aiPlayerMove();
      }, c.fast ? 380 : 760);
    }
    JY.UI.renderCombat();
  };

  JY.Combat.toggleFast = function () {
    const c = JY.Combat.active; if (!c) return;
    c.fast = !c.fast;
    if (c.auto) { JY.Combat.toggleAuto(); JY.Combat.toggleAuto(); }
    else JY.UI.renderCombat();
  };

  // 自动策略 AI：会看敌人意图智能点穴/破甲/闪身/放合击！
  JY.Combat.aiPlayerMove = function () {
    const c = JY.Combat.active, P = JY.S.P;
    if (!c || c.busy) return;
    if (c.mate && c.synergy >= 100) return JY.Combat.castMateCombo();
    const intent = JY.Combat.curIntent();
    const eq = [...P.equipped.outer, P.equipped.inner, P.equipped.light].filter(Boolean);
    // 优先克制当前敌人意图
    for (const sid of eq) {
      const sk = JY.SKILLS[sid];
      if (!sk || c.mp < JY.Combat.skillCost(sk)) continue;
      if (sk.counter && sk.counter === intent.type) return JY.Combat.castSkill(sid);
    }
    // 其次选真气足够且威力最高的招式
    let best = null;
    for (const sid of eq) {
      const sk = JY.SKILLS[sid];
      if (!sk || c.mp < JY.Combat.skillCost(sk) || sk.type !== 0) continue;
      if (!best || sk.pow > JY.SKILLS[best].pow) best = sid;
    }
    if (best) return JY.Combat.castSkill(best);
    JY.Combat.defendAndBreathe();
  };

  JY.Combat.skillCost = function (sk) {
    const st = JY.getStats(JY.S.P);
    let cost = sk.cost || 0;
    if (st.specials.dagou && sk.fx && sk.fx.stun) cost = Math.max(0, cost - 1);
    return cost;
  };

  // 玩家施展武功（含破招打断 + 状态连携引爆）
  JY.Combat.castSkill = function (sid) {
    const c = JY.Combat.active, P = JY.S.P, st = JY.getStats(P);
    if (!c || c.busy) return;
    const sk = JY.SKILLS[sid], le = P.learned[sid];
    if (!sk || !le) return;
    const cost = JY.Combat.skillCost(sk);
    if (c.mp < cost) { JY.Combat.pushLog("真气不足！可点「调息防御」或施展 0 耗基础招式。"); JY.UI.renderCombat(); return; }
    c.mp -= cost;
    const foe = c.foe;
    const intent = JY.Combat.curIntent();
    const lvMul = 1 + (le.lv - 1) * 0.10;

    // 1. 内功 / 轻功主动效果
    if (sk.active) {
      const a = sk.active;
      if (JY.Audio && !sk.pow) JY.Audio.play("shield");
      let msg = `✦ 你运起「${sk.name}」：${sk.flavor}`;
      if (a.heal) { const h = Math.round(a.heal * lvMul); P.hp = Math.min(st.maxHp, P.hp + h); msg += ` 回血 +${h}`; JY.Combat.pushPop("hero", `+${h}`, "heal"); }
      if (a.shield) { const sh = Math.round(a.shield * lvMul * (1 + st.shieldPct)); c.shield += sh; msg += ` 护体 +${sh}`; JY.Combat.pushPop("hero", `护体+${sh}`, "shield"); }
      if (a.mp) { c.mp = Math.min(c.mpMax, c.mp + a.mp); msg += ` 真气 +${a.mp}`; }
      if (a.drainMp) { c.mp = Math.min(c.mpMax, c.mp + a.drainMp); msg += ` 吸取真气 +${a.drainMp}`; }
      if (a.evade) { c.st.evade += a.evade + (st.specials.taxue ? 1 : 0); msg += ` 获得闪身`; JY.Combat.pushPop("hero", "闪身!", "buff"); }
      if (a.focus) { c.st.focus = 1; msg += ` 下招蓄劲`; }
      if (a.reflect) { c.st.reflect = a.reflect; msg += ` 乾坤反震就绪`; }
      if (a.cleanse) { c.st.poison = 0; c.st.bleed = 0; c.st.chill = 0; msg += ` 负面净化`; JY.Combat.pushPop("hero", "净化!", "heal"); }
      JY.Combat.pushLog(msg);
    }

    // 2. 伤害与状态连携结算
    let triggeredMateAssist = false;
    if (sk.pow > 0) {
      let mult = sk.pow * lvMul;
      const isSword = sk.name.includes("剑") || sk.name.includes("刀") || sk.name.includes("棒");
      if (st.specials.yitian && sk.name.includes("剑")) mult *= 1.22;
      if (st.specials.jinsi && (sk.name.includes("掌") || sk.name.includes("点穴") || sk.name.includes("拳"))) mult *= 1.18;
      if (st.specials.tulong && foe.hp / foe.maxHp < 0.45) mult *= 1.35;
      const anranSurge = (sid === "anran" && P.hp / st.maxHp < 0.45);
      if (anranSurge) mult *= 1.35;
      if (c.st.chill > 0) mult *= Math.max(0.76, 1 - c.st.chill * 0.06);
      if (c.st.focus > 0) { mult *= 1.45; c.st.focus = 0; }

      // 破甲增伤 + 督脉破招加成
      if (foe.st.break > 0) mult *= (1 + foe.st.break * (0.18 + st.breakDmg));
      const isCounter = !!(sk.counter && intent && sk.counter === intent.type);
      if (isCounter) mult *= (1.25 + st.counterDmg);

      const hits = (sk.fx && sk.fx.multi) ? sk.fx.multi : 1;
      let totalDmg = 0, wasCrit = false;
      for (let h = 0; h < hits; h++) {
        let dmg = Math.max(8, Math.round(st.atk * mult - foe.def * (foe.st.break > 0 ? 0.45 : 0.78) + JY.rand(-3, 5)));
        if (Math.random() < st.crit) { dmg = Math.round(dmg * st.critDmg); wasCrit = true; }
        totalDmg += dmg;
      }

      // 敌方护体盾吸收（破甲类招式对盾双倍伤害）
      let shieldBroken = false;
      if (foe.shield > 0) {
        const effDmg = (sk.fx && sk.fx.break) ? Math.round(totalDmg * 1.8) : totalDmg;
        if (effDmg >= foe.shield) {
          totalDmg = Math.max(1, totalDmg - Math.round(foe.shield * 0.5));
          foe.shield = 0;
          shieldBroken = true;
        } else {
          foe.shield -= effDmg;
          totalDmg = 0;
        }
      }
      // 绝顶宗师护体气机：高阶 Boss 单招直接伤害上限为最大气血 38%（连携引爆与同道合击可额外追加），确保见招拆招节奏
      if (foe.boss && foe.d >= 7) {
        const cap = Math.round(foe.maxHp * 0.38);
        if (totalDmg > cap) totalDmg = cap;
      }
      foe.hp -= totalDmg;
      if (totalDmg > 0) {
        c.shake.foe = true;
        if (wasCrit || isCounter) c.shake.arena = true;
        JY.Combat.pushPop("foe", `${wasCrit ? "暴击 " : ""}-${totalDmg}`, wasCrit ? "crit" : "dmg");
      }
      if (shieldBroken) JY.Combat.pushPop("foe", "碎盾!", "break");

      // 吸血
      if (st.lifesteal > 0 && totalDmg > 0) {
        const lh = Math.max(1, Math.round(totalDmg * st.lifesteal));
        P.hp = Math.min(st.maxHp, P.hp + lh);
        JY.Combat.pushPop("hero", `+${lh}`, "heal");
      }

      let logMsg = `⚔ 「${sk.name}」${sk.flavor} 造成 ${totalDmg} 伤害${wasCrit ? "【会心！】" : ""}${isCounter ? "【破招克制！】" : ""}${anranSurge ? "【黯然销魂！】" : ""}${shieldBroken ? "【击碎铁壁！】" : ""}`;

      // 施加状态与连携引爆（Combo！）
      const fx = Object.assign({}, sk.fx || {}, sk.active || {});
      if (st.specials.yitian) fx.break = (fx.break || 0) + 1;
      if (fx.break) foe.st.break = Math.min(3, foe.st.break + fx.break);
      if (fx.poison) foe.st.poison = Math.min(5, foe.st.poison + fx.poison);
      if (fx.bleed) foe.st.bleed = Math.min(5, foe.st.bleed + fx.bleed);
      if (fx.chill) {
        foe.st.chill = Math.min(3, foe.st.chill + fx.chill);
        if (foe.st.chill >= 3) {
          const iceBoom = Math.round(st.atk * 1.65 * (1 + st.dotPct));
          foe.hp -= iceBoom; foe.st.chill = 0; foe.st.stun = 1;
          c.shake.arena = true;
          JY.Combat.pushPop("foe", `冰爆 -${iceBoom}`, "break");
          logMsg += ` ❄【寒气爆裂】冰封破脉追加 ${iceBoom} 伤并封穴！`;
          triggeredMateAssist = true;
        }
      }
      if (fx.stun || (st.specials.xuantie && wasCrit)) {
        foe.st.stun = 1;
        if (intent.type === "charge") {
          c.shake.arena = true;
          JY.Combat.pushPop("foe", "⚡完美打断!", "break");
          logMsg += " ⚡【完美打断】截断敌方蓄力杀招！";
          triggeredMateAssist = true;
        } else {
          JY.Combat.pushPop("foe", "定身!", "break");
          logMsg += " ⚡【点穴定身】";
        }
      }
      if (fx.shield) { const sh = Math.round(fx.shield * (1 + st.shieldPct)); c.shield += sh; JY.Combat.pushPop("hero", `护体+${sh}`, "shield"); }
      if (fx.counterHit) { c.st.reflect = Math.max(c.st.reflect || 0, 0.45); JY.Combat.pushPop("hero", "太极反震!", "shield"); logMsg += " ☯【借力反震就绪】"; }
      if (fx.evade) c.st.evade += fx.evade;
      if (fx.focus) c.st.focus = 1;

      // 引爆连携（detonate）
      let didDetonate = false;
      if (fx.detonate && foe.st[fx.detonate] > 0) {
        const stacks = foe.st[fx.detonate];
        const boom = Math.round(st.atk * 0.72 * stacks * (1 + st.dotPct));
        foe.hp -= boom;
        foe.st[fx.detonate] = 0;
        c.shake.arena = true;
        didDetonate = true;
        JY.Combat.pushPop("foe", `连携爆 -${boom}`, "crit");
        logMsg += ` 🔥【连携引爆·${JY.STATUS_META[fx.detonate].name}×${stacks}】额外爆发 ${boom} 伤害！`;
        triggeredMateAssist = true;
      }
      if (JY.Audio) {
        if (fx.stun || sk.name.includes("指") || sk.name.includes("穴")) JY.Audio.play("acupoint");
        else if (wasCrit || didDetonate) JY.Audio.play("crit");
        else if (isSword) JY.Audio.play("sword");
        else JY.Audio.play("palm");
      }
      JY.Combat.pushLog(logMsg);

      // 同道默契追击（主角破招打断或连携引爆时，随行同道立刻出手补刀并加速充能！）
      if (triggeredMateAssist && c.mate && foe.hp > 0) {
        const mDmg = Math.max(12, Math.round(st.atk * 0.62 * (1 + ((P.aff[c.mate.id] || 25) / 100) * 0.35)));
        foe.hp -= mDmg;
        c.synergy = Math.min(100, c.synergy + 15);
        JY.Combat.pushPop("foe", `♥${c.mate.name}追击 -${mDmg}`, "crit");
        JY.Combat.pushLog(`♥【默契追击】${c.mate.name}趁敌门户大开顺势补招，追加 ${mDmg} 伤害，同心 +15%！`);
      }
    }

    c.synergy = Math.min(100, c.synergy + 35 + (st.synergyBonus || 0));
    if (foe.hp <= 0) return JY.Combat.victory();
    JY.Combat.endPlayerTurn();
  };

  // 调息防御（0 耗：回真气 +3、获护体并减伤）
  JY.Combat.defendAndBreathe = function () {
    const c = JY.Combat.active, st = JY.getStats(JY.S.P);
    if (!c || c.busy) return;
    if (JY.Audio) JY.Audio.play("shield");
    const sh = Math.round((45 + st.def * 1.8) * (1 + st.shieldPct));
    c.shield += sh;
    c.mp = Math.min(c.mpMax, c.mp + 3);
    c.synergy = Math.min(100, c.synergy + 20);
    JY.Combat.pushPop("hero", `护体+${sh}`, "shield");
    JY.Combat.pushLog(`🛡 你凝神守御调息：真气 +3、护体罡气 +${sh}。`);
    JY.Combat.endPlayerTurn();
  };

  // 随行同道/红颜手动释放专属合击（同心值满 100，不消耗主角回合！）
  JY.Combat.castMateCombo = function () {
    const c = JY.Combat.active, P = JY.S.P, st = JY.getStats(P);
    if (!c || !c.mate || c.synergy < 100) return;
    c.synergy = 0;
    const m = c.mate, foe = c.foe, intent = JY.Combat.curIntent();
    const affMul = 1 + ((P.aff[m.id] || 25) / 100) * 0.45;
    let dmg = Math.round(st.atk * 1.95 * affMul);
    let extra = "";
    if (m.id === "huangrong") {
      foe.st.break = Math.min(3, foe.st.break + 2); foe.st.stun = 1;
      extra = " 破甲×2 + 点穴打断！";
    } else if (m.id === "xiaolongnv") {
      c.st.evade += 1;
      extra = " 双段剑气连斩并获闪身护持！";
    } else if (m.id === "zhouzhiruo") {
      foe.st.bleed = Math.min(5, foe.st.bleed + 2);
      if (foe.hp / foe.maxHp < 0.4) { dmg *= 2; extra = " 残血双倍斩杀 + 流血×2！"; }
      else extra = " 凌厉斩击 + 流血×2！";
    } else if (m.id === "zhaomin") {
      foe.st.stun = 1; foe.st.break = Math.min(3, foe.st.break + 1);
      const h = Math.round(st.maxHp * 0.18); P.hp = Math.min(st.maxHp, P.hp + h);
      extra = ` 打断蓄力、破甲并回血 +${h}！`;
    } else if (m.id === "renyingying") {
      c.st.poison = 0; c.st.bleed = 0; c.st.chill = 0;
      c.mp = Math.min(c.mpMax, c.mp + 3);
      extra = " 净化全部负面并回真气 +3！";
    } else if (m.id === "guojing") {
      const sh = Math.round(160 * (1 + st.shieldPct)); c.shield += sh;
      extra = ` 护体罡气 +${sh}！`;
    } else if (m.id === "linghu") {
      if (intent && intent.type === "charge") {
        dmg = Math.round(dmg * 1.65); foe.st.stun = 1;
        extra = " 料敌破招必定暴击并打断蓄力！";
      } else {
        dmg = Math.round(dmg * 1.2);
        extra = " 无视防御破招斩击！";
      }
    } else if (m.id === "yangguo") {
      const stacks = (foe.st.bleed || 0) + (foe.st.break || 0);
      if (stacks > 0) {
        const boom = Math.round(st.atk * 0.65 * stacks * (1 + st.dotPct));
        dmg += boom; foe.st.bleed = 0; foe.st.break = 0;
        extra = ` 引爆流血与破甲(×${stacks})追加 ${boom} 巨伤！`;
      } else {
        foe.st.break = Math.min(3, foe.st.break + 2);
        extra = " 重剑无锋强压破甲×2！";
      }
    } else if (m.id === "zhangwj") {
      const h = Math.round(st.maxHp * 0.20); P.hp = Math.min(st.maxHp, P.hp + h);
      c.mp = Math.min(c.mpMax, c.mp + 2);
      c.st.reflect = Math.max(c.st.reflect || 0, 0.5);
      extra = ` 乾坤反震就绪、回血 +${h}、真气 +2！`;
    } else if (m.id === "qiaofeng") {
      foe.st.stun = 1;
      extra = " 排山倒海震晕 1 回合！";
    } else if (m.id === "tianbg") {
      foe.st.bleed = Math.min(5, foe.st.bleed + 2);
      dmg = Math.round(dmg * 1.12);
      extra = " 疾风三连斩并叠加流血×2！";
    } else if (m.id === "oyfeng") {
      foe.st.poison = Math.min(5, foe.st.poison + 3);
      const boom = Math.round(foe.st.poison * 24 * (1 + st.dotPct));
      dmg += boom;
      extra = ` 剧毒×3 并立刻毒爆追加 ${boom} 伤！`;
    }
    foe.hp -= dmg;
    c.shake.foe = true;
    c.shake.arena = true;
    if (JY.Audio) JY.Audio.play("crit");
    JY.Combat.pushPop("foe", `♥合击 -${dmg}`, "crit");
    JY.Combat.pushLog(`♥【同道合击 · ${m.name} · ${m.comboName}】造成 ${dmg} 伤害！${extra}`);
    if (foe.hp <= 0) return JY.Combat.victory();
    JY.UI.renderCombat();
  };

  // 战斗用药（不结束回合，方便危急自救；防满状态误点浪费）
  JY.Combat.useCombatItem = function (itemId) {
    const c = JY.Combat.active, P = JY.S.P, st = JY.getStats(P), it = JY.ITEMS[itemId];
    if (!c || !it || !(P.inv[itemId] > 0)) return;
    const canHeal = !!(it.heal && P.hp < st.maxHp);
    const canMp = !!(it.mp && c.mp < c.mpMax);
    const canCleanse = !!(it.cleanse && (c.st.poison > 0 || c.st.bleed > 0 || c.st.chill > 0)) || (itemId === "jinchuang" && c.st.bleed > 0);
    if (!canHeal && !canMp && !canCleanse) {
      JY.Combat.pushLog(`当前状态充沛，无需浪费「${it.name}」。`);
      JY.UI.renderCombat();
      return;
    }
    P.inv[itemId]--;
    if (JY.Audio) JY.Audio.play("shield");
    let msg = `💊 服用「${it.name}」：`;
    if (it.heal) { const h = Math.min(st.maxHp - P.hp, it.heal); P.hp += h; msg += ` 气血 +${h}`; JY.Combat.pushPop("hero", `+${h}`, "heal"); }
    if (it.mp) { c.mp = Math.min(c.mpMax, c.mp + it.mp); msg += ` 真气 +${it.mp}`; }
    if (it.cleanse) { c.st.poison = 0; c.st.bleed = 0; c.st.chill = 0; msg += " 毒伤寒邪尽清"; }
    else if (itemId === "jinchuang" && c.st.bleed > 0) { c.st.bleed = Math.max(0, c.st.bleed - 1); msg += " 止血"; }
    JY.Combat.pushLog(msg);
    JY.UI.renderAll();
  };

  JY.Combat.flee = function () {
    const c = JY.Combat.active; if (!c) return;
    if (c.hooks && c.hooks.noFlee) { JY.Combat.pushLog("狭路相逢，此战避无可避！"); JY.UI.renderCombat(); return; }
    JY.Combat.stopAuto();
    JY.Combat.active = null;
    JY.addLog("你施展轻功抽身撤出了战团。", "dim");
    JY.UI.setStageMode("explore");
    JY.UI.renderAll();
  };

  // 敌人回合结算
  JY.Combat.endPlayerTurn = function () {
    const c = JY.Combat.active, P = JY.S.P, st = JY.getStats(P), foe = c.foe;
    // 敌方持续伤害（剧毒 / 流血）
    if (foe.st.poison > 0) {
      const pd = Math.round(foe.st.poison * 18 * (1 + st.dotPct));
      foe.hp -= pd; foe.st.poison = Math.max(0, foe.st.poison - 1);
      JY.Combat.pushLog(`☠ ${foe.name}毒发受 ${pd} 点无视防御毒伤！`);
    }
    if (foe.st.bleed > 0) {
      const bd = Math.round(foe.st.bleed * 15 * (1 + st.dotPct));
      foe.hp -= bd; foe.st.bleed = Math.max(0, foe.st.bleed - 1);
      JY.Combat.pushLog(`🩸 ${foe.name}伤口崩裂流血 ${bd} 点！`);
    }
    if (foe.hp <= 0) return JY.Combat.victory();

    // 敌人行动
    const intent = JY.Combat.curIntent();
    if (foe.st.stun > 0) {
      foe.st.stun = 0;
      JY.Combat.pushLog(`⚡ ${foe.name}被点中要穴，原定「${intent.name}」彻底落空！`);
    } else if (intent.type === "iron") {
      foe.shield += intent.shield || 120;
      JY.Combat.pushLog(`🛡 ${foe.name}运起「${intent.name}」，护体铁壁 +${intent.shield || 120}！`);
    } else {
      const chillMul = Math.max(0.65, 1 - foe.st.chill * 0.08);
      let raw = Math.max(6, Math.round(foe.atk * (intent.mul || 1) * chillMul - st.def * 0.72 + JY.rand(-2, 4)));
      const dodged = (c.st.evade > 0) || (Math.random() < st.dodge);
      if (dodged) {
        if (c.st.evade > 0) c.st.evade--;
        let dMsg = `💨 你身形飘忽，堪堪避过了${foe.name}的「${intent.name}」！`;
        if (st.riposte) {
          const rd = Math.round(st.atk * 0.85);
          foe.hp -= rd;
          dMsg += `【阴跷反击】顺手反刺 ${rd} 伤！`;
        }
        if (st.mpOnDodge) c.mp = Math.min(c.mpMax, c.mp + st.mpOnDodge);
        JY.Combat.pushLog(dMsg);
      } else {
        // 护盾吸收
        let taken = raw;
        if (c.shield > 0) {
          const abs = Math.min(c.shield, taken);
          c.shield -= abs; taken -= abs;
        }
        if (taken > 0) {
          P.hp -= taken;
          c.shake.hero = true;
          if (JY.Audio) JY.Audio.play("hit");
          JY.Combat.pushPop("hero", `-${taken}`, "dmg");
        } else {
          JY.Combat.pushPop("hero", "护体格挡!", "shield");
        }
        let hitMsg = `💥 ${foe.name}施展「${intent.name}」，对你造成 ${taken} 点伤害${raw > taken ? `（护体吸收 ${raw - taken}）` : ""}。`;
        // 软猬甲 / 乾坤反震 / 太极借力
        const rf = (st.specials.ruanwei ? 0.25 : 0) + (c.st.reflect || 0);
        if (rf > 0 && raw > 0) {
          const rb = Math.round(raw * rf);
          foe.hp -= rb;
          JY.Combat.pushPop("foe", `反震 -${rb}`, "break");
          hitMsg += ` 反震 ${rb} 伤！`;
        }
        c.st.reflect = 0;
        if (intent.fx && intent.fx.poison && !st.specials.ruanwei) {
          c.st.poison = Math.min(5, (c.st.poison || 0) + intent.fx.poison);
          hitMsg += " 你身中剧毒！";
        }
        if (intent.fx && intent.fx.bleed) {
          c.st.bleed = Math.min(5, (c.st.bleed || 0) + intent.fx.bleed);
          hitMsg += " 伤口崩裂流血！";
        }
        if (intent.fx && intent.fx.chill) {
          c.st.chill = Math.min(3, (c.st.chill || 0) + intent.fx.chill);
          hitMsg += " 阴寒内劲侵脉！";
        }
        JY.Combat.pushLog(hitMsg);
      }
    }

    // 玩家回合末持续伤害（剧毒 / 流血 / 寒气衰减）与濒死黑玉断续佩
    if (c.st.poison > 0) {
      let pd = c.st.poison * 14;
      if (c.shield > 0) { const abs = Math.min(c.shield, pd); c.shield -= abs; pd -= abs; }
      if (pd > 0) P.hp -= pd;
      c.st.poison = Math.max(0, c.st.poison - 1);
      JY.Combat.pushLog(`☠ 毒气蚀体，损失 ${pd} 点气血。`);
    }
    if (c.st.bleed > 0) {
      let bd = c.st.bleed * 12;
      if (c.shield > 0) { const abs = Math.min(c.shield, bd); c.shield -= abs; bd -= abs; }
      if (bd > 0) P.hp -= bd;
      c.st.bleed = Math.max(0, c.st.bleed - 1);
      JY.Combat.pushLog(`🩸 伤口流血，损失 ${bd} 点气血。`);
    }
    if (c.st.chill > 0) c.st.chill = Math.max(0, c.st.chill - 1);
    if (P.hp <= 0 && st.specials.heiyu && !c.heiyuUsed) {
      c.heiyuUsed = true;
      P.hp = Math.round(st.maxHp * 0.35);
      JY.Combat.pushLog(`✦【黑玉断续佩】生死一瞬护住心脉，气血回升至 ${P.hp}！`);
    }
    if (foe.hp <= 0) return JY.Combat.victory();
    if (P.hp <= 0) return JY.Combat.defeat();

    // 推进下一回合 + 预告敌方新意图 + 回真气 + 古琴曲谱回血
    c.turn++;
    foe.intentIdx = (foe.intentIdx + 1) % foe.intents.length;
    c.mp = Math.min(c.mpMax, c.mp + st.mpRegen);
    if (st.specials.tiancan) c.shield += 45;
    if (st.regenHp > 0 && P.hp < st.maxHp) {
      const rh = Math.min(st.maxHp - P.hp, st.regenHp);
      P.hp += rh;
      JY.Combat.pushPop("hero", `🎵+${rh}`, "heal");
    }
    JY.UI.renderAll();
  };

  JY.Combat.victory = function () {
    const c = JY.Combat.active, P = JY.S.P, foe = c.foe, hooks = c.hooks;
    const isTower = !!(hooks && hooks.isTower);
    JY.Combat.stopAuto();
    JY.Combat.active = null;
    if (JY.Audio) JY.Audio.play("fanfare");
    if (P.foodBuff && P.foodBuff.battles > 0) {
      P.foodBuff.battles--;
      if (P.foodBuff.battles <= 0) P.foodBuff = null;
    }
    if (P.songBuff && P.songBuff.battles > 0) {
      P.songBuff.battles--;
      if (P.songBuff.battles <= 0) P.songBuff = null;
    }
    JY.addLog(`✧ 你力克「${foe.name}」大获全胜！`, "rew");
    if (!isTower) {
      JY.applyEffect({ exp: foe.exp, gold: foe.gold });
      foe.drop.forEach(dr => {
        if (Math.random() <= dr.rate) JY.applyEffect({ item: dr.item });
      });
      if (P.mate) JY.applyEffect({ aff: { [P.mate]: foe.boss ? 4 : 2 } });
      JY.Systems.checkBountyKill(foe.id);
    }
    JY.UI.setStageMode("explore");
    if (hooks && hooks.onWin) hooks.onWin();
    // 仅当非试炼塔且未处于续播剧情剧场时，单独挑战王重阳自动触发终局画卷（避免与华山论剑三阵剧场双重弹窗）
    if (!isTower && !JY.Story.active && foe.id === "wangcy_boss" && !P.flags.v3_ending) {
      P.flags.v3_ending = true;
      JY.addChronicle("华山之巅力挫中神通王重阳，问鼎武林至尊！");
      setTimeout(() => JY.UI.showEndingModal(), 250);
    }
    JY.UI.renderAll();
  };

  JY.Combat.defeat = function () {
    const c = JY.Combat.active, P = JY.S.P, st = JY.getStats(P);
    const isTower = !!(c && c.hooks && c.hooks.isTower);
    JY.Combat.stopAuto();
    JY.Combat.active = null;
    if (isTower) {
      P.hp = Math.max(1, Math.round(st.maxHp * 0.6));
      JY.addLog("你在藏经阁武林幻境中点到即止退出试炼（幻境演武不损银两，气血恢复至六成）。", "sys");
    } else {
      P.hp = Math.max(1, Math.round(st.maxHp * 0.45));
      const loss = Math.floor(P.gold * 0.08);
      P.gold -= loss;
      JY.addLog(`你力竭不支暂退养伤（损银 ${loss} 两，气血恢复至四成半）。调整武功连携与经脉后再战！`, "warn");
    }
    JY.UI.setStageMode("explore");
    JY.UI.renderAll();
  };
})(window);


/* ===== js/core/story.js ===== */
/* =====================================================================
   山河十四卷 v1.0 · 核心引擎 4：沉浸式立绘剧情剧场播放器（跨城长线/队友插话/真后果）
   ===================================================================== */
(function (root) {
  "use strict";
  const JY = root.JY;

  JY.Story = {
    active: null
  };

  // 返回某剧幕当前尚未满足的历练门槛说明列表（用于主线罗盘与 NPC 资格核验展示）
  JY.Story.getMissingRequirements = function (ep) {
    const P = JY.S.P;
    const miss = [];
    if (!ep) return miss;
    if (ep.reqSect && P.sect !== ep.reqSect) {
      miss.push(`需拜入${JY.SECTS[ep.reqSect] ? JY.SECTS[ep.reqSect].name : ep.reqSect}`);
    }
    if (ep.reqUnaligned && P.sect) miss.push("需为江湖散修身份");
    if (ep.reqAff) {
      for (const [mid, threshold] of Object.entries(ep.reqAff)) {
        const cur = P.mates.includes(mid) ? (P.aff[mid] || 0) : 0;
        if (!P.mates.includes(mid) || cur < threshold) {
          const mt = JY.MATES.find(x => x.id === mid);
          miss.push(`需结交${mt ? mt.name : mid}且好感≥${threshold}（当前${cur}）`);
        }
      }
    }
    if (ep.reqTianshu) {
      const cnt = Object.keys(P.tianshu || {}).length;
      if (cnt < ep.reqTianshu) miss.push(`需集得十四天书 ${ep.reqTianshu} 部（当前 ${cnt}/${ep.reqTianshu}）`);
    }
    if (ep.reqSkillLv) {
      const maxLv = Math.max(1, ...Object.values(P.learned || {}).map(x => x.lv || 1));
      if (maxLv < ep.reqSkillLv) miss.push(`需任一武功修至 Lv${ep.reqSkillLv}（当前最高 Lv${maxLv}）`);
    }
    if (ep.reqMeridians) {
      const merCnt = Object.values(P.meridians || {}).reduce((s, v) => s + (v || 0), 0);
      if (merCnt < ep.reqMeridians) miss.push(`需奇经八脉打通 ${ep.reqMeridians} 穴（当前 ${merCnt}/${ep.reqMeridians}）`);
    }
    if (ep.reqBounties) {
      const bCnt = Object.values(P.bountyDone || {}).reduce((s, v) => s + (v || 0), 0);
      if (bCnt < ep.reqBounties) miss.push(`需完成江湖悬赏 ${ep.reqBounties} 次（当前 ${bCnt}/${ep.reqBounties}）`);
    }
    if (ep.reqGear) {
      const gCnt = ["weapon", "armor", "trinket", "boots"].filter(sl => P.gear && P.gear[sl]).length;
      if (gCnt < ep.reqGear) miss.push(`需穿戴至少 ${ep.reqGear} 件锻造/神兵装备（当前 ${gCnt}/${ep.reqGear}）`);
    }
    return miss;
  };

  // 剧情追踪与触发入口共用进度、门派、同道与主线历练门槛。
  JY.Story.meetsRequirements = function (ep) {
    const P = JY.S.P;
    if (P.flags[ep.id + "_played"] || (ep.reqFlag && !P.flags[ep.reqFlag])) return false;
    return JY.Story.getMissingRequirements(ep).length === 0;
  };

  // 查找当前房间指定 NPC 身上“前置剧情已通、但历练门槛尚未达标”的主线剧幕（用于给出清晰引导而非静默隐藏）
  JY.Story.findLockedEpisodesForNpc = function (npcId, roomId = JY.S.room) {
    const P = JY.S.P, locked = [];
    for (const quest of Object.values(JY.QUESTS)) {
      for (const ep of quest.episodes) {
        const tr = ep.trigger || {};
        if ((tr.npc || null) !== (npcId || null)) continue;
        if (tr.region && tr.region !== JY.S.region) continue;
        if (tr.room && tr.room !== roomId) continue;
        if (P.flags[ep.id + "_played"]) continue;
        if (ep.reqFlag && !P.flags[ep.reqFlag]) continue;
        const miss = JY.Story.getMissingRequirements(ep);
        if (miss.length > 0 && (ep.reqTianshu || ep.reqSkillLv || ep.reqMeridians || ep.reqBounties || ep.reqGear)) {
          locked.push({ quest, ep, miss });
        }
      }
    }
    return locked;
  };

  // NPC 与场景各自列出符合当前地点和时辰的全部剧幕。
  JY.Story.findAvailableEpisodes = function (npcId, roomId = JY.S.room) {
    const night = JY.isNight();
    const available = [];
    for (const quest of Object.values(JY.QUESTS)) {
      for (const ep of quest.episodes) {
        const tr = ep.trigger || {};
        if ((tr.npc || null) !== (npcId || null)) continue;
        if (tr.region && tr.region !== JY.S.region) continue;
        if (tr.room && tr.room !== roomId) continue;
        if (tr.time === "night" && !night) continue;
        if (tr.time === "day" && night) continue;
        if (JY.Story.meetsRequirements(ep)) available.push({ quest, ep });
      }
    }
    return available;
  };

  JY.Story.findAvailableEpisode = function (npcId, roomId) {
    return JY.Story.findAvailableEpisodes(npcId, roomId)[0] || null;
  };

  JY.Story.openEpisode = function (questId, episodeId, npcId) {
    if (JY.Story.active || JY.Combat.active) return;
    if (npcId && !(JY.World.curRoom().npcs || []).some(npc => npc.id === npcId)) return;
    const available = JY.Story.findAvailableEpisodes(npcId).find(({ quest, ep }) =>
      quest.id === questId && ep.id === episodeId
    );
    if (!available) return;
    JY.UI.closeModal();
    JY.Story.play(available.quest, available.ep);
  };

  // 启动立绘剧情剧场（支持静态 steps 数组与基于当前状态的动态 steps 函数）
  JY.Story.play = function (quest, ep) {
    const resolvedSteps = typeof ep.steps === "function" ? ep.steps(JY.S.P) : (ep.steps || []);
    JY.Story.active = {
      quest,
      ep,
      steps: resolvedSteps,
      idx: 0,
      leftArt: "assets/hero-portrait.webp",
      rightArt: "",
      activeSide: "left",
      speaker: "旁白",
      text: "",
      choices: null,
      afterReply: null
    };
    JY.UI.setStageMode("story");
    JY.Story.step();
  };

  JY.Story.step = function () {
    const st = JY.Story.active;
    if (!st) return;
    if (st.afterReply) {
      const rep = st.afterReply;
      st.afterReply = null;
      st.speaker = rep[0] === "主角" ? JY.S.P.name : rep[0];
      st.text = rep[1];
      st.choices = null;
      JY.UI.renderTheater();
      return;
    }
    const list = st.steps || st.ep.steps || [];
    while (st.idx < list.length) {
      const node = list[st.idx++];
      const P = JY.S.P;
      if (node.ifMate && P.mate !== node.ifMate) continue;
      if (node.ifFlag && !P.flags[node.ifFlag]) continue;
      if (node.unlessFlag && P.flags[node.unlessFlag]) continue;
      if (node.show) {
        if (node.show.left !== undefined) st.leftArt = node.show.left;
        if (node.show.right !== undefined) st.rightArt = node.show.right;
        if (node.show.active) st.activeSide = node.show.active;
      }
      if (node.effect) JY.applyEffect(node.effect);
      if (node.nar) {
        st.speaker = "旁白";
        st.text = node.nar;
        st.choices = null;
        JY.UI.renderTheater();
        return;
      }
      if (node.say) {
        st.speaker = node.say[0] === "主角" ? JY.S.P.name : node.say[0];
        st.text = node.say[1];
        st.choices = null;
        JY.UI.renderTheater();
        return;
      }
      if (node.choice) {
        st.choices = node.choice;
        JY.UI.renderTheater();
        return;
      }
      if (node.battle) {
        const hasMore = st.idx < list.length;
        const savedStory = st;
        const epRef = st.ep;
        const subKey = "_subrew_" + epRef.id + "_" + st.idx;
        const winFlag = node.onWinFlag;
        const winNar = node.winNar;
        const winReward = node.winReward;
        const healAfter = node.healBetween || 0;
        JY.Story.active = null;
        JY.Combat.start(node.battle, {
          noFlee: true,
          onWin: () => {
            if (winFlag) JY.S.P.flags[winFlag] = true;
            if (winNar) JY.addLog(`📜 ${winNar}`, "talk");
            if (winReward && (!hasMore || !JY.S.P.flags[subKey])) {
              if (hasMore) JY.S.P.flags[subKey] = true;
              JY.applyEffect(winReward);
            }
            if (healAfter > 0) {
              const curSt = JY.getStats(JY.S.P);
              JY.S.P.hp = Math.min(curSt.maxHp, JY.S.P.hp + Math.round(curSt.maxHp * healAfter));
            }
            if (hasMore) {
              JY.Story.active = savedStory;
              JY.UI.setStageMode("story");
              JY.Story.step();
            } else {
              JY.S.P.flags[epRef.id + "_played"] = true;
              JY.addChronicle(`完成剧情「${epRef.title}」`);
              if (epRef.onComplete) epRef.onComplete();
            }
          }
        });
        return;
      }
    }
    // 剧情自然收尾
    JY.S.P.flags[st.ep.id + "_played"] = true;
    JY.addLog(`📜 剧情完结：【${st.quest.title} · ${st.ep.title}】`, "sys");
    JY.addChronicle(`经历「${st.ep.title}」`);
    const onDone = st.ep.onComplete;
    JY.Story.active = null;
    JY.UI.setStageMode("explore");
    if (onDone) onDone();
    JY.UI.renderAll();
  };

  JY.Story.choose = function (choiceIdx) {
    const st = JY.Story.active;
    if (!st || !st.choices || !st.choices[choiceIdx]) return;
    const ch = st.choices[choiceIdx];
    if (!JY.Story.choiceEnabled(ch)) return;
    st.choices = null;
    if (JY.Audio) JY.Audio.play("click");
    if (ch.battle) {
      const list = st.steps || st.ep.steps || [];
      const hasMore = !!(ch.reply || st.idx < list.length);
      const savedStory = st;
      const epRef = st.ep;
      const winNar = ch.winNar;
      const eff = ch.effect;
      const winFlag = ch.onWinFlag;
      const winReward = ch.winReward;
      if (ch.reply) savedStory.afterReply = ch.reply;
      JY.Story.active = null;
      JY.Combat.start(ch.battle, {
        noFlee: true,
        onWin: () => {
          if (winFlag) JY.S.P.flags[winFlag] = true;
          if (eff) JY.applyEffect(eff);
          if (winReward) JY.applyEffect(winReward);
          if (winNar) JY.addLog(`📜 ${winNar}`, "talk");
          if (hasMore) {
            JY.Story.active = savedStory;
            JY.UI.setStageMode("story");
            JY.Story.step();
          } else {
            JY.S.P.flags[epRef.id + "_played"] = true;
            JY.addChronicle(`在「${epRef.title}」中力克强敌`);
            if (epRef.onComplete) epRef.onComplete();
          }
        }
      });
      return;
    }
    if (ch.effect) JY.applyEffect(ch.effect);
    if (ch.reply) {
      st.afterReply = ch.reply;
      JY.Story.step();
    } else {
      JY.Story.step();
    }
  };

  JY.Story.choiceEnabled = function (ch) {
    const P = JY.S.P;
    if (ch.reqMate && P.mate !== ch.reqMate) return false;
    if (ch.reqAnyMate && P.mate !== ch.reqAnyMate && (P.aff[ch.reqAnyMate] || 0) < 25) return false;
    if (ch.reqLife) {
      for (const k of Object.keys(ch.reqLife)) {
        if ((P.life[k] || 1) < ch.reqLife[k]) return false;
      }
    }
    return true;
  };
})(window);


/* ===== js/core/systems.js ===== */
/* =====================================================================
   山河十四卷 v1.0 · 核心引擎 5：武学冲脉 / 神兵词条 / 生活技艺 / 悬赏黑市 / 同道红颜
   ===================================================================== */
(function (root) {
  "use strict";
  const JY = root.JY;
  JY.Systems = {};

  // 1. 修炼武功（消耗修为升至 Lv9）
  JY.Systems.upgradeSkill = function (sid) {
    const P = JY.S.P, le = P.learned[sid], sk = JY.SKILLS[sid];
    if (!le || !sk || le.lv >= 9) return;
    const disc = P.origin === "shidi" ? 0.88 : 1;
    const cost = Math.round((60 + le.lv * le.lv * 38) * (1 + sk.rarity * 0.28) * disc);
    if (P.exp < cost) { JY.addLog(`修为不足（需 ${cost}，当前 ${P.exp}）。`, "warn"); return; }
    P.exp -= cost;
    le.lv++;
    JY.addLog(`✦ 「${sk.name}」精进至第 ${le.lv} 重！`, "rew");
    JY.UI.renderAll();
  };

  JY.Systems.toggleEquipSkill = function (sid) {
    const P = JY.S.P, sk = JY.SKILLS[sid];
    if (!sk || !P.learned[sid]) return;
    if (sk.type === 0) {
      if (P.equipped.outer.includes(sid)) {
        P.equipped.outer = P.equipped.outer.filter(x => x !== sid);
      } else {
        if (P.equipped.outer.length >= 4) P.equipped.outer.shift();
        P.equipped.outer.push(sid);
      }
    } else if (sk.type === 1) {
      P.equipped.inner = (P.equipped.inner === sid) ? null : sid;
    } else {
      P.equipped.light = (P.equipped.light === sid) ? null : sid;
    }
    JY.UI.renderAll();
  };

  // 2. 奇经八脉冲穴
  JY.Systems.unlockMeridian = function (mid) {
    const P = JY.S.P, mer = JY.MERIDIANS.find(x => x.id === mid);
    if (!mer) return;
    const cur = P.meridians[mid] || 0;
    if (cur >= mer.levels.length) return;
    const step = mer.levels[cur];
    const disc = P.origin === "shidi" ? 0.88 : 1;
    const needExp = Math.round(step.exp * disc);
    if (P.exp < needExp) { JY.addLog(`修为不足（需 ${needExp}）。`, "warn"); return; }
    if ((P.inv[step.pill] || 0) < 1) { JY.addLog(`缺少丹药「${JY.ITEMS[step.pill].name}」（可在药铺购买或自行炼丹）。`, "warn"); return; }
    P.exp -= needExp;
    P.inv[step.pill]--;
    P.meridians[mid] = cur + 1;
    const st = JY.getStats(P);
    P.hp = Math.min(st.maxHp, P.hp + 60);
    JY.addLog(`✦✦ 成功打通【${mer.name} · ${step.acupoint}穴】！获得：${step.txt}。`, "rew");
    JY.addChronicle(`打通${mer.name}·${step.acupoint}穴`);
    JY.UI.renderAll();
  };

  // 3. 装备穿戴与随机词条锻造
  JY.Systems.equipGear = function (bagIdx) {
    const P = JY.S.P, g = P.bagGear[bagIdx];
    if (!g) return;
    const old = P.gear[g.slot];
    P.gear[g.slot] = g;
    P.bagGear.splice(bagIdx, 1);
    if (old) P.bagGear.push(old);
    const st = JY.getStats(P);
    P.hp = Math.min(P.hp, st.maxHp);
    JY.addLog(`装备了「${g.name}」。`, "sys");
    JY.UI.renderAll();
  };

  JY.Systems.craftRecipe = function (cat, recipeId) {
    const P = JY.S.P, list = JY.RECIPES[cat] || [];
    const rec = list.find(r => r.id === recipeId);
    if (!rec) return;
    if ((P.life[cat] || 1) < rec.reqLv) { JY.addLog(`技艺等级不足（需 Lv${rec.reqLv}）。`, "warn"); return; }
    for (const k of Object.keys(rec.mats)) {
      if ((P.inv[k] || 0) < rec.mats[k]) { JY.addLog(`材料不足：缺少 ${JY.ITEMS[k].name}。`, "warn"); return; }
    }
    Object.keys(rec.mats).forEach(k => { P.inv[k] -= rec.mats[k]; });
    JY.gainLifeExp(cat, rec.exp);
    if (rec.out) {
      Object.keys(rec.out).forEach(k => { P.inv[k] = (P.inv[k] || 0) + rec.out[k]; });
      JY.addLog(`🔥 成功制作「${rec.name}」！`, "rew");
    } else if (rec.legendary) {
      JY.applyEffect({ legendary: rec.legendary });
    } else if (rec.gearSlot) {
      // 按梯队生成 2–3 条随机江湖词条装备（覆盖兵刃/护甲/轻履/佩饰全 4 部位）
      const tier = rec.tier || 2;
      const cnt = tier >= 3 ? 3 : 2;
      const pool = JY.AFFIXES.slice();
      const chosen = [];
      for (let i = 0; i < cnt && pool.length; i++) {
        const idx = Math.floor(Math.random() * pool.length);
        chosen.push(pool.splice(idx, 1)[0]);
      }
      const baseNames = {
        weapon: tier >= 3 ? "寒铁名刃" : "精钢剑",
        armor:  tier >= 3 ? "金丝宝甲" : "锁子甲",
        boots:  "乌蚕轻履",
        trinket:"玉髓护符"
      };
      const nm = `${chosen[0].name}${baseNames[rec.gearSlot] || "名器"}`;
      const lv = P.life.forge || 1;
      const g = {
        id: "craft_" + Date.now() + "_" + JY.rand(10, 99),
        name: nm,
        slot: rec.gearSlot,
        rarity: tier,
        enh: 0,
        atk: rec.gearSlot === "weapon" ? (tier >= 3 ? 34 : 20) + lv * 4 : (rec.gearSlot === "trinket" ? 10 + lv * 2 : 0),
        def: rec.gearSlot === "armor" ? (tier >= 3 ? 24 : 14) + lv * 3 : (rec.gearSlot === "trinket" ? 8 + lv * 2 : 0),
        hp:  rec.gearSlot === "armor" ? (tier >= 3 ? 160 : 85) : (rec.gearSlot === "trinket" ? 90 : 0),
        dodge: rec.gearSlot === "boots" ? 0.06 + lv * 0.01 : 0,
        affixes: chosen,
        desc: `词条：${chosen.map(a => a.txt).join(" · ")}`
      };
      P.bagGear.push(g);
      JY.addLog(`⚒ 炉火纯青！锻造出 ${cnt} 词条装备「${g.name}」（${g.desc}）！`, "rew");
    }
    JY.UI.renderAll();
  };

  // 装备回炉淬炼强化（+1 ~ +5）与词条洗练重铸
  JY.Systems.enhanceGear = function (slotOrIdx, isEquipped) {
    const P = JY.S.P;
    const g = isEquipped ? P.gear[slotOrIdx] : P.bagGear[slotOrIdx];
    if (!g) return;
    const cur = g.enh || 0;
    if (cur >= 5) { JY.addLog(`「${g.name}」已淬炼至满级 +5！`, "dim"); return; }
    const needIron = 1 + cur;
    const needGold = 60 + cur * 55;
    if ((P.inv.ore_iron || 0) < needIron) { JY.addLog(`精铁不足（需百炼精铁×${needIron}）。`, "warn"); return; }
    if (P.gold < needGold) { JY.addLog(`银两不足（需 ${needGold} 两）。`, "warn"); return; }
    P.inv.ore_iron -= needIron;
    P.gold -= needGold;
    g.enh = cur + 1;
    if (JY.Audio) JY.Audio.play("sword");
    JY.addLog(`⚒ 淬火成功！「${g.name}」强化至 +${g.enh}（基础属性大幅提升）！`, "rew");
    JY.UI.renderAll();
  };

  JY.Systems.reforgeGear = function (slotOrIdx, isEquipped) {
    const P = JY.S.P;
    const g = isEquipped ? P.gear[slotOrIdx] : P.bagGear[slotOrIdx];
    if (!g || !g.affixes || !g.affixes.length) { JY.addLog("原著神兵自带绝世特效，无需重铸随机词条。", "dim"); return; }
    const needIron = 2, needGold = 90;
    if ((P.inv.ore_iron || 0) < needIron || P.gold < needGold) {
      JY.addLog(`重铸需百炼精铁×${needIron} 与 ${needGold} 两银子。`, "warn"); return;
    }
    P.inv.ore_iron -= needIron;
    P.gold -= needGold;
    const cnt = g.affixes.length;
    const pool = JY.AFFIXES.slice(), chosen = [];
    for (let i = 0; i < cnt && pool.length; i++) chosen.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
    g.affixes = chosen;
    g.desc = `词条：${chosen.map(a => a.txt).join(" · ")}`;
    if (JY.Audio) JY.Audio.play("sword");
    JY.addLog(`🔥 词条重铸完成！「${g.name}」焕发新词条：${chosen.map(a => a.txt).join(" · ")}！`, "rew");
    JY.UI.renderAll();
  };

  // 音律 · 主动弹奏古琴获得 3 战独立战前曲谱 Buff
  JY.Systems.playMusicSong = function (songId) {
    const P = JY.S.P, song = (JY.MUSIC_SONGS || []).find(s => s.id === songId);
    if (!song) return;
    if ((P.life.music || 1) < song.reqLv) { JY.addLog(`音律造诣不足（需 Lv${song.reqLv}）。`, "warn"); return; }
    if (P.energy < song.energy) { JY.addLog(`精力不足（需 ${song.energy} 点）。`, "warn"); return; }
    P.energy -= song.energy;
    JY.gainLifeExp("music", 35);
    P.songBuff = Object.assign({}, song);
    if (JY.Audio) JY.Audio.play("guqin");
    JY.addLog(`🎵 你焚香抚琴一曲《${song.name}》，余韵绕梁！接下来 ${song.battles} 场战斗获曲谱加持！`, "rew");
    JY.UI.renderAll();
  };

  // 弈棋 · 珍珑古谱残局解谜挑战
  JY.Systems.solveChessPuzzle = function (puzzleId, optIdx) {
    const P = JY.S.P, pz = (JY.CHESS_PUZZLES || []).find(x => x.id === puzzleId);
    if (!pz || !pz.options[optIdx]) return;
    P.chessSolved = P.chessSolved || {};
    if (P.chessSolved[puzzleId]) return;
    if ((P.life.chess || 1) < pz.reqLv) { JY.addLog(`弈棋造诣不足（需 Lv${pz.reqLv}）。`, "warn"); return; }
    const opt = pz.options[optIdx];
    if (JY.Audio) JY.Audio.play("chess");
    if (opt.correct) {
      P.chessSolved[puzzleId] = true;
      JY.gainLifeExp("chess", 60);
      JY.addLog(`♟ 破局成功【${pz.name}】！${opt.explain}`, "rew");
      JY.applyEffect(pz.reward);
      JY.addChronicle(`破解珍珑古谱「${pz.name}」`);
    } else {
      JY.addLog(`♟ 落子有误：${opt.explain}（再细思片刻重新落子罢！）`, "warn");
    }
    JY.UI.renderAll();
  };

  // 音律 / 弈棋雅艺修习（直接提升技艺等级并得修为）
  JY.Systems.practiceArt = function (cat) {
    const P = JY.S.P;
    if (P.energy < 12) { JY.addLog("精力不足（需 12 点）。", "warn"); return; }
    P.energy -= 12;
    JY.advanceTime(1);
    if (JY.Audio) JY.Audio.play(cat === "music" ? "guqin" : "chess");
    const leveled = JY.gainLifeExp(cat, 45);
    if (!leveled) {
      JY.addLog(`你静心演练${cat === "music" ? "七弦古琴" : "珍珑棋谱"}，心境澄明，修为 +25。`, "sys");
    }
    P.exp += 25;
    JY.UI.renderAll();
  };

  // 使用物品（药品 / 名菜战前Buff / 藏宝图）
  JY.Systems.useItem = function (itemId) {
    const P = JY.S.P, it = JY.ITEMS[itemId], st = JY.getStats(P);
    if (!it || !(P.inv[itemId] > 0)) return;
    if (itemId === "treasure_map") {
      P.inv[itemId]--;
      const pool = JY.EVENTS.filter(e => e.kind === "treasure");
      const pick = JY.pick(pool);
      P.treasureTarget = pick;
      JY.addLog(`🗺 你展开藏宝图仔细辨认：${pick.clue}（前往该房间点击「搜查」即可掘宝！）`, "rew");
      JY.UI.renderAll();
      return;
    }
    if (it.buff) {
      P.inv[itemId]--;
      P.foodBuff = Object.assign({ name: it.name }, it.buff);
      JY.addLog(`🍲 你大快朵颐「${it.name}」，接下来 ${it.buff.battles} 场战斗状态大增！`, "rew");
      JY.UI.renderAll();
      return;
    }
    if (it.heal) {
      if (P.hp >= st.maxHp) {
        JY.addLog("你当前气血充沛，无需服用伤药。", "warn");
        return;
      }
      P.inv[itemId]--;
      P.hp = Math.min(st.maxHp, P.hp + it.heal);
      JY.addLog(`服下「${it.name}」，气血恢复至 ${P.hp}/${st.maxHp}。`, "sys");
      JY.UI.renderAll();
    }
  };

  // 商店 / 夜间黑市购买
  JY.Systems.buyItem = function (itemId, isBlackMarket) {
    const P = JY.S.P, it = JY.ITEMS[itemId];
    if (!it) return;
    const disc = (isBlackMarket && P.origin === "langzi") ? 0.85 : 1;
    const price = Math.round(it.price * disc);
    if (P.gold < price) { JY.addLog(`银两不足（需 ${price} 两）。`, "warn"); return; }
    P.gold -= price;
    P.inv[itemId] = (P.inv[itemId] || 0) + 1;
    JY.addLog(`购得「${it.name}」×1（花费 ${price} 两）。`, "sys");
    JY.UI.renderAll();
  };

  // 悬赏接取与击杀自动交付
  function bountyIsHere(bounty) {
    const { region, room } = JY.S;
    return (!bounty.region || bounty.region === region) && (!bounty.room || bounty.room === room);
  }

  JY.Systems.localBountyEncounters = function () {
    return JY.EVENTS.filter(b => b.kind === "bounty" && (b.rare || b.encounter) &&
      JY.S.P.bounties.includes(b.id) && bountyIsHere(b)
    );
  };

  JY.Systems.challengeBounty = function (bid) {
    if (JY.Combat.active || JY.Story.active) return;
    const bounty = JY.Systems.localBountyEncounters().find(b => b.id === bid);
    if (bounty) JY.Combat.start(bounty.targetEnemy);
  };

  JY.Systems.acceptBounty = function (bid) {
    const P = JY.S.P;
    if (P.bounties.includes(bid)) return;
    const b = JY.EVENTS.find(e => e.kind === "bounty" && e.id === bid);
    if (!b) return;
    if (P.bounties.length >= 3) { JY.addLog("同时至多接取 3 道悬赏令。", "warn"); return; }
    P.bounties.push(bid);
    JY.addLog(`📜 已揭榜【${b.title}】：${b.desc}`, "sys");
    JY.UI.renderAll();
  };

  JY.Systems.checkBountyKill = function (enemyId) {
    const P = JY.S.P;
    const done = [];
    P.bounties.forEach(bid => {
      const b = JY.EVENTS.find(e => e.id === bid);
      if (b && b.targetEnemy === enemyId && bountyIsHere(b)) {
        done.push(bid);
        P.bountyDone[bid] = (P.bountyDone[bid] || 0) + 1;
        JY.addLog(`✦✦ 悬赏达成【${b.title}】！赏格自动发放！`, "rew");
        JY.applyEffect(b.reward);
      }
    });
    if (done.length) P.bounties = P.bounties.filter(x => !done.includes(x));
  };

  // NPC 拜师、请教武功（全条件双重校验）、招募同道与赠礼
  JY.Systems.canLearnSpec = function (t, npc) {
    const P = JY.S.P;
    const maxSkLv = Math.max(1, ...Object.values(P.learned || {}).map(x => x.lv || 1));
    if (t.reqFlag && !P.flags[t.reqFlag]) return { ok: false, reason: "需先完成前置剧情" };
    if (t.reqSect && P.sect !== t.reqSect) return { ok: false, reason: `需拜入${JY.SECTS[t.reqSect] ? JY.SECTS[t.reqSect].name : t.reqSect}` };
    if (t.reqAff && (P.aff[npc && npc.mateId] || 0) < t.reqAff) return { ok: false, reason: `需好感≥${t.reqAff}` };
    if (t.reqLv && maxSkLv < t.reqLv) return { ok: false, reason: `需任一武功Lv${t.reqLv}` };
    if (P.gold < (t.gold || 0)) return { ok: false, reason: `需${t.gold}两` };
    return { ok: true, reason: "" };
  };

  JY.Systems.learnFromNpc = function (sid, gold, npcId) {
    const P = JY.S.P, sk = JY.SKILLS[sid];
    if (!sk || P.learned[sid]) return;
    const rm = JY.World && JY.World.curRoom && JY.World.curRoom();
    const npc = rm && (rm.npcs || []).find(n => (npcId ? n.id === npcId : (n.teach || []).some(t => t.id === sid)));
    const spec = npc && (npc.teach || []).find(t => t.id === sid);
    if (spec) {
      const chk = JY.Systems.canLearnSpec(spec, npc);
      if (!chk.ok) { JY.addLog(`请教条件未满足：${chk.reason}。`, "warn"); return; }
      gold = spec.gold || 0;
    } else if (P.gold < (gold || 0)) {
      JY.addLog(`束脩不足（需 ${gold} 两）。`, "warn"); return;
    }
    P.gold -= (gold || 0);
    P.learned[sid] = { lv: 1 };
    if (JY.Audio) JY.Audio.play("fanfare");
    JY.addLog(`✦ 拜师请教成功，习得「${sk.name}」！`, "rew");
    JY.UI.renderAll();
  };

  JY.Systems.joinSect = function (sectKey) {
    const P = JY.S.P, sc = JY.SECTS[sectKey];
    if (!sc || P.sect === sectKey) return;
    if (P.sect) {
      const oldRank = JY.getSectRank(P);
      const oldName = JY.SECTS[P.sect].name;
      if (oldRank && oldRank.hasGuestToken) {
        JY.addLog(`✦ 你凭「${oldName}客卿玉牌」以客卿之礼无损转投「${sc.name}」，所习百家绝学尽数保留！`, "rew");
      } else {
        JY.addLog(`✦ 你拜别「${oldName}」转投「${sc.name}」（若先完成原门派第 3 幕可获客卿玉牌留名）。`, "sys");
      }
    } else {
      JY.addLog(`✦ 你正式拜入「${sc.name}」（${sc.style}）！`, "rew");
    }
    P.sect = sectKey;
    JY.addChronicle(`拜入「${sc.name}」山门`);
    JY.UI.renderAll();
  };

  // 领取每日师门俸禄与修炼丹药（随门派位阶提升！）
  JY.Systems.claimSectStipend = function () {
    const P = JY.S.P, rank = JY.getSectRank(P);
    if (!rank) return;
    if (P.sectClaimDay === JY.S.day) {
      JY.addLog("今日师门俸禄已领取，明日再来。", "dim");
      return;
    }
    P.sectClaimDay = JY.S.day;
    const gold = 50 + rank.tier * 45;
    const exp = 60 + rank.tier * 65;
    const bonusItem = rank.tier >= 2 ? "dan_chongmai" : "jinchuang";
    JY.addLog(`🏯 领取「${JY.SECTS[P.sect].name} · ${rank.title}」第 ${JY.S.day} 日师门俸禄！`, "rew");
    JY.applyEffect({ gold, exp, item: bonusItem });
    JY.UI.renderAll();
  };

  JY.Systems.recruitMate = function (mid) {
    const P = JY.S.P, m = JY.MATES.find(x => x.id === mid);
    if (!m || P.mates.includes(mid)) return;
    if (m.moralMin !== undefined && P.morality < m.moralMin) { JY.addLog(`${m.name}觉你立场不合（需道德 ≥ ${m.moralMin}），婉拒同行。`, "warn"); return; }
    if (m.moralMax !== undefined && P.morality > m.moralMax) { JY.addLog(`${m.name}嫌你太过正经（需道德 ≤ ${m.moralMax}），不愿与你为伍。`, "warn"); return; }
    P.mates.push(mid);
    P.mate = mid;
    P.aff[mid] = Math.max(P.aff[mid] || 0, 25);
    JY.addLog(`✦ 「${m.name}」应允与你并肩闯荡江湖！（好感 25）`, "rew");
    JY.addChronicle(`与「${m.name}」结伴同行`);
    JY.UI.renderAll();
  };

  JY.Systems.giftMate = function (mid, itemId) {
    const P = JY.S.P, m = JY.MATES.find(x => x.id === mid), it = JY.ITEMS[itemId];
    if (!m || !it || !(P.inv[itemId] > 0)) return;
    P.inv[itemId]--;
    const base = it.gift || 10;
    const bonus = (m.favGift === itemId) ? Math.round(base * 1.5) : base;
    JY.applyEffect({ aff: { [mid]: bonus } });
    if (m.favGift === itemId) JY.addLog(`♥ ${m.name}见是你亲备的「${it.name}」，满心欢喜！（挚爱加成！）`, "talk");
    JY.UI.renderAll();
  };

  // ---------- 终局耐玩度 1：少室藏经阁 · 百层宗师无尽试炼塔 ----------
  const TOWER_ROSTER = [
    "bandit_boss", "rare_brass_bell", "ouyang_ke", "feng_tiannan",
    "mei_chaofeng", "he_taichong", "ao_bai", "mongol_commander",
    "miao_renfeng_boss", "miejue_boss", "zuo_lengchan", "jiumozhi",
    "cheng_kun", "rare_peak_carver"
  ];
  const TOWER_GRANDMASTERS = ["jinlun_boss", "dongfang_boss", "wangcy_boss", "saodiseng_boss"];

  JY.Systems.getTowerPreview = function () {
    const P = JY.S.P;
    const floor = (P.towerFloor || 0) + 1;
    const isMilestone = floor % 5 === 0;
    const baseId = isMilestone
      ? TOWER_GRANDMASTERS[Math.floor(floor / 5 - 1) % TOWER_GRANDMASTERS.length]
      : TOWER_ROSTER[(floor - 1) % TOWER_ROSTER.length];
    const base = JY.ENEMIES[baseId] || JY.ENEMIES.wangcy_boss;
    const hp = Math.round((360 + floor * 255 + Math.pow(floor, 1.52) * 38) * (isMilestone ? 1.22 : 1));
    const atk = Math.round((27 + floor * 4.5) * (isMilestone ? 1.10 : 1));
    const def = Math.round(9 + floor * 2.3);
    const d = Math.min(10, Math.max(1, Math.ceil(floor / 2)));
    const exp = 110 + floor * 55 + (isMilestone ? 180 : 0);
    const gold = 75 + floor * 38 + (isMilestone ? 150 : 0);
    return {
      floor, isMilestone, baseId, base,
      name: `第${floor}层 · ${base.name}${isMilestone ? "·宗师法相" : "·武影"}`,
      hp, atk, def, d, exp, gold
    };
  };

  JY.Systems.startTowerTrial = function () {
    if (JY.Combat.active || JY.Story.active) return;
    const P = JY.S.P, prev = JY.Systems.getTowerPreview();
    const b = prev.base;
    const shieldMul = 0.8 + prev.floor * 0.14;
    const customFoe = {
      id: prev.baseId,
      name: prev.name,
      d: prev.d,
      boss: true,
      hp: prev.hp,
      maxHp: prev.hp,
      atk: prev.atk,
      def: prev.def,
      exp: prev.exp,
      gold: prev.gold,
      art: b.art,
      desc: `藏经阁百层武林幻境镇守（第 ${prev.floor} 层${prev.isMilestone ? " · 绝顶宗师关" : ""}）`,
      drop: [],
      intents: (b.intents || []).map(it => it.shield ? Object.assign({}, it, { shield: Math.round(it.shield * shieldMul) }) : Object.assign({}, it)),
      intentIdx: 0,
      shield: 0,
      st: { break: 0, chill: 0, poison: 0, bleed: 0, stun: 0 }
    };
    if (JY.UI && JY.UI.closeModal) JY.UI.closeModal();
    JY.Combat.start(prev.baseId, {
      isTower: true,
      customFoe,
      onWin: () => {
        P.towerFloor = prev.floor;
        const st = JY.getStats(P);
        P.hp = Math.min(st.maxHp, P.hp + Math.round(st.maxHp * 0.35));
        JY.addLog(`🏯 闯关告捷！成功踏破【藏经阁试炼塔 · 第 ${prev.floor} 层】（恢复 35% 气血）！`, "rew");
        JY.applyEffect({ exp: prev.exp, gold: prev.gold, item: "ore_iron" });
        if (prev.floor % 3 === 0) JY.applyEffect({ item: prev.floor % 6 === 0 ? "ore_xuantie" : "dan_chongmai" });
        if (prev.isMilestone) {
          JY.applyEffect({ item: "dan_jiuzhuan" });
          // 每 5 层必出 4 词条传世神装（供终局极限刷词条！）
          const slots = ["weapon", "armor", "trinket", "boots"];
          const sl = slots[Math.floor(prev.floor / 5 - 1) % slots.length];
          const pool = JY.AFFIXES.slice(), chosen = [];
          for (let i = 0; i < 4 && pool.length; i++) chosen.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
          const names = { weapon: "传世神兵", armor: "传世宝甲", trinket: "传世玉髓", boots: "传世云履" };
          const bonusScale = Math.min(24, prev.floor);
          const g = {
            id: "tower_" + prev.floor + "_" + Date.now(),
            name: `藏经·${chosen[0].name}${names[sl]}`,
            slot: sl,
            rarity: 4,
            enh: 0,
            atk: sl === "weapon" ? 44 + bonusScale : (sl === "trinket" ? 18 + Math.floor(bonusScale / 2) : 0),
            def: sl === "armor" ? 32 + bonusScale : (sl === "trinket" ? 14 + Math.floor(bonusScale / 2) : 0),
            hp:  sl === "armor" ? 210 + bonusScale * 5 : (sl === "trinket" ? 130 + bonusScale * 3 : 0),
            dodge: sl === "boots" ? 0.11 : 0,
            affixes: chosen,
            desc: `试炼第${prev.floor}层四词条绝品：${chosen.map(a => a.txt).join(" · ")}`
          };
          P.bagGear.push(g);
          JY.addLog(`✦✦✦ 宗师嘉奖！获赐四词条绝品「${g.name}」（${g.desc}）！`, "rew");
          JY.addChronicle(`踏破藏经阁试炼塔第 ${prev.floor} 层`);
        }
      }
    });
  };

  // ---------- 终局耐玩度 2：宗师轮回重修 · 二周目传承（New Game+） ----------
  JY.Systems.startNewGamePlus = function (keepSkillId, keepLegId) {
    if (!JY.S || !JY.S.P || !JY.S.P.flags.v3_ending) {
      JY.addLog("需先登顶华山之巅问鼎武林后，方可开启轮回传承。", "warn");
      return;
    }
    const oldS = JY.S, oldP = oldS.P;
    const ngCount = (oldP.ngPlus || 0) + 1;
    const slot = oldS.slot || 1;
    const ownedLegs = Object.keys(JY.LEGENDARY_GEAR).filter(id =>
      Object.values(oldP.gear).some(x => x && x.id === id) || oldP.bagGear.some(x => x && x.id === id)
    );
    const chosenLeg = (keepLegId && ownedLegs.includes(keepLegId)) ? keepLegId : (ownedLegs[0] || null);
    const learnedIds = Object.keys(oldP.learned || {});
    learnedIds.sort((a, b) => ((JY.SKILLS[b] && JY.SKILLS[b].rarity) || 0) - ((JY.SKILLS[a] && JY.SKILLS[a].rarity) || 0));
    const chosenSkill = (keepSkillId && oldP.learned[keepSkillId]) ? keepSkillId : (learnedIds[0] || null);

    const nextS = JY.freshState(oldP.name, oldP.origin, { str: 3, agi: 3, int: 3, con: 3, luck: 3 });
    nextS.slot = slot;
    const NP = nextS.P;
    NP.ngPlus = ngCount;
    NP.towerFloor = oldP.towerFloor || 0;
    NP.guestSects = Object.assign({}, oldP.guestSects || {});
    ["str", "agi", "int", "con", "luck"].forEach(k => { NP.attrs[k] += ngCount * 2; });
    Object.keys(NP.life).forEach(k => { NP.life[k] = Math.max(NP.life[k], Math.ceil((oldP.life[k] || 1) / 2)); });
    NP.gold += 300 * ngCount;
    NP.exp += 500 * ngCount;
    if (chosenSkill && JY.SKILLS[chosenSkill]) {
      NP.learned[chosenSkill] = { lv: 3 };
      const sk = JY.SKILLS[chosenSkill];
      if (sk.type === 0 && !NP.equipped.outer.includes(chosenSkill)) {
        if (NP.equipped.outer.length >= 4) NP.equipped.outer.pop();
        NP.equipped.outer.unshift(chosenSkill);
      } else if (sk.type === 1) NP.equipped.inner = chosenSkill;
      else if (sk.type === 2) NP.equipped.light = chosenSkill;
    }
    if (chosenLeg && JY.LEGENDARY_GEAR[chosenLeg]) {
      NP.bagGear.push(Object.assign({}, JY.LEGENDARY_GEAR[chosenLeg]));
    }
    NP.hp = JY.getStats(NP).maxHp;
    NP.chronicle = [`☯ 开启第 ${ngCount + 1} 周目轮回重修（全根骨先天 +${ngCount * 2}${chosenSkill ? ` · 传承绝学「${JY.SKILLS[chosenSkill].name}」` : ""}${chosenLeg ? ` · 携神兵「${JY.LEGENDARY_GEAR[chosenLeg].name}」` : ""}）！`];

    JY.S = nextS;
    JY.saveSlot(slot);
    if (JY.Audio) JY.Audio.play("fanfare");
    if (JY.UI) {
      JY.UI.closeModal();
      JY.UI.bootGame(false);
      JY.addLog(`☯ 宗师轮回开启！欢迎踏入第 ${ngCount + 1} 周目江湖，全属性先天提升，山河风云再起！`, "rew");
      if (JY.UI.toast) JY.UI.toast(`已开启第 ${ngCount + 1} 周目宗师传承！`, "rew");
      JY.UI.renderAll();
    }
  };
})(window);


/* ===== js/ui/hud.js ===== */
/* =====================================================================
   山河十四卷 v1.0 · UI 主控：青黛顶栏、青绿舆图、三态主舞台(探索/剧场/策略玉简战)
   ===================================================================== */
(function (root) {
  "use strict";
  const JY = root.JY;
  const $ = id => document.getElementById(id);

  JY.UI = JY.UI || {};
  JY.UI.stageMode = "explore"; // explore | story | combat

  JY.UI.setScreen = function (name) {
    document.querySelectorAll(".screen").forEach(el => el.classList.remove("active"));
    const target = $("screen-" + name);
    if (target) target.classList.add("active");
  };

  JY.UI.setStageMode = function (mode) {
    JY.UI.stageMode = mode;
    ["explore", "story", "combat"].forEach(m => {
      const el = $("pane-" + m);
      if (el) el.classList.toggle("active", m === mode);
    });
    const sg = $("screen-game");
    if (sg) sg.classList.toggle("in-lock", mode !== "explore");
  };

  JY.UI.appendLogLine = function (text, cls) {
    const box = $("explore-log");
    if (!box) return;
    const div = document.createElement("div");
    div.className = "log-line " + (cls || "nar");
    div.innerHTML = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  };

  JY.UI.renderAll = function () {
    if (!JY.S) return;
    if ((!JY.World.curRegion() || !JY.World.curRoom()) && JY.normalizeState) {
      JY.normalizeState(JY.S);
    }
    const night = JY.isNight();
    document.body.classList.toggle("time-night", night);
    const safeRun = (name, fn) => {
      try { fn(); } catch (err) {
        if (typeof console !== "undefined" && console.error) console.error("[SH14 render error]", name, err);
      }
    };
    safeRun("topbar", JY.UI.renderTopbar);
    safeRun("navRail", JY.UI.renderNavRail);
    safeRun("sceneHead", JY.UI.renderSceneHead);
    if (JY.UI.stageMode === "explore") safeRun("explore", JY.UI.renderExploreActions);
    else if (JY.UI.stageMode === "story") safeRun("story", JY.UI.renderTheater);
    else if (JY.UI.stageMode === "combat") safeRun("combat", JY.UI.renderCombat);
    if (JY.UI.refreshOpenModal) safeRun("modal", JY.UI.refreshOpenModal);
  };

  let toastTimer = null;
  JY.UI.toast = function (text, cls) {
    const el = $("jy-toast");
    if (!el) return;
    el.textContent = String(text || "").replace(/<[^>]+>/g, "");
    el.className = "jy-toast show " + (cls || "");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.classList.remove("show"); }, 2300);
  };

  JY.UI.openLightbox = function (src, caption) {
    const mask = $("lightbox-mask"), img = $("lightbox-img"), cap = $("lightbox-cap");
    if (!mask || !img || !src) return;
    img.src = src;
    if (cap) cap.textContent = (caption ? `${caption} · ` : "") + "点击任意处或按 Esc 关闭";
    mask.classList.add("show");
  };

  JY.UI.closeLightbox = function () {
    const mask = $("lightbox-mask");
    if (mask) mask.classList.remove("show");
  };

  JY.UI.renderTopbar = function () {
    const S = JY.S, P = S.P, sc = JY.SHICHEN[S.timeIdx % 12];
    const night = sc.period === "night";
    const sRank = JY.getSectRank(P);
    const sectNm = P.sect ? `${JY.SECTS[P.sect].name}·${sRank ? sRank.title : "弟子"}` : "江湖散修";
    const ngBadge = P.ngPlus > 0 ? `<span class="tag gold">☯ ${P.ngPlus + 1}周目</span>` : "";
    $("top-hero").innerHTML = `<span>${JY.esc(P.name)}</span>${ngBadge}<span class="tag ${P.sect ? "red" : "jade"}" style="cursor:pointer;" onclick="JY.UI.openModal('martial','sect')">${sectNm}</span>`;
    const clk = $("top-clock");
    clk.className = "clock-pill" + (night ? " night" : "");
    clk.innerHTML = `${night ? "🌙" : "☀"} 第${S.day}日 · ${sc.name}(${sc.label})`;
    clk.title = sc.desc;
    $("top-res").innerHTML = `<span>银两 <b>${P.gold}</b></span><span>修为 <b>${P.exp}</b></span><span>精力 <b>${P.energy}/${P.maxEnergy}</b></span>`;
    const ab = $("top-audio-btn");
    if (ab && JY.Audio) ab.textContent = JY.Audio.label();
  };

  // 左栏：区域子房间可视化 SVG 地图 + 精简状态 + 任务追踪
  JY.UI.renderNavRail = function () {
    const S = JY.S, P = S.P, st = JY.getStats(P);
    const reg = JY.World.curRegion(), meta = JY.REGIONS_META[S.region];
    const curRoom = JY.World.curRoom();
    $("nav-region-name").textContent = meta ? meta.name : S.region;

    // 绘制子房间节点连通 SVG（自动缩放居中）
    const roomIds = Object.keys(reg.rooms);
    const xs = roomIds.map(id => reg.rooms[id].x), ys = roomIds.map(id => reg.rooms[id].y);
    const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
    const spanX = Math.max(1, maxX - minX), spanY = Math.max(1, maxY - minY);
    const pos = {};
    roomIds.forEach(id => {
      const r = reg.rooms[id];
      pos[id] = {
        px: spanX === 0 ? 120 : 42 + ((r.x - minX) / spanX) * 166,
        py: spanY === 0 ? 96  : 34 + ((r.y - minY) / spanY) * 128
      };
    });

    const lines = [], seen = new Set();
    roomIds.forEach(a => {
      (reg.rooms[a].exits || []).forEach(b => {
        if (!pos[b]) return;
        const key = a < b ? a + "|" + b : b + "|" + a;
        if (seen.has(key)) return; seen.add(key);
        const adj = (a === S.room || b === S.room);
        lines.push(`<line x1="${pos[a].px}" y1="${pos[a].py}" x2="${pos[b].px}" y2="${pos[b].py}" stroke="${adj ? "#226b61" : "#9dbab0"}" stroke-width="${adj ? 2.2 : 1.4}" stroke-dasharray="${adj ? "" : "3 3"}"/>`);
      });
    });

    const nodes = roomIds.map(id => {
      const r = reg.rooms[id], p = pos[id];
      const isCur = id === S.room;
      const isAdj = curRoom.exits.includes(id);
      const hasQuest = JY.Story.findAvailableEpisode(null, id) ||
        (r.npcs || []).some(n => JY.Story.findAvailableEpisode(n.id, id));
      const fill = isCur ? "#226b61" : isAdj ? "#fafdfa" : "#e3ede7";
      const stroke = isCur ? "#173638" : isAdj ? "#b58a3a" : "#9cb8ae";
      const tc = isCur ? "#fff" : "#1a292a";
      const shortNm = r.name.length > 5 ? r.name.slice(0, 4) + "…" : r.name;
      const badge = hasQuest ? "!" : (r.enemies && r.enemies.length ? "⚔" : r.nightMarket ? "夜" : r.inn ? "宿" : "");
      return `<g class="rm-node" onclick="JY.World.walkToRoom('${id}')">
        <title>${r.name}${isCur ? "（当前）" : "（点击自动循路前往）"}</title>
        <rect x="${p.px - 34}" y="${p.py - 14}" width="68" height="28" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="${isCur ? 2 : 1.2}"/>
        <text x="${p.px}" y="${p.py + 4}" text-anchor="middle" font-size="10.5" font-weight="${isCur ? 700 : 400}" fill="${tc}">${shortNm}</text>
        ${badge ? `<circle cx="${p.px + 30}" cy="${p.py - 12}" r="7.5" fill="${hasQuest ? "#b24035" : "#2c5e74"}"/><text x="${p.px + 30}" y="${p.py - 8.5}" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">${badge}</text>` : ""}
      </g>`;
    });
    $("room-map-svg").innerHTML = lines.join("") + nodes.join("");

    // 侠客精简状态卡
    const hpPct = JY.clamp(Math.round(P.hp / st.maxHp * 100), 0, 100);
    const enPct = JY.clamp(Math.round(P.energy / P.maxEnergy * 100), 0, 100);
    const mateObj = P.mate ? JY.MATES.find(x => x.id === P.mate) : null;
    $("nav-hero-card").innerHTML = `
      <div class="hero-mini">
        <div class="av"><img src="${JY.assetUrl("assets/hero-portrait.webp")}" alt="主角"></div>
        <div class="info">
          <div class="kv"><span>气血</span><b>${Math.round(P.hp)}/${st.maxHp}</b></div>
          <div class="bar hp"><div class="fill" style="width:${hpPct}%"></div></div>
          <div class="kv"><span>精力</span><b>${P.energy}/${P.maxEnergy}</b></div>
          <div class="bar en"><div class="fill" style="width:${enPct}%"></div></div>
          <div class="kv"><span>攻${st.atk} 防${st.def}</span><span>${JY.moralityRank(P.morality)}</span></div>
        </div>
      </div>
      ${P.foodBuff ? `<div style="margin-top:4px;"><span class="tag gold">🍲 ${P.foodBuff.name}（余${P.foodBuff.battles}战）</span></div>` : ""}
      ${P.songBuff ? `<div style="margin-top:4px;"><span class="tag purple">🎵 ${P.songBuff.name}（余${P.songBuff.battles}战）</span></div>` : ""}
      ${mateObj ? `<div class="mate-mini-row">
        <img src="${JY.assetUrl(mateObj.art)}" alt="${mateObj.name}">
        <div style="flex:1;min-width:0;">
          <div class="kv"><span>随行：<b>${mateObj.name}</b></span><span class="tag red">♥${P.aff[mateObj.id] || 0}</span></div>
          <div style="font-size:11px;color:var(--ink-faint);">合击：${mateObj.comboName}</div>
        </div>
      </div>` : `<div class="kv" style="margin-top:5px;padding-top:5px;border-top:1px dashed var(--line);"><span>随行同道</span><span class="tag">暂无</span></div>`}
    `;

    // 当前长线任务追踪指引（优先显示本区可触发 -> 进行中长线 -> 可开启主线）
    let localHit = null, inProgHit = null, anyHit = null, localCount = 0;
    for (const q of Object.values(JY.QUESTS)) {
      const doneN = q.episodes.filter(e => P.flags[e.id + "_played"]).length;
      const nextEp = q.episodes.find(JY.Story.meetsRequirements);
      if (!nextEp) continue;
      const isLocal = nextEp.trigger && nextEp.trigger.region === S.region;
      if (isLocal) {
        localCount++;
        if (!localHit) localHit = { q, ep: nextEp };
      }
      if (doneN > 0 && !inProgHit) inProgHit = { q, ep: nextEp };
      if (!anyHit) anyHit = { q, ep: nextEp };
    }
    const picked = localHit || inProgHit || anyHit;
    let pinHtml = "四处游历探索，与茶楼百晓生或各地侠士对话开启长篇剧情。";
    if (picked) {
      const badge = localHit ? `<span class="tag red">本区可启${localCount > 1 ? `(${localCount})` : ""}</span> ` : (inProgHit ? `<span class="tag purple">进行中</span> ` : "");
      const tr = picked.ep.trigger || {};
      const goBtn = tr.region
        ? `<div style="margin-top:6px;"><button class="btn-sm btn-jade" onclick="JY.World.guideNavigate('${tr.region}','${tr.room || ""}','${tr.npc || ""}')">🧭 循路前往此幕</button></div>`
        : "";
      pinHtml = `${badge}<b>${picked.q.title}</b><br>${picked.ep.title}：${picked.ep.hint}${goBtn}`;
    }
    if (P.treasureTarget) {
      pinHtml += `<br><span style="color:var(--gold);">🗺 藏宝线索：${P.treasureTarget.clue}</span>`;
    }
    $("nav-quest-pin").innerHTML = pinHtml;
  };

  // 中栏顶部：场景画卷 + 本房间活人 NPC 头像条
  JY.UI.renderSceneHead = function () {
    const S = JY.S, meta = JY.REGIONS_META[S.region], rm = JY.World.curRoom();
    const night = JY.isNight();
    $("scene-img").src = JY.assetUrl(rm.art || meta.art);
    $("scene-region").textContent = `${meta.name} · 难度 ${meta.d} · ${night ? "夜色深沉" : "白昼"}`;
    $("scene-room").textContent = rm.name;
    $("scene-desc").textContent = (night && rm.nightDesc) ? rm.nightDesc : rm.desc;

    // 渲染本房间 NPC 头像互动条
    const strip = $("npc-strip");
    const npcs = rm.npcs || [];
    if (!npcs.length) {
      strip.innerHTML = `<span class="npc-strip-label">此处此刻静悄悄，暂无人影驻足。</span>`;
    } else {
      strip.innerHTML = `<span class="npc-strip-label">在场人物（点击交谈）：</span>` + npcs.map(n => {
        const hasQ = !!JY.Story.findAvailableEpisode(n.id);
        return `<button class="npc-chip lockable" onclick="JY.UI.openNpcModal('${n.id}')">
          <img src="${JY.assetUrl(n.art)}" alt="${n.name}">
          <span><b>${n.name}</b> · ${n.role}</span>
          ${hasQ ? `<span class="q-dot" title="有可触发剧情！"></span>` : ""}
        </button>`;
      }).join("");
    }
  };

  // 探索态底部房间专属动作条 + 顶部「山河主线罗盘条」
  JY.UI.renderExploreActions = function () {
    const S = JY.S, P = S.P, reg = JY.World.curRegion(), rm = JY.World.curRoom(), night = JY.isNight();
    const gBar = $("main-guide-bar");
    if (gBar && JY.World.getMainlineState) {
      const ml = JY.World.getMainlineState();
      const cur = ml.current, t = cur.target || {};
      const actCall = t.modal
        ? `JY.UI.openModal('${t.modal[0]}','${t.modal[1] || ""}')`
        : `JY.World.guideNavigate('${t.region || ""}','${t.room || ""}','${t.npc || ""}')`;
      const hereAlready = !t.modal && t.region === S.region && (!t.room || t.room === S.room);
      const actLabel = hereAlready && t.npc ? `💬 立即交谈` : `▶ ${t.label || "循路前往"}`;
      gBar.innerHTML = `
        <div class="mg-text">
          <span class="tag gold">🧭 主线 · ${cur.num} (${ml.doneCount}/${ml.total})</span>
          <b style="color:var(--accent-deep);margin:0 4px;">${cur.name}</b>
          <span style="color:var(--ink-soft);">${cur.desc}</span>
        </div>
        <div class="mg-acts">
          <button class="btn-sm btn-primary" onclick="${actCall}">${actLabel}</button>
          <button class="btn-sm" onclick="JY.UI.openModal('quest','mainline')">📖 主线脉络</button>
        </div>
      `;
    }
    const box = $("room-actions-dock");
    const moveBtns = (rm.exits || []).map(rid => `<button onclick="JY.World.moveRoom('${rid}')">→ ${reg.rooms[rid].name}</button>`);
    if (rm.travelOut) moveBtns.push(`<button class="btn-gold" onclick="JY.UI.openModal('world')">🗺 离开本区（世界大舆图）</button>`);

    const interBtns = [];
    JY.Story.findAvailableEpisodes().forEach(({ quest, ep }) => {
      interBtns.push(`<button class="btn-primary" onclick="JY.Story.openEpisode('${quest.id}','${ep.id}')">📜 ${ep.title}</button>`);
    });
    const hasTreasureHere = P.treasureTarget && P.treasureTarget.region === S.region && P.treasureTarget.room === S.room;
    interBtns.push(`<button onclick="JY.World.searchRoom()">${hasTreasureHere ? "🗺 挖掘藏宝图秘藏！" : "🔍 搜查四周"}</button>`);
    if (rm.gather) interBtns.push(`<button class="btn-jade" onclick="JY.World.gatherRoom()">🌿 采药 / 挖矿（-10精力）</button>`);
    if (rm.shop) interBtns.push(`<button onclick="JY.UI.openShopModal(false)">🏪 逛商铺</button>`);
    if (rm.nightMarket) {
      interBtns.push(night
        ? `<button class="btn-primary" onclick="JY.UI.openShopModal(true)">🏮 踏入夜间黑市</button>`
        : `<button disabled title="需戌时至丑时入夜后开放">🏮 黑市（入夜后开张）</button>`);
    }
    if (rm.bounty) interBtns.push(`<button onclick="JY.UI.openModal('quest','bounty')">📜 查看江湖悬赏榜</button>`);
    if (rm.forge) interBtns.push(`<button onclick="JY.UI.openModal('life','forge')">⚒ 神兵与词条锻造</button>`);
    if (rm.alchemy) interBtns.push(`<button onclick="JY.UI.openModal('life','alchemy')">🔥 丹炉炼丹</button>`);
    if (rm.kitchen) interBtns.push(`<button onclick="JY.UI.openModal('life','cook')">🍲 后厨烹饪名菜</button>`);

    const combatBtns = [];
    (rm.enemies || []).forEach(eid => {
      const en = JY.ENEMIES[eid];
      if (en) combatBtns.push(`<button class="btn-primary" onclick="JY.Combat.start('${eid}')">⚔ 迎战 ${en.name}${en.boss ? "(头目)" : ""}</button>`);
    });
    JY.Systems.localBountyEncounters().forEach(b => {
      combatBtns.push(`<button class="btn-primary" onclick="JY.Systems.challengeBounty('${b.id}')">⚔ ${b.rare ? "悬赏挑战" : "悬赏追缉"} · ${JY.ENEMIES[b.targetEnemy].name}</button>`);
    });
    if (rm.idle || S.idle) {
      combatBtns.push(`<button onclick="JY.World.toggleIdle()">${S.idle ? `✓ 收工结算（${S.idle.name}）` : `◇ 轻挂机：${rm.idle.name}`}</button>`);
    }
    if (rm.inn) {
      combatBtns.push(`<button onclick="JY.World.restAtInn(true)">🌙 投宿至入夜（15两）</button>`);
      combatBtns.push(`<button onclick="JY.World.restAtInn(false)">☀ 歇息至天明（15两）</button>`);
    }
    combatBtns.push(`<button onclick="JY.World.meditate()">🧘 打坐调息（+气血精力/推进1时辰）</button>`);

    box.innerHTML = `
      <div class="act-sec"><span class="sec-lbl">房间移步</span>${moveBtns.join("")}</div>
      <div class="act-sec"><span class="sec-lbl">场景交互</span>${interBtns.join("")}</div>
      <div class="act-sec"><span class="sec-lbl">历练休整</span>${combatBtns.join("")}</div>
    `;
  };

  // 立绘剧情剧场渲染
  JY.UI.renderTheater = function () {
    const st = JY.Story.active;
    if (!st) return;
    const L = $("th-left"), R = $("th-right");
    L.className = "th-actor" + (!st.leftArt ? " hidden" : st.activeSide === "left" ? " speaking" : "");
    R.className = "th-actor" + (!st.rightArt ? " hidden" : st.activeSide === "right" ? " speaking" : "");
    if (st.leftArt) $("th-left-img").src = JY.assetUrl(st.leftArt);
    if (st.rightArt) $("th-right-img").src = JY.assetUrl(st.rightArt);

    const sp = $("th-speaker");
    sp.textContent = st.speaker;
    sp.className = "th-speaker" + (st.speaker === "旁白" ? " nar" : "");
    $("th-ep-title").textContent = `${st.quest.title} · ${st.ep.title}`;
    $("th-text").textContent = st.text;

    const chBox = $("th-choices");
    if (st.choices && st.choices.length) {
      chBox.innerHTML = st.choices.map((c, i) => {
        const ok = JY.Story.choiceEnabled(c);
        const spCls = (c.reqMate || c.reqAnyMate || c.reqLife) ? " special" : "";
        return `<button class="th-choice-btn${spCls}" ${ok ? "" : "disabled"} onclick="JY.Story.choose(${i})">
          <span>${JY.esc(c.text)}</span>
          <span class="tag ${ok ? "gold" : ""}">${ok ? "选择" : "条件未足"}</span>
        </button>`;
      }).join("");
    } else {
      chBox.innerHTML = `<button class="btn-primary" style="align-self:flex-end;" onclick="JY.Story.step()">继续 ▸</button>`;
    }
  };

  // 策略回合战斗舞台渲染
  JY.UI.renderCombat = function () {
    const c = JY.Combat.active, P = JY.S.P, st = JY.getStats(P);
    if (!c) return;
    const foe = c.foe, intent = JY.Combat.curIntent();
    const myHpPct = JY.clamp(Math.round(P.hp / st.maxHp * 100), 0, 100);
    const foeHpPct = JY.clamp(Math.round(foe.hp / foe.maxHp * 100), 0, 100);

    const renderBuffs = (obj, shield) => {
      const tags = [];
      if (shield > 0) tags.push(`<span class="tag blue">护体 ${shield}</span>`);
      Object.keys(obj).forEach(k => {
        if (obj[k] > 0 && JY.STATUS_META[k]) tags.push(`<span class="tag ${JY.STATUS_META[k].cls}">${JY.STATUS_META[k].name}×${obj[k]}</span>`);
      });
      return tags.join("") || `<span class="tag">无异常</span>`;
    };

    $("cb-turn").textContent = `第 ${c.turn} 回合`;
    $("cb-auto-btn").textContent = c.auto ? "⏸ 停止自动" : "▶ 自动策略";
    $("cb-fast-btn").textContent = c.fast ? "⚡ 2×倍速：开" : "⚡ 2×倍速：关";

    const pops = c.pops ? c.pops.splice(0) : [];
    const shake = Object.assign({ hero: false, foe: false, arena: false }, c.shake || {});
    c.shake = { hero: false, foe: false, arena: false };
    const arenaEl = document.querySelector(".combat-arena");
    if (arenaEl) {
      arenaEl.classList.remove("arena-flash");
      if (shake.arena) { void arenaEl.offsetWidth; arenaEl.classList.add("arena-flash"); }
    }
    const renderPops = side => {
      const list = pops.filter(p => p.side === side);
      if (!list.length) return "";
      return `<div class="float-pop-layer">${list.map((p, idx) =>
        `<span class="float-pop ${p.cls}" style="top:${10 + idx * 20}px;">${JY.esc(p.text)}</span>`
      ).join("")}</div>`;
    };
    const mateStrip = c.mate ? `<div class="combat-mate-strip">
      <img src="${JY.assetUrl(c.mate.art)}" alt="${c.mate.name}">
      <div style="flex:1;min-width:0;">
        <div class="kv"><span>助阵：<b>${c.mate.name}</b></span><span>同心 ${c.synergy}%</span></div>
        <div class="bar sy"><div class="fill" style="width:${c.synergy}%"></div></div>
      </div>
    </div>` : "";

    $("cb-fighters").innerHTML = `
      <div class="fighter-card${shake.hero ? " hit-shake" : ""}">
        ${renderPops("hero")}
        <div class="fighter-pic"><img src="${JY.assetUrl("assets/hero-portrait.webp")}" alt="我方"></div>
        <div class="fighter-info">
          <div class="fighter-name"><span>${JY.esc(P.name)}</span><span class="tag blue">真气 ${c.mp}/${c.mpMax}</span></div>
          <div class="kv"><span>气血</span><b>${Math.max(0, Math.round(P.hp))}/${st.maxHp}</b></div>
          <div class="bar hp"><div class="fill" style="width:${myHpPct}%"></div></div>
          <div class="buff-row">${renderBuffs(c.st, c.shield)}</div>
          ${mateStrip}
        </div>
      </div>
      <div class="fighter-card foe${shake.foe ? " hit-shake" : ""}">
        ${renderPops("foe")}
        <div class="fighter-pic"><img src="${JY.assetUrl(foe.art)}" alt="${foe.name}"></div>
        <div class="fighter-info">
          <div class="fighter-name"><span style="color:var(--red);">${JY.esc(foe.name)}</span><span class="tag red">难度 ${foe.d}</span></div>
          <div class="kv"><span>气血</span><b>${Math.max(0, Math.round(foe.hp))}/${foe.maxHp}</b></div>
          <div class="bar hp"><div class="fill" style="width:${foeHpPct}%"></div></div>
          <div class="buff-row">${renderBuffs(foe.st, foe.shield)}</div>
        </div>
      </div>
    `;

    const ib = $("cb-intent");
    const dangerous = intent.type === "charge" || intent.type === "poison" || intent.type === "iron";
    ib.className = "intent-banner" + (dangerous ? "" : " safe");
    ib.innerHTML = `<span>🎯 敌方下回合意图：【${intent.name}】 — ${intent.hint}</span><span>每回合自动回真气 +${st.mpRegen}</span>`;

    // 战斗日志
    const cl = $("cb-log");
    cl.innerHTML = c.logs.map(l => `<div class="log-line">${l}</div>`).join("");
    cl.scrollTop = cl.scrollHeight;

    // 招式手牌（自动高亮破招克制与连携引爆！）
    const eq = [...P.equipped.outer, P.equipped.inner, P.equipped.light].filter(Boolean);
    $("cb-hand").innerHTML = eq.map(sid => {
      const sk = JY.SKILLS[sid], le = P.learned[sid];
      if (!sk || !le) return "";
      const cost = JY.Combat.skillCost(sk);
      const can = c.mp >= cost;
      const isCounter = !!(sk.counter && sk.counter === intent.type);
      const isCombo = !!(sk.fx && sk.fx.detonate && foe.st[sk.fx.detonate] > 0);
      const cls = isCombo ? " combo-ready" : isCounter ? " counter-ready" : "";
      const tip = isCombo ? "🔥可引爆连携！" : isCounter ? "✓克制敌意图！" : (sk.type === 0 ? `威力×${sk.pow}` : sk.type === 1 ? "内功护体/回气" : "轻功闪身");
      return `<button class="sk-card${cls}" ${can ? "" : "disabled"} onclick="JY.Combat.castSkill('${sid}')">
        <div class="sk-top"><span>${sk.name} <small>Lv${le.lv}</small></span><span class="tag ${can ? "blue" : ""}">${cost}真气</span></div>
        <div class="sk-sub">${tip}</div>
      </button>`;
    }).join("");

    // 底部辅助（调息防御、药品、同道合击、撤退）
    const medBtns = ["jinchuang", "dahuandan", "yulu"].filter(k => (P.inv[k] || 0) > 0)
      .map(k => `<button class="btn-sm" onclick="JY.Combat.useCombatItem('${k}')">💊 ${JY.ITEMS[k].name}×${P.inv[k]}</button>`).join("");
    const mateBtn = c.mate
      ? `<button class="${c.synergy >= 100 ? "btn-gold" : ""}" ${c.synergy >= 100 ? "" : "disabled"} onclick="JY.Combat.castMateCombo()">♥ ${c.mate.name}合击「${c.mate.comboName}」(${c.synergy}%)</button>`
      : "";
    $("cb-utils").innerHTML = `
      <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;">
        <button class="btn-jade" onclick="JY.Combat.defendAndBreathe()">🛡 调息防御（+3真气/护体）</button>
        ${mateBtn}
        ${medBtns}
      </div>
      <button class="btn-sm" onclick="JY.Combat.flee()">撤退</button>
    `;
  };
})(window);


/* ===== js/ui/modals.js ===== */
/* =====================================================================
   山河十四卷 v1.0 · 独立宋韵卷轴弹窗（武学试炼/神兵宝甲/行囊百艺/山河卷轴/同道红颜/大舆图）
   + NPC 交互弹窗 + 商铺黑市弹窗 + 存档码迁移 + 标题/建角启动器
   ===================================================================== */
(function (root) {
  "use strict";
  const JY = root.JY;
  const $ = id => document.getElementById(id);

  JY.UI = JY.UI || {};
  JY.UI.curModal = null; // { type, tab, extra }

  JY.UI.openModal = function (type, tab, extra) {
    if (JY.UI.stageMode !== "explore" && type !== "ending" && type !== "save_io") return;
    if (JY.Audio) JY.Audio.play("click");
    JY.UI.curModal = { type, tab: tab || null, extra: extra || null };
    $("main-modal-mask").classList.add("show");
    JY.UI.renderModalContent();
  };

  JY.UI.openSaveIoModal = function () {
    JY.UI.openModal("save_io");
  };

  JY.UI.closeModal = function () {
    JY.UI.curModal = null;
    $("main-modal-mask").classList.remove("show");
  };

  JY.UI.refreshOpenModal = function () {
    if (JY.UI.curModal) JY.UI.renderModalContent();
  };

  JY.UI.openNpcModal = function (npcId) {
    if (JY.UI.stageMode !== "explore") return;
    const rm = JY.World.curRoom();
    const npc = (rm.npcs || []).find(n => n.id === npcId);
    if (!npc) return;
    JY.UI.openModal("npc", null, npc);
  };

  JY.UI.openShopModal = function (isBlack) {
    if (JY.UI.stageMode !== "explore") return;
    JY.UI.openModal("shop", isBlack ? "black" : "normal");
  };

  JY.UI.showEndingModal = function () {
    JY.UI.openModal("ending");
  };

  JY.UI.renderModalContent = function () {
    const m = JY.UI.curModal;
    if (!m || (!JY.S && m.type !== "save_io")) return;
    const P = JY.S ? JY.S.P : null;
    const titleEl = $("modal-title"), tabsEl = $("modal-tabs"), bodyEl = $("modal-body");
    tabsEl.innerHTML = "";

    // 0. 存档码导入与导出面板（支持标题屏与游戏内随时跨端备份）
    if (m.type === "save_io") {
      titleEl.textContent = "📤 江湖存档码 · 跨端导出与导入备份";
      const meta = JY.readMeta();
      const exportRows = [1, 2, 3].map(i => {
        const mt = meta[i];
        const code = JY.exportSaveCode(i);
        return `<div class="info-card">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <b>存档栏位 ${i}${mt ? ` · ${JY.esc(mt.name)}` : "（空）"}</b>
            <span class="tag ${mt ? "jade" : ""}">${mt ? `第${mt.day}日` : "无存档"}</span>
          </div>
          ${code ? `<textarea readonly rows="2" style="width:100%;font-size:11px;padding:5px;border:1px solid var(--line);border-radius:4px;background:var(--paper-3);word-break:break-all;" onclick="this.select()">${code}</textarea>
          <button class="btn-sm btn-jade" onclick="navigator.clipboard&&navigator.clipboard.writeText(JY.exportSaveCode(${i}));JY.UI.toast('已复制存档 ${i} 备份码！','rew');">复制存档 ${i} 备份码</button>` : `<div style="font-size:12px;color:var(--ink-faint);">该栏位暂无可导出存档。</div>`}
        </div>`;
      }).join("");
      bodyEl.innerHTML = `
        <p style="margin-bottom:10px;color:var(--ink-soft);">网页版（GitHub Pages）与本地离线单文件版的浏览器存储相互独立，可通过下方「SH14:」存档码一键无损迁移备份（同时向下兼容旧版存档码）：</p>
        <div class="card-grid" style="margin-bottom:14px;">${exportRows}</div>
        <div class="info-card highlight">
          <b>📥 粘贴「SH14:」存档码导入覆盖至指定栏位</b>
          <textarea id="save-import-box" rows="3" placeholder="在此粘贴以 SH14: 开头的完整存档码..." style="width:100%;font-size:12px;padding:6px;border:1px solid var(--line);border-radius:5px;background:#fff;"></textarea>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px;">
            ${[1, 2, 3].map(i => `<button class="btn-sm btn-primary" onclick="JY.UI.doImportSave(${i})">导入至存档 ${i}</button>`).join("")}
          </div>
        </div>
      `;
      return;
    }

    const setTabs = (arr, defTab) => {
      if (!m.tab || !arr.some(x => x[0] === m.tab)) m.tab = defTab;
      tabsEl.innerHTML = arr.map(([k, lbl]) =>
        `<button class="${m.tab === k ? "active" : ""}" onclick="JY.UI.openModal('${m.type}','${k}')">${lbl}</button>`
      ).join("");
    };

    // 1. 武学、奇经八脉、师门位阶与藏经阁试炼塔
    if (m.type === "martial") {
      titleEl.textContent = "武学、经脉、师门与宗师试炼";
      setTabs([["skills", "武功修炼与出招"], ["meridians", "奇经八脉冲穴"], ["sect", "师门位阶与客卿"], ["tower", "🏯 宗师试炼塔"]], "skills");
      if (m.tab === "skills") {
        const eqSet = new Set([...P.equipped.outer, P.equipped.inner, P.equipped.light].filter(Boolean));
        const cards = Object.keys(P.learned).map(sid => {
          const sk = JY.SKILLS[sid], le = P.learned[sid];
          const isEq = eqSet.has(sid);
          const cost = Math.round((60 + le.lv * le.lv * 38) * (1 + sk.rarity * 0.28) * (P.origin === "shidi" ? 0.88 : 1));
          const typeNm = ["外功", "内功", "轻功"][sk.type];
          return `<div class="info-card${isEq ? " highlight" : ""}">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <b>${sk.name} <span class="tag">${typeNm}·Lv${le.lv}</span></b>
              ${isEq ? `<span class="tag red">出招中</span>` : ""}
            </div>
            <div style="font-size:12px;color:var(--ink-soft);">${sk.flavor}</div>
            <div style="font-size:11.5px;color:var(--ink-faint);">消耗 ${sk.cost} 真气${sk.counter ? ` · 克制【${sk.counter}】` : ""}${sk.fx && sk.fx.detonate ? ` · 🔥引爆${JY.STATUS_META[sk.fx.detonate].name}` : ""}</div>
            <div style="display:flex;gap:6px;margin-top:auto;">
              <button class="btn-sm ${isEq ? "" : "btn-jade"}" onclick="JY.Systems.toggleEquipSkill('${sid}')">${isEq ? "卸下" : "纳入出招"}</button>
              ${le.lv < 9 ? `<button class="btn-sm btn-primary" ${P.exp < cost ? "disabled" : ""} onclick="JY.Systems.upgradeSkill('${sid}')">修炼(${cost}修为)</button>` : `<span class="tag gold">已圆满</span>`}
            </div>
          </div>`;
        }).join("");
        bodyEl.innerHTML = `<p style="margin-bottom:10px;color:var(--ink-soft);">可同时配置 <b>4 门外功 + 1 门内功 + 1 门轻功</b> 组成连携流派（当前修为：<b>${P.exp}</b>）。</p><div class="card-grid">${cards}</div>`;
      } else if (m.tab === "meridians") {
        const cards = JY.MERIDIANS.map(mer => {
          const lv = P.meridians[mer.id] || 0;
          const next = mer.levels[lv];
          const pillCnt = next ? (P.inv[next.pill] || 0) : 0;
          return `<div class="info-card${lv >= 3 ? " done" : lv > 0 ? " highlight" : ""}">
            <div style="display:flex;justify-content:space-between;"><b>${mer.name}（${lv}/3）</b><span class="tag purple">${mer.role}</span></div>
            <div style="font-size:12px;color:var(--ink-soft);">${mer.desc}</div>
            ${mer.levels.map((l, i) => `<div style="font-size:12px;color:${i < lv ? "var(--jade)" : "var(--ink-faint)"};">${i < lv ? "✓" : "○"} ${l.acupoint}穴：${l.txt}</div>`).join("")}
            ${next ? `<button class="btn-sm btn-primary" style="margin-top:auto;" onclick="JY.Systems.unlockMeridian('${mer.id}')">冲开「${next.acupoint}穴」（${next.exp}修为 + ${JY.ITEMS[next.pill].name} [${pillCnt}]）</button>` : `<span class="tag jade" style="margin-top:auto;">已贯通圆满</span>`}
          </div>`;
        }).join("");
        bodyEl.innerHTML = `<p style="margin-bottom:10px;color:var(--ink-soft);">打通奇经八脉获得流派质变！冲脉丹可在药王堂购得或通过「技艺·炼丹」自制。</p><div class="card-grid">${cards}</div>`;
      } else if (m.tab === "sect") {
        const sRank = JY.getSectRank(P);
        const guestList = Object.keys(P.guestSects || {}).map(k => JY.SECTS[k] && JY.SECTS[k].name).filter(Boolean);
        const sectHeader = sRank ? `<div class="info-card highlight" style="margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
            <b>🏯 当前门派：${JY.SECTS[P.sect].name} · <span style="color:var(--red);">${sRank.title}</span></b>
            <div style="display:flex;gap:6px;align-items:center;">
              ${sRank.hasGuestToken ? `<span class="tag gold">★ 已获客卿玉牌（可无损转投他门）</span>` : `<span class="tag">通第 3 幕领客卿玉牌</span>`}
              <button class="btn-sm btn-primary" ${P.sectClaimDay === JY.S.day ? "disabled" : ""} onclick="JY.Systems.claimSectStipend()">${P.sectClaimDay === JY.S.day ? "今日俸禄已领" : "领取今日师门俸禄"}</button>
            </div>
          </div>
          <div style="font-size:12.5px;color:var(--ink-soft);">师门光环（第 ${sRank.tier + 1} 阶生效中）：${sRank.aura ? sRank.aura.desc : ""}</div>
          <div style="font-size:12px;color:var(--ink-faint);">晋升路径：外门弟子 → 内门精英（通第1幕或任一武功Lv4）→ 护法长老（通第2幕）→ 代掌门（通第3幕且任一武功Lv6）</div>
        </div>` : `<div class="info-card" style="margin-bottom:12px;">
          <b>🌿 当前身份：江湖散修（无门无派）</b>
          <div style="font-size:12.5px;color:var(--ink-soft);">散修可走完「无名残页血案 → 残页渡风」五幕专属长线，亦可随时拜访八大门派山门择一拜入。</div>
        </div>`;
        const allSects = Object.keys(JY.SECTS).map(k => {
          const sc = JY.SECTS[k], rm = JY.REGIONS_META[sc.loc];
          const isCur = P.sect === k, isGuest = !!(P.guestSects && P.guestSects[k]);
          return `<div class="info-card${isCur ? " highlight" : isGuest ? " done" : ""}">
            <div style="display:flex;justify-content:space-between;"><b>${sc.name}</b><span class="tag ${isCur ? "red" : isGuest ? "gold" : ""}">${isCur ? "当前师门" : isGuest ? "客卿" : (rm ? rm.name : "")}</span></div>
            <div style="font-size:12px;color:var(--ink-soft);">${sc.style} · ${sc.intro}</div>
            <div style="font-size:11.5px;color:var(--jade);">${JY.SECT_AURAS[k] ? JY.SECT_AURAS[k].desc : ""}</div>
          </div>`;
        }).join("");
        bodyEl.innerHTML = sectHeader + (guestList.length ? `<p style="margin-bottom:8px;color:var(--gold);">已持有客卿玉牌：<b>${guestList.join("、")}</b>（可无损拜入其他门派兼修百家绝学）</p>` : "") + `<div class="card-grid">${allSects}</div>`;
      } else if (m.tab === "tower") {
        const prev = JY.Systems.getTowerPreview();
        const intentsHtml = (prev.base.intents || []).map(it => `<span class="tag ${it.type === "charge" ? "red" : "blue"}">【${it.name}】${it.hint}</span>`).join(" ");
        const learnedOpts = Object.keys(P.learned || {}).map(sid => `<option value="${sid}">${JY.SKILLS[sid].name}（传承起手 Lv3）</option>`).join("");
        const ownedLegs = Object.keys(JY.LEGENDARY_GEAR).filter(id =>
          Object.values(P.gear).some(x => x && x.id === id) || P.bagGear.some(x => x && x.id === id)
        );
        const legOpts = ownedLegs.length
          ? ownedLegs.map(id => `<option value="${id}">${JY.LEGENDARY_GEAR[id].name}</option>`).join("")
          : `<option value="">（尚未收集神兵，直接传承根骨）</option>`;
        const ngCard = P.flags.v3_ending ? `<div class="info-card highlight" style="margin-top:14px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
            <b>☯ 宗师轮回重修 · 开启第 ${(P.ngPlus || 0) + 2} 周目传承</b>
            <span class="tag gold">已达成华山问鼎 · 解锁轮回</span>
          </div>
          <div style="font-size:12.5px;color:var(--ink-soft);">轮回重修将重置大世界主支线与十四天书（可体验另一条正邪阵营与华山论剑分支），同时<b>永久保留全部客卿玉牌、试炼塔层数纪录、半数生活技艺等级，且每周目全五维先天根骨永久 +2、初始修为 +500、银两 +300</b>，并可任选 <b>1 门已习武功（Lv3）+ 1 件已得原著神兵</b> 带入新周目！</div>
          <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:6px;">
            <label style="font-size:12.5px;">传承武功：<select id="ng-skill-sel" style="font-family:inherit;padding:4px 8px;border:1px solid var(--line);border-radius:4px;background:var(--paper-3);">${learnedOpts}</select></label>
            <label style="font-size:12.5px;">随身神兵：<select id="ng-leg-sel" style="font-family:inherit;padding:4px 8px;border:1px solid var(--line);border-radius:4px;background:var(--paper-3);">${legOpts}</select></label>
            <button class="btn-gold" onclick="JY.Systems.startNewGamePlus(document.getElementById('ng-skill-sel').value, document.getElementById('ng-leg-sel').value)">☯ 踏入第 ${(P.ngPlus || 0) + 2} 周目江湖</button>
          </div>
        </div>` : `<div class="info-card" style="margin-top:14px;">
          <b>☯ 宗师轮回重修（二周目传承）</b>
          <div style="font-size:12px;color:var(--ink-faint);">登顶「华山之巅」问鼎武林至尊后解锁：可携自选绝学、原著神兵与先天全五维根骨加成开启新周目！</div>
        </div>`;
        bodyEl.innerHTML = `
          <div class="info-card highlight">
            <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;">
              <img src="${JY.assetUrl(prev.base.art)}" style="width:118px;height:162px;object-fit:cover;object-position:center 14%;border-radius:7px;border:1px solid var(--line);" alt="${prev.base.name}">
              <div style="flex:1;min-width:230px;display:flex;flex-direction:column;gap:7px;">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
                  <b style="font-size:16px;color:var(--red);">🏯 少室藏经阁 · 武林幻境试炼塔（已通 ${P.towerFloor || 0} 层）</b>
                  <span class="tag ${prev.isMilestone ? "gold" : "purple"}">${prev.isMilestone ? "★ 绝顶宗师里程碑关" : `即将迎战：第 ${prev.floor} 层`}</span>
                </div>
                <div style="font-size:13.5px;">守关武影：<b>${prev.name}</b>（气血 ${prev.hp} · 攻 ${prev.atk} · 防 ${prev.def}）</div>
                <div style="display:flex;gap:5px;flex-wrap:wrap;">${intentsHtml}</div>
                <div style="font-size:12px;color:var(--gold);">通关赏格：修为 +${prev.exp} · 银两 +${prev.gold} · 百炼精铁×1${prev.floor % 3 === 0 ? " · 冲脉丹/天外寒铁" : ""}${prev.isMilestone ? " · <b>九转还魂丹×1 + 必掉四词条绝品传世装备！</b>" : "（每逢 5/10/15…层必掉四词条绝品传世神装！）"}</div>
                <div style="font-size:11.5px;color:var(--ink-faint);">注：幻境演武点到即止，纵使落败亦<b>绝不损失银两</b>并自动恢复六成气血。</div>
                <div><button class="btn-primary" onclick="JY.Systems.startTowerTrial()">⚔ 登塔闯关 · 迎战第 ${prev.floor} 层</button></div>
              </div>
            </div>
          </div>
          ${ngCard}
        `;
      }
      return;
    }

    // 2. 装备与原著神兵
    if (m.type === "gear") {
      titleEl.textContent = "装备与原著神兵";
      setTabs([["equipped", "穿戴与装备库"], ["legendary", "原著神兵宝甲图鉴"]], "equipped");
      const slotNm = { weapon: "兵刃", armor: "宝甲", trinket: "佩饰", boots: "轻履" };
      if (m.tab === "equipped") {
        const gearOps = (g, idOrSlot, isEq) => {
          if (!g) return "";
          const enh = g.enh || 0;
          const enhBtn = enh < 5
            ? `<button class="btn-sm btn-gold" onclick="JY.Systems.enhanceGear(${isEq ? `'${idOrSlot}'` : idOrSlot},${isEq})">⚒ 淬炼+${enh + 1} (${1 + enh}铁/${60 + enh * 55}两)</button>`
            : `<span class="tag gold">已满淬 +5</span>`;
          const rfBtn = (g.affixes && g.affixes.length)
            ? `<button class="btn-sm" onclick="JY.Systems.reforgeGear(${isEq ? `'${idOrSlot}'` : idOrSlot},${isEq})">🔥 洗词条(2铁/90两)</button>`
            : "";
          return enhBtn + rfBtn;
        };
        const worn = Object.keys(slotNm).map(sl => {
          const g = P.gear[sl];
          return `<div class="info-card${g && g.rarity >= 4 ? " highlight" : ""}">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <b>${slotNm[sl]}：${g ? g.name : "空缺"}${g && g.enh ? ` <span class="tag gold">+${g.enh}</span>` : ""}</b>
            </div>
            <div style="font-size:12px;color:var(--ink-soft);">${g ? (g.desc || "普通装备") : "前往铁匠铺锻造 4 部位词条装备，或通过剧情获取原著神兵。"}</div>
            ${g ? `<div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:auto;">${gearOps(g, sl, true)}</div>` : ""}
          </div>`;
        }).join("");
        const bag = P.bagGear.length ? P.bagGear.map((g, idx) => `<div class="info-card">
          <div style="display:flex;justify-content:space-between;"><b>${g.name}${g.enh ? ` +${g.enh}` : ""}</b><span class="tag ${g.rarity >= 4 ? "gold" : ""}">${slotNm[g.slot]}</span></div>
          <div style="font-size:12px;color:var(--ink-soft);">${g.desc || ""}</div>
          <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:auto;">
            <button class="btn-sm btn-primary" onclick="JY.Systems.equipGear(${idx})">换上</button>
            ${gearOps(g, idx, false)}
          </div>
        </div>`).join("") : `<p class="dim">备用装备库暂无装备，可去襄阳「百炼铁匠铺」或长安「西市胡商街」锻造词条神装。</p>`;
        bodyEl.innerHTML = `<p style="margin-bottom:8px;color:var(--ink-soft);">持有百炼精铁：<b>${P.inv.ore_iron || 0}</b> · 银两：<b>${P.gold}</b>（强化每 +1 级提升装备攻防血 14%，随机词条装可无限洗练）</p><h4 style="margin-bottom:6px;color:var(--red);">当前穿戴</h4><div class="card-grid" style="margin-bottom:14px;">${worn}</div><h4 style="margin-bottom:6px;color:var(--red);">装备库（${P.bagGear.length} 件）</h4><div class="card-grid">${bag}</div>`;
      } else {
        const list = Object.values(JY.LEGENDARY_GEAR).map(g => {
          const owned = Object.values(P.gear).some(x => x && x.id === g.id) || P.bagGear.some(x => x.id === g.id);
          return `<div class="info-card${owned ? " done" : ""}">
            <div style="display:flex;justify-content:space-between;"><b>${g.name}</b><span class="tag ${owned ? "jade" : "gold"}">${owned ? "已入手" : "未获得"}</span></div>
            <div style="font-size:12px;color:var(--ink-soft);">${g.desc}</div>
          </div>`;
        }).join("");
        bodyEl.innerHTML = `<div class="card-grid">${list}</div>`;
      }
      return;
    }

    // 3. 行囊与五大生活技艺
    if (m.type === "life") {
      titleEl.textContent = "行囊与五大生活技艺";
      setTabs([["bag", "行囊物品"], ["alchemy", `炼丹 Lv${P.life.alchemy}`], ["forge", `锻造 Lv${P.life.forge}`], ["cook", `烹饪 Lv${P.life.cook}`], ["arts", `音律Lv${P.life.music}/弈棋Lv${P.life.chess}`]], "bag");
      if (m.tab === "bag") {
        const items = Object.keys(P.inv).filter(k => P.inv[k] > 0 && JY.ITEMS[k]).map(k => {
          const it = JY.ITEMS[k];
          const usable = !!(it.heal || it.buff || k === "treasure_map");
          return `<div class="info-card">
            <div style="display:flex;justify-content:space-between;"><b>${it.name} × ${P.inv[k]}</b><span class="tag">${it.cat}</span></div>
            <div style="font-size:12px;color:var(--ink-soft);">${it.desc}</div>
            ${usable ? `<button class="btn-sm btn-primary" style="margin-top:auto;" onclick="JY.Systems.useItem('${k}')">${k === "treasure_map" ? "展开藏宝图" : it.buff ? "食用获Buff" : "服用"}</button>` : ""}
          </div>`;
        }).join("");
        bodyEl.innerHTML = `<div class="card-grid">${items || "<p>行囊空空如也。</p>"}</div>`;
      } else if (m.tab === "arts") {
        const songsHtml = (JY.MUSIC_SONGS || []).map(s => {
          const can = (P.life.music || 1) >= s.reqLv && P.energy >= s.energy;
          const active = P.songBuff && P.songBuff.id === s.id;
          return `<div class="info-card${active ? " highlight" : ""}">
            <div style="display:flex;justify-content:space-between;"><b>🎵《${s.name}》</b><span class="tag ${active ? "purple" : ""}">${active ? `生效中(余${P.songBuff.battles}战)` : `需音律Lv${s.reqLv}`}</span></div>
            <div style="font-size:12px;color:var(--ink-soft);">${s.desc}</div>
            <button class="btn-sm btn-primary" style="margin-top:auto;" ${can ? "" : "disabled"} onclick="JY.Systems.playMusicSong('${s.id}')">抚琴奏曲（-${s.energy}精力）</button>
          </div>`;
        }).join("");
        const solvedMap = P.chessSolved || {};
        const puzzlesHtml = (JY.CHESS_PUZZLES || []).map(pz => {
          const solved = !!solvedMap[pz.id];
          const can = (P.life.chess || 1) >= pz.reqLv;
          return `<div class="info-card${solved ? " done" : ""}">
            <div style="display:flex;justify-content:space-between;"><b>♟ ${pz.name}</b><span class="tag ${solved ? "jade" : "gold"}">${solved ? "已破局" : `需弈棋Lv${pz.reqLv}`}</span></div>
            <div style="font-size:12px;color:var(--ink-soft);">${pz.prompt}</div>
            ${solved ? `<span style="font-size:12px;color:var(--jade);">✓ 残局已破，感悟已化入自身根骨！</span>` :
              `<div style="display:flex;flex-direction:column;gap:4px;margin-top:4px;">${pz.options.map((o, oi) =>
                `<button class="btn-sm" style="text-align:left;white-space:normal;" ${can ? "" : "disabled"} onclick="JY.Systems.solveChessPuzzle('${pz.id}',${oi})">${oi + 1}. ${JY.esc(o.text)}</button>`
              ).join("")}</div>`}
          </div>`;
        }).join("");
        bodyEl.innerHTML = `
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;align-items:center;">
            <b>雅艺日常修习：</b>
            <button class="btn-sm btn-jade" onclick="JY.Systems.practiceArt('music')">🎵 抚琴演练 Lv${P.life.music}（-12精力/+25修为）</button>
            <button class="btn-sm btn-jade" onclick="JY.Systems.practiceArt('chess')">♟ 打谱对弈 Lv${P.life.chess}（-12精力/+25修为）</button>
          </div>
          <h4 style="margin-bottom:6px;color:var(--purple);">古琴战前曲谱（可与美食 Buff 叠加）</h4>
          <div class="card-grid" style="margin-bottom:14px;">${songsHtml}</div>
          <h4 style="margin-bottom:6px;color:var(--red);">珍珑古谱残局挑战（破局永久增根骨/悟性/奇珍）</h4>
          <div class="card-grid">${puzzlesHtml}</div>`;
      } else {
        const cat = m.tab;
        const recs = (JY.RECIPES[cat] || []).map(r => {
          const lvOk = (P.life[cat] || 1) >= r.reqLv;
          const matOk = Object.keys(r.mats).every(k => (P.inv[k] || 0) >= r.mats[k]);
          const can = lvOk && matOk;
          const matTxt = Object.keys(r.mats).map(k => `${JY.ITEMS[k].name}×${r.mats[k]}(有${P.inv[k] || 0})`).join(" + ");
          return `<div class="info-card${can ? " highlight" : ""}">
            <b>${r.name} <span class="tag ${lvOk ? "jade" : ""}">需Lv${r.reqLv}</span></b>
            <div style="font-size:12px;color:var(--ink-soft);">材料：${matTxt}</div>
            <button class="btn-sm btn-primary" style="margin-top:auto;" ${can ? "" : "disabled"} onclick="JY.Systems.craftRecipe('${cat}','${r.id}')">${!lvOk ? `需技艺Lv${r.reqLv}` : !matOk ? "材料不足" : "开始制作"}</button>
          </div>`;
        }).join("");
        bodyEl.innerHTML = `<p style="margin-bottom:10px;color:var(--ink-soft);">制作可提升对应生活技艺等级；做出的名菜可食用获战前 Buff 或高额赠予红颜/同道！</p><div class="card-grid">${recs}</div>`;
      }
      return;
    }

    // 4. 山河卷轴：六卷主线脉络、长篇剧情、悬赏、十四天书与编年史
    if (m.type === "quest") {
      titleEl.textContent = "山河卷轴 · 主线脉络与十四天书";
      setTabs([["mainline", "🧭 主线脉络"], ["story", "全部长篇剧情"], ["bounty", "江湖悬赏榜"], ["tianshu", "十四天书"], ["chronicle", "山河编年史"]], "mainline");
      if (m.tab === "mainline") {
        const ml = JY.World.getMainlineState();
        const cards = ml.stages.map(st => {
          const isCur = ml.current.id === st.id;
          const t = st.target || {};
          const goCall = t.modal
            ? `JY.UI.openModal('${t.modal[0]}','${t.modal[1] || ""}')`
            : `JY.World.guideNavigate('${t.region || ""}','${t.room || ""}','${t.npc || ""}')`;
          return `<div class="info-card${st.done ? " done" : isCur ? " highlight" : ""}">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
              <b>${st.num} · ${st.name}</b>
              <span class="tag ${st.done ? "jade" : isCur ? "gold" : ""}">${st.done ? "✓ 已达成" : isCur ? "▶ 当前指引" : "待开启"}</span>
            </div>
            <div style="font-size:12.5px;color:var(--ink-soft);line-height:1.65;">${st.desc}</div>
            ${!st.done ? `<div style="margin-top:auto;padding-top:4px;"><button class="btn-sm ${isCur ? "btn-primary" : ""}" onclick="${goCall}">🧭 ${t.label || "前往此地"}</button></div>` : ""}
          </div>`;
        }).join("");
        bodyEl.innerHTML = `
          <div class="info-card highlight" style="margin-bottom:12px;">
            <b>📜 山河十四卷 · 江湖总纲（主线进度 ${ml.doneCount}/${ml.total} 卷）</b>
            <div style="font-size:12.5px;color:var(--ink-soft);">本作核心路线为：<b>悦来初启（茶楼听风/武馆习艺）→ 结伴投师（觅同道/入八大门派或走散修传奇）→ 纵横26城寻十四天书、打通奇经八脉与锻造神兵 → 登顶华山之巅三阵论剑问鼎天下 → 闯藏经阁百层试炼塔与二周目传承</b>。点击任意卷轴下方按钮即可一键自动循路前往！</div>
          </div>
          <div class="card-grid">${cards}</div>
        `;
      } else if (m.tab === "story") {
        const filter = (typeof m.extra === "string" && m.extra) ? m.extra : "all";
        const catOf = qid => qid.startsWith("ts_") ? "tianshu" : qid.startsWith("sect_arc_") ? "sect" : qid.startsWith("mate_deep_") ? "mate" : "world";
        const allQuests = Object.keys(JY.QUESTS).map(qid => {
          const q = JY.QUESTS[qid];
          const doneN = q.episodes.filter(e => P.flags[e.id + "_played"]).length;
          const nextEp = q.episodes.find(e => !P.flags[e.id + "_played"]);
          const ready = nextEp ? JY.Story.meetsRequirements(nextEp) : false;
          const isLocal = !!(ready && nextEp.trigger && nextEp.trigger.region === JY.S.region);
          const prio = !nextEp ? 4 : isLocal ? 0 : (ready && doneN > 0) ? 1 : ready ? 2 : 3;
          return { qid, q, cat: catOf(qid), doneN, nextEp, ready, isLocal, prio };
        });
        const counts = { all: allQuests.length, tianshu: 0, sect: 0, mate: 0, world: 0 };
        allQuests.forEach(x => { counts[x.cat]++; });
        const filters = [
          ["all", `全部 (${counts.all})`],
          ["tianshu", `十四天书 (${counts.tianshu})`],
          ["sect", `门派长线 (${counts.sect})`],
          ["mate", `同道红颜 (${counts.mate})`],
          ["world", `江湖奇遇 (${counts.world})`]
        ];
        const bar = `<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;">${filters.map(([k, lbl]) =>
          `<button class="btn-sm ${filter === k ? "btn-primary" : ""}" onclick="JY.UI.openModal('quest','story','${k}')">${lbl}</button>`
        ).join("")}</div>`;
        const shown = allQuests.filter(x => filter === "all" || x.cat === filter).sort((a, b) => a.prio - b.prio);
        const cards = shown.map(({ q, doneN, nextEp, ready, isLocal }) => {
          let stateTag = "";
          if (!nextEp) stateTag = `<span class="tag jade">已完结</span>`;
          else if (isLocal) stateTag = `<span class="tag red">就在本区</span>`;
          else if (ready && nextEp.trigger && nextEp.trigger.region && JY.REGIONS_META[nextEp.trigger.region]) {
            stateTag = `<span class="tag gold">前往：${JY.REGIONS_META[nextEp.trigger.region].name}</span>`;
          } else if (nextEp.reqSect && P.sect !== nextEp.reqSect) {
            stateTag = `<span class="tag">需拜入${JY.SECTS[nextEp.reqSect].name}</span>`;
          } else if (nextEp.reqAff) {
            const [mid, lv] = Object.entries(nextEp.reqAff)[0];
            const mt = JY.MATES.find(x => x.id === mid);
            stateTag = `<span class="tag">需${mt ? mt.name : mid}好感≥${lv}</span>`;
          } else if (nextEp.reqUnaligned && P.sect) {
            stateTag = `<span class="tag">散修专属</span>`;
          } else if (!ready && nextEp) {
            const miss = JY.Story.getMissingRequirements(nextEp);
            if (miss.length) stateTag = `<span class="tag red">历练未足(${miss.length})</span>`;
          }
          const tr = nextEp && nextEp.trigger;
          const goBtn = (ready && tr && tr.region)
            ? `<div style="margin-top:auto;padding-top:4px;"><button class="btn-sm btn-jade" onclick="JY.World.guideNavigate('${tr.region}','${tr.room || ""}','${tr.npc || ""}')">🧭 一键前往触发地</button></div>`
            : "";
          return `<div class="info-card${!nextEp ? " done" : isLocal || (ready && doneN > 0) ? " highlight" : ""}">
            <div style="display:flex;justify-content:space-between;gap:6px;align-items:center;">
              <b>${q.title}</b>
              <div style="display:flex;gap:4px;align-items:center;">${stateTag}<span class="tag ${!nextEp ? "jade" : "purple"}">${doneN}/${q.episodes.length}幕</span></div>
            </div>
            <div style="font-size:12px;color:var(--ink-soft);">${q.summary}</div>
            <div style="font-size:12px;color:${!nextEp ? "var(--jade)" : ready ? "var(--red)" : "var(--ink-faint)"};margin-top:4px;">${nextEp ? `▶ 下一步【${nextEp.title}】：${nextEp.hint}` : "✓ 该长篇剧情已全部完结！"}</div>
            ${goBtn}
          </div>`;
        }).join("");
        bodyEl.innerHTML = bar + `<div class="card-grid">${cards}</div>`;
      } else if (m.tab === "bounty") {
        const bList = JY.EVENTS.filter(e => e.kind === "bounty").map(b => {
          const active = P.bounties.includes(b.id);
          const region = JY.REGIONS[b.region];
          const room = region && region.rooms[b.room];
          const loot = JY.ITEMS[b.reward.item] || JY.LEGENDARY_GEAR[b.reward.legendary];
          return `<div class="info-card${active ? " highlight" : ""}">
            <b>${b.title} ${P.bountyDone[b.id] ? `<span class="tag jade">已完${P.bountyDone[b.id]}次</span>` : ""}</b>
            <div style="font-size:12px;color:var(--ink-soft);">${b.desc}</div>
            ${room ? `<div style="font-size:12px;">${JY.REGIONS_META[b.region].name} · ${room.name} · ${JY.ENEMIES[b.targetEnemy].name}</div>` : ""}
            <div style="font-size:11.5px;color:var(--gold);">赏格：银${b.reward.gold} · 修为${b.reward.exp}${loot ? " · " + loot.name : ""}</div>
            <button class="btn-sm ${active ? "" : "btn-primary"}" ${active ? "disabled" : ""} onclick="JY.Systems.acceptBounty('${b.id}')">${active ? "已揭榜（击杀自动结算）" : "揭榜接取"}</button>
          </div>`;
        }).join("");
        bodyEl.innerHTML = `<div class="card-grid">${bList}</div>`;
      } else if (m.tab === "tianshu") {
        const cards = JY.TIANSHU_META.map(t => {
          const got = !!P.tianshu[t.id];
          const rm = JY.REGIONS_META[t.startRegion];
          return `<div class="info-card${got ? " done" : ""}">
            <div style="display:flex;justify-content:space-between;"><b>「${t.ch}」${got ? t.name : "？？？（未得）"}</b><span class="tag ${got ? "jade" : ""}">${got ? "已集得" : rm ? rm.name : ""}</span></div>
            <div style="font-size:12px;color:var(--ink-soft);">${t.hint}</div>
          </div>`;
        }).join("");
        bodyEl.innerHTML = `<div class="card-grid">${cards}</div>`;
      } else {
        bodyEl.innerHTML = P.chronicle.slice().reverse().map((c, i) => `<div style="padding:5px 0;border-bottom:1px dashed var(--line);">${P.chronicle.length - i}. ${c}</div>`).join("");
      }
      return;
    }

    // 5. 同道与红颜图鉴
    if (m.type === "mates") {
      titleEl.textContent = "十二同道与红颜知己";
      const gifts = Object.keys(P.inv).filter(k => P.inv[k] > 0 && JY.ITEMS[k] && JY.ITEMS[k].gift);
      const cards = JY.MATES.map(mt => {
        const owned = P.mates.includes(mt.id), active = P.mate === mt.id, aff = P.aff[mt.id] || 0;
        const regNm = JY.REGIONS_META[mt.loc] ? JY.REGIONS_META[mt.loc].name : mt.loc;
        const favItem = JY.ITEMS[mt.favGift];
        const sortedGifts = gifts.slice().sort((a, b) => (b === mt.favGift ? 1 : 0) - (a === mt.favGift ? 1 : 0));
        const giftBtns = owned ? sortedGifts.slice(0, 4).map(gk => {
          const isFav = gk === mt.favGift;
          return `<button class="btn-sm ${isFav ? "btn-gold" : ""}" onclick="JY.Systems.giftMate('${mt.id}','${gk}')">${isFav ? "★" : ""}赠${JY.ITEMS[gk].name}</button>`;
        }).join("") : "";
        return `<div class="mate-row-card" style="${active ? "border-color:var(--jade);background:rgba(46,111,86,.08);" : ""}">
          <img src="${JY.assetUrl(mt.art)}" alt="${mt.name}">
          <div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:4px;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <b>${mt.name} ${mt.gender === "f" ? `<span class="tag red">红颜</span>` : ""}</b>
              <span class="tag ${active ? "jade" : ""}">${active ? "随行中" : owned ? "已结交" : regNm}</span>
            </div>
            <div style="font-size:12px;color:var(--ink-soft);">${mt.intro}</div>
            <div style="font-size:11.5px;color:var(--ink-faint);">好感 ${aff}/100${favItem ? ` · 挚爱：${favItem.name}` : ""} · 合击【${mt.comboName}】：${mt.comboDesc}</div>
            <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:auto;">
              ${owned && !active ? `<button class="btn-sm btn-jade" onclick="JY.S.P.mate='${mt.id}';JY.UI.renderAll();">召请随行</button>` : ""}
              ${owned && mt.gender === "f" && aff >= 80 && !P.confidant ? `<button class="btn-sm btn-primary" onclick="JY.S.P.confidant='${mt.id}';JY.applyEffect({aff:{'${mt.id}':15}});JY.addChronicle('与${mt.name}定情');JY.UI.renderAll();">♥ 定情红颜</button>` : ""}
              ${giftBtns}
            </div>
          </div>
        </div>`;
      }).join("");
      bodyEl.innerHTML = `<div class="card-grid">${cards}</div>`;
      return;
    }

    // 6. 26 区域世界大舆图（SVG 交互地图，点击直达，含实时可触发剧情徽标）
    if (m.type === "world") {
      const ids = Object.keys(JY.REGIONS_META);
      const totalRooms = ids.reduce((s, id) => s + (JY.REGIONS[id] ? Object.keys(JY.REGIONS[id].rooms).length : 0), 0);
      titleEl.textContent = `大世界江湖舆图（26 区域 · ${totalRooms} 间子房间）`;
      const regQuestCnt = {};
      Object.values(JY.QUESTS).forEach(q => {
        q.episodes.forEach(ep => {
          if (ep.trigger && ep.trigger.region && JY.Story.meetsRequirements(ep)) {
            regQuestCnt[ep.trigger.region] = (regQuestCnt[ep.trigger.region] || 0) + 1;
          }
        });
      });
      const lines = [], seen = new Set();
      ids.forEach(a => {
        JY.REGIONS_META[a].links.forEach(b => {
          if (!JY.REGIONS_META[b]) return;
          const k = a < b ? a + "|" + b : b + "|" + a;
          if (seen.has(k)) return; seen.add(k);
          const A = JY.REGIONS_META[a], B = JY.REGIONS_META[b];
          lines.push(`<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="#8fb3a8" stroke-width="1.6" opacity=".82"/>`);
        });
      });
      const nodes = ids.map(id => {
        const r = JY.REGIONS_META[id], reg = JY.REGIONS[id];
        const isCur = id === JY.S.region;
        const rmCount = reg ? Object.keys(reg.rooms).length : 0;
        const qCnt = regQuestCnt[id] || 0;
        const fill = isCur ? "#b24035" : r.kind === "peak" ? "#b58a3a" : r.kind === "sect" ? "#226b61" : "#2c5e74";
        return `<g style="cursor:pointer;" onclick="JY.World.travelRegion('${id}')">
          <title>${r.name}（难度${r.d} · ${rmCount}间子房间${qCnt ? ` · ${qCnt}幕可触发剧情` : ""}）— 点击快马前往</title>
          <circle cx="${r.x}" cy="${r.y}" r="${isCur ? 11.5 : 8.5}" fill="${fill}" stroke="#f6faf6" stroke-width="2.2"/>
          ${qCnt ? `<circle cx="${r.x + 9}" cy="${r.y - 9}" r="6.5" fill="#b24035" stroke="#f6faf6" stroke-width="1.2"/><text x="${r.x + 9}" y="${r.y - 6}" text-anchor="middle" font-size="8.5" font-weight="700" fill="#fff">!</text>` : ""}
          <text x="${r.x}" y="${r.y + 20}" text-anchor="middle" font-size="11.5" font-weight="${isCur || qCnt ? 700 : 400}" fill="${isCur ? "#b24035" : "#1a292a"}">${r.name}</text>
        </g>`;
      });
      bodyEl.innerHTML = `
        <p style="margin-bottom:8px;color:var(--ink-soft);">点击任意区域即可快马前往（耗 8 精力、推进 1 时辰；红点=当前位置，右上角 <b style="color:var(--red);">!</b>=有可触发长篇剧情，全部 26 区 ${totalRooms} 间子房间已开放）。</p>
        <svg class="world-map-svg" viewBox="100 20 820 390">${lines.join("")}${nodes.join("")}</svg>
      `;
      return;
    }

    // 7. 房间 NPC 专属互动弹窗
    if (m.type === "npc" && m.extra) {
      const npc = m.extra;
      titleEl.textContent = `${npc.name} · ${npc.role}`;
      const storyBtns = JY.Story.findAvailableEpisodes(npc.id).map(({ quest, ep }) =>
        `<button class="btn-primary" onclick="JY.Story.openEpisode('${quest.id}','${ep.id}','${npc.id}')">📜 开启剧情：${ep.title}</button>`
      ).join("");
      const lockedHtml = (JY.Story.findLockedEpisodesForNpc ? JY.Story.findLockedEpisodesForNpc(npc.id) : []).map(({ ep, miss }) =>
        `<div style="padding:8px 10px;border-radius:7px;border:1px dashed var(--line-gold);background:rgba(181,138,58,.08);font-size:12px;color:var(--ink-soft);">
          <b style="color:var(--red);">🔒 主线「${ep.title}」历练资格未足：</b><br>${miss.join(" · ")}
        </div>`
      ).join("");
      const mateDef = npc.mateId ? JY.MATES.find(x => x.id === npc.mateId) : null;
      const isMateOwned = mateDef && P.mates.includes(mateDef.id);
      const teachBtns = (npc.teach || []).filter(t => !P.learned[t.id]).map(t => {
        const sk = JY.SKILLS[t.id];
        const chk = JY.Systems.canLearnSpec(t, npc);
        return `<button ${chk.ok ? "" : "disabled"} onclick="JY.Systems.learnFromNpc('${t.id}',${t.gold || 0},'${npc.id}')">请教「${sk.name}」（${t.gold || 0}两${!chk.ok && chk.reason ? `·${chk.reason}` : ""}）</button>`;
      }).join("");
      const towerBtn = npc.id === "sweeper"
        ? `<button class="btn-gold" onclick="JY.UI.openModal('martial','tower')">🏯 开启藏经阁·百层宗师试炼（当前第 ${(P.towerFloor || 0) + 1} 层）</button>`
        : "";
      bodyEl.innerHTML = `
        <div style="display:flex;gap:14px;align-items:flex-start;flex-wrap:wrap;">
          <img src="${JY.assetUrl(npc.art)}" style="width:128px;height:186px;object-fit:cover;object-position:center 14%;border-radius:7px;border:1px solid var(--line);cursor:zoom-in;" alt="${npc.name}">
          <div style="flex:1;min-width:220px;display:flex;flex-direction:column;gap:10px;">
            <div class="log-line talk" style="font-size:14.5px;">${npc.talk}</div>
            ${lockedHtml}
            <div style="display:flex;flex-wrap:wrap;gap:7px;">
              ${storyBtns}
              ${towerBtn}
              ${mateDef && !isMateOwned ? `<button class="btn-jade" onclick="JY.Systems.recruitMate('${mateDef.id}')">🤝 邀 ${mateDef.name} 同行</button>` : ""}
              ${npc.sectJoin && P.sect !== npc.sectJoin ? `<button class="btn-gold" onclick="JY.Systems.joinSect('${npc.sectJoin}')">🏯 拜入 ${JY.SECTS[npc.sectJoin].name}</button>` : ""}
              ${teachBtns}
            </div>
          </div>
        </div>
      `;
      return;
    }

    // 8. 商铺 / 夜间黑市弹窗
    if (m.type === "shop") {
      const isBlack = m.tab === "black";
      const rm = JY.World.curRoom();
      const list = isBlack ? (rm.nightMarket || []) : (rm.shop || []);
      titleEl.textContent = isBlack ? "🏮 暗巷夜间黑市（奇珍异宝）" : "🏪 城中市集与药铺";
      bodyEl.innerHTML = `<p style="margin-bottom:10px;">当前银两：<b>${P.gold} 两</b>${isBlack && P.origin === "langzi" ? "（市井奇才黑市 85 折！）" : ""}</p>
        <div class="card-grid">${list.map(k => {
          const it = JY.ITEMS[k];
          const price = Math.round(it.price * (isBlack && P.origin === "langzi" ? 0.85 : 1));
          return `<div class="info-card">
            <div style="display:flex;justify-content:space-between;"><b>${it.name}</b><span class="tag gold">${price}两</span></div>
            <div style="font-size:12px;color:var(--ink-soft);">${it.desc}</div>
            <button class="btn-sm btn-primary" ${P.gold < price ? "disabled" : ""} onclick="JY.Systems.buyItem('${k}',${isBlack})">购买（已有 ${P.inv[k] || 0}）</button>
          </div>`;
        }).join("")}</div>`;
      return;
    }

    // 8.5 跨城旅途随机奇遇弹窗
    if (m.type === "travel" && m.extra) {
      const ev = m.extra;
      titleEl.textContent = `🐎 江湖旅途奇遇 · ${ev.title}`;
      const chBtns = ev.choices.map((ch, i) => {
        let ok = true, lockWhy = "";
        if (ch.reqGold && P.gold < ch.reqGold) { ok = false; lockWhy = `需${ch.reqGold}两`; }
        if (ch.reqItem && !(P.inv[ch.reqItem] > 0)) { ok = false; lockWhy = `缺${JY.ITEMS[ch.reqItem].name}`; }
        if (ch.reqLife) {
          for (const [lk, lv] of Object.entries(ch.reqLife)) {
            if ((P.life[lk] || 1) < lv) { ok = false; lockWhy = `需技艺Lv${lv}`; }
          }
        }
        return `<button class="th-choice-btn${ch.reqLife ? " special" : ""}" ${ok ? "" : "disabled"} onclick="JY.World.resolveTravelChoice('${ev.id}',${i})">
          <span>${JY.esc(ch.text)}</span>
          <span class="tag ${ok ? "gold" : ""}">${ok ? "抉择" : lockWhy}</span>
        </button>`;
      }).join("");
      bodyEl.innerHTML = `
        <div style="display:flex;gap:14px;align-items:flex-start;flex-wrap:wrap;">
          <img src="${JY.assetUrl(ev.art)}" style="width:140px;height:180px;object-fit:cover;object-position:center 18%;border-radius:7px;border:1px solid var(--line);" alt="${ev.title}">
          <div style="flex:1;min-width:240px;display:flex;flex-direction:column;gap:10px;">
            <div><span class="tag purple">${ev.tag}</span></div>
            <div class="log-line talk" style="font-size:15px;line-height:1.85;">${ev.desc}</div>
            <div style="display:flex;flex-direction:column;gap:6px;">${chBtns}</div>
          </div>
        </div>
      `;
      return;
    }

    // 9. 三大终局画卷弹窗
    if (m.type === "ending") {
      const mVal = P.morality;
      const art = mVal >= 20 ? "assets/ending-good.webp" : mVal <= -20 ? "assets/ending-evil.webp" : "assets/ending-neutral.webp";
      const h = mVal >= 20 ? "侠之大者 · 天下归心" : mVal <= -20 ? "魔道至尊 · 唯我独尊" : "江湖浪客 · 拂袖而去";
      const tsCnt = Object.keys(P.tianshu).length;
      const legOwned = Object.keys(JY.LEGENDARY_GEAR).filter(id =>
        Object.values(P.gear).some(x => x && x.id === id) || P.bagGear.some(x => x.id === id)
      ).length;
      const conf = P.confidant ? JY.MATES.find(x => x.id === P.confidant) : null;
      const sRank = JY.getSectRank(P);
      const sectTxt = P.sect ? `${JY.SECTS[P.sect].name}·${sRank ? sRank.title : "弟子"}` : "江湖散修";
      titleEl.textContent = h;
      bodyEl.innerHTML = `
        <img class="ending-art" src="${JY.assetUrl(art)}" alt="${h}">
        ${tsCnt >= 14 ? `<div style="text-align:center;margin:6px 0;"><span class="tag gold" style="font-size:13px;padding:3px 12px;">★ 十四天书圆满 · 武林不朽神话 ★</span></div>` : ""}
        <p style="font-size:15px;line-height:2;text-align:center;">
          你以「<b>${sectTxt} · ${JY.moralityRank(mVal)}</b>」之姿${P.flags.huashan_gauntlet_won ? "三阵连克华山绝顶天下群雄" : "登顶华山之巅力挫中神通"}！<br>
          已集得十四天书 <b>${tsCnt}/14</b> 部 · 神兵宝甲 <b>${legOwned}/${Object.keys(JY.LEGENDARY_GEAR).length}</b> 件 · 结交同道 <b>${P.mates.length}/12</b> 位${conf ? ` · 红颜知己：<b>${conf.name}</b>` : ""}<br>
          历经 <b>${JY.S.day}</b> 日江湖风雨${P.towerFloor ? ` · 藏经试炼塔第 <b>${P.towerFloor}</b> 层` : ""}${P.ngPlus ? ` · 第 <b>${P.ngPlus + 1}</b> 周目` : ""}，名动天下。
        </p>
        <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:12px;">
          <button class="btn-primary" onclick="JY.UI.closeModal()">继续自由闯荡江湖</button>
          <button class="btn-gold" onclick="JY.UI.closeModal();JY.UI.openModal('martial','tower');">🏯 闯藏经阁试炼塔 / ☯ 开启下一周目传承</button>
        </div>
      `;
    }
  };

  // ---------- 标题屏 / 创建屏 / 启动逻辑 ----------
  let pendingSlot = 1, selOrigin = "sanxiu", alloc = { str: 0, agi: 0, int: 0, con: 0, luck: 0 };

  JY.UI.renderSlots = function () {
    const meta = JY.readMeta(), box = $("slot-list");
    if (!box) return;
    box.innerHTML = [1, 2, 3].map(i => {
      const m = meta[i];
      if (m) {
        return `<div class="slot-card">
          <div class="slot-flag">存档 ${i}</div>
          <div style="font-size:17px;font-weight:900;">${JY.esc(m.name)}</div>
          <div style="font-size:12px;color:var(--ink-soft);">${m.sect} · ${m.region} · 第${m.day}日<br>${new Date(m.ts).toLocaleString("zh-CN")}</div>
          <div class="slot-acts">
            <button class="btn-primary btn-sm" onclick="JY.UI.continueSlot(${i})">再续前缘</button>
            <button class="btn-sm" onclick="JY.UI.openCreate(${i})">覆盖新建</button>
            <button class="btn-sm" onclick="JY.deleteSlot(${i});JY.UI.renderSlots();">删除</button>
          </div>
        </div>`;
      }
      return `<div class="slot-card empty">
        <div class="slot-flag">卷轴 ${i}</div>
        <div style="font-size:13px;color:var(--ink-faint);flex:1;">空白卷轴（可新建侠客踏入山河）</div>
        <div class="slot-acts"><button class="btn-primary btn-sm" onclick="JY.UI.openCreate(${i})">展卷启程</button></div>
      </div>`;
    }).join("");
  };

  JY.UI.openCreate = function (slot) {
    pendingSlot = slot || 1;
    selOrigin = "sanxiu";
    alloc = { str: 0, agi: 0, int: 0, con: 0, luck: 0 };
    $("name-input").value = "";
    JY.UI.renderCreate();
    JY.UI.setScreen("create");
  };

  JY.UI.pickOrigin = function (oid) { selOrigin = oid; JY.UI.renderCreate(); };
  JY.UI.addAttr = function (k, d) {
    const used = Object.values(alloc).reduce((a, b) => a + b, 0);
    if (d > 0 && used >= 15) return;
    if (d < 0 && alloc[k] <= 0) return;
    alloc[k] += d;
    JY.UI.renderCreate();
  };

  JY.UI.renderCreate = function () {
    const used = Object.values(alloc).reduce((a, b) => a + b, 0);
    $("pts-left").textContent = 15 - used;
    $("origin-grid").innerHTML = JY.ORIGINS.map(o => `
      <div class="origin-card${selOrigin === o.id ? " selected" : ""}" onclick="JY.UI.pickOrigin('${o.id}')">
        <div style="display:flex;justify-content:space-between;align-items:center;"><b>${o.name}</b><span class="tag red">${o.badge}</span></div>
        <p>${o.desc}</p>
      </div>
    `).join("");
    const names = { str: "臂力", agi: "身法", int: "悟性", con: "根骨", luck: "福缘" };
    $("attr-alloc").innerHTML = Object.keys(names).map(k => {
      const val = 10 + alloc[k];
      return `<div class="attr-row">
        <span class="a-name">${names[k]}</span>
        <button onclick="JY.UI.addAttr('${k}',-1)">-</button>
        <div class="a-bar"><div class="a-fill" style="width:${Math.min(100, (val - 8) / 17 * 100)}%"></div></div>
        <b style="width:24px;text-align:center;">${val}</b>
        <button onclick="JY.UI.addAttr('${k}',1)">+</button>
      </div>`;
    }).join("");
  };

  JY.UI.enterWorld = function () {
    JY.S = JY.freshState($("name-input").value, selOrigin, alloc);
    JY.S.slot = pendingSlot;
    JY.saveSlot(pendingSlot);
    JY.UI.bootGame(true);
  };

  JY.UI.continueSlot = function (slot) {
    if (!JY.loadSlot(slot)) return;
    JY.UI.bootGame(false);
  };

  JY.UI.bootGame = function (isNew) {
    JY.UI.setScreen("game");
    JY.UI.setStageMode("explore");
    $("explore-log").innerHTML = "";
    if (isNew) {
      JY.addLog("【山河十四卷】你踏出悦来镇牌坊，一段纵横二十六城、寻觅十四天书并问鼎华山的武林传奇正式启幕！", "sys");
      const box = $("explore-log");
      if (box) {
        const card = document.createElement("div");
        card.className = "welcome-guide-card";
        card.innerHTML = `
          <h4>🧭 初入山河 · 开局三步引路</h4>
          <p>不知道第一步点哪？本游戏终极主线是<b>寻觅十四天书 → 习武冲脉/结伴同道 → 登顶华山三阵论剑</b>。上方金色「主线罗盘条」会全程为你指路，现在点击下方任意快捷入口即可立刻出发：</p>
          <div class="wg-btns">
            <button class="btn-sm btn-primary" onclick="JY.World.guideNavigate('yuelai','yl_teahouse','baixiaosheng')">① 去悦来茶楼寻百晓生（启主线）</button>
            <button class="btn-sm btn-jade" onclick="JY.World.guideNavigate('yuelai','yl_dojo','wang_coach')">② 去王氏武馆学破招武学</button>
            <button class="btn-sm" onclick="JY.UI.openModal('quest','mainline')">③ 查看完整《六卷主线脉络》</button>
          </div>
        `;
        box.appendChild(card);
      }
    } else {
      JY.S.logs.forEach(l => JY.UI.appendLogLine(l.text, l.cls));
      JY.addLog("欢迎重返山河江湖！", "sys");
    }
    JY.UI.renderAll();
  };

  JY.UI.manualSave = function () {
    if (JY.saveSlot(JY.S.slot)) {
      JY.addLog("💾 已手动保存当前山河进度。", "sys");
      if (JY.UI.toast) JY.UI.toast(`💾 已存卷至存档 ${JY.S.slot}（可在卷首导出备份码）`, "sys");
    }
  };

  JY.UI.doImportSave = function (slot) {
    const box = $("save-import-box");
    const ok = box && JY.importSaveCode(box.value, slot);
    if (!ok) {
      if (JY.UI.toast) JY.UI.toast("存档码格式无效或已损坏，请检查是否以 SH14: 开头！", "warn");
      return;
    }
    JY.UI.renderSlots();
    JY.UI.closeModal();
    if (JY.UI.toast) JY.UI.toast(`✓ 已成功导入至存档 ${slot}！点击「再续前缘」即可进入。`, "rew");
  };

  // 自动初始化、高清原画灯箱委托、Esc 快捷键与 30s 自动存档
  window.addEventListener("DOMContentLoaded", () => {
    JY.UI.renderSlots();
    $("main-modal-mask").addEventListener("click", e => { if (e.target === $("main-modal-mask")) JY.UI.closeModal(); });
    document.addEventListener("click", e => {
      const img = e.target && e.target.closest && e.target.closest(".hero-mini .av img, .mate-mini-row img, .th-actor img, .fighter-pic img, .mate-row-card img, .ending-art");
      if (img && img.src && JY.UI.openLightbox) {
        e.stopPropagation();
        JY.UI.openLightbox(img.src, img.alt || "水墨画卷");
      }
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        const lb = $("lightbox-mask");
        if (lb && lb.classList.contains("show")) JY.UI.closeLightbox();
        else if (JY.UI.curModal) JY.UI.closeModal();
      }
    });
    setInterval(() => { if (JY.S) JY.saveSlot(JY.S.slot); }, 30000);
  });
})(window);

