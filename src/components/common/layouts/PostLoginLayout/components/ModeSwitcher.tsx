import { useCallback } from 'react'
import useDarkMode from '@/hooks/useDarkMode'

const ModeSwitcher = () => {
  const [isDark, setIsDark] = useDarkMode()

  const onSwitchChange = useCallback(() => {
    setIsDark(isDark ? 'light' : 'dark')
  }, [isDark, setIsDark])

  return (
    <button
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      type="button"
      title="Toggle theme"
      aria-label="Toggle theme"
      onClick={onSwitchChange}
    >
      {isDark ? (
        // Moon Icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="text-yellow-500"
        >
          <path d="M12 4V2m0 20v-2m4.22-13.78l1.42-1.42M4.93 19.07l1.42-1.42M20 12h2M2 12h2m2.93-5.07L4.93 4.93m14.14 14.14l-1.42-1.42M12 6a6 6 0 100 12 6 6 0 000-12z" />
        </svg>
       
      ) : (
        // Sun Icon
         <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="text-gray-300"
        >
          <path d="M21 12.79A9 9 0 0112.21 3 7 7 0 1012 21a9 9 0 009-8.21z" />
        </svg>
      )}
    </button>
  )
}

export default ModeSwitcher
