import {validateURL} from "../../../../../utils/validators";

const validateOriginalLocation = (value, values) => {
  const files = values['filename'] ? values['filename'] : '';
  const original_file = values['original_location'];

  if(files.length > 0) {
    if(value) {
      return "Please either upload a file or enter its location. (Both were entered.)"
    }
  }

  if(!(files.length > 0) && !original_file) {
    if(!value) {
      return "Please either upload a file or enter its location. (Neither were entered.)"
    }
  }

  if (value.length > 500) {
    return "Please ensure that the URL has no more than 500 characters!"
  }

  if(value) {
    return validateURL(value)
  }
};

export default validateOriginalLocation;
