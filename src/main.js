// ----------------------------------------------------------------------------
// David Mayfield
// Modded Rocket Patrol WiP
// 4/18/2020
// duration:
// ----------------------------------------------------------------------------
// point break down
// New Weapon (20) -done
//      added the ability to fire missiles while flying. achieved with a new object taking some properties of the player ship on fire.
//      Uses two missiles per ship as to not have to worry about creation of objects and deletion of objects mid game. does add a limit
//      on how many missles can be on screen at a given time 
// Additional time per hit (20) -Done based on points and time
//      during explosion time is added to the clock based on the amount of points the ship was worth and the amount of time past
// Simultaneous two player mode (30) -Done
//      a rocket p2 object was made to account for the additional controls. also the controls were remapped to ←→↑, and adw
// Time remaining display (10) -Done
//      takes time of scene minus time of when scene started plus the addition of the extra time from the time increase
// control post launch (5) -Hoping for more than 5 but done
//      added rotation to control post launch and a gradual speed increase. follow this with vector based translation to perform movement.
//      ship png was rotated to account for the vector rotation.
// randomized enemy ship movement (5) -come out of both sides and move up and down
//      randomized which side w a simple H/T RNG and spawn them on the side accordingly. a rotation is also given to them so they still
//      facing the right direction.
// increased speed post 30 (5) -done at 50% and 100% game time
//      this was done in the same was the original end game time was done. one speed increase at 50% and one at 100% as the game can go over
// highscore tracker (5) -done
//      added a highscore tracker at the top of the screen to display a highscore variable saved in game.config.
// refrences
//      Phaser examples... sometimes they help most of the time they didn't
//      Notes of Phaser
//      Phaser API
//      concept for pulling from only to missle from Phaser bullet hell example

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
let keyF, keyR, keyLeft, keyRight, keyUp, keyDown, keyA, keyD, keyW, keyS;