const clientid1 = "175c043157ffae2c6d5fed16c3d95a4c";
const clientid2 = "c202b469a633a7a5b15c9e10b5272b78";


function Track(id, title, artwork, trackurl, username, userurl, isPlaying){
    this.id = id;
    this.title = title;
    this.artwork = artwork;
    this.trackurl = trackurl;
    this.username = username;
    this.userurl = userurl;
    this.isPlaying = isPlaying;
}

var interval = 0;
var volume = 1;
var track;
var tracklist = [];
var showTracklist = true;
var showPlaylist = false;
var indexPlaying = 0;
var playlistURL = "";
var playlist = [];
var favorites = [];

chrome.runtime.onMessage.addListener(receiver);

//Receiver function to handle caught messages
function receiver(request, sender, sendResponse){
    if(request == "play"){
        if(track.isPlaying){
            SC.currentTrack.pause();
            track.isPlaying = false;
            clearInterval(interval);
            interval = 0;
            sendResponse();
        } else{
            if(SC.currentTrack){
                SC.currentTrack.play();
                track.isPlaying = true;
            }
            //sendResponse to sender
            sendResponse();
        }
    } else if(request.includes("/sets/")){
        playlist = [];
        volume = 1;
        if(SC.currentTrack){
            volume = SC.currentTrack.getVolume();
        }
        const URL = "https://api.soundcloud.com/resolve.json?url=" + request + "&client_id=" + clientid2;
        $.ajax({
            url: URL,
            type: "GET",
            success: function(result){
                // console.log(result);
                SC.initialize({ // Initialize stream
                    client_id: clientid2
                });
                playlistURL = result.permalink_url;
                for(var i = 0; i < result.tracks.length; i++){
                    playlist.push(new Track(result.tracks[i].id, result.tracks[i].title, result.tracks[i].artwork_url, result.tracks[i].permalink_url, result.tracks[i].user.username, result.tracks[i], result.tracks[i].user.permalink_url));
                }
                track = playlist[indexPlaying];
                SC.stream('tracks/' + track.id).then(function(currentTrack){ // Stream track and set variables
                    SC.currentTrack = currentTrack;
                    SC.currentTrack.play();
                    SC.currentTrack.setVolume(volume);  // Maintains volume of previous track
                    track.isPlaying = true;
                    setTimeout(function(){
                        if(SC.currentTrack.getDuration() > (10 * 60 * 1000)){
                            tracklist = ["0:00 - 2017 Intro", "3:10 - 2018 Awake 1.0 Finale", "4:59 - Lost, Disarm You, ChosenYou(Illenium Trap Edit)", "7:16 - Say It(Illenium VIP Edit)", "11:58 - Needed You/Silence(Illenium Edit)", "14:01 - Angels & Airwaves-The Adventure(Illenium Remix)", "17:27 - Take You Down/Don’t Let Me Down(Illenium Edit)", "19:20 - Crawl Outta Love Intro/VIP edit", "22:54 - Where’d U Go(Fort Minor X Illenium Mashup)", "25:44 - Awake 2.0 Intro(Gold)"];
                            showTracklist = true;
                            showPlaylist = false;
                        } else {
                            tracklist = [];
                        }
                    }, 750);
                });
            },
            error: function(error){
                console.log('Error ${error}')
            }
        })
        sendResponse("is playing");
    } else if(request.includes("http")){    //If message is a http, send GET request to pull track data --pretty BAD logic, should check something else. works for now
        playlist = [];
        volume = 1;
        if(SC.currentTrack){
            volume = SC.currentTrack.getVolume();
        }
        const URL = "https://api.soundcloud.com/resolve.json?url=" + request + "&client_id=" + clientid2;
        $.ajax({
            url: URL,
            type: "GET",
            success: function(result){
                // console.log(result);
                SC.initialize({ // Initialize stream
                    client_id: clientid2
                });
                track = new Track(result.id, result.title, result.artwork_url, result.permalink_url, result.user.username, result.user.permalink_url);
                SC.stream('tracks/' + track.id).then(function(currentTrack){ // Stream track and set variables
                    SC.currentTrack = currentTrack;
                    SC.currentTrack.play();
                    SC.currentTrack.setVolume(volume);  // Maintains volume of previous track
                    track.isPlaying = true;
                    setTimeout(function(){
                        // console.log(SC.currentTrack.getDuration());
                        // console.log(SC.currentTrack.getDuration() > (10 * 60 * 1000));
                        if(SC.currentTrack.getDuration() > (10 * 60 * 1000)){
                            tracklist = ["0:00 - 2017 Intro", "3:10 - 2018 Awake 1.0 Finale", "4:59 - Lost, Disarm You, ChosenYou(Illenium Trap Edit)", "7:16 - Say It(Illenium VIP Edit)", "11:58 - Needed You/Silence(Illenium Edit)", "14:01 - Angels & Airwaves-The Adventure(Illenium Remix)", "17:27 - Take You Down/Don’t Let Me Down(Illenium Edit)", "19:20 - Crawl Outta Love Intro/VIP edit", "22:54 - Where’d U Go(Fort Minor X Illenium Mashup)", "25:44 - Awake 2.0 Intro(Gold)"];
                            showTracklist = true;
                            showPlaylist = false;
                        } else {
                            tracklist = [];
                        }
                    }, 750);
                });
            },
            error: function(error){
                console.log('Error ${error}')
            }
        })
        sendResponse("is playing");
    // } else if(request == "login"){
    //     SC.initialize({
    //       client_id: 'c202b469a633a7a5b15c9e10b5272b78',    // BORROWED FROM http://connect.soundcloud.com/examples/connecting.html
    //       redirect_uri: 'http://connect.soundcloud.com/examples/callback.html'
    //     });
    //
    //     SC.connect().then(function() {
    //       return SC.get('/me');
    //     }).then(function(me) {
    //         alert('Hello, ' + me.username);
    //
    //     });
    //     sendResponse();
    // } else if(request === "favorites"){   // Gets sou
    //     // const URL = "http://api.soundcloud.com/users" + me.id + "/favorites?&client_id=175c043157ffae2c6d5fed16c3d95a4c";
    //     const URL = "http://api.soundcloud.com/users/205000014/favorites?client_id=175c043157ffae2c6d5fed16c3d95a4c";
    //     $.ajax({
    //         url: URL,
    //         type: "GET",
    //         success: function(result){
    //             // console.log(result);
    //             favTracksLL = result;
    //         },
    //         error: function(error){
    //             console.log('Error ${error}')
    //         }
    //     })
    //     sendResponse();
    }
}
