chrome.alarms.onAlarm.addListener(function(alarm){
	chrome.notifications.create({
		type: "basic",
		title: "Reminder",
		message: "Hi",
		iconUrl: "icon.png"
	}, function() {
		//alert("Reminder will set in " + time + " minutes");
	})
})