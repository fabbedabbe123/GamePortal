<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mini Golf</title>
<style>
  :root{
    --ui-bg: #12141c;
    --ui-panel: #1a1e2a;
    --ui-panel-2: #222839;
    --ui-stroke: #2e3548;
    --text: #eef0f6;
    --muted: #8a93ad;
    --accent: #4fc9c0;
    --accent-2: #e8b84b;
    --danger: #ff6b7a;
  }
  html, body{
    margin:0; padding:0; height:100%;
    background: var(--ui-bg);
    font-family: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
    color: var(--text);
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    gap:10px;
    overflow:hidden;
  }
  #hud{
    display:flex; gap:22px; align-items:center;
  }
  #hud b{ color:var(--accent); font-size:16px; }
  #hud .label{ color:var(--muted); font-size:10px; letter-spacing:0.5px; text-transform:uppercase; display:block; }
  #hud .stat{ text-align:center; }
  #wrap{ position:relative; }
  canvas{ display:block; border-radius:10px; box-shadow: 0 20px 50px -20px rgba(0,0,0,0.7); }

  #powerBar{
    position:absolute; left:12px; bottom:12px; width:120px; height:8px;
    border-radius:999px; background:rgba(0,0,0,0.35); overflow:hidden;
    opacity:0; transition:opacity .15s ease;
    border:1px solid rgba(255,255,255,0.15);
  }
  #powerBar.show{ opacity:1; }
  #powerFill{ height:100%; width:0%; background:var(--accent); transition:width .03s linear, background .1s ease; }

  #holeBest{
    position:absolute; right:12px; top:12px;
    font-size:10.5px; color:rgba(255,255,255,0.75);
    background:rgba(0,0,0,0.35); padding:4px 10px; border-radius:999px;
  }

  #toastLayer{
    position:absolute; top:14px; left:50%; transform:translateX(-50%);
    display:flex; flex-direction:column; gap:6px; align-items:center;
    pointer-events:none; z-index:20;
  }
  .toast{
    background: rgba(18,20,28,0.9); border:1px solid var(--accent-2);
    color:var(--accent-2); font-size:11.5px; font-weight:700; letter-spacing:0.3px;
    padding:7px 16px; border-radius:999px;
    animation: toastIn .25s ease, toastOut .4s ease 1.6s forwards;
  }
  @keyframes toastIn{ from{opacity:0; transform:translateY(-8px);} to{opacity:1; transform:translateY(0);} }
  @keyframes toastOut{ to{opacity:0; transform:translateY(-6px);} }

  #hint{ font-size:11.5px; color:var(--muted); text-align:center; max-width:420px; }

  .overlay{
    position:absolute; inset:0; border-radius:10px;
    background: rgba(11,12,18,0.78);
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    gap:14px; text-align:center; padding:20px;
  }
  .overlay.hidden{ display:none; }
  .overlay h2{ margin:0; font-size:20px; letter-spacing:0.5px; }
  .overlay p{ margin:0; color:var(--muted); font-size:13px; max-width:340px; line-height:1.5; }
  .btn{
    font-family:inherit; font-size:12.5px; font-weight:700; letter-spacing:0.4px;
    padding:10px 20px; border-radius:999px; border:none; cursor:pointer;
    background: var(--accent); color:#0b0b0b;
    transition: transform .12s ease;
  }
  .btn:hover{ transform: translateY(-2px); }
  #btnRow{ display:flex; gap:10px; }

  #scoreCard{
    display:grid; grid-template-columns: repeat(3, 1fr); gap:6px;
    font-size:11px; max-width:360px;
  }
  .sc-cell{
    background:var(--ui-panel-2); border:1px solid var(--ui-stroke);
    border-radius:8px; padding:6px 10px; display:flex; justify-content:space-between; gap:8px;
  }
  .sc-cell .diff.under{ color:#3ddc84; }
  .sc-cell .diff.over{ color:var(--danger); }
  .sc-cell .diff.even{ color:var(--muted); }

  .hidden{ display:none !important; }

  #editorPanel{
    width:700px; max-width:94vw;
    background:var(--ui-panel);
    border:1px solid var(--ui-stroke);
    border-radius:10px;
    padding:16px 20px;
    display:flex; flex-direction:column; gap:10px;
  }
  #editorHint{ margin:0; font-size:11.5px; color:var(--muted); line-height:1.5; }
  #editorToolbar{ display:flex; gap:6px; flex-wrap:wrap; }
  .tool-btn{
    font-family:inherit; font-size:12px; font-weight:600;
    padding:8px 12px; border-radius:8px; border:1px solid var(--ui-stroke);
    background:var(--ui-panel-2); color:var(--text); cursor:pointer;
  }
  .tool-btn.active{ background:var(--accent); color:#0b0b0b; border-color:var(--accent); }
  #editorParRow{ display:flex; align-items:center; gap:8px; font-size:12px; }
  #editorParRow input{
    width:56px; font-family:inherit; font-size:13px; padding:6px 8px;
    border-radius:6px; border:1px solid var(--ui-stroke); background:var(--ui-panel-2); color:var(--text);
  }
  #editorParRow .btn.ghost{ margin-left:auto; }
  #editorActionRow{ display:flex; gap:10px; }
  .btn.ghost{
    background:var(--ui-panel-2); color:var(--text); border:1px solid var(--ui-stroke);
  }
  #editorListWrap{ border-top:1px solid var(--ui-stroke); padding-top:10px; }
  #editorListTitle{ font-size:11px; color:var(--muted); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px; }
  #editorList{ display:flex; flex-direction:column; gap:6px; max-height:140px; overflow-y:auto; }
  .editor-list-row{
    display:flex; align-items:center; justify-content:space-between;
    background:var(--ui-panel-2); border:1px solid var(--ui-stroke);
    border-radius:8px; padding:7px 10px; font-size:12px;
  }
  .editor-list-row .row-btns{ display:flex; gap:6px; }
  .editor-list-row button{
    font-family:inherit; font-size:11px; padding:5px 10px; border-radius:6px;
    border:1px solid var(--ui-stroke); background:var(--ui-bg); color:var(--text); cursor:pointer;
  }
  .editor-list-row button.danger{ color:var(--danger); }
  #editorListEmpty{ font-size:11.5px; color:var(--muted); }
