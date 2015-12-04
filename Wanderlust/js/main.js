// main.js: Neste arquivo criamos uma instância de Phaser.Game e 
// determinamos quais scenes farão parte do jogo
// logo após iniciamos a primeira scene

// Criação do objeto principal do Phaser: Phaser.game
// parâmetros: largura, altura, tipo de renderização, ID do div
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-canvas');

// Adicionando os states do nosso jogos no objeto game
// Os states já deverão ter sido criados anteriormente

game.state.add('intro', introState);
game.state.add('score', scoreState);
game.state.add('credits', creditsState);
game.state.add('game', gameState);
game.state.add('gameover', gameOverState);

// Iniciando o primeiro state
game.state.start('intro');

