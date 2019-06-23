import { SET_MY_AGENCY_ACTIVITIES_TABLE } from "../../../store/actionTypes";

export default function setMyAgencyActivitiesTable(state) {
  return {
    type: SET_MY_AGENCY_ACTIVITIES_TABLE,
    payload: { state: state }
  }
}
