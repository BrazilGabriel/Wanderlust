"use strict"; // sempre colocar no começo do arquivo

// Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais:
// preload, create e update
// Não esquecer da vírgula depois da definição de cada função
var gameOverState = {
    // preload: carregar todos os assets necessários para esta scene ou para as próximas
    preload: function(){
    // Não há nenhum asset a ser carregado aqui, então a função fica vazia 
        this.game.load.bitmapFont('fipps', 'assets/fonts/fipps/fipps.png', 'assets/fonts/fipps/fipps.fnt');
        this.game.load.bitmapFont('fippslight', 'assets/fonts/fipps/fippslight.png', 'assets/fonts/fipps/fippslight.fnt');
        
        this.game.load.image('border', 'assets/sprites/border.png');
        this.game.load.image('dead', 'assets/sprites/dead.png');
        
        this.game.load.spritesheet('back', 'assets/sprites/bg.png', 800, 600, 4);
    
    },   
    
    // create: instanciar e inicializar todos os objetos dessa scene
    create: function(){
    
        this.back = this.game.add.sprite(0,0,'back', 0);
        this.back.animations.add('on', [0,1,2,3], 6.5);
  
        this.gameOver = this.game.add.bitmapText(400, 150, 'fipps','GAME OVER', 40);
        this.gameOver.anchor.setTo(0.5,0.5);
        this.gameOver.generateTexture;
        this.finalScore = this.game.add.bitmapText(50, 300, 'fipps','Ponts', 30);
        this.finalScore.align = 'center'
        this.finalScore.generateTexture;
    
        this.dead = this.game.add.sprite(800,650,'dead');
        this.dead.anchor.setTo(1,1);
        
        this.game.add.bitmapText(50,500,'fipps','Press enter to try again!',15);
        this.border = this.game.add.sprite(0,0,'border');
        
    },
    
    update: function(){ 
        
        this.back.animations.play('on');
                
        this.finalScore.text = ('YOUR SCORE: \n' + globalState.currentScore);
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)||this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            // Inicia o próximo state
            this.game.state.start('intro');
            globalState.currentScore = 0;
        }
        this.border.bringToTop();
    },
    
}