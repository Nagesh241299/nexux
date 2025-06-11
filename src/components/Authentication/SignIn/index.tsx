import { Form, Input, Button } from 'antd'
import ActionLink from '@/components/common/ActionLink'
import CommonModal from '@/components/common/CommonModal'
import FormInputRules from '@/utils/FormInputRules'
import { useSignIn } from '@/components/Authentication/SignIn/index.hook'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RouteConstants } from '@/constants/RouteConstants'

const SignIn = () => {
  const config = useSignIn()
  const navigate = useNavigate()

  useEffect(() => {
    if (config.isFirstTimeLogin) {
      navigate(RouteConstants.RESET_PASSWORD)
    }
  }, [config.isFirstTimeLogin, navigate])

  return (
    <>
      <div className="grid grid-cols-2 max-md:grid-cols-1 h-full mx-[10%] gap-8">
        {/* Form Panel */}
        <div className="flex justify-center items-center max-md:order-1">
            <div className="w-full max-w-md bg-white rounded-lg border p-8 shadow">
            <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
            <p className="text-gray-600 mb-6">
                Log in to Nexus Bot Framework and create your customized chatbot in seconds.
            </p>

            <Form
                layout="vertical"
                form={config.form}
                onFinish={config.handleSubmit}
            >
                <Form.Item
                label="Email Address"
                name="email_address"
                rules={[
                    FormInputRules.requiredFieldInputRule('email'),
                    FormInputRules.EmailValidationRule(),
                ]}
                >
                <Input placeholder="you@example.com" inputMode="email" />
                </Form.Item>

                <Form.Item
                label="Password"
                name="password"
                rules={[
                    FormInputRules.requiredFieldInputRule('password'),
                    { min: 8, message: 'Must be at least 8 characters' },
                ]}
                >
                <Input.Password placeholder="••••••••" />
                </Form.Item>

                <Button
                block
                htmlType="submit"
                loading={config.saving}
                className="bg-blue-500 mb-4"
                >
                Log In
                </Button>

                <p className="text-sm text-gray-500">
                By logging in, you agree to our{' '}
                <span className="underline cursor-pointer">Terms & Privacy</span>.
                </p>
            </Form>
            </div>
        </div>

        {/* Feature Panel */}
        <div className="flex justify-center items-center max-md:order-1">
            <div className="bg-white-50 rounded-lg p-8 w-full max-w-sm border p-8 shadow">
            <h3 className="text-xl font-bold mb-4">Why <span className='text-blue-500'>Nexus</span>?</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>AI‑powered chatbot builder</li>
                <li>Customize conversation flows</li>
                <li>Integrate your own data</li>
                <li>Deploy in minutes</li>
            </ul>
            </div>
        </div>
        </div>

      {/* Modals */}
      <CommonModal
        resetModal={config.handleUserActiveOk}
        showModal={!config.isUserActive}
        modalMessage="Due to inactivity, your session expired. Please log in again."
        title="Session Expired"
      />
      <CommonModal
        resetModal={config.handleTokenExpiredOk}
        showModal={config.isTokenExpired}
        modalMessage="Your session expired. Please log in and try again."
        title="Session Expired"
      />
    </>
  )
}

export default SignIn
