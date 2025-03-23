import React from 'react';
import {
  Col,
  FormGroup, Label,
  Row
} from "reactstrap";
import style from './ReportForm.module.css'
import report from '../../../../services/Report';
import agency from '../../../../services/Agency';
import {validateDate, validateDateFromRequired, validateRequired} from "../../../../utils/validators";
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import withFormManager from "../../../../components/FormManager/FormManagerHOC";
import FormTextField from "../../../../components/FormFields/FormTextField/FormTextField";
import FormSelectField from "../../../../components/FormFields/FormSelectField/FormSelectField";
import FormDependentSelectField from "../../../../components/FormFields/FormSelectField/FormDependentSelectField";
import FormAssignedList from "../../../../components/FormFields/FormAssignedList/FormAssignedList";
import FormDatePickerField from "../../../../components/FormFields/FormDatePickerField/FormDatePickerField";
import InstitutionSelect from "./components/InstitutionSelect";
import ProgrammeSubform from "./components/ProgrammeSubform";
import PopupFormListManager from "../../../../components/FormManager/PopupFormListManager";
import ReportLinkSubform from "./components/ReportLinkSubform";
import FileSubform from "./components/FileSubform";
import validateInstitutions from "./validators/validateInstitutions";
import validateProgrammes from "./validators/validateProgrammes";
import FormTextAreaFormatted from "../../../../components/FormFields/FormTextArea/FormTextAreaFormatted";
import FormCheckbox from "../../../../components/FormFields/FormCheckbox/FormCheckbox";
import validateStatus from "./validators/validateStatus";
import validateMicroCredentials from "./validators/validateMicroCredentials";
import {detectActivityType} from "../../../../utils/detectActivityType";
import validateActivities from "./validators/validateActivities";

