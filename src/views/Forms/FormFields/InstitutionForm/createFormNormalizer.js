export const createFormNormalizer = (formValues) => {
  let normalizedValues = {};
  if (!Object.keys(formValues.names_actual[0]).includes('alternative_names')) {
    formValues.names_actual[0].alternative_names = []
  }
  const names = formValues.names_former
    ? [...formValues.names_actual, ...formValues.names_former]
    : formValues.names_actual

  Object.keys(formValues).forEach(key => {
    if (key === 'countries') {
      normalizedValues[key] = formValues[key].map(c => ({city: c.city, country: c.country.id}));
    } else if (key === 'hierarchical_links') {
      normalizedValues['hierarchical_parent'] = formValues[key].filter(link =>
        link.position === 'parent').map(l => ({
        institution: l.institution.id,
        relationship_note: l.relationship_note,
        valid_from: l.valid_from,
        valid_to: l.valid_to
      }));
      normalizedValues['hierarchical_child'] = formValues[key].filter(link =>
        link.position === 'child').map(l => ({
        institution: l.institution.id,
        relationship_note: l.relationship_note,
        valid_from: l.valid_from,
        valid_to: l.valid_to
      }));
    } else if (key === 'historical_links') {
      normalizedValues['historical_source'] = formValues[key].filter(link =>
        link.direction === 'source').map(l => ({
        institution: l.institution.id,
        relationship_note: l.relationship_note,
        relationship_type: l.relationship_type.id,
        relationship_date: l.relationship_date
      }));
      normalizedValues['historical_target'] = formValues[key].filter(link =>
        link.direction === 'target').map(l => ({
        institution: l.institution.id,
        relationship_note: l.relationship_note,
        relationship_type: l.relationship_type.id,
        relationship_date: l.relationship_date
      }));
    } else if (key === 'names_actual') {
      normalizedValues['names'] = names;
    } else if (key === 'names_former') {
      normalizedValues['names'] = names;
    } else if (key === 'flags') {
      normalizedValues['flags'] = formValues[key][0] && formValues[key][0].flag !== 'none' ? formValues[key] : [];
    } else if (key === 'identifiers_local') {
      normalizedValues['identifiers'] = formValues[key].map(id => ({
        ...id,
        agency: id.agency.id,
        resource: 'local identifier'
      }))
    } else if (key === 'qf_ehea_levels') {
      normalizedValues['qf_ehea_levels'] = formValues.qf_ehea_levels.map(l => ({qf_ehea_level: l.id}));
    } else {
      normalizedValues[key] = formValues[key];
    }
  });
  return normalizedValues;
}
