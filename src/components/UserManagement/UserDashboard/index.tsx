import { useState } from 'react'
import { Table, Tag, Tooltip, Modal, Input, Popconfirm, Switch } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { TbPencil, TbUserPlus } from 'react-icons/tb'
import { useUserTable } from './index.hook'
import { User } from '@/shared/types/user'
import Card from '@/components/ui/Card'
import Button from '@/components/common/Button'
import UserForm from '../UserForm'

const UserDashboard = () => {
    const config = useUserTable()


    const columns: ColumnsType<User> = [
        {
            title: (
                <span className="text-gray-500 tracking-wide">
                    SN
                </span>
            ),
            key: 'serial',
            dataIndex: 'serial',
            align: 'center',
            sorter: (a, b) => {
                // Use id as fallback if no index is available
                return (a.id || 0) - (b.id || 0)
            },
            render: (_: any, __: any, index: number) => index + 1,
            showSorterTooltip: false
        },
        {
        title: (
            <span className=" text-gray-500 tracking-wide">
                Name
            </span>
        ),
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) =>
            (`${a.first_name} ${a.last_name}`).localeCompare(`${b.first_name} ${b.last_name}`),
        render: (_, record) =>  <span className="">{`${record.first_name} ${record.last_name}`}</span>,
        showSorterTooltip: false
    },
    {
        title: (
                            <span className=" text-gray-500 tracking-wide">
                                    Role
                            </span>
                    ),
                    dataIndex: 'role',
                    key: 'role',
                    filters: Array.from(
                            new Set(config.users.map((user) => user.role_name).filter(Boolean))
                    ).map((role) => ({
                            text: role,
                            value: role,
                    })),
                    onFilter: (value, record) => record.role_name === value,
                    render: (_, record) => <span className='font-bold'>{record.role_name || '—'}</span>
            },
    {
        title: (
            <span className=" text-gray-500 tracking-wide">
                Customer name
            </span>
        ),
        dataIndex: 'customer_name',
        key: 'customer_name',
        render: (_, record) => record.customer_name || '—',
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
            sorter: (a: any, b: any) =>
                a.email_address.localeCompare(b.email_address),
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
            sorter: (a: any, b: any) =>
                a.mobile_number.localeCompare(b.mobile_number),
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
                    className="px-3 py-0.5 rounded-full text-xs font-medium text-white"
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

                <Tooltip title="Edit User">
                    <TbPencil
                        size={18}
                        className="text-primary cursor-pointer transition duration-200"
                        onClick={() => config.handleEdit(record.id)}
                    />
                </Tooltip>
                <Popconfirm
                        title={`Are you sure you want to ${record.is_active ? 'deactivate' : 'activate'} this customer?`}
                        onConfirm={() => config.handleDeleteUser(record.id)}
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
                  Users
                </h3>

                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-gray-100 dark:bg-gray-500 rounded-md px-3 h-10 shadow-sm">
                    <Input
                      placeholder="Quick search..."
                      bordered={false}
                      className="bg-transparent focus:outline-none w-50 "
                      value={config.searchText}
                      onChange={(e) => config.setSearchText(e.target.value)}
                      allowClear
                    />
                    <SearchOutlined className="text-gray-500" />
                  </div>

                  {/* Add User Button */}
                  <Button
                    variant="solid"
                    size="md"
                    shape="round"
                    onClick={config.handleAddUser}
                    className="h-10 px-4 flex items-center gap-2 text-sm font-medium bg-primary hover:bg-secondary text-white"
                  >
                    Add User
                  </Button>
                </div>
              </div>
            }
            bodyClassName="px-4 pb-6"
          >
        
                <Table
                    className="rounded-lg "
                    scroll={{ x: '' }}
                    columns={columns}
                    dataSource={config.filteredData}
                    loading={config.loading}
                    rowKey="id"
                    bordered={false}
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
                            {config.editUserId ? 'Edit User' : 'Add User'}
                        </div>
                    }
                open={config.isModalVisible}
                onCancel={config.handleModalClose}
                footer={null}
                width={700}
                modalRender={(modal) => (
                    <div className="bg-white rounded-xl shadow-lg">
                        {modal}
                    </div>
                )}
            >
                <UserForm
                    userId={config.editUserId}
                    onClose={config.handleModalClose}
                    onSuccess={config.fetchUsers}
                />
            </Modal>
        </div>
    )
}

export default UserDashboard
