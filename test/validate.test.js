const { validateHouseObject } = require('../src/validate');

const validHouseObj = {
  price_value: 200.0,
  price_currency: 'EUR',
  market_date: '2000-02-02',
  size_rooms: 20,
  size_living_area: 300,
  link: 'https://www.npmjs.com/package/validator',
  location_country: 'Netherlands',
  location_city: 'Amsterdam',
  location_address: 'Domsquare 32',
  location_coordinates_lat: 313.44,
  location_coordinates_lng: 239.984,
  title: 'Big new house',
  description: 'Some description Some description Some description Some description ',
  images: '<link1>, <link2>, <link3>, <link1>, <link2>, <link3>',
  sold: 1,
};

const missingMarketDate = {
  price_value: 200.0,
  price_currency: 'EUR',
  size_rooms: 20,
  size_living_area: 300,
  link: 'https://www.npmjs.com/package/validator',
  location_country: 'Netherlands',
  location_city: 'Amsterdam',
  location_address: 'Domsquare 32',
  location_coordinates_lat: 313.44,
  location_coordinates_lng: 239.984,
  title: 'Big new house',
  description: 'Some description Some description Some description Some description ',
  images: '<link1>, <link2>, <link3>, <link1>, <link2>, <link3>',
  sold: 1,
};

const invalidCurrencySymbol = {
  price_value: 200.0,
  price_currency: 'YEN',
  market_date: '2000-02-02',
  size_rooms: 20,
  size_living_area: 300,
  link: 'https://www.npmjs.com/package/validator',
  location_country: 'Netherlands',
  location_city: 'Amsterdam',
  location_address: 'Domsquare 32',
  location_coordinates_lat: 313.44,
  location_coordinates_lng: 239.984,
  title: 'Big new house',
  description: 'Some description Some description Some description Some description ',
  images: '<link1>, <link2>, <link3>, <link1>, <link2>, <link3>',
  sold: 1,
};

const threeErrors = {
  price_value: '200.0', // must be a number
  price_currency: 'RMB', // invalid currrency code
  market_date: '2000-02-02',
  size_rooms: -20, // must be positive
  size_living_area: 300,
  link: 'https://www.npmjs.com/package/validator',
  location_country: 'Netherlands',
  location_city: 'Amsterdam',
  location_address: 'Domsquare 32',
  location_coordinates_lat: 313.44,
  location_coordinates_lng: 239.984,
  title: 'Big new house',
  description: 'Some description Some description Some description Some description ',
  images: '<link1>, <link2>, <link3>, <link1>, <link2>, <link3>',
  sold: 1,
};

describe('validate house object', () => {
  test('a valid object should have zero errors', () => {
    const errors = validateHouseObject(validHouseObj);
    expect(errors.length).toBe(0);
  });

  test('an object that just misses market_date should have one error', () => {
    const errors = validateHouseObject(missingMarketDate);
    expect(errors.length).toBe(1);
  });

  test('an object with an unsupported currency code should have one error', () => {
    const errors = validateHouseObject(invalidCurrencySymbol);
    expect(errors.length).toBe(1);
  });

  test('an object with mutiple errors should have multiple errors', () => {
    const errors = validateHouseObject(threeErrors);
    expect(errors.length).toBe(3);
  });
});
