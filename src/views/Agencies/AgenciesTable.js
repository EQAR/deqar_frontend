import React from 'react';
import agency from "../../services/Agency";
import { connect } from "react-redux";
import setAgenciesTable from "./actions/setAgenciesTable";
import createTableAPIParams from "../../utils/createTableAPIParams";
import style from "./AgenciesTable.module.css";
import {Link} from "react-router-dom";
import DataTableRedux from "../../components/DataTable/DataTableRedux";
import {dateRender} from "../../utils/tableColumnRenderers";
import AgenciesTableFilters from "./AgenciesTableFilters";


const AgenciesTable = (props) => {
  const linkRenderer = (row, param) => {
    return(
      <Link
        to={{pathname: `/reference/agencies/view/${row.original.id}`}}
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
    return agency.getAgencies(params);
  };

  const saveState = (state) => {
    props.setAgenciesTable(state);
  };

  return (
    <DataTableRedux
      onFetchData={onFetchData}
      columnConfig={columnConfig}
      saveState={saveState}
      filterable={true}
      storeName={'agenciesTable'}
    >
      <AgenciesTableFilters />
    </DataTableRedux>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAgenciesTable: state => {
      dispatch(setAgenciesTable(state))
    }
  }
};

const mapStateToProps = (store) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(AgenciesTable);
