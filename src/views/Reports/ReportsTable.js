import React, { Component } from 'react';
import report from "../../services/Report";
import {connect} from "react-redux";
import setReportsTable from "./actions/setReportsTable";
import createTableAPIParams from "../../utils/createTableAPIParams";
import {arrayRenderer, dateRender, flagRender} from "../../utils/tableColumnRenderers";
import {Link} from "react-router-dom";
import style from "./ReportsTable.module.css";
import ReportsTableFilters from "./ReportsTableFilters";
import DataTableRedux from "../../components/DataTable/DataTableRedux";

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
        style:{ 'textAlign': 'center'}
      }, {
        field: 'agency',
        label: 'Agency',
        width: 150,
        resizable: false,
        sortable: true,
      }, {
        field: 'institution_programme_primary',
        label: 'Institution : Programme',
        minWidth: 250,
        render: this.linkRenderer,
        resizable: true,
        sortable: true,
        sortQueryParam: 'institution_programme_sort',
        style:{ 'whiteSpace': 'unset'}
      }, {
        field: 'country',
        label: 'Country',
        render: arrayRenderer,
        width: 150,
        resizable: false,
        sortable: true,
      }, {
        field: 'activity_type',
        label: 'Activity',
        width: 150,
        resizable: false,
        sortable: true
      }, {
        field: 'date',
        label: 'Validity',
        render: dateRender,
        width: 120,
        sortable: true,
        sortQueryParam: 'valid_from'
      }, {
        field: 'flag_level',
        label: 'Flag',
        render: flagRender,
        width: 110,
        sortable: true
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
        to={{pathname: `/reference/reports/view/${row.original.id}`}}
        className={style.Link}
      >
        {row.original.institution_programme_primary}
      </Link>)
  };

  render() {
    return (
      <DataTableRedux
        onFetchData={this.onFetchData}
        columnConfig={this.columnConfig}
        saveState={this.saveState}
        filterable={true}
        storeName={'reportsTable'}
      >
        <ReportsTableFilters />
      </DataTableRedux>
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

const mapStateToProps = () => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsTable);
