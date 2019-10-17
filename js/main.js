'use strict';


var QUANTITY = 8;
var MIN_Y = 130;
var MAX_Y = 630;
var PIN_OFFSET_X = 25;
var PIN_OFFSET_Y = 70;
var MIN_X = 133;
var MAX_X = document.querySelector('.map__overlay').offsetWidth;
var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 70;
var MAIN_PIN_ARROW = 13;
var KEY_NAME = 13;

var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinList = document.querySelector('.map__pins');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapFilter = document.querySelector('.map__filters-container');
var adForm = document.querySelector('.ad-form');
var fieldset = adForm.querySelectorAll('fieldset');
var mainPin = map.querySelector('.map__pin--main');

var openMap = function () {
  document.querySelector('.map').classList.remove('map--faded');
};

var setDisabled = function (collection) {
  for (var i = 0; i < collection.length; i++) {
    collection[i].setAttribute('disabled', 'disabled');
  }
};
setDisabled(fieldset);


var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;
};


var getRandomArrElement = function (arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
};

var getRandomLengthArray = function(array) {
  var copyOfArray = array.slice();
  var randomArray = [];
  var counter = getRandomNumber(1, copyOfArray.length);

  for (var i = 0; i < counter; i++) {
    randomArray.push(getRandomArrElement(copyOfArray, true));
  }

  return randomArray;
};


var timeArr = ['12:00', '13:00', '14:00'];
var pricesArr = [1, 1000];
var titlesArr = ['заголовок 1', 'заголовок 2', 'заголовок 3'];
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

var adverts = createAdvert(QUANTITY);
setCards(adverts);

var mapFilterFormSelects = document.querySelectorAll('.map__filters select');
var mapFilterFormInputs = document.querySelectorAll('.map__filters input');
var yourOfferForm = document.querySelector('.ad-form');
var yourOfferFormSelects = document.querySelectorAll('.ad-form select');
var yourOfferFormFieldset = document.querySelectorAll('.ad-form fieldset');


var disableElementsForm = function (collection) {
  for (var i = 0; i < collection.length; i++) {
    collection[i].disabled = true;
  }
};

var enableElementsForm = function (collection) {
  for (var i = 0; i < collection.length; i++) {
    collection[i].disabled = false;
  }
};

var switchOffForm = function () {
  disableElementsForm(mapFilterFormSelects);
  disableElementsForm(mapFilterFormInputs);
  disableElementsForm(yourOfferFormSelects);
  disableElementsForm(yourOfferFormFieldset);
};

var switchOnForm = function () {
  yourOfferForm.classList.remove('ad-form--disabled');
  enableElementsForm(mapFilterFormSelects);
  enableElementsForm(mapFilterFormInputs);
  enableElementsForm(yourOfferFormSelects);
  enableElementsForm(yourOfferFormFieldset);
};

var addressInput = document.querySelector('#address');
var setAddressCoords = function (active) {
  var x = parseInt(mainPin.style.left, 10) + (MAIN_PIN_WIDTH / 2);
  var y;
  if (!active) {
    y = parseInt(mainPin.style.top, 10) + (MAIN_PIN_HEIGHT / 2);
  } else {
    y = parseInt(mainPin.style.top, 10) + (MAIN_PIN_HEIGHT / 2) + MAIN_PIN_ARROW;
  }
  addressInput.value = x + ', ' + y;
};

var activatePage = function () {
  openMap();
  switchOnForm();
  setAddressCoords(true);
  setPins(adverts);
};

var onMainPinMouseDown = function () {
  activatePage();
};

var onMainPinKeyDown = function (evt) {
  if (evt.keyCode === KEY_NAME) {
    activatePage();
  }
};

mainPin.addEventListener('mousedown', onMainPinMouseDown);
mainPin.addEventListener('keydown', onMainPinKeyDown);


var checkValidForm = function () {
  var roomCount = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var onRoomCountChange = function () {
    capacity.setCustomValidity('');
    var roomCountValue = parseInt(roomCount.options[roomCount.selectedIndex].value, 10);
    var capacityValue = parseInt(capacity.options[capacity.selectedIndex].value, 10);

    if (roomCountValue < capacityValue && capacityValue !== 0) {
      roomCount.setCustomValidity('Гостей больше, чем комнат');
    } else if (roomCountValue < 100 && capacityValue === 0) {
      roomCount.setCustomValidity('Недвижимость менее 100 комнат не подразумевает вселение гостей');
    } else if (roomCountValue === 100 && capacityValue !== 0) {
      roomCount.setCustomValidity('Не для гостей');
    } else {
      roomCount.setCustomValidity('');
    }

    capacity.addEventListener('change', onVolumeChange);

  };

  var onVolumeChange = function () {
    roomCount.setCustomValidity('');
    var roomCountValue = parseInt(roomCount.options[roomCount.selectedIndex].value, 10);
    var capacityValue = parseInt(capacity.options[capacity.selectedIndex].value, 10);

    if (capacityValue > roomCountValue && capacityValue !== 0) {
      capacity.setCustomValidity('Гостей больше, чем комнат');
    } else if (capacityValue === 0 && roomCountValue < 100) {
      capacity.setCustomValidity('Нужно больше гостей');
    } else if (capacityValue !== 0 && roomCountValue === 100) {
      capacity.setCustomValidity('Не для гостей');
    } else {
      capacity.setCustomValidity('');
    }

    roomCount.addEventListener('change', onRoomCountChange);
  };

  roomCount.addEventListener('change', onRoomCountChange);
  capacity.addEventListener('change', onVolumeChange);
};

setAddressCoords();
switchOffForm();
checkValidForm();
