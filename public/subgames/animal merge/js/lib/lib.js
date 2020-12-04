// "use strict";

let GAME = null, ANIMATION = true, WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight, SCALE = 1, PIXELRATIO = window.devicePixelRatio || 1,
    CANVAS = null, CANVASWIDTH = 360, CANVASHEIGHT = 640, MAINHEIGHT = 0,
    GAME_DATA = null, CANVAS2 = null, ctx2 = null, CANVAS3 = null, ctx3 = null;

let backgroundY = 0, screenX = null, screenY = null, bestScore = 0,
    frames = 0, picsToLoad = 0, downAmt = 0, moveAmt = 0, accordingToWidth = true,
    startTime = 0, translateX = 0, translateY = 0,
    blackScreenAlphaDec = true, blackScreenAlpha = 1, blackScreenAlphaInc = false, onBlackScreenCompletion = null;

var	currentstate = 0,
    theme_1, theme_2, theme_3, buildSound, unboxSound, mergeSound, buttonSound, newBuildingSound, newLevelSound, landLessSound,
    coinSound, circleMidle, addGiftSound, starSound, winSound, swapSound, showboxSound,
    assetsIndex = 1, assetsPath = ["hd","md","sd"], assetsScale = [1.25, 1, .75];

let States = {
    NO_CHANGE: 0,
  	START: 1,
  	MENU: 2,
  	GAME: 3
};

function getSum(a, b) {
    return -(-(a) - (b));
}

function numToString(num, fv, n){
    let _n = 2;
    if(n) _n = n;
    if(num <  1000) num = (num/1).toFixed(fv).toString();
    if(num >= 1000 && num < 1000000) num = (num/1000).toFixed(_n).toString() + " K";
    if(num >= 1000000 && num < 1000000000) num = (num/1000000).toFixed(_n).toString() + " M";
    if(num >= 1000000000 && num < 1000000000000) num = (num/1000000000).toFixed(_n).toString() + " B";
    if(num >= 1000000000000 && num < 1000000000000000) num = (num/1000000000000).toFixed(_n).toString() + " T";
    if(num >= 1000000000000000 && num < 1000000000000000000) num = (num/1000000000000000).toFixed(_n).toString() + " P";
    if(num >= 1000000000000000000) num = (num/1000000000000000000).toFixed(_n).toString() + " E";

    return num;
}

function distance(x1, x2, y1, y2){
   let dx = x1 - x2, dy = y1 - y2, dist = Math.sqrt(dx*dx + dy*dy);
   return Math.round(dist);
}

function norm(value, min, max){
   return (value - min) / (max - min);
}

function lerp(norm, min, max){
   return (max - min) * norm + min;
}

function map(value, sourceMin, sourceMax, destMin, destMax){
   return lerp(norm(value, sourceMin, sourceMax), destMin, destMax);
}

function clamp(value, min, max) {
	 return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
}

function animate(amplitude, period, center, phase, startT) {
   return amplitude * Math.sin(((new Date()).getTime() - startT) * 2 * Math.PI / period + phase) + center;
}

function rangeIntersect(min0, max0, min1, max1){
   return Math.max(min0, max0) >= Math.min(min1, max1) &&
          Math.min(min0, max0) <= Math.max(min1, max1);
}

function rectIntersect(r0, r1){
   return rangeIntersect(r0.x, r0.x+r0.w, r1.x, r1.x+r1.w) &&
          rangeIntersect(r0.y, r0.y+r0.h, r1.y, r1.y+r1.h);
}

