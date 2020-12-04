require=function a(c,i,d){function s(t,e){if(!i[t]){if(!c[t]){var o="function"==typeof require&&require;if(!e&&o)return o(t,!0);if(l)return l(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var r=i[t]={exports:{}};c[t][0].call(r.exports,function(e){return s(c[t][1][e]||e)},r,r.exports,a,c,i,d)}return i[t].exports}for(var l="function"==typeof require&&require,e=0;e<d.length;e++)s(d[e]);return s}({GameManager:[function(e,t,o){"use strict";cc._RF.push(t,"75e06/dNxZK4YaEHXBK4XV3","GameManager"),Object.defineProperty(o,"__esModule",{value:!0});var n=e("./card"),r=e("./card"),a=cc._decorator,c=a.ccclass,i=a.property,d=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.cardParent=null,e.placedCardParent=null,e.cardPrefab=null,e.cardList=[],e.sprite7=null,e.matchedCards=[],e.maxNumber=3,e.currentIncreamentRange=5,e.cardColors=["e04d69","ffe354","89e232","0abbbb","6d83c2","f05622"],e.filledHex=0,e}var o;return __extends(e,t),(o=e).prototype.onLoad=function(){o.instance=this,cc.director.getCollisionManager().enabled=!0},e.prototype.init=function(){this.spawnCard(),this.spawnCard()},e.prototype.spawnCard=function(){var e=this,t=cc.instantiate(this.cardPrefab);t.parent=this.cardParent,t.position=this.cardParent.children[1].position;var o=this.randomRange(1,this.maxNumber);o<7?t.color=cc.hexToColor(this.cardColors[o-1]):t.getComponent(cc.Sprite).spriteFrame=this.sprite7,t.opacity=130,t.getComponentInChildren(cc.Label).string=o.toString(),t.getComponent(n.default).cardNumber=o,2==this.cardList.length&&this.cardList.shift(),this.cardList.push(t),2==this.cardList.length&&(this.cardList[0].opacity=255,this.cardList[0].getComponent(r.default).moveTo(.4,this.cardParent.children[0].position,!0),setTimeout(function(){e.cardList[0].getComponent(cc.PolygonCollider).enabled=!0},400))},e.prototype.getLatestCard=function(){return this.cardList[0]},e.prototype.spawnCardAtPosition=function(e,t){var o=cc.instantiate(this.cardPrefab);return o.parent=this.cardParent,o.position=t,e<7?o.color=cc.hexToColor(this.cardColors[e-1]):o.getComponent(cc.Sprite).spriteFrame=this.sprite7,o.opacity=255,o.getComponent(n.default).cardNumber=e,o.getComponentInChildren(cc.Label).string=e.toString(),o.parent=this.placedCardParent,o.setScale(cc.v2(1.3,1.3)),o.runAction(cc.scaleTo(.2,1,1)),o.getComponent(n.default)},e.prototype.randomRange=function(e,t){return t++,Math.floor(Math.random()*(t-e)+e)},e.instance=null,__decorate([i(cc.Node)],e.prototype,"cardParent",void 0),__decorate([i(cc.Node)],e.prototype,"placedCardParent",void 0),__decorate([i(cc.Prefab)],e.prototype,"cardPrefab",void 0),__decorate([i({type:[cc.Node],visible:!1})],e.prototype,"cardList",void 0),__decorate([i(cc.SpriteFrame)],e.prototype,"sprite7",void 0),e=o=__decorate([c],e)}(cc.Component);o.default=d,cc._RF.pop()},{"./card":"card"}],Pointer:[function(e,t,o){"use strict";cc._RF.push(t,"2fb59gEtYtJF4Nw9cFKGsEA","Pointer"),Object.defineProperty(o,"__esModule",{value:!0});var n=e("./card"),r=e("./hexagon"),a=e("./GameManager"),c=cc._decorator,i=c.ccclass,d=c.property,s=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.draggingCard=null,e.triggeredCard=null,e.hoveredHex=null,e.isMouseDown=!1,e}return __extends(e,t),e.prototype.start=function(){cc.Canvas.instance.node.on("touchmove",this.followPointer,this),cc.Canvas.instance.node.on("touchstart",this.onPointerDown,this),cc.Canvas.instance.node.on("touchend",this.onPointerUp,this),cc.Canvas.instance.node.on("touchcancel",this.onPointerUp,this)},e.prototype.onPointerUp=function(e){this.hoveredHex&&!this.draggingCard&&(this.draggingCard=a.default.instance.getLatestCard(),this.draggingCard.setScale(1.2,1.2)),this.hoveredHex&&this.draggingCard?cc.Intersection.pointInPolygon(this.node.convertToWorldSpaceAR(cc.Vec2.ZERO),this.hoveredHex.getComponent(cc.PolygonCollider).world.points)?this.placeCard():(this.draggingCard.setScale(cc.Vec2.ONE),this.draggingCard.getComponent(n.default).moveTo(.1,a.default.instance.cardParent.children[0].position,!0)):this.draggingCard&&(this.draggingCard.setScale(cc.Vec2.ONE),this.draggingCard.getComponent(n.default).moveTo(.1,a.default.instance.cardParent.children[0].position,!0)),this.hoveredHex&&(this.hoveredHex.opacity=255),this.hoveredHex=this.draggingCard=this.triggeredCard=null,this.isMouseDown=!1},e.prototype.onPointerDown=function(e){this.followPointer(e),this.isMouseDown=!0},e.prototype.followPointer=function(e){this.node.position=cc.Canvas.instance.node.convertToNodeSpaceAR(e.getLocation()),this.isMouseDown&&this.draggingCard&&(this.draggingCard.position=this.node.position)},e.prototype.placeCard=function(){this.draggingCard.runAction(cc.scaleTo(.4,1,1)),this.draggingCard.parent=a.default.instance.placedCardParent;var e=this.draggingCard.getComponent(n.default);e.moveTo(.1,this.hoveredHex.position,!1),e.toggleInteractivity(!1),this.hoveredHex.getComponent(r.default).onPlaceCard(e,!0),a.default.instance.spawnCard()},e.prototype.onCollisionEnter=function(e,t){2==e.tag?(this.draggingCard=e.node,this.draggingCard.runAction(cc.scaleTo(.4,1.2,1.2))):1==e.tag&&(e.node.color=cc.hexToColor("#0AFF00"),e.node.runAction(cc.scaleTo(.3,1.2,1.2)),this.hoveredHex=e.node)},e.prototype.onCollisionExit=function(e){1==e.tag&&(e.node.color=cc.Color.WHITE,e.node.runAction(cc.scaleTo(.3,1,1)))},__decorate([d({visible:!1})],e.prototype,"draggingCard",void 0),__decorate([d({visible:!1})],e.prototype,"triggeredCard",void 0),__decorate([d({visible:!1})],e.prototype,"hoveredHex",void 0),__decorate([d({visible:!1})],e.prototype,"isMouseDown",void 0),e=__decorate([i],e)}(cc.Component);o.default=s,cc._RF.pop()},{"./GameManager":"GameManager","./card":"card","./hexagon":"hexagon"}],UIManager:[function(e,t,o){"use strict";cc._RF.push(t,"1f9db24HxhOfJaF4dxzNRc0","UIManager"),Object.defineProperty(o,"__esModule",{value:!0});var n=e("./GameManager"),r=cc._decorator,a=r.ccclass,c=r.property,i=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.Score=0,e.inGameScore=null,e.homeScreen=null,e.retryScreen=null,e.gamePlayScreen=null,e.retryScreenCurrentScore=null,e.retryScreenHighScore=null,e.playButtonBG=null,e.splashNode=null,e.retrybuttonNode=null,e.scoreBorder=null,e.scoreStarEffect=null,e.GameLabelNode=null,e.OverLabelNode=null,e.matchingSplash=null,e.isPlayed=!1,e.retryButtonInterval=0,e.tempScale=1.1,e.fadeInOrOut=!0,e}var o;return __extends(e,t),(o=e).prototype.onLoad=function(){o.instance=this},e.prototype.start=function(){this.playButtonBG.runAction(cc.rotateBy(4,360).repeatForever()),window.highscore?cc.log(window.highscore):window.highscore=0,window.Global&&window.Global.isReplay&&this.play()},e.prototype.playMatchingSplashEffect=function(e,t){this.matchingSplash.color=t,this.matchingSplash.opacity=255,this.matchingSplash.setScale(cc.Vec2.ONE),this.matchingSplash.position=e,this.matchingSplash.runAction(cc.fadeOut(.4)),this.matchingSplash.runAction(cc.scaleTo(.4,1.5,1.5))},e.prototype.increaseScoreBy=function(e,t){this.Score+=t*e,this.inGameScore.string=this.Score.toString(),this.Score>window.highscore&&(window.highscore=this.Score)},e.prototype.play=function(){this.playButtonBG.stopAllActions(),this.splashNode.active=!0,this.splashNode.runAction(cc.fadeOut(.5)),setTimeout(function(){},500),n.default.instance.init(),this.homeScreen.active=!1,this.gamePlayScreen.active=!0},e.prototype.retry=function(){this.retrybuttonNode.stopAllActions(),this.scoreBorder.stopAllActions(),this.scoreStarEffect.stopAllActions(),clearInterval(this.retryButtonInterval),window.Global={},window.Global.isReplay=!0,cc.director.loadScene("gamePlay")},e.prototype.onDead=function(){var e=this;this.splashNode.active=!0,this.splashNode.opacity=200,this.GameLabelNode.runAction(cc.moveTo(.3,cc.v2(this.GameLabelNode.x,0)).easing(cc.easeBounceInOut())),setTimeout(function(){e.OverLabelNode.runAction(cc.moveTo(.3,cc.v2(e.OverLabelNode.x,0)).easing(cc.easeBounceInOut()))},300),setTimeout(function(){e.scoreBorder.runAction(cc.rotateBy(6,360).repeatForever()),e.retryScreen.active=!0,e.retryScreen.runAction(cc.fadeIn(.6)),e.gamePlayScreen.active=!1,e.retryScreenCurrentScore.string=e.Score.toString(),e.retryScreenHighScore.string=window.highscore.toString(),e.retrybuttonNode.runAction(cc.scaleTo(.8,e.tempScale,e.tempScale)),e.scoreStarEffect.runAction(cc.fadeOut(.8)),e.retryButtonInterval=setInterval(function(){e.tempScale=1.1==e.tempScale?1:1.1,e.retrybuttonNode.runAction(cc.scaleTo(.8,e.tempScale,e.tempScale)),e.fadeInOrOut=!e.fadeInOrOut,e.scoreStarEffect.runAction(e.fadeInOrOut?cc.fadeIn(.8):cc.fadeOut(.8))},800)},1300)},e.instance=null,__decorate([c(cc.Label)],e.prototype,"inGameScore",void 0),__decorate([c(cc.Node)],e.prototype,"homeScreen",void 0),__decorate([c(cc.Node)],e.prototype,"retryScreen",void 0),__decorate([c(cc.Node)],e.prototype,"gamePlayScreen",void 0),__decorate([c(cc.Label)],e.prototype,"retryScreenCurrentScore",void 0),__decorate([c(cc.Label)],e.prototype,"retryScreenHighScore",void 0),__decorate([c(cc.Node)],e.prototype,"playButtonBG",void 0),__decorate([c(cc.Node)],e.prototype,"splashNode",void 0),__decorate([c(cc.Node)],e.prototype,"retrybuttonNode",void 0),__decorate([c(cc.Node)],e.prototype,"scoreBorder",void 0),__decorate([c(cc.Node)],e.prototype,"scoreStarEffect",void 0),__decorate([c(cc.Node)],e.prototype,"GameLabelNode",void 0),__decorate([c(cc.Node)],e.prototype,"OverLabelNode",void 0),__decorate([c(cc.Node)],e.prototype,"matchingSplash",void 0),e=o=__decorate([a],e)}(cc.Component);o.default=i,cc._RF.pop()},{"./GameManager":"GameManager"}],card:[function(e,t,o){"use strict";cc._RF.push(t,"a4bfbZhiLRImoGrXwYyQ8A+","card"),Object.defineProperty(o,"__esModule",{value:!0});var n=cc._decorator,r=n.ccclass,a=(n.property,function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.cardNumber=0,e.parentHex=null,e.lastInteractibility=!1,e.polygonCollider=null,e}return __extends(e,t),e.prototype.toggleInteractivity=function(e){this.getComponent(cc.PolygonCollider).enabled=e},e.prototype.moveTo=function(e,t,o){var n=this;this.polygonCollider||(this.polygonCollider=this.getComponent(cc.PolygonCollider)),this.polygonCollider.enabled=!1,this.node.runAction(cc.moveTo(e,t)),setTimeout(function(){n.polygonCollider.enabled=o},1e3*e,o)},e=__decorate([r],e)}(cc.Component));o.default=a,cc._RF.pop()},{}],hexagon:[function(e,t,o){"use strict";cc._RF.push(t,"0c147tAGqtErIX4q2I86swj","hexagon"),Object.defineProperty(o,"__esModule",{value:!0});var r=e("./GameManager"),a=e("./UIManager"),n=cc._decorator,c=n.ccclass,i=n.property,d=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.sideHexas=[],e.isfilled=!1,e.points=[],e.isChecked=!1,e.card=null,e}var o;return __extends(e,t),o=e,Object.defineProperty(e.prototype,"isFilled",{get:function(){return this.isfilled},set:function(e){0==e?(this.card=null,r.default.instance.filledHex--):r.default.instance.filledHex++,this.getComponent(cc.PolygonCollider).enabled=!e,this.isfilled=e},enumerable:!0,configurable:!0}),e.prototype.onPlaceCard=function(e,t){var o=this,n=0;t||(n=300),this.card=e,(this.card.parentHex=this).isFilled=!0,setTimeout(function(){o.searchMatch(o.name)},n)},e.prototype.searchMatch=function(e){r.default.instance.matchedCards.push(this.card),this.isChecked=!0;for(var t=0,o=this.sideHexas.length;t<o;t++)0==this.sideHexas[t].isChecked&&this.sideHexas[t].card&&this.sideHexas[t].card.cardNumber==this.card.cardNumber&&this.sideHexas[t].searchMatch(e);if(e==this.name){o=r.default.instance.matchedCards.length;var n=this.card.cardNumber;for(t=0;t<o;t++)r.default.instance.matchedCards[t].parentHex.isChecked=!1;3<=o?this.onMatchFound(n):(r.default.instance.matchedCards.length=0,19==r.default.instance.filledHex&&a.default.instance.onDead())}},e.prototype.onMatchFound=function(t){var o=this;t==r.default.instance.currentIncreamentRange&&(r.default.instance.currentIncreamentRange+=2,r.default.instance.maxNumber++),this.isFilled=!1;for(var n=r.default.instance.matchedCards.length,e=0;e<n;e++)r.default.instance.matchedCards[e].parentHex.uuid!=this.uuid&&(r.default.instance.matchedCards[e].parentHex.isFilled=!1,r.default.instance.matchedCards[e].moveTo(.2,this.node.position,!1));a.default.instance.increaseScoreBy(n,t),setTimeout(function(){for(var e=0;e<n;e++)r.default.instance.matchedCards[e].node.destroy();r.default.instance.matchedCards.length=0,o.onPlaceCard(r.default.instance.spawnCardAtPosition(++t,o.node.position),!1),a.default.instance.playMatchingSplashEffect(o.node.position,o.card.node.color)},200)},__decorate([i([o])],e.prototype,"sideHexas",void 0),e=o=__decorate([c],e)}(cc.Component);o.default=d,cc._RF.pop()},{"./GameManager":"GameManager","./UIManager":"UIManager"}]},{},["GameManager","Pointer","UIManager","card","hexagon"]);