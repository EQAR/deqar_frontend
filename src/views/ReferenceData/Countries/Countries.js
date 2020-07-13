import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import style from "./Countries.module.css"
import toggleCountriesTableFilter from "./actions/toggleCountriesTableFilter";
import DataTableHeader from "../../../components/DataTable/DataTableHeader";
import {connect} from "react-redux";
import CountriesTable from "./CountriesTable";

const Countries = (props) => {
  const onFilterClick = () => {
    props.toggleCountriesTableFilter()
  };

  return(
    <div className="animated fadeIn">
      <Card className={style.CountriesCard}>
        <CardHeader>
          Reference Data » Countries
          <DataTableHeader
            storeName={'countriesTable'}
            filterText={'Number of countries'}
            onFilterClick={onFilterClick}
          />
        </CardHeader>
        <CardBody className={style.CountriesCardBody}>
          <CountriesTable />
        </CardBody>
      </Card>
    </div>
  )
};

const mapStateToProps = (store) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCountriesTableFilter: state => {
      dispatch(toggleCountriesTableFilter())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Countries);
