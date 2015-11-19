"use strict"; // sempre colocar no começo do arquivo

// Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais:
// preload, create e update
// Não esquecer da vírgula depois da definição de cada função
var gameState = {
    // preload: carregar todos os assets necessários para esta scene ou para as próximas
    preload: function() {
        // Para carregar um sprite simples, basta dar um nome ao mesmo e dizer qual é o arquivo
        this.game.load.image('alien', 'assets/sprites/alien1.png'); //jogador 
        this.game.load.image('platform', 'assets/sprites/platform.png'); //plataforma
        
        // Para carregar um spritesheet, são necessários parâmetros adicionais além do nome e arquivo
        // é preciso também a largura e altura de cada sprite, e quantos sprites existem no spritesheet
        // Na chamada abaixo, os sprites possuem 80x80, e existem 8 sprites 
        this.game.load.spritesheet('player', 'assets/sprites/astro.png', 64, 64, 12);
    },

    // create: instanciar e inicializar todos os objetos dessa scene
    create: function() {
        // Redimensionando o "mundo", ou seja, o tamanho efetivo da scene, que pode ser maior do que o tamanho do canvas
        // Desta forma podemos ter fases bem maiores do que o canvas mostra, e uma "câmera" mostra a porção relevante do mundo
        this.game.world.resize(800, 600);
        
        // Inicializando sistema de física
        // o sistema Arcade é o mais simples de todos, mas também é o mais eficiente em termos de processamento.
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Cor de fundo - #0082bc é um tom de azul
        this.game.stage.backgroundColor = '#0082bc';

        // Inicializando jogador  
        this.currentSpeed = 0;
        // Adicionando o sprite do jogador na posição (400, 300) usando o asset 'player' e sprite 5
        this.player = this.game.add.sprite(400, 500, 'player', 6);
        // Ajustando a âncora do objeto (http://phaser.io/docs/2.4.4/Phaser.Sprite.html#anchor)
        this.player.anchor.setTo(0.5, 0.5);
        // Adicionando física ao objeto
        this.game.physics.enable(this.player);
        // Colidir com os "limites do mundo", ou seja, com os limites definidos em this.game.world.resize()
        // Não gera eventos de colisão, no entanto
        this.player.body.collideWorldBounds = true;
        
        // Adicionando animacoes
        // Parâmetros: nome da animação, sprites que compõem a animação, quadros por segundo
        this.player.animations.add('walkl', [2], 6);
        this.player.animations.add('walkr', [1], 6);
        this.player.animations.add('idle', [7,6,8,6], 2);
        this.player.animations.add('jump', [0], 6);
        
        
        // Fazer a câmera do jogo seguir o jogador; o jogador ficará centralizado na tela, na medida do possível
        this.game.camera.follow(this.player);
        
        this.keys = this.game.input.keyboard.createCursorKeys();
        // A função abaixo captura apenas uma tecla e a associa à variável jumpButton
        // this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 
    },

    // update: o que fazer a cada quadro
    update: function() {
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
    
    groundCollision : function(){
        // Essa função é chamada se o jogador colidir com o chão
        // Faz o jogo avançar para o state 'gameover'
        this.game.state.start('gameover');
    },
}
