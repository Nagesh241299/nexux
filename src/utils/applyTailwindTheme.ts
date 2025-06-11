export const applyTailwindTheme = (branding: Record<string, string | undefined>) => {
  const root = document.documentElement

  const cssVars: Record<string, string> = {
    '--primary': branding.primary_color || '#00D47F',

    '--success': branding.secondary_color || '#10b981',


  }

  Object.entries(cssVars).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
}
