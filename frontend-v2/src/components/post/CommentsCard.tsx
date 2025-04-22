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
    e.preventDefault();
  
    if (!currentUserInfo) return toast("You need to login to comment");
    if (loading) return;
    if (!comment.trim()) return toast("Comment cannot be empty");
  
    setLoading(true);
  
    try {
      const res = await fetch(`${serverUrl}/api/posts/reply/${post._id}`, {
        method: "PUT",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: comment
        })
      });
  
      const data = await res.json();
  
      if (data.error) {
        toast.error(data.error);
        return;
      }
  
      // ✅ Important: Verify the response contains _id before updating state
      if (!data._id) {
        throw new Error("Server didn't return comment ID");
      }
  
      // Update state immutably
      setPosts(prevPosts => 
        prevPosts.map(p => 
          p._id === post._id
            ? { ...p, replies: [...p.replies, data] }
            : p
        )
      );
  
      toast.success("Comment added successfully");
      setComment("");
  
    } catch (error) {
      console.error("Comment submission error:", error);
      toast.error(error.message || "Failed to submit comment");
    } finally {
      setLoading(false);
    }
  };





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
            post={post}
            reply={reply}
          />
        ))

      }





      
      




    </div>

  )
}

export default CommentsCard
