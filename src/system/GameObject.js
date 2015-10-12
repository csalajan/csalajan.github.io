var GameObject = {
    Clear: function(context) {
        context.clearRect(this.center.x - this.size.x / 2, this.center.y - this.size.y / 2, this.size.x, this.size.y);
    },
    Update: function() {

    },
    Draw: function(context) {
        context.fillStyle = this.color;
        context.fillRect(this.center.x - this.size.x / 2, this.center.y - this.size.y / 2, this.size.x, this.size.y);
    },
    collisions: {
        191: 'wall',
        127: 'wall',
        128: 'wall',
        573: 'wall',
        369: 'wall',
        254: 'wall',
        493: 'enemy',
        382: 'bullet'
    },
    CheckCollision: function(center) {
        var pixels = this.game.context.getImageData(center.x - this.size.x / 2, center.y - this.size.y / 2, this.size.x, this.size.y);
        var value = this.Pixels(pixels.data);
        if (value != 0) {
            return this.Collide(this.collisions[value]);
        }
        return true;
    },
    Pixels: function(data) {
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
    },
    Collide: function(collisions) {

    },
    GridPos: function() {
        var x = Math.floor(this.center.x / (this.game.Level.params.width * this.game.Level.params.scale) * this.game.Level.params.width);
        var y = Math.floor(this.center.y / (this.game.Level.params.height * this.game.Level.params.scale) * this.game.Level.params.height);
        return this.game.Level.grid.Get(x, y);
    }
};
