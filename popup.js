var bgPage = chrome.extension.getBackgroundPage();
var trackContainer = document.querySelector(".track-container");
var playButton = document.querySelector(".track-controls #play");
var nextButton = document.querySelector(".track-controls #step-forward");
var prevButton = document.querySelector(".track-controls #step-backward");
var tracklistButton = document.querySelector(".tracklist-btn");
var timeControls = document.querySelector(".time-controls");
var progressWrapper = document.querySelector(".progressWrapper");
var progressBar = document.querySelector(".progressBar");
var volumeControls = document.querySelector(".volume-controls");
var progressIndicator = document.querySelector(".progressIndicator");
var volumeWrapper = document.querySelector(".volumeWrapper");
var volumeBar = document.querySelector(".volumeBar");
var volumeIndicator = document.querySelector(".volumeIndicator");
if(bgPage.SC.currentTrack) var fractionPlayed = fractionPlayed = (bgPage.SC.currentTrack.currentTime() / bgPage.SC.currentTrack.getDuration());
var trackTitle = document.querySelector(".title a");
var artist = document.querySelector(".user a");
var artwork = document.querySelector(".artwork");
var currentTime = document.querySelector(".current-time p");
var totalTime = document.querySelector(".total-time p");
var timestampContainer = document.querySelector(".timestamp-container");
var playlistContainer = document.querySelector(".playlist-container");


progressBarLoop();
setTrackInfo();
setTracklist();
setVolumeBar();
autofillSearch();
if(!bgPage.SC.currentTrack){
    trackContainer.classList.add("hidden");
}
setPlaylist();


