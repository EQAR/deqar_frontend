import React from 'react';
import {
  Col,
  FormGroup,
  Label,
  Row
} from "reactstrap";
import style from './CountryForm.module.css';
import PropTypes from "prop-types";
import FormTextField from "../../../../components/FormFields/FormTextField/FormTextField";
import {withRouter} from "react-router-dom";
import withFormManager from "../../../../components/FormManager/FormManagerHOC";
import FormCheckbox from "../../../../components/FormFields/FormCheckbox/FormCheckbox";
import FormDatePickerField from "../../../../components/FormFields/FormDatePickerField/FormDatePickerField";
import FormTextAreaFormatted from "../../../../components/FormFields/FormTextArea/FormTextAreaFormatted";
import FormSelectField from "../../../../components/FormFields/FormSelectField/FormSelectField";
import country from "../../../../services/Country";
import PopupFormListManager from "../../../../components/FormManager/PopupFormListManager";
import QARequirmentsSubform from "./components/QARequirementsSubform";
import QAARegulationsSubform from "./components/QAARegulationsSubform";
import {validateRequired} from "../../../../utils/validators";

const CountryForm = ({formType, formApi, formState, readOnly, module, ...props}) => {
  const renderQARequirements = (value) => {
    const {qa_requirement, requirement_valid_from, requirement_valid_to} = value;
    return `${qa_requirement}${requirement_valid_from ? `; ${requirement_valid_from}` : ''}${requirement_valid_to ? ` - ${requirement_valid_to}` : ''}`
  };

  const renderQAARegulations = (value) => {
    const {regulation, regulation_valid_from, regulation_valid_to} = value;
    return `${regulation}${regulation_valid_from ? `; ${regulation_valid_from}` : ''}${regulation_valid_to ? ` - ${regulation_valid_to}` : ''}`
  };

  return(
    <Row>
      <Col md={6} className={style.reportFormLeft}>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="parent">Parent Country</Label>
              <FormSelectField
                field={'parent'}
                optionsAPI={country.select}
                placeholder={'Please select parent country'}
                labelField={'name_english'}
                valueField={'id'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <FormGroup>
              <Label for="name_english">English Country Name</Label>
              <FormTextField
                field={'name_english'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="iso_3166_alpha2">Alpha-2 Code</Label>
              <FormTextField
                field={'iso_3166_alpha2'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="iso_3166_alpha3">Alpha-3 Code</Label>
              <FormTextField
                field={'iso_3166_alpha3'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="id">Country ID</Label>
              <FormTextField
                field={'id'}
                disabled={true}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="orgreg_subcountry_label">OrgReg SubCountry Label</Label>
              <FormTextField
                field={'orgreg_subcountry_label'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="orgreg_eu_2_letter_code">OrgReg EU 2-letter Code</Label>
              <FormTextField
                field={'orgreg_eu_2_letter_code'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <FormGroup>
              <Label for="ehea_is_member">EHEA Member</Label>
              <FormCheckbox
                field={'ehea_is_member'}
                disabled={readOnly}
                className={'form-control'}
                style={{display: 'block', marginTop: 0, marginLeft: '10px'}}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="has_full_institution_list">Institution List</Label>
              <FormCheckbox
                field={'has_full_institution_list'}
                disabled={readOnly}
                className={'form-control'}
                style={{display: 'block', marginTop: 0, marginLeft: '10px'}}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="eqar_governmental_member_start">EQAR Member Since</Label>
              <FormDatePickerField
                field={'eqar_governmental_member_start'}
                placeholderText={'YYYY-MM-DD'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="ehea_key_commitment">EHEA Key Commitment</Label>
              <FormSelectField
                field={'ehea_key_commitment'}
                optionsAPI={country.getPermissionTypes}
                placeholder={'Please select'}
                labelField={'type'}
                valueField={'id'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="general_note">General Information on Higher Education</Label>
              <FormTextAreaFormatted
                field={'general_note'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <PopupFormListManager
              field={'qa_requirements'}
              label={'National EQA Requirements'}
              formApi={formApi}
              renderDisplayValue={renderQARequirements}
              labelShowRequired={false}
              disabled={readOnly}
            >
              <QARequirmentsSubform />
            </PopupFormListManager>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="qa_requirement_note">National EQA Requirement Note</Label>
              <FormTextAreaFormatted
                field={'qa_requirement_note'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <PopupFormListManager
              field={'qaa_regulations'}
              label={'Further Information and Resources'}
              formApi={formApi}
              renderDisplayValue={renderQAARegulations}
              labelShowRequired={false}
              disabled={readOnly}
            >
              <QAARegulationsSubform />
            </PopupFormListManager>
          </Col>
        </Row>
      </Col>
      <Col md={6}>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="eu_controlled_vocab_country">EU Controlled Vocabulary - Country</Label>
              <FormTextField
                field={'eu_controlled_vocab_country'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="eu_controlled_vocab_atu">EU Controlled Vocabulary - ATU</Label>
              <FormTextField
                field={'eu_controlled_vocab_atu'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="generic_url">Generic URL</Label>
              <FormTextField
                field={'generic_url'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="external_QAA_is_permitted">Cross Border QA Permitted</Label>
              <FormSelectField
                field={'external_QAA_is_permitted'}
                optionsAPI={country.getPermissionTypes}
                placeholder={'Please select'}
                labelField={'type'}
                valueField={'id'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="external_QAA_note">Cross Border QA Note</Label>
              <FormTextAreaFormatted
                field={'external_QAA_note'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="eligibility">Cross Border QA - Eligibility Requirements for Foreign Agencies</Label>
              <FormTextAreaFormatted
                field={'eligibility'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="conditions">Cross Border QA - Conditions for Foreign Agencies</Label>
              <FormTextAreaFormatted
                field={'conditions'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="recognition">Cross Border QA - Recognition of External Reviews</Label>
              <FormTextAreaFormatted
                field={'recognition'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="european_approach_is_permitted">European Approach Permitted</Label>
              <FormSelectField
                field={'european_approach_is_permitted'}
                optionsAPI={country.getPermissionTypes}
                placeholder={'Please select'}
                labelField={'type'}
                valueField={'id'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="european_approach_note">European Approach Note</Label>
              <FormTextAreaFormatted
                field={'european_approach_note'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
      </Col>
    </Row>
  )
};

CountryForm.defaultProps = {
  userIsAdmin: false
};

CountryForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  formType: PropTypes.oneOf(['create', 'view', 'edit']),
  agencyID: PropTypes.string,
  backPath: PropTypes.string,
  userIsAdmin: PropTypes.bool,
};

export default withRouter(withFormManager(CountryForm))
