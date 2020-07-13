import React from 'react';
import { connect } from "react-redux";
import setCountriesTable from "./actions/setCountriesTable";
import createTableAPIParams from "../../../utils/createTableAPIParams";
import DataTableRedux from "../../../components/DataTable/DataTableRedux";
import country from "./../../../services/Country";
import CountriesTableFilters from "./CountriesTableFilters";
import {Link} from "react-router-dom";
import style from "../Agencies/AgenciesTable.module.css";


const CountriesTable = (props) => {
  const linkRenderer = (row, param) => {
    return(
      <Link
        to={{pathname: `/reference/countries/view/${row.original.id}`}}
        className={style.Link}
      >
        {row.original[param]}
      </Link>
    )
  };

  const eheaRenderer = (row) => {
    let className = row.original['ehea_is_member'] ? 'badge badge-success' : 'badge badge-danger';
    return(<div className={'text-center'}><span className={className}>{row.original['ehea_is_member'] ? 'Yes' : 'No'}</span></div>);
  };

  const columnConfig = [
    {
      field: 'name_english',
      label: 'Name',
      sortable: true,
      sortQueryParam: 'name_english',
      render: (row) => linkRenderer(row, 'name_english'),
    }, {
      field: 'iso_3166_alpha2',
      label: 'Alpha 2',
      sortable: true,
      width: 150,
      sortQueryParam: 'iso_3166_alpha2'
    }, {
      field: 'iso_3166_alpha3',
      label: 'Alpha 3',
      sortable: true,
      width: 150,
      sortQueryParam: 'iso_3166_alpha3'
    }, {
      field: 'ehea_is_member',
      label: 'EHEA Member',
      sortable: true,
      width: 150,
      render: (row) => eheaRenderer(row),
      sortQueryParam: 'ehea_is_member'
    },
  ];

  const onFetchData = (state) => {
    const params = createTableAPIParams(state, columnConfig);
    return country.list(params);
  };

  const saveState = (state) => {
    props.setCountriesTable(state);
  };

  return (
    <DataTableRedux
      onFetchData={onFetchData}
      columnConfig={columnConfig}
      saveState={saveState}
      filterable={true}
      storeName={'countriesTable'}
    >
      <CountriesTableFilters />
    </DataTableRedux>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCountriesTable: state => {
      dispatch(setCountriesTable(state))
    }
  }
};

const mapStateToProps = (store) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(CountriesTable);
