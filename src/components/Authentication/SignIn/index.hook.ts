import { Form } from 'antd'
import { useEffect, useState } from 'react'

import * as authService from '@/services/AuthService'
import { Base64StringEncoding } from '@/utils/Cryptography'
import {
    LocalStorageConstants,
    LocalStorageValueConstants,
} from '@/constants/Application/LocalStorageConstants'
import Authentication from '@/utils/Authentication'
import { useNavigate } from 'react-router-dom'
import LocalStorageUtil from '@/utils/LocalStorageUtil'
import { CustomNotification } from '@/utils/CustomNotification'
import useValue from '@/hooks/useValue'
import { RouteConstants } from '@/constants/RouteConstants'

export const useSignIn = () => {
    /* CONSTANT */
    const navigate = useNavigate()
    const [form] = Form.useForm()

    /* STATE */
    const [isUserActive, setIsUserActive] = useState(true)
    const [isTokenExpired, setIsTokenExpired] = useState(false)
    const [isFirstTimeLogin, setIsFirstTimeLogin] = useState(false)

    const {
        value: saving,
        handleEnableValue: handleEnableSaving,
        handleDisableValue: handleDisableSaving,
    } = useValue(false)

    /* HANDLERS */
    const handleSubmit = async (data: { email_address: string, password: string }) => {
        // Trim input fields before processing
        const trimmedData = {
            ...data,
            email_address: data.email_address?.trim(),
            password: data.password?.trim(),
        }
        try {
            handleEnableSaving()

            // Store email address in local storage for later use in password reset
            LocalStorageUtil.localStorageSetItem(
                LocalStorageConstants.USER_EMAIL,
                trimmedData?.email_address
            )
            LocalStorageUtil.localStorageSetItem(
                LocalStorageConstants.CURRENT_PASSWORD,
                trimmedData?.password
            )

            const result = await authService.apiSignIn({
                email_address: trimmedData?.email_address,
                password: trimmedData?.password
            })

    
            // Save auth data to persist user session - added from useSigninVerifyLink
            Authentication.saveUserAuthData(result)

          
            // Make sure to set isFirstTimeLogin in local storage if needed
             if (result.is_first_time_login) {
                // Save first time login status to local storage
                LocalStorageUtil.localStorageSetItem(
                    LocalStorageConstants.IS_FIRST_TIME_LOGIN,
                    LocalStorageValueConstants.TRUE
                )
                setIsFirstTimeLogin(true)
                // Navigate to reset password page
                // Pass password via route state
                // navigate(RouteConstants.RESET_PASSWORD, {
                //     state: { currentPassword: data?.password }
                // }
                navigate(RouteConstants.RESET_PASSWORD)
            // )
            } else {
                // Make sure first time login is marked as false
                LocalStorageUtil.localStorageSetItem(
                    LocalStorageConstants.IS_FIRST_TIME_LOGIN,
                    LocalStorageValueConstants.FALSE
                )
                
                navigate(RouteConstants.HOME)
            }

            CustomNotification.showSuccessMessage(result?.message)
        } catch (error: any) {
            CustomNotification.showErrorMessage(error)
        } finally {
            handleDisableSaving()
        }
    }

    // clear chatbot history from localStorage 
    const clearChatbotHistory = () => {
        localStorage.removeItem('chatbot-history');
        // Remove user-specific key if userId is available
        const userData = LocalStorageUtil.localStorageGetItem(LocalStorageConstants.USER_DATA);
        let userId = null;
        if (userData && typeof userData === 'object' && userData.id) {
            userId = userData.id;
        } else if (userData && typeof userData === 'string') {
            try {
                const parsed = JSON.parse(userData);
                if (parsed && parsed.id) userId = parsed.id;
            } catch {}
        }
        if (userId) {
            localStorage.removeItem(`chatbot-history-${userId}`);
        }
    };

    // Patch: clear chatbot history on session/token expired or user inactive
    const handleUserActiveOk = () => {
        setIsUserActive(true);
        clearChatbotHistory();
        localStorage.clear();
    }
    const handleTokenExpiredOk = () => {
        setIsTokenExpired(false);
        clearChatbotHistory();
        localStorage.clear();
    }

    /* EFFECT */

    /* useEffect related to multiple-tab logout/login */
    useEffect(() => {
        /* (to handle multiple tabs) we register an event listener, example -> if all tabs are on sign-in page and one tab logs in we check if necessary
     local-storage is set and move all tabs to home=page.
  */
        const fn = (e: StorageEvent) => {
            const childFn = async () => {
                /* we only want to change urls when token or when user becomes idle */
                /* e.key when null means clear local storage event fired. */
                if (
                    e.key ===
                        Base64StringEncoding.encode(
                            LocalStorageConstants.IS_TOKEN_EXPIRED,
                        ) ||
                    e.key ===
                        Base64StringEncoding.encode(
                            LocalStorageConstants.IS_USER_ACTIVE,
                        ) ||
                    !e.key
                ) {
                    const userSession = Authentication.isUserSessionActive()
                    if (userSession) window.location.assign(RouteConstants.RESET_PASSWORD)
                    if (!userSession)
                        window.location.assign(RouteConstants.SIGN_IN)
                }
            }

            childFn()
        }

        window.addEventListener('storage', fn, false)
        return () => window.removeEventListener('storage', fn, false)
    }, [])

    /* useEffect related to multiple-tab logout/login */
    useEffect(() => {
        /* 
    when this component is mounted, we check if localstorage has all necessary keys. If all correct we move to home page. 
    If not we open necessary modal windows (idle-timeout or token-expired) on sign-in (current/this) component
    */
        if (Authentication.isUserSessionActive()) {
            // Check if this is first time login from local storage
            const isFirstTimeLogin = LocalStorageUtil.localStorageGetItem(
                LocalStorageConstants.IS_FIRST_TIME_LOGIN
            );
            
            // Route to reset password if first time login flag is set
            if (isFirstTimeLogin === LocalStorageValueConstants.TRUE) {
                // We need to ensure we're using navigate here instead of window.location to preserve state
                navigate(RouteConstants.RESET_PASSWORD);
            } else {
                navigate(RouteConstants.HOME);
            }
            return;
        }
        
        const isUserActive = LocalStorageUtil.localStorageGetItem(
            LocalStorageConstants.IS_USER_ACTIVE,
        )
        const isTokenExpired = LocalStorageUtil.localStorageGetItem(
            LocalStorageConstants.IS_TOKEN_EXPIRED,
        )

        if (isUserActive === LocalStorageValueConstants.FALSE)
            setIsUserActive(false)
        if (isTokenExpired === LocalStorageValueConstants.TRUE)
            setIsTokenExpired(true)
    }, [navigate])

    return {
        form,
        saving,
        handleSubmit,
        isUserActive,
        isTokenExpired,
        isFirstTimeLogin,
        handleUserActiveOk,
        handleTokenExpiredOk,
    }
}