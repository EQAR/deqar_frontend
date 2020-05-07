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
  validateDateFromRequired,
  validateRequired,
  validateRequiredDate,
  validateRequiredURL
} from "../../../../utils/validators";
import {withRouter} from "react-router-dom";
import withFormManager from "../../../../components/FormManager/FormManagerHOC";
import PopupFormListManager from "../../../../components/FormManager/PopupFormListManager";
import AgencyActivitySubform from "./components/AgenyActivitySubform";
import MembershipSubform from "./components/MembershipSubform";
import FormSelectField from "../../../../components/FormFields/FormSelectField/FormSelectField";
import country from "../../../../services/Country";
import FocusCountrySubform from "./components/FocusCountrySubform";
import FormManySingleField from "../../../../components/FormFieldsUncontrolled/FormManySingleField/FormManySingleField";
import NameSubform from "./components/NameSubform";


const AgencyForm = ({formType, formApi, formState, readOnly}) => {
  const renderDecisions = (value) => {
    const {decision_file_name, decision_type, decision_date} = value;
    return `${decision_type['type']}, ${decision_date} (${decision_file_name})`;
  };

  const renderActivities = (value) => {
    const {activity_type, activity, activity_local_identifier, activity_valid_to} = value;
    return `${activity}
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
    const {agency_name_versions} = value;
    const name_primary = agency_name_versions.filter(version => version['name_is_primary']);
    const acronym_primary = agency_name_versions.filter(version => version['acronym_is_primary']);
    if (name_primary.length > 0) {
      return `${name_primary[0]['name']} (${acronym_primary[0]['acronym']})`
    }
  };

  return(
    <Row>
      <Col md={6} className={style.reportFormLeft}>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="link">Primary Name / Acronym</Label>
              <FormTextField
                field={'primary_name_acronym'}
                placeholder={'Primary Name / Acronym'}
                disabled={true}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <PopupFormListManager
              label={'Current Names / Acronyms'}
              field={'current_names'}
              formApi={formApi}
              renderDisplayValue={renderNames}
              labelShowRequired={true}
              disabled={readOnly}
            >
              <NameSubform />
            </PopupFormListManager>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <PopupFormListManager
              label={'Former Names / Acronyms'}
              field={'former_names'}
              formApi={formApi}
              renderDisplayValue={renderNames}
              labelShowRequired={false}
              disabled={readOnly}
            >
              <NameSubform />
            </PopupFormListManager>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="link" className={'required'}>Agency Website</Label>
              <FormTextField
                field={'website_link'}
                placeholder={'Enter agency website'}
                validate={validateRequiredURL}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Label className={style.GroupLabel}>Contact</Label>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="link" className={'required'}>Contact Person</Label>
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
            <FormManySingleField
              label={'Contact Phone'}
              required={true}
              disabled={readOnly}
              scopeName={'phone_numbers'}
              formApi={formApi}
              data={formState.values['phone_numbers']}
              extra={1}
            >
              <FormTextField
                field={'phone'}
                placeholder={'Enter phone number'}
                disabled={readOnly}
              />
            </FormManySingleField>
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
            <FormManySingleField
              label={'Contact Email'}
              required={true}
              disabled={readOnly}
              scopeName={'emails'}
              formApi={formApi}
              data={formState.values['emails']}
              extra={1}
            >
              <FormTextField
                field={'email'}
                placeholder={'Enter contact email address for agency'}
                disabled={readOnly}
              />
            </FormManySingleField>
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
                disabled={readOnly}
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
              disabled={readOnly}
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
              <Label for="registration_start" className={'required'}>Valid from</Label>
              <FormDatePickerField
                field={'registration_start'}
                validate={(value) => validateDateFromRequired(value, formState.values.registration_valid_to)}
                placeholderText={'YYYY-MM-DD'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="registration_valid_to" className={'required'}>Valid to</Label>
              <FormDatePickerField
                field={'registration_valid_to'}
                validate={validateRequiredDate}
                placeholderText={'YYYY-MM-DD'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="is_registered">Registered</Label>
              <Checkbox
                field="is_registered"
                className={style.Checkbox}
                disabled={readOnly}
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
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            // Decision Popup
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="description_note" className={'required'}>Description Note</Label>
              <FormTextAreaFormatted
                field={'description_note'}
                disabled={readOnly}
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
              disabled={readOnly}
            >
              <AgencyActivitySubform />
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
              disabled={readOnly}
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
                disabled={readOnly}
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
