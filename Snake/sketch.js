let s;
let fr = 10;
let food;
let buttonStartPos;
let currentState;
let bgSound;
let okSound;
let errorSound;

const r = 10;
const coords = [];

const newGameState = {
    draw() {
        ellipse(buttonStartPos.x, buttonStartPos.y, 50);
    },
    mouseClicked() {
        const mousePos = createVector(mouseX, mouseY);
        if (buttonStartPos.dist(mousePos) <= 25) {
            playSound(bgSound, 0.05);
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
            playSound(okSound, 0.8);
            food = randomVect();
        }

        if (!s.stillAlive()) {
            playSound(errorSound, 0.8);
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

function preload() {
    bgSound = loadSound('assets/bb.mp3');
    okSound = loadSound('assets/sfx_sounds_impact10.wav');
    errorSound = loadSound('assets/sfx_sounds_error3.wav');
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

function playSound(sound, volume) {
    sound.play();
    sound.setVolume(volume);
}