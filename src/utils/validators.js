import * as EmailValidator from 'email-validator';
import moment from 'moment'

export const validateRequired = (value) => {
  if (!value) {
    return 'This field is required!'
  } else if (value.length === 0) {
    return 'This field is required!'
  }
}

export const validateEmail = (value) => {
  if (!EmailValidator.validate(value)) {
    return 'E-mail should be properly formatted.'
  }
}

export const validateValuesMatch = (val1, val2) => {
  if (val1 !== val2) {
    return 'Values do not match!'
  }
}

export const validateDate = (value) => {
  if (value) {
    return !moment(value, 'YYYY-MM-DD', true).isValid()
    ? 'Date format is invalid!'
    : null
  }
}

export const validatePastDate = (value) => (
  moment(value).isAfter(new Date())
  ? 'Date should be earlier!'
  : null
)

export const validateRequiredDate = (value) => validateRequired(value) || validateDate(value)

export const validateRequiredPastDate = (value) => (
  validateRequiredDate(value)
  || validatePastDate(value)
)

export const validateURL = (value) => {
  if (value) {
    try {
      new URL(value);
    }
    catch(error) {
      return 'The URL is not properly formatted.'
    }
  }
}

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

export const validateDateFrom = (value, date_to) => {
  if (!validateDate(value)) {
    if (date_to) {
      if (!moment(value).isBefore(date_to)) {
        return "Founding year is later than closing year"
      }
    }
  } else {
    return validateDate(value);
  }
}

export const validateDateFromRequired = (value, date_to) => {
  if (!validateRequiredDate(value)) {
    if (date_to) {
      if (!validateRequiredDate(date_to)) {
        return validateDateFrom(value, date_to) ? validateDateFrom(value, date_to) : null;
      }
    }
  } else {
    return validateRequiredDate(value);
  }
}
