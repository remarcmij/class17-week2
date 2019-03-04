# Class17 Graduation Project - Week 2

## VSCode configuration

In anticipation of collaborating on a single repository later, you all need to adopt the same code formatting style and convention. As of class 18 we have introduced Prettier as the standard code formatter to use in HYF. To configure your VSCode editor to use Prettier, please revisit the [VSCode Tips](https://github.com/HackYourFuture/fundamentals/tree/master/VSCodeTips) and follow the installation instructions.

## API routing

In the file that handles the API routing most of you have written the code for the request handlers as inline anonymous functions for the API endpoints. While that is fine as a first approach, a quick refactoring makes the code more readible.

The abbreviated example below was taken from the homework of @heboshka.

```js
router
  .route('/houses')
  .get((req, res) => {
    // longish code
  })
  .post((req, res) => {
    // longish code
  });

router
  .route('/houses/:id')
  .get((req, res) => {
    // longish code
  })
  .delete((req, res) => {
    // longish code
  });
```

Refactored code: Each request handler is now placed in a separate function, appropriately named. At the bottom of the file the API endpoints and their request handlers are defined in a concise, easy to understand fashion.

```js
const getHouses = (req, res) => {
  // longish code
};

const postHouses = (req, res) => {
  // longish code
};

const getHouseDetail = (req, res) => {
  // longish code
};

const deleteHouse = (req, res) => {
  // longish code
};

router
  .route('/houses')
  .get(getHouses)
  .post(postHouses);

router
  .route('/houses/:id')
  .get(getHouseDetail)
  .delete(deleteHouse);
```

## Table-driven field validation

I would like to introduce an alternative approach for organizing the logic for field validation, just for your consideration. No need to implement this (but go ahead if you like).

This (incomplete) example illustrates how you can refactor the field validation logic from a longish `if-then-else` or `switch` statement to a more cleaner version using a _table-driven_ method.

> See for instance on Stack Overflow: [What are table-driven methods?](https://stackoverflow.com/questions/105311/what-are-table-driven-methods)

The refactored code is not necessarily shorter than an `if-then-else`. The purpose of refactoring would be to make the code more readable and easily extendible.

> This is not code that you would typically start with. Typically you would start with a bare-bones `if-then-else` or `switch` as was done in class. Only when you start to realize that the resulting code is becoming unwieldy and repetitive you might consider spending the extra time and effort of refactoring.

In the `validateHouseObject` function the 'table' is given by this JavaScript object:

```js
const VALIDATIONS = {
  link: { required: true, fn: validateNonEmptyString },
  market_date: { required: true, fn: validateDate },
  location_country: { required: true, fn: validateNonEmptyString },
  location_city: { required: true, fn: validateNonEmptyString },
  location_address: { fn: validateNonEmptyString },
  location_coordinates_lat: { fn: validateNumber },
  location_coordinates_lng: { fn: validateNumber },
  size_rooms: { fn: validatePositiveInteger },
  price_value: { required: true, fn: validatePositiveNumber },
  price_currency: { required: true, fn: validateCurrencyCode },
  // etc
};
```

Each property in this object defines an input field to be validated. The property name corresponds to the name of the field to validate and the property value is another object that indicates whether the field is required and the name of a validation function.

Each validation function has the following signature:

```js
(field, value, errors) => errors;
```

where:

| name     | description                                  |
| -------- | -------------------------------------------- |
| `field`  | The name of the field to validate.           |
| `value`  | The value of the field to validate.          |
| `errors` | An array of error strings (initially empty). |

If the field has been validated successfully, the function simply returns the `error` array argument unmodified. If the field is not valid a new array with an new error string appended is returned. Example:

```js
const validateNumber = (field, value, errors) =>
  Number.isFinite(value) ? errors : [...errors, `type of ${field} must be: number`];
```

Given the `VALIDATIONS` 'table', we can now iterate through its properties to validate that all required fields are present in the input object. Next we can iterate through the properties of the input object itself to validate the value of its fields. The `.reduce()` array method is ideally suited for both tasks.

For more detail, review the code itself.

### Unit testing

The `validateHouseObject` function (in the `src` folder) is an ideal candidate for **unit testing**.

> Stack Overflow: [What is unit testing?](https://stackoverflow.com/questions/1383/what-is-unit-testing)

In this example we are using [Jest](https://jestjs.io/) to test `validateHouseObject` using valid and invalid sample data. The tests (again, incomplete) are defined in `test/validate.test.js`.

> As a junior developer you are not expected to produce code like this. However, it is important that you understand why such code might be considered an improvement over longish `if-then-else` logic.

### Installation

```
npm install
```

### Run tests

```
npm test
```
