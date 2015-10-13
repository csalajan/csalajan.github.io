var Enemy = function(game) {
    this.game = game;
    this.color = "#0022CC";
    this.facing = 'right';
    this.type = 'Enemy';
    this.timer = new Timer();
    //this.collisions[255] = 'bullet';
    this.directions = {
        0: 'right',
        1: 'up',
        2: 'left',
        3: 'down'
    };

    this.oDir = {
        up: 'down',
        down: 'up',
        left: 'right',
        right: 'left'
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
    this.facing = this.newDirection(grid);
    switch (this.facing) {    
        case 'right':
            newCenter.x += 16;
            break;
        case 'up':
            newCenter.y -= 16;
            break;
        case 'left':
            newCenter.x -=16;
            break;
        case 'down':
            newCenter.y +=16;
            break;
    }

    if (this.timer.Delta() > 50) {
        this.center = newCenter;
        this.timer.Last();
    }
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

Enemy.prototype.newDirection = function(gridItem) {
    var directions = [];
    var direction;
    if (gridItem.up) directions.push('up');
    if (gridItem.down) directions.push('down');
    if (gridItem.left) directions.push('left');
    if (gridItem.right) directions.push('right');

    var x = Math.floor(Math.random() * (directions.length));
    
    if (directions[x] == this.oDir[this.facing] && directions.length > 1) {
        direction = this.newDirection(gridItem);
    } else {
        direction = directions[x];
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
                    //this.game.Win();
                    break;
            }
        }.bind(this));
    }
};