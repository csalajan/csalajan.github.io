/**
 * Created by csalajan on 10/7/2015.
 */
var Game = function(canvas) {
    //this.canvas = this.SetupCanvas(canvas);
    this.canvas= document.getElementById(canvas);
    this.context = this.canvas.getContext('2d');

    this.Level = new Level();
    this.Timer = new Timer();
    this.fogOfWar = new FogOfWar(this);
    this.bodies = [];

    var tick = function() {
        this.Update();
        this.Draw();
        requestAnimationFrame(tick);
    }.bind(this);

    tick();
    this.StartMaze();
};

Game.prototype.SetupCanvas = function(canvas) {
    var gameArea = document.getElementById("gameArea");
    var widthToHeight = 1;
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;

    var newWidthToHeight = newWidth / newHeight;

    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
        gameArea.style.height = newHeight + 'px';
        gameArea.style.width = newWidth + 'px';
    } else {
        newHeight = newWidth / widthToHeight;
        gameArea.style.width = newWidth + 'px';
        gameArea.style.height = newHeight + 'px';
    }

    gameArea.style.marginTop = (-newHeight / 2) + 'px';
    gameArea.style.marginLeft = (-newWidth / 2) + 'px';

    var gameCanvas = document.getElementById(canvas);
    gameCanvas.width = newWidth;
    gameCanvas.height = newHeight;

    return gameCanvas;
};

Game.prototype.Convert =  {
    gameXToCanvasX: function(x) {
        return x/game.gameWidth*gameCanvas.width;
    },
    gameYToCanvasY: function(y) {
        return y/game.gameHeight*gameCanvas.height;
    },
    canvasXToGameX: function(x) {
        return x*gameCanvas.width/game.gameWidth;
    },
    canvasYToGameY: function() {
        return y*gameCanvas.height/game.gameHeight;
    }
};

Game.prototype.ClearScreen = function() {
    this.bodies = [];
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.StartMaze = function() {
  this.Level.Start(this);
};

Game.prototype.MainMenu = function() {

};

Game.prototype.Update = function() {
    this.fogOfWar.Init();
    this.bodies.forEach(function(body) {
        body.Collide(this.IsColliding(body));
        body.Clear(this.context);
        body.Update();
    }.bind(this));
};

Game.prototype.Draw = function() {
    //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bodies.forEach(function(body) {
        body.Draw(this.context);
    }.bind(this));
};

Game.prototype.Win = function() {
    alert('You Win!');
};

Game.prototype.Destroy = function(object) {
    this.bodies.splice(this.bodies.indexOf(object), 1);
};

Game.prototype.IsColliding = function(body) {
    return this.bodies.filter(function(a) {
        return this.Colliding(body, a);
    }.bind(this));
};

Game.prototype.Colliding = function(a, b) {
    return !(a === b ||
    a.center.x + a.size.x / 2 < b.center.x - b.size.x / 2 ||
    a.center.y + a.size.y / 2 < b.center.y - b.size.y / 2 ||
    a.center.x - a.size.x / 2 > b.center.x + b.size.x / 2 ||
    a.center.y - a.size.y / 2 > b.center.y + b.size.y / 2);
};

