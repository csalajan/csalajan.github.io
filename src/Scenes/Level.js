var Level = function() {
    this.params = {
        width: 50,
        height: 50,
        turn: .2,
        branch: 1,
        reconnect:0,
        deadEnd: 0,
        scale: 16
    };
};

Level.prototype = Scene;

Level.prototype.Start = function(game) {
    game.ClearScreen();

    var maze = new Maze(this.params);
    maze.Build();
    maze.Draw(game.context);

    game.fogOfWar = new FogOfWar(game);
    game.fogOfWar.Init();

    game.bodies.push(new Player(game));
    game.bodies.push(new Exit(game));
};


