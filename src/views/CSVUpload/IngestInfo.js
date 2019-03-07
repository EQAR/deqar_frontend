import React, { Component } from 'react';
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import PropTypes from 'prop-types';

class IngestInfo extends Component {
  renderErrorMessage = () => {
    const {clickedRowIndex, ingestResponse} = this.props;
    if(ingestResponse[clickedRowIndex].submission_status === 'errors') {
      const errors = ingestResponse[clickedRowIndex].errors;
      let errorMsg = [];
      Object.entries(errors).forEach((error) => {
        const [key, value] = error;
        if (key === 'non_field_errors') {
          errorMsg.push(...value);
        } else {
          errorMsg.push(`${value.join(' ')} (${key})`)
        }
      });
      const errorItems = errorMsg.map((emsg) => {
        return(<h6>{emsg}</h6>)
      });
      return(<div>{errorItems}</div>)
    } else {
      return(<h6>Record was successfully ingested.</h6>)
    }
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Ingest Information
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                {this.renderErrorMessage()}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

IngestInfo.propTypes = {
  clickedRowIndex: PropTypes.number.isRequired,
  clickedColumnName: PropTypes.string.isRequired,
};

export default IngestInfo;
