var Bullet = function(owner) {
    this.game = owner.game;
    this.direction = owner.facing;
    this.center = owner.center;
    this.velocity = 3;
    this.collisions[255] = 'wall';
    if (owner instanceof Player) {
        this.color = "red";
    } else {
        this.color = "#0022CC";
    }

    switch (this.direction) {
        case 'right':
        case 'left':
            this.size = {
                x: 4,
                y: 2
            };
            break;
        case 'up':
        case 'down':
            this.size = {
                x: 2,
                y: 4
            };
    }

    this.move = {
        x: (this.direction == 'left') ? -this.velocity : (this.direction == 'right') ? this.velocity : 0,
        y: (this.direction == 'up') ? -this.velocity : (this.direction == 'down') ? this.velocity : 0
    };
};

Bullet.prototype = Object.create(GameObject);

Bullet.prototype.Update = function() {
    var newCenter = {
        x: this.center.x + this.move.x,
        y: this.center.y + this.move.y
    };

    if (this.CheckCollision(newCenter)) {
        this.center = newCenter;
    }
};

Bullet.prototype.Collide = function(value) {
    switch(value) {
        case 'enemy':
            if (this.owner instanceof Enemy) {
                return true;
            }
        case 'wall':
            this.game.Destroy(this);
            return false;
            break;
        default:
            return true;
    }

};
