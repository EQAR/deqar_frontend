import * as EmailValidator from 'email-validator';
import moment from 'moment'

export const validateRequired = (value) => {
  if (!value) {
    return "This field is required!"
  } else if (value.length === 0) {
    return "This field is required!"
  }
}

export const validateEmail = (value) => {
  if (!EmailValidator.validate(value)) {
    return "E-mail should be properly formatted."
  }
};

export const validateValuesMatch = (val1, val2) => {
  if (val1 !== val2) {
    return "Values do not match!"
  }
};

export const validateDate = (value) => {
  if (value) {
    if (!moment(value, "YYYY-MM-DD", true).isValid()) {
      return "Date format is invalid!"
    }
  }
};

export const validateRequiredDate = (value) => {
  return validateRequired(value) || validateDate(value);
};

export const validateURL = (value) => {
  if (value) {
    try {
      new URL(value);
    }
    catch(error) {
      return "The URL is not properly formatted."
    }
  }
};
