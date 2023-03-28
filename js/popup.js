  const config = {
    apiKey: "AIzaSyAANTMpKgunV-A39gNzDHyrVVin9F77Op8",
    authDomain: "arduino-379bc.firebaseapp.com",
    databaseURL: "https://arduino-379bc.firebaseio.com",
    projectId: "arduino-379bc",
    storageBucket: "arduino-379bc.appspot.com",
    messagingSenderId: "303798008110"
  };
  firebase.initializeApp(config);
  
	
 var currentCategory;
 var currentNxt ;
 var currentPrv ;
 var firstc = 0;
 var lastc = 0;
 var first = 0;
 var last = 0;

function initApp() {
getData('Category',"home",1,true);
loadMenu();
}

/*************************
Navigation menu links
**************************/
$(".mdl-navigation__link").click(function() {
	console.log(this.id);
$( 'div[class^="mdl-layout__obfuscator"]' ).trigger( "click" );
  chrome.tabs.create({ url: this.getAttribute('link') });
  amplitude.getInstance().logEvent('navigation_link', this.getAttribute('link'));
});

/*************************
Mini menu injet items 
**************************/
function loadMenu() {
	$('#menu').append(`<li disabled  class="mdl-menu__item" id="loading">Loading...</li>`);
 var cate = firebase.database().ref().child('categories');	
 var items = [];
	cate.once("value", function(snap) {
		snap.forEach(function(shot) {
			items.push(`<li class="mdl-menu__item" id="`+shot.key+`">`+shot.key+`</li>`);
		});
	}).then(function() {
	$('#loading').remove();
	$('#menu').append(items);
	componentHandler.upgradeAllRegistered();
	});

}

/*************************
Mini menu event items 
**************************/
var ul = document.getElementById('menu');
ul.onclick = function(event) {
    var target = getEventTarget(event);
	$('body').trigger( "click" );
    var text = target.id;
	if (currentCategory == text  || text == "loading")
	{
		return;
	}
	
	$("#table_title").text(text);
	$("#tab").find("tr").remove();
	if (text == "home")
	{getData('Category',"home",1,true);}
else{
	firstc = 0;
	lastc = 0;
	getData('Category',text,'voice_'+ text,true);
}
};

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
}
/*$(".li").click(function() {
	$("#table_title").text(this.innerText);
	$("#tab").find("tr").remove();
	console.log(currentCategory);
	if (this.id == "home" )
	{getData('Category',"home",'voice_',true);}
else{
	getData('Category',this.id,'voice_',true);
}
});*/



