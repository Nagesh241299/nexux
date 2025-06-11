import { useState, useEffect } from 'react'
import { z } from 'zod'
import {
    apiGetUserProfile,
    // apiUpdateUserProfile,
    apiSendOtp,
    apiVerifyOtp,
} from '@/services/ProfileService'
import { CustomNotification } from '@/utils/CustomNotification'
import useValue from '@/hooks/useValue'
import { LocalStorageConstants } from '@/constants/Application/LocalStorageConstants'
import LocalStorageUtil from '@/utils/LocalStorageUtil'
import { RouteConstants } from '@/constants/RouteConstants'
import { UserProfileResponse } from '@/shared/types/profile'

const firstNameSchema = z
    .string()
    .min(2, 'First name must be at least 2 characters long')
    .max(50, 'First name cannot exceed 50 characters')

const lastNameSchema = z
    .string()
    .min(2, 'Last name must be at least 2 characters long')
    .max(50, 'Last name cannot exceed 50 characters')

const mobileNumberSchema = z
    .string()
    .regex(/^\d{10}$/, 'Mobile number must contain only 10 digits')
    .optional()

const profileSchema = z.object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    mobileNumber: mobileNumberSchema,
})



const useUserProfile = (
    setMessage: (
        message: string,
        type: 'success' | 'danger' | 'info' | 'warning',
        duration?: 3000 | 10000000,
    ) => void,
) => {
    const staticContentValue = LocalStorageUtil.localStorageGetItem(
        LocalStorageConstants.STATIC_CONTENT,
    )
    const [loading, setLoading] = useState(false)
    const [formValues, setFormValues] = useState<UserProfileResponse>({
        full_name: '',
        email: '',
        mobileNumber: '',
        otp: '',
        originalMobileNumber: '',
        staticContent: false,
    })

    /* STATE */
    const [isOtpModalVisible, setIsOtpModalVisible] = useState(false)
    const [otp, setOtp] = useState('')
    const [isMobileVerified, setIsMobileVerified] = useState(false)
    const [timer, setTimer] = useState(0)
    const [otpSent, setOtpSent] = useState(false)

    const {
        value: saving,
        handleEnableValue: handleEnableSaving,
        handleDisableValue: handleDisableSaving,
    } = useValue(false)

    /* HANDLERS */
    const fetchUserProfile = async () => {
        try {
            setLoading(true)
            const response = await apiGetUserProfile()
            const userData = response?.user
            const profile = {
                full_name: userData.full_name || '',
                email: userData.email_address || '',
                mobileNumber: userData.mobile_number?.replace('+91', '') || '',
                originalMobileNumber:
                    userData.mobile_number?.replace('+91', '') || '',
                otp: '',
                staticContent: Boolean(staticContentValue === 'true'),
            }
            if (userData?.mobile_number) setIsMobileVerified(true)
            setFormValues(profile)
        } catch (error) {
            setMessage(CustomNotification.getErrorMessage(error), 'danger')
        } finally {
            setLoading(false)
        }
    }

    const handleFieldChange = (field: keyof UserProfileResponse, value: string) => {
        if (field === 'mobileNumber') setIsMobileVerified(false)
        setFormValues((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSave = async () => {
        const firstNameValid = firstNameSchema.safeParse(formValues.full_name)

        if (!firstNameValid.success) {
            setMessage(firstNameValid.error.errors[0].message, 'danger')
            return
        }

        if (!isMobileVerified && formValues.mobileNumber) {
            setMessage('Mobile is not verified', 'danger')
            return
        }
        try {
            handleEnableSaving()
            const updateData = {
                full_name: formValues.full_name,
                mobile_number: formValues.mobileNumber,
            }

            // const response: any = await apiUpdateUserProfile(updateData)

            // setMessage(response?.message, 'success')
            await fetchUserProfile()
            LocalStorageUtil.localStorageSetItem(
                LocalStorageConstants.STATIC_CONTENT,
                String(formValues.staticContent),
            )
            window.location.assign(RouteConstants.PROFILE)
        } catch (error) {
            setMessage(CustomNotification.getErrorMessage(error), 'danger')
        } finally {
            handleDisableSaving()
        }
    }

    const handleMobileVerifyClick = async () => {
        try {
            const data = { mobile_number: formValues.mobileNumber }
            const response = await apiSendOtp(data)
            setMessage(
                `${response?.message} | OTP: ${response?.otp}`,
                'success',
            )
            setIsOtpModalVisible(true)
            setOtpSent(true)
            setTimer(60)
        } catch (error) {
            setMessage(CustomNotification.getErrorMessage(error), 'danger')
        }
    }

    const handleOtpSubmit = async () => {
        if (otp.length === 4) {
            try {
                const data = { otp }
                const response = await apiVerifyOtp(data)
                setMessage(response?.message, 'success')
                setIsMobileVerified(true)
                setIsOtpModalVisible(false)
                setOtp('')
            } catch (error) {
                setMessage(CustomNotification.getErrorMessage(error), 'danger')
            }
        }
    }

    /* EFFECT */

    useEffect(() => {
        fetchUserProfile()
    }, [])

    useEffect(() => {
        let timerInterval: NodeJS.Timeout
        if (otpSent && timer > 0) {
            timerInterval = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000)
        } else if (timer === 0) {
            setOtpSent(false)
        }

        return () => clearInterval(timerInterval)
    }, [otpSent, timer])

    useEffect(() => {
        if (formValues.mobileNumber !== formValues.originalMobileNumber) {
            setIsMobileVerified(false)
        }
    }, [formValues.mobileNumber, formValues.originalMobileNumber])

    return {
        loading,
        formValues,
        isOtpModalVisible,
        otp,
        isMobileVerified,
        timer,
        handleFieldChange,
        handleSave,
        handleMobileVerifyClick,
        handleOtpSubmit,
        setOtp,
        setIsOtpModalVisible,
        profileSchema,
        otpSent,
        saving,
    }
}

export default useUserProfile
