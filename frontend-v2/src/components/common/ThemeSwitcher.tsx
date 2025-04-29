
import { useTheme } from "next-themes" // this works in React too
import { SunMedium, SunMoon } from "lucide-react"


interface ThemeSwitcherProps {
  className: string
}

export default function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }


  return (
    <div onClick={toggleTheme} className={`${className} cursor-pointer flex items-center justify-center`}>
       {
            theme === "light" ? 
                <SunMedium />
                    : 
                <SunMoon />
       } 
    </div>
  )
}
