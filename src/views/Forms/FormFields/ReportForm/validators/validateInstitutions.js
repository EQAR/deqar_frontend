const validateInstitutions = (value, values) => {
  let institutions = values.institutions;
  institutions = institutions ? institutions : [];
  const activityType = values.activity ? values.activity.activity_type : undefined;

  // If activity is 'joint programme'
  if (activityType === 'joint programme') {
    if(institutions.length < 2) {
      return "At least two institutions are required"
    }
  }

  // At least one institution is required
  if (institutions.length === 0) {
    return "Selection of minimum one institution is required"
  }
};

export default validateInstitutions;
