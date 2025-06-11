export const apiPrefix = '/api'

const endpointConfig = {
    chatDepartments:'/chat/departments',
    chat:"/chat/",
    chatHistory:'/chat/history',
    signIn: '/user/sign-in',
    customerList: '/customer/list',
    customerData:'/customer',
    customerDelete:'/customer/deactivate-customer',
    createCustomer:'/customer/create-customer',
    usersList: '/user/get-all-users',
    userData:'/user',
    userUpdate:'/user/update-user',
    userDelete:'/user/deactivate',
    createUser:'/user/create-user/',
    verifySignIn: '/user/verify-sign-in',
    verifySignUp: '/user/verify-sign-up',
    signOut: '/user/sign-out',
    getProfile: '/user/profile',
    updateProfile: '/user/profile',
    resetPassword: '/user/change-password/',
    refreshToken: '/user/refresh-access-token',
    dashboard: '/dashboard/',
    // ----------------- Department Endpoints -----------------
    departmentList: '/department/list',
    departmentDetail: '/department/detail', 
    departmentCreate: '/department/create',
    departmentUpdate: '/department/update', 
    departmentDelete: '/department/delete', 
    deactivateDepartment:'/department/deactivate',
    departmentCustomerlist:'/department/with-customers-list',
    departmentByCustomerId:'/department/listbycustomer/?customer_id=',
    departmentUserList: '/department/user-list', // get users in department
    departmentUpdateStatus: '/department/update-status', // + /:id (for activate/deactivate)
    documentAdd: '/document/add/',
    documentDelete:'/document/delete/',
    documentUpdate:'/document/update/'
}

export default endpointConfig
