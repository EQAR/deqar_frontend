import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row
} from "reactstrap";
import InstitutionsTable from './InstitutionsTable';
import style from "./Institutions.module.css"

class Institutions extends Component {
  render() {
    return(
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <Row>
              <Col>Institutions</Col>
            </Row>
          </CardHeader>
          <CardBody className={style.InstitutionsCardBody}>
            <InstitutionsTable />
          </CardBody>
          <CardFooter>
          </CardFooter>
        </Card>
      </div>
    )
  }
}

export default Institutions;
