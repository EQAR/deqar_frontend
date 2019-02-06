const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_API;

export const ADMINAPI_URL_V1 = BACKEND_DOMAIN + '/adminapi/v1';
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
export const GET_BADGES = ADMINAPI_URL_V1 + '/dashboard/badges/';
export const GET_REPORTS = ADMINAPI_URL_V1 + '/reports_by_agency/';

// Submission endpoints
export const POST_REPORT = SUBMISSIONAPI_URL + '/submit/report';
export const POST_FILE = SUBMISSIONAPI_URL + '/submit/reportfile';
export const POST_CSV = SUBMISSIONAPI_URL + '/submit/csv';

// Agency endpoints
export const GET_AGENCIES = ADMINAPI_URL_V1 + '/select/agency/';
export const GET_ACTIVITIES = ADMINAPI_URL_V1 + '/select/agency_esg_activity/';

// Report related endpoints
export const GET_STATUSES = ADMINAPI_URL_V1 + '/select/report_status/';
export const GET_DECISIONS = ADMINAPI_URL_V1 + '/select/report_decision/';

// Institution endpoints
export const GET_INSTITUTIONS = ADMINAPI_URL_V1 + '/select/institutions/';

// Language endpoints
export const GET_LANGUAGES = ADMINAPI_URL_V1 + '/select/language/';

// Country endpoints
export const GET_COUNTRIES = ADMINAPI_URL_V1 + '/select/country/';
export const GET_INSTITUTION_COUNTRIES = ADMINAPI_URL_V1 + '/select/institutions/country/';

// QF-EHEA level endpoints
export const GET_QFEHEA_LEVELS = ADMINAPI_URL_V1 + '/select/qf_ehea_level/';
