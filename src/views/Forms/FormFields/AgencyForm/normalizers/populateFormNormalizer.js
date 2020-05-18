
export const decodeNameData = (formValues) => {
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

export const encodeNameData = (formValues) => {
  let {former_names, current_names, ...values} = formValues;
  values['names'] = [...current_names, ...former_names];
  return values;
};
