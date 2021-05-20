$(document).keydown(function (e) {
    if (e.keyCode == 27) {
        $("#search").slideUp();
    }
});
$('#menu').click(function () {
    $("#search").slideDown();

});
$('.close').click(function () {
    $("#search").slideUp();
});
$('.mainSearch').focusin(function () {
    $(this).keydown(function (code) {
        if (code.keyCode == 13) {
            searchCountry();
        }
    });
})
$('.mainSearch img').click(searchCountry);

function searchCountry() {
    var key = '6928b8fecd369349f022b3db9310ed8e';
    let value = $('.mainSearch input').val();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${key}&units=metric`)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            countryTrue(data)
        })
}

function countryTrue(data) {
    console.log(data)
    if (data.cod == "404") {
        $('#search section').fadeOut();
        $('#search h3').fadeIn();
    } else {
        let time = function (e) {
            let x = new Date(e * 1000)
            return x;
        }
        let temp = Math.round(data.main.temp)
        $('#search h3').fadeOut();
        $('#search section').fadeIn();
        $('#search section h4').text(data.name)
        $('#search section p').html(`${temp}<sup>o</sup>C`)
        $('#search section img').attr('src', `image/weatherIcons/${data.weather[0].icon}@2x.png`);
        // sunrise
        let sunriseH = time(data.sys.sunrise).getHours();
        let sunriseM = time(data.sys.sunrise).getMinutes();
        if (sunriseH < 10) {
            sunriseH = "0" + time(data.sys.sunrise).getHours();
        }
        if (sunriseM < 10) {
            sunriseM = "0" + time(data.sys.sunrise).getMinutes();
        }
        $(".sunrise span").text(`${sunriseH}:${sunriseM}`)
        // sunset
        let sunsetH = time(data.sys.sunset).getHours();
        let sunsetM = time(data.sys.sunset).getMinutes();
        if (sunsetH < 10) {
            sunsetH = "0" + time(data.sys.sunset).getHours();
        }
        if (sunsetM < 10) {
            sunsetM = "0" + time(data.sys.sunset).getMinutes();
        }
        $(".sunset span").text(`${sunsetH}:${sunsetM}`);
        // speed
        $('.speed span').text(Math.round(data.wind.speed)+"Meter/Sec");
    }
}

let left = 0;
let isPos = true;
setInterval(function () {
    if (left >= 15) {
        isPos = false;
    } else if (left <= 0) {
        isPos = true;
    }
    if (isPos == true) {
        let top = Math.floor(Math.random() * 2);
        top = top == 0 ? '-' : '';
        $('#search section img').animate({
            left: (left += 1) + "px",
            top: `${top}1px`
        })
    } else {
        let top = Math.floor(Math.random() * 2);
        top = top == 0 ? '-' : '';
        $('#search section img').animate({
            left: (left -= 1) + "px",
            top: `${top}1px`
        })
    }
}, 1000 / 60);