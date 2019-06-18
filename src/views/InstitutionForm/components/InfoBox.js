import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Col from "reactstrap/es/Col";
import Row from "reactstrap/es/Row";
import { Form } from 'informed';


import style from "./InfoBox.module.css"
import { FormGroup, ListGroup } from "reactstrap";
import Label from "reactstrap/es/Label";
import ListGroupItem from "reactstrap/es/ListGroupItem";
import moment from "moment";
import FormTextField from "../../../components/FormFields/FormTextField";
import cx from 'classnames';
import FlagForm from './FlagForm';
import AssignedList from '../../../components/FormFieldsUncontrolled/AssignedList';

class InfoBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      flagValue: null,
      flagIndex: null
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

  getFlagValues = (flags) => {
    return !flags || flags.length === 0 ? [{flag: 'none', flag_message: 'Institution has no flag assigned'}] : flags;
  }

  onFlagRemove = () => null;

  onFlagClick = (index) => {
    let { flags } =  this.props.formState.values;

    flags = flags.length === 0 ? [{flag: 'none', flag_message: 'Institution has no flag assigned'}] : flags;
    this.setState({
      flagValue: flags[index],
      flagIndex: index
    });

    this.toggleModal();
  }

  onFormSubmit = (value, i) => {
    const { formState } = this.props;

    let values = formState.values.flags || [];
    Number.isInteger(i) ? values[i] = value : values.push(value)
    formState.values.flags = values
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

  renderDate = (date) => {
    if (date) {
      return moment(date, moment.ISO_8601).format("YYYY-MM-DD HH:mm:ss")
    }
  }

  render() {
    const { formState, isEdit } = this.props;
    const { openModal, flagValue, flagIndex } = this.state;
    const values = formState.values

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
                <FlagForm
                  modalOpen={openModal}
                  onToggle={() => this.toggleModal()}
                  onFormSubmit={this.onFormSubmit}
                  formValue={flagValue}
                  formIndex={flagIndex}
                />
                <AssignedList
                  errors={formState.errors}
                  valueFields={['request']}
                  values={this.getFlagValues(values.flags)}
                  label={'Flags'}
                  btnLabel={'Add'}
                  onRemove={this.onFlagRemove}
                  renderDisplayValue={this.renderFlags}
                  onAddButtonClick={this.onAddFlagClick}
                  onClick={this.onFlagClick}
                  field={'flags'}
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
                    disabled
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
                      value={`Created at ${this.renderDate(values.created_at)} by 'formState.created_by'`}

                    />
                    <input
                      className={cx(style.infoInput, 'form-control')}
                      disabled={true}
                      value={`Updated at ${this.renderDate(values)} by ''`}
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
