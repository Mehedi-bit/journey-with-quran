import { useRecoilState, useRecoilValue } from "recoil"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import CommentCard from "./CommentCard"
import { userAtom } from "@/atoms/userAtom"
import { useState } from "react"
import { toast } from "sonner"
import { set } from "react-hook-form"
import { LoaderCircle } from "lucide-react"
import postsAtom from "@/atoms/postsAtom"
import { serverUrl } from "@/serverUrl"





// const replies = [
//   {
//     userId: 1,
//     text: "I also love medina",
//     userProfilePic: "https://api.dicebear.com/9.x/rings/svg?seed=Fatima",
//     username: "ahmad_nufais",
//     name: "Ahmad Nufais",
//   },

//   {
//     userId: 2,
//     text: "I also love medina",
//     userProfilePic: "https://api.dicebear.com/9.x/rings/svg?seed=Destiny",
//     username: "ahmad_nufais",
//     name: "Ahmad Nufais",
//   },

//   {
//     userId: 3,
//     text: "I also love medina",
//     userProfilePic: "https://api.dicebear.com/9.x/rings/svg?seed=Destiny",
//     username: "ahmad_nufais",
//     name: "Ahmad Nufais",
//   },

  
// ]



const CommentsCard = ({post, userData}) => {

  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const currentUserInfo = useRecoilValue(userAtom)
  const [posts, setPosts] = useRecoilState(postsAtom)

  const handleCommentSubmit = async (e) => {
    e.preventDefault()

    if (!currentUserInfo) return toast("You need to login to comment");

    if (loading) return;

    setLoading(true)

    try {
      
      // server actions
      const res = await fetch(`${serverUrl}/api/posts/reply/${post._id}`, {
        method: "PUT",
        credentials: 'include', // ✅ SEND COOKIE
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: comment
        })
      })


      const data = await res.json()

      if (data.error) {
        console.log(data.error)
        toast(data.error)
        return;
      }

      
      // otherwise, success

      const updatedPosts = posts.map((p)=> {
        if (p._id == post._id) {
          return {...p, replies: [...p.replies, data]}
        }

        return p;
      })

      setPosts(updatedPosts)

      console.log(data)
      setLoading(false)
      setComment("")


    
    } catch (error) {
      toast(`${error}`, {
        description: "Failed to submit comment"
      })
    } finally {
      setLoading(false)
    }


  }





  return (

    <div className="p-5 flex flex-col gap-10">



      <div className="flex flex-col gap-2 border-b-0 border-gray-500">
        <h1 className="font-semibold text-lg">Replies</h1>
        <p className="text-sm dark:text-gray-300">Join the discussion and share your thoughts</p>
      </div>



        {/* @TODO: (Complete but can be optimized by separate component) COMMENTER | YOUR COMMENT HERE */}

        <div className="flex flex-row gap-3">

          {/* current user */}
          <Avatar>
            <AvatarImage className="object-cover" src={currentUserInfo?.profilePic} alt="User" />
            <AvatarFallback>🤍</AvatarFallback>
          </Avatar>

          <form className="flex flex-col w-full gap-4" onSubmit={handleCommentSubmit}>
            <Textarea value={comment} placeholder="Type your comment here." onChange={(e) => setComment(e.target.value)} 
              className="bg-white dark:bg-neutral-950"  
            />
            <Button size="sm" className="w-20">
              {loading ? <LoaderCircle className="animate-spin"/> : "Comment"}
            </Button>
          </form>

        </div>



      


      {

        post.replies.map((reply, index) => (
          <CommentCard
            key={reply._id}
            reply={reply}
          />
        ))

      }





      
      




    </div>

  )
}

export default CommentsCard
