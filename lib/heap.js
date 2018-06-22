'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Heap = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _node = require('./node');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Heap = exports.Heap = function () {
    function Heap() {
        _classCallCheck(this, Heap);

        this.heap = [null];
    }

    _createClass(Heap, [{
        key: 'insert',
        value: function insert(val, weight) {
            var nodeToAdd = new _node.Node(val, weight);
            this.heap.push(nodeToAdd);
            var currNode = this.heap.length - 1;
            var parentNode = Math.floor(currNode / 2);

            while (this.heap[parentNode] && nodeToAdd.weight > this.heap[parentNode].weight) {
                var parent = this.heap[parentNode];
                this.heap[parentNode] = nodeToAdd;
                this.heap[currNode] = parent;
                currNode = parentNode;
                parentNode = Math.floor(currNode / 2);
            }
        }
    }, {
        key: 'remove',
        value: function remove() {
            if (this.heap.length < 3) {
                var toReturn = this.heap.pop();
                this.heap[0] = null;
                return toReturn;
            }

            var toRemove = this.heap[1];
            this.heap[1] = this.heap.pop();
            var currentIdx = 1;
            var left = 2 * currentIdx,
                right = 2 * currentIdx + 1;

            var currentChildIdx = this.heap[right] && this.heap[right].priority >= this.heap[left].priority ? right : left;
            while (this.heap[currentChildIdx] && this.heap[currentIdx].priority <= this.heap[currentChildIdx].priority) {
                var currentNode = this.heap[currentIdx];
                var currentChildNode = this.heap[currentChildIdx];
                this.heap[currentChildIdx] = currentNode;
                this.heap[currentIdx] = currentChildNode;
            }
            return toRemove;
        }
    }, {
        key: 'print',
        value: function print() {
            this.heap.map(function (x) {
                return x ? console.log('value: ' + x.value + ' weight: ' + x.weight) : null;
            });
        }
    }]);

    return Heap;
}();