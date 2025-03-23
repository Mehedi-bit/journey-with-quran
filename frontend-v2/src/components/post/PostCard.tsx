
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { PostDropDownMenu } from "./PostDropdownMenu";
import { Heart, Share2, MessageCircle } from "lucide-react";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import ayahBgPic from "../../assets/ayah_bg.png";
import ayahBgPic3 from "../../assets/ayah_bg3.jpg";
import ayahBgPic4 from "../../assets/ayah_bg4.jpg";


// shuffle and get a random image from these images
const bgPics = [ayahBgPic, ayahBgPic3, ayahBgPic4];
const randomBgPic = bgPics[Math.floor(Math.random() * bgPics.length)];


// types interface
interface PostCardProps {
    postId: string;
    likes: number;
    replies: number;
    postText: string;
    postExtra?: string;
    postImg?: string;

    name: string;
    username: string;
    profilePic: string;
    ayah: string;
}


const PostCard: React.FC<PostCardProps> = ({postId, likes, replies, postText, postImg, name, username, profilePic, ayah}) => {


    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);
    const [loading, setLoading] = useState(false);

    const handleLike = async () => {

        if (loading) return; // if already loading, return

        setLoading(true)

        // implement like functionality

        try {

            // server actions
            const res = await fetch(`/api/posts/like/${postId}`, {
                method: "PUT",
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
            setLiked(!liked)
            setLikeCount(liked? likeCount - 1 : likeCount + 1)

            toast(data.message)


        } catch (error) {
            toast(`${error}`)
        } finally {
            setLoading(false)
        }




    }





    return (
        // <Link to="/mehedi/post/1">

            <Card className="mb-8">
                <CardHeader className="flex flex-row justify-between">
                    <div className="flex flex-row gap-2">
                        <img 
                            className="h-10 w-10 rounded-full object-cover border border-gray-700 p-0.5" 
                            src={profilePic} alt="" />
                        <div>
                            <CardTitle>{name}</CardTitle>
                            <CardDescription>@{username}</CardDescription>
                        </div>
                    </div>

                    <PostDropDownMenu />
                    
                </CardHeader>


                <Link to="/mehedi/post/1">
                    <CardContent>
                        <p>
                            
                            {postText}

                        </p>
                    </CardContent>
                </Link>


                <CardContent>
                    {
                        // postImg && (
                        //     <img className="rounded-lg object-cover" src={postImg} alt="" />
                        // )

                        ayah !== "" && (
                            <div className="relative w-full">
                                <img 
                                    className="rounded-lg object-cover w-full h-auto" 
                                    src={ayahBgPic}   // randomBgPic also can be used
                                    alt="" 
                                />
                                <h1 className="absolute inset-0 flex items-center justify-center text-amber-950 text-sm md:text-2xl font-bold  rounded-lg px-4 md:px-8 text-center max-w-[90%] mx-auto" style={{ fontFamily: "'Amiri', serif" }}>
                                    {ayah}
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
                            {likeCount}
                        </span>
                    </div>


                    {/* <Link to="/mehedi/post/1"> */}
                        <div className="flex flex-row gap-1 items-center">
                            
                                <MessageCircle size={20} />
                                <span className="text-sm text-gray-100">
                                    {replies}
                                </span>
                            
                        </div>
                    {/* </Link> */}


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