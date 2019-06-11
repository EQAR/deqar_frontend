import DefaultLayout from '../components/DefaultLayout'
import MyProfile from "../views/MyProfile/MyProfile";
import CSVUpload from "../views/CSVUpload/CSVUpload";
import Institutions from '../views/Institutions/Institutions';
import InstitutionDetails from '../views/InstitutionDetails/InstitutionDetails';
import MyReports from "../views/MyReports/MyReports";
import Reports from "../views/Reports/Reports";
import ReportDetails from "../views/ReportDetails/ReportDetails";
import ReportSubmission from "../views/ReportDetails/ReportSubmission";
import MyReportDetails from "../views/ReportDetails/MyReportDetails";
import MyAgencies from "../views/MyAgencies/MyAgencies";

const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/my-profile', exact: true, name: 'My Profile', component: MyProfile },
  { path: '/my-reports', exact: true, name: 'My Reports', component: MyReports},
  { path: '/my-reports/:param/:id', exact: true, name: 'Report Form', component: MyReportDetails},
  { path: '/submit-csv', exact: true, name: 'CSV Upload', component: CSVUpload },
  { path: '/submit-report', exact: true, name: 'Report Submission', component: ReportSubmission},
  { path: '/reference/institutions', exact: true, name: 'Institutions Referece Datas', component: Institutions},
  { path: '/reference/institutions/:param', exact: true, name: 'Institution Form', component: InstitutionDetails},
  { path: '/reference/institutions/:param/:id', exact: true, name: 'Institution Form', component: InstitutionDetails},
  { path: '/reference/reports', exact: true, name: 'Reports', component: Reports},
  { path: '/reference/reports/:param/:id', exact: true, name: 'Report Form', component: ReportDetails},
  { path: '/reference/activities', exact: true, name: 'My Agencies', component: MyAgencies},
];

export default routes;
