import React from 'react';
import institution from "../../services/Institution";
import { connect } from "react-redux";
import setInstitutionsTable from "./actions/setInstitutionsTable";
import createTableAPIParams from "../../utils/createTableAPIParams";
import style from "./InstitutionsTable.module.css";
import { Link } from "react-router-dom";
import DataTableRedux from "../../components/DataTable/DataTableRedux";
import InstitutionsTableFilters from "./InstitutionsTableFilters";


const InstitutionsTable = (props) => {
  const linkRenderer = (row) => {
    return(
      <Link
        to={{pathname: `/reference/institutions/edit/${row.original.id}`}}
        className={style.Link}
      >
        {row.original.name_display}
      </Link>)
  }

  const countryRenderer = (row) => row.original.country ? row.original.country.join(', ') : null;

  const cityRenderer = (row) => row.original.city ? row.original.city.join(', ') : null;

  const columnConfig = [
    {
      field: 'deqar_id',
      label: 'DEQARINST ID',
      sortable: false,
      minWidth: 90,
      maxWidth: 120
    },
    {
      field: 'eter_id',
      label: 'ETER ID',
      sortable: true,
      minWidth: 80,
      maxWidth: 80
    },
    {
      field: 'name_display',
      label: 'Institution',
      sortable: true,
      minWidth: 180,
      render: linkRenderer,
      sortQueryParam: 'name_sort'
    },
    {
      field: 'country',
      label: 'Country',
      sortable: false,
      minWidth: 80,
      maxWidth: 130,
      render: countryRenderer
    },
    {
      field: 'city',
      label: 'City',
      sortable: false,
      minWidth: 80,
      maxWidth: 130,
      render: cityRenderer
    }
  ];

  const onFetchData = (state) => {
    const params = createTableAPIParams(state, columnConfig);
    return institution.getInstitutions(params);
  };

  const saveState = (state) => {
    props.setInstitutionsTable(state);
  };

  return (
    <DataTableRedux
      filterable={true}
      onFetchData={onFetchData}
      columnConfig={columnConfig}
      saveState={saveState}
      storeName={'institutionsTable'}
    >
      <InstitutionsTableFilters/>
    </DataTableRedux>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInstitutionsTable: state => {
      dispatch(setInstitutionsTable(state))
    }
  }
};

const mapStateToProps = (store) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(InstitutionsTable);
