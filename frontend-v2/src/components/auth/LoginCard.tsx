import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSetRecoilState } from "recoil"
import { authStateAtom } from "@/atoms/authAtom"
import { useState } from "react"
import { toast } from "sonner"
import { serverUrl } from "@/serverUrl"
import { userAtom } from "@/atoms/userAtom"
import { Loader2 } from "lucide-react"

export function LoginCard({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const setAuthState = useSetRecoilState(authStateAtom)
  const setUserInfoAtom = useSetRecoilState(userAtom)

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)

  
  const handleLogin = async () => {
      try {

        // set loading
        setLoading(true)
        
        // server actions
        const res = await fetch(`${serverUrl}/api/users/login`, {
          method: "POST",
          credentials: "include", // ✅ SEND COOKIE
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs)
        })
        
        
        // get response data
        const data = await res.json()

        if (data.error) {

          console.log(data.error)

          // show toast
          toast('Wrong Credentials', {
            description: "Your email or password is incorrect",
            action: {
              label: "Try again",
              onClick: () => console.log("Try again"),
            },
          })


          // reset loading
          setLoading(false)

          return              // prevent further
        }


        // otherwise login success
        // set local storage
        localStorage.setItem("user-info", JSON.stringify(data))

        // update userAtom
        setUserInfoAtom(data)
        
        // show toast
        toast("Login successful", {
          description: `Welcome to your Journey with Quran, ${data.name}`
        })


      } catch (error) {
        console.log(error)
        toast("Something went wrong", {
          description: `Error: ${error}`
        })
        
      } finally {
        // reset loading
        setLoading(false)
      }

      

  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form 
            onSubmit={(e) => {
              e.preventDefault()
              console.log("login form submitted")
            }} 
          >
            <div className="flex flex-col gap-6">
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email or username</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email"
                  required
                  onChange={(e) => setInputs({...inputs, email: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required
                  placeholder="password"
                  onChange={(e) => setInputs({...inputs, password: e.target.value})}
                />
              </div>


              {/* LOGIN BUTTON */}

              <Button type="submit" className="w-full"
                onClick={() => {
                  handleLogin()
                  console.log("login form submitted")
                }}
              >

                {
                  loading ? 
                  <Loader2 size={16} className="animate-spin" /> 
                  : 
                  "Login"
                }

              </Button>


              {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4"
              
              onClick={()=> setAuthState("signup")}
              
              >
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
