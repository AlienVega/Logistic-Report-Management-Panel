// Örnek JavaScript kodu
fetch('/depolar/bla')  // API yolunu doğru şekilde güncelleyin
.then(response => response.json())
.then(data => {
  const ware_house_count = data.ware_house_count;
  const user_count=data.user_count;

  // HTML içeriğini güncelleyin
  const depoSayisiElement = document.querySelector('#depo-sayisi');
  depoSayisiElement.textContent = ware_house_count;

  const kullanicisayisiElement = document.querySelector('#kullanici-sayisi');
  kullanicisayisiElement.textContent = user_count;
})
.catch(error => {
  console.error('API isteği sırasında bir hata oluştu:', error);
});



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


