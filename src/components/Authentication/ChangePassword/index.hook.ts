import { useEffect, useState } from 'react'
import { Form } from 'antd'
import { useNavigate } from 'react-router-dom'
import * as authService from '@/services/AuthService'
import { CustomNotification } from '@/utils/CustomNotification'
import { RouteConstants } from '@/constants/RouteConstants'
import LocalStorageUtil from '@/utils/LocalStorageUtil'
import { LocalStorageConstants, LocalStorageValueConstants } from '@/constants/Application/LocalStorageConstants'
import Authentication from '@/utils/Authentication'
import { Base64StringEncoding } from '@/utils/Cryptography'

export const useResetPassword = () => {
  const [form] = Form.useForm()
  const [saving, setSaving] = useState(false)
  const [isResetSuccessful, setIsResetSuccessful] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const emailAddress = LocalStorageUtil.localStorageGetItem(
    LocalStorageConstants.USER_EMAIL
  ) || ''

  const currentPassword = LocalStorageUtil.localStorageGetItem(
    LocalStorageConstants.CURRENT_PASSWORD
  ) || ''


  useEffect(() => {
    const fn = (e: StorageEvent) => {
      const handleStorageChange = async () => {
        if (
          e.key === Base64StringEncoding.encode(LocalStorageConstants.IS_TOKEN_EXPIRED) ||
          e.key === Base64StringEncoding.encode(LocalStorageConstants.IS_USER_ACTIVE) ||
          !e.key // clear() event
        ) {
          const isSessionActive = Authentication.isUserSessionActive()
          if (!isSessionActive) {
            window.location.assign(RouteConstants.SIGN_IN)
          }
        }
      }
      handleStorageChange()
    }

    window.addEventListener('storage', fn, false)
    return () => window.removeEventListener('storage', fn, false)
  }, [])

  // // 📌 2. Redirect logic on mount (session & first-time login)
  // useEffect(() => {
  //   if (!Authentication.isUserSessionActive()) {
  //     navigate(RouteConstants.SIGN_IN)
  //     return
  //   }

  //   const isFirstTimeLogin = LocalStorageUtil.localStorageGetItem(
  //     LocalStorageConstants.IS_FIRST_TIME_LOGIN
  //   )

  //   if (isFirstTimeLogin !== LocalStorageValueConstants.TRUE) {
  //     navigate(RouteConstants.HOME)
  //   }
  // }, [navigate])


  const handleSubmit = async (values) => {
    setSaving(true)
    try {
      const result = await authService.apiResetPassword({
        email_address: emailAddress,
        current_password: currentPassword,
        new_password: values.new_password,
      })
  
      //  Password reset success
      CustomNotification.showSuccessMessage(
        result?.message || 'Password has been set successfully'
      )
  
    
      const signInResult = await authService.apiSignIn({
        email_address: emailAddress,
        password: values.new_password,
      })
  
      
      Authentication.saveUserAuthData(signInResult)
  
     
      LocalStorageUtil.localStorageSetItem(
        LocalStorageConstants.IS_FIRST_TIME_LOGIN,
        LocalStorageValueConstants.FALSE
      )
  
      
      navigate(RouteConstants.HOME)
  
    } catch (error) {
      console.error('Password reset error:', error)
      setErrorMessage(
        error?.message || 'An error occurred while resetting your password. Please try again.'
      )
      CustomNotification.showErrorMessage(error)
    } finally {
      setSaving(false)
    }
  }
  

  const handleSuccessOk = () => {
    setIsResetSuccessful(false)

    LocalStorageUtil.localStorageSetItem(
      LocalStorageConstants.IS_FIRST_TIME_LOGIN,
      LocalStorageValueConstants.FALSE
    )

    navigate(RouteConstants.HOME)
  }

  const handleErrorOk = () => {
    setErrorMessage('')
  }

  return {
    form,
    saving,
    isResetSuccessful,
    errorMessage,
    emailAddress,
    handleSubmit,
    handleSuccessOk,
    handleErrorOk
  }
}
