import { useState } from 'react'
import { Table, Tag, Tooltip, Popconfirm, Switch, Modal, Input } from 'antd'
import { FaReact } from 'react-icons/fa' // React icon
import type { ColumnsType } from 'antd/es/table'
import { BsTrash } from 'react-icons/bs'
import { HiPlus } from 'react-icons/hi'
import { TbPencil } from 'react-icons/tb'
import { SearchOutlined } from '@ant-design/icons'
import { Customer } from '@/shared/types/customer'
import { useCustomerTable } from './index.hook'
import Card from '@/components/ui/Card'
import Button from '@/components/common/Button'
import CustomerForm from '../CustomerForm'
import { FaUser } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

const CustomerDashboard = () => {
    const config = useCustomerTable()
    const navigate = useNavigate()


  

    const columns: ColumnsType<Customer> = [
         {
            title: (
                <span className=" text-gray-500 tracking-wide">
                    SN
                </span>
            ),
            key: 'serial',
            dataIndex: 'serial',
            align: 'center',
            sorter: (a, b) => {
                return (a.id || 0) - (b.id || 0)
            },
            render: (_: any, __: any, index: number) => index + 1,
            showSorterTooltip: false
        },
        {
            title: (
                <span className="text-base  uppercase text-gray-500 tracking-wide text-center block">
                    Logo
                </span>
            ),
            dataIndex: 'logo_url',
            key: 'logo_url',
            align: 'center',
            render: (logo_url: string) => (
                <img
                    src={logo_url}
                    alt="Customer Logo"
                    className="w-10 h-10 object-contain rounded"
                />
            ),
        },
        {
            title: (
                <span className=" text-gray-500 tracking-wide">
                    Customer Name
                </span>
            ),
            dataIndex: 'customer_name',
            key: 'customer_name',
            sorter: (a, b) => a.customer_name.localeCompare(b.customer_name),
            render: (name: string) => (
                <span className="font-bold">{name}</span>
            ),
            showSorterTooltip: false
        },
        {
    title: (
        <span className=" text-gray-500 tracking-wide">
            Knowledge Base Count
        </span>
    ),
    dataIndex: 'knowledge_base_count',
    key: 'knowledge_base_count',
    responsive: ['md'],
    sorter: (a, b) => a.knowledge_base_count,
    align:'center',
    render: (count: number, record: Customer) => (
        <span
            className="text-primary font-bold cursor-pointer"
            onClick={() => navigate(`/department-management?customer=${encodeURIComponent(record.customer_name)}`)}
        >
            {count}
        </span>
    ),
    showSorterTooltip: false
},

        {
            title: (
                <span className=" text-gray-500 tracking-wide">
                    Users Count
                </span>
            ),
            dataIndex: 'user_count',
            key: 'user_count',
            responsive: ['md'],
            sorter: (a, b) => a.user_count,
                align:'center',
                render: (count: number, record: Customer) => (
        <span
            className="text-primary font-bold cursor-pointer"
            onClick={() => navigate(`/user-management?customer=${encodeURIComponent(record.customer_name)}`)}
        >
            {count}
        </span>
    ),
    showSorterTooltip: false

        },
         
        {
            title: (
                <span className=" text-gray-500 tracking-wide">
                    Contact Person
                </span>
            ),
            dataIndex: 'contact_person',
            key: 'contact_person',
            responsive: ['md'],
            sorter: (a, b) => a.contact_person.localeCompare(b.contact_person),
            showSorterTooltip: false
        },
        {
            title: (
                <span className=" text-gray-500 tracking-wide">
                    Email
                </span>
            ),
            dataIndex: 'email_address',
            key: 'email_address',
            responsive: ['md'],
            sorter: (a, b) => a.email_address.localeCompare(b.email_address),
            showSorterTooltip: false
        },
        {
            title: (
                <span className=" text-gray-500 tracking-wide">
                    Phone
                </span>
            ),
            dataIndex: 'mobile_number',
            key: 'mobile_number',
            responsive: ['md'],
            sorter: (a, b) => a.mobile_number.localeCompare(b.mobile_number),
            showSorterTooltip: false
        },
       
        {
            title: (
                <span className=" text-gray-500 tracking-wide text-center block">
                    Status
                </span>
            ),
            key: 'is_active',
            align: 'center',
            filters: [
                { text: 'Active', value: true },
                { text: 'Inactive', value: false },
            ],
            onFilter: (value, record) => record.is_active === value,
            render: (_, record) => (
                <Tag
                    color={record.is_active ? 'green' : 'red'}
                    className="px-3 py-0.5 rounded-full text-sm font-medium text-white"
                >
                    {record.is_active ? 'Active' : 'Inactive'}
                </Tag>
            ),
        },
        {
            title: (
                <span className=" text-gray-500 tracking-wide text-center block">
                    Action
                </span>
            ),
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <div className="flex justify-center items-center gap-4">
                    <Tooltip title="Edit Customer">
                        <TbPencil
                            size={18}
                            className=" text-primary cursor-pointer transition"
                            onClick={() => config.handleEdit(record.id)}
                        />
                    </Tooltip>

                    <Popconfirm
                        title={`Are you sure you want to ${record.is_active ? 'deactivate' : 'activate'} this customer?`}
                        onConfirm={() => config.handleDeleteCustomer(record.id)}
                        okText="Yes"
                        cancelText="No"
                        icon={null}
                    >
                        <Tooltip title="Toggle Status">
                            <Switch
                                checked={record.is_active}
                                onChange={() => {}}
                                className={`${
                                    record.is_active
                                        ? 'bg-green-500'
                                        : 'bg-red-500'
                                } transition duration-200`}
                            />
                        </Tooltip>
                    </Popconfirm>
                </div>
            ),
        },
    ]

    return (
        <div className="min-h-screen py-8 px-4 md:px-10 bg-gray-50 dark:bg-black">
            <Card
                className="rounded-2xl shadow-sm border border-gray-200 bg-white"
                header={
                    <div className="flex flex-wrap justify-between items-center px-4 py-3 gap-2">
                        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            Customers
                        </h3>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center bg-gray-100 dark:bg-gray-600 rounded-md px-3 h-10 shadow-sm">
                                <Input
                                    placeholder="Quick search..."
                                    className='bg-transparent focus:outline-none w-48 text-sm dark:bg-gray-600 dark:text-gray-200 dark:placeholder-gray-100 dark:border-gray-600'
                                    bordered={false}
                                    
                                    value={config.searchText}
                                    onChange={(e) =>
                                        config.setSearchText(e.target.value)
                                    }
                                    allowClear
                                />
                                <SearchOutlined className="text-gray-500" />
                            </div>

                            <Button
                                variant="solid"
                                size="md"
                                shape="round"
                                onClick={config.handleAddCustomer}
                                className="h-10 px-4 flex items-center gap-2 text-sm font-medium bg-primary hover:bg-secondary text-white"
                            >
                                Add Customer
                            </Button>
                        </div>
                    </div>
                }
                bodyClassName="px-4 pb-6"
            >
                <Table
                    className="rounded-lg w-max-content dark:bg-gray-800"
                    columns={columns}
                    dataSource={config.filteredData}
                    loading={config.loading}
                    rowKey="id"
                    bordered={false}
                    scroll={{ x: '' }}
                    pagination={{
                        pageSize: config.pageSize,
                        showSizeChanger: config.filteredData.length > 10,
                        pageSizeOptions: ['10', '20', '30', '40'],
                        onShowSizeChange: (current, size) => config.setPageSize(size),
                    }}
                />
            </Card>

            <Modal
                title={
                    <div className="text-lg font-semibold text-gray-700">
                        {config.editCustomerId
                            ? 'Edit Customer'
                            : 'Add Customer'}
                    </div>
                }
                className='dark:bg-gray-800 dark:text-gray-200'
                open={config.isModalVisible}
                onCancel={config.handleModalClose}
                footer={null}
                width={800}
                centered
                modalRender={(modal) => (
                    <div className=" bg-white rounded-xl shadow-lg">
                        {modal}
                    </div>
                )}
            >
                <CustomerForm
isModalVisible={config.isModalVisible}
                    customerId={config.editCustomerId}
                    resetStep = {config.resetFormStep}
                    onSuccess={() => {
                        config.handleModalClose()
                        config.fetchCustomers()
                    }}
                />
            </Modal>
        </div>
    )
}

export default CustomerDashboard
