// src/hooks/useCustomerTable.ts
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Customer } from '@/shared/types/customer'
import {
    apiDeactivateCustomer,
    apiGetCustomerList,
} from '@/services/CustomerService'
import { CustomNotification } from '@/utils/CustomNotification'
import { RouteConstants } from '@/constants/RouteConstants'
import { apiDeactivateUser, apiGetUserList } from '@/services/UserService'
import { User } from '@/shared/types/user'

export const useUserTable = () => {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [editUserId, setEditUserId] = useState<number | null>(null)
    const [pageSize, setPageSize] = useState(10)
    const navigate = useNavigate()

        const [searchText, setSearchText] = useState('')
          const [searchParams] = useSearchParams()
    const customerName = searchParams.get('customer')
    
       const filteredData = users.filter((user) => {
        const matchesSearch = Object.values(user).some((val) =>
            String(val).toLowerCase().includes(searchText.toLowerCase())
        );
    
        const matchesCustomer = customerName
            ? user.customer_name?.toLowerCase() === customerName.toLowerCase()
            : true;
    
        return matchesSearch && matchesCustomer;
    });
    

    const handleAddUser = () => {
        setEditUserId(null)
        setIsModalVisible(true)
    }

    const handleModalClose = () => {
        setEditUserId(null)
        setIsModalVisible(false)
    }

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const response = await apiGetUserList()
            setUsers(response.users)
        } catch (error) {
            CustomNotification.showErrorMessage(error)
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteUser = async (id: number) => {
        try {
      const response: any = await apiDeactivateUser(id);
      await fetchUsers(); 
      CustomNotification.showSuccessMessage(response);
    } catch (error) {
      CustomNotification.showErrorMessage(error);
    }
    }

    const handleCutomerForm = () => {
        navigate(RouteConstants.ADD_USER)
    }

    const handleEditCustomer = (id: number) => {
        navigate(`/user/edit/${id}`)
    }

    const handleEdit = (userId: number) => {
        setEditUserId(userId)
        setIsModalVisible(true)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return {
        users,
        loading,
        handleDeleteUser,
        handleCutomerForm,
        handleEditCustomer,
        handleEdit,
        handleAddUser,
        handleModalClose,
        isModalVisible,
        editUserId,
        fetchUsers,
        pageSize,
        setPageSize,
        filteredData,
        setSearchText,
        searchText
    }
}