</style>
</head>
<body>

<div id="hud">
  <div class="stat"><span class="label">Hål</span><b id="holeLabel">1 / 6</b></div>
  <div class="stat"><span class="label">Slag</span><b id="strokeLabel">0</b></div>
  <div class="stat"><span class="label">Par</span><b id="parLabel">3</b></div>
  <div class="stat"><span class="label">Totalt</span><b id="totalLabel">0</b></div>
</div>

<div id="wrap">
  <canvas id="c" width="700" height="440"></canvas>
  <div id="toastLayer"></div>
  <div id="holeBest"></div>
  <div id="powerBar"><div id="powerFill"></div></div>

  <div class="overlay" id="startOverlay">
    <h2>MINI GOLF</h2>
    <p>Dra bollen bakåt för att sikta, släpp för att slå. Ju längre du drar, desto hårdare slag. 9 hål, minsta antal slag vinner.</p>
    <button class="btn" id="startBtn">Sätt igång</button>
    <div id="btnRow">
      <button class="btn ghost" id="playCustomBtn" style="display:none;">▶ Spela mina banor</button>
      <button class="btn ghost" id="openEditorBtn">🛠️ Skapa egen bana</button>
    </div>
  </div>

  <div class="overlay hidden" id="sunkOverlay">
    <h2 id="sunkTitle">I HÅL!</h2>
    <p id="sunkText"></p>
    <button class="btn" id="nextHoleBtn">Nästa hål</button>
  </div>

  <div class="overlay hidden" id="endOverlay">
    <h2>RUNDAN KLAR!</h2>
    <p id="endText"></p>
    <div id="scoreCard"></div>
    <div id="btnRow">
      <button class="btn" id="playAgainBtn">Spela igen</button>
    </div>
  </div>
</div>

<div id="hint">Dra i bollen med musen (eller fingret) för att sikta och slå. Kortare drag = mjukare slag.</div>

<div id="editorPanel" class="hidden">
  <h2 style="margin:0 0 4px;">BANREDIGERARE</h2>
  <p id="editorHint">Välj ett verktyg, klicka/dra på banan ovan för att placera. Tee och hål är enkla klick, vägg/sand/vatten dras som rutor.</p>

  <div id="editorToolbar">
    <button class="tool-btn active" data-tool="tee">⛳ Tee</button>
    <button class="tool-btn" data-tool="hole">🕳️ Hål</button>
    <button class="tool-btn" data-tool="wall">🧱 Vägg</button>
    <button class="tool-btn" data-tool="sand">🏖️ Sand</button>
    <button class="tool-btn" data-tool="water">🌊 Vatten</button>
    <button class="tool-btn" data-tool="erase">🧹 Radera</button>
  </div>

  <div id="editorParRow">
    <label for="editorParInput">Par</label>
    <input type="number" id="editorParInput" min="2" max="7" value="3">
    <button class="btn ghost" id="editorClearBtn">Rensa allt</button>
  </div>

  <div id="editorActionRow">
    <button class="btn" id="editorSaveBtn">Spara bana</button>
    <button class="btn ghost" id="editorBackBtn">Tillbaka</button>
  </div>

  <div id="editorListWrap">
    <div id="editorListTitle">Sparade banor</div>
    <div id="editorList"></div>
    <button class="btn ghost" id="editorNewBtn" style="margin-top:8px;">+ Ny bana</button>
  </div>
</div>

