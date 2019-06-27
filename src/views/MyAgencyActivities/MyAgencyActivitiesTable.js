import React from 'react';
import {connect} from "react-redux";
import agency from "../../services/Agency";
import createTableAPIParams from "../../utils/createTableAPIParams";
import setMyAgencyActivitiesTable from "./actions/setMyAgencyActivitiesTable";
import DataTableRedux from "../../components/DataTable/DataTableRedux";

const MyAgencyActivitiesTable = (props) => {
  const columnConfig = [
    {
      field: 'agency',
      label: 'Agency',
      width: 150,
      sortable: true,
      sortQueryParam: 'agency'
    }, {
      field: 'activity',
      label: 'Activity Description',
      minWidth: 250,
      resizable: true,
      sortable: true
    }, {
      field: 'activity_type',
      label: 'Activity Type',
      width: 250,
      sortable: true
    }, {
      field: 'id',
      label: 'Activity ID',
      width: 80,
      resizable: false,
      sortable: true,
      style:{ 'textAlign': 'center'}
    },
  ];

  const onFetchData = (state) => {
    const params = createTableAPIParams(state, columnConfig);
    return agency.selectMyActivity(null, params);
  };

  const saveState = (state) => {
    props.setMyAgenciesTable(state);
  };

  return (
    <DataTableRedux
      onFetchData={onFetchData}
      columnConfig={columnConfig}
      saveState={saveState}
      storeName={'myAgencyActivitiesTable'}
    />
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMyAgenciesTable: state => {
      dispatch(setMyAgencyActivitiesTable(state))
    }
  }
};

const mapStateToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps)(MyAgencyActivitiesTable);
