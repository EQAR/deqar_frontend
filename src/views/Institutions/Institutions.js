import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Button,
  Row
} from "reactstrap";
import {Link} from "react-router-dom";

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
          <Button
            size="sm"
            color="primary"
            className={'pull-right'}
          >
            <Link
              to={{pathname: '/institutions/create'}}
              className={style.Link}
            >
              Add New Institution
            </Link>
          </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }
}

export default Institutions;
