class Menu extends Phaser.Scene {
    constructor () {
        super("menuScene");
    }

    preload(){
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create() {
        // menu text config
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.pC = 1;

        // config for third line of text plus learned how to copy shallow objects
        this.menu2Config = Object.assign({},menuConfig);
        this.menu2Config.backgroundColor = '#00FF00';
        this.menu2Config.color = '#000000';
        this.menu2Config.fontSize = '20px';

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'P1 Use ←→ to move & ↑ to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'P2 Use (A)/(D) to move & (W) to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + (2 * (borderUISize + borderPadding)), 'Press ← for Novice or → for Expert', this.menu2Config).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + (3 * (borderUISize + borderPadding)), 'Press ↑ for 2 player or ↓ for 1 player', this.menu2Config).setOrigin(0.5);
        this.playerDisplay = this.add.text(game.config.width/2, game.config.height/2 + (4 * (borderUISize + borderPadding)), this.pC + ' player(s)', this.menu2Config).setOrigin(0.5);

        // define keys
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLeft)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000,
                playerCount: this.pC,
                highScore: 0
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');  
        }
        if(Phaser.Input.Keyboard.JustDown(keyRight)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000,
                playerCount: this.pC,
                highScore: 0
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene'); 
        }
        if(Phaser.Input.Keyboard.JustDown(keyUp)) {
            // 2 player
            this.pC = 2;
            this.sound.play('sfx_select');
            this.playerDisplay = this.add.text(game.config.width/2, game.config.height/2 + (3 * (borderUISize + borderPadding)), this.pC + ' player(s)', this.menu2Config).setOrigin(0.5);
        }
        if(Phaser.Input.Keyboard.JustDown(keyDown)) {
            // 1 player
            this.pC = 1;
            
            this.sound.play('sfx_select');
            this.playerDisplay = this.add.text(game.config.width/2, game.config.height/2 + (3 * (borderUISize + borderPadding)), this.pC + ' player(s)', this.menu2Config).setOrigin(0.5);
        }
    }
}
