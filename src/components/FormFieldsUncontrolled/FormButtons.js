import React, {Component} from 'react';
import LaddaButton, {EXPAND_RIGHT} from "react-ladda";
import 'ladda/dist/ladda-themeless.min.css';
import {Button, Col, Collapse, FormGroup, Row} from "reactstrap";
import {Link, withRouter} from "react-router-dom";
import FormTextField from "../FormFields/FormTextField";
import PropTypes from 'prop-types';
import style from "./FormButtons.module.css";

class FormButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitMessageOpen: false,
    }
  }

  // Events
  onSubmitClick = () => {
    this.setState({
      submitMessageOpen: true
    })
  };

  renderDeleteButton = () => {
    return(
      <Button
        type={'button'}
        size="sm"
        color="danger"
        className={style.DeleteButton}
        onClick={this.props.onDelete}
      >Request Deletion</Button>
    )
  };

  renderEditSubmitButton = () => {
    const {submitMessageOpen} = this.state;
    const {loading, deleteButton, userIsAdmin} = this.props;

    if (submitMessageOpen) {
      return (
        <div className={'pull-right'}>
          {(deleteButton | userIsAdmin) ? this.renderDeleteButton() : null}
          <LaddaButton
            className={style.SubmitButton + " btn btn-primary btn-ladda btn-sm"}
            loading={loading}
            data-color="blue"
            data-style={EXPAND_RIGHT}
            onClick={() => this.props.submitForm()}
          >Submit</LaddaButton>
        </div>
      )
    } else {
      return(
        <div className={'pull-right'}>
          {(deleteButton | userIsAdmin) ? this.renderDeleteButton() : null}
          <Button
            type={'button'}
            size="sm"
            color="primary"
            onClick={this.onSubmitClick}
          >Submit</Button>
        </div>
      )
    }
  };

  renderCreateSubmitButton = () => {
    const {loading} = this.props;

    return(
      <div className={'pull-right'}>
        <LaddaButton
          className={style.SubmitButton + " btn btn-primary btn-ladda btn-sm"}
          loading={loading}
          data-color="blue"
          data-style={EXPAND_RIGHT}
        >
          Submit
        </LaddaButton>
      </div>
    )
  };

  renderHideInfoButton = () => {
    const {backPath, infoBoxOpen} = this.props;

    return (
      <span className={backPath ? style.InfoButton : ''}>
        <Button
          size={'sm'}
          color={'secondary'}
          onClick={this.props.infoBoxToggle}
        >{infoBoxOpen ? "Hide Info" : "Show Info"}</Button>
      </span>
    )
  };

  renderCloseButton = () => {
    const {backPath} = this.props;

    if(backPath) {
      return(
        <React.Fragment>
          <Link to={{pathname: `${backPath}`}}>
            <Button
              size="sm"
              color="secondary"
            >Close</Button>
          </Link>
        </React.Fragment>
      )
    }
  };

  renderEditButton = () => {
    const {buttonText, editButton, userIsAdmin, location} = this.props;
    const currentPath = location.pathname;
    const path = `${currentPath.replace("/view", "/edit")}`;

    if (editButton || userIsAdmin) {
      return(
        <div className={'pull-right'}>
          <Link to={{pathname: path}}>
            <Button
              size="sm"
              color="primary"
            >Edit {buttonText}</Button>
          </Link>
        </div>
      )
    }
  };

  renderSubmitMessage = () => {
    const {submitMessageOpen} = this.state;

    return (
      <Collapse isOpen={submitMessageOpen}>
        <FormGroup>
          <FormTextField
            field={'submit_comment'}
            placeholder={'Please enter a short description of your edit... (Optional)'}
          />
        </FormGroup>
      </Collapse>
    )
  };

  render() {
    const {formType, idForm} = this.props;

    switch (formType) {
      case 'view':
        return (
          <div>
            {this.renderCloseButton()}
            {this.renderHideInfoButton()}
            <div className='pull-right'>
              {this.renderEditButton()}
            </div>
          </div>
        );
      case 'create':
        return (
          <Row>
            <Col xs={12}>
              {this.renderCreateSubmitButton()}
            </Col>
          </Row>
        );
      case 'edit':
        return (
          <div>
            {this.renderSubmitMessage()}
            {this.renderEditSubmitButton()}
            {this.renderCloseButton()}
            {this.renderHideInfoButton()}
          </div>
        );
      default:
        break;
    }
  }
}

FormButtons.defaultProps = {
  userIsAdmin: false,
  editButton: false,
  deleteButton: false
};

FormButtons.propTypes = {
  userIsAdmin: PropTypes.bool,
  editButton: PropTypes.bool,
  deleteButton: PropTypes.bool,
  recordID: PropTypes.string,
  formType: PropTypes.string.isRequired,
  submitForm: PropTypes.func.isRequired,
  backPath: PropTypes.string,
  buttonText: PropTypes.string,
  infoBoxOpen: PropTypes.bool.isRequired,
  infoBoxToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  idForm: PropTypes.string
};

export default withRouter(FormButtons);
