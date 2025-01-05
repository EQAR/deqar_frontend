export const encodeNameData = (formValues) => {
  let {current_name_data, current_primary_name, current_alternative_names, names_former, ...values} = formValues;
  values['names'] = [];

  current_primary_name.forEach(name => {
    name['name_is_primary'] = true;
    name['acronym_is_primary'] = true;
  });
  current_name_data['agency_name_versions'] = [...current_primary_name, ...current_alternative_names];

  const former_name_data = [];

  names_former.forEach(name => {
    name['former_primary_name'].forEach(primaryName => {
      primaryName['name_is_primary'] = true;
      primaryName['acronym_is_primary'] = true;
    });

    console.log(name)

    if (name.hasOwnProperty('former_alternative_names')) {
      name['agency_name_versions'] = [...name['former_primary_name'], ...name['former_alternative_names']];
    } else {
      name['agency_name_versions'] = [...name['former_primary_name']]
    }

    delete(name['former_primary_name']);
    delete(name['former_alternative_names']);
    former_name_data.push(name);
  });

  values['names'] = ([current_name_data, ...former_name_data]);
  return values;
};
