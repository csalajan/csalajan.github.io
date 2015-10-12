var Wall = function(params, x, y) {
    this.grid = {
        x: x,
        y: y
    };
    this.params = params;
    this.visited = false;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right =  false;
    this.corners = {
        top: y * params.scale,
        bottom: y * params.scale + params.scale,
        left: x * params.scale,
        right: x * params.scale + params.scale
    };

    this.drawn = false;
};

Wall.prototype = Object.create(GameObject);

Wall.prototype.Draw = function(context) {
    if (!this.drawn) {
        if (!this.visited) {
            context.fillRect(this.corners.left, this.corners.top, 10, 10);
        } else {
            if (!this.up) {
                context.moveTo(this.corners.left, this.corners.top);
                context.lineTo(this.corners.right, this.corners.top);
            }
            if (!this.down) {
                context.moveTo(this.corners.left, this.corners.bottom);
                context.lineTo(this.corners.right, this.corners.bottom);
            }
            if (!this.left) {
                context.moveTo(this.corners.left, this.corners.top);
                context.lineTo(this.corners.left, this.corners.bottom);
            }
            if (!this.right) {
                context.moveTo(this.corners.right, this.corners.top);
                context.lineTo(this.corners.right, this.corners.bottom);
            }
        }

        context.stroke();
        this.drawn = true;
    }
};

Wall.prototype.Clear = function() {

};