export interface SignUpFormProps extends CommonProps {
    setMessage: (
        message: string,
        type: 'success' | 'danger' | 'info' | 'warning',
        duration?: 3000 | 10000000,
    ) => void,
}
