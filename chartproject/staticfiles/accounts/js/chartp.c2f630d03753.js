// CHART1

document.addEventListener('DOMContentLoaded', function() {
  const yearSelect = document.getElementById('year-select');
  const ctx = document.getElementById('myChart').getContext('2d');
  let chart;
  
  function getYears() {
    fetch('/depolar/list/') // Yılları almak için doğru API endpointini ayarlayın
    .then(response => response.json())
    .then(data => {
      const years = data.years;
      
      // Yılları yeni yıldan eski yıla doğru sırala
      years.sort((a, b) => b - a);		

      years.forEach(year => {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      yearSelect.appendChild(option);
      });
  
      // İlk yılı seçili olarak ayarlayın ve grafik oluşturun
     
      fetch(`/depolar/depolartotal/`) // Verileri almak için doğru API endpointini ayarlayın
      .then(response => response.json())
      .then(data => {
        createChart(data);
      })
      .catch(error => {
        console.error('Veriler alınamadı:', error);
      });
    })
    .catch(error => {
      console.error('Yıllar alınamadı:', error);
    });
  }
  
  function createChart(data) {
    const depolar = data.aggregate_data;
  
    // xValues'i ayarlayın
    var xValues = Object.keys(depolar[0].data);
  
    // datasets'i oluşturun
    var datasets = depolar.map(depo => ({
    label: depo.label,
    data: Object.values(depo.data),
    borderWidth: 4
    }));
  
    // Grafik oluşturun
    if (chart) {
    chart.destroy(); // Önceki grafik varsa yok edin
    }
  
    chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: xValues,
      datasets: datasets
    },
    options: {
      scales: {
      y: {
        beginAtZero: true,
        responsive: true,
        maintainAspectRatio: false
      }
      },
      plugins: {
      title: {
        display: true,
        text: 'YILLIK DEPO / RAPOR',
        font: {
          size: 24, // Metin boyutu burada belirtiliyor
          weight: "bold", // Metin ağırlığı (normal, bold, 600, 700 vb.)
        },
      }
      }
    }
    });
  
  }
  
  // Sayfa yüklendiğinde tüm verileri al ve grafik oluştur
  fetch('/depolar/depolartotal/') // Tüm verileri almak için doğru API endpointini ayarlayın
    .then(response => response.json())
    .then(data => {
    createChart(data);
    })
    .catch(error => {
    console.error('Veriler alınamadı:', error);
    });
  
  // Yıl seçimi değiştiğinde çalışacak fonksiyon
  yearSelect.addEventListener('change', function() {
    const selectedYear = this.value;
  
    fetch(`/depolar/depolartotal/?report_year=${selectedYear}`) // Verileri almak için doğru API endpointini ayarlayın
    .then(response => response.json())
    .then(data => {
      createChart(data);
    })
    .catch(error => {
      console.error('Veriler alınamadı:', error);
    });
  });
  
  // Sayfa yüklendiğinde yılları al ve seçenekleri doldur
  getYears();
  });

// Tam ekran değişkeni ve işlevi
var fullscreen = false;

