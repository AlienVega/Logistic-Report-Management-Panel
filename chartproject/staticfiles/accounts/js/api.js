// Kullanıcı ve depo toplam sayı yazdırma 

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


// Depo seçimi combo box'larını seçme
var depoSelects = document.querySelectorAll(".depo-select");
// Yıl seçimi combo box'larını seçme
var yilSelects = document.querySelectorAll(".yil-select");
// Ay seçimi combo box'larını seçme
var aySelects = document.querySelectorAll(".ay-select");


// 
// Depo seçimi combo box'ları
var depoSelect1 = document.getElementById("depo1");
var depoSelect2 = document.getElementById("depo2");
var depoSelect3 = document.getElementById("depo3");
var depoSelect4 = document.getElementById("depo4");
var gdepoSelect5 = document.getElementById("gdepo5");
var gdepoSelect6 = document.getElementById("gdepo6");
var gdepoSelect7 = document.getElementById("gdepo7");
var gdepoSelect8 = document.getElementById("gdepo8");
// Yıl seçimi combo box'ları
var yilSelect1 = document.getElementById("yil1");
var yilSelect2 = document.getElementById("yil2");
var yilSelect3 = document.getElementById("yil3");
var yilSelect4 = document.getElementById("yil4");
var gyilSelect5 = document.getElementById("gyil5");
var gyilSelect6 = document.getElementById("gyil6");
var gyilSelect7 = document.getElementById("gyil7");
var gyilSelect8 = document.getElementById("gyil8");
// Ay seçimi combo box'ları
var aySelect1 = document.getElementById("ay1");
var aySelect2 = document.getElementById("ay2");
var aySelect3 = document.getElementById("ay3");
var aySelect4 = document.getElementById("ay4");
var gaySelect5 = document.getElementById("gay5");
var gaySelect6 = document.getElementById("gay6");
var gaySelect7 = document.getElementById("gay7");
var gaySelect8 = document.getElementById("gay8");

// Veri tablosu
var veriTablosu = document.getElementById("veri-tablosu");
var veriSatirlari = document.getElementById("veri-satirlari");

// Depoları API'den almak için GET isteği gönderen fonksiyon
async function getDepolar() {
  try {
    const response = await fetch("http://127.0.0.1:8000/depolar/list");
    const data = await response.json();
    populateDepoSelect(data.depolar);
  } catch (error) {
    console.log("Hata:", error);
  }
}

// Depo seçimi combo box'larını dolduran fonksiyon
function populateDepoSelect(depolar) {
  depolar.forEach(function (depo) {
    var depoOption1 = document.createElement("option");
    depoOption1.value = depo.ware_house__id;
    depoOption1.textContent = depo.ware_house__name;
    depoSelect1.appendChild(depoOption1);

    var depoOption2 = document.createElement("option");
    depoOption2.value = depo.ware_house__id;
    depoOption2.textContent = depo.ware_house__name;
    depoSelect2.appendChild(depoOption2);

    var depoOption3 = document.createElement("option");
    depoOption3.value = depo.ware_house__id;
    depoOption3.textContent = depo.ware_house__name;
    depoSelect3.appendChild(depoOption3);

    var depoOption4 = document.createElement("option");
    depoOption4.value = depo.ware_house__id;
    depoOption4.textContent = depo.ware_house__name;
    depoSelect4.appendChild(depoOption4);

    var gdepoOption5 = document.createElement("option");
    gdepoOption5.value = depo.ware_house__id;
    gdepoOption5.textContent = depo.ware_house__name;
    gdepoSelect5.appendChild(gdepoOption5);

    var gdepoOption6 = document.createElement("option");
    gdepoOption6.value = depo.ware_house__id;
    gdepoOption6.textContent = depo.ware_house__name;
    gdepoSelect6.appendChild(gdepoOption6);

    var gdepoOption7 = document.createElement("option");
    gdepoOption7.value = depo.ware_house__id;
    gdepoOption7.textContent = depo.ware_house__name;
    gdepoSelect7.appendChild(gdepoOption7);

    var gdepoOption8 = document.createElement("option");
    gdepoOption8.value = depo.ware_house__id;
    gdepoOption8.textContent = depo.ware_house__name;
    gdepoSelect8.appendChild(gdepoOption8);
  });
}

