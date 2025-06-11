import { useState } from 'react'

const useOnboarding = () => {
     /* STATE */
    const [step, setStep] = useState(0)

    /* HANDLERS */
    const handleBackStep = () => {
        setStep(step - 1)
    }

    const handleStep = () => {
        setStep(step + 1)
    }

    return {
        step,
        handleBackStep,
        handleStep,
    }
}

export default useOnboarding
