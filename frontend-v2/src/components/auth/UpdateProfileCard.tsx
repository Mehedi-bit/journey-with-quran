
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




  const avatarOptions = [
    "https://i.pinimg.com/736x/68/0d/6b/680d6b30d15f0257190f456d411e5954.jpg",
    "https://i.pinimg.com/474x/64/bf/58/64bf58a21af6b36560bf6727e1dbbc5e.jpg",
    "https://i.pinimg.com/474x/6e/0d/f5/6e0df5a5922013b212d75d6bf55d16d7.jpg",
    "https://i.pinimg.com/736x/10/aa/4a/10aa4ac026b636b67764caeae0f14552.jpg",
    "https://i.pinimg.com/474x/e2/5e/b2/e25eb2a8a3e0995c8872aa633906f87d.jpg",
    "https://i.pinimg.com/474x/3a/b8/c1/3ab8c161288a84673335f84d9285b6a9.jpg",
    "https://i.pinimg.com/474x/cc/0d/42/cc0d4238ec91c01459f10184f2dfe987.jpg",
    "https://i.pinimg.com/474x/9c/c7/3e/9cc73e8598075d9161401a887c7f758b.jpg",
    "https://i.pinimg.com/474x/a7/2e/e9/a72ee90df007ca9a11dee7a83f168c99.jpg",
    "https://i.pinimg.com/474x/84/90/da/8490dac6a37769bd75ded2c9eeaf3a2d.jpg",
    "https://i.pinimg.com/474x/6b/9a/bf/6b9abfa92ff264f3a4e6e75b302e3b72.jpg",
    "https://i.pinimg.com/474x/67/12/07/671207d9624299f91249d413bc01417b.jpg",
    "https://i.pinimg.com/474x/06/51/16/06511605af2207d90d5163554b7f9a84.jpg",
    "https://i.pinimg.com/474x/bb/c7/d3/bbc7d362c8fe56a896d35869ae1f5e9f.jpg",
    "https://i.pinimg.com/736x/38/0e/7f/380e7f6e3fbba08bf9861c19e9789e57.jpg",
    "https://i.pinimg.com/474x/b3/34/25/b3342548d7f6d00249e1dafdb91f7be2.jpg",
    "https://i.pinimg.com/474x/98/74/29/98742983cb08bd83d5aa18c58162646b.jpg",
    "https://i.pinimg.com/474x/97/c4/65/97c4655c4d0c21fc18c9b9ee92e6a086.jpg",
    "https://i.pinimg.com/474x/37/ce/83/37ce836fadb9443bba526e62f4ee2bf9.jpg",
    "https://i.pinimg.com/474x/c7/d7/9a/c7d79a8bda00bd1a17a90bc915b40876.jpg",
    "https://i.pinimg.com/474x/a7/8e/2e/a78e2e58b1ff73d1a9d853a12f121021.jpg",
    "https://i.pinimg.com/474x/e0/1f/fd/e01ffddd478205237210fea56ebfa666.jpg",
    "https://i.pinimg.com/474x/63/6e/e1/636ee13586a1c2a24d22351295f83e07.jpg",
    "https://i.pinimg.com/474x/80/d6/ee/80d6ee94f737119be7d28f74b805eb4b.jpg",
    "https://i.pinimg.com/474x/fb/0a/b3/fb0ab329e10eae047b0c7cc0106da9d1.jpg",
    "https://i.pinimg.com/474x/29/2f/cc/292fcc0e477cf24347934ca1684b00d9.jpg",
    "https://i.pinimg.com/474x/ae/cd/db/aecddb5808a0414b3de3e51aa9fd8248.jpg",
    "https://i.pinimg.com/474x/44/ea/c4/44eac4b9e6bbeb8067a6724b872bd982.jpg",
    "https://i.pinimg.com/474x/b3/34/25/b3342548d7f6d00249e1dafdb91f7be2.jpg",
    "https://i.pinimg.com/474x/3a/b8/26/3ab826252903ce2c8ae64020c1f69f13.jpg",
    "https://i.pinimg.com/474x/4b/7e/d8/4b7ed84ddfc1933fd69e2db9b5ed03e8.jpg",
    "https://i.pinimg.com/474x/6e/77/0d/6e770d20b81b195b94f46950e6277cf4.jpg",
    "https://i.pinimg.com/474x/b5/e9/90/b5e990275fe9f06b560ae2409edef5ff.jpg",
    "https://i.pinimg.com/474x/45/86/a6/4586a66cb7e80c5ba76f00735c8e1111.jpg",
    "https://i.pinimg.com/474x/29/13/ec/2913ecafe89a5cbed658998449268076.jpg",
    "https://i.pinimg.com/474x/55/d6/d9/55d6d94d769f20a8cd8111f7ec621cae.jpg",
    "https://i.pinimg.com/736x/8f/b3/de/8fb3deae8ff4b0a8957ce5a1f339ece6.jpg",
    "https://i.pinimg.com/474x/c3/39/b7/c339b7855bd5131ed1cb84fe262f0d61.jpg",
    "https://i.pinimg.com/474x/a1/a4/b1/a1a4b16ba6f9ca55e64421edbe9ea25a.jpg",
    "https://cdn.pixabay.com/photo/2024/01/19/13/52/holy-quran-8519135_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/04/10/09/05/makkah-2217852_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/10/20/03/19/mosque-8328077_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/11/18/06/07/al-aqsa-4634017_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/05/23/20/53/cami-5211438_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/10/04/08/36/cami-4525080_1280.jpg",
    "https://i.pinimg.com/474x/9a/8a/d6/9a8ad65990a90bea8de6d4ea4a3c8824.jpg",
    "https://i.pinimg.com/474x/63/70/2b/63702b0933af3295aacd2429fc69c22a.jpg",
    "https://i.pinimg.com/474x/97/8c/8a/978c8a6107e28a7bcd66381870af267c.jpg",

    // ... add more URLs as needed
  ];


  
  export default function UpdateProfileCard() {
  
    const [files, setFiles] = useState < File[] | null > (null);
    const [file, setFile] = useState(null);
    const [userInfo, setUserInfo] = useRecoilState(userAtom)
    const [showAvatars, setShowAvatars] = useState(false)


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
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        <form className="space-y-8 max-w-3xl mx-auto py-10 px-5">

              <div className="flex items-center justify-center">
                {/* <Avatar className="h-20 w-20">
                  <AvatarImage src={previewImgUrl} defaultValue={userInfo.profilePic} alt="@user" className="object-cover"/>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar> */}

                <div className="h-20 w-20">
                  <img src={previewImgUrl || userInfo.profilePic} alt="" className="h-20 w-20 rounded-full object-cover"  />
                </div>
              </div>
          


              {/* *** FILE UPLOAD *** */}

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



          {/* EXTERNAL AVATAR LINKS */}

          <div className="mt-4">
            <FormLabel className="mb-2 block text-center text-lg font-medium">
              <Button variant="outline" onClick={(e) => {
                e.preventDefault()
                setShowAvatars(prev => !prev)
              }}>
                {showAvatars ? "Hide Avatars" : "Choose Avatar"}
              </Button>

            </FormLabel>

              {/* SUGGESTED AVATARS */}

                {
                  showAvatars && (


                    <div className="mx-auto">
                    <div className="flex gap-4 flex-wrap justify-center max-h-64 overflow-y-auto p-2 border rounded-md shadow-sm">
                      {avatarOptions.map((url, index) => (
                        <div
                          key={index}
                          className={`w-12 h-12 rounded-full cursor-pointer transition-all duration-200 ${
                            previewImgUrl === url ? "border-primary scale-110" : "border-transparent"
                          }`}
                          onClick={() => {
                            setPreviewImgUrl(url);
                            setInputs((prev) => ({ ...prev, profilePic: url }));
                          }}
                        >
                          <img
                            src={url}
                            alt={`Avatar ${index + 1}`}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                      ))}
                      </div>
                    </div>


                  )


                }

            



          </div>


          {/*  */}


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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputs({...inputs, password: e.target.value})}
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
          <Button onClick={(e) => { e.preventDefault(); handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>); }} type="submit" className="min-w-20">
            {loading ? <LoaderCircle className="animate-spin" /> : "Update"}
          </Button>
        </form>
      </Form>
    )
  }