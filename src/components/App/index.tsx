import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useMainApp } from './index.hook'
import { applyTailwindTheme } from '@/utils/applyTailwindTheme'
import Loading from '../common/Loading'
import useDarkMode from '@/hooks/useDarkMode'
import { ConfigProvider, Table, Switch, Space, theme } from 'antd';
const { darkAlgorithm, defaultAlgorithm } = theme;

const DEFAULT_THEME = {
  primary_color: '#000000 ', // Ant Design default blue
  secondary_color: '#f0f0f0',
  logo_url: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
  footer_text: 'footer',
}

const App = ({ children }: { children: React.ReactNode }) => {
  const { branding } = useMainApp()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const {
    primary_color,
    secondary_color,
    logo_url,
    footer_text,
  } = branding || DEFAULT_THEME



const [isDark, setIsDark] = useDarkMode()

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: primary_color,
          colorBgLayout: secondary_color,
          fontSize: 14,
          fontFamily: 'Montserrat'
        },
      }}
    >
      <div
        className="min-h-screen flex flex-col"
        style={{
          '--color-primary': primary_color,
          '--color-secondary': secondary_color,
        } as React.CSSProperties}
      >
        <main className="flex-grow">{children}</main>
      </div>
    </ConfigProvider>
  )
}

export default App
