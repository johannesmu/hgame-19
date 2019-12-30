function initApp() {
  resizeCanvas();
  initStage();
}

function resizeCanvas() {
  //get container width and height
  const gameContainer = document.getElementById('game-container');
  const containerHeight = gameContainer.clientHeight;
  const containerWidth = gameContainer.clientWidth;
  // set canvas width and height
  const canvas = document.getElementById('main-canvas');
  canvas.setAttribute('width', containerWidth);
  canvas.setAttribute('height', (containerHeight - 5));
}

function initStage(elm) {
  // initialise canvas
  const stage = new createjs.Stage(elm);
  return stage;
}

function initTimer(rate) {
  const timer = createjs.Ticker;
  timer.useRAF = true;
  timer.framerate = rate;
  return timer;
}

function setupPlayer() {
  return loadImage("assets/sprites/player/sprite2X.png")
    .then((image) => {
      const spriteSheetData = {
        images: [image],
        frames: {
          width: 400,
          height: 300
        },
        animations: {
          fly: [0, 49],
          dropping: [6],
          dead: [7]
        }
      };
      const spriteSheet = new createjs.SpriteSheet(spriteSheetData);
      const animation = new createjs.Sprite(spriteSheet, "fly");
      const player = new createjs.Sprite(spriteSheet, animation);
      return player;
    })
    .catch((err) => {
      return null;
    })
}

function playerDefault() {

}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    })
    image.addEventListener('error', (err) => reject(err))
    image.src = url;
  })
}

function getControlsConfig( url ) {
  //return a promise
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.overrideMimeType('text/json');
    request.onreadystatechange = () => {
      const rs = request.readyState;
      if (rs == 4 || rs == 0) {
        if (request.status == 200) {
          let data = ( JSON.parse( request.responseText ) ) ? JSON.parse( request.responseText ) : false;
          resolve(data)
        }
        else{
          reject(false);
        }
      }
    }
    request.open('GET', url );
    request.send();
  })
}


function getRandom(limit) {
  return Math.round(Math.random() * limit);
}