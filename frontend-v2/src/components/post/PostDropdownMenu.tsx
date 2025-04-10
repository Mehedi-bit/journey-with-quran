
import postsAtom from "@/atoms/postsAtom"
import { userAtom } from "@/atoms/userAtom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { serverUrl } from "@/serverUrl"
import { EllipsisVertical } from "lucide-react"
import { useRecoilState, useRecoilValue } from "recoil"
import { toast } from "sonner"







export function PostDropDownMenu({post}) {

  const [posts, setPosts] = useRecoilState(postsAtom)

  const currentUser = useRecoilValue(userAtom)

  const currentTime = new Date().toLocaleTimeString().toString()

  


  const handleDeletePost = async (e) => {

    e.preventDefault()

    if (!window.confirm("Are you sure you want to delete this post?")) return;

      try {
        // server actions
        const res = await fetch(`${serverUrl}/api/posts/${post._id}`, {
          method: "DELETE",
          credentials: 'include', // ✅ SEND COOKIE
        })

        const data = await res.json()

        if (data.error) {
          toast(data.error)
          return;
        }

        // otherwise, okay, post deleted
        toast(data.message)

        setPosts(prev => prev.filter( p => p._id !== post._id ))


      } catch (error) {
        toast(`${error}`)
      }
  }


  if (!post) {
    console.log("Post prop is undefined at first render");
    return null;
  }




  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical color="white" size={18} className="cursor-pointer"/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">

        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" onClick={()=>{
            
            toast("Coming soon", {
              description: currentTime,
              action: {
                label: "Thanks",
                onClick: () => console.log("Thanks"),
              },
            })

          }}>
            Save the Post
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          
          <DropdownMenuItem>
            Report
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>


          {

            (currentUser && currentUser._id === post.postedBy._id) &&
              
                <DropdownMenuItem onClick={handleDeletePost}>
                  Delete the post
                  <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                </DropdownMenuItem>
            
          }

          
          
        </DropdownMenuGroup>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
