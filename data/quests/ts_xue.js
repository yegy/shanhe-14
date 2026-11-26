(function (root) {
  "use strict";
  const JY = root.JY;
  const hero = "assets/hero-portrait.webp";
  const elder = "assets/npc-hermit.webp";
  const sword = "assets/npc-miaorf.webp";

  JY.registerQuest("ts_xue", {
    title: "雪山飞狐 · 冰梁一刀",
    tianshuId: "xue",
    summary: "长安西市捡来半口旧刀匣。踏入雪岭，听苗胡两家各话当年，在冰梁上给悬而未决的一刀留一个落处。",
    episodes: [
      {
        id: "xue_ep1",
        title: "第一幕 · 雪客叩箱",
        hint: "前往「长安城 · 西市胡商街」，同裴脚夫查验雪岭旧箱。",
        trigger: { region: "changan", room: "ca_market", npc: "snow_runner" },
        steps: [
          { nar: "裴脚夫把皮箱从驼背放下，背带一松，半捧旧雪从活扣里泻出来。你拢过一盏灯，灯影照出匣盖上一列被剐去的刀痕。" },
          { show: { left: hero, right: elder, active: "right" }, say: ["裴脚夫", "托运的人让我剐名字，可这口箱子一揭便有胡家的刀声，叫我瞒哪一个去？"] },
          { show: { active: "left" }, say: ["主角", "你撬开过？箱漆掉在外面，锁舌上倒没有硬扳过的印。"] },
          { nar: "裴脚夫将箱沿在阶上顿了两下，铁舌顿时缩回去。你拉住乱晃的背带，托出一只用青布裹着的刀鞘，鞘内只剩一截断刃。" },
          { show: { active: "right" }, say: ["裴脚夫", "匣底的字是我刚拿命换来的。关外绝壁有个姓苗的，人家喊他金面佛。你请他摸摸断面，我可不敢再背见了。"] },
          { nar: "你将断刃包回青布，绕开布上一枚暗红指印。裴脚夫去拽箱带，几次都摸错了扣眼。" },
          { choice: [
            { text: "【送还旧箱】写清过手人的记录，替脚夫携匣出关", effect: { moral: 7, exp: 120, item: "jinchuang", setFlag: "xue_ep1_done" }, reply: ["裴脚夫", "你只说匣子没添一刀。我见过的，便只有这一口匣。"] },
            { text: "【带价出关】把护送写成寻物买卖，取下押箱银", effect: { moral: -6, exp: 95, gold: 130, setFlag: "xue_ep1_done", setFlag2: "xue_box_deposit" }, reply: ["主角", "箱子跟我走。若两家都认，自有人愿出更高的价。"] }
          ] }
        ]
      },
      {
        id: "xue_ep2",
        title: "第二幕 · 苗刀指雪",
        hint: "到「雁门关 · 关外绝壁」，请苗人凤辨认断刃。",
        reqFlag: "xue_ep1_done",
        trigger: { region: "yanmen", room: "ym_cliff", npc: "miao_renfeng" },
        steps: [
          { nar: "苗人凤弯腰折下一枝冻草，拨开匣上雪水。你抽出刀鞘，他两指接过断口，指腹停在离刃一毫的位置。" },
          { show: { left: hero, right: sword, active: "right" }, say: ["苗人凤", "胡一刀和我换过兵器。他出刀前会收半步。这口刃先卷后断，当日遇上的便该是我。"] },
          { show: { active: "left" }, say: ["主角", "若这便是当年那刀，缝里为何还有暗绿色的沫？"] },
          { nar: "他把刀翻过来，你用刀鞘边沿挑开一层旧油纸，刀根显出指甲盖大的颜色。苗人凤将冻草折断，刚挨到锈处便把草抛了。" },
          { show: { active: "right" }, say: ["苗人凤", "我能把招数一式不误地比给你看，当年谁碰过刀，我却不能瞎猜。旧庄里有替人分别记话的，去听听她那一份。"] },
          { nar: "你将刃放回布上，苗人凤解下剑穗缚住匣口。风从绝壁下冒上来，他扶着石沿站了片刻，待你先迈出第一步。" },
          { choice: [
            { text: "【按证问话】以剑穗封好断刃，不把猜测写进证词", effect: { moral: 9, exp: 155, item: "yulu", setFlag: "xue_ep2_done" }, reply: ["苗人凤", "好。我做过的事由我认，旁人做过的，叫他也来认一认。"] },
            { text: "【先留暗证】暗取匣内药渍为筹码，只留封匣记录", effect: { moral: -7, exp: 120, gold: 175, setFlag: "xue_ep2_done", setFlag2: "xue_hidden_residue" }, reply: ["主角", "到旧庄我只摊一面。另一面，要有人肯把旧账翻开才看得见。"] }
          ] }
        ]
      },
      {
        id: "xue_ep3",
        title: "第三幕 · 旧庄分灯",
        hint: "前往「雁门关 · 雪岭旧庄」，与苗若兰对照证词。",
        reqFlag: "xue_ep2_done",
        trigger: { region: "yanmen", room: "ym_snow_lodge", npc: "miao_ruolan" },
        steps: [
          { nar: "苗若兰用火钳挪正灯罩。你把两份证词分别压在窗沿和桌面，窗缝吹来一口冷气，吹起两张纸上同一道缺角。" },
          { show: { left: hero, right: "assets/npc-maiden.webp", active: "right" }, say: ["苗若兰", "这一张写爹爹先劈，另一张写胡伯伯先挡。两人说得都响，谁也没写后来有人把兵刃收走。"] },
          { show: { active: "left" }, say: ["主角", "两处缺角都用浆糊补过，补纸里还有墨划。让我把灯挪近些。"] },
          { nar: "她将补纸按在灯罩旁，你执火钳托住另一角。纸一透亮，夹在里头的日期和雪岭冰梁西侧一行小字渐渐显形。" },
          { ifMate: "qiaofeng", show: { left: "assets/mate-qiaofeng.webp", active: "left" }, say: ["乔峰", "人都没站在那口刀边，落笔倒写得好生痛快。姑娘，乔某愿帮你把两张都带到当事人面前。"] },
          { show: { left: hero, active: "right" }, say: ["苗若兰", "你去罢。我把灯摆在西窗，风若放下，隔冰梁能看见一点黄光。"] },
          { nar: "你推紧北窗，反手支起西窗的木楔。她将字条折进灯下的空封套，一瓣冻住的红梅随纸掉在桌上。" },
          { choice: [
            { text: "【烹饪 Lv2】以灶间隔水温封的手法揭开旧浆，完整保住两份字迹", reqLife: { cook: 2 }, effect: { moral: 10, exp: 175, item: "dish_chicken", setFlag: "xue_ep3_done" }, reply: ["苗若兰", "两张都没糊。灶里还有一包干粮，到了梁上别让手先冻住。"] },
            { text: "【两说并传】封存两份证词，持灯号到冰梁赴约", effect: { moral: 8, exp: 140, setFlag: "xue_ep3_done" }, reply: ["苗若兰", "两纸并着送。少了一张，他们便还要再问几十年。"] },
            { text: "【握住缺角】收起有约期的补纸，先赴冰梁与胡斐议价", effect: { moral: -8, exp: 120, gold: 195, setFlag: "xue_ep3_done", setFlag2: "xue_took_appointment" }, reply: ["苗若兰", "留一只灯给我便是。少了字，桥那边也还有两个人要回来。"] }
          ] }
        ]
      },
      {
        id: "xue_ep4",
        title: "第四幕 · 一刀悬处",
        hint: "到「雁门关 · 雪岭冰梁」，将断刃和证词交给胡斐。",
        reqFlag: "xue_ep3_done",
        trigger: { region: "yanmen", room: "ym_snow_ridge", npc: "hu_fei" },
        steps: [
          { nar: "胡斐踏上冰梁，脚下清鸣一声。你把匣底抵住松根，抽下裹刀青布，另一头的苗人凤已经横剑向前。" },
          { show: { left: hero, right: "assets/npc-hufei.webp", active: "right" }, say: ["胡斐", "我若这一刀砍下去，叫声父亲容易，往后再问那人姓甚么便难了。"] },
          { ifFlag: "xue_took_appointment", say: ["胡斐", "你私下递来的字条说我该早来。我果然先踏上这口梁，进退却只剩这一尺。"] },
          { unlessFlag: "xue_took_appointment", say: ["胡斐", "若兰送来的两张证词，我都认了。苗大侠先请看第一张，第二张一会儿换我拿给你。"] },
          { show: { active: "left" }, say: ["主角", "断刃在松根下。药色、日子都在里头。你二人有一个先踏空，给我看的那一半便再也没人认。"] },
          { show: { left: hero, right: sword, active: "right" }, say: ["苗人凤", "好定力！你要替我们二人压住这口冰梁，先接苗某三招苗家剑，看你脚下稳不稳得住！"] },
          { battle: "miao_renfeng_boss", healBetween: 0.4, winReward: { exp: 220, gold: 140 }, winNar: "冰梁微颤而未折！你稳稳化解金面佛凌厉剑意，苗人凤长剑入鞘，颔首退开半步！" },
          { show: { left: hero, right: "assets/npc-hufei.webp", active: "right" }, nar: "梁底喀喇响了一阵，胡斐举刀停在半空，苗人凤退足也只退得半寸。你将青布抛向他们，西窗一豆微光这时照进雾隙。" },
          { show: { active: "right" }, say: ["胡斐", "灯还亮着。少侠，先替我收好《雪山飞狐》，我怕它比那口刀还经不起这一抖。"] },
          { nar: "他从贴胸处拨出一册，用刀背递过来。你夹住书封，见他手腕稍一送，刀锋越过一片碎雪，就此留在那片雪后。" },
          { show: { active: "left" }, say: ["主角", "书我收了。你要我给屋里人怎么回话，等你亲口说。"] },
          { choice: [
            { text: "【留灯候归】把进退留给二人，取天书返庄照看那盏灯", effect: { moral: 11, exp: 365, tianshu: "xue", legendary: "taxue_boots", setFlag: "xue_completed" }, reply: ["主角", "灯照不到的地方我不替它作证。只要有人回来，屋里就还留着火。"] },
            { text: "【收走断匣】将旧刃作为自己掌握的证物，带走天书", effect: { moral: -9, exp: 310, tianshu: "xue", gold: 410, setFlag: "xue_completed", setFlag2: "xue_kept_blade" }, reply: ["主角", "刀匣跟我下山。日后谁想知道匣里装的是什么，须得亲自来问。"] }
          ] }
        ]
      }
    ]
  });
})(window);
