export const updateFormNormalizer = (formValues) => {
  let normalizedForm = {};
  Object.keys(formValues).forEach(key => {
    const value = formValues[key];
    switch (key) {
      case 'institutions':
        normalizedForm[key] = [];
        value.forEach((v) => {
          normalizedForm[key].push(v.id);
        });
        break;
      default:
        normalizedForm[key] = value;
        break;
    }
  });
  return normalizedForm;
};