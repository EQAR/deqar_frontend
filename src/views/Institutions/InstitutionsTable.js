import React, { Component } from 'react';
import InstitutionReferenceTable from "../../components/InstitutionReferenceTable/InstitutionReferenceTable";
import institution from "../../services/Institution";
import { connect } from "react-redux";
import setInstitutionTable from "./actions/setInstitutionTable";


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
  onFetchData = () => {
    return institution.select();
  };

  render() {
    const {initialState} = this.props;

    return (
      <InstitutionReferenceTable
        onFetchData={this.onFetchData}
        columnConfig={columnConfig}
        initialState={initialState}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setInstitutionTable: state => {
      dispatch(setInstitutionTable(state))
    }
  }
};

const mapStateToProps = (store) => {
  return {
    initialState: {
      pageSize: store.reportTable.pageSize,
      page: store.reportTable.page,
      sorted: store.reportTable.sorted,
      filtered: store.reportTable.filtered
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(InstitutionsTable);
