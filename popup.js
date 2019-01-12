var SC=SC||{};SC.Widget=function(n){function t(r){if(e[r])return e[r].exports;var o=e[r]={exports:{},id:r,loaded:!1};return n[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var e={};return t.m=n,t.c=e,t.p="",t(0)}([function(n,t,e){function r(n){return!!(""===n||n&&n.charCodeAt&&n.substr)}function o(n){return!!(n&&n.constructor&&n.call&&n.apply)}function i(n){return!(!n||1!==n.nodeType||"IFRAME"!==n.nodeName.toUpperCase())}function a(n){var t,e=!1;for(t in b)if(b.hasOwnProperty(t)&&b[t]===n){e=!0;break}return e}function s(n){var t,e,r;for(t=0,e=I.length;t<e&&(r=n(I[t]),r!==!1);t++);}function u(n){var t,e,r,o="";for("//"===n.substr(0,2)&&(n=window.location.protocol+n),r=n.split("/"),t=0,e=r.length;t<e&&t<3;t++)o+=r[t],t<2&&(o+="/");return o}function c(n){return n.contentWindow?n.contentWindow:n.contentDocument&&"parentWindow"in n.contentDocument?n.contentDocument.parentWindow:null}function l(n){var t,e=[];for(t in n)n.hasOwnProperty(t)&&e.push(n[t]);return e}function d(n,t,e){e.callbacks[n]=e.callbacks[n]||[],e.callbacks[n].push(t)}function E(n,t){var e,r=!0;return t.callbacks[n]=[],s(function(t){if(e=t.callbacks[n]||[],e.length)return r=!1,!1}),r}function f(n,t,e){var r,o,i=c(e);return!!i.postMessage&&(r=e.getAttribute("src").split("?")[0],o=JSON.stringify({method:n,value:t}),"//"===r.substr(0,2)&&(r=window.location.protocol+r),r=r.replace(/http:\/\/(w|wt).soundcloud.com/,"https://$1.soundcloud.com"),void i.postMessage(o,r))}function p(n){var t;return s(function(e){if(e.instance===n)return t=e,!1}),t}function h(n){var t;return s(function(e){if(c(e.element)===n)return t=e,!1}),t}function v(n,t){return function(e){var r=o(e),i=p(this),a=!r&&t?e:null,s=r&&!t?e:null;return s&&d(n,s,i),f(n,a,i.element),this}}function S(n,t,e){var r,o,i;for(r=0,o=t.length;r<o;r++)i=t[r],n[i]=v(i,e)}function R(n,t,e){return n+"?url="+t+"&"+g(e)}function g(n){var t,e,r=[];for(t in n)n.hasOwnProperty(t)&&(e=n[t],r.push(t+"="+("start_track"===t?parseInt(e,10):e?"true":"false")));return r.join("&")}function m(n,t,e){var r,o,i=n.callbacks[t]||[];for(r=0,o=i.length;r<o;r++)i[r].apply(n.instance,e);(a(t)||t===L.READY)&&(n.callbacks[t]=[])}function w(n){var t,e,r,o,i;try{e=JSON.parse(n.data)}catch(a){return!1}return t=h(n.source),r=e.method,o=e.value,(!t||A(n.origin)===A(t.domain))&&(t?(r===L.READY&&(t.isReady=!0,m(t,C),E(C,t)),r!==L.PLAY||t.playEventFired||(t.playEventFired=!0),r!==L.PLAY_PROGRESS||t.playEventFired||(t.playEventFired=!0,m(t,L.PLAY,[o])),i=[],void 0!==o&&i.push(o),void m(t,r,i)):(r===L.READY&&T.push(n.source),!1))}function A(n){return n.replace(Y,"")}var _,y,O,D=e(1),b=e(2),P=e(3),L=D.api,N=D.bridge,T=[],I=[],C="__LATE_BINDING__",k="http://wt.soundcloud.test:9200/",Y=/^http(?:s?)/;window.addEventListener?window.addEventListener("message",w,!1):window.attachEvent("onmessage",w),n.exports=O=function(n,t,e){if(r(n)&&(n=document.getElementById(n)),!i(n))throw new Error("SC.Widget function should be given either iframe element or a string specifying id attribute of iframe element.");t&&(e=e||{},n.src=R(k,t,e));var o,a,s=h(c(n));return s&&s.instance?s.instance:(o=T.indexOf(c(n))>-1,a=new _(n),I.push(new y(a,n,o)),a)},O.Events=L,window.SC=window.SC||{},window.SC.Widget=O,y=function(n,t,e){this.instance=n,this.element=t,this.domain=u(t.getAttribute("src")),this.isReady=!!e,this.callbacks={}},_=function(){},_.prototype={constructor:_,load:function(n,t){if(n){t=t||{};var e=this,r=p(this),o=r.element,i=o.src,a=i.substr(0,i.indexOf("?"));r.isReady=!1,r.playEventFired=!1,o.onload=function(){e.bind(L.READY,function(){var n,e=r.callbacks;for(n in e)e.hasOwnProperty(n)&&n!==L.READY&&f(N.ADD_LISTENER,n,r.element);t.callback&&t.callback()})},o.src=R(a,n,t)}},bind:function(n,t){var e=this,r=p(this);return r&&r.element&&(n===L.READY&&r.isReady?setTimeout(t,1):r.isReady?(d(n,t,r),f(N.ADD_LISTENER,n,r.element)):d(C,function(){e.bind(n,t)},r)),this},unbind:function(n){var t,e=p(this);e&&e.element&&(t=E(n,e),n!==L.READY&&t&&f(N.REMOVE_LISTENER,n,e.element))}},S(_.prototype,l(b)),S(_.prototype,l(P),!0)},function(n,t){t.api={LOAD_PROGRESS:"loadProgress",PLAY_PROGRESS:"playProgress",PLAY:"play",PAUSE:"pause",FINISH:"finish",SEEK:"seek",READY:"ready",OPEN_SHARE_PANEL:"sharePanelOpened",CLICK_DOWNLOAD:"downloadClicked",CLICK_BUY:"buyClicked",ERROR:"error"},t.bridge={REMOVE_LISTENER:"removeEventListener",ADD_LISTENER:"addEventListener"}},function(n,t){n.exports={GET_VOLUME:"getVolume",GET_DURATION:"getDuration",GET_POSITION:"getPosition",GET_SOUNDS:"getSounds",GET_CURRENT_SOUND:"getCurrentSound",GET_CURRENT_SOUND_INDEX:"getCurrentSoundIndex",IS_PAUSED:"isPaused"}},function(n,t){n.exports={PLAY:"play",PAUSE:"pause",TOGGLE:"toggle",SEEK_TO:"seekTo",SET_VOLUME:"setVolume",NEXT:"next",PREV:"prev",SKIP:"skip"}}]);


var bgPage = chrome.extension.getBackgroundPage();
var playButton = document.querySelector(".track-controls #play span");
var timeControls = document.querySelector(".time-controls");
var progressBar = document.querySelector(".progressBar");
var progressIndicator = document.querySelector(".progressIndicator");
var fractionPlayed = fractionPlayed = bgPage.track.currentTime / bgPage.track.totalDuration;
var trackTitle = document.querySelector(".title a");
var artist = document.querySelector(".user a");
var artwork = document.querySelector(".artwork");
var currentTime = document.querySelector(".current-time p");
var totalTime = document.querySelector(".total-time p");

progressBarLoop();
setTrackInfo();

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
                        setTrackInfo();
                    }, 750);
                }
            });
        }
    }
});


