let s;
let fr = 10;
let food;
let state=1;
let buttonStartPos;

const r = 10;
const coords = [];

function setup() {
    createCanvas(500, 500);
    for (let i = 0; i < width; i += r) {
        coords.push(i);
    }

    buttonStartPos = createVector(width/2, height/2);

}

function draw() {
    background(51);
    fill(255,255,255);
    if(state==1){
        newGame();
    }
    if(state==2){
        playing();
    }
    if(state==3){
        gameOver();
    }
}

function intiGame(){
    s = new Snake(randomVect());
    fr = 10;
    frameRate(fr);
    food = randomVect();
    state = 2;
}

function gameOver(){
    fill(255,0,0);
    text("SI MUORT", 10, 60);
    text("punteggio = "+s.len, 20, 80);
    
}

function playing(){
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
        state = 3;
    }
}

function newGame(){
    ellipse(buttonStartPos.x,buttonStartPos.y, 50);
}

function mouseClicked() {
    if(state == 1){
        const mousePos = createVector(mouseX,mouseY);
        if(buttonStartPos.dist(mousePos)<=25){
            intiGame();
        }
    }
    if(state == 3){
        state = 1;
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        s.velocity = createVector(- r, 0);
    } else if (keyCode === RIGHT_ARROW) {
        s.velocity = createVector(r, 0);
    } else if (keyCode === UP_ARROW) {
        s.velocity = createVector(0, - r);
    } else if (keyCode === DOWN_ARROW) {
        s.velocity = createVector(0, r);
    }
}

function randomVect() {
    const w = random(coords);
    const h = random(coords);
    console.log(w, h);
    return createVector(w, h);
}

function Snake(v) {
    this.len = 1;
    this.pos = [];
    this.pos.push(v);

    this.velocity = createVector(0, 0);
    this.velocityRatio = 1;

    this.show = function () {
        for (let p of this.pos) {

            rect(p.x, p.y, r, r);
        }
    }

    this.update = function () {
        const p = p5.Vector.add(this.head(), p5.Vector.mult(this.velocity, this.velocityRatio));



        this.pos.push(p);

        this.pos.splice(0, this.pos.length - (this.len));

        this.stillAlive(p);

    }

    this.head = function () {
        return this.pos[this.pos.length - 1]
    }

    this.eat = function (f) {
        if (collission(this.head(), f)) {
            s.len++;
            fr += 1;
            frameRate(fr);
            return true;
        }
        return false;
    }

    this.stillAlive = function () {
        const p = this.head();
        if (p.x < 0 || p.x >= width || p.y < 0 || p.y >= height) {
            console.log('DEAD');
            return false;
        }
        for (let i = 0; i < this.pos.length - 2; i++) {
            if (collission(p, this.pos[i])) {
                console.log('DEAD');
                return false
            }
        }

        return true;
    }


}

function collission(v1, v2) {
    return v1.x === v2.x && v1.y === v2.y
}

