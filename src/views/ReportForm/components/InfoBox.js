import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Col from "reactstrap/es/Col";
import Row from "reactstrap/es/Row";

import style from "./InfoBox.module.css"
import {FormGroup, Input, ListGroup} from "reactstrap";
import Label from "reactstrap/es/Label";
import ListGroupItem from "reactstrap/es/ListGroupItem";
import moment from "moment";

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
    if(Object.entries(formState).length !== 0) {
      const {flags} = formState;
      if(flags.length > 0) {
        return flags.map((flag, idx) => {
          if(flag.active) {
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
            return(undefined)
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
    }
  };

  renderURL = () => {
    const {formState} = this.props;

    if (Object.entries(formState).length !== 0) {
      const institution = formState.institutions[0];
      if(institution) {
        const url = `https://www.eqar.eu/qa-results/institution/?id=${institution.id}`;
        return (
          <ListGroupItem className={style.ListGroupItem}>
            <a href={url} target={'new'}>{url}</a>
          </ListGroupItem>
        )
      } else {
        return(
          <ListGroupItem className={style.ListGroupItem}>
            Currently there are no institutions assigned with this report...
          </ListGroupItem>
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
    const { formState } = this.props;

    return (
      <div className={style.infoBoxContainer}>
        <Row>
          <Col xs={6}>
            <FormGroup>
              <Label>View public record on eqar.eu</Label>
              <ListGroup>
                {this.renderURL()}
              </ListGroup>
            </FormGroup>
            <FormGroup>
              <Label>Current flags</Label>
              <ListGroup>
                {this.renderFlags()}
              </ListGroup>
            </FormGroup>
          </Col>
          <Col xs={6}>
            <FormGroup>
              <Label>Record created</Label>
              <Input
                className={style.infoInput}
                disabled={true}
                placeholder={this.renderDate(formState.created_at)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Record updated</Label>
              <Input
                className={style.infoInput}
                disabled={true}
                placeholder={this.renderDate(formState.updated_at)}
              />
            </FormGroup>
          </Col>
        </Row>
      </div>
    )
  }
}

InfoBox.propTypes = {
  id: PropTypes.string.isRequired,
  formState: PropTypes.object,
};

export default InfoBox;