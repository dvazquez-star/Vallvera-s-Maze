const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const TILE_SIZE = 20;
const GRID_SIZE = 50;
const NUM_TROPHYS = 30;
let player = {x:1, y:1};
let portal = {x: GRID_SIZE-2, y: GRID_SIZE-2};
let collected = 0;
let intangibility = false;

// Frases termonucleares
const insults = [
  "Isabella debería reciclar sus ideas, no su ego.",
  "Ni un black hole absorbe tanta inutilidad como Isabella.",
  "Isabella y la coherencia son conceptos incompatibles.",
  "La gravedad de la mediocridad: Isabella.",
  "Isabella convierte el oxígeno en quejas."
];

let maze = [];
let trophies = [];

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
  player={x:1,y:1};
  maze=[];
  for(let y=0;y<GRID_SIZE;y++){
    maze[y]=[];
    for(let x=0;x<GRID_SIZE;x++) maze[y][x]=1;
  }
  carve(1,1);
  trophies=[];
  while(trophies.length<NUM_TROPHYS){
    let tx=Math.floor(Math.random()*GRID_SIZE);
    let ty=Math.floor(Math.random()*GRID_SIZE);
    if(maze[ty][tx]===0 && (tx!==player.x||ty!==player.y) && (tx!==portal.x||ty!==portal.y)){
      if(!trophies.some(t=>t.x===tx && t.y===ty)) trophies.push({x:tx,y:ty});
    }
  }
}
generateMaze();

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
      ctx.fillStyle = maze[gy][gx]===1 ? "#654321" : "#003300";
      ctx.fillRect(x*TILE_SIZE, y*TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }
  ctx.fillStyle="#ffd700";
  trophies.forEach(t=>{
    const sx=t.x-startX;
    const sy=t.y-startY;
    if(sx>=0 && sy>=0 && sx<viewCols && sy<viewRows) ctx.fillRect(sx*TILE_SIZE+5, sy*TILE_SIZE+5, TILE_SIZE-10, TILE_SIZE-10);
  });
  const psx = portal.x - startX;
  const psy = portal.y - startY;
  if(psx>=0 && psy>=0 && psx<viewCols && psy<viewRows){
    ctx.fillStyle="#4b0082";
    ctx.fillRect(psx*TILE_SIZE, psy*TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  const px=player.x - startX;
  const py=player.y - startY;
  ctx.fillStyle="#00ff00";
  ctx.fillRect(px*TILE_SIZE+2, py*TILE_SIZE+2, TILE_SIZE-4, TILE_SIZE-4);
}

let msgTimeout;
function showTrophyMsg(){
  const msgDiv = document.getElementById("trophyMsg");
  msgDiv.innerText = insults[Math.floor(Math.random()*insults.length)];
  clearTimeout(msgTimeout);
  msgTimeout=setTimeout(()=>{msgDiv.innerText=""},2000);
}

let adminSequence=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let adminInput=[];
function showAdminPanel(){
  if(document.getElementById("adminPanel")) return;
  const panel=document.createElement("div");
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
  panel.innerHTML=`
    <h3>ADMIN PANEL</h3>
    <button id="finishBtn">Finish Game</button><br>
    <button id="allTrophiesBtn">All Trophies Collected</button><br>
    <button id="intangibilityBtn">Intangibility (10s)</button><br>
    <button id="rerollMazeBtn">Reroll Maze</button><br>
    <button id="twoDoorsBtn">Two Doors</button>
    <button id="refreshBtn">Refresh Menu</button>
  `;
  document.body.appendChild(panel);
  document.getElementById("finishBtn").onclick = ()=>{alert("¡Admin Finish! Has ganado."); location.reload();}
  document.getElementById("allTrophiesBtn").onclick = ()=>{collected=NUM_TROPHYS; trophies=[];}
  document.getElementById("intangibilityBtn").onclick = ()=>{
    intangibility=true;
    setTimeout(()=>{intangibility=false; alert("Intangibility ended");},10000);
  }
  document.getElementById("rerollMazeBtn").onclick = ()=>{generateMaze();}
  document.getElementById("twoDoorsBtn").onclick = ()=>{
    maze=[];
    for(let y=0;y<GRID_SIZE;y++){maze[y]=[]; for(let x=0;x<GRID_SIZE;x++) maze[y][x]=0;}
    portal={x:GRID_SIZE/2-2,y:GRID_SIZE/2};
    trophies=[];
  }
  document.getElementById("refreshBtn").onclick = ()=>{location.reload();}
}

document.addEventListener("keydown", e=>{
  adminInput.push(e.key);
  if(adminInput.length>adminSequence.length) adminInput.shift();
  if(adminInput.join(',')===adminSequence.join(',')) showAdminPanel();

  let nx=player.x, ny=player.y;
  if(e.key==="ArrowUp") ny--;
  if(e.key==="ArrowDown") ny++;
  if(e.key==="ArrowLeft") nx--;
  if(e.key==="ArrowRight") nx++;
  if(nx>=0 && ny>=0 && nx<GRID_SIZE && ny<GRID_SIZE && (maze[ny][nx]===0 || intangibility)){
    player.x=nx; player.y=ny;
    for(let i=0;i<trophies.length;i++){
      if(trophies[i].x===player.x && trophies[i].y===player.y){
        trophies.splice(i,1); collected++; showTrophyMsg(); break;
      }
    }
    // Si todos los trofeos recogidos, mostrar dos puertas
    if(collected===NUM_TROPHYS && trophies.length===0){
      maze=[];
      for(let y=0;y<GRID_SIZE;y++){maze[y]=[]; for(let x=0;x<GRID_SIZE;x++) maze[y][x]=0;}
      // Puertas: lila y roja
      portal={x:GRID_SIZE/2-3,y:GRID_SIZE/2};
      trophies.push({x:GRID_SIZE/2+3,y:GRID_SIZE/2,door:"red"});
      trophies.push({x:GRID_SIZE/2+5,y:GRID_SIZE/2,door:"purple"});
    }
    // Cruzar puerta roja
    trophies.forEach(t=>{
      if(t.door==="red" && player.x===t.x && player.y===t.y){
        alert("Gracias por jugar a mi juego, ¡ojalá lo hayas disfrutado tanto como yo!");
        location.reload();
      }
    });
  }
});

function loop(){draw(); requestAnimationFrame(loop);}

document.getElementById("startBtn").addEventListener("click", ()=>{
  document.getElementById("introScreen").style.display="none";
  canvas.style.display="block";
  document.getElementById("bgMusic").play();
  loop();
});
