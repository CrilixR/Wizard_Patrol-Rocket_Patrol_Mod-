class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('wizard', './Assets/wizard.png');   // remnants of a model I was considering
        this.load.image('ice', './assets/ice.png');
        this.load.image('bolt', './assets/bolt.png');
        this.load.image('meteor', './assets/meteor.png');   // remnants of a 3rd weapon I was trying, hitbox was way too wonky
        this.load.image('fire', './assets/fire.png');   //remnants of a 4th weapon I was trying, just didn't like it
        this.load.image('bw', './assets/bw.png');
        this.load.image('field', './assets/field.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth:64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('dragon', './assets/dragon_sheet.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 15});
        this.load.spritesheet('imp', './assets/imp_sheet.png', {frameWidth: 18, frameHeight: 17, startFrame: 0, endFrame: 7});
    }

    create() {
        this.field = this.add.tileSprite(0, 0, 640, 480, 'field').setOrigin(0, 0);

        this.bw = this.add.image(0, 345, 'bw').setOrigin(0, 0); // it's a little jank i know... but it works

        this.add.rectangle(0, borderUISize + borderPadding, game.config. width, borderUISize * 2, 0xeff705).setOrigin(0, 0);

        this.p1Ice = new Ice(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'ice').setOrigin(-5, 2.6);

        this.p1Bolt = new Bolt(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'bolt').setOrigin(2, 2.8);

        this.dragon01 = new Dragon(this, game.config.width + borderUISize*6, borderUISize*4, 'dragon', 0, 30).setOrigin(0, 0);
        this.dragon02 = new Dragon(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'dragon', 0, 20).setOrigin(0,0);
        this.dragon03 = new Dragon(this, game.config.width, borderUISize*6 + borderPadding*4, 'dragon', 0, 10).setOrigin(0,0);

        this.imp01 = new Imp(this, game.config.width +borderUISize*4, borderUISize*10, 'imp', 0, 10).setOrigin(0, 0);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.anims.create({
            key: 'flying',
            frames: this.anims.generateFrameNumbers('dragon', {start: 0, end: 15, first: 0}),
            frameRate: 30, repeat: -1   
        });

        this.dragon01.anims.play('flying');

        this.dragon02.anims.play('flying');

        this.dragon03.anims.play('flying');

        this.anims.create({
            key: 'imping',
            frames: this.anims.generateFrameNumbers('imp', {start: 0, end: 7, first: 0}),
            frameRate: 30, repeat: -1
        })

        this.imp01.anims.play('imping');

        

        this.p1Score = 0;

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#4bb4fa',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize +borderPadding*2, this.p1Score, scoreConfig);

        this.gameOver = false;

        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        
        this.field.tilePositionX -= 4;
        if (!this.gameOver) {               
            this.p1Ice.update();
            this.p1Bolt.update();  
            this.dragon01.update();           
            this.dragon02.update();
            this.dragon03.update();
            this.imp01.update();
        } 

        if(this.checkCollision(this.p1Ice, this.dragon03)) {
            this.p1Ice.reset();
            this.dragonExplode(this.dragon03);
          }
          if (this.checkCollision(this.p1Ice, this.dragon02)) {
            this.p1Ice.reset();
            this.dragonExplode(this.dragon02);
          }
          if (this.checkCollision(this.p1Ice, this.dragon01)) {
            this.p1Ice.reset();
            this.dragonExplode(this.dragon01);
          }
          if (this.checkCollision(this.p1Ice, this.imp01)) {
              this.p1Ice.reset();
              this.impExplode(this.imp01);
          }

          if(this.checkCollision(this.p1Bolt, this.dragon03)) {
            this.p1Bolt.reset();
            this.dragonExplode(this.dragon03);
          }
          if (this.checkCollision(this.p1Bolt, this.dragon02)) {
            this.p1Bolt.reset();
            this.dragonExplode(this.dragon02);
          }
          if (this.checkCollision(this.p1Bolt, this.dragon01)) {
            this.p1Bolt.reset();
            this.dragonExplode(this.dragon01);
          }
          if (this.checkCollision(this.p1Bolt, this.imp01)) {
              this.p1Bolt.reset();
              this.impExplode(this.imp01);
          }
    }

    checkCollision(ice, dragon) {
        if (ice.x = dragon.x + dragon.width &&
            ice.x + ice.width > dragon.x &&
            ice.y < dragon.y + dragon.height &&
            ice.height + ice.y > dragon.y) {
                return true;
            } else {
                return false;
            }
    }

    checkCollision(bolt, dragon) {
        if (bolt.x > dragon.x + dragon.width &&
            bolt.x + bolt.width < dragon.x &&
            bolt.y < dragon.y + dragon.height &&
            bolt.height + bolt.y > dragon.y) {
                return true;
            } else {
                return false;
            }
    }

    checkCollision(ice, imp) {
        if (ice.x < imp.x + imp.width &&
            ice.x + ice.width > imp.x &&
            ice.y < imp.y + imp.height &&
            ice.height + ice.y > imp.y) {
                return true;
            } else {
                return false;
            }
    }

    checkCollision(bolt, imp) {
        if (bolt.x < imp.x + imp.width &&
            bolt.x + bolt.width > imp.x &&
            bolt.y < imp.y + imp.height &&
            bolt.height + bolt.y > imp.y) {
                return true;
            } else {
                return false;
            }
    }

    dragonExplode(dragon) {
        dragon.alpha = 0;
        let boom = this.add.sprite(dragon.x, dragon.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            dragon.reset();
            dragon.alpha = 1;
            boom.destroy();
        });

        this.p1Score += dragon.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play('sfx_explosion');
    }

    impExplode(imp) {
        imp.alpha = 0;
        let boom = this.add.sprite(imp.x, imp.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            imp.reset();
            imp.alpha = 1;
            boom.destroy();
        });

        this.p1Score += imp.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play('sfx_explosion');
    }
}