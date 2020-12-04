// "use strict";

	class Sprite{
			constructor(img, x, y, width, height){
				   this.img = img;
				   this.x = x;
				   this.y = y;
				   this.width = width;
				   this.height = height;

					 this.scale = 1;
			}

			draw(ctx, x, y, n, w, h){
					 if(!n){
							let _w, _h;

						  if(w && !h){
			           _w = Math.floor(w);
								 _h = Math.floor(this.height / (this.width / w));

								 this.scale = (this.width / w);
							}else if(!w && h){
			           _h = Math.floor(h);
								 _w = Math.floor(this.width / (this.height / h));

								 this.scale = (this.height / h);
							}else if(w && h){
								 _w = Math.floor(w);
								 _h = Math.floor(h);

								 this.scale = (this.width / w);
							}

							ctx.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, _w, _h);

					 }else{
						   this.scale = n;
							 ctx.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width/n, this.height/n);
					 }

			}
	}

	let animalList = [], newWorldTrees = [], newWorldElem = {},
			uiElem = {};

	function extractAnimals(){
		 for(let i = 0; i < animalSpriteList.length; i++){
         let alist = animalSpriteList[i], tempArr = [];
         for(let j = 0; j < alist.frames.length; j++){
					   let _img = new Sprite(alist.varName, alist.frames[j].frame.x, alist.frames[j].frame.y, alist.frames[j].frame.w, alist.frames[j].frame.h);

					   tempArr.push(_img);
				 }
         animalList.push(tempArr);
		 }
	}

	function extractAssetsNew(){

		   // glLoaded = true;

			 for(let i = 0; i < newWorld.frames.length; i++){
					 let _img = new Sprite(newWorldImg, newWorld.frames[i].frame.x, newWorld.frames[i].frame.y, newWorld.frames[i].frame.w, newWorld.frames[i].frame.h);
					 let elem = ""+newWorld.frames[i].filename+"";

					 // greenIslandElem[elem] = _img;
					 if(elem.match(/Tree_/))
					 		 newWorldTrees.push(_img);
					 else
					     newWorldElem[elem] = _img;
			 }

	}

	function extractAssetsUI(){

			 for(let i = 0; i < ui.frames.length; i++){
					 let _img = new Sprite(uiImg, ui.frames[i].frame.x, ui.frames[i].frame.y, ui.frames[i].frame.w, ui.frames[i].frame.h);
					 let elem = ""+ui.frames[i].filename+"";

					 uiElem[elem] = _img;
			 }

			 for(let i = 0; i < uiNew.frames.length; i++){
					 let _img = new Sprite(uiNewImg, uiNew.frames[i].frame.x, uiNew.frames[i].frame.y, uiNew.frames[i].frame.w, uiNew.frames[i].frame.h);
					 let elem = ""+uiNew.frames[i].filename+"";

					 uiElem[elem] = _img;
			 }

			 for(let i = 0; i < uiExt.frames.length; i++){
					 let _img = new Sprite(uiExtImg, uiExt.frames[i].frame.x, uiExt.frames[i].frame.y, uiExt.frames[i].frame.w, uiExt.frames[i].frame.h);
					 let elem = ""+uiExt.frames[i].filename+"";

					 uiElem[elem] = _img;
			 }

	}
