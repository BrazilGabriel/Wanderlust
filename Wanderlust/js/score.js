"use strict"; // sempre colocar no começo do arquivo

// Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais:
// preload, create e update
// Não esquecer da vírgula depois da definição de cada função
var scoreState = {
    // preload: carregar todos os assets necessários para esta scene ou para as próximas
    preload: function(){

        this.game.load.bitmapFont('fipps', 'assets/fonts/fipps/fipps.png', 'assets/fonts/fipps/fipps.fnt');
        this.game.load.bitmapFont('fippslight', 'assets/fonts/fipps/fippslight.png', 'assets/fonts/fipps/fippslight.fnt');
        
        this.game.load.image('border', 'assets/sprites/scanlines.png');
            
        this.game.load.spritesheet('back', 'assets/sprites/bg.png', 800, 600, 4);
    
    },   
    
    // create: instanciar e inicializar todos os objetos dessa scene
    create: function(){
    
        this.back = this.game.add.sprite(0,0,'back', 0);
        this.back.animations.add('on', [0,1,2,3], 6.5);
  
        this.border = this.game.add.sprite(0,0,'border');
        
        this.scores = this.game.add.bitmapText(400, 100, 'fipps','HIGH SCORES', 32);
        this.scores.anchor.setTo(0.5,0.5);
        this.scores.generateTexture;
                   
        this.rank = this.game.add.bitmapText(150, 380, 'fippslight','1\n2\n3\n4\n5',28);
        this.rank.anchor.setTo(0,0.5);
        this.rank.generateTexture;
        
        this.name = this.game.add.bitmapText(230, 380, 'fipps', globalState.highScore1Name + '\n' + globalState.highScore2Name + '\n' +             globalState.highScore3Name + '\n' + globalState.highScore4Name + '\n' + globalState.highScore5Name, 28);
        this.name.anchor.setTo(0,0.5);
        this.name.generateTexture;
    
        this.score = this.game.add.bitmapText(550, 380, 'fipps', globalState.highScore1 + '\n' + globalState.highScore2 + '\n' + globalState.highScore3 + '\n' + globalState.highScore4 + '\n' + globalState.highScore5,28);
        this.score.anchor.setTo(0,0.5);
        this.score.align = 'right';
        this.score.generateTexture;
        
    },
    
    update: function(){ 
        
        this.back.animations.play('on');
       /*         
        this.finalScore.text = ('YOUR SCORE: \n' + globalState.currentScore);
        */
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)||this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            // Inicia o próximo state
            this.game.state.start('intro');
            globalState.currentScore = 0;
        }
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            // Inicia o próximo state
            this.game.state.start('game');
            globalState.currentScore = 0;
        }
        this.border.bringToTop();
    },
    
}