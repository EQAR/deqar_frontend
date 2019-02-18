import DefaultLayout from '../components/DefaultLayout'
import MyProfile from "../views/MyProfile/MyProfile";
import Dashboard from "../views/Dashboard/Dashboard";
import CSVUpload from "../views/CSVUpload/CSVUpload";
import Institutions from '../views/Institutions/Institutions';
import InstitutionForm from '../views/InstitutionForm/InstitutionForm';
import MyReports from "../views/MyReports/MyReports";
import Reports from "../views/Reports/Reports";
import ReportForm from "../views/ReportSubmission/ReportForm";
import ReportDetails from "../views/ReportDetails/ReportDetails";

const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/my-profile', exact: true, name: 'My Profile', component: MyProfile },
  { path: '/my-reports', exact: true, name: 'My Reports', component: MyReports},
  { path: '/upload-csv', exact: true, name: 'CSV Upload', component: CSVUpload },
  { path: '/submit-report', exact: true, name: 'Report Submission', component: ReportForm},
  { path: '/institutions', exact: true, name: 'Institutions Referece Datas', component: Institutions},
  { path: '/institution/:param/:id', exact: true, name: 'Institution Form', component: InstitutionForm},
  { path: '/reports', exact: true, name: 'Reports', component: Reports},
  { path: '/reports/:param/:id', exact: true, name: 'Report Form', component: ReportDetails},
];

export default routes;
