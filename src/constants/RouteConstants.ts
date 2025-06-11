export enum APPMODE {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
}

/* enums regarding routing done in the application. */
export const RouteConstants = {
    // Public Routes
    LANDING_PAGE: '/',
    LANDING_PAGE_PRODUCT_DETAILS: '/product-details',
    SIGN_IN: '/sign-in',
    RESET_PASSWORD: '/reset-password',
    VERIFY_SIGN_UP: '/verify-sign-up',
    VERIFY_SIGN_IN: '/verify-sign-in',
    MARKET_REPORT_DASHBOARD: '/market-report-dashboard',
    MARKET_REPORT_PROCESS: '/market-report-process',

    // Protected Routes
    ADD_CUSTOMER:'/customer/add',
    UPDATE_CUSTOMER:'/customer/edit/:customerId',
    UPDATE_USER:'/user/edit/:userId',
    ADD_USER:'/user/add',
    HOME: '/home',
    CHATBOT:'/chatbot',
    EXPLORE_BRAND: '/explore-brand',
    EXPLORE_BRAND_DETAILS: '/explore-brand-details',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    PENDING: '/pending',
    USER_MANAGEMENT: '/user-management',
    CUSTOMER_MANAGEMENT: '/customer-management',
    DEPARTMENT_MANAGEMENT: '/department-management',
    LIST: '/list',
    DOCUMENTS: '/departments/:departmentId/documents',


    // Fallback / Utility Routes
    PAGE_NOT_FOUND: '/page-not-found',
    COMING_SOON: '/coming-soon',
    ERROR_PAGE: '/error-page400',
    ACCESS_DENIED: '/access-denied',
}
