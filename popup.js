// document.querySelector('button').addEventListener('click', function() {
//     SC.stream('tracks/553134150').then(function(currentTrack){
//         SC.currentTrack = currentTrack;
//         SC.currentTrack.play();
//     });
// });
var message = null;

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#player').addEventListener("click", play);
});

function play(){
    message = "play";
    chrome.runtime.sendMessage(message);
}
