
import {
    useState
  } from "react"
  import {
    toast
  } from "sonner"
  import {
    set,
    useForm
  } from "react-hook-form"
  import {
    zodResolver
  } from "@hookform/resolvers/zod"
  import * as z from "zod"

  import {
    Button
  } from "@/components/ui/button"
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import {
    CloudUpload,
    LoaderCircle,
    Paperclip
  } from "lucide-react"
  import {
    FileInput,
    FileUploader,
    FileUploaderContent,
    FileUploaderItem
  } from "@/components/ui/file-upload"
  import {
    Input
  } from "@/components/ui/input"
  import {
    PasswordInput
  } from "@/components/ui/password-input"
  import {
    Textarea
  } from "@/components/ui/textarea"

  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import usePreviewImage from "@/hooks/usePreviewImage"
import { useRecoilState } from "recoil"
import { userAtom } from "@/atoms/userAtom"
import { serverUrl } from "@/serverUrl"
  
  const formSchema = z.object({
    name_9709521402: z.string().optional(),
    name_0845824635: z.string().min(1).optional(),
    name_0036093428: z.string().min(1).optional(),
    name_9506221778: z.string().optional(),
    name_7562832462: z.string().optional(),
    name_5673322854: z.string().optional()
  });
  
  export default function UpdateProfileCard() {
  
    const [files, setFiles] = useState < File[] | null > (null);
    const [file, setFile] = useState(null);
    const [userInfo, setUserInfo] = useRecoilState(userAtom)

    const {previewImgUrl, handleImageChange, setPreviewImgUrl} = usePreviewImage()


    const [inputs, setInputs] = useState({
      name: userInfo?.name,
      username: userInfo?.username,
      email: userInfo?.email,
      password: "",
      bio: userInfo?.bio,
      profilePic: userInfo?.profilePic,
    })


    const [loading, setLoading] = useState(false)


    console.log(inputs)



    console.log(userInfo)
    
    const dropZoneConfig = {
      maxFiles: 5,
      // set max file size to 20MB
      // maxFileSize: 20 * 1024 * 1024,
      multiple: true,
    };
    const form = useForm < z.infer < typeof formSchema >> ({
      resolver: zodResolver(formSchema),
  
    })
  
    const handleSubmit = async (e) => {
      e.preventDefault()

      if (loading) return;   // if already loading then return to get out of the function to get rid of multiple request at a time if user tries to click multiple times
     
      setLoading(true)


      try {
        console.log("this is after form submitting update form", inputs)
        console.log("this is userinfo", userInfo)

        // server actions
        const res = await fetch(`/api/users/update/${userInfo._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",  // ✅ This will allow sending cookies (as secured route)
          body: JSON.stringify({...inputs, profilePic: previewImgUrl})
        })

        
        const data = await res.json()
        console.log("This is updated fetched data ", data)

        if (data.error) {
          console.log(data.error)
          toast(data.error)
          return
        }

        // otherwise update success
        setUserInfo(data)

        // show toast
        toast("Profile Updated successfully")

        // update local storage
        localStorage.setItem("user-info", JSON.stringify(data))

        // set loading to false
        setLoading(false)




      } catch (error) {
        toast(`${error}`)
      } finally {
        setLoading(false)
      }

    }
  
    return (
      <Form {...form} >
        <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto py-10 px-5">

              <div className="flex items-center justify-center">
                {/* <Avatar className="h-20 w-20">
                  <AvatarImage src={previewImgUrl} defaultValue={userInfo.profilePic} alt="@user" className="object-cover"/>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar> */}

                <div className="h-20 w-20">
                  <img src={previewImgUrl || userInfo.profilePic} alt="" className="h-20 w-20 rounded-full object-cover"  />
                </div>
              </div>
          
              <FormField
                control={form.control}
                name="name_9709521402"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-center block">Profile picture</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={files}
                        onValueChange={setFiles}
                        dropzoneOptions={dropZoneConfig}
                        className="relative bg-background rounded-lg p-2"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      >
                        <FileInput
                          id="fileInput"
                          className="outline-dashed outline-1 outline-slate-500"
                        >
                          <div className="flex items-center justify-center flex-col p-8 w-full ">
                            <CloudUpload className='text-gray-500 w-10 h-10' />
                            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Click to upload</span>
                              &nbsp; or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF
                            </p>
                          </div>
                        </FileInput>
                        <FileUploaderContent>
                          {files &&
                            files.length > 0 &&
                            files.map((file, i) => (
                              <FileUploaderItem key={i} index={i}>
                                <Paperclip className="h-4 w-4 stroke-current" />
                                <span>{file.name}</span>
                              </FileUploaderItem>
                            ))}
                        </FileUploaderContent>
                      </FileUploader>
                    </FormControl>
                    <FormDescription>Profile pic should meet Allah's commandments (keep it blank if you don't want to update the current one)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
          
          <div className="grid grid-cols-12 gap-4">
            
            <div className="col-span-6">
              
          <FormField
            control={form.control}
            name="name_0845824635"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input 
                  placeholder="Full name"
                  defaultValue={userInfo?.name}
                  type=""
                  {...field}
                  onChange={(e) => setInputs({...inputs, name: e.target.value})}
                  />
                </FormControl>
                <FormDescription>keep it blank if you don't want to update it</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
            </div>
            
            <div className="col-span-6">
              
          <FormField
            control={form.control}
            name="name_0036093428"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input 
                  placeholder="username"
                  defaultValue={userInfo?.username}
                  type=""
                  {...field} 
                  onChange={(e) => setInputs({...inputs, username: e.target.value})}
                  />
                </FormControl>
                <FormDescription>keep it blank if you don't want to update it</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
            </div>
            
          </div>
          
          <FormField
            control={form.control}
            name="name_9506221778"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                  placeholder="keep it blank if you don't want to update it"
                  defaultValue={userInfo?.email}
                  type="email"
                  {...field} 
                  onChange={(e) => setInputs({...inputs, email: e.target.value})}
                  />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="name_7562832462"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Your password" {...field} 
                      onChange={(e) => setInputs({...inputs, password: e.target.value})}
                  />
                </FormControl>
                <FormDescription>keep it blank if you don't want to update it</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          
          <FormField
            control={form.control}
            name="name_5673322854"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your bio"
                    className="resize-none"
                    defaultValue={userInfo?.bio}
                    {...field}
                    onChange={(e) => setInputs({...inputs, bio: e.target.value})}
                  />
                </FormControl>
                <FormDescription>keep it blank if you don't want to update it</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="min-w-20">
            {loading ? <LoaderCircle className="animate-spin" /> : "Update"}
          </Button>
        </form>
      </Form>
    )
  }