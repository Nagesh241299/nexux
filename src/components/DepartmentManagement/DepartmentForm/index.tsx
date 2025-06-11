import React from 'react'
import {
    Form,
    Input,
    Select,
    Divider,
    Button,
    Row,
    Col,
    Upload,
    message,
    Popconfirm,
} from 'antd'
import { DeleteOutlined, EyeOutlined, InboxOutlined } from '@ant-design/icons'
import useDepartmentForm from './index.hook'
import { useMainApp } from '@/components/App/index.hook'

const { TextArea } = Input
const { Option } = Select
const { Dragger } = Upload

interface DepartmentFormProps {
    departmentId: number | null
    onSuccess?: () => void
    isModalVisible: boolean
    customerList: any[]
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({
    departmentId,
    onSuccess,
    isModalVisible,
    customerList,
}) => {
    const { branding } = useMainApp()
    const primaryColor = branding?.primary_color

    const {
        form,
        loading,
        isEditMode,
        handleSubmit,
        existingDocuments,
        fileList,
        isCustomerSelectDisabled,
        beforeUpload,
        handleUploadChange,
        customRequest,
        handleDeleteExistingDocument,
        getViewerUrl
    } = useDepartmentForm(departmentId, onSuccess, isModalVisible, customerList, primaryColor)

   
    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="customer_id"
                        label="Customer"
                        rules={[
                            {
                                required: true,
                                message: 'Please select a customer',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select Customer"
                            showSearch
                            optionFilterProp="children"
                            disabled={isCustomerSelectDisabled}
                        >
                            {customerList.map((customer) => (
                                <Option key={customer.id} value={customer.id}>
                                    {customer.customer_name ||
                                        customer.name ||
                                        `Customer #${customer.id}`}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Knowledge Base Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Knowledge Base name',
                            },
                        ]}
                    >
                        <Input placeholder="Enter Knowlegde Base name" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={isEditMode ?24 : 12}>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Knowledge Base description',
                            },
                        ]}
                    >
                        <TextArea
                            placeholder="Enter Knowledge Base description"
                            style={{ height: 115, resize: 'none' }}
                        />
                    </Form.Item>
                </Col>
{!isEditMode &&
                <Col span={12}>
                    <Form.Item
                        name="documents"
                        label="Upload Documents"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                    >
                        <Dragger
                            name="file"
                            multiple
                            maxCount={3}
                            accept=".txt,.pdf,.docx,.xml,.json"
                            fileList={fileList}
                            beforeUpload={beforeUpload}
                            onChange={handleUploadChange}
                            customRequest={customRequest}
                            action="" // No actual upload
                        >
                            <InboxOutlined
                                style={{
                                    fontSize: 22,
                                    color: '#999',
                                    marginRight: 12,
                                }}
                            />
                            <div>
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
                            </div>
                        </Dragger>
                    </Form.Item>
                </Col>
}
            </Row>

          

            <Divider className="my-4" />

            <div className="flex justify-end gap-2">
                <Button htmlType="submit" type="primary" loading={loading}>
                    {isEditMode ? 'Update' : 'Create'} Knowledge Base
                </Button>
            </div>
        </Form>
    )
}

export default DepartmentForm
