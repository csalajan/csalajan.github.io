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

Maze.prototype.Draw = function(context) {
    for (var x = 0; x < this.params.width; x++) {
        for (var y = 0; y < this.params.height; y++) {
            var top = y*10;
            var bottom = y*10 + 10;
            var left = x *10;
            var right = x * 10 + 10;

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
