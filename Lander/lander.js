function Lander(m, x, y) {
    this.mass = m;
    this.pos = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.thrust = createVector(0, -1);
}

Lander.prototype.applyForce = function (force) {
    const f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
}

Lander.prototype.setThrust = function (val) {
    this.thrust.setMag(val);
}

Lander.prototype.update = function () {
    this.applyForce(this.thrust);
    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);
    this.acceleration.mult(0);
};

Lander.prototype.show = function () {
    stroke(0);
    strokeWeight(2);
    fill(255, 127);
    push();
    translate(this.pos.x, this.pos.y);
    const r = this.mass * 16;
    ellipse(0,0,r,r);
    line(0, (r/2), 0, (r / 2) + (this.thrust.mag() * 4));
    pop();
};

Lander.prototype.checkEdges = function () {
    if (this.pos.y > (height - this.mass * 8)) {
        this.velocity.y = 0; // *= -0.9;
        this.pos.y = (height - this.mass * 8);
    }
};
