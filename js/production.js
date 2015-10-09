var FogOfWar = function(game) {

    this.fogCanvas = document.getElementById("FogOfWar");
    this.fogContext = this.fogCanvas.getContext('2d');
    this.canvasWidth = game.canvas.width;
    this.canvasHeight = game.canvas.height;
    this.radius = 25;

};

FogOfWar.prototype.Init = function () {
    this.fogContext = this.fogCanvas.getContext("2d"), this.fogContext.fillStyle = "rgba(0,0,0,1)", this.fogContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
};


FogOfWar.prototype.Reveal = function(position) {
    this.Init();
    this.fogContext.clearRect(position.x - this.radius, position.y - this.radius, this.radius*2, this.radius*2);
};


var GameObject = {
    Clear: function(context) {

    },
    Update: function() {

    },
    Draw: function(context) {
        context.fillStyle = this.color;
        context.fillRect(this.center.x - this.size.x / 2, this.center.y - this.size.y / 2, this.size.x, this.size.y);
    }
};

var Keyboarder = function() {
    var keyState = {};

    window.onkeydown = function(e) {
        keyState[e.keyCode] = true;
    }

    window.onkeyup = function(e) {
        keyState[e.keyCode] = false
    }

    this.isDown = function(keyCode) {
        return keyState[keyCode] === true;
    }

    this.KEYS = {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39
    }
};
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
var Scene = {
    Start: function() {

    }
};

var Timer = function() {
    this.ele = document.getElementById('Timer');
    this.timer;
    this.startTime;
    this.elapsed;
};

Timer.prototype.Start = function() {
    this.startTime = new Date().getTime();
    this.timer = setInterval(function() {
        var time = new Date().getTime() - this.startTime;
        this.elapsed = Math.floor(time / 100) / 10;
        this.ele.innerHTML = this.elapsed;
    }.bind(this), 100);
};

Timer.prototype.Stop = function() {
    clearInterval(this.timer);
};

/**
 * Created by csalajan on 10/7/2015.
 */
var Block = function() {
    this.center = {
        x: 600,
        y: 600
    };

    this.size = {
        x: 10,
        y: 10
    }
};


Block.prototype.Update = function() {
    this.center.x -= 2;

};

Block.prototype.Draw = function(context) {
    context.fillRect(this.center.x - this.size.x /2, this.center.y - this.size.y / 2, this.size.x, this.size.y);
};
var Camera = function(xView, yView, canvasWidth, canvasHeight, worldWidth, worldHeight) {
    this.xView = xView || 0;
    this.yView = yView || 0;

    this.xDeadZone = 0;
    this.yDeadZone = 0;

    this.wView = canvasWidth;
    this.hView = canvasHeight;

    this.axis = "both";

    this.followed = null;
    this.viewportRect = new Rectangle(this.xView, this.yView, this.wView, this.hView);

    this.worldRect = new Rectangle(0, 0, worldWidth, worldHeight);
};

Camera.prototype.Follow = function(gameObject, xDeadZone, yDeadZone) {
    this.followed = gameObject;
    this.xDeadZone = xDeadZone;
    this.yDeadZone = yDeadZone;
};

Camera.prototype.Update = function() {
    if (this.followed != null) {
        if (this.followed.center.x - this.xView + this.xDeadZone > this.wView) {
            this.xView = this.followed.center.x - (this.wView - this.xDeadZone);
        } else if (this.followed.center.x - this.xDeadZone < this.xView) {
            this.xView = this.followed.center.x - this.xDeadZone;
        }

        if (this.followed.center.y - this.yView + this.yDeadZone > this.hView) {
            this.yView = this.followed.center.y - (this.hView - this.yDeadZone);
        } else if (this.followed.center.y - this.yDeadZone < this.yView) {
            this.yView = this.followed.center.y - this.yDeadZone;
        }

        this.viewportRect.set(this.xView, this.yView);

        // don't let camera leaves the world's boundary
        if(!this.viewportRect.within(this.worldRect))
        {
            if(this.viewportRect.left < this.worldRect.left)
                this.xView = this.worldRect.left;
            if(this.viewportRect.top < this.worldRect.top)
                this.yView = this.worldRect.top;
            if(this.viewportRect.right > this.worldRect.right)
                this.xView = this.worldRect.right - this.wView;
            if(this.viewportRect.bottom > this.worldRect.bottom)
                this.yView = this.worldRect.bottom - this.hView;
        }
    }
};

Camera.prototype.Draw = function() {

};

Camera.prototype.Clear = function() {

}

var Rectangle = function(left, top, width, height){
    this.left = left || 0;
    this.top = top || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
};

Rectangle.prototype.set = function(left, top, /*optional*/width, /*optional*/height){
    this.left = left;
    this.top = top;
    this.width = width || this.width;
    this.height = height || this.height
    this.right = (this.left + this.width);
    this.bottom = (this.top + this.height);
};

Rectangle.prototype.within = function(r) {
    return (r.left <= this.left &&
    r.right >= this.right &&
    r.top <= this.top &&
    r.bottom >= this.bottom);
};

