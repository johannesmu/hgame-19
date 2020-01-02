let windDirection = 1;
let player = null;
let playerBounds = null;
let playerMovementRate = 10;
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
      playerBounds = player.getTransformedBounds();
      player.gotoAndPlay('fly');
      stage.addChild(player);
      stage.update();
    });

  getControlsConfig('data/controls.json')
    .then((config) => {
      if (config) {
        window.addEventListener('keydown', (event) => {
          const code = event.code;
          console.log(event.code)
          if (code == config.drop) {
            // console.log('dropping');
            if (payLoads.length < 2) {
              let payload = createPayload(player);
              player.gotoAndPlay('dropping');
              stage.addChild(payload);
              payLoads.push(payload);
              player.gotoAndPlay('fly');
            }
          }
          else if (code == config.down) {
            player.y = (player.y < (canvas.height - playerBounds.height) ) ? player.y + playerMovementRate: player.y;
          }
          else if (code == config.up) {
            player.y = (player.y > 60)  ? player.y - playerMovementRate : player.y;
          }
        });
        
      }
    })
    .catch(() => { })

  // initialise timer
  const timer = initTimer(60);
  timer.on('tick', () => {
    info.innerText = timer.framerate.toFixed(2);
    managePayLoads(payLoads, canvas, stage);
    if(  timer.getTicks() % 100 == 0  ) {
      windDirection = setWindDirection();
      changeWindIndicator( document.querySelector('.wind'), windDirection ) 
    }
    stage.update();
  })
})