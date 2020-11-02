import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import AgenciesTable from './AgenciesTable';
import style from "./Agencies.module.css"
import toggleAgenciesTableFilter from "./actions/toggleAgenciesTableFilter";
import DataTableHeader from "../../../components/DataTable/DataTableHeader";
import {connect} from "react-redux";

const Agencies = (props) => {
  const onFilterClick = () => {
    props.toggleAgenciesTableFilter()
  };

  return(
    <div className="animated fadeIn">
      <Card className={style.AgenciesCard}>
        <CardHeader>
          Reference Data » Agencies
          <DataTableHeader
            storeName={'agenciesTable'}
            filterText={'Number of agencies'}
            onFilterClick={onFilterClick}
          />
        </CardHeader>
        <CardBody className={style.AgenciesCardBody}>
          <AgenciesTable />
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
    toggleAgenciesTableFilter: state => {
      dispatch(toggleAgenciesTableFilter())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Agencies);
