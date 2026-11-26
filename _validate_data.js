// 山河十四卷 v1.0 · 数据全自动质检器（校验所有地图/剧本/事件无语法错、无断链、无非法ID）
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = __dirname;
const sandbox = { window: {}, console, Math, Date, Object, Array, Set, JSON };
sandbox.window = sandbox;
vm.createContext(sandbox);

function loadDir(relDir) {
  const full = path.join(ROOT, relDir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full).filter(f => f.endsWith(".js")).sort().map(f => path.join(relDir, f));
}

const worldFiles = loadDir("data/world");
const questRooms = path.join("data", "world", "quest_rooms.js");
const files = [
  "data/core_registry.js",
  "data/skills_gear.js",
  ...worldFiles.filter(f => f !== questRooms),
  // 天书房间补充包须在区域定义之后加载，避免整区注册覆盖补充房间。
  ...worldFiles.filter(f => f === questRooms),
  ...loadDir("data/quests"),
  ...loadDir("data/stories"),
  ...loadDir("data/events")
];

const errors = [];
const warnings = [];

for (const f of files) {
  try {
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), sandbox, { filename: f });
  } catch (e) {
    errors.push(`[语法错误] ${f}: ${e.message}`);
  }
}

const JY = sandbox.JY;
if (!JY) {
  console.error("FATAL: JY 未初始化");
  process.exit(1);
}

const checkAsset = (p, ctx) => {
  if (!p) return;
  if (!fs.existsSync(path.join(ROOT, p))) errors.push(`[缺失资源] ${ctx} 引用了不存在的文件: ${p}`);
};
const mateIds = new Set(JY.MATES.map(m => m.id));
const lifeIds = new Set(["alchemy", "forge", "cook", "music", "chess"]);
const checkReward = (reward, ctx) => {
  if (!reward) return;
  if (reward.item && !JY.ITEMS[reward.item]) errors.push(`[非法奖励物品] ${ctx}: ${reward.item}`);
  if (reward.legendary && !JY.LEGENDARY_GEAR[reward.legendary]) errors.push(`[非法神兵] ${ctx}: ${reward.legendary}`);
  if (reward.skill && !JY.SKILLS[reward.skill]) errors.push(`[非法武功] ${ctx}: ${reward.skill}`);
  if (reward.recruit && !mateIds.has(reward.recruit)) errors.push(`[非法同道] ${ctx}: ${reward.recruit}`);
  for (const id of Object.keys(reward.aff || {})) {
    if (!mateIds.has(id)) errors.push(`[非法好感奖励] ${ctx}: ${id}`);
  }
};

// 1. 校验全部 26 区域与子房间
let totalRooms = 0, detailedRegions = 0;
Object.keys(JY.REGIONS_META).forEach(rid => {
  const reg = JY.REGIONS[rid];
  if (!reg) { errors.push(`[缺失区域] ${rid} 未注册`); return; }
  if (!reg.isPlaceholder) detailedRegions++;
  if (!reg.entry || !reg.rooms || !reg.rooms[reg.entry]) {
    errors.push(`[入口错误] 区域 ${rid} 缺少合法 entry: ${reg.entry}`);
    return;
  }
  const rids = Object.keys(reg.rooms);
  totalRooms += rids.length;
  rids.forEach(roomId => {
    const r = reg.rooms[roomId];
    checkAsset(r.art, `区域 ${rid}.${roomId}`);
    (r.exits || []).forEach(ex => {
      if (!reg.rooms[ex]) errors.push(`[断链出口] ${rid}.${roomId} -> 不存在的房间 ${ex}`);
      else if (!(reg.rooms[ex].exits || []).includes(roomId)) {
        warnings.push(`[单向出口] ${rid}.${roomId} -> ${ex} 建议保持双向连通`);
      }
    });
    (r.enemies || []).forEach(eid => { if (!JY.ENEMIES[eid]) errors.push(`[非法敌人] ${rid}.${roomId}: ${eid}`); });
    (r.shop || []).concat(r.nightMarket || []).forEach(iid => { if (!JY.ITEMS[iid]) errors.push(`[非法商品] ${rid}.${roomId}: ${iid}`); });
    if (r.gather) Object.keys(r.gather).forEach(iid => { if (!JY.ITEMS[iid]) errors.push(`[非法采集物] ${rid}.${roomId}: ${iid}`); });
    (r.npcs || []).forEach(n => {
      checkAsset(n.art, `NPC ${rid}.${roomId}.${n.id}`);
      (n.teach || []).forEach(t => { if (!JY.SKILLS[t.id]) errors.push(`[非法武功] NPC ${n.id}: ${t.id}`); });
    });
  });
});

