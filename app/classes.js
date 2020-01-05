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
  constructor ( canvas ) {
    this.initX = 0;
    this.initY = canvas.height;
    this.height = this.getHeight();
    const graphic = new createjs.Graphics();
    graphic.beginFill('red');
    graphic.drawRect(0, 0, 100, this.height + 300 );
    this.sprite = new createjs.Shape( graphic );
    this.sprite.x = -100;
    this.sprite.y = canvas.height - 100;
    this.sprite.regX = 0;
    this.sprite.regY = this.height;
  }
  getHeight() {
    return Math.round( Math.random() * 400 );
  }
}