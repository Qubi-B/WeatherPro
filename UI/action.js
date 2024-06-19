var darkModeEngaged = "true";
var buttonIcon = document.getElementById("dmb");

function refresh(){
    location.reload();
}

function switchModes(){
    if(darkModeEngaged == "true"){
        document.body.style.backgroundColor = "rgb(224, 233, 235)";
        document.getElementById("settings-box").style.backgroundColor = "rgb(224, 233, 235)";
        document.body.style.color = "black";
        buttonIcon.innerHTML = "dark_mode";
        darkModeEngaged = "false";
    }
    else{
        document.body.style.backgroundColor = "black";
        document.getElementById("settings-box").style.backgroundColor = "black";
        document.body.style.color = "white";
        buttonIcon.innerHTML = "light_mode";
        darkModeEngaged = "true";
    }
}

function openSettings(){
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
    document.getElementById("search-visibility").style.display = "block";
    //document.getElementById("settings-visibility").style.animation = ".5s ease-in 1 normal both running blurin;";
}

function closeSearch(){
    document.getElementById("search-visibility").style.display = "none";
    
}