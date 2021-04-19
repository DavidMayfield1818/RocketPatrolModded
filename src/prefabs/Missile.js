// Rocket (player) prefab
class Missile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to scene
        this.exists = false;

        scene.add.existing(this);
    }

    update() {
        if(this.exists == true) {
            const vec = new Phaser.Math.Vector2();
            vec.setToPolar(this.rotation, this.moveSpeed);
            this.x += vec.x;
            this.y += vec.y;
            this.moveSpeed *= 1.01;

            // not exist on miss
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
    }

    fire(inX, inY, ms, ang) {
        this.exists = true;
        this.x = inX;
        this.y = inY;
        this.moveSpeed = ms;
        this.angle = ang;
    }

    reset() {
        this.exists = false;
        this.x = -100;
        this.y = -100;
    }
}