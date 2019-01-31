import React, { Component } from 'react';
import DataTable from "../../components/DataTable/DataTable";
import institution from "../../services/Institution";
import { connect } from "react-redux";
import setInstitutionsTable from "./actions/setInstitutionsTable";


const columnConfig = [
  {
    field: 'deqar_id',
    label: 'DEQARINST ID',
    sortable: true,
    filterable: true,
    width: 100
  }, {
    field: 'eter_id',
    label: 'ETER ID',
    sortable: true,
    filterable: true
  }, {
    field: 'name_primary',
    label: 'Institution',
    sortable: true,
    filterable: true
  },
  {
    field: 'countries',
    label: 'Country',
    sortable: true,
    filterable: true,
    width: 100
  }
];


class InstitutionsTable extends Component {
  onFetchData = (state) => {
    return institution.getInstitutions(state);
  };

  saveState = (state) => {
    this.props.setInstitutionsTable(state);
  };

  render() {
    const {initialState} = this.props;

    return (
      <DataTable
        onFetchData={this.onFetchData}
        columnConfig={columnConfig}
        saveState={this.saveState}
        initialState={initialState}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setInstitutionsTable: state => {
      dispatch(setInstitutionsTable(state))
    }
  }
};

const mapStateToProps = (store) => {
  return {
    initialState: {
      tableType: store.institutionsTable.tableType,
      pageSize: store.institutionsTable.pageSize,
      page: store.institutionsTable.page,
      sorted: store.institutionsTable.sorted,
      filtered: store.institutionsTable.filtered
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(InstitutionsTable);
