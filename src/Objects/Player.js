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

