const validatePrimaryCheckbox = (values, field) => {
  let isOneTrue = false;

  if (values.hasOwnProperty('agency_name_versions')) {
    const agency_name_versions = values['agency_name_versions'];
    agency_name_versions.forEach((agency_name_version) => {
      if (agency_name_version.hasOwnProperty(field) && agency_name_version[field]) {
        isOneTrue = true;
      }
    });
  }

  if (!isOneTrue) {
    return "At least one primary form is required!"
  }
};

export default validatePrimaryCheckbox;
