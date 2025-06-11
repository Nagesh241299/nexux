import ConfigProvider from './ConfigProvider'
import { themeConfig } from '@/configs/theme.config'
import useDarkMode from '@/hooks/useDarkMode'
import useTheme from '@/hooks/useTheme'
import useLocale from '@/hooks/useLocale'
import useDirection from '@/hooks/useDirection'
import type { CommonProps } from '@/shared/types/common'

const Theme = (props: CommonProps) => {
    useTheme()
    useDarkMode()
    useDirection()

    const { locale } = useLocale()

    return (
        <ConfigProvider
            value={{
                locale: locale,
                ...themeConfig,
            }}
        >
            {props.children}
        </ConfigProvider>
    )
}

export default Theme
