import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import * as departmentServices from '@/services/DepartmentService'
import { CustomNotification } from '@/utils/CustomNotification'
import { apiDeleteDocument, updateDepartmentDocument, uploadDepartmentDocuments } from '@/services/DocumentServices.'

export function useDepartmentDocuments() {
    const { departmentId } = useParams<{ departmentId: string }>()
    const [loading, setLoading] = useState(false)
    const [documents, setDocuments] = useState<any[]>([])
    const [filteredDocs, setFilteredDocs] = useState<any[]>([])
    const [pdfModalVisible, setPdfModalVisible] = useState(false)
    const [pdfUrl, setPdfUrl] = useState<string | null>(null)
    const [iframeLoading, setIframeLoading] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined)
    const [dateRange, setDateRange] = useState<any[]>([])
    const [departmentName, setDepartmentName] = useState('')
    const [customerName, setCustomerName] = useState('')
    const [pageSize, setPageSize] = useState(10)
    const navigate = useNavigate()
    const [uploadModalVisible, setUploadModalVisible] = useState(false)
const [uploading, setUploading] = useState(false)
const [selectedFiles, setSelectedFiles] = useState<File[]>([])
const [editModalVisible, setEditModalVisible] = useState(false);
const [editingDocumentId, setEditingDocumentId] = useState<number | null>(null);
const [editSelectedFiles, setEditSelectedFiles] = useState<File[]>([]);
const [editUploading, setEditUploading] = useState(false);


const fetchDocs = async () => {
            setLoading(true)
            try {
                const res = await departmentServices.getDepartmentById(
                    Number(departmentId),
                )
                setDocuments(res.department.documents || [])
                setDepartmentName(res.department.name || '')
                setCustomerName(res.department.customer_name || '')
            } catch (err) {
                CustomNotification.showErrorMessage(err)
            } finally {
                setLoading(false)
            }
        }
    useEffect(() => {
        
        fetchDocs()
    }, [departmentId])

    useEffect(() => {
        let filtered = [...documents]
        if (searchText) {
            filtered = filtered.filter((doc) =>
                doc.file_path?.toLowerCase().includes(searchText.toLowerCase()),
            )
        }
        if (typeFilter) {
            filtered = filtered.filter((doc) => doc.file_type === typeFilter)
        }
        if (dateRange && dateRange.length === 2) {
            const [start, end] = dateRange
            filtered = filtered.filter((doc) => {
                const docDate = dayjs(doc.created_on)
                return (
                    docDate.isAfter(start, 'day') ||
                    (docDate.isSame(start, 'day') &&
                        (docDate.isBefore(end, 'day') ||
                            docDate.isSame(end, 'day')))
                )
            })
        }
        setFilteredDocs(filtered)
    }, [documents, searchText, typeFilter, dateRange])

    function getViewerUrl(fileUrl: string): string {
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

    const openPdfViewe = (url: string) => {
        setIframeLoading(true)
        setPdfUrl(url)
        setPdfModalVisible(true)
    }

    const closePdfViewer = () => {
        setPdfUrl(null)
        setPdfModalVisible(false)
        setIframeLoading(false)
    }

    const typeOptions = Array.from(
        new Set(documents.map((doc) => doc.file_type).filter(Boolean)),
    )

    
    const handleDocumentUpload = async ({
    departmentId,
    files,
    onSuccess,
    onError,
    setUploading,
    onComplete,
}: {
    departmentId: number
    files: File[]
    onSuccess: () => void
    onError: () => void
    setUploading: (uploading: boolean) => void
    onComplete?: () => void
}) => {
    if (!files.length) {
        CustomNotification.showErrorMessage('Please select at least one file.')
        onError()
        return
    }

    try {
        setUploading(true)
        const response = await uploadDepartmentDocuments(departmentId, files)
        CustomNotification.showSuccessMessage(response.message)
        fetchDocs()
        onSuccess()
    } catch (err) {
        CustomNotification.showErrorMessage(err)
        onError()
    } finally {
        setUploading(false)
        onComplete?.()
    }
}

const handleDeleteDocument = async (documentId: number) => {
  try {
   const response =  await apiDeleteDocument(documentId);
    CustomNotification.showSuccessMessage(response.message);
    fetchDocs();

  } catch (error: any) {
    CustomNotification.showErrorMessage(
      error
    );
  }
};


const handleDocumentUpdate = async () => {
  if (editingDocumentId === null) return;

  setEditUploading(true);
  try {
    const response =await updateDepartmentDocument(editingDocumentId, editSelectedFiles);
    CustomNotification.showSuccessMessage(response.message)
    setEditModalVisible(false);
        fetchDocs();

    setEditSelectedFiles([]);
  } catch (error) {
    CustomNotification.showErrorMessage(error)
  } finally {
    setEditUploading(false);
  }
};

    return {
        
        loading,
        documents,
        filteredDocs,
        pdfModalVisible,
        pdfUrl,
        iframeLoading,
        searchText,
        setSearchText,
        typeFilter,
        setTypeFilter,
        dateRange,
        setDateRange,
        departmentName,
        customerName,
        pageSize,
        setPageSize,
        navigate,
        getViewerUrl,
        openPdfViewe,
        closePdfViewer,
        typeOptions,
        setPdfUrl,
        setPdfModalVisible,
        setIframeLoading,
        uploadModalVisible,
        uploading,
        selectedFiles,
        setUploadModalVisible,
        setUploading,
        setSelectedFiles,
        handleDocumentUpload,
        departmentId,
        handleDeleteDocument,
         setEditingDocumentId,
      setEditSelectedFiles,
      setEditModalVisible,
      editSelectedFiles,
      editUploading,
    handleDocumentUpdate,
    editModalVisible,


    }
}
