# The new PWA weather app
## Introduction
This project's goal is to create a functioning no-ads, no-tracking PWA for weather. This is a new version of [weather-app-one](https://github.com/Qubi-B/weather-app-one), but it has a completely new UI which I made to be responsive, mobile-first.
That's why I have decided to make a cool weather app, working on both desktop and mobile. 
The app is set to be a PWA (Progressive Web App), which will make it possible to be added directly to your homescreen, and function as a native app. 

> [!NOTE]
> This is _**still a work in progress**_.

## What will I learn?
Better my web development skills, making responsive apps, using APIs, creating PWAs.

## How to access?
Currently, there is no Github Pages service running. But this will be available once the first version becomes functional.
You can always download the files and run the website locally, using Apache-based server, e.g. XAMPP. However, you will need to use your own Openweather API key.

> [!WARNING]
> _The website **must** be run using a webserver, and not by opening index.html in the browser. Due to security reasons it won't work standalone._

### How to input API key?
Get your API key from [Openweather](https://openweathermap.org/). 
After cloning the repo, create a file named "openWeatherApiKey.json" in the "/js" directory.
Its contents should look like this:
```json
{
  "key":"insert your key here"
}
```
The script will fetch this code and use it to request weather data. If you open the server to the internet, please ensure this file is not accessible remotely.
