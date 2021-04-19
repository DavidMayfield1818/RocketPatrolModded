// Rocket (player) prefab
class RocketP2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to scene
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = game.config.width/320;
        this.fireSpeed = 0.5;
        this.angle = 270;

        // add rocket sfx
        this.sfxRocket = scene.sound.add('sfx_rocket');

        this.missile01 = new Missile(this.scene, -100, -100, 'missile', 0);
        this.missile02 = new Missile(this.scene, -100, -100, 'missile', 0);

        this.valid = true;
    }

    update() {
        if(this.valid){
            // left/right movement
            if(!this.isFiring) {
                if(keyA.isDown && this.x >= borderUISize +this.width) {
                    this.x -= this.moveSpeed;
                } else if(keyD.isDown && this.x <= game.config.width - borderUISize - this.width) {
                    this.x += this.moveSpeed;
                }
            }

            // fire button
            if(Phaser.Input.Keyboard.JustDown(keyW)) {
                if(!this.isFiring) {
                    this.isFiring = true;
                    this.lastlaunch = this.x;
                    
                    // play sfx
                    this.sfxRocket.play();
                }else if(this.isFiring) {
                    var shot = this.getMissile();
                    if(shot != false) {
                        shot.fire(this.x, this.y, this.fireSpeed + 0.25, this.angle);
                    }
                }
                
            }

            // if fired move rocket
            // WIP
            if(this.isFiring) {
                // in air movement
                if(keyA.isDown) {
                    this.angle -= 2.5;
                } else if(keyD.isDown) {
                    this.angle += 2.5;
                }

                const vec = new Phaser.Math.Vector2();
                vec.setToPolar(this.rotation, this.fireSpeed);
                this.x += vec.x;
                this.y += vec.y;
                this.fireSpeed += 0.05;
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

            this.missile01.update();
            this.missile02.update();
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

    // get first missile
    getMissile() {
        if (this.missile01.exists == false) {
            return this.missile01;
        }else if(this.missile02.exists == false) {
            return this.missile02;
        }else {
            return false;
        }
        
    }
}