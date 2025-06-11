import useValue from '@/hooks/useValue'
import { Form } from 'antd'
import { useState } from 'react'
import * as authService from '@/services/AuthService'
import { CustomNotification } from '@/utils/CustomNotification'
import LocalStorageUtil from '@/utils/LocalStorageUtil'
import {
    LocalStorageConstants,
    LocalStorageValueConstants,
} from '@/constants/Application/LocalStorageConstants'

export const useSignInModal = () => {
    /* CONSTANT */
    const [form] = Form.useForm()

    /* STATE */
    const [isModalOpen, setIsModalOpen] = useState(true)

    /* HOOK */
    const {
        value: saving,
        handleEnableValue: handleEnableSaving,
        handleDisableValue: handleDisableSaving,
    } = useValue(false)

    /* HANDLERS */
 const handleSubmit = async (data: { email_address: string }) => {
        try {
            handleEnableSaving()

            // Trim email before sending to API
            const trimmedEmail = data?.email_address?.trim()

            const result = await authService.apiSignIn({
                email_address: trimmedEmail,
            })

            CustomNotification.showSuccessMessage(result?.message)
        } catch (error: any) {
            CustomNotification.showErrorMessage(error)
        } finally {
            handleDisableSaving()
        }
    }

    const handleClose = () => {
        LocalStorageUtil.localStorageSetItem(LocalStorageConstants.IS_LOGIN, {
            isLogin: LocalStorageValueConstants.FALSE,
        })
        setIsModalOpen(false)
    }

    return {
        form,
        saving,
        handleSubmit,
        isModalOpen,
        setIsModalOpen,
        handleClose,
    }
}
