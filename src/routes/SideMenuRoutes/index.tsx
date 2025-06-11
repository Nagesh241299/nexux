import { Modules, Operations } from '@/constants/Application/DatabaseConstants'
import { LocalStorageConstants } from '@/constants/Application/LocalStorageConstants'
import { NAV_ITEM_TYPE_ITEM } from '@/constants/navigation.constant'
import { RouteConstants } from '@/constants/RouteConstants'
import { UserInterface } from '@/shared/interface/User.interface'

import type { NavigationTree } from '@/shared/types/navigation'
import Authentication from '@/utils/Authentication'
import { General } from '@/utils/General'
import LocalStorageUtil from '@/utils/LocalStorageUtil'

/* Define where RightSideNavbar should appear */
export const allowedRoutes = [
    // RouteConstants.HOME,
    // RouteConstants.MY_PRODUCTS,
    // RouteConstants.BRAND,
    // RouteConstants.PRODUCT_DETAILS,
    RouteConstants.LIST,
    RouteConstants.LANDING_PAGE_PRODUCT_DETAILS,
]

/* Left Side Nav Menu */
const getSideMenuRoutes = (): NavigationTree[] => {
    const userData = LocalStorageUtil.localStorageGetItem(
        LocalStorageConstants.USER_DATA,
    ) as UserInterface

    const routes: NavigationTree[] = []

    if (!userData) {
        routes.push({
            key: 'home',
            path: RouteConstants.LANDING_PAGE,
            title: 'Home',
            translateKey: `nav.home`,
            icon: 'home',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
        })
    }

    if (userData) {
        if (
            Authentication.hasModuleAccess(userData, Modules.DASHBOARD)
        ) {
            routes.push({
                key: 'dashboard',
                path: RouteConstants.DASHBOARD,
                title: 'Dashboard',
                translateKey: 'nav.dashboard',
                icon: 'dashboard',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            })
        }

        const settingsSubMenu: NavigationTree[] = []

       

        if (
            Authentication.hasModuleAccess(userData, Modules.CUSTOMER_MANAGEMENT)
        ) {
            settingsSubMenu.push({
                key: 'customer-management',
                path: RouteConstants.CUSTOMER_MANAGEMENT,
                title: 'Customers',
                translateKey: 'nav.customer-management',
                icon: 'customerMaster',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            })
        }

        if (
            Authentication.hasModuleAccess(userData, Modules.DEPARTMENT_MANAGEMENT)
        ) {
            settingsSubMenu.push({
                key: 'department-management',
                path: RouteConstants.DEPARTMENT_MANAGEMENT,
                title: 'Knowledge Base',
                translateKey: 'nav.department-management',
                icon: 'departmentManagement',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            })
        }
         if (
            Authentication.hasModuleAccess(userData, Modules.USER_MANAGEMENT)
        ) {
            settingsSubMenu.push({
                key: 'user-management',
                path: RouteConstants.USER_MANAGEMENT,
                title: 'Users',
                translateKey: 'nav.user-management',
                icon: 'userManagement',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            })
        }

        if (settingsSubMenu.length > 0) {
            routes.push({
                key: 'settings',
                path: '',
                title: 'Settings',
                translateKey: 'nav.settings',
                icon: 'settings', 
                type: 'collapse', 
                authority: [],
                subMenu: settingsSubMenu,
            })
        }

        routes.push({
            key: 'chatbot',
            path: RouteConstants.CHATBOT,
            title: 'Chatbot',
            translateKey: 'nav.chatbot',
            icon: 'chatbot',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
        })
    }

    return routes
}

const SideMenuRoutes = getSideMenuRoutes()
export default SideMenuRoutes