// Handles play button click
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#play').addEventListener("click", play);
});

function play(){
    let message = "play"
    chrome.runtime.sendMessage(message, function(response){
    });
}

//Controller set scrubber and button status
//Kind of janky if statements --some repetition to clean up
setInterval(function(){
    if((playButton.className == ("glyphicon glyphicon-play")) && (bgPage.isPlaying == true)){
        playButton.className = "glyphicon glyphicon-pause";
    } else if((playButton.className == ("glyphicon glyphicon-pause")) && (bgPage.isPlaying == false)){
        playButton.className = "glyphicon glyphicon-play";
    }
}, 100);

function progressBarLoop(){
    // progressBar.click(function(event){
    //     var difOffset = $(this).offset();
    //     console.log(divOffset);
    // });
    setInterval(function(){
            fractionPlayed = bgPage.track.currentTime / bgPage.track.totalDuration;
            progressBar.style.width = ((fractionPlayed*100).toString() + "%");
            progressIndicator.style.left = ((fractionPlayed*100).toString() + "%");
            currentTime.innerHTML = millisToHoursAndMinutesAndSeconds(bgPage.track.currentTime);
    }, 100);
}

function setTrackInfo(){
    trackTitle.innerHTML = bgPage.track.title;
    trackTitle.setAttribute("href", bgPage.track.trackurl);
    artist.innerHTML = bgPage.track.username;
    artist.setAttribute("href", bgPage.track.userurl);
    artwork.style.backgroundImage = "url(" + bgPage.track.artwork + ")";
    document.querySelector(".artwork-url").setAttribute("href", bgPage.track.trackurl);
    totalTime.innerHTML = millisToHoursAndMinutesAndSeconds(bgPage.track.totalDuration);
    currentTime.innerHTML = millisToHoursAndMinutesAndSeconds(bgPage.track.currentTime);
}

function millisToHoursAndMinutesAndSeconds(millis) {
    var hours = Math.floor(millis/ 3600000);
    var minutes = Math.floor((millis  % 60000) / 60000).toFixed(0);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return (hours > 0 ? (hours + ":") : '') + (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

// var embededPlayer = document.querySelector('iframe');
// var widget = SC.Widget(embededPlayer);