const ReportForm = ({formType, formApi, formState, readOnly}) => {
  const isAgencyDisabled = () => {
    return formType !== 'create';
  };

  const onInstitutionSelected = (value) => {
    let institutions = formApi.getValue('institutions');
    if (institutions) {
      const institution_ids = institutions.map(i => i.id.toString());
      if (!institution_ids.includes(value.id.toString())) {
        institutions.push(value)
      }
    } else {
      institutions = [value]
    }
    formApi.setValue('institutions', institutions);
  };

  const onActivitySelected = (value) => {
    let activities = formApi.getValue('activities');

    if (activities) {
      const activity_ids = activities.map(i => i.id.toString());

      if (!(activity_ids.includes(value.id.toString()))) {
        activities.push(value)
      }
    } else {
      activities = [value]
    }
    formApi.setValue('activities', activities);
  };



  // Report Links
  const renderLinksDisplayValue = (value) => {
    const {link, link_display_name} = value;

    if (link_display_name) {
      return link_display_name;
    } else {
      return link
    }
  };

  // Files
  const renderFilesDisplayValue = (value) => {
    const {display_name, report_language, original_location, filename} = value;
    const languages = report_language.map((lang) => { return(lang.language_name_en) });
    let language_display = languages.join(', ');
    language_display = language_display.length > 0 ? `(${language_display})` : '';

    if (display_name) {
      return `${display_name} ${language_display}`;
    } else {
      if (original_location) {
        return `${original_location} ${language_display}`;
      } else {
        return `${filename} ${language_display}`;
      }
    }
  };

  // Programmes
  const renderProgrammeDisplayValue = (value) => {
    const {name_primary} = value;

    const {qualification_primary} = value;
    const degree = qualification_primary ? `, ${qualification_primary}` : '';

    const qf_ehea = value['qf_ehea_level'] ? ` (${value['qf_ehea_level']['level']})` : '';
    return `${name_primary}${degree}${qf_ehea}`;
  };

  const renderProgrammeField = () => {
    const activities = formState.values['activities'];
    const activityType = detectActivityType(activities);
    if (activityType !== 'institutional') {
      return(
          <PopupFormListManager
              field={'programmes'}
              formApi={formApi}
              renderDisplayValue={renderProgrammeDisplayValue}
              labelShowRequired={true}
              disabled={readOnly}
              validate={validateProgrammes}
          >
            <ProgrammeSubform size={'lg'} institutions={formState.values['institutions']} />
          </PopupFormListManager>
      )
    }
  };

  const getAgencyValues = () => {
    const agencies = [];
    const agency = formState.values['agency'];
    const contributing_agencies = formState.values['contributing_agencies'];

    agency && agencies.push(agency.id);

    if (contributing_agencies) {
      contributing_agencies.forEach((contributing_agency) => {
        agencies.push(contributing_agency.id);
      });
    }
    return agencies;
  }

  const renderActivityLabel = (option) => {
    const activityGroup = option['activity_group'];

    if (activityGroup['activity'] === option['activity']) {
      return `${option['activity']} (${option['agency']}) - ID ${option['id']} - Activity Group ${activityGroup['id']}`;
    } else {
      return `${option['activity']} (${option['agency']}) - ID ${option['id']} - ${activityGroup['activity']} - Activity Group ${activityGroup['id']}`;
    }
  }

  return(
      <Row>
        <Col md={6} className={style.reportFormLeft}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="agency" className={'required'}>Agency</Label>
                <FormSelectField
                    field={'agency'}
                    placeholder={'Select agency...'}
                    optionsAPI={agency.selectMySubmissionAgency}
                    labelField={'acronym_primary'}
                    valueField={'id'}
                    validate={validateRequired}
                    disabled={isAgencyDisabled()}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="local_identifier">Local Report Identifier</Label>
                <FormTextField
                    field={'local_identifier'}
                    placeholder={'Enter local report ID'}
                    disabled={readOnly}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for="contributing_agencies">Contributing Agencies</Label>
                <FormSelectField
                    field={'contributing_agencies'}
                    optionsAPI={agency.selectAllAgencies}
                    placeholder={'Please select multiple, if necessary'}
                    labelField={'acronym_primary'}
                    valueField={'id'}
                    isMulti
                    disabled={readOnly}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for="summary">Summary</Label>
                <FormTextAreaFormatted
                    field={'summary'}
                    disabled={readOnly}
                    height={'100px'}
                />
              </FormGroup>
            </Col>
          </Row>
          { readOnly ? "" :
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="activities" className={'required'}>Activities</Label>
                    <FormDependentSelectField
                        field={''}
                        emptyAfterChange={true}
                        placeholder={'Select agency ESG activity...'}
                        optionsAPI={agency.selectActivityByAgencies}
                        optionsID={getAgencyValues()}
                        labelFunction={renderActivityLabel}
                        valueField={'id'}
                        disabled={readOnly}
                        onChange={onActivitySelected}
                    />
                  </FormGroup>
                </Col>
              </Row>
          }
          <Row>
            <Col md={12}>
              { readOnly ? <Label for="activities" className={'required'}>Activities</Label> : null}
              <FormAssignedList
                  field={'activities'}
                  labelShowRequired={true}
                  renderDisplayValue={renderActivityLabel}
                  validate={validateActivities}
                  disabled={readOnly}
              />
            </Col>
          </Row>
          { readOnly ? "" :
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="institution" className={'required'}>Institutions</Label>
                    <InstitutionSelect
                        onChange={onInstitutionSelected}
                    />
                  </FormGroup>
                </Col>
              </Row>
          }
          <Row>
            <Col md={12}>
              { readOnly ? <Label for="institution" className={'required'}>Institutions</Label> : null}
              <FormAssignedList
                  field={'institutions'}
                  validate={validateInstitutions}
                  labelShowRequired={true}
                  renderDisplayValue={(value) => (value['name_primary'])}
                  onClick={(idx) => console.log(idx)}
                  disabled={readOnly}
              />
            </Col>
          </Row>
          {renderProgrammeField()}
        </Col>
        <Col md={6}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="status" className={'required'}>Status</Label>
                <FormSelectField
                    field={'status'}
                    placeholder={'Select status...'}
                    optionsAPI={report.selectStatus}
                    labelField={'status'}
                    valueField={'id'}
                    includeID={'front'}
                    validate={validateStatus}
                    disabled={readOnly}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="decision" className={'required'}>Decision</Label>
                <FormSelectField
                    field={'decision'}
                    placeholder={'Select decision...'}
                    optionsAPI={report.selectDecisions}
                    labelField={'decision'}
                    valueField={'id'}
                    includeID={'front'}
                    validate={validateRequired}
                    disabled={readOnly}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="valid_from" className={'required'}>Valid from</Label>
                <FormDatePickerField
                    field={'valid_from'}
                    validate={(value) => validateDateFromRequired(
                        value,
                        formState.values.valid_to,
                        "Report valid from date should be earlier than valid to date!"
                    )}
                    placeholderText={'YYYY-MM-DD'}
                    disabled={readOnly}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="valid_to">Valid to</Label>
                <FormDatePickerField
                    field={'valid_to'}
                    validate={validateDate}
                    placeholderText={'YYYY-MM-DD'}
                    disabled={readOnly}
                    yearPlusValue={formState.values['valid_from']}
                    yearPlus={true}
                />
              </FormGroup>
            </Col>
          </Row>
          <PopupFormListManager
              label={'Files'}
              field={'report_files'}
              formApi={formApi}
              renderDisplayValue={renderFilesDisplayValue}
              labelShowRequired={true}
              validate={validateRequired}
              disabled={readOnly}
          >
            <FileSubform />
          </PopupFormListManager>
          <PopupFormListManager
              field={'report_links'}
              formApi={formApi}
              renderDisplayValue={renderLinksDisplayValue}
              labelShowRequired={false}
              disabled={readOnly}
          >
            <ReportLinkSubform />
          </PopupFormListManager>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for="link">Other comment (optional)</Label>
                <FormTextField
                    field={'other_comment'}
                    placeholder={'Enter comment, if necessary'}
                    disabled={readOnly}
                />
              </FormGroup>
            </Col>
          </Row>
        </Col>
      </Row>
  )
};

ReportForm.defaultProps = {
  userIsAdmin: false
};

ReportForm.propTypes = {
  api: PropTypes.object.isRequired,
  encoders: PropTypes.arrayOf(PropTypes.func),
  decoders: PropTypes.arrayOf(PropTypes.func),
  normalizers: PropTypes.object,
  module: PropTypes.string.isRequired,
  formType: PropTypes.oneOf(['create', 'view', 'edit']),
  recordID: PropTypes.string,
  backPath: PropTypes.string,
  buttonText: PropTypes.string,
  userIsAdmin: PropTypes.bool
};

export default withRouter(withFormManager(ReportForm))