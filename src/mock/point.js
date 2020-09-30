const MAX_HOUR_GAP = 3;
const MAX_MINUTE_GAP = 59;
const MIN_SENTENCE_COUNT = 1;
const MAX_SENTENCE_COUNT = 5;
const PLUS_PROBABILITY = 0.5;
const MIN_PICTURE_COUNT = 1;
const MAX_PICTURE_COUNT = 10;

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomIntegers = (a = 0, b = 1, maxCount = 1) => {
  const count = getRandomInteger(0, maxCount);
  let result = [];
  for (let i = 0; i < maxCount; i++) {
    result.push(i);
  }
  return result.slice().sort(
    () => {return PLUS_PROBABILITY - Math.random()}
  ).slice(0, count + 1);
}

let prevDate = new Date();

const generateDate = () => {
  const date = new Date(prevDate);
  const hourGap = getRandomInteger(0, MAX_HOUR_GAP);
  const minuteGap = getRandomInteger(0, MAX_MINUTE_GAP);
  date.setHours(date.getHours() + date.getTimezoneOffset() / 60 + hourGap, date.getMinutes() +  minuteGap, 0, 0);
  prevDate.setTime(date.getTime());

  return date;
}

const generateDescription = () => {
  const sentences = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];

  const randomCount = getRandomInteger(MIN_SENTENCE_COUNT, MAX_SENTENCE_COUNT);

  return sentences.slice().sort(
    () => {return PLUS_PROBABILITY - Math.random()}
  ).slice(MIN_SENTENCE_COUNT - 1, MAX_SENTENCE_COUNT)
  .join(` `);
};

const generatePicture = () => {
  return {
    src: `http://picsum.photos/248/152?r=${Math.random()}`,
    description: generateDescription()
  }
}

const generatePictures = () => {
  const count = getRandomInteger(MIN_PICTURE_COUNT, MAX_PICTURE_COUNT);
  const pictures = [];
  for (let i = 0; i < count; i++) {
    pictures.push(generatePicture());
  }

  return pictures;
}

const destinations = [
  {
    description: generateDescription(),
    name: `Amsterdam`,
    pictures: generatePictures()
  }, {
    description: generateDescription(),
    name: `Chamonix`,
    pictures: generatePictures()
  }, {
    description: generateDescription(),
    name: `Geneva`,
    pictures: generatePictures()
  }, {
    description: generateDescription(),
    name: `Saint Petersburg`,
    pictures: generatePictures()
  }
];

let prevId = 0;

const generateId = () => {
  const id = prevId + 1;
  prevId = id;
  return id;
}

const types = [
  {
    name: `Taxi`,
    preposition: `to`,
    offers: [
      {
        "title": "Upgrade to a business class",
        "price": 120
      }, {
        "title": "Choose the radio station",
        "price": 60
      }
    ]
  }, {
    name: `Bus`,
    preposition: `to`,
    offers: [
      {
        "title": "Choose meal",
        "price": 180
      }, {
        "title": "Upgrade to comfort class",
        "price": 50
      }
    ]
  }, {
    name: `Train`,
    preposition: `to`,
    offers: [
      {
        "title": "Add luggage",
        "price": 20
      }, {
        "title": "Switch to comfort class",
        "price": 70
      }
    ]
  }, {
    name: `Ship`,
    preposition: `to`,
    offers: [
      {
        "title": "Add luggage",
        "price": 30
      }, {
        "title": "Switch to comfort class",
        "price": 80
      }
    ]
  }, {
    name: `Transport`,
    preposition: `to`,
    offers: [
      {
        "title": "Add luggage",
        "price": 25
      }, {
        "title": "Upgrade to a business class",
        "price": 100
      }
    ]
  }, {
    name: `Drive`,
    preposition: `to`,
    offers: [
      {
        "title": "Add luggage",
        "price": 40
      }, {
        "title": "Upgrade to a business class",
        "price": 130
      }
    ]
  }, {
    name: `Flight`,
    preposition: `to`,
    offers: [
      {
        "title": "Add luggage",
        "price": 30
      }, {
        "title": "Switch to comfort class",
        "price": 100
      },
      {
        "title": "Add meal",
        "price": 15
      },
      {
        "title": "Choose seats",
        "price": 5
      },
      {
        "title": "Travel by train",
        "price": 40
      }
    ]
  }, {
    name: `Check-in`,
    preposition: `in`,
    offers: [
      {
      "title": "Add meal",
      "price": 30
      }, {
      "title": "Switch to comfort class",
      "price": 200
      }
    ]
  }, {
    name: `Sightseeing`,
    preposition: `in`,
    offers: [
    ]
  }, {
    name: `Restaurant`,
    preposition: `in`,
    offers: [
    ]
  }
];

const generatePoint = () => {
  const randomTypeIndex = getRandomInteger(0, types.length - 1);
  const maxOfferCount = types[randomTypeIndex].offers.length;
  return {
    basePrice: getRandomInteger(0, 2500),
    dateFrom: generateDate(),
    dateTo: generateDate(),
    destinationIndex: getRandomInteger(0, destinations.length - 1),
    id: generateId(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offerIndexes: getRandomIntegers(0, maxOfferCount - 1, maxOfferCount),
    typeIndex: randomTypeIndex
  };
};

export {
  destinations,
  types,
  generateId,
  generatePoint
};
