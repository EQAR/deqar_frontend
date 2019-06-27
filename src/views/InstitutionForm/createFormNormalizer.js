export const createFormNormalizer = (formValues) => {
  console.log(formValues);
  let normalizedValues = {};
  const names = formValues.names_former
    ? [...formValues.names_actual, ...formValues.names_former]
    : formValues.names_actual

  Object.keys(formValues).forEach(key => {
    if (key === 'countries') {
      normalizedValues[key] = formValues[key].map(c => ({city: c.city, country: c.country.id}));
    } else if (key === 'hierarchical_links') {
      normalizedValues['hierarchical_parent'] = formValues[key].filter(link =>
        link.position === 'parent').map(l => ({
        institution: l.institution,
        relationship_note: l.relationship_note,
        valid_from: l.valid_from,
        valid_to: l.valid_to
      }));
      normalizedValues['hierarchical_child'] = formValues[key].filter(link =>
        link.position === 'child').map(l => ({
        institution: l.institution,
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
      normalizedValues['flags'] = formValues[key][0].flag !== 'none' ? formValues[key] : [];
    } else if (key === 'identifiers_local') {
      normalizedValues['identifiers'] = formValues[key].map(id => ({
        ...id,
        agency: id.agency.id,
        resource: 'local identifier'
      }))
    } else {
      normalizedValues[key] = formValues[key];
    }
  });
  console.log(normalizedValues)
  return normalizedValues;
}