// Veri tablosunu dolduran fonksiyon
function populateVeriTablosu(veri1, veri2, veri3, veri4,gveri5,gveri6,gveri7,gveri8) {
  veriSatirlari.innerHTML = "";

  
  for (var [ozellik, deger1] of Object.entries(veri1)) {
    var satir = document.createElement("tr");

    var ozellikHucresi = document.createElement("td");
    ozellikHucresi.textContent = ozellik;
    satir.appendChild(ozellikHucresi);

    var degerHucresi1 = document.createElement("td");
    degerHucresi1.textContent = deger1;
    satir.appendChild(degerHucresi1);

    var degerHucresi2 = document.createElement("td");
    degerHucresi2.textContent = veri2[ozellik] || ""; // İkinci veriyi kontrol et, eğer yoksa boş bırak
    satir.appendChild(degerHucresi2);

    var degerHucresi3 = document.createElement("td");
    degerHucresi3.textContent = veri3[ozellik] || ""; // Üçüncü veriyi kontrol et, eğer yoksa boş bırak
    satir.appendChild(degerHucresi3);

    var degerHucresi4 = document.createElement("td");
    degerHucresi4.textContent = veri4[ozellik] || ""; // Dördüncü veriyi kontrol et, eğer yoksa boş bırak
    satir.appendChild(degerHucresi4);

    // GEÇİŞ 1

    var gdegerHucresi5 = document.createElement("td");
    gdegerHucresi5.textContent = gveri5[ozellik] || "-"; // beşinci veriyi kontrol et, eğer yoksa boş bırak

    
    // icon
    if (parseFloat(gveri5[ozellik].replace("%", "").replace(",", ".")) > 0.00) {
      var icon = document.createElement("i");
      icon.classList.add("fa-solid", "fa-angles-up");
      icon.style.color="#46bb1b";
      icon.style.fontSize="23px";
      gdegerHucresi5.appendChild(icon);   

    }  else {
      console.log(gveri5[ozellik] , "hesap")
      if (gveri5[ozellik] == "%0,00") {

        console.log("veri 0'a eşit bişi yapmıyorum...")
        return;

      } else {

    
      var icon = document.createElement("i");
      icon.classList.add("fa-solid", "fa-angles-down");
      icon.style.color="#ce0909";
      icon.style.fontSize="23px";
      gdegerHucresi5.appendChild(icon);  

    }}   
  

    satir.appendChild(gdegerHucresi5);

    // GEÇİŞ 2 

    var gdegerHucresi6 = document.createElement("td");
    gdegerHucresi6.textContent = gveri6[ozellik] || "-"; // beşinci veriyi kontrol et, eğer yoksa boş bırak
    satir.appendChild(gdegerHucresi6);

    // icon
    if (gveri6[ozellik] > "%0.00") {
      var icon = document.createElement("i");
      icon.classList.add("fa-solid", "fa-angles-up");
      icon.style.color="#46bb1b";
      icon.style.fontSize="23px";
      gdegerHucresi6.appendChild(icon); 
    }
    else if(gveri6[ozellik] < "%0.00") {
      var icon = document.createElement("i");
      icon.classList.add("fa-solid", "fa-angles-down");
      icon.style.color="#ce0909";
      icon.style.fontSize="23px";
      gdegerHucresi6.appendChild(icon);  
    
    }

    veriSatirlari.appendChild(satir);

     // GEÇİŞ3 
  var gdegerHucresi7 = document.createElement("td");
  gdegerHucresi7.textContent = gveri7[ozellik] || "-"; // beşinci veriyi kontrol et, eğer yoksa boş bırak
  satir.appendChild(gdegerHucresi7);

    // icon
    if (gveri7[ozellik] > "%0.00") {
      var icon = document.createElement("i");
      icon.classList.add("fa-solid", "fa-angles-up");
      icon.style.color="#46bb1b";
      icon.style.fontSize="23px";
      gdegerHucresi7.appendChild(icon); 
    }
    else if(gveri7[ozellik] < "%0.00") {
      var icon = document.createElement("i");
      icon.classList.add("fa-solid", "fa-angles-down");
      icon.style.color="#ce0909";
      icon.style.fontSize="23px";
      gdegerHucresi7.appendChild(icon);  
    
    }

  veriSatirlari.appendChild(satir);

  
    // GEÇİŞ4 
    var gdegerHucresi8 = document.createElement("td");
    gdegerHucresi8.textContent = gveri8[ozellik] || "-"; // beşinci veriyi kontrol et, eğer yoksa boş bırak
    satir.appendChild(gdegerHucresi8);
  
      // icon
      if (gveri8[ozellik] > "%0.00") {
        var icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-angles-up");
        icon.style.color="#46bb1b";
        icon.style.fontSize="23px";
        gdegerHucresi8.appendChild(icon); 
      }
      else if(gveri8[ozellik] < "%0.00") {
        var icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-angles-down");
        icon.style.color="#ce0909";
        icon.style.fontSize="23px";
        gdegerHucresi8.appendChild(icon);  
      
      }
  
    veriSatirlari.appendChild(satir);


  }

}
// Depoları al ve combo box'ları doldur
getDepolar();

