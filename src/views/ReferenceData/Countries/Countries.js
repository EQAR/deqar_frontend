import React from 'react';
import {
  Button,
  Card,
  CardBody, CardFooter,
  CardHeader,
} from "reactstrap";
import style from "./Countries.module.css"
import toggleCountriesTableFilter from "./actions/toggleCountriesTableFilter";
import DataTableHeader from "../../../components/DataTable/DataTableHeader";
import {connect} from "react-redux";
import CountriesTable from "./CountriesTable";
import {Link} from "react-router-dom";

const Countries = (props) => {
  const { isAdmin } = props;

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
        { isAdmin && (
          <CardFooter>
            <Button
              size="sm"
              color="primary"
              className={'pull-right'}
            >
              <Link
                to={{pathname: '/reference/countries/create'}}
                className={style.Link}
              >
                Add New Country
              </Link>
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
};

const mapStateToProps = (store) => {
  return {isAdmin: store.user.is_admin}
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCountriesTableFilter: state => {
      dispatch(toggleCountriesTableFilter())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Countries);
