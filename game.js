const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const TILE_SIZE = 20;
const GRID_SIZE = 50;
const NUM_TROPHYS = 30;
let player = {x:1, y:1};
let portal = {x: GRID_SIZE-2, y: GRID_SIZE-2};
let collected = 0;

// Frases termonucleares para Isabella
const insults = [
  "Isabella debería reciclar sus ideas, no su ego.",
  "Ni un black hole absorbe tanta inutilidad como Isabella.",
  "Isabella y la coherencia son conceptos incompatibles.",
  "La gravedad de la mediocridad: Isabella.",
  "Isabella convierte el oxígeno en quejas."
];

// Generar laberinto
let maze = [];
for(let y=0; y<GRID_SIZE; y++){
  maze[y]=[];
  for(let x=0; x<GRID_SIZE; x++){maze[y][x]=1;}
}

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
carve(1,1);

// Trofeos
let trophies=[];
while(trophies.length<NUM_TROPHYS){
  let tx=Math.floor(Math.random()*GRID_SIZE);
  let ty=Math.floor(Math.random()*GRID_SIZE);
  if(maze[ty][tx]===0 && (tx!==player.x||ty!==player.y) && (tx!==portal.x||ty!==portal.y)){
    if(!trophies.some(t=>t.x===tx && t.y===ty)) trophies.push({x:tx,y:ty});
  }
}

// Dibujar laberinto
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

  // Jugador
  const px = player.x - startX;
  const py = player.y - startY;
  ctx.fillStyle="#00ff00";
  ctx.fillRect(px*TILE_SIZE+2, py*TILE_SIZE+2, TILE_SIZE-4, TILE_SIZE-4);
}

let msgTimeout;
function showTrophyMsg(msg){
  const msgDiv = document.getElementById("achievementMsg");
  msgDiv.innerText = msg;
  clearTimeout(msgTimeout);
  msgTimeout = setTimeout(()=>{msgDiv.innerText=""},3000);
}

// Movimiento del jugador
document.addEventListener("keydown",(e)=>{
  let nx=player.x, ny=player.y;
  if(e.key==="ArrowUp") ny--;
  if(e.key==="ArrowDown") ny++;
  if(e.key==="ArrowLeft") nx--;
  if(e.key==="ArrowRight") nx++;

  if(nx>=0 && ny>=0 && nx<GRID_SIZE && ny<GRID_SIZE && maze[ny][nx]===0){
    player.x=nx; player.y=ny;

    // Trofeos
    for(let i=0;i<trophies.length;i++){
      if(trophies[i].x===player.x && trophies[i].y===player.y){
        trophies.splice(i,1); collected++;
        showTrophyMsg(`¡Logro alcanzado: Orden 18! (${collected}/18)`); // ejemplo
        checkAchievements(); // actualizar logros
        break;
      }
    }

    // Portal
    if(player.x===portal.x && player.y===portal.y){
      if(collected===NUM_TROPHYS){
        showTrophyMsg("¡Has salido por la puerta lila!");
        completeAchievement("Ultima Voluntad");
        setTimeout(()=>{location.reload();},1500);
      } else {
        showTrophyMsg("¡Debes recoger todos los trofeos!");
      }
    }
  }
});

function loop(){draw(); requestAnimationFrame(loop);}
document.getElementById("startBtn").addEventListener("click", ()=>{
  document.getElementById("introScreen").style.display="none";
  canvas.style.display="block";
  document.getElementById("bgMusic").play();
  loop();
});
