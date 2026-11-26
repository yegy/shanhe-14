(function (root) {
  "use strict";
  const JY = root.JY;
  const hero = "assets/hero-portrait.webp";
  const ying = "assets/mate-renyingying.webp";
  const ling = "assets/mate-linghu.webp";

  JY.registerQuest("ts_xiao", {
    title: "笑傲江湖 · 断弦余音",
    tianshuId: "xiao",
    summary: "从洛阳绿竹巷的琴匣寻到思过崖剑痕，循五岳门帖登黑木崖，亲见琴案与教主之位如何易手。",
    episodes: [
      {
        id: "xiao_ep1",
        title: "第一幕 · 绿竹听琴",
        hint: "前往「洛阳城 · 绿竹巷」拜访任盈盈。",
        trigger: { region: "luoyang", room: "ly_bamboo", npc: "renyingying" },
        steps: [
          { nar: "你掀开竹帘，帘绳撞翻一枚琴雁。帘后女子伸手接住，一拨第七弦，杂音立即止住，连门外卖花人也住了声。" },
          { show: { left: hero, right: ying, active: "right" }, say: ["任盈盈", "少侠找谁？若是寻绿竹翁，他去打水了。若是寻那支曲里的错处，我倒可再弹一遍。"] },
          { show: { active: "left" }, say: ["主角", "头两遍都在这儿少半拍。我闻得门廊有松木烧过的气味，劳驾看看琴匣的底。"] },
          { nar: "任盈盈用护弦布拂过铜扣，倒出一张五岳门帖。你将帖角抵到茶盏旁，压着它朝灯侧偏去，一道反印显出山石轮廓。" },
          { ifMate: "linghu", show: { left: ling, active: "left" }, say: ["令狐冲", "我说墙上怎生多了一张武林英雄的脸，原来是你拿我罚坐过的山崖盖印。盈盈，错半拍的是琴，错拜山头的可别是我。"] },
          { show: { left: hero, active: "right" }, say: ["任盈盈", "他打趣归他打趣。并派的帖原该五门分写，现在这张日子一栏全刮了，只有思过崖那方私印还能认。"] },
          { nar: "她把匣底翻回来，用竹刀挑开一段绒里。你隔着布托起一枚卡在里面的细长松针，针尖沾着鲜红的印泥。" },
          { choice: [
            { text: "【音律 Lv2】接完缺拍，按琴弦余振辨出琴匣里的夹层", reqLife: { music: 2 }, effect: { moral: 9, exp: 175, aff: { renyingying: 16 }, item: "guqin_score", setFlag: "xiao_ep1_done" }, reply: ["任盈盈", "懂得给曲子留一口气的人少见。这一页给你，门帖夹在下面。"] },
            { text: "【相助】请任盈盈保管原帖，只携思过崖印样上山", effect: { moral: 6, exp: 120, aff: { renyingying: 8 }, setFlag: "xiao_ep1_done" }, reply: ["任盈盈", "路上别逢人便问，思过崖上石头硬，乱问可要多碰几个头。"] },
            { text: "【换个价钱】以不揭开琴匣来路为条件，索银和门帖抄件", effect: { moral: -6, exp: 95, gold: 125, setFlag: "xiao_ep1_done", setFlag2: "xiao_sold_silence" }, reply: ["任盈盈", "银子拿去，话也请你一并收好。我只付这一次。"] }
          ] }
        ]
      },
      {
        id: "xiao_ep2",
        title: "第二幕 · 石壁回锋",
        hint: "前往「华山 · 思过崖」，与令狐冲核对门帖印记。",
        reqFlag: "xiao_ep1_done",
        trigger: { region: "huashan", room: "hs_siguoya", npc: "linghu" },
        steps: [
          { nar: "你把门帖贴在崖壁凹处，缺口正与裂纹合上。令狐冲用酒葫芦压住纸，剑尖挑开石缝里的茅草，挑出一截新栓的灰绳。" },
          { show: { left: hero, right: ling, active: "right" }, say: ["令狐冲", "凿石头的人早走光了。这位新来的爷们偏把旗子插得高，是怕我在下面认不出他华山的结？"] },
          { show: { active: "left" }, say: ["主角", "再把火举上去些。绳结压着的是剑路，五派的起手式竟叫同一笔挑断。"] },
          { nar: "令狐冲旋肘挑起一根枯枝，沿着石痕走到第三折。枯枝卡在石眼，他撒手后退一步，枝梢恰好指向一片能活动的薄石。" },
          { show: { active: "right" }, say: ["令狐冲", "拿一招冠你一个门派，那杆旗倒好使。拿它来挡这一剑，怕旗连杆要断两截。"] },
          { nar: "你撬开薄石，剥下夹在背面的一层毛纸。纸上只有一行交接时刻，落处是万安寺宝塔下，旁边压印着五把不同的剑。" },
          { show: { active: "left" }, say: ["主角", "五把剑只领一份回执。有个人想替五家同时说话，我倒想先听听递帖人怎么说。"] },
          { choice: [
            { text: "【护崖】盖回薄石，先用交接回执阻止冒领门帖", effect: { moral: 7, exp: 140, aff: { linghu: 10 }, setFlag: "xiao_ep2_done" }, reply: ["令狐冲", "待这阵过去，你再上山。石头不请客，我请你喝酒。"] },
            { text: "【先拓剑路】将破式摹走，预备拿它与黑木崖交易", effect: { moral: -7, exp: 120, item: "dan_chongmai", setFlag: "xiao_ep2_done", setFlag2: "xiao_wall_rubbing" }, reply: ["令狐冲", "纸上有三折，手上未必有三折。你拿它做买卖，莫把自己的剑也卖出去了。"] }
          ] }
        ]
      },
      {
        id: "xiao_ep3",
        title: "第三幕 · 五帖一印",
        hint: "前往「万安寺 · 万安寺外门」，拦下黛衣信使递出的五岳门帖。",
        reqFlag: "xiao_ep2_done",
        trigger: { region: "wanan", room: "wanan_gate", npc: "sect_messenger" },
        steps: [
          { nar: "黛衣信使把五只信筒插进香炉旁的细沙。你拿纸拓对准第三只筒的底部，筒底刻痕一毫不差，筒身的嵩山签却刚涂上浆。" },
          { show: { left: hero, right: "assets/npc-hermit.webp", active: "right" }, say: ["黛衣信使", "香烧尽，第二拨人才来。他们拿的剑是本派的，袖里的回帖却都得照同一个式样写。"] },
          { show: { active: "left" }, say: ["主角", "那就请你将五封排开。我认得笔画，不认剑。"] },
          { nar: "他用指节一敲，三封帖纸滑出筒底，另两封卡在内圈。你旋过卡住的信筒，倒出一张只盖半印的黑木崖通牌。" },
          { show: { active: "right" }, say: ["黛衣信使", "杨总管的人今夜换岗。这张牌能开铁索口，叫不叫得开成德殿，取决于你肯替谁报名字。"] },
          { nar: "塔门内响了两声铁环。信使踩灭炉边一颗火星，背过身去把门边的鞋印用脚尖抹平。" },
          { show: { active: "left" }, say: ["主角", "你去打水。回来若少了个筒，只说是我当面拿的。"] },
          { choice: [
            { text: "【打散并帖】将真正的五派回执分还各使，持原通牌上崖", effect: { moral: 9, exp: 150, aff: { renyingying: 10 }, setFlag: "xiao_ep3_done" }, reply: ["黛衣信使", "这回五筒分五处送，谁也休想拿一筒顶五次点卯。"] },
            { text: "【混入换岗】用同式回执换来席位和银牌，再扣下真的通牌", effect: { moral: -8, exp: 130, gold: 175, setFlag: "xiao_ep3_done", setFlag2: "xiao_false_dispatch" }, reply: ["主角", "让上头以为五家都照写了。开索的一刻，就是这张空帖最值钱的一刻。"] }
          ] }
        ]
      },
      {
        id: "xiao_ep4",
        title: "第四幕 · 成德殿针影",
        hint: "前往「黑木崖 · 成德殿」，与任我行一道揭开重帘。",
        reqFlag: "xiao_ep3_done",
        trigger: { region: "heimuya", room: "hm_hall", npc: "ren_woxing" },
        steps: [
          { nar: "铁索的余响还在脚下。任我行用指尖勾住重帘，你蹲下拨开帘脚一根红线，线上悬的银针原本正对脚踝。" },
          { show: { left: hero, right: "assets/npc-renwx.webp", active: "right" }, say: ["任我行", "老夫坐过石牢，听过铁门落闩。满殿人向他叫教主，他倒只肯应这一扇帘子里面的声音。"] },
          { ifFlag: "xiao_false_dispatch", say: ["任我行", "守索的见了你的假回执，一路给咱们开门。他若跟上来，要讨还这份功劳，你自己答他。"] },
          { unlessFlag: "xiao_false_dispatch", say: ["任我行", "你拆开送的五封信已到了三封。守索的不肯代五派落款，连那册投名簿也一并拿走了。"] },
          { nar: "帘内一点烛光斜过来。东方不败把绣圈搁在膝头，提起针尖在鬓边抿了一下，屏风边的杨莲亭用手拨开滚到脚下的线团。" },
          { show: { right: "assets/foe-dongfang.webp", active: "right" }, say: ["东方不败", "莲弟，你教他们轻些。到了这一步还只会吵，叫我如何收得匀这一针？"] },
          { show: { active: "left" }, say: ["主角", "山下人等着五岳的回帖，山上人等着教主的答复。把门打开罢，谁来问，便让谁自己听。"] },
          { nar: "任我行用掌风卷走帘子。你侧身挡住冲向琴案的一线银光，剑鞘上豁然添了一点闪亮的新孔。" },
          { show: { active: "right" }, say: ["东方不败", "好胆子。那支针试的是灯，这一支才试你的手。"] },
          { battle: "dongfang_boss", onWinFlag: "xiao_ep4_done", winReward: { exp: 220, item: "yulu" },
            winNar: "你格开疾针，殿中绣圈滚落。任我行要人合上殿门，任盈盈趁帘落从后门递来一张短笺：带琴回吊篮栈厅，她有话同你说。" }
        ]
      },
      {
        id: "xiao_ep5",
        title: "第五幕 · 崖栈合调",
        hint: "返回「黑木崖 · 吊篮栈厅」，把琴交给任盈盈。",
        reqFlag: "xiao_ep4_done",
        trigger: { region: "heimuya", room: "hm_gate", npc: "renyingying" },
        steps: [
          { nar: "你把琴匣放在门槛上，门槛竟随铁索往下轻轻一颤。任盈盈从衣襟取出断弦，将两头摆在琴枕正中。" },
          { show: { left: hero, right: ying, active: "right" }, say: ["任盈盈", "我爹叫人重钉门牌，送帖的每人都要叩一个头。你往后若再上崖，咱们从席间退，我领你走小路。"] },
          { show: { active: "left" }, say: ["主角", "这张琴没撞坏，我照你在竹巷弹的拨过一下。少的那半拍，还空着。"] },
          { nar: "她把断弦抽走，换上一根素弦。第一个散音撞上崖风，你托着琴尾，待铁索那阵急响过去，才往前递了一寸。" },
          { show: { active: "right" }, say: ["任盈盈", "有的半拍留给人接，有的半拍只好空着。旁人填上的，总觉得不合手。"] },
          { nar: "任盈盈将一本青线册塞入琴匣，揭开夹页，露出琴箫两行谱字和后面数张改过落款的江湖旧帖。" },
          { show: { active: "right" }, say: ["任盈盈", "我把曲谱与断帖缝成了《笑傲江湖》。你若听得懂曲，就也知道该在何处收声。"] },
          { choice: [
            { text: "【还曲江湖】将门帖公开归还，持谱与两人作别", effect: { moral: 11, exp: 395, tianshu: "xiao", aff: { renyingying: 16, linghu: 8 }, setFlag: "xiao_completed" }, reply: ["任盈盈", "收好。下回你到了绿竹巷，把帘绳拨开便进来，毋须门帖。"] },
            { text: "【藏去副印】抄下教中私印以备日后议价，带走天书", effect: { moral: -10, exp: 330, tianshu: "xiao", gold: 440, setFlag: "xiao_completed", setFlag2: "xiao_kept_seal" }, reply: ["任盈盈", "你要的是印，曲我仍旧给你。以后听见琴音，请想清楚再敲门。"] }
          ] }
        ]
      }
    ]
  });
})(window);
