const debug = 1;
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
let blocks = new Array();

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
          if (code == config.drop) {
            // console.log('dropping');
            if (payLoads.length < 2) {
              // let payload = createPayload(player);
              const payload = new Payload( player, windDirection );
              player.gotoAndPlay('dropping');
              stage.addChild(payload.sprite);
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
        window.addEventListener('touchstart', () => {
          if (payLoads.length < 2) {
            const payload = new Payload( player, windDirection );
            player.gotoAndPlay('dropping');
            stage.addChild(payload.sprite);
            payLoads.push(payload);
            player.gotoAndPlay('fly');
          }
        })
      }
    })
    .catch(() => { })

  // initialise timer
  const timer = initTimer(60);
  timer.on('tick', () => {
    // frame rate debug info
    info.innerText = (debug == 1 ) ? timer.getMeasuredFPS().toFixed(2) : '';
    // manage payloads animation and removal
    managePayLoads(payLoads, canvas, stage);
    // create block using random timing
    if(  timer.getTicks() % 400  == 0  ) {
      const block = new Block(canvas);
      console.log(block);
      stage.addChild(block.sprite);
      blocks.push(block);
    }
    manageBlocks( blocks, canvas, stage );
    // setting wind direction
    if(  timer.getTicks() % (100 + getRandom(200)) == 0  ) {
      let oldDirection = windDirection;
      let newDirection = setWindDirection();
      if( oldDirection != newDirection ) {
        windDirection = newDirection;
        changeWindIndicator( document.querySelector('.wind'), windDirection )
      }      
    }
    stage.update();
  })
})