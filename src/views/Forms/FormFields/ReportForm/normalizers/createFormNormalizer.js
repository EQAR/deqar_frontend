export const createFormNormalizer = (formValues) => {
  let normalizedForm = {date_format: "%Y-%m-%d"};
  Object.keys(formValues).forEach(key => {
    const value = formValues[key];
    if(value) {
      switch (value.constructor) {
        case Array:
          normalizedForm[key] = [];
          value.forEach((v) => {
            if('id' in v) {
              switch(key) {
                case "report_language":
                  normalizedForm[key].push(v.iso_639_1);
                  break;
                case "institutions":
                case "platforms":
                  normalizedForm[key].push({deqar_id: v.deqar_id});
                  break;
                case "countries":
                  normalizedForm[key].push(v.iso_3166_alpha2);
                  break;
                default:
                  normalizedForm[key].push(v.id.toString());
                  break;
              }
            } else {
              normalizedForm[key].push(createFormNormalizer(v))
            }
          });
          break;
        case Object:
          if('id' in value) {
            switch(key) {
              case "activity":
                normalizedForm[key] = value.activity;
                break;
              case "agency":
                normalizedForm[key] = value.acronym_primary;
                break;
              case "qf_ehea_level":
                normalizedForm[key] = value.level;
                break;
              default:
                normalizedForm[key] = value.id.toString();
                break;
            }
          }
          break;
        default:
          normalizedForm[key] = value;
          break;
      }
    }
  });
  return normalizedForm;
};
