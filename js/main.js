'use strict';


var QUANTITY = 8;
var MIN_Y = 130;
var MAX_Y = 630;
var PIN_OFFSET_X = 25;
var PIN_OFFSET_Y = 35;
var MIN_X = 133;
var MAX_X = document.querySelector('.map__overlay').offsetWidth;

var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinList = document.querySelector('.map__pins');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;
};


var getRandomArrElement = function (arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
};


var getMaxArrElement = function (arr) {
  return Math.max.apply(null, arr);
};

var timeArr = ['12:00', '13:00', '14:00'];
var pricesArr = [1, 1000];
var titlesArr = ['заголовок1', 'заголовок 2', 'заголовок 3'];
var typesArr = ['palace', 'flat', 'house', 'bungalo'];
var roomsArr = [1, 2, 3];
var guestsArr = [0, 1, 2];
var photosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


var createAdvert = function () {

  var advertArr = [];
  for (var i = 0; i < QUANTITY; i++) {
    advertArr[i] = {
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
        x: getRandomNumber(MIN_X, MAX_X) - PIN_OFFSET_X + 'px',
        y: getRandomNumber(MIN_Y, MAX_Y) - PIN_OFFSET_Y + 'px'
      }
    };
  }

  return advertArr;

};
var adverts = createAdvert();

map.classList.remove('map--faded');

var setPin = function () {
  for (var i = 0; i < QUANTITY; i++) {
    var pinElement = pinTemplate.cloneNode(true);
    var setPicture = pinElement.querySelector('img');
    var element = document.createDocumentFragment();

    pinElement.style.left = adverts[i].location.x;
    pinElement.style.top = adverts[i].location.y;
    setPicture.src = adverts[i].author.avatar;
    setPicture.alt = adverts[i].offer.type;
    element.appendChild(pinElement);
    pinList.appendChild(element);
  }
};
setPin();


