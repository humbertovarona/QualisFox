document.addEventListener("DOMContentLoaded", function () {
  var searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: "search_website" });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var aboutButton = document.getElementById("aboutButton");
  aboutButton.addEventListener("click", function () {
    displayAboutMessage();
  });
});

function displayAboutMessage() {
  var welcomeMessage = "Developed by H. L. Varona";
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
      </br>
      <p>${welcomeMessage}</p>
      </br>
    </div>
  `;
  document.body.appendChild(notification);

  setTimeout(function () {
    document.body.removeChild(notification);
  }, 3000);
}
