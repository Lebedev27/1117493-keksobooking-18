'use strict';
var MIN_Y = 130;
var MAX_Y = 630;
var MAX_X = document.querySelector('.map__overlay').offsetWidth;


var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;
};


var getRandomArrElement = function (arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
};


var getMaxArrElement = function (arr) {
  return Math.max.apply(null, arr);
};


var createAdvert = function (number) {
  var timeArr = ['12:00', '13:00', '14:00'];
  var pricesArr = [1, 1000];
  var titlesArr = ['заголовок1', 'заголовок 2', 'заголовок 3'];
  var typesArr = ['palace', 'flat', 'house', 'bungalo'];
  var roomsArr = [1, 2, 3];
  var guestsArr = [0, 1, 2];
  var photosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var advertArr = [];

  for (var i = 0; i < number; i++) {
    var advert = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: getRandomArrElement(titlesArr),
        price: getRandomArrElement(pricesArr[0], getMaxArrElement(pricesArr)),
        type: getRandomArrElement(typesArr),
        rooms: getRandomArrElement(roomsArr),
        guests: getRandomArrElement(guestsArr),
        checkin: getRandomArrElement(timeArr),
        checkout: getRandomArrElement(timeArr),
        features: getRandomArrElement(featuresArr),
        photos: getRandomArrElement(photosArr)
      },
      location: {
        x: getRandomNumber(0, MAX_X),
        y: getRandomNumber(MIN_Y, MAX_Y)
      }
    };
    advert.offer.address = advert.location.x + ', ' + advert.location.y + '.';
    advert.offer.description = advert.offer.type + ', ' + advert.offer.price + '.';
    advertArr.push(advert);
  }

  return advertArr;

};

var advertArr = createAdvert(8);

