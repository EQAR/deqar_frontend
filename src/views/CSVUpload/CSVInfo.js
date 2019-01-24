import React, { Component } from 'react';
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import PropTypes from 'prop-types';
import style from './CSVInfo.module.css';

class CSVInfo extends Component {
  renderIntroMessage = () => {
    const {step} = this.props;
    let instruction = "";
    let infoTextDisplayed = true;

    switch (step) {
      case 1:
        instruction = "Step 1 - Upload a CSV file.";
        break;
      case 2:
        instruction = "Step 2 - Make edits in the grid if needed. After editing is finished press 'Ingest' to send the file to DEQAR.";
        infoTextDisplayed = true;
        break;
      case 3:
        instruction = "Step 3 - Check the status of each report by clicking on the row. Re-ingest if needed.";
        infoTextDisplayed = false;
        break;
      default:
        return "default message"
    }

    return (
      <div>
        <h6>{instruction}</h6>
        {infoTextDisplayed ?
        <p className={style.infoText + " text-muted"}>
          Information about the format and the requirements of the CSV file can be found in the CSV Upload
            section of the <a href="https://docs.deqar.eu/data_submission/#csv-upload" target="_blank" rel="noopener noreferrer">
            DEQAR Documentation</a>.
        </p> : ""}
      </div>
    )
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            CSV Submission Information
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                {this.renderIntroMessage()}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

CSVInfo.defaultProps = {
  step: 1
};

CSVInfo.propTypes = {
  step: PropTypes.number
};

export default CSVInfo;
