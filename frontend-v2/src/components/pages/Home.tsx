import { useEffect, useState } from "react";
import PostCard from "../post/PostCard";
import PostCreateSurface from "../post/PostCreateSurface";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { userAtom } from "@/atoms/userAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import postsAtom from "@/atoms/postsAtom";

const Home = () => {
    const [posts, setPosts] = useRecoilState(postsAtom); // Store all posts
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const currentUserInfo = useRecoilValue(userAtom)

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch("/api/posts/all"); // Fetch all posts
                const data = await res.json();

                if (!res.ok || data.error) {
                    setError(data.error || "Failed to fetch posts");
                    toast(data.error || "Failed to fetch posts");
                    return;
                }

                
                setPosts(data); // Store posts in state
                console.log("data", data)
            } catch (error) {
                toast(`${error}`, { description: "Failed to fetch posts" });
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [setPosts]);

    console.log("posts", posts)

    if (!posts || loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <LoaderIcon className="animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center mt-10 text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    console.log(posts.length)

    return (
        <div className="px-[5%] md:px-[20%] py-5">
            <PostCreateSurface currentUserInfo={currentUserInfo} />

            {/* Render posts dynamically */}
            {posts.length > 0 ? (
                posts.map((post) => (
                    <PostCard
                        key={post._id}
                        // postId={post._id}
                        // likes={post.likes.length}
                        // replies={post.replies.length}
                        // postText={post.text}
                        // postExtra={post.extra || null}
                        // postImg={post.image || null}
                        // name={post.postedBy?.name || "Unknown"}
                        // username={post.postedBy?.username || "Unknown"}
                        // profilePic={post.postedBy?.profilePic}
                        // ayah={post?.extra}
                        post={post}
                        postedBy={post.postedBy}
                    />
                ))
            ) : (
                <p className="text-center mt-5 text-gray-500">No posts found</p>
            )}
        </div>
    );
};

export default Home;
