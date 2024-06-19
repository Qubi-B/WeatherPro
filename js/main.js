//First get the API key from file
//this is code from the internet and I have no idea what is going on until...
function getApiKey() {
  return fetch("http://192.168.1.105/weather-pro/js/openWeatherApiKey.json")
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

if(!localStorage.getItem("lastSearch")){
  openSearch();
}
else{
  inputValue = localStorage.getItem("lastSearch");
  checkwthr();
  setTimeout(() => {
    getForecastPrintSmallTable();
  }, 500);  
}





function searchCity(){
  var field = document.getElementById('searchField').value;
  inputValue = field;
  checkwthr();
  setTimeout(() => {
    getForecastPrintSmallTable();
  }, 500);
  localStorage.setItem("lastSearch", field);
  closeSearch();
}





//Then check it every 30 cumulative seconds the user is looking at the page
//TO-DO