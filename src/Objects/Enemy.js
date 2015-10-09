var Enemy = function(game) {
    this.game = game;
    this.color = "#0022CC";
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