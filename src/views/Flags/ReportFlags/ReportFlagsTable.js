import React from 'react';
import report from "../../../services/Report";
import {connect} from "react-redux";
import setReportFlagsTable from "./actions/setReportFlagsTable";
import createTableAPIParams from "../../../utils/createTableAPIParams";
import {Link} from "react-router-dom";
import style from "./ReportFlagsTable.module.css";
import ReportsTableFilters from "./ReportFlagsTableFilters";
import DataTableRedux from "../../../components/DataTable/DataTableRedux";
import {createdAtRender, flagRender} from "../../../utils/tableColumnRenderers";

const ReportFlagsTable = (props) => {
  const linkRenderer = (row) => {
    return(
      <Link
        to={{pathname: `/reference/reports/view/${row.original.report}`}}
        className={style.Link}
      >
        {row.original.report}
      </Link>)
  };

  const columnConfig = [
    {
      field: 'report',
      label: 'DEQAR ID',
      width: 80,
      render: linkRenderer,
      resizable: false,
      sortable: true,
      sortQueryParam: 'report',
      style:{ 'textAlign': 'center'}
    }, {
      field: 'agency',
      label: 'Agency',
      width: 150,
      resizable: false,
      sortable: true,
      sortQueryParam: 'agency_sort',
    }, {
      field: 'flag',
      label: 'Flag',
      width: 100,
      sortable: true,
      sortQueryParam: 'flag',
      render: flagRender,
      style:{ 'whiteSpace': 'unset'}
    }, {
      field: 'flag_message',
      label: 'Flag Message',
      minWidth: 250,
      resizable: true,
      sortable: true,
      sortQueryParam: 'institution_programme_sort',
      style:{ 'whiteSpace': 'unset'}
    }, {
      field: 'institution_programme_primary',
      label: 'Institution : Programme',
      minWidth: 250,
      resizable: true,
      sortable: false,
      sortQueryParam: 'institution_programme_sort',
      style:{ 'whiteSpace': 'unset'}
    }, {
      field: 'created_at',
      label: 'Created',
      render: createdAtRender,
      width: 120,
      sortable: true,
      sortQueryParam: 'created_at'
    },
  ];

  const onFetchData = (state) => {
    const params = createTableAPIParams(state, columnConfig);
    return report.listFlags(params);
  };

  const saveState = (state) => {
    props.setReportsTable(state);
  };

  return (
    <DataTableRedux
      onFetchData={onFetchData}
      columnConfig={columnConfig}
      saveState={saveState}
      filterable={true}
      storeName={'reportFlagsTable'}
    >
      <ReportsTableFilters />
    </DataTableRedux>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    setReportsTable: state => {
      dispatch(setReportFlagsTable(state))
    }
  }
};

const mapStateToProps = () => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportFlagsTable);
