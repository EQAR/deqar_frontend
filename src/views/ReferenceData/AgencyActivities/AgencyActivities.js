import React from 'react';
import {
  Card,
  CardBody,
  CardHeader
} from "reactstrap";
import style from "./AgencyActivities.module.css";
import AgencyActivitiesTable from "./AgencyActivitiesTable";
import toggleAgencyActivitiesTableFilter from "./actions/toggleAgencyActivitiesTableFilter";
import connect from "react-redux/es/connect/connect";
import DataTableHeader from "../../../components/DataTable/DataTableHeader";

const AgencyActivities = (props) => {
  const onFilterClick = () => {
    props.toggleAgencyActivitiesTableFilter()
  };

  return(
    <div className="animated fadeIn">
      <Card className={style.AgencyActivityCard}>
        <CardHeader>
          Reference Data » Activities
          <DataTableHeader
            storeName={'agencyActivitiesTable'}
            filterText={'Number of activities'}
            onFilterClick={onFilterClick}
          />
        </CardHeader>
        <CardBody className={style.AgencyActivityCardBody}>
          <AgencyActivitiesTable/>
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
    toggleAgencyActivitiesTableFilter: state => {
      dispatch(toggleAgencyActivitiesTableFilter())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AgencyActivities);
