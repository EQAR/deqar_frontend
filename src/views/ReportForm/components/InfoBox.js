import React, { Component } from 'react';
import Col from "reactstrap/es/Col";
import Row from "reactstrap/es/Row";
import { Text } from "informed";
import style from "./InfoBox.module.css"
import {FormGroup, ListGroup} from "reactstrap";
import Label from "reactstrap/es/Label";
import ListGroupItem from "reactstrap/es/ListGroupItem";
import moment from "moment";
import FormTextField from "../../../components/FormFields/FormTextField";
import cx from 'classnames';
import PropTypes from 'prop-types';

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
    const { formState, userIsAdmin } = this.props;
    if(Object.entries(formState).length !== 0) {
      const {flags} = formState;
      if(flags && flags.length > 0) {
        return flags.map((flag, idx) => {
          if(flag.active) {
            if(userIsAdmin) {
              return(
                <ListGroupItem key={idx} className={style.ListGroupItem}>
                  <Col xs={2} className={style.flagInfo}>
                    {this.flagRender(flag.flag)}
                  </Col>
                  <Col xs={9} className={style.flagMessage}>
                    <span>{flag.flag_message}</span>
                  </Col>
                  <Col xs={1} className={style.flagInfo}>
                    <div className={style.removeButton + " pull-right"} onClick={() => {this.props.onRemoveFlag(flag.id)}}>
                      <i className="fa fa-close"> </i>
                    </div>
                  </Col>
                </ListGroupItem>
              )
            } else {
              return(
                <ListGroupItem key={idx} className={style.ListGroupItem}>
                  <Col xs={2} className={style.flagInfo}>
                    {this.flagRender(flag.flag)}
                  </Col>
                  <Col xs={10} className={style.flagMessage}>
                    <span>{flag.flag_message}</span>
                  </Col>
                </ListGroupItem>
              )
            }
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
      const institutions = formState['institutions'];
      if(institutions) {
        return(
          <React.Fragment>
          {institutions.map((institution, idx) => {
            return(
              <ListGroupItem key={idx} className={style.ListGroupItem}>
                <a href={`https://www.eqar.eu/qa-results/institution/?id=${institution.id}`} target={'new'}>
                  {`https://www.eqar.eu/qa-results/institution/?id=${institution.id}`}
                </a>
              </ListGroupItem>
            )
          })}
          </React.Fragment>
        )
      }
    }
  };

  renderUpdateLog = () => {
    const {formState} = this.props;

    if (Object.entries(formState).length !== 0) {
      const updateLogs = formState['update_log'];
      if(updateLogs) {
        return(
          <React.Fragment>
            {updateLogs.map((updateLog, idx) => {
              const updatedBy = updateLog.updated_by ? `by '${updateLog.updated_by}'` : '';
              const note = updateLog.note ? `(${updateLog.note})` : '';

              return(
                <input
                  key={idx}
                  className={cx(style.infoInput, 'form-control')}
                  disabled={true}
                  value={`Updated: ${this.renderDate(updateLog.updated_at)} ${updatedBy} ${note}`}
                />
              )
            })}
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
          <Col xs={6}>
            <FormGroup>
              <Label>View public record on eqar.eu</Label>
              <ListGroup>
                {this.renderURL()}
              </ListGroup>
            </FormGroup>
            <FormGroup>
              <Label>Current flags</Label>
              <Text field={'flags'} hidden={true}/>
              <ListGroup>
                {this.renderFlags()}
              </ListGroup>
            </FormGroup>
          </Col>
          <Col xs={6}>
            <FormGroup>
              <Label>Internal Note</Label>
              <FormTextField
                field={'internal_note'}
                placeholder={'Enter note, if necessary'}
                disabled={disabled}
                className={disabled ? style.internalNote : ''}
               />
            </FormGroup>
            <FormGroup>
              <Label>Record History</Label>
              <Text field={'created_at'} hidden={true}/>
              <Text field={'created_by'} hidden={true}/>
              <Text field={'update_log'} hidden={true}/>
              <input
                className={cx(style.infoInput, 'form-control')}
                disabled={true}
                value={`Record created: ${this.renderDate(formState.created_at)} by '${formState.created_by}'`}
              />
              {this.renderUpdateLog()}
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
  disabled: PropTypes.bool,
  userIsAdmin: PropTypes.bool.isRequired,
  onRemoveFlag: PropTypes.func
};

export default InfoBox;