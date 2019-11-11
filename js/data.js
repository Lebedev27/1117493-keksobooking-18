'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var AVATAR_SRC = 'img/muffin-grey.svg';
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';
  var SUCCESS_CODE = 200;
  var DEBOUNCE_INTERVAL = 500;
  var MAX_PRICE = 50000;
  var MIN_PRICE = 10000;
  var MIN_X = 130;
  var MAX_X = 630;
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var START_X = 570;
  var START_Y = 375;
  var PINS_MAXIMUM = 5;

  window.const = {
    FILE_TYPES: FILE_TYPES,
    AVATAR_SRC: AVATAR_SRC,
    LOAD_URL: LOAD_URL,
    UPLOAD_URL: UPLOAD_URL,
    SUCCESS_CODE: SUCCESS_CODE,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    MAX_PRICE: MAX_PRICE,
    MIN_PRICE: MIN_PRICE,
    MIN_X: MIN_X,
    MAX_X: MAX_X,
    ENTER_KEYCODE: ENTER_KEYCODE,
    START_X: START_X,
    START_Y: START_Y,
    ESC_KEYCODE: ESC_KEYCODE,
    PINS_MAXIMUM: PINS_MAXIMUM
  };
})();
