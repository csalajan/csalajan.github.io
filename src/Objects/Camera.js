var Camera = function(xView, yView, canvasWidth, canvasHeight, worldWidth, worldHeight) {
    this.xView = xView || 0;
    this.yView = yView || 0;

    this.xDeadZone = 0;
    this.yDeadZone = 0;

    this.wView = canvasWidth;
    this.hView = canvasHeight;

    this.axis = "both";

    this.followed = null;
    this.viewportRect = new Rectangle(this.xView, this.yView, this.wView, this.hView);

    this.worldRect = new Rectangle(0, 0, worldWidth, worldHeight);
};

Camera.prototype.Follow = function(gameObject, xDeadZone, yDeadZone) {
    this.followed = gameObject;
    this.xDeadZone = xDeadZone;
    this.yDeadZone = yDeadZone;
};

Camera.prototype.Update = function() {
    if (this.followed != null) {
        if (this.followed.center.x - this.xView + this.xDeadZone > this.wView) {
            this.xView = this.followed.center.x - (this.wView - this.xDeadZone);
        } else if (this.followed.center.x - this.xDeadZone < this.xView) {
            this.xView = this.followed.center.x - this.xDeadZone;
        }

        if (this.followed.center.y - this.yView + this.yDeadZone > this.hView) {
            this.yView = this.followed.center.y - (this.hView - this.yDeadZone);
        } else if (this.followed.center.y - this.yDeadZone < this.yView) {
            this.yView = this.followed.center.y - this.yDeadZone;
        }

        this.viewportRect.set(this.xView, this.yView);

        // don't let camera leaves the world's boundary
        if(!this.viewportRect.within(this.worldRect))
        {
            if(this.viewportRect.left < this.worldRect.left)
                this.xView = this.worldRect.left;
            if(this.viewportRect.top < this.worldRect.top)
                this.yView = this.worldRect.top;
            if(this.viewportRect.right > this.worldRect.right)
                this.xView = this.worldRect.right - this.wView;
            if(this.viewportRect.bottom > this.worldRect.bottom)
                this.yView = this.worldRect.bottom - this.hView;
        }
    }
};

Camera.prototype.Draw = function() {

};

Camera.prototype.Clear = function() {

}

var Rectangle = function(left, top, width, height){
    this.left = left || 0;
    this.top = top || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
};

Rectangle.prototype.set = function(left, top, /*optional*/width, /*optional*/height){
    this.left = left;
    this.top = top;
    this.width = width || this.width;
    this.height = height || this.height
    this.right = (this.left + this.width);
    this.bottom = (this.top + this.height);
};

Rectangle.prototype.within = function(r) {
    return (r.left <= this.left &&
    r.right >= this.right &&
    r.top <= this.top &&
    r.bottom >= this.bottom);
};

Rectangle.prototype.overlaps = function(r) {
    return (this.left < r.right &&
    r.left < this.right &&
    this.top < r.bottom &&
    r.top < this.bottom);
};