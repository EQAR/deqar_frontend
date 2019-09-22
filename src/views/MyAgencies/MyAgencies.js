import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import MyAgenciesTable from './MyAgenciesTable';
import style from "./MyAgencies.module.css"
import {connect} from "react-redux";

const MyAgencies = (props) => {
  const getCard = () => {
    if (props.agencies.length > 1) {
      return(
        <Card className={style.AgenciesCard}>
          <CardHeader>
            My Data » My Agencies
          </CardHeader>
          <CardBody className={style.AgenciesCardBody}>
            <MyAgenciesTable />
          </CardBody>
        </Card>
      )
    } else {
      const agency_id = props.agencies[0];
      if (agency_id) {
        props.history.push(`/my-agencies/view/${agency_id}`);
      }
    }
  };

  return(
    <div className="animated fadeIn">
      {getCard()}
    </div>
  )
};

const mapStateToProps = (store) => {
  return {
    agencies: store.user.agencies
  }
};

export default connect(mapStateToProps)(MyAgencies);
