import { Button, Form, Input } from 'antd'
import CommonModal from '@/components/common/CommonModal'
import FormInputRules from '@/utils/FormInputRules'
import { useResetPassword } from '@/components/Authentication/ChangePassword/index.hook'

const ResetPassword = () => {
  const {
    form,
    saving,
    isResetSuccessful,
    errorMessage,
    emailAddress,
    handleSubmit,
    handleSuccessOk,
    handleErrorOk
  } = useResetPassword()

  return (
    <>
      <div className="grid grid-cols-2 max-md:grid-cols-1 h-full mx-[10%] gap-8">
        {/* Form Panel */}
        <div className="flex justify-center items-center max-md:order-1">
          <div className="w-full max-w-md bg-white rounded-lg border p-8 shadow">
            <h2 className="text-2xl font-bold mb-2">Welcome to Nexus!</h2>
            <p className="text-gray-600 mb-6">
              Since this is your first time logging in, please set a secure password for your account.
            </p>

            <Form layout="vertical" onFinish={handleSubmit} form={form}>
              {/* Email Field (Disabled) */}
              {/* <Form.Item
                label="Email Address"
                name="email_address"
                initialValue={emailAddress}
              >
                <Input disabled placeholder="Email Address" />
              </Form.Item> */}

              {/* Current Password Field */}
              {/* <Form.Item
                label="Current Password"
                name="current_password"
                rules={[FormInputRules.requiredFieldInputRule('current password')]}
              >
                <Input.Password placeholder="Current Password" />
              </Form.Item> */}

              {/* New Password Field */}
              <Form.Item
                label="New Password"
                name="new_password"
                rules={[
                  FormInputRules.requiredFieldInputRule('new password'),
                  { min: 8, message: 'Password must be at least 8 characters' },
                  {
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      'Must include uppercase, lowercase, number, and special character',
                  },
                ]}
              >
                <Input.Password placeholder="New Password" />
              </Form.Item>

              {/* Confirm Password Field */}
              <Form.Item
                label="Confirm Password"
                name="confirm_password"
                dependencies={['new_password']}
                rules={[
                  FormInputRules.requiredFieldInputRule('password confirmation'),
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('new_password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('Passwords do not match'))
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>

              <Button
                block
                loading={saving}
                htmlType="submit"
                className="bg-blue-500 mb-4"
              >
                Set Password
              </Button>

              <div className="flex justify-between text-sm text-gray-500">
                <span>
                  By using the Nexus.ai dashboard, you agree to our{' '}
                  <span className="underline cursor-pointer">terms and privacy</span>.
                </span>
              </div>
            </Form>
          </div>
        </div>

        {/* Feature Panel */}
        <div className="flex justify-center items-center max-md:order-2">
          <div className="bg-white rounded-lg w-full max-w-sm border p-8 shadow">
            <h3 className="text-xl font-bold mb-4"><span className='text-blue-500'>Nexus</span> Bot Framework</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Secure account setup</li>
              <li>Get started in seconds</li>
              <li>AI-powered chat tools</li>
              <li>Full control of your bots</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <CommonModal
        resetModal={handleSuccessOk}
        showModal={isResetSuccessful}
        modalMessage="Your password has been set successfully. You can now use the platform."
        title="Password Set Successfully"
      />

      {/* Error Modal */}
      {errorMessage && (
        <CommonModal
          resetModal={handleErrorOk}
          showModal={!!errorMessage}
          modalMessage={errorMessage}
          title="Error"
        />
      )}
    </>
  )
}

export default ResetPassword