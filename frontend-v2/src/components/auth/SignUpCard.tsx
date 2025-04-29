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
import { Loader2Icon } from "lucide-react"


export function SignUpCard({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const setAuthState = useSetRecoilState(authStateAtom)
  const setUserInfoAtom = useSetRecoilState(userAtom)

  // get user input from the frontend form
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  })


  const [loading, setLoading] = useState(false) 



  // function to handle sign up from server

  const handleSignUp = async () => {

    
    try {

      // set loading
      setLoading(true)


      // server actions
      const res = await fetch(`${serverUrl}/api/users/signup`, {
        method: "POST",
        credentials: "include", // ✅ SEND COOKIE
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs)
      })

      const data = await res.json()


      if (data.error) {

        toast(data.error, {
          description: "Please try again",
          action: {
            label: "Okay",
            onClick: () => console.log("Okay"),
          },
        })

        // reset loading
        setLoading(false)

        return   // not to proceed further if error
      }

      // otherwise success
      localStorage.setItem("user-info", JSON.stringify(data))
      setUserInfoAtom(data)

      toast("Sign up successful", {
          // show full dayname and time with date
          description: "You signed up on " + new Date().toLocaleString(),
          action: {
            label: "Thanks",
            onClick: () => console.log("Thanks"),
          },
          
      })
      


      
    } catch (error) {
      
      toast("Error " + error + " error")
      
    }



  }




  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>
            Sign up to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form 
            onSubmit={(e) => {
              e.preventDefault()
              console.log("sign up form submitted")
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex gap-2">
                <div>
                    <Label htmlFor="name">Full name</Label>
                    <Input
                    id="name"
                    type="text"
                    placeholder="full name"
                    required
                    onChange={(e) => setInputs({...inputs, name: e.target.value})}
                    />
                    <small className="text-xs text-gray-400">full name appreciated</small>
                </div>
                <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                    id="username"
                    type="text"
                    placeholder="unique_username"
                    required
                    onChange={(e) => setInputs({...inputs, username: e.target.value})}
                    />
                    <small className="text-xs text-gray-400">username needs to be unique</small>
                </div>
                
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
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
                  onChange={(e) => setInputs({...inputs, password: e.target.value})}
                />
              </div>
              <Button type="submit" className="w-full"
                onClick={handleSignUp}
              >
                {
                  loading ? <Loader2Icon size={16} className="animate-spin" /> 
                  : "Sign up"
                }
              </Button>
              {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="#" className="underline underline-offset-4"

                onClick={()=> setAuthState("login")}

              >
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
