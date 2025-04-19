
import { useTheme } from "next-themes" // this works in React too
import { SunMedium, SunMoon } from "lucide-react"

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  console.log("theme is ::::::", theme)

  return (
    <div onClick={toggleTheme} className="cursor-pointer">
       {
            theme === "light" ? 
                <SunMedium />
                    : 
                <SunMoon />
       } 
    </div>
  )
}
