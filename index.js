


//VARIAVEIS DO GAME

const foodMaxSize = 40;
const foodMinSize = 5;
const foodNumber = 20;


//MAPEAMENTO DA DOM

const player = document.getElementById("player");
const food = [];
const debugBar = document.getElementById("debug")
const collisionAlert = document.getElementById("collision-alert")
const app = document.getElementById("app"); 


function playerFollow(){
  spawnFood(foodMaxSize, foodMinSize, foodNumber);
  document.addEventListener("mousemove", ()=>{
    
  

    movePlayer();
    checkCollision();
    debugRender();

  })
}


function handleCollision(mob, mobRadius, playerRadius){
  alert(); 

  if(mob.offsetHeight < 2){
    mob.parentNode.removeChild(mob);
    removeFood(mob);
  } else if(mob) {
    setTimeout(()=>{
    mob.style.height = mob.offsetHeight - 1 + 'px'
    mob.style.width = mob.offsetWidth - 1 + 'px'
    player.style.height = (player.offsetHeight) + 1 + 'px'
    player.style.width = (player.offsetWidth) + 1 + 'px'
  }, 100)
  }


  
}
 

 function removeFood(element) {
    const index = food.indexOf(element);
    if (index !== -1) {
        food.splice(index, 1);
    }
    return food;
}


function alert(){
  collisionAlert.classList.remove('hide');
  setTimeout(()=>{
    collisionAlert.classList.add('hide')
  }, 600)
}


function spawnFood(sizeMax, sizeMin, n){
  let maxX = window.innerWidth - 100;
  let maxY = window.innerHeight - 100;
  for(i=0; i<n; i++){
    let w = getRand(sizeMin, sizeMax);
    let h = w;
    let x = getRand(100, maxX - w);
    let y = getRand(100, maxY - w);
 

    let mob = document.createElement("div");
    mob.classList.add("food");
    mob.style.top = x + "px";
    mob.style.left = y + "px";
    mob.style.width = w + "px";
    mob.style.height = h + "px";
    app.appendChild(mob);
    food.push(mob);
  }
}

function getRand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getDistance(x1, y1, x2, y2) {
  let xDist = x2 - x1;
  let yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function checkCollision() {
  let playerCenter = getCenter(player);
  let playerRadius = getDimensions(player)[0] / 2;

  food.forEach((mob) => {
    let mobCenter = getCenter(mob);
    let mobRadius = getDimensions(mob)[0] / 2;

    let distance = getDistance(playerCenter[0], playerCenter[1], mobCenter[0], mobCenter[1]);

    if (distance <= (playerRadius + mobRadius)) {
      handleCollision(mob, mobRadius, playerRadius);
    } 
  });
}

function getCenter(mob) {
  let dimensions = getDimensions(mob);
  let geo = getGeo(mob);
  return [geo[0] + dimensions[0] / 2, geo[1] + dimensions[1] / 2];
}



function movePlayer(){
  let playerDimensions = getDimensions(player);
  let playerW = playerDimensions[0];
  let playerH = playerDimensions[1];

  let mouseX = window.event.clientX - (playerW / 2);
  let mouseY = window.event.clientY - (playerH / 2);

  player.style.transform = `translate(${mouseX}px, ${mouseY}px`;
}


function getArea(mob){
  let mobDimensions = getDimensions(mob);
  let mobWidth = mobDimensions[0];
  let mobHeight = mobDimensions[1];

  let mobGeo = getGeo(mob);
  let mobX = mobGeo[0];
  let mobY = mobGeo[1];

  let mobAreaX = mobX + mobWidth;
  let mobAreaY = mobY + mobHeight;

  return [mobAreaX, mobAreaY];
}

function getDimensions(mob){
  let width = mob.offsetWidth;
  let height = mob.offsetHeight;

  return [width, height];
}

function getGeo(mob){
  let geo = mob.getBoundingClientRect()
  let x = geo.left;
  let y = geo.top;
  return [x, y]
}

function debugRender(){
  let playerGeo = getGeo(player);
  let playerX = playerGeo[0];
  let playerY = playerGeo[1];

  let playerDimensions = getDimensions(player);
  let playerW = playerDimensions[0];
  let playerH = playerDimensions[1];

  let playerArea = getArea(player);
  let playerAreaX = playerArea[0];
  let playerAreaY = playerArea[1];

  let mobArea = getArea(food[0]);
  let mobAreaX = mobArea[0];
  let mobAreaY = mobArea[1];

  let mouseX = window.event.clientX - (playerW / 2);
  let mouseY = window.event.clientY - (playerH / 2);

  debugBar.innerHTML = `Coordenadas do Jogador: ${playerX.toFixed(0)}, ${playerY.toFixed(0)}
                        &nbsp &nbsp | &nbsp &nbsp
                        Tamanho do Jogador: ${player.offsetHeight}
                        &nbsp &nbsp | &nbsp &nbsp
                        Qtd. Comida: ${food.length}`
}




playerFollow();