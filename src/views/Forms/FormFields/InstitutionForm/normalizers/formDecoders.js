export const decodeHierarhicalLinks = (data) => {
  let {hierarchical_parent, hierarchical_child, ...values} = data;
  values['hierarchical_links'] = [];

  if (hierarchical_parent && hierarchical_parent.length > 0) {
    hierarchical_parent.forEach(link => {
      values['hierarchical_links'].push({
        id: link.id,
        institution: [link.institution],
        relationship: {
          id: "child",
          relationship: "Child of",
        },
        valid_from: link.valid_from,
        valid_to: link.valid_to,
        relationship_note: link.relationship_note,
      })
    });
  }

  if (hierarchical_child && hierarchical_child.length > 0) {
    hierarchical_child.forEach(link => {
      values['hierarchical_links'].push({
        id: link.id,
        institution: [link.institution],
        relationship: {
          id: "parent",
          relationship: "Parent of",
        },
        valid_from: link.valid_from,
        valid_to: link.valid_to,
        relationship_note: link.relationship_note,
      })
    });
  }
  return values;
};

export const decodeHistoricalLinks = (data) => {
  let {historical_source, historical_target, ...values} = data;
  values['historical_links'] = [];

  if (historical_source && historical_source.length > 0) {
    historical_source.forEach(link => {
      values['historical_links'].push({
        id: link.id,
        institution: [link.institution],
        relationship_type: {
          institution_direction: "source",
          relationship: link.relationship_type.type_from,
          relationship_type_id: link.relationship_type.id
        },
        relationship_note: link.relationship_note,
        relationship_date: link.relationship_date
      })
    });
  }

  if (historical_target && historical_target.length > 0) {
    historical_target.forEach(link => {
      values['historical_links'].push({
        id: link.id,
        institution: [link.institution],
        relationship_type: {
          institution_direction: "target",
          relationship: link.relationship_type.type_to,
          relationship_type_id: link.relationship_type.id
        },
        relationship_note: link.relationship_note,
        relationship_date: link.relationship_date
      })
    });
  }

  return values;
};
