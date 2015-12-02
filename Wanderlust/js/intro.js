"use strict"; // sempre colocar no começo do arquivo

// Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais:
// preload, create e update
// Não esquecer da vírgula depois da definição de cada função

var introState = {
    // preload: carregar todos os assets necessários para esta scene ou para as próximas
    preload: function(){
        // carregando o logo animado
        this.game.load.image('ship2', 'assets/sprites/ship2.png', 690,140);
        this.game.load.spritesheet('logo', 'assets/sprites/logo.png', 363, 183, 9);
        this.game.load.spritesheet('back', 'assets/sprites/bg.png', 800, 600, 4);
        this.game.load.spritesheet('ship', 'assets/sprites/spaceship.png', 298, 105, 2);
        this.game.load.spritesheet('buttonplay', 'assets/sprites/buttonplay.png', 200, 60, 2);
        this.game.load.image('hud','assets/sprites/border.png');
    },   
    
    // create: instanciar e inicializar todos os objetos dessa scene
    create: function(){
        //criando maquina de estado
        this.game.status = 0;
        //adicionando o fundo animado
        this.back = this.game.add.sprite(0,0,'back', 0);
        this.back.animations.add('on', [0,1,2,3], 6.5);
        
        
        //adicionando a nave na tela
        this.ship = this.game.add.sprite(350,400,'ship', 0);
        //this.ship2 = this.game.add.sprite(555,300,'ship2', 0);
        
        this.ship.animations.add('on', [0,1], 10);
        this.ship.anchor.setTo(0.5, 0.5);
        this.ship.scale.setTo(1.5,1.5);
        //this.ship2.scale.setTo(-1.2,1.2);
        
    
        //adicionando o logo na tela
        this.logo = this.game.add.sprite(400, 150, 'logo', 0);
        this.logo.anchor.setTo(0.5, 0.5);
        this.logo.animations.add('play', [0,1,2,3,4,5,6,7,8,], 10);        
        //loop da animação
        this.game.time.events.loop(4000, this.logoPlay, this);
       
        //adicionando os botões
        this.buttonplay = this.game.add.sprite(660,340, 'buttonplay', 0);
        this.buttonscore = this.game.add.sprite(640,420, 'buttonplay', 0);
        this.buttoncredits = this.game.add.sprite(620,500, 'buttonplay', 1);
        
        
        
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
        //this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.add.sprite(0,0,'hud');
    },
    
    // update: o que fazer a cada quadro
    update: function(){
        this.back.animations.play('on');
        this.ship.animations.play('on');
        
        // Verifica se a tecla ENTER foi pressionada, utilizando o objeto relacionado do game
        // Inicia o próximo state
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)&&this.game.status==0){
            this.game.state.start('game');
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)&&this.game.status==1){
            this.game.state.start('credits');
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
    
    logoPlay: function(){
        this.logo.animations.play('play');
    },
    
}