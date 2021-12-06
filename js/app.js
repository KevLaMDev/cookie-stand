'use strict';

const seattle = {
  min: 23,
  max: 65,
  avgSale: 6.3,
  recoredSalesPerHour = {
    '6am':,
    '7am':,
    '8am':,
    '9am':,
    '10am':,
    '11am':,
    '12pm':,
    '1pm':,
    '2pm':,
    '3pm':,
    '4pm':,
  },
  getSalesPerHour: function() {
    return this.avgSale * getCustsPerHour(this.min, this.max);
  }
};

const tokyo = {
  min: 3,
  max: 24,
  avgSale: 1.2,
  getSalesPerHour: function() {
    return this.avgSale * getCustsPerHour(this.min, this.max);
  }
};

const dubai = {
  min: 11,
  max: 38,
  avgSale: 3.7,
  getSalesPerHour: function() {
    return this.avgSale * getCustsPerHour(this.min, this.max);
  }
};

const paris = {
  min: 20,
  max: 38,
  avgSale: 2.3,
  getSalesPerHour: function() {
    return this.avgSale * getCustsPerHour(this.min, this.max);
  }
};

const lima = {
  min: 2,
  max: 16,
  avgSale: 4.6,
  getSalesPerHour: function() {
    return this.avgSale * getCustsPerHour(this.min, this.max);
  }
};

function getCustsPerHour(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

console.log(seattle.getSalesPerHour());
