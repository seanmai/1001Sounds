// refactor later to use popup.js play() instead of rewriting function

window.addEventListener("keydown", function(e){
    var key = e.which || e.keyCode;
    if (key === 179){     // media play
        let message = "play"
        chrome.runtime.sendMessage(message, function(response){
        });
    }
});
