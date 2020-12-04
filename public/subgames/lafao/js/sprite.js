	function Sprite(img, x, y, width, height){
	   this.img = img;
	   this.x = x;
	   this.y = y;
	   this.width = width;
	   this.height = height;
	};

	Sprite.prototype.draw = function(ctx, x, y, n){
	  if(!n){
	    var n = 1;
	  }
	  ctx.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width/n, this.height/n);
	};
	
	var _btnMenu, _btnLeaderB, _btnShare, _btnRetry, _btnVideoAd, _cloud, _cloudTop;
	
	function extractAssets(img){
	
	     _btnMenu = new Sprite(img, 10, 10, 57, 57);
	     _btnLeaderB = new Sprite(img, 80, 10, 57, 57);
	     _btnShare = new Sprite(img, 150, 10, 57, 57);
	     _btnRetry = new Sprite(img, 220, 10, 57, 57);
	     _btnVideoAd = new Sprite(img, 290, 10, 80, 57);
	     _cloud = new Sprite(img, 418, 33, 433, 251);
	     _cloudTop = new Sprite(img, 418, 311, 433, 251);
	
	}
