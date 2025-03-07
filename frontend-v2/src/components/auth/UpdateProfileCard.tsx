
import {
    useState
  } from "react"
  import {
    toast
  } from "sonner"
  import {
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
import { profile } from "console"
  
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
    const preview = usePreviewImage(file);
    const [userInfo, setUserInfo] = useRecoilState(userAtom)

    const [inputs, setInputs] = useState({
      name: JSON.parse(userInfo)?.name,
      username: JSON.parse(userInfo)?.username,
      email: JSON.parse(userInfo)?.email,
      password: JSON.parse(userInfo)?.password,
      bio: JSON.parse(userInfo)?.bio,
      profilePic: JSON.parse(userInfo)?.profilePic,
    })


    console.log(inputs)



    console.log(userInfo)
    
    const dropZoneConfig = {
      maxFiles: 5,
      maxSize: 1024 * 1024 * 4,
      multiple: true,
    };
    const form = useForm < z.infer < typeof formSchema >> ({
      resolver: zodResolver(formSchema),
  
    })
  
    function onSubmit(values: z.infer < typeof formSchema > ) {
      try {
        console.log(values);
        toast(
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(values, null, 2)}</code>
          </pre>
        );
      } catch (error) {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
      }
    }
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10 px-5">

              <div className="flex items-center justify-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={preview} defaultValue={JSON.parse(userInfo)?.profilePic} alt="@user" className="object-cover"/>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
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
                        onChange={(e) => setFile(e.target.files[0])}
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
                  defaultValue={JSON.parse(userInfo)?.name}
                  type=""
                  {...field} />
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
                  defaultValue={JSON.parse(userInfo)?.username}
                  type=""
                  {...field} />
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
                  defaultValue={JSON.parse(userInfo)?.email}
                  type="email"
                  {...field} />
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
                  <PasswordInput placeholder="Your password" {...field} />
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
                    defaultValue={JSON.parse(userInfo)?.bio}
                    {...field}
                  />
                </FormControl>
                <FormDescription>keep it blank if you don't want to update it</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update</Button>
        </form>
      </Form>
    )
  }