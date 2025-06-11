import moment from 'moment'
import LocalStorageUtil from './LocalStorageUtil'
import {
    LocalStorageConstants,
    LocalStorageValueConstants,
} from '@/constants/Application/LocalStorageConstants'

import type { UserDataInterface } from '@/shared/types/auth'
import { RouteConstants } from '@/constants/RouteConstants'
import { Modules } from '@/constants/Application/DatabaseConstants'
import {
    ModuleOperation,
    UserInterface,
} from '@/shared/interface/User.interface'

class Authentication {
    public static addExpiryTimeToLocalStorage = () => {
        try {
            const additionalMinutes = import.meta.env
                .VITE_APP_TOKEN_EXPIRY_ADDITIONAL_MINUTES
                ? +import.meta.env.VITE_APP_TOKEN_EXPIRY_ADDITIONAL_MINUTES
                : 55

            const expiryTime = moment()
                .add(additionalMinutes, 'minutes')
                .format()
            LocalStorageUtil.localStorageSetItem(
                LocalStorageConstants.TOKEN_EXPIRY_TIMESTAMP,
                expiryTime,
            )
        } catch (error) {
            throw error
        }
    }

    public static isUserSessionActive = () => {
        try {
            const localStorageKeys: string[] = [
                LocalStorageConstants.TOKEN_EXPIRY_TIMESTAMP,
                LocalStorageConstants.USER_DATA,
                LocalStorageConstants.IS_FIRST_TIME_LOGIN
            ]

            const isUserActive = LocalStorageUtil.localStorageGetItem(
                LocalStorageConstants.IS_USER_ACTIVE,
            )
            const isTokenExpired = LocalStorageUtil.localStorageGetItem(
                LocalStorageConstants.IS_TOKEN_EXPIRED,
            )

            const isFirstTimeLogin=LocalStorageUtil.localStorageGetItem(
                LocalStorageConstants.IS_FIRST_TIME_LOGIN,
            )

            if (
                isUserActive === LocalStorageValueConstants.FALSE ||
                isTokenExpired === LocalStorageValueConstants.TRUE ||
                isFirstTimeLogin === LocalStorageValueConstants.TRUE ||
                !isUserActive ||
                !isTokenExpired
            )
                return false

            /* check if basic keys to access application are present */
            for (const key of localStorageKeys) {
                const value = LocalStorageUtil.localStorageGetItem(key)
                // If key is not found, return false immediately
                if (value === null) return false
            }

            return true
        } catch (error) {
            return false
        }
    }

    public static saveUserAuthData = async (response: UserDataInterface) => {
        const productId = LocalStorageUtil.localStorageGetItem(
            LocalStorageConstants.PRODUCT_ID,
        )

        /* setting values in localstorage */
        Authentication.addExpiryTimeToLocalStorage()

        LocalStorageUtil.localStorageSetItem(
            LocalStorageConstants.USER_DATA,
            response.user!,
        )
        LocalStorageUtil.localStorageSetItem(
            LocalStorageConstants.IS_FIRST_TIME_LOGIN,
            response.is_first_time_login!,
        )
        
        LocalStorageUtil.localStorageSetItem(
            LocalStorageConstants.IS_USER_ACTIVE,
            LocalStorageValueConstants.TRUE,
        )
        LocalStorageUtil.localStorageSetItem(
            LocalStorageConstants.IS_TOKEN_EXPIRED,
            LocalStorageValueConstants.FALSE,
        )

        if (response.is_first_time_login) {
            window.location.assign(RouteConstants.RESET_PASSWORD)
        } else {
            window.location.assign(
                // productId
                //     ? `${RouteConstants.PRODUCT_DETAILS}?product_id=${productId}`:
                     RouteConstants.HOME,
            )
        }
    }

    // Function to check if a user has access to a specific module
    public static hasModuleAccess = (
        userData: UserInterface | undefined,
        moduleToCheck: Modules,
    ): boolean => {
        return !!userData?.modules?.some(
            (mod: ModuleOperation) => mod.module === moduleToCheck,
        )
    }

    // Function to check if a user has access to a specific module and operation
    // public static hasModuleAndOperationAccess = (
    //     userData: UserInterface | undefined,
    //     moduleToCheck: Modules,
    //     // operationToCheck: string,
    // ): boolean => {
    //     return !!userData?.modules?.some((mod: ModuleOperation) => {
    //         // Check if module matches moduleToCheck
    //         if (mod.module === moduleToCheck) {
    //             // Check if operations include operationToCheck
    //             return mod.operations.includes(operationToCheck)
    //         }
    //         return false
    //     })
    // }
}

export default Authentication
