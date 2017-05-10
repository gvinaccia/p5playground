function Dna(maxSpeed, maxForce, range) {
    this.genes = [maxSpeed, maxForce, range];
}

Dna.random = function() {
    return new Dna(random(1, 15), random(), random(10, height /2));
}