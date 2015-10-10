var Exit = function(game) {
    this.game = game;
    this.color = "#00FF00";

    this.center = {
        x: game.canvas.width - 5,
        y: game.canvas.height - 5
    };

    this.size = {
        x: 6,
        y: 6
    };

};

Exit.prototype = Object.create(GameObject);
