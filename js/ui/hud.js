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
