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
