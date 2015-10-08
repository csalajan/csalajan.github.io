/**
 * Created by csalajan on 10/7/2015.
 */
var PCEngine = function(Game) {
    this.game = Game;
};

PCEngine.prototype.GenerateStuff = function() {
    setInterval(function() {
        this.game.bodies.push(new Block());
    }.bind(this), 1000)
};

PCEngine.prototype.MazeGenerator = function(params) {
    var maze = new Maze(params);
    maze.Build();
    maze.Draw(this.game.context);
    //this.game.bodies.push(maze);
};