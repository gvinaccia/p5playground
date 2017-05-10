const agents = [];
const targets = [];

function setup() {
    createCanvas(800, 500);

    for (let i = 0; i < 10; i++) {
        agents.push(new Agent(
            createVector(width / 2, height / 2),
            Dna.random()
        ));
    }

    for (let i = 0; i < 25; i++) {
        targets.push(randomPos());
    }
}

function draw() {
    background(51);

    fill(0, 255, 0);
    for (let target of targets) {
        ellipse(target.x, target.y, 5);
    }

    for (let i = agents.length - 1; i >= 0; i--) {
        const agent = agents[i];
        agent.draw();
        agent.seek(targets);
        agent.update();

        for (let i = 0; i < targets.length; i++) {
            if (agent.hits(targets[i])) {
                targets[i] = randomPos();
            }
        }

        if (agent.isDead()) {
            console.log("dead");
            agents.splice(i,1);
        }

        const c = agent.reproduce();

        if (c) {
            console.log("newAgent");
            agents.push(c);
        }
    }
}

function randomPos() {
    return createVector(random(width), random(height));
}