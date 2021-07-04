const baseURL = 'https://gist.githubusercontent.com/Anna-Vin/97ee387fa2a338a2bd6967c085d4b952/raw/b9d463e3f0a651f21440507f5164239209ebfa07/table.json';
let tableData = [];
let filteredTableData = [];
let rowData = {};
let darkRows = [];
let sortOrder = '';
let sortField = '';

const tableContainer = document.querySelector('.table');
const tableBody = document.querySelector('.table__body');
const tableFooter = document.querySelector('.table__footer');
const tableMobile = document.querySelector('.table--mobile');
const loader = document.querySelector('.loader');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const estimationFilter = document.querySelector('.button_estimation');
const totalTimeFilter = document.querySelector('.button_totalTime');
const periodTimeFilter = document.querySelector('.button_periodTime');
const efficiencyFilter = document.querySelector('.button_efficiency');


// Get table data and build table at start
fetchDataAndBuildTable(1);

function getTableData(page) {
    setLoading(true);
    return fetch(baseURL)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (page === 1) tableData = data.slice(0, 10);
            else if (page === 2) tableData = data.slice(10, 20);
            setLoading(false);
        });

}

async function fetchDataAndBuildTable(page) {
    await getTableData(page);
    sortTable();
    renderTable();
}

function setLoading(showLoader) {
    if (showLoader) {
        loader.classList.remove('hidden');
        tableContainer.classList.add('hidden');
    } else {
        loader.classList.add('hidden');
        tableContainer.classList.remove('hidden');
    }
}



// Pagination
function setPage(page) {
    switch (page) {
        case 1:
            prevButton.disabled = true;
            nextButton.disabled = false;
            document.querySelectorAll('.pages__status')[0].classList.add('active');
            document.querySelectorAll('.pages__status')[1].classList.remove('active');
            document.querySelector('.rows-quantity').innerText = '1-10 of 20';
            break;
        case 2:
            prevButton.disabled = false;
            nextButton.disabled = true;
            document.querySelectorAll('.pages__status')[1].classList.add('active');
            document.querySelectorAll('.pages__status')[0].classList.remove('active');
            document.querySelector('.rows-quantity').innerText = '11-20 of 20';
            break;
        default: break;
    };
    fetchDataAndBuildTable(page);
}

prevButton.addEventListener('click', () => setPage(1));
nextButton.addEventListener('click', () => setPage(2));


// Render Table
function renderTable() {
    tableBody.innerHTML = '';
    tableMobile.innerHTML = '';
    filteredTableData.forEach(row => createRow(row));
    // Customize rows
    darkRows = document.querySelectorAll('.table__row:nth-child(2n');
    darkRows.forEach(row => row.classList.add('dark'));
    // Sum
    let sumTotalArr = filteredTableData.map(row => row.totalTime);
    let sumPeriodArr = filteredTableData.map(row => row.periodTime);

    tableFooter.innerHTML = `<div class="table__footer--cell">
                                <span>Sum</span>
                            </div>
                            <div class="table__footer--cell">
                                <span>${sumTotalArr.reduce((a, b) => a + b)}h</span>
                            </div>
                            <div class="table__footer--cell">
                                <span>${sumPeriodArr.reduce((a, b) => a + b)}h</span>
                            </div>
                            <div class="table__footer--cell">
                                <span>100% (${sumTotalArr.reduce((a, b) => a + b)}h)</span>
                            </div>`;
}


function createRow(row) {

    function shortenDesc(field) {
        let fieldLeft = row[field].slice(2);
        let showMore = ``;
        if (fieldLeft.length > 0) showMore = `...<br><span class="lilac">Show more (${fieldLeft.length})</span>`;
        return `${row[field].slice(0, 2).join(', ')}${showMore}`
    }

    let rowHTML = `<div class="table__row">
                        <div class="table__body--cell lilac">${row['name']}</div>
                        <div class="table__body--cell">${shortenDesc('dev')}</div>
                        <div class="table__body--cell">${shortenDesc('type')}</div>
                        <div class="table__body--cell ${row['status'] === 'Completed' ? 'green' : 'red'}">${row['status']}</div>
                        <div class="table__body--cell number" style="padding-right: 60px;">${row['estimation']}</div>
                        <div class="table__body--cell number">${row['totalTime']}</div>
                        <div class="table__body--cell number">${row['periodTime']}</div>
                        <div class="table__body--cell number">${row['efficiency']}</div>
                    </div>`

    let rowMobileHTML = `<div class="card">
                            <div class="card__body">
                                <div class="card__body--row">
                                    <span class="card__body--title">Task name</span>
                                    <span class="card__body--desc lilac">${row['name']}</span>
                                </div>
                                <div class="card__body--row">
                                    <span class="card__body--title">Developer</span>
                                    <span class="card__body--desc">${shortenDesc('dev')}</span>
                                </div>
                                <div class="card__body--row">
                                    <span class="card__body--title">Work Type</span>
                                    <span class="card__body--desc">${shortenDesc('type')}</span>
                                </div>
                                <div class="card__body--row">
                                    <span class="card__body--title">Status</span>
                                    <span class="card__body--desc ${row['status'] === 'Completed' ? 'green' : 'red'}"">${row['status']}</span>
                                </div>
                                <div class="card__body--row">
                                    <span class="card__body--title">Estimation(h)</span>
                                    <span class="card__body--desc">${row['estimation']}</span>
                                </div>
                                <div class="card__body--row">
                                    <span class="card__body--title">Total time spent by All</span>
                                    <span class="card__body--desc">${row['totalTime']}</span>
                                </div>
                                <div class="card__body--row">
                                    <span class="card__body--title">My Time spent by Period(h)</span>
                                    <span class="card__body--desc">${row['periodTime']}</span>
                                </div>
                                <div class="card__body--row">
                                    <span class="card__body--title">Efficiency</span>
                                    <span class="card__body--desc">${row['efficiency']}</span>
                                </div>
                            </div>
                        </div>`;

    tableBody.insertAdjacentHTML('beforeend', rowHTML);
    tableMobile.insertAdjacentHTML('beforeend', rowMobileHTML);
}



// Sorting
function sortTable(filterParam = 'estimation') {

    if (filterParam === sortField) {
        if (sortOrder == 'asc') sortOrder = 'desc';
        else if (sortOrder == 'desc') sortOrder = '';
        else sortOrder = 'asc';
    } else sortOrder = 'asc';

    sortField = filterParam;
    switch (sortOrder) {
        case 'asc':
            filteredTableData = tableData.slice().sort((a, b) => {
                if (a[`${filterParam}`] > b[`${filterParam}`]) return 1;
                if (a[`${filterParam}`] < b[`${filterParam}`]) return -1;
                else return 0;
            });
            break;
        case 'desc':
            filteredTableData = tableData.slice().sort((a, b) => {
                if (a[`${filterParam}`] > b[`${filterParam}`]) return -1;
                if (a[`${filterParam}`] < b[`${filterParam}`]) return 1;
                else return 0;
            });
            break;
        default: filteredTableData = tableData.slice();
            break;
    }
}

estimationFilter.addEventListener('click', () => {
    sortTable('estimation');
    renderTable()
});
totalTimeFilter.addEventListener('click', () => {
    sortTable('totalTime');
    renderTable();
});
periodTimeFilter.addEventListener('click', () => {
    sortTable('periodTime');
    renderTable();
});
efficiencyFilter.addEventListener('click', () => {
    sortTable('efficiency');
    renderTable();
});



