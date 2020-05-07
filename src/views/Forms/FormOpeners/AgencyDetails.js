import React from 'react';
import {connect} from "react-redux";
import AgencyForm from "../FormFields/AgencyForm/AgencyForm";
import agency from "../../../services/Agency";
import {updateFormNormalizer} from "../FormFields/AgencyForm/normalizers/updateFormNormalizer";
import {decodeNameData, encodeNameData} from "../FormFields/AgencyForm/normalizers/populateFormNormalizer";

const AgencyDetails = ({userIsAdmin, ...props}) => {
  const {id, param} = props.match.params;

  return(
    <React.Fragment>
      <AgencyForm
        api={{
          read: agency.getAgency,
          update: agency.updateAgency,
        }}
        encoders={[encodeNameData]}
        decoders={[decodeNameData]}
        normalizers={{
          create: updateFormNormalizer,
          update: updateFormNormalizer
        }}
        module={'agency'}
        formTitle={param === 'view' ?
          `Reference Data » Agencies » View : Agency ID ${id}` :
          `Reference Data » Agencies » Edit : Agency ID ${id}`}
        formType={param}
        recordID={id}
        backPath={'/reference/agencies/'}
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

export default connect(mapStateToProps)(AgencyDetails);