Rectangle.prototype.overlaps = function(r) {
    return (this.left < r.right &&
    r.left < this.right &&
    this.top < r.bottom &&
    r.top < this.bottom);
};
var Enemy = function(game) {
    this.game = game;
    this.color = "#0000FF";
    this.facing = 'right';
    this.directions = {
        0: 'right',
        1: 'up',
        2: 'left',
        3: 'down'
    };

    this.center = {
        x: 1,
        y: 1
    };

    this.size = {
        x: 6,
        y: 6
    };

    this.SetStartLocation();
};

Enemy.prototype = GameObject;

Enemy.prototype.SetStartLocation = function() {
    var x = Math.random() * this.game.canvas.width;
    var y = Math.random() * this.game.canvas.height;

    this.center.x = x - (x % this.game.Level.params.scale) + (this.game.Level.params.scale / 2);
    this.center.y = y - (y % this.game.Level.params.scale) + (this.game.Level.params.scale / 2);
};

Enemy.prototype.Update = function() {

    var newCenter = {
        x: this.center.x,
        y: this.center.y
    };

    switch (this.facing) {
        case 'right':
            newCenter.x += 1;
            break;
        case 'up':
            newCenter.y -= 1;
            break;
        case 'left':
            newCenter.x -=1;
            break;
        case 'down':
            newCenter.y +=1;
            break;
    }

    if (this.CheckCollision(newCenter)) {
        this.center = newCenter;
    } else {
        this.facing = this.newDirection();
    }
};

Enemy.prototype.CheckCollision = function(center) {
    var pixels = this.game.context.getImageData(center.x - this.size.x / 2, center.y - this.size.y / 2, this.size.x, this.size.y);

    return pixels.data.indexOf(191) == -1 && pixels.data.indexOf(127) == -1 && pixels.data.indexOf(128) == -1;
};

Enemy.prototype.Clear = function(context) {
    context.clearRect(this.center.x - this.size.x / 2, this.center.y - this.size.y / 2, this.size.x, this.size.y)
};

Enemy.prototype.newDirection = function(currentDirection) {
    var x = Math.floor(Math.random() * 4);
    var direction = this.directions[x];
    if (direction == currentDirection) {
        return this.directions[(x++) % 4];
    }
    return direction;

};
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

Exit.prototype = GameObject;

/**
 * Created by Craig on 10/7/2015.
 */
var Maze = function(params) {
    this.data = [];
    this.params = params;
    this.full = 0;
    this.dir = ['up', 'down', 'left', 'right'];
    this.oDir = {up: 'down', down: 'up', left: 'right', right: 'left'}
    this.size = this.params.height * this.params.width;
};

Maze.prototype.Build = function() {
    for (var x = 0; x < this.params.width; x++) {
        this.data[x] = [];
        for (var y = 0; y < this.params.height; y++) {
            this.data[x][y] = {
                visited: false,
                up: false,
                down: false,
                left: false,
                right: false
            };
        }
    }

    var x = this.rand(this.params.width);
    var y = this.rand(this.params.height);
    var direction = this.dir[this.rand(4)];

    this.DoMaze(x, y, direction);
};

Maze.prototype.rand = function(max) {
    return Math.floor(max * Math.random());
};

Maze.prototype.DoMaze = function(x, y, direction) {

    this.full++;
    var percentFull = this.full / this.size;

    this.data[x][y].visited = true;
    var newDirection = direction;

    if (Math.random() < this.params.deadEnd) return;

    if (Math.random() < this.params.turn) {
        if (direction == 'up' || direction == 'down') {
            newDirection = (Math.random() < .5) ? 'left' : 'right';
        } else if (direction == 'left' || direction == 'right') {
            newDirection = (Math.random() <.5) ? 'up' : 'down';
        }
    }

    var dx = 0;
    var dy = 0;

    switch(newDirection) {
        case 'up':
            dy = -1;
            break;
        case 'down':
            dy = 1;
            break;
        case 'left':
            dx = -1;
            break;
        case 'right':
            dx = 1;
            break;
    }

    if (!this.MazeVisited(x + dx, y + dy)) {
        this.data[x][y][newDirection] = true;
        this.data[x+dx][y+dy][this.oDir[newDirection]] = true;
        this.DoMaze(x +dx, y+dy, newDirection);
    } else if (Math.random() < this.params.reconnect && this.MazeInBounds(x + dx, y+dy)) {
        this.data[x][y][newDirection] = true;
        this.data[x+dx][y+dy][this.oDir[newDirection]] = true;
    } else {
        var ds = [];
        for(var a = 0; a < 4; a++) {
            if (this.dir[a] != newDirection && this.dir[a] != this.oDir[direction]) {
                ds.push(this.dir[a]);
            }
        }

        if (Math.random() < .5) {
            var td = ds[0];
            ds[0] = ds[1];
            ds [1] = td;
        }

        for (i = 0; i < 2; i++) {
            var dx = 0;
            var dy = 0;
            var nd = ds[i];

            switch(nd) {
                case 'up':
                    dy = -1;
                    break;
                case 'down':
                    dy = 1;
                    break;
                case 'left':
                    dx = -1;
                    break;
                case 'right':
                    dx = 1;
                    break;
            }

            if (!this.MazeVisited(x+dx, y+dy)) {
                this.data[x][y][nd] = true;
                this.data[x+dx][y+dy][this.oDir[nd]] = true;
                this.DoMaze(x + dx, y + dy, nd);
            }
        }
    }

    for (var i = 0; i < 4; i++) {
        if (Math.random() < this.params.branch) {
            var dx = 0;
            var dy = 0;
            nd = this.dir[i];

            switch(nd) {
                case 'up':
                    dy = -1;
                    break;
                case 'down':
                    dy = 1;
                    break;
                case 'left':
                    dx = -1;
                    break;
                case 'right':
                    dx = 1;
                    break;
            }

            if (!this.MazeVisited(x+dx, y+dy)) {
                this.data[x][y][nd] = true;
                this.data[x+dx][y+dy][this.oDir[nd]] = true;
                this.DoMaze(x + dx, y + dy, nd);
            }
        }
    }
};

