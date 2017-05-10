function Dna(maxSpeed, maxForce, range) {
    this.genes = [maxSpeed, maxForce, range];
}

Dna.random = function() {
    return new Dna(random(1, 15), random(), random(10, height /2));
}

Dna.prototype.clone = function() {
    return new Dna(
        this.mutate(this.genes[0], .05, 1),
        this.mutate(this.genes[1], .05, .05),
        this.mutate(this.genes[2], .05, 10)
    )
}

Dna.prototype.mutate = function(val, prob, ratio) {
    if (random() > prob) {
        return val;
    }

    return val + map(random(), 0, 1, ratio * -1, ratio);
}