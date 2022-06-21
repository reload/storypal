// Add a forEach method to the Array object.
if (typeof window !== "undefined" && window.Array && !Array.prototype.forEach) {
  Array.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

// Add a forEach method to the NodeList object.
if (
  typeof window !== "undefined" &&
  window.NodeList &&
  !NodeList.prototype.forEach
) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}