// Yılları API'den almak için GET isteği gönderen fonksiyon
async function getYillar(depoId, yilSelect) {
  var url = "http://127.0.0.1:8000/depolar/list?depoId=" + depoId;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const sortedYears = data.years.sort((a, b) => b - a);
    populateYilSelect(sortedYears, yilSelect);
  } catch (error) {
    console.log("Hata:", error);
  }
}

// Yıl seçimi combo box'larını dolduran fonksiyon
function populateYilSelect(yillar, yilSelect) {
  yilSelect.innerHTML = "";

  var defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Tümü";
  yilSelect.appendChild(defaultOption);

  yillar.forEach(function (yil) {
    var yilOption = document.createElement("option");
    yilOption.value = yil;
    yilOption.textContent = yil;
    yilSelect.appendChild(yilOption);
  });
}

// Ayları API'den almak için GET isteği gönderen fonksiyon
async function getAylar(depoId, aySelect) {
  var url = "http://127.0.0.1:8000/depolar/list?depoId=" + depoId;

  try {
    const response = await fetch(url);
    const data = await response.json();
    populateAySelect(data.months, aySelect);
  } catch (error) {
    console.log("Hata:", error);
  }
}

// Ay seçimi combo box'larını dolduran fonksiyon
function populateAySelect(aylar, aySelect) {
  aySelect.innerHTML = "";

  var defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Tümü";
  aySelect.appendChild(defaultOption);

  aylar.forEach(function (ay) {
    var ayOption = document.createElement("option");
    ayOption.value = ay;
    ayOption.textContent = getAyAdi(ay);
    aySelect.appendChild(ayOption);
  });
}

// Ay adını döndüren fonksiyon
function getAyAdi(ay) {
  var ayAdlari = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];
  return ayAdlari[ay - 1];
}

// Depo 1 seçimi değiştiğinde, yıl 1 seçimi değiştiğinde ve ay 1 seçimi değiştiğinde verileri al ve tabloyu güncelle
depoSelect1.addEventListener("change", async function () {
  gdepoSelect5.value=depoSelect1.value;
  await getYillar(depoSelect1.value, yilSelect1);
  await getAylar(depoSelect1.value, aySelect1);
  await getYillar(gdepoSelect5.value, gyilSelect5);
  await getAylar(gdepoSelect5.value, gaySelect5);
  await getVeriler();
});

yilSelect1.addEventListener("change", async function () {
  await getVeriler();
});

aySelect1.addEventListener("change", async function () {
  await getVeriler();
});

// Depo 2 seçimi değiştiğinde, yıl 2 seçimi değiştiğinde ve ay 2 seçimi değiştiğinde verileri al ve tabloyu güncelle
depoSelect2.addEventListener("change", async function () {
  gdepoSelect6.value=depoSelect2.value;
  await getYillar(depoSelect2.value, yilSelect2);
  await getAylar(depoSelect2.value, aySelect2);
  await getYillar(gdepoSelect6.value, gyilSelect6);
  await getAylar(gdepoSelect6.value, gaySelect6);
  await getVeriler();
});

