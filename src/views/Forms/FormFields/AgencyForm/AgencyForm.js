import React from 'react';
import {Checkbox} from 'informed';
import {
  Col,
  FormGroup,
  Label,
  Row
} from "reactstrap";
import style from './AgencyForm.module.css';
import PropTypes from "prop-types";
import FormTextField from "../../../../components/FormFields/FormTextField/FormTextField";
import FormDatePickerField from "../../../../components/FormFields/FormDatePickerField/FormDatePickerField";
import FormTextAreaFormatted from "../../../../components/FormFields/FormTextArea/FormTextAreaFormatted";
import {
  validateDateFrom,
  validateDateFromRequired, validateEmailRequired,
  validateRequired,
  validateRequiredDate,
  validateRequiredURL, validateURL
} from "../../../../utils/validators";
import {withRouter} from "react-router-dom";
import withFormManager from "../../../../components/FormManager/FormManagerHOC";
import PopupFormListManager from "../../../../components/FormManager/PopupFormListManager";
import AgencyActivitySubform from "./components/AgenyActivitySubform";
import MembershipSubform from "./components/MembershipSubform";
import FormSelectField from "../../../../components/FormFields/FormSelectField/FormSelectField";
import country from "../../../../services/Country";
import FocusCountrySubform from "./components/FocusCountrySubform";
import NameSubform from "./components/NameSubform";
import FormManyTextField from "../../../../components/FormFields/FormManyTextField/FormManyTextField";
import DecisionSubform from "./components/DecisionSubform";
import FormTextTransliterated from "../../../../components/FormFields/FormTextTransliterated/FormTextTransliterated";
import FormManyMultipleField from "../../../../components/FormFieldsUncontrolled/FormManyMultipleField/FormManyMultipleField";


