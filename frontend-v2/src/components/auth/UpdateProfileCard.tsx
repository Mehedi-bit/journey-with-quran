
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
    "https://ik.imagekit.io/mehedi004/Avatars/hijab%20green%20profile%20pic%20_.jpeg?updatedAt=1744290169060",
    "https://ik.imagekit.io/mehedi004/Avatars/download%20(31).jpeg?updatedAt=1744290163733",
    "https://ik.imagekit.io/mehedi004/Avatars/hijab%20girl__.jpeg?updatedAt=1744290168695",
    "https://ik.imagekit.io/mehedi004/Avatars/e6d2759e-9ce5-46eb-a626-c11ee024f088.jpeg?updatedAt=1744290170096",
    "https://ik.imagekit.io/mehedi004/Avatars/hijab%20blue%20profile%20pic%20_.jpeg?updatedAt=1744290168269",
    "https://ik.imagekit.io/mehedi004/Avatars/download%20(40).jpeg?updatedAt=1744290166774",
    "https://ik.imagekit.io/mehedi004/Avatars/hijab%20red%20profile%20pic%20%E2%9D%A4%EF%B8%8F.jpeg?updatedAt=1744290170114",
    "https://ik.imagekit.io/mehedi004/Avatars/4,100+%20Ramadan%20Character%20Stock%20Illustrations,%20Royalty-Free%20Vector%20Graphics%20&%20Clip%20Art.jpeg?updatedAt=1744290151282",
    "https://ik.imagekit.io/mehedi004/Avatars/A%20Beautiful%20Muslim%20Woman%20Wearing%20Syar%20I%20Hijab%20Is%20Carrying%20Book%20And%20Reading%20It,%20Read,%20Book,%20Muslim%20PNG%20Transparent%20Clipart%20Image%20and%20PSD%20File%20for%20Free%20Download.jpeg?updatedAt=1744290151442",
    "https://ik.imagekit.io/mehedi004/Avatars/A%20Muslim%20Woman%20Was%20Knocking%20At%20The%20Front%20Door%20Of%20The%20House%20Before%20Entering%20Vector,%20Muslim,%20Knocking%20Door,%20Assalamualaikum%20PNG%20and%20Vector%20with%20Transparent%20Background%20for%20Free%20Download.jpeg?updatedAt=1744290151271",
    "https://ik.imagekit.io/mehedi004/Avatars/A%20Woman%20In%20Hijab%20Is%20Thinking%20Or%20Worried%20About%20Something,%20Thinking,%20Worried,%20Muslim%20Girl%20PNG%20Transparent%20Clipart%20Image%20and%20PSD%20File%20for%20Free%20Download.jpeg?updatedAt=1744290152997",
    "https://ik.imagekit.io/mehedi004/Avatars/C5c49ab85fda1e8cee5151290f574822a3eb9a13%2063C.jpeg?updatedAt=1744290153565",
    "https://ik.imagekit.io/mehedi004/Avatars/A%20Muslim%20Boy%20Design%20Illustration%20Goes%20To%20The%20Mosque%20Read%20An%20Al%20Qur%20And%20Can%20Be%20Profile%20Picture,%20Character,%20Avatar,%20Profile%20Picture%20PNG%20Transparent%20Clipart%20Image%20and%20PSD%20File%20for%20Free%20Download.jpeg?updatedAt=1744290153568",
    "https://ik.imagekit.io/mehedi004/Avatars/Arabic%20Man%20Vector%20PNG%20Images,%20Arabic%20Man%20Png%20Flat%20Illustration,%20Arabic%20Man,%20Muslim%20Man,%20Islamic%20People%20PNG%20Image%20For%20Free%20Download.jpeg?updatedAt=1744290153686",
    "https://ik.imagekit.io/mehedi004/Avatars/80284cc4-ff7e-4ed8-b45b-527157de4e96.jpeg?updatedAt=1744290153822",
    "https://ik.imagekit.io/mehedi004/Avatars/download%20(25).jpeg?updatedAt=1744290155493",
    "https://ik.imagekit.io/mehedi004/Avatars/download%20(23).jpeg?updatedAt=1744290156420",
    "https://ik.imagekit.io/mehedi004/Avatars/download%20(26).jpeg?updatedAt=1744290156127",
    "https://ik.imagekit.io/mehedi004/Avatars/_kartun%20_kartunmuslimah%20_cartoon%20_sunflower%20_tanaman%20_tanamanhias%20_yellow%20_hijab%20_softgirl%20_style%20_flowers%20_bunga%20_indah%20_aiphoto%20_aiartcommunity%20_langit%20_langitbiru%20_digitalartportrait%20_calm%20_biru%20_hills%20_sitt.jpeg?updatedAt=1744290157069",
    "https://ik.imagekit.io/mehedi004/Avatars/download%20(29).jpeg?updatedAt=1744290157623",
    "https://ik.imagekit.io/mehedi004/Avatars/download%20(27).jpeg?updatedAt=1744290158618",
    "https://ik.imagekit.io/mehedi004/Avatars/download%20(28).jpeg?updatedAt=1744290159122",
    "https://ik.imagekit.io/mehedi004/Avatars/download%20(30).jpeg?updatedAt=1744290160122",
    "https://ik.imagekit.io/mehedi004/Avatars/download%20(32).jpeg?updatedAt=1744290161057",
    "https://ik.imagekit.io/mehedi004/Avatars/download%20(33).jpeg?updatedAt=1744290163308",
    "https://ik.imagekit.io/mehedi004/Avatars/download%20(34).jpeg?updatedAt=1744290164404",
    "https://ik.imagekit.io/mehedi004/Avatars/download%20(36).jpeg?updatedAt=1744290163781",
    "https://ik.imagekit.io/mehedi004/Avatars/download%20(35).jpeg?updatedAt=1744290164546",
    "https://ik.imagekit.io/mehedi004/Avatars/download%20(37).jpeg?updatedAt=1744290164706",
    "https://ik.imagekit.io/mehedi004/Avatars/download%20(38).jpeg?updatedAt=1744290167110",
    "https://ik.imagekit.io/mehedi004/Avatars/download%20(39).jpeg?updatedAt=1744290166534",
    "https://ik.imagekit.io/mehedi004/Avatars/Download%20Cute%20Hijab%20Using%20Laptop%20for%20free.jpeg?updatedAt=1744290167783",
    "https://ik.imagekit.io/mehedi004/Avatars/Download%20Muslim%20male%20face%20illustration%20design%20for%20free.jpeg?updatedAt=1744290168068",
    "https://ik.imagekit.io/mehedi004/Avatars/hijab%20yellow%20profile%20pic%20_.jpeg?updatedAt=1744290171388",
    "https://ik.imagekit.io/mehedi004/Avatars/Ibu%20Dan%20Anak%20Islami,%20Ibu,%20Putri,%20Muslimah%20PNG%20Transparan%20Clipart%20dan%20File%20PSD%20untuk%20Unduh%20Gratis.jpeg?updatedAt=1744290172766",
    "https://ik.imagekit.io/mehedi004/Avatars/Kartun%20hijab.jpeg?updatedAt=1744290172855",
    "https://ik.imagekit.io/mehedi004/Avatars/Muslim%20membaca%20Alqur'an.jpeg?updatedAt=1744290173565",
    "https://ik.imagekit.io/mehedi004/Avatars/Muslim%20Read%20Quran%20PNG%20Picture,%20Muslim%20Man%20Learning%20And%20Reading%20Quran,%20Muslim,%20Man,%20Holy%20Quran%20PNG%20Image%20For%20Free%20Download.jpeg?updatedAt=1744290174079",
    "https://ik.imagekit.io/mehedi004/Avatars/Muslim%20Women%20Wear%20The%20Syar%20I%20Niqab%20With%20A%20Blue%20Background%20And%20Rose%20Decorations,%20Avatar,%20Muslim,%20Profile%20PNG%20Transparent%20Clipart%20Image%20and%20PSD%20File%20for%20Free%20Download.jpeg?updatedAt=1744290174277"
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
        const res = await fetch(`${serverUrl}/api/users/update/${userInfo._id}`, {
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