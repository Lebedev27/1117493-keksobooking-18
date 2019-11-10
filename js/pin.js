'use strict';

(function () {
  var mapPins = window.utils.map.querySelector('.map__pins');
  var formFieldset = document.querySelectorAll('.notice form fieldset');
  var sectionForm = document.querySelector('.notice form');

  var activateFormFildset = function () {
    formFieldset.forEach(function (field) {
      field.disabled = false;
    });
  };

  var fragmentPin = document.createDocumentFragment();

  var renderPins = function (data) {
    var pinBtn = document.querySelector('button[type="button"]');
    if (!pinBtn) {
      data.forEach(function (el) {
        fragmentPin.appendChild(window.map.createPinElem(el));
      });
      mapPins.appendChild(fragmentPin);
    }
  };

  var activationPageHandler = function () {
    window.utils.map.classList.remove('map--faded');
    sectionForm.classList.remove('ad-form--disabled');
    window.load(successHandler, errorHandler);
    window.utils.setAdressCoordinates();
    activateFormFildset();
  };

  window.utils.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      evt.preventDefault();
      activationPageHandler();
    }
  });

  window.utils.mainPin.addEventListener('click', function () {
    activationPageHandler();
  });

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
  };

  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', blockPageHandler);

  var successHandler = function (data) {
    renderPins(data);
  };


  var errorHandler = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElem = errorTemplate.cloneNode(true);
    errorElem.querySelector('.error__message').textContent = errorMessage;
    document.body.appendChild(errorElem);
    errorElem.querySelector('.error__button').addEventListener('click', function () {
      closeError(errorElem);
    });
    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        evt.preventDefault();
        errorElem.remove();
        blockPageHandler();
      }
    });
  };

  var closeError = function (el) {
    el.remove();
    blockPageHandler();
  };

  window.pagehandler = {
    activationPageHandler: activationPageHandler
  };

  window.utils.mainPin.addEventListener('mousedown', function (evt) {

    window.pagehandler.activationPageHandler();

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
