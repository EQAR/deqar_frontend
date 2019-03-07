import React, { Component } from 'react';
import DataTable from "../../components/DataTable/DataTable";
import institution from "../../services/Institution";
import { connect } from "react-redux";
import setInstitutionsTable from "./actions/setInstitutionsTable";
import country from '../../services/Country';
import createTableAPIParams from "../../utils/createTableAPIParams";
import style from "./InstitutionsTable.module.css";
import {Link} from "react-router-dom";


class InstitutionsTable extends Component {
  constructor(props) {
    super(props);
    this.columnConfig = [
      {
        field: 'deqar_id',
        label: 'DEQAR ID',
        sortable: false,
        filterable: true,
        minWidth: 80,
        maxWidth: 150
      },
      {
        field: 'eter_id',
        label: 'ETER ID',
        sortable: false,
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
        render: this.linkRenderer
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
      }
    ];
  }

  linkRenderer = (row) => {
    return(
      <Link
        to={{pathname: `/institutions/view/${row.original.id}`}}
        className={style.Link}
      >
        {row.original.name_primary}
      </Link>)
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
