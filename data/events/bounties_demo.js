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
