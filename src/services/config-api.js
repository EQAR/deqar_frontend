const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_API;

export const ADMINAPI_URL = BACKEND_DOMAIN + '/adminapi/v1';
export const SUBMISSIONAPI_URL = BACKEND_DOMAIN + '/submissionapi/v1';
export const WEBAPI_URL = BACKEND_DOMAIN + '/webapi/v1';

// Authentication endpoints
export const POST_PASSWORD = BACKEND_DOMAIN + '/auth/password/';
export const POST_PASSWORD_RESET = BACKEND_DOMAIN + '/auth/password/reset/';
export const POST_PASSWORD_RESET_CONFIRM = BACKEND_DOMAIN + '/auth/password/reset/confirm/';
export const GET_USER = BACKEND_DOMAIN + '/auth/me/';

// User account endpoints
export const GET_TOKEN = BACKEND_DOMAIN + '/accounts/get_token/';
export const POST_TOKEN = BACKEND_DOMAIN + '/accounts/get_new_token/';
export const POST_EMAIL = BACKEND_DOMAIN + '/accounts/change_email/';

// Dashboard endpoints
export const GET_BADGES = ADMINAPI_URL + '/dashboard/badges/';
export const GET_REPORTS_BY_AGENCY = ADMINAPI_URL + '/reports_by_agency/';

// Submission endpoints
export const POST_REPORT = SUBMISSIONAPI_URL + '/submit/report';
export const POST_FILE = SUBMISSIONAPI_URL + '/submit/reportfile';
export const POST_CSV = SUBMISSIONAPI_URL + '/submit/csv';

// Agency endpoints
export const GET_MY_SUBMISSION_AGENCIES = ADMINAPI_URL + '/select/agency/';
export const GET_ALL_AGENCIES = ADMINAPI_URL + '/select/agency_all/';
export const GET_ACTIVITIES = ADMINAPI_URL + '/select/agency_esg_activity/';
export const GET_ACTIVITY_TYPES = ADMINAPI_URL + '/select/activity_type/';
export const GET_ASSOCIATIONS = ADMINAPI_URL + '/select/association/';
export const GET_EQAR_DECISIONS = ADMINAPI_URL + '/select/eqar_decision_type/';
export const MANAGE_MY_AGENCY = ADMINAPI_URL + '/my_agency/';
export const GET_AGENCIES = ADMINAPI_URL + '/browse/agencies/';
export const MANAGE_AGENCY = ADMINAPI_URL + '/agencies';

export const POST_AGENCY_DECISION_FILE = ADMINAPI_URL + '/submit/decision';
export const POST_AGENCY_DECISION_EXTRA_FILE = ADMINAPI_URL + '/submit/decision_extra';

// Report related endpoints 
export const GET_STATUSES = ADMINAPI_URL + '/select/report_status/';
export const GET_DECISIONS = ADMINAPI_URL + '/select/report_decision/';
export const GET_MY_REPORTS = ADMINAPI_URL + '/browse/my-reports/';
export const GET_REPORTS = ADMINAPI_URL + '/browse/reports/';

export const MANAGE_REPORT = ADMINAPI_URL + '/reports';
export const REMOVE_REPORT_FLAG = ADMINAPI_URL + '/reports/remove_flag';

// Institution endpoints
export const GET_INSTITUTIONS = ADMINAPI_URL + '/select/institutions/';
export const GET_INSTITUTION = ADMINAPI_URL + '/institutions/';
export const GET_HISTORICAL_RELATION_TYPES = ADMINAPI_URL + '/select/institution_historical_relationship_types/';
export const MANAGE_INSTITUTION = ADMINAPI_URL + '/institutions/';

// Language endpoints
export const GET_LANGUAGES = ADMINAPI_URL + '/select/language/';

// Country endpoints
export const GET_COUNTRIES = ADMINAPI_URL + '/select/country/';
export const GET_INSTITUTION_COUNTRIES = ADMINAPI_URL + '/select/institutions/country/';

// List endpoints
export const GET_QFEHEA_LEVELS = ADMINAPI_URL + '/select/qf_ehea_level/';
export const GET_FLAGS = ADMINAPI_URL + '/select/flag/';
