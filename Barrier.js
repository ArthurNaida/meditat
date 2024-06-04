export {Barrier}

class Barrier{
    constructor(ctx, name, xPos, yPos, w, h) {
        this.ctx = ctx;
        this.name = name;
        this.xPos = xPos;
        this.yPos = yPos;
        this.w = w;
        this.h = h;
    }
    collide(unit) {
        switch(unit.name) {
            case 'guy':
                    if (unit.xPos + unit.w >= this.xPos && unit.xPos <= this.xPos - this.w/2
                    && unit.vx > 0 && unit.yPos + unit.h /2>=  this.yPos + this.h) {
                        unit.noWayRight = true;
                    } else {unit.noWayRight = false;}
                    if (unit.xPos <= this.xPos + this.w && unit.xPos + unit.w>= this.xPos +this.w/2 
                    && unit.vx < 0 && unit.yPos + unit.h /2 >=  this.yPos + this.h) {
                        unit.noWayLeft = true;
                    } else {unit.noWayLeft = false;}
                    if (unit.xPos + unit.w <= this.xPos + this.w + unit.w && unit.xPos >= this.xPos - unit.w
                        && unit.yPos + unit.h >=  this.yPos + this.h && unit.yPos + unit.h /2 <=  this.yPos + this.h) {
                        unit.noWayDown = true;
                    } else {unit.noWayDown = false;}
            case 'heart':
                if (unit.yPos + unit.h / 2 >=  this.yPos + this.h) {
                    if ((unit.xPos + unit.w >= this.xPos && unit.xPos <= this.xPos
                    && unit.vx > 0)
                    || (unit.xPos <= this.xPos + this.w && unit.xPos + unit.w >= this.xPos + this.w
                    && unit.vx < 0)) {
                        unit.vx = -unit.vx;
                    }
                }
        }
    }
    drawBarrier() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.xPos, this.yPos, this.w, this.h);
    }
}