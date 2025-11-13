const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const TILE_SIZE = 20;
const GRID_SIZE = 50;
const NUM_TROPHYS = 20;
let player = {x:1, y:1};
let collected = 0;
let maze = [];
let trophies = [];
let doorsRoom = false;

// Mensajes absurdos
const insults = [
  "Isabella debería reciclar sus ideas.",
  "Ni un black hole absorbe tanta inutilidad como Isabella.",
  "Isabella y la coherencia son incompatibles.",
  "La gravedad de la mediocridad: Isabella.",
  "Isabella convierte el oxígeno en quejas."
];

// --- Maze ---
function shuffle(array){ return array.sort(()=>Math.random()-0.5); }

function carve(x,y){
  maze[y][x]=0;
  let dirs=shuffle([[0,1],[1,0],[0,-1],[-1,0]]);
  for(let [dx,dy] of dirs){
    let nx=x+dx*2, ny=y+dy*2;
    if(nx>0 && nx<GRID_SIZE-1 && ny>0 && ny<GRID_SIZE-1 && maze[ny][nx]===1){
      maze[y+dy][x+dx]=0;
      carve(nx,ny);
    }
  }
}

function generateMaze(){
  maze = Array.from({length:GRID_SIZE},()=>Array(GRID_SIZE).fill(1));
  carve(1,1);
  generateTrophies();
}

function generateTrophies(){
  trophies=[];
  while(trophies.length<NUM_TROPHYS){
    let tx=Math.floor(Math.random()*GRID_SIZE);
    let ty=Math.floor(Math.random()*GRID_SIZE);
    if(maze[ty][tx]===0 && !(tx===player.x && ty===player.y)) trophies.push({x:tx,y:ty});
  }
}

// --- Draw ---
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const viewCols=Math.floor(canvas.width/TILE_SIZE);
  const viewRows=Math.floor(canvas.height/TILE_SIZE);
  const startX=Math.max(0, player.x - Math.floor(viewCols/2));
  const startY=Math.max(0, player.y - Math.floor(viewRows/2));

  for(let y=0; y<viewRows; y++){
    for(let x=0; x<viewCols; x++){
      const gx=startX+x, gy=startY+y;
      if(gx>=GRID_SIZE||gy>=GRID_SIZE) continue;
      ctx.fillStyle = maze[gy][gx]===1 ? "#654321" : "#003300";
      if(doorsRoom) ctx.fillStyle="#777777";
      ctx.fillRect(x*TILE_SIZE, y*TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }

  // Trophies
  ctx.fillStyle="#ffd700";
  trophies.forEach(t=>{
    const sx=t.x-startX, sy=t.y-startY;
    if(sx>=0 && sy>=0 && sx<viewCols && sy<viewRows) ctx.fillRect(sx*TILE_SIZE+5, sy*TILE_SIZE+5, TILE_SIZE-10, TILE_SIZE-10);
  });

  // Doors room
  if(doorsRoom){
    const purpleDoor = {x:GRID_SIZE/2-2, y:GRID_SIZE/2};
    const redDoor = {x:GRID_SIZE/2+2, y:GRID_SIZE/2};
    ctx.fillStyle="#800080"; ctx.fillRect((purpleDoor.x-startX)*TILE_SIZE,(purpleDoor.y-startY)*TILE_SIZE,TILE_SIZE*2,TILE_SIZE*2);
    ctx.fillStyle="#ff0000"; ctx.fillRect((redDoor.x-startX)*TILE_SIZE,(redDoor.y-startY)*TILE_SIZE,TILE_SIZE*2,TILE_SIZE*2);
  }

  // Player
  const px=player.x-startX, py=player.y-startY;
  ctx.fillStyle="#00ff00";
  ctx.fillRect(px*TILE_SIZE+2, py*TILE_SIZE+2, TILE_SIZE-4, TILE_SIZE-4);
}

// --- Messages ---
let msgTimeout;
function showTrophyMsg(){
  const msgDiv=document.getElementById("trophyMsg");
  msgDiv.innerText=insults[Math.floor(Math.random()*insults.length)];
  msgDiv.style.display="block";
  clearTimeout(msgTimeout);
  msgTimeout=setTimeout(()=>{msgDiv.style.display="none";},2000);
}

function showSecretMsg(){
  const msgDiv=document.getElementById("secretMsg");
  msgDiv.style.display="block";
}

// --- Movement ---
document.addEventListener("keydown",(e)=>{
  let nx=player.x, ny=player.y;
  if(e.key==="ArrowUp") ny--;
  if(e.key==="ArrowDown") ny++;
  if(e.key==="ArrowLeft") nx--;
  if(e.key==="ArrowRight") nx++;

  if(nx>=0 && ny>=0 && nx<GRID_SIZE && ny<GRID_SIZE && (maze[ny][nx]===0 || doorsRoom)){
    player.x=nx; player.y=ny;

    if(!doorsRoom){
      for(let i=0;i<trophies.length;i++){
        if(trophies[i].x===player.x && trophies[i].y===player.y){
          trophies.splice(i,1); collected++; showTrophyMsg(); break;
        }
      }
      if(collected===NUM_TROPHYS){
        // Transform maze into doors room
        doorsRoom=true;
        maze = Array.from({length:GRID_SIZE},()=>Array(GRID_SIZE).fill(0));
      }
    } else {
      // Check doors
      if(player.x>=GRID_SIZE/2-2 && player.x<=GRID_SIZE/2 && player.y===GRID_SIZE/2){
        alert("¡Has salido por la puerta lila! Fin del juego.");
        location.reload();
      }
      if(player.x>=GRID_SIZE/2+2 && player.x<=GRID_SIZE/2+4 && player.y===GRID_SIZE/2){
        showSecretMsg();
      }
    }
  }
});

// --- Intro & Start ---
document.getElementById("startBtn").addEventListener("click", ()=>{
  document.getElementById("introScreen").style.display="none";
  canvas.style.display="block";
  document.getElementById("bgMusic").play();
  generateMaze();
  loop();
});

function loop(){ draw(); requestAnimationFrame(loop); }
