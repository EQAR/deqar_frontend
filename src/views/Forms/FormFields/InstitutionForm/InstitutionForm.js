import React from 'react';
import {
  Col,
  FormGroup,
  Label,
  Row
} from "reactstrap";
import style from './InstitutionForm.module.css';
import PropTypes from "prop-types";
import FormTextField from "../../../../components/FormFields/FormTextField/FormTextField";
import {withRouter} from "react-router-dom";
import withFormManager from "../../../../components/FormManager/FormManagerHOC";
import FormDatePickerField from "../../../../components/FormFields/FormDatePickerField/FormDatePickerField";
import FormSelectField from "../../../../components/FormFields/FormSelectField/FormSelectField";
import list from "../../../../services/List";
import {
  validateDateFrom,
  validateRequired,
  validateRequiredURL,
} from "../../../../utils/validators";
import FormManyMultipleField
  from "../../../../components/FormFieldsUncontrolled/FormManyMultipleField/FormManyMultipleField";
import country from "../../../../services/Country";
import FormManyTextField from "../../../../components/FormFields/FormManyTextField/FormManyTextField";
import PopupFormListManager from "../../../../components/FormManager/PopupFormListManager";
import FormerNameSubform from "./components/FormerNameSubform";
import LocalIDSubform from "./components/LocalIDSubform";
import OtherIDSubform from "./components/OtherIDSubform";
import HierarchicalLinkSubform from "./components/HierarchicalLinkSubform";
import HistoricalLinkSubform from "./components/HistoricalLinkSubform";
import FormTextTransliterated from "../../../../components/FormFields/FormTextTransliterated/FormTextTransliterated";
import FormCheckbox from "../../../../components/FormFields/FormCheckbox/FormCheckbox";
import institution from "../../../../services/Institution";
import agency from "../../../../services/Agency";
import FormAutoSuggestField from "../../../../components/FormFields/FormAutoSuggestField/FormAutoSuggestField";

