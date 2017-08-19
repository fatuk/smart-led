$(function () {
    var pubnub = new PubNub({
        publishKey : 'pub-c-d4607fa0-2a8f-4e5d-a7db-04dc4729d406',
        subscribeKey : 'sub-c-3a1a8aa2-84d9-11e7-9bef-b2d410151acd'
    });
    var channel = 'clicker_channel';

    function turnOn() {
        var publishConfig = { 
            channel : channel, 
            message : {
                state: true
            },
            storeInHistory: false
        };
        pubnub.publish(publishConfig, function(status, response) { 
            console.log(status, response); 
        });
    }

    function turnOff() {
        var publishConfig = { 
            channel : channel, 
            message : {
                state: false
            },
            storeInHistory: false
        };
        pubnub.publish(publishConfig, function(status, response) { 
            console.log(status, response); 
        });
    }


    var $turnOnBtn = $('#turnOnBtn');
    var $turnOffBtn = $('#turnOffBtn');

    $turnOnBtn.click(turnOn);
    $turnOffBtn.click(turnOff);
});