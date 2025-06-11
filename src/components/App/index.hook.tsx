import { useIdleTimer } from 'react-idle-timer'
import moment from 'moment-timezone'
import { useEffect, useState, useCallback } from 'react'
import LocalStorageUtil from '@/utils/LocalStorageUtil'
import {
    LocalStorageConstants,
    LocalStorageValueConstants,
} from '@/constants/Application/LocalStorageConstants'
import * as authService from '@/services/AuthService'
import { Base64StringEncoding } from '@/utils/Cryptography'
import Authentication from '@/utils/Authentication'
import { RouteConstants } from '@/constants/RouteConstants'
import appConfig from '@/configs/app.config'
import { apiGetCustomerById } from '@/services/CustomerService'
import { Customer } from '@/shared/types/customer'

const getTokenExpiryTime = () => {
    const expiryTimestamp = LocalStorageUtil.localStorageGetItem(
        LocalStorageConstants.TOKEN_EXPIRY_TIMESTAMP,
    )
    return expiryTimestamp ? moment(expiryTimestamp) : null
}

export const useMainApp = () => {
    const appSessionTimeout = appConfig?.appSessionTimeout
    const userData = LocalStorageUtil.localStorageGetItem(
        LocalStorageConstants.USER_DATA,
    )
    /* STATE */
    const [loadApp, setLoadApp] = useState(() => {
        const expiryTime = getTokenExpiryTime()
        return expiryTime && expiryTime.isAfter(moment()) ? false : true
    })
    const [refresh, setRefresh] = useState(1)
    const [branding, setBranding] = useState<Customer>()

    /* HANDLERS */
    const handleLoadApp = (val: boolean) => setLoadApp(val)

    const clearSessionAndRedirect = useCallback(async () => {
        try {
            console.log('[Session] Clearing session and redirecting to sign-in')
            await authService.apiSignOut()
        } catch (error) {
            console.error('[Session] Error signing out:', error)
        } finally {
            localStorage.clear()
            window.location.assign(RouteConstants.SIGN_IN)
        }
    }, [])

    useIdleTimer({
        onIdle: async () => {
            console.log('[Idle Timer] User is idle, signing out...')
            await authService.apiSignOut()
            LocalStorageUtil.localStorageSetItem(
                LocalStorageConstants.IS_USER_ACTIVE,
                LocalStorageValueConstants.FALSE,
            )
            window.location.assign(RouteConstants.SIGN_IN)
        },
        crossTab: true,
        timeout: Number(appSessionTimeout) || 604800000,
    })

    /* EFFECT */
   useEffect(() => {
    const fetchBranding = async () => {
        if (!userData?.customer_id || userData.customer_id === 0) {
            // Skip API call if customer_id is 0 or undefined/null
            return
        }

        try {
            const response = await apiGetCustomerById(userData.customer_id)
            const clientBrand = response?.customer || {}
            setBranding(clientBrand)
        } catch (error) {
            console.error(
                '[Branding] Failed to fetch branding config',
                error,
            )
        }
    }

    fetchBranding()
}, [refresh])


    return { loadApp, branding }

    useEffect(() => {
        const handleStorageChange = async (e: StorageEvent) => {
            console.log('[Storage Event] Key changed:', e.key)

            if (
                !e.key ||
                e.key ===
                    Base64StringEncoding.encode(
                        LocalStorageConstants.IS_TOKEN_EXPIRED,
                    ) ||
                e.key ===
                    Base64StringEncoding.encode(
                        LocalStorageConstants.IS_USER_ACTIVE,
                    )
            ) {
                if (!Authentication.isUserSessionActive()) {
                    console.log(
                        '[Storage Event] User session is inactive, redirecting...',
                    )
                    window.location.assign(RouteConstants.SIGN_IN)
                }
            }
        }

        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [])

    useEffect(() => {
        const expiryTime = getTokenExpiryTime()
        if (!expiryTime) {
            console.log('[Token Check] No expiry time found')
            return
        }

        const differenceInMilliseconds = expiryTime.diff(moment())
        console.log(
            `[Token Check] Token expires in ${differenceInMilliseconds} ms`,
        )

        const timer = setTimeout(async () => {
            console.log('[Token Refresh] Attempting to refresh token...')
            try {
                handleLoadApp(true)
                await authService.refreshTokenAPI()
                Authentication.addExpiryTimeToLocalStorage()
                console.log('[Token Refresh] Token refreshed successfully')
                setRefresh(Math.random())
            } catch (error) {
                console.error(
                    '[Token Refresh] Failed to refresh token, logging out',
                    error,
                )
                await clearSessionAndRedirect()
            } finally {
                handleLoadApp(false)
            }
        }, differenceInMilliseconds)

        return () => clearTimeout(timer)
    }, [refresh, clearSessionAndRedirect])

    return { loadApp }
}
