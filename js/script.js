//init all basic variables needed
var inputValue = "Warsaw"; //document.querySelector('.inputValue');
var lang   = navigator.language || navigator.userLanguage;

var cityname   = document.querySelector('.cityname'); //city name
var desc   = document.querySelector('.desc'); //weather description
var temp   = document.querySelector('.temp'); //temperature
var humi   = document.querySelector('.humi'); //humidity
var pres   = document.querySelector('.pres'); //pressure
var wspd   = document.querySelector('.wspd'); //wind speed
var wang   = document.querySelector('.wang'); //wind angle
var wgst   = document.querySelector('.wgst'); //wind gust
var clds   = document.querySelector('.clds'); //clouds density (%)

var aqi    = document.querySelector('.aqi'); //air quality
var pm10   = document.querySelector('.pm10'); //pm10
var pm25   = document.querySelector('.pm25'); //pm25

var latCls = document.querySelector('.lat'); //air quality
var lonCls = document.querySelector('.lon'); //air quality

var wangFloat = 0;
var wangReada = "";

//forecast
var forecTable = document.querySelector('.forecast-generate');
var forecTableStagedContent = "";

var long = 0;
var lati = 0;

var latitude  = 0;
var longitude = 0;

var apiKey = "";

lang = lang.substring(0, 2);
//console.log("lang: " + lang);

function checkwthr(latitudeInput, longitudeInput){
  //check if we got latitude or longitude input other than zero
  var link = "";
  
  //CURRENT WEATHER
  //oh my god this shit works
  getApiKey()
  .then(function(){
    if(latitudeInput != 0 && longitudeInput != 0){
      //check by coords
      link = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitudeInput + '&lon=' + longitudeInput + '&units=metric&lang=' + lang + '&appid=' + apiKey;
    }
    else{
      //check by query
      link = 'http://api.openweathermap.org/data/2.5/weather?q=' + /*inputValue.value*/ inputValue + '&units=metric&lang=' + lang + '&appid=' + apiKey;
    }
  })
    .then(apiKey => fetch(link))
    .then(response => response.json())
    .then(data => {
      var nameVal = "&#127757;&nbsp;" + data['name'];
      var tempVal = data['main']['temp'];
      var descVal = data['weather'][0]['description'];
      var humiVal = data['main']['humidity'];
      var presVal = data['main']['pressure'];
      var wspdVal = data['wind']['speed'];
      var wangVal = data['wind']['deg'];
      var wgstVal = data['wind']['gust'];
      var cldsVal = data['clouds']['all'];
      
      long = data['coord']['lon'];
      lati = data['coord']['lat'];

      document.getElementById('curr_icon').src = "newIcons/" + data['weather'][0]['icon'] + ".png";

      wangFloat = parseFloat(wangVal);
      if(wangFloat > 337.5 || wangFloat < 22.5 ){wangReada == "N";}
      if(wangFloat >= 22.5 && wangFloat <= 67.5 ){wangReada == "NE";}
      if(wangFloat > 67.5 && wangFloat < 112.5 ){wangReada == "E";}
      if(wangFloat >= 112.5 && wangFloat <= 157.5 ){wangReada == "SE";}
      if(wangFloat > 157.5 && wangFloat < 202.5 ){wangReada == "S";}
      if(wangFloat >= 202.5 && wangFloat <= 247.5 ){wangReada == "SW";}
      if(wangFloat > 247.5 && wangFloat < 292.5 ){wangReada == "W";}
      if(wangFloat >= 292.5 && wangFloat <= 337.5 ){wangReada == "NW";}
      else{wangReada == ":(";}


      
      //console.log(wgstVal);

      cityname.innerHTML = nameVal;
      desc.innerHTML = descVal;
      temp.innerHTML = Math.round(tempVal*1) + " °C";
      humi.innerHTML = Math.round(humiVal) +    " %";
      pres.innerHTML = Math.round(presVal) +  " hPa";
      wspd.innerHTML = wspdVal +             " m/s" + wangReada;
      wgst.innerHTML = wgstVal +             " m/s";
      //wang.innerHTML = wangRead;

      //latCls.innerHTML = lati;
      //lonCls.innerHTML = long;
    })

    .then(response => {0})

    //CURRENT AIR QUALITY
    //OH MY GOD THIS IS WORKING
    getApiKey().then(apiKey => fetch('http://api.openweathermap.org/data/2.5/air_pollution?lat=' + lati + '&lon=' + long + '&units=metric&appid=' + apiKey))
      .then(response => response.json())
      .then(data => {
        var aqiVal = data['list'][0]['main']['aqi'];
        var pm25Val = data['list'][0]['components']['pm2_5'];
        var pm10Val = data['list'][0]['components']['pm10'];


        if(aqiVal == 1){aqiRead = "Good"; aqiColor = "greenyellow";}
        if(aqiVal == 2){aqiRead = "Mid"; aqiColor = "green";}
        if(aqiVal == 3){aqiRead = "Moderate"; aqiColor = "yellow";}
        if(aqiVal == 4){aqiRead = "Bad"; aqiColor = "orange";}
        if(aqiVal == 5){aqiRead = "Very Bad"; aqiColor = "red";}


        aqi.innerHTML = aqiRead;
        aqi.parentElement.style.borderColor = aqiColor;
        //pm10.innerHTML = pm10Val;
        //pm25.innerHTML = pm25Val;
      })

      //.catch(err => alert('"' + inputValue.value + '" is not a valid city name'))

      .then(response => {0})
};

