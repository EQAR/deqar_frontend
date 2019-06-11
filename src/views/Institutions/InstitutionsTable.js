import React, { Component } from 'react';
import institution from "../../services/Institution";
import { connect } from "react-redux";
import setInstitutionsTable from "./actions/setInstitutionsTable";
import country from '../../services/Country';
import createTableAPIParams from "../../utils/createTableAPIParams";
import style from "./InstitutionsTable.module.css";
import {Link} from "react-router-dom";
import DataTableRedux from "../../components/DataTable/DataTableRedux";
import InstitutionsTableFilters from "./InstitutionsTableFilters";


class InstitutionsTable extends Component {
  constructor(props) {
    super(props);
    this.columnConfig = [
      {
        field: 'deqar_id',
        label: 'DEQAR ID',
        sortable: false,
        minWidth: 80,
        maxWidth: 150
      },
      {
        field: 'eter_id',
        label: 'ETER ID',
        sortable: false,
        minWidth: 80,
        maxWidth: 150
      },
      {
        field: 'name_primary',
        label: 'Institution',
        sortable: true,
        minWidth: 150,
        render: this.linkRenderer
      },
      {
        field: 'country',
        label: 'Country',
        sortable: true,
        minWidth: 100,
        maxWidth: 200,
      }
    ];
  }

  linkRenderer = (row) => {
    return(
      <Link
        to={{pathname: `/reference/institutions/view/${row.original.id}`}}
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
    return (
      <DataTableRedux
        filterable={true}
        onFetchData={this.onFetchData}
        columnConfig={this.columnConfig}
        saveState={this.saveState}
        storeName={'institutionsTable'}
      >
        <InstitutionsTableFilters/>
      </DataTableRedux>
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
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(InstitutionsTable);
