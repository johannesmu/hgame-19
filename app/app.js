let windDirection = 1;
let player = null;
let dropRate = 4;
let playerAlive = true;
let stage = null;
let canvas = null;
let info = null;
let payLoads = new Array();

//in case window gets resized
window.addEventListener('resize', () => {
  canvas = resizeCanvas();
});

window.addEventListener('load', () => {
  canvas = resizeCanvas();
  initApp();
  info = document.querySelector('#info');
  const windowWidth = document.querySelector('#game-container').clientWidth;
  const windowHeight = document.querySelector('#game-container').clientHeight;
  const canvasElement = document.querySelector('#main-canvas');
  stage = initStage(canvasElement);
  setupPlayer()
    .then((playerObj) => {
      player = playerObj;
      player.x = windowWidth / 2;
      player.y = 100;
      player.scaleX = 0.3;
      player.scaleY = 0.3;
      player.gotoAndPlay('fly');
      stage.addChild(player);
      stage.update();
    });

  getControlsConfig('data/controls.json')
    .then((config) => {
      if (config) {
        console.log(config.up, config.down, config.drop);
        window.addEventListener('keydown', (event) => {
          if (event.keyCode == config.up) {
            console.log('upping');
          }
          else if (event.keyCode == config.down) {
            console.log('downing');
          }
          else if (event.keyCode == config.drop) {
            console.log('dropping');
            if (payLoads.length < 1) {
              let payload = createPayload(player);
              console.log(payload.graphics.command);
              stage.addChild(payload);
              payLoads.push(payload);
            }
          }
        })
      }
    })
    .catch(() => { })

  // initialise timer
  const timer = initTimer(60);
  timer.on('tick', () => {
    info.innerText = timer.framerate.toFixed(2);
    managePayLoads(payLoads, canvas, stage);
    stage.update();
  })
})