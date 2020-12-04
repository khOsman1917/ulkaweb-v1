"use strict";

class SideScroller{
    constructor(x,y){
        this.people = [];
        this.initX = x;
        this.playBtns = [];
        this.lbScrollX = this.initX;
        this.scrollW = {"x": x, "y": y, "w": canvasWidth, "h": 200};
        this.scrollVel = 0;
        this.elWidth = 150;
        this.listWidth = (this.people.length - 4)*this.elWidth;
        this.maxX = this.initX + this.listWidth;
        this.isInUse = false;
    }

    handleInputs(input){
         if(input.isDown("enter")){
            if(/*xDown > this.scrollW.x && xDown < this.scrollW.x + this.scrollW.w &&*/
               yDown > this.scrollW.y && yDown < this.scrollW.y + this.scrollW.h){
                  this.isInUse = true;
                  this.scrollVel = xDiff/2;
            }else{
               this.isInUse = false;
            }
         }
    }

    set(people){
        this.people = people.slice(0);

        shuffleArray(this.people);

        this.listWidth = this.people.length >= 4 ? (this.people.length - 4)*this.elWidth : this.elWidth;

        this.maxX = this.initX + this.listWidth/2;

        for(let i = 0; i < this.people.length; i++){
            if(this.people[i].id == FBInstant.player.getID()){
               this.people.splice(i, 1);
               i--;
               continue;
            }
            this.people[i].pic = new Image();
            this.people[i].pic.crossOrigin = "anonymous";
            this.people[i].pic.src = this.people[i].img;
            let x = i*this.elWidth/2 + 10, y = this.scrollW.y + this.scrollW.h - 50;

            let action = () => {
               createContext(this.people[i].id, () => {
                   NEXTTARGET.name = this.people[i].name;
                   NEXTTARGET.img.src = this.people[i].img;
                   NEXTTARGET.id = this.people[i].id;
                   NEXTTARGET.score = this.people[i].score;

                   OPPONENT.img.src = this.people[i].img;
                   OPPONENT.score = this.people[i].score;

                   underChallange = false;
                   newChallange = true;

                   _game.currentState.restart();
               });
               console.log(this.people[i].name);
            };

            let _state = this.people[i].id !== FBInstant.player.getID() ? true : false;

            let color = colors[Math.floor(Math.random()*colors.length)];

            let button = new Button(x, y, 35, 27, _state, action, color);
            button.setText("Play", 0, 5, 14, "center", "white");
            this.playBtns.push(button);
        }

    }

    update(){
        this.lbScrollX += this.scrollVel;
        this.scrollVel -= this.scrollVel/10;

        if(Math.abs(this.scrollVel) < .001) this.scrollVel = 0;

        if(this.lbScrollX <= this.initX && Math.abs(this.scrollVel) < 1) this.scrollVel = (this.initX - this.lbScrollX)/10; //this.lbScrollX = this.initX;
        if(this.lbScrollX >= this.maxX && Math.abs(this.scrollVel) < 1) this.scrollVel = (this.maxX - this.lbScrollX)/10;

        if(this.lbScrollX <= this.initX - 70) this.lbScrollX = this.initX - 70;
        if(this.lbScrollX >= this.maxX + 70) this.lbScrollX = this.maxX + 70;
    }

    draw(ctx){
          for(let i = 0; i < this.people.length; i++){
              let centerX = this.people.length >= 5 ? 30 : 30 + ((5 - this.people.length)*this.elWidth/2)/2;
              let x = i*this.elWidth/2 + centerX - this.lbScrollX, y = this.scrollW.y + this.scrollW.h - 50;

              let pimg = this.people[i].pic;
              // console.log(pimg);

              drawRoundImage(ctx, pimg, 50, x, y - 60);
              ctx.drawText("#ffffff", 10, "center", numToString(this.people[i].score), x, y - 20);

              let lbBtn = this.playBtns[i];

              lbBtn.update(x, y);
              lbBtn.draw(ctx);
          }
    }
}
