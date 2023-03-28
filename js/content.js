
  /************************************
 Inject Player
 ************************************/
 function initPlayer() {
var imageURL = chrome.extension.getURL('img/welcome_card.png');
var insert_to = document.getElementById("watch8-action-buttons");
var aud = ` 
 <audio id="audio" ></audio>
 <div class="demo-card-wide mdl-card mdl-shadow--2dp">
  <div class="mdl-card__title" style="background: transparent url('`+imageURL+`') center / cover">
    <h2 class="mdl-card__title-text" id="titl">Pappagllo</h2>
  </div>
  
  <div class="mdl-card__supporting-text" id="desc">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Mauris sagittis pellentesque lacus eleifend lacinia...
  </div>
  
  <div class="mdl-card__actions mdl-card--border">
    <a style="text-decoration: none;" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
      Powered by Ansit
    </a>
	  <!-- plays Chip -->
<span style="float: right; padding-left:20px; float: right;" class="mdl-chip mdl-chip--contact">
    <span style="padding-right: 10px;" id="plays" class="mdl-chip__text">0</span>
    <span class="mdl-chip__text">►</span>
</span>
  </div>
  <div id="p2" class=" mdl-cell--12-col mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
  <div class="mdl-card__menu">
  	  <!-- plays pause -->
  <label id="onn" class="mdl-icon-toggle mdl-js-icon-toggle mdl-js-ripple-effect" for="icon-toggle-1">
  <input type="checkbox" style="opacity: 0; -webkit-appearance: none;" id="icon-toggle-1" class="mdl-icon-toggle__input" disabled="disabled">
  <i id="turn" style="font-size: 40px; color: white;" class="mdl-icon-toggle__label material-icons">power_settings_new</i>
  </label> 


  </div>
</div>` 
 if(!insert_to.length > 0)
 {insert_to.innerHTML = aud + insert_to.innerHTML;}
var audio = document.getElementById('audio');
 }
 
/*
<button id="demo-menu-lower-right"
        class="mdl-button mdl-js-button mdl-button--icon">
  <i class="material-icons">more_vert</i>
</button>
 
<ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
    for="demo-menu-lower-right">
  <li class="mdl-menu__item">Contact Us</li>
  <li class="mdl-menu__item">FB Page</li>
</ul>
*/


var video = document.getElementsByTagName("video")[0];
var session = 0;
var exist = false;
var voice_id;
var playss;

 /************************************
 Play_Pause_Sync
 ************************************/
function videoEvents(goNow){
console.log("video events fired");
console.log("SRC:     "+audio.src);

var isPlaying = video.currentTime > 0 && !video.paused && !video.ended 
    && video.readyState > 2;
	
var medias = {
    audio: Popcorn(audio),
    video: Popcorn(video)
  },
  loadCount = 0,
  events = "play pause waiting timeupdate volumechange playing seeked seeking".split(/\s+/g);
// iterate both media sources
Popcorn.forEach(medias, function(media, type) {

  // when each is ready... 
  media.on("canplayall", function() {

    // trigger a custom "sync" event
    this.emit("sync");

    // Listen for the custom sync event...    
  }).on("sync", function() {

    // Once both items are loaded, sync events
    if (++loadCount == 2) {
      // Uncomment this line to silence the video
      medias.video.mute();
      medias.audio.play();
	  console.log("for each");
      // Iterate all events and trigger them on the video 
      // whenever they occur on the audio
      events.forEach(function(event) {

     /*   medias.audio.on(event, function() {
			while (event === "playing" && session == 0) {
increaseplay();
	}  
		});*/
        medias.video.on(event, function() {
          // Avoid overkill events, trigger timeupdate manually
          if (event === "timeupdate") {

            if (!this.media.paused) {
              return;
            }
            medias.audio.emit("timeupdate");

            return;
          }
		 
          if (event === "waiting") {
			  console.log("wait_v");
			  medias.audio.pause();}
			  else{medias.audio.play();}
          if (event === "seeking") {
			  console.log("seeking_v");
            medias.audio.currentTime(this.currentTime());
          }
          if (event === "seeked" && event != "waiting") {
			console.log("seeked_v");
            medias.video.play();
		//	medias.audio.play();
          }
          if (event === "play" || event === "pause") {
            medias.audio[event]();
          }
        });
      });
    }
  });
});
/*console.log(YouTubeGetID(window.location.toString()));
	var aud = document.getElementById('audio');
	var video = document.getElementsByTagName("video")[0];
  video.addEventListener('waiting', this, false);
  video.addEventListener('playing', this, false);
  video.addEventListener('pause', this, false);
  video.addEventListener('progress', this, false);
  video.addEventListener('seeking', this, false);
  video.addEventListener('seeked', this, false);
 
if(video) {
  this.handleEvent = function(event) {
    switch(event.type) {
      case 'waiting':
       console.log("Video waiting");
	   aud.pause();
        break;
        case 'playing':
        play_pause();
		console.log("Video playing");
        break;
		case 'pause':
	    aud.pause();
        console.log("Video paused");
        break;
		case 'progress':
        console.log("Video progress");
        break;
		case 'seeking':
        console.log("Video seeking");
        break;
		case 'seeked':
        console.log("Video seeked");
        break;
                      }
  };
}
else {
  console.error("Video element not found");
}*/
}
 
