var GameObject = {
    Clear: function(context) {

    },
    Update: function() {

    },
    Draw: function(context) {
        context.fillStyle = this.color;
        context.fillRect(this.center.x - this.size.x / 2, this.center.y - this.size.y / 2, this.size.x, this.size.y);
    }
};
