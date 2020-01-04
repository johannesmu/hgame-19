class Payload {
  constructor (player,windSpeed) {
    this.x = player.x;
    this.y = player.y;
    this.rect = player.getTransformedBounds();
    let graphic = new createjs.Graphics();
    graphic.beginFill("olivedrab");
    graphic.setStrokeStyle(2);
    graphic.beginStroke("white");
    graphic.drawRect(this.x + (this.rect.width * 0.7) ,this.y +  (this.rect.height * 0.7), 20, 10);
    this.sprite = new createjs.Shape(graphic);
    this.wind = windSpeed;
  }
}

class Block {
  constructor () {
    this.initX = -30;
    this.initY = 300;
    this.height = this.getHeight();
    
  }
  getHeight() {
    return Math.round( Math.random() * 500 );
  }
}