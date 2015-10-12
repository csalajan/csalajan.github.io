var HashTable = function() {
    this.type = "HashTable";
    this.table = new Array();
};

HashTable.prototype.BetterHash = function(data) {
    const H = 37;
    var total = 0;
    for (var i = 0; i < data.length; ++i) {
        total += H * total + data.charCodeAt(i);
    }

    hash = total % this.table.length;
    if (hash < 0) {
        hash += this.table.length - 1;
    }

    return parseInt(hash);
};

HashTable.prototype.Put = function(data) {
    var pos = data.grid.x * Math.pow(2, 6) + data.grid.y;
    this.table[pos] = data;
};

HashTable.prototype.Get = function(x, y) {
    var pos = x * Math.pow(2, 6) + y;
    return this.table[pos];
};