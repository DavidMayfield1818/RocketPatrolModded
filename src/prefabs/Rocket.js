// Rocket (player) prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to scene
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = game.config.width/320;
        this.fireSpeed = 1;
        this.angle = 270;

        // add rocket sfx
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            if(keyLeft.isDown && this.x >= borderUISize +this.width) {
                this.x -= this.moveSpeed;
            } else if(keyRight.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }

        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.lastlaunch = this.x;

            // play sfx
            this.sfxRocket.play();
        }

        // if fired move rocket up
        // WIP
        if(this.isFiring) {
            const vec = new Phaser.Math.Vector2();
            vec.setToPolar(this.rotation, this.fireSpeed);
            this.x += vec.x;
            this.y += vec.y;
            this.fireSpeed *= 1.03;
        }

        // in air movement
        if(this.isFiring) {
            if(keyLeft.isDown) {
                this.angle -= 2.5;
            } else if(keyRight.isDown) {
                this.angle += 2.5;
            }
        }

        // reset on miss
        if(this.y <= (borderUISize * 3) + borderPadding) {
            this.reset();
        }
        if(this.y >= game.config.height - borderUISize) {
            this.reset();
        }
        if(this.x <= borderUISize) {
            this.reset();
        }
        if(this.x >= game.config.width - borderUISize) {
            this.reset();
        }

    }

    // reset rocket to ground
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
        this.x = this.lastlaunch
        this.angle = 270;
        this.fireSpeed = 1;
    }
}