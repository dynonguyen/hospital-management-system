export default {
  ROUTES: {
    HOME: '/',
    NOTFOUND: '/notfound',
    ACCOUNT: '/account',
    LOGIN: '/login',
    MANAGE: {
      ROOT: '/manage',
      VIEW_LIST: '/manage/view-list',
      ADD_STAFF: '/manage/add-staff',
      ADD_DOCTOR: '/manage/add-doctor',
    },
  },

  ROLES: {
    SYS_ADMIN: 'sys_admin',
    HR: 'hr',
    ACCOUNTING_MANAGER: 'accounting_manager',
    SPECIALIZE_MANAGER: 'specialize_manager',
    RECEPTIONIST: 'receptionist',
    FINANCE_STAFF: 'finance_staff',
    DOCTOR: 'doctor',
    PHARMACIST: 'pharmacist',
    ACCOUNTING_STAFF: 'accounting_staff',
    PATIENT: 'patient',
  },
};
