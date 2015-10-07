/**
 * Created by csalajan on 10/7/2015.
 */
var Block = function() {
    this.center = {
        x: 600,
        y: 600
    };

    this.size = {
        x: 10,
        y: 10
    }
};


Block.prototype.Update = function() {
    this.center.x -= 2;

};

Block.prototype.Draw = function(context) {
    context.fillRect(this.center.x - this.size.x /2, this.center.y - this.size.y / 2, this.size.x, this.size.y);
};