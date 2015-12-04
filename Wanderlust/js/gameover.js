"use strict"; // sempre colocar no começo do arquivo

// Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais:
// preload, create e update
// Não esquecer da vírgula depois da definição de cada função
var gameOverState = {
    // preload: carregar todos os assets necessários para esta scene ou para as próximas
    preload: function(){
         
        this.game.load.bitmapFont('fipps', 'assets/fonts/fipps/fipps.png', 'assets/fonts/fipps/fipps.fnt');
        this.game.load.bitmapFont('fippslight', 'assets/fonts/fipps/fippslight.png', 'assets/fonts/fipps/fippslight.fnt');
        
        this.game.load.image('border', 'assets/sprites/scanlines.png');
        this.game.load.image('dead', 'assets/sprites/dead.png');
        
        this.game.load.spritesheet('back', 'assets/sprites/bg.png', 800, 600, 4);
    
    },   
    
    // create: instanciar e inicializar todos os objetos dessa scene
    create: function(){
        
        this.back = this.game.add.sprite(0,0,'back', 0);
        this.back.animations.add('on', [0,1,2,3], 6.5);
  
        this.gameOver = this.game.add.bitmapText(400, 100, 'fipps','GAME OVER', 40);
        this.gameOver.anchor.setTo(0.5,0.5);
        this.gameOver.generateTexture;
        
        this.finalScore = this.game.add.bitmapText(55, 200, 'fipps','Points', 30);
        this.finalScore.align = 'center'
        this.finalScore.generateTexture;
    
        this.dead = this.game.add.sprite(800,650,'dead');
        this.dead.anchor.setTo(1,1);
        
        this.game.add.bitmapText(50,500,'fipps','Press enter to try again',15);
        
        this.border = this.game.add.sprite(0,0,'border');
        
        
        if ((globalState.currentScore > globalState.highScore1)||(globalState.currentScore > globalState.highScore2)||(globalState.currentScore > globalState.highScore3)||(globalState.currentScore > globalState.highScore4)||(globalState.currentScore > globalState.highScore5)){
            
            this.newscore=true;
            this.index=0;
            this.indexw=0;
        
            this.newRank = this.game.add.bitmapText(220,390,'fippslight', 'New Top Score!\n Please, input your name:',15);
            this.newRank.anchor.setTo(0.5,0.5);
            this.newRank.align = 'center';
        
            this.keyUP = game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.keyUP.onDown.add(this.indexDown, this);
        
            this.keyDOWN = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.keyDOWN.onDown.add(this.indexUp, this);
       
            this.keyLEFT = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.keyLEFT.onDown.add(this.indexLeft, this);
        
            this.keyRIGHT = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            this.keyRIGHT.onDown.add(this.indexRight, this);
            
            this.showName = this.game.add.bitmapText(220,470,'fippslight', 'ddsd',20);
            this.showName.anchor.setTo(0.5,0.5);
            
            /*this.letra='';
            this.letra0='';
            this.letra1='';
            this.letra2='';
            this.letra3='';
            this.letra4='';
            this.letra5='';
            this.letra6='';
            this.letra7='';*/
        }

    },
    
    update: function(){
        if(this.newscore){
            if(this.indexw==0){
                this.letra0=this.letra
            }
                
            if(this.indexw==1){
                this.letra1=this.letra
            }
            else if(this.indexw<1){
                this.letra1=''
            }
        
            if(this.indexw==2){
                this.letra2=this.letra
            }
            else if(this.indexw<2){
                this.letra2=''
            }
            
            if(this.indexw==3){
                this.letra3=this.letra
            }
            else if(this.indexw<3){
                this.letra3=''
            }
            
            if(this.indexw==4){
                this.letra4=this.letra
            }
            else if(this.indexw<4){
                this.letra4=''
            }
            
            if(this.indexw==5){
                this.letra5=this.letra
            }
            else if(this.indexw<5){
                this.letra5=''
            }
            
            if(this.indexw==6){
            this.letra6=this.letra
            }
            else if(this.indexw<6){
                this.letra6=''
            }
            
            if(this.indexw==7){
                this.letra7=this.letra
            }
            else if(this.indexw<7){
                this.letra7=''
            }
            
            this.char(this.letra,this.index);
            this.name=this.letra0+this.letra1+this.letra2+this.letra3+this.letra4+this.letra5+this.letra6+this.letra7;
            this.showName.text = (this.name);
        }
        
        this.back.animations.play('on');
                
        this.finalScore.text = ('YOUR SCORE: \n' + globalState.currentScore);
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
            // Inicia o próximo state
            this.setHighScore();
            this.game.state.start('intro');
            globalState.currentScore = 0;
        }
    
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            // Inicia o próximo state
            this.setHighScore();
            this.game.state.start('game');
            globalState.currentScore = 0;
        }

        this.border.bringToTop();
    },
    
    indexDown: function(){
        if(this.index == 0 ){
            this.index = 37;
        }
        else {
            this.index -= 1;
        }
    },
    
    indexUp: function(){
        if(this.index == 37 ){
            this.index = 0;
        }
        else {
            this.index += 1;
        }    
    },
    
    indexLeft: function(){
        if(this.indexw > 0 ){
            this.indexw -= 1;
            this.index=0;
        }
    },
    
    indexRight: function(){
        if(this.indexw < 7 ){
            this.indexw += 1;
            this.index=0;
        }    
    },
    
    setHighScore: function(){
        
        if (globalState.currentScore > globalState.highScore1){
            globalState.highScore5 = globalState.highScore4;
            globalState.highScore4 = globalState.highScore3;
            globalState.highScore3 = globalState.highScore2;
            globalState.highScore2 = globalState.highScore1;
            globalState.highScore1 = globalState.currentScore;
            globalState.highScore5Name = globalState.highScore4Name;
            globalState.highScore4Name = globalState.highScore3Name;
            globalState.highScore3Name = globalState.highScore2Name;
            globalState.highScore2Name = globalState.highScore1Name;
            globalState.highScore1Name = this.name;
        }
        else if (globalState.currentScore > globalState.highScore2){
            globalState.highScore5 = globalState.highScore4;
            globalState.highScore4 = globalState.highScore3;
            globalState.highScore3 = globalState.highScore2;
            globalState.highScore2 = globalState.currentScore;
            globalState.highScore5Name = globalState.highScore4Name;
            globalState.highScore4Name = globalState.highScore3Name;
            globalState.highScore3Name = globalState.highScore2Name;
            globalState.highScore2Name = this.name;
        }
        else if (globalState.currentScore > globalState.highScore3){
            globalState.highScore5 = globalState.highScore4;
            globalState.highScore4 = globalState.highScore3;
            globalState.highScore3 = globalState.currentScore;
            globalState.highScore5Name = globalState.highScore4Name;
            globalState.highScore4Name = globalState.highScore3Name;
            globalState.highScore3Name = this.name;
        }
        else if (globalState.currentScore > globalState.highScore4){
            globalState.highScore5 = globalState.highScore4;
            globalState.highScore4 = globalState.currentScore;
            globalState.highScore5Name = globalState.highScore4Name;
            globalState.highScore4Name = this.name;
        }
        else if (globalState.currentScore > globalState.highScore5){
            globalState.highScore5 = globalState.currentScore;
            globalState.highScore5Name = this.name;
        }
        
        localStorage.setItem("highScore1", globalState.highScore1);
        localStorage.setItem("highScore2", globalState.highScore2);
        localStorage.setItem("highScore3", globalState.highScore3);
        localStorage.setItem("highScore4", globalState.highScore4);
        localStorage.setItem("highScore5", globalState.highScore5);
        
        localStorage.setItem("highScore1Name", globalState.highScore1Name);
        localStorage.setItem("highScore2Name", globalState.highScore2Name);
        localStorage.setItem("highScore3Name", globalState.highScore3Name);
        localStorage.setItem("highScore4Name", globalState.highScore4Name);
        localStorage.setItem("highScore5Name", globalState.highScore5Name);
        //Salva as variáveis no navegador    
    },
    
    char: function(){
        if (this.index==0){
            this.letra="A"
        }
        else if (this.index==1){
            this.letra="B"
        }
        else if (this.index==2){
            this.letra="C"
        }
        else if (this.index==3){
            this.letra="D"
        }
        else if (this.index==4){
            this.letra="E"
        }
        else if (this.index==5){
            this.letra="F"
        }
        else if (this.index==6){
            this.letra="G"
        }
        else if (this.index==7){
            this.letra="H"
        }
        else if (this.index==8){
            this.letra="I"
        }
        else if (this.index==9){
            this.letra="J"
        }
        else if (this.index==10){
            this.letra="K"
        }
        else if (this.index==11){
            this.letra="L"
        }
        else if (this.index==12){
            this.letra="M"
        }
        else if (this.index==13){
            this.letra="N"
        }
        else if (this.index==14){
            this.letra="O"
        }
        else if (this.index==15){
            this.letra="P"
        }
        else if (this.index==16){
            this.letra="Q"
        }
        else if (this.index==17){
            this.letra="R"
        }
        else if (this.index==18){
            this.letra="S"
        }
        else if (this.index==19){
            this.letra="T"
        }
        else if (this.index==20){
            this.letra="U"
        }
        else if (this.index==21){
            this.letra="V"
        }
        else if (this.index==22){
            this.letra="W"
        }
        else if (this.index==23){
            this.letra="X"
        }
        else if (this.index==24){
            this.letra="Y"
        }
        else if (this.index==25){
            this.letra="Z"
        }
        else if (this.index==26){
            this.letra="0"
        }
        else if (this.index==27){
            this.letra="1"
        }
        else if (this.index==28){
            this.letra="2"
        }
        else if (this.index==29){
            this.letra="3"
        }
        else if (this.index==30){
            this.letra="4"
        }
        else if (this.index==31){
            this.letra="5"
        }
        else if (this.index==32){
            this.letra="6"
        }
        else if (this.index==33){
            this.letra="7"
        }
        else if (this.index==34){
            this.letra="8"
        }
        else if (this.index==35){
            this.letra="9"
        }
        else if (this.index==36){
            this.letra="-"
        }
        else if (this.index==37){
            this.letra=" "
        }
    }
    
}