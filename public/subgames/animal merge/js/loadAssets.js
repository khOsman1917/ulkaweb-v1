// "use strict";
let imageList = [], loadLevel = false, loadUi = false,
    gameBG = new Image(),
    blurImg = new Image(),
    uiImg = new Image(),
    uiNewImg = new Image(),
    uiExtImg = new Image(),
    newWorldImg = new Image(),
    mascotImg = new Image(),
    armadilloImg = new Image(),
    bearImg = new Image(),
    antelopeImg = new Image(),
    camelImg = new Image(),
    catImg = new Image(),
    cheetahImg = new Image(),
    chickenImg = new Image(),
    crocodileImg = new Image(),
    cowImg = new Image(),
    crabImg = new Image(),
    deerImg = new Image(),
    dogImg = new Image(),
    puppyImg = new Image(),
    duckImg = new Image(),
    elephantImg = new Image(),
    frogImg = new Image(),
    foxImg = new Image(),
    giraffeImg = new Image(),
    hippoImg = new Image(),
    horseImg = new Image(),
    koalaImg = new Image(),
    lionImg = new Image(),
    monkeyImg = new Image(),
    owlImg = new Image(),
    pandaImg = new Image(),
    penguinImg = new Image(),
    polarBearImg = new Image(),
    peacockImg = new Image(),
    rabbitImg = new Image(),
    rhinoImg = new Image(),
    sheepImg = new Image(),
    snailImg = new Image(),
    squirrelImg = new Image(),
    tigerImg = new Image(),
    turtleImg = new Image(),
    walrusImg = new Image(),
    zebraImg = new Image();

function countImagesLoading(){
   if(picsToLoad > 0) picsToLoad--;
   if(picsToLoad === 0){
      if(loadLevel){
        extractAssetsNew();
        extractAnimals();
        GAME.currentState.changeState();
      }

      if(loadUi){
         extractAssetsUI();
         startAll();
      }
   }
}

function load_images(imageVar, fileName){
   imageVar.onload = countImagesLoading;
   imageVar.src = fileName;
}

function loadImagesNeeded(ui, loadGame){

  imageList = [];
  loadUi = ui;
  loadLevel = loadGame;

  if(loadGame){
      imageList.push({"varname" : newWorldImg, "src" : "images/"+assetsPath[assetsIndex]+"/newWorld.png"});
      imageList.push({"varname" : blurImg, "src" : "images/"+assetsPath[assetsIndex]+"/blur.png"});
      imageList.push({"varname" : mascotImg, "src" : "images/"+assetsPath[assetsIndex]+"/mascot.png"});
      imageList.push({"varname" : gameBG, "src" : "images/bg.png"});

      imageList.push({"varname" : antelopeImg, "src" : "images/animals/antelope.png"});
      imageList.push({"varname" : armadilloImg, "src" : "images/animals/armadillo.png"});
      imageList.push({"varname" : bearImg, "src" : "images/animals/bear.png"});
      imageList.push({"varname" : catImg, "src" : "images/animals/cat.png"});
      imageList.push({"varname" : cheetahImg, "src" : "images/animals/cheetah.png"});
      imageList.push({"varname" : chickenImg, "src" : "images/animals/chicken.png"});
      imageList.push({"varname" : camelImg, "src" : "images/animals/camel.png"});
      imageList.push({"varname" : cowImg, "src" : "images/animals/cow.png"});
      imageList.push({"varname" : crabImg, "src" : "images/animals/crab.png"});
      imageList.push({"varname" : crocodileImg, "src" : "images/animals/crocodile.png"});
      imageList.push({"varname" : deerImg, "src" : "images/animals/deer.png"});
      imageList.push({"varname" : dogImg, "src" : "images/animals/dog.png"});
      imageList.push({"varname" : duckImg, "src" : "images/animals/duck.png"});
      imageList.push({"varname" : elephantImg, "src" : "images/animals/elephant.png"});
      imageList.push({"varname" : frogImg, "src" : "images/animals/frog.png"});
      imageList.push({"varname" : foxImg, "src" : "images/animals/fox.png"});
      imageList.push({"varname" : giraffeImg, "src" : "images/animals/giraffe.png"});
      imageList.push({"varname" : hippoImg, "src" : "images/animals/hippo.png"});
      imageList.push({"varname" : horseImg, "src" : "images/animals/horse.png"});
      imageList.push({"varname" : koalaImg, "src" : "images/animals/koala.png"});
      imageList.push({"varname" : lionImg, "src" : "images/animals/lion.png"});
      imageList.push({"varname" : monkeyImg, "src" : "images/animals/monkey.png"});
      imageList.push({"varname" : owlImg, "src" : "images/animals/owl.png"});
      imageList.push({"varname" : pandaImg, "src" : "images/animals/panda.png"});
      imageList.push({"varname" : penguinImg, "src" : "images/animals/penguin.png"});
      imageList.push({"varname" : peacockImg, "src" : "images/animals/peacock.png"});
      imageList.push({"varname" : puppyImg, "src" : "images/animals/puppy.png"});
      imageList.push({"varname" : polarBearImg, "src" : "images/animals/polarbear.png"});
      imageList.push({"varname" : rabbitImg, "src" : "images/animals/rabbit.png"});
      imageList.push({"varname" : rhinoImg, "src" : "images/animals/rhino.png"});
      imageList.push({"varname" : sheepImg, "src" : "images/animals/sheep.png"});
      imageList.push({"varname" : squirrelImg, "src" : "images/animals/squirrel.png"});
      imageList.push({"varname" : tigerImg, "src" : "images/animals/tiger.png"});
      imageList.push({"varname" : turtleImg, "src" : "images/animals/turtle.png"});
      imageList.push({"varname" : snailImg, "src" : "images/animals/snail.png"});
      imageList.push({"varname" : walrusImg, "src" : "images/animals/walrus.png"});
      imageList.push({"varname" : zebraImg, "src" : "images/animals/zebra.png"});
  }

  if(ui){
     imageList.push({"varname" : uiImg, "src" : "images/"+assetsPath[assetsIndex]+"/ui.png"});
     imageList.push({"varname" : uiNewImg, "src" : "images/"+assetsPath[assetsIndex]+"/uinew.png"});
     imageList.push({"varname" : uiExtImg, "src" : "images/"+assetsPath[assetsIndex]+"/ui_extention.png"});
  }

  picsToLoad = imageList.length;

  for(let i = 0; i < imageList.length; i++){
	    load_images(imageList[i].varname, imageList[i].src);
  }
}
