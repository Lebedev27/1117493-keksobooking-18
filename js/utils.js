'use strict';

(function () {
  var ENTER_KEY = 13;
  var ESC_KEY = 27;
  var pinImg = document.querySelector('.map__pin--main img');
  var map = document.querySelector('.map');

  window.utils = {
    ENTER_KEY: ENTER_KEY,
    ESC_KEY: ESC_KEY,
    pinImg: pinImg,
    map: map
  };
})();
