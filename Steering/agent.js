const REPRODUCTION_PROB = 0.001;


function Agent(position, dna) {
    this.pos = position;
    this.velocity = p5.Vector.random2D();
    this.accel = createVector(0, 0);
    this.r = 5;
    this.lockedTarged = null;

    this.dna = dna;
    this.maxSpeed = dna.genes[0];
    this.maxForce = dna.genes[1];
    this.range = dna.genes[2];
    this.maxRange = 200;
    this.health = 100;
}

Agent.prototype.seek = function (targets) {
    let minDist = Infinity;
    let closest = null;
    let bestSteer = null;

    for (let target of targets) {
        const d = this.pos.dist(target);

        if (d > this.range) {
            continue;
        }

        const optimal = p5.Vector.sub(target, this.pos);
        const steer = p5.Vector.sub(optimal, this.velocity);

        if (d < minDist) {
            minDist = d;
            closest = target;
            bestSteer = steer;
        }
    }

    this.lockedTarged = closest;

    if (!bestSteer) {
        return;
    }

    this.applyForce(bestSteer);
}

Agent.prototype.applyForce = function (force) {
    force.limit(this.maxForce);
    this.accel.add(force);
}

Agent.prototype.update = function (target) {
    if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
        const center = createVector(width / 2, height / 2);
        const desired = p5.Vector.sub(center, this.pos);
        this.applyForce(p5.Vector.sub(desired, this.velocity));
    }
    this.velocity.add(this.accel);
    this.velocity.limit(this.maxSpeed);
    this.pos.add(this.velocity);
    this.accel.mult(0);
}

Agent.prototype.draw = function () {
    stroke(0, 120, 0);
    if (this.lockedTarged) {
        line(this.pos.x, this.pos.y, this.lockedTarged.x, this.lockedTarged.y);
    }
    push();
    fill(255, 255, 255, map(this.health, 0, 100, 0, 255));
    noStroke();
    translate(this.pos.x, this.pos.y);
    rotate(this.velocity.heading() + PI / 2);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    stroke(120);
    noFill();
    ellipse(0, 0, this.range * 2);
    pop();

}

Agent.prototype.hits = function (obj) {
    const hit = this.pos.dist(obj) <= this.r;
    if (hit) {
        this.health += 5;
    }
    return hit;
}

Agent.prototype.isDead = function () {
    this.health -= .15;
    return this.health <= 0;
}

Agent.prototype.reproduce = function () {
    if (random() < REPRODUCTION_PROB) {
        return new Agent(randomPos(), this.dna.clone());
    }
}