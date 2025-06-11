import {
    Routes,
    Route,
    Navigate,
    createBrowserRouter,
    useLocation,
} from 'react-router-dom'

import { useThemeStore } from '@/store/themeStore'
import Authentication from '@/utils/Authentication'
import LocalStorageUtil from '@/utils/LocalStorageUtil'
import {
    LocalStorageConstants,
    LocalStorageValueConstants,
} from '@/constants/Application/LocalStorageConstants'
import { RouteConstants } from '@/constants/RouteConstants'
import { UserInterface } from '@/shared/interface/User.interface'
import { Modules, Operations } from '@/constants/Application/DatabaseConstants'

import App from '@/components/App'
import PostLoginLayout from '@/components/common/layouts/PostLoginLayout'
import PreLoginLayout from '@/components/common/layouts/PreLoginLayout'
import AccessDenied from '@/components/common/AccessDenied'

// Public Components
import SignIn from '@/components/Authentication/SignIn'
import SigninVerifyLink from '@/components/Authentication/SignIn/SigninVerifyLink'
import SignUp from '@/components/Authentication/SignUp'
import VerifySignup from '@/components/Authentication/SignUp/VerifySignup'

// Protected Components
import Dashboard from '@/components/Dashboard'
import ResetPassword from '@/components/Authentication/ChangePassword'
import Home from '@/components/Home'
import Chatbot from '@/components/Chatbot'
import ProfileDetails from '@/components/ProfileDetails'
import DepartmentManagement from '@/components/DepartmentManagement/DepartmentDashboard/index'
import { useEffect } from 'react'
import UserDashboard from '@/components/UserManagement/UserDashboard'
import CustomerDashboard from '@/components/CustomerManagement/CustomerDashboard/index'
import CustomerForm from '@/components/CustomerManagement/CustomerForm'
import UserForm from '@/components/UserManagement/UserForm'
import DepartmentDocuments from '@/components/DepartmentManagement/DocumentManagement'


/* ----------------------- Public Routes ----------------------- */
const publicRoutes = [
        { path: RouteConstants.LANDING_PAGE, element: <SignIn /> },
    { path: RouteConstants.SIGN_IN, element: <SignIn /> },
    { path: RouteConstants.RESET_PASSWORD, element: <ResetPassword /> },
    { path: RouteConstants.VERIFY_SIGN_UP, element: <VerifySignup /> },
    { path: RouteConstants.VERIFY_SIGN_IN, element: <SigninVerifyLink /> },
]

/* ----------------------- Common Protected Routes ----------------------- */
// Routes that are common to all authenticated users regardless of role
const commonProtectedRoutes = [
    { path: RouteConstants.PROFILE, element: <ProfileDetails /> },
    {
        path: RouteConstants.LANDING_PAGE_PRODUCT_DETAILS,
        element: <Navigate to={RouteConstants.HOME} />,
    },
]

