(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-98810043-2', 'auto');
ga('send', 'pageview');

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-98810043-2']);
_gaq.push(['_trackPageview']);
(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.greeting) {
    case "got_data":
      _gaq.push(['_trackEvent', 'Firbase', 'Got_firebase_data']);
      break;
    case "retrieveAddr":
     _gaq.push(['_trackEvent', 'ali', 'ali']);   
    default:
      sendResponse({}); // snub them.
	}	
     // sendResponse({farewell: "goodbye"});
  });
