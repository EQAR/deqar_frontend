
export const populateFormNormalizer = (formValues) => {
  formValues['former_names'] = [];
  formValues['current_names'] = [];
  let {names, ...values} = formValues;

  names.forEach((name) => {
    if (name['name_valid_to']) {
      values['former_names'].push(name)
    } else {
      values['current_names'].push(name)
    }
  });

  return values;
};