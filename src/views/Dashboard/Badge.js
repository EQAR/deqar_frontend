import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ButtonGroup, Card, CardBody, Col} from "reactstrap";

class Badge extends Component {
  render() {
    const {badgeText, total, style} = this.props;
    const className = `text-white bg-${style}`;

    return(
      <Col xs="12" sm="6" lg="3">
        <Card className={className}>
          <CardBody className="pb-0">
            <ButtonGroup className="float-right"> </ButtonGroup>
            <h4 className="mb-0">{total}</h4>
            <p>{badgeText}</p>
          </CardBody>
        </Card>
      </Col>
    )
  }
}

Badge.propTypes = {
  style: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  badgeText: PropTypes.string.isRequired
};

export default Badge;