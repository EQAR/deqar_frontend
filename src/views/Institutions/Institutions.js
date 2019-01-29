import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from "reactstrap";

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
          <CardBody>
              hey
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default Institutions;
