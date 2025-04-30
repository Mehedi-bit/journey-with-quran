
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Heart, Share2, MessageCircle } from "lucide-react";
import { Separator } from "../ui/separator";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

import ayahBgPic from "../../assets/ayah_bg.png";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "@/atoms/userAtom";
import postsAtom from "@/atoms/postsAtom";
import  {PostDropDownMenu}  from "./PostDropdownMenu";
import { serverUrl } from "@/serverUrl";




// types interface
interface PostCardProps {
    post: {
        _id: string;
        postedBy: {
            _id: string;
            name: string;
            username: string;
            profilePic: string;
        };
        text: string;
        extra: string;
        likes: string[]; // means array of strings
        // replies: array of objects
        replies: {
            userId: string;
            text: string;
            userProfilePic: string;
            username: string;
            _id: string;
        }[];

    };

    postedBy: string;
}


const PostCard: React.FC<PostCardProps> = ({post, postedBy}) => {

    

    const currentUser = useRecoilValue(userAtom)

    const [liked, setLiked] = useState(post.likes.includes(currentUser?._id));
    const [liking, setLiking] = useState(false);
    
    const [posts, setPosts] = useRecoilState(postsAtom)


    
    const navigate = useNavigate()

    const handleLike = async () => {

        if (!currentUser) {
            toast("Please login to like this post")
            navigate("/auth")
            return;
        }

        if (liking) return; // if already loading, return

        setLiking(true)

        // implement like functionality

        try {

            // server actions
            const res = await fetch(`${serverUrl}/api/posts/like/${post._id}`, {
                method: "PUT",
                credentials: 'include', // ✅ SEND COOKIE
                headers: {
                    "Content-Type": "application/json"
                },
            })

            const data = await res.json();

            if (!res.ok || data.error) {
                toast(data.error)
                return;
            }

            // update the like count
            if (!liked) {

                const updatedPosts = posts.map( (p) => {
                    if (p._id === post._id) {
                        return {...p, likes: [...p.likes, currentUser._id]}
                    }

                    return p;
                })

                setPosts(updatedPosts)


            } else {
                // remove the id of the current user from the likes array of the post
                const updatedPosts = posts.map((p: typeof post) => {
                    if (p._id === post._id) {
                        return { ...p, likes: p.likes.filter((id: string) => id !== currentUser._id) };
                    }

                    return p;
                });

                setPosts(updatedPosts)
            }

            setLiked(!liked)


        } catch (error) {
            toast(`Written ${error}`)
        } finally {
            setLiking(false)
        }




    }





    // function to style and format the text

    function formatPostText(text: string): JSX.Element[] {
        const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|#[^\s]+|https?:\/\/[^\s]+)/g);
      
        return parts.map((part: string, index: number) => {
          // **double-star** → bold + text-lg
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={index} className="font-bold text-neutral-900 dark:text-white text-lg">
                {part.slice(2, -2)}
              </strong>
            );
          }
      
          // *single-star* → bold
          if (part.startsWith("*") && part.endsWith("*")) {
            return (
              <strong key={index} className="font-bold text-neutral-900 dark:text-white">
                {part.slice(1, -1)}
              </strong>
            );
          }
      
          // #hashtag → blue
          if (part.startsWith("#")) {
            return (
              <span key={index} className="text-blue-700  dark:text-blue-400">
                {part}
              </span>
            );
          }
      
          // https://link → blue and clickable
          if (part.startsWith("http://") || part.startsWith("https://")) {
            return (
              <a
                key={index}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700  dark:text-blue-400 underline"
              >
                {part}
              </a>
            );
          }
      
          // Default/plain text
          return <span key={index}>{part}</span>;
        });
    }



    // handle comment click navigation to the post page

    const handleCommentClickNavigation = () => {
        navigate(`/${post.postedBy.username}/post/${post._id}?scrollToComments=true`);
    };


    const fallbackAvatar =
  "https://ik.imagekit.io/mehedi004/Avatars/default3.jpg?updatedAt=1745079116757";



    return (

            <Card className="mb-8 bg-primary/5 dark:bg-neutral-950">
                <CardHeader className="flex flex-row justify-between">

                    {/* Navigate to /username on clicking on this div */}

                    
                    <div className="flex flex-row gap-2" onClick={ (e)=> {
                        e.preventDefault();
                        navigate(`/${post?.postedBy?.username}`)
                    } } >

                        <img 
                            className="h-10 w-10 rounded-full object-cover border border-gray-700 p-0.5 cursor-pointer" 
                            src={post?.postedBy?.profilePic || fallbackAvatar } alt="" />
                        <div>
                            <CardTitle className="cursor-pointer">{post?.postedBy?.name}</CardTitle>
                            <CardDescription className="cursor-pointer">@{post?.postedBy?.username}</CardDescription>
                        </div>
                        
                    </div>


                    <div className="flex gap-5 items-center">
                        <small className="text-sm text-gray-900 dark:text-gray-400">
                            {  formatDistanceToNow(new Date(post.createdAt))  } ago
                        </small>

                        <PostDropDownMenu post={post} />

                    </div>

                    
                </CardHeader>


                <Link to={`/${post.postedBy.username}/post/${post._id}`} className="cursor-pointer">
                    <CardContent>
                        <pre className="bangla-text whitespace-pre-wrap text-neutral-900 dark:text-neutral-200 ">
                            
                            {
                                formatPostText(
                                    post.text
                                )
                            }

                        </pre>
                    </CardContent>
                </Link>


                <CardContent>
                    {
                        // postImg && (
                        //     <img className="rounded-lg object-cover" src={postImg} alt="" />
                        // )

                        post.extra !== "" && (
                            <div className="relative w-full">
                                <img 
                                    className="rounded-lg object-cover w-full h-auto" 
                                    src={ayahBgPic}   // randomBgPic also can be used
                                    alt="" 
                                />
                                <h1 className="absolute inset-0 flex items-center justify-center text-amber-950 text-sm md:text-2xl font-bold  rounded-lg px-4 md:px-8 text-center max-w-[90%] mx-auto" style={{ fontFamily: "'Amiri', serif" }}>
                                    {post.extra}
                                </h1>
                            </div>
                        )

                    }
                </CardContent>

                {/* <CardContent className="flex flex-row gap-5">
                    <span className="text-sm text-gray-500">20 likes</span>
                    <span className="text-sm text-gray-500">5 comments</span>
                </CardContent> */}

                <Separator />

                {/* <CardFooter className="flex flex-row justify-between px-[5%] bg-rose-300"> */}
                <div className="flex flex-row justify-between px-[5%] py-2 cursor-pointer">

                    <div className="flex flex-row gap-1 items-center" onClick={handleLike}>
                        <Heart size={20}
                            onClick={handleLike}
                            className={`cursor-pointer ${liked? "text-red-500 fill-red-500" : "dark:text-white" }`}
                        />
                        <span className="text-sm text-black dark:text-gray-100">
                            {post.likes.length}
                        </span>
                    </div>


                    
                    <div className="flex flex-row gap-1 items-center cursor-pointer" 
                        onClick={handleCommentClickNavigation}
                    >
                        
                            <MessageCircle size={20} className="text-black dark:text-white" />
                            <span className="text-sm dark:text-gray-100">
                                {post.replies.length}
                            </span>
                        
                    </div>


                    <div>
                        <Share2 size={20} />
                    </div>

                </div>
                {/* </CardFooter> */}

            </Card> 

        // </Link>
    );
};

export default PostCard;