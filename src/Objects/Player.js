var Player = function(game) {
    this.game = game;
    this.color = "#FF0000";
    this.facing = 'right';
    this.elex = document.getElementById('x');
    this.eley = document.getElementById('y');
    this.type = 'Player';
    this.timer = new Timer();

    this.center = {
        x: this.game.Level.params.scale / 2,
        y: this.game.Level.params.scale / 2
    };

    this.size = {
        x: this.game.Level.params.scale - 2,
        y: this.game.Level.params.scale - 2
    };

    this.speed = this.game.Level.params.scale;

    this.keyboarder = new Keyboarder();

    setInterval(function() {
        this.PrintPosition();
    }.bind(this), 1000);
};

Player.prototype = Object.create(GameObject);

Player.prototype.PrintPosition = function() {
    var wall = this.GridPos();
    this.elex.innerHTML = wall.grid.x;
    this.eley.innerHTML = wall.grid.y;
};

Player.prototype.Update = function() {
    var newCenter = {
        x: this.center.x,
        y: this.center.y
    };
    var grid = this.GridPos();
    if (this.keyboarder.isDown(this.keyboarder.KEYS.UP) && grid.up) {
        newCenter.y = this.center.y - this.speed;
        this.facing = 'up';
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN) && grid.down) {
        newCenter.y = this.center.y + this.speed;
        this.facing= 'down';
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT) && grid.left) {
        newCenter.x = this.center.x - this.speed;
        this.facing = 'left';
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT) && grid.right) {
        newCenter.x = this.center.x + this.speed;
        this.facing = 'right';
    }

    if (this.keyboarder.isDownOnce(this.keyboarder.KEYS.SPACE)) {
        this.game.bodies.push(new Bullet(this));
    }

    if (this.timer.Delta() > 50) {
        this.center = newCenter;
        this.timer.Last();
    }

    this.game.fogOfWar.Reveal(this.center);
};

Player.prototype.Collide = function(collisions) {
    collisions.forEach(function(body) {
        switch(body.type) {
            case 'Enemy':
                this.Die();
                break;
            case 'Bullet':
                if (body.owner instanceof Enemy) {
                    this.Die();
                }
                break;
            case 'Exit':
                this.game.Win();
                break;
        }
    }.bind(this));
};

Player.prototype.Die = function() {
    alert('You have died!');
    this.game.Destroy(this);
};
