import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row
} from "reactstrap";
import style from "./MyAgencies.module.css";
import MyAgenciesTable from "./MyAgenciesTable";

class Reports extends Component {
  render() {
    return(
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <Row>
              <Col>My Agencies</Col>
            </Row>
          </CardHeader>
          <CardBody className={style.ReportsCardBody}>
            <MyAgenciesTable/>
          </CardBody>
          <CardFooter>
          </CardFooter>
        </Card>
      </div>
    )
  }
}

export default Reports;
