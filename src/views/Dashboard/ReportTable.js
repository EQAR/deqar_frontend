import React, { Component } from 'react';
import DataTable from "../../components/DataTable/DataTable";
import report from '../../services/Report';
import ReportDetail from "./ReportDetail";
import {connect} from "react-redux";
import createTableAPIParams from "../../utils/createTableAPIParams";
import {flagRender, arrayRenderer, uploadDateRender, dateRender} from "../../utils/tableColumnRenderers";
import setDashboardReportTable from "./actions/setDashboardReportTable";
import country from "../../services/Country";
import agency from "../../services/Agency";
import list from "../../services/List";

class ReportTable extends Component {
  constructor(props) {
    super(props);
    this.columnConfig = [
      {
        field: 'date_created',
        label: 'Uploaded',
        render: uploadDateRender,
        width: 100,
        resizable: false,
        sortable: true,
        filterable: false,
      }, {
        field: 'id',
        label: 'DEQAR ID',
        width: 80,
        resizable: false,
        sortable: true,
        filterable: false,
        style:{ 'textAlign': 'center'}
      }, {
        field: 'institution_programme_primary',
        label: 'Institution : Programme',
        render: this.linkRenderer,
        sortable: true,
        sortQueryParam: 'institution_programme_sort',
        filterable: false,
        minWidth: 250,
        style:{ 'whiteSpace': 'unset'}
      }, {
        field: 'country',
        label: 'Country',
        render: arrayRenderer,
        width: 150,
        resizable: false,
        sortable: true,
        filterable: false
      }, {
        field: 'activity',
        label: 'Activity',
        width: 150,
        resizable: true,
        sortable: true,
        filterable: false,
        style:{ 'whiteSpace': 'unset'}
      }, {
        field: 'date',
        label: 'Validity',
        render: dateRender,
        width: 120,
        sortable: true,
        sortQueryParam: 'valid_from',
        filterable: false,
        style:{ 'whiteSpace': 'unset'}
      }, {
        field: 'flag_level',
        label: 'Flag',
        render: flagRender,
        width: 110,
        sortable: true,
        filterable: false,
        selectFilterPopulate: list.selectFlags()
      }
    ];
  }

  onFetchData = (state) => {
    const params = createTableAPIParams(state, this.columnConfig);
    return report.getMyReports(params);
  };

  saveState = (state) => {
    this.props.setDashboardReportTable(state);
  };

  render() {
    const {initialState} = this.props;

    return(
      <DataTable
        onFetchData={this.onFetchData}
        saveState={this.saveState}
        initialState={initialState}
        columnConfig={this.columnConfig}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDashboardReportTable: state => {
      dispatch(setDashboardReportTable(state))
    }
  }
};

const mapStateToProps = (store) => {
  return {
    initialState: {
      tableType: store.dashboardReportTable.tableType,
      pageSize: store.dashboardReportTable.pageSize,
      page: store.dashboardReportTable.page,
      sorted: store.dashboardReportTable.sorted,
      filtered: store.dashboardReportTable.filtered,
      expanded: store.dashboardReportTable.expanded,
      resized: store.dashboardReportTable.resized
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportTable);
