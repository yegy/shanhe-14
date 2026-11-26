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
