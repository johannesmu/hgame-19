let windDirection = 3;
let player = null;

//in case window gets resized
window.addEventListener('resize', () => {
  resizeCanvas();
});

window.addEventListener('load', () => {
  initApp();
  const windowWidth = document.querySelector('#game-container').clientWidth;
  const windowHeight = document.querySelector('#game-container').clientHeight;
  const canvasElement = document.querySelector('#main-canvas');
  const stage = initStage(canvasElement);
  setupPlayer()
    .then((playerObj) => {
      player = playerObj;
      player.x = windowWidth / 2;
      player.y = 100;
      player.scaleX = 0.5;
      player.scaleY = 0.5;
      player.gotoAndPlay('fly');
      stage.addChild(player);
      stage.update();
    });

  getControlsConfig('data/controls.json')
    .then((config) => {
      if(config) {
        console.log(config.up,config.down,config.drop);
        window.addEventListener('keydown', (event) => {
          if( event.keyCode == config.up ) {
            console.log('upping');
          }
          else if( event.keyCode == config.down ) {
            console.log('downing');
          }
          else if ( event.keyCode == config.drop ) {
            console.log('dropping');
          }
        })
      }
    })
    .catch(() => { })

  // initialise timer
  const timer = initTimer(60);
  timer.on('tick', () => {
    stage.update();
  })
})