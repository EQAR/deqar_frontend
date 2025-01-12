import {detectActivityType} from "../../../../../utils/detectActivityType";

const validateActivities = (value, values) => {
  const activities = values.activities;
  let agencies = [values.agency]

  if (values.contributing_agencies) {
    values.contributing_agencies.forEach(ca => {agencies.push(ca)})
  }

  if (!value) {
    return ('Please select at least one activity!')
  }

  const agencies_from_activities = [...new Set(activities.map(activity => activity.agency))]
  const agencies_from_agencies = [...new Set(agencies.map(agency => agency.acronym_primary))]

  if (agencies_from_agencies.sort().toString() !== agencies_from_activities.sort().toString()) {
    return ('Please select at least one activity per agency!')
  }
};

export default validateActivities;