<script>
(function(){
  const canvas = document.getElementById('c');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  const holeLabel = document.getElementById('holeLabel');
  const strokeLabel = document.getElementById('strokeLabel');
  const parLabel = document.getElementById('parLabel');
  const totalLabel = document.getElementById('totalLabel');
  const startOverlay = document.getElementById('startOverlay');
  const sunkOverlay = document.getElementById('sunkOverlay');
  const endOverlay = document.getElementById('endOverlay');
  const sunkTitle = document.getElementById('sunkTitle');
  const sunkText = document.getElementById('sunkText');
  const endText = document.getElementById('endText');
  const scoreCard = document.getElementById('scoreCard');
  const startBtn = document.getElementById('startBtn');
  const nextHoleBtn = document.getElementById('nextHoleBtn');
  const playAgainBtn = document.getElementById('playAgainBtn');
  const toastLayer = document.getElementById('toastLayer');
  const holeBestEl = document.getElementById('holeBest');
  const powerBar = document.getElementById('powerBar');
  const powerFill = document.getElementById('powerFill');

  const BALL_R = 7;
  const HOLE_R = 12;
  const FRICTION = 0.985;
  const STOP_SPEED = 0.06;
  const MAX_DRAG = 140;
  const POWER_SCALE = 0.11;

  const COURSES = [
    { par: 2, tee:{x:60,y:220}, hole:{x:620,y:220}, walls:[], sand:[], water:[] },
    { par: 3, tee:{x:60,y:80}, hole:{x:620,y:360},
      walls:[{x:300,y:0,w:24,h:260}], sand:[], water:[] },
    { par: 3, tee:{x:60,y:60}, hole:{x:60,y:380},
      walls:[{x:160,y:60,w:24,h:300},{x:320,y:100,w:24,h:340}],
      sand:[{x:40,y:300,w:140,h:80}], water:[] },
    { par: 3, tee:{x:40,y:220}, hole:{x:660,y:220},
      walls:[{x:260,y:0,w:24,h:160},{x:260,y:280,w:24,h:160},{x:440,y:130,w:24,h:320}],
      sand:[], water:[] },
    { par: 4, tee:{x:60,y:220}, hole:{x:620,y:220},
      walls:[{x:300,y:130,w:100,h:24},{x:300,y:286,w:100,h:24}],
      sand:[], water:[{x:320,y:170,w:60,h:100}] },
    { par: 4, tee:{x:50,y:380}, hole:{x:640,y:60},
      walls:[{x:150,y:100,w:24,h:320},{x:300,y:0,w:24,h:300},{x:450,y:100,w:24,h:340}],
      sand:[{x:480,y:320,w:120,h:70}], water:[] },
    { par: 4, tee:{x:40,y:40}, hole:{x:660,y:400},
      walls:[
        {x:150,y:0,w:24,h:280},
        {x:300,y:160,w:24,h:280},
        {x:450,y:0,w:24,h:280},
        {x:600,y:160,w:24,h:280}
      ],
      sand:[{x:590,y:380,w:80,h:60}], water:[] },
    { par: 4, tee:{x:40,y:220}, hole:{x:650,y:220},
      walls:[],
      sand:[],
      water:[{x:200,y:0,w:300,h:170},{x:200,y:270,w:300,h:170}] },
    { par: 5, tee:{x:40,y:400}, hole:{x:660,y:40},
      walls:[
        {x:150,y:100,w:24,h:340},
        {x:300,y:0,w:24,h:300},
        {x:450,y:140,w:24,h:300},
        {x:600,y:0,w:24,h:260}
      ],
      sand:[{x:520,y:300,w:100,h:70}],
      water:[{x:250,y:340,w:80,h:60}] }
  ];

  let activeCourses = COURSES;

  /* ===================== LEVEL EDITOR ===================== */
  const CUSTOM_KEY = 'miniGolfCustomHoles';
  let editorMode = false;
  let editorTool = 'tee';
  let editorHole = null;
  let editingIndex = -1;
  let editorDragStart = null;
  let editorDragNow = null;

  const editorPanel = document.getElementById('editorPanel');
  const editorToolbarEl = document.getElementById('editorToolbar');
  const editorParInput = document.getElementById('editorParInput');
  const editorSaveBtn = document.getElementById('editorSaveBtn');
  const editorClearBtn = document.getElementById('editorClearBtn');
  const editorBackBtn = document.getElementById('editorBackBtn');
  const editorNewBtn = document.getElementById('editorNewBtn');
  const editorListEl = document.getElementById('editorList');
  const openEditorBtn = document.getElementById('openEditorBtn');
  const playCustomBtn = document.getElementById('playCustomBtn');

  function getCustomHoles(){
    try { return JSON.parse(localStorage.getItem(CUSTOM_KEY) || '[]'); }
    catch(e){ return []; }
  }
  function saveCustomHolesList(list){
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(list));
  }
  function blankEditorHole(){
    return { tee:null, hole:null, walls:[], sand:[], water:[], par:3 };
  }
  function refreshPlayCustomVisibility(){
    playCustomBtn.style.display = getCustomHoles().length ? 'inline-block' : 'none';
  }

  function openEditor(existingIndex){
    editorMode = true;
    startOverlay.classList.add('hidden');
    editorPanel.classList.remove('hidden');
    if (typeof existingIndex === 'number' && existingIndex >= 0){
      const list = getCustomHoles();
      editorHole = JSON.parse(JSON.stringify(list[existingIndex]));
      editingIndex = existingIndex;
    } else {
      editorHole = blankEditorHole();
      editingIndex = -1;
    }
    editorParInput.value = editorHole.par;
    renderEditorList();
  }

  function closeEditor(){
    editorMode = false;
    editorPanel.classList.add('hidden');
    startOverlay.classList.remove('hidden');
    refreshPlayCustomVisibility();
  }

  openEditorBtn.addEventListener('click', () => openEditor());
  editorBackBtn.addEventListener('click', closeEditor);
  editorNewBtn.addEventListener('click', () => openEditor());

  editorToolbarEl.querySelectorAll('.tool-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      editorToolbarEl.querySelectorAll('.tool-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      editorTool = btn.dataset.tool;
    });
  });

  editorParInput.addEventListener('change', ()=>{
    editorHole.par = Math.max(2, Math.min(7, parseInt(editorParInput.value,10) || 3));
    editorParInput.value = editorHole.par;
  });

  editorClearBtn.addEventListener('click', ()=>{
    const par = editorHole.par;
    editorHole = blankEditorHole();
    editorHole.par = par;
  });

  editorSaveBtn.addEventListener('click', ()=>{
    if (!editorHole.tee || !editorHole.hole){
      showToast('Placera både Tee och Hål innan du sparar.');
      return;
    }
    const list = getCustomHoles();
    const toSave = JSON.parse(JSON.stringify(editorHole));
    if (editingIndex >= 0 && list[editingIndex]){
      list[editingIndex] = toSave;
    } else {
      list.push(toSave);
      editingIndex = list.length - 1;
    }
    saveCustomHolesList(list);
    showToast('Bana sparad!');
    renderEditorList();
    refreshPlayCustomVisibility();
  });

  function renderEditorList(){
    const list = getCustomHoles();
    if (!list.length){
      editorListEl.innerHTML = '<div id="editorListEmpty">Inga sparade banor än.</div>';
      return;
    }
    editorListEl.innerHTML = list.map((h,i)=>`
      <div class="editor-list-row">
        <span>Bana ${i+1} (par ${h.par})</span>
        <span class="row-btns">
          <button data-edit="${i}">Redigera</button>
          <button data-delete="${i}" class="danger">Radera</button>
        </span>
      </div>
    `).join('');
    editorListEl.querySelectorAll('[data-edit]').forEach(btn=>{
      btn.addEventListener('click', ()=> openEditor(parseInt(btn.dataset.edit,10)));
    });
    editorListEl.querySelectorAll('[data-delete]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const idx = parseInt(btn.dataset.delete,10);
        const list2 = getCustomHoles();
        list2.splice(idx,1);
        saveCustomHolesList(list2);
        if (editingIndex === idx){
          editorHole = blankEditorHole();
          editingIndex = -1;
          editorParInput.value = 3;
        }
        renderEditorList();
        refreshPlayCustomVisibility();
      });
    });
  }

  playCustomBtn.addEventListener('click', ()=>{
    const list = getCustomHoles();
    if (!list.length) return;
    activeCourses = list;
    startOverlay.classList.add('hidden');
    holeIndex = 0;
    totalStrokes = 0;
    scores = [];
    totalLabel.textContent = 0;
    loadHole(0);
  });

  function normalizeRect(a,b){
    const x = Math.min(a.x,b.x), y = Math.min(a.y,b.y);
    const w = Math.abs(b.x-a.x), h = Math.abs(b.y-a.y);
    return { x: Math.round(x), y: Math.round(y), w: Math.round(w), h: Math.round(h) };
  }

  function eraseAt(pos){
    if (editorHole.tee && Math.hypot(pos.x-editorHole.tee.x, pos.y-editorHole.tee.y) < 16){
      editorHole.tee = null; return;
    }
    if (editorHole.hole && Math.hypot(pos.x-editorHole.hole.x, pos.y-editorHole.hole.y) < 16){
      editorHole.hole = null; return;
    }
    ['walls','sand','water'].forEach(key=>{
      editorHole[key] = editorHole[key].filter(r => !(pos.x > r.x && pos.x < r.x + r.w && pos.y > r.y && pos.y < r.y + r.h));
    });
  }

  function editorPointerDown(pos){
    if (!editorHole) return;
    const clampedX = Math.max(0, Math.min(W, pos.x));
    const clampedY = Math.max(0, Math.min(H, pos.y));
    if (editorTool === 'tee'){ editorHole.tee = { x: Math.round(clampedX), y: Math.round(clampedY) }; return; }
    if (editorTool === 'hole'){ editorHole.hole = { x: Math.round(clampedX), y: Math.round(clampedY) }; return; }
    if (editorTool === 'erase'){ eraseAt({x:clampedX, y:clampedY}); return; }
    editorDragStart = { x: clampedX, y: clampedY };
    editorDragNow = { x: clampedX, y: clampedY };
  }

  function editorPointerMove(pos){
    if (!editorDragStart) return;
    editorDragNow = {
      x: Math.max(0, Math.min(W, pos.x)),
      y: Math.max(0, Math.min(H, pos.y))
    };
  }

  function editorPointerUp(){
    if (editorDragStart && editorDragNow && editorHole){
      const rect = normalizeRect(editorDragStart, editorDragNow);
      if (rect.w > 8 && rect.h > 8 && Array.isArray(editorHole[editorTool])){
        editorHole[editorTool].push(rect);
      }
    }
    editorDragStart = null;
    editorDragNow = null;
  }

  function renderEditor(){
    if (!editorHole) return;
    const grad = ctx.createLinearGradient(0,0,0,H);
    grad.addColorStop(0, '#1f6b3a');
    grad.addColorStop(1, '#185a30');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,W,H);

    ctx.globalAlpha = 0.06;
    ctx.fillStyle = '#ffffff';
    for (let x = 0; x < W; x += 44) ctx.fillRect(x, 0, 22, H);
    ctx.globalAlpha = 1;

    editorHole.sand.forEach(r => { ctx.fillStyle = '#d9b26a'; ctx.fillRect(r.x, r.y, r.w, r.h); });
    editorHole.water.forEach(r => { ctx.fillStyle = '#2f7fb8'; ctx.fillRect(r.x, r.y, r.w, r.h); });
    editorHole.walls.forEach(r => {
      ctx.fillStyle = '#6b4a2f';
      ctx.fillRect(r.x, r.y, r.w, r.h);
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 2;
      ctx.strokeRect(r.x, r.y, r.w, r.h);
    });

    if (editorDragStart && editorDragNow && Array.isArray(editorHole[editorTool])){
      const rect = normalizeRect(editorDragStart, editorDragNow);
      ctx.fillStyle = editorTool === 'wall' ? 'rgba(107,74,47,0.55)'
        : editorTool === 'sand' ? 'rgba(217,178,106,0.55)'
        : 'rgba(47,127,184,0.55)';
      ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
      ctx.strokeStyle = 'rgba(255,255,255,0.7)';
      ctx.setLineDash([5,5]);
      ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
      ctx.setLineDash([]);
    }

    if (editorHole.hole){
      ctx.beginPath();
      ctx.arc(editorHole.hole.x, editorHole.hole.y, HOLE_R, 0, Math.PI*2);
      ctx.fillStyle = '#0b0b0b';
      ctx.fill();
      ctx.strokeStyle = '#e34b4b';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    if (editorHole.tee){
      ctx.beginPath();
      ctx.arc(editorHole.tee.x, editorHole.tee.y, BALL_R + 2, 0, Math.PI*2);
      ctx.fillStyle = '#f4f4f0';
      ctx.fill();
      ctx.strokeStyle = '#3ddc84';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  refreshPlayCustomVisibility();

  /* ===================== SOUND (Web Audio, no files) ===================== */
  let audioCtx = null;
  function ensureAudio(){
    if (!audioCtx){
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch(e){ audioCtx = null; }
    } else if (audioCtx.state === 'suspended'){
      audioCtx.resume();
    }
  }
  function tone(freq, dur, type, vol, delay){
    if (!audioCtx) return;
    const t0 = audioCtx.currentTime + (delay || 0);
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(vol || 0.2, t0);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }
  function playPutt(power){ tone(160 + power * 140, 0.1, 'triangle', 0.22 + power * 0.1); }
  function playBounce(){ tone(340, 0.05, 'square', 0.1); }
  function playSplash(){ tone(180, 0.35, 'sine', 0.18); tone(90, 0.4, 'sine', 0.1, 0.05); }
  function playSand(){ tone(120, 0.12, 'sawtooth', 0.05); }
  function playSink(){ [520,660,780].forEach((f,i)=> tone(f, 0.16, 'sine', 0.22, i*0.08)); }
  function playHoleInOne(){ [440,554,659,880,1108].forEach((f,i)=> tone(f, 0.2, 'triangle', 0.24, i*0.07)); }
  function playRecord(){ [523,659,784,1047].forEach((f,i)=> tone(f, 0.18, 'triangle', 0.26, i*0.09)); }

  /* ===================== STATE ===================== */
  let holeIndex = 0;
  let strokes = 0;
  let totalStrokes = 0;
  let scores = [];
  let ball = {x:0, y:0, vx:0, vy:0, moving:false, sunk:false, sinkAnim:0};
  let aiming = false;
  let dragStart = {x:0, y:0};
  let dragNow = {x:0, y:0};
  let trail = [];
  let confetti = [];
  let flagPhase = 0;

  function getHoleBests(){
    try { return JSON.parse(localStorage.getItem('miniGolfHoleBests') || '{}'); }
    catch(e){ return {}; }
  }
  function setHoleBest(i, val){
    const bests = getHoleBests();
    bests[i] = val;
    localStorage.setItem('miniGolfHoleBests', JSON.stringify(bests));
  }

  function showToast(text){
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = text;
    toastLayer.appendChild(el);
    setTimeout(()=> el.remove(), 2100);
  }

  function loadHole(i){
    const course = activeCourses[i];
    ball.x = course.tee.x;
    ball.y = course.tee.y;
    ball.vx = 0; ball.vy = 0;
    ball.moving = false;
    ball.sunk = false;
    ball.sinkAnim = 0;
    trail = [];
    strokes = 0;
    holeLabel.textContent = `${i + 1} / ${activeCourses.length}`;
    parLabel.textContent = course.par;
    strokeLabel.textContent = strokes;
    if (activeCourses === COURSES){
      const bests = getHoleBests();
      holeBestEl.textContent = bests[i] ? `Din bästa: ${bests[i]} slag` : 'Ingen tid registrerad än';
      holeBestEl.style.display = '';
    } else {
      holeBestEl.style.display = 'none';
    }
  }

  function rectClosestPoint(px, py, rect){
    const cx = Math.max(rect.x, Math.min(px, rect.x + rect.w));
    const cy = Math.max(rect.y, Math.min(py, rect.y + rect.h));
    return {x: cx, y: cy};
  }

  function resolveWallCollisions(){
    const course = activeCourses[holeIndex];
    course.walls.forEach(rect=>{
      const cp = rectClosestPoint(ball.x, ball.y, rect);
      const dx = ball.x - cp.x, dy = ball.y - cp.y;
      const dist = Math.hypot(dx, dy);
      if (dist < BALL_R && dist > 0.0001){
        const nx = dx / dist, ny = dy / dist;
        const overlap = BALL_R - dist;
        ball.x += nx * overlap;
        ball.y += ny * overlap;
        const vDotN = ball.vx * nx + ball.vy * ny;
        const speedBefore = Math.hypot(ball.vx, ball.vy);
        ball.vx -= 2 * vDotN * nx;
        ball.vy -= 2 * vDotN * ny;
        ball.vx *= 0.7; ball.vy *= 0.7;
        if (speedBefore > 0.6) playBounce();
      } else if (dist <= 0.0001){
        ball.x += BALL_R;
      }
    });
  }

  function inRect(px, py, rect){
    return px > rect.x && px < rect.x + rect.w && py > rect.y && py < rect.y + rect.h;
  }

  function spawnConfetti(){
    const colors = ['#4fc9c0','#e8b84b','#ff6b7a','#8ad1ff','#c084fc'];
    for (let i=0;i<40;i++){
      confetti.push({
        x: W/2 + (Math.random()-0.5)*80,
        y: H/2 + (Math.random()-0.5)*40,
        vx: (Math.random()-0.5)*6,
        vy: -Math.random()*6 - 2,
        color: colors[Math.floor(Math.random()*colors.length)],
        life: 1
      });
    }
  }

  function updateConfetti(){
    confetti.forEach(p=>{
      p.x += p.vx; p.y += p.vy; p.vy += 0.18; p.life -= 0.012;
    });
    confetti = confetti.filter(p => p.life > 0);
  }

  function update(){
    flagPhase += 0.05;

    if (ball.moving){
      trail.push({x: ball.x, y: ball.y, life: 1});
      ball.x += ball.vx;
      ball.y += ball.vy;

      if (ball.x < BALL_R){ ball.x = BALL_R; ball.vx *= -0.7; playBounce(); }
      if (ball.x > W - BALL_R){ ball.x = W - BALL_R; ball.vx *= -0.7; playBounce(); }
      if (ball.y < BALL_R){ ball.y = BALL_R; ball.vy *= -0.7; playBounce(); }
      if (ball.y > H - BALL_R){ ball.y = H - BALL_R; ball.vy *= -0.7; playBounce(); }

      resolveWallCollisions();

      const course = activeCourses[holeIndex];
      let friction = FRICTION;
      course.sand.forEach(r => { if (inRect(ball.x, ball.y, r)) friction = 0.92; });

      ball.vx *= friction;
      ball.vy *= friction;

      for (const r of course.water){
        if (inRect(ball.x, ball.y, r)){
          playSplash();
          showToast('I vattnet — tillbaka till tee (+1 slag)');
          ball.x = course.tee.x;
          ball.y = course.tee.y;
          ball.vx = 0; ball.vy = 0;
          ball.moving = false;
          strokes++;
          strokeLabel.textContent = strokes;
          return;
        }
      }

      const speed = Math.hypot(ball.vx, ball.vy);
      if (speed < STOP_SPEED){
        ball.vx = 0; ball.vy = 0;
        ball.moving = false;
      }

      const dHole = Math.hypot(ball.x - course.hole.x, ball.y - course.hole.y);
      if (dHole < HOLE_R - 2 && speed < 2.2){
        sinkHole();
      }
    }

    trail.forEach(t => t.life -= 0.05);
    trail = trail.filter(t => t.life > 0);

    if (ball.sunk && ball.sinkAnim < 1){
      ball.sinkAnim += 0.06;
    }

    updateConfetti();
  }

  function sinkHole(){
    ball.moving = false;
    ball.sunk = true;
    ball.vx = 0; ball.vy = 0;
    totalStrokes += strokes;
    scores.push(strokes);
    totalLabel.textContent = totalStrokes;
    playSink();

    const course = activeCourses[holeIndex];
    const diff = strokes - course.par;

    if (activeCourses === COURSES){
      const bests = getHoleBests();
      const prevBest = bests[holeIndex];
      if (!prevBest || strokes < prevBest){
        setHoleBest(holeIndex, strokes);
        if (prevBest) showToast('Nytt banrekord för det här hålet!');
      }
    }

    let msg;
    if (strokes === 1){ msg = 'HOLE IN ONE!'; playHoleInOne(); spawnConfetti(); }
    else if (diff <= -2){ msg = 'EAGLE! Fantastiskt slag.'; spawnConfetti(); }
    else if (diff === -1) msg = 'BIRDIE! Under par.';
    else if (diff === 0) msg = 'PAR. Solitt jobbat.';
    else if (diff === 1) msg = 'Bogey. Nästan.';
    else msg = 'Lite kämpigt den här, men i mål är i mål.';

    sunkTitle.textContent = strokes === 1 ? 'HOLE IN ONE! 🏆' : 'I HÅL!';
    sunkText.textContent = `${strokes} slag (par ${course.par}) — ${msg}`;
    nextHoleBtn.textContent = (holeIndex === activeCourses.length - 1) ? 'Se resultat' : 'Nästa hål';
    sunkOverlay.classList.remove('hidden');
  }

  function drawCourse(){
    const course = activeCourses[holeIndex];
    const grad = ctx.createLinearGradient(0,0,0,H);
    grad.addColorStop(0, '#1f6b3a');
    grad.addColorStop(1, '#185a30');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,W,H);

    ctx.globalAlpha = 0.06;
    ctx.fillStyle = '#ffffff';
    for (let x = 0; x < W; x += 44) ctx.fillRect(x, 0, 22, H);
    ctx.globalAlpha = 1;

    course.sand.forEach(r=>{
      ctx.fillStyle = '#d9b26a';
      ctx.fillRect(r.x, r.y, r.w, r.h);
      ctx.strokeStyle = 'rgba(120,85,30,0.4)';
      ctx.lineWidth = 2;
      ctx.strokeRect(r.x, r.y, r.w, r.h);
    });
    course.water.forEach(r=>{
      const wgrad = ctx.createLinearGradient(r.x, r.y, r.x, r.y + r.h);
      wgrad.addColorStop(0, '#3a93cf');
      wgrad.addColorStop(1, '#215f8c');
      ctx.fillStyle = wgrad;
      ctx.fillRect(r.x, r.y, r.w, r.h);
    });
    course.walls.forEach(r=>{
      ctx.fillStyle = '#6b4a2f';
      ctx.fillRect(r.x, r.y, r.w, r.h);
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 2;
      ctx.strokeRect(r.x, r.y, r.w, r.h);
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(r.x, r.y, r.w, 4);
    });

    // hole shadow + cup
    ctx.beginPath();
    ctx.arc(course.hole.x, course.hole.y, HOLE_R + 3, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(course.hole.x, course.hole.y, HOLE_R, 0, Math.PI*2);
    ctx.fillStyle = '#0b0b0b';
    ctx.fill();

    // waving flag
    const wave = Math.sin(flagPhase) * 4;
    ctx.strokeStyle = '#d8d8d8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(course.hole.x, course.hole.y);
    ctx.lineTo(course.hole.x, course.hole.y - 46);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(course.hole.x, course.hole.y - 46);
    ctx.quadraticCurveTo(course.hole.x + 14 + wave, course.hole.y - 40, course.hole.x + 20 + wave, course.hole.y - 30);
    ctx.lineTo(course.hole.x, course.hole.y - 30);
    ctx.closePath();
    ctx.fillStyle = '#e34b4b';
    ctx.fill();
  }

  function drawTrail(){
    trail.forEach(t=>{
      ctx.beginPath();
      ctx.arc(t.x, t.y, BALL_R * 0.6 * t.life, 0, Math.PI*2);
      ctx.fillStyle = `rgba(244,244,240,${t.life * 0.35})`;
      ctx.fill();
    });
  }

  function drawBall(){
    if (ball.sunk){
      if (ball.sinkAnim >= 1) return;
      const scale = 1 - ball.sinkAnim;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, BALL_R * scale, 0, Math.PI*2);
      ctx.fillStyle = `rgba(244,244,240,${scale})`;
      ctx.fill();
      return;
    }
    ctx.beginPath();
    ctx.arc(ball.x + 1.5, ball.y + 2, BALL_R * 0.9, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, BALL_R, 0, Math.PI*2);
    ctx.fillStyle = '#f4f4f0';
    ctx.fill();
  }

  function drawAimLine(){
    if (!aiming || ball.moving) return;
    const dx = dragNow.x - dragStart.x;
    const dy = dragNow.y - dragStart.y;
    const len = Math.min(Math.hypot(dx, dy), MAX_DRAG);
    const angle = Math.atan2(dy, dx);
    const aimX = ball.x - Math.cos(angle) * len;
    const aimY = ball.y - Math.sin(angle) * len;
    const power = len / MAX_DRAG;

    // full-course direction ray, faint
    ctx.setLineDash([3,7]);
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(ball.x, ball.y);
    ctx.lineTo(ball.x - Math.cos(angle) * 600, ball.y - Math.sin(angle) * 600);
    ctx.stroke();

    ctx.setLineDash([6,6]);
    ctx.strokeStyle = 'rgba(255,255,255,0.75)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ball.x, ball.y);
    ctx.lineTo(aimX, aimY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = power > 0.75 ? '#ff5c5c' : (power > 0.4 ? '#ffd25c' : '#4fc9c0');
    ctx.beginPath();
    ctx.arc(aimX, aimY, 5, 0, Math.PI*2);
    ctx.fill();

    powerBar.classList.add('show');
    powerFill.style.width = `${power * 100}%`;
    powerFill.style.background = power > 0.75 ? '#ff6b7a' : (power > 0.4 ? '#e8b84b' : '#4fc9c0');
  }

  function drawConfetti(){
    confetti.forEach(p=>{
      ctx.globalAlpha = Math.max(p.life, 0);
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x - 3, p.y - 3, 6, 6);
    });
    ctx.globalAlpha = 1;
  }

  function render(){
    drawCourse();
    drawTrail();
    drawBall();
    drawAimLine();
    drawConfetti();
    if (!aiming) powerBar.classList.remove('show');
  }

  function loop(){
    if (editorMode){
      renderEditor();
    } else {
      update();
      render();
    }
    requestAnimationFrame(loop);
  }

  function getPos(e){
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? (e.touches[0] || e.changedTouches[0]).clientX : e.clientX;
    const clientY = e.touches ? (e.touches[0] || e.changedTouches[0]).clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (W / rect.width),
      y: (clientY - rect.top) * (H / rect.height)
    };
  }

  function pointerDown(e){
    const pos = getPos(e);
    if (editorMode){
      editorPointerDown(pos);
      e.preventDefault();
      return;
    }
    ensureAudio();
    if (ball.moving || ball.sunk) return;
    const d = Math.hypot(pos.x - ball.x, pos.y - ball.y);
    if (d < 30){
      aiming = true;
      dragStart = {x: ball.x, y: ball.y};
      dragNow = pos;
      e.preventDefault();
    }
  }

  function pointerMove(e){
    if (editorMode){
      editorPointerMove(getPos(e));
      e.preventDefault();
      return;
    }
    if (!aiming) return;
    dragNow = getPos(e);
    e.preventDefault();
  }

  function pointerUp(e){
    if (editorMode){
      editorPointerUp();
      return;
    }
    if (!aiming) return;
    aiming = false;
    powerBar.classList.remove('show');
    const dx = dragNow.x - dragStart.x;
    const dy = dragNow.y - dragStart.y;
    const len = Math.min(Math.hypot(dx, dy), MAX_DRAG);
    if (len < 6) return;
    const angle = Math.atan2(dy, dx);
    ball.vx = -Math.cos(angle) * len * POWER_SCALE;
    ball.vy = -Math.sin(angle) * len * POWER_SCALE;
    ball.moving = true;
    strokes++;
    strokeLabel.textContent = strokes;
    playPutt(len / MAX_DRAG);
  }

  canvas.addEventListener('mousedown', pointerDown);
  window.addEventListener('mousemove', pointerMove);
  window.addEventListener('mouseup', pointerUp);
  canvas.addEventListener('touchstart', pointerDown, {passive:false});
  canvas.addEventListener('touchmove', pointerMove, {passive:false});
  canvas.addEventListener('touchend', pointerUp);

  startBtn.addEventListener('click', ()=>{
    ensureAudio();
    activeCourses = COURSES;
    startOverlay.classList.add('hidden');
    holeIndex = 0;
    totalStrokes = 0;
    scores = [];
    totalLabel.textContent = 0;
    loadHole(0);
  });

  nextHoleBtn.addEventListener('click', ()=>{
    sunkOverlay.classList.add('hidden');
    if (holeIndex === activeCourses.length - 1){
      showEndScreen();
    } else {
      holeIndex++;
      loadHole(holeIndex);
    }
  });

  function showEndScreen(){
    const totalPar = activeCourses.reduce((s,c)=>s+c.par, 0);
    const diff = totalStrokes - totalPar;
    const playingOfficialCourse = (activeCourses === COURSES);
    const best = parseInt(localStorage.getItem('miniGolfBestStrokes') || '999', 10);
    let isNewBest = false;
    if (playingOfficialCourse && totalStrokes < best){
      localStorage.setItem('miniGolfBestStrokes', String(totalStrokes));
      isNewBest = true;
      playRecord();
      spawnConfetti();
    }
    endText.textContent = `Totalt ${totalStrokes} slag på ${activeCourses.length} hål ` +
      (diff === 0 ? '(exakt par).' : diff < 0 ? `(${diff} under par!).` : `(+${diff} över par).`) +
      (isNewBest ? ' Nytt personligt rekord!' : '');

    scoreCard.innerHTML = scores.map((s,i)=>{
      const par = activeCourses[i].par;
      const d = s - par;
      const cls = d < 0 ? 'under' : (d > 0 ? 'over' : 'even');
      const dTxt = d === 0 ? 'E' : (d > 0 ? `+${d}` : d);
      return `<div class="sc-cell"><span>Hål ${i+1}</span><span>${s}</span><span class="diff ${cls}">${dTxt}</span></div>`;
    }).join('');

    if (diff <= -3) showToast('Fantastisk runda — flera under par!');
    endOverlay.classList.remove('hidden');
  }

  playAgainBtn.addEventListener('click', ()=>{
    endOverlay.classList.add('hidden');
    holeIndex = 0;
    totalStrokes = 0;
    scores = [];
    totalLabel.textContent = 0;
    loadHole(0);
  });

  loadHole(0);
  loop();
})();
</script>

<script src="i18n-data.js"></script>
<script src="../../i18n.js"></script>
</body>
</html>
