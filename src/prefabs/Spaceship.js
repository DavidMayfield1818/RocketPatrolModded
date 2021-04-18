class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = -(game.settings.spaceshipSpeed);
        this.startingY = y;
        this.yDur = 0;
        this.moveY = 0;
    }

    update() {
        // move spaceship left
        this.x += this.moveSpeed;

        if(this.yDur <= 0) {
            this.moveY = Phaser.Math.Between(-1,1);
            this.yDur = Phaser.Math.Between(30,60);
        }
        if(this.y >= (borderUISize * 3) + (borderPadding) && this.moveY == -1) {
            this.y += this.moveY;
        }else if (this.y <= game.config.height - borderUISize && this.moveY == 1) {
            this.y += this.moveY;
        }
        this.yDur--;

        // wrap around
        if(this.x <= 0 - this.width || this.x >= game.config.width + this.width) {
            this.reset();
        }
    }

    // position reset
    reset() {
        if(Phaser.Math.Between(0,1) == 0) {
            this.x = 0;
            this.moveSpeed = Math.abs(this.moveSpeed);
            this.angle = 180;
            this.setOrigin(1,1);
        } else {
            this.x = game.config.width;
            this.moveSpeed = -(Math.abs(this.moveSpeed));
            this.angle = 0;
            this.setOrigin(0,0);
        }
        this.y = this.startingY;
    }

    // doubles speed
    increaseSpeed() {
        this.moveSpeed *= 2;
    }
}