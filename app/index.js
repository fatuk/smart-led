var gpio = require('rpi-gpio');

gpio.setup(7, gpio.DIR_OUT, turnOn);

function turnOn() {
    gpio.write(7, true, function(err) {
        if (err) throw err;
        console.log('Written to pin ON');
    });
}

function turnOff() {
    gpio.write(7, false, function(err) {
        if (err) throw err;
        console.log('Written to pin OFF');
    });
}

setTimeout(function () {
    gpio.setup(7, gpio.DIR_OUT, turnOff);
}, 2000);