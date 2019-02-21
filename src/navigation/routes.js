import DefaultLayout from '../components/DefaultLayout'
import MyProfile from "../views/MyProfile/MyProfile";
import Dashboard from "../views/Dashboard/Dashboard";
import CSVUpload from "../views/CSVUpload/CSVUpload";
import Institutions from '../views/Institutions/Institutions';
import Institution from '../views/Institution/Institution';
import MyReports from "../views/MyReports/MyReports";
import Reports from "../views/Reports/Reports";
import ReportDetails from "../views/ReportDetails/ReportDetails";
import ReportSubmission from "../views/ReportDetails/ReportSubmission";

const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/my-profile', exact: true, name: 'My Profile', component: MyProfile },
  { path: '/my-reports', exact: true, name: 'My Reports', component: MyReports},
  { path: '/upload-csv', exact: true, name: 'CSV Upload', component: CSVUpload },
  { path: '/submit-report', exact: true, name: 'Report Submission', component: ReportSubmission},
  { path: '/institutions', exact: true, name: 'Institutions Referece Datas', component: Institutions},
  { path: '/institution/:param', exact: true, name: 'Institution Form', component: Institution},
  { path: '/institution/:param/:id', exact: true, name: 'Institution Form', component: Institution},
  { path: '/reports', exact: true, name: 'Reports', component: Reports},
  { path: '/reports/:param/:id', exact: true, name: 'Report Form', component: ReportDetails},
];

export default routes;
