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
