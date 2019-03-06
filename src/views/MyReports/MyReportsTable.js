import React, { Component } from 'react';
import DataTable from "../../components/DataTable/DataTable";
import report from "../../services/Report";
import {connect} from "react-redux";
import setMyReportsTable from "./actions/setMyReportsTable";
import agency from "../../services/Agency";
import country from "../../services/Country";
import list from "../../services/List";
import createTableAPIParams from "../../utils/createTableAPIParams";
import {arrayRenderer, dateRender, flagRender, uploadDateRender} from "../../utils/tableColumnRenderers";
import style from "../Reports/ReportsTable.module.css";
import {Link} from "react-router-dom";

class MyReportsTable extends Component {
  constructor(props) {
    super(props);

    this.columnConfig = [
      {
        field: 'date_created',
        label: 'Uploaded',
        render: uploadDateRender,
        width: 100,
        resizable: false,
        sortable: false,
        filterable: true,
        filterQueryParam: 'year_created',
      }, {
        field: 'id',
        label: 'DEQAR ID',
        width: 80,
        resizable: false,
        sortable: true,
        filterable: true,
        filterQueryParam: 'id',
        style:{ 'textAlign': 'center'}
      }, {
        field: 'institution_programme_primary',
        label: 'Institution : Programme',
        render: this.linkRenderer,
        sortable: true,
        sortQueryParam: 'institution_programme_sort',
        filterable: true,
        filterQueryParam: 'query',
        minWidth: 250,
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
        selectFilterPopulate: country.getInstitutionCountries()
      }, {
        field: 'activity',
        label: 'Activity',
        width: 150,
        resizable: true,
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterQueryParam: 'activity_type',
        selectFilterValue: 'type',
        selectFilterLabel: 'type',
        selectFilterPopulate: agency.selectActivityType(),
        style:{ 'whiteSpace': 'unset'}
      }, {
        field: 'date',
        label: 'Validity',
        render: dateRender,
        width: 200,
        sortable: true,
        sortQueryParam: 'valid_from',
        filterable: true,
        filterType: 'activeDate',
        filterQueryParam: 'year',
        style:{ 'whiteSpace': 'unset'}
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
    return report.getMyReports(params);
  };

  saveState = (state) => {
    this.props.setMyReportsTable(state);
  };

  linkRenderer = (row) => {
    return(
      <Link
        to={{pathname: `/my-reports/view/${row.original.id}`}}
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
    setMyReportsTable: state => {
      dispatch(setMyReportsTable(state))
    }
  }
};

const mapStateToProps = (store) => {
  return {
    initialState: {
      pageSize: store.myReportsTable.pageSize,
      page: store.myReportsTable.page,
      sorted: store.myReportsTable.sorted,
      filtered: store.myReportsTable.filtered
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyReportsTable);
