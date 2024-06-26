var darkModeEngaged = "true";
var buttonIcon = document.getElementById("dmb");

//auto dark/light mode and mode memory

if (localStorage.getItem("setDarkMode") == "auto" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // dark mode
    setDarkMode();
}
else if (localStorage.getItem("setDarkMode") == "auto" && window.matchMedia && !window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setLightMode();
}
else if (localStorage.getItem("setDarkMode") == "dark"){
    setDarkMode();
}
else if (localStorage.getItem("setDarkMode") == "light"){
    setLightMode();
}


function refresh(){
    location.reload();
}

function switchModes(){
    if(darkModeEngaged == "true"){
        setLightMode();
        localStorage.setItem("setDarkMode", "light");
    }
    else{
        setDarkMode();
        localStorage.setItem("setDarkMode", "dark");
    }
}

function setDarkMode(){
    document.body.style.backgroundColor = "black";
    document.getElementById("settings-box").style.backgroundColor = "black";
    document.getElementById("search-box").style.backgroundColor = "black";
    document.body.style.color = "white";
    buttonIcon.innerHTML = "light_mode";
    darkModeEngaged = "true";
}

function setLightMode(){
    document.body.style.backgroundColor = "#f8f8f8";
    document.getElementById("settings-box").style.backgroundColor = "#f8f8f8";
    document.getElementById("search-box").style.backgroundColor = "#f8f8f8";
    document.body.style.color = "black";
    buttonIcon.innerHTML = "dark_mode";
    darkModeEngaged = "false";
}

function openSettings(){
    document.getElementById("autoloccheck").checked = localStorage.getItem("autoloc");
    if (localStorage.getItem("setDarkMode") == "auto"){
        document.getElementById("automodecheck").checked = true;
    }
    else{
        document.getElementById("automodecheck").checked = false;
    }
    document.getElementById("settings-visibility").style.display = "block";
    //document.getElementById("settings-visibility").style.animation = ".5s ease-in 1 normal both running blurin;";
}

function closeSettings(){
    document.getElementById("settings-visibility").style.display = "none";
    
}

function openSearch(){
    if(!localStorage.getItem("lastSearch")){
       document.getElementById('firsttimelabel').style.display = "block";
    }
    else{
        document.getElementById('firsttimelabel').style.display = "none";
    }
    if(localStorage.getItem("isCustomKeyPresent") == "false"){
        document.getElementById('api-warning').style.display = "block";
    }
    else{
        document.getElementById('api-warning').style.display = "none";
    }
    document.getElementById("search-visibility").style.display = "block";
    //document.getElementById("settings-visibility").style.animation = ".5s ease-in 1 normal both running blurin;";
}

function closeSearch(){
    document.getElementById("search-visibility").style.display = "none";
    document.getElementById("gpserrorlabel").style.display = "none";
}