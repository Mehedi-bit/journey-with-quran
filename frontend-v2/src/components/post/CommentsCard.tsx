import { useRecoilState, useRecoilValue } from "recoil"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import CommentCard from "./CommentCard"
import { userAtom } from "@/atoms/userAtom"
import { useState } from "react"
import { toast } from "sonner"
import { LoaderCircle } from "lucide-react"
import postsAtom from "@/atoms/postsAtom"
import { serverUrl } from "@/serverUrl"

const CommentsCard = ({ post, userData }) => {
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const currentUserInfo = useRecoilValue(userAtom)
  const [posts, setPosts] = useRecoilState(postsAtom)

  const handleCommentSubmit = async (e) => {
    e.preventDefault()

    if (!currentUserInfo) return toast("You need to login to comment")
    if (loading) return

    // Normalize comment:
    // 1. Remove trailing blank lines
    // 2. Limit multiple blank lines to one
    const cleanedComment = comment
      .replace(/\n{3,}/g, '\n\n')   // More than 2 newlines → just 2 (1 blank line)
      .replace(/\s+$/g, '')        // Remove trailing spaces/newlines

    if (!cleanedComment.trim()) return toast("Comment cannot be empty")

    setLoading(true)

    try {
      const res = await fetch(`${serverUrl}/api/posts/reply/${post._id}`, {
        method: "PUT",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: cleanedComment
        })
      })

      const data = await res.json()

      if (data.error) {
        toast.error(data.error)
        return
      }

      if (!data._id) {
        throw new Error("Server didn't return comment ID")
      }

      setPosts(prevPosts =>
        prevPosts.map(p =>
          p._id === post._id
            ? { ...p, replies: [...p.replies, data] }
            : p
        )
      )

      toast.success("Comment added successfully")
      setComment("")

    } catch (error) {
      console.error("Comment submission error:", error)
      toast.error(error.message || "Failed to submit comment")
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

      <div className="flex flex-row gap-3">
        <Avatar>
          <AvatarImage className="object-cover" src={currentUserInfo?.profilePic} alt="User" />
          <AvatarFallback>🤍</AvatarFallback>
        </Avatar>

        <form className="flex flex-col w-full gap-4" onSubmit={handleCommentSubmit}>
          <Textarea
            value={comment}
            placeholder="Type your comment here."
            onChange={(e) => setComment(e.target.value)}
            className="bg-white dark:bg-neutral-950"
          />
          <Button size="sm" className="w-20">
            {loading ? <LoaderCircle className="animate-spin" /> : "Comment"}
          </Button>
        </form>
      </div>

      {
        post.replies.map((reply) => (
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
