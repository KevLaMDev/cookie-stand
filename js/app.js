'use strict';

const storeHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

const allCitiesCookiesPerHour = [];

const cities = [];


// global vars at top so we can access them at any point in the script;

function CreateStore(city, min, max, avgSale) {
  this.city = city;
  this.min = min;
  this.max = max;
  this.avgSale = avgSale;
  this.cookieSalesPerHourArr = [];
  this.workersPerHour = [];
  cities.push(this);
  this.calcCookiesPerHour();
}

CreateStore.prototype.getCustsPerHour = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

CreateStore.prototype.calcCookiesPerHour = function () {
  for (let i = 0; i < storeHours.length; i++) {
    let cookies = Math.floor(this.getCustsPerHour(this.min, this.max));
    this.cookieSalesPerHourArr.push(Math.floor(this.avgSale * cookies));
  }
};

CreateStore.prototype.totalCookiesPerDay = function () {
  return this.cookieSalesPerHourArr.reduce(function (acc, currVal) {
    return acc += currVal;
  })
};

CreateStore.prototype.renderSales = function() {
  let tBody = document.getElementById('tbody'); // reference el
  let tr = document.createElement('tr'); // create tr
  tBody.appendChild(tr); // append tr to tBody
  // for loop to populate row with array values
  let td = document.createElement('td'); // create td
  td.textContent = this.city; // give td content
  tr.appendChild(td); // append td to tr
  for (let i = 0; i < this.cookieSalesPerHourArr.length; i++) {
    let td = document.createElement('td'); // create td
    td.textContent = this.cookieSalesPerHourArr[i]; // populate td
    tr.appendChild(td); // append td to tr
  }
  td = document.createElement('td'); // create td
  td.textContent = this.totalCookiesPerDay(); // give td content
  tr.appendChild(td);
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

CreateStore.prototype.renderWorkers = function() {
  let tBody = document.getElementById('tbody2'); // reference el
  let tr = document.createElement('tr'); // create tr
  tBody.appendChild(tr); // append tr to tBody
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

function createTableHeader() { // reference table
  let thead = document.getElementById('thead'); // create thead
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
  let tfoot = document.getElementById('tbody'); // reference footer
  let tr = document.createElement('tr'); // create tr
  tfoot.appendChild(tr); // append tr to tfooter
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

function getAllStoresCookiesPerHour() {
  for (let i = 0; i < storeHours.length; i++) {
    let sum = 0; 
    for (let j = 0; j < cities.length; j++) {
      sum += cities[j].cookieSalesPerHourArr[i];
    }
    allCitiesCookiesPerHour.push(sum);
  }
};

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
  createTableHeader(); // renders table heading row
  // calls renderSales on all city objects
  for (let i = 0; i < cities.length; i++) {
    cities[i].renderSales();
  };
  // calls calcWorkers on all city objects
  for (let i = 0; i < cities.length; i++) {
    cities[i].calcWorkers();
  };
  getAllStoresCookiesPerHour(); // populates allCitiesCookiesPerHour array
  createTableFooter(); // renders total row of table
  createTable2Header(); // renders table 2 heading row
  // calls renderWorkers on all city objects 
  for (let i = 0; i < cities.length; i++) {
    cities[i].renderWorkers();
  }
};

const seattle = new CreateStore('seattle', 23, 65, 6.3);
const tokyo = new CreateStore('tokyo', 3, 24, 1.2);
const dubai = new CreateStore('dubai', 11, 38, 3.7);
const paris = new CreateStore('paris', 20, 38, 2.3);
const lima = new CreateStore('lima', 2, 16, 4.6);

renderSalesPage()








