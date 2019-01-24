import React, { Component } from 'react';
import DataTable from "../../components/DataTable/DataTable";
import report from '../../services/Report';
import ReportDetail from "./ReportDetail";
import setReportTableParams from "./actions/setReportTableParams";
import {connect} from "react-redux";

const flagRender = (row) => {
  let className = '';
  switch(row.value) {
    case 'none':
      className = 'badge badge-success';
      break;
    case 'low level':
      className = 'badge badge-warning';
      break;
    case 'high level':
      className = 'badge badge-danger';
      break;
    default:
      return null;
  }
  return(<div className={'text-center'}><span className={className}>{row.value}</span></div>);
};

const institutionRender = (row) => {
  return(row.value.join('; '));
};

const columnConfig = [
  {
    field: 'id',
    label: 'Report ID',
    sortable: true,
    filterable: false,
    width: 100
  }, {
    field: 'institutions',
    label: 'Institutions',
    sortable: false,
    filterable: false,
    render: institutionRender
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
    render: flagRender,
    width: 100
}];

class ReportTable extends Component {
  onFetchData = (state) => {
    return report.listByInstitution(state);
  };

  saveState = (state) => {
    this.props.setReportTableParams(state);
  };

  render() {
    const {initialState} = this.props;

    return(
      <DataTable
        onFetchData={this.onFetchData}
        saveState={this.saveState}
        initialState={initialState}
        columnConfig={columnConfig}
        subComponent={
          (row) => <ReportDetail row={row}/>
        }
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setReportTableParams: state => {
      dispatch(setReportTableParams(state))
    }
  }
};

const mapStateToProps = (store) => {
  return {
    initialState: {
      pageSize: store.reportTable.pageSize,
      page: store.reportTable.page,
      sorted: store.reportTable.sorted,
      filtered: store.reportTable.filtered,
      expanded: store.reportTable.expanded,
      resized: store.reportTable.resized
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportTable);