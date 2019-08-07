import React from 'react';
import report from "../../services/Report";
import {connect} from "react-redux";
import setMyReportsTable from "./actions/setMyReportsTable";
import createTableAPIParams from "../../utils/createTableAPIParams";
import {arrayRenderer, dateRender, flagRender, uploadDateRender} from "../../utils/tableColumnRenderers";
import {Link} from "react-router-dom";
import style from "../Reports/ReportsTable.module.css";
import MyReportsTableFilters from "./MyReportsTableFilters";
import DataTableRedux from "../../components/DataTable/DataTableRedux";

const MyReportsTable = (props) => {
  const linkRenderer = (row) => {
    return(
      <Link
        to={{pathname: `/my-reports/view/${row.original.id}`}}
        className={style.Link}
      >
        {row.original.id}
      </Link>)
  };

  const columnConfig = [
      {
        field: 'date_created',
        label: 'Uploaded',
        render: uploadDateRender,
        width: 100,
        resizable: false,
        sortable: false
      }, {
        field: 'id',
        label: 'DEQAR ID',
        width: 80,
        render: linkRenderer,
        resizable: false,
        sortable: true,
        style:{ 'textAlign': 'center'}
      }, {
        field: 'institution_programme_primary',
        label: 'Institution : Programme',
        sortable: true,
        sortQueryParam: 'institution_programme_sort',
        minWidth: 250,
        style:{ 'whiteSpace': 'unset'}
      }, {
        field: 'country',
        label: 'Country',
        render: arrayRenderer,
        width: 150,
        resizable: false,
        sortable: true
      }, {
        field: 'activity',
        label: 'Activity',
        width: 150,
        resizable: true,
        sortable: true,
        style:{ 'whiteSpace': 'unset'}
      }, {
        field: 'date',
        label: 'Validity',
        render: dateRender,
        width: 120,
        sortable: true,
        sortQueryParam: 'valid_from',
        style:{ 'whiteSpace': 'unset'}
      }, {
        field: 'flag_level',
        label: 'Flag',
        render: flagRender,
        width: 110,
        sortable: true
      }
    ];

  const onFetchData = (state) => {
    const params = createTableAPIParams(state, columnConfig);
    return report.getMyReports(params);
  };

  const saveState = (state) => {
    props.setMyReportsTable(state);
  };

  return (
    <DataTableRedux
      onFetchData={onFetchData}
      columnConfig={columnConfig}
      saveState={saveState}
      filterable={true}
      storeName={'myReportsTable'}
    >
      <MyReportsTableFilters />
    </DataTableRedux>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMyReportsTable: state => {
      dispatch(setMyReportsTable(state))
    }
  }
};

const mapStateToProps = () => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(MyReportsTable);
