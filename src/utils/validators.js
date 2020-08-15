import * as EmailValidator from 'email-validator';
import moment from 'moment'

export const validateRequired = (value) => {
  if (!value) {
    return 'This field is required!'
  } else if (value.length === 0) {
    return 'This field is required!'
  }
};

export const validateEmail = (value) => {
  if (!EmailValidator.validate(value)) {
    return 'E-mail should be properly formatted.'
  }
};

export const validateValuesMatch = (val1, val2) => {
  if (val1 !== val2) {
    return 'Values do not match!'
  }
};

export const validateDate = (value) => {
  if (value) {
    return !moment(value, 'YYYY-MM-DD', true).isValid()
    ? 'Date format is invalid!'
    : null
  }
};

export const validatePastDate = (value) => (
  moment(value).isAfter(new Date())
  ? 'Date should not exceed today\'s date!'
  : null
);

export const validateRequiredDate = (value) => validateRequired(value) || validateDate(value)

export const validateRequiredPastDate = (value) => (
  validateRequiredDate(value)
  || validatePastDate(value)
);

export const validateURL = (value) => {
  if (value) {
    try {
      new URL(value);
    }
    catch(error) {
      return 'The URL is not properly formatted.'
    }
  }
};

export const validateRequiredURL = (value) => validateRequired(value) || validateURL(value)

export const validateRoman = (value) => {
  if (value) {
    return (
      /^[A-Za-z0-9,.'" ]+$/.test(value)
        ? null
        : 'Use roman alphabet'
    )
  }
};

export const validateDateFrom = (value, date_to, errorMessage) => {
  if (!validateDate(value)) {
    if (date_to) {
      if (!moment(value).isBefore(date_to)) {
        return errorMessage
      }
    }
  } else {
    return validateDate(value);
  }
}

export const validateDateFromRequired = (value, date_to, errorMessage) => {
  if (!validateRequiredDate(value)) {
    if (date_to) {
      if (!validateRequiredDate(date_to)) {
        return validateDateFrom(value, date_to, errorMessage) ? validateDateFrom(value, date_to, errorMessage) : null;
      }
    }
  } else {
    return validateRequiredDate(value);
  }
};

export const validateMultipleDate = (value, formerNames) => formerNames.some(n => n.name_valid_to === value) ? 'Date belongs to other name set' : null;

export const validateMultipleRequiredDate = (value, formerNames) => (
  validateRequiredDate(value)
  || validatePastDate(value)
  || validateMultipleDate(value, formerNames)
);

export const validateUnique = (value, fields, formValues) => {
  let numberOfValues = 0;

  fields.forEach((field) => {
    const f = field.split('.');
    switch (f.length) {
      case 1:
        if (formValues.hasOwnProperty(f[0])) {
          if (formValues[f[0]] === value) {
            numberOfValues += 1;
          }
        }
        break;
      case 2:
        if (formValues.hasOwnProperty(f[0])) {
          formValues[f[0]].forEach((subform) => {
            if (subform.hasOwnProperty(f[1])) {
              if (subform[f[1]] === value) {
                numberOfValues += 1;
              }
            }
          })
        }
        break;
      default:
        break;
    }
  });
  if(numberOfValues > 1) {
    return 'Duplicate entry, please correct it before submission'
  }
}

export const validateRequiredUnique = (value, fields, formValues) => validateRequired(value) || validateUnique(value, fields, formValues)
