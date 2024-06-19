# A PWA weather app (work-in-progress)
## Introduction
<table>
<tr>
  <td>
    This project's goal is to create a functioning no-ads, no-tracking PWA for weather. Personally, as an iPhone user I was surprised there was no good android weather app (from my small experience with someone else's phone).
    That's why I have decided to make a cool weather app, working on both desktop and mobile. 
    The app is set to be a PWA (Progressive Web App), which will make it possible to be added directly to your homescreen, and function as a native app. 
  </td>
  <td>
    <img src="https://github.com/Qubi-B/weather-app-one/blob/NewUI/png/screenshot.jpg?raw=true">
  </td>
</tr>
</table>

> [!NOTE]
> This is _**still a work in progress**_. The software is not usable yet.

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
