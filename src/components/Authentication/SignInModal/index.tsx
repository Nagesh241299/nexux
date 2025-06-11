import { Modal, Form, Input, Typography, Button } from 'antd'
import { useSignInModal } from './index.hook'
import FormInputRules from '@/utils/FormInputRules'
import { RouteConstants } from '@/constants/RouteConstants'

const { Text } = Typography

const SignInModal = () => {
    const config = useSignInModal()

    return (
        <Modal
            title={null}
            open={config?.isModalOpen}
            footer={null}
            className="rounded-xl max-w-[650px]"
            centered
            onCancel={config.handleClose}
            maskClosable={false}
            width="35%"
        >
            <Form
                layout="vertical"
                className="p-7"
                onFinish={config.handleSubmit}
                form={config.form}
            >
                <div className="flex justify-center items-center text-2xl font-semibold mb-8">
                    Sign In
                </div>

                <Form.Item
                    label={false}
                    name="email_address"
                    rules={[
                        FormInputRules.requiredFieldInputRule('email'),
                        FormInputRules.EmailValidationRule(),
                    ]}
                >
                    <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item>
                    <Button
                        block
                        loading={config.saving}
                        className="mb-2 bg-[#00D47F] hover:bg-white"
                        htmlType="submit"
                    >
                        Request a magic link
                    </Button>
                    <Text type="secondary" className="text-xs text-center">
                        By using the Nexus.com dashboard, you accept our{' '}
                        <a href="#" className="underline">
                            terms and privacy
                        </a>
                        .
                    </Text>
                </Form.Item>

                <div className="mt-4 text-center">
                    <Text type="secondary">Don't have an account?</Text>
                    <a
                        href={RouteConstants.SIGN_UP}
                        className="ml-1 text-blue-600"
                    >
                        Sign Up
                    </a>
                </div>
            </Form>
        </Modal>
    )
}

export default SignInModal
