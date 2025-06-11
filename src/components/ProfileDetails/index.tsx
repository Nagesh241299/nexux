import { Button, Modal, Switch } from 'antd'
import useUserProfile from '@/components/ProfileDetails/index.hooks'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { HiOutlineCheckCircle } from 'react-icons/hi'
import Input from '@/components/common/Input'
import { FormItem } from '@/components/common/Form'
import Alert from '@/components/common/Alert'
import OTPInput from '@/components/common/OtpInput'
import useTimeOutMessage from '@/hooks/useTimeOutMessage'
import { zodResolver } from '@hookform/resolvers/zod'
import Loading from '@/components/common/Loading'

const ProfileDetails = () => {
    const {
        loading,
        formValues,
        isOtpModalVisible,
        otp,
        isMobileVerified,
        timer,
        handleFieldChange,
        handleSave,
        handleMobileVerifyClick,
        handleOtpSubmit,
        setOtp,
        setIsOtpModalVisible,
        profileSchema,
        otpSent,
        saving,
    } = useUserProfile((message, type, duration) => {
        setMessage({ text: message, type, duration })
    })

    const [message, setMessage] = useTimeOutMessage()

    const {
        control,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            full_name: formValues.full_name,
            email: formValues.email,
            mobileNumber: formValues.mobileNumber,
            otp: '',
        },
        resolver: zodResolver(profileSchema),
    })

    const handleFieldChangeHandler = (
        name: keyof typeof formValues,
        value: string | boolean,
    ) => {
        setValue(name, value)
        handleFieldChange(name, value)
    }

    const handleFormSubmit: SubmitHandler<any> = (e) => {
        e.preventDefault()
        handleSave()
    }

    return (
        <div className="m-5">
            {loading ? (
                <div className="flex flex-auto flex-col h-[80vh]">
                    <Loading loading={true} />
                </div>
            ) : (
                <div className="p-6 bg-white shadow-lg rounded-lg">
                    {message && (
                        <Alert
                            showIcon
                            className="mb-4"
                            type={message.type}
                            duration={message.duration}
                        >
                            <span className="break-all">{message.text}</span>
                        </Alert>
                    )}
                    <h4 className="mb-8">Personal information</h4>
                    <form onSubmit={handleFormSubmit}>
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormItem
                                label="Full Name"
                                invalid={Boolean(errors.full_name)}
                                errorMessage={errors.full_name?.message}
                            >
                                <Controller
                                    name="full_name"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            value={formValues.full_name}
                                            placeholder="Enter full name"
                                            onChange={(e) =>
                                                handleFieldChangeHandler(
                                                    'full_name',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    )}
                                />
                                {errors.full_name && (
                                    <span className="text-red-500 text-sm">
                                        {errors.full_name.message}
                                    </span>
                                )}
                            </FormItem>

                            <FormItem label="Email Address">
                                <Input
                                    value={formValues.email}
                                    disabled
                                    placeholder="Email"
                                />
                            </FormItem>

                            <FormItem
                                label="Mobile Number"
                                invalid={Boolean(errors.mobileNumber)}
                                errorMessage={errors.mobileNumber?.message}
                            >
                                <Controller
                                    name="mobileNumber"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            placeholder="Enter mobile number"
                                            inputMode="numeric"
                                            value={formValues.mobileNumber}
                                            maxLength={10}
                                            prefix={
                                                <p className=" font-semibold text-black  border-r-black pr-3">
                                                    +91
                                                </p>
                                            }
                                            suffix={
                                                <div>
                                                    {(formValues.originalMobileNumber ===
                                                        formValues.mobileNumber ||
                                                        isMobileVerified) &&
                                                    formValues.mobileNumber
                                                        .length != 0 ? (
                                                        <HiOutlineCheckCircle
                                                            size={24}
                                                            color="green"
                                                        />
                                                    ) : (
                                                        <>
                                                            {formValues
                                                                .mobileNumber
                                                                .length ===
                                                                10 && (
                                                                <Button
                                                                    onClick={
                                                                        handleMobileVerifyClick
                                                                    }
                                                                    className="bg-success"
                                                                >
                                                                    Verify
                                                                </Button>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            }
                                            onChange={(e) =>
                                                handleFieldChangeHandler(
                                                    'mobileNumber',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    )}
                                />
                                {errors.mobileNumber && (
                                    <span className="text-red-500 text-sm">
                                        {errors.mobileNumber.message}
                                    </span>
                                )}
                            </FormItem>

                            <FormItem label="Static Content">
                                <Controller
                                    name="staticContent"
                                    control={control}
                                    render={({ field }) => (
                                        <Switch
                                            className="mt-3 ml-3"
                                            value={formValues?.staticContent}
                                            onChange={(value: boolean) =>
                                                handleFieldChangeHandler(
                                                    'staticContent',
                                                    value,
                                                )
                                            }
                                        />
                                    )}
                                />
                            </FormItem>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <Button
                                htmlType="submit"
                                loading={saving}
                                className="bg-success"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </form>

                    <Modal
                        open={isOtpModalVisible}
                        onCancel={() => setIsOtpModalVisible(false)}
                        footer={null}
                        width={400}
                        centered
                    >
                        <div className="p-8">
                            <h4>Verify Mobile Number</h4>
                            <div className="grid justify-center items-center">
                                <FormItem label="OTP">
                                    <Controller
                                        name="otp"
                                        control={control}
                                        render={({ field }) => (
                                            <OTPInput
                                                length={4}
                                                value={otp}
                                                onChange={setOtp}
                                                autoFocus
                                                placeholder=""
                                                disabled={!otpSent}
                                            />
                                        )}
                                    />
                                </FormItem>
                                <Button
                                    onClick={handleOtpSubmit}
                                    className="bg-success"
                                >
                                    Verify OTP
                                </Button>

                                {timer > 0 ? (
                                    <div className="mt-2 flex items-center">
                                        <span className="text-sm text-gray-600">
                                            Time Left: {timer}s
                                        </span>
                                    </div>
                                ) : (
                                    <div className="mt-2 flex items-center justify-end">
                                        <span
                                            onClick={handleMobileVerifyClick}
                                            className="text-sm text-blue-600 cursor-pointer"
                                        >
                                            Resend OTP
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Modal>
                </div>
            )}
        </div>
    )
}

export default ProfileDetails
