import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { useNavigate } from "react-router-dom"
import { userAtom } from "@/atoms/userAtom"
import { Button } from "../ui/button"

export default function WelcomeModal() {
  const userInfo = useRecoilValue(userAtom)
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (userInfo) return


    const timer = setTimeout(() => {
      setShowModal(true)
    }, 20000) // 20 seconds

    return () => clearTimeout(timer)
  }, [userInfo])

  const handleNotNow = () => {
    setShowModal(false)
  }

  const handleLogin = () => {
    setShowModal(false)
    navigate("/auth")
  }

  if (!showModal || userInfo) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white text-black dark:bg-black dark:text-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-300 dark:border-gray-700">
        
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Journey with Quran
        </h2>
        <p className="text-center text-gray-700 dark:text-gray-300 mb-8">
            Begin your journey with the Quran. Discover reflections and guidance just for you.
        </p>
        
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleNotNow}
            variant="secondary"
            // className="rounded-full"
            >
            Not now
          </Button>
          <Button 
            onClick={handleLogin}
            variant="default"
            // className="rounded-full"
            >
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}
