
const SignUpStep3 = (props: { email: string }) => {
    return (
        <div className="flex justify-center h-[80vh] items-center">
            <div className="">
            
                <h2 className="text-center pb-5">
                    Thank You For Your Registration
                </h2>
                <p className="text-center text-xl">
                    We have send you an confirmation email to{' '}
                    {props?.email ?? ''}
                </p>sideNavIcon 
                <p className="text-center text-xl">
                    Please confirm your email address to activate your account
                </p>
            </div>
        </div>
    )
}

export default SignUpStep3
