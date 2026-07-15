<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Neon Alley — Arkadhallen</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  :root{
    --bg-void: #0b0714;
    --bg-void-2: #120a20;
    --bg-panel: #1a1030;
    --bg-panel-2: #241640;
    --neon-cyan: #2de2ff;
    --neon-magenta: #ff3f8e;
    --neon-amber: #ffb703;
    --neon-green: #39ff88;
    --text-light: #f2eefc;
    --text-dim: #a89bc4;
    --line: rgba(255,255,255,0.08);
  }
  *{box-sizing:border-box;}
  html,body{
    margin:0; padding:0; height:100%;
    background: radial-gradient(1200px 800px at 50% -10%, #201336 0%, var(--bg-void) 55%, #060309 100%);
    color: var(--text-light);
    font-family: 'Space Grotesk', sans-serif;
    overflow-x:hidden;
  }
  .mono{ font-family:'JetBrains Mono', monospace; }
  .pixel{ font-family:'Press Start 2P', monospace; }

  /* ---------- layout ---------- */
  #app{ min-height:100%; display:flex; flex-direction:column; align-items:center; padding: 28px 16px 70px; }
  .page-col{ width:100%; max-width: 980px; }

  /* ---------- marquee ---------- */
  .marquee{
    position:relative;
    padding: 20px 34px;
    border-radius: 14px;
    background: linear-gradient(180deg, var(--bg-panel-2), var(--bg-panel));
    border: 2px solid var(--line);
    box-shadow: 0 0 0 4px #000 inset, 0 20px 50px rgba(0,0,0,0.5);
    margin-bottom: 20px;
  }
  .marquee h1{
    margin:0;
    font-size: clamp(16px, 3.4vw, 30px);
    letter-spacing: 2px;
    color: var(--text-light);
    text-shadow: 0 0 8px var(--neon-cyan), 0 0 22px rgba(45,226,255,0.5);
    text-align:center;
  }
  .marquee .sub{
    text-align:center;
    color: var(--text-dim);
    font-size: 11px;
    margin-top: 8px;
    letter-spacing: 1px;
  }
  .bulbs{ position:absolute; inset:0; border-radius:14px; pointer-events:none; }
  .bulbs i{
    position:absolute; width:7px; height:7px; border-radius:50%;
    background: var(--neon-amber);
    box-shadow: 0 0 6px 2px var(--neon-amber);
    animation: chase 1.6s linear infinite;
    opacity:0.25;
  }
  @keyframes chase{ 0%,92%{opacity:0.15;} 96%,100%{opacity:1;} }

  /* ---------- HUD ---------- */
  .hud{
    display:flex; align-items:center; justify-content:space-between; gap:14px; flex-wrap:wrap;
    background: var(--bg-panel);
    border: 1px solid var(--line);
    border-radius: 14px;
    padding: 14px 18px;
    margin-bottom: 28px;
  }
  .hud .chipRow{ display:flex; gap:12px; flex-wrap:wrap; }
  .chip{
    display:flex; align-items:center; gap:10px;
    background: var(--bg-panel-2);
    border: 1px solid var(--line);
    padding: 9px 16px;
    border-radius: 10px;
    min-width: 140px;
  }
  .chip .ic{ font-size:20px; }
  .chip .lbl{ font-size:10px; color:var(--text-dim); letter-spacing:1px; text-transform:uppercase; }
  .chip .val{ font-size:20px; font-weight:700; }
  .chip.tokens .val{ color: var(--neon-cyan); text-shadow:0 0 10px rgba(45,226,255,0.5); }
  .chip.tickets .val{ color: var(--neon-amber); text-shadow:0 0 10px rgba(255,183,3,0.5); }

  .btn{
    font-family:'Space Grotesk', sans-serif;
    font-weight:600;
    border: none;
    border-radius: 8px;
    padding: 10px 16px;
    cursor:pointer;
    background: var(--neon-cyan);
    color: #05131a;
    transition: transform .12s ease, box-shadow .12s ease, opacity .12s ease;
    box-shadow: 0 0 0 rgba(45,226,255,0);
  }
  .btn:hover{ transform: translateY(-2px); box-shadow: 0 6px 18px rgba(45,226,255,0.35); }
  .btn:active{ transform: translateY(0px) scale(0.98); }
  .btn:disabled{ opacity:0.35; cursor:not-allowed; transform:none; box-shadow:none; }
  .btn.ghost{ background:transparent; color:var(--text-light); border:1px solid var(--line); }
  .btn.magenta{ background: var(--neon-magenta); color:#2a0011; }
  .btn.amber{ background: var(--neon-amber); color:#2a1a00; }

  .daily{ display:flex; align-items:center; gap:10px; }

  /* ---------- cabinet grid ---------- */
  .hallLabel{
    text-align:center; color:var(--text-dim); font-size:10.5px;
    letter-spacing:2px; text-transform:uppercase; margin-bottom:14px;
  }
  .hall{
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 20px;
    width: 100%;
    max-width: 980px;
  }
  .cabinet{
    position:relative;
    background: linear-gradient(160deg, var(--bg-panel-2), var(--bg-panel) 70%);
    border-radius: 16px;
    border: 1px solid var(--line);
    padding: 18px;
    cursor:pointer;
    overflow:hidden;
    transition: transform .18s ease, box-shadow .18s ease;
    min-height: 190px;
    display:flex; flex-direction:column; justify-content:space-between;
  }
  .cabinet:hover{ transform: translateY(-4px); }
  .cabinet .glow{
    position:absolute; top:-40%; left:50%; width:220px; height:220px;
    transform:translateX(-50%);
    border-radius:50%;
    filter: blur(40px);
    opacity:0.35;
    pointer-events:none;
  }
  .cabinet[data-glow="cyan"] .glow{ background: var(--neon-cyan); }
  .cabinet[data-glow="amber"] .glow{ background: var(--neon-amber); }
  .cabinet[data-glow="magenta"] .glow{ background: var(--neon-magenta); }
  .cabinet[data-glow="green"] .glow{ background: var(--neon-green); }
  .cabinet[data-glow="cyan"]:hover{ box-shadow: 0 10px 40px rgba(45,226,255,0.25); }
  .cabinet[data-glow="amber"]:hover{ box-shadow: 0 10px 40px rgba(255,183,3,0.25); }
  .cabinet[data-glow="magenta"]:hover{ box-shadow: 0 10px 40px rgba(255,63,142,0.25); }
  .cabinet[data-glow="green"]:hover{ box-shadow: 0 10px 40px rgba(57,255,136,0.25); }

  .cabinet .emoji{ font-size: 38px; }
  .cabinet h3{ margin: 10px 0 4px; font-size:16px; }
  .cabinet p{ margin:0; color:var(--text-dim); font-size:12.5px; line-height:1.4; }
  .cabinet .cost{
    margin-top:12px; font-size:11px; color:var(--text-dim);
    display:flex; justify-content:space-between; align-items:center;
  }
  .cabinet .cost b{ color:var(--neon-cyan); }

  footer.tip{ margin-top: 34px; color: var(--text-dim); font-size: 11.5px; text-align:center; max-width:600px; padding-bottom: 8px; }

  /* ---------- overlay ---------- */
  .overlay{
    position:fixed; inset:0; background: rgba(4,2,10,0.92);
    display:none; align-items:center; justify-content:center;
    z-index: 50; padding: 20px;
  }
  .overlay.active{ display:flex; }
  .game-panel{
    background: var(--bg-panel);
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 18px;
    width: 100%;
    max-width: 560px;
    display:flex; flex-direction:column; gap:12px;
    box-shadow: 0 30px 80px rgba(0,0,0,0.6);
  }
  .game-panel .gp-head{ display:flex; justify-content:space-between; align-items:center; }
  .game-panel .gp-head h2{ margin:0; font-size:16px; }
  .game-panel .gp-stats{ display:flex; gap:14px; font-size:12px; color:var(--text-dim); }
  .game-panel .gp-stats b{ color:var(--text-light); }
  .stage{
    background:#050308;
    border-radius: 10px;
    border: 1px solid var(--line);
    position:relative;
    overflow:hidden;
    touch-action:none;
  }
  .game-panel .gp-actions{ display:flex; justify-content:space-between; gap:10px; align-items:center; }
  .toast{
    position:fixed; top:16px; left:50%; transform:translateX(-50%);
    background: var(--bg-panel-2); border:1px solid var(--line); border-radius:10px;
    padding:10px 18px; font-size:13px; z-index:80; opacity:0; pointer-events:none;
    transition: opacity .25s ease, transform .25s ease;
  }
  .toast.show{ opacity:1; transform: translateX(-50%) translateY(6px); }

  /* whack-a-mole */
  .moleGrid{ display:grid; grid-template-columns:repeat(3,1fr); gap:10px; padding:14px; }
  .hole{
    position:relative; aspect-ratio:1/1; border-radius:50%;
    background: radial-gradient(circle at 50% 40%, #241640, #0b0714 70%);
    border: 2px solid var(--line);
    overflow:hidden; cursor:pointer;
  }
  .hole .mole{
    position:absolute; left:50%; bottom:-100%; width:72%; height:66%;
    transform: translateX(-50%);
    border-radius: 50% 50% 42% 42%;
    background: radial-gradient(circle at 35% 30%, var(--mole-color-2, #c98a55), var(--mole-color, #8b5e3c) 72%);
    transition: bottom .12s ease-out;
    box-shadow: inset 0 -6px 10px rgba(0,0,0,0.35);
  }
  .hole.up .mole{ bottom:8%; }

  .hole .mole .ear{
    position:absolute; top:-10%; width:24%; height:24%; border-radius:50%;
    background: var(--mole-color, #8b5e3c);
    box-shadow: inset 0 -3px 5px rgba(0,0,0,0.3);
  }
  .hole .mole .ear.ear-l{ left:6%; }
  .hole .mole .ear.ear-r{ right:6%; }
  .hole .mole .eye{
    position:absolute; top:36%; width:11%; height:14%; border-radius:50%;
    background: #1a1030;
  }
  .hole .mole .eye.eye-l{ left:26%; }
  .hole .mole .eye.eye-r{ right:26%; }
  .hole .mole .eye::after{
    content:""; position:absolute; top:15%; left:15%; width:35%; height:35%;
    border-radius:50%; background:rgba(255,255,255,0.85);
  }
  .hole .mole .snout{
    position:absolute; top:54%; left:50%; transform:translateX(-50%);
    width:34%; height:26%; border-radius:50%;
    background: var(--mole-color-2, #c98a55);
  }
  .hole .mole .nose{
    position:absolute; top:58%; left:50%; transform:translateX(-50%);
    width:13%; height:9%; border-radius:50%; background:#ff8fa3;
  }
  .hole .mole .whisker{
    position:absolute; top:62%; width:20%; height:2px; background:rgba(0,0,0,0.35);
  }
  .hole .mole .whisker.wl{ left:-6%; }
  .hole .mole .whisker.wr{ right:-6%; }

  .hole.skin-basic .mole{ --mole-color:#8b5e3c; --mole-color-2:#c98a55; }
  .hole.skin-fire .mole{ --mole-color:#e8542f; --mole-color-2:#ff9a5c; }
  .hole.gold .mole{ --mole-color:#e8971a; --mole-color-2:#ffe08a; }
  .hole.gold .mole .snout{ background: var(--mole-color-2); }

  .mod-row{ display:flex; align-items:center; gap:8px; flex-wrap:wrap; }

  /* upgrade shop */
  .upgradeGrid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(210px,1fr)); gap:10px; max-height:280px; overflow-y:auto; padding-right:4px; }
  .upgradeCard{
    background: var(--bg-panel-2); border:1px solid var(--line); border-radius:10px; padding:12px;
    display:flex; flex-direction:column; gap:6px;
  }
  .upgradeCard .uHead{ display:flex; align-items:center; gap:8px; }
  .upgradeCard .uIcon{ font-size:20px; }
  .upgradeCard .uName{ font-size:13px; font-weight:600; }
  .upgradeCard .uDesc{ font-size:11.5px; color:var(--text-dim); line-height:1.4; flex:1; }
  .upgradeCard .uCost{ font-size:11px; color:var(--neon-amber); }
  .exchangeRow{ display:flex; flex-wrap:wrap; gap:10px; }
  .exchangeCard{
    flex:1; min-width:140px;
    background: var(--bg-panel-2); border:1px solid var(--line); border-radius:10px; padding:12px;
    text-align:center; display:flex; flex-direction:column; gap:6px;
  }
  .exchangeCard .eRate{ font-size:13px; font-weight:600; }
  .exchangeCard .eSub{ font-size:10.5px; color:var(--text-dim); }

  /* basketball power bar */
  .powerBarWrap{
    position:relative; height:26px; background: var(--bg-void-2);
    border:1px solid var(--line); border-radius:6px; overflow:hidden;
  }
  .powerBarWrap .sweetZone{
    position:absolute; top:0; bottom:0; left:49%; width:18.5%;
    background: rgba(57,255,136,0.18);
    border-left: 1px dashed rgba(57,255,136,0.5);
    border-right: 1px dashed rgba(57,255,136,0.5);
  }
  .powerBarWrap .marker{
    position:absolute; top:0; bottom:0; width:4px; margin-left:-2px;
    background: var(--neon-green);
    box-shadow: 0 0 8px var(--neon-green);
    transition: box-shadow .1s ease, background .1s ease;
  }
  .powerBarWrap .marker.in-zone{
    width:6px; margin-left:-3px;
    background: #d9ffe9;
    box-shadow: 0 0 16px 4px var(--neon-green);
  }
  .mod-input{
    background: var(--bg-void-2); border:1px solid var(--line); border-radius:6px;
    padding:7px 9px; color:var(--text-light); font-family:'JetBrains Mono', monospace;
    font-size:12px; width:100px;
  }
  textarea.mod-json{
    width:100%; min-height:90px; background: var(--bg-void-2); border:1px solid var(--line);
    border-radius:8px; color:var(--text-light); font-family:'JetBrains Mono', monospace;
    font-size:10.5px; padding:8px; resize:vertical;
  }

  @media (max-width:480px){
    .chip{ min-width: 130px; padding:8px 12px; }
    .hud{ justify-content:center; }
    .hud .chipRow{ justify-content:center; width:100%; }
    .hud .daily{ width:100%; justify-content:center; }
    .hud .daily .btn{ width:100%; }
  }
</style>
</head>
<body>
<div id="app">

  <div class="page-col">
    <div class="marquee">
      <div class="bulbs" id="bulbs"></div>
      <h1 class="pixel">NEON ALLEY</h1>
      <div class="sub mono" id="titleLine">Arcade cabinets with chrome, neon and cheap thrills.</div>
    </div>

    <div class="hud">
      <div class="chipRow">
        <div class="chip tokens">
          <span class="ic">🪙</span>
          <div>
            <div class="lbl">Poletter</div>
            <div class="val mono" id="tokenVal">0</div>
          </div>
        </div>
        <div class="chip tickets">
          <span class="ic">🎟️</span>
          <div>
            <div class="lbl">Tickets</div>
            <div class="val mono" id="ticketVal">0</div>
          </div>
        </div>
      </div>
      <div class="daily">
        <button class="btn ghost" id="soundToggleBtn" onclick="toggleSound()" style="padding:9px 14px;">🔊</button>
        <button class="btn ghost" id="redeemOpenBtn" onclick="openRedeem()">🎁 Lös in kod</button>
        <button class="btn amber" id="dailyBtn">+10 Dagens bonus</button>
      </div>
    </div>

    <div class="hallLabel mono">Välj ditt spel</div>
  </div>

  <div class="hall">
    <div class="cabinet" data-glow="cyan" onclick="openGame('mole')">
      <div class="glow"></div>
      <div>
        <div class="emoji">🔨</div>
        <h3>Whack-a-Mole</h3>
        <p>Slå upp så många mullvadar du kan innan tiden tar slut. Gyllene mullvadar ger bonus.</p>
      </div>
      <div class="cost">Kostnad <b>3 🪙</b></div>
    </div>

    <div class="cabinet" data-glow="amber" onclick="openGame('pusher')">
      <div class="glow"></div>
      <div>
        <div class="emoji">🪙</div>
        <h3>Coin Pusher</h3>
        <p>Släpp mynt på plattan — nya mynt knuffar undan de gamla mot kanten. Mynt som faller av blir tickets.</p>
      </div>
      <div class="cost">Kostnad <b>1 🪙 / mynt</b></div>
    </div>

    <div class="cabinet" data-glow="magenta" onclick="openGame('breakout')">
      <div class="glow"></div>
      <div>
        <div class="emoji">🧱</div>
        <h3>Breakout</h3>
        <p>Klassikern. Studsa bollen, krossa tegelstenarna, håll den borta från golvet.</p>
      </div>
      <div class="cost">Kostnad <b>4 🪙</b></div>
    </div>

    <div class="cabinet" data-glow="green" onclick="openGame('basket')">
      <div class="glow"></div>
      <div>
        <div class="emoji">🏀</div>
        <h3>Basketball Shootout</h3>
        <p>Timing är allt. Skjut när power-mätaren träffar sweet spot innan tiden rinner ut.</p>
      </div>
      <div class="cost">Kostnad <b>3 🪙</b></div>
    </div>

    <div class="cabinet" data-glow="cyan" onclick="openShop()">
      <div class="glow"></div>
      <div>
        <div class="emoji">🛠️</div>
        <h3>Uppgraderingar</h3>
        <p>Byt tickets mot permanenta fördelar — mer tid, bättre odds, lägre priser — eller växla in dem mot poletter.</p>
      </div>
      <div class="cost">Byt in <b>tickets</b></div>
    </div>
  </div>

  <footer class="tip">Poletter kostar att spela minispel. Bra resultat ger tickets tillbaka. Allt sparas automatiskt i din webbläsare.</footer>
</div>

<div class="toast mono" id="toast"></div>

<!-- ============ OVERLAY: Whack-a-mole ============ -->
<div class="overlay" id="ov-mole">
  <div class="game-panel">
    <div class="gp-head">
      <h2 class="pixel" style="font-size:13px;">WHACK-A-MOLE</h2>
      <button class="btn ghost" onclick="closeGame('mole')">✕</button>
    </div>
    <div class="gp-stats mono">
      <div>Tid: <b id="moleTime">30</b>s</div>
      <div>Poäng: <b id="moleScore">0</b></div>
      <div>Bäst: <b id="moleBest">0</b></div>
    </div>
    <div class="stage">
      <div class="moleGrid" id="moleGrid"></div>
    </div>
    <div class="gp-actions">
      <span class="mono" style="font-size:11px;color:var(--text-dim);">Kostnad: 3 🪙</span>
      <button class="btn" id="moleStart" onclick="startMole()">Spela (3 🪙)</button>
    </div>
  </div>
</div>

<!-- ============ OVERLAY: Coin Pusher ============ -->
<div class="overlay" id="ov-pusher">
  <div class="game-panel">
    <div class="gp-head">
      <h2 class="pixel" style="font-size:13px;">COIN PUSHER</h2>
      <button class="btn ghost" onclick="closeGame('pusher')">✕</button>
    </div>
    <div class="gp-stats mono">
      <div>Mynt på plattan: <b id="pusherCoinCount">0</b></div>
      <div>Vunna tickets: <b id="pusherWon">0</b></div>
    </div>
    <div class="stage">
      <canvas id="pusherCanvas" width="520" height="360"></canvas>
    </div>
    <div class="gp-actions">
      <span class="mono" style="font-size:11px;color:var(--text-dim);">1 🪙 per mynt</span>
      <button class="btn amber" id="pusherDrop" onclick="dropCoin()">Släpp mynt (1 🪙)</button>
    </div>
  </div>
</div>

<!-- ============ OVERLAY: Breakout ============ -->
<div class="overlay" id="ov-breakout">
  <div class="game-panel">
    <div class="gp-head">
      <h2 class="pixel" style="font-size:13px;">BREAKOUT</h2>
      <button class="btn ghost" onclick="closeGame('breakout')">✕</button>
    </div>
    <div class="gp-stats mono">
      <div>Poäng: <b id="brkScore">0</b></div>
      <div>Liv: <b id="brkLives">3</b></div>
      <div>Bäst: <b id="brkBest">0</b></div>
    </div>
    <div class="stage">
      <canvas id="brkCanvas" width="520" height="360"></canvas>
    </div>
    <div class="gp-actions">
      <span class="mono" style="font-size:11px;color:var(--text-dim);" id="brkHint">Flytta musen / dra med fingret för att styra plattan</span>
      <button class="btn magenta" id="brkStart" onclick="startBreakout()">Spela (4 🪙)</button>
    </div>
  </div>
</div>

<!-- ============ OVERLAY: Basketball Shootout ============ -->
<div class="overlay" id="ov-basket">
  <div class="game-panel">
    <div class="gp-head">
      <h2 class="pixel" style="font-size:13px;">BASKETBALL SHOOTOUT</h2>
      <button class="btn ghost" onclick="closeGame('basket')">✕</button>
    </div>
    <div class="gp-stats mono">
      <div>Tid: <b id="baskTime">30</b>s</div>
      <div>Korgar: <b id="baskScore">0</b></div>
      <div>Streak: <b id="baskStreak">0</b></div>
      <div>Bäst: <b id="baskBest">0</b></div>
    </div>
    <div class="stage">
      <canvas id="baskCanvas" width="520" height="360"></canvas>
    </div>
    <div class="powerBarWrap">
      <div class="sweetZone" id="sweetZone"></div>
      <div class="marker" id="powerMarker" style="left:50%;"></div>
    </div>
    <div class="gp-actions">
      <span class="mono" style="font-size:11px;color:var(--text-dim);">Skjut när mätaren är i sweet spot</span>
      <div style="display:flex; gap:8px;">
        <button class="btn" style="background:var(--neon-green); color:#04240f;" id="baskShootBtn" onclick="shootBasket()" disabled>Skjut!</button>
        <button class="btn" id="baskStart" onclick="startBasket()">Spela (3 🪙)</button>
      </div>
    </div>
  </div>
</div>

<button id="modToggleBtn" class="btn ghost mono" onclick="openMod()" style="position:fixed; bottom:16px; right:16px; z-index:60; opacity:0.6; font-size:11px; display:none;">⚙️ Mod</button>

<!-- Code gate -->
<div class="overlay" id="ov-redeem">
  <div class="game-panel" style="max-width:320px;">
    <div class="gp-head">
      <h2 class="pixel" style="font-size:12px;">LÖS IN KOD</h2>
      <button class="btn ghost" onclick="closeRedeem()">✕</button>
    </div>
    <p style="margin:0;font-size:12px;color:var(--text-dim);">Har du fått en engångskod? Ange den här.</p>
    <input type="text" id="redeemCodeInput" class="mod-input" style="width:100%;text-transform:uppercase;" placeholder="KOD..." onkeypress="if(event.key==='Enter') submitRedeemCode()">
    <div class="mono" id="redeemError" style="display:none;color:var(--neon-magenta);font-size:11px;"></div>
    <button class="btn" id="redeemSubmitBtn" onclick="submitRedeemCode()">Lös in</button>
  </div>
</div>

<div class="overlay" id="ov-modauth">
  <div class="game-panel" style="max-width:320px;">
    <div class="gp-head">
      <h2 class="pixel" style="font-size:12px;">ÅTKOMSTKOD</h2>
      <button class="btn ghost" onclick="closeModAuth()">✕</button>
    </div>
    <p style="margin:0;font-size:12px;color:var(--text-dim);">Ange koden för att öppna mod-menyn.</p>
    <input type="password" id="modCodeInput" class="mod-input" style="width:100%;" placeholder="Kod..." onkeypress="if(event.key==='Enter') submitModCode()">
    <div class="mono" id="modAuthError" style="display:none;color:var(--neon-magenta);font-size:11px;">Fel kod, försök igen.</div>
    <button class="btn" onclick="submitModCode()">Lås upp</button>
  </div>
</div>

<div class="overlay" id="ov-mod">
  <div class="game-panel" style="max-width:460px;">
    <div class="gp-head">
      <h2 class="pixel" style="font-size:13px;">MOD-MENY</h2>
      <button class="btn ghost" onclick="closeMod()">✕</button>
    </div>
    <p style="margin:0; font-size:12px; color:var(--text-dim);">Bara för testning — påverkar din sparfil direkt.</p>

    <div class="mod-row">
      <button class="btn" onclick="modAdd('tokens',50)">+50 🪙</button>
      <button class="btn amber" onclick="modAdd('tickets',50)">+50 🎟️</button>
      <button class="btn ghost" onclick="modFillPusher(15)">+15 mynt i pusher</button>
    </div>

    <div class="mod-row">
      <input type="number" id="setTokensInput" class="mod-input" placeholder="Poletter">
      <button class="btn ghost" onclick="modSetTokens()">Sätt poletter</button>
    </div>
    <div class="mod-row">
      <input type="number" id="setTicketsInput" class="mod-input" placeholder="Tickets">
      <button class="btn ghost" onclick="modSetTickets()">Sätt tickets</button>
    </div>

    <div class="mod-row">
      <button class="btn ghost" onclick="modResetDaily()">Nollställ dagens bonus</button>
      <button class="btn ghost" onclick="modGrantBoosts()">+3 av varje boost</button>
    </div>

    <label class="mono" style="display:flex; align-items:center; gap:10px; font-size:12px; color:var(--text-dim);">
      <input type="checkbox" id="freePlayToggle" onchange="modToggleFreePlay(this.checked)">
      Gratisläge — alla spel kostar 0 poletter
    </label>
    <label class="mono" style="display:flex; align-items:center; gap:10px; font-size:12px; color:var(--text-dim);">
      <input type="checkbox" id="godModeToggle" onchange="modToggleGodMode(this.checked)">
      God mode — oändliga liv i Breakout
    </label>

    <div style="border-top:1px solid var(--line); padding-top:10px;">
      <div class="mono" style="font-size:11px; color:var(--text-dim); margin-bottom:6px;">Sparfil (JSON) — kopiera ut eller klistra in för att ladda</div>
      <textarea id="modJsonArea" class="mod-json mono"></textarea>
      <div class="mod-row" style="margin-top:8px;">
        <button class="btn ghost" onclick="modRefreshJson()">🔄 Uppdatera</button>
        <button class="btn ghost" onclick="modCopyJson()">Kopiera</button>
        <button class="btn amber" onclick="modLoadJson()">Ladda in</button>
      </div>
    </div>

    <button class="btn magenta" onclick="modReset()">Nollställ allt</button>
  </div>
</div>

<!-- ============ OVERLAY: Shop / Upgrades ============ -->
<div class="overlay" id="ov-shop">
  <div class="game-panel" style="max-width:640px;">
    <div class="gp-head">
      <h2 class="pixel" style="font-size:13px;">UPPGRADERINGAR</h2>
      <button class="btn ghost" onclick="closeShop()">✕</button>
    </div>
    <div class="gp-stats mono"><div>Dina tickets: <b id="shopTickets">0</b></div></div>

    <div>
      <div class="mono" style="font-size:11px; color:var(--text-dim); margin-bottom:8px; text-transform:uppercase; letter-spacing:1px;">Permanenta uppgraderingar</div>
      <div class="upgradeGrid" id="upgradeGrid"></div>
    </div>

    <div style="border-top:1px solid var(--line); padding-top:14px;">
      <div class="mono" style="font-size:11px; color:var(--text-dim); margin-bottom:8px; text-transform:uppercase; letter-spacing:1px;">Växla tickets → poletter</div>
      <div class="exchangeRow" id="exchangeRow"></div>
    </div>
  </div>
</div>

<script>
/* =====================================================================
   STATE
===================================================================== */
const STORAGE_KEY = "neonAlleySave_v1";

function defaultState(){
  return {
    tokens: 25,
    tickets: 0,
    lastDaily: null,
    freePlay: false,
    godMode: false,
    soundOn: true,
    highscores: { mole:0, breakout:0, basket:0 },
    boosts: {
      extraLife:0,
      moleTime:0,
      basketTime:0,
      luckyMole:0,
      coinBoost:0,
      sharpshooter:0,
      discount:0
    }
  };
}

let state = loadState();

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return Object.assign(defaultState(), parsed);
  }catch(e){
    return defaultState();
  }
}
function saveState(){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }catch(e){}
}

/* =====================================================================
   SOUND (Web Audio, no external files)
===================================================================== */
let audioCtx = null;
function getAudioCtx(){
  if(!audioCtx){
    const AC = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AC();
  }
  if(audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}
function playTone(freq, duration, type, volume, delay){
  if(!state.soundOn) return;
  try{
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type || "sine";
    osc.frequency.value = freq;
    const start = ctx.currentTime + (delay || 0);
    gain.gain.setValueAtTime(volume || 0.15, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + duration + 0.02);
  }catch(e){}
}
function sfxWhack(){ playTone(190,0.07,"square",0.16); playTone(95,0.09,"square",0.1,0.02); }
function sfxGoldWhack(){ playTone(520,0.08,"sine",0.18); playTone(780,0.1,"sine",0.15,0.05); }
function sfxCoinDrop(){ playTone(850,0.05,"sine",0.1); }
function sfxCoinWin(){ playTone(950,0.06,"sine",0.14); playTone(1250,0.08,"sine",0.14,0.06); }
function sfxBrick(){ playTone(320,0.05,"square",0.12); }
function sfxPaddle(){ playTone(220,0.05,"triangle",0.14); }
function sfxWallBounce(){ playTone(150,0.04,"triangle",0.08); }
function sfxLifeLost(){ playTone(120,0.3,"sawtooth",0.18); }
function sfxShoot(){ playTone(300,0.1,"sine",0.1); }
function sfxMake(){ playTone(660,0.08,"sine",0.18); playTone(880,0.1,"sine",0.18,0.08); playTone(1100,0.12,"sine",0.16,0.16); }
function sfxMiss(){ playTone(140,0.25,"sawtooth",0.16); }
function sfxDaily(){ playTone(440,0.08,"sine",0.14); playTone(660,0.1,"sine",0.14,0.08); }
function sfxPurchase(){ playTone(500,0.06,"sine",0.14); playTone(750,0.08,"sine",0.14,0.06); playTone(1000,0.1,"sine",0.14,0.12); }
function sfxExchange(){ playTone(600,0.05,"triangle",0.12); playTone(400,0.06,"triangle",0.12,0.05); }
function sfxRecord(){ playTone(700,0.08,"sine",0.16); playTone(1050,0.1,"sine",0.16,0.08); playTone(1400,0.14,"sine",0.14,0.16); }
function sfxError(){ playTone(160,0.12,"square",0.12); }

function toggleSound(){
  state.soundOn = !state.soundOn;
  saveState();
  document.getElementById("soundToggleBtn").textContent = state.soundOn ? "🔊" : "🔇";
  if(state.soundOn) playTone(600,0.05,"sine",0.12);
}

function refreshHud(){
  document.getElementById("tokenVal").textContent = state.tokens;
  document.getElementById("ticketVal").textContent = state.tickets;
  document.getElementById("soundToggleBtn").textContent = state.soundOn ? "🔊" : "🔇";
  const dBtn = document.getElementById("dailyBtn");
  if(canClaimDaily()){ dBtn.disabled = false; dBtn.textContent = "+10 Dagens bonus"; }
  else { dBtn.disabled = true; dBtn.textContent = "Bonus insamlad idag"; }
}

function canClaimDaily(){
  if(!state.lastDaily) return true;
  const last = new Date(state.lastDaily);
  const now = new Date();
  return last.toDateString() !== now.toDateString();
}

document.getElementById("dailyBtn").addEventListener("click", ()=>{
  if(!canClaimDaily()) return;
  state.tokens += 10;
  state.lastDaily = new Date().toISOString();
  saveState(); refreshHud();
  sfxDaily();
  showToast("+10 poletter — kom tillbaka imorgon för mer!");
});

function showToast(msg){
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(()=>t.classList.remove("show"), 1800);
}

/* build chasing marquee bulbs */
(function initBulbs(){
  const wrap = document.getElementById("bulbs");
  const n = 28;
  for(let i=0;i<n;i++){
    const b = document.createElement("i");
    const t = i/n;
    // distribute around perimeter roughly (rectangle approximation)
    let x,y;
    if(t < 0.25){ x = t/0.25*100; y = 0; }
    else if(t < 0.5){ x = 100; y = (t-0.25)/0.25*100; }
    else if(t < 0.75){ x = 100-(t-0.5)/0.25*100; y = 100; }
    else { x = 0; y = 100-(t-0.75)/0.25*100; }
    b.style.left = x+"%"; b.style.top = y+"%";
    b.style.animationDelay = (i*0.06)+"s";
    wrap.appendChild(b);
  }
})();

/* =====================================================================
   MOD MENU (testing helpers) — admin only
   Uses the same "shelf.gh.token" the main portal sets once the owner
   connects their GitHub account in the admin panel (⚙, Ctrl+Alt+C).
   Since games are served from the same origin as the portal, this
   localStorage key is visible here too — so only the portal owner's
   own browser ever sees the mod button at all.
===================================================================== */
const MOD_CODE = "1337";
let modUnlocked = false;

function isPortalAdmin(){
  try { return !!localStorage.getItem("shelf.gh.token"); }
  catch(e){ return false; }
}

function refreshModButtonVisibility(){
  const btn = document.getElementById("modToggleBtn");
  if (btn) btn.style.display = isPortalAdmin() ? "block" : "none";
}
refreshModButtonVisibility();

function openMod(){
  if(!isPortalAdmin()) return; // safety net even if someone calls this directly
  if(modUnlocked){ showModPanel(); return; }
  document.getElementById("modCodeInput").value = "";
  document.getElementById("modAuthError").style.display = "none";
  document.getElementById("ov-modauth").classList.add("active");
  setTimeout(()=>document.getElementById("modCodeInput").focus(), 60);
}
function closeModAuth(){ document.getElementById("ov-modauth").classList.remove("active"); }

/* ---------------------------------------------------------------------
   REDEEM CODE — one-time currency codes created by the portal owner
   in the admin panel. Talks to the same Worker as the leaderboard
   (WORKER_URL comes from ../../worker-config.js).
--------------------------------------------------------------------- */
function openRedeem(){
  document.getElementById("redeemCodeInput").value = "";
  document.getElementById("redeemError").style.display = "none";
  document.getElementById("ov-redeem").classList.add("active");
  setTimeout(()=>document.getElementById("redeemCodeInput").focus(), 60);
}
function closeRedeem(){ document.getElementById("ov-redeem").classList.remove("active"); }

async function submitRedeemCode(){
  const errorEl = document.getElementById("redeemError");
  const btn = document.getElementById("redeemSubmitBtn");
  const code = document.getElementById("redeemCodeInput").value.trim().toUpperCase();
  errorEl.style.display = "none";
  if (!code) return;

  if (typeof WORKER_URL === "undefined" || WORKER_URL.includes("REPLACE-ME")){
    errorEl.textContent = "Koder är inte påslaget än på den här sidan.";
    errorEl.style.display = "block";
    return;
  }

  btn.disabled = true;
  try {
    const res = await fetch(`${WORKER_URL}/codes/redeem`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, game: "neon-alley" })
    });
    const data = await res.json();
    if (!res.ok){
      errorEl.textContent = data.error === "already used" ? "Koden är redan använd."
        : data.error === "wrong game" ? "Den koden är inte för det här spelet."
        : "Ogiltig kod.";
      errorEl.style.display = "block";
      return;
    }
    if (data.currency === "tokens") state.tokens += data.amount;
    else if (data.currency === "tickets") state.tickets += data.amount;
    saveState();
    refreshHud();
    closeRedeem();
    showToast(`+${data.amount} ${data.currency === "tokens" ? "poletter" : "tickets"} inlöst!`);
  } catch (e){
    errorEl.textContent = "Kunde inte nå servern just nu — testa igen om en stund.";
    errorEl.style.display = "block";
  } finally {
    btn.disabled = false;
  }
}
function submitModCode(){
  const val = document.getElementById("modCodeInput").value.trim();
  if(val === MOD_CODE){
    modUnlocked = true;
    closeModAuth();
    showModPanel();
  } else {
    document.getElementById("modAuthError").style.display = "block";
  }
}
function showModPanel(){
  document.getElementById("freePlayToggle").checked = !!state.freePlay;
  document.getElementById("godModeToggle").checked = !!state.godMode;
  modRefreshJson();
  document.getElementById("ov-mod").classList.add("active");
}
function closeMod(){ document.getElementById("ov-mod").classList.remove("active"); }

function modAdd(kind, amount){
  state[kind] += amount;
  saveState(); refreshHud();
  showToast(`+${amount} ${kind === "tokens" ? "🪙 poletter" : "🎟️ tickets"} (mod)`);
}
function modSetTokens(){
  const v = parseInt(document.getElementById("setTokensInput").value, 10);
  if(isNaN(v) || v < 0) return;
  state.tokens = v; saveState(); refreshHud();
  showToast(`Poletter satta till ${v} (mod)`);
}
function modSetTickets(){
  const v = parseInt(document.getElementById("setTicketsInput").value, 10);
  if(isNaN(v) || v < 0) return;
  state.tickets = v; saveState(); refreshHud();
  showToast(`Tickets satta till ${v} (mod)`);
}
function modFillPusher(n){
  seedPusherCoins(n);
  const el = document.getElementById("pusherCoinCount");
  if(el) el.textContent = pusherCoins.length;
  showToast(`+${n} mynt lagda i Coin Pusher (mod)`);
}
function modResetDaily(){
  state.lastDaily = null;
  saveState(); refreshHud();
  showToast("Dagens bonus nollställd (mod)");
}
function modGrantBoosts(){
  BOOSTS.forEach(u=>{ state.boosts[u.id] = (state.boosts[u.id] || 0) + 3; });
  saveState(); refreshHud();
  showToast("+3 av varje boost tilldelade (mod)");
}
function modReset(){
  if(!confirm("Nollställ hela sparfilen? Detta går inte att ångra.")) return;
  state = defaultState();
  saveState(); refreshHud();
  closeMod();
  showToast("Sparfilen nollställd");
}
function modToggleFreePlay(checked){
  state.freePlay = checked;
  saveState();
  showToast(checked ? "Gratisläge på — spel kostar 0 poletter" : "Gratisläge av");
}
function modToggleGodMode(checked){
  state.godMode = checked;
  saveState();
  if(brkState){
    document.getElementById("brkLives").textContent = checked ? "∞" : brkState.lives;
  }
  showToast(checked ? "God mode på — oändliga liv i Breakout" : "God mode av");
}
function modRefreshJson(){
  document.getElementById("modJsonArea").value = JSON.stringify(state, null, 2);
}
function modCopyJson(){
  const area = document.getElementById("modJsonArea");
  area.select();
  navigator.clipboard?.writeText(area.value).then(()=>{
    showToast("Sparfil kopierad till urklipp");
  }).catch(()=>{
    showToast("Kunde inte kopiera automatiskt — markera och kopiera manuellt");
  });
}
function modLoadJson(){
  const raw = document.getElementById("modJsonArea").value;
  try{
    const parsed = JSON.parse(raw);
    state = Object.assign(defaultState(), parsed);
    saveState(); refreshHud();
    document.getElementById("freePlayToggle").checked = !!state.freePlay;
    document.getElementById("godModeToggle").checked = !!state.godMode;
    showToast("Sparfil inladdad (mod)");
  }catch(e){
    showToast("Ogiltig JSON — kunde inte ladda");
  }
}

/* =====================================================================
   OVERLAY HELPERS
===================================================================== */
function openGame(id){
  document.getElementById("ov-"+id).classList.add("active");
  if(id === "mole") resetMoleUI();
  if(id === "pusher") initPusherIfNeeded();
  if(id === "breakout") resetBreakoutUI();
  if(id === "basket") resetBasketUI();
}
function closeGame(id){
  document.getElementById("ov-"+id).classList.remove("active");
  if(id === "mole") stopMole();
  if(id === "breakout") stopBreakout();
  if(id === "basket") stopBasket();
}

/* =====================================================================
   BOOST SHOP — consumable, single-use boosts (not permanent)
===================================================================== */
const BOOSTS = [
  { id:"extraLife", icon:"❤️", name:"Extra liv", cost:10,
    desc:"Nästa Breakout-runda börjar med 4 liv istället för 3." },
  { id:"moleTime", icon:"⏱️", name:"Längre mullvadsjakt", cost:8,
    desc:"Nästa Whack-a-Mole-runda blir 35 sekunder istället för 30." },
  { id:"basketTime", icon:"⏱️", name:"Längre matchtid", cost:8,
    desc:"Nästa Basketball-runda blir 35 sekunder istället för 30." },
  { id:"luckyMole", icon:"🍀", name:"Turmullvad", cost:10,
    desc:"Nästa Whack-a-Mole-runda: nästan dubbla chansen för gyllene mullvad." },
  { id:"coinBoost", icon:"💰", name:"Myntbonus", cost:12,
    desc:"De nästa 5 mynten som faller av kanten i Coin Pusher ger fler tickets.", uses:5 },
  { id:"sharpshooter", icon:"🎯", name:"Prickskytt", cost:10,
    desc:"Nästa Basketball-runda: betydligt bredare sweet spot." },
  { id:"discount", icon:"🏷️", name:"Rabattmärke", cost:12,
    desc:"1 polett rabatt på nästa runda i valfritt spel (Mole/Breakout/Basket)." },
];

const EXCHANGES = [
  { tickets:10, tokens:5,  label:"Liten" },
  { tickets:25, tokens:16, label:"Medel" },
  { tickets:50, tokens:35, label:"Stor" },
];

function openShop(){
  renderShop();
  document.getElementById("ov-shop").classList.add("active");
}
function closeShop(){ document.getElementById("ov-shop").classList.remove("active"); }

function renderShop(){
  document.getElementById("shopTickets").textContent = state.tickets;

  const grid = document.getElementById("upgradeGrid");
  grid.innerHTML = "";
  BOOSTS.forEach(u=>{
    const owned = state.boosts[u.id] || 0;
    const card = document.createElement("div");
    card.className = "upgradeCard";
    card.innerHTML = `
      <div class="uHead"><span class="uIcon">${u.icon}</span><span class="uName">${u.name}</span></div>
      <div class="uDesc">${u.desc}</div>
      <div class="uCost">Du har: ${owned} st</div>
      <button class="btn amber" ${state.tickets < u.cost ? "disabled" : ""} onclick="buyBoost('${u.id}')">Köp 1 (${u.cost} 🎟️)</button>
    `;
    grid.appendChild(card);
  });

  const exRow = document.getElementById("exchangeRow");
  exRow.innerHTML = "";
  EXCHANGES.forEach(ex=>{
    const card = document.createElement("div");
    card.className = "exchangeCard";
    card.innerHTML = `
      <div class="eRate">${ex.tickets} 🎟️ → ${ex.tokens} 🪙</div>
      <div class="eSub">${ex.label} växling</div>
      <button class="btn" ${state.tickets < ex.tickets ? "disabled" : ""} onclick="exchangeTickets(${ex.tickets},${ex.tokens})">Växla</button>
    `;
    exRow.appendChild(card);
  });
}

function buyBoost(id){
  const u = BOOSTS.find(x=>x.id===id);
  if(!u) return;
  if(state.tickets < u.cost) return;
  state.tickets -= u.cost;
  state.boosts[id] = (state.boosts[id] || 0) + (u.uses || 1);
  saveState(); refreshHud(); renderShop();
  sfxPurchase();
  showToast("Köpt: " + u.name);
}

function exchangeTickets(ticketsCost, tokensGain){
  if(state.tickets < ticketsCost) return;
  state.tickets -= ticketsCost;
  state.tokens += tokensGain;
  saveState(); refreshHud(); renderShop();
  sfxExchange();
  showToast(`Växlade ${ticketsCost} 🎟️ → ${tokensGain} 🪙`);
}

/* =====================================================================
   GAME 1: WHACK-A-MOLE
===================================================================== */
let moleState = { running:false, score:0, timeLeft:30, timerId:null, popTimeout:null, holes:[] };

function resetMoleUI(){
  const grid = document.getElementById("moleGrid");
  grid.innerHTML = "";
  moleState.holes = [];
  const skinClass = "skin-basic";
  for(let i=0;i<9;i++){
    const hole = document.createElement("div");
    hole.className = "hole " + skinClass;
    hole.innerHTML = `<div class="mole">
        <span class="ear ear-l"></span>
        <span class="ear ear-r"></span>
        <span class="eye eye-l"></span>
        <span class="eye eye-r"></span>
        <span class="snout"></span>
        <span class="nose"></span>
        <span class="whisker wl"></span>
        <span class="whisker wr"></span>
      </div>`;
    hole.addEventListener("click", ()=>whackHole(i));
    grid.appendChild(hole);
    moleState.holes.push(hole);
  }
  const cost = state.boosts.discount > 0 ? 2 : 3;
  document.getElementById("moleScore").textContent = "0";
  document.getElementById("moleBest").textContent = state.highscores.mole;
  document.getElementById("moleTime").textContent = state.boosts.moleTime > 0 ? "35" : "30";
  document.getElementById("moleStart").disabled = false;
  document.getElementById("moleStart").textContent = `Spela (${cost} 🪙)`;
}

function startMole(){
  if(moleState.running) return;
  const discountActive = state.boosts.discount > 0;
  const moleTimeActive = state.boosts.moleTime > 0;
  const luckyActive = state.boosts.luckyMole > 0;
  const cost = discountActive ? 2 : 3;
  if(!state.freePlay){
    if(state.tokens < cost){ showToast("Inte tillräckligt med poletter."); return; }
    state.tokens -= cost;
  }
  // consume the boosts for this round
  if(discountActive) state.boosts.discount--;
  if(moleTimeActive) state.boosts.moleTime--;
  if(luckyActive) state.boosts.luckyMole--;
  saveState(); refreshHud();

  moleState.running = true;
  moleState.score = 0;
  moleState.luckyActive = luckyActive;
  moleState.timeLeft = moleTimeActive ? 35 : 30;
  document.getElementById("moleScore").textContent = "0";
  document.getElementById("moleTime").textContent = moleState.timeLeft;
  document.getElementById("moleStart").disabled = true;
  document.getElementById("moleStart").textContent = "Spelar...";

  moleState.timerId = setInterval(()=>{
    moleState.timeLeft--;
    document.getElementById("moleTime").textContent = moleState.timeLeft;
    if(moleState.timeLeft <= 0) endMole();
  }, 1000);

  scheduleMolePop();
}

function scheduleMolePop(){
  if(!moleState.running) return;
  const delay = 350 + Math.random()*550;
  moleState.popTimeout = setTimeout(()=>{
    if(!moleState.running) return;
    const idx = Math.floor(Math.random()*9);
    const hole = moleState.holes[idx];
    const goldChance = moleState.luckyActive ? 0.28 : 0.15;
    const isGold = Math.random() < goldChance;
    hole.classList.toggle("gold", isGold);
    hole.classList.add("up");
    hole.dataset.active = "1";
    const upTime = 550 + Math.random()*400;
    setTimeout(()=>{
      if(hole.dataset.active === "1"){
        hole.classList.remove("up");
        hole.dataset.active = "0";
      }
    }, upTime);
    scheduleMolePop();
  }, delay);
}

function whackHole(idx){
  if(!moleState.running) return;
  const hole = moleState.holes[idx];
  if(hole.dataset.active === "1"){
    const gold = hole.classList.contains("gold");
    moleState.score += gold ? 5 : 1;
    document.getElementById("moleScore").textContent = moleState.score;
    hole.classList.remove("up","gold");
    hole.dataset.active = "0";
    gold ? sfxGoldWhack() : sfxWhack();
  }
}

function stopMole(){
  moleState.running = false;
  clearInterval(moleState.timerId);
  clearTimeout(moleState.popTimeout);
}

function endMole(){
  stopMole();
  const ticketsWon = Math.floor(moleState.score/2);
  state.tickets += ticketsWon;
  const cost = state.boosts.discount > 0 ? 2 : 3;
  let recordMsg = "";
  if(moleState.score > state.highscores.mole){
    state.highscores.mole = moleState.score;
    document.getElementById("moleBest").textContent = state.highscores.mole;
    recordMsg = " 🏆 Nytt rekord!";
    sfxRecord();
  }
  saveState(); refreshHud();
  document.getElementById("moleStart").disabled = false;
  document.getElementById("moleStart").textContent = `Spela igen (${cost} 🪙)`;
  showToast(`Tiden är ute! Poäng: ${moleState.score} → +${ticketsWon} 🎟️${recordMsg}`);
}

/* =====================================================================
   GAME 2: COIN PUSHER
===================================================================== */
let pusherCtx = null;
let pusherInited = false;
let pusherCoins = [];
let pusherWonTotal = 0;
let pusherRAF = null;
let pusherT = 0;

const PUSHER_W = 520, PUSHER_H = 360;
const PUSHER_MIN_Y = 130, PUSHER_MAX_Y = 190;
const EDGE_Y = 320;
const COIN_R = 11;

function initPusherIfNeeded(){
  if(pusherInited) return;
  pusherInited = true;
  const canvas = document.getElementById("pusherCanvas");
  canvas.width = PUSHER_W; canvas.height = PUSHER_H;
  pusherCtx = canvas.getContext("2d");
  pusherWonTotal = 0;
  document.getElementById("pusherWon").textContent = "0";
  seedPusherCoins(22);
  pusherLoop();
}

function seedPusherCoins(count){
  // like a real coin pusher, the tray already has coins at different push stages
  for(let i=0;i<count;i++){
    const stage = Math.random(); // 0 = just dropped, 1 = about to fall
    const pushedMark = 100 + stage * (EDGE_Y - 100 - 14);
    pusherCoins.push({
      x: 40 + Math.random()*(PUSHER_W-80),
      y: pushedMark + (Math.random()*6-3),
      vy: 0,
      pushedMark: pushedMark,
      settled: true,
      boosted: false
    });
  }
}

function coinEmojiColor(){
  return "#ffb703";
}

function dropCoin(){
  if(!state.freePlay){
    if(state.tokens < 1){ showToast("Inte tillräckligt med poletter."); return; }
    state.tokens -= 1;
  }
  let boosted = false;
  if(state.boosts.coinBoost > 0){
    boosted = true;
    state.boosts.coinBoost--;
  }
  saveState(); refreshHud();
  sfxCoinDrop();
  pusherCoins.push({
    x: 60 + Math.random()*(PUSHER_W-120),
    y: 20,
    vy: 0,
    pushedMark: 0,
    settled:false,
    boosted: boosted
  });
}

function resolvePusherCollisions(){
  // coins can't overlap much — a coin sharing a "lane" with one behind it
  // gets shoved forward, so dropping a new coin physically pushes the pile
  const MIN_GAP = COIN_R * 1.7;
  const SAME_LANE = COIN_R * 1.6;
  const settled = pusherCoins.filter(c=>c.settled).sort((a,b)=>a.y-b.y);
  for(let i=0;i<settled.length;i++){
    const behind = settled[i];
    for(let j=i+1;j<settled.length;j++){
      const ahead = settled[j];
      if(Math.abs(behind.x - ahead.x) < SAME_LANE){
        const gap = ahead.y - behind.y;
        if(gap >= 0 && gap < MIN_GAP){
          const push = MIN_GAP - gap;
          ahead.y += push;
          ahead.pushedMark = Math.max(ahead.pushedMark, ahead.y);
        }
      }
    }
  }
}

function pusherLoop(){
  pusherT += 0.035;
  const pusherFrontY = PUSHER_MIN_Y + (PUSHER_MAX_Y-PUSHER_MIN_Y) * (0.5 + 0.5*Math.sin(pusherT));

  // physics
  for(const c of pusherCoins){
    if(!c.settled){
      c.vy += 0.6;
      c.y += c.vy;
      if(c.y >= 100){
        c.y = 100;
        c.vy = 0;
        c.settled = true;
        c.pushedMark = 100;
      }
    } else {
      // ratchet forward when the pusher's forward reach passes this coin's mark
      if(pusherFrontY > c.pushedMark){
        c.pushedMark = pusherFrontY;
        c.y = Math.min(PUSHER_H+20, c.pushedMark + (Math.random()*6-3));
      }
    }
  }
  // coins physically push each other forward when packed too tightly —
  // this means every new coin dropped shoves the pile closer to the edge
  resolvePusherCollisions();

  // remove coins past the edge -> tickets
  const remaining = [];
  let roundWon = 0;
  for(const c of pusherCoins){
    if(c.y >= EDGE_Y){
      const bonus = c.boosted ? 1 : 0;
      const won = 1 + bonus + Math.floor(Math.random()*3);
      pusherWonTotal += won;
      roundWon += won;
      state.tickets += won;
    } else {
      remaining.push(c);
    }
  }
  if(roundWon > 0){
    saveState(); refreshHud();
    document.getElementById("pusherWon").textContent = pusherWonTotal;
    sfxCoinWin();
    showToast(`Mynt föll av kanten! +${roundWon} 🎟️`);
  }
  pusherCoins = remaining;
  document.getElementById("pusherCoinCount").textContent = pusherCoins.length;

  drawPusher(pusherFrontY);
  pusherRAF = requestAnimationFrame(pusherLoop);
}

function drawPusher(pusherFrontY){
  const ctx = pusherCtx;
  ctx.clearRect(0,0,PUSHER_W,PUSHER_H);
  // back wall / drop chute
  ctx.fillStyle = "#0f0a1c";
  ctx.fillRect(0,0,PUSHER_W,40);
  ctx.fillStyle = "#241640";
  ctx.fillRect(0,40,PUSHER_W,PUSHER_H-40);
  // edge zone (winning area)
  ctx.fillStyle = "rgba(255,183,3,0.08)";
  ctx.fillRect(0,EDGE_Y,PUSHER_W,PUSHER_H-EDGE_Y);
  ctx.strokeStyle = "rgba(255,183,3,0.5)";
  ctx.beginPath(); ctx.moveTo(0,EDGE_Y); ctx.lineTo(PUSHER_W,EDGE_Y); ctx.stroke();

  // pusher bar
  ctx.fillStyle = "#5c5470";
  ctx.fillRect(30, pusherFrontY-10, PUSHER_W-60, 14);
  ctx.fillStyle = "#8b81a3";
  ctx.fillRect(30, pusherFrontY-10, PUSHER_W-60, 4);

  // coins
  const color = coinEmojiColor();
  for(const c of pusherCoins){
    ctx.beginPath();
    ctx.arc(c.x, c.y, COIN_R, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.35)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

/* =====================================================================
   GAME 3: BREAKOUT
===================================================================== */
let brkCtx = null;
let brkRAF = null;
let brkState = null;

const BRK_W = 520, BRK_H = 360;
const PADDLE_W = 84, PADDLE_H = 12;
const BALL_R = 7;
const BRICK_ROWS = 5, BRICK_COLS = 9;
const BRICK_W = 52, BRICK_H = 18, BRICK_GAP = 4, BRICK_TOP = 36, BRICK_LEFT = 10;
const BRICK_COLORS = ["#ff3f8e","#ff7ab6","#ffb703","#2de2ff","#7be0ff"];

function resetBreakoutUI(){
  const canvas = document.getElementById("brkCanvas");
  canvas.width = BRK_W; canvas.height = BRK_H;
  brkCtx = canvas.getContext("2d");
  const cost = state.boosts.discount > 0 ? 3 : 4;
  const startLives = state.boosts.extraLife > 0 ? 4 : 3;
  document.getElementById("brkScore").textContent = "0";
  document.getElementById("brkLives").textContent = String(startLives);
  document.getElementById("brkBest").textContent = state.highscores.breakout;
  document.getElementById("brkStart").disabled = false;
  document.getElementById("brkStart").textContent = `Spela (${cost} 🪙)`;
  drawBreakoutIdle();
}

function ballColor(){
  return "#2de2ff";
}

function buildBricks(){
  const bricks = [];
  for(let r=0;r<BRICK_ROWS;r++){
    for(let c=0;c<BRICK_COLS;c++){
      bricks.push({
        x: BRICK_LEFT + c*(BRICK_W+BRICK_GAP),
        y: BRICK_TOP + r*(BRICK_H+BRICK_GAP),
        alive:true,
        color: BRICK_COLORS[r % BRICK_COLORS.length],
        points: (BRICK_ROWS-r)*2
      });
    }
  }
  return bricks;
}

function drawBreakoutIdle(){
  const ctx = brkCtx;
  ctx.clearRect(0,0,BRK_W,BRK_H);
  ctx.fillStyle = "#0f0a1c";
  ctx.fillRect(0,0,BRK_W,BRK_H);
  ctx.fillStyle = "rgba(242,238,252,0.5)";
  ctx.font = "13px 'Space Grotesk', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Tryck Spela för att börja", BRK_W/2, BRK_H/2);
}

function startBreakout(){
  if(brkState && brkState.running) return;
  const discountActive = state.boosts.discount > 0;
  const extraLifeActive = state.boosts.extraLife > 0;
  const cost = discountActive ? 3 : 4;
  if(!state.freePlay){
    if(state.tokens < cost){ showToast("Inte tillräckligt med poletter."); return; }
    state.tokens -= cost;
  }
  if(discountActive) state.boosts.discount--;
  if(extraLifeActive) state.boosts.extraLife--;
  saveState(); refreshHud();

  const startLives = extraLifeActive ? 4 : 3;
  brkState = {
    running:true,
    score:0,
    lives:startLives,
    bricks: buildBricks(),
    paddleX: BRK_W/2 - PADDLE_W/2,
    ball: { x: BRK_W/2, y: BRK_H-60, vx: 3.2, vy: -3.6 }
  };
  document.getElementById("brkScore").textContent = "0";
  document.getElementById("brkLives").textContent = state.godMode ? "∞" : String(startLives);
  document.getElementById("brkStart").disabled = true;
  document.getElementById("brkStart").textContent = "Spelar...";

  brkLoop();
}

function stopBreakout(){
  if(brkState) brkState.running = false;
  cancelAnimationFrame(brkRAF);
}

function brkMovePaddle(clientX){
  if(!brkState || !brkState.running) return;
  const canvas = document.getElementById("brkCanvas");
  const rect = canvas.getBoundingClientRect();
  const scale = BRK_W / rect.width;
  let x = (clientX - rect.left) * scale - PADDLE_W/2;
  x = Math.max(0, Math.min(BRK_W-PADDLE_W, x));
  brkState.paddleX = x;
}
document.getElementById("brkCanvas").addEventListener("mousemove", e=>brkMovePaddle(e.clientX));
document.getElementById("brkCanvas").addEventListener("touchmove", e=>{
  if(e.touches[0]) brkMovePaddle(e.touches[0].clientX);
  e.preventDefault();
}, {passive:false});

function brkLoop(){
  if(!brkState || !brkState.running) return;
  const s = brkState;
  const b = s.ball;

  b.x += b.vx; b.y += b.vy;

  if(b.x <= BALL_R || b.x >= BRK_W-BALL_R){ b.vx *= -1; sfxWallBounce(); }
  if(b.y <= BALL_R){ b.vy *= -1; sfxWallBounce(); }

  // paddle collision
  const paddleY = BRK_H - 24;
  if(b.y+BALL_R >= paddleY && b.y+BALL_R <= paddleY+PADDLE_H+6 &&
     b.x >= s.paddleX && b.x <= s.paddleX+PADDLE_W && b.vy > 0){
    const hitPos = (b.x - (s.paddleX+PADDLE_W/2)) / (PADDLE_W/2);
    b.vy = -Math.abs(b.vy);
    b.vx = hitPos * 4.2;
    sfxPaddle();
  }

  // brick collision
  for(const brick of s.bricks){
    if(!brick.alive) continue;
    if(b.x+BALL_R > brick.x && b.x-BALL_R < brick.x+BRICK_W &&
       b.y+BALL_R > brick.y && b.y-BALL_R < brick.y+BRICK_H){
      brick.alive = false;
      b.vy *= -1;
      s.score += brick.points;
      document.getElementById("brkScore").textContent = s.score;
      sfxBrick();
      break;
    }
  }

  // fell off bottom
  if(b.y > BRK_H+20){
    if(!state.godMode){
      s.lives--;
      document.getElementById("brkLives").textContent = s.lives;
      sfxLifeLost();
      if(s.lives <= 0){
        endBreakout(false);
        return;
      }
    }
    b.x = BRK_W/2; b.y = BRK_H-60; b.vx = 3.2; b.vy = -3.6;
  }

  // win condition
  if(s.bricks.every(br=>!br.alive)){
    endBreakout(true);
    return;
  }

  drawBreakout();
  brkRAF = requestAnimationFrame(brkLoop);
}

function drawBreakout(){
  const ctx = brkCtx;
  const s = brkState;
  ctx.clearRect(0,0,BRK_W,BRK_H);
  ctx.fillStyle = "#0f0a1c";
  ctx.fillRect(0,0,BRK_W,BRK_H);

  for(const brick of s.bricks){
    if(!brick.alive) continue;
    ctx.fillStyle = brick.color;
    ctx.fillRect(brick.x, brick.y, BRICK_W, BRICK_H);
  }

  ctx.fillStyle = "#f2eefc";
  ctx.fillRect(s.paddleX, BRK_H-24, PADDLE_W, PADDLE_H);

  ctx.beginPath();
  ctx.arc(s.ball.x, s.ball.y, BALL_R, 0, Math.PI*2);
  ctx.fillStyle = ballColor();
  ctx.fill();
}

function endBreakout(won){
  brkState.running = false;
  cancelAnimationFrame(brkRAF);
  const base = Math.floor(brkState.score/5);
  const bonus = won ? 15 : 0;
  const ticketsWon = base + bonus;
  state.tickets += ticketsWon;
  const cost = state.boosts.discount > 0 ? 3 : 4;
  let recordMsg = "";
  if(brkState.score > state.highscores.breakout){
    state.highscores.breakout = brkState.score;
    document.getElementById("brkBest").textContent = state.highscores.breakout;
    recordMsg = " 🏆 Nytt rekord!";
    sfxRecord();
  }
  saveState(); refreshHud();
  document.getElementById("brkStart").disabled = false;
  document.getElementById("brkStart").textContent = `Spela igen (${cost} 🪙)`;
  showToast((won ? `Alla tegelstenar krossade! +${ticketsWon} 🎟️` : `Game over. Poäng: ${brkState.score} → +${ticketsWon} 🎟️`) + recordMsg);
}

/* =====================================================================
   GAME 4: BASKETBALL SHOOTOUT
===================================================================== */
const BASK_W = 520, BASK_H = 360;
const BASK_START_X = 90, BASK_START_Y = 300;
const BASK_HOOP_X = 390, BASK_HOOP_Y = 95;
const BASK_RIM_HALF = 20;
function getBaskTol(){ return (basketState && basketState.sharpshooterActive) ? 42 : 30; }
function applySweetZoneVisual(active){
  const zone = document.getElementById("sweetZone");
  if(active){ zone.style.left = "46%"; zone.style.width = "26.5%"; }
  else { zone.style.left = "49%"; zone.style.width = "18.5%"; }
}
const BASK_ANGLE = 55 * Math.PI/180;
const BASK_G = 0.3;

let baskCtx = null;
let basketState = null;
let baskAimRAF = null, baskFlightRAF = null, baskTimerId = null, baskFxRAF = null;

let ballTrail = [];
let baskParticles = [];
let ballSpinAngle = 0;
let netSwingT = 0;
let rimFlashT = 0;
let missFlashT = 0;
let rimShakeT = 0;

function resetBasketUI(){
  const canvas = document.getElementById("baskCanvas");
  canvas.width = BASK_W; canvas.height = BASK_H;
  baskCtx = canvas.getContext("2d");
  const cost = state.boosts.discount > 0 ? 2 : 3;
  document.getElementById("baskScore").textContent = "0";
  document.getElementById("baskStreak").textContent = "0";
  document.getElementById("baskBest").textContent = state.highscores.basket;
  document.getElementById("baskTime").textContent = state.boosts.basketTime > 0 ? "35" : "30";
  document.getElementById("baskStart").disabled = false;
  document.getElementById("baskStart").textContent = `Spela (${cost} 🪙)`;
  document.getElementById("baskShootBtn").disabled = true;
  const marker = document.getElementById("powerMarker");
  marker.style.left = "50%";
  marker.classList.remove("in-zone");
  applySweetZoneVisual(state.boosts.sharpshooter > 0);
  ballTrail = []; baskParticles = [];
  netSwingT = 0; rimFlashT = 0; missFlashT = 0; rimShakeT = 0;
  drawBasketScene(BASK_START_X, BASK_START_Y);
}

function startBasket(){
  if(basketState && basketState.running) return;
  const discountActive = state.boosts.discount > 0;
  const basketTimeActive = state.boosts.basketTime > 0;
  const sharpshooterActive = state.boosts.sharpshooter > 0;
  const cost = discountActive ? 2 : 3;
  if(!state.freePlay){
    if(state.tokens < cost){ showToast("Inte tillräckligt med poletter."); return; }
    state.tokens -= cost;
  }
  if(discountActive) state.boosts.discount--;
  if(basketTimeActive) state.boosts.basketTime--;
  if(sharpshooterActive) state.boosts.sharpshooter--;
  saveState(); refreshHud();

  const timeLimit = basketTimeActive ? 35 : 30;
  basketState = { running:true, timeLeft:timeLimit, made:0, streak:0, aiming:false, aimT:0, currentPower:50, sharpshooterActive };
  applySweetZoneVisual(sharpshooterActive);
  document.getElementById("baskScore").textContent = "0";
  document.getElementById("baskStreak").textContent = "0";
  document.getElementById("baskTime").textContent = timeLimit;
  document.getElementById("baskStart").disabled = true;
  document.getElementById("baskStart").textContent = "Spelar...";
  document.getElementById("baskShootBtn").disabled = false;

  baskTimerId = setInterval(()=>{
    basketState.timeLeft--;
    document.getElementById("baskTime").textContent = basketState.timeLeft;
    if(basketState.timeLeft <= 0) endBasket();
  }, 1000);

  beginAiming();
}

function beginAiming(){
  if(!basketState || !basketState.running) return;
  basketState.aiming = true;
  basketState.aimT = 0;
  drawBasketScene(BASK_START_X, BASK_START_Y);
  baskAimLoop();
}

function baskAimLoop(){
  if(!basketState || !basketState.aiming) return;
  basketState.aimT += 0.025;
  const pos = 50 + 50*Math.sin(basketState.aimT);
  basketState.currentPower = pos;
  const marker = document.getElementById("powerMarker");
  marker.style.left = pos + "%";
  marker.classList.toggle("in-zone", pos >= 49 && pos <= 67.5);
  baskAimRAF = requestAnimationFrame(baskAimLoop);
}

function shootBasket(){
  if(!basketState || !basketState.running || !basketState.aiming) return;
  basketState.aiming = false;
  cancelAnimationFrame(baskAimRAF);
  const power = basketState.currentPower;
  const v = 8 + (power/100)*10;
  const vx = v*Math.cos(BASK_ANGLE);
  const vy0 = -v*Math.sin(BASK_ANGLE);
  ballTrail = [];
  sfxShoot();
  flyBall(vx, vy0);
}

function flyBall(vx, vy0){
  let x = BASK_START_X, y = BASK_START_Y, vy = vy0;
  let frame = 0;

  function step(){
    frame++;
    const prevX = x, prevY = y;
    x += vx; vy += BASK_G; y += vy;
    ballSpinAngle += vx*0.05;

    ballTrail.push({x:prevX, y:prevY});
    if(ballTrail.length > 7) ballTrail.shift();

    let result = null;
    if(prevX < BASK_HOOP_X && x >= BASK_HOOP_X){
      const t = (BASK_HOOP_X - prevX) / (x - prevX);
      const yCross = prevY + (y - prevY) * t;
      result = Math.abs(yCross - BASK_HOOP_Y) <= getBaskTol() ? "make" : "miss";
    }
    if(!result && (y > BASK_H + 20 || x > BASK_W + 20)) result = "miss";

    drawBasketScene(x, y, { launching: frame < 4 });

    if(result){
      finishShot(result, x, y);
      return;
    }
    baskFlightRAF = requestAnimationFrame(step);
  }
  step();
}

function spawnBaskParticles(x, y, type){
  const colors = type === "make" ? ["#39ff88","#ffe08a","#ffffff","#2de2ff"] : ["#ff3f8e"];
  const count = type === "make" ? 22 : 8;
  for(let i=0;i<count;i++){
    const angle = Math.random()*Math.PI*2;
    const speed = 1.4 + Math.random()*3;
    baskParticles.push({
      x, y,
      vx: Math.cos(angle)*speed,
      vy: Math.sin(angle)*speed - 1.4,
      life: 0,
      maxLife: 26 + Math.random()*18,
      color: colors[Math.floor(Math.random()*colors.length)],
      size: 2 + Math.random()*3
    });
  }
}
function updateBaskParticles(){
  for(const p of baskParticles){
    p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.life++;
  }
  baskParticles = baskParticles.filter(p=>p.life < p.maxLife);
}

function finishShot(result, ballX, ballY){
  if(result === "make"){
    netSwingT = 1; rimFlashT = 1;
    spawnBaskParticles(BASK_HOOP_X, BASK_HOOP_Y, "make");
    sfxMake();
  } else {
    missFlashT = 1; rimShakeT = 1;
    sfxMiss();
  }
  handleShotResult(result);
  runShotFx(result, ballX, ballY);
}

function handleShotResult(result){
  if(result === "make"){
    basketState.made++;
    basketState.streak++;
    showToast(`Korg! 🏀 (streak ${basketState.streak})`);
  } else {
    basketState.streak = 0;
    showToast("Utanför 🏀");
  }
  document.getElementById("baskScore").textContent = basketState.made;
  document.getElementById("baskStreak").textContent = basketState.streak;
}

function runShotFx(result, ballX, ballY){
  let bx = ballX, by = ballY;
  let frames = 0;
  const totalFrames = 40;

  function step(){
    frames++;
    netSwingT = Math.max(0, netSwingT - 1/22);
    rimFlashT = Math.max(0, rimFlashT - 1/18);
    missFlashT = Math.max(0, missFlashT - 1/18);
    rimShakeT = Math.max(0, rimShakeT - 1/14);
    updateBaskParticles();
    if(ballTrail.length) ballTrail.shift();

    if(result === "make"){ by += 2.4; }
    else { bx += 2.5; by += 2; }

    drawBasketScene(bx, by, {});

    if(frames < totalFrames){
      baskFxRAF = requestAnimationFrame(step);
    } else {
      ballTrail = []; baskParticles = [];
      if(basketState && basketState.running && basketState.timeLeft > 0){
        beginAiming();
      }
    }
  }
  step();
}

function stopBasket(){
  if(basketState) basketState.running = false;
  clearInterval(baskTimerId);
  cancelAnimationFrame(baskAimRAF);
  cancelAnimationFrame(baskFlightRAF);
  cancelAnimationFrame(baskFxRAF);
  ballTrail = []; baskParticles = [];
  netSwingT = 0; rimFlashT = 0; missFlashT = 0; rimShakeT = 0;
}

function endBasket(){
  stopBasket();
  const made = basketState ? basketState.made : 0;
  const ticketsWon = made*3;
  state.tickets += ticketsWon;
  const cost = state.boosts.discount > 0 ? 2 : 3;
  let recordMsg = "";
  if(made > state.highscores.basket){
    state.highscores.basket = made;
    document.getElementById("baskBest").textContent = state.highscores.basket;
    recordMsg = " 🏆 Nytt rekord!";
    sfxRecord();
  }
  saveState(); refreshHud();
  document.getElementById("baskShootBtn").disabled = true;
  document.getElementById("baskStart").disabled = false;
  document.getElementById("baskStart").textContent = `Spela igen (${cost} 🪙)`;
  showToast(`Tiden är ute! ${made} korgar → +${ticketsWon} 🎟️${recordMsg}`);
}

function drawBasketScene(ballX, ballY, opts){
  opts = opts || {};
  const ctx = baskCtx;
  if(!ctx) return;
  ctx.clearRect(0,0,BASK_W,BASK_H);

  const bg = ctx.createLinearGradient(0,0,0,BASK_H);
  bg.addColorStop(0, "#140b26");
  bg.addColorStop(1, "#0a0614");
  ctx.fillStyle = bg;
  ctx.fillRect(0,0,BASK_W,BASK_H);

  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.beginPath(); ctx.moveTo(0,BASK_H-20); ctx.lineTo(BASK_W,BASK_H-20); ctx.stroke();

  // motion trail
  for(let i=0;i<ballTrail.length;i++){
    const t = ballTrail[i];
    const frac = (i+1)/ballTrail.length;
    ctx.beginPath();
    ctx.arc(t.x, t.y, 7*(0.4+frac*0.6), 0, Math.PI*2);
    ctx.fillStyle = `rgba(255,138,61,${0.3*frac})`;
    ctx.fill();
  }

  const shakeX = rimShakeT > 0 ? (Math.random()-0.5)*6*rimShakeT : 0;

  // backboard
  ctx.fillStyle = "#e8e8f0";
  ctx.fillRect(BASK_HOOP_X+BASK_RIM_HALF+6+shakeX, BASK_HOOP_Y-40, 8, 70);

  // rim glow on make
  if(rimFlashT > 0){
    ctx.beginPath();
    ctx.arc(BASK_HOOP_X, BASK_HOOP_Y, BASK_RIM_HALF+10, 0, Math.PI*2);
    ctx.fillStyle = `rgba(57,255,136,${0.35*rimFlashT})`;
    ctx.fill();
  }

  // rim
  ctx.strokeStyle = rimFlashT > 0 ? "#39ff88" : (rimShakeT > 0 ? "#ff3f8e" : "#ff6b35");
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(BASK_HOOP_X-BASK_RIM_HALF+shakeX, BASK_HOOP_Y);
  ctx.lineTo(BASK_HOOP_X+BASK_RIM_HALF+shakeX, BASK_HOOP_Y);
  ctx.stroke();

  // net (swings after a make)
  ctx.strokeStyle = "rgba(255,255,255,0.45)";
  ctx.lineWidth = 1;
  const swing = Math.sin(Date.now()*0.02) * 6 * netSwingT;
  for(let i=-2;i<=2;i++){
    ctx.beginPath();
    ctx.moveTo(BASK_HOOP_X+i*8+shakeX, BASK_HOOP_Y);
    ctx.lineTo(BASK_HOOP_X+i*5+swing+shakeX, BASK_HOOP_Y+22);
    ctx.stroke();
  }

  // celebration / miss particles
  for(const p of baskParticles){
    const alpha = Math.max(0, 1 - p.life/p.maxLife);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // floor shadow for depth
  const floorY = BASK_H-20;
  const heightAboveFloor = Math.max(0, floorY - ballY);
  const shadowScale = Math.max(0.3, 1 - heightAboveFloor/260);
  ctx.beginPath();
  ctx.ellipse(ballX, floorY, 10*shadowScale, 3.5*shadowScale, 0, 0, Math.PI*2);
  ctx.fillStyle = `rgba(0,0,0,${0.35*shadowScale})`;
  ctx.fill();

  // ball (with launch squash + spin seams)
  const squashY = opts.launching ? 0.75 : 1;
  const squashX = opts.launching ? 1.2 : 1;
  ctx.save();
  ctx.translate(ballX, ballY);
  ctx.scale(squashX, squashY);
  ctx.rotate(ballSpinAngle);
  ctx.beginPath();
  ctx.arc(0,0,9,0,Math.PI*2);
  ctx.fillStyle = "#ff8a3d";
  ctx.fill();
  ctx.strokeStyle = "#7a3d10";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.strokeStyle = "rgba(0,0,0,0.35)";
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(-9,0); ctx.lineTo(9,0); ctx.stroke();
  ctx.beginPath(); ctx.arc(0,0,9,-0.9,0.9); ctx.stroke();
  ctx.beginPath(); ctx.arc(0,0,9,Math.PI-0.9,Math.PI+0.9); ctx.stroke();
  ctx.restore();

  // miss tint
  if(missFlashT > 0){
    ctx.fillStyle = `rgba(255,63,142,${0.18*missFlashT})`;
    ctx.fillRect(0,0,BASK_W,BASK_H);
  }
}

/* =====================================================================
   INIT
===================================================================== */
refreshHud();
</script>
<script src="../../worker-config.js"></script>
<script src="i18n-data.js"></script>
<script src="../../i18n.js"></script>
</body>
</html>
