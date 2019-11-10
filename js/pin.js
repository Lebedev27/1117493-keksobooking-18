'use strict';

(function () {
  var formFieldset = document.querySelectorAll('.notice form fieldset');
  var sectionForm = document.querySelector('.notice form');

  var activateFormFildset = function () {
    formFieldset.forEach(function (field) {
      field.disabled = false;
    });
  };

  var blockFormFieldset = function () {
    formFieldset.forEach(function (field) {
      field.disabled = true;
    });
  };

  blockFormFieldset();

  var clearMap = function () {
    var pinsBtn = document.querySelectorAll('button[type="button"]');
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
    pinsBtn.forEach(function (btn) {
      btn.remove();
    });
  };

  var removeAdressCoordinates = function () {
    window.utils.mainPin.style.left = window.utils.START_COORDS_X + 'px';
    window.utils.mainPin.style.top = window.utils.START_COORDS_Y + 'px';
    window.utils.setAdressCoordinates();
  };

  var blockPageHandler = function () {
    window.utils.map.classList.add('map--faded');
    sectionForm.classList.add('ad-form--disabled');
    clearMap();
    removeAdressCoordinates();
    blockFormFieldset();
    document.querySelector('.ad-form').reset();
    window.filter.filter.reset();
    window.utils.mainPin.addEventListener('click', activationPageHandler);
  };

  var successHandler = function (adverts) {
    window.adverts = adverts;
    window.map.renderPins(window.filter.getFilteringData(adverts));
  };

  var errorHandler = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElem = errorTemplate.cloneNode(true);
    errorElem.querySelector('.error__message').textContent = errorMessage;
    document.querySelector('main').appendChild(errorElem);
    errorElem.querySelector('.error__button').addEventListener('click', function () {
      errorElem.remove();
    });
    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        evt.preventDefault();
        errorElem.remove();
        blockPageHandler();
      }
    });
  };

  var activationPageHandler = function () {
    window.backend.load(successHandler, errorHandler);
    window.utils.map.classList.remove('map--faded');
    sectionForm.classList.remove('ad-form--disabled');
    window.utils.setAdressCoordinates();
    activateFormFildset();
    window.utils.mainPin.removeEventListener('click', activationPageHandler);
  };

  window.utils.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      evt.preventDefault();
      activationPageHandler();
    }
  });

  window.utils.mainPin.addEventListener('click', activationPageHandler);

  window.pagehandler = {
    activationPageHandler: activationPageHandler,
    blockPageHandler: blockPageHandler,
    clearMap: clearMap,
    errorHandler: errorHandler
  };
  window.utils.mainPin.addEventListener('mousedown', function (evt) {
    var minLimitX = 130;
    var maxLimitX = 630;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var coordsX = window.utils.mainPin.offsetLeft - shift.x;
      var coordsY = window.utils.mainPin.offsetTop - shift.y;
      var coordsMinX = minLimitX - window.utils.pinImg.offsetHeight;
      var coordsMaxX = maxLimitX - window.utils.pinImg.offsetHeight;
      var coordsMinY = -window.utils.pinImg.offsetWidth / 2;
      var coordsMaxY = window.utils.map.clientWidth - window.utils.pinImg.offsetWidth / 2;

      coordsX = coordsX < coordsMinY ? coordsMinY : coordsX;
      coordsX = coordsX > coordsMaxY ? coordsMaxY : coordsX;

      coordsY = coordsY < coordsMinX ? coordsMinX : coordsY;
      coordsY = coordsY > coordsMaxX ? coordsMaxX : coordsY;

      window.utils.mainPin.style.left = coordsX + 'px';
      window.utils.mainPin.style.top = coordsY + 'px';
      window.utils.setAdressCoordinates();
    };

    var mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

  });
})();
