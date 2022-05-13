var APPID ="9a2defd6e054849b4c40a2566a44d217";
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;

function updateByZip(zip){
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
        "zip=" + zip +
        "&APPID=" + APPID;
    sendRequest(url);
}

function updateByGeo (lat, lon){
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
        "lat="+ lat +
        "lon="+ lon +
    sendRequest(url)
}

function sendRequest(url){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function (){
        if (xmlhttp.readystatechange == 4 && xmlhttp.status == 200){
            var data =JSON.parse(xmlhttp.responseText);
            var weather = {};
            weather.icon = data.weather[0].id;
            weather.humidity = data.main.humidity;
            weather.wind = data.wind.speed;
            weather.direction = degreesToDirection(data.wind.deg);
            weather.loc = data.name;
            weather.temp = K2C(data.main.temp);
            update(weather);
        }
    };
    xmlhttp.open("GET", url, true)
    xmlhttp.send();
}

function K2C (k){
    return Math.round(k - 273.15);
}

function K2F(k){
    return Math.round(k*(9/5)-459.67);
}

function degreesToDirection (degrees){
    var range = 360/16;
    var low = 360 - range/2;
    var hi = (low+range) % 360;
    var angles = ["N", "NNE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W",  "WNW", "NW", "NNW"]
    for( i in angles){

        if(degrees >= low && < high)
            retuen angles[i]
        low = (low + range) % 360;
        high = (high + range) % 360;
    }
    return "n"
}

function update(weather){
    temp.innerHTML = weather.temp;
    loc.innerHTML = weather.loc;
    icon.src = "weathericons/icons/PNG/"+weather.icon+".png";
    humidity.innerHTML = weather.humidity;
    wind.innerHTML = weather.wind;
    direction.innerHTML = weather.direction;
}

function showPosition (position){
    updateByGeo(position.coords.latitude, position.coords.longitude);
}

window.onload = function (){
    temp = document.getElementById("temperature");
    loc = document.getElementById("location");
    icon = document.getElementById("icon");
    humidity = document.getElementById("humidity");
    wind = document.getElementById("wind");
    direction = document.getElementById("direction");

    if(navigator.geolocation){
        navigetor.geolocation.getCurrentPosition(showPosition)
    } else {
        var zip = window.prompt("could not discover your location. What is your zip code?");
        updateByZip(zip);        
    }
}
