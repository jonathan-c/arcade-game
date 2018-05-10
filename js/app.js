// Enemies our player must avoid
class Enemy {
    constructor(x, y) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
    }

    moveEnemy() {
        // while (true) {
        //     this.x+=20;
        // }
    }

    render() {
        // Draw the enemy on the screen, required method for game
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.resetPosition();
    }

    update() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    resetPosition() {
        this.x = 200;
        this.y = 385;
    }

    handleInput(input) {
        if (input == "up" && this.y >= 45) {
            this.y-=85
        } else if (input == "right" && this.x <= 300) {
            this.x+=100
        } else if (input == "down" && this.y <= 300) {
            this.y+=85
        } else if (input == "left" && this.x >= 50) {
            this.x-=100
        }
        this.update();
        this.checkCollision();
    }

    render() {
        // Draw the player on the screen
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    checkCollision() {
        for(let index in allEnemies) {
            if (this.hasCollided(allEnemies[index])) {
                this.resetPosition();
            }
        }
    }

    hasCollided(enemy) {
        // console.log("this.x", this.x);
        // console.log("enemy.x", enemy.x);
        // console.log("")
        // console.log("this.y", this.y);
        // console.log("enemy.y", enemy.y);
        // console.log("-------------")
        if ((this.x >= enemy.x-55 && this.x <= enemy.x+55) && (this.y >= enemy.y-15 && this.y <= enemy.y+15)) {
            return true;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [new Enemy(47, 60), new Enemy(47, 145), new Enemy(47, 230)];
player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


