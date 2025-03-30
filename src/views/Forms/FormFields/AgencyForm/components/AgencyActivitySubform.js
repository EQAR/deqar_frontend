import React, {useState} from 'react';
import {Button, ButtonGroup, Col, Collapse, FormGroup, Label, Row} from "reactstrap";
import {
  validateDate,
  validateDateFromRequired,
  validateRequired,
  validateURL
} from "../../../../../utils/validators";
import withPopupFormManager from "../../../../../components/FormManager/PopupFormManagerHOC";
import FormTextField from "../../../../../components/FormFields/FormTextField/FormTextField";
import FormSelectField from "../../../../../components/FormFields/FormSelectField/FormSelectField";
import FormDatePickerField from "../../../../../components/FormFields/FormDatePickerField/FormDatePickerField";
import agency from "../../../../../services/Agency";
import style from './AgencyActivitySubform.module.css';
import FormDependentSelectField from "../../../../../components/FormFields/FormSelectField/FormDependentSelectField";
import AgencyGroupSubform from "./AgencyGroupSubform";

const AgencyActivitySubform = ({formApi, formState, disabled, formType}) => {
  const [groupFilter, setGroupFilter] = useState('all');
  const [activityGroupFormOpen, setActivityGroupFormOpen] = useState(false);
  const [activityGroupFormAction, setActivityGroupFormAction] = useState(null);

  const handleActivityGroupButtons = (action) => {
    setActivityGroupFormOpen(true);
    setActivityGroupFormAction(action);
  }

  const onActivityGroupChange = (value) => {
    if (!value) {
      setActivityGroupFormOpen(false);
    }
  }

  const afterAgencyGroupSave = (values) => {
    formApi.setValue('activity_group', {id: values.id, display_value: values.display_value});
  }

  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="activity_group" className={'required'}>Activity Group</Label>
            <FormDependentSelectField
                field={'activity_group'}
                placeholder={'Select activity group...'}
                optionsAPI={agency.selectActivityGroup}
                optionsID={groupFilter}
                labelField={'display_value'}
                valueField={'id'}
                validate={validateRequired}
                onChange={onActivityGroupChange}
                disabled={disabled}
            />
          </FormGroup>
        </Col>
      </Row>
      { formType === 'view' ? '' :
        <Row>
          <Col md={8}>
              <ButtonGroup>
                <Button
                    type={'button'}
                    size="sm"
                    color="secondary"
                    className={style.Button}
                    onClick={() => setGroupFilter('all')}
                    active={groupFilter === 'all'}>All</Button>
                <Button
                    type={'button'}
                    size="sm"
                    color="secondary"
                    className={style.Button}
                    onClick={() => setGroupFilter('I')}
                    active={groupFilter === 'I'}
                >Inst.</Button>
                <Button
                    type={'button'}
                    size="sm"
                    color="secondary"
                    className={style.Button}
                    onClick={() => setGroupFilter('P')}
                    active={groupFilter === 'P'}
                >Prg.</Button>
                <Button
                    type={'button'}
                    size="sm"
                    color="secondary"
                    className={style.Button}
                    onClick={() => setGroupFilter('JP')}
                    active={groupFilter === 'JP'}
                >JP</Button>
                <Button
                    type={'button'}
                    size="sm"
                    color="secondary"
                    className={style.Button}
                    onClick={() => setGroupFilter('I/P')}
                    active={groupFilter === 'I/P'}
                >Inst./Prg.</Button>
              </ButtonGroup>
          </Col>
          <Col md={4} style={{textAlign: 'right'}}>
            <ButtonGroup  >
              <Button
                  type={'button'}
                  size="sm"
                  color="primary"
                  className={style.Button}
                  onClick={() => handleActivityGroupButtons('add')}
                  active={activityGroupFormAction === 'add'}
                  >Add</Button>
              <Button
                  type={'button'}
                  size="sm"
                  color="primary"
                  className={style.Button}
                  disabled={!formState.values['activity_group']}
                  active={activityGroupFormAction === 'edit'}
                  onClick={() => handleActivityGroupButtons('edit')}
              >Edit</Button>
            </ButtonGroup>
          </Col>
        </Row>
      }
      <Collapse isOpen={activityGroupFormOpen}>
        <Row>
          <Col md={12}>
            <AgencyGroupSubform
                afterSave={afterAgencyGroupSave}
                formAction={activityGroupFormAction}
                group={formState.values['activity_group']}
                onClose={() => setActivityGroupFormOpen(false)}
            />
          </Col>
        </Row>
      </Collapse>
      <hr/>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="activity" className={'required'}>Activity Label</Label>
            <FormTextField
                field={'activity'}
                placeholder={'Enter full activity name'}
                disabled={disabled}
                validate={validateRequired}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="activity_local_identifier">Activity Local ID</Label>
            <FormTextField
              field={'activity_local_identifier'}
              placeholder={'Enter local ID for activity'}
              disabled={formType === 'view'}
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
              disabled={disabled}
              validate={validateURL}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="activity_valid_from" className={'required'}>Valid From</Label>
            <FormDatePickerField
              field={'activity_valid_from'}
              placeholderText={'YYYY-MM-DD'}
              disabled={disabled}
              validate={(value) => validateDateFromRequired(
                value,
                formState.values.activity_valid_to,
                "Activity valid from date should be eariler than valid to date!"
              )}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="activity_valid_to">Valid To</Label>
            <FormDatePickerField
              field={'activity_valid_to'}
              placeholderText={'YYYY-MM-DD'}
              disabled={disabled}
              validate={validateDate}
            />
          </FormGroup>
        </Col>
      </Row>
    </React.Fragment>
  )
};

export default withPopupFormManager(AgencyActivitySubform);
