import { useState, useEffect, useCallback } from 'react'
import { Form } from 'antd'
import { message } from 'antd'
import {
    apiCreateCustomer,
    apiGetCustomerById,
    apiUpdateCustomer,
} from '@/services/CustomerService'
import { UpdateCustomerRequest } from '@/shared/types/customer'
import { CustomNotification } from '@/utils/CustomNotification'

export const useCustomerForm = (
    customerId: number | null,
    onSuccess?: () => void,
    isModalVisible?: boolean,
) => {
    const isEditMode = Boolean(customerId)
    const [form] = Form.useForm()
    const [currentStep, setCurrentStep] = useState(0)
    const [reloadCustomerData, setReloadCustomerData] = useState(0) 
    const stepTitles = ['User Info', 'Address Info', 'Theme Settings']

    useEffect(() => {
        form.resetFields()
        if (isEditMode) {
            const fetchCustomer = async () => {
                try {
                    const response = await apiGetCustomerById(
                        Number(customerId),
                    )
                    const customerData = response.customer

                    if (customerData.logo_url) {
                        const logoFileList = [
                            {
                                uid: '-1',
                                name: 'logo.png',
                                status: 'done',
                                url: customerData.logo_url,
                            },
                        ]
                        customerData.logo = logoFileList
                    } else {
                        customerData.logo = []
                    }

                    form.setFieldsValue(customerData)
                } catch (error) {
                    CustomNotification.showErrorMessage(error)
                }
            }
            fetchCustomer()
        }
    }, [isEditMode, customerId, form, reloadCustomerData])

    useEffect(() => {
        if (isModalVisible) {
            setCurrentStep(0)
        }
    }, [isModalVisible, customerId])

    const getFieldsForStep = useCallback((stepIndex: number): string[] => {
        switch (stepIndex) {
            case 0:
                return [
                    'customer_name',
                    'contact_person',
                    'email_address',
                    'mobile_number',
                ]
            case 1:
                return ['address', 'city', 'state', 'country', 'pin_code']
            case 2:
                return [
                    'header_text',
                    'footer_text',
                    'logo',
                    'primary_color',
                    'secondary_color',
                ]
            default:
                return []
        }
    }, [])

    const next = async () => {
        try {
            const fieldsToValidate = getFieldsForStep(currentStep)
            await form.validateFields(fieldsToValidate)
            setCurrentStep(currentStep + 1)
        } catch (err) {
            message.error('Please fill all required fields.')
        }
    }

    const prev = () => {
        setCurrentStep(currentStep - 1)
    }

    const handleSubmit = async (values: UpdateCustomerRequest) => {
        try {
            if (Array.isArray(values.logo) && values.logo[0]?.originFileObj) {
                values.logo = values.logo[0].originFileObj
            } else {
                values.logo = null
            }

            if (isEditMode) {
                const response = await apiUpdateCustomer(
                    Number(customerId),
                    values,
                )
                CustomNotification.showSuccessMessage(response.message)
            } else {
                const response: any = await apiCreateCustomer(values)
                CustomNotification.showSuccessMessage(response.message)
            }

            setReloadCustomerData((prev) => prev + 1)

            if (onSuccess) {
                onSuccess()
                form.resetFields()
                setCurrentStep(0)
            }
        } catch (error) {
            CustomNotification.showErrorMessage(error)
        }
    }

    return {
        form,
        isEditMode,
        currentStep,
        stepTitles,
        next,
        prev,
        handleFinish: handleSubmit,
        getFieldsForStep,
        setCurrentStep,
    }
}
