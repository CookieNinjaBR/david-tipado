import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('bootGame');
  }

  preload() {
    //CARREGA OS ASSETS
        this.load.spritesheet("david", "assets/daviddoggg.png",
        {
            frameWidth: 274,
            frameHeight: 276
        });
        this.load.spritesheet("davidpatas", "assets/davidpata.png",
        {
            frameWidth: 200,
            frameHeight: 160
        });
        this.load.spritesheet("davidfloranim", "assets/floranim.png",
        {
            frameWidth: 300,
            frameHeight: 131
        });
        this.load.spritesheet("flor6", "assets/flor6.png",
        {
            frameWidth: 300,
            frameHeight: 131
        });
        this.load.spritesheet("flor5", "assets/flor5.png",
        {
            frameWidth: 300,
            frameHeight: 131
        });
        this.load.spritesheet("flor4", "assets/flor4.png",
        {
            frameWidth: 300,
            frameHeight: 131
        });
        this.load.spritesheet("flor3", "assets/flor3.png",
        {
            frameWidth: 300,
            frameHeight: 131
        });
        this.load.spritesheet("flor2", "assets/flor2.png",
        {
            frameWidth: 300,
            frameHeight: 131
        });
        this.load.spritesheet("flor1", "assets/flor1.png",
        {
            frameWidth: 300,
            frameHeight: 131
        });
        this.load.spritesheet("petala", "assets/petala2.png",
        {
            frameWidth: 150,
            frameHeight: 76
        });
        this.load.spritesheet("background", "assets/bgtipado.jpeg",
        {
            frameWidth: 854,
            frameHeight: 480
        });
        
        this.load.spritesheet("background-inicio", "assets/iniciobgtipado.jpeg",
        {
            frameWidth: 854,
            frameHeight: 480
        });

        this.load.spritesheet("flor-inicio", "assets/iniciobgflor4.png",
        {
            frameWidth: 854,
            frameHeight: 480
        });
        
        this.load.spritesheet("background-venceu", "assets/fimtipado.jpeg",
        {
            frameWidth: 854,
            frameHeight: 480
        });
        this.load.spritesheet("background-perdeu", "assets/fimp1.jpeg",
        {
            frameWidth: 854,
            frameHeight: 480
        });
        this.load.spritesheet("menubtn", "assets/menubtnall.png",
        {
            frameWidth: 243,
            frameHeight: 83
        });
        this.load.spritesheet("letterbtn", "assets/btnTest.png",
        {
            frameWidth: 243,
            frameHeight: 83
        });
        
        this.load.spritesheet("trybtn", "assets/trybtn.png",
        {
            frameWidth: 243,
            frameHeight: 83
        });
        this.load.spritesheet("trybtnhvr", "assets/trybtnhvr.png",
        {
            frameWidth: 243,
            frameHeight: 83
        });
        this.load.bitmapFont("pixelFont", "assets/font/fnt1_0.png", "assets/font/fnt1.fnt");
        this.load.audio("music", "assets/musiquinea/School Rooftop (Slowed Down Version).mp3")
  }

  create() {
     this.add.text(20, 20, "Loading game...");
        
        //CRIA ANIMACOES
        this.anims.create(
        {
            key: "bg_anim1",
            frames: this.anims.generateFrameNumbers("background", {
              end: 7
            }),
            frameRate: 10,
            repeat: -1,  
        });

        this.anims.create(
        {
            key: "bg_anim2",
            frames: this.anims.generateFrameNumbers("background-inicio", {
              end: 8
            }),
            frameRate: 10,
            repeat: -1,  
        });

        this.anims.create(
        {
            key: "bg_anim3",
            frames: this.anims.generateFrameNumbers("background-venceu", {
              end: 7
            }),
            frameRate: 10,
            repeat: -1,  
        });

        this.anims.create(
        {
            key: "florinicio_anim",
            frames: this.anims.generateFrameNumbers("flor-inicio", {
              end: 4
            }),
            frameRate: 5,
            repeat: -1,  
            repeatDelay: 3000
        });

        this.anims.create(
        {
            key: "david_pisca",
            frames: this.anims.generateFrameNumbers("david", {
              end: 1
            }),
            frameRate: 10,
            repeat: -1,
            repeatDelay: 5000
        });

        this.anims.create(
        {
            key: "petala_cai",
            frames: this.anims.generateFrameNumbers("petala", {
              end: 7
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create(
        {
            key: "david_bate",
            frames: this.anims.generateFrameNumbers("davidpatas", {
              end: 7
            }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create(
        {
            key: "flor_bate",
            frames: this.anims.generateFrameNumbers("davidfloranim", {
              end: 3
            }),
            frameRate: 20,
            repeat: 0,  
        });

        
        //INICIA O JOGO
        this.scene.start("menuGame");
  }
}
