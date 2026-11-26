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
