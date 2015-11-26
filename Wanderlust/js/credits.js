"use strict"; // sempre colocar no começo do arquivo

// Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais:
// preload, create e update
// Não esquecer da vírgula depois da definição de cada função
var creditsState = {
    // preload: carregar todos os assets necessários para esta scene ou para as próximas
    preload: function(){
    // Não há nenhum asset a ser carregado aqui, então a função fica vazia    
    },   
    
    // create: instanciar e inicializar todos os objetos dessa scene
    create: function(){
    //this.background = this.game.add.sprite(0,0);
    //this.background.width = 800;
	//this.background.height = 600;
    //this.filter = this.game.add.filter('Fire', 800, 600);
	//this.filter.alpha = 0.0;
    //this.background.filters = [this.filter];
    this.game.stage.backgroundColor = "#0000A0";
      // cor de fundo - #000000 indica a cor preta
        // style é uma variável que indica quais as propriedades do texto
        var style = { 
            font: "65px Arial", // Fonte a ser utilizada
            fill: "#ffffff", // Cor da fonte; #ffffff indica a cor branca
            align: "center" // alinhamento do texto
        }
        // Adicionando um texto à scene
        // Parâmetros: X, Y, texto, estilo (definido acima)
        this.game.add.text(100, 100, "Credits", style);
        this.game.add.text(100, 300, "Press enter to restart", style);
    
    },
    update: function(){
      //  this.filter.update
        // Verifica se a tecla ENTER foi pressionada, utilizando o objeto relacionado do game
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            // Inicia o próximo state
            this.game.state.start('intro');
        }
    }
}