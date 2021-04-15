// ----------------------------------------------------------------------------
// David Mayfield
// Modded Rocket Patrol WiP
// 4/18/2020
// duration:
// ----------------------------------------------------------------------------
// point break down
// New Weapon (20)
// Additional time per hit (20)
// Simultaneous two player mode (30)
// Time remaining display (10)
// control post launch (5)
// randomized enemy ship movement (5)
// increased speed post 30 (5)
// ... + more idk need (5) currently

console.log("Rocket Patrol Modded");

// game configs
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height/15;
let borderPadding = borderUISize / 3;
let starSpeed = config.width/160;

// reserve keyboard bindings
let keyF, keyR, keyLeft, keyRight;