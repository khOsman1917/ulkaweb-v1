// "use strict";

class Timer {
  constructor(callback, step){
      this.last = 0;
      this.acc = 0;
      this.tick = 0;
      this.inc = step || 1/120;
      this.frameId;
      this.callback = callback;
  }

  onFrame(time){
    if (this.last !== null) {
      this.acc = this.acc + (time - this.last) / 1000;
      while (this.acc > this.inc) {
        this.callback(this.inc, this.tick);
        this.tick = this.tick + 1;
        this.acc = this.acc - this.inc;
      }
    }
    this.last = time;
    let _this = this;
    this.frameId = requestAnimationFrame((t) => _this.onFrame(t));
  }

  start(){
    this.last = null;
    let _this = this;
    this.frameId = requestAnimationFrame((t) => _this.onFrame(t));
  }

  stop(){
    cancelAnimationFrame(() => this.frameId());
  }

}
