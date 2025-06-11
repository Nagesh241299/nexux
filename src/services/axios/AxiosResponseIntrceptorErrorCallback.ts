import HttpCodeConstants from '@/constants/Application/HttpCodeConstants'
import {
    LocalStorageConstants,
    LocalStorageValueConstants,
} from '@/constants/Application/LocalStorageConstants'
import { RouteConstants } from '@/constants/RouteConstants'
import LocalStorageUtil from '@/utils/LocalStorageUtil'
import type { AxiosError } from 'axios'

/* Added standard HTTP unauthorized codes */
const unauthorizedCodes = [HttpCodeConstants.INVALID_TOKEN]

const AxiosResponseInterceptorErrorCallback = (error: AxiosError) => {
    const { response } = error

    if (response) {
        console.error('[Axios] Error Response:', response.status, response.data)

        if (unauthorizedCodes.includes(response.status)) {
            console.warn('[Axios] Unauthorized error detected, logging out...')
            localStorage.clear()
            LocalStorageUtil.localStorageSetItem(
                LocalStorageConstants.IS_TOKEN_EXPIRED,
                LocalStorageValueConstants.TRUE,
            )
            window.location.assign(RouteConstants.SIGN_IN)
        }
    } else {
        console.error('[Axios] Network or unknown error:', error.message)
    }

    return Promise.reject(error)
}

export default AxiosResponseInterceptorErrorCallback
