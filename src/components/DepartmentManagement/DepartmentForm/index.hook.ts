import { useState, useEffect } from 'react'
import { Form, Modal } from 'antd'
import * as departmentServices from '@/services/DepartmentService'
import { CustomNotification } from '@/utils/CustomNotification'

export const useDepartmentForm = (
    departmentId: number | null,
    onSuccess?: () => void,
    isModalVisible?: boolean,
    customerList: any[] = [],
    primaryColor?: string,
) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const isEditMode = Boolean(departmentId)
    const [existingDocuments, setExistingDocuments] = useState<any[]>([])
    const [deletedDocuments, setDeletedDocuments] = useState<any[]>([])

    const [fileList, setFileList] = useState<any[]>([])
    const [isCustomerSelectDisabled, setCustomerSelectDisabled] = useState(false)

    useEffect(() => {
        form.resetFields()
        if (isEditMode && departmentId) {
            const fetchDepartment = async () => {
                setLoading(true)
                try {
                    const response = await departmentServices.getDepartmentById(Number(departmentId))
                    const departmentData = response.department
                    form.setFieldsValue({
                        customer_id: departmentData.customer_id,
                        name: departmentData.name,
                        description: departmentData.description,
                        is_active: departmentData.is_active,
                    })
                    setExistingDocuments(departmentData.documents || [])
                    setFileList([]) 
                    setDeletedDocuments([])
                } catch (error) {
                    CustomNotification.showErrorMessage(error)
                } finally {
                    setLoading(false)
                }
            }
            fetchDepartment()
        }
    }, [isEditMode, departmentId, form])

    useEffect(() => {
        if (isModalVisible) {
            form.resetFields()
            setFileList([])
            setExistingDocuments([])
            setDeletedDocuments([])
        }
    }, [isModalVisible, departmentId, form])

    useEffect(() => {
        if (customerList.length === 1) {
            const onlyCustomer = customerList[0]
            form.setFieldsValue({ customer_id: onlyCustomer.id })
            setCustomerSelectDisabled(true)
        } else {
            setCustomerSelectDisabled(false)
        }
    }, [customerList, form])

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
                return `https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}`
            default:
                return decodedUrl
        }
    }

    const beforeUpload = (file: any) => {
        const filename = file.name
        const existingFilenames = existingDocuments.map(
            (doc) => doc.file_path.split('/').pop(),
        )

        if (existingFilenames.includes(filename)) {
            return new Promise((resolve, reject) => {
                Modal.confirm({
                    content: `The file "${filename}" already exists. Do you want to replace it?`,
                    okText: 'Replace',
                    cancelText: 'Cancel',
                    icon: null,
                    onOk() {
                        resolve(true) 
                    },
                   
                    okButtonProps: {
                        style: {
                            backgroundColor: primaryColor,
                            borderColor: primaryColor,
                        },
                    },
                    cancelButtonProps: {
                        style: {
                            borderColor: primaryColor,
                            color: primaryColor,
                        },
                    },
                })
            })
        }

        return true 
    }

    const handleUploadChange = ({ fileList: newFileList }: any) => {
        setFileList(newFileList)
    }

    const customRequest = ({ onSuccess }: any) => {
        setTimeout(() => {
            onSuccess?.('ok')
        }, 0)
    }

    const handleDeleteExistingDocument = (doc: any) => {
        setDeletedDocuments((prev) => {
            if (!prev.some((d) => d.file_path === doc.file_path)) {
                return [...prev, doc]
            }
            return prev
        })

        setExistingDocuments((prev) =>
            prev.filter((d) => d.file_path !== doc.file_path),
        )
    }

    const handleSubmit = async (values: any) => {
        setLoading(true)
        try {
            const departmentData = {
                name: values.name,
                description: values.description || '',
                is_active: true,
                customer_id: values.customer_id,
            }

            const files: File[] = []
            if (values.documents?.length) {
                values.documents.slice(0, 3).forEach((file: any) => {
                    if (file.originFileObj) {
                        files.push(file.originFileObj)
                    }
                })
            }

            const fileOperations: any[] = []

            const existingFilenames = new Set(
                existingDocuments.map(doc => doc.file_path.split('/').pop())
            )

            const deletedFilenames = new Set(
                deletedDocuments.map(doc => doc.file_path.split('/').pop())
            )

            const uploadedFilenames = new Set(files.map(file => file.name))

            existingDocuments.forEach(doc => {
                const filename = doc.file_path.split('/').pop()
                if (!deletedFilenames.has(filename) && !uploadedFilenames.has(filename)) {
                    fileOperations.push({
                        filename,
                        is_add: false,
                        is_updated: false,
                        is_deleted: false,
                    })
                }
            })

            deletedFilenames.forEach(filename => {
                fileOperations.push({
                    filename,
                    is_add: false,
                    is_updated: false,
                    is_deleted: true,
                })
            })

            // Add uploaded files: updated or new
            files.forEach(file => {
                const filename = file.name
                if (existingFilenames.has(filename)) {
                    fileOperations.push({
                        filename,
                        is_add: false,
                        is_updated: true,
                        is_deleted: false,
                    })
                } else {
                    fileOperations.push({
                        filename,
                        is_add: true,
                        is_updated: false,
                        is_deleted: false,
                    })
                }
            })

            if (isEditMode && departmentId) {
                await departmentServices.updateDepartment(
                    departmentId,
                    departmentData,
                )
                CustomNotification.showSuccessMessage('Knowledge base updated successfully')
            } else {
                await departmentServices.createDepartment(
                    departmentData,
                    files.length > 0 ? files : undefined
                )
                CustomNotification.showSuccessMessage('Knowlwdge base created successfully')
            }

            if (onSuccess) {
                onSuccess()
                form.resetFields()
                setFileList([])
                setExistingDocuments([])
                setDeletedDocuments([])
            }
        } catch (error) {
            CustomNotification.showErrorMessage(error)
        } finally {
            setLoading(false)
        }
    }

    return {
        form,
        loading,
        isEditMode,
        handleSubmit,
        existingDocuments,
        setExistingDocuments,
        deletedDocuments,
        setDeletedDocuments,
        fileList,
        setFileList,
        isCustomerSelectDisabled,
        beforeUpload,
        handleUploadChange,
        customRequest,
        handleDeleteExistingDocument,
        getViewerUrl
    }
}

export default useDepartmentForm
