"use strict"; // sempre colocar no começo do arquivo

// Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais:
// preload, create e update
// Não esquecer da vírgula depois da definição de cada função
var creditsState = {
    // preload: carregar todos os assets necessários para esta scene ou para as próximas
    preload: function(){
     
        this.game.load.bitmapFont('fipps', 'assets/fonts/fipps/fipps.png', 'assets/fonts/fipps/fipps.fnt');
        this.game.load.bitmapFont('fippslight', 'assets/fonts/fipps/fippslight.png', 'assets/fonts/fipps/fippslight.fnt');
         
        this.game.load.image('thanks', 'assets/sprites/thanks.png', 130,70);
        this.game.load.image('uea', 'assets/sprites/uealogo.png', 122,122);
        this.game.load.image('border', 'assets/sprites/scanlines.png', 122,122);
        this.game.load.image('team', 'assets/sprites/igniters.png', 200, 112);
        
        this.game.load.spritesheet('back', 'assets/sprites/bg.png', 800, 600, 4);
    
    },   
    
    // create: instanciar e inicializar todos os objetos dessa scene
    create: function(){
    
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
        this.status = 0;
    
        this.back = this.game.add.sprite(0,0,'back', 0);
        this.back.animations.add('on', [0,1,2,3], 6.5);
  
        this.title = this.game.add.bitmapText(400, 500, 'fipps','WANDERLUST', 32);
        this.title.anchor.setTo(0.5,0.5);
    
        this.sub = this.game.add.bitmapText(400, 550, 'fipps','Credits', 28);
        this.sub.anchor.setTo(0.5,0.5);
    
    
        this.team = '\nDOUGLAS MATHEUS \n\n\nVIRGINIA OLIVEIRA \n\n\n\nGABRIEL ALONSO \n\n\nGABRIEL BRASIL \n\n\n\n\nBRUNO ARAUJO \n\nCRISTINA ARAUJO \n\nRAFAEL LIMA \n\n\n\n\n\n\n\n';
        
        this.func = '\nConcept\nElements\n\nConcept\nCharacters \n\n\nPhysics \nSound Design \n\nGame Designer\nAnimations\nGame UI\n \n\nProgramming\n\nGame Design\n\nConcept \nArt'   
        
        this.class = 'Artists\n\n\n\n\n\n\n\nProgrammers\n\n\n\n\n\n\n\n\nGuiding Teachers';
    
        this.text = this.game.add.bitmapText(400, 625, 'fipps', this.team, 18);
        this.text.anchor.setTo(1,0);
        this.text.align = 'right';
    
        this.text2 = this.game.add.bitmapText(400, 625, 'fippslight', this.func, 18);
        
        this.subs = this.game.add.bitmapText(400,600,'fipps',this.class, 16);
        this.subs.anchor.setTo(0.5,0);
        this.subs.align = 'center';
                
        this.thanks = this.game.add.sprite(400,1750, 'thanks');
        this.thanks.scale.setTo(2,2);
        this.thanks.anchor.setTo(0.5,0.5)

        this.uea = this.game.add.sprite(200, 2050, 'uea');
        this.uea.anchor.setTo(0.5,0.5);
        this.igniters = this.game.add.sprite(600, 2050, 'team');
        this.igniters.anchor.setTo(0.5,0.5);
        this.igniters.scale.setTo(1.3,1.3);
        
        this.border = this.game.add.sprite(0,0,'border');
        
        this.game.physics.arcade.enable([ this.sub, this.title,this.text,this.text2, this.subs, this.thanks, this.uea, this.igniters ]);

        this.velocity = 0;

        if (this.status==0){
            this.game.time.events.add(2000, this.changeStatus, this);
        }
        
        this.title.generateTexture;
        this.sub.generateTexture;
        this.text.generateTexture;
        this.text2.generateTexture;
        
    },
    
    update: function(){ 
        
        this.back.animations.play('on');
                
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            if((this.text.body.height+this.text.body.y)>=300){
                this.velocity=-300;
            }
            else{
                this.velocity=0;
            }
        }
        else if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            if(this.title.body.y<=470){
                this.velocity=200;
            }
            else{
                this.velocity=0;
            }
        }
        else if(this.status==1 &&(this.text.body.height+this.text.body.y>=300)){
            this.velocity=-100;
        }
        else if(this.status==1){
            this.velocity=0;
        }
        
        this.title.body.velocity.setTo(0, this.velocity);
        this.sub.body.velocity.setTo(0, this.velocity);
        this.text.body.velocity.setTo(0, this.velocity);
        this.text2.body.velocity.setTo(0, this.velocity);
        this.subs.body.velocity.setTo(0, this.velocity);
        this.thanks.body.velocity.setTo(0, this.velocity);
        this.uea.body.velocity.setTo(0, this.velocity);
        this.igniters.body.velocity.setTo(0, this.velocity);
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
            // Inicia o próximo state
            this.game.state.start('intro');
        }
        this.border.bringToTop();
    },
    
    changeStatus: function(){
        this.status=1;
    }
}