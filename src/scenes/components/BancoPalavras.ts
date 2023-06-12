//CRIA BANCO DE PALAVRAS DEFAULT E FUNCAO DE ESCOLHA DE PALAVRA
export default class BancoPalavras{
    bancoPalavras: string[];
    constructor(palavras: string[]) {
        this.bancoPalavras = palavras;
    }

    escolhePalavra(){
        const indice = Math.floor(Math.random() * (this.bancoPalavras.length));
        return this.bancoPalavras[indice];
    }
}