Maze.prototype.MazeVisited = function(x, y) {
    if (!this.MazeInBounds(x, y)) {
        return true;
    }
    return this.data[x][y].visited;
};

/**
 * @return {boolean}
 */
Maze.prototype.MazeInBounds = function(x, y) {
    return !(x < 0 || x >= this.params.width || y < 0 || y >= this.params.height);
};

Maze.prototype.Update = function() {

};

Maze.prototype.Clear = function() {

}

Maze.prototype.Draw = function(context) {
    for (var x = 0; x < this.params.width; x++) {
        for (var y = 0; y < this.params.height; y++) {
            var top = y*this.params.scale;
            var bottom = y*this.params.scale + this.params.scale;
            var left = x *this.params.scale;
            var right = x * this.params.scale + this.params.scale;

            if (!this.data[x][y].visited) {
                context.fillRect(left, top, 10, 10);
            } else {
                if (!this.data[x][y].up) {
                    context.moveTo(left, top);
                    context.lineTo(right, top);
                }
                if (!this.data[x][y].down) {
                    context.moveTo(left, bottom);
                    context.lineTo(right, bottom);
                }
                if (!this.data[x][y].left) {
                    context.moveTo(left, top);
                    context.lineTo(left, bottom);
                }
                if (!this.data[x][y].right) {
                    context.moveTo(right, top);
                    context.lineTo(right, bottom);
                }
            }
        }
    }
    context.stroke();
};

var Player = function(game) {
    this.game = game;
    this.color = "#FF0000";

    this.center = {
        x: 5,
        y: 5
    };

    this.size = {
        x: 6,
        y: 6
    };

    this.speed = 2;

    this.keyboarder = new Keyboarder();
};

//Player.prototype = GameObject;

Player.prototype.Update = function() {
    var newCenter = {
        x: this.center.x,
        y: this.center.y
    };

    if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
        newCenter.y = this.center.y - this.speed;
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN)) {
        newCenter.y = this.center.y + this.speed;
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
        newCenter.x = this.center.x - this.speed;
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
        newCenter.x = this.center.x + this.speed;
    }

    if (this.CheckCollision(newCenter)) {
        this.center = newCenter;
        this.game.fogOfWar.Reveal(this.center);
    }
};

Player.prototype.Draw = function(context) {
    context.fillStyle = this.color;
    context.fillRect(this.center.x - this.size.x / 2, this.center.y - this.size.y / 2, this.size.x, this.size.y);
};

Player.prototype.Clear = function(context) {
    context.clearRect(this.center.x - this.size.x / 2, this.center.y - this.size.y / 2, this.size.x, this.size.y)
};

Player.prototype.CheckCollision = function(center) {
    var pixels = this.game.context.getImageData(center.x - this.size.x / 2, center.y - this.size.y / 2, this.size.x, this.size.y);
    if (pixels.data.indexOf(255) > -1) {
        this.game.Win();
    }
    return pixels.data.indexOf(191) == -1 && pixels.data.indexOf(127) == -1 && pixels.data.indexOf(128) == -1;
};


var Level = function() {
    this.params = {
        width: 50,
        height: 50,
        turn: .2,
        branch: 1,
        reconnect:0,
        deadEnd: 0,
        scale: 16,
        enemies: 10
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

    for (var i = 0; i < this.params.enemies; i++) {
        game.bodies.push(new Enemy(game));
    }

    setInterval(function() {
        game.bodies.push(new Enemy(game));
    }, 20000);

    game.bodies.push(new Exit(game));
    game.Timer.Start();
};



var MainMenu = function() {

};

MainMenu.prototype = Scene;

/**
 * Created by csalajan on 10/7/2015.
 */
var Game = function(canvas) {
    //this.canvas = this.SetupCanvas(canvas);
    this.canvas= document.getElementById(canvas);
    this.context = this.canvas.getContext('2d');

    this.Level = new Level();
    this.Timer = new Timer();

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
    this.bodies.forEach(function(body) {
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

