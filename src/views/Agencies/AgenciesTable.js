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
  const linkRenderer = (row) => {
    return(
      <Link
        to={{pathname: `/reference/agencies/view/${row.original.id}`}}
        className={style.Link}
      >
        {row.original.name_primary}
      </Link>)
  };

  const columnConfig = [
    {
      field: 'deqar_id',
      label: 'DEQAR ID',
      sortable: true,
      minWidth: 80,
      maxWidth: 150
    },
    {
      field: 'acronym_primary',
      label: 'Acronym',
      sortable: true,
      minWidth: 80,
      maxWidth: 150,
    },
    {
      field: 'name_primary',
      label: 'Agency',
      minWidth: 150,
      sortable: true,
      render: linkRenderer
    },
    {
      field: 'country',
      label: 'Country',
      sortable: true,
      minWidth: 100,
      maxWidth: 200,
      sortQueryParam: 'country__name_english'
    },
    {
      field: 'date',
      label: 'Validity',
      render: (row) => dateRender(row, 'registration_start', 'registration_valid_to'),
      width: 120,
      sortable: true,
      sortQueryParam: 'registration_valid_to'
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
