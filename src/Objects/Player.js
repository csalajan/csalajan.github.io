var Player = function(game) {
    this.game = game;
    this.color = "#FF0000";

    this.collisions = {
        255: 'win',
        191: 'wall',
        127: 'wall',
        128: 'wall',
        493: 'enemy'
    };

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
    var value = this.Pixels(pixels.data);
    if (value != 0) {
        this.Collide(this.collisions[value]);
        return false;
    }
    return true;
    /*
    if (pixels.data.indexOf(255) > -1) {
        this.game.Win();
    }
    return pixels.data.indexOf(191) == -1 && pixels.data.indexOf(127) == -1 && pixels.data.indexOf(128) == -1;
    */
};

Player.prototype.Pixels = function(data) {
    var seen = {};
    var filtered = data.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    }).filter(function(item) {
        return item != 0;
    });
    if (filtered.length > 0) {
        return filtered.reduce(function(a, b) {
            return a + b;
        }, 0);
    }

    return filtered;
};

Player.prototype.Collide = function(item) {
    switch(item) {
        case 'wall':
            // Do Nothing. Handled in Update
            break;
        case 'exit':
            // Win Condition
            break;
        case 'enemy':
            // Death
            break;
    }
};
