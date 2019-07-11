import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Col from "reactstrap/es/Col";
import Row from "reactstrap/es/Row";

import style from "./InfoBox.module.css"
import { FormGroup, ListGroup } from "reactstrap";
import Label from "reactstrap/es/Label";
import moment from "moment";
import FormTextField from "../../../components/FormFields/FormTextField";
import cx from 'classnames';
import FlagForm from './FlagForm';
import AssignedList from '../../../components/FormFieldsUncontrolled/AssignedList';
import {Text} from "informed";


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
    return {
      none: 'badge badge-success',
      low_level: 'badge badge-warning',
      high_level: 'badge badge-danger'
    }[value.replace(' ', '_')]
  }

  renderFlags = value => (
    <Row>
      <Col xs={4}>
        <span className={this.flagRender(value.flag)}>{value.flag}</span>
      </Col>
      <Col xs={8}>
        <span>{value.flag_message}</span>
      </Col>
    </Row>
  )

  onFlagRemove = (i) => {
    let { flags } =  this.props.formState.values;

    if (flags[0].flag !== 'none') {
      flags.splice(i, 1);
    }
    if (flags.length === 0) {
      flags = [{flag: 'none', flag_message: 'Institution has no flag assigned', banned: true}];
    }
    this.props.formState.values.flags = flags;
    this.setState({
      flags: flags
    });
  }

  onFlagClick = (index) => {
    let { flags } =  this.props.formState.values;

    this.setState({
      flagValue: flags[index],
      flagIndex: index
    });

    this.toggleModal();
  }

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

  onAddFlagClick = () => {
    this.setState({
      flagValue: null,
      flagIndex: null
    });
    this.toggleModal();
  }

  renderURL = () => {
    const { id } = this.props.formState.values;

    if (id) {
      return (
        <React.Fragment>
          <a href={`https://www.eqar.eu/qa-results/institution/?id=${id}`} target={'new'}>
            {`https://www.eqar.eu/qa-results/institution/?id=${id}`}
          </a>
        </React.Fragment>
      )
    }
  }

  renderUpdateLog = () => {
    const {formState} = this.props;

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
    const { openModal, flagValue, flagIndex } = this.state;
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
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="eter_id">ETER ID</Label>
                  <FormTextField
                    field={'eter_id'}
                    disabled
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
              </Col>
            </Row>
            <Row>
              <Col>
                <FlagForm
                  modalOpen={openModal}
                  onToggle={() => this.toggleModal()}
                  onFormSubmit={this.onFormSubmit}
                  formValue={flagValue}
                  formIndex={flagIndex}
                  disabled={disabled}
                />
                <AssignedList
                  errors={formState.errors}
                  valueFields={['request']}
                  values={values.flags}
                  label={'Flags'}
                  btnLabel={'Add'}
                  onRemove={this.onFlagRemove}
                  renderDisplayValue={this.renderFlags}
                  onAddButtonClick={this.onAddFlagClick}
                  onClick={this.onFlagClick}
                  field={'flags'}
                  disabled={disabled}
                />
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
                      className={cx(style.infoInput, 'form-control')}
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
