var Wall = function(params) {
    this.params = params;
    this.visited = false;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right =  false;
};

Wall.prototype = Object.create(GameObject);

Wall.prototype.Draw = function(context) {

};

Wall.prototype.Clear = function() {

};