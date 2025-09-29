

// variables
var $win = $(window);
var clientWidth = $win.width();
var clientHeight = $win.height();

$(window).resize(function() {
    var newWidth = $win.width();
    var newHeight = $win.height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			var timer = setInterval(function() {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
				}
			}, 75);
		});
		return this;
	};
})(jQuery);

function timeElapse(birthdayDate){
	var current = new Date();
	var birthday = new Date(birthdayDate);

	// Calculate time difference
	var timeDiff = current.getTime() - birthday.getTime();

	// Convert to years, days, hours, minutes, seconds
	var years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25));
	var days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
	var hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

	// Format with leading zeros
	if (days < 10) {
		days = "0" + days;
	}
	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}

	// Pretty date with day of week
	var locale = navigator.language || 'en-US';
	var birthdayDay = birthday.toLocaleDateString(locale, { weekday: 'long' });
	var birthdayPretty = birthday.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });

	// Romantic minimal layout
	var result = `
		<div class="timer-container">
			<div class="timer-title">Born on ${birthdayDay}, ${birthdayPretty} ❤</div>
			<div class="timer-grid">
				<div class="timer-item">
					<div class="timer-number">${years}</div>
					<div class="timer-label">Years</div>
				</div>
				<div class="timer-item">
					<div class="timer-number">${days}</div>
					<div class="timer-label">Days</div>
				</div>
				<div class="timer-item">
					<div class="timer-number">${hours}</div>
					<div class="timer-label">Hours</div>
				</div>
				<div class="timer-item">
					<div class="timer-number">${minutes}</div>
					<div class="timer-label">Minutes</div>
				</div>
				<div class="timer-item">
					<div class="timer-number">${seconds}</div>
					<div class="timer-label">Seconds</div>
				</div>
			</div>
		</div>
	`;
	$("#clock").html(result);

	var text = "Every moment with you is precious 💕";
	$("#message-box").html(text);
}

// Countdown to next birthday from today
function countdownToNextBirthday(birthdayDate){
	var now = new Date();
	var bday = new Date(birthdayDate);
	// Build next occurrence of birthday (month/day), keep next year if passed
	var next = new Date(now.getFullYear(), bday.getMonth(), bday.getDate());
	if (next < now) {
		next = new Date(now.getFullYear() + 1, bday.getMonth(), bday.getDate());
	}

	var diff = next.getTime() - now.getTime();
	if (diff < 0) diff = 0;

	var days = Math.floor(diff / (1000 * 60 * 60 * 24));
	var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((diff % (1000 * 60)) / 1000);

	if (days < 10) days = "0" + days;
	if (hours < 10) hours = "0" + hours;
	if (minutes < 10) minutes = "0" + minutes;
	if (seconds < 10) seconds = "0" + seconds;

	var result = `
		<div class="timer-container small">
			<div class="timer-title">Until your next birthday 🎂</div>
			<div class="timer-grid">
				<div class="timer-item"><div class="timer-number">${days}</div><div class="timer-label">Days</div></div>
				<div class="timer-item"><div class="timer-number">${hours}</div><div class="timer-label">Hours</div></div>
				<div class="timer-item"><div class="timer-number">${minutes}</div><div class="timer-label">Minutes</div></div>
				<div class="timer-item"><div class="timer-number">${seconds}</div><div class="timer-label">Seconds</div></div>
			</div>
		</div>`;
	$("#next-clock").html(result);
}

// Daily rotating message: quotes/flirty/motivational/beauty
function showDailyMessage(){
	var quotes = [
		"With you, ordinary moments feel like magic.",
		"Your smile is my favorite sunrise.",
		"In your eyes, I find my home.",
		"You’re a poem I want to read forever.",
		"Your kindness paints the world brighter.",
	];
	var flirty = [
		"I must be a snowflake, because I’ve fallen for you again today.",
		"Careful—your charm is showing. And it’s working.",
		"Is it warm in here, or did you just walk in?",
	];
	var motivate = [
		"Keep going—your light changes lives, especially mine.",
		"One step, one smile—today belongs to you.",
		"You’re stronger than any storm—shine on.",
	];
	var beauty = [
		"Beautiful isn’t a look—it’s the way your heart glows.",
		"Even stardust envies your sparkle.",
		"You’re art, and my heart is the gallery.",
	];

	var pools = [quotes, flirty, motivate, beauty];
	// Use day-of-year to rotate, but randomize category for serendipity
	var today = new Date();
	var start = new Date(today.getFullYear(), 0, 0);
	var diff = (today - start);
	var oneDay = 1000 * 60 * 60 * 24;
	var dayOfYear = Math.floor(diff / oneDay);
	var category = pools[(dayOfYear + today.getDay()) % pools.length];
	var message = category[dayOfYear % category.length];
	$("#daily-message").text(message);
}
