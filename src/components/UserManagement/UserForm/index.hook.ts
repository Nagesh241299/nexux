import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from 'antd'

import { Customer, UpdateCustomerRequest } from '@/shared/types/customer'
import { CustomNotification } from '@/utils/CustomNotification'
import { RouteConstants } from '@/constants/RouteConstants'
import {
    apiCreateUser,
    apiGetUserById,
    apiUpdateUser,
} from '@/services/UserService'
import { AddUserSchema, UpdateUserRequest } from '@/shared/types/user'
import {
    apiGetCustomerById,
    apiGetCustomerList,
} from '@/services/CustomerService'
import * as departmentServices from '@/services/DepartmentService'
import LocalStorageUtil from '@/utils/LocalStorageUtil'
import { LocalStorageConstants } from '@/constants/Application/LocalStorageConstants'

export const useUserForm = (
    userId?: number | null,
    onClose?: () => void,
    onSuccess?: () => void,
) => {
    const userData = LocalStorageUtil.localStorageGetItem(
        LocalStorageConstants.USER_DATA,
    )
    const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null)
    const [departments, setDepartments] = useState<
        { value: number; label: string }[]
    >([])
    const [isSuperAdminUser, setIsSuperAdminUser] = useState(false)

    const [customers, setCustomers] = useState<
        { value: number; label: string }[]
    >([])

    const [reloadUserData, setReloadUserData] = useState(0) // <-- Added state to trigger user data reload

    const navigate = useNavigate()
    const [form] = Form.useForm()
    const fullRoles = [
        { value: 'Admin', label: 'Admin' },
        { value: 'User', label: 'User' },
    ]

    const roles =
        userData?.role_name === 'Admin'
            ? fullRoles.filter((role) => role.value === 'User')
            : fullRoles

    const fetchDepartmentList = async () => {
        try {
            const response = await departmentServices.getDepartmentList()
            const departments = response?.departments || []
            const departmentOptions = departments.map((item: any) => ({
                value: item.id,
                label: item.name,
            }))
            setDepartments(departmentOptions)
        } catch (error) {
            console.error('Failed to fetch Knowledge Bases:', error)
        }
    }

     const [disableCustomerSelect, setDisableCustomerSelect] = useState(false)
    const [disableRoleSelect, setDisableRoleSelect] = useState(false)

    useEffect(() => {
        if (roles.length === 1) {
            form.setFieldsValue({ role: roles[0].value })
            setDisableRoleSelect(true)
        } else {
            setDisableRoleSelect(false)
        }

        if (customers.length === 1) {
           form.setFieldsValue({
                customer_id: customers[0].value,
            })
            handleCustomerChange(customers[0].value) // Trigger department load if needed
            setDisableCustomerSelect(true)
        } else {
            setDisableCustomerSelect(false)
        }
    }, [roles, customers])

    useEffect(() => {
        const customerId = userData?.customer_id
        const role = userData?.role_name

        const fetchCustomerById = async () => {
            try {
                const response = await apiGetCustomerById(customerId)
                const customer = response.customer
                setCustomers([
                    {
                        value: customer.id,
                        label: customer.customer_name,
                    },
                ])
                form.setFieldsValue({ customer_id: customer.id })
            } catch (error) {
                CustomNotification.showErrorMessage(error)
            }
        }

        const fetchAllCustomers = async () => {
            try {
                const response = await apiGetCustomerList()
                const customerOptions = response.data.map((customer: any) => ({
                    value: customer.id,
                    label: customer.customer_name,
                }))
                setCustomers(customerOptions)
            } catch (error) {
                CustomNotification.showErrorMessage(error)
            }
        }

        if (customerId && customerId !== 0 && role !== 'Super Admin') {
            fetchCustomerById()
        } else {
            fetchAllCustomers()
        }
    }, [])

    const handleCustomerChange = async (customerId: number) => {
        if (selectedCustomerId === customerId) return // prevent re-fetch if same customer

        setSelectedCustomerId(customerId)

        try {
            const response = await departmentServices.getDepartmentList()
            const departments = response?.departments || []

            // Always filter departments by customer_id
            const filteredDepartments = departments.filter(
                (dept: any) => dept.customer_id === customerId
            )

            const departmentOptions = filteredDepartments.map((item: any) => ({
                value: item.id,
                label: item.name,
            }))

            setDepartments(departmentOptions)

            // Retain existing valid department selections
            const existingDepartmentIds = form.getFieldValue('department_id') || []
            const validDepartmentIds = existingDepartmentIds.filter((id: number) =>
                departmentOptions.some((dept) => dept.value === id)
            )

            form.setFieldsValue({ department_id: validDepartmentIds })
        } catch (error) {
            console.error('Failed to fetch Knowledge Base:', error)
        }
    }

    useEffect(() => {
        if (userId === null && customers.length === 1) {
            const firstCustomer = customers[0]
            if (selectedCustomerId !== firstCustomer.value) {
                form.setFieldsValue({ customer_id: firstCustomer.value })
                handleCustomerChange(firstCustomer.value)
                setSelectedCustomerId(firstCustomer.value)
            }
        }
    }, [customers])

    useEffect(() => {
        setIsSuperAdminUser(false)
        setSelectedCustomerId(null)

        form.resetFields()

        if (userId !== null && customers.length > 0) {
            form.resetFields()

            const fetchUser = async () => {
                try {
                    const response = await apiGetUserById(Number(userId))
                    const userData = response.user

                    if (userData.role_name === 'Super Admin') {
                        setIsSuperAdminUser(true)

                        const mappedValues = {
                            first_name: userData.first_name,
                            last_name: userData.last_name,
                            email_address: userData.email_address,
                            mobile_number: userData.mobile_number,
                            role: userData.role_name,
                            customer_id: userData.customer_name,
                            department_id: [],
                        }

                        form.setFieldsValue(mappedValues)
                        return
                    }

                    setIsSuperAdminUser(false)

                    const matchingCustomer = customers.find(
                        (c) =>
                            c.label.toLowerCase() ===
                            userData.customer_name.toLowerCase(),
                    )

                    if (!matchingCustomer) {
                        CustomNotification.showErrorMessage(
                            'Customer not found for the user.',
                        )
                        return
                    }

                    const customerId = matchingCustomer.value
                    const departmentIds = userData.departments.map(
                        (d: any) => d.department_id,
                    )

                    await handleCustomerChange(customerId)

                    const mappedValues = {
                        first_name: userData.first_name,
                        last_name: userData.last_name,
                        email_address: userData.email_address,
                        mobile_number: userData.mobile_number,
                        role: userData.role_name,
                        customer_id: customerId,
                        department_id: departmentIds,
                    }

                    form.setFieldsValue(mappedValues)
                    setSelectedCustomerId(customerId)
                } catch (error) {
                    CustomNotification.showErrorMessage(error)
                }
            }

            fetchUser()
        }
    }, [userId, customers, form, reloadUserData]) // <-- Added reloadUserData here

    const handleSubmit = async (values: UpdateUserRequest | AddUserSchema) => {
        try {
            if (userId !== null) {
                await apiUpdateUser(Number(userId), values)
                CustomNotification.showSuccessMessage(
                    'User updated successfully',
                )
            } else {
                await apiCreateUser(values)
                CustomNotification.showSuccessMessage(
                    'User created successfully',
                )
            }

            setReloadUserData(prev => prev + 1) // <-- Trigger refetch on next open

            if (onClose) onClose()
            if (onSuccess) {
                onSuccess()
                form.resetFields()
            }
            navigate(RouteConstants.USER_MANAGEMENT)
        } catch (error) {
            CustomNotification.showErrorMessage(error)
        }
    }

    return {
        form,
        handleSubmit,
        roles,
        customers,
        departments,
        handleCustomerChange,
        selectedCustomerId,
        isSuperAdminUser,
        disableRoleSelect,
        disableCustomerSelect
    }
}
