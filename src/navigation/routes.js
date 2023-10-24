import React from "react";

const MyProfile = React.lazy(() => import('../views/MyData/MyProfile/MyProfile'));
const CSVUpload = React.lazy(() => import('../views/SubmitReports/CSVUpload/CSVUpload'));
const Institutions = React.lazy(() => import('../views/ReferenceData/Institutions/Institutions'));
const InstitutionDetails = React.lazy(() => import('../views/Forms/FormOpeners/InstitutionDetails'));
const MyReports = React.lazy(() => import('../views/MyData/MyReports/MyReports'));
const Reports = React.lazy(() => import('../views/ReferenceData/Reports/Reports'));
const ReportDetails = React.lazy(() => import('../views/Forms/FormOpeners/ReportDetails'));
const ReportSubmission = React.lazy(() => import('../views/SubmitReports/ManualSubmission/ReportSubmission'));
const MyReportDetails = React.lazy(() => import('../views/Forms/FormOpeners/MyReportDetails'));
const MyAgencies = React.lazy(() => import('../views/MyData/MyAgencies/MyAgencies'));
const MyAgencyDetails = React.lazy(() => import('../views/Forms/FormOpeners/MyAgencyDetails'));
const Agencies = React.lazy(() => import('../views/ReferenceData/Agencies/Agencies'));
const AgencyActivities = React.lazy(() => import('../views/ReferenceData/AgencyActivities/AgencyActivities'));
const AgencyDetails = React.lazy(() => import('../views/Forms/FormOpeners/AgencyDetails'));
const Countries = React.lazy(() => import('../views/ReferenceData/Countries/Countries'));
const CountryDetails = React.lazy(() => import('../views/Forms/FormOpeners/CountryDetails'));
const ReportFlags = React.lazy(() => import('../views/Flags/ReportFlags/ReportFlags'))
const Page401 = React.lazy(() => import('../components/DefaultLayout/Page401'));

const routes = [
  { path: '/my-agencies', exact: true, name: 'My Agencies', component: MyAgencies, users: 'agency'},
  { path: '/my-agencies/:param/:id', exact: true, name: 'My Agency Form', component: MyAgencyDetails, users: 'agency'},
  { path: '/my-profile', exact: true, name: 'My Profile', component: MyProfile, users: 'all' },
  { path: '/my-reports', exact: true, name: 'My Reports', component: MyReports, users: 'agency'},
  { path: '/my-reports/:param/:id', exact: true, name: 'Report Form', component: MyReportDetails, users: 'agency'},
  { path: '/submit-csv', exact: true, name: 'CSV Upload', component: CSVUpload, users: 'all'},
  { path: '/submit-report', exact: true, name: 'Report Submission', component: ReportSubmission, users: 'all'},
  { path: '/reference/agencies', exact: true, name: 'Agencies Referece Datas', component: Agencies, users: 'all'},
  { path: '/reference/agencies/:param/:id', exact: true, name: 'Agency Form', component: AgencyDetails, users: 'all'},
  { path: '/reference/activities', exact: true, name: 'Activities', component: AgencyActivities, users: 'all'},
  { path: '/reference/institutions', exact: true, name: 'Institutions Reference Datas', component: Institutions, users: 'all'},
  { path: '/reference/institutions/:param', exact: true, name: 'Institution Form', component: InstitutionDetails, users: 'all'},
  { path: '/reference/institutions/:param/:id', exact: true, name: 'Institution Form', component: InstitutionDetails, users: 'all'},
  { path: '/reference/reports', exact: true, name: 'Reports', component: Reports, users: 'all'},
  { path: '/reference/reports/:param/:id', exact: true, name: 'Report Form', component: ReportDetails, users: 'all'},
  { path: '/reference/countries', exact: true, name: 'Countries', component: Countries, users: 'all'},
  { path: '/reference/countries/:param', exact: true, name: 'Country Form', component: CountryDetails, users: 'all'},
  { path: '/reference/countries/:param/:id', exact: true, name: 'Country Form', component: CountryDetails, users: 'all'},
  { path: '/flags/reports', exact: true, name: 'Report Flags', component: ReportFlags, users: 'all'},
  { path: '/401', exact: true, name: 'Page 401', component: Page401, users: 'all'}
];

export default routes;
