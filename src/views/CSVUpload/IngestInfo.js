import React from 'react';
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import PropTypes from 'prop-types';

const IngestInfo = ({clickedRowIndex, ingestResponse, ...props}) => {


  const collectErrors = (errors) => {
    let errorMsg = [];

    errors.forEach((error) => {
      if(error.hasOwnProperty('non_field_errors')) {
        errorMsg.push(...error['non_field_errors']);
      } else {
        if (typeof error === 'string' || error instanceof String) {
          errorMsg.push(error);
        } else {
          Object.keys(error).forEach((key) => {
            if(Array.isArray(error)) {
              errorMsg.push(...error[key]);
            } else {
              Object.keys(error[key]).forEach((k) => {
                errorMsg.push(...error[key][k])
              })
            }
          });
        }
      }
    });

    return Array.from(new Set(errorMsg));
  };

  const renderErrorMessage = () => {
    if(ingestResponse[clickedRowIndex].submission_status === 'errors') {
      const errors = ingestResponse[clickedRowIndex].errors;
      let errorMsg = [];

      Object.entries(errors).forEach((error) => {
        const [key, value] = error;
        if (key === 'non_field_errors') {
          errorMsg.push(...value);
        } else {
          const errorMessages = collectErrors(value);
          errorMsg.push(`${errorMessages.join(' ')} (${key})`)
        }
      });

      const errorItems = errorMsg.map((emsg, idx) => {
        return(<h6 key={idx}>{emsg}</h6>)
      });
      return(<div>{errorItems}</div>)
    } else {
      return(<h6>Record was successfully ingested.</h6>)
    }
  };

  return (
    <div className="animated fadeIn">
      <Card>
        <CardHeader>
          Ingest Information
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              {renderErrorMessage()}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

IngestInfo.propTypes = {
  clickedRowIndex: PropTypes.number.isRequired,
};

export default IngestInfo;
