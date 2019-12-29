function initApp() {
  resizeCanvas();
  initCanvas();
}

function resizeCanvas() {
  //get container width and height
  const gameContainer = document.getElementById('game-container');
  const containerHeight = gameContainer.clientHeight;
  const containerWidth = gameContainer.clientWidth;
  console.log(containerWidth,containerHeight);
  // set canvas width and height
  const canvas = document.getElementById('main-canvas');
  canvas.setAttribute('width', containerWidth );
  canvas.setAttribute('height', (containerHeight - 5) );
}

function initCanvas( elm ) {
  // initialise canvas
  const stage = new createjs.Stage( elm );
  return stage;
}

function setupPlayer() {

}