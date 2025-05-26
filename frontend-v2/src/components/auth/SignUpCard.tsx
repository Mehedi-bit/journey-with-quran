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

  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)

  const handleSignUp = async () => {
    try {
      setLoading(true)
      
      // Trim inputs and validate
      const trimmedName = inputs.name.trim()
      const trimmedUsername = inputs.username.trim()
      const trimmedEmail = inputs.email.trim()
      const password = inputs.password

      // Validate spaces
      if (trimmedUsername.includes(' ')) {
        toast.error("Username cannot contain spaces")
        setLoading(false)
        return
      }

      if (trimmedEmail.includes(' ')) {
        toast.error("Email cannot contain spaces")
        setLoading(false)
        return
      }

      if (password.includes(' ')) {
        toast.error("Password cannot contain spaces")
        setLoading(false)
        return
      }

      const res = await fetch(`${serverUrl}/api/users/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          username: trimmedUsername,
          email: trimmedEmail,
          password: password,
        }),
      })

      const data = await res.json()

      if (data.error) {
        toast.error(data.error)
        setLoading(false)
        return
      }

      localStorage.setItem("user-info", JSON.stringify(data))
      setUserInfoAtom(data)

      toast.success("Sign up successful", {
        description: "You signed up on " + new Date().toLocaleString(),
      })
      
    } catch (error) {
      toast.error("Error: " + error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>Sign up to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
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
                  {inputs.username.trim().includes(' ') ? (
                    <small className="text-xs text-red-500">Username cannot contain spaces</small>
                  ) : (
                    <small className="text-xs text-gray-400">username needs to be unique</small>
                  )}
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
                {inputs.email.trim().includes(' ') && (
                  <small className="text-xs text-red-500">Email cannot contain spaces</small>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  onChange={(e) => setInputs({...inputs, password: e.target.value})}
                />
                {inputs.password.includes(' ') && (
                  <small className="text-xs text-red-500">Password cannot contain spaces</small>
                )}
              </div>
              <Button 
                type="submit" 
                className="w-full"
                onClick={handleSignUp}
                disabled={loading}
              >
                {loading ? <Loader2Icon size={16} className="animate-spin" /> : "Sign up"}
              </Button>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <a 
                  href="#" 
                  className="underline underline-offset-4"
                  onClick={() => setAuthState("login")}
                >
                  Login
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}