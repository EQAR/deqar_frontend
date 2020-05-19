import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Form} from "informed";

const withPopupFormManager = (OriginalPopupForm) => {
  class PopupFormManager extends React.Component {
    setFormApi = (formApi) => {
      const {formValue} = this.props;
      this.formApi = formApi;
      if (formValue) {
        this.formApi.setValues(formValue);
      }
    };

    onToggle = () => {
      this.props.onClose();
    };

    renderActionName = () => {
      const {formIndex, disabled} = this.props;
      let action = '';

      if(formIndex >= 0) {
        action = disabled ? 'View' : 'Edit'
      } else {
        action = 'Add'
      }

      return action;
    };

    onSubmit = (values) => {
      const {formIndex} = this.props;
      this.props.onSubmit(values, formIndex);
    };

    render() {
      const {formIndex, field, title, readOnly, modalOpen, disabled, submitDisabled} = this.props;
      const submitButtonDisabled = submitDisabled !== undefined ? submitDisabled : disabled;
      const titleText = `${this.renderActionName()} ${title}`;

      return(
        <Modal isOpen={modalOpen} toggle={this.onToggle}>
          <Form
            getApi={this.setFormApi}
            id={`${field}-${formIndex}`}
            onSubmit={this.onSubmit}
          >
            {({ formApi, formState }) => (
              <React.Fragment>
                <ModalHeader>{titleText}</ModalHeader>
                <ModalBody>
                  <OriginalPopupForm
                    {...this.props}
                    formApi={formApi}
                    formState={formState}
                    readOnly={readOnly}
                  />
                </ModalBody>
                <ModalFooter className={'justify-content-between'}>
                  <Button
                    color="secondary"
                    type={'button'}
                    onClick={this.onToggle}
                    size="sm"
                  >
                    Close
                  </Button>
                  { submitButtonDisabled ? "" :
                    <Button
                      color="primary"
                      type={'button'}
                      onClick={() => this.formApi.submitForm()}
                      size="sm"
                    >
                      Save
                    </Button>
                  }
                </ModalFooter>
              </React.Fragment>
            )}
          </Form>
        </Modal>
      )
    }
  }

  return PopupFormManager;
};

export default withPopupFormManager;
