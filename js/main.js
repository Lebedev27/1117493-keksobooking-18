'use strict';


var QUANTITY = 8;
var MIN_Y = 130;
var MAX_Y = 630;
var PIN_OFFSET_X = 25;
var PIN_OFFSET_Y = 70;
var MIN_X = 133;
var MAX_X = document.querySelector('.map__overlay').offsetWidth;


var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinList = document.querySelector('.map__pins');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapFilter = document.querySelector('.map__filters-container');


var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;
};


var getRandomArrElement = function (arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
};


var getRandomLengthArray = function (array) {
  var tempArray = [];
  var isExist = false;

  for (var i = 0; i < getRandomNumber(1, array.length); i++) {
    tempArray[i] = getRandomArrElement(array);

    for (var j = 0; j < i; j++) {
      if (tempArray[j] === tempArray[i]) {
        isExist = true;
      }

      if (isExist) {
        --i;
        isExist = false;
      }
    }
  }
  return tempArray;
};


var timeArr = ['12:00', '13:00', '14:00'];
var pricesArr = [1, 1000];
var titlesArr = ['заголовок1', 'заголовок 2', 'заголовок 3'];
var typesArr = ['palace', 'flat', 'house', 'bungalo'];
var roomsArr = [1, 2, 3];
var guestsArr = [0, 1, 2];
var photosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


var createAdvert = function (number) {
  var advertArr = [];
  for (var i = 0; i < number; i++) {
    advertArr[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: getRandomArrElement(titlesArr),
        price: getRandomArrElement(pricesArr),
        type: getRandomArrElement(typesArr),
        rooms: getRandomArrElement(roomsArr),
        guests: getRandomArrElement(guestsArr),
        checkin: getRandomArrElement(timeArr),
        checkout: getRandomArrElement(timeArr),
        features: getRandomLengthArray(featuresArr),
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


var setPin = function (pinItem) {
  var pinElement = pinTemplate.cloneNode(true); // склонировать все содержимое этого элемента
  pinElement.style.left = pinItem.location.x;
  pinElement.style.top = pinItem.location.y;
  pinElement.querySelector('img').src = pinItem.author.avatar;
  pinElement.querySelector('img').alt = pinItem.offer.title;
  return pinElement;
};

var setPins = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(setPin(arr[i]));
  }

  return pinList.appendChild(fragment);

};


var renderType = function (item) {
  var typeName = item.offer.type;
  if (typeName === 'flat') {
    typeName = 'Квартира';
  } else if (typeName === 'bungalo') {
    typeName = 'Бунгало';
  } else if (typeName === 'house') {
    typeName = 'Дом';
  } else if (typeName === 'palace') {
    typeName = 'Дворец';
  }

  return typeName;

};


var setCard = function (cardItemArr) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = cardItemArr.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = cardItemArr.offer.address;
  cardElement.querySelector('.popup__text--price').firstChild.nodeValue = cardItemArr.offer.price + ' P';
  cardElement.querySelector('.popup__type').textContent = renderType(cardItemArr);
  cardElement.querySelector('.popup__text--capacity').textContent = cardItemArr.offer.rooms + ' комнаты для ' + cardItemArr.offer.guests + ' ' + 'гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после:' + ' ' + cardItemArr.offer.checkin + ', ' + 'Выезд до:' + ' ' + cardItemArr.offer.checkout;
  cardElement.querySelector('.popup__photos img').src = cardItemArr.offer.photos;
  cardElement.querySelector('.popup__description').textContent = cardItemArr.offer.description;
  cardElement.querySelector('.popup__avatar').src = cardItemArr.author.avatar;
  cardElement.querySelector('.popup__features').innerHTML = '';

  var featuresList = cardElement.querySelector('.popup__features');
  for (var i = 0; i < cardItemArr.offer.features.length; i++) {
    var li = document.createElement('li');
    li.classList.add('popup__feature', 'popup__feature--' + cardItemArr.offer.features[i]);
    featuresList.appendChild(li);
  }

  return cardElement;

};


var setCards = function (arr) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(setCard(arr[0]));

  return map.insertBefore(fragment, mapFilter);

};

map.classList.remove('map--faded');
var adverts = createAdvert(QUANTITY);
setPins(adverts);
setCards(adverts);
