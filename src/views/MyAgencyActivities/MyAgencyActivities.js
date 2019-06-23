import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from "reactstrap";
import style from "./MyAgencyActivities.module.css";
import MyAgenciesTable from "./MyAgencyActivitiesTable";

const Reports = (props) => {
  return(
    <div className="animated fadeIn">
      <Card>
        <CardHeader>
          <Row>
            <Col>ESG Activities of My Agency</Col>
          </Row>
        </CardHeader>
        <CardBody className={style.ReportsCardBody}>
          <MyAgenciesTable/>
        </CardBody>
      </Card>
    </div>
  )
};

export default Reports;
