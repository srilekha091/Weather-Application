var APPID = "2e22758e5dac30df877f69fce4cd3502";
var temp;
var loc;
var humidity;
var wind;
var direction;
var icon;

function update(weather) {
    temp.innerHTML = weather.temp;
    loc.innerHTML = weather.loc;
    humidity.innerHTML = weather.humidity;
    wind.innerHTML = weather.wind;
    direction.innerHTML = weather.direction;
    icon.src = "img/codes/" + weather.code + ".png"
}

window.onload = function () {
    temp = document.getElementById("temperature");
    loc = document.getElementById("location");
    humidity = document.getElementById("humidity");
    wind = document.getElementById("wind");
    direction = document.getElementById("direction");
    icon = document.getElementById("icon");
    update(weather);
}

function updateByZip(zip) {
    var url = "api.openweathermap.org/data/2.5/weather?" +
        "zip=" + zip +
        "&APPID=" + APPID;
    sendRequest(url);
}

function sendRequest(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
            var weather = {};
            weather.code = data.weather[0].id;
            weather.temp = K2F(data.main.temp);
            weather.humidity = data.main.humidity;
            weather.loc = data.name;
            weather.wind = data.wind.speed;
            weather.direction = degreesToDirection(data.wind.deg);
            update(weather);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function degreesToDirection(degrees) {
    var range = 360 / 16;
    var low = 360 - range / 2;
    var high = (low + range) % 360;
    var angles = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    for (i in angles) {
        if (degrees >= low && degrees < high) {
            console.log(angles[i]);
            return angles[i];
            console.log("derp");
        }
        low = (low + range) % 360;
        high = (high + range) % 360;
    }
    return "N";

}

function K2F(k) {
    return Math.round(k * (9 / 5) - 459.67);
}

function K2C(k) {
    return Math.round(k - 273.15);
}