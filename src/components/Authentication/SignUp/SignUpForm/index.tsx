import { Input, Select, Spin, Switch, Form, Button } from 'antd'
import { SwapOutlined } from '@ant-design/icons'
import { useSignUpForm } from './index.hook'
import { General } from '@/utils/General'
import {
    mediaOptions,
    roleOptions,
} from '@/components/Authentication/SignUp/mockData'

const { Option } = Select

const SignUpForm = ({
    handleStep,
    setEmail,
}: {
    handleStep: () => void
    setEmail: (data: string) => void
}) => {
    const config = useSignUpForm()

    const handleSubmit = async (values: any) => {
        setEmail(values?.companyEmail ?? '')
        config.onSubmit(values, handleStep)
    }

    return (
        <Form layout="vertical" onFinish={handleSubmit} form={config.form}>
            <Form.Item
                className="my-2"
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter your name!' }]}
            >
                <Input placeholder="Enter name" />
            </Form.Item>

            <Form.Item
                className="my-2"
                label="Role"
                name="role"
                rules={[
                    { required: true, message: 'Please select your role!' },
                ]}
            >
                {config.isCustomRoleInput ? (
                    <Input
                        name="role"
                        placeholder="Enter role"
                        suffix={
                            <SwapOutlined
                                onClick={() =>
                                    config.handleSwitchToDropdown('role')
                                }
                                style={{ cursor: 'pointer' }}
                            />
                        }
                    />
                ) : (
                    <Select
                        className="custom"
                        allowClear
                        placeholder="Select one"
                        showSearch
                        onChange={(value) => config.handleChange('role', value)}
                        filterOption={General.searchFilterOnSelect}
                    >
                        {roleOptions?.map((role) => (
                            <Option key={role.label} value={role.label}>
                                {role.label}
                            </Option>
                        ))}
                        <Option key="other" value="other">
                            Other (Enter manually)
                        </Option>
                    </Select>
                )}
            </Form.Item>

            <Form.Item
                className="my-2"
                label="Brand Name"
                name="brand_name"
                rules={[
                    { required: true, message: 'Please enter the brand name!' },
                ]}
            >
                {config.isCustomBrandInput ? (
                    <Input
                        placeholder="Enter brand name"
                        name="brand_name"
                        suffix={
                            <SwapOutlined
                                onClick={() =>
                                    config.handleSwitchToDropdown('brand_name')
                                }
                                style={{ cursor: 'pointer' }}
                            />
                        }
                    />
                ) : (
                    <Select
                        className="custom"
                        allowClear
                        placeholder="Search and select brand"
                        showSearch
                        onSearch={config.fetchBrands}
                        loading={config.loading}
                        notFoundContent={
                            config.loading ? (
                                <Spin size="small" />
                            ) : (
                                'No results'
                            )
                        }
                        onChange={(value) =>
                            config.handleChange('brand_name', value)
                        }
                        filterOption={General.searchFilterOnSelect}
                    >
                        {config.options.map((option) => (
                            <Option key={option?.value} value={option?.value}>
                                {option?.label}
                            </Option>
                        ))}
                        <Option key="other" value="other">
                            Other (Enter manually)
                        </Option>
                    </Select>
                )}
            </Form.Item>

            <Form.Item
                className="my-2"
                label="Company Email Address"
                name="companyEmail"
                rules={[
                    {
                        required: true,
                        type: 'email',
                        message: 'Please enter a valid email!',
                    },
                ]}
            >
                <Input placeholder="Email" inputMode="email" />
            </Form.Item>

            <Form.Item
                className="my-4"
                label="How did you hear about us?"
                name="how_did_you_hear_about_us"
                rules={[
                    {
                        required: true,
                        message: 'Please select how you heard about us!',
                    },
                ]}
            >
                {config.isCustomMediaInput ? (
                    <Input
                        name="how_did_you_hear_about_us"
                        placeholder="Enter Media"
                        suffix={
                            <SwapOutlined
                                onClick={() =>
                                    config.handleSwitchToDropdown(
                                        'how_did_you_hear_about_us',
                                    )
                                }
                                style={{ cursor: 'pointer' }}
                            />
                        }
                    />
                ) : (
                    <Select
                        className="custom"
                        allowClear
                        placeholder="Select one"
                        onChange={(value) =>
                            config.handleChange(
                                'how_did_you_hear_about_us',
                                value,
                            )
                        }
                        showSearch
                        filterOption={General.searchFilterOnSelect}
                    >
                        {mediaOptions?.map((media) => (
                            <Option key={media.label} value={media.label}>
                                {media.label}
                            </Option>
                        ))}
                        <Option key="other" value="other">
                            Other (Enter manually)
                        </Option>
                    </Select>
                )}
            </Form.Item>

            <Form.Item className="my-2">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-black">
                            Subscribe to product update emails
                        </p>
                        <p className="text-xs">
                            Get the latest updates about features and product
                            updates.
                        </p>
                    </div>
                    <Switch />
                </div>
            </Form.Item>

            <Form.Item>
                <Button
                    block
                    htmlType="submit"
                    loading={config.saving}
                    className="rounded-full mt-2 bg-success"
                >
                    Continue
                </Button>
            </Form.Item>
        </Form>
    )
}

export default SignUpForm