function toggleFullscreen() {
  var chartContainer = document.getElementById("chart-container");

  if (!fullscreen) {
    if (chartContainer.requestFullscreen) {
      chartContainer.requestFullscreen();
    } else if (chartContainer.mozRequestFullScreen) { // Firefox uyumluluğu
      chartContainer.mozRequestFullScreen();
    } else if (chartContainer.webkitRequestFullscreen) { // Chrome, Safari ve Opera uyumluluğu
      chartContainer.webkitRequestFullscreen();
    } else if (chartContainer.msRequestFullscreen) { // Internet Explorer uyumluluğu
      chartContainer.msRequestFullscreen();
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
var chart = document.getElementById("myChart");

chart.addEventListener("click", function(event) {
  var now = new Date().getTime();
  if (chart.doubleClickTimeout && now - chart.doubleClickTimeout < 300) {
    toggleFullscreen();
  } else {
    chart.doubleClickTimeout = now;
  }
});

// Tam ekran düğmesini tıklamaya bağlama
var fullscreenButton = document.getElementById("fullscreen-button");
fullscreenButton.addEventListener("click", toggleFullscreen);  



// CHART2
const ctx2 = document.getElementById("myChart2");

new Chart(ctx2, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        responsive: true,
        maintainAspectRatio: false,
      },
    },
  },
});
// chart3
document.addEventListener("DOMContentLoaded", function () {
  const ctx3 = document.getElementById("myChart3").getContext("2d");
  const labels = [
    "OCAK",
    "ŞUBAT",
    "MART",
    "NİSAN",
    "MAYIS",
    "HAZİRAN",
    "TEMMUZ",
    "AĞUSTOS",
    "EYLÜL",
    "EKİM",
    "KASIM",
    "ARALIK",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "TORBALI DEPO",
        data: [
          516, 2536, 1563, 1953, 2563, 900, 1953, 879, 900, 1953, 265, 900,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
      },
    ],
  };
  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  new Chart(ctx3, config);
});

// CHART4
// document.addEventListener("DOMContentLoaded", function () {
//   const yearselect4 = document.getElementById("year-select4");
//   const ctx4 = document.getElementById("myChart4").getContext("2d");
  
//   function getYears4() {
//     fetch('/depolar/list/') // Yılları almak için doğru API endpointini ayarlayın
//     .then(response => response.json())
//     .then(data => {
//       const years = data.years;
//       // Yılları yeni yıldan eski yıla doğru sırala
//       years.sort((a, b) => b - a);		

//       years.forEach(year => {
//       const option = document.createElement('option');
//       option.value = year;
//       option.textContent = year;
//       yearselect4.appendChild(option);
//       });

//     }) 
//   }
//   getYears4() 

//   // API'den başlık adlarını almak için AJAX isteği yapalım
//   function getHeaders(){
//     // API'den verileri almak için AJAX isteği yapalım
//   fetch('/depolar/warehouse_totals/')  // API URL'ini buraya ekleyin
//   .then(response => response.json())
//     .then(data => {
//       const selectBox = document.getElementById('header4');

//       // Komboboxı temizleyelim
//       selectBox.innerHTML = '';

//       // API yanıtını inceleyelim ve başlık adlarını dolduralım
//       const headers = [];
//       data.forEach(item => {
//         if (!headers.includes(item.header)) {
//           headers.push(item.header);
//         }
//       });

//       // Her başlık adı için bir option öğesi oluşturalım ve komboboxa ekleyelim
//       headers.forEach(header => {
//         const option = document.createElement('option');
//         option.value = header;
//         option.textContent = header;
//         selectBox.appendChild(option);
//       });
//     })
//     .catch(error => console.error('API isteği sırasında bir hata oluştu:', error));

//   }
//   getHeaders()

