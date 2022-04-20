class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio('sfx_select', './assets/magic_ding.mp3');
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav'); // kept for the menu since i like the sound of it, but used new sound for blasts
        this.load.audio('sfx_bolt', './assets/thunder.mp3');  // not the best thunder sound effect... but the only free one i could find that was relatively short enough
        this.load.audio('sfx_frost', './assets/ice_blast.wav'); // between this and the thunder its pretty clear sound design is not my forte lol...
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#f73d0a',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*2 - borderPadding*2, 'WIZARD PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Use ←→ arrows to move', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#eff705';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2, 'Press (B) for a fast but thin bolt', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#4bb4fa';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press (F) for a slower, wider frost', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#f73d0a';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 + borderPadding*2, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
         
          game.settings = {
            dragonSpeed: 3,
            impSpeed: 5,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
         
          game.settings = {
            dragonSpeed: 4,
            impSpeed: 6,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
      }
}