// "use strict";

class CoinRain{
    constructor(){
        this.coins = new Array(15);
        // this.s = 9;

        for(let i = 0; i < this.coins.length; i++){
            let coin = {
                "x": Math.random()*(CANVASWIDTH-50)+25,
                "y": -200 - Math.random()*600,
                "s": Math.round(Math.random()*4)+5,
                "phase": Math.random()*Math.PI,
                "rot": Math.random()*Math.PI,
                "speed": Math.floor(Math.random()*7 + 4),
                "continue": false
            };
            this.coins[i] = coin;
        }

        this.gravity = .075;

        this.respawn = false;
    }

    draw(ctx){
        for(let i = 0; i < this.coins.length; i++){
            let coin = this.coins[i];
            if(coin.y > -200){
                ctx.save();
                ctx.translate(coin.x, coin.y);
                ctx.rotate(coin.rot);
                // ctx.scale(animate(1, 2000, 0, coin.phase, 0), 1);
                uiElem.coinsingle.draw(ctx, -uiElem.coinsingle.width/(2*coin.s),  -uiElem.coinsingle.height/(2*coin.s), coin.s);
                ctx.restore();

                coin.rot += .1;
            }
            if(coin.continue){
               coin.y += coin.speed;
               coin.speed += this.gravity;
            }


            if(coin.y >= CANVASHEIGHT+200){
               coin.x = Math.random()*(CANVASWIDTH-50)+25;
               coin.y = -200 - Math.random()*200;
               coin.rot = Math.random()*Math.PI;
               coin.speed = Math.floor(Math.random()*7 + 4);
            }
            if(coin.y <= -200) coin.continue = this.respawn;
        }
    }
}
