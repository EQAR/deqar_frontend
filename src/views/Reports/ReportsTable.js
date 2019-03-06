import React, { Component } from 'react';
import report from "../../services/Report";
import {connect} from "react-redux";
import setReportsTable from "./actions/setReportsTable";
import agency from "../../services/Agency";
import country from "../../services/Country";
import list from "../../services/List";
import createTableAPIParams from "../../utils/createTableAPIParams";
import {arrayRenderer, dateRender, flagRender} from "../../utils/tableColumnRenderers";
import DataTable from "../../components/DataTable/DataTable";
import Link from "react-router-dom/es/Link";
import style from "./ReportsTable.module.css";

class ReportsTable extends Component {
  constructor(props) {
    super(props);

    this.columnConfig = [
      {
        field: 'id',
        label: 'DEQAR ID',
        width: 80,
        resizable: false,
        sortable: false,
        filterable: true,
        filterQueryParam: 'id',
        style:{ 'textAlign': 'center'}
      }, {
        field: 'agency',
        label: 'Agency',
        width: 150,
        resizable: false,
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterQueryParam: 'agency',
        selectFilterValue: 'acronym_primary',
        selectFilterLabel: 'acronym_primary',
        selectFilterPopulate: agency.selectAllAgency()
      }, {
        field: 'institution_programme_primary',
        label: 'Institution : Programme',
        minWidth: 250,
        render: this.linkRenderer,
        resizable: true,
        sortable: true,
        sortQueryParam: 'institution_programme_sort',
        filterable: true,
        filterQueryParam: 'query',
        style:{ 'whiteSpace': 'unset'}
      }, {
        field: 'country',
        label: 'Country',
        render: arrayRenderer,
        width: 150,
        resizable: false,
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterQueryParam: 'country',
        selectFilterValue: 'name_english',
        selectFilterLabel: 'name_english',
        selectFilterPopulate: country.select()
      }, {
        field: 'activity_type',
        label: 'Activity',
        width: 150,
        resizable: false,
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterQueryParam: 'activity_type',
        selectFilterValue: 'type',
        selectFilterLabel: 'type',
        selectFilterPopulate: agency.selectActivityType()
      }, {
        field: 'date',
        label: 'Date',
        render: dateRender,
        width: 200,
        sortable: true,
        sortQueryParam: 'valid_from',
        filterable: true,
        filterType: 'activeDate',
        filterQueryParam: 'year'
      }, {
        field: 'flag_level',
        label: 'Flag',
        render: flagRender,
        width: 150,
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterQueryParam: 'flag',
        selectFilterValue: 'flag',
        selectFilterLabel: 'flag',
        selectFilterPopulate: list.selectFlags()
      }
    ];
  }

  onFetchData = (state) => {
    const params = createTableAPIParams(state, this.columnConfig);
    return report.getReports(params);
  };

  saveState = (state) => {
    this.props.setReportsTable(state);
  };

  linkRenderer = (row) => {
    return(
      <Link
        to={{pathname: `/reports/view/${row.original.id}`}}
        className={style.Link}
      >
        {row.original.institution_programme_primary}
      </Link>)
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
    setReportsTable: state => {
      dispatch(setReportsTable(state))
    }
  }
};

const mapStateToProps = (store) => {
  return {
    initialState: {
      page: store.reportsTable.page,
      pageSize: store.reportsTable.pageSize,
      sorted: store.reportsTable.sorted,
      filtered: store.reportsTable.filtered
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsTable);
