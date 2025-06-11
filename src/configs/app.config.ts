export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    locale: string
    accessTokenPersistStrategy: 'localStorage' | 'sessionStorage' | 'cookies'
    enableMock: boolean
    appSessionTimeout: number
}

const baseURL = import.meta.env.VITE_APP_BASE_API_URL
const appSessionTimeout = import.meta.env.VITE_APP_SESSION_TIMEOUT

const appConfig: AppConfig = {
    apiPrefix: baseURL,
    authenticatedEntryPath: '/customer',
    unAuthenticatedEntryPath: '/',
    locale: 'en',
    accessTokenPersistStrategy: 'cookies',
    enableMock: true,
    appSessionTimeout,
}

export default appConfig
