// document.querySelector('button').addEventListener('click', function() {
//     SC.stream('tracks/553134150').then(function(currentTrack){
//         SC.currentTrack = currentTrack;
//         SC.currentTrack.play();
//     });
// });
document.addEventListener('DOMContentLoaded', function() {
    console.log("POPUP.js");
    document.querySelector('#player').addEventListener("click", play);
    console.log(document.querySelector('#player'));
});

function play(){
    let message = "play"
    console.log(message);
    chrome.runtime.sendMessage(message);
}
