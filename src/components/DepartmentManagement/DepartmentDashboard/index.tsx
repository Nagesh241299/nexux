import React, { useState, useMemo } from 'react'
import {
    Table,
    Button,
    Tag,
    Modal,
    Input,
    Select,
    Tooltip,
    Popconfirm,
    Switch,
    Popover,
    Spin,
} from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { FaBuilding, FaFileLines } from 'react-icons/fa6'
import { TbPencil } from 'react-icons/tb'
import Card from '@/components/ui/Card'
import DepartmentForm from '../DepartmentForm'
import useDepartmentTable from './index.hook'
import { useNavigate } from 'react-router-dom'
import type { Key } from 'react'

const { Option } = Select

const DepartmentTable: React.FC = () => {
    const Navigate = useNavigate()
    const {
        getFileNameFromPath,
        loading,
        departmentList,
        customerList,
        isModalVisible,
        modalMode,
        currentDepartment,
        editDepartmentId,
        pdfModalVisible,
        pdfUrl,
        handleOpenCreateModal,
        handleOpenUpdateModal,
        handleToggleStatus,
        handleCloseModal,
        fetchDepartmentList,
        openPdfViewer,
        closePdfViewer,
        iframeLoading,
        setIframeLoading,
        pageSize,
        setPageSize,
        searchText,
        setSearchText,
        filteredCustomerId,
        setFilteredCustomerId,
        filteredStatus,
        setFilteredStatus,
    } = useDepartmentTable()

    // Filter departments based on search text, customer, and status
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

    const columns = [
        {
            title: (
                <span className=" text-gray-500 tracking-wide">SN</span>
            ),
            dataIndex: 'sr_no',
            key: 'sr_no',
            sorter: (a: any, b: any) => a.sr_no - b.sr_no,
            showSorterTooltip: false
        },
        {
            title: (
                <span className=" text-gray-500 tracking-wide">
                    Knowledge Base Name
                </span>
            ),
            dataIndex: 'name',
            key: 'name',
            sorter: (a: any, b: any) => a.name?.localeCompare(b.name),
            showSorterTooltip: false
        },
        {
            title: (
                <span className=" text-gray-500 tracking-wide">
                    Customer Name
                </span>
            ),
            dataIndex: 'customer_name',
            key: 'customer_name',
            sorter: (a: any, b: any) =>
                a.customer_name?.localeCompare(b.customer_name),
            showSorterTooltip: false
        },
        {
            title: (
                <span className=" text-gray-500 tracking-wide">
                    Description
                </span>
            ),
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: (
                <span className=" text-gray-500 tracking-wide text-center block">
                    Documents
                </span>
            ),
            key: 'documents',
            align: 'center' as const,
            render: (_: any, record: any) => {
                
                return (
                    <Tooltip title="Manage Documents" placement="top">
                        <Button
                            type="default"
                            size="small"
                            onClick={() =>
                                Navigate(`/departments/${record.id}/documents`)
                            }
                        >
                            {record.documents.length}{' '}
                            <FaFileLines className="text-primary ml-1" />
                        </Button>
                    </Tooltip>
                )
            },
        },
        {
            title: (
                <span className=" text-gray-500 tracking-wide text-center block">
                    Status
                </span>
            ),
            dataIndex: 'is_active',
            key: 'is_active',
            align: 'center' as const,
            filters: [
                { text: 'Active', value: true },
                { text: 'Inactive', value: false },
            ],
            onFilter: (value: boolean | Key, record: any) =>
                record.is_active === value,
            render: (isActive: boolean) => (
                <Tag
                    color={isActive ? 'green' : 'red'}
                    className="px-3 py-0.5 rounded-full text-xs font-medium text-white"
                >
                    {isActive ? 'Active' : 'Inactive'}
                </Tag>
            ),
        },
        {
            title: (
                <span className=" text-gray-500 tracking-wide text-center block">
                    Action
                </span>
            ),
            key: 'actions',
            align: 'center' as const,
            render: (_: any, record: any) => (
                <div className="flex items-center justify-center space-x-3">
                    <Tooltip title="Edit Knowledge Base">
                        <TbPencil
                            size={18}
                            className="text-primary cursor-pointer transition"
                            onClick={() => handleOpenUpdateModal(record)}
                        />
                    </Tooltip>
                    <Popconfirm
                        title={`Are you sure you want to ${record.is_active ? 'deactivate' : 'activate'} this Knowledge Base?`}
                        onConfirm={() => handleToggleStatus(record.id)}
                        okText="Yes"
                        cancelText="No"
                        icon={null}
                    >
                        <Tooltip title="Toggle Status">
                            <Switch
                                checked={record.is_active}
                                onChange={() => {}}
                                className={
                                    record.is_active
                                        ? 'bg-green-500 transition duration-200'
                                        : 'bg-red-500 transition duration-200'
                                }
                            />
                        </Tooltip>
                    </Popconfirm>
                </div>
            ),
        },
    ]

    const expandedRowRender = (record) => {
        const documents = record.documents || []

        if (documents.length === 0) {
            return <div className="text-gray-500">No documents available.</div>
        }

        return (
            <div className="space-y-2">
                {documents.map((doc, idx) => {
                    const fileUrl = doc.file_path.startsWith('http')
                        ? doc.file_path
                        : `http://localhost:5001/static/${doc.file_path}`

                    return (
                        <div
                            key={doc.id || idx}
                            className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200"
                        >
                            <div className="flex flex-col">
                                <span className="font-medium text-gray-700">
                                    {doc.file_name || `Document #${idx + 1}`}
                                </span>
                                <span className="text-xs text-gray-400">
                                    Type: {doc.file_type?.toUpperCase()}
                                </span>
                            </div>

                            <Button
                                type="link"
                                icon={<FaFileLines className="text-primary" />}
                                onClick={() =>
                                    openPdfViewer(getViewerUrl(fileUrl))
                                }
                            >
                                View
                            </Button>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className="min-h-screen py-8 px-4 md:px-10 bg-gray-50 dark:bg-black">
            <Card
                className="rounded-2xl shadow-sm border border-gray-200 bg-white"
                header={
                    <div className="flex flex-wrap justify-between items-center px-4 py-3 gap-2">
                        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            Knowledge Bases
                        </h3>

                        <div className="flex flex-wrap items-center gap-3">
                            {/* Search Input Group */}
                            <div className="flex items-center bg-gray-100 dark:bg-gray-600 rounded-md px-3 h-10 shadow-sm">
                                <Input
                                    placeholder="Quick search..."
                                    bordered={false}
                                    className='bg-transparent focus:outline-none w-48 text-sm dark:bg-gray-600 dark:text-gray-200 dark:placeholder-gray-100 dark:border-gray-600'
                                    value={searchText}
                                    onChange={(e) =>
                                        setSearchText(e.target.value)
                                    }
                                    allowClear
                                />
                                <SearchOutlined className="text-gray-500" />
                            </div>

                            <Select
                                placeholder="Filter by Customer"
                                
                                style={{ width: 200 }}
                                allowClear
                                showSearch
                                optionFilterProp="children"
                                onChange={(value) =>
                                    setFilteredCustomerId(value)
                                }
                            >
                                {customerList.map((customer) => (
                                    <Option
                                        key={customer.id}
                                        value={customer.id}
                                    >
                                        {customer.customer_name ||
                                            customer.customer_name ||
                                            `Customer #${customer.id}`}
                                    </Option>
                                ))}
                            </Select>

                            <Select
                                placeholder="Filter by Status"
                                style={{ width: 160 }}
                                allowClear
                                onChange={(value) => setFilteredStatus(value)}
                            >
                                <Option value={true}>Active</Option>
                                <Option value={false}>Inactive</Option>
                            </Select>

                            <Button
                                type="primary"
                                onClick={handleOpenCreateModal}
                            >
                                Add Knowledge Base
                            </Button>
                        </div>
                    </div>
                }
                bodyClassName="px-4 pb-6"
            >
                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={filteredDepartments}
                    rowKey={(record) => record.id.toString()}
                    pagination={{
                        pageSize,
                        showSizeChanger: filteredDepartments.length > 10,
                        pageSizeOptions: ['10', '20', '30', '40'],
                        onShowSizeChange: (current, size) => setPageSize(size),
                    }}
                    bordered={false}
                    className="rounded-lg"
                    // expandable={{
                    //     expandedRowRender,
                    //     rowExpandable: (record) =>
                    //         Array.isArray(record.documents) &&
                    //         record.documents.length > 0,
                    //     expandIconColumnIndex: -1,
                    // }}
                />

                {/* Department Form Modal */}
                <Modal
                    title={
                        <div className="text-lg font-semibold text-gray-700">
                            {modalMode === 'create'
                                ? 'Create Knowledge Base'
                                : 'Update Knowledge Base'}
                        </div>
                    }
                    open={isModalVisible}
                    onCancel={handleCloseModal}
                    footer={null}
                    width={700}
                    centered
                    destroyOnClose
                    modalRender={(modal) => (
                        <div className=" bg-white rounded-xl shadow-lg">
                            {modal}
                        </div>
                    )}
                >
                    <DepartmentForm
                        departmentId={editDepartmentId}
                        onSuccess={() => {
                            handleCloseModal()
                            fetchDepartmentList()
                        }}
                        isModalVisible={isModalVisible}
                        customerList={customerList}
                    />
                </Modal>

                {/* PDF Viewer Modal */}
                <Modal
                    open={pdfModalVisible}
                    onCancel={closePdfViewer}
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
                    {pdfUrl && (
                        <div className="relative h-full w-full">
                            {iframeLoading && (
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
                                src={config.getViewerUrl(config.pdfUrl)}
                                width="100%"
                                height="100%"
                                style={{
                                    border: 'none',
                                    minHeight: '80vh',
                                    maxHeight: '90vh',
                                    display: 'block',
                                }}
                                title="Document Viewer"
                                onLoad={() => setIframeLoading(false)}
                            />
                        </div>
                    )}
                </Modal>
            </Card>
        </div>
    )
}

export default DepartmentTable
