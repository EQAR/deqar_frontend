import React from 'react';
import {connect} from "react-redux";
import institution from "../../../services/Institution";
import {updateFormNormalizer} from "../FormFields/InstitutionForm/normalizers/updateFormNormalizer";
import InstitutionForm from "../FormFields/InstitutionForm/InstitutionForm";
import {
  encodeHierarchicalLink, encodeHistoricalLink,
  encodeIdentifiers,
  encodeNames
} from "../FormFields/InstitutionForm/normalizers/formEncoders";
import {
  decodeHierarhicalLinks,
  decodeHistoricalLinks,
} from "../FormFields/InstitutionForm/normalizers/formDecoders";

const InstitutionDetails = ({userIsAdmin, ...props}) => {
  const {id, param} = props.match.params;

  const renderFormTitle = () => {
    switch (param) {
      case 'view':
        return `Reference Data » Education providers » View : Education provider ID ${id}`;
      case 'edit':
        return `Reference Data » Education providers » Edit : Education provider ID ${id}`;
      case 'create':
        return `Reference Data » Education providers » Create`;
      default:
        break;
    }
  };

  return(
    <React.Fragment>
      <InstitutionForm
        api={{
          read: institution.getInstitution,
          update: institution.updateInstitution,
          create: institution.submitInstitution
        }}
        decoders={[decodeHistoricalLinks, decodeHierarhicalLinks]}
        encoders = {[encodeNames, encodeIdentifiers, encodeHierarchicalLink, encodeHistoricalLink]}
        normalizers={{
          create: updateFormNormalizer,
          update: updateFormNormalizer
        }}
        module={'institution'}
        formTitle={renderFormTitle()}
        formType={param}
        recordID={id}
        backPath={'/reference/institutions/'}
        userIsAdmin={userIsAdmin}
      />
    </React.Fragment>
  )
};

const mapStateToProps = (store) => {
  return {
    userIsAdmin: store.user.is_admin
  }
};

export default connect(mapStateToProps)(InstitutionDetails);
