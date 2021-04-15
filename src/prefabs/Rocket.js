// Rocket (player) prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to scene
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = game.config.width/320;

        // add rocket sfx
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            if(keyLeft.isDown && this.x >= borderUISize +this.width) {
                this.x -= this.moveSpeed;
            } else if(keyRight.isDown&& this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }
        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;

            // play sfx
            this.sfxRocket.play();
        }
        // if fired move rocket up
        if(this.isFiring && this.y >= (borderUISize * 3) + borderPadding) {
            this.y -= this.moveSpeed;
        }
        // reset on miss
        if(this.y <= (borderUISize * 3) + borderPadding) {
            this.reset();
        }
    }

    // reset rocket to ground
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}