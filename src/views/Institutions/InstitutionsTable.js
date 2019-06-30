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
        {row.original.name_primary}
      </Link>)
  };

  const columnConfig = [
    {
      field: 'deqar_id',
      label: 'DEQAR ID',
      sortable: false,
      minWidth: 80,
      maxWidth: 150
    },
    {
      field: 'eter_id',
      label: 'ETER ID',
      sortable: false,
      minWidth: 80,
      maxWidth: 150
    },
    {
      field: 'name_primary',
      label: 'Institution',
      sortable: true,
      minWidth: 150,
      render: linkRenderer
    },
    {
      field: 'country',
      label: 'Country',
      sortable: true,
      minWidth: 100,
      maxWidth: 200,
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
