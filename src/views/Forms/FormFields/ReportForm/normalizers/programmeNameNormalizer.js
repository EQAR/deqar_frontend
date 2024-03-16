// Function to tailor the programme_data - alternative_names for proper display
export const decodeProgrammeNameData = (data) => {
  let {programmes} = data;
  if (programmes) {
    programmes.forEach((programme) => {
      let {alternative_names} = programme;
      alternative_names.forEach((aname, idx) => {
        if (aname['name_is_primary']) {
          programme['alternative_name_id'] = aname['id'];
          programme['name_primary'] = aname['name_alternative'];
          programme['qualification_primary'] = aname['qualification_alternative'];
          alternative_names.splice(idx, 1);
        }
      })
    });
  }
  return data;
};

export const encodeProgrammeNameData = (formValues) => {
  let {programmes} = formValues;
  if (programmes) {
    programmes.forEach((programme) => {
      if (!('alternative_names' in programme)) {
        programme['alternative_names'] = []
      }
      let {alternative_names} = programme;
      alternative_names.push({
        id: programme['alternative_name_id'],
        name_alternative: programme['name_primary'],
        qualification_alternative: programme['qualification_primary'],
        name_is_primary: true
      });
    });
  }
  return formValues;
};