//   const labels = [
//     "OCAK",
//     "ŞUBAT",
//     "MART",
//     "NİSAN",
//     "MAYIS",
//     "HAZİRAN",
//     "TEMMUZ",
//     "AĞUSTOS",
//     "EYLÜL",
//     "EKİM",
//     "KASIM",
//     "ARALIK",
//   ];
//   const data = {
//     labels: labels,
//     datasets: [
//       {
//         axis: "y",
//         label: "TORBALI DEPO",
//         data: [
//           454, 1002.356, 265.32, 1250.365, 1250.36, 352.36, 125, 1232.26,
//           256.365, 253.352, 253.625, 15, 536.325, 1253.235, 2544.35,
//         ],
//         fill: false,
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.2)",
//           "rgba(255, 159, 64, 0.2)",
//           "rgba(255, 205, 86, 0.2)",
//           "rgba(75, 192, 192, 0.2)",
//           "rgba(54, 162, 235, 0.2)",
//           "rgba(153, 102, 255, 0.2)",
//           "rgba(201, 203, 207, 0.2)",
//         ],
//         borderColor: [
//           "rgb(255, 99, 132)",
//           "rgb(255, 159, 64)",
//           "rgb(255, 205, 86)",
//           "rgb(75, 192, 192)",
//           "rgb(54, 162, 235)",
//           "rgb(153, 102, 255)",
//           "rgb(201, 203, 207)",
//         ],
//         borderWidth: 1,
//       },
//       {
//         axis: "y",
//         label: "MUĞLA DEPO",
//         data: [
//           1502, 2133.266, 265.32, 1250.365, 1250.36, 2562, 15, 1232.26, 256.365,
//           253.352, 253.625, 2536.32, 536.325, 1253.235, 2544.35,
//         ],
//         fill: false,
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.2)",
//           "rgba(255, 159, 64, 0.2)",
//           "rgba(255, 205, 86, 0.2)",
//           "rgba(75, 192, 192, 0.2)",
//           "rgba(54, 162, 235, 0.2)",
//           "rgba(153, 102, 255, 0.2)",
//           "rgba(201, 203, 207, 0.2)",
//         ],
//         borderColor: [
//           "rgb(255, 99, 132)",
//           "rgb(255, 159, 64)",
//           "rgb(255, 205, 86)",
//           "rgb(75, 192, 192)",
//           "rgb(54, 162, 235)",
//           "rgb(153, 102, 255)",
//           "rgb(201, 203, 207)",
//         ],
//       },
//       {
//         axis: "y",
//         label: "MİGET DEPO",
//         data: [
//           1250.365, 1250.365, 1250.365, 1250.36, 1250.36, 1250.36, 1594, 34,
//           2562, 1254.001, 1254.001, 1254.001,
//         ],
//         fill: false,
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.2)",
//           "rgba(255, 159, 64, 0.2)",
//           "rgba(255, 205, 86, 0.2)",
//           "rgba(75, 192, 192, 0.2)",
//           "rgba(54, 162, 235, 0.2)",
//           "rgba(153, 102, 255, 0.2)",
//           "rgba(201, 203, 207, 0.2)",
//         ],
//         borderColor: [
//           "rgb(255, 99, 132)",
//           "rgb(255, 159, 64)",
//           "rgb(255, 205, 86)",
//           "rgb(75, 192, 192)",
//           "rgb(54, 162, 235)",
//           "rgb(153, 102, 255)",
//           "rgb(201, 203, 207)",
//         ],
//       },
//       {
//         axis: "y",
//         label: "KEMALPAŞA DEPO",
//         data: [
//           1234.0, 1254.26, 1524.62, 3658.65, 1234.0, 1254.26, 2500.62, 1536.31,
//           235.65, 1220.65, 1536.31,
//         ],
//         fill: false,
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.2)",
//           "rgba(255, 159, 64, 0.2)",
//           "rgba(255, 205, 86, 0.2)",
//           "rgba(75, 192, 192, 0.2)",
//           "rgba(54, 162, 235, 0.2)",
//           "rgba(153, 102, 255, 0.2)",
//           "rgba(201, 203, 207, 0.2)",
//         ],
//         borderColor: [
//           "rgb(255, 99, 132)",
//           "rgb(255, 159, 64)",
//           "rgb(255, 205, 86)",
//           "rgb(75, 192, 192)",
//           "rgb(54, 162, 235)",
//           "rgb(153, 102, 255)",
//           "rgb(201, 203, 207)",
//         ],
//       },
//     ],
//   };

//   const config = {
//     type: "line",
//     data: data,
//     options: {
//       responsive: true,
//       plugins: {
//         legend: {
//           position: "top",
//         },
//         title: {
//           display: true,
//           text: "AYLIK BAZ DEPO PERFORMANS/RAPOR",
//           font: {
//             size: 18, // Metin boyutu burada belirtiliyor
//             weight: "bold", // Metin ağırlığı (normal, bold, 600, 700 vb.)
//           },
//         },
//       },
//     },
//   };

