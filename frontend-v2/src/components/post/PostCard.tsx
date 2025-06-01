import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Share2, MessageCircle } from "lucide-react";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

import ayahBgPic from "../../assets/ayah_bg.png";

import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "@/atoms/userAtom";
import postsAtom from "@/atoms/postsAtom";

import { PostDropDownMenu } from "./PostDropdownMenu";
import { serverUrl } from "@/serverUrl";

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
    likes: string[];
    replies: {
      userId: string;
      text: string;
      userProfilePic: string;
      username: string;
      _id: string;
    }[];
    createdAt: string;
  };
  postedBy: string;
}

const MAX_CHAR_COUNT = 300;

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [showMore, setShowMore] = useState(false);
  const currentUser = useRecoilValue(userAtom);
  const [liked, setLiked] = useState(post.likes.includes(currentUser?._id));
  const [liking, setLiking] = useState(false);
  const [posts, setPosts] = useRecoilState(postsAtom);
  const navigate = useNavigate();

  const handleLike = async () => {
    if (!currentUser) {
      toast("Please login to like this post");
      navigate("/auth");
      return;
    }
    if (liking) return;
    setLiking(true);

    try {
      const res = await fetch(`${serverUrl}/api/posts/like/${post._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        toast(data.error);
        return;
      }

      // Update global posts state
      const updated = posts.map((p) =>
        p._id === post._id
          ? {
              ...p,
              likes: liked
                ? p.likes.filter((id) => id !== currentUser._id)
                : [...p.likes, currentUser._id],
            }
          : p
      );
      setPosts(updated);
      setLiked(!liked);
    } catch (error) {
      toast(`Error: ${error}`);
    } finally {
      setLiking(false);
    }
  };

  // Format the post text with markdown-like formatting and preserve line breaks
  function formatPostText(text: string): JSX.Element[] {
    const lines = text.split(/\n/);

    return lines.flatMap((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={`br-${i}`} />;

      const isQuote = trimmed.startsWith(">");
      const content = isQuote ? trimmed.slice(1).trim() : line;

      const parts = content.split(/(\*\*[^*]+\*\*|\*[^*]+\*|#[^\s]+|https?:\/\/[^\s]+)/g);

      const elems = parts.map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong
              key={`${i}-${j}`}
              className="font-bold text-neutral-900 dark:text-white text-lg"
            >
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <strong key={`${i}-${j}`} className="font-bold">
              {part.slice(1, -1)}
            </strong>
          );
        }
        if (part.startsWith("#")) {
          return (
            <span key={`${i}-${j}`} className="text-blue-700 dark:text-blue-400">
              {part}
            </span>
          );
        }
        if (/^https?:\/\//.test(part)) {
          return (
            <a
              key={`${i}-${j}`}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-700 dark:text-blue-400"
            >
              {part}
            </a>
          );
        }
        return <span key={`${i}-${j}`}>{part}</span>;
      });

      return isQuote ? (
        <blockquote
          key={`bq-${i}`}
          className="border-l-4 border-gray-400 pl-4 italic text-gray-600 dark:text-gray-300 my-2"
        >
          {elems}
        </blockquote>
      ) : (
        <p key={`p-${i}`} className="my-1">
          {elems}
        </p>
      );
    });
  }

  // Truncate text preserving line breaks without cutting mid-line
  function truncatePreservingLineBreaks(text: string, maxChars: number): string {
    if (text.length <= maxChars) return text;

    let count = 0;
    let result = "";

    for (const line of text.split("\n")) {
      if (count + line.length + 1 > maxChars) break;
      result += line + "\n";
      count += line.length + 1;
    }

    if (!result) {
      // fallback to word truncation if first line too long
      const words = text.split(/\s+/);
      let truncated = "";
      for (const word of words) {
        if ((truncated + " " + word).length > maxChars) break;
        truncated += (truncated ? " " : "") + word;
      }
      return truncated + "..";
    }

    return result.trimEnd() + "..";
  }

  const fullTextTrimmed = post.text.trimEnd();
  const isLong = fullTextTrimmed.length > MAX_CHAR_COUNT;
  const truncated = truncatePreservingLineBreaks(fullTextTrimmed, MAX_CHAR_COUNT);
  const shouldShowMore = isLong && truncated !== fullTextTrimmed;
  const displayedText = showMore ? fullTextTrimmed : truncated;

  const goToComments = () =>
    navigate(`/${post.postedBy.username}/post/${post._id}?scrollToComments=true`);

  const fallbackAvatar =
    "https://ik.imagekit.io/mehedi004/Avatars/default3.jpg?updatedAt=1745079116757";

  return (
    <Card className="mb-8 bg-primary/5 dark:bg-neutral-950">
      <CardHeader className="flex justify-between flex-row">
        <div
          className="flex gap-2 cursor-pointer"
          onClick={() => navigate(`/${post.postedBy.username}`)}
        >
          <img
            src={post.postedBy.profilePic || fallbackAvatar}
            alt="user avatar"
            className="h-10 w-10 rounded-full object-cover border border-gray-700 p-0.5"
          />
          <div>
            <CardTitle>{post.postedBy.name}</CardTitle>
            <CardDescription>@{post.postedBy.username}</CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <small className="text-sm text-gray-900 dark:text-gray-400">
            {formatDistanceToNow(new Date(post.createdAt))} ago
          </small>
          <PostDropDownMenu post={post} />
        </div>
      </CardHeader>

      {/* Text content container preserving your design */}
      <CardContent
        className="cursor-pointer"
        onClick={() => navigate(`/${post.postedBy.username}/post/${post._id}`)}
      >
        <div className="bangla-text whitespace-pre-wrap text-neutral-900 dark:text-neutral-200">
          {formatPostText(displayedText)}

          {/* Show see more link only if truncated and not currently expanded */}
          {!showMore && shouldShowMore && (
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowMore(true);
              }}
              className="block mt-1 text-blue-500 cursor-pointer"
            >
              see more..
            </span>
          )}
        </div>
      </CardContent>

      {/* Optional extra content */}
      {post.extra && (
        <CardContent>
          <div className="relative w-full">
            <img
              src={ayahBgPic}
              alt="Ayah background"
              className="w-full h-auto rounded-lg object-cover"
            />
            <h1
              className="absolute inset-0 mx-auto flex items-center justify-center px-4 md:px-8 text-center text-amber-950 text-sm md:text-2xl font-bold"
              style={{ fontFamily: "'Amiri', serif" }}
            >
              {post.extra}
            </h1>
          </div>
        </CardContent>
      )}

      <Separator />

      
      
      {/* Like, comment, share buttons */}
      <div className="flex justify-between px-[5%] py-2">
        <div className="flex items-center gap-1" onClick={handleLike}>
          <Heart
            size={20}
            className={`cursor-pointer ${
              liked ? "text-red-500 fill-red-500" : "dark:text-white"
            }`}
          />
          <span className="text-sm dark:text-gray-100">{post.likes.length}</span>
        </div>
        <div className="flex items-center gap-1" onClick={goToComments}>
          <MessageCircle size={20} className="dark:text-white" />
          <span className="text-sm dark:text-gray-100">{post.replies.length}</span>
        </div>
        <Share2 size={20} className="cursor-pointer" />
      </div>

    </Card>
  );
};

export default PostCard;
