import DefaultLayout from '../components/DefaultLayout'
import MyProfile from "../views/MyProfile/MyProfile";
import Dashboard from "../views/Dashboard/Dashboard";
import CSVUpload from "../views/CSVUpload/CSVUpload";
import ReportForm from "../views/ReportSubmission/ReportForm";
import Institutions from '../views/Institutions/Institutions';

const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/my-profile', exact: true, name: 'My Profile', component: MyProfile },
  { path: '/upload-csv', exact: true, name: 'CSV Upload', component: CSVUpload },
  { path: '/report-form', exact: true, name: 'Report Submission', component: ReportForm},
  { path: '/institutions', exact: true, name: 'Institutions Referece Datas', component: Institutions}
];

export default routes;
