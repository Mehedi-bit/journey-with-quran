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


  return (
    <div className="mb-0">
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
            <pre className="text-sm bangla-text whitespace-pre-wrap dark:text-gray-200">
                {formatPostText(text)}
            </pre>
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