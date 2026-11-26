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
