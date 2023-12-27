// CHART1

document.addEventListener('DOMContentLoaded', function() {
  const yearSelect = document.getElementById('year-select');
  const ctx = document.getElementById('myChart').getContext('2d');
  const spin =document.getElementById("chartspin");
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
    spin.remove()
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

// fullscreen-button için tıklama işlemini tanımlama
var fullscreenButton = document.getElementById("fullscreen-button");

fullscreenButton.addEventListener("click", function() {
  toggleFullscreen(document.getElementById("chart-container"));
});

// fullscreen-button2 için tıklama işlemini tanımlama
var fullscreenButton2 = document.getElementById("fullscreen-button2");

fullscreenButton2.addEventListener("click", function() {
  toggleFullscreen(document.getElementById("chart-container4"));
});

// fullscreen-button3 için tıklama işlemini tanımlama
var fullscreenButton3 = document.getElementById("fullscreen-button3");

fullscreenButton3.addEventListener("click", function() {
  toggleFullscreen(document.getElementById("fullscreen"));
});



//  CHART 4

document.addEventListener("DOMContentLoaded", function () {
  const yearselect4 = document.getElementById("year-select4");
  const headerSelect = document.getElementById("header4");
  const ctx4 = document.getElementById("myChart4").getContext("2d");
  const spin4 =document.getElementById("chartspin4")
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
      spin4.remove()
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