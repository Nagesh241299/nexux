import { useEffect, useMemo, useState } from 'react'
import * as departmentServices from '@/services/DepartmentService'
import * as customerServices from '@/services/CustomerService'
import { CustomNotification } from '@/utils/CustomNotification'
import { useSearchParams } from 'react-router-dom'
import { Customer, Department } from '@/shared/types/department'

export const useDepartmentTable = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [submitLoading, setSubmitLoading] = useState<boolean>(false)
    const [departmentList, setDepartmentList] = useState<Department[]>([])
    const [originalDepartmentList, setOriginalDepartmentList] = useState<
        Department[]
    >([])
    const [customerList, setCustomerList] = useState<Customer[]>([])
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [modalMode, setModalMode] = useState<'create' | 'update'>('create')
    const [iframeLoading, setIframeLoading] = useState<boolean>(true)
    const [pageSize, setPageSize] = useState<number>(10)
    const [editDepartmentId, setEditDepartmentId] = useState<number | null>(
        null,
    )

    const [currentDepartment, setCurrentDepartment] = useState<Department>({
        id: null,
        customer_id: null,
        name: '',
        description: '',
        is_active: true,
    })

    const [pdfModalVisible, setPdfModalVisible] = useState<boolean>(false)
    const [pdfUrl, setPdfUrl] = useState<string | null>(null)
    const [searchText, setSearchText] = useState<string>('')
    const [filteredCustomerId, setFilteredCustomerId] = useState<number | null>(
        null,
    )
    const [filteredStatus, setFilteredStatus] = useState<boolean | null>(null)
    const [openPopoverId, setOpenPopoverId] = useState<Number | null>(null)

    

    const [searchParams] = useSearchParams()
    const customerName = searchParams.get('customer')

    const fetchDepartmentList = async () => {
        setLoading(true)
        try {
            const response = await departmentServices.getDepartmentList()
            const departments: Department[] = response?.departments || []
            const formatted = departments.map((item, index) => ({
                ...item,
                sr_no: index + 1,
            }))
            setDepartmentList(formatted)
            setOriginalDepartmentList(formatted)
        } catch (error) {
            CustomNotification.showErrorMessage(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchCustomerList = async () => {
        try {
            const response = await customerServices.apiGetCustomerList()
            const customers: Customer[] =
                response?.data || response?.customers || []
            setCustomerList(customers)
        } catch (error) {
            CustomNotification.showErrorMessage(error)
            setCustomerList([])
        }
    }

    const handleOpenCreateModal = async () => {
        setModalMode('create')
        setEditDepartmentId(null)
        await fetchCustomerList()

        let defaultCustomerId = null
        if (customerList.length === 1) {
            defaultCustomerId = customerList[0].id
        }

        setCurrentDepartment({
            id: null,
            customer_id: defaultCustomerId,
            name: '',
            description: '',
            is_active: true,
        })

        setIsModalVisible(true)
    }

    const handleOpenUpdateModal = async (department: Department) => {
        setModalMode('update')
        setEditDepartmentId(department.id)
        await fetchCustomerList()

        setCurrentDepartment({
            id: department.id,
            customer_id: department.customer_id,
            name: department.name,
            description: department.description,
            is_active: department.is_active,
        })

        setIsModalVisible(true)
    }

    const handleCloseModal = () => {
        setIsModalVisible(false)
        setEditDepartmentId(null)
    }

    const handleToggleStatus = async (departmentId: number) => {
        setLoading(true)
        try {
            await departmentServices.deactivateDepartment(departmentId)
            await fetchDepartmentList()
            CustomNotification.showSuccessMessage(
                'Knowledge base status updated successfully',
            )
        } catch (error) {
            CustomNotification.showErrorMessage(error)
        } finally {
            setLoading(false)
        }
    }

    const openPdfViewer = (url: string) => {
        setIframeLoading(true)
        setPdfUrl(url)
        setPdfModalVisible(true)
    }

    const closePdfViewer = () => {
        setPdfUrl(null)
        setIframeLoading(true)
        setPdfModalVisible(false)
    }

    const getFileNameFromPath = (filePath: string): string => {
        if (!filePath) return ''
        const cleanPath = filePath.split(/[?#]/)[0]
        return cleanPath.substring(cleanPath.lastIndexOf('/') + 1)
    }

    const getViewerUrl = (fileUrl: string): string => {
        const extension = fileUrl.split('.').pop()?.toLowerCase()
        const decodedUrl = decodeURIComponent(fileUrl)
        const encodedUrl = encodeURIComponent(decodedUrl)

        switch (extension) {
            case 'pdf':
            case 'txt':
                return decodedUrl
            case 'doc':
            case 'docx':
            case 'ppt':
            case 'pptx':
            case 'xls':
            case 'xlsx':
                return `https://docs.google.com/gview?url=${encodedUrl}&embedded=true`
            default:
                return decodedUrl
        }
    }

    const filteredDepartments = useMemo(() => {
        let list = [...departmentList]

        if (searchText) {
            list = list.filter((dept) =>
                dept.name?.toLowerCase().includes(searchText.toLowerCase()),
            )
        }

        if (filteredCustomerId !== null) {
            list = list.filter(
                (dept) => dept.customer_id === filteredCustomerId,
            )
        }

        if (filteredStatus !== null) {
            list = list.filter((dept) => dept.is_active === filteredStatus)
        }

        return list.map((dept, index) => ({
            ...dept,
            sr_no: index + 1,
        }))
    }, [departmentList, searchText, filteredCustomerId, filteredStatus])

    useEffect(() => {
        if (customerName && customerList.length > 0) {
            const matched = customerList.find(
                (cust) =>
                    cust.customer_name?.toLowerCase() ===
                    customerName.toLowerCase(),
            )
            if (matched) {
                setFilteredCustomerId(matched.id)
            }
        }
    }, [customerName, customerList])

    useEffect(() => {
        fetchDepartmentList()
        fetchCustomerList()
    }, [])

    return {
        // States
        loading,
        submitLoading,
        departmentList,
        customerList,
        isModalVisible,
        modalMode,
        currentDepartment,
        editDepartmentId,
        pdfModalVisible,
        pdfUrl,
        iframeLoading,
        pageSize,
        filteredDepartments,
        searchText,
        filteredCustomerId,
        filteredStatus,
        openPopoverId,

        // Setters
        setPageSize,
        setIframeLoading,
        setSearchText,
        setFilteredCustomerId,
        setFilteredStatus,
        setOpenPopoverId,

        // Handlers
        handleOpenCreateModal,
        handleOpenUpdateModal,
        handleToggleStatus,
        handleCloseModal,
        openPdfViewer,
        closePdfViewer,
        fetchDepartmentList,

        // Utils
        getFileNameFromPath,
        getViewerUrl,
    }
}

export default useDepartmentTable
