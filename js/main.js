//First get the API key from file
//this is code from the internet and I have no idea what is going on until...
function getApiKey() {
  return fetch("http://localhost/weather-pro/js/openWeatherApiKey.json")
   .then(response => response.json())
   .then(data => data.key);
}
getApiKey().then(apiKey => {
  // you can also assign it to a global variable
  window.apiKey = apiKey;
}); 
//...there

//Now check the weather once initially, after selecting city..
//button.addEventListener('click', function(){

if(!localStorage.getItem("lastSearchType")){
  openSearch();
  localStorage.setItem("autoloc", "true");
}
else{
  if(localStorage.getItem("lastSearchType") == "cityname"){
    inputValue = localStorage.getItem("lastSearch");
    checkwthr(0, 0);
    setTimeout(() => {
      getForecastPrintSmallTable();
    }, 500);  
  }
  else if(localStorage.getItem("lastSearchType") == "location" && localStorage.getItem("autoloc") == "true"){
    searchCityByCurrentLocation();
  }
  else{
    checkwthr(localStorage.getItem("lastCoordsLat"), localStorage.getItem("lastCoordsLon"));
      setTimeout(() => {
        getForecastPrintSmallTable();
      }, 500);
  }
}

function searchCity(){
  var field = document.getElementById('searchField').value;
  inputValue = field;
  checkwthr(0, 0);
  setTimeout(() => {
    getForecastPrintSmallTable();
  }, 500);
  localStorage.setItem("lastSearch", field);
  localStorage.setItem("lastSearchType", "cityname");
  closeSearch();
}

function searchCityByCurrentLocation(){
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position, locationError, locOptions) => {
      checkwthr(position.coords.latitude, position.coords.longitude);
      setTimeout(() => {
        getForecastPrintSmallTable();
      }, 500);
      localStorage.setItem("lastCoordsLat", position.coords.latitude);
      localStorage.setItem("lastCoordsLon", position.coords.longitude);
      localStorage.setItem("lastSearchType", "location");
      localStorage.setItem("lastSearch", "?");
      closeSearch();
    });
  } else {
    /* geolocation IS NOT available */
    document.getElementById("gpserrorlabel").style.display = "block";
  }
}

const locOptions = {
  enableHighAccuracy: true,
  maximumAge: 0,
  timeout: 20000,
};

function locationError(err){
  document.getElementById("gpserrorlabel").style.display = "block";
}

function saveSettings(){
  if(document.getElementById("autoloccheck").checked){
    localStorage.setItem("autoloc", "true");
  }
  else{
    localStorage.setItem("autoloc", "false");
  }
  closeSettings();
}


//Then check it every 30 cumulative seconds the user is looking at the page
//TO-DO