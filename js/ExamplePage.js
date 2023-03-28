var consoleStrValue = "";

function getIds() {  
  OneSignal.getIdsAvailable(function(ids) {
	console.log("OneSignal GetIdsAvailable");
	console.log(ids);
	consoleStrValue += "getIdsAvailable:"
					+ "\nUserID: " + ids.userId
					+ "\nRegistration ID: " + ids.registrationId + "\n\n";
	document.getElementById("console").innerText = consoleStrValue;
  });
}

function getTags() {
	OneSignal.getTags(function(tags) {
		console.log("OneSignal GetTags:");
		console.log(tags);
		consoleStrValue += "getTags: " + JSON.stringify(tags) + "\n\n";
		document.getElementById("console").innerText = consoleStrValue;
	});
}

function sendTag() {
	// Use sendTags passing in a JSON object if you want to send more than one key value pair at a time.
	OneSignal.sendTag(document.getElementById("tagKey").value, document.getElementById("tagValue").value);
}

OneSignal.addListenerForNotificationOpened(function(data) {
	console.log("Received ONESIGNAL_NOTIFICATION_OPENED:");
	console.log(data);
});
