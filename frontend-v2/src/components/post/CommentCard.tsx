
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Heart } from "lucide-react";



interface CommentCardProps {
    name: string;
    username: string;
    comment: string;
    profilePic: string;
    likes: number;
}



const CommentCard: React.FC<CommentCardProps> = ({name, username, comment, profilePic, likes }) => {

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
        setLiked(!liked)
        setLikeCount(liked? likeCount-1 : likeCount+1)
  }



  return (
    <div>
        <div className="flex flex-row gap-3">

            <Avatar>
                <AvatarImage src={profilePic} alt="user" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>


            <div className="w-full flex flex-col gap-2">

                <div className="flex flex-col gap-1 border rounded-lg p-3 w-full bg-neutral-900">
                    <h2 className="font-semibold">{name}</h2>
                    <p className="text-sm text-gray-200">{comment}</p>
                </div>

                <div className="flex flex-row items-center gap-2">
                    <Heart size={18} className={`ml-3 cursor-pointer ${liked? "text-rose-500 fill-rose-500" : "text-gray-500"}`}
                        onClick={handleLike}
                    />

                    <span className="text-sm text-gray-500">{likeCount}</span>
                </div>

            </div>

        </div>

    </div>
  )
}

export default CommentCard
