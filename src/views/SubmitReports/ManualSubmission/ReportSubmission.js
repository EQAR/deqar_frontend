import React from 'react';
import ReportForm from "../../Forms/FormFields/ReportForm/ReportForm";
import report from "../../../services/Report";
import {decodeProgrammeNameData, encodeProgrammeNameData} from "../../Forms/FormFields/ReportForm/normalizers/programmeNameNormalizer";
import {updateFormNormalizer} from "../../Forms/FormFields/ReportForm/normalizers/updateFormNormalizer";

const ReportSubmission = ({...props}) => {
  const {userIsAdmin} = props;

  return(
    <React.Fragment>
      <ReportForm
        api={{
          create: report.createReport,
        }}
        encoders={[encodeProgrammeNameData]}
        decoders={[decodeProgrammeNameData]}
        normalizers={{
          create: updateFormNormalizer,
        }}
        fileFields={['report_files']}
        module={'report'}
        formTitle={'Submit Reports » Manual Submission'}
        formType={'create'}
        userIsAdmin={userIsAdmin}
        backPath={'/reference/reports/'}
      />
    </React.Fragment>
  )
};

export default ReportSubmission;
