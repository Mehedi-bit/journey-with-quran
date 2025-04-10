
import { Loader2Icon, LogOut } from 'lucide-react'
import { Button } from '../ui/button'
import { userAtom } from '@/atoms/userAtom'
import { useSetRecoilState } from 'recoil'
import { toast } from 'sonner'
import { serverUrl } from '@/serverUrl'
import { useState } from 'react'



const LogoutButton = () => {

    const setUserInfo = useSetRecoilState(userAtom)
    const [loading, setLoading] = useState(false)

    // handle logout
    const handleLogout = async () => {
        
        try {

            // set loading
            setLoading(true)

            // server actions
            const res = await fetch(`${serverUrl}/api/users/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            })


            const data = await res.json()
            console.log(data)

            if (data.error) {
                console.log(data.error)
                toast(data.error)


                // reset loading
                setLoading(false)

                return              // prevent further
            }


            // otherwise logout success

            // clear local storage
            localStorage.removeItem("user-info")
            // update userAtom
            setUserInfo(null)

            // show toast
            toast("Log out success",{
                description: "You have been logged out"
            })


        } catch (error) {
            console.log(error)
            toast("logout failed",{
                description: `Error: ${error}`
            })
        } finally {
            // reset loading
            setLoading(false)
        }

    }



  return (
    <Button variant="outline" size="sm"
        onClick={handleLogout}
    >
    
        {/* logout icon */}

        {
            loading ? <Loader2Icon size={16} className="animate-spin" /> 
            : <LogOut size={16} />
        }

          

    </Button>
  )
}



export default LogoutButton
