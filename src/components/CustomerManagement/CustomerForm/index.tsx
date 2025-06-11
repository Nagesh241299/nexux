import React from 'react'
import { Form, Input, Button, Row, Col, Steps, message } from 'antd'
import { useCustomerForm } from './index.hook'
import Upload from 'antd/es/upload/Upload'

const { Step } = Steps

const CustomerForm = ({
    customerId,
    onSuccess,
    isModalVisible,
}: {
    customerId: number | null
    onSuccess?: () => void
    isModalVisible: boolean
}) => {
    const {
        form,
        isEditMode,
        currentStep,
        stepTitles,
        next,
        prev,
        handleFinish,
        getFieldsForStep,
        setCurrentStep,
    } = useCustomerForm(customerId, onSuccess, isModalVisible)

    return (
        <div className="w-full max-w-5xl px-4 py-6 bg-white dark:bg-gray-800  shadow rounded-lg">
            <Steps current={currentStep} className="mb-6 dark:text-gray-200">
                {stepTitles.map((title, index) => (
                    <Step key={index} title={title} className=' dark:text-gray-200' />
                ))}
            </Steps>

            <Form
                form={form}
                layout="vertical"
                initialValues={{ is_active: true }}
                onFinish={handleFinish}
            >
                {/* Step 0: User Info */}
                <div style={{ display: currentStep === 0 ? 'block' : 'none' }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Customer Name"
                                name="customer_name"
                                className='dark:text-gray-200 dark:placeholder:text-gray-400 '
                                rules={[
                                    {
                                        required: true,
                                        message: 'Customer name is required',
                                    },
                                    {
                                        min: 2,
                                        message:
                                            'Customer name must be at least 2 characters',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Contact Person"
                                name="contact_person"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Contact person is required',
                                    },
                                    {
                                        min: 2,
                                        message:
                                            'Contact person must be at least 2 characters',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
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
                        <Col span={12}>
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
                    </Row>
                </div>

                {/* Step 1: Address Info */}
                <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Address"
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Address is required',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="City"
                                name="city"
                                rules={[
                                    {
                                        required: true,
                                        message: 'City is required',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="State"
                                name="state"
                                rules={[
                                    {
                                        required: true,
                                        message: 'State is required',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Country"
                                name="country"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Country is required',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Pin Code"
                                name="pin_code"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Pin code is required',
                                    },
                                    {
                                        pattern: /^\d{6}$/,
                                        message:
                                            'Pin code must be exactly 6 digits',
                                    },
                                ]}
                            >
                                <Input
                                    maxLength={6}
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault()
                                        }
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>

                {/* Step 2: Theme Settings */}
                <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Header Text"
                                name="header_text"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Header text is required',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Footer Text"
                                name="footer_text"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Footer text is required',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                label="Primary Color"
                                name="primary_color"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Primary color is required',
                                    },
                                ]}
                            >
                                <Input type="color" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Secondary Color"
                                name="secondary_color"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Secondary color is required',
                                    },
                                ]}
                            >
                                <Input type="color" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Logo"
                                name="logo"
                                valuePropName="fileList"
                                getValueFromEvent={(e) => {
                                    if (Array.isArray(e)) return e
                                    return e?.fileList
                                }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Logo is required',
                                    },
                                ]}
                            >
                                <Upload
                                    beforeUpload={(file) => {
                                        const isJpgOrPng =
                                            file.type === 'image/jpeg' ||
                                            file.type === 'image/png' ||
                                            file.type === 'image/svg+xml' ||
                                            file.type === 'image/jpg'
                                        if (!isJpgOrPng) {
                                            message.error(
                                                'You can only upload JPG/PNG/SVG files!',
                                            )
                                            return Upload.LIST_IGNORE
                                        }
                                        return false // prevent automatic upload
                                    }}
                                    accept=".jpg,.jpeg,.png,.svg"
                                    maxCount={1}
                                    listType="picture"
                                >
                                    <Button>Browse and Upload Logo</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>

                <div className="flex justify-between mt-6">
                    {currentStep > 0 && (
                        <Button onClick={prev}>Previous</Button>
                    )}
                    {currentStep < stepTitles.length - 1 && (
                        <Button type="primary" onClick={next}>
                            Next
                        </Button>
                    )}
                    {currentStep === stepTitles.length - 1 && (
                        <Button type="primary" htmlType="submit">
                            {isEditMode ? 'Update' : 'Save'} Customer
                        </Button>
                    )}
                </div>
            </Form>
        </div>
    )
}

export default CustomerForm
