import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Authentication from '@/utils/Authentication'
import { CustomNotification } from '@/utils/CustomNotification'
import useValue from '@/hooks/useValue'
import * as authServices from '@/services/AuthService'
import { RouteConstants } from '@/constants/RouteConstants'

export const useSigninVerifyLink = () => {
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
        const verifySignInAPI = async (url: string) => {
            try {
                handleEnableLoading()
                const result = await authServices.apiVerifySignIn({
                    verification_link: url,
                })
                handleDisableLoading()

                setTimeout(() => {
                    Authentication.saveUserAuthData(result)
                }, 1000)

                CustomNotification.showSuccessMessage(result.message)
            } catch (error) {
                CustomNotification.showErrorMessage(error)
                navigate(RouteConstants.SIGN_IN)
            }
        }

        if (verification_token && url) verifySignInAPI(url)
    }, [verification_token])

    return { loading }
}
