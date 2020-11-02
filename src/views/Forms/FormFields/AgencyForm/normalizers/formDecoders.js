
export const decodeNameData = (data) => {
  const {names_actual, names_former, ...values} = data;

  const names_current = names_actual[0];
  values['current_primary_name'] = [names_current['agency_name_versions'].shift()];
  values['current_alternative_names'] = names_current['agency_name_versions'];
  delete(names_current['agency_name_versions']);
  values['current_name_data'] = names_current;

  values['names_former'] = [];
  names_former.forEach(name => {
    if (name['agency_name_versions'].length > 0) {
      name['former_primary_name'] = [name['agency_name_versions'].shift()];
      name['former_alternative_names'] = name['agency_name_versions'];
      delete(name['agency_name_versions']);
    }
    values['names_former'].push(name)
  });

  return values;
};
