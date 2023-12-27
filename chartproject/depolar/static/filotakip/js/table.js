const tableBody = document.getElementById("table-body");
const tableFooter = document.getElementById("table-footer");
const yearSelect = document.getElementById("year-select");
const monthSelect = document.getElementById("month-select");
const weekSelect = document.getElementById("week-select");
const warehouse_id = document.getElementById("warehouse_id");

let totals = {
    mevcut: { tır: 0, büyük: 0, orta: 0, küçük: 0, toplam: 0 },
    sezon: { tır: 0, büyük: 0, orta: 0, küçük: 0, toplam: 0 },
    eksik: { tır: 0, büyük: 0, orta: 0, küçük: 0, toplam: 0 }
};

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API request error:", error);
        throw error;
    }
}

function createCell(content) {
    const cell = document.createElement("td");
    cell.textContent = content;
    return cell;
}

function calculateMissingData(mevcutData, sezonData) {
    const missingData = {};

    for (const key in mevcutData) {
        missingData[key] = mevcutData[key] - sezonData[key];
    }

    return missingData;
}

function calculateTotals(data) {
    const totals = {
        mevcut: { tır: 0, büyük: 0, orta: 0, küçük: 0, toplam: 0 },
        sezon: { tır: 0, büyük: 0, orta: 0, küçük: 0, toplam: 0 },
        eksik: { tır: 0, büyük: 0, orta: 0, küçük: 0, toplam: 0 }
    };

    for (const person in data) {
        const personData = data[person];
        const eksikData = calculateMissingData(personData.toplam_mevcut, personData.toplam_sezon);

        for (const key in personData.toplam_mevcut) {
            totals.mevcut[key] += personData.toplam_mevcut[key];
            totals.sezon[key] += personData.toplam_sezon[key];
            totals.eksik[key] += eksikData[key];
        }
    }

    totals.mevcut.toplam = calculatePersonTotal(totals.mevcut);
    totals.sezon.toplam = calculatePersonTotal(totals.sezon);
    totals.eksik.toplam = calculatePersonTotal(totals.eksik);

    return totals;
}

function createHeaderRow() {
    const headerRow = document.createElement("tr");
    const headers = ["FİLO", "Tır", "Büyük", "Orta", "Küçük", "TOPLAM", "Tır", "Büyük", "Orta", "Küçük", "TOPLAM", "Tır", "Büyük", "Orta", "Küçük", "TOPLAM"];

    headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;

        if (header === "TOPLAM") {
            th.classList.add("text-bg-danger");
        }
        if (header === "FİLO") {
            th.classList.add("text-bg-success");
        }
        headerRow.appendChild(th);
    });

    return headerRow;
}

function createDataRow(person, mevcutData, sezonData, eksikData) {
    const row = document.createElement("tr");
    row.appendChild(createCell(person));

    for (const mevcut in mevcutData) {
        row.appendChild(createCell(mevcutData[mevcut]));
    }

    row.appendChild(createCell(calculatePersonTotal(mevcutData)));

    for (const sezon in sezonData) {
        row.appendChild(createCell(sezonData[sezon]));
    }

    row.appendChild(createCell(calculatePersonTotal(sezonData)));

    for (const eksik in eksikData) {
        row.appendChild(createCell(eksikData[eksik]));
    }

    row.appendChild(createCell(calculatePersonTotal(eksikData)));

    return row;
}

function calculatePersonTotal(data) {
    const total = data['tır'] + data['büyük'] + data['orta'] + data['küçük'];
    return total;
}

function createTotalRow() {
    const totalRow = document.createElement("tr");
    const totalLabels = ["TOTAL"];

    for (const key in totals.mevcut) {
        totalLabels.push(totals.mevcut[key]);
    }

    for (const key in totals.sezon) {
        totalLabels.push(totals.sezon[key]);
    }

    for (const key in totals.eksik) {
        totalLabels.push(totals.eksik[key]);
    }

    totalLabels.forEach(label => {
        const th = document.createElement("th");
        th.innerHTML = `<strong>${label}</strong>`;

        if (label === "TOTAL" || label === totals.mevcut.toplam || label === totals.sezon.toplam || label === totals.eksik.toplam) {
            th.classList.add("text-bg-danger");
        }

        totalRow.appendChild(th);
    });

    return totalRow;
}

async function populateTable(data) {
    const depoNames = Object.keys(data);
    const firstDepo = data[depoNames[0]];

    warehouse_id.innerHTML = depoNames[0];

    totals = calculateTotals(firstDepo);

    tableBody.appendChild(createHeaderRow());

    for (const person in firstDepo) {
        const personData = firstDepo[person];
        const eksikData = calculateMissingData(personData.toplam_mevcut, personData.toplam_sezon);
        tableBody.appendChild(createDataRow(person, personData.toplam_mevcut, personData.toplam_sezon, eksikData));
    }

    tableFooter.appendChild(createTotalRow());
}

async function updateTable() {
    const selectedYear = yearSelect.value;
    const selectedMonth = monthSelect.value;
    const selectedWeek = weekSelect.value;

    let url = `/filotakip/totalfiloapi`;

    if (selectedYear !== "all") {
        url += `?year=${selectedYear}`;
    }

    if (selectedMonth !== "all") {
        url += `${selectedYear !== "all" ? '&' : '?'}month=${selectedMonth}`;
    }

    if (selectedWeek !== "all") {
        url += `${(selectedYear !== "all" || selectedMonth !== "all") ? '&' : '?'}week=${selectedWeek}`;
    }

    const newData = await fetchData(url);

    tableBody.innerHTML = "";
    tableFooter.innerHTML = "";

    populateTable(newData);
}

yearSelect.addEventListener("change", updateTable);
monthSelect.addEventListener("change", updateTable);
weekSelect.addEventListener("change", updateTable);

async function initialize() {
    const data = await fetchData('/filotakip/filolist');

    data[0].data[0].year.forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });
    yearSelect.insertAdjacentHTML('afterbegin', '<option value="all">Tüm Yıl</option>');

    data[0].data[1].month.forEach(month => {
        const option = document.createElement("option");
        option.value = month;
        option.textContent = month;
        monthSelect.appendChild(option);
    });
    monthSelect.insertAdjacentHTML('afterbegin', '<option value="all">Tüm Ay</option>');

    data[0].data[2].week.forEach(week => {
        const option = document.createElement("option");
        option.value = week;
        option.textContent = `Hafta ${week}`;
        weekSelect.appendChild(option);
    });
    weekSelect.insertAdjacentHTML('afterbegin', '<option value="all">Tüm Hafta</option>');

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // JavaScript'te aylar 0-11 arasında indekslenir
    const currentWeek = "tüm"; // Varsayılan olarak "Tüm Hafta" seçeneği

    yearSelect.value = currentYear;
    monthSelect.value = currentMonth;
    weekSelect.value = currentWeek;

    updateTable();
}

initialize();
