"use strict"; // sempre colocar no começo do arquivo

// Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais:
// preload, create e update
// Não esquecer da vírgula depois da definição de cada função
var gameState = {
    // preload: carregar todos os assets necessários para esta scene ou para as próximas
    preload: function() {
        // Para carregar um sprite simples, basta dar um nome ao mesmo e dizer qual é o arquivo
        this.game.load.image('asteroid', 'assets/sprites/asteroid.png'); //plataforma
        this.game.load.image('capsule', 'assets/sprites/ox.png');
        
        // Para carregar um spritesheet, são necessários parâmetros adicionais além do nome e arquivo
        // é preciso também a largura e altura de cada sprite, e quantos sprites existem no spritesheet
        // Na chamada abaixo, os sprites possuem 80x80, e existem 8 sprites 
        //tamanho(25/34)
        this.game.load.spritesheet('alien', 'assets/sprites/alien1.png',70,50, 4);
        this.game.load.spritesheet('player', 'assets/sprites/astro.png', 64, 64, 12);
        this.game.load.spritesheet('back', 'assets/sprites/bg.png', 800, 600, 4);
    },

    // create: instanciar e inicializar todos os objetos dessa scene
    create: function() {
        // Redimensionando o "mundo", ou seja, o tamanho efetivo da scene, que pode ser maior do que o tamanho do canvas
        // Desta forma podemos ter fases bem maiores do que o canvas mostra, e uma "câmera" mostra a porção relevante do mundo

        
        //adicionando o fundo animado
        this.back = this.game.add.sprite(0,0,'back', 0);
        this.back.animations.add('on', [0,1,2,3], 7);
        
        // Inicializando sistema de física
        // o sistema Arcade é o mais simples de todos, mas também é o mais eficiente em termos de processamento.
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //Variáveis de Controle
        
        // Cor de fundo - #0082bc é um tom de azul
        //this.game.stage.backgroundColor = '#0082bc';

        // Inicializando jogador  
        this.currentSpeed = 0;
        // Adicionando o sprite do jogador na posição (400, 300) usando o asset 'player' e sprite 5
        this.player = this.game.add.sprite(400, 500, 'player', 6);
        this.capsule = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'capsule');        
        this.aliens = this.game.add.group();
        this.aliens.enableBody = true;
        this.aliens.physicsBodyType = Phaser.Physics.ARCADE;
       // this.alien = this.aliens.create(0,0, 'alien');
        
      //  this.aliens.create(400, 300, 'alien', 0);
       // this.box.callAll('animations.add', 'animations', 'idle',[0,0,0,1,2,1], 6, true);
//this.box.callAll('animations.play', 'animations', 'idle');
      
      
        //this.aliens.animations.add('on',[0,1,2,3,2,1],2);

        // Ajustando a âncora do objeto (http://phaser.io/docs/2.4.4/Phaser.Sprite.html#anchor)
        this.player.anchor.setTo(0.5, 0.5);
        this.player.scale.setTo(0.75,0.75);
        // Adicionando física ao objeto
        this.game.physics.enable(this.player);
        this.game.physics.enable(this.capsule);
        // Colidir com os "limites do mundo", ou seja, com os limites definidos em this.game.world.resize()
        // Não gera eventos de colisão, no entanto
        this.player.body.collideWorldBounds = true;
        
        // Adicionando animacoes
        // Parâmetros: nome da animação, sprites que compõem a animação, quadros por segundo
        this.player.animations.add('walkl', [2], 6);
        this.player.animations.add('walkr', [1], 6);
        this.player.animations.add('idle', [7,6,8,6], 2);
        this.player.animations.add('jump', [0], 6);
        
        this.keys = this.game.input.keyboard.createCursorKeys();
        // A função abaixo captura apenas uma tecla e a associa à variável jumpButton
        // this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 
        
        //Chama a função que cria os meteoros
        this.asteroidGenerator = this.game.time.events.loop(4000, this.lateralShoots, this);
    },

    // update: o que fazer a cada quadro
    update: function() {
        
        //animando o fundo
        this.aliens.callAll('animations.play', 'animations', 'on');
        this.back.animations.play('on');
        
        //if(this.aliens.x<this.player.body.x){
          //  this.aliens.scale.setTo(-1,1);
        //}
        //else{
    // this.aliens.scale.setTo(1,1);
    // }
        // Adicionalmente, a função this.groundCollision() é chamada no evento da colisão
        this.game.physics.arcade.collide(this.player, this.asteroid, this.groundCollision, null, this);
        this.game.physics.arcade.collide(this.player, this.aliens, this.groundCollision, null, this);
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
        //    if (this.currentSpeed < 0){
        //        this.currentSpeed += 2;
        //    }
        }
        this.aliens.forEachAlive(function(alien) {
            this.game.physics.arcade.accelerateToObject(alien, this.player, 600, 120, 120);
            if(alien.body.x>this.player.body.x){
                alien.scale.setTo(1,1);
            }
            else{
                alien.scale.setTo(-1,1);
            }
        }, this);
        
        this.currentOxygen-=0.05;
        console.log('Oxygen:', this.currentOxygen);
        
        if (this.currentOxygen <= 0){
            groundCollision();
        }
        
        //se o player estiver parado;
        if (this.currentSpeed == 0){
        //aciona o evento de animação idle se o jogador ficar sem se mover por um tempo...    
            this.time.events.add(Phaser.Timer.SECOND * 2, this.lol, this);
        }
        if (this.currentSpeed != 0){
        //senão, para as animação idle
            this.player.animations.stop('idle');
        //movimentação do pleyer em função do ângulo (ÂNGULO EM RAD, VELOCIDADE, OBJETO A SER MOVIDO)
            this.game.physics.arcade.velocityFromRotation(this.player.rotation-Math.PI/2, this.currentSpeed, this.player.body.velocity);
        //acionar o resto das animações    
            if(this.keys.left.isDown){
                this.player.animations.play('walkl'); // Executar animação 'walk'
            }
            else if(this.keys.right.isDown) {
                this.player.animations.play('walkr'); // Executar animação 'walk'
            }
            else if(this.keys.up.isDown){
                this.player.animations.play('jump'); // Executar animação 'jump'
            }
            else{
                this.player.animations.stop();
                this.player.frame = 9;
            }
        }   

     },
    
    lol: function(){
        //após o termino do tempo, verificar se ainda está parado.Em caso positivo, acionar idle;
        if (this.currentSpeed == 0){
            this.player.animations.play('idle');
        }
    },
    
    oxygenCapsule: function(){
        this.capsule.kill();
        this.currentScore+= 50;
        this.currentOxygen+= 10;
        if (this.currentOxygen > 100){
            this.currentOxygen = 100;
        }
        this.capsule = this.game.add.sprite(game.rnd.integerInRange(100, 680), game.rnd.integerInRange(100, 450), 'capsule');
        this.alien = this.aliens.create(game.rnd.integerInRange(150, 650), game.rnd.integerInRange(150, 550), 'alien');
        this.aliens.callAll('animations.add', 'animations', 'on',[0,1,2,3,2,1], 6, true);
        this.alien.body.collideWorldBounds = true;
        this.alien.anchor.setTo(0.5,0.5);
        this.game.physics.enable(this.capsule);
        console.log('Score:', this.currentScore);
        
    },
    
    alienCollision: function(alien1, alien2){
        alien1.kill();
        alien2.kill();
    },
    
    lateralShoots: function(){
        // Cria os tiros que vem pelas laterais da tela em direção ao jogador
        var side = game.rnd.integerInRange(0, 3);
        if (side == 0){         //top            
            this.asteroid = this.game.add.sprite(game.rnd.integerInRange(200, 600), 0, 'asteroid');
            this.asteroid.anchor.setTo(0.5, 0.5);
            this.game.physics.enable(this.asteroid);
            this.asteroid.angle = game.rnd.integerInRange(135, 225);            
            this.game.physics.arcade.velocityFromRotation(this.asteroid.rotation-Math.PI/2, game.rnd.integerInRange(150, 350), this.asteroid.body.velocity);
        }     
        else if (side == 1){         //right            
            this.asteroid = this.game.add.sprite(800, game.rnd.integerInRange(200, 400), 'asteroid');
            this.asteroid.anchor.setTo(0.5, 0.5);
            this.game.physics.enable(this.asteroid);
            this.asteroid.angle = game.rnd.integerInRange(225, 315);            
            this.game.physics.arcade.velocityFromRotation(this.asteroid.rotation-Math.PI/2, game.rnd.integerInRange(150, 350), this.asteroid.body.velocity);
        }
        else if (side == 2){         //bottom            
            this.asteroid = this.game.add.sprite(game.rnd.integerInRange(200, 600), 600, 'asteroid');
            this.asteroid.anchor.setTo(0.5, 0.5);
            this.game.physics.enable(this.asteroid);
            this.asteroid.angle = game.rnd.integerInRange(0, 45) + game.rnd.integerInRange(0, 45);            
            this.game.physics.arcade.velocityFromRotation(this.asteroid.rotation-Math.PI/2, game.rnd.integerInRange(150, 350), this.asteroid.body.velocity);
        }  
        else if (side == 3){         //left            
            this.asteroid = this.game.add.sprite(0, game.rnd.integerInRange(200, 400), 'asteroid');
            this.asteroid.anchor.setTo(0.5, 0.5);
            this.game.physics.enable(this.asteroid);
            this.asteroid.angle = game.rnd.integerInRange(45, 135);            
            this.game.physics.arcade.velocityFromRotation(this.asteroid.rotation-Math.PI/2, game.rnd.integerInRange(150, 350), this.asteroid.body.velocity);
        }
    },
    
    groundCollision : function(){       
        
        if (this.currentScore > this.highScore1){
            this.highScore1 = this.currentScore;
            this.highScore2 = this.highScore1;
            this.highScore3 = this.highScore2;
            this.highScore4 = this.highScore3;
            this.highScore5 = this.highScore4;
        }
        else if (this.currentScore > this.highScore2){
            this.highScore2 = this.currentScore;
            this.highScore3 = this.highScore2;
            this.highScore4 = this.highScore3;
            this.highScore5 = this.highScore4;
        }
        else if (this.currentScore > this.highScore3){
            this.highScore3 = this.currentScore;
            this.highScore4 = this.highScore3;
            this.highScore5 = this.highScore4;
        }
        else if (this.currentScore > this.highScore4){
            this.highScore4 = this.currentScore;
            this.highScore5 = this.highScore4;
        }
        else if (this.currentScore > this.highScore5){
            this.highScore5 = this.currentScore;
        }
        
        localStorage.setItem("highScore1", this.highScore1);
        localStorage.setItem("highScore2", this.highScore2);
        localStorage.setItem("highScore3", this.highScore3);
        localStorage.setItem("highScore4", this.highScore4);
        localStorage.setItem("highScore5", this.highScore5);
        //Salva as variáveis no navegador
        
        console.log(this.highScore1,this.highScore2,this.highScore3,this.highScore4,this.highScore5);
        this.game.state.start('gameover');
    }
    
    /*moveAliens : function(alien) { 
    this.accelerate(this.alien,this.player,60);
    },
    
    accelerate : function(obj1, obj2, speed) {
        if (typeof speed === 'undefined') { speed = 60; }
        var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
        obj1.body.rotation = angle + this.game.math.degToRad(90);  // correct angle of angry bullets (depends on the sprite used)
        obj1.body.force.x = Math.cos(angle) * speed;   
        obj1.body.force.y = Math.sin(angle) * speed;
    }*/
}