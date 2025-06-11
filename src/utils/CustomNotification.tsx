import { message } from 'antd'
import { AxiosError } from 'axios'

enum NotificationType {
    SUCCESS = 'success',
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error',
}

export class CustomNotification {
    private static showMessage(
        notificationMessage: string,
        type: NotificationType,
    ) {
        message.destroy()
        message[type](notificationMessage)
    }

    public static showSuccessMessage(notificationMessage: string) {
        CustomNotification.showMessage(
            notificationMessage,
            NotificationType.SUCCESS,
        )
    }

    public static showInfoMessage(notificationMessage: string) {
        CustomNotification.showMessage(
            notificationMessage,
            NotificationType.INFO,
        )
    }

    public static showErrorMessage(error: any) {
        const errorMessage = CustomNotification.getErrorMessage(error)
        CustomNotification.showMessage(errorMessage, NotificationType.ERROR)
    }

    public static getErrorMessage(error: any): string {
        if (error instanceof AxiosError) {
            const responseData = error?.response?.data
            const responseMessage = responseData?.message
            const responseError = responseData?.error

            if (typeof responseData === 'string') {
                return responseData
            }

            if (
                typeof responseMessage === 'string' &&
                typeof responseError === 'string'
            ) {
                return `${responseMessage}: ${responseError}`
            }

            if (typeof responseMessage === 'string') {
                return responseMessage
            }

            if (typeof responseError === 'string') {
                return responseError
            }

            if (Array.isArray(responseError)) {
                return responseError.map((item) => item?.msg).join(', ')
            }

            return error?.message || 'An unknown error occurred.'
        }

        if (typeof error === 'string') {
            return error
        }

        return error?.message || 'An unknown error occurred.'
    }
}
