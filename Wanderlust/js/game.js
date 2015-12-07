"use strict"; // sempre colocar no começo do arquivo

// Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais:
// preload, create e update
// Não esquecer da vírgula depois da definição de cada função
var gameState = {
    // preload: carregar todos os assets necessários para esta scene ou para as próximas
    preload: function() {

        this.game.load.bitmapFont('fipps','assets/fonts/fipps/fipps.png','assets/fonts/fipps/fipps.fnt');
        
        //this.game.load.image('asteroid', 'assets/sprites/asteroid.png');
        this.game.load.image('border','assets/sprites/scanlines.png');
        this.game.load.image('arrow', 'assets/sprites/seta.png');
        
        this.game.load.spritesheet('alien', 'assets/sprites/alien1.png',70,50, 4);
        this.game.load.spritesheet('alien2', 'assets/sprites/alien2.png',45.25,50, 4);
        this.game.load.spritesheet('explosion', 'assets/sprites/explosion.png', 34, 44, 7);
        this.game.load.spritesheet('player', 'assets/sprites/player.png', 25, 46, 16);
        this.game.load.spritesheet('back', 'assets/sprites/bg.png', 800, 600, 4);
        this.game.load.spritesheet('capsule', 'assets/sprites/ox.png', 12, 25, 4);
        this.game.load.spritesheet('asteroid', 'assets/sprites/asteroid.png', 50,53, 4);
        this.game.load.spritesheet('asteroidc', 'assets/sprites/asteroidc.png', 85,42, 4);
                        
        this.game.load.audio('theme', 'assets/songs/main-theme.ogg');
        this.game.load.audio('oxygen', 'assets/songs/oxygen.ogg');
        this.game.load.audio('crash', 'assets/songs/crash.ogg');
        this.game.load.audio('lowLife', 'assets/songs/lowlife.ogg');
        
    
    },

    // create: instanciar e inicializar todos os objetos dessa scene
    create: function() {
        
        this.lowLife = true;
        
        this.lowLifeSong = this.game.add.audio('lowLife');
        this.crash = this.game.add.audio('crash');
        this.oxygenSong = this.game.add.audio('oxygen');
        this.music = this.game.add.audio('theme');
        this.music.play();
                
        //adicionando o fundo animado
        this.back = this.game.add.sprite(0,0,'back', 0);
        this.back.animations.add('on', [0,1,2,3], 7);
        
        // Inicializando sistema de física
        // o sistema Arcade é o mais simples de todos, mas também é o mais eficiente em termos de processamento.
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.currentSpeed = 0;
        
        this.capsule = this.game.add.sprite(game.rnd.integerInRange(0, 750), game.rnd.integerInRange(0, 570), 'capsule'); 
        this.capsule.animations.add('on',[0,1,2,3,0,0,0,0,0,0,0,0], 8);
       
        this.arrows = this.game.add.group();
        this.aliens = this.game.add.group();
        this.aliens.enableBody = true;
        this.aliens.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.player = this.game.add.sprite(400, 500, 'player', 10);
        this.player.anchor.setTo(0.5, 0.5);
        //this.player.scale.setTo(0.75,0.75);
        
        // Adicionando física ao objeto
        this.game.physics.enable(this.player);
        this.game.physics.enable(this.capsule);
        
        // Colidir com os "limites do mundo", ou seja, com os limites definidos em this.game.world.resize()
        // Não gera eventos de colisão, no entanto
        this.player.body.collideWorldBounds = true;
        
        // Adicionando animacoes
        // Parâmetros: nome da animação, sprites que compõem a animação, quadros por segundo
        this.player.animations.add('walkl', [4,5,6], 10);
        this.player.animations.add('walkr', [7,8,9], 10);
        this.player.animations.add('line', [1,2,3], 10);
        this.player.animations.add('lol', [12,13,14,15,14,13], 4);
        
        this.keys = this.game.input.keyboard.createCursorKeys();
        
        //Chama a função que cria os meteoros
        this.arrowGenerator = this.game.time.events.loop(4000, this.arrowAppear, this);
        
        this.border = this.game.add.sprite(0,0,'border');
        
        this.score = this.game.add.bitmapText(30, 40, 'fipps', 'SCORE: ', 15);
        this.oxygen = this.game.add.bitmapText(590, 40, 'fipps', 'Oxygen: ', 15);
        this.asteroidcreate=false;
    },

    // update: o que fazer a cada quadro
    update: function() {
                
        if (globalState.currentOxygen <= 20 && this.lowLife){
            this.lowLifeSong.play();
            this.lowLife = false;
        }

	    if (globalState.currentOxygen >= 20){
	       this.lowLife = true;
        }
        
        if(this.asteroidcreate){
            this.asteroid.animations.play('move');
        this.aliens.callAll('animations.play', 'animations', 'on');
        if (this.player.overlap(this.asteroid)&&globalState.currentOxygen != 0)this.playerKill();
        }
        
        this.capsule.animations.play('on');
        
        //animando o fundo
        this.back.animations.play('on');
        // Adicionalmente, a função this.playerKill() é chamada no evento da colisão
       // this.game.physics.arcade.collide(this.player, this.asteroid, this.playerKill, null, this);
        this.game.physics.arcade.collide(this.player, this.aliens, this.playerKill, null, this);
        this.game.physics.arcade.collide(this.player, this.capsule, this.oxygenCapsule, null, this);   
        this.game.physics.arcade.collide(this.aliens, this.aliens, this.alienCollision, null, this);

        // Movimentando jogador        
        // Se a tecla esquerda estiver pressionada (this.keys.left.isDown == true),
        // mover o sprite para a esquerda
        if(this.keys.left.isDown){
            this.player.angle -= 4;
        }
        // Se a tecla direita estiver pressionada (this.keys.right.isDown == true),
        // mover o sprite para a direita
        else if(this.keys.right.isDown){
            this.player.angle += 4;
        }
        
        // Se a tecla cima estiver pressionada, aumenta a velocidade do jogador
        else if(this.keys.up.isDown){
            this.currentSpeed = 300;
        }
        //se não estiver, reduz a velocidade até chegar a zero;
        else {
            if (this.currentSpeed > 0){
                this.currentSpeed -= 2;
            }
        }
        this.aliens.forEachAlive(function(alien) {
            this.game.physics.arcade.accelerateToObject(alien, this.player, game.rnd.integerInRange(300, 800), game.rnd.integerInRange(80, 240), game.rnd.integerInRange(80, 240));
            if(alien.body.x>this.player.body.x){
                alien.scale.setTo(1,1);
            }
            else{
                alien.scale.setTo(-1,1);
            }
        }, this);
        if(this.player.alive) globalState.currentOxygen-=0.05*globalState.hardness;
        
        if (globalState.currentScore >= 200) globalState.hardness = 1.25;
        if (globalState.currentScore >= 400) globalState.hardness = 1.5;
        if (globalState.currentScore >= 600) globalState.hardness = 1.75;
        if (globalState.currentScore >= 800) globalState.hardness = 2;
        if (globalState.currentScore >= 1000) globalState.hardness = 2.5;
        if (globalState.currentScore >= 1500) globalState.hardness = 3;
        if (globalState.currentScore >= 2000) globalState.hardness = 4;        

        
        if (globalState.currentOxygen <= 0&&this.player.alive){
            this.playerKill();
        }
        
        //se o player estiver parado;
        if (this.currentSpeed == 0){
        //aciona o evento de animação lol se o jogador ficar sem se mover por um tempo...    
            this.time.events.add(Phaser.Timer.SECOND * 2, this.lol, this);
        }
        if (this.currentSpeed != 0){
            //se nao, para as animação lol
            //this.player.animations.stop('lol');
            //movimentação do player em função do ângulo (ÂNGULO EM RAD, VELOCIDADE, OBJETO A SER MOVIDO)
            this.game.physics.arcade.velocityFromRotation(this.player.rotation-Math.PI/2, this.currentSpeed, this.player.body.velocity);
            //acionar o resto das animações    
            if(this.keys.left.isDown){
                this.player.animations.play('walkl'); // Executar animação 'walkl'
            }
            else if(this.keys.right.isDown) {
                this.player.animations.play('walkr'); // Executar animação 'walkr'
            }
            else if(this.keys.up.isDown){
                this.player.animations.play('line'); // Executar animação 'jump'
            }
            else{
                this.player.frame = 0;
            }
        }   
        
        this.score.text = 'SCORE: ' + globalState.currentScore;
        this.score.generateTexture;
        
        this.oxygen.text = 'OXYGEN: ' + game.math.roundTo(globalState.currentOxygen,0) +'\'/.';
        this.oxygen.generateTexture;

        this.border.bringToTop();

     },
    
    lol: function(){
        //após o termino do tempo, verificar se ainda está parado.Em caso positivo, acionar lol;
        if (this.currentSpeed == 0){
            this.player.animations.play('lol');
        }
    },
    
    oxygenCapsule: function(){
        this.oxygenSong.play();
        this.capsule.kill();
        globalState.currentScore+= 50;
        globalState.currentOxygen+= 10;
        if (globalState.currentOxygen > 100){
            globalState.currentOxygen = 100;
        }
        
        this.alienX = game.rnd.integerInRange(150, 650);
        this.alienY = game.rnd.integerInRange(150, 650);
        
        this.positionCheck(this.alienX);
        
        this.capsule = this.game.add.sprite(game.rnd.integerInRange(100, 680), game.rnd.integerInRange(100, 450), 'capsule');
        this.capsule.animations.add('on',[0,1,2,3,0,0,0,0,0,0,0,0], 8);
        
        if(Phaser.Utils.chanceRoll(50)){
            this.alien = this.aliens.create(this.alienX, this.alienY, 'alien');
        }
        else{
            this.alien = this.aliens.create(this.alienX, this.alienY, 'alien2');
        }
        this.aliens.callAll('animations.add', 'animations', 'on',[0,1,2,3,2,1], 6, true);
        this.alien.body.collideWorldBounds = true;
        this.alien.anchor.setTo(0.5,0.5);
        this.game.physics.enable(this.capsule);
        console.log('Score:', globalState.currentScore);
        
    },
    
    positionCheck: function(alienX){
        var continuar = true;
        console.log("Função chamada")
        
        if (alienX >= this.player.x-100 && alienX <= this.player.x+100){
            this.alienX = game.rnd.integerInRange(150, 650);
            console.log("X reajustado")
        }
        else continuar = false;
        
        if (continuar){
            this.positionCheck(this.alienX);
        }
    },
    
    alienCollision: function(alien1, alien2){
        alien1.kill();
        alien2.kill();
    },
    
    arrowAppear: function(){
        this.side = game.rnd.integerInRange(0, 3);
        if (this.side == 0){         //top            
            this.placeX = game.rnd.integerInRange(200, 600);
            this.placeY = 0;
            this.arrow = this.arrows.create(this.placeX, this.placeY, 'arrow');
            this.arrow.angle += 90;
            this.arrow.scale.setTo(0.10, 0.10); 
        }     
        else if (this.side == 1){         //right        
            this.placeX = 800;
            this.placeY = game.rnd.integerInRange(200, 400);
            this.arrow = this.arrows.create(this.placeX, this.placeY, 'arrow');
            this.arrow.angle += 180;   
            this.arrow.scale.setTo(0.10, 0.10); 
        }
        else if (this.side == 2){         //bottom  
            this.placeX = game.rnd.integerInRange(200, 600);
            this.placeY = 600;
            this.arrow = this.arrows.create(this.placeX, this.placeY, 'arrow');
            this.arrow.angle -= 90;
            this.arrow.scale.setTo(0.10, 0.10); 
        }  
        else if (this.side == 3){         //left          
            this.placeX = 0;
            this.placeY = game.rnd.integerInRange(200, 400);
            this.arrow = this.arrows.create(this.placeX, this.placeY, 'arrow');
            this.arrow.scale.setTo(0.10, 0.10); 
        }
        this.game.time.events.add(750, this.lateralShoots, this);
    },
    
    lateralShoots: function(){
        this.timer = 0;
        this.arrow.kill();
        //this.arrow.kill();
        // Cria os tiros que vem pelas laterais da tela em direção ao jogador
        if (this.side == 0){         //top            
            this.asteroid = this.game.add.sprite(this.placeX, this.placeY, 'asteroidc',0);
            this.asteroid.anchor.setTo(0.85, 0.5);
            this.game.physics.enable(this.asteroid);
            this.asteroid.angle = game.rnd.integerInRange(45, 135);            
            this.game.physics.arcade.velocityFromRotation(this.asteroid.rotation, game.rnd.integerInRange(150, 350), this.asteroid.body.velocity);
        }     
        else if (this.side == 1){         //right            
            this.asteroid = this.game.add.sprite(this.placeX, this.placeY, 'asteroidc',0);
            this.asteroid.anchor.setTo(0.85, 0.5);
            this.game.physics.enable(this.asteroid);
            this.asteroid.angle = game.rnd.integerInRange(135, 225);            
            this.game.physics.arcade.velocityFromRotation(this.asteroid.rotation, game.rnd.integerInRange(150, 350), this.asteroid.body.velocity);
        }
        else if (this.side == 2){         //bottom            
            this.asteroid = this.game.add.sprite(this.placeX, this.placeY, 'asteroidc',0);
            this.asteroid.anchor.setTo(0.85, 0.5);
            this.game.physics.enable(this.asteroid);
            this.asteroid.angle = game.rnd.integerInRange(225, 315);         
            this.game.physics.arcade.velocityFromRotation(this.asteroid.rotation, game.rnd.integerInRange(150, 350), this.asteroid.body.velocity);
        }  
        else if (this.side == 3){         //left            
            this.asteroid = this.game.add.sprite(this.placeX, this.placeY, 'asteroidc',0);
            this.asteroid.anchor.setTo(0.85, 0.5);
            this.game.physics.enable(this.asteroid);
            this.asteroid.angle = game.rnd.integerInRange(0,45) + game.rnd.integerInRange(0,45);            
            this.game.physics.arcade.velocityFromRotation(this.asteroid.rotation, game.rnd.integerInRange(150, 350), this.asteroid.body.velocity);
        }
        this.asteroid.animations.add('move',[0,1,2,3], 6);
        this.asteroidcreate=true;
    },
    
    playerKill : function(){
        this.crash.play();
        this.player.kill()
        globalState.currentOxygen = 0;  
        globalState.hardness = 0;
        this.explosion = this.game.add.sprite(this.player.x, this.player.y, 'explosion', 0);
        this.explosion.anchor.setTo(0.5,0.5);
        this.explosion.angle=this.player.angle;
        this.explosion.animations.add('on',[0,1,2,3,4,5,6,],10);
        this.explosion.animations.play('on');
        this.game.time.events.add(800, this.endGame, this);
        
        
    },
    
    endGame : function(){       
        //this.player.kill()
        globalState.hardness = 1;
        globalState.currentOxygen = 100;        
        console.log(globalState.highScore1,globalState.highScore2,globalState.highScore3,globalState.highScore4,globalState.highScore5);
        this.game.state.start('gameover');
    }
    
    
}