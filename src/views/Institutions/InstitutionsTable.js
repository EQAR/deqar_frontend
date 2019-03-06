import React, { Component } from 'react';
import DataTable from "../../components/DataTable/DataTable";
import institution from "../../services/Institution";
import { connect } from "react-redux";
import setInstitutionsTable from "./actions/setInstitutionsTable";
import country from '../../services/Country';
import createTableAPIParams from "../../utils/createTableAPIParams";
import ActionButtons from "../../components/DataTable/components/ActionButtons";


class InstitutionsTable extends Component {
  constructor(props) {
    super(props);
    this.columnConfig = [
      {
        field: 'deqar_id',
        label: 'DEQAR ID',
        sortable: true,
        filterable: true,
        minWidth: 80,
        maxWidth: 150
      },
      {
        field: 'eter_id',
        label: 'ETER ID',
        sortable: true,
        filterable: true,
        minWidth: 80,
        maxWidth: 150
      },
      {
        field: 'name_primary',
        label: 'Institution',
        sortable: true,
        filterable: true,
        filterQueryParam: 'query',
        minWidth: 150,
      },
      {
        field: 'country',
        label: 'Country',
        sortable: true,
        filterable: true,
        filterQueryParam: 'country',
        minWidth: 100,
        maxWidth: 200,
        filterType: 'select',
        selectFilterValue: 'name_english',
        selectFilterLabel: 'name_english',
        selectFilterPopulate: country.getInstitutionCountries()
      },
      {
        render: this.actionRender,
        width: 100
      }
    ];
  }

  actionRender = (row) => {
    const pathConfig = [
      {
        path: 'institution/view',
        buttonText: 'View'
      }
    ];

    // const pathConfig = [
    //   {
    //     path: 'institution/view',
    //     buttonText: 'View'
    //   }, {
    //     path: 'institution/edit',
    //     buttonText: 'Edit'
    //   }
    // ];

    return(
      <ActionButtons
        row={row}
        pathConfig={pathConfig}
      />
    )
  };

  onFetchData = (state) => {
    const params = createTableAPIParams(state, this.columnConfig);
    return institution.getInstitutions(params);
  };

  saveState = (state) => {
    this.props.setInstitutionsTable(state);
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
