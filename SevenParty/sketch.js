let pos;

function setup() {
    createCanvas(500, 500);
    pos = createVector(width / 2, 10);

    frameRate(3);
    rectMode(CENTER);
}

function draw() {
    background(51);

    
    push();
    translate(pos.x, pos.y);
    rotate(random(PI / - 2, PI / 2));
    fill(255, 0, 255);
    rect(0, 0, 50, 50);
    fill(0, 255, 255);
    rect(0, -30, 30,30);
    pop();

    pos.y = constrain(pos.y + 10, 0, height);
}
