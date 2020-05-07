import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Col from 'reactstrap/es/Col';
import Row from 'reactstrap/es/Row';

import style from './InfoBox.module.css'
import { FormGroup, ListGroup } from 'reactstrap';
import Label from 'reactstrap/es/Label';
import moment from 'moment';
import FormTextField from '../../../../../components/FormFields/FormTextField/FormTextField';
import cx from 'classnames';
import { Text } from 'informed';
import ListGroupItem from "reactstrap/es/ListGroupItem";


class InfoBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      flagValue: null,
      flagIndex: null,
    }
  }

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
              <span>Institution record has no flag assigned</span>
            </Col>
          </ListGroupItem>
        )
      }
    }
  };

  onFormSubmit = (value, i) => {
    let { flags } =  this.props.formState.values;

    Number.isInteger(i) ? flags[i] = value : flags.push(value);
    flags = flags.filter(v => v.flag !== 'none');
    this.props.formState.values.flags = flags;
    this.setState({
      flags: flags
    })
    this.toggleModal();
  }

  toggleModal = () => {
    const { openModal } = this.state;

    this.setState({
      openModal: !openModal
    })
  }

  renderURL = () => {
    const { name_primary, id } = this.props.formState.values;

    if (name_primary && id) {
      return (
        <React.Fragment>
          <a href={`https://www.eqar.eu/qa-results/institution/?id=${id}`} target={'new'}>
            {name_primary}
          </a>
        </React.Fragment>
      )
    }
  }

  renderUpdateLog = () => {
    const { formState } = this.props;

    if (Object.entries(formState).length !== 0) {
      const updateLogs = formState.values['update_log'];
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
    if (date) {
      return moment(date, moment.ISO_8601).format("YYYY-MM-DD HH:mm:ss")
    }
  }

  render() {
    const { formState, disabled } = this.props;
    const values = formState.values;

    return (
      <div className={style.infoBoxContainer}>
        <Row>
          <Col md={6}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="deqar_id">DEQARINST ID</Label>
                  <FormTextField
                    field={'deqar_id'}
                    disabled={disabled}
                    className={disabled ? style.disabledInput : ''}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="eter_id">ETER ID</Label>
                  <FormTextField
                    field={'eter_id'}
                    disabled={disabled}
                    className={disabled ? style.disabledInput : ''}
                  />
                </FormGroup>
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
                <FormGroup>
                  <Label>Current flags</Label>
                  <Text field={'flags'} hidden={true}/>
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
                    className={disabled ? style.disabledInput : ''}
                  />
                </FormGroup>
              </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>Record History</Label>
                    <Text field={'update_log'} hidden={true}/>
                    {this.renderUpdateLog()}
                    <Text field={'created_at'} hidden={true}/>
                    <input
                      className={cx(style.disabledInput, 'form-control')}
                      disabled={true}
                      value={`Record created: ${this.renderDate(values.created_at)}`}

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
