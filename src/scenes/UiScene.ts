import eventsCenter from "./components/EventsCenter";

interface data{
    tracinhos: string[];
}

export default class UiScene extends Phaser.Scene 
{ 
    tracinhos:string[]=[];

    init(data: data)
    {
        this.tracinhos=data.tracinhos;
    }

    constructor()
    {
        super("uiGame");
    }

    create()
    {
        //PALAVRA
        let palavraVisual = this.add.bitmapText(15, this.cameras.main.height/2 - 150, "pixelFont", "", 45);
        for(let i=0; i<this.tracinhos.length; i++) palavraVisual.text = palavraVisual.text + this.tracinhos[i];

        const updateTracinhos = (tracinhos:string[])=> 
        {
            palavraVisual.text = '';
            for(let i=0; i<tracinhos.length; i++) palavraVisual.text = palavraVisual.text + tracinhos[i];
            console.log(tracinhos);
        } 
        eventsCenter.on('update-tracinhos', updateTracinhos, this);
        

       //TIMER E PLACAR
        let timerText = this.add.bitmapText(this.cameras.main.width - 200, 0, "pixelFont", "Tempo: 0: 00", 30);
        let tentativasText = this.add.bitmapText(this.cameras.main.width - 200, 25, "pixelFont", "Tentativas: 0", 30);
        let errosText = this.add.bitmapText(this.cameras.main.width - 200, 50, "pixelFont", "Erros: 0", 30);
    

        const updateErros = (erros:number) => errosText.text = "Erros: " + erros;
        const updateTentativas = (tentativas:number) => tentativasText.text = "Tentativas: " + tentativas;
        const updateTimer = (tempo:string) => timerText.text = "Tempo: " + tempo;
        
        eventsCenter.on('update-erros', updateErros, this);
        eventsCenter.on('update-tentativas', updateTentativas, this);
        eventsCenter.on('update-timer', updateTimer, this);

        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
		eventsCenter.off('update-erros', updateErros, this);
        eventsCenter.off('update-tentativas', updateTentativas, this);
        eventsCenter.off('update-tracinhos', updateTracinhos, this);
        eventsCenter.off('update-timer', updateTimer, this);
	}) 
    }
}