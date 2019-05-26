import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Col from "reactstrap/es/Col";
import Row from "reactstrap/es/Row";

import style from "./InfoBox.module.css"
import {FormGroup, ListGroup} from "reactstrap";
import Label from "reactstrap/es/Label";
import ListGroupItem from "reactstrap/es/ListGroupItem";
import moment from "moment";
import FormTextField from "../../../components/FormFields/FormTextField";
import cx from 'classnames';

class InfoBox extends Component {
  flagRender = (value) => {
    let className = '';
    switch(value) {
      case 'none':
        className = 'badge badge-success';
        break;
      case 'low level':
        className = 'badge badge-warning';
        break;
      case 'high level':
        className = 'badge badge-danger';
        break;
      default:
        return null;
    }
    return(<span className={className}>{value}</span>);
  };

  renderFlags = () => {
    const { formState } = this.props;

    if (formState.flags) {
      const { flags } = formState;

      if (flags.length > 0) {
        return flags.map((flag, idx) => {
          if (flag.active) {
            return(
              <ListGroupItem key={idx} className={style.ListGroupItem} disabled={true}>
                <Col xs={2} className={style.flagInfo}>
                  {this.flagRender(flag.flag)}
                </Col>
                <Col xs={10} className={style.flagMessage}>
                  <span>{flag.flag_message}</span>
                </Col>
              </ListGroupItem>
            )
          } else {
            return undefined;
          }
        });
      } else {
        return (
          <ListGroupItem className={style.ListGroupItem} disabled={true}>
            <Col xs={2} className={style.flagInfo}>
              {this.flagRender('none')}
            </Col>
            <Col xs={10} className={style.flagMessage}>
              <span>Report record has no flag assigned</span>
            </Col>
          </ListGroupItem>
        )
      }
    };
  }

  renderURL = () => {
    const {formState} = this.props;

    if (formState['id']) {
      const id = formState['id'];

      if (id) {
        return(
          <React.Fragment>
            <a href={`https://www.eqar.eu/qa-results/institution/?id=${id}`} target={'new'}>
              {`https://www.eqar.eu/qa-results/institution/?id=${id}`}
            </a>
          </React.Fragment>
        )
      }
    }
  };

  renderDate = (date) => {
    if(date) {
      return moment(date, moment.ISO_8601).format("YYYY-MM-DD HH:mm:ss")
    }
  };

  render() {
    const { formState, disabled } = this.props;

    return (
      <div className={style.infoBoxContainer}>
        <Row>
          <Col md={6}>
            <Row>
              <Col md={6}>
                <Label for="deqar_id">DEQARINST ID</Label>
                  <FormTextField
                    field={'deqar_id'}
                    disabled
                  />
              </Col>
              <Col md={6}>
                <Label for="eter_id">ETER ID</Label>
                  <FormTextField
                    field={'eter_id'}
                    disabled
                  />
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label>View public record on eqar.eu</Label>
                  <ListGroup>
                    {this.renderURL()}
                  </ListGroup>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label>Current flags</Label>
                  <ListGroup>
                    {this.renderFlags()}
                  </ListGroup>
                </FormGroup>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <Row>
              <Col>
                <FormGroup>
                  <Label>Internal Note</Label>
                  <FormTextField
                    field={'internal_note'}
                    placeholder={'Enter note, if necessary'}
                    disabled={disabled}
                    className={disabled ? style.internalNote : ''}
                    />
                </FormGroup>
              </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>Record History</Label>
                    <input
                      className={cx(style.infoInput, 'form-control')}
                      disabled={true}
                      value={`Created at ${this.renderDate(formState.created_at)} by '${formState.created_by}'`}

                    />
                    <input
                      className={cx(style.infoInput, 'form-control')}
                      disabled={true}
                      value={`Updated at ${this.renderDate(formState.updated_at)} by '${formState.updated_by}'`}
                    />
                  </FormGroup>
                </Col>
              </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

InfoBox.propTypes = {
  formState: PropTypes.object,
  disabled: PropTypes.bool
};

export default InfoBox;
