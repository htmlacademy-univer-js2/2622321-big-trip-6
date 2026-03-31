const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const CITIES = ['Amsterdam', 'Geneva', 'Chamonix'];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.'
];

const OFFERS_BY_TYPE = {
  'Taxi': [{ title: 'Upgrade to business class', price: 50 }, { title: 'Child seat', price: 15 }],
  'Bus': [{ title: 'Wi-Fi', price: 10 }, { title: 'Extra luggage', price: 20 }],
  'Train': [{ title: 'First class', price: 80 }, { title: 'Meal', price: 25 }],
  'Ship': [{ title: 'Cabin', price: 150 }, { title: 'Meal', price: 35 }],
  'Drive': [{ title: 'Insurance', price: 30 }, { title: 'GPS', price: 10 }],
  'Flight': [{ title: 'Luggage', price: 30 }, { title: 'Business class', price: 120 }, { title: 'Meal', price: 20 }],
  'Check-in': [{ title: 'Breakfast', price: 25 }],
  'Sightseeing': [{ title: 'Guide', price: 40 }, { title: 'Audio guide', price: 15 }],
  'Restaurant': [{ title: 'Set menu', price: 45 }, { title: 'Wine', price: 20 }]
};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const createDestination = (cityName) => ({
  name: cityName,
  description: DESCRIPTIONS.slice(0, getRandomInt(1, 3)).join(' '),
  pictures: Array.from({ length: getRandomInt(1, 3) }, (_, i) => ({
    src: `https://loremflickr.com/248/152?random=${getRandomInt(1, 1000)}`,
    description: `${cityName} photo ${i + 1}`
  }))
});

const createPoint = (index) => {
  const city = CITIES[index % CITIES.length];
  const type = TYPES[index % TYPES.length];

  const startDate = new Date(2024, 2, 18 + index, 10 + index, 30);
  const endDate = new Date(startDate.getTime() + getRandomInt(1, 3) * 60 * 60 * 1000);

  return {
    id: String(index + 1),
    type: type,
    destination: createDestination(city),
    dateFrom: startDate.toISOString(),
    dateTo: endDate.toISOString(),
    basePrice: getRandomInt(100, 500),
    offers: OFFERS_BY_TYPE[type].slice(0, getRandomInt(0, OFFERS_BY_TYPE[type].length)),
    isFavorite: false
  };
};

export const points = [
  createPoint(0),
  createPoint(1),
  createPoint(2)
];