// Parses URL and sends to background for GET request handling
var inputURL = document.querySelector('#URL');
inputURL.addEventListener('keypress', function(e){
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
        if(inputURL.value.length > 0){
            let message = inputURL.value;
            inputURL.value = "";
            chrome.runtime.sendMessage(message, function(response){
                if(response == ""){
                    // alert("Error in URL");
                    // return;
                } else {
                    // Background script needs time to change variables
                    setTimeout(function(){
                        trackContainer.classList.remove("hidden");
                        setTrackInfo();
                        setTracklist()
                        setPlaylist();
                        progressBarLoop();
                    }, 1750);
                }
            });
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {

    // Handles play button click
    playButton.addEventListener("click", play);

    // Functions with argument () need to be put in callback, otherwise will be called every time
    nextButton.addEventListener("click", function(){
        nextSong(bgPage.relatedLL);
    });
    prevButton.addEventListener("click", function(){
        prevSong(bgPage.relatedLL);
    });

    volumeControls.addEventListener("click", function(){
        toggleMute();
    });

    tracklistButton.addEventListener("click", toggleTracklist);

    volumeControls.onmouseover = function(){
        volumeWrapper.style.visibility = ("visible");
        volumeWrapper.style.opacity = ("1");
    }
    volumeControls.onmouseout = function(){
        volumeWrapper.style.visibility = ("hidden");
        volumeWrapper.style.opacity = ("0");
    }
    volumeWrapper.onmouseover = function(){
        volumeWrapper.style.visibility = ("visible");
        volumeWrapper.style.opacity = ("1");
    }
    volumeWrapper.onmouseout = function(){
        volumeWrapper.style.visibility = ("hidden");
        volumeWrapper.style.opacity = ("0");
    }

    // Handles login button click --REMOVED for now: needs redirect_uri
    // document.querySelector("#login").addEventListener("click", sclogin);

    // Handles left and right arrow keys
    window.addEventListener("keydown", function(e){
        var key = e.which || e.keyCode;
        if (key === 37) {          // left arrow
            decrementTime();
        } else if (key === 39){    // right arrow
            incrementTime();
        } else if (key == 38 && (bgPage.SC.currentTrack.getVolume() < 1)){      // up arrow
            incrementVolume();
            setVolumeBar();
        } else if (key === 40){     // down arrow
            decrementVolume();
            setVolumeBar();
        } else if (key === 32 || key === 179){     // space bar and media play
            play();
        } else if (key >= 48 && key <= 57){     // number keys
            bgPage.SC.currentTrack.seek(bgPage.SC.currentTrack.getDuration() * ((key - 48)/10));
        }
        // else if (key == 177){      // media back
        //     prevSong(bgPage.relatedLL);
        // } else if (key = 176){       // media back
        //     nextSong(bgPage.relatedLL);
        // }
    });
});


function play(){
    let message = "play"
    chrome.runtime.sendMessage(message, function(response){
    });
}

function sclogin(){
    let message = "login"
    chrome.runtime.sendMessage(message, function(response){
    });
}

function toggleMute(){
    console.log(bgPage.volume);
    if(bgPage.SC.currentTrack.getVolume() > 0){
        bgPage.volume = bgPage.SC.currentTrack.getVolume();
        bgPage.SC.currentTrack.setVolume(0);
    } else {
        bgPage.SC.currentTrack.setVolume(bgPage.volume);
    }
    setVolumeBar();
}

function toggleTracklist(){
    timestampContainer.classList.toggle("hidden");
    bgPage.showTracklist = !(bgPage.showTracklist);
}

function autofillSearch(){
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function(tabs) {
        var tab = tabs[0];
        if(matchWildCard(tab.url, "https://soundcloud.com/*/*") && (!matchWildCard(tab.url, "https://soundcloud.com/you/*")) && (!matchWildCard(tab.url, "https://soundcloud.com/*/tracks")) && (!matchWildCard(tab.url, "https://soundcloud.com/*/albums")) && (!matchWildCard(tab.url, "https://soundcloud.com/*/sets")) && (!matchWildCard(tab.url, "https://soundcloud.com/*/reposts"))){
            document.querySelector("#URL").setAttribute("value", tab.url);
        }
    });
}

//Controller set scrubber and button status -- MOVE INTO: set track info later, dont need the interval func
//Kind of janky if statements --some repetition to clean up
setInterval(function(){
    if((playButton.className == ("fas fa-play")) && (bgPage.track.isPlaying)){
        playButton.className = "fas fa-pause";
    } else if((playButton.className == ("fas fa-pause")) && (!bgPage.track.isPlaying)){
        playButton.className = "fas fa-play";
    }
}, 100);

function progressBarLoop(){
    if(bgPage.SC.currentTrack){
        progressWrapper.addEventListener("click", seekProgressBar);
        setInterval(function(){
            fractionPlayed = bgPage.SC.currentTrack.currentTime() / bgPage.SC.currentTrack.getDuration();
            progressBar.style.width = ((fractionPlayed*100).toString() + "%");
            progressIndicator.style.left = ((fractionPlayed*100).toString() + "%");
            currentTime.innerHTML = millisToHoursAndMinutesAndSeconds(bgPage.SC.currentTrack.currentTime());
            totalTime.innerHTML = millisToHoursAndMinutesAndSeconds(bgPage.SC.currentTrack.getDuration());
            if(bgPage.SC.currentTrack.currentTime() == bgPage.SC.currentTrack.getDuration() && bgPage.SC.currentTrack.getDuration() > 0){
                bgPage.SC.currentTrack.seek(0);
                bgPage.SC.currentTrack.play();

                // bgPage.SC.currentTrack.seek(0); // prevent from looping again
                // bgPage.SC.currentTrack.pause();
                // nextSong(bgPage.relatedLL);
            }
        }, 100);
    }
}

function setVolumeBar(){
    volumeWrapper.addEventListener("click", seekVolumeBar);
    if(bgPage.SC.currentTrack){
        volumeBar.style.height = (((bgPage.SC.currentTrack.getVolume()*100) * 0.8).toString() + "%");
        volumeIndicator.style.bottom = ((-2 + bgPage.SC.currentTrack.getVolume()*70).toString() + "px");     //This shouldn't work but it does.. should be top height - vol*bottom height
        if(bgPage.SC.currentTrack.getVolume() > 0.66){
            document.querySelector(".volume-controls i").className = "fas fa-volume-up";
        } else if(bgPage.SC.currentTrack.getVolume() > 0.33 && bgPage.SC.currentTrack.getVolume() <= 0.66){
            document.querySelector(".volume-controls i").className = "fas fa-volume-down";
        } else if(bgPage.SC.currentTrack.getVolume() > 0 && bgPage.SC.currentTrack.getVolume() <= 0.33){
            document.querySelector(".volume-controls i").className = "fas fa-volume-off";
        } else{
            document.querySelector(".volume-controls i").className = "fas fa-volume-mute";
        }
    }
}

function seekVolumeBar(e){
    if(bgPage.SC.currentTrack){
        var offset = getVolumeOffset(e);
        var yOffsetFrac = ((offset.height-offset.y) / offset.height);
        bgPage.SC.currentTrack.setVolume(yOffsetFrac);
        bgPage.volume = yOffsetFrac;
        setVolumeBar();
    }
}

function incrementVolume(){
    (bgPage.SC.currentTrack.getVolume() <= 0.95) ? (bgPage.SC.currentTrack.setVolume(bgPage.SC.currentTrack.getVolume() + 0.05)) : bgPage.SC.currentTrack.setVolume(1);
    bgPage.volume = bgPage.SC.currentTrack.getVolume();
}

function decrementVolume(){
    (bgPage.SC.currentTrack.getVolume() >= 0.05) ? (bgPage.SC.currentTrack.setVolume(bgPage.SC.currentTrack.getVolume() - 0.05)) : bgPage.SC.currentTrack.setVolume(0);
    bgPage.volume = bgPage.SC.currentTrack.getVolume();
}

function setTrackInfo(){
    if(bgPage.SC.currentTrack){
        trackTitle.innerHTML = bgPage.track.title;
        trackTitle.setAttribute("href", bgPage.track.trackurl);
        artist.innerHTML = bgPage.track.username;
        artist.setAttribute("href", bgPage.track.userurl);
        artwork.style.backgroundImage = "url(" + bgPage.track.artwork + ")";
        document.querySelector(".artwork-url").setAttribute("href", bgPage.track.trackurl);
        totalTime.innerHTML = millisToHoursAndMinutesAndSeconds(bgPage.SC.currentTrack.getDuration());
        currentTime.innerHTML = millisToHoursAndMinutesAndSeconds(bgPage.SC.currentTrack.currentTime());
    }
}

function setTracklist(){
    timestampContainer.innerHTML = "";
    tracklistButton.classList.add("hidden");
    if(bgPage.tracklist.length > 0){
        for(var i = 0; i < bgPage.tracklist.length; i++){
            var p = document.createElement("p");
            p.classList.add("timestamp");
            var node = document.createTextNode(bgPage.tracklist[i]);
            p.appendChild(node);
            timestampContainer.appendChild(p);
        }
        if(!bgPage.showTracklist){
            timestampContainer.classList.add("hidden");
        } else {
            // Handles timestamp click
            document.querySelectorAll(".timestamp").forEach(function(ts) {
                ts.addEventListener("click", seekTimestamp);
            });
            timestampContainer.classList.remove("hidden");
        }
        tracklistButton.classList.remove("hidden");
    }
}

function setPlaylist(){
    playlistContainer.innerHTML = "";
    // playlistButton.classList.add("hidden");
    for(var i = 0; i < bgPage.relatedPlaylist.length; i++){
        var p = document.createElement("p");
        p.classList.add("playlist-track");
        var node = document.createTextNode(bgPage.relatedPlaylist[i].title);
        p.appendChild(node);
        playlistContainer.appendChild(p);
    }
    // if(!bgPage.showPlaylist){
    //     playlistContainer.classList.add("hidden");
    // } else {
    //     // Handles timestamp click
    //     document.querySelectorAll(".playlist-track").forEach(function(ts) {
    //         ts.addEventListener("click", function(){
    //             // sendMessage
    //         });
    //     });
    //     playlistContainer.classList.remove("hidden");
    // }
}

function seekTimestamp(){
    var timeMinSec = this.innerHTML.split(":");
    var timeMilli = 0;
    var toMilliSec = 1000
    for(var i = timeMinSec.length - 1; i >= 0; i--){
        timeMilli += parseInt(timeMinSec[i])*toMilliSec;
        toMilliSec *= 60;
    }
    bgPage.SC.currentTrack.seek(timeMilli);
    currentTime.innerHTML = millisToHoursAndMinutesAndSeconds(bgPage.SC.currentTrack.currentTime());
}

function seekProgressBar(e){
    if(bgPage.SC.currentTrack){
        var offset = getTimelineOffset(e);
        var xOffsetFrac = (offset.x / offset.width);
        bgPage.SC.currentTrack.seek(bgPage.SC.currentTrack.getDuration() * xOffsetFrac);
    }
}

function incrementTime(){
    (bgPage.SC.currentTrack.currentTime() <= (bgPage.SC.currentTrack.getDuration() - 5 * 1000) ? bgPage.SC.currentTrack.seek(bgPage.SC.currentTrack.currentTime() + (5 * 1000)) : bgPage.SC.currentTrack.seek(bgPage.SC.currentTrack.getDuration()));
}

function decrementTime(){
    (bgPage.SC.currentTrack.currentTime() >= (5 * 1000) ? bgPage.SC.currentTrack.seek(bgPage.SC.currentTrack.currentTime() - (5 * 1000)) : bgPage.SC.currentTrack.seek(0));
}

function millisToHoursAndMinutesAndSeconds(millis) {
    var hours = Math.floor(millis / (1000 * 60 * 60)).toFixed(0);
    var minutes = Math.floor((millis / (1000 * 60)) % 60).toFixed(0);
    var seconds = ((millis / 1000) % 60).toFixed(0);
    return ((hours > 0 ? (hours + ":") : '') + ((minutes < 10 && hours > 0) ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds);
}

//Change later to pass in rect object as second arg
function getTimelineOffset(e) {
    var rect = progressWrapper.getBoundingClientRect();   //e.target doesn't work -sometimes targetted child div
    var width = rect.width;
    var height = rect.height;
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    return {
        x,
        y,
        width,
        height
    }
}
function getVolumeOffset(e) {
    var rect = volumeWrapper.getBoundingClientRect();   //e.target doesn't work -sometimes targetted child div
    var width = rect.width;
    var height = rect.height;
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    return {
        x,
        y,
        width,
        height
    }
}

function matchWildCard(str, rule) {
  return new RegExp("^" + rule.split("*").join(".*") + "$").test(str);
}

function nextSong(playlist){
    var currentTrackNode = playlist.head;
    while(currentTrackNode != null){
        if(bgPage.track.title == currentTrackNode.title){
            let message = currentTrackNode.next.trackurl;
            chrome.runtime.sendMessage(message, function(response){
                // Background script needs time to change variables
                setTimeout(function(){
                    setTrackInfo();
                    setTracklist()
                    progressBarLoop();
                }, 1500);
            });
            break;
        } else {
            currentTrackNode = currentTrackNode.next;
        }
    }
}

function prevSong(playlist){
    var currentTrackNode = playlist.head;
    while(currentTrackNode != null){
        if(bgPage.track.title == currentTrackNode.title){
            let message = currentTrackNode.prev.trackurl;
            chrome.runtime.sendMessage(message, function(response){
                // Background script needs time to change variables
                setTimeout(function(){
                    setTrackInfo();
                    setTracklist()
                    progressBarLoop();
                }, 1500);
            });
            break;
        } else {
            currentTrackNode = currentTrackNode.next;
        }
    }
}
