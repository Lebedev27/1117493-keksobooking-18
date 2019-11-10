'use strict';

(function () {
  var address = document.querySelector('#address');
  var mapPins = window.utils.map.querySelector('.map__pins');
  var mainPin = window.utils.map.querySelector('.map__pin--main');
  var formFieldset = document.querySelectorAll('.notice form fieldset');
  var sectionForm = document.querySelector('.notice form');

  var setAddressCoordinates = function () {
    var pinCoordinates = (mainPin.offsetLeft + window.utils.pinImg.offsetWidth / 2) + ', ' + (mainPin.offsetTop + window.utils.pinImg.offsetHeight);
    address.setAttribute('value', pinCoordinates);
  };

  var activateFormFildset = function () {
    formFieldset.forEach(function (field) {
      field.disabled = false;
    });
  };

  var fragmentPin = document.createDocumentFragment();

  var createPins = function (fragment, arr) {
    arr.forEach(function (el) {
      fragment.appendChild(window.map.createPinElement(el));
    });
  };

  var renderPins = function () {
    var pinBtn = document.querySelector('button[type="button"]');
    if (!pinBtn) {
      createPins(fragmentPin, window.data.newMockArray);
      mapPins.appendChild(fragmentPin);
    }
  };

  var activatePageHandler = function () {
    window.utils.map.classList.remove('map--faded');
    sectionForm.classList.remove('ad-form--disabled');
    renderPins();
    setAddressCoordinates();
    activateFormFildset();
  };

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEY) {
      evt.preventDefault();
      activatePageHandler();
    }
  });

  mainPin.addEventListener('click', function () {
    activatePageHandler();
  });

  var blockFormFieldset = function () {
    formFieldset.forEach(function (field) {
      field.disabled = true;
    });
  };

  blockFormFieldset();

  var cleanMap = function () {
    var pinsBtn = document.querySelectorAll('button[type="button"]');
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
    pinsBtn.forEach(function (btn) {
      btn.remove();
    });
  };

  var removeAddressCoordinates = function () {
    address.setAttribute('value', null);
  };

  var blockPageHandler = function () {
    window.utils.map.classList.add('map--faded');
    sectionForm.classList.add('ad-form--disabled');
    cleanMap();
    removeAddressCoordinates();
    blockFormFieldset();
  };

  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', blockPageHandler);
})();
