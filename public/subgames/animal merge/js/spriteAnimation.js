// "use strict";

class SpriteAnim {
    constructor(imgData, frame, x, y, s, cx, cy, i_s){
         this.animData = [];
         for(let i = 0; i < imgData.length; i++){
             this.animData.push(i);
         }
         this.imgData = imgData;
         this.frame = frame;
         this.frameCount = 0;
         this.speed = 5;

         this.x = x;
         this.y = y;
         this.imgscale = s * assetsScale[assetsIndex];
         // if(respawn) this.respawn = respawn;

         this.cx = cx;
         this.cy = cy;

         this.imageScale = i_s ? i_s : {"x":1,"y":1};
    }

    update(x, y){
        if(x) this.x = x;
        if(y) this.y = y;

        this.frameCount++;
        this.frame += this.frameCount % this.speed === 0 ? 1 : 0;
        this.frame %= this.animData.length;

        // if(this.respawn && this.frame === 0){
        //    this.changePos = true;
        // }
    }

    draw(ctx, s){
       let imgScale = s ? s : this.imgscale;
       ctx.save();
       ctx.translate(this.x, this.y);
       ctx.scale(this.imageScale.x, this.imageScale.y);
       let n = this.animData[this.frame];

       let centerX = this.cx * this.imgData[n].width/(imgScale); // 0 = 0, -1 = -height, 1 = height, .5 = center
       let centerY = this.cy * this.imgData[n].height/(imgScale);

       this.imgData[n].draw(ctx, centerX, centerY, imgScale);
       ctx.restore();
    }
}
