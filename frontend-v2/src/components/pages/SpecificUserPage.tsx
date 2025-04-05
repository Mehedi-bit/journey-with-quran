import { useParams, useNavigate } from "react-router-dom"
import PostCard from "../post/PostCard"
import UserHeader from "../user/UserHeader"
import { useEffect, useState } from "react"
import { LoaderIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { useRecoilState } from "recoil"
import postsAtom from "@/atoms/postsAtom"

const SpecificUserPage = () => {
    const [userData, setUserData] = useState(null)
    const [posts, setPosts] = useRecoilState(postsAtom) // Store user posts
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { username } = useParams<{ username: string }>()
    const navigate = useNavigate()

    useEffect(() => {
        const getUserData = async () => {
            setLoading(true)
            setError(null)
            try {
                // Fetch user data
                const userRes = await fetch(`/api/users/profile/${username}`)
                const userData = await userRes.json()

                if (!userRes.ok || userData.error) {
                    setError(userData.error || "User not found")
                    toast(userData.error || "User not found")
                    return
                }

                setUserData(userData)

                // Fetch user's posts
                const postsRes = await fetch(`/api/posts/user/${username}`)
                const postsData = await postsRes.json()

                if (!postsRes.ok || postsData.error) {
                    setError(postsData.error || "No posts found")
                    toast(postsData.error || "No posts found")
                    return
                }

                setPosts(postsData) // Store posts in state
            } catch (error) {
                toast(`${error}`, {
                  description: "Failed to fetch data"
                })
            } finally {
                setLoading(false)
            }
        }

        getUserData()
    }, [username, setPosts])


    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <LoaderIcon className="text-center animate-spin" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center mt-10">
                <Button variant="link" onClick={() => navigate("/")} className="mt-5">
                    Go back to home
                </Button>
            </div>
        )
    }

    return (
        <div className="px-[5%] md:px-[20%]">
            <div className="px-[5%] md:px-0">
                <UserHeader userData={userData} />
            </div>

            {/* Render posts dynamically */}
            {posts.length > 0 ? (
                posts.map((post) => (
                    <PostCard
                        key={post._id}
                        // postId={post._id} // Post ID
                        // likes={post.likes.length} // Likes array length
                        // replies={post.replies.length} // Replies array length
                        // postText={post.text} // Combine text and extra if exists
                        // postExtra={post.extra || null} // If extra exists, show it
                        // postImg={post.image || null} // If image exists, show it

                        // name={post.postedBy.name} 
                        // username={post.postedBy.username} 
                        // profilePic={post.postedBy.profilePic} 
                        post={post}
                        postedBy={post.postedBy}
                    />
                ))
            ) : (
                <p className="text-center mt-5 text-gray-500">No posts found</p>
            )}
        </div>
    )
}

export default SpecificUserPage