yilSelect2.addEventListener("change", async function () {
  await getVeriler();
});

aySelect2.addEventListener("change", async function () {
  await getVeriler();
});

// Depo 3 seçimi değiştiğinde, yıl 3 seçimi değiştiğinde ve ay 3 seçimi değiştiğinde verileri al ve tabloyu güncelle
depoSelect3.addEventListener("change", async function () {
  gdepoSelect7.value=depoSelect3.value;
  await getYillar(depoSelect3.value, yilSelect3);
  await getAylar(depoSelect3.value, aySelect3);
  await getYillar(gdepoSelect7.value, gyilSelect7);
  await getAylar(gdepoSelect7.value, gaySelect7);
  await getVeriler();
});

yilSelect3.addEventListener("change", async function () {
  await getVeriler();
});

aySelect3.addEventListener("change", async function () {
  await getVeriler();
});

// Depo 4 seçimi değiştiğinde, yıl 4 seçimi değiştiğinde ve ay 4 seçimi değiştiğinde verileri al ve tabloyu güncelle
depoSelect4.addEventListener("change", async function () {
  gdepoSelect8.value=depoSelect4.value;
  await getYillar(depoSelect4.value, yilSelect4);
  await getAylar(depoSelect4.value, aySelect4);
  await getYillar(gdepoSelect8.value, gyilSelect8);
  await getAylar(gdepoSelect8.value, gaySelect8);
  await getVeriler();
});

yilSelect4.addEventListener("change", async function () {
  await getVeriler();
});

aySelect4.addEventListener("change", async function () {
  await getVeriler();
});

// GEÇİŞ Depo 5 seçimi değiştiğinde, GEÇİŞ yıl 5 seçimi değiştiğinde ve GEÇİŞ ay 5 seçimi değiştiğinde verileri al ve tabloyu güncelle
gdepoSelect5.addEventListener("change", async function () {
  depoSelect1.value=gdepoSelect5.value;
  await getYillar(gdepoSelect5.value, gyilSelect5);
  await getAylar(gdepoSelect5.value, gaySelect5);
  await getVeriler();
});

gyilSelect5.addEventListener("change", async function () {
  await getVeriler();
});

gaySelect5.addEventListener("change", async function () {
  await getVeriler();
});


// GEÇİŞ Depo 6 seçimi değiştiğinde, GEÇİŞ yıl 6 seçimi değiştiğinde ve GEÇİŞ ay 6 seçimi değiştiğinde verileri al ve tabloyu güncelle
gdepoSelect6.addEventListener("change", async function () {
  depoSelect2.value=gdepoSelect6.value;
  await getYillar(gdepoSelect6.value, gyilSelect6);
  await getAylar(gdepoSelect6.value, gaySelect6);
  await getVeriler();
});

gyilSelect6.addEventListener("change", async function () {
  await getVeriler();
});

gaySelect6.addEventListener("change", async function () {
  await getVeriler();
});

// GEÇİŞ Depo 7 seçimi değiştiğinde, GEÇİŞ yıl 7 seçimi değiştiğinde ve GEÇİŞ ay 7 seçimi değiştiğinde verileri al ve tabloyu güncelle
gdepoSelect7.addEventListener("change", async function () {
  depoSelect3.value=gdepoSelect7.value;
  await getYillar(gdepoSelect7.value, gyilSelect7);
  await getAylar(gdepoSelect7.value, gaySelect7);
  await getVeriler();
});

gyilSelect7.addEventListener("change", async function () {
  await getVeriler();
});

gaySelect7.addEventListener("change", async function () {
  await getVeriler();
});

// GEÇİŞ Depo 7 seçimi değiştiğinde, GEÇİŞ yıl 7 seçimi değiştiğinde ve GEÇİŞ ay 7 seçimi değiştiğinde verileri al ve tabloyu güncelle
gdepoSelect8.addEventListener("change", async function () {
  depoSelect4.value=gdepoSelect8.value;
  await getYillar(gdepoSelect8.value, gyilSelect8);
  await getAylar(gdepoSelect8.value, gaySelect8);
  await getVeriler();
});

