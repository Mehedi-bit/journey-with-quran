
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Heart, Share2, MessageCircle, LoaderIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { use, useEffect, useState } from "react";
import { PostDropDownMenu } from "../post/PostDropdownMenu";
import CommentsCard from "../post/CommentsCard";

import ayahBgPic from "../../assets/ayah_bg.png";
import ayahBgPic3 from "../../assets/ayah_bg3.jpg";
import ayahBgPic4 from "../../assets/ayah_bg4.jpg";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useRecoilState, useRecoilValue } from "recoil";
import postsAtom from "@/atoms/postsAtom";
import { userAtom } from "@/atoms/userAtom";
import { serverUrl } from "@/serverUrl";


// shuffle and get a random image from these images
const bgPics = [ayahBgPic, ayahBgPic3, ayahBgPic4];
const randomBgPic = bgPics[Math.floor(Math.random() * bgPics.length)];





const PostPage = () => {


    
    
    const [posts, setPosts] = useRecoilState(postsAtom)
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const currentUser = useRecoilValue(userAtom)

    const currentPost = posts[0]

    const [liked, setLiked] = useState(currentPost?.likes.includes(currentUser?._id));
    const [liking, setLiking] = useState(false);
    

    //   get postID from url
    const { pid } = useParams<{ pid: string }>();
    console.log("pid:", pid)

    const handleLike = async () => {

        if (!currentUser) return toast("Login first")

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

            // otherwise, okay, setPost
            console.log(data)

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


    
    console.log("postedBy from postPage", postedBy)

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

                // otherwise, okay, set the userData
                console.log("userData", data)

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


    if (loading || userLoading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <LoaderIcon className="animate-spin" />
            </div>
        );
    }

    if (!currentPost || !userData) return null;


  return (

      <div className="px-4 md:px-[20%]">

          <Card className="mb-8 ">
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
                        
                        {currentPost?.text}

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
                          className={`cursor-pointer ${liked? "text-red-500 fill-red-500" : "text-white" }`}
                      />
                      <span className="text-sm text-gray-100">
                          {currentPost?.likes.length}
                      </span>
                  </div>
 
                  <div className="flex flex-row gap-1 items-center">
                      <MessageCircle size={20} />
                      <span className="text-sm text-gray-100">
                            {currentPost?.replies.length}
                      </span>
                  </div>

                  <div>
                      <Share2 size={20} />
                  </div>

              </div>


              

              {/* COMMENTS HERE */}

              <CommentsCard post={currentPost} userData={userData} />

              



              {/* </CardFooter> */}

          </Card> 



        </div>
  );
};

export default PostPage;