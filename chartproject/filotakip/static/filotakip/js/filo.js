// var yearSelect = document.getElementById("yearselect");
//     var currentYear = new Date().getFullYear();
//     for (var year = currentYear; year <= 2030; year++) {
//         var option = document.createElement("option");
//         option.value = year;
//         option.textContent = year;
//         yearSelect.appendChild(option);
//     }


// // API isteğini yapacak fonksiyon
// async function getUserWarehouse() {
//     try {
//         const response = await fetch('/filotakip/userwarehouse/');
//         const data = await response.json();

//         if (data.userwarehouse) {
//             const marnak = document.querySelector("#marnak");
//             const murat = document.querySelector("#murat");
//             const bir = document.querySelector("#bir");
//             const ceva = document.querySelector("#ceva");
//             const netlog = document.querySelector("#netlog");
        
//             const ortaInputler = document.querySelectorAll(".orta");

//             switch (data.userwarehouse) {
//                 case "TORBALI DEPO":
//                     ceva.classList.add("d-none");
//                     ortaInputler.forEach(function(ortaInput) {
//                         ortaInput.disabled = true;
//                     });
//                     marnak.classList.remove("d-none");
//                     murat.classList.remove("d-none");
//                     bir.classList.remove("d-none");
//                     netlog.classList.remove("d-none");
//                     break;
        
//                 case "KEMALPAŞA DEPO":
//                     bir.classList.add("d-none");
//                     netlog.classList.add("d-none");
//                     ortaInputler.forEach(function(ortaInput) {
//                         ortaInput.disabled = false;
//                     });
//                     marnak.classList.remove("d-none");
//                     murat.classList.remove("d-none");
//                     ceva.classList.remove("d-none");
//                     break;
        
//                 case "MUĞLA DEPO":
//                     bir.classList.add("d-none");
//                     netlog.classList.add("d-none");
//                     ceva.classList.add("d-none");
//                     ortaInputler.forEach(function(ortaInput) {
//                         ortaInput.disabled = true;
//                     });
//                     marnak.classList.remove("d-none");
//                     murat.classList.remove("d-none");
//                     break;
        
//                 case "MİGET DEPO":
//                     bir.classList.add("d-none");
//                     netlog.classList.add("d-none");
//                     ceva.classList.add("d-none");
//                     marnak.classList.add("d-none");
//                     ortaInputler.forEach(function(ortaInput) {
//                         ortaInput.disabled = true;
//                     });
//                     break;        
//                 default:
//                     // Varsayılan durumda gerekli işlemler yapılabilir
//                     break;
//             }
//         } else {
//             console.log('User is not authenticated');
//         }
//     } catch (error) {
//         console.error('API request failed:', error);
//     }
// }

// // Sayfa yüklendiğinde getUserWarehouse fonksiyonunu çağır
// window.onload = function() {
//     getUserWarehouse();
// };

//  // Yıl Seçici
//  var yearSelect = document.getElementById("yearselect");
//  var currentYear = new Date().getFullYear();
//  for (var year = currentYear; year <= 2030; year++) {
//      var option = document.createElement("option");
//      option.value = year;
//      option.text = year;
//      yearSelect.appendChild(option);
//  }