gyilSelect8.addEventListener("change", async function () {
  await getVeriler();
});

gaySelect8.addEventListener("change", async function () {
  await getVeriler();
});



// Verileri API'den almak için GET isteği gönderen fonksiyon
async function getVeriler() {
  var secilenDepo1 = depoSelect1.value;
  var secilenYil1 = yilSelect1.value;
  var secilenAy1 = aySelect1.value;
  var url1 =
    "http://127.0.0.1:8000/depolar/inputdata/?ware_house=" + secilenDepo1;

  if (secilenYil1 !== "") {
    url1 += "&report_year=" + secilenYil1;
  }

  if (secilenAy1 !== "") {
    url1 += "&report_month=" + secilenAy1;
  }

  var secilenDepo2 = depoSelect2.value;
  var secilenYil2 = yilSelect2.value;
  var secilenAy2 = aySelect2.value;
  var url2 =
    "http://127.0.0.1:8000/depolar/inputdata/?ware_house=" + secilenDepo2;

  if (secilenYil2 !== "") {
    url2 += "&report_year=" + secilenYil2;
  }

  if (secilenAy2 !== "") {
    url2 += "&report_month=" + secilenAy2;
  }

  var secilenDepo3 = depoSelect3.value;
  var secilenYil3 = yilSelect3.value;
  var secilenAy3 = aySelect3.value;
  var url3 =
    "http://127.0.0.1:8000/depolar/inputdata/?ware_house=" + secilenDepo3;

  if (secilenYil3 !== "") {
    url3 += "&report_year=" + secilenYil3;
  }

  if (secilenAy3 !== "") {
    url3 += "&report_month=" + secilenAy3;
  }

  var secilenDepo4 = depoSelect4.value;
  var secilenYil4 = yilSelect4.value;
  var secilenAy4 = aySelect4.value;
  var url4 =
    "http://127.0.0.1:8000/depolar/inputdata/?ware_house=" + secilenDepo4;

  if (secilenYil4 !== "") {
    url4 += "&report_year=" + secilenYil4;
  }

  if (secilenAy4 !== "") {
    url4 += "&report_month=" + secilenAy4;
  }



  // GEÇİŞ
  var gsecilenDepo5 = gdepoSelect5.value;
  var gsecilenYil5 = gyilSelect5.value;
  var gsecilenAy5 = gaySelect5.value;
  var gurl5 =
    "http://127.0.0.1:8000/depolar/inputdata/?ware_house=" + gsecilenDepo5;

  if (gsecilenYil5 !== "") {
    gurl5 += "&report_year=" + gsecilenYil5;
  }

  if (gsecilenAy5 !== "") {
    gurl5 += "&report_month=" + gsecilenAy5;
  }

  var gsecilenDepo6 = gdepoSelect6.value;
  var gsecilenYil6 = gyilSelect6.value;
  var gsecilenAy6 = gaySelect6.value;
  var gurl6 =
    "http://127.0.0.1:8000/depolar/inputdata/?ware_house=" + gsecilenDepo6;

  if (gsecilenYil6 !== "") {
    gurl6 += "&report_year=" + gsecilenYil6;
  }

  if (gsecilenAy6 !== "") {
    gurl6 += "&report_month=" + gsecilenAy6;
  }

  var gsecilenDepo7 = gdepoSelect7.value;
  var gsecilenYil7 = gyilSelect7.value;
  var gsecilenAy7 = gaySelect7.value;
  var gurl7 =
    "http://127.0.0.1:8000/depolar/inputdata/?ware_house=" + gsecilenDepo7;

  if (gsecilenYil7 !== "") {
    gurl7 += "&report_year=" + gsecilenYil7;
  }

  if (gsecilenAy7 !== "") {
    gurl7 += "&report_month=" + gsecilenAy7;
  }

  var gsecilenDepo8 = gdepoSelect8.value;
  var gsecilenYil8 = gyilSelect8.value;
  var gsecilenAy8 = gaySelect8.value;
  var gurl8 =
    "http://127.0.0.1:8000/depolar/inputdata/?ware_house=" + gsecilenDepo8;

  if (gsecilenYil8 !== "") {
    gurl8 += "&report_year=" + gsecilenYil8;
  }

  if (gsecilenAy8 !== "") {
    gurl8 += "&report_month=" + gsecilenAy8;
  }
   
  

  try {
    const [data1, data2, data3, data4, gdata5, gdata6, gdata7, gdata8] = await Promise.all([
      fetch(url1).then((response) => response.json()),
      fetch(url2).then((response) => response.json()),
      fetch(url3).then((response) => response.json()),
      fetch(url4).then((response) => response.json()),
      fetch(gurl5).then((response) => response.json()),
      fetch(gurl6).then((response) => response.json()),
      fetch(gurl7).then((response) => response.json()),
      fetch(gurl8).then((response) => response.json()),
    ]);


    // data1 ve data5 arasındaki farkı hesapla ve temp nesnesine ata
    let gecis_data1={}

    for (let key in data1[0]) {
      let percentage = ((gdata5[0][key] - data1[0][key]) / gdata5[0][key]) * 100;
      gecis_data1[key] = "%" + percentage.toFixed(2).replace(".", ",") + " ";
      console.log(typeof(gecis_data1[key]), "selam")
      if (gecis_data1[key] === "%NaN") {
        gecis_data1[key] = "%0.00";
      }
    }

    let gecis_data2={}
    for (let key in data2[0]) {
      let percentage = ((gdata6[0][key] - data2[0][key]) / gdata6[0][key]) * 100;
      gecis_data2[key] = "%" + percentage.toFixed(2).replace(".", ",")+ " ";
      if (gecis_data2[key] === "%NaN") {
        gecis_data2[key] = "%0.00";
      }
    }


    let gecis_data3={}
    for (let key in data3[0]) {
      let percentage = ((gdata7[0][key] - data3[0][key]) / gdata7[0][key]) * 100;
      gecis_data3[key] = "%" + percentage.toFixed(2).replace(".", ",")+ " ";
      if (gecis_data3[key] === "%NaN") {
        gecis_data3[key] = "%0.00";
      }
    }

    let gecis_data4={}
    for (let key in data4[0]) {       
      let percentage = ((gdata8[0][key] - data4[0][key]) / gdata8[0][key]) * 100;    
      gecis_data4[key] = "%" + percentage.toFixed(2).replace(".", ",")+ " ";
      if (gecis_data4[key] === "%NaN") {
        gecis_data4[key] = "%0.00";
      }
    }

    populateVeriTablosu(data1[0], data2[0], data3[0], data4[0], gecis_data1, gecis_data2, gecis_data3, gecis_data4);
    
  } catch (error) {
    console.log("Hata:", error);
  }
  
}


