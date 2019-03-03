import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row
} from "reactstrap";
import ReportsTable from "./ReportsTable";
import style from "./Reports.module.css";

class Reports extends Component {
  render() {
    return(
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <Row>
              <Col>Reports</Col>
            </Row>
          </CardHeader>
          <CardBody className={style.ReportsCardBody}>
            <ReportsTable/>
          </CardBody>
          <CardFooter>
          </CardFooter>
        </Card>
      </div>
    )
  }
}

export default Reports;
