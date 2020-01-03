function initApp() {
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
  // return canvas object + data
  canvasData = { "instance": canvas, "width": containerWidth, "height": containerHeight };
  return canvasData;
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
          dropping: [49],
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

function getControlsConfig(url) {
  //return a promise
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.overrideMimeType('text/json');
    request.onreadystatechange = () => {
      const rs = request.readyState;
      if (rs == 4 || rs == 0) {
        if (request.status == 200) {
          let data = (JSON.parse(request.responseText)) ? JSON.parse(request.responseText) : false;
          resolve(data)
        }
        else {
          reject(false);
        }
      }
    }
    request.open('GET', url);
    request.send();
  })
}

function createPayload(player) {
  // get player position
  const pX = player.x;
  const pY = player.y;
  rect = player.getTransformedBounds();
  // spawn a payload
  const graphic = new createjs.Graphics()
  .beginFill("hsl(143°, 12%, 44%)").drawRect(pX + (rect.width * 0.7) , pY +  (rect.height * 0.7), 20, 10);
  const load = new createjs.Shape(graphic);
  return load;
}

function managePayLoads(payLoadsArray, gameCanvas, gameStage) {
  payLoadsArray.forEach(
    (payload) => {
      payload.x = payload.x + windDirection;
      payload.y = payload.y + dropRate;
      // if payload is outside the canvas
      // console.log( payload.localToGlobal(payload.x,payload.y) );
      let origin = payload.graphics.command;
      let stageX = origin.x + payload.x;
      let stageY = origin.y + payload.y;
      if (stageX > gameCanvas.width || stageX + origin.w < 0 || stageY + origin.h > gameCanvas.height) {
        let obj = payLoadsArray.shift();
        gameStage.removeChild(obj);
        // console.log('payload removed');
      }
    }
  );
}

function createTarget() {

}

function manageTargets() {

}

function setWindDirection() {
  const num = getRandom(100);
  if( num < 25 ) {
    return 2;
  }
  else if( num >=25 && num < 50 ) {
    return 1;
  }
  else if( num >= 50 && num < 75 ) {
    return -1;
  }
  else {
    return -2;
  }
}

function changeWindIndicator( elem, direction ) {
  if( direction > 0 ) {
    elem.classList.remove('left');
    elem.classList.add('right');
  }
  else {
    elem.classList.remove('right');
    elem.classList.add('left');
  }
}

function getRandom(limit) {
  return Math.round(Math.random() * limit);
}