$(function () {
	var pubnub = new PubNub({
		publishKey: 'pub-c-d4607fa0-2a8f-4e5d-a7db-04dc4729d406',
		subscribeKey: 'sub-c-3a1a8aa2-84d9-11e7-9bef-b2d410151acd'
	});
	var channel = 'clicker_channel';

	function turnOn() {
		var publishConfig = {
			channel: channel,
			message: {
				state: true
			},
			storeInHistory: false
		};
		pubnub.publish(publishConfig, function (status, response) {
			console.log(status, response);
		});
	}

	function turnOff() {
		var publishConfig = {
			channel: channel,
			message: {
				state: false
			},
			storeInHistory: false
		};
		pubnub.publish(publishConfig, function (status, response) {
			console.log(status, response);
		});
	}


	var $turnOnBtn = $('#turnOnBtn');
	var $turnOffBtn = $('#turnOffBtn');

	$turnOnBtn.click(turnOn);
	$turnOffBtn.click(turnOff);




	if (annyang) {
		// Let's define a command.
		var commands = {
			'включи': turnOn,
			'выключи': turnOff
		};

		annyang.debug();
		annyang.setLanguage('ru-RU');
		// annyang.setLanguage('es-ES');
		// Add our commands to annyang
		annyang.addCommands(commands);

		annyang.addCallback('resultMatch', function (userSaid, commandText, phrases) {
			console.log(userSaid); // sample output: 'hello'
			console.log(commandText); // sample output: 'hello (there)'
			console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
		});

		annyang.addCallback('resultNoMatch', function (phrases) {
			console.log("I think the user said: ", phrases[0]);
			console.log("But then again, it could be any of the following: ", phrases);
		});
		annyang.addCallback('error', function () {
			console.log('There was an error in Annyang!');
		});

		// Start listening.
		annyang.start();
	}
});
