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


export const encodeHierarchicalLink = (formValues) => {
  let {hierarchical_links, ...values} = formValues;
  values['hierarchical_parent'] = [];
  values['hierarchical_child'] = [];

  if (hierarchical_links.length > 0) {
    hierarchical_links.forEach(link => {
      link['institution'] = link['institution'][0];
      if (link.relationship.id === 'parent') {
        values['hierarchical_child'].push(link);
      } else {
        values['hierarchical_parent'].push(link);
      }
    });
  }
  return values;
};


export const encodeHistoricalLink = (formValues) => {
  let {historical_links, ...values} = formValues;
  values['historical_source'] = [];
  values['historical_target'] = [];

  if (historical_links.length > 0) {
    historical_links.forEach(link => {
      const direction = link['relationship_type']['institution_direction'];
      link['institution'] = link['institution'][0];
      link['relationship_type'] = {id: link['relationship_type']['relationship_type_id']};
      if (direction === 'target') {
        values['historical_source'].push(link);
      } else {
        values['historical_target'].push(link);
      }
    });
  }

  return values;
};
