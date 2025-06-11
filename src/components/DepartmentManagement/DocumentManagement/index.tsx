import React from 'react'
import {
    Table,
    Button,
    Tooltip,
    Spin,
    Modal,
    Input,
    DatePicker,
    Select,
    Breadcrumb,
    Popconfirm,
    Form,
    Upload,
} from 'antd'
import {
    EyeOutlined,
    DownloadOutlined,
    SearchOutlined,
    DeleteOutlined,
    InboxOutlined,
} from '@ant-design/icons'
import { useDepartmentDocuments } from './index.hook'
import { CustomNotification } from '@/utils/CustomNotification'
import Card from '@/components/ui/Card'
import dayjs from 'dayjs'
import type { Key } from 'react'
import { uploadDepartmentDocuments } from '@/services/DocumentServices.'
import { BsPencil } from 'react-icons/bs'

const { RangePicker } = DatePicker
const { Option } = Select

const DepartmentDocuments: React.FC = () => {
    const config = useDepartmentDocuments()

    const { Dragger } = Upload
    const columns = [
        {
            title: 'SN',
            key: 'serial',
            sorter: (a: any, b: any) => a.id - b.id,
            render: (_: any, __: any, index: number) => index + 1,
            width: 80,
            showSorterTooltip: false,
        },
        {
            title: 'Document Name',
            dataIndex: 'file_path',
            key: 'file_path',
            sorter: (a: any, b: any) =>
                (a.file_path?.toLowerCase() || '').localeCompare(
                    b.file_path?.toLowerCase() || '',
                ),
            render: (file_path: string) => file_path.split('/').pop(),
            showSorterTooltip: false,
        },
        {
            title: 'Type',
            dataIndex: 'file_type',
            key: 'file_type',
            filters: config.typeOptions.map((type: string) => ({
                text: type?.toUpperCase(),
                value: type,
            })),

            onFilter: (value: boolean | Key, record: any) =>
                record.file_type === value,
            render: (type: string) => type?.toUpperCase(),
            width: 100,
        },
        {
            title: 'Uploaded On',
            dataIndex: 'created_on',
            key: 'created_on',
            showSorterTooltip: false,
            sorter: (a: any, b: any) =>
                new Date(a.created_on).getTime() -
                new Date(b.created_on).getTime(),
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }: {
                setSelectedKeys: (keys: any[]) => void
                selectedKeys: any[]
                confirm: () => void
                clearFilters?: () => void
            }) => (
                <div style={{ padding: 8 }}>
                    <RangePicker
                        value={selectedKeys[0] || []}
                        onChange={(dates) => {
                            setSelectedKeys(dates ? [dates] : [])
                        }}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={() => confirm()}
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Filter
                    </Button>
                    <Button
                        onClick={() => {
                            clearFilters && clearFilters()
                        }}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </div>
            ),
            onFilter: (value: any, record: any) => {
                if (!value || value.length !== 2) return true
                const [start, end] = value
                const docDate = dayjs(record.created_on)
                return (
                    (docDate.isAfter(start, 'day') ||
                        docDate.isSame(start, 'day')) &&
                    (docDate.isBefore(end, 'day') || docDate.isSame(end, 'day'))
                )
            },
            render: (date: string) => new Date(date).toLocaleString(),
            width: 180,
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 150,
            fixed: 'right',
            render: (_: any, record: any) => {
                const fileUrl = record.file_path.startsWith('http')
                    ? record.file_path
                    : `http://localhost:5001/static/${record.file_path}`
                return (
                    <div className="flex gap-2">
                        <Tooltip title="View">
                            <Button
                                type="link"
                                icon={<EyeOutlined />}
                                onClick={() => config.openPdfViewe(fileUrl)}
                            />
                        </Tooltip>
                        <Tooltip title="Edit">
                            <Button
                                type="link"
                                icon={<BsPencil />}
                                onClick={() => {
                                    config.setEditingDocumentId(record.id)
                                    config.setEditSelectedFiles([])
                                    config.setEditModalVisible(true)
                                }}
                            />
                        </Tooltip>

                        <Tooltip title="Download">
                            <Button
                                type="link"
                                icon={<DownloadOutlined />}
                                onClick={() => {
                                    const link = document.createElement('a')
                                    link.href = fileUrl
                                    link.download =
                                        record.file_path.split('/').pop() ||
                                        'document'
                                    document.body.appendChild(link)
                                    link.click()
                                    document.body.removeChild(link)
                                }}
                            />
                        </Tooltip>
                        <Popconfirm
                            title="Are you sure you want to delete this document?"
                            onConfirm={() =>
                                config.handleDeleteDocument(record.id)
                            } // <-- calling your function
                            onCancel={() => {}}
                            okText="Yes"
                            cancelText="No"
                            placement="topRight"
                        >
                            <Tooltip title="Delete">
                                <Button
                                    type="link"
                                    icon={
                                        <DeleteOutlined
                                            style={{
                                                color: 'red',
                                                cursor: 'pointer',
                                            }}
                                        />
                                    }
                                />
                            </Tooltip>
                        </Popconfirm>
                    </div>
                )
            },
        },
    ]

    return (
        <div className="bg-gray-100 dark:bg-black min-h-screen py-6 px-4 md:px-8">
            <Card
                className="rounded-xl shadow-md border border-gray-200 bg-white"
                header={
                    <div className="px-4 py-3 gap-2">
                        <div className="flex justify-between mb-2 border-b-1 w-full">
                            <h3 className="text-xl font-semibold text-gray-800 ">
                                Knowledge Base Documents
                            </h3>

                            <div className="flex items-center gap-2">
                                <Input
                                    placeholder="Search file name..."
                                    className="dark:bg-gray-600 dark:text-gray-200 dark:placeholder-gray-100 dark:border-gray-600"
                                    prefix={<SearchOutlined />}
                                    value={config.searchText}
                                    onChange={(e) =>
                                        config.setSearchText(e.target.value)
                                    }
                                    allowClear
                                    style={{ width: 220 }}
                                />
                                <Select
                                    allowClear
                                    placeholder="Filter by type"
                                    style={{ width: 140 }}
                                    value={config.typeFilter}
                                    onChange={config.setTypeFilter}
                                    className="dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500"
                                    dropdownClassName="dark-dropdown"
                                >
                                    {config.typeOptions.map((type: any) => (
                                        <Option key={type} value={type}>
                                            {type?.toUpperCase()}
                                        </Option>
                                    ))}
                                </Select>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        config.setUploadModalVisible(true)
                                    }}
                                >
                                    Add Document
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                            <div>
                                <Breadcrumb
                                    separator=">"
                                    className="text-sm text-gray-600 font-normal"
                                >
                                    <Breadcrumb.Item
                                        onClick={() =>
                                            config.navigate(
                                                '/department-management',
                                            )
                                        }
                                        className="hover:bg-gray-100 hover:font-semibold rounded-md px-2 py-1 cursor-pointer"
                                    >
                                        Knowledge Bases
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        {config.departmentName || 'Documents'}
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                        </div>
                    </div>
                }
            >
                <Spin spinning={config.loading}>
                    <Table
                        columns={columns}
                        dataSource={config.filteredDocs}
                        rowKey="id"
                        scroll={{ x: 800 }}
                        pagination={{
                            pageSize: config.pageSize,
                            showSizeChanger: config.documents.length > 10,
                            pageSizeOptions: ['10', '20', '30', '40'],
                            onShowSizeChange: (current, size) =>
                                config.setPageSize(size),
                        }}
                    />
                </Spin>
            </Card>
            {/* PDF Viewer Modal */}
            <Modal
                open={config.pdfModalVisible}
                onCancel={config.closePdfViewer}
                footer={null}
                width="90vw"
                style={{ top: 10, padding: 0, maxWidth: 'none' }}
                bodyStyle={{
                    padding: 0,
                    height: '80vh',
                    overflow: 'hidden',
                }}
                centered
                title="Document Preview"
                modalRender={(modal) => (
                    <div
                        className="bg-white rounded-lg"
                        style={{ height: '90vh', padding: 0 }}
                    >
                        {modal}
                    </div>
                )}
            >
                {config.pdfUrl && (
                    <div className="relative h-full w-full">
                        {config.iframeLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                                <div className="text-center">
                                    <Spin
                                        size="large"
                                        tip="Loading document..."
                                    />
                                </div>
                            </div>
                        )}
                        <iframe
                            key={config.pdfUrl}
                            src={config.getViewerUrl(config.pdfUrl) || ''}
                            width="100%"
                            height="100%"
                            style={{
                                border: 'none',
                                minHeight: '80vh',
                                maxHeight: '90vh',
                                display: 'block',
                            }}
                            title="Document Viewer"
                            onLoad={() => config.setIframeLoading(false)}
                        />
                    </div>
                )}
            </Modal>
            <Modal
                title="Upload Document"
                open={config.uploadModalVisible}
                onCancel={() => {
                    config.setUploadModalVisible(false)
                    config.setSelectedFiles([])
                }}
                onOk={() =>
                    config.handleDocumentUpload({
                        departmentId: config.departmentId,
                        files: config.selectedFiles,
                        setUploading: config.setUploading,
                        onSuccess: () => {
                            config.setUploadModalVisible(false)
                            config.setSelectedFiles([])
                        },
                    })
                }
                okText="Upload"
                okButtonProps={{ loading: config.uploading }}
            >
                <Form layout="vertical">
                    <Form.Item label="Select File(s)">
                        <Dragger
                            multiple
                            accept=".txt,.pdf,.docx,.xml,.json"
                            beforeUpload={(file) => {
                                // Prevent automatic upload
                                config.setSelectedFiles((prevFiles) => [
                                    ...prevFiles,
                                    file,
                                ])
                                return false
                            }}
                            fileList={config.selectedFiles}
                            onRemove={(file) => {
                                config.setSelectedFiles((prevFiles) =>
                                    prevFiles.filter((f) => f.uid !== file.uid),
                                )
                            }}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 13,
                                    color: '#595959',
                                }}
                            >
                                Click or drag files to upload
                            </p>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 11,
                                    color: '#999',
                                }}
                            >
                                .txt, .pdf, .docx, .xml, .json — Max 3 files
                            </p>
                        </Dragger>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Update Document"
                open={config.editModalVisible}
                onCancel={() => {
                    config.setEditModalVisible(false)
                    config.setEditSelectedFiles([])
                }}
                onOk={config.handleDocumentUpdate}
                okText="Update"
                okButtonProps={{ loading: config.editUploading }}
            >
                <Form layout="vertical">
                    <Form.Item label="Select New File(s)">
                        <Dragger
                            multiple
                            accept=".txt,.pdf,.docx,.xml,.json"
                            beforeUpload={(file) => {
                                config.setEditSelectedFiles((prevFiles) => [
                                    ...prevFiles,
                                    file,
                                ])
                                return false // Prevent auto upload
                            }}
                            fileList={config.editSelectedFiles}
                            onRemove={(file) => {
                                config.setEditSelectedFiles((prevFiles) =>
                                    prevFiles.filter((f) => f.uid !== file.uid),
                                )
                            }}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 13,
                                    color: '#595959',
                                }}
                            >
                                Click or drag files to upload
                            </p>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 11,
                                    color: '#999',
                                }}
                            >
                                .txt, .pdf, .docx, .xml, .json — Max 3 files
                            </p>
                        </Dragger>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default DepartmentDocuments
