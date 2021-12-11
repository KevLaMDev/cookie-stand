'use strict';

const storeHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

const allCitiesCookiesPerHour = [];
const cities = [];
let tBody = document.getElementById('tbody');
let thead = document.getElementById('thead');

for (let i = 0; i < storeHours.length; i++) {
  allCitiesCookiesPerHour.push(0);
};

function CreateStore(city, min, max, avgSale) {
  this.city = city;
  this.min = min;
  this.max = max;
  this.avgSale = avgSale;
  this.cookieSalesPerHourArr = [];
  this.workersPerHour = [];
  cities.push(this);
  this.calcCookiesPerHour();
  this.calcWorkers();
  this.getAllStoresCookiesPerHour();
  this.renderWorkers();
};

CreateStore.prototype.getCustsPerHour = function () {
  return Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
};

CreateStore.prototype.calcCookiesPerHour = function () {
  for (let i = 0; i < storeHours.length; i++) {
    let custs = this.getCustsPerHour();
    this.cookieSalesPerHourArr.push(Math.floor(this.avgSale * custs));
  }
};

CreateStore.prototype.totalCookiesPerDay = function () {
  return this.cookieSalesPerHourArr.reduce(function (acc, currVal) {
    return acc += currVal;
  })
};


CreateStore.prototype.calcWorkers = function() {
  let unmetOrders;
  let addWorkers;
  let productionCapacity = 40;
  for (let i = 0; i < this.cookieSalesPerHourArr.length; i++) {
    let workers = 2;
    if (this.cookieSalesPerHourArr[i] <= productionCapacity) {
      this.workersPerHour.push(workers);
    } else {
      unmetOrders = this.cookieSalesPerHourArr[i] - productionCapacity;
      addWorkers = Math.round(unmetOrders / 20);
      workers += addWorkers;
      this.workersPerHour.push(workers);
    }
  }
};
CreateStore.prototype.renderSales = function() {
  let tr = document.createElement('tr'); // create tr
  tBody.appendChild(tr); // append tr to tBody
  let td = document.createElement('td'); // create td
  td.textContent = this.city; // give td content
  tr.appendChild(td); // append td to tr
  // for loop to populate row with array values
  for (let i = 0; i < this.cookieSalesPerHourArr.length; i++) {
    let td = document.createElement('td'); // create td
    td.textContent = this.cookieSalesPerHourArr[i]; // populate td
    tr.appendChild(td); // append td to tr
  }
  td = document.createElement('td'); // create td
  td.textContent = this.totalCookiesPerDay(); // give td content
  tr.appendChild(td);
};

CreateStore.prototype.renderWorkers = function() {
  let tBody2 = document.getElementById('tbody2');
  let tr = document.createElement('tr'); // create tr
  tBody2.appendChild(tr); // append tr to tBody
  // for loop to populate row with array values
  let td = document.createElement('td'); // create td
  td.textContent = this.city; // give td content
  tr.appendChild(td); // append td to tr
  for (let i = 0; i < storeHours.length; i++) {
    let td = document.createElement('td'); // create td
    td.textContent = this.workersPerHour[i]; // populate td
    tr.appendChild(td); // append td to tr
  }
}

CreateStore.prototype.getAllStoresCookiesPerHour = function() {
  for (let i = 0; i < storeHours.length; i++) {
    let sum = this.cookieSalesPerHourArr[i];
    allCitiesCookiesPerHour[i] += sum;
  }
};

function createTableHeader() { // reference table
  let tr = document.createElement('tr'); // create tr
  thead.appendChild(tr); //append tr to thead
  let th = document.createElement('th');
  tr.appendChild(th);
  // for loop to populate tr heading row 
  for (let i = 0; i < storeHours.length; i++) {
    let th = document.createElement('th'); // create th's
    th.textContent = storeHours[i]; // give content to th's
    tr.appendChild(th); // append th's to tr
  }
  th = document.createElement('th'); // create th
  th.textContent = 'Daily Location Total'; // give content to th
  tr.appendChild(th); // append th to tr
}

function createTableFooter() {
  let tr = document.createElement('tr'); // create tr
  tBody.appendChild(tr); // append tr to tfooter
  let td = document.createElement('td');
  td.textContent = 'Totals';
  tr.appendChild(td);
  // for loop to populate tr
  for (let i = 0; i < storeHours.length; i++) {
    let td = document.createElement('td');
    td.textContent = allCitiesCookiesPerHour[i];
    tr.appendChild(td); 
  };
  td = document.createElement('td');
  td.textContent = getAllStoresCookiesPerDay();
  tr.appendChild(td);
}


function getAllStoresCookiesPerDay() {
  return allCitiesCookiesPerHour.reduce(function(acc, currVal) {
    return acc += currVal;
  })
};

function createTable2Header() {
  let thead = document.getElementById('thead2') // reference el
  let tr = document.createElement('tr'); // create tr
  thead.appendChild(tr); // append tr to thead
  let th = document.createElement('th');
  tr.appendChild(th);
  for (let i = 0; i < storeHours.length; i++) {
    let th = document.createElement('th');
    th.textContent = ` # Of Workers at ${storeHours[i]}`;
    tr.appendChild(th);
  }
};

function renderSalesPage() {
  for (let i = 0; i < cities.length; i++) {
    cities[i].renderSales();
  }
  getAllStoresCookiesPerDay();
  createTableFooter(); // renders total row of table
};

function clearTable() {
  tBody.innerHTML = '';
};

const seattle = new CreateStore('Seattle', 23, 65, 6.3);
const tokyo = new CreateStore('Tokyo', 3, 24, 1.2);
const dubai = new CreateStore('Dubai', 11, 38, 3.7);
const paris = new CreateStore('Paris', 20, 38, 2.3);
const lima = new CreateStore('Lima', 2, 16, 4.6);

renderSalesPage()
createTable2Header(); // renders table 2 heading row
createTableHeader(); // renders table heading row



let newStoreForm = document.getElementById('new-store-form');
function handleSubmit(event) {
  event.preventDefault();
  let prexisting = false;
  let city = event.target.city.value;
  let min = +event.target.min.value;
  let max = +event.target.max.value;
  let avgSale = +event.target['avg-sale'].value;
  city = city.charAt(0).toUpperCase() + city.slice(1);
  for (let i = 0; i < cities.length; i++) {
    if (cities[i].city === city) {
      prexisting = true;
      cities[i].min = min;
      cities[i].max = max;
      cities[i].avgSale = avgSale;
    }
  }

  if (prexisting === false) {
    new CreateStore(city, min, max, avgSale);
  }
  clearTable();
  renderSalesPage();
  console.log(cities)
}
// add event listener 
newStoreForm.addEventListener('submit', handleSubmit);





