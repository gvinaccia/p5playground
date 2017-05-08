let s;
let fr = 10;
let food;
let buttonStartPos;
let currentState;

const r = 10;
const coords = [];

const newGameState = {
    draw() {
        ellipse(buttonStartPos.x, buttonStartPos.y, 50);
    },
    mouseClicked() {
        const mousePos = createVector(mouseX, mouseY);
        if (buttonStartPos.dist(mousePos) <= 25) {
            s = new Snake(randomVect());
            fr = 10;
            frameRate(fr);
            food = randomVect();
            currentState = playingState;
        }
    }
}

const playingState = {
    draw() {
        noStroke();
        fill(255, 255, 0);
        s.update();
        s.show();
        fill(255, 0, 0);

        ellipse(food.x + r / 2, food.y + r / 2, r);
        if (s.eat(food)) {
            food = randomVect();
        }

        if (!s.stillAlive()) {
            currentState = gameOverState;
        }
    },
    mouseClicked() { }
}

const gameOverState = {
    draw() {
        fill(255, 0, 0);
        text("GAME OVER", 10, 60);
        text("punteggio = " + s.len, 20, 80);
    },
    mouseClicked() {
        currentState = newGameState;
    }
}

function setup() {
    createCanvas(500, 500);

    for (let i = 0; i < width; i += r) {
        coords.push(i);
    }

    buttonStartPos = createVector(width / 2, height / 2);

    currentState = newGameState;
}

function draw() {
    background(51);
    fill(255, 255, 255);

    currentState.draw();
}

function mouseClicked() {
    currentState.mouseClicked();
}

function keyPressed() {
    switch (keyCode) {
        case LEFT_ARROW:
            s.velocity = createVector(- r, 0);
            break;
        case RIGHT_ARROW:
            s.velocity = createVector(r, 0);
            break;
        case UP_ARROW:
            s.velocity = createVector(0, - r);
            break;
        case DOWN_ARROW:
            s.velocity = createVector(0, r);
            break;
    }
}

function randomVect() {
    const w = random(coords);
    const h = random(coords);

    return createVector(w, h);
}

