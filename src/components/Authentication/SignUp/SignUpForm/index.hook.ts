import { Form } from 'antd'
import { useState } from 'react'
import debounce from 'lodash/debounce'

import * as authService from '@/services/AuthService'
import { CustomNotification } from '@/utils/CustomNotification'
import useValue from '@/hooks/useValue'

export const useSignUpForm = () => {
    /* CONSTANT */
    const [form] = Form.useForm()

    /* STATE */
    const [options, setOptions] = useState<
        {
            label: string
            value: string
        }[]
    >([])
    const [isCustomRoleInput, setIsCustomRoleInput] = useState<boolean>(false)
    const [isCustomBrandInput, setIsCustomBrandInput] = useState<boolean>(false)
    const [isCustomMediaInput, setIsCustomMediaInput] = useState<boolean>(false)

    const {
        value: loading,
        handleEnableValue: handleEnableLoading,
        handleDisableValue: handleDisableLoading,
    } = useValue(false)

    const {
        value: saving,
        handleEnableValue: handleEnableSaving,
        handleDisableValue: handleDisableSaving,
    } = useValue(false)

    // Fetch brands with debounce
    const fetchBrands = debounce(async (searchTerm: string) => {
        try {
            if (!searchTerm) return
            handleEnableLoading()
            const response = await authService.apiFetchBrandList(searchTerm)
            const brandList = response?.brands || []

            if (Array.isArray(brandList)) {
                setOptions(
                    brandList.map((brand: any) => ({
                        label: brand.brand_name,
                        value: brand.brand_name,
                    })),
                )
            }
        } catch (error) {
            CustomNotification.showErrorMessage(error)
        } finally {
            handleDisableLoading()
        }
    }, 500)

    const onSubmit = async (data: any, handleStep: any) => {
        try {
            handleEnableSaving()

            const result = await authService.apiSignUp({
                email_address: data.companyEmail,
                full_name: data.name,
                role: data.role,
                brand_name: data.brand_name,
                how_did_you_hear_about_us: data.how_did_you_hear_about_us,
                subscribe_to_product_update_email: true,
            })
            handleStep()

            CustomNotification.showSuccessMessage(result?.message)
        } catch (error) {
            CustomNotification.showErrorMessage(error)
        } finally {
            handleDisableSaving()
        }
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: any,
    ) => {
        const value = e.target.value
        field.onChange(value)
    }

    const handleSwitchToDropdown = (field: string) => {
        form.setFieldValue(field, null)
        if (field === 'role') {
            setIsCustomRoleInput(!isCustomRoleInput)
        } else if (field === 'brand_name') {
            setIsCustomBrandInput(!isCustomBrandInput)
        } else if (field === 'how_did_you_hear_about_us') {
            setIsCustomMediaInput(!isCustomMediaInput)
        }
    }

    const handleChange = (field: string, value: string) => {
        if (value === 'other') {
            if (field === 'role') {
                setIsCustomRoleInput(!isCustomRoleInput)
            } else if (field === 'brand_name') {
                setIsCustomBrandInput(!isCustomBrandInput)
            } else if (field === 'how_did_you_hear_about_us') {
                setIsCustomMediaInput(!isCustomMediaInput)
            }
            form.setFieldValue(field, null)
        }
    }

    return {
        handleInputChange,
        fetchBrands,
        loading,
        options,
        onSubmit,
        form,
        handleSwitchToDropdown,
        isCustomRoleInput,
        isCustomBrandInput,
        isCustomMediaInput,
        handleChange,
        saving,
    }
}