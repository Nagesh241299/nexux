// src/hooks/useCustomerTable.ts
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Customer } from '@/shared/types/customer'
import {
    apiDeactivateCustomer,
    apiGetCustomerList,
} from '@/services/CustomerService'
import { CustomNotification } from '@/utils/CustomNotification'
import { RouteConstants } from '@/constants/RouteConstants'

export const useCustomerTable = () => {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [pageSize, setPageSize] = useState(10)
    const [loading, setLoading] = useState<boolean>(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [editCustomerId, setEditCustomerId] = useState<number | null>(null)
    const navigate = useNavigate()
    const [resetFormStep, setResetFormStep] = useState(false)
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        fetchCustomers()
    }, [])

    const filteredData = customers.filter((customer) =>
        Object.values(customer).some((val) =>
            String(val).toLowerCase().includes(searchText.toLowerCase()),
        ),
    )

    const fetchCustomers = async () => {
        setLoading(true)
        try {
            const response = await apiGetCustomerList()
            setCustomers(response.data)
        } catch (error) {
            CustomNotification.showErrorMessage(error)
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteCustomer = async (id: number) => {
        try {
            const response: any = await apiDeactivateCustomer(id)
            await fetchCustomers()
            CustomNotification.showSuccessMessage(response)
        } catch (error) {
            CustomNotification.showErrorMessage(error)
        }
    }

    const handleCutomerForm = () => {
        navigate(RouteConstants.ADD_CUSTOMER)
    }

    const handleAddCustomer = () => {
        setEditCustomerId(null)
        setResetFormStep(true)
        setIsModalVisible(true)
    }

    const handleEdit = (customerId: number) => {
        setEditCustomerId(customerId)
        setResetFormStep(true)
        setIsModalVisible(true)
        console.log('handleEdit', resetFormStep)
    }

    const handleModalClose = () => {
        setIsModalVisible(false)
        setEditCustomerId(null)
        setResetFormStep(true)
        console.log('handleModalClose', resetFormStep)
    }

    const handleEditCustomer = (id: number) => {
        navigate(`/customer/edit/${id}`)
    }

    return {
        customers,
        loading,
        handleDeleteCustomer,
        handleCutomerForm,
        handleEditCustomer,
        handleEdit,
        handleAddCustomer,
        handleModalClose,
        isModalVisible,
        editCustomerId,
        fetchCustomers,
        resetFormStep,
        filteredData,
        searchText,
        setSearchText,
        pageSize,
        setPageSize,
    }
}
