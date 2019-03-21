import React, { Component } from 'react';
import DataTable from "../../components/DataTable/DataTable";
import {connect} from "react-redux";
import agency from "../../services/Agency";
import createTableAPIParams from "../../utils/createTableAPIParams";
import setMyAgenciesTable from "./actions/setMyAgenciesTable";

class MyAgenciesTable extends Component {
  constructor(props) {
    super(props);

    this.columnConfig = [
      {
        field: 'agency',
        label: 'Agency',
        width: 150,
        sortable: true,
        sortQueryParam: 'agency',
        filterable: true,
        filterType: 'select',
        filterQueryParam: 'agency',
        selectFilterValue: 'id',
        selectFilterLabel: 'acronym_primary',
        selectFilterPopulate: agency.selectAllAgency()
      }, {
        field: 'activity',
        label: 'Activity Description',
        minWidth: 250,
        resizable: true,
        sortable: true,
        filterable: true
      }, {
        field: 'activity_type',
        label: 'Activity Type',
        width: 250,
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterQueryParam: 'activity_type',
        selectFilterValue: 'id',
        selectFilterLabel: 'type',
        selectFilterPopulate: agency.selectActivityType()
      }, {
        field: 'id',
        label: 'Activity ID',
        width: 80,
        resizable: false,
        sortable: true,
        filterable: false,
        filterQueryParam: 'id',
        style:{ 'textAlign': 'center'}
      },
    ];
  }

  onFetchData = (state) => {
    const params = createTableAPIParams(state, this.columnConfig);
    return agency.selectMyActivity(null, params);
  };

  saveState = (state) => {
    this.props.setMyAgenciesTable(state);
  };

  render() {
    const {initialState} = this.props;

    return (
      <DataTable
        onFetchData={this.onFetchData}
        columnConfig={this.columnConfig}
        saveState={this.saveState}
        initialState={initialState}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMyAgenciesTable: state => {
      dispatch(setMyAgenciesTable(state))
    }
  }
};

const mapStateToProps = (store) => {
  return {
    initialState: {
      pageSize: store.myAgenciesTable.pageSize,
      page: store.myAgenciesTable.page,
      sorted: store.myAgenciesTable.sorted,
      filtered: store.myAgenciesTable.filtered
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAgenciesTable);