const InstitutionForm = ({formType, formApi, formState, readOnly, module, ...props}) => {
  const renderFormerNames = (value) => {
    return value['name_official'];
  };

  const renderHistoricalLinks = (value) => {
    const { institution, relationship_type } = value;
    let institutionName;

    if (institution) {
      institutionName = institution[0].name_primary;
    }

    return `${relationship_type.relationship}: ${institutionName}`
  };

  const renderHierarchicalLinks = (value) => {
    const { institution, relationship } = value;
    let institutionName;

    if (institution) {
      institutionName = institution[0].name_primary;
    }

    return `${relationship.relationship}: ${institutionName}`
  };

  return(
    <Row>
      <Col md={6} className={style.FormLeft}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for={'deqar_id'}>DEQAR ID</Label>
              <FormTextField
                field={'deqar_id'}
                disabled={true}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for={'eter_id'}>ETER ID</Label>
              <FormTextField
                field={'eter_id'}
                disabled={true}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="is_other_provider">Other Provider</Label>
              <FormCheckbox
                field={'is_other_provider'}
                disabled={formType !== 'create'}
                className={'form-control'}
                style={{display: 'block', marginTop: 0, marginLeft: '10px'}}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="organization_type">Organization Type</Label>
              <FormSelectField
                field={'organization_type'}
                placeholder={'Select organization type...'}
                optionsAPI={institution.getOrganizationTypes}
                labelField={'type'}
                valueField={'id'}
                includeID={'front'}
                disabled={readOnly || !formState.values['is_other_provider']}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormTextTransliterated
          label={'Institution Name, Official'}
          formType={formType}
          formApi={formApi}
          values={formState.values['names_actual'] ? formState.values['names_actual'][0] : undefined}
          scopeName={'names_actual[0]'}
          field={'name_official'}
          transliterationField={'name_official_transliterated'}
          readOnly={readOnly}
          required={true}
        />
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for={'names_actual[0].name_english'}>Institution Name, English</Label>
              <FormTextField
                field={'names_actual[0].name_english'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <FormManyTextField
                label={'Alternative Institution Name'}
                data={formState.values['names_actual'] ? formState.values['names_actual'][0]['alternative_names'] : undefined}
                scopeName={'names_actual[0].alternative_names'}
                field={'name'}
                addButtonText={'Add Alternative Name'}
                required={false}
                disabled={readOnly}
                formApi={formApi}
                placeholder={'Enter alternative institution name'}
                extra={0}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for={'names_actual[0].acronym'}>Institution Acronym</Label>
              <FormTextField
                field={'names_actual[0].acronym'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for={'website_link'} className={'required'}>Institution Website</Label>
              <FormTextField
                field={'website_link'}
                disabled={readOnly}
                validate={validateRequiredURL}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <PopupFormListManager
              field={'names_former'}
              label={'Former Names'}
              formApi={formApi}
              renderDisplayValue={renderFormerNames}
              labelShowRequired={false}
              btnLabel={'Add previous name set'}
              disabled={readOnly}
            >
              <FormerNameSubform />
            </PopupFormListManager>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <PopupFormListManager
              field={'identifiers_local'}
              label={'Local ID'}
              formApi={formApi}
              renderDisplayValue={value => (`${value.identifier} (${value.agency['acronym_primary']})`)}
              labelShowRequired={false}
              disabled={readOnly}
            >
              <LocalIDSubform />
            </PopupFormListManager>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <PopupFormListManager
              field={'identifiers_national'}
              label={'Other ID'}
              formApi={formApi}
              renderDisplayValue={value => (`${value.identifier} (${value.resource ? value.resource['resource'] : ''})`)}
              labelShowRequired={true}
              disabled={readOnly}
              validate={validateRequired}
            >
              <OtherIDSubform />
            </PopupFormListManager>
          </Col>
        </Row>
      </Col>
      <Col md={6}>
        <Row>
          <Col md={12}>
            <Label for="country" className={'required'}>Location</Label>
          </Col>
          <FormManyMultipleField
            addButtonText={'Add New Location'}
            disabled={readOnly}
            scopeName={'countries'}
            formApi={formApi}
            data={formState.values['countries']}
            render={({counter}) => (
              <React.Fragment>
                <Col md={5}>
                  <FormGroup>
                    <FormSelectField
                      field={'country'}
                      optionsAPI={country.select}
                      placeholder={'Please select country'}
                      labelField={'name_english'}
                      valueField={'id'}
                      disabled={readOnly}
                      validate={validateRequired}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <FormTextField
                      field={'city'}
                      placeholder={'Please enter city name'}
                      disabled={readOnly}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <FormCheckbox
                      field={'country_verified'}
                      disabled={readOnly}
                      className={'form-control'}
                      style={{marginTop: 10, marginRight: '10px'}}
                    />
                    <Label for="country_is_official">Official</Label>
                  </FormGroup>
                </Col>
              </React.Fragment>
            )}
          />
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="founding_date" >Founding Date</Label>
              <FormDatePickerField
                field={'founding_date'}
                placeholderText={'YYYY-MM-DD'}
                disabled={readOnly}
                validate={(value) => validateDateFrom(
                  value,
                  formState.values.closure_date,
                  "Founding date should be eariler than closing date!"
                )}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="closure_date" >Closing Date</Label>
              <FormDatePickerField
                field={'closure_date'}
                placeholderText={'YYYY-MM-DD'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="qf_ehea_levels" className={formState.values['is_other_provider'] ? 'required' : ''}>QF-EHEA Levels</Label>
              <FormSelectField
                field={'qf_ehea_levels'}
                optionsAPI={list.selectQFEHEALevels}
                placeholder={'Please select'}
                labelField={'level'}
                valueField={'id'}
                isMulti
                validate={formState.values['is_other_provider'] && validateRequired}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for={'other_comment'} >Other comment (optional)</Label>
              <FormTextField
                field={'other_comment'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <PopupFormListManager
              field={'historical_links'}
              label={'Historical Links'}
              formApi={formApi}
              renderDisplayValue={renderHistoricalLinks}
              labelShowRequired={false}
              disabled={readOnly}
            >
              <HistoricalLinkSubform />
            </PopupFormListManager>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <PopupFormListManager
              field={'hierarchical_links'}
              label={'Hierarchical Links'}
              formApi={formApi}
              renderDisplayValue={renderHierarchicalLinks}
              labelShowRequired={false}
              disabled={readOnly}
            >
              <HierarchicalLinkSubform />
            </PopupFormListManager>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for={'source_of_information'} className={'required'}>Source of information about the provider</Label>
              <FormAutoSuggestField
                field={'source_of_information'}
                optionsAPI={agency.selectAllAgencies}
                valueKey={'acronym_primary'}
                disabled={readOnly}
                validate={validateRequired}
              />
            </FormGroup>
          </Col>
        </Row>
      </Col>
    </Row>
  )
};

InstitutionForm.defaultProps = {
  userIsAdmin: false
};

InstitutionForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  formType: PropTypes.oneOf(['create', 'view', 'edit']),
  agencyID: PropTypes.string,
  backPath: PropTypes.string,
  userIsAdmin: PropTypes.bool,
};

export default withRouter(withFormManager(InstitutionForm))
