var Keyboarder = function() {
    var keyState = {};

    window.onkeydown = function(e) {
        keyState[e.keyCode] = true;
    }

    window.onkeyup = function(e) {
        keyState[e.keyCode] = false
    }

    this.isDown = function(keyCode) {
        return keyState[keyCode] === true;
    }

    this.KEYS = {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39
    }
};