const AgencyForm = ({formType, formApi, formState, readOnly, module, ...props}) => {
  const renderDecisions = (value) => {
    const {decision_file_name, decision_type, decision_date} = value;
    return `${decision_type['type']}, ${decision_date} (${decision_file_name})`;
  };

  const renderActivities = (value) => {
    const {id, activity_type, activity, activity_local_identifier, activity_valid_to} = value;
    return `${activity} - ID ${id} 
       (${activity_type['type']}${activity_local_identifier ? `; ${activity_local_identifier})` : ')'}
       ${activity_valid_to ? activity_valid_to : ''}`;
  };

  const renderFocusCountries = (value) => {
    const {country, country_is_official, country_valid_to} = value;
    return `${country['name_english']}
       ${country_is_official ? `(official)` : ''}
       ${country_valid_to ? `, ${country_valid_to}` : ''}`;
  };

  const renderMemberships = (value) => {
    const {association, membership_valid_from, membership_valid_to} = value;
    return `${association['association']}, ${membership_valid_from} - ${membership_valid_to ? membership_valid_to : ''}`;
  };

  const renderNames = (value) => {
    const {former_primary_name} = value;
    if (former_primary_name.length > 0) {
      const name = former_primary_name[0]['name'];
      const acronym = former_primary_name[0]['acronym'];
      return acronym ? `${name} (${acronym})` : name;
    }
  };

  return(
    <Row>
      <Col md={6} className={style.reportFormLeft}>
        <Row>
          <Col md={7}>
            { module === 'myAgency' ?
              <FormGroup>
                <Label>Agency Name, Primary</Label>
                <FormTextField
                  field={'current_primary_name[0].name'}
                  disabled={module === 'myAgency' ? true : readOnly}
                />
              </FormGroup> :
              <FormTextTransliterated
                label={'Agency Name, Primary'}
                formType={formType}
                formApi={formApi}
                values={formState.values.hasOwnProperty('current_primary_name') ? formState.values['current_primary_name'][0] : undefined}
                scopeName={'current_primary_name[0]'}
                counter={1}
                field={'name'}
                transliterationField={'name_transliterated'}
                readOnly={module === 'myAgency' ? true : readOnly}
              />
            }
          </Col>
          <Col md={5}>
            { module === 'myAgency' ?
              <FormGroup>
                <Label className={'required'}>Agency Acronym, Primary</Label>
                <FormTextField
                  field={'current_primary_name[0].acronym'}
                  disabled={module === 'myAgency' ? true : readOnly}
                />
              </FormGroup> :
              <FormTextTransliterated
                label={'Agency Acronym, Primary'}
                formType={formType}
                formApi={formApi}
                values={formState.values.hasOwnProperty('current_primary_name') ? formState.values['current_primary_name'][0] : undefined}
                scopeName={'current_primary_name[0]'}
                counter={1}
                field={'acronym'}
                transliterationField={'acronym_transliterated'}
                readOnly={module === 'myAgency' ? true : readOnly}
              />
            }
          </Col>
        </Row>
        <Row>
          <FormManyMultipleField
            label={'Agency Alternative Names / Acronyms'}
            deleteInRow={true}
            scopeName={'current_alternative_names'}
            formApi={formApi}
            data={formState.values['current_alternative_names']}
            disabled={module === 'myAgency' ? true : readOnly}
            extra={0}
            addButtonText={'Add Alternative Name / Acronym'}
            render={({counter, scope, data}) => (
              <React.Fragment>
                <Col md={7}>
                  <FormTextTransliterated
                    repeat={true}
                    labelDisabled={true}
                    scopeName={scope}
                    counter={counter}
                    values={data}
                    formType={formType}
                    formApi={formApi}
                    field={'name'}
                    transliterationField={'name_transliterated'}
                    readOnly={module === 'myAgency' ? true : readOnly}
                  />
                </Col>
                <Col md={4}>
                  <FormTextTransliterated
                    repeat={true}
                    labelDisabled={true}
                    scopeName={scope}
                    counter={counter}
                    values={data}
                    formType={formType}
                    formApi={formApi}
                    field={'acronym'}
                    transliterationField={'acronym_transliterated'}
                    readOnly={module === 'myAgency' ? true : readOnly}
                  />
                </Col>
              </React.Fragment>
            )}
          />
          </Row>
          <Row>
          <Col md={12}>
            <PopupFormListManager
              label={'Former Names / Acronyms'}
              field={'names_former'}
              btnLabel={'Add previous name set'}
              formApi={formApi}
              renderDisplayValue={renderNames}
              labelShowRequired={false}
              disabled={module === 'myAgency' ? true : readOnly}
            >
              <NameSubform
                formType={formType}
                submitDisabled={formType === 'view'}
                size={'lg'}
              />
            </PopupFormListManager>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label className={'required'}>Agency Website</Label>
              <FormTextField
                field={'website_link'}
                placeholder={'Enter agency website'}
                validate={validateRequiredURL}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label>Reports by the agency</Label>
              <FormTextField
                field={'reports_link'}
                placeholder={'Link to reports on website website'}
                validate={validateURL}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Label className={style.GroupLabel}>Contact</Label>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label className={'required'}>Contact Person</Label>
              <FormTextField
                validate={validateRequired}
                field={'contact_person'}
                placeholder={'Enter agency contact person name'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormManyTextField
                label={'Contact Phone'}
                data={formState.values['phone_numbers']}
                scopeName={'phone_numbers'}
                field={'phone'}
                required={true}
                disabled={readOnly}
                formApi={formApi}
                placeholder={'Enter phone number'}
                validate={validateRequired}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="link">Contact Fax</Label>
              <FormTextField
                field={'fax'}
                placeholder={'# with country code'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <FormManyTextField
                label={'Contact Email'}
                data={formState.values['emails']}
                scopeName={'emails'}
                field={'email'}
                required={true}
                disabled={readOnly}
                formApi={formApi}
                placeholder={'Enter contact email address for agency'}
                validate={validateEmailRequired}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="address" className={'required'}>Address</Label>
              <FormTextAreaFormatted
                field={'address'}
                disabled={readOnly}
                validate={validateRequired}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="country" className={'required'}>Country</Label>
              <FormSelectField
                field={'country'}
                optionsAPI={country.select}
                placeholder={'Please select'}
                labelField={'name_english'}
                valueField={'id'}
                disabled={module === 'myAgency' ? true : readOnly}
                validate={validateRequired}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <PopupFormListManager
              field={'memberships'}
              formApi={formApi}
              renderDisplayValue={renderMemberships}
              labelShowRequired={false}
              disabled={module === 'myAgency' ? true : readOnly}
            >
              <MembershipSubform />
            </PopupFormListManager>
          </Col>
        </Row>
      </Col>
      <Col md={6}>
        <Label className={style.GroupLabel}>Register</Label>
        <Row>
          <Col md={4}>
            <FormGroup>
              <Label for="registration_start">Valid from</Label>
              <FormDatePickerField
                field={'registration_start'}
                validate={(value) => validateDateFrom(
                  value,
                  formState.values.registration_valid_to,
                  'Registration start date should be earlier than registration end date')}
                placeholderText={'YYYY-MM-DD'}
                disabled={module === 'myAgency' ? true : readOnly}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="registration_valid_to">Valid to</Label>
              <FormDatePickerField
                field={'registration_valid_to'}
                placeholderText={'YYYY-MM-DD'}
                disabled={module === 'myAgency' ? true : readOnly}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="is_registered">Registered</Label>
              <Checkbox
                field="is_registered"
                className={style.Checkbox}
                disabled={module === 'myAgency' ? true : readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="registration_note">Registration Note</Label>
              <FormTextAreaFormatted
                field={'registration_note'}
                disabled={module === 'myAgency' ? true : readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <PopupFormListManager
              label={'EQAR Decisions'}
              field={'decisions'}
              formApi={formApi}
              renderDisplayValue={renderDecisions}
              labelShowRequired={true}
              disabled={module === 'myAgency' ? true : readOnly}
            >
              <DecisionSubform />
            </PopupFormListManager>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="description_note" className={'required'}>Description Note</Label>
              <FormTextAreaFormatted
                field={'description_note'}
                disabled={module === 'myAgency' ? true : readOnly}
                validate={validateRequired}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <PopupFormListManager
              field={'activities'}
              formApi={formApi}
              renderDisplayValue={renderActivities}
              labelShowRequired={true}
              disabled={module === 'myAgency' ? true : readOnly}
            >
              <AgencyActivitySubform
                submitDisabled={formType === 'view'}
              />
            </PopupFormListManager>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <PopupFormListManager
              field={'focus_countries'}
              formApi={formApi}
              renderDisplayValue={renderFocusCountries}
              labelShowRequired={true}
              disabled={module === 'myAgency' ? true : readOnly}
              columns={2}
            >
              <FocusCountrySubform />
            </PopupFormListManager>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="specialisation_note">Specialisation Note</Label>
              <FormTextAreaFormatted
                field={'specialisation_note'}
                disabled={module === 'myAgency' ? true : readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
      </Col>
    </Row>
  )
};

AgencyForm.defaultProps = {
  userIsAdmin: false
};

AgencyForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  formType: PropTypes.oneOf(['create', 'view', 'edit']),
  agencyID: PropTypes.string,
  backPath: PropTypes.string,
  userIsAdmin: PropTypes.bool,
};

export default withRouter(withFormManager(AgencyForm))
