import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row
} from "reactstrap";
import MyReportsTable from "./MyReportsTable";

class MyReports extends Component {
  render() {
    return(
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <Row>
              <Col>My Uploaded Reports</Col>
            </Row>
          </CardHeader>
          <CardBody>
            <MyReportsTable/>
          </CardBody>
          <CardFooter>
          </CardFooter>
        </Card>
      </div>
    )
  }
}

export default MyReports;
