import Button from "./Button";

export default class LetterKeyboard{
    buttons: Button[] = [];
    letterContainer: Phaser.GameObjects.Container;
    specialContainer: Phaser.GameObjects.Container;
    tryBtn: Button;
    shiftBtn: Button;
    isSpecialHidden: boolean = true
    selected: string = '';

    constructor(scene: Phaser.Scene, chars: number[]) {
        //CONSTROI TECLADO DE LETRAS
        this.letterContainer = scene.add.container();
        this.specialContainer = scene.add.container();
        let n = 0;
        let hInicial = 150;
        for (let i = chars[0]; i <= chars[chars.length-1]; i++) {
            if (n>3) n=0;
            let btn = new Button(scene, {
                    x: 572 + n*50,
                    y: hInicial + Math.floor((i-65)/4)*48,
                    background: scene.add.sprite(0, 0, 'letterbtn'),
                    backgroundColor: 0xfdaeff,
                    backgroundHover: 0xff40c5,
                    buttonText: scene.add.bitmapText(-12, -25,"pixelFont", String.fromCharCode(i), 50),
                    textHoverColor: 0xFFFFFF,
                    textColor: 0xFFFFFF
                });
            //COLOCA NA LISTA DE BOTOES DO MEU GAMER
            btn.setName(String.fromCharCode(i))
            this.buttons.push(btn);
            this.letterContainer.add(btn);
            //ATRIBUI ONCLICK DO BOTAO DE LETRA ESPECIFICO 
            btn.setClickFunction(this.letterMethod(this, String.fromCharCode(i)));
            n++;
        }
        //TECLADO DE CARACTERES ESPECIAIS
        let specialCodes = ['Á', 'À', 'Ã', 'Â', 'É', 'Ê', 'Í', 'Ó', 'Ô', 'Ç'];
        for(let i = 0; i < specialCodes.length; i++)
        {   
            if (n>3) n=0;
            let btn = new Button(scene, {
                    x: 572 + n*50,
                    y: hInicial + Math.floor((i)/4)*48,
                    background: scene.add.sprite(0, 0, 'letterbtn'),
                    backgroundColor: 0xfdaeff,
                    backgroundHover: 0xff40c5,
                    buttonText: scene.add.text(-8, -12, specialCodes[i], { fontFamily: 'Monospace', fontSize: '25px'}),           
                    textHoverColor: 0xFFFFFF,
                    textColor: 0xFFFFFF
                });
            this.buttons.push(btn);
            this.specialContainer.add(btn);
            btn.setClickFunction(this.letterMethod(this, specialCodes[i]));
            btn.setName(specialCodes[i]);
            n++;
        }
        
        this.specialContainer.setVisible(false);

        //BOTAO SHIFT PARA O TECLADO ESPECIAL
        this.shiftBtn = new Button(scene, {
            x: 672,
            y: 438,
            background: scene.add.sprite(0, 0, 'letterbtn'),
            backgroundColor: 0xfff986,
            backgroundHover:  0xd5606d,
            buttonText: scene.add.bitmapText(-20, -15,"pixelFont", "sft", 30),
            textHoverColor: 0xfff986,
            textColor: 0xd5606d
        });

        this.shiftBtn.setClickFunction(()=>{
            if(this.isSpecialHidden){
                this.isSpecialHidden = false;
                this.letterContainer.setVisible(false);
                this.specialContainer.setVisible(true);
                return;
            } 
            this.isSpecialHidden = true;
            this.letterContainer.setVisible(true);
            this.specialContainer.setVisible(false);
        });

        //BOTAO DE TENTATIVA
        this.tryBtn = new Button(scene, {
                    x: 722,
                    y: 438,
                    background: scene.add.sprite(0, 0, 'trybtn'),
                    backgroundHover: 'trybtnhvr',
                    buttonText: scene.add.bitmapText(-85, -28,"pixelFont", "", 55),
                    textHoverColor: 0xFFFFFF,
                    textColor: 0xFFFFFF
                });
    }
    
    //METODOS DE CLIQUE
    letterMethod(keyboard: LetterKeyboard, i: string){
        let keys = keyboard.buttons
        let btnSelect = keys[keys.length-1]
        return ()=> {
            keys.forEach(element => element.clearAlphaButton());
            btnSelect.setAlphaButton(0.5);
            keyboard.selected = i;
        }
    }

    tryButtonOnClick(a: ()=>void){
        this.tryBtn.setClickFunction(a);
    }

    

}

