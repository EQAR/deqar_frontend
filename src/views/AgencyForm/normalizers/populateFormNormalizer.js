
export const populateFormNormalizer = (formValues) => {
  formValues['former_names'] = [];
  formValues['current_names'] = [];
  const {names} = formValues;

  names.forEach((name) => {
    if (name['name_valid_to']) {
      formValues['former_names'].push(name)
    } else {
      formValues['current_names'].push(name)
    }
  });

  return formValues;
};