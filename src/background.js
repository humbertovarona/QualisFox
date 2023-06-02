chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "display_notification") {
    var content = request.content;
    chrome.notifications.create({
      type: "basic",
      iconUrl: "website.png",
      title: "Qualis search",
      message: content,
    });
  }
});
