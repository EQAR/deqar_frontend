import { SET_AGENCY_ACTIVITIES_TABLE } from "../../../store/actionTypes";

export default function setAgencyActivitiesTable(state) {
  return {
    type: SET_AGENCY_ACTIVITIES_TABLE,
    payload: { state: state }
  }
}
