import React from 'react';
import {Card, CardBody, CardFooter, CardHeader, Col, Collapse, Row} from "reactstrap";
import style from "./FormManagerHOC.module.css";
import {Form} from "informed";
import PreventNavigation from "../PreventNavigation/PreventNavigation";
import FormButtons from "./components/FormButtons";
import FormInfoBox from "./components/FormInfoBox";
import {toast} from "react-toastify";
import confirm from 'reactstrap-confirm';
import report from "../../services/Report";
import FormAlert from "./components/FormAlert";

const withFormManager = (OriginalForm) => {

  class FormManager extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        alertVisible: false,
        nonFieldErrors: [],
        loading: false,
        readOnly: false,
        infoBoxOpen: false,
        isSubmitted: false
      }
    }

    componentDidMount() {
      this._isMounted = true;
      this.initForm();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      const { formType } = this.props;

      if (formType !== prevProps.formType) {
        this.initForm();
      }
    }

    initForm = () => {
      const { formType } = this.props;

      switch (formType) {
        case 'view':
          this.setState({
            readOnly: true
          });
          this.populateForm();
          break;
        case 'edit':
          this.setState({
            readOnly: false
          });
          this.populateForm()
          break;
        case 'create':
          this.setState({
            readOnly: false
          });
          break;
        default:
          break;
      }
    };

    componentWillUnmount() {
      this._isMounted = false;
    }

    setFormApi = (formApi) => {
      this.formApi = formApi;
    };

    // Buttons
    isEditable = () => {
      const {location, userIsAdmin} = this.props;
      const currentPath = location.pathname;
      return !(currentPath.includes('/reference/') && !userIsAdmin);
    };

    // Populate form
    populateForm = () => {
      const { api, recordID, decoders = [], fileField } = this.props;
      const readAPI = api.read;

      readAPI(recordID).then((response) => {
        let formValues = response.data;
        decoders.forEach((decoder) => {
          formValues = decoder(formValues);
        });
        return formValues
      }).then((formValues) => {
        if (this._isMounted) {
          this.formApi.setValues(formValues);
          if (fileField) {
            const files = new Array(formValues[fileField].length);
            this.setState({
              files: files
            });
          }
          if (this.props.onFormPopulate) {
            this.props.onFormPopulate(formValues);
          }
        }
      })
    };

    getBackPath = () => {
      const {formType, backPath, recordID} = this.props;
      switch (formType) {
        case 'view':
          return backPath;
        case 'edit':
          return `${backPath}view/${recordID}`;
        default:
          break;
      }
    };

    // Infobox toggle
    toggleInfoBox = () => {
      this.setState({ infoBoxOpen: !this.state.infoBoxOpen });
    };

    // Loading toggle
    toggleLoading = () => {
      this.setState({
        ...this.state,
        loading: !this.state.loading
      });
    };

    onSubmit = (values) => {
      const {formType, api, recordID, module, encoders = [], normalizers, history} = this.props;
      let normalizedForm = values;
      let apiFunction;
      let message;

      this.toggleLoading();

      encoders.forEach((encoder) => {
        normalizedForm = encoder(normalizedForm);
      });

      switch(formType) {
        case 'create':
          apiFunction = api.create(normalizers['create'](normalizedForm));
          message = 'created';
          break;
        case 'edit':
          apiFunction = api.update(normalizers['update'](normalizedForm), recordID);
          message = 'updated';
          break;
        default:
          break;
      }

      apiFunction.then((response) => {
        toast.success(`${module.charAt(0).toUpperCase() + module.slice(1)} record was ${message}.`);
      }).then((report) => {
        this.toggleLoading();
        this.setState({isSubmitted: true});
        history.push(this.getBackPath())
      }).catch((error) => {
        const errorData = error.response.data;
        if (errorData.hasOwnProperty('non_field_errors')) {
          this.setState({
            alertVisible: true,
            nonFieldErrors: errorData['non_field_errors']
          })
        }
        toast.error('There was some error on your form!');
        this.toggleLoading();
      });
    };

    onRemoveFlag = (flagID) => {
      const {api} = this.props;
      const deleteFlagAPI = api.deleteFlag;

      confirm({
        title: 'Remove Flag',
        message: 'Are you sure you would like to remove this flag?',
        confirmColor: 'danger'
      }).then((result) => {
        if (result) {
          if (deleteFlagAPI) {
            deleteFlagAPI(flagID).then((result) => {
              this.populateForm();
              this.setState({
                infoBoxOpen: true
              })
            });
          }
        }
      });
    };

    onDelete = () => {
      const {api, module, recordID} = this.props;
      const deleteRecord = api.delete;

      confirm({
        title: 'Request Deletion',
        message: `Are you sure you would like to mark this ${module} as deleted?`,
        confirmColor: 'danger'
      }).then((result) => {
        if (result) {
          if (deleteRecord) {
            deleteRecord(recordID).then((result) => {
              this.populateForm();
              this.setState({
                infoBoxOpen: true
              })
            });
          }
        }
      });
    };

    onAlertClose = () => {
      this.setState({
        alertVisible: false,
        nonFieldErrors: []
      })
    };

    renderError = () => {
      const {alertVisible, nonFieldErrors} = this.state;

      return (
        <Row>
          <Col md={12}>
            <FormAlert
              visible={alertVisible}
              onClose={this.onAlertClose}
              errorMessage={nonFieldErrors}
            />
          </Col>
        </Row>
      )
    };

    render() {
      const {formTitle, formID, userIsAdmin, formType, recordID, module} = this.props;
      const {isSubmitted, readOnly, infoBoxOpen, loading} = this.state;
      const buttonText = module.substr(0, 1).toUpperCase() + module.substr(1).toLowerCase();

      return (
        <div className="animated fadeIn">
          <Card className={style.ReportFormCard}>
            <CardHeader>
              <Row>
                <Col>
                  {formTitle}
                </Col>
              </Row>
            </CardHeader>
            <Form
              getApi={this.setFormApi}
              onSubmit={this.onSubmit}
              id={formID}
            >
              {({ formApi, formState }) => (
                <React.Fragment>
                  { formType !== 'view' &&
                    <PreventNavigation
                      formState={formState}
                      isSubmitted={isSubmitted}
                    />
                  }
                  <CardBody className={formType !== 'view' ? style.EditFormCard : undefined}>
                    {this.renderError()}
                    <OriginalForm
                      {...this.props}
                      formApi={formApi}
                      formState={formState}
                      readOnly={readOnly}
                      onAddFile={this.onAddFile}
                    />
                  </CardBody>
                  <CardFooter>
                    <FormButtons
                      backPath={this.getBackPath()}
                      userIsAdmin={userIsAdmin}
                      editButton={this.isEditable()}
                      deleteButton={module === 'report' && this.isEditable()}
                      buttonText={buttonText}
                      recordID={recordID}
                      formType={formType}
                      infoBoxOpen={infoBoxOpen}
                      infoBoxToggle={this.toggleInfoBox}
                      submitForm={formApi.submitForm}
                      onDelete={this.onDelete}
                      loading={loading}
                    />
                  </CardFooter>
                  <CardFooter className={style.infoFooter}>
                    {formType === 'create' ? "" :
                      <Collapse isOpen={infoBoxOpen}>
                        <FormInfoBox
                          id={recordID}
                          formState={formState.values}
                          disabled={readOnly}
                          userIsAdmin={userIsAdmin}
                          module={module}
                          onRemoveFlag={this.onRemoveFlag}
                        />
                      </Collapse>
                    }
                  </CardFooter>
                </React.Fragment>
              )}
            </Form>
          </Card>
        </div>
      )
    }
  }

  return FormManager;
};

export default withFormManager;
