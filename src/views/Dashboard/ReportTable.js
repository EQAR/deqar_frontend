import React, { Component } from 'react';
import DataTable from "../../components/DataTable/DataTable";
import report from '../../services/Report';
import ReportDetail from "./ReportDetail";
import {connect} from "react-redux";
import createTableAPIParams from "../../utils/createTableAPIParams";
import {flagRender, arrayRenderer} from "../../utils/tableColumnRenderers";
import setDashboardReportTable from "./actions/setDashboardReportTable";

class ReportTable extends Component {
  constructor(props) {
    super(props);
    this.columnConfig = [
      {
        field: 'id',
        label: 'Report ID',
        sortable: true,
        filterable: false,
        width: 80
      }, {
        field: 'institutions',
        label: 'Institutions',
        sortable: false,
        filterable: false,
        render: arrayRenderer
      }, {
        field: 'name',
        label: 'Name',
        sortable: false,
        filterable: false
      }, {
        field: 'flag',
        label: 'Flag',
        sortable: false,
        filterable: false,
        width: 100,
        render: flagRender
      }];
  }

  onFetchData = (state) => {
    const params = createTableAPIParams(state, this.columnConfig);
    return report.listByAgency(params);
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
        subComponent={
          (row) => <ReportDetail row={row}/>
        }
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
