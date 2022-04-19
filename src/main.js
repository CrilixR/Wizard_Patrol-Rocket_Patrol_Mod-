let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyF, keyM, keyB, keyR, keyLEFT, keyRIGHT;

// Josh Meyers, Project Title: Wizard Patrol, 4/19/22, Total Hours: ~22 (I'm a poor coder so I had to look up and test a lot of stuff, so that and creating all the assets is where most of that went

// Point Breakdown - Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60): I changed the game drastically from Sci-Fi to fantasy, using dragons and imps instead of ships, and magic spells instead of rockets.  I changed up almost all of the sounds and assets except for the explosion sound, and animation.  Mostly becuase I like the sound, and when testing different colors of explostions, they either looked too stange, or blended into the background too much, so I stuck with the one given.
// Point Breakdown - Create and implement a new weapon (w/ new behavior and graphics) (20):  I made 2 weapons for this one, the bolt and frost.  Frost is nearly identicle to the rocket interms of properties.  However, the bolt, is much faster, and much thinner, allowing for more accurate snipe shots.  As the player controls both simultaniously, they can just shoot both at the same time, or stagger them for potentially better odds.
// Point Breakdown - Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20):  I made the imp enemy, a small, fast little sprite that runs around and is worth 50 points.  He is very fast, and very hard to hit, very annoying.

// Sources - Credit to Nathan Altice, as not only was there base code a huge help, but I also still used their explosion animation and sound effect.  Big shout out to all the people in the Discord who helped me out when I ran into a few bumps along te coding process.  In addition, I used alot of google images of sprites for inspiration when creating my models, shout out to Manasurge, Pixelgedon, and Elthen, as their models were huge inspirations.  Finally a credit to Zapsplat and Videvo, as these were the sites I grabbed my sound bites from.