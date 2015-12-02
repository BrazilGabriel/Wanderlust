"use strict";

var globalState = {

        currentScore: 0,
        currentOxygen: 100,
        hardness: 1,
        // Inicia variáveis do jogo atual.

        highScore1: Number(localStorage.getItem("highScore1")),
        highScore2: Number(localStorage.getItem("highScore2")),
        highScore3: Number(localStorage.getItem("highScore3")),
        highScore4: Number(localStorage.getItem("highScore4")),
        highScore5: Number(localStorage.getItem("highScore5")),
        // Inicia o valor das pontuações máximas com base no que está salvo no navegador.
        
        initHighscore: function (){
            if (this.highScore1 == "undefined") this.highScore1 = 0;
            if (this.highScore2 == "undefined") this.highScore2 = 0;
            if (this.highScore3 == "undefined") this.highScore3 = 0;
            if (this.highScore4 == "undefined") this.highScore4 = 0;
            if (this.highScore5 == "undefined") this.highScore5 = 0;
            // Caso não haja valor salvo em alguma das pontuações, ele define os valores como 0.
        },

        highScore1Name: "",
        highScore2Name: "",
        highScore3Name: "",
        highScore4Name: "",
        highScore5Name: "",
        // Inicia nome dos que pontuaram em ordem.
    }