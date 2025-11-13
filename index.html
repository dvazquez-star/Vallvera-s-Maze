const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const TILE_SIZE = 20;
const GRID_SIZE = 50;
const NUM_TROPHYS = 30;
let player = {x:1, y:1};
let portal = {x: GRID_SIZE-2, y: GRID_SIZE-2};
let collected = 0;
let inFinalRoom = false;

// Frases absurdas para los trofeos
const insults = [
  "Isabella debería reciclar sus ideas, no su ego.",
  "Ni un black hole absorbe tanta inutilidad como Isabella.",
  "Isabella y la coherencia son conceptos incompatibles.",
  "La gravedad de la mediocridad: Isabella.",
  "Isabella convierte el oxígeno en quejas."
];

let maze = [];

// --- Funciones del laberinto ---
function shuffle(array){return array.sort(()=>Math.random()-0.5);}
function carve(x,y){
  maze[y][x]=0;
  let dirs = shuffle([[0,1],[1,0],[0,-1],[-1,0]]);
  for(let [dx,dy] of dirs){
    let nx = x + dx*2;
    let ny = y + dy*2;
    if(nx>0 && nx<GRID_SIZE-1 && ny>0 && ny<GRID_SIZE-1 && maze[ny][nx]===1){
      maze[y+dy][x+dx]=0;
      carve(nx,ny);
    }
  }
}
function generateMaze(){
  maze=[];
  for(let y=0;y<GRID_SIZE;y++){
    maze[y]=[];
    for(let x=0;x<GRID_SIZE;x++) maze[y][x]=1;
  }
  carve(1,1);
  generateTrophies();
  player = {x:1, y:1};
  portal = {x: GRID_SIZE-2, y: GRID_SIZE-2};
  collected = 0;
  inFinalRoom=false;
  document.getElementById("refreshBtn").style.display="none";
}

// --- Trofeos ---
let trophies=[];
function generateTrophies(){
  trophies=[];
  while(trophies.length<NUM_TROPHYS){
    let tx=Math.floor(Math.random()*GRID_SIZE);
    let ty=Math.floor(Math.random()*GRID_SIZE);
    if(maze[ty][tx]===0 && (tx!==player.x||ty!==player.y) && (tx!==portal.x||ty!==portal.y)){
      if(!trophies.some(t=>t.x===tx && t.y===ty)) trophies.push({x:tx,y:ty});
    }
  }
}

