import React, { Component } from 'react';
import { Form } from 'informed';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormGroup, FormText,
  Label,
  Row
} from "reactstrap";

import FormTextField from "../../components/FormFields/FormTextField";
import institution from "../../services/Institution";
import style from "./InstitutionForm.module.css";


class InstitutionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      readOnly: false
    }
  }

  componentDidMount() {
    const { formType } = this.props;

    this.setState({
      readOnly: this.isReadOnly(formType)
    });
    this.populate();
  }

  isReadOnly = (formType) => formType === 'view';

  populate = () => {
    const { formID, formType } = this.props;

    if (formType !== 'create') {
      institution.getInstitution(formID).then(response => this.formApi.setValues(response.data))
    }
  }

  setFormApi = (formApi) => {
    this.formApi = formApi;
  };

  formTitle(formType) {
    return {
      view: 'View Institution',
      edit: 'Edit Institution',
      create: 'Add Institution'
    }[formType];
  }

  render() {
    const { readOnly } = this.state;
    const { formType } = this.props;

    return (
      <div className="animated fadeIn">
        <Card>
        <CardHeader>
            <Row>
              <Col>{this.formTitle(formType)}</Col>
            </Row>
          </CardHeader>
          <Form
            getApi={this.setFormApi}
          >
            {({ formState }) => (
              <React.Fragment>
                <CardBody>
                  <Row>
                    <Col md={6} className={style.borderLeft}>
                      <Row>
                        <Col>
                          <Label for="name_official" className={'required'}>Institution Name, Official</Label>
                            <FormTextField
                              field={'names[0].name_official'}
                              disabled={readOnly}
                            />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label for="name_primary" className={'required'}>Institution Name, Official</Label>
                            <FormTextField
                              field={'name_primary'}
                              disabled={readOnly}
                            />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label for="name_primary" className={'required'}>Institution Name, Official</Label>
                            <FormTextField
                              field={'name_primary'}
                              disabled={readOnly}
                            />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label for="name_primary" className={'required'}>Institution Name, Official</Label>
                            <FormTextField
                              field={'name_primary'}
                              disabled={readOnly}
                            />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
              </React.Fragment>
            )}
          </Form>
        </Card>
      </div>
    )
  }
}

export default InstitutionForm;
