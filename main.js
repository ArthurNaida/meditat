import {Barrier} from './Barrier.js'

const cvs = document.getElementById("board");
const ctx = cvs.getContext("2d");

const width = ctx.canvas.width;
const height = ctx.canvas.height;
const ground = 500;

const guy = {
    name: 'guy',
    img: new Image(),
    imgRevert: new Image(),
    w: width * 0.05,
    h: width * 0.05,
    xPos: 10,
    yPos: ground,
    vx: 0,
    vy: 0,
    direction: "right",
    noWayRight: false,
    noWayLeft: false,
    noWayDown: false,
}
const heart = {
    name: 'heart',
    img: new Image(),
    w: width * 0.04,
    h: width * 0.04,
    xPos: 0,
    yPos: 0,
    vx: 15,
    vy: 0,
    lifetime: 3500
}

const bg = new Image();
guy.img.src = "assets/pixelguy.svg";
guy.imgRevert.src = "assets/pixelguy_revert.svg";
bg.src = "assets/bg.png";
heart.img.src = "assets/heart.svg"

var heartIsThrowed = false;

const stick = new Barrier(ctx, "stick", 700, ground + 45, 15, -260);
const stick2 = new Barrier(ctx, "stick", 900, ground + 45, 225, -260);
function jump() {
    if (guy.yPos >= ground || guy.noWayDown === true) {
        guy.noWayDown = false;
        console.log('jump')
        guy.vy = -20;
    }
}

function jumpFromHeart() {
    guy.vy = -25;
}

function directGuy() {
    if (guy.vx > 0) {
        guy.direction = "right";
    } else if (guy.vx < 0) {
        guy.direction = "left";
    }
}
function onMove(e, unit, vx, btnKey) {
    let btn = e.key;
    if (btn === btnKey) {
        unit.vx = vx;
    }
}
guy.startMoveRight = function(e) {
    if (guy.vx < 0) {
        document.addEventListener("keyup", (eUp) => {
            onMove(eUp, guy, -5, 'ArrowRight');
        });
    } else {
        document.addEventListener("keyup", (eUp) => {
            onMove(eUp, guy, 0, 'ArrowRight');
        });
    }
    onMove(e, guy, 5, 'ArrowRight');
};
guy.startMoveLeft = function(e) {
    if (guy.vx > 0) {
        document.addEventListener("keyup", (eUp) => {
          onMove(eUp, guy, 5, 'ArrowLeft');
        });
    } else {
        document.addEventListener("keyup", (eUp) => {
            onMove(eUp, guy, 0, 'ArrowLeft');
        });
    }
    onMove(e, guy, -5, 'ArrowLeft');
};
guy.endMoveRight = function(e) {
    // console.log(e)
    // if (e.key === 'ArrowLeft') {
    //     console.log(guy.vx)
    //     onMove(e, guy, 5, 'ArrowLeft');
    //     console.log(guy.vx)
    // } else if (e.key === 'ArrowRight') {
        onMove(e, guy, 0, 'ArrowRight');
    // }
};
guy.endMoveLeft = function(e) {
    // if (e.key === 'ArrowRight') {
    //     console.log(guy.vx)
    //     onMove(e, guy, -5, 'ArrowRight');
    //     console.log(guy.vx)
    // } else if (e.key === 'ArrowLeft') {
        onMove(e, guy, 0, 'ArrowLeft');
    // }
};

document.addEventListener("keydown", guy.startMoveRight);
document.addEventListener("keydown", guy.startMoveLeft);

document.addEventListener("keydown", throwHeart);
function throwHeart(e) {
    if (e.key === ' ') {
        heart.vx = (guy.direction === "left" && heart.vx > 0) || (guy.direction === "right" && heart.vx < 0) ? -heart.vx : heart.vx;
        heart.xPos = guy.xPos + 4 * heart.vx;
        heart.yPos = guy.yPos;
        heartIsThrowed = true;
    }
}

function draw() {
    ctx.drawImage(bg, 0, 0, width, height);
    directGuy();
    if (guy.direction === "right") {
        ctx.drawImage(guy.imgRevert, guy.xPos, guy.yPos, guy.w, guy.h);
    } else {
        ctx.drawImage(guy.img, guy.xPos, guy.yPos, guy.w, guy.h);
    }
    stick.drawBarrier();
    stick2.drawBarrier()
    stick.collide(guy);
    stick2.collide(guy)
    if ((!guy.noWayRight || guy.vx < 0) && (!guy.noWayLeft || guy.vx > 0)) {
        guy.xPos += guy.vx;
    }
    if ((guy.yPos >= ground || guy.noWayDown) && guy.vy >= 0) {
        guy.vy = 0;
    } 
    else {
        guy.vy += 1;
    }
    guy.yPos += guy.vy;

    if (heartIsThrowed) {
        heart.xPos +=  heart.vx;
        ctx.drawImage(heart.img, heart.xPos, heart.yPos, heart.w, heart.h);  
        stick.collide(heart);
        // stick2.collide(heart)
    }

    if ((guy.xPos + guy.w / 3 >= heart.xPos - heart.w / 3 && guy.xPos - guy.w / 3 <= heart.xPos + heart.w / 3) &&
    guy.yPos + guy.h / 3 >= heart.yPos - heart.h / 3 && guy.yPos - guy.h / 3 <= heart.yPos + heart.h / 3) {
        jumpFromHeart();
    }
    requestAnimationFrame(draw);
}

bg.onload = draw;