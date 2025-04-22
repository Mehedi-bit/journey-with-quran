import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { CommentDropdownMenu } from "./CommentDropdownMenu";

interface CommentCardProps {
  post: {
    _id: string;
    replies: Array<{
      _id: string;
      userId: string;
      text: string;
      userProfilePic: string;
      username: string;
      name: string;
    }>;
  };
  reply: {
    _id: string;
    userId: string;
    text: string;
    userProfilePic: string;
    username: string;
    name: string;
  };
}

const CommentCard: React.FC<CommentCardProps> = ({ post, reply }) => {
  const { text, userProfilePic, username, name, _id } = reply;

  return (
    <div className="mb-4">
      <div className="flex flex-row gap-3">
        <Link to={`/${username}`} className="flex-shrink-0">
          <Avatar>
            <AvatarImage 
              className="object-cover" 
              src={userProfilePic} 
              alt={`${name}'s profile`} 
            />
            <AvatarFallback>🤍</AvatarFallback>
          </Avatar>
        </Link>

        <div className="w-full flex flex-row gap-2 items-start">
          <div className="flex flex-col gap-1 border rounded-lg p-3 w-full bg-white dark:bg-neutral-900">
            <h2 className="font-semibold">{name}</h2>
            <p className="text-sm dark:text-gray-200">{text}</p>
          </div>
          
          <CommentDropdownMenu 
            post={post} 
            comment={reply} 
            commentId={_id} 
          />
        </div>
      </div>
    </div>
  );
};

export default CommentCard;