//   // Canvas elementini seçin ve grafiği oluşturun
//   const chart = new Chart(ctx4, config);

//   const chartContainer4 = document.getElementById("chart-container4");
//   chartContainer4.addEventListener("dblclick", function () {
//     if (chartContainer4.requestFullscreen) {
//       chartContainer4.requestFullscreen();
//     } else if (chartContainer4.mozRequestFullScreen) {
//       chartContainer4.mozRequestFullScreen();
//     } else if (chartContainer4.webkitRequestFullscreen) {
//       chartContainer4.webkitRequestFullscreen();
//     } else if (chartContainer4.msRequestFullscreen) {
//       chartContainer4.msRequestFullscreen();
//     }
//   });
// });

// chart4-deneme
// document.addEventListener("DOMContentLoaded", function () {
//   const yearselect4 = document.getElementById("year-select4");
//   const headerSelect = document.getElementById("header4");
//   const ctx4 = document.getElementById("myChart4").getContext("2d");

//   let data; // Verileri saklayacağımız değişken

//   function getYears4() {
//     fetch('/depolar/list/') // Yılları almak için doğru API endpointini ayarlayın
//       .then(response => response.json())
//       .then(data => {
//         const years = data.years;
//         // Yılları yeni yıldan eski yıla doğru sırala
//         years.sort((a, b) => b - a);

//         years.forEach(year => {
//           const option = document.createElement('option');
//           option.value = year;
//           option.textContent = year;
//           yearselect4.appendChild(option);
//         });
//       }) 
//       .catch(error => console.error('API isteği sırasında bir hata oluştu:', error));
//   }
  
//   // API'den başlık adlarını almak için AJAX isteği yapalım
//   function getHeaders() {
//     fetch('/depolar/warehouse_totals/') // API URL'sini buraya ekleyin
//       .then(response => response.json())
//       .then(data => {
//         const selectBox = document.getElementById('header4');
//         // Komboboxı temizleyelim
//         selectBox.innerHTML = '';
//         // API yanıtını inceleyelim ve başlık adlarını dolduralım
//         const headers = [];
//         data.forEach(item => {
//           if (!headers.includes(item.header)) {
//             headers.push(item.header);
//           }
//         });
//         // Her başlık adı için bir option öğesi oluşturalım ve komboboxa ekleyelim
//         headers.forEach(header => {
//           const option = document.createElement('option');
//           option.value = header;
//           option.textContent = header;
//           selectBox.appendChild(option);
//         });
//       })
//       .catch(error => console.error('API isteği sırasında bir hata oluştu:', error));
//   }
  
//   getYears4();
//   getHeaders();
  
//   const labels = [
//     "OCAK", "ŞUBAT", "MART", "NİSAN", "MAYIS", "HAZİRAN", "TEMMUZ",
//     "AĞUSTOS", "EYLÜL", "EKİM", "KASIM", "ARALIK"
//   ];

//   let chart;
//   let allData; // Tüm verileri saklayacağımız değişken
  
//   function getWarehouseData() {
//     const selectedYear = yearselect4.value;
//     const selectedHeader = headerSelect.value;
  
//     // Verileri API'den çekmek için uygun endpoint'i ve parametreleri ayarlayın
//     const url = '/depolar/warehouse_totals/';
//     const params = new URLSearchParams({
//       report_year: selectedYear,
//     });
  
//     fetch(`${url}?${params}`)
//       .then(response => response.json())
//       .then(apiData => {
//         allData = apiData; // API'den alınan tüm verileri allData değişkenine saklayın
//         const filteredData = allData.filter(item => item.header === selectedHeader); // Sadece başlığa göre filtreleme
//         updateChartData(selectedYear, selectedHeader, filteredData);
//       })
//       .catch(error => console.error('API isteği sırasında bir hata oluştu:', error));
//   }
  
