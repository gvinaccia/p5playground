let grid = [];
const cols = 20;
const rows = cols;
const bombs = 10;

let scale;

const neighbourMap = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0,1],
    [1,1]
]

function setup() {

    createCanvas(500, 500);

    scale = width / cols;

    init();
}

function init() {

    currentState = new PlayingState();

    grid = [];

    for (let i = 0; i<cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid.push(new Cell(j, i, random()< map((cols*rows)/cols, 0, cols*rows, 0, 1)));
        }
    }

    for (let cell of grid) {
        cell.calcBombCount();
    }
}

function draw() {
    background(51);

    currentState.draw();   
}

class PlayingState {
    draw() {
        let count = 0;
        for (let cell of grid) {
            cell.show();
            if(!cell.isRevealed && !cell.isBomb) {
                count++;
            }
        }

        if(count == 0) {
            currentState = new WinningState();
        }
    }

    mousePressed() {
        let col = floor(mouseX / scale);
        let row = floor(mouseY / scale);

        let cell = cellAt(col, row);

        if (cell) {
            if(mouseButton == RIGHT) {
                cell.toggleFlag();
            } else if(!cell.isFlagged()){
                cell.reveal()
            }
           
        }
    }
}

class EndState {
    draw() {
        for (let col of grid) {
            if(col.isBomb){
                col.setReveal(true);               
            };
            col.show();
        }
        noLoop();
    }

    mousePressed() {
        init();  
        loop();      
    }
}

class WinningState {
    draw() {
        

        for (let col of grid) {
            if(col.isBomb){
                col.setReveal(true);               
            };
            col.show();
        }

        background(50,100);
        textSize(50);
        textAlign(CENTER);
        fill(255);
        text('HAI VINTO', width / 2, height /2);
        
        noLoop();
    }

    mousePressed() {
        init();  
        loop();      
    }
}

function mousePressed() {

    console.log(mouseButton);

    console.log('mousePressed', currentState);

    currentState.mousePressed();
}

class Cell {
    constructor(col, row, isBomb) {
        this.col = col;
        this.row = row;
        this.isBomb = isBomb;
        this.isRevealed = false;
        this.flagged = false;
    }

    toggleFlag() {
        this.flagged = !this.flagged;
    }

    isFlagged() {
        return this.flagged;
    }

    setReveal(val) {
        this.isRevealed = val;
    }
    
    reveal() {
        this.setReveal(true);

        if (this.isBomb) {
            currentState = new EndState();
        }else if (this._bombsCount == 0) {
            this.visitNeighbours((n) => {
                if (! n.isRevealed) {
                    n.reveal();
                }
            })
        }
    
    }

    visitNeighbours(fn) {
        for (let offsets of neighbourMap) {
            let c = this.col + offsets[0];
            let r = this.row + offsets[1];

            if (c < 0 || c >= cols || r < 0 || r >= rows ) {
                continue;
            } 

            let cell = cellAt(c, r);

            if (cell) {
                fn(cell);
            }
        }
    }

    calcBombCount() {
        let count = 0;

        this.visitNeighbours((n) => {
            if (n.isBomb) {
                count++;
            }
        });
        
        this._bombsCount = count;
    }

    bombsCount() {
        return this._bombsCount;
    }

    show() {
        push();
        stroke(255);
        if (!this.isRevealed) {
            if(this.isFlagged()) {
                fill(0,0,255);
            } else {
                fill(61);
            }            
        } else if (this.isBomb) {
            fill(255,0,0);
        } else {
            fill(0);            
        }
        translate(this.col * scale, this.row * scale);
        rect(0, 0, scale, scale);
        if (! this.isBomb &&  this.isRevealed && ! this._bombsCount == 0 && !this.isFlagged()) {
            textAlign(CENTER);
            textSize(scale * 0.5);
            fill(255);
            text(this._bombsCount, scale/2, scale/1.5);
        }

        pop();
    }
}

function cellAt(col, row) {
    return grid[rows * row + col];
}