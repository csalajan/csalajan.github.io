var Enemy = function(game) {
    this.game = game;
    this.color = "#0022CC";
    this.facing = 'right';
    this.type = 'Enemy';
    //this.collisions[255] = 'bullet';
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
        x: 14,
        y: 14
    };

    this.SetStartLocation();
};

Enemy.prototype = Object.create(GameObject);

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
    var grid = this.GridPos();
    switch (this.facing) {    
        case 'right':
            if(grid.right){
                newCenter.x += 16;
            }
            else
                this.facing = this.newDirection();
            break;
        case 'up':
            if(grid.up){
                newCenter.y -= 16;
            }
            else
                this.facing = this.newDirection();
            break;
        case 'left':
            if(grid.left){
                newCenter.x -=16;
            }
            else
                this.facing = this.newDirection();
            break;
        case 'down':
            if(grid.down){
                newCenter.y +=16;
            }
            else
                this.facing = this.newDirection();    
            break;
    }
    this.center = newCenter;
    /*
    if (this.game.Timer.Delta() > 50 && this.CheckCollision(newCenter)) {
        this.center = newCenter;
        this.game.Timer.Last();
    } else if(this.CheckCollision(newCenter)){
        this.facing = this.newDirection();
    }
    */

    if (Math.floor(Math.random() * 100) == 5) {
        this.game.bodies.push(new Bullet(this));
    }
};

Enemy.prototype.newDirection = function(currentDirection) {
    var x = Math.floor(Math.random() * 4);
    var direction = this.directions[x];
    if (direction == currentDirection) {
        return this.directions[(x++) % 4];
    }
    return direction;

};

Enemy.prototype.Collide = function(collisions) {
    if (Array.isArray(collisions)) {
        collisions.forEach(function (body) {
            switch (body.type) {
                case 'Bullet':
                    if (body.owner instanceof Player) {
                        this.game.Destroy(this);
                    }
                    break;
                case 'Exit':
                    this.game.Win();
                    break;
            }
        }.bind(this));
    }
};