// 2. 校验全部长篇立绘剧本
let totalEpisodes = 0;
const episodeIds = new Set();
Object.keys(JY.QUESTS).forEach(qid => {
  const q = JY.QUESTS[qid];
  if (!q.episodes || !q.episodes.length) { errors.push(`[空剧本] ${qid} 没有 episodes`); return; }
  q.episodes.forEach(ep => {
    totalEpisodes++;
    const ctx = `${qid}.${ep.id}`;
    if (!ep.id || episodeIds.has(ep.id)) errors.push(`[重复或缺失剧幕 ID] ${ctx}`);
    episodeIds.add(ep.id);
    const tr = ep.trigger || {};
    const region = JY.REGIONS[tr.region];
    if ((tr.region || tr.room) && (!region || (tr.room && !region.rooms[tr.room]))) {
      errors.push(`[剧本触发点非法] ${ctx}: ${tr.region}.${tr.room || ""}`);
    }
    if (tr.npc && region && (!tr.room || region.rooms[tr.room])) {
      const rooms = tr.room ? [region.rooms[tr.room]] : Object.values(region.rooms);
      if (!rooms.some(r => r && (r.npcs || []).some(n => n.id === tr.npc))) {
        errors.push(`[剧本触发 NPC 不在场] ${ctx}: ${tr.npc}`);
      }
    }
    if (ep.reqSect && !JY.SECTS[ep.reqSect]) errors.push(`[非法剧幕门派] ${ctx}: ${ep.reqSect}`);
    for (const [id, value] of Object.entries(ep.reqAff || {})) {
      if (!mateIds.has(id) || !Number.isInteger(value) || value < 1 || value > 100) {
        errors.push(`[非法好感门槛] ${ctx}: ${id} = ${value}`);
      }
    }
    const rawSteps = typeof ep.steps === "function"
      ? ep.steps({ name: "质检侠", morality: 30, tianshu: {}, flags: {}, sect: "shaolin", mate: "huangrong", mates: ["huangrong"], aff: { huangrong: 60 } })
      : (ep.steps || []);
    rawSteps.forEach((s, idx) => {
      if (s.show) {
        if (s.show.left) checkAsset(s.show.left, `${qid}.${ep.id}[${idx}].left`);
        if (s.show.right) checkAsset(s.show.right, `${qid}.${ep.id}[${idx}].right`);
      }
      if (s.battle && !JY.ENEMIES[s.battle]) errors.push(`[非法剧情战敌人] ${qid}.${ep.id}: ${s.battle}`);
      checkReward(s.winReward, ctx);
      (s.choice || []).forEach(ch => {
        if (ch.battle && !JY.ENEMIES[ch.battle]) errors.push(`[非法分支战敌人] ${qid}.${ep.id}: ${ch.battle}`);
        checkReward(ch.effect, ctx);
        for (const [id, level] of Object.entries(ch.reqLife || {})) {
          if (!lifeIds.has(id) || !Number.isInteger(level) || level < 1) {
            errors.push(`[非法技艺门槛] ${ctx}: ${id} = ${level}`);
          }
        }
      });
    });
  });
});

// 3. 校验动态悬赏与藏宝图事件
const eventIds = new Set();
const intentTypes = new Set(["attack", "charge", "iron", "poison", "flurry"]);
JY.EVENTS.forEach(ev => {
  if (!ev.id || eventIds.has(ev.id)) errors.push(`[重复或缺失事件 ID] ${ev.id}`);
  eventIds.add(ev.id);
  const region = JY.REGIONS[ev.region];
  const room = region && region.rooms[ev.room];
  if (ev.kind === "treasure" && !room) errors.push(`[藏宝图非法房间] ${ev.id}: ${ev.region}.${ev.room}`);
  if (ev.kind === "bounty") {
    const enemy = JY.ENEMIES[ev.targetEnemy];
    if (!enemy) errors.push(`[悬赏非法敌人] ${ev.id}: ${ev.targetEnemy}`);
    if ((ev.region || ev.room || ev.rare || ev.encounter) && !room) errors.push(`[悬赏非法房间] ${ev.id}: ${ev.region}.${ev.room}`);
    if (room && !ev.rare && !ev.encounter && !(room.enemies || []).includes(ev.targetEnemy)) {
      errors.push(`[悬赏目标不在场] ${ev.id}: ${ev.targetEnemy}`);
    }
    if (ev.rare && enemy) {
      const intents = enemy.intents || [];
      if (!enemy.boss || intents.length < 2 || intents.some(i => !intentTypes.has(i.type) || !i.name || !i.hint)) {
        errors.push(`[稀有悬赏 Boss 意图非法] ${ev.id}: ${ev.targetEnemy}`);
      }
      checkAsset(enemy.art, ev.targetEnemy);
      (enemy.drop || []).forEach(drop => checkReward(drop, ev.targetEnemy));
    }
  }
  checkReward(ev.reward, ev.id);
});

// 4. 校验旅途随机奇遇池与珍珑古谱残局
(JY.TRAVEL_EVENTS || []).forEach(te => {
  checkAsset(te.art, `旅途奇遇 ${te.id}`);
  (te.choices || []).forEach((ch, idx) => {
    if (ch.battle && !JY.ENEMIES[ch.battle]) errors.push(`[旅途奇遇非法敌人] ${te.id}[${idx}]: ${ch.battle}`);
    if (ch.reqItem && !JY.ITEMS[ch.reqItem]) errors.push(`[旅途奇遇非法物品] ${te.id}[${idx}]: ${ch.reqItem}`);
    checkReward(ch.effect, `旅途奇遇 ${te.id}[${idx}]`);
    checkReward(ch.winReward, `旅途奇遇战利品 ${te.id}[${idx}]`);
  });
});
(JY.CHESS_PUZZLES || []).forEach(pz => checkReward(pz.reward, `珍珑残局 ${pz.id}`));

console.log(`=== 山河十四卷 v1.0 数据质检报告 ===`);
console.log(`已加载数据文件: ${files.length} 个`);
console.log(`大区域: ${Object.keys(JY.REGIONS).length}/26（精装区域: ${detailedRegions}，子房间总计: ${totalRooms} 间）`);
console.log(`长篇剧本: ${Object.keys(JY.QUESTS).length} 部（共 ${totalEpisodes} 幕），悬赏/藏宝: ${JY.EVENTS.length} 条，旅途奇遇: ${(JY.TRAVEL_EVENTS || []).length} 条，机制敌人: ${Object.keys(JY.ENEMIES).length} 种`);
if (warnings.length) console.log(`⚠ 警告 (${warnings.length}):\n  ` + warnings.join("\n  "));
if (errors.length) {
  console.error(`❌ 发现错误 (${errors.length}):\n  ` + errors.join("\n  "));
  process.exit(1);
}
console.log("✅ DATA VALIDATION PASSED (0 ERRORS)");
