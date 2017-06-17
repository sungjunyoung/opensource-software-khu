/**
 * Created by junyoung on 2017. 6. 17..
 */
var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;
var randomstring = require("randomstring");
var consumer = require('./0702_consumer');

var Producer = function () {
    if (!(this instanceof Producer))
        return new Producer();
    EventEmitter.call(this);
    this.items = [];

    // produce 시작
    this.start = function () {

        setInterval(function () {
            if (this.items.length >= 1000) {
                console.log("items over 1000!");
                return;
            }
            var random = randomstring.generate(10);
            this.items.push(random);
            this.emit('add', random);
        }.bind(this), 50);

    };
};

Producer.prototype.__proto__ = EventEmitter.prototype;

module.exports = Producer;