/*************************
Main Function
**************************/
function getData(order,equal,nxt,dir) {
	console.log('order: '+order+'\nequal: '+equal+'\n nxt: '+nxt+'\n dir: '+dir+'\n firstc: '+firstc)
	currentCategory = equal;
	$("#tab").find("tr").remove();
	var imageURL = chrome.extension.getURL('img/'+equal+'.jpg');
	$("#head").css("background", "transparent url('"+imageURL+"') center / cover");
	$("#pag").css("position", "fixed");
	  var rootRef = firebase.database().ref();
	  var voiceRef = rootRef.child('voices');
	  var voices = [];
	  var uids = [];
	  var timestamps = [];
	  var table = document.getElementById("tab");
      var row;
	  var category;
	
    document.getElementById('prog').style.display = 'block'; 
	if(last == 0 &&  equal == "home")
{
	voiceRef.orderByChild('timestamp').limitToLast(1).once("value", function(snsap) {
		snsap.forEach(function(shot) {
		last = shot.val().timestamp;
		
		});
});}

if(lastc == 0 &&  equal != "home")
{
	voiceRef.orderByChild('Category').equalTo(equal).limitToLast(1).once("value", function(snsap) {
		snsap.forEach(function(shot) {
		lastc = shot.val().uid;
		});
});}

	/*if (dir)
	{var page = voiceRef.orderByChild('uid').limitToFirst(4).startAt(nxt);}
else
	{   var page = voiceRef.orderByChild('uid').limitToLast(4).endAt(nxt);}*/

if (dir && equal != "home")
	{var page = voiceRef.orderByChild('uid').limitToFirst(4).startAt(nxt);}
else if (!dir && equal != "home")
	{var page = voiceRef.orderByChild('uid').limitToLast(4).endAt(nxt);}
else if (dir && equal == "home")
	{
		var page = voiceRef.orderByChild('timestamp').limitToFirst(5).startAt(nxt);}
else
{var page = voiceRef.orderByChild('timestamp').limitToLast(5).endAt(nxt);}

	page.once("value", function(snap) {
	snap.forEach(function(shot) {
	var videoId = shot.child('video_id').val();
	var uid =  shot.child('uid').val();
	var timestamp =  shot.child('timestamp').val();
   category = shot.child('Category').val();
	var videoURL = "https://www.youtube.com/watch?v="+videoId;
	var thum = "http://img.youtube.com/vi/"+videoId+"/0.jpg";
	var title = shot.child('title').val();
	
	
	if (equal ==  category || equal == "home") {
	uids.push(uid);
	console.log(' timestamps      '+timestamps.length);
	timestamps.push(timestamp);
	if (voices.length <= 3)
	{voices.push(`<div class="demo-card-image mdl-card mdl-shadow--2dp" style="background: url('`+thum+`') center / cover;">
		<div class="mdl-card__title mdl-card--expand"></div>
		<div class="mdl-card__actions">	
		<a href="`+videoURL+`" target="_blank" class="mdl-button mdl-js-ripple-effect mdl-js-button demo-card-image__filename">`+title+`</a></div></div>`);
	}}
	/*else if((equal ==  category && uids.length >= 4) ^ (equal == "home" && timestamps.length >= 4)){
		uids.push(uid);
	timestamps.push(timestamp);
	
	}*/
	});	
	
	
if (equal != "home")
{
currentNxt = uids.slice(-1)[0];
currentPrv = uids[0];
}
else
{
currentNxt = timestamps.slice(-1)[0];
currentPrv = timestamps[0];
}

if(first == 0 &&  equal == "home")
{
	first = timestamps[0];
}

if(firstc == 0 &&  equal != "home")
{
	firstc = uids[0];
}

if (-1 != $.inArray(lastc,uids)  && -1 != $.inArray(firstc,uids))
{
	$("#prv").prop('disabled', true);
	$("#nxt").prop('disabled', true);
}

if (-1 != $.inArray(first,timestamps) &&  equal == "home")
{
	$("#prv").prop('disabled', true);
}else{
	$("#prv").prop('disabled', false);
}

if (-1 != $.inArray(last,timestamps)  &&  equal == "home")
{
	$("#nxt").prop('disabled', true);
}else{
	$("#nxt").prop('disabled', false);
}

if (-1 != $.inArray(firstc,uids) && equal != "home")
{
	console.log('PRV fi');
	$("#prv").prop('disabled', true);
}
console.log('lastc: '+lastc);
console.log('uids   '+  uids);
if (-1 != $.inArray(lastc,uids)  &&  equal != "home")
{
	$("#nxt").prop('disabled', true);
}


for(var i = 0; i < voices.length; i++){
  if(i % 2== 0) {  
  row = table.insertRow(-1);      
  }
  var cell = row.insertCell(-1);  
  cell.innerHTML = voices[i];
}
	}).then(function() {
document.getElementById('prog').style.display = 'none'; 
var count = $('#tab > TR').length;
if (voices.length  >= 3 || count  >= 2)
{$("#pag").css("position", "relative");}
else{
	$("#pag").css("position", "fixed");
}
	}).catch(function(e){
            console.log("Error: ",e);
	});
}


/*************************
Next Button
**************************/
$("#nxt").click(function() {
	if (currentCategory == "home" )
	{
		console.log('home current shit next is  '+currentNxt);
		getData('Category',"home",currentNxt,true);}
else{
	getData('Category',currentCategory,currentNxt,true);
}
});

/*************************
Previous Button
**************************/
$("#prv").click(function() {
	if (currentCategory == "home" )
	{getData('Category',"home",currentPrv,false);}
else{
	getData('Category',currentCategory,currentPrv,false);
}
});

/*************************
Load first
**************************/
window.onload = function() {
initApp();
/*var imageURL = chrome.extension.getURL('img/bg.jpg');
$("#bod").css("background", "transparent url('"+imageURL+"') center / cover");
*/
};

 (function(e,t){var n=e.amplitude||{_q:[],_iq:{}};var r=t.createElement("script");r.type="text/javascript";
r.async=true;r.src="https://d24n15hnbwhuhn.cloudfront.net/libs/amplitude-3.4.1-min.gz.js";
r.onload=function(){if(e.amplitude.runQueuedFunctions){e.amplitude.runQueuedFunctions();
}else{console.log("[Amplitude] Error: could not load SDK")}};var i=t.getElementsByTagName("script")[0];
i.parentNode.insertBefore(r,i);function o(e,t){e.prototype[t]=function(){this._q.push([t].concat(Array.prototype.slice.call(arguments,0)));
return this}}var s=function(){this._q=[];return this};var a=["add","append","clearAll","prepend","set","setOnce","unset"];
for(var u=0;u<a.length;u++){o(s,a[u])}n.Identify=s;var c=function(){this._q=[];return this;
};var l=["setProductId","setQuantity","setPrice","setRevenueType","setEventProperties"];
for(var p=0;p<l.length;p++){o(c,l[p])}n.Revenue=c;var d=["init","logEvent","logRevenue","setUserId","setUserProperties","setOptOut","setVersionName","setDomain","setDeviceId","setGlobalUserProperties","identify","clearUserProperties","setGroup","logRevenueV2","regenerateDeviceId","logEventWithTimestamp","logEventWithGroups"];
function v(e){function t(t){e[t]=function(){e._q.push([t].concat(Array.prototype.slice.call(arguments,0)));
}}for(var n=0;n<d.length;n++){t(d[n])}}v(n);n.getInstance=function(e){e=(!e||e.length===0?"$default_instance":e).toLowerCase();
if(!n._iq.hasOwnProperty(e)){n._iq[e]={_q:[]};v(n._iq[e])}return n._iq[e]};e.amplitude=n;
})(window,document);

 amplitude.getInstance().init("daa861d4102611aac649e86f29a9ea4d");


