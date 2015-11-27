"use strict"; // sempre colocar no começo do arquivo

// Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais:
// preload, create e update
// Não esquecer da vírgula depois da definição de cada função
var creditsState = {
    // preload: carregar todos os assets necessários para esta scene ou para as próximas
    preload: function(){
    // Não há nenhum asset a ser carregado aqui, então a função fica vazia 
    this.game.load.bitmapFont('fipps', 'assets/fonts/fipps/fipps.png', 'assets/fonts/fipps/fipps.fnt');
    this.game.load.bitmapFont('emulogic', 'assets/fonts/emulogic/emulogic.png', 'assets/fonts/emulogic/emulogic.fnt');
    this.game.load.bitmapFont('lightemulogic', 'assets/fonts/lightemulogic/lightemulogic.png', 'assets/fonts/lightemulogic/lightemulogic.fnt');
    this.game.load.spritesheet('back', 'assets/sprites/bg.png', 800, 600, 4);

    },   
    
    // create: instanciar e inicializar todos os objetos dessa scene
    create: function(){
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.status = 0;
    
    var style = { 
        font: '28px fipps',
        align: "center", // alinhamento do texto
        fontSize: '28px'
    }
    
    this.back = this.game.add.sprite(0,0,'back', 0);
    this.back.animations.add('on', [0,1,2,3], 6.5);
    //this.background = this.game.add.sprite(0,0);
    //this.background.width = 800;
	//this.background.height = 600;
    //this.filter = this.game.add.filter('Fire', 800, 600);
	//this.filter.alpha = 0.0;
    //this.background.filters = [this.filter];
    this.title = this.game.add.bitmapText(400, 100, 'fipps','WANDERLUST', 32);
    this.title.anchor.setTo(0.5,0.5);
    this.title.generateTexture;
   
    this.sub = this.game.add.bitmapText(400, 150, 'fipps','Credits', 28);
    this.sub.anchor.setTo(0.5,0.5);
    
    //this.art = this.game.add.bitmapText(400, 200, 'fipps','Artists', 14);
    //this.art.anchor.setTo(0.5,0.5);
    
   // this.prog = this.game.add.bitmapText(400, 340, 'fipps','Programmers', 14);
   //this.prog.anchor.setTo(0.5,0.5);
    
    this.team = '    DOUGLAS MATHEUS \n\n\n    VIRGINIA OLIVEIRA \n\n\n       GABRIEL ALONSO \n\n\n        GABRIEL BRASIL \n\n         BRUNO ARAUJO \n     CRISTINA ARAUJO \n            RAFAEL LIMA';
    this.func = 'Concept\nElements\n\nConcept\nCharacters \n\nPhysics \nSound Design \n\nAnimations\nGame UI\n\nProgramming'   
    this.text = this.game.add.bitmapText(400, 225, 'fipps', this.team, 18);
    this.text.anchor.setTo(1,0);
    
    this.text2 = this.game.add.bitmapText(400, 225, 'fipps', this.func, 18);
    
        //this.game.stage.backgroundColor = "#000000";
    
    this.velocity = 0;

    this.game.physics.arcade.enable([ this.sub, this.title,this.text,this.text2 ]);
        
    if (this.status==0){
        this.game.time.events.add(2000, this.changeStatus, this);
    }
        

      // cor de fundo - #000000 indica a cor preta
        // style é uma variável que indica quais as propriedades do texto
        // Adicionando um texto à scene
        // Parâmetros: X, Y, texto, estilo (definido acima)
     //   this.game.add.text(100, 100, "Credits", style);
     //   this.game.add.text(100, 300, "Press ESC to back", style);
    
    },
    update: function(){
      //  this.filter.update
        // Verifica se a tecla ENTER foi pressionada, utilizando o objeto relacionado do game
        this.back.animations.play('on');
      // this.hudtxt.text = 'WANDERLUST';
        
        
        
            
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
                    this.velocity=-300;
            }
            else if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)){
                if(this.title.body.y<=450){
                    this.velocity=200;
                }
                else{
                    this.velocity=0;
                }
            }
            else{
                if(this.status==1){
                    this.velocity=-100;
                }
            }
            
            this.title.body.velocity.setTo(0, this.velocity);
            this.sub.body.velocity.setTo(0, this.velocity);
            this.text.body.velocity.setTo(0, this.velocity);
            this.text2.body.velocity.setTo(0, this.velocity);
      //  
       // this.hudtxt2.text = 'Credits';
        

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
            // Inicia o próximo state
            this.game.state.start('intro');
        }
    },
    changeStatus: function(){
        
        this.status=1;
    }
}