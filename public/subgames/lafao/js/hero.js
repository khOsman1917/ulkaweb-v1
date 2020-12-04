var Hero = Class.extend({
  init: function(x, y, w, h) {

    this.x = x;
    this.y = y;

    this.width = w;
    this.height = h;

    this.x_vel = 0;
    this.y_vel = 0;

    this.gravity = 1.5;

    this.friction = 1;

    this.history = [];

    this.blink = false;
    this.blinkFactor = 1;

    this.eyeX = 0;
    this.eyeY = 0;

    this.skewAmt = 0;
    this.wabbleScale = 0;

  },

  update: function() {

    if (Math.random() > .985) {
      if (!this.blink) this.blink = true;
    }

    this.y_vel += this.gravity;

    this.x += this.x_vel;
    this.y += this.y_vel;

    this.x_vel *= this.friction;
    this.y_vel *= this.friction;

    this.history.push({
      x: this.x + this.width / 2,
      y: this.y + this.height / 2 - 2
    });

    if (this.history.length > 15) {
      this.history.splice(0, 1);
    }

    if (this.x_vel < 0) {
      this.eyeX -= (this.eyeX > -2.5) ? .836 : 0;
    } else if (this.x_vel > 0) {
      this.eyeX += (this.eyeX < 2.5) ? .836 : 0;
    } else {
      this.eyeX += (this.eyeX <= 0) ? .5 : -.5;
    }

    if (this.y_vel > 2) {
      this.eyeY += (this.eyeY < 4.5) ? .75 : 0;
    } else {
      this.eyeY -= (this.eyeY > 0) ? .5 : 0;
    }

    if (this.blink) {
      this.blinkFactor = animate(1, 1500, 0, Math.PI / 2);
      if (this.blinkFactor <= -.95) {
        this.blink = false;
        this.blinkFactor = 1;
      }
    }


  },

  draw: function(ctx) {

    var hL = this.history.length;

    for (var i = 0; i < hL; i++) {
      var pos = this.history[i];

      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255, 255, 255, " + map(i, 0, hL - 1, 0, .1) + ")";

      if (i === 0) {
        if (this.history[i + 1]) {
          ctx.beginPath();
          ctx.moveTo(this.history[i + 1].x, this.history[i + 1].y);
          ctx.lineTo(pos.x, pos.y);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(this.history[i + 1].x + 5, this.history[i + 1].y - 5);
          ctx.lineTo(pos.x + 5, pos.y - 5);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(this.history[i + 1].x - 5, this.history[i + 1].y + 5);
          ctx.lineTo(pos.x - 5, pos.y + 5);
          ctx.stroke();
        }
      } else {
        ctx.beginPath();
        ctx.moveTo(this.history[i - 1].x, this.history[i - 1].y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.history[i - 1].x + 5, this.history[i - 1].y - 5);
        ctx.lineTo(pos.x + 5, pos.y - 5);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.history[i - 1].x - 5, this.history[i - 1].y + 5);
        ctx.lineTo(pos.x - 5, pos.y + 5);
        ctx.stroke();
      }

      pos = null;

    }

    var iniI = Math.round(this.history.length / 3);

    hL = null;
    iniI = null;

    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height);

    var wabbling = 1 - animate(this.wabbleScale, 300, 0, -Math.PI / 2);
    ctx.transform(1 / wabbling, 0, this.skewAmt, wabbling, 0, 0);

    if (this.wabbleScale > 0) this.wabbleScale -= this.wabbleScale / 30;

    ctx.fillStyle = "#92CEE0"; //"#94E092";
    ctx.fillRect(-this.width / 2, -this.height, this.width, this.height);

    ctx.save();
    ctx.translate(this.eyeX, 7.25 + this.eyeY - this.height);
    ctx.scale(1, Math.abs(this.blinkFactor));
    ctx.fillStyle = "#22636B";
    ctx.fillRect(-2.5, -2.5, 5, 5);
    ctx.restore();
    ctx.restore();

  }
});