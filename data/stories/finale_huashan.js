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
