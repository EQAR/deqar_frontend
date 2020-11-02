import React from 'react';
import agency from "../../../services/Agency";
import { connect } from "react-redux";
import setMyAgenciesTable from "./actions/setMyAgenciesTable";
import createTableAPIParams from "../../../utils/createTableAPIParams";
import style from "./MyAgenciesTable.module.css";
import {Link} from "react-router-dom";
import DataTableRedux from "../../../components/DataTable/DataTableRedux";
import {dateRender} from "../../../utils/tableColumnRenderers";


const MyAgenciesTable = (props) => {
  const linkRenderer = (row, param) => {
    return(
      <Link
        to={{pathname: `/my-agencies/view/${row.original.id}`}}
        className={style.Link}
      >
        {row.original[param]}
      </Link>)
  };

  const columnConfig = [
    {
      field: 'deqar_id',
      label: 'Agency ID',
      sortable: true,
      width: 80,
      render: (row) => linkRenderer(row, 'id'),
      sortQueryParam: 'deqar_id_sort',
      style:{ 'textAlign': 'center'}
    },
    {
      field: 'acronym',
      label: 'Acronym',
      sortable: true,
      width: 150,
      sortQueryParam: 'acronym_sort'
    },
    {
      field: 'name',
      label: 'Agency',
      sortable: true,
      render: (row) => linkRenderer(row, 'name'),
      sortQueryParam: 'name_sort',
      style:{ 'whiteSpace': 'unset'}
    },
    {
      field: 'country',
      label: 'Country',
      sortable: true,
      width: 150,
      sortQueryParam: 'country_sort'
    },
    {
      field: 'date',
      label: 'Validity',
      render: (row) => dateRender(row, 'valid_from', 'valid_to'),
      width: 120,
      sortable: true,
      sortQueryParam: 'valid_from'
    }
  ];

  const onFetchData = (state) => {
    const params = createTableAPIParams(state, columnConfig);
    return agency.getMyAgencies(params);
  };

  const saveState = (state) => {
    props.setAgenciesTable(state);
  };

  return (
    <DataTableRedux
      onFetchData={onFetchData}
      columnConfig={columnConfig}
      saveState={saveState}
      filterable={false}
      storeName={'myAgenciesTable'}
    />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAgenciesTable: state => {
      dispatch(setMyAgenciesTable(state))
    }
  }
};

const mapStateToProps = (store) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAgenciesTable);
