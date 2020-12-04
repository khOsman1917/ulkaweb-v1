let PLAYER = {
    "name": null,
    "img": new Image(),
    "id": null
  },
  LEADERBOARDLIST = [];

function getLeaderboard(lb) {
  // let players = firebase.database().ref("Players");
  // players.orderByChild("score").limitToFirst(20).on("value", (list)=>{ // success
  //    LEADERBOARDLIST = [];
  //    let entry = {"image": new Image(), "name": null, "score": null};
  //    list.forEach((player)=>{
  //        entry.name = player.val().name;
  //        entry.score = player.val().score;
  //        entry.image.src = player.val().imgurl;
  //        LEADERBOARDLIST.push(entry);
  //    });
  //    if(lb){
  //       lb.set(LEADERBOARDLIST);
  //       lb.fadeIn();
  //    }
  //    window.plugins.spinnerDialog.hide();
  // }, (err)=>{ // failure
  //     window.plugins.spinnerDialog.hide();
  //     console.log("Error in get Leaderboard", err);
  // });
}

function setLeaderboard(score, func) {
  // window.plugins.spinnerDialog.show("Loading", "Plase wait ...", true);
  // if(PLAYER.id){
  //   firebase.database().ref("Players/" + PLAYER.id).set({
  //     name: PLAYER.name,
  //     score: score,
  //     imgurl : PLAYER.img.src
  //   }, (error)=>{
  //       if(!error){ // success
  //          if(func) func();
  //       }else{ // error
  //          window.plugins.spinnerDialog.hide();
  //          console.log("Leaderboard Set Error.", error);
  //       }
  //   });
  // }
}