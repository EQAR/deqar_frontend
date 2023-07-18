const validateProgrammes = (value, values) => {
  console.log(values)
  let programmes = values.programmes;
  programmes = programmes ? programmes : [];
  const activityType = values.activity ? values.activity.activity_type : undefined;

  // If activity is 'joint programme'
  if (activityType === 'joint programme') {
    if(!(programmes.length === 1)) {
      return "One program record is required"
    }
  }

  // If activity is 'programme'
  if (activityType === 'programme') {
    if(programmes.length === 0) {
      return "At least one program record is required"
    }
  }

  // Mark duplicates
  let names = [];

  const getProgrammeQFEHEALevel = (programme) => {
    if (programme.hasOwnProperty('qf_ehea_level')) {
      if (programme.qf_ehea_level !== null && programme.qf_ehea_level !== '') {
        return programme.qf_ehea_level.level
      }
    }
    return ''
  }

  programmes.forEach((programme) => {
    names.push(
      {
        name: programme.name_primary,
        qfehea: getProgrammeQFEHEALevel(programme)
      }
    );
  });

  const keys = ['name', 'qfehea'];
  const filteredProgrammes = names.filter(
    (s => o => (k => !s.has(k) && s.add(k))(keys.map(k => o[k]).join('|')))(new Set())
  );
  if (filteredProgrammes.length !== names.length) {
    return "You have duplicates in your programme names!"
  }
};

export default validateProgrammes;
