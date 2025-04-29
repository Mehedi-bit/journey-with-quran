
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Heart, Share2, MessageCircle, LoaderIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { useEffect, useRef, useState } from "react";
import { PostDropDownMenu } from "../post/PostDropdownMenu";
import CommentsCard from "../post/CommentsCard";

import ayahBgPic from "../../assets/ayah_bg.png";
import ayahBgPic3 from "../../assets/ayah_bg3.jpg";
import ayahBgPic4 from "../../assets/ayah_bg4.jpg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useRecoilState, useRecoilValue } from "recoil";
import postsAtom from "@/atoms/postsAtom";
import { userAtom } from "@/atoms/userAtom";
import { serverUrl } from "@/serverUrl";


// shuffle and get a random image from these images
const bgPics = [ayahBgPic, ayahBgPic3, ayahBgPic4];
const randomBgPic = bgPics[Math.floor(Math.random() * bgPics.length)];





const PostPage = () => {


    const location = useLocation();
    const commentRef = useRef(null);

    
    
    const [posts, setPosts] = useRecoilState(postsAtom)
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const currentUser = useRecoilValue(userAtom)

    const currentPost = posts[0]

    const [liked, setLiked] = useState(currentPost?.likes.includes(currentUser?._id));
    const [liking, setLiking] = useState(false);
    
    const navigate = useNavigate()

    //   get postID from url
    const { pid } = useParams<{ pid: string }>();

    const handleLike = async () => {

        if (!currentUser) {
            toast('Please login to like this post')
            navigate('/auth')
            return;
        }

        if (liking) return; // if already loading, return

        setLiking(true)

        // implement like functionality

        try {

            // server actions
            const res = await fetch(`${serverUrl}/api/posts/like/${currentPost?._id}`, {
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
                    if (p._id === currentPost?._id) {
                        return {...p, likes: [...p.likes, currentUser._id]}
                    }

                    return p;
                })

                setPosts(updatedPosts)


            } else {
                // remove the id of the current user from the likes array of the post
                const updatedPosts = posts.map((p) => {
                    if (p._id === currentPost?._id) {
                        return { ...p, likes: p.likes.filter((id) => id !== currentUser._id) };
                    }

                    return p;
                });

                setPosts(updatedPosts)
            }

            setLiked(!liked)


        } catch (error) {
            toast(`${error}`)
        } finally {
            setLiking(false)
        }




    }


    
    // fetch post by postID
    useEffect(() => {


        // fetch post by postID
        
        const getPost = async () => {

            setLoading(true)

            try {
                // server actions
            const res = await fetch(`${serverUrl}/api/posts/${pid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })


            // get response data
            const data = await res.json()

            if (data.error) {
                console.log(data.error)
                // show toast
                toast('Failed to fetch post', {
                    description: data.error
                })
                return;
            }


            setPosts([data])
            setLoading(false)

            } catch (error) {
                toast(`${error}`)
            }   finally {
                setLoading(false)
            }
            

        }


        // call the function
        getPost()



    }, [pid, setPosts])


    // get the user who posted this post
    
    const postedBy = currentPost?.postedBy;


    

    // get the user data of the user who posted this post

    useEffect(()=>{

        const getUser = async () => {

            setUserLoading(true)

            try {
                // server actions
                const res = await fetch(`${serverUrl}/api/users/profile/${postedBy._id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

        
                const data = await res.json()
                

                if (data.error) {
                    console.log(data.error)
                    // show toast
                    toast('Failed to fetch user', {
                        description: data.error
                    })
                    return;
                }


                setUserData(data)
                setUserLoading(false)


            } catch (error) {
                toast(`${error}`)
            }  finally {
                setUserLoading(false)
            }
        }

        // 🔥 call the function only when the postedBy is available
        if (postedBy) {
            getUser()
        }
        
    }, [postedBy])







    // function to style and format the text

    function formatPostText(text: string): JSX.Element[] {
        const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|#[^\s]+|https?:\/\/[^\s]+)/g);
      
        return parts.map((part: string, index: number) => {
          // **double-star** → bold + text-lg
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={index} className="font-bold text-black dark:text-white text-lg">
                {part.slice(2, -2)}
              </strong>
            );
          }
      
          // *single-star* → bold
          if (part.startsWith("*") && part.endsWith("*")) {
            return (
              <strong key={index} className="font-bold text-black dark:text-white">
                {part.slice(1, -1)}
              </strong>
            );
          }
      
          // #hashtag → blue
          if (part.startsWith("#")) {
            return (
              <span key={index} className="text-blue-400">
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
                className="text-blue-400 underline"
              >
                {part}
              </a>
            );
          }
      
          // Default/plain text
          return <span key={index}>{part}</span>;
        });
    }
    


    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const shouldScroll = params.get("scrollToComments") === "true";
    
        // Only try scrolling when currentPost has loaded
        if (shouldScroll && currentPost) {
          const interval = setInterval(() => {
            if (commentRef.current) {
              commentRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
              clearInterval(interval); // Stop checking once done
            }
          }, 100); // Try every 100ms until commentRef is available
    
          return () => clearInterval(interval); // Cleanup
        }
    }, [location.search, currentPost]); // Run when currentPost is ready
    




    if (loading || userLoading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <LoaderIcon className="animate-spin" />
            </div>
        );
    }

    if (!currentPost || !userData) return null;


  return (

      <div className="px-4 md:px-[20%] pb-10">

          <Card className="mb-8 pb-4 bg-primary/5 dark:bg-neutral-950">
              <CardHeader className="flex flex-row justify-between">
                  <div className="flex flex-row gap-2">
                      <img 
                          className="h-10 w-10 rounded-full object-cover border border-gray-700 p-0.5" 
                          src={userData?.profilePic} alt="" />
                      <div>
                          <CardTitle>{userData?.name}</CardTitle>
                          <CardDescription>@{userData?.username}</CardDescription>
                      </div>
                  </div>

                  <PostDropDownMenu post={currentPost} />
                  
              </CardHeader>


                <CardContent>
                    <pre className="bangla-text whitespace-pre-wrap">
                        
                        {
                            formatPostText(
                                currentPost?.text
                            )
                        }

                    </pre>
                </CardContent>



              <CardContent>
                      

                {
                    currentPost?.extra !=="" && (
                        <div className="relative w-full">
                            <img 
                                className="rounded-lg object-cover w-full h-auto" 
                                src={ayahBgPic}   
                                alt="" 
                            />
                            <h1 className="absolute inset-0 flex items-center justify-center text-amber-950 text-sm md:text-2xl font-bold  rounded-lg px-4 md:px-8 text-center max-w-[90%] mx-auto" style={{ fontFamily: "'Amiri', serif" }}>
                                {currentPost?.extra}
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
                      <span className="text-sm dark:text-gray-100">
                          {currentPost?.likes.length}
                      </span>
                  </div>
 
                  <div className="flex flex-row gap-1 items-center"
                  >
                        <a href="#comment-box">
                            <MessageCircle size={20} />
                        </a>
                        <span className="text-sm dark:text-gray-100">
                                {currentPost?.replies.length}
                        </span>
                  </div>

                  <div>
                      <Share2 size={20} />
                  </div>

              </div>


              

              {/* COMMENTS HERE */}

                <div ref={commentRef} id="comment-box">
                    <CommentsCard post={currentPost} userData={userData} />
                </div>

              



              {/* </CardFooter> */}

          </Card> 



        </div>
  );
};

export default PostPage;