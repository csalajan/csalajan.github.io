var Exit = function(game) {
    this.game = game;

    this.center = {
        x: game.canvas.width - 5,
        y: game.canvas.height - 5
    };

    this.size = {
        x: 6,
        y: 6
    };

};

Exit.prototype = GameObject;

Exit.prototype.Draw = function(context) {
    context.fillStyle = "#00FF00";
    context.fillRect(this.center.x - this.size.x / 2, this.center.y - this.size.y / 2, this.size.x, this.size.y);
};