//   function updateChartData(selectedYear, selectedHeader, filteredData) {
//     const labels = [
//       "OCAK", "ŞUBAT", "MART", "NİSAN", "MAYIS", "HAZİRAN", "TEMMUZ",
//       "AĞUSTOS", "EYLÜL", "EKİM", "KASIM", "ARALIK"
//     ];
  
//     if (!filteredData || filteredData.length === 0) {
//       // Filtrelenmiş veri yoksa grafiği temizle
//       chart.data.labels = labels;
//       chart.data.datasets = [];
//       chart.update();
//       return;
//     }
  
//     const datasets = [];
//     const depoLabels = Object.keys(filteredData[0].depolar); // Depo isimlerini alın
  
//     // Tüm depolar için veri setleri oluşturun
//     depoLabels.forEach(depo => {
//       const dataset = {
//         label: depo,
//         data: filteredData.map(item => item.depolar[depo] || 0),
//         fill: false,
//         backgroundColor: getRandomColor(),
//         borderColor: getRandomColor(),
//         borderWidth: 3,
//       };
//       datasets.push(dataset);
//     });
  
//     // Grafiği güncelleyin
//     chart.data.labels = labels;
//     chart.data.datasets = datasets;
//     chart.update();
//   }

//   // Canvas elementini seçin ve grafiği oluşturun
//   chart = new Chart(ctx4, {
//     type: "line",
//     data: {
//       labels: labels,
//       datasets: []
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: {
//           position: "top",
//         },
//         title: {
//           display: true,
//           text: "AYLIK BAZ DEPO PERFORMANS/RAPOR",
//           font: {
//             size: 18, // Metin boyutu burada belirtiliyor
//             weight: "bold", // Metin ağırlığı (normal, bold, 600, 700 vb.)
//           },
//         },
//       },
//     },
//   });

//   const chartContainer4 = document.getElementById("chart-container4");
//   chartContainer4.addEventListener("dblclick", function () {
//     if (chartContainer4.requestFullscreen) {
//       chartContainer4.requestFullscreen();
//     } else if (chartContainer4.mozRequestFullScreen) {
//       chartContainer4.mozRequestFullScreen();
//     } else if (chartContainer4.webkitRequestFullscreen) {
//       chartContainer4.webkitRequestFullscreen();
//     } else if (chartContainer4.msRequestFullscreen) {
//       chartContainer4.msRequestFullscreen();
//     }
//   });

//   yearselect4.addEventListener("change", getWarehouseData);
//   headerSelect.addEventListener("change", getWarehouseData);

//   // Rastgele renk oluşturmak için yardımcı fonksiyon
//   function getRandomColor() {
//     const letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   }
// });




document.addEventListener("DOMContentLoaded", function () {
  const yearselect4 = document.getElementById("year-select4");
  const headerSelect = document.getElementById("header4");
  const ctx4 = document.getElementById("myChart4").getContext("2d");

  let data; // Verileri saklayacağımız değişken
  function getYears4() {
    fetch('/depolar/list/') // Yılları almak için doğru API endpointini ayarlayın
      .then(response => response.json())
      .then(data => {
        const years = data.years;
        // Yılları yeni yıldan eski yıla doğru sırala
        years.sort((a, b) => b - a);

        years.forEach(year => {
          const option = document.createElement('option');
          option.value = year;
          option.textContent = year;
          yearselect4.appendChild(option);
        });
        // En son yılı seçili hale getirin
        yearselect4.value = years[0];
        // Yıl seçimi değiştiğinde grafik güncellensin
        yearselect4.addEventListener("change", getWarehouseData);
      })
      .catch(error => console.error('API isteği sırasında bir hata oluştu:', error));
  }

  function getHeaders() {
    fetch('/depolar/warehouse_totals/') // API URL'sini buraya ekleyin
      .then(response => response.json())
      .then(data => {
        const selectBox = document.getElementById('header4');
        // Komboboxı temizleyelim
        selectBox.innerHTML = '';
        // API yanıtını inceleyelim ve başlık adlarını dolduralım
        const headers = [];
        data.forEach(item => {
          if (!headers.includes(item.header)) {
            headers.push(item.header);
          }
        });
        // Her başlık adı için bir option öğesi oluşturalım ve komboboxa ekleyelim
        headers.forEach(header => {
          const option = document.createElement('option');
          option.value = header;
          option.textContent = header;
          selectBox.appendChild(option);
        });
        // Başlık seçimi değiştiğinde grafik güncellensin
        headerSelect.addEventListener("change", getWarehouseData);
        // İlk başlık seçeneğini seçili hale getirin
        headerSelect.value = headers[0];
        // Sayfa yüklendiğinde grafik güncellensin
        getWarehouseData();
      })
      .catch(error => console.error('API isteği sırasında bir hata oluştu:', error));
  }

  // Rastgele renk oluşturmak için yardımcı fonksiyon


  let chart;
  let allData; // Tüm verileri saklayacağımız değişken

  function getWarehouseData() {
    const selectedYear = yearselect4.value;
    const selectedHeader = headerSelect.value;

    // Verileri API'den çekmek için uygun endpoint'i ve parametreleri ayarlayın
    const url = '/depolar/warehouse_totals/';
    const params = new URLSearchParams({
      report_year: selectedYear,
    });

    fetch(`${url}?${params}`)
      .then(response => response.json())
      .then(apiData => {
        allData = apiData; // API'den alınan tüm verileri allData değişkenine saklayın
        const filteredData = allData.filter(item => item.header === selectedHeader); // Sadece başlığa göre filtreleme
        updateChartData(selectedYear, selectedHeader, filteredData);
      })
      .catch(error => console.error('API isteği sırasında bir hata oluştu:', error));
  }

  function updateChartData(selectedYear, selectedHeader, filteredData) {
    const labels = [
      "OCAK", "ŞUBAT", "MART", "NİSAN", "MAYIS", "HAZİRAN", "TEMMUZ",
      "AĞUSTOS", "EYLÜL", "EKİM", "KASIM", "ARALIK"
    ];

    if (!filteredData || filteredData.length === 0) {
      // Filtrelenmiş veri yoksa grafiği temizle
      chart.data.labels = labels;
      chart.data.datasets = [];
      chart.update();
      return;
    }

    const datasets = [];
    const depoLabels = Object.keys(filteredData[0].depolar); // Depo isimlerini alın

    // Tüm depolar için veri setleri oluşturun
    depoLabels.forEach(depo => {
      const dataset = {
        label: depo,
        data: filteredData.map(item => item.depolar[depo] || 0),
        fill: false,

        borderWidth: 3,
      };
      datasets.push(dataset);
    });

    // Grafiği güncelleyin
    chart.data.labels = labels;
    chart.data.datasets = datasets;
    chart.update();
  }

  chart = new Chart(ctx4, {
    type: "line",
    data: {
      labels: [],
      datasets: []
    },
    options: {
      scales: {
      y: {
        beginAtZero: true,
        responsive: true,
        maintainAspectRatio: false
      }
      },
      plugins: {
      title: {
        display: true,
        text: 'AYLIK BAZ DEPO PERFORMANS/RAPOR',
        font: {
          size: 24, // Metin boyutu burada belirtiliyor
          weight: "bold", // Metin ağırlığı (normal, bold, 600, 700 vb.)
        },
      }
      }
    }
  });

  const chartContainer4 = document.getElementById("chart-container4");
  chartContainer4.addEventListener("dblclick", function () {
    if (chartContainer4.requestFullscreen) {
      chartContainer4.requestFullscreen();
    } else if (chartContainer4.mozRequestFullScreen) {
      chartContainer4.mozRequestFullScreen();
    } else if (chartContainer4.webkitRequestFullscreen) {
      chartContainer4.webkitRequestFullscreen();
    } else if (chartContainer4.msRequestFullscreen) {
      chartContainer4.msRequestFullscreen();
    }
  });

  // API'den yılları ve başlıkları al
  getYears4();
  getHeaders();
});