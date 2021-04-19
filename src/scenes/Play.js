class Play extends Phaser.Scene {
    constructor () {
        super("playScene");
    }

    preload(){
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('missile', './assets/missile.png');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            starFrame: 0,
            endFrame: 9
        });
    }

    create() {
        // place starfield
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

        // white UI border
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFFF).setOrigin(0, 0);

        // add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5,0);

        // add spaceship (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0,0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });

        // initialize scroe
        this.p1Score = 0;

        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreleft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, this.scoreConfig);
        this.timeText = this.add.text(game.config.width - borderUISize - borderPadding - this.scoreConfig.fixedWidth, borderUISize + borderPadding * 2, this.time.now, this.scoreConfig);

        // GAME OVER flag
        this.gameOver = false;
        this.halftime = false;
        this.overtime = false;

        this.startTime = Math.round(this.time.now * 0.001);
        this.totalTime = Math.round(game.settings.gameTimer * 0.001);

        this.clock = this.time.delayedCall(game.settings.gameTimer/2, () => {
            this.ship01.increaseSpeed();
            this.ship02.increaseSpeed();
            this.ship03.increaseSpeed();
            this.halftime = true;
        }, null, this);

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.ship01.increaseSpeed();
            this.ship02.increaseSpeed();
            this.ship03.increaseSpeed();
            this.overtime = true;
        }, null, this);
    }

    update() {
        if(this.totalTime - (Math.round(this.time.now * 0.001) - this.startTime) <= 0) {
            this.scoreConfig.fixedWidth = 0; 
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + game.config.width/10, 'Press (R) to Restart or ← for Menu', this.scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }
        if(!this.gameOver) {
            // update starfield
            this.starfield.tilePositionX -= starSpeed;

            // update rocket
            this.p1Rocket.update();

            // update spaceship (x3)
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();

            // check for collisions
            this.checkCollisionWithShip(this.p1Rocket);
            this.checkCollisionWithShip(this.p1Rocket.missile01);
            this.checkCollisionWithShip(this.p1Rocket.missile02);
            

            // display current time
            this.timeText.text = Math.floor(this.totalTime - (Math.round(this.time.now * 0.001) - this.startTime));
        }

        // check for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        // check for menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLeft)) {
            this.scene.start("menuScene");
        }
    }

    checkCollisionWithShip(object) {
        // check for collisions
        if(this.checkCollision(object,this.ship01)){
            object.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(object,this.ship02)){
            object.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(object,this.ship03)){
            object.reset();
            this.shipExplode(this.ship03);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if( rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;

        // create explosion sprite at ships location
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);

        // play explode
        boom.anims.play('explode');

        // callback after anim completes
        boom.on('animationcomplete', () => {
            // reset ship pos
            ship.reset();

            // make visable again
            ship.alpha = 1;

            // remove the sprite
            boom.destroy();
        });

        // score add and repaint
        this.p1Score += ship.points;
        this.scoreleft.text = this.p1Score;

        // sound effect one time
        this.sound.play('sfx_explosion');

        var timeAddition = ship.points / 20;
        if(this.halftime) {timeAddition *= 0.5}
        if(this.overtime) {timeAddition *= 0}
        this.totalTime += timeAddition;
    }
}