import Button from "./components/Button";

interface data
{
    venceu: boolean;
    tentativas: number;
    erros: number
    tempo: string
}


export default class OverScene extends Phaser.Scene 
{
    
    background!: Phaser.GameObjects.Sprite;
    venceu!: boolean;
    tentativas!: number;
    erros!: number;
    tempo!: string;
    
    init(data: data)
    {
        this.venceu = data.venceu;
        this.tentativas = data.tentativas;
        this.erros = data.erros;
        this.tempo = data.tempo;
    }

    constructor()
    {
        super("fimGame");
    }

    create()
    {
        this.scene.stop('uiGame')
        //ASSETS
        //vitoria
        if (this.venceu) 
        {
            this.background = this.add.sprite(0, 0, "background-venceu");
            this.background.play("bg_anim3");
        }
        //derrota
        else this.background = this.add.sprite(0, 0, "background-perdeu");
        
        this.background.setOrigin(0,0);
        this.add.bitmapText(this.cameras.main.width/2 - 275, this.cameras.main.height/2 - 20, "pixelFont", ("Tempo: " + this.tempo), 40);
        this.add.bitmapText(this.cameras.main.width/2 - 275, this.cameras.main.height/2 + 20, "pixelFont", ("Tentativas: " + this.tentativas), 40);
        this.add.bitmapText(this.cameras.main.width/2 - 275, this.cameras.main.height/2 + 60, "pixelFont", ("Erros: " + this.erros), 40);

        //botao de jogar novamente    
        new Button(this, {
            x: this.cameras.main.width/2 - 150,
            y: this.cameras.main.height/2 + 150,
            background: this.add.sprite(0, 0, 'menubtn'),
            backgroundColor: 0x0f7dff,
            backgroundHover: 0xffffff,
            buttonText: this.add.bitmapText(-95, -28,"pixelFont", "Retry ->", 55),
            textHoverColor: 0x0f7dff,
            textColor: 0xffffff
        }).setClickFunction(()=>{
                this.sound.removeByKey('music');
                this.scene.start("bootGame"); 
            })

    }
}