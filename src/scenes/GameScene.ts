import Phaser from 'phaser';
import LetterKeyboard from './components/LetterKeyboard';
import BancoPalavras from "./components/BancoPalavras";
import eventsCenter from "./components/EventsCenter";

export default class GameScene extends Phaser.Scene {

    //VARIAVEIS DO JOGO ()
    vida: number = 6;
    tentativas: number = 0;
    erros: number = 0;
    palavras: BancoPalavras = new BancoPalavras(['DAVID', 'CÃO', 'SOL', 'GATO', 'PÉ', 'BOLA', 'LUA', 'FLOR', 'OLHO', 'MESA', 'NARIZ', 'VIAGEM', 'BRINQUEDO', 'SORRISO', 'LÁPIS', 'TELEFONE', 'COZINHA', 'MÚSICA', 'LIVRO', 'COMPUTADOR', 'CORAÇÃO', 'HIDROGRÁFICA', 'COMPLEXIDADE', 'HIERÓGLIFO', 'INCONSTITUCIONAL', 'INCONGRUENTE', 'XILOFONE', 'CALEIDOSCÓPIO', 'ONOMATOPEIA', 'ZIGUEZAGUE', 'EMBRIAGUEZ']);
    palavra!: string;
    tracinhos: string[] = [];
    tecla: string = '';
    tempo: string = '';

    davidPetala!: Phaser.GameObjects.Sprite;

    init() {

    }

    constructor() {
        super("playGame");
    }

    create() {
        //VARIAVEIS GAME E ASSETS
        this.vida = 6;
        this.tentativas = 0;
        this.erros = 0;
        this.palavra = this.palavras.escolhePalavra();
        this.tracinhos = [];
        this.tecla = '';
        this.tempo = '';
        let timer: number = -1;

        for (let i = 0; i < this.palavra.length; i++) this.tracinhos[i] = " _"

        //UI SCENE
        this.scene.run('uiGame', { tracinhos: this.tracinhos })

        //ASSETS
        this.add.sprite(0, 0, "background").setOrigin(0, 0).play("bg_anim1");
        var davidDog = this.add.sprite(this.cameras.main.width / 2 - 200, this.cameras.main.height / 2 + 60, "david");
        var davidPatas = this.add.sprite(this.cameras.main.width / 2 - 210, this.cameras.main.height / 2 + 100, "davidpatas");
        var davidFlor = this.add.sprite(this.cameras.main.width / 2 - 210, this.cameras.main.height / 2 + 150, "flor6");
        this.davidPetala = this.add.sprite(this.cameras.main.width / 2 - 240, this.cameras.main.height / 2 + 150, "petala");
        this.davidPetala.play("petala_cai");
        this.davidPetala.visible = false;
        davidDog.play("david_pisca");

        //TIMER
        const updateTimer = () => {
            timer += 1;
            this.tempo = formatTime();
            eventsCenter.emit('update-timer', this.tempo);
        }
        const formatTime = () => {
            var minutes = Math.floor(timer / 60);
            var partInSeconds = (timer % 60).toString();
            partInSeconds = partInSeconds.toString().padStart(2, '0');
            partInSeconds = partInSeconds.substring(0, 2);
            return minutes + ': ' + partInSeconds;
        }
        updateTimer();
        this.time.addEvent({ delay: 1000, callback: updateTimer, callbackScope: this, loop: true });

        const numeros: number[] = []
        for (let i = 65; i < 91; i++) numeros.push(i);
        var teclado = new LetterKeyboard(this, numeros);

        //ESSE É O NOSSO GAMELOOP, BASICAMENTE
        teclado.tryButtonOnClick(() => {
            console.log(this.tentativas)
            this.tecla = teclado.selected
            console.log(this.tecla);

            if (this.tecla == '') return;

            //LETRA CERTA
            if (this.palavra.includes(this.tecla)) {
                this.tentativas++;
                eventsCenter.emit('update-tentativas', this.tentativas);
                for (let i = 0; i <= this.palavra.length; i++)
                    if (this.tecla === this.palavra.charAt(i)) {
                        if (this.tecla === this.palavra.charAt(i)) {
                            switch (this.tecla) {
                                case 'Á':
                                case 'À':
                                case 'Ã':
                                case 'Â':
                                    this.tracinhos[i] = ' ' + 'A';
                                    break;
                                case 'É':
                                case 'Ê':
                                    this.tracinhos[i] = ' ' + 'E';
                                    break;
                                case 'Ó':
                                case 'Ô':
                                    this.tracinhos[i] = ' ' + 'O';
                                    break;
                                case 'Í':
                                    this.tracinhos[i] = ' ' + 'I';
                                    break;
                                case 'Ç':
                                    this.tracinhos[i] = ' ' + 'C';
                                    break;
                                default:
                                    this.tracinhos[i] = ' ' + this.tecla;
                            }
                        }
                    }
                eventsCenter.emit('update-tracinhos', this.tracinhos);
                console.log(this.tracinhos);
                //SE TERMINOU A PALAVRA, INICIA O FIM DE JOGO DE VITORIA
                if (this.tracinhos.indexOf(" _") == -1) this.scene.start("fimGame", { venceu: true, tentativas: this.tentativas, erros: this.erros, tempo: this.tempo });
            }
            //LETRA ERRADA
            else {
                this.tentativas++;
                eventsCenter.emit('update-tentativas', this.tentativas);
                //DIMINUI VIDA, AUMENTA ERROS E DA PLAY EM ANIMAÇOES
                this.vida--;
                this.erros++;
                eventsCenter.emit('update-erros', this.erros);
                davidPatas.play("david_bate");
                davidFlor.playAfterDelay("flor_bate", 270);
                davidFlor.on('animationcomplete', () => {
                    let prox = "flor" + this.vida;
                    davidFlor.setTexture(prox);
                    this.davidPetala.visible = true;
                });
                //INICIA GAMEOVER SE ACABAREM AS VIDAS
                if (this.vida == 0)
                    this.scene.start("fimGame", { venceu: false, tentativas: this.tentativas, erros: this.erros, tempo: this.tempo });
            }
            var tecla = teclado.letterContainer.getByName(this.tecla);
            (tecla != null) ? tecla.destroy() : teclado.specialContainer.getByName(this.tecla).destroy();
            teclado.selected = '';
        });

    }

    update() {
        //animacao vertical da petala , desaparece depois de que alcança uma certa altura
        this.davidPetala.y += 5;
        if (this.davidPetala.y > this.cameras.main.height - 20) {
            this.davidPetala.visible = false;
            this.davidPetala.y = this.cameras.main.height / 2 + 140;
        }
    }

}



