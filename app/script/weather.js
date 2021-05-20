  setTimeout(function(){
	$('#loader').slideUp();
	// TODO  out commet before pushz
	// if($('#weatherIcon').attr('src')==""){
	// 	window.location = 'error.html';
	// }  
  },1000)
  function weatherBalloon(mainFunction) {
  	var key = '2dd1c1634e2f4c41b1b71a9bbdf0b4f6';
  	navigator.geolocation.getCurrentPosition(function (position) {
  		var lat = position.coords.latitude;
  		var lon = position.coords.longitude;
  		fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${key}&exclude=hourly&exclude=minutely`)
  			.then(function (resp) {
  				return resp.json()
  			})
  			.then(function (data) {
  				mainFunction(data);
  			});
  	},(res) => {
		var lat = 51.509865;
		var lon =  -0.118092;
		fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${key}&exclude=hourly&exclude=minutely`)
			.then(function (resp) {
				return resp.json()
			})
			.then(function (data) {
				mainFunction(data);
			});
	  })
  }
  weatherBalloon(function (data) {
	  console.log(data)
  	// WEATHER ICON
  	const weatherIconUrl = `image/weatherIcons/${data.current.weather[0].icon}@2x.png`
  	$('#weatherIcon').attr('src', weatherIconUrl);
  	// CELSIUS
  	const celsius = Math.round(data.current.temp);
  	$("#celsius").html(celsius + "<sup>o</sup>C");
  	// TIME
  	function time() {
  		const time = new Date();
  		let min = time.getMinutes();
  		let hour = time.getHours();
  		let sec = time.getSeconds();
  		if (hour < 10) {
  			hour = '0' + hour;
  		}
  		if (min < 10) {
  			min = '0' + min;
  		}
  		if (sec < 10) {
  			sec = '0' + sec;
  		}
  		$('#time p').eq(0).text(hour);
  		$('#time p').eq(1).text(min);
  		$('#time p').eq(2).text(sec);
  	}
  	time();
  	setInterval(time, 1000);
  	// BACKGROUND
  	function background() {
  		const time = new Date().getHours();
  		const background = {
  			day: 'image/day.jpg',
  			sunset: 'image/sunset.jpg',
  			night: 'image/night.jpg',
  		}
  		if (time >= 8 && time <= 18) {
  			$('#background').css({
  				backgroundImage: `url('${background.day}')`
  			});
  		} else if (time >= 20 && time <= 24 || time >= 1 && time <= 5) {
  			$('#background').css({
  				backgroundImage: `url('${background.night}')`
  			});
  		} else {
  			$('#background').css({
  				backgroundImage: `url('${background.sunset}')`
  			});
  		}
  	}
  	background();
  	// DAY
  	let weekday;

  	function day(val = 0) {
  		if (!(val == 0)) {
  			weekday = val
  		} else {
  			weekday = new Date().getDay();
  		}
  		let text;
  		switch (weekday) {
  			case 1:
  				text = "Monday";
  				break;
  			case 2:
  				text = "Tuesday";
  				break;
  			case 3:
  				text = "Wednesday";
  				break;
  			case 4:
  				text = "Thuesday"
  				break;
  			case 5:
  				text = 'Friday';
  				break;
  			case 6:
  				text = 'Saturday';
  				break;
  			case 7:
  				text = 'Sunday';
  		}
  		return {
  			day: weekday,
  			text: text
  		};
  	}
  	$('#day').text(day().text);
  	// COUNTRY
  	let code = data.timezone;
  	$('.country').text(code);
  	// DAILY
	console.log(data)
  	$(".daily h2 img").attr('src', `image/weatherIcons/${data.daily[0].weather[0].icon}@2x.png`);
  	$(".daily h2 span").html(Math.round(data.daily[0].temp.max) + "<sup>o</sup>C / " + Math.round(data.daily[0].temp.min) + "<sup>o</sup>C");
  	$(".morning h4").html(Math.round(data.daily[0].temp.morn) + "<sup>o</sup>C");
  	$(".noon h4").html(Math.round(data.daily[0].temp.day) + "<sup>o</sup>C");
  	$(".night h4").html(Math.round(data.daily[0].temp.night) + "<sup>o</sup>C");

  	// WEEKLY
  	let x = day().day;
  	let temp = 0;
  	$('.week section').each(function () {
  		$(this).children('strong').text(day(x).text);
  		$(this).children('h4').html(Math.round(data.daily[temp].temp.max) + "<sup>o</sup>C / " + Math.round(data.daily[temp].temp.min) + "<sup>o</sup>C");
  		$(this).children('img').attr('src', `image/weatherIcons/${data.daily[temp].weather[0].icon}@2x.png`);
  		++temp;
  		++x;
  		if (x == 8) {
  			x = 1;
  		}
  	})
  });