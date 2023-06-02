function searchWebsite() {
  var websiteHeaderText = document.head.innerHTML.toLowerCase();
  fetch(chrome.runtime.getURL("database.csv"))
    .then((response) => response.text())
    .then((csvData) => {
      var rows = csvData.split("\n");
      for (var i = 0; i < rows.length; i++) {
        var columns = rows[i].split(";");
        var searchString = columns[0].trim().toLowerCase();
        if (websiteHeaderText.includes(searchString)) {
          var content = columns[1].trim();
          displayNotification(searchString, content);
          return;
        }
      }
      displayErrorNotification("No match found in the website header.");
    });
}

function displayNotification(searchString, content) {
  var notification = document.createElement("div");
  notification.innerHTML = `
    <div style="
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px;
      background-color: #4caf50;
      color: #ffffff;
      font-size: 18px;
      font-weight: bold;
      border-radius: 5px;
      text-align: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      z-index: 9999;
    ">
      <p>Qualis result:</p>
      </br>
      <p>${searchString}</p>
      </br>
      <p>${content}</p>
    </div>
  `;
  document.body.appendChild(notification);

  setTimeout(function () {
    document.body.removeChild(notification);
  }, 3000);
}


function displayErrorNotification(ErrorMessage) {
  var notification = document.createElement("div");
  notification.innerHTML = `
    <div style="
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px;
      background-color: #4caf50;
      color: #ffffff;
      font-size: 14px;
      font-weight: bold;
      border-radius: 5px;
      text-align: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      z-index: 9999;
    ">
      <p>Qualis result:</p>
      </br>
      <p>${ErrorMessage}</p>
    </div>
  `;
  document.body.appendChild(notification);

  setTimeout(function () {
    document.body.removeChild(notification);
  }, 3000);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "search_website") {
    searchWebsite();
  }
});
