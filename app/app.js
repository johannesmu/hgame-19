let windDirection = 3;

window.addEventListener('load', () => {
    initApp();
    const windowWidth = document.querySelector('#game-container').clientWidth;
    const windowHeight = document.querySelector('#game-container').clientHeight;
    const canvasElement = document.querySelector('#main-canvas');
    const stage = initStage( canvasElement );
    const timer = initTimer(120);
    let player = null;
    setupPlayer()
    .then((playerObj) => {
        player = playerObj;
        player.x = windowWidth/2;
        player.y = 100;
        player.scaleX = 0.5;
        player.scaleY = 0.5;
        player.gotoAndPlay('fly');
        stage.addChild(player);
        stage.update();
    })
    
    timer.on('tick', () => {
        stage.update();
    })
})