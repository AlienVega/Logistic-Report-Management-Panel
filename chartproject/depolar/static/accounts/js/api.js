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
    const response = await fetch("/depolar/list");
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
      if (gveri5[ozellik] == "%0,00") {

        
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

// Yılları API'den almak için GET isteği gönderen fonksiyon
async function getYillar(depoId, yilSelect) {
  var url = "/depolar/list?depoId=" + depoId;

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
  var url = "/depolar/list?depoId=" + depoId;

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
  // İlk depoyu seçili yap
  
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
    "/depolar/inputdata/?ware_house=" + secilenDepo1;

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
    "/depolar/inputdata/?ware_house=" + secilenDepo2;

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
    "/depolar/inputdata/?ware_house=" + secilenDepo3;

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
    "/depolar/inputdata/?ware_house=" + secilenDepo4;

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
    "/depolar/inputdata/?ware_house=" + gsecilenDepo5;

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
    "/depolar/inputdata/?ware_house=" + gsecilenDepo6;

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
    "/depolar/inputdata/?ware_house=" + gsecilenDepo7;

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
    "/depolar/inputdata/?ware_house=" + gsecilenDepo8;

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
    let gecis_data1={};
    let ozetdata1={};
    for (let key in data1[0]) {
      let percentage = ((gdata5[0][key] - data1[0][key]) / data1[0][key]) * 100;
      gecis_data1[key] = "%" + percentage.toFixed(2).replace(".", ",") + " ";

      if (gecis_data1[key] === "%NaN") {
        gecis_data1[key] = "%0.00";
      }
      ozetdata1[key] = gdata5[0][key];
    }

    let gecis_data2={}
    let ozetdata2={};
    for (let key in data2[0]) {
      let percentage = ((gdata6[0][key] - data2[0][key]) / data2[0][key]) * 100;
      gecis_data2[key] = "%" + percentage.toFixed(2).replace(".", ",")+ " ";
      if (gecis_data2[key] === "%NaN") {
        gecis_data2[key] = "%0.00";
      }
      ozetdata2[key] = gdata6[0][key];
    }

    let gecis_data3={}
    let ozetdata3={};
    for (let key in data3[0]) {
      let percentage = ((gdata7[0][key] - data3[0][key]) / data3[0][key]) * 100;
      gecis_data3[key] = "%" + percentage.toFixed(2).replace(".", ",")+ " ";
      if (gecis_data3[key] === "%NaN") {
        gecis_data3[key] = "%0.00";
      }
      ozetdata3[key]=gdata7[0][key];
    }

    let gecis_data4={}
    let ozetdata4={};
    for (let key in data4[0]) {       
      let percentage = ((gdata8[0][key] - data4[0][key]) / data4[0][key]) * 100;

      gecis_data4[key] = "%" + percentage.toFixed(2).replace(".", ",")+ " ";
      if (gecis_data4[key] === "%NaN") {
        gecis_data4[key] = "%0.00";
      }
      ozetdata4[key]=gdata8[0][key];

    }

    populateVeriTablosu(data1[0], data2[0], data3[0], data4[0], gecis_data1, gecis_data2, gecis_data3, gecis_data4);

    
// Tablo gragik çalıştırıcı fonksiyon 

    function goSummary(){
      // LOCALSTROGE DEPOLAMA İŞLEMİ ÖZET SAYFA İÇİN YAPILANACAK  
      // ilk depo verilerini depola
      for (const key in data1[0]) {
        if (data1[0].hasOwnProperty(key)) {
          const value = data1[0][key];
          localStorage.setItem("data_" + key, JSON.stringify(value));
        }
      }
      // ilk geçişleri depola 
      for (const key in ozetdata1) {
        if (ozetdata1.hasOwnProperty(key)) {
          const value = ozetdata1[key];
          localStorage.setItem("percentage_" + key, JSON.stringify(value));
        }
      }

      // ikinci depo verilerini depola
      for (const key in data2[0]) {
        if (data2[0].hasOwnProperty(key)) {
          const value = data2[0][key];
          localStorage.setItem("data_2" + key, JSON.stringify(value));
        }
      }
      // ikinci geçişleri depola 
      for (const key in ozetdata2) {
        if (ozetdata2.hasOwnProperty(key)) {
          const value = ozetdata2[key];
          localStorage.setItem("percentage_2" + key, JSON.stringify(value));
        }
      }

      // üçüncü depo verilerini depola
      for (const key in data3[0]) {
        if (data3[0].hasOwnProperty(key)) {
          const value = data3[0][key];
          localStorage.setItem("data_3" + key, JSON.stringify(value));
        }
      }
      // üçüncü geçişleri depola 
      for (const key in ozetdata3) {
        if (ozetdata3.hasOwnProperty(key)) {
          const value = ozetdata3[key];
          localStorage.setItem("percentage_3" + key, JSON.stringify(value));
        }
      }

      // dördüncü depo verilerini depola
      for (const key in data4[0]) {
        if (data4[0].hasOwnProperty(key)) {
          const value = data4[0][key];
          localStorage.setItem("data_4" + key, JSON.stringify(value));
        }
      }
      // dördüncü geçişleri depola 
      for (const key in ozetdata4) {
        if (ozetdata4.hasOwnProperty(key)) {
          const value = ozetdata4[key];
          localStorage.setItem("percentage_4" + key, JSON.stringify(value));
        }
      }

    // Verileri localStorage'dan çekmek ve ayrıştırmak
    // ilkdepo verilerini çekmek
      const labelArray1 = [];
      const dataValue1=[];
      for (const key in data1[0]) {
        if (localStorage.getItem("data_" + key)) {
          const value = JSON.parse(localStorage.getItem("data_" + key));
          labelArray1.push(key);
          dataValue1.push(value);
        }
      }    
     //  ilk geçişleri çekmek
     const gecis1Values = [];
      for (const key in ozetdata1) {
        if (localStorage.getItem("percentage_" + key)) {
          const value = JSON.parse(localStorage.getItem("percentage_" + key));
          gecis1Values.push(value);
        }
      }
      // ikinci depo verilerini çekmek
      const labelArray2 = [];
      const dataValue2=[];
      for (const key in data2[0]) {
        if (localStorage.getItem("data_2" + key)) {
          const value = JSON.parse(localStorage.getItem("data_2" + key));
          labelArray2.push(key);
          dataValue2.push(value);
        }
        
      }   
     //  ikinci geçişleri çekmek
     const gecis2Values2 = [];
      for (const key in ozetdata2) {
        if (localStorage.getItem("percentage_2" + key)) {
          const value = JSON.parse(localStorage.getItem("percentage_2" + key));
          gecis2Values2.push(value);
        }
      }
      // üçüncü depo verilerini çekmek
      const labelArray3 = [];
      const dataValue3=[];
      for (const key in data3[0]) {
        if (localStorage.getItem("data_3" + key)) {
          const value = JSON.parse(localStorage.getItem("data_3" + key));
          labelArray3.push(key);
          dataValue3.push(value);
        }
        
      }   
     //  üçüncü geçişleri çekmek
     const gecis3Values3 = [];
      for (const key in ozetdata3) {
        if (localStorage.getItem("percentage_3" + key)) {
          const value = JSON.parse(localStorage.getItem("percentage_3" + key));
          gecis3Values3.push(value);
        }
      }


      // dördüncü depo verilerini çekmek
      const labelArray4 = [];
      const dataValue4=[];
      for (const key in data4[0]) {
        if (localStorage.getItem("data_4" + key)) {
          const value = JSON.parse(localStorage.getItem("data_4" + key));
          labelArray4.push(key);
          dataValue4.push(value);
        }
        
      }   
     //  dördüncü geçişleri çekmek
     const gecis4Values4 = [];
      for (const key in ozetdata4) {
        if (localStorage.getItem("percentage_4" + key)) {
          const value = JSON.parse(localStorage.getItem("percentage_4" + key));
          gecis4Values4.push(value);
        }
      }

      // verileri grafiğe bastıran fonksiyonlar
      depo1(labelArray1,dataValue1,gecis1Values);
      depo2(labelArray2,dataValue2,gecis2Values2);
      depo3(labelArray3,dataValue3,gecis3Values3);
      depo4(labelArray4,dataValue4,gecis4Values4);

    }

    const report_run=document.getElementById("report-run");
    report_run.addEventListener("click",function(){
        depo1();
        depo2();
        depo3();
        depo4();
        goSummary();
        removeClass();
    });

    // TABLE/RAPOR ÖZET
    // ÖZET DEPO1 GRAFİK
    function depo1(labels,dataValue1,gecis1Values){
      const selectedDepoIndex = depoSelect1.selectedIndex;
      const selectedDepoName = depoSelect1.options[selectedDepoIndex].text;
      const selectedYearIndex = gyilSelect5.selectedIndex;
      const selectedYearName = gyilSelect5.options[selectedYearIndex].text;
      const data = {
        labels:labels,
        datasets: [{
          type: 'bar',
          label: selectedDepoName,
          data:dataValue1,
          borderColor: 'rgba(255, 99, 132, 0.2)',
          backgroundColor: 'rgba(255, 255, 0, 0.2)' // Sarı renk
        }, {
          type: 'scatter',
          label: "Geçiş /" + selectedYearName,
          data:gecis1Values,
          fill: false,
          showLine: true,
          borderColor: 'rgb(54, 162, 235)'
        }]
      };
      
      const config = {
        type: 'scatter', // Change to the appropriate type for mixed chart
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            title: {
              display: true,
              text: selectedDepoName + "/"+ "GEÇİŞ " + selectedYearName,
              font: {
                size: 24, // Metin boyutu burada belirtiliyor
                weight: "bold", // Metin ağırlığı (normal, bold, 600, 700 vb.)
              },
            }
            }
        }
      };

      var previousChart1 = Chart.getChart("myChart-ozet1");
        if (previousChart1) {
          previousChart1.destroy();
        }

      var ctxozet = document.getElementById('myChart-ozet1').getContext('2d');
        const myChartOzet = new Chart(ctxozet, config);
      }
    // ÖZET DEPO2 GRAFİK
    function depo2(labels2,dataValue2,gecis2Values2){
      const selectedDepoIndex2 = depoSelect2.selectedIndex;
      const selectedDepoName2 = depoSelect2.options[selectedDepoIndex2].text;
      const selectedYearIndex2 = gyilSelect6.selectedIndex;
      const selectedYearName2 = gyilSelect6.options[selectedYearIndex2].text;
      
      const data = {
        labels:labels2,
        datasets: [{
          type: 'bar',
          label: selectedDepoName2,
          data:dataValue2,
          borderColor: 'rgba(255, 99, 132, 0.2)',
          backgroundColor: 'rgba(255, 255, 0, 0.2)' // Sarı renk
        }, {
          type: 'scatter',
          label: "Geçiş /" + selectedYearName2,
          data:gecis2Values2,
          fill: false,
          showLine: true,
          borderColor: 'rgb(54, 162, 235)'
        }]
      };
      
      const config = {
        type: 'scatter', // Change to the appropriate type for mixed chart
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            title: {
              display: true,
              text: selectedDepoName2 + "/"+ "GEÇİŞ " + selectedYearName2,
              font: {
                size: 24, // Metin boyutu burada belirtiliyor
                weight: "bold", // Metin ağırlığı (normal, bold, 600, 700 vb.)
              },
            }
            }
        }
      };

      var previousChart2 = Chart.getChart("myChart-ozet2");
        if (previousChart2) {
          previousChart2.destroy();
        }

      var ctxozet2 = document.getElementById('myChart-ozet2').getContext('2d');
        const myChartOzet2 = new Chart(ctxozet2, config);
      }
    // ÖZET DEPO3 GRAFİK
    function depo3(labels3,dataValue3,gecis3Values3){
      const selectedDepoIndex3 = depoSelect3.selectedIndex;
      const selectedDepoName3 = depoSelect3.options[selectedDepoIndex3].text;
      const selectedYearIndex3 = gyilSelect7.selectedIndex;
      const selectedYearName3 = gyilSelect7.options[selectedYearIndex3].text;
      
      const data = {
        labels:labels3,
        datasets: [{
          type: 'bar',
          label: selectedDepoName3,
          data:dataValue3,
          borderColor: 'rgba(255, 99, 132, 0.2)',
          backgroundColor: 'rgba(255, 255, 0, 0.2)' // Sarı renk
        }, {
          type: 'scatter',
          label: "Geçiş /" + selectedYearName3,
          data:gecis3Values3,
          fill: false,
          showLine: true,
          borderColor: 'rgb(54, 162, 235)'
        }]
      };
      
      const config = {
        type: 'scatter', // Change to the appropriate type for mixed chart
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            title: {
              display: true,
              text: selectedDepoName3 + "/"+ "GEÇİŞ " + selectedYearName3,
              font: {
                size: 24, // Metin boyutu burada belirtiliyor
                weight: "bold", // Metin ağırlığı (normal, bold, 600, 700 vb.)
              },
            }
            }
        }
      };

      var previousChart3 = Chart.getChart("myChart-ozet3");
        if (previousChart3) {
          previousChart3.destroy();
        }

      var ctxozet3 = document.getElementById('myChart-ozet3').getContext('2d');
        const myChartOzet3 = new Chart(ctxozet3, config);
      }
    // ÖZET DEPO4 GRAFİK
    function depo4(labels4,dataValue4,gecis4Values4){
      const selectedDepoIndex4 = depoSelect4.selectedIndex;
      const selectedDepoName4 = depoSelect4.options[selectedDepoIndex4].text;
      const selectedYearIndex4 = gyilSelect8.selectedIndex;
      const selectedYearName4 = gyilSelect8.options[selectedYearIndex4].text;
      
      const data = {
        labels:labels4,
        datasets: [{
          type: 'bar',
          label: selectedDepoName4,
          data:dataValue4,
          borderColor: 'rgba(255, 99, 132, 0.2)',
          backgroundColor: 'rgba(255, 255, 0, 0.2)' // Sarı renk
        }, {
          type: 'scatter',
          label: "Geçiş /" + selectedYearName4,
          data:gecis4Values4,
          fill: false,
          showLine: true,
          borderColor: 'rgb(54, 162, 235)'
        }]
      };
      
      const config = {
        type: 'scatter', // Change to the appropriate type for mixed chart
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            title: {
              display: true,
              text: selectedDepoName4 + "/"+ "GEÇİŞ " + selectedYearName4,
              font: {
                size: 24, // Metin boyutu burada belirtiliyor
                weight: "bold", // Metin ağırlığı (normal, bold, 600, 700 vb.)
              },
            }
            }
        }
      };

      var previousChart4 = Chart.getChart("myChart-ozet4");
        if (previousChart4) {
          previousChart4.destroy();
        }

      var ctxozet4 = document.getElementById('myChart-ozet4').getContext('2d');
        const myChartOzet4 = new Chart(ctxozet4, config);
      }
    function removeClass(){
      const ozetContainer = document.getElementById("ozet-container");
      ozetContainer.classList.remove("d-none");
    }
    
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