//Pure JS code with jQuery implementation
/*var matchUrl = '*://www.youtube.com/watch?v*';
var queryInfo = {url: matchUrl};
chrome.tabs.query(queryInfo, function(tabs) {
	var cl = $('#content-list');
	tabs.forEach(function(tab) {
		var ico = tab.audible ? 'pause' : 'play_arrow';
		var x = `
		 <tr>
      <td width="10px"  class="mdl-data-table__cell--non-numeric">${tab.title.substr(0, 30)+"..."}</td>10
      <td>
	  <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab" id="playpause${tab.id}">
<i id="icon${tab.id}" class="material-icons" >${ico}</i>
</button>
</td>
    </tr> `
	
	cl.append($(x));
	
		/*document.addEventListener("hello", function(event) {
	chrome.tabs.sendMessage(tab.id, {message: 'toggle_video', tabId: tab.id}, function(response) {
				if (response.error) {
					console.log('No video found in tab');
				} else {
					if (response.paused) {
						//Mute & pause Ansit Audio
						 document.getElementById('tit').innerText=tab.title.substr(0, 25)+"...";
						 document.getElementById("icon"+response.tabId).innerText="play_arrow";
					} else {
						//unMute & play Ansit Audio
						document.getElementById('tit').innerText=tab.title.substr(0, 25)+"...";
						 document.getElementById("icon"+response.tabId ).innerText="pause";
					}
				}
	});});*/
	
    /*  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
            console.log(response.farewell);
        });
    });
	
	$('#playpause'+tab.id).on('click', {tabId: tab.id}, function(event) {
		 amplitude.getInstance().logEvent('kjkjk');
			console.log('Clicked tab with event state ', event.data.tabId);
			chrome.tabs.sendMessage(event.data.tabId, {message: 'toggle_video_state', tabId: event.data.tabId}, function(response) {
				if (response.error) {
					console.log('No video found in tab');
				} else {
					if (response.paused) {
						//Mute & pause Ansit Audio
						 //document.getElementById('tit').innerText=response.title;
						 document.getElementById('tit').innerText=tab.title.substr(0, 25)+"...";
						 document.getElementById("icon"+response.tabId).innerText="play_arrow";
					} else {
						//unMute & play Ansit Audio
						document.getElementById('tit').innerText=tab.title.substr(0, 25)+"...";
						 document.getElementById("icon"+response.tabId ).innerText="pause";
					}
				}
			});
		});
		
		
		
		$('#jump'+tab.id).on('click', {tabId: tab.id, windowId: tab.windowId}, function(event) {
			console.log('Clicked tab with event state ', event.data.tabId);
			chrome.windows.update(event.data.windowId, {focused: true});
			chrome.tabs.update(event.data.tabId, {active: true});
		});

		$('#close'+tab.id).on('click', {tabId: tab.id}, function(event) {
			console.log('Clicked tab with event state ', event.data.tabId);
			chrome.tabs.remove(event.data.tabId);
		});
	});
	});
/*document.addEventListener('DOMContentLoaded', function() {
  var playButton = document.getElementById('play');
  var title = document.getElementById('title');
 // var bar = document.getElementById("eow-title").value;

  //title.innerHTML=bar.innerHTML;
  playButton.addEventListener('click', function() {
     // title.innerHTML='hhhhhhhhh';
     //title.innerHTML=bar;
      
    });
  }, false);
//start connection in content script
let contentPort = chrome.runtime.connect({  
   name: 'background-content'
});

//Listen for runtime message
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {  
   //Retrieve offset dimension
   if(message.action === 'GET_DIMENSION') {
      contentPort.postMessage({
         type: 'DIMENSION', 
         payload: {
            height: document.body.offsetHeight,
            width: document.body.offsetWidth       
         }
      });
   }
});*/

/*
 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-98810043-2', 'auto');
  ga('set', 'checkProtocolTask', function(){}); 
  ga('require', 'displayfeatures');
  ga('send', 'pageview' , 'popup.html');

*/