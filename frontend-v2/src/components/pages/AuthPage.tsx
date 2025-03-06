import { useRecoilValue } from "recoil"
import { LoginCard } from "../auth/LoginCard"
import { SignUpCard } from "../auth/SignUpCard"
import { authStateAtom } from "@/atoms/authAtom"

const AuthPage = () => {

    const authState = useRecoilValue(authStateAtom)

  return (
    <>


        <div className="flex w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">

                {
                    authState === "login" ? <LoginCard /> : <SignUpCard />
                }
                
            </div>
        </div>
      
        

    </>
  )
}

export default AuthPage
