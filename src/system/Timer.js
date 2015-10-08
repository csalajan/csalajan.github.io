var Timer = function() {
    this.ele = document.getElementById('Timer');
    this.timer;
    this.startTime;
    this.elapsed;
};

Timer.prototype.Start = function() {
    this.startTime = new Date().getTime();
    this.timer = setInterval(function() {
        var time = new Date().getTime() - this.startTime;
        this.elapsed = Math.floor(time / 100) / 10;
        this.ele.innerHTML = this.elapsed;
    }.bind(this), 100);
};

Timer.prototype.Stop = function() {
    clearInterval(this.timer);
};
