export const encodeNames = (formValues) => {
  let {names_actual, names_former, ...values} = formValues;
  values['names'] = [];

  if (names_actual && names_actual.length > 0) {
    values['names'] = [...values['names'], ...names_actual];
  }

  if (names_former && names_former.length > 0) {
    values['names'] = [...values['names'], ...names_former];
  }
  return values;
};


export const encodeIdentifiers = (formValues) => {
  let {identifiers_local, identifiers_national, ...values} = formValues;
  values['identifiers'] = [];

  if (identifiers_local && identifiers_local.length > 0) {
    values['identifiers'] = [...values['identifiers'], ...identifiers_local];
  }

  if (identifiers_national && identifiers_national.length > 0) {
    values['identifiers'] = [...values['identifiers'], ...identifiers_national];
  }
  return values;
};
