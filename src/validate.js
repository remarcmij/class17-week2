const validator = require('validator');

const CURRENCY_CODES = ['EUR', 'USD', 'GBP'];

const appendError = (field, type, errors) => [...errors, `type of ${field} must be: ${type}`];

const validateNonEmptyString = (field, value, errors) =>
  typeof value === 'string' && value.length > 0 ? errors : appendError(field, 'string', errors);

const validateDate = (field, value, errors) =>
  validator.isISO8601(value) ? errors : appendError(field, 'date', errors);

const validateNumber = (field, value, errors) =>
  Number.isFinite(value) ? errors : appendError(field, 'number', errors);

const validateCurrencyCode = (field, value, errors) =>
  CURRENCY_CODES.includes(value) ? errors : appendError(field, 'valid currency code', errors);

const validatePositiveNumber = (field, value, errors) =>
  Number.isFinite(value) && value > 0 ? errors : appendError(field, 'positive number', errors);

const validateNonNegativeInteger = (field, value, errors) =>
  Number.isInteger(value) && value >= 0
    ? errors
    : appendError(field, 'positive whole number', errors);

// etc

const VALIDATIONS = {
  link: { required: true, fn: validateNonEmptyString },
  market_date: { required: true, fn: validateDate },
  location_country: { required: true, fn: validateNonEmptyString },
  location_city: { required: true, fn: validateNonEmptyString },
  location_address: { fn: validateNonEmptyString },
  location_coordinates_lat: { fn: validateNumber },
  location_coordinates_lng: { fn: validateNumber },
  size_rooms: { fn: validateNonNegativeInteger },
  price_value: { required: true, fn: validatePositiveNumber },
  price_currency: { required: true, fn: validateCurrencyCode },
  // etc
};

function validateRequiredFieldsPresent(houseObj, errors) {
  return Object.keys(VALIDATIONS)
    .filter(key => VALIDATIONS[key].required)
    .reduce((prev, key) => {
      return houseObj[key] === undefined ? [...prev, `${key} is required`] : prev;
    }, errors);
}

function validateFieldValues(houseObj, errors) {
  return Object.keys(houseObj).reduce((prev, key) => {
    const validation = VALIDATIONS[key];
    return validation ? validation.fn(key, houseObj[key], prev) : prev;
  }, errors);
}

function validateExceptions(houseObj, errors) {
  // Deal with validations that span multiple field or
  // that for whatever reason can not be done with the
  // VALIDATIONS table.
  // TODO: validate that either an address or a lng/lat pair
  // is present and valid.
  return errors;
}

function validateHouseObject(houseObj) {
  let errors = validateRequiredFieldsPresent(houseObj, []);
  errors = validateFieldValues(houseObj, errors);
  errors = validateExceptions(houseObj, errors);

  // console.log for debug purposes: remove from final code
  console.log(errors);
  return errors;
}

module.exports = {
  validateHouseObject,
};
