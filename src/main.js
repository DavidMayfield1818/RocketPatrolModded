// ----------------------------------------------------------------------------
// David Mayfield
// Modded Rocket Patrol WiP
// 4/18/2020
// duration:
// ----------------------------------------------------------------------------
// point break down
// New Weapon (20) - done
// Additional time per hit (20) -done based on points and time
// Simultaneous two player mode (30)
// Time remaining display (10) -Done
// control post launch (5) -Hoping for more than 5 but done
// randomized enemy ship movement (5) -come out of both sides and move up and down
// increased speed post 30 (5) -done at 50% and 100% game time
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
let keyF, keyR, keyLeft, keyRight, keyUp, keyDown;