let soilTiles = [];
let tileSize = 60;
let rows, cols;

function setup() {
  createCanvas(600, 400);
  cols = floor(width / tileSize);
  rows = floor(height / tileSize);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      soilTiles.push(new SoilTile(x * tileSize, y * tileSize));
    }
  }
}

function draw() {
  background(180, 230, 180); // grama

  for (let tile of soilTiles) {
    tile.update();
    tile.display();
  }
}

function mousePressed() {
  for (let tile of soilTiles) {
    if (tile.isMouseOver()) {
      tile.interact();
    }
  }
}

class SoilTile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.state = "empty"; // "empty", "planted", "growing", "ready"
    this.timer = 0;
  }

  update() {
    if (this.state === "planted") {
      this.timer++;
      if (this.timer > 300) {
        this.state = "growing";
      }
    } else if (this.state === "growing") {
      this.timer++;
      if (this.timer > 600) {
        this.state = "ready";
      }
    }
  }

  interact() {
    if (this.state === "empty") {
      this.state = "planted";
      this.timer = 0;
    } else if (this.state === "ready") {
      this.state = "empty";
      this.timer = 0;
    }
  }

  isMouseOver() {
    return mouseX > this.x && mouseX < this.x + tileSize &&
           mouseY > this.y && mouseY < this.y + tileSize;
  }

  display() {
    stroke(100);
    if (this.state === "empty") {
      fill(139, 69, 19); // marrom (solo)
    } else if (this.state === "planted") {
      fill(160, 82, 45); // mais escuro
    } else if (this.state === "growing") {
      fill(85, 107, 47); // verde brotando
    } else if (this.state === "ready") {
      fill(34, 139, 34); // planta crescida
    }
    rect(this.x, this.y, tileSize, tileSize);

    if (this.state === "planted") {
      fill(255);
      ellipse(this.x + tileSize / 2, this.y + tileSize / 2, 5, 5); // semente
    } else if (this.state === "growing") {
      fill(0, 200, 0);
      rect(this.x + tileSize / 2 - 5, this.y + tileSize / 2 - 10, 10, 15); // muda
    } else if (this.state === "ready") {
      fill(0, 180, 0);
      ellipse(this.x + tileSize / 2, this.y + tileSize / 2, 20, 20); // planta madura
    }
  }
}