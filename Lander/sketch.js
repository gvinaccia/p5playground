const GRAVITY = 3.71;
const MAX_THRUST = 4;

let lander;
let initialThrust = 0;

function setup() {
    createCanvas(500, 500);
    lander = new Lander(1, width / 2, 10);
}

function draw() {
    background(51);

    const gravity = createVector(0, GRAVITY * lander.mass);
    lander.applyForce(gravity);

    lander.setThrust(calcThrust(lander));

    lander.update();
    lander.show();
    lander.checkEdges();
}

function calcThrust(lander) {
    const speed = lander.velocity.mag();
    const altitude = height - lander.pos.y;

    

    let  t = random([0,1,2,3,4]);
    return constrain(t, 0, MAX_THRUST);
}