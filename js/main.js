'use strict';

var createMocks = function () {
  var MOCKS_LENGTH = 8;
  var TYPE_ARRAY = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_ARRAY = ['12:00', '13:00', '14:00'];
  var CHECKOUT_ARRAY = ['12:00', '13:00', '14:00'];
  var FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS_ARRAY = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var mocksArray = [];

  for (var i = 0; i < MOCKS_LENGTH; i++) {
    var mocksObject = {
      'author': {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': 'Заголовок',
        'address': '{{location.x}}, {{location.y}}',
        'price': 0,
        'type': 'palace, flat, house или bungalo',
        'rooms': 0,
        'guests': 0,
        'checkin': 'строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00',
        'checkout': 'строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00',
        'features': FEATURES_ARRAY,
        'description': 'описание',
        'photos': PHOTOS_ARRAY,
      },

      'location': {
        'x': 'случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.',
        'y': 'случайное число, координата y метки на карте от 130 до 630'
      }
    };
    mocksArray.push(mocksObject);
  }
  return mocksArray;
};
console.log(createMocks());

