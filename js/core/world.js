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
    if (JY.Combat.active || JY.Story.active) return;
    if (JY.UI && JY.UI.closeModal) JY.UI.closeModal();
    if (regionId && regionId !== JY.S.region) {
      JY.World.travelRegion(regionId);
      // 若精力不足未成行，或中途触发了旅途随机奇遇弹窗，则先停在当前状态
      if (JY.S.region !== regionId || (JY.UI && JY.UI.curModal)) return;
    }
    const reg = JY.World.curRegion();
    const targetRoom = (roomId && reg && reg.rooms[roomId]) ? roomId : (reg && reg.entry);
    if (targetRoom && targetRoom !== JY.S.room) {
      JY.World.walkToRoom(targetRoom);
    }
    if (npcId && JY.UI && JY.UI.openNpcModal) {
      const rm = JY.World.curRoom();
      if (rm && (rm.npcs || []).some(n => n.id === npcId)) {
        JY.UI.openNpcModal(npcId);
      }
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