function getForecastPrintSmallTable(){
  forecTableStagedContent = "";
  forecTable.innerHTML = '<img src="newIcons/load.png" alt="" class="loading_icon" /><br>';

  getApiKey().then(apiKey => fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + lati + '&lon=' + long + '&units=metric&appid=' + apiKey))
      .then(response => response.json())
      .then(data => {
        //generate the table
        forecTableStagedContent += "<table>";
        //forecTableStagedContent += "<tr>";
        //forecTableStagedContent += "<td class='table-header' colspan='3'><span class='material-symbols-outlined'>calendar_month</span>&nbsp3-Hour/5-day Forecast</td>";
        //forecTableStagedContent += "</tr>";
        for(i = 0; i < 8; i++){
          //generate the table row
          forecTableStagedContent += "<tr>";
          forecTableStagedContent += "<td style='text-align: center'><p>" + (data['list'][i]['dt_txt']).slice(8, 16) + "</p></td>";
          forecTableStagedContent += "<td style='text-align: right'><img src='newIcons/" + data['list'][i]['weather'][0]['icon'] + ".png' alt=''></td>";
          forecTableStagedContent += "<td><p>" + Math.round(parseFloat(data['list'][i]['main']['temp_min']))  + " - " + "";
          forecTableStagedContent += "" + Math.round(parseFloat(data['list'][i]['main']['temp_max']))  + "°C" + "</p></td>";
          forecTableStagedContent += "</tr>";
        }
        forecTableStagedContent += "<tr>";
        forecTableStagedContent += "<td class='align-center-td' colspan='4'><span class='button' onclick='getForecastPrintFullTable()'>Show more ↓</span></td>";
        forecTableStagedContent += "</tr>";
        forecTableStagedContent += "</table>";
        forecTable.innerHTML = forecTableStagedContent;
      })
}

function getForecastPrintFullTable(){
  forecTableStagedContent = "";
  forecTable.innerHTML = '<img src="newIcons/load.png" alt="" class="loading_icon" /><br>';
  
  getApiKey().then(apiKey => fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + lati + '&lon=' + long + '&units=metric&appid=' + apiKey))
      .then(response => response.json())
      .then(data => {
        //generate the table
        forecTableStagedContent += "<table>";
        //forecTableStagedContent += "<tr>";
        //forecTableStagedContent += "<td class='table-header' colspan='3'><span class='material-symbols-outlined'>calendar_month</span>&nbsp3-Hour/5-day Forecast</td>";
        //forecTableStagedContent += "</tr>";
        for(i = 0; i < 40; i++){
          //generate the table row
          forecTableStagedContent += "<tr>";
          forecTableStagedContent += "<td style='text-align: center'><p>" + (data['list'][i]['dt_txt']).slice(8, 16) + "</p></td>";
          forecTableStagedContent += "<td style='text-align: right'><img src='newIcons/" + data['list'][i]['weather'][0]['icon'] + ".png' alt=''></td>";
          forecTableStagedContent += "<td><p>" + Math.round(parseFloat(data['list'][i]['main']['temp_min']))  + " - " + "";
          forecTableStagedContent += "" + Math.round(parseFloat(data['list'][i]['main']['temp_max']))  + "°C" + "</p></td>";
          forecTableStagedContent += "</tr>";
        }
        forecTableStagedContent += "<tr>";
        forecTableStagedContent += "<td class='align-center-td' colspan='4'><span class='button' onclick='getForecastPrintSmallTable()'>Show less ↑</span></td>";
        forecTableStagedContent += "</tr>";
        forecTableStagedContent.innerHTML += "</table>";
        forecTable.innerHTML = forecTableStagedContent;
      })
}