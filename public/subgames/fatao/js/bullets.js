"use strict";

class Bullet {

  constructor() {

    this.x = null;
    this.y = null;
    this.ang = null;

    this.defaultWidth = 14;
    this.spWidth = 42;

    this.w = 18;
    this.speed = 20;

    this.num = null;
    this.showSPBullet = false;

  }

  reset() {
    this.x = null;
    this.y = null;
    this.ang = null;
    this.w = 18;

    this.num = null;
    this.showSPBullet = false;
  }

  set(x, y, ang, num, spB) {
    this.x = x;
    this.y = y;
    this.ang = ang;
    this.w = 18;

    this.num = num;

    this.showSPBullet = spB;
  }

  draw(ctx) {
    if (this.num) {
      this.x += Math.cos(this.ang) * this.speed;
      this.y += Math.sin(this.ang) * this.speed;

      ctx.fillStyle = "white";

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.ang + Math.PI / 2);
      // ctx.fillRect(-this.w/2, -this.w/2, this.w, this.w);
      if (!this.showSPBullet) _bullet.draw(ctx, -this.w / 2, -this.w / 2, 0, this.w, this.w + 3);
      else ctx.drawImage(spBullet, -this.w * 1.5, -this.w * 1.5, this.w * 3, (this.w + 3) * 3);
      ctx.restore();
    }
  }

}