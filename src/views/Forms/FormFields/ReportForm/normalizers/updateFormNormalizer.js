export const updateFormNormalizer = (formValues) => {
  let normalizedForm = {};

  Object.keys(formValues).forEach(key => {
    const value = formValues[key];
    if(value) {
      switch (value.constructor) {
        case Object:
          if ('id' in value) {
            normalizedForm[key] = value.id
          }
          break;
        case Array:
          normalizedForm[key] = [];
          value.forEach((v) => {
            if('id' in v) {
              if(['programmes', 'report_files'].includes(key)) {
                normalizedForm[key].push(updateFormNormalizer(v))
              } else if ('alternative_names' === key) {
                normalizedForm[key].push(v);
              } else {
                normalizedForm[key].push(v.id);
              }
            } else {
              normalizedForm[key].push(updateFormNormalizer(v));
            }
          });
          break;
        default:
          normalizedForm[key] = value;
          break;
      }
    } else {
      normalizedForm[key] = value;
    }
  });
  return normalizedForm;
};