function segmentIntersect(p0, p1, p2, p3) {
  	var A1 = p1.y - p0.y,
    		B1 = p0.x - p1.x,
    		C1 = A1 * p0.x + B1 * p0.y,
    		A2 = p3.y - p2.y,
    		B2 = p2.x - p3.x,
    		C2 = A2 * p2.x + B2 * p2.y,
    		denominator = A1 * B2 - A2 * B1;

  		if(denominator === 0){
  		   return null;
  		}

  		var intersectX = (B2 * C1 - B1 * C2) / denominator,
  		    intersectY = (A1 * C2 - A2 * C1) / denominator,
    			rx0 = (intersectX - p0.x) / (p1.x - p0.x),
    			ry0 = (intersectY - p0.y) / (p1.y - p0.y),
    			rx1 = (intersectX - p2.x) / (p3.x - p2.x),
    			ry1 = (intersectY - p2.y) / (p3.y - p2.y);

  		if(((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) &&
  		   ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))){

  		    return{
  			    x: intersectX,
  			    y: intersectY
  			};

  		}else{
  		   return null;
  		}
}

function degToRad(degrees) {
		return degrees / 180 * Math.PI;
}

function radToDeg(radians) {
		return radians * 180 / Math.PI;
}

function randRange(min, max) {
		return min + Math.random() * (max - min);
}

function wheelingLimit(x, y, cx, cy, r) {
/*
@_Use_Case : clamp within a circle ...

let wheeling_1_result = wheelingLimit(xDown1, yDown1, this.carWheel_1.originX, this.carWheel_1.originY, this.carWheel_1.maxRadius);
this.carWheel_1.x = wheeling_1_result.x;
this.carWheel_1.y = wheeling_1_result.y;
*/

    var dist = wheelingDistance(x, y, cx, cy);
    if (dist <= r) {
        return {x: x, y: y};
    }
    else {
       x = x - cx;
       y = y - cy;
       let radians = Math.atan2(y, x);
       return {
           x: Math.cos(radians) * r + cx,
           y: Math.sin(radians) * r + cy
       }
    }
}

function wheelingDistance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));
}

function perlinNoise(x, y, z) {

  /*
    USE CASE:

    map(perlinNoise(x, y, z), 0, 1, -50, 50)

  */

    var p = new Array(512)
    var permutation = [ 151,160,137,91,90,15,
        131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
        190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
        88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
        77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
        102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
        135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
        5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
        223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
        129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
        251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
        49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
        138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180
    ];
    for (var i=0; i < 256 ; i++)
    p[256+i] = p[i] = permutation[i];

    var X = Math.floor(x) & 255,
    Y = Math.floor(y) & 255,
    Z = Math.floor(z) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);
    var u = fade(x),
    v = fade(y),
    w = fade(z);
    var A = p[X  ]+Y, AA = p[A]+Z, AB = p[A+1]+Z,
    B = p[X+1]+Y, BA = p[B]+Z, BB = p[B+1]+Z;

    return _scale(lerp(w, lerp(v, lerp(u, grad(p[AA  ], x  , y  , z   ),
           grad(p[BA  ], x-1, y  , z   )),
           lerp(u, grad(p[AB  ], x  , y-1, z   ),
           grad(p[BB  ], x-1, y-1, z   ))),
           lerp(v, lerp(u, grad(p[AA+1], x  , y  , z-1 ),
           grad(p[BA+1], x-1, y  , z-1 )),
           lerp(u, grad(p[AB+1], x  , y-1, z-1 ),
           grad(p[BB+1], x-1, y-1, z-1 )))));
}

function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }

function grad(hash, x, y, z) {
    var h = hash & 15;
    var u = h<8 ? x : y,
    v = h<4 ? y : h==12||h==14 ? x : z;
    return ((h&1) == 0 ? u : -u) + ((h&2) == 0 ? v : -v);
}
function _scale(n) { return (1 + n)/2; }

function drawRoundImage(ctx, image, size, x, y){
   ctx.save();
   ctx.beginPath();
   ctx.arc(x, y, size/2, 0, 2*Math.PI);
   ctx.clip();
   if(image.draw && image.width > 0){
      image.draw(ctx, x - size/2, y - size/2, null, size, size);
   }
   else if(image.width > 0){
      ctx.drawImage(image, x - size/2, y - size/2, size, size);
   }

   ctx.restore();
}
