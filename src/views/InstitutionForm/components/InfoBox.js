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
    }[value]
  }

  renderFlags = value => (
    <Row>
      <Col xs={2}>
        <span className={this.flagRender(value.request)}>{value.request}</span>
      </Col>
      <Col xs={10}>
        <span>{value.explanation}</span>
      </Col>
    </Row>
  )

  getFlagValues = (values) => {
    return !values.flags || values.flags === [] ? [{request: 'none', explanation: 'Institution has no flag assigned'}] : values.flags;
  }

  onFlagRemove = () => null;

  onFlagClick = (index) => {
    const { formState } = this.props;
    let { flags } =  this.props.formState.values;

    flags = !flags || flags === [] ? [{request: 'none', explanation: 'Institution has no flag assigned'}] : flags;

    this.setState({
      flagValue: flags[index],
      flagIndex: index
    });

    this.toggleModal();
  }

  onFormSubmit = () => null;

  toggleModal = () => {
    const { openModal } = this.state;

    this.setState({
      openModal: !openModal
    })
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
    const { formApi, disabled } = this.props;
    console.log(formApi);
    const formState = formApi.getState();
    console.log(formState);

    const { values } = formState;
    const { openModal, flagValue } = this.state;

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
                  disabled
                />
                <AssignedList
                  errors={formState.errors}
                  valueFields={['request']}
                  values={this.getFlagValues(values)}
                  label={'Flags'}
                  btnLabel={'Add'}
                  onRemove={this.onFlagRemove}
                  renderDisplayValue={this.renderFlags}
                  onAddButtonClick={() => this.toggleModal()}
                  onClick={this.onFlagClick}
                  field={'flags'}
                  disabled
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
                      value={`Created at ${this.renderDate(values.created_at)} by '${values.created_by}'`}

                    />
                    <input
                      className={cx(style.infoInput, 'form-control')}
                      disabled={true}
                      value={`Updated at ${this.renderDate(values.updated_at)} by '${values.updated_by}'`}
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
