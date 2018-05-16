'use strict;'

class Character {
    constructor(spritePath, x,y) {
        // Variables applied to each of our instances go here,
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = spritePath;
        this.x = x;
        this.y = y;
    }

    render() {
        // Draw the enemy on the screen, required method for game
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Enemies our player must avoid
class Enemy extends Character {
    constructor(x, y) {
        super('images/enemy-bug.png', x, y);
        setTimeout(this.update("dt"), 0 );
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        this.x+=5
        if (this.x >= 500) {
            this.x = -100;
        }
    }

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player extends Character {
    constructor() {
        super('images/char-boy.png', 200, 385);
    }

    update() {
        this.checkCollision();
    }

    resetPosition() {
        this.x = 200;
        this.y = 385;
    }

    // Move the character on the screen and check if player has won
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
        if (this.y <= -40) {
            gameOver();
        }
    }

    checkCollision() {
        for(let index in allEnemies) {
            if (this.hasCollided(allEnemies[index])) {
                this.resetPosition();
            }
        }
    }

    hasCollided(enemy) {
        if ((this.x >= enemy.x-55 && this.x <= enemy.x+55) && (this.y >= enemy.y-15 && this.y <= enemy.y+15)) {
            return true;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [new Enemy(-10, 60), new Enemy(-200, 145), new Enemy(-100, 230)];
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

// Modal functionality for when the player has won
const modal = document.getElementById('gameOverModal');
const modalContent = document.getElementById('modal-p-content');
const modalSpan = document.getElementsByClassName("close")[0];

function gameOver () {
    modal.style.display = "block";
    modalContent.textContent = `You win!`;
}

modalSpan.onclick = function() {
    modal.style.display = "none";
    player.resetPosition();
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        player.resetPosition();
    }
}