// --- Dibujado ---
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const viewCols=Math.floor(canvas.width/TILE_SIZE);
  const viewRows=Math.floor(canvas.height/TILE_SIZE);
  const startX=Math.max(0, player.x - Math.floor(viewCols/2));
  const startY=Math.max(0, player.y - Math.floor(viewRows/2));

  for(let y=0; y<viewRows; y++){
    for(let x=0; x<viewCols; x++){
      const gx=startX+x;
      const gy=startY+y;
      if(gx>=GRID_SIZE||gy>=GRID_SIZE) continue;
      if(inFinalRoom){
        ctx.fillStyle="#888888"; // sala gris
      } else ctx.fillStyle = maze[gy][gx]===1 ? "#654321" : "#003300";
      ctx.fillRect(x*TILE_SIZE, y*TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }

  if(!inFinalRoom){
    // Trofeos
    ctx.fillStyle="#ffd700";
    trophies.forEach(t=>{
      const sx = t.x - startX;
      const sy = t.y - startY;
      if(sx>=0 && sy>=0 && sx<viewCols && sy<viewRows) ctx.fillRect(sx*TILE_SIZE+5, sy*TILE_SIZE+5, TILE_SIZE-10, TILE_SIZE-10);
    });

    // Portal
    const psx = portal.x - startX;
    const psy = portal.y - startY;
    if(psx>=0 && psy>=0 && psx<viewCols && psy<viewRows){
      ctx.fillStyle="#4b0082";
      ctx.fillRect(psx*TILE_SIZE, psy*TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  } else {
    // Dos puertas finales
    ctx.fillStyle="#800080"; // lila
    ctx.fillRect(canvas.width/4-TILE_SIZE, canvas.height/2-TILE_SIZE, TILE_SIZE*2, TILE_SIZE*2);
    ctx.fillStyle="#ff0000"; // roja
    ctx.fillRect(3*canvas.width/4-TILE_SIZE, canvas.height/2-TILE_SIZE, TILE_SIZE*2, TILE_SIZE*2);
  }

  // Jugador
  const px = player.x - startX;
  const py = player.y - startY;
  ctx.fillStyle="#00ff00";
  ctx.fillRect(px*TILE_SIZE+2, py*TILE_SIZE+2, TILE_SIZE-4, TILE_SIZE-4);
}

// --- Mensaje de trofeo ---
let msgTimeout;
function showTrophyMsg(){
  const msgDiv = document.getElementById("trophyMsg");
  msgDiv.innerText = insults[Math.floor(Math.random()*insults.length)];
  clearTimeout(msgTimeout);
  msgTimeout = setTimeout(()=>{msgDiv.innerText=""},2000);
}

// --- Movimiento del jugador ---
let intangibility = false;
document.addEventListener("keydown",(e)=>{
  let nx=player.x, ny=player.y;

  if(e.key==="ArrowUp") ny--;
  if(e.key==="ArrowDown") ny++;
  if(e.key==="ArrowLeft") nx--;
  if(e.key==="ArrowRight") nx++;

  if(inFinalRoom){
    // detectar colisión con puertas
    if(nx<canvas.width/2/TILE_SIZE){ // lila
      alert("¡Has terminado! Regresas al menú.");
      document.getElementById("introScreen").style.display="flex";
      canvas.style.display="none";
      return;
    } else if(nx>=canvas.width/2/TILE_SIZE){ // roja
      alert("¡Sala secreta descubierta! Gracias por jugar.");
      return;
    }
  }

  if(nx>=0 && ny>=0 && nx<GRID_SIZE && ny<GRID_SIZE && (maze[ny][nx]===0 || intangibility)){
    player.x=nx; player.y=ny;

    for(let i=0;i<trophies.length;i++){
      if(trophies[i].x===player.x && trophies[i].y===player.y){
        trophies.splice(i,1); collected++; showTrophyMsg(); break;
      }
    }

    if(player.x===portal.x && player.y===portal.y && !inFinalRoom){
      if(collected===NUM_TROPHYS){
        inFinalRoom=true;
        // convertir todo en sala gris
        maze = Array(GRID_SIZE).fill().map(()=>Array(GRID_SIZE).fill(0));
        document.getElementById("refreshBtn").style.display="block";
      } else alert("¡Debes recoger todos los trofeos antes de salir!");
    }
  }
});

// --- Loop principal ---
function loop(){draw(); requestAnimationFrame(loop);}
document.getElementById("startBtn").addEventListener("click", ()=>{
  document.getElementById("introScreen").style.display="none";
  canvas.style.display="block";
  document.getElementById("bgMusic").play();
  generateMaze();
  loop();
});

// --- Botón refresh ---
document.getElementById("refreshBtn").addEventListener("click", ()=>{
  document.getElementById("introScreen").style.display="flex";
  canvas.style.display="none";
  document.getElementById("refreshBtn").style.display="none";
});

// --- Admin Panel ---
let adminSequence = ['d','a','n','i','e','l']; 
let adminInput = [];
function showAdminPanel(){
  if(document.getElementById("adminPanel")) return;
  const panel = document.createElement("div");
  panel.id="adminPanel";
  panel.style.position="absolute";
  panel.style.top="50px";
  panel.style.right="50px";
  panel.style.background="rgba(0,0,0,0.8)";
  panel.style.border="2px solid #00ff00";
  panel.style.padding="10px";
  panel.style.zIndex=20;
  panel.style.color="#00ff00";
  panel.style.fontFamily="Courier New, monospace";
  panel.innerHTML = `
    <h3>ADMIN PANEL</h3>
    <button id="finishBtn">Finish Game</button><br><br>
    <button id="allTrophiesBtn">All Trophies Collected</button><br><br>
    <button id="intangibilityBtn">Intangibility (10s)</button><br><br>
    <button id="rerollMazeBtn">Reroll Maze</button>
  `;
  document.body.appendChild(panel);

  document.getElementById("finishBtn").onclick = ()=>{alert("¡Admin Finish! Has ganado."); location.reload();}
  document.getElementById("allTrophiesBtn").onclick = ()=>{collected=NUM_TROPHYS; trophies=[];}
  document.getElementById("intangibilityBtn").onclick = ()=>{
    intangibility=true;
    setTimeout(()=>{intangibility=false; alert("Intangibility ended");},10000);
  }
  document.getElementById("rerollMazeBtn").onclick = ()=>{
    generateMaze();
    alert("Nuevo laberinto generado.");
  }
}

document.addEventListener("keydown", e=>{
  adminInput.push(e.key.toLowerCase());
  if(adminInput.length>adminSequence.length) adminInput.shift();
  if(adminInput.join('')===adminSequence.join('')) showAdminPanel();
});
