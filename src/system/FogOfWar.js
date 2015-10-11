var FogOfWar = function(game) {

    this.fogCanvas = document.getElementById("FogOfWar");
    this.fogContext = this.fogCanvas.getContext('2d');
    this.canvasWidth = game.canvas.width;
    this.canvasHeight = game.canvas.height;
    this.radius = 50;

};

FogOfWar.prototype.Init = function () {
    this.fogContext = this.fogCanvas.getContext("2d");
    this.fogContext.fillStyle = "rgba(0,0,0,1)";
    this.fogContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
};


FogOfWar.prototype.Reveal = function(position) {

    this.fogContext.clearRect(position.x - this.radius, position.y - this.radius, this.radius*2, this.radius*2);
};

