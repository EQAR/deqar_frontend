import React from 'react';
import ReportForm from "../FormFields/ReportForm/ReportForm";
import report from '../../../services/Report';
import {decodeProgrammeNameData, encodeProgrammeNameData} from "../FormFields/ReportForm/normalizers/programmeNameNormalizer";
import {createFormNormalizer} from "../FormFields/ReportForm/normalizers/createFormNormalizer";
import {updateFormNormalizer} from "../FormFields/ReportForm/normalizers/updateFormNormalizer";

const MyReportDetails = ({...props}) => {
  const {id, param} = props.match.params;

  return(
    <React.Fragment>
      <ReportForm
        api={{
          read: report.getReport,
          create: report.submitReport,
          update: report.updateReport,
          delete: report.deleteReport,
        }}
        encoders={[encodeProgrammeNameData]}
        decoders={[decodeProgrammeNameData]}
        normalizers={{
          create: createFormNormalizer,
          update: updateFormNormalizer
        }}
        fileFields={['report_files']}
        module={'report'}
        formTitle={param === 'view' ?
          `My Reports » View & Edit : DEQAR ID ${id}` :
          `My Reports » Edit : DEQAR ID ${id}`}
        formType={param}
        recordID={id}
        backPath={'/my-reports/'}
      />
    </React.Fragment>
  )
};

export default MyReportDetails;