/*function play_pause()
{	
	var aud = document.getElementById('audio');
	var video = document.getElementsByTagName("video")[0];
 var play_btn = document.querySelectorAll('.btn__play')[0];
 if(aud.paused)
{
	console.log("audio paused * unmuting video");
	video.muted = false;
}
play_btn.addEventListener('click', function(e) {
	
console.log("audio button click");
 if(aud.paused)
{
console.log("AUD paused by button");
video.pause();	
video.muted = false;
}
else
{console.log("AUD played by button");
video.play();	
video.muted = true;			
}
	});
}*/

 /************************************
get YouTube  video ID
 ************************************/
function YouTubeGetID(url){
  var ID = '';
  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if(url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  }
  else {
    ID = url;
  }
    return ID;
}

 /************************************
Checkbox  __    on ||  off
 ************************************/
function onoff(exist){
var togg = document.getElementById('icon-toggle-1');	

togg.addEventListener('change', function(e) { 
    if (!e.target.tagName === 'input' || e.target.getAttribute('type') !== 'checkbox') { 
       return;
    }
	 if(e.target.checked && exist) {
		 $('.ytp-mute-button.ytp-button').prop('disabled', true);
	 videoEvents();
	 audio.volume = video.volume;
	 audio.currentTime = video.currentTime;
	 document.getElementById('turn').style.color = "#ffc107";
	 amplitude.getInstance().logEvent('voice_on');	
     console.log("checked");  
	 console.log("current Video time   "+video.currentTime+"\n current Audio time   "+audio.currentTime);  
	 if (/*(audio.currentTime/audio.duration)*100 > 10 &&*/exist  && session == 0)
	{
		firebase.database().ref(voice_id+'/plays').set(playss+1).catch(function(e) {
		console.log(e);
		});
		session = 1;
		amplitude.getInstance().logEvent('voice_played');
		return;
	}
  }
  else {
	   $('.ytp-mute-button.ytp-button').prop('disabled', false);
	console.log("UNchecked");  
video.play();
audio.pause();
audio.currentTime = video.currentTime;
console.log('audio.currentTime         '+audio.currentTime);
audio.volume = 0;
video.muted = false;
    document.getElementById('turn').style.color = "white";
  }
    console.log("checked? " + e.target.checked);
});
}

 /************************************
init card
 ************************************/
function initApp() {
var storage = firebase.storage();
var db = firebase.database();
var storageRef = storage.ref();
var voiceId = 'voices/voice_'+YouTubeGetID(window.location.toString());

return firebase.database().ref(voiceId).once('value').then(function(snapshot) {
var togg = document.getElementById('icon-toggle-1');
///////////////////////////////////
  if(snapshot.exists()){
	  onoff(snapshot.exists());
	 // initPlayer();
	 togg.disabled= false;
	 voice_id = voiceId;
  document.getElementById('p2').style.display = "none";
  var voice_sr = snapshot.val().name;
  var plays = snapshot.val().plays;
  var title = snapshot.val().title;
  var description = snapshot.val().description;
  var src = snapshot.val().languages.Arabic;
  var video_id = snapshot.val().video_id;
  var thum = "https://img.youtube.com/vi/"+video_id+"/0.jpg";
  playss = plays;
  exist = true;
  $(".demo-card-wide > .mdl-card__title").css("background", "transparent url('"+thum+"') center / cover");
  audio.src = src;
//  increaseplay(voiceId,plays);
 // getVoiceSrc(voice_sr,voice_pl);
  document.getElementById('titl').innerText = title;
  document.getElementById('plays').innerText = plays;
  document.getElementById('desc').innerText = description;
  console.log('exists!');
  //G analytics
  chrome.runtime.sendMessage({greeting: "got_data"}, function(response) {});
  //Amplitude
  var eventProperties = {'Voice title': title,'Voice Description': description};
  amplitude.getInstance().logEvent('voice_details', eventProperties);
  var name =  $('.yt-user-name').text();
  var email =  $('.yt-masthead-picker-header.yt-masthead-picker-active-account').text();
  if (name.length > 0 && email.length > 0){
	 amplitude.getInstance().setUserId(email);
  var identify = new amplitude.Identify().set('user_type', 'chrome_extension');
identify.set('Details', {'name': name, 'email': email}); // dictionary is flattened and becomes name.first: John, name.last: Doe
  amplitude.identify(identify); }
  
  }else{ 
   togg.disabled= true;
  document.getElementById('p2').style.display = "none";
  document.getElementById('titl').innerText = "Not Available!";
  document.getElementById('desc').innerText = "...";
  console.log('Does not exists!');}
  }
, function (error) {
   console.log("Error: " + error.code);
});

//});
}




