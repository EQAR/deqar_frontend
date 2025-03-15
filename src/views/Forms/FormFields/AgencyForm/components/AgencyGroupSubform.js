import {Form, Text} from "informed";
import React, {useEffect, useState} from "react";
import {Button, Col, FormGroup, Label, Row} from "reactstrap";
import FormSelectField from "../../../../../components/FormFields/FormSelectField/FormSelectField";
import agency from "../../../../../services/Agency";
import {validateRequired, validateURL} from "../../../../../utils/validators";
import style from "./AgencyActivitySubform.module.css";
import LaddaButton, {EXPAND_RIGHT} from "@zumper/react-ladda";
import FormTextField from "../../../../../components/FormFields/FormTextField/FormTextField";
import {toast} from "react-toastify";

const AgencyGroupSubform = ({group, afterSave, onClose, formAction}) => {
    const [formApi, setFormApi] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        return () => {
            setIsMounted(false);
        }
    }, [])

    useEffect(() => {
        if (formAction === 'edit') {
            group && formInit()
        } else {
            formApi && formApi.reset()
            formApi && formApi.setValue('action', formAction)
        }
    }, [group, formAction]);

    const formInit = () => {
        agency.getActivityGroup(group['id']).then(response => {
            formApi.setValues(response.data);
        }).then(() => {
            formApi.setValue('action', formAction)
        })
    }

    const onSubmit = (values) => {
        values['activity_type'] = values['activity_type']['id']
        switch (values['action']) {
            case 'add':
                agency.createActivityGroup(values).then(response => {
                    setLoading(false);
                    toast.success(`Activity Group was updated.`);
                    afterSave({id: response.data.id, display_value: response.data.display_value});
                    onClose()
                }).catch((error) => {
                    toast.error('There was some error on your form!');
                    setLoading(false)
                });
                break;
            case 'edit':
                agency.updateActivityGroup(values, group['id']).then(response => {
                    setLoading(false);
                    toast.success(`Activity Group was updated.`);
                    console.log(response)
                    afterSave({id: response.data.id, display_value: response.data.display_value});
                    onClose()
                }).catch((error) => {
                    toast.error('There was some error on your form!');
                    setLoading(false)
                });
                break;
        }

    }


    return (
        <Form
            getApi={setFormApi}
            id={`AgencyGroupSubform`}
            onSubmit={onSubmit}
        >
            {({ formApi, formState }) => (
                <React.Fragment>
                    <div style={{height: '10px'}}/>
                    <FormTextField field={'action'} hidden />
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="activity_type" className={'required'}>Activity Type</Label>
                                <FormSelectField
                                    field={'activity_type'}
                                    optionsAPI={agency.selectActivityType}
                                    placeholder={'Please select'}
                                    labelField={'type'}
                                    valueField={'id'}
                                    validate={validateRequired}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="activity" className={'required'}>Activity Name</Label>
                                <FormTextField
                                    field={'activity'}
                                    placeholder={'Enter activity group name'}
                                    validate={validateRequired}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="reports_link">Documentation link</Label>
                                <FormTextField
                                    field={'reports_link'}
                                    placeholder={'Enter URL'}
                                    validate={validateURL}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Button
                                type={'button'}
                                size="sm"
                                color="secondary"
                                className={style.Button}
                                onClick={onClose}
                            >Close</Button>
                        </Col>
                        <Col md={6}>
                            <div className={'pull-right'}>
                                <LaddaButton
                                    className={style.SubmitButton + " btn btn-primary btn-ladda btn-sm"}
                                    loading={loading}
                                    data-color="blue"
                                    data-style={EXPAND_RIGHT}
                                    onClick={formApi.submitForm}
                                >
                                    Save
                                </LaddaButton>
                            </div>
                        </Col>
                    </Row>
                </React.Fragment>
            )}
</Form>
)
}

export default AgencyGroupSubform;