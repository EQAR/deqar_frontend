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
const MyAgency = React.lazy(() => import('../views/MyAgency/MyAgency'));
const Agencies = React.lazy(() => import('../views/Agencies/Agencies'));
const AgencyActivities = React.lazy(() => import('../views/AgencyActivities/AgencyActivities'));
const AgencyDetails = React.lazy(() => import('../views/AgencyDetails/AgencyDetails'));

const routes = [
  { path: '/my-agency/:param', exact: true, name: 'My Agency Form', component: MyAgency},
  { path: '/my-profile', exact: true, name: 'My Profile', component: MyProfile },
  { path: '/my-reports', exact: true, name: 'My Reports', component: MyReports},
  { path: '/my-reports/:param/:id', exact: true, name: 'Report Form', component: MyReportDetails},
  { path: '/submit-csv', exact: true, name: 'CSV Upload', component: CSVUpload },
  { path: '/submit-report', exact: true, name: 'Report Submission', component: ReportSubmission},
  { path: '/reference/agencies', exact: true, name: 'Agencies Referece Datas', component: Agencies},
  { path: '/reference/agencies/:param/:id', exact: true, name: 'Agency Form', component: AgencyDetails},
  { path: '/reference/activities', exact: true, name: 'Activities', component: AgencyActivities},
  { path: '/reference/institutions', exact: true, name: 'Institutions Referece Datas', component: Institutions},
  { path: '/reference/institutions/:param', exact: true, name: 'Institution Form', component: InstitutionDetails},
  { path: '/reference/institutions/:param/:id', exact: true, name: 'Institution Form', component: InstitutionDetails},
  { path: '/reference/reports', exact: true, name: 'Reports', component: Reports},
  { path: '/reference/reports/:param/:id', exact: true, name: 'Report Form', component: ReportDetails},
];

export default routes;