/*
function getVoiceSrc(src,pl) {
        storageRef.child(src).getDownloadURL().then(function(url) {
		console.log(url);
		document.getElementById("audio").src=url;
		V_src = url;
        db.ref(voiceId+'/voice_src/plays').set(pl+1);
		amplitude.getInstance().logEvent('voice_played');
})};*/

/*function butt(){
	var embed_button_target = document.querySelector(".ytp-fullscreen-button");
			if (embed_button_target)
			{
				var elem = document.createElement("button");
				elem.onclick = function() {
					var video = document.getElementsByTagName("video")[0];
					video.pause();
					chrome.runtime.sendMessage({ playSideplayer: (document.querySelector('.ytp-title-link') || { href: window.location.href }).href + "&t=" + parseInt(video.currentTime) + "s" });
					if (document.getElementsByClassName("ytp-fullscreen").length > 0)
						document.querySelector(".ytp-fullscreen-button").click();
				};
				elem.className = "bnbnbn ytp-button";
				embed_button_target.dispatchEvent(new MouseEvent("mouseover"));
				document.getElementsByClassName("ytp-tooltip-text")[0].style.opacity = "0";
				elem.onmouseover = function() {
					this.hovered = true;
					setTimeout(function(ths) {
						if (!ths.hovered)
							return false;
						document.getElementsByClassName("ytp-tooltip-text")[0].style.opacity = "";
						document.getElementsByClassName("ytp-tooltip-text")[0].innerHTML = "Play Ansit";
						var tlp = document.getElementsByClassName("ytp-tooltip")[0];
						tlp.style.left = ths.offsetLeft - 20 + "px";
						tlp.classList.remove("ytp-preview");
						tlp.setAttribute("aria-hidden", "true");
						tlp.style.display = "block";
						tlp.setAttribute("aria-hidden", "false");
					}, 500, this);
				}
				elem.onmouseleave = function(e) {
					this.hovered = false;
					document.getElementsByClassName("ytp-tooltip-text")[0].innerHTML = "Play in Sideplayer";
					document.getElementsByClassName("ytp-tooltip")[0].setAttribute("aria-hidden", "true");
				}
				elem.title = "Ansit"
				var parent = embed_button_target.parentNode;
				var next = embed_button_target.nextSibling;
				if (next)
					parent.insertBefore(elem, next);
				else
					parent.appendChild(elem);
			}
}*/

 /************************************
init firebase  &&  amplitude
 ************************************/
function playApp(){
	amplitude.getInstance().init("daa861d4102611aac649e86f29a9ea4d");
ga('send', 'pageview');
	if (firebase.apps.length === 0) {
	console.log("Not initialized");
   var config = {
    apiKey: "AIzaSyAANTMpKgunV-A39gNzDHyrVVin9F77Op8",
    authDomain: "arduino-379bc.firebaseapp.com",
    databaseURL: "https://arduino-379bc.firebaseio.com",
    projectId: "arduino-379bc",
    storageBucket: "arduino-379bc.appspot.com",
    messagingSenderId: "303798008110"
  };
	firebase.initializeApp(config);
	console.log("initializing Now..........");
	initApp();
	
}
else{
	console.log( "initialized true");
	initApp();}
	
}

 /************************************
refresh extension
 ************************************/
window.addEventListener("spfrequest", function(e) {
	console.log("requesting new page")
    audio.muted = true;
	audio.pause();
	});
window.addEventListener("spfprocess", function(e) { console.log("new page is processed") });
window.addEventListener("spfdone", function(e) { console.log("new page is displayed DONE");
 if(!document.getElementsByClassName("player").length > 0)
 {
	initPlayer();
	
	}
console.log("page displayed && playApp");
playApp();
//videoEvents();
});

document.onreadystatechange = function() { 
    if (document.readyState == "complete") { 
console.log("page loaded && playApp");
   playApp();
   initPlayer();
   //videoEvents();
   
    }
 } 