// Tam ekran değişkeni ve işlevi
var fullscreen = false;

function tableFullscreen() {
  var tableContainer = document.getElementById("veri-tablosu");

  if (!fullscreen) {
    if (tableContainer.requestFullscreen) {
      tableContainer.requestFullscreen();
    } else if (tableContainer.mozRequestFullScreen) { // Firefox uyumluluğu
      tableContainer.mozRequestFullScreen();
    } else if (tableContainer.webkitRequestFullscreen) { // Chrome, Safari ve Opera uyumluluğu
      tableContainer.webkitRequestFullscreen();
    } else if (tableContainer.msRequestFullscreen) { // Internet Explorer uyumluluğu
      tableContainer.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  fullscreen = !fullscreen;
}

// Grafiği tıklamaya bağlama
var table1 = document.getElementById("veri-tablosu");

table1.addEventListener("click", function(event) {
  var now = new Date().getTime();
  if (table1.doubleClickTimeout && now - table1.doubleClickTimeout < 300) {
    tableFullscreen();
  } else {
    table1.doubleClickTimeout = now;
  }
});

// // Tam ekran düğmesini tıklamaya bağlama
// var fullscreenButton = document.getElementById("fullscreen-button");
// fullscreenButton.addEventListener("click", toggleFullscreen);  
