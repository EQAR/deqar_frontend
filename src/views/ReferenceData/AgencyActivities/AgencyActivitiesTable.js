import React from 'react';
import {connect} from "react-redux";
import agency from "../../../services/Agency";
import createTableAPIParams from "../../../utils/createTableAPIParams";
import setAgencyActivitiesTable from "./actions/setAgencyActivitiesTable";
import DataTableRedux from "../../../components/DataTable/DataTableRedux";
import AgencyActivitiesTableFilters from "./AgencyActivitiesTableFilters";

const AgencyActivitiesTable = (props) => {
  const activityGroupRenderer = (row) => {
    return (
        <div>{row.original.activity_group.activity} - ID {row.original.activity_group.id}</div>
    )
  }

  const columnConfig = [
    {
      field: 'id',
      label: 'Activity ID',
      width: 80,
      resizable: false,
      sortable: true,
      style:{ 'textAlign': 'center'}
    }, {
      field: 'agency',
      label: 'Agency',
      width: 150,
      sortable: true,
      sortQueryParam: 'agency__acronym_primary'
    }, {
      field: 'activity_group',
      label: 'Activity Group',
      minWidth: 250,
      render: activityGroupRenderer,
      resizable: true,
      sortable: true,
    }, {
      field: 'activity_type',
      label: 'Activity Type',
      width: 250,
      sortable: true
    }
  ];

  const onFetchData = (state) => {
    const params = createTableAPIParams(state, columnConfig);
    return agency.selectAllActivities(params);
  };

  const saveState = (state) => {
    props.setAgenciesTable(state);
  };

  return (
    <DataTableRedux
      filterable={true}
      onFetchData={onFetchData}
      columnConfig={columnConfig}
      saveState={saveState}
      storeName={'agencyActivitiesTable'}
    >
      <AgencyActivitiesTableFilters/>
    </DataTableRedux>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAgenciesTable: state => {
      dispatch(setAgencyActivitiesTable(state))
    }
  }
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AgencyActivitiesTable);
