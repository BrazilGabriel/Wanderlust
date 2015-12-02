// main.js: Neste arquivo criamos uma instância de Phaser.Game e 
// determinamos quais scenes farão parte do jogo
// logo após iniciamos a primeira scene

// Criação do objeto principal do Phaser: Phaser.game
// parâmetros: largura, altura, tipo de renderização, ID do div
var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-canvas');

// Adicionando os states do nosso jogos no objeto game
// Os states já deverão ter sido criados anteriormente

game.state.add('intro', introState);
game.state.add('credits', creditsState);
game.state.add('game', gameState);
game.state.add('gameover', gameOverState);

// Iniciando o primeiro state
game.state.start('intro');

var lines = new Image();
lines.src = 'assets/teste/scanlines-vignette-4gl.png';
base_image = new Image();
base_image.src = 'assets/sprites/logo.png';

window.addEventListener('load', fakeCRT, false);

function fakeCRT() {
    var glcanvas, source, srcctx, texture, w, h, hw, hh, w75;
    
    // Try to create a WebGL canvas (will fail if WebGL isn't supported)
    try {
        glcanvas = fx.canvas();
    } catch (e) {return;}
    
    // Assumes the first canvas tag in the document is the 2D game, but
    // obviously we could supply a specific canvas element here.
    source = document.getElementById('gamecanvas');
    srcctx = source.getContext('2d');
    
    
    // This tells glfx what to use as a source image
    texture = glcanvas.texture(source);
    
    // Just setting up some details to tweak the bulgePinch effect
    w = source.width;
    h = source.height;
    hw = w / 2;
    hh = h / 2;
    w75 = w * 0.75;

    // Hide the source 2D canvas and put the WebGL Canvas in its place
    source.parentNode.insertBefore(glcanvas, source);
    source.style.display = 'none';
    glcanvas.className = source.className;
    glcanvas.id = source.id;
    source.id = 'old_' + source.id;
    
    // It is pretty silly to setup a separate animation timer loop here, but
    // this lets us avoid monkeying with the source game's code.
    // It would make way more sense to do the following directly in the source
    // game's draw function in terms of performance.
    setInterval(function () {
        // Give the source scanlines
        srcctx.drawImage(lines, 0, 0, w, h);
        
        // Load the latest source frame
        texture.loadContentsOf(source);
        
        // Apply WebGL magic
        srcctx.drawImage(base_image, 0, 0);
        glcanvas.draw(texture)
            .bulgePinch(hw, hh, w75, 0.12)
            .vignette(0.25, 0.74)
            .update();
    }, Math.floor(1000 / 40));
}