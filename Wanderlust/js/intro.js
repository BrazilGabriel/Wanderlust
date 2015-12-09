"use strict"; // sempre colocar no começo do arquivo

// Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais:
// preload, create e update
// Não esquecer da vírgula depois da definição de cada função

var introState = {
    // preload: carregar todos os assets necessários para esta scene ou para as próximas
    preload: function(){
        
        this.game.load.audio('oxygen', 'assets/songs/oxygen.ogg');
        this.game.load.audio('crash', 'assets/songs/crash.ogg');
        this.game.load.audio('lowLife', 'assets/songs/lowlife.ogg');
        this.game.load.audio('theme', 'assets/songs/main-theme.ogg');
        this.game.load.audio('menu', 'assets/songs/menu.ogg');
        //this.game.load.spritesheet('logo', 'assets/sprites/logo.png', 363, 183, 9);
        this.game.load.spritesheet('logo', 'assets/sprites/logo.png', 499,96,3);
        this.game.load.spritesheet('back', 'assets/sprites/bg.png', 800, 600, 4);
        this.game.load.spritesheet('menu', 'assets/sprites/menu.png', 800, 600, 3);
        this.game.load.spritesheet('buttonplay', 'assets/sprites/buttonplay.png', 200, 60, 2);
        
        this.game.load.image('hud','assets/sprites/scanlines.png');
    },   
    
    // create: instanciar e inicializar todos os objetos dessa scene
    create: function(){
        this.menuSong = this.game.add.audio('menu');
        this.menuSong.play();
        globalState.initHighscore();
        
        //criando maquina de estado
        this.game.status = 0;
        
        //adicionando o fundo animado
      //  this.back = this.game.add.sprite(0,0,'back', 0);
        //this.back.animations.add('on', [0,1,2,3], 6.5);
        
        //adicionando a nave na tela
        this.menu = this.game.add.sprite(0,0,'menu', 0);
        this.menu.animations.add('on', [0,1,2], 6);
                       
        //adicionando o logo na tela
       // this.logo = this.game.add.sprite(400, 150, 'logo', 0);
      //  this.logo.anchor.setTo(0.5, 0.5);
      //  this.logo.animations.add('play', [0,1,2,2,1,0], 7);        
        //this.logo.animations.add('play', [0,1,2,3,4,5,6,7,8,], 10);        
        //loop da animação
      //  this.game.time.events.loop(3500, this.logoPlay, this);
       // this.game.time.events.loop(4000, this.logoPlay, this);
       
        //adicionando os botões
        this.buttonplay = this.game.add.sprite(660,340, 'buttonplay', 0);
        this.buttonscore = this.game.add.sprite(640,420, 'buttonplay', 0);
        this.buttoncredits = this.game.add.sprite(620,500, 'buttonplay', 1);
        
        this.game.add.sprite(0,0,'hud');
    },
    
    // update: o que fazer a cada quadro
    update: function(){
        
        //this.back.animations.play('on');
        this.menu.animations.play('on');
        
        // Verifica se a tecla ENTER foi pressionada, utilizando o objeto relacionado do game
        // Inicia o próximo state
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)&&this.game.status==0){
            this.game.state.start('game');
            this.menuSong.volume = 0;;
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)&&this.game.status==1){
            this.game.state.start('score');
        }
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)&&this.game.status==2){
            this.game.state.start('credits');
        }
        //movimentando a máquina de estado
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            if(this.game.status == 0 && this.change==false){
                this.game.status = 2;
                this.change=true;
            }
            else if(this.game.status <= 2 && this.change==false){
                this.game.status -= 1;
                this.change=true;
            }
        }  
        else if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            if(this.game.status == 2 && this.change==false){
                this.game.status = 0;
                this.change=true;
            }
            else if(this.game.status >= 0 && this.change==false){
                this.game.status += 1;
                this.change=true;
            }
        }
        else{
            this.change=false;
        }
        //estado do botão play
        if(this.game.status == 0){
            this.buttonplay.frame=1;
            this.buttonscore.frame=0;
            this.buttoncredits.frame=0;
            
        }
        else if(this.game.status == 1){
            this.buttonplay.frame=0;
            this.buttonscore.frame=1;
            this.buttoncredits.frame=0;
        }
        else{
            this.buttonplay.frame=0;
            this.buttonscore.frame=0;
            this.buttoncredits.frame=1;
        }
    },
    
    //logoPlay: function(){
    //    this.logo.animations.play('play');
    //},
    
}