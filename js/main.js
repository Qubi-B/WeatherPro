//First get the API key from file
//this is code from the internet and I have no idea what is going on until...
function getApiKey() {
  return fetch("http://localhost/js/openWeatherApiKey.json")
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
checkwthr();
//});

setTimeout(() => {
    getForecast()
}, 500);

//Then check it every 30 cumulative seconds the user is looking at the page
//TO-DO