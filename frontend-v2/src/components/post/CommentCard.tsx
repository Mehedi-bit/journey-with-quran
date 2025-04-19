
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";



interface CommentCardProps {
    reply: {
        userId: string;
        text: string;
        userProfilePic: string;
        username: string;
        name: string;
        _id: string;
    }
}



const CommentCard: React.FC<CommentCardProps> = ({ reply }) => {

    const { userId, text, userProfilePic, username, name } = reply;

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(1);

    const handleLike = () => {
            setLiked(!liked)
            setLikeCount(liked? likeCount-1 : likeCount+1)
    }




  return (
    <div>
        <div className="flex flex-row gap-3">

            <Link to={`/${username}`}>
                <Avatar>
                    <AvatarImage className="object-cover" src={userProfilePic} alt="user" />
                    <AvatarFallback>🤍</AvatarFallback>
                </Avatar>
            </Link>


            <div className="w-full flex flex-col gap-2">

                <div className="flex flex-col gap-1 border rounded-lg p-3 w-full bg-white dark:bg-neutral-900">
                    <h2 className="font-semibold">{name}</h2>
                    <p className="text-sm dark:text-gray-200">{text}</p>
                </div>


                {/* @TODO: LOVE REACT ON COMMENT */}
                {/* <div className="flex flex-row items-center gap-2">
                    <Heart size={18} className={`ml-3 cursor-pointer ${liked? "text-rose-500 fill-rose-500" : "text-gray-500"}`}
                        onClick={handleLike}
                    />

                    <span className="text-sm text-gray-500">{likeCount}</span>
                </div> */}

            </div>

        </div>

    </div>
  )
}

export default CommentCard
