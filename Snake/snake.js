function Snake(v) {
    this.len = 1;
    this.pos = [];
    this.pos.push(v);

    this.velocity = createVector(0, 0);
    this.velocityRatio = 1;
}

Snake.prototype.show = function () {
    for (let p of this.pos) {
        rect(p.x, p.y, r, r);
    }
}

Snake.prototype.update = function () {
    const p = p5.Vector.add(this.head(), p5.Vector.mult(this.velocity, this.velocityRatio));

    this.pos.push(p);

    this.pos.splice(0, this.pos.length - (this.len));
}

Snake.prototype.head = function () {
    return this.pos[this.pos.length - 1]
}

Snake.prototype.eat = function (food) {
    if (collission(this.head(), food)) {
        s.len++;
        fr += 1;
        frameRate(fr);
        return true;
    }
    return false;
}

Snake.prototype.stillAlive = function () {
    const p = this.head();

    if (p.x < 0 || p.x >= width || p.y < 0 || p.y >= height) {
        return false;
    }

    for (let i = 0; i < this.pos.length - 2; i++) {
        if (collission(p, this.pos[i])) {
            return false
        }
    }

    return true;
}


function collission(v1, v2) {
    return v1.x === v2.x && v1.y === v2.y
}