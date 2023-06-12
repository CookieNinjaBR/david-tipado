import Phaser from 'phaser';
import Button from "./components/Button";

export default class MenuScene extends Phaser.Scene 
{
    init()
    {
    }

    constructor()
    {
        super("menuGame");
    }

    preload()
    {
        
    }

    create()
    {
        //MUSICA
        var music = this.sound.add("music");
        var musicConfig =
        {
            volume: 0.2,
            loop: true
        };
        music.play(musicConfig);

        //ASSETS
        this.add.sprite(0, 0, "background-inicio").setOrigin(0,0).play("bg_anim2");
        this.add.sprite(0, 0, "flor-inicio").setOrigin(0,0).play("florinicio_anim");

        //BOTAO DE START DO JOGO
        new Button(this, {
            x: 205,
            y: 270,
            background: this.add.sprite(0, 0, 'menubtn'),
            backgroundColor: 0x0f7dff,
            backgroundHover: 0xffffff,
            buttonText: this.add.bitmapText(-85, -28,"pixelFont", "Iniciar", 55),
            textHoverColor: 0x0f7dff,
            textColor: 0xffffff
        }).setClickFunction(()=> this.scene.start("playGame"));
    }
}