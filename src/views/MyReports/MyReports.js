import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row
} from "reactstrap";
import MyReportsTable from "./MyReportsTable";
import style from "./MyReports.module.css";
import {Link} from "react-router-dom";

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
          <CardBody className={style.MyReportsCardBody}>
            <MyReportsTable/>
          </CardBody>
          <CardFooter>
            <Link to={{pathname: '/submit-report'}}>
              <Button
                size="sm"
                color="primary"
              >Submit New Report</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }
}

export default MyReports;
