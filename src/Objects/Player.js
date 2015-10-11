var Player = function(game) {
    this.game = game;
    this.color = "#FF0000";
    this.facing = 'right';

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

Player.prototype = Object.create(GameObject);

Player.prototype.Update = function() {
    var newCenter = {
        x: this.center.x,
        y: this.center.y
    };

    if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
        newCenter.y = this.center.y - this.speed;
        this.facing = 'up';
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN)) {
        newCenter.y = this.center.y + this.speed;
        this.facing= 'down';
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
        newCenter.x = this.center.x - this.speed;
        this.facing = 'left';
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
        newCenter.x = this.center.x + this.speed;
        this.facing = 'right';
    }

    if (this.keyboarder.isDownOnce(this.keyboarder.KEYS.SPACE)) {
        this.game.bodies.push(new Bullet(this));
    }

    if (this.CheckCollision(newCenter)) {
        this.center = newCenter;
    }

    this.game.fogOfWar.Reveal(this.center);
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
