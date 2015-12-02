"use strict";

var globalState = {
    preload: function() {
    },
    
    create: function() {
        var currentScore = 0;
        var currentOxygen = 0;
        // Inicia variáveis do jogo atual.

        var highScore1;
        var highScore2;
        var highScore3;
        var highScore4;
        var highScore5;
        // Inicia o valor das pontuações máximas.

        var highScore1Name;
        var highScore2Name;
        var highScore3Name;
        var highScore4Name;
        var highScore5Name;
        // Inicia nome dos que pontuaram em ordem.

        this.game.state.start('intro');
    },
    
    update: function() {
    }
}