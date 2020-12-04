// "use strict";

class Hex {
    constructor(x, y, size){
        this.points = [];
        this.x = x; this.y = y;
        this.size = size;

        this.active = false;

        this.hexTween = null;

    }

    set(){
        TWEEN.remove(this.hexTween);
        this.points = [];
        for (let side = 0; side < 7; side++) {
             this.points.push({"x": this.x + this.size * Math.cos(side * 2 * Math.PI / 6),
                               "y": this.y + this.size * Math.sin(side * 2 * Math.PI / 6)});
        }

        this.timerStart();
    }

    timerStart(){

        if(this.points.length >= 2){
           this.active = true;
           this.hexTween = new TWEEN.Tween(this.points[0]).to(this.points[1], 5000).interpolation(TWEEN.Interpolation.Bezier).start().onComplete(() => {
               this.points.splice(0, 1);
               this.timerStart();
               // TWEEN.remove(this.hexTween);
           }).onUpdate(()=>{
               if(this.points.length === 0) TWEEN.remove(this.hexTween);
           });

        }else{
           this.active = false;
        }

        // console.log(this.active);

    }

    draw(ctx){
        ctx.save();
        ctx.rotate(Math.PI + Math.PI/3);
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 4;
        ctx.miterLimit = 4;
        ctx.lineCap = "round";
  			ctx.lineJoin = "round";
        if(this.points.length >= 2){
            for(let i = 0; i < this.points.length-1; i++){
                let p1 = this.points[i], p2 = this.points[i+1];
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.closePath();
                ctx.stroke();
            }
        }

        ctx.restore();
    }
}
