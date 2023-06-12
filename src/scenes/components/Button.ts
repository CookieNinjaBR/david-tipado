interface ButtonInterface{
    x: number;
    y: number;
    background: Phaser.GameObjects.Sprite;
    backgroundColor?: number;
    backgroundHover: string | number;
    buttonText: Phaser.GameObjects.BitmapText | Phaser.GameObjects.Text;
    textColor: number;
    textHoverColor: number;
}

export default class Button extends Phaser.GameObjects.Container{
    bg: Phaser.GameObjects.Sprite;
    text: Phaser.GameObjects.BitmapText | Phaser.GameObjects.Text;
    bgHover: string;
    constructor(scene: Phaser.Scene, button: ButtonInterface) {
        super(scene, button.x, button.y);
        this.bg = button.background;
        this.bg.setTint(button.backgroundColor);
        this.text = button.buttonText;
        this.bgHover = this.bg.texture.key;
        this.add([this.bg, this.text]);
        scene.add.existing(this);
        
        this.text.setTint(button.textColor)

        this.bg.setInteractive()
        .on('pointerover', () => {
            if (typeof button.backgroundHover==='string')
                this.bg.setTexture(button.backgroundHover);
            else this.bg.setTint(button.backgroundHover)
            this.text.setTint(button.textHoverColor);
        })
        .on('pointerout', () => {
            if (button.backgroundColor===undefined)
                this.bg.setTexture(this.bgHover);
            else this.bg.setTint(button.backgroundColor);
            this.text.setTint(button.textColor);
        })
        
    }

    setClickFunction(onBtnClick = ()=>{}){
        this.bg.on('pointerdown', () => {
            onBtnClick();
        })
    }

    setAlphaButton(alphaValue: number){
        this.bg.setAlpha(alphaValue)
    }

    clearAlphaButton(){
        this.bg.setAlpha(1)
    }
}