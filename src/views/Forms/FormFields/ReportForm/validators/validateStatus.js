import {validateRequired} from "../../../../../utils/validators";

const validateStatusData = (value, values) => {
  const institutions = values['institutions']
  let all_aps = false;

  if (institutions) {
    const aps = institutions.filter(
      i => i.hasOwnProperty('alternative_provider_facet') && i['alternative_provider_facet']
    )
    all_aps = institutions.length === aps.length
    if (all_aps && value['id'] === 1) {
      return 'Status should be \'voluntary\' if all organisations are alternative providers.'
    }
  }
}

const validateStatus = (value, values) => (
  validateRequired(value) || validateStatusData(value, values)
)

export default validateStatus;