'use strict';

const storeHours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm', '5pm', '6pm', '7pm'];

const cities = [];
// global vars at top so we can access them at any point in the script;

function CreateStore(city, min, max, avgSale) {
  this.city = city;
  this.min = min;
  this.max = max;
  this.avgSale = avgSale;
  this.cookiesPerHourArr = [];
  cities.push(this);
}

CreateStore.prototype.getCustsPerHour = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

CreateStore.prototype.calcCookiesPerHour = function() {
  for (let i = 0; i < storeHours.length; i++) {
    let cookies = Math.floor(this.getCustsPerHour(this.min, this.max));
    this.cookiesPerHourArr.push(Math.floor(this.avgSale * cookies));
  }
};

CreateStore.prototype.totalCookiesPerDay = function() {
  return this.cookiesPerHourArr.reduce(function(acc, currVal) {
    return acc += currVal;
  })
};

CreateStore.prototype.render = function() {
  let ul = document.getElementById(this.city);
  this.calcCookiesPerHour();
  for (let i = 0; i < storeHours.length; i++) {
    let li = document.createElement('li');
    let p = document.createElement('p');
    p.textContent = (`${storeHours[i]}: ${this.cookiesPerHourArr[i]} cookies`);
    ul.appendChild(li);
    li.appendChild(p);
  }
  let li = document.createElement('li');
  let p = document.createElement('p');
  let total = this.totalCookiesPerDay();
  p.textContent = (`Total: ${total}`);
  ul.appendChild(li);
  li.appendChild(p);
};

const paris = new CreateStore('paris', 23, 67, 9.1);





// function (object) {
//   let ul = document.getElementById(object.city);
//   object.calcCookiesPerHour();
//   for (let i = 0; i < storeHours.length; i++) {
//     let li = document.createElement('li');
//     let p = document.createElement('p');
//     p.textContent = (`${storeHours[i]}: ${object.cookiesPerHourArr[i]} cookies`);
//     ul.appendChild(li);
//     li.appendChild(p);
//   }
//   let li = document.createElement('li');
//   let p = document.createElement('p');
//   let total = object.totalCookiesPerDay();
//   p.textContent = (`Total: ${total}`);
//   ul.appendChild(li);
//   li.appendChild(p);
// };


// for (let i = 0; i < cities.length; i++) {
//   render(cities[i]);
// };

