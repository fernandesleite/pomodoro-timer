$(document).ready(function(){
	var sessionTime = [document.getElementById('session-time').innerHTML, 'Session'];
	var breakTime = [document.getElementById('break-time').innerHTML,'Break'];
	var alertSound = new Audio('http://www.oringz.com/oringz-uploads/sounds-917-communication-channel.mp3');
	var started;
	var timer;

	changeCounter(sessionTime[0]);

	// Counter Logic
	function Clock(sessionTime, breakTime){
		var secondsTotal = sessionTime[0]*60;
		var perFillTotal = 100/secondsTotal;
		var perFill = 0;

		$('.start-msg').html((sessionTime[1]));

		timer = window.setInterval(function(){
			if(started){
				perFill = perFill + perFillTotal;			// % to the fill animation
				secondsTotal--;
				min = Math.floor(secondsTotal/60);			// Math logic to get minutes
				seconds = Math.floor(secondsTotal % 60);	// Math logic to get seconds 
				$('#counter').html(min + ':' + seconds);
				if(seconds < 10){							// Seconds below 10 are printed with an extra zero
					$('#counter').html(min + ':0' + seconds);
				}
				if(secondsTotal == 0){ 						// Calls break time after session and vice versa
					clearInterval(timer);
					alertSound.play();
					Clock(breakTime, sessionTime);
				}
				// Animation: Fill the circle over time until 100%
				$('.circle').css({background: "linear-gradient(to top, #ff2c2c "+perFill+"%,transparent "+perFill+"%)"});
			}
			
		}, 1000)
	}
	// Function to change the counter (mainly used for reset)
	function changeCounter(time, id){
		if (typeof id === "undefined") {
			$('#counter').html(time + ':00');
		}
		$('#'+id).html(time);
		$('#counter').html(time + ':00');
	}
	// Reset the timer to the Session value 
	function reset(clock){
		clearInterval(timer);
		started = undefined;
		changeCounter(sessionTime[0]);
		$('.start-msg').html('Click to Start');
		$('.circle').css({background: '#272727'});
	}
	// Start/Pause the timer by clicking inside the circle
	$("#start-pause").on('click', function(){
		$('.menu').fadeToggle();
		if(started){
			started = false;

		}
		else if(started === undefined){
			started = true;
			Clock(sessionTime, breakTime);
		}
		else{
			started = true;
		}
	});
	// Buttom logic, using a attribute called 'idtype' to identify the timer
	// that the user wants to change
	$(".plus").on('click', function(){
		reset(timer);
		var clockType = $(this).attr('idtype');
		var oldtime = document.getElementById(clockType).innerHTML;
		var newtime = parseInt(oldtime) + 1
		changeCounter(newtime, clockType);
		if(clockType == 'session-time'){
			sessionTime[0] = newtime;
		}
		else{
			breakTime[0] = newtime;	
		}
		
	});
	$(".minus").on('click', function(){
		reset(timer);
		var clockType = $(this).attr('idtype');
		var oldtime = document.getElementById(clockType).innerHTML;
		if(oldtime > 1){
			var newtime = parseInt(oldtime) - 1;
			changeCounter(newtime, clockType);
			if(clockType == 'session-time'){
				sessionTime[0] = newtime;
			}
			else{
				breakTime[0] = newtime;
			}
		}
	});
	
	$('#reset').on('click', function(){
		reset(timer);		
	});
});
  