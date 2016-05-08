$(document).ready(function(){
	// counter logic

	var sessionTime = [document.getElementById('session-time').innerHTML, 'Session'];
	var breakTime = [document.getElementById('break-time').innerHTML,'Break'];
	var alertSound = new Audio('http://www.oringz.com/oringz-uploads/sounds-917-communication-channel.mp3');
	var started;
	var timer;

	changeCounter(sessionTime[0]);

	function Clock(sessionTime, breakTime){
		var secondsTotal = sessionTime[0]*60;
		$('.start-msg').html((sessionTime[1]));

		timer = window.setInterval(function(){
			if(started){
				secondsTotal--;
				min = Math.floor(secondsTotal/60);
				seconds = Math.floor(secondsTotal % 60);
				$('#counter').html(min + ':' + seconds);
				if(seconds < 10){
					$('#counter').html(min + ':0' + seconds);
				}
				if(secondsTotal == 0){
					clearInterval(timer);
					alertSound.play();
					Clock(breakTime, sessionTime);
				}
			}
			
		}, 1000)
	}

	function changeCounter(time, id){
		if (typeof id === "undefined") {
			$('#counter').html(time + ':00');
		}
		$('#'+id).html(time);
		$('#counter').html(time + ':00');
	}

	function reset(clock){
		clearInterval(timer);
		started = undefined;
		changeCounter(sessionTime[0]);
		$('.start-msg').html('Click to Start');
	}

	$("#start-pause").on('click', function(){
		$('.menu').fadeToggle()
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
		
		console.log(breakTime[0], sessionTime[0])
		
	});
	$(".minus").on('click', function(){
		reset(timer);
		var clockType = $(this).attr('idtype');
		var oldtime = document.getElementById(clockType).innerHTML;
		if(oldtime > 1){
			var newtime = parseInt(oldtime) - 1;
			changeCounter(newtime, clockType)
			if(clockType == 'session-time'){
				sessionTime[0] = newtime;
			}
			else{
				breakTime[0] = newtime;
			}
			
			console.log(breakTime[0], sessionTime[0])
		}
	});
	
	$('#reset').on('click', function(){
		reset(timer);		
	});

});



// TODO: BUTTONS
// TODO OPTIONAL: ANIMATION    