// Sayfa yüklendiğinde depoları seçili yap.
window.addEventListener("load", async function () {
  // Depoları çek ve ilk depoyu seçili yap
  await getDepolar();

  // data1 ilk depo seçili yap
  // İlk depoyu seçili yap
  if (depoSelect1.options.length > 0) {
    depoSelect1.value = depoSelect1.options[0].value;
    gdepoSelect5.value = depoSelect1.value;
  }

  // data2 ikinci depo seçili yap
  // ikinci depoyu seçili yap
  if (depoSelect2.options.length > 0) {
    depoSelect2.value = depoSelect2.options[1].value;
    gdepoSelect6.value = depoSelect2.value;
  }

  // data3 üçüncü depo seçili yap
  // üçüncü depoyu seçili yap
  if (depoSelect3.options.length > 0) {
    depoSelect3.value = depoSelect3.options[2].value;
    gdepoSelect7.value = depoSelect3.value;
  }

  // data4 dördüncü depo seçili yap
  // dördüncü depoyu seçili yap
  if (depoSelect4.options.length > 0) {
    depoSelect4.value = depoSelect4.options[3].value;
    gdepoSelect8.value = depoSelect4.value;
  }

  // data1 ilk depo
  // Yılları ve ayları güncelle
  await getYillar(depoSelect1.value, yilSelect1);
  await getAylar(depoSelect1.value, aySelect1);
  await getYillar(gdepoSelect5.value, gyilSelect5);
  await getAylar(gdepoSelect5.value, gaySelect5);

  // data2 ikinci depo
  // Yılları ve ayları güncelle
  await getYillar(depoSelect2.value, yilSelect2);
  await getAylar(depoSelect2.value, aySelect2);
  await getYillar(gdepoSelect6.value, gyilSelect6);
  await getAylar(gdepoSelect6.value, gaySelect6);

  // data3 üçüncü depo
  // Yılları ve ayları güncelle
  await getYillar(depoSelect3.value, yilSelect3);
  await getAylar(depoSelect3.value, aySelect3);
  await getYillar(gdepoSelect7.value, gyilSelect7);
  await getAylar(gdepoSelect7.value, gaySelect7);

   // data4 dördüncü depo
  // Yılları ve ayları güncelle
  await getYillar(depoSelect4.value, yilSelect4);
  await getAylar(depoSelect4.value, aySelect4);
  await getYillar(gdepoSelect8.value, gyilSelect8);
  await getAylar(gdepoSelect8.value, gaySelect8);

  // Verileri güncelle
  await getVeriler();
});

var fullscreen = false;
function toggleFullscreen(element) {
  if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
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
}
// ÖZET GRAFİK İÇİN TAM EKRAN 
// fullscreen-button4 için tıklama işlemini tanımlama
var fullscreenButton4 = document.getElementById("fullscreen-button4");

fullscreenButton4.addEventListener("click", function() {
  var carouselElement = document.getElementById("ozet-container");
  toggleFullscreen(carouselElement);
});

