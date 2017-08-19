var gpio = require('rpi-gpio');
var PubNub = require('pubnub');
var channel = 'clicker_channel';
var PIN = 7;

function turnOn() {
    gpio.write(PIN, true, function (err) {
        if (err) throw err;
        console.log('Written to pin ON');
    });
}

function turnOff() {
    gpio.write(PIN, false, function (err) {
        if (err) throw err;
        console.log('Written to pin OFF');
    });
}



var pubnub = new PubNub({
    publishKey : 'pub-c-d4607fa0-2a8f-4e5d-a7db-04dc4729d406',
    subscribeKey : 'sub-c-3a1a8aa2-84d9-11e7-9bef-b2d410151acd'
}); 

var publishConfig = { 
    channel : channel, 
    message : 'Hellloo From JavaScript SDK'
};

pubnub.addListener({
    status: function (statusEvent) {
        console.log(statusEvent);
    },
    message: function (res) {
        console.log(res.message);
        if (res.message.state) {
            gpio.setup(7, gpio.DIR_OUT, turnOn);
        } else {
            gpio.setup(7, gpio.DIR_OUT, turnOff);
        }
    },
    presence: function (presenceEvent) {
        console.log('presenceEvent');
    }
});

pubnub.subscribe({
    channels: [channel] 
});