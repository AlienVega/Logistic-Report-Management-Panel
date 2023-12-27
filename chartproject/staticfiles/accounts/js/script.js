// const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

// allSideMenu.forEach((item) => {
//   const li = item.parentElement;

//   item.addEventListener("click", function () {
//     allSideMenu.forEach((i) => {
//       i.parentElement.classList.remove("active");
//     });
//     li.classList.add("active");
//   });
// });

// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
  sidebar.classList.toggle("hide");
});




// notification panel

function toggleNotificationPanel() {
  var notificationPanel = document.getElementById("notificationPanel");
  notificationPanel.classList.toggle("active");
}

document.addEventListener("click", function (event) {
  var notificationContainer = document.querySelector(".notification-container");
  if (!notificationContainer.contains(event.target)) {
    var notificationPanel = document.getElementById("notificationPanel");
    notificationPanel.classList.remove("active");
  }
});
