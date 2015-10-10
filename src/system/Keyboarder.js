var Keyboarder = function() {
    var keyState = {};
    var fired = false;

    window.onkeydown = function(e) {
        keyState[e.keyCode] = true;
    };

    window.onkeyup = function(e) {
        keyState[e.keyCode] = false
        fired = false;
    };

    this.isDown = function(keyCode) {
        return keyState[keyCode] === true;
    };

    this.isDownOnce = function(keyCode) {
        if(keyState[keyCode] && !fired) {
            fired = true;
            return true;
        }

        return false;
    };

    this.KEYS = {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        SPACE: 32
    }
};