/* ----------------------- Route Access Control ----------------------- */
const getRoutesByRole = (userData: UserInterface | null) => {
    let routes: any[] = []
    if (!userData) return routes

    const role = userData.role_name
    routes.push(...commonProtectedRoutes)
    
    
    switch (role) {
          
        case 'Super Admin':
            routes.push(
                {
                    path: RouteConstants.HOME,
                    element: <Home />,
                },
                {
                    path: RouteConstants.DASHBOARD,
                    element: <Dashboard />,
                },
                {
                    path: RouteConstants.DEPARTMENT_MANAGEMENT,
                    element: <DepartmentManagement />,
                },
                {
                    path: RouteConstants.CUSTOMER_MANAGEMENT,
                    element: <CustomerDashboard />,
                },
                {
                    path: RouteConstants.ADD_CUSTOMER,
                    element: <CustomerForm />,
                },
                {
                    path: RouteConstants.UPDATE_CUSTOMER,
                    element: <CustomerForm />,
                },
                { path: RouteConstants.UPDATE_USER, element: <UserForm /> },
                {
                    path: RouteConstants.USER_MANAGEMENT,
                    element: <UserDashboard />,
                },
                { path: RouteConstants.ADD_USER, element: <UserForm /> },
                {
                    path: RouteConstants.CHATBOT,
                    element: <Chatbot />,
                },
                {path:RouteConstants.DOCUMENTS,element:<DepartmentDocuments />},
            )
            break

        case 'Admin':
            // Add Admin specific routes
            routes.push(
                {
                    path: RouteConstants.HOME,
                    element: <Home />,
                },
                {
                    path: RouteConstants.USER_MANAGEMENT,
                    element: <UserDashboard />,
                },
                { path: RouteConstants.UPDATE_USER, element: <UserForm /> },
                { path: RouteConstants.ADD_USER, element: <UserForm /> },
                {path:RouteConstants.DOCUMENTS,element:<DepartmentDocuments />},

                // {
                //     path: `${RouteConstants.USER_MANAGEMENT}/:view/:id`,
                //     element: <UserDetails />,
                // },
                // {
                //     path: `${RouteConstants.USER_MANAGEMENT}/:update/:id`,
                //     element: <UserDetails />,
                // },
                {
                    path: RouteConstants.DEPARTMENT_MANAGEMENT,
                    element: <DepartmentManagement />,
                },
                {
                    path: RouteConstants.CHATBOT,
                    element: <Chatbot />,
                },
            )
            break

        case 'User':
            // Regular users only get access to the chatbot and home redirect
            routes.push(
                {
                    path: RouteConstants.HOME,
                    element: <Navigate to={RouteConstants.CHATBOT} />,
                },
                {
                    path: RouteConstants.CHATBOT,
                    element: <Chatbot />,
                },
            )
            break

        default:
            // For unknown roles, only provide access to a minimal set of routes
            routes.push({
                path: RouteConstants.HOME,
                element: <AccessDenied />,
            })
            break
    }

    // Add a catch-all route for this role
    routes.push({ path: '*', element: <AccessDenied /> })

    return routes
}

/* ----------------------- Route Wrappers ----------------------- */

const PublicRouteWrapper = () => {
    const routes = (
        <Routes>
            {publicRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))}
            {/* Catch all unknown paths and redirect to SignIn */}
            <Route path="*" element={<Navigate to={RouteConstants.SIGN_IN} replace />} />
        </Routes>
    );

    return <PreLoginLayout>{routes}</PreLoginLayout>;
};


const ProtectedRouteWrapper = () => {
    const userData = LocalStorageUtil.localStorageGetItem(
        LocalStorageConstants.USER_DATA,
    ) as UserInterface | null
    const setLayout = useThemeStore((state) => state.setLayout)
    const layoutType = useThemeStore((state) => state.layout.type)
    const location = useLocation()

    // Check if the current route is the chatbot route (for User role)
    const isChatbotRoute =
        location.pathname === RouteConstants.CHATBOT ||
        location.pathname.startsWith(RouteConstants.CHATBOT + '/')

    // Set the appropriate layout based on the route
    useEffect(() => {
        if (isChatbotRoute && userData?.role_name ==="User") {
            setLayout('topBarClassic')
        } else {
            setLayout('collapsibleSide')
        }
    }, [location.pathname, setLayout, isChatbotRoute])

    // Get routes based on the user's role
    const authorizedRoutes = getRoutesByRole(userData)

    return (
        <App>
            <PostLoginLayout layoutType={layoutType}>
                <Routes>
                    {authorizedRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                    <Route
                        path="/"
                        element={<Navigate to={RouteConstants.HOME} />}
                    />
                </Routes>
            </PostLoginLayout>
        </App>
    )
}

/* ----------------------- Router Setup ----------------------- */
const AuthWrapper = () => {
    const isUserSessionActive = Authentication.isUserSessionActive()
    return isUserSessionActive ? (
        <ProtectedRouteWrapper />
    ) : (
        <PublicRouteWrapper />
    )
}

const AppRoutes = createBrowserRouter([
    { path: '/*', element: <AuthWrapper /> },
])

export default AppRoutes
