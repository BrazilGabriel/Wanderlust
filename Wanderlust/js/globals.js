"use strict";

var globalState = {
    preload: function() {
    },
    
    create: function() {
        this.currentScore = 0;
        this.currentOxygen = 0;
        // Inicia variáveis do jogo atual.

        this.highScore1 = localStorage.getItem("highScore1");
        this.highScore2 = localStorage.getItem("highScore2");
        this.highScore3 = localStorage.getItem("highScore3");
        this.highScore4 = localStorage.getItem("highScore4");
        this.highScore5 = localStorage.getItem("highScore5");
        // Inicia o valor das pontuações máximas com base no que está salvo no navegador.
        
        if (this.highScore1 == "undefined") this.highScore1 = 0;
        if (this.highScore2 == "undefined") this.highScore2 = 0;
        if (this.highScore3 == "undefined") this.highScore3 = 0;
        if (this.highScore4 == "undefined") this.highScore4 = 0;
        if (this.highScore5 == "undefined") this.highScore5 = 0;
        // Caso não haja valor salvo em alguma das pontuações, ele define os valores como 0.

        this.highScore1Name;
        this.highScore2Name;
        this.highScore3Name;
        this.highScore4Name;
        this.highScore5Name;
        // Inicia nome dos que pontuaram em ordem.
        
        console.log(this.currentScore, this.currentOxygen, this.highScore1, this.highScore2, this.highScore3, this.highScore4, this.highScore5);

        this.game.state.start('intro');
        // Chama a cena de menu.
    },
    
    update: function() {
    }
}