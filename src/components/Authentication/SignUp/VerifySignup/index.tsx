import { BsCheckCircle } from 'react-icons/bs'
import { TbLoader } from 'react-icons/tb'
import { useSignUpVerifyLink } from '@/components/Authentication/SignUp/VerifySignup/index.hook'

const SignUpVerifyLink = () => {
    const config = useSignUpVerifyLink()
    return (
        <>
            <h3 className="text-center mt-4 mb-6">Bettrlabs</h3>

            <div className="h-[80vh] flex justify-center items-center">
                {config?.loading ? (
                    <div>
                        <div className="flex justify-center">
                            <TbLoader className="animate-spin" size={64} />
                        </div>
                        <p className="text-lg pt-5"> Please Wait</p>
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-center">
                            <BsCheckCircle
                                className="text-green-500"
                                size={64}
                            />
                        </div>
                        <p className="py-5 text-lg">
                            Email Verified Successfully!
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}

export default SignUpVerifyLink
