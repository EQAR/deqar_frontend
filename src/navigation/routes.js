import React from "react";

const MyProfile = React.lazy(() => import('../views/MyProfile/MyProfile'));
const CSVUpload = React.lazy(() => import('../views/CSVUpload/CSVUpload'));
const Institutions = React.lazy(() => import('../views/Institutions/Institutions'));
const InstitutionDetails = React.lazy(() => import('../views/InstitutionDetails/InstitutionDetails'));
const MyReports = React.lazy(() => import('../views/MyReports/MyReports'));
const Reports = React.lazy(() => import('../views/Reports/Reports'));
const ReportDetails = React.lazy(() => import('../views/ReportDetails/ReportDetails'));
const ReportSubmission = React.lazy(() => import('../views/ReportDetails/ReportSubmission'));
const MyReportDetails = React.lazy(() => import('../views/ReportDetails/MyReportDetails'));
const MyAgencies = React.lazy(() => import('../views/MyAgencies/MyAgencies'));
const MyAgencyDetails = React.lazy(() => import('../views/AgencyDetails/MyAgencyDetails'));
const Agencies = React.lazy(() => import('../views/Agencies/Agencies'));
const AgencyActivities = React.lazy(() => import('../views/AgencyActivities/AgencyActivities'));
const AgencyDetails = React.lazy(() => import('../views/AgencyDetails/AgencyDetails'));
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
  { path: '/reference/institutions', exact: true, name: 'Institutions Referece Datas', component: Institutions, users: 'all'},
  { path: '/reference/institutions/:param', exact: true, name: 'Institution Form', component: InstitutionDetails, users: 'all'},
  { path: '/reference/institutions/:param/:id', exact: true, name: 'Institution Form', component: InstitutionDetails, users: 'all'},
  { path: '/reference/reports', exact: true, name: 'Reports', component: Reports, users: 'all'},
  { path: '/reference/reports/:param/:id', exact: true, name: 'Report Form', component: ReportDetails, users: 'all'},
  { path: '/401', exact: true, name: 'Page 401', component: Page401, users: 'all'}
];

export default routes;
