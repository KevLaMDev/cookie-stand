'use strict';

const storeHours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm', '5pm', '6pm', '7pm'];

const seattle = {
  city: 'seattle',
  min: 23,
  max: 65,
  avgSale: 6.3,
  cookiesPerHourArr: [],
  getCustsPerHour: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  calcCookiesPerHour: function() {
    for (let i = 0; i < storeHours.length; i++) {
      let cookies = Math.floor(this.getCustsPerHour(this.min, this.max));
      this.cookiesPerHourArr.push(Math.floor(this.avgSale * cookies));
    }
  },
  totalCookiesPerDay: function() {
    return this.cookiesPerHourArr.reduce(function(acc, currVal) {
      return acc += currVal;
    })
  },
};

const tokyo = {
  city: 'tokyo',
  min: 3,
  max: 24,
  avgSale: 1.2,
  cookiesPerHourArr: [],
  getCustsPerHour: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  calcCookiesPerHour: function() {
    for (let i = 0; i < storeHours.length; i++) {
      let cookies = Math.floor(this.getCustsPerHour(this.min, this.max));
      this.cookiesPerHourArr.push(Math.floor(this.avgSale * cookies));
    }
  },
  totalCookiesPerDay: function() {
    return this.cookiesPerHourArr.reduce(function(acc, currVal) {
      return acc += currVal;
    })
  },
};

const dubai = {
  city: 'dubai',
  min: 11,
  max: 38,
  avgSale: 3.7,
  cookiesPerHourArr: [],
  getCustsPerHour: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  calcCookiesPerHour: function() {
    for (let i = 0; i < storeHours.length; i++) {
      let cookies = Math.floor(this.getCustsPerHour(this.min, this.max));
      this.cookiesPerHourArr.push(Math.floor(this.avgSale * cookies));
    }
  },
  totalCookiesPerDay: function() {
    return this.cookiesPerHourArr.reduce(function(acc, currVal) {
      return acc += currVal;
    })
  },
};

const paris = {
  city: 'paris',
  min: 20,
  max: 38,
  avgSale: 2.3,
  cookiesPerHourArr: [],
  getCustsPerHour: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  calcCookiesPerHour: function() {
    for (let i = 0; i < storeHours.length; i++) {
      let cookies = Math.floor(this.getCustsPerHour(this.min, this.max));
      this.cookiesPerHourArr.push(Math.floor(this.avgSale * cookies));
    }
  },
  totalCookiesPerDay: function() {
    return this.cookiesPerHourArr.reduce(function(acc, currVal) {
      return acc += currVal;
    })
  },
};

const lima = {
  city: 'lima',
  min: 2,
  max: 16,
  avgSale: 4.6,
  cookiesPerHourArr: [],
  getCustsPerHour: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  calcCookiesPerHour: function() {
    for (let i = 0; i < storeHours.length; i++) {
      let cookies = Math.floor(this.getCustsPerHour(this.min, this.max));
      this.cookiesPerHourArr.push(Math.floor(this.avgSale * cookies));
    }
  },
  totalCookiesPerDay: function() {
    return this.cookiesPerHourArr.reduce(function(acc, currVal) {
      return acc += currVal;
    })
  },
};
function render(object) {
  let ul = document.getElementById(object.city);
  object.calcCookiesPerHour();
  for (let i = 0; i < storeHours.length; i++) {
    let li = document.createElement('li');
    let p = document.createElement('p');
    p.textContent = (`${storeHours[i]}: ${object.cookiesPerHourArr[i]} cookies`);
    ul.appendChild(li);
    li.appendChild(p);
  }
  let li = document.createElement('li');
  let p = document.createElement('p');
  let total = object.totalCookiesPerDay();
  p.textContent = (`Total: ${total}`);
  ul.appendChild(li);
  li.appendChild(p);
};

render(seattle);
render(tokyo);
render(dubai);
render(paris);
render(lima);
