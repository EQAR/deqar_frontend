import React from 'react';
import { Text } from "informed";
import style from "./InfoBox.module.css"
import {Col, Row, FormGroup, ListGroup} from "reactstrap";
import {Label, ListGroupItem} from "reactstrap";
import moment from "moment";
import FormTextField from "../../../components/FormFields/FormTextField";
import cx from 'classnames';
import PropTypes from 'prop-types';

const InfoBox = ({formState, userIsAdmin, disabled, ...props}) => {
  const flagRender = (value) => {
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

  const renderFlags = () => {
    if(Object.entries(formState).length !== 0) {
      const {flags} = formState;
      if(flags && flags.length > 0) {
        return flags.map((flag, idx) => {
          if(flag.active) {
            if(userIsAdmin) {
              return(
                <ListGroupItem key={idx} className={style.ListGroupItem}>
                  <Col xs={2} className={style.flagInfo}>
                    {flagRender(flag.flag)}
                  </Col>
                  <Col xs={9} className={style.flagMessage}>
                    <span>{flag.flag_message}</span>
                  </Col>
                  <Col xs={1} className={style.flagInfo}>
                    <div className={style.removeButton + " pull-right"} onClick={() => {props.onRemoveFlag(flag.id)}}>
                      <i className="fa fa-close"> </i>
                    </div>
                  </Col>
                </ListGroupItem>
              )
            } else {
              return(
                <ListGroupItem key={idx} className={style.ListGroupItem}>
                  <Col xs={2} className={style.flagInfo}>
                    {flagRender(flag.flag)}
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
              {flagRender('none')}
            </Col>
            <Col xs={10} className={style.flagMessage}>
              <span>Agency record has no flag assigned</span>
            </Col>
          </ListGroupItem>
        )
      }
    }
  };

  const renderURL = () => {
    if (Object.entries(formState).length !== 0) {
      const agency_id = formState['id'];
      if(agency_id) {
        return(
          <ListGroupItem className={style.ListGroupItem}>
            <a href={`https://www.eqar.eu/register/agencies/agency/?id=${agency_id}`} target={'new'}>
              {`https://www.eqar.eu/register/agencies/agency/?id=${agency_id}`}
            </a>
          </ListGroupItem>
        )
      }
    }
  };

  const renderUpdateLog = () => {
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
                  value={`Updated: ${renderDate(updateLog.updated_at)} ${updatedBy} ${note}`}
                />
              )
            })}
          </React.Fragment>
        )
      }
    }
  };

  const renderDate = (date) => {
    if(date) {
      return moment(date, moment.ISO_8601).format("YYYY-MM-DD HH:mm:ss")
    }
  };

  return (
    <div className={style.infoBoxContainer}>
      <Row>
        <Col xs={6}>
          <FormGroup>
            <Label>View public record on eqar.eu</Label>
            <ListGroup>
              {renderURL()}
            </ListGroup>
          </FormGroup>
          <FormGroup>
            <Label>Current flags</Label>
            <Text field={'flags'} hidden={true}/>
            <ListGroup>
              {renderFlags()}
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
            <Text field={'update_log'} hidden={true}/>
            {renderUpdateLog()}
          </FormGroup>
        </Col>
      </Row>
    </div>
  )
};

InfoBox.propTypes = {
  formState: PropTypes.object,
  disabled: PropTypes.bool,
  userIsAdmin: PropTypes.bool.isRequired,
  onRemoveFlag: PropTypes.func
};

export default InfoBox;