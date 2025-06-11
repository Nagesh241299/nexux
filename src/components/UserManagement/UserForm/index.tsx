import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Row, Col, Select } from 'antd'
import { useUserForm } from './index.hook'

const { Option } = Select

const UserForm = ({ userId, onClose, onSuccess, form }: any) => {
    const config = useUserForm(userId, onClose, onSuccess)

   

    return (
        // <div className="w-full">
        //     <div className="flex justify-center items-center px-6 pt-4 pb-2">
                <Form
                    form={config.form}
                    onFinish={config.handleSubmit}
                    layout="vertical"
                    initialValues={{ is_active: true }}
                    className="space-y-4 w-full"
                >
                    <Row gutter={16}>
                        {/* First Name */}
                        <Col span={8}>
                            <Form.Item
                                label="First Name"
                                name="first_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter the first name',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        {/* Last Name */}
                        <Col span={8}>
                            <Form.Item
                                label="Last Name"
                                name="last_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter the last name',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        {/* Email */}
                        <Col span={8}>
                            <Form.Item
                                label="Email Address"
                                name="email_address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Email is required',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Enter a valid email address',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        {/* Mobile */}
                        <Col span={8}>
                            <Form.Item
                                label="Mobile Number"
                                name="mobile_number"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Mobile number is required',
                                    },
                                    {
                                        pattern: /^\d{10}$/,
                                        message:
                                            'Enter a valid 10-digit mobile number',
                                    },
                                ]}
                            >
                                <Input
                                    maxLength={10}
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault()
                                        }
                                    }}
                                />
                            </Form.Item>
                        </Col>

                        {/* Role */}
                        <Col span={8}>
                            <Form.Item
                                label="Role"
                                name="role"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select a role',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select role"
                                    disabled={
                                        config.isSuperAdminUser ||
                                        config.disableRoleSelect
                                    }
                                >
                                    {config.roles.map((role) => (
                                        <Option
                                            key={role.value}
                                            value={role.value}
                                        >
                                            {role.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        {/* Customer */}
                        <Col span={8}>
                            <Form.Item
                                label="Customer"
                                name="customer_id"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select a customer',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select customer"
                                    onSelect={config.handleCustomerChange}
                                    disabled={
                                        config.isSuperAdminUser ||
                                        config.disableCustomerSelect
                                    }
                                >
                                    {config.customers.map((customer) => (
                                        <Option
                                            key={customer.value}
                                            value={customer.value}
                                        >
                                            {customer.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Department Selection */}
                    {config.selectedCustomerId &&
                        config.departments.length > 0 && (
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item
                                        label="Knowledge Bases"
                                        name="department_id"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please select at least one department',
                                            },
                                        ]}
                                    >
                                        <Select
                                            mode="multiple"
                                            placeholder="Select Knowledge Bases"
                                            options={config.departments}
                                            disabled={config.isSuperAdminUser}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        )}

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            {userId !== null ? 'Update' : 'Save'} User
                        </Button>
                    </Form.Item>
                </Form>
        //     </div>
        // </div>
    )
}

export default UserForm
