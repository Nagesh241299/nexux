import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import * as authServices from '@/services/AuthService'
import useValue from '@/hooks/useValue'
import Authentication from '@/utils/Authentication'
import { CustomNotification } from '@/utils/CustomNotification'
import { RouteConstants } from '@/constants/RouteConstants'

export const useSignUpVerifyLink = () => {
    /* CONSTANTS */

    const navigate = useNavigate()

    /* Extract query parameters */
    const queryParams = new URLSearchParams(location.search)
    const verification_token = queryParams.get('verification_token')

    /*  STATE */
    const [url] = useState(
        window.location.origin +
            location.pathname +
            location.search +
            location.hash,
    )

    /* CUSTOM HOOKS */
    const {
        value: loading,
        handleDisableValue: handleDisableLoading,
        handleEnableValue: handleEnableLoading,
    } = useValue(false)

    /* EFFECT */
    useEffect(() => {
        const verifySignUpAPI = async (url: string) => {
            try {
                handleEnableLoading()
                const result = await authServices.apiVerifySignUp({
                    verification_link: url,
                })
                handleDisableLoading()
                setTimeout(() => {
                    Authentication.saveUserAuthData(result)
                }, 1000)
            } catch (error) {
                CustomNotification.showErrorMessage(error)
                navigate(RouteConstants.SIGN_IN)
            }
        }

        if (verification_token && url) verifySignUpAPI(url)
    }, [verification_token])

    return { loading }
}
