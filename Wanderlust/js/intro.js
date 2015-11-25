"use strict"; // sempre colocar no começo do arquivo

// Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais:
// preload, create e update
// Não esquecer da vírgula depois da definição de cada função
var introState = {
    // preload: carregar todos os assets necessários para esta scene ou para as próximas
    preload: function(){
        // carregando o logo animado
        this.game.load.spritesheet('logo', 'assets/sprites/logo.png', 363, 183, 9);
        this.game.load.spritesheet('back', 'assets/sprites/bg.png', 800, 600, 4);
    },   
    
    // create: instanciar e inicializar todos os objetos dessa scene
    create: function(){
        
        //adicionando o fundo animado
        this.back = this.game.add.sprite(0,0,'back', 0);
        this.back.animations.add('on', [0,1,2,3], 6.5);
        
        
        
        //adicionando o logo na tela
        this.logo = this.game.add.sprite(400, 200, 'logo', 0);
        this.logo.anchor.setTo(0.5, 0.5);
        this.logo.animations.add('play', [0,1,2,3,4,5,6,7,8,], 10);
        //loop da animação
        this.game.time.events.loop(4000, this.logoPlay, this);
        // cor de fundo - #ffffff indica a cor branca
        this.game.stage.backgroundColor = "#ffffff";
        // style é uma variável que indica quais as propriedades do texto
        var style = { 
            font: "65px Arial", // Fonte a ser utilizada
            fill: "#000000", // Cor da fonte; #000000 indica a cor preta
            align: "center" // alinhamento do texto
        }
        // Adicionando um texto à scene
        // Parâmetros: X, Y, texto, estilo (definido acima)
        //this.game.add.text(100, 100, "The Game", style);
        //this.game.add.text(100, 300, "Press enter to start", style);
    },
    
    // update: o que fazer a cada quadro
    update: function(){
        this.back.animations.play('on');
        
        // Verifica se a tecla ENTER foi pressionada, utilizando o objeto relacionado do game
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            // Inicia o próximo state
            this.game.state.start('game');
        }   
    },
    
    logoPlay: function(){
        this.logo.animations.play('play');
    },
    
}