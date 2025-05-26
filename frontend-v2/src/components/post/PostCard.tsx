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
    postedBy: { _id: string; name: string; username: string; profilePic: string };
    text: string;
    extra: string;
    likes: string[];
    replies: { userId: string; text: string; userProfilePic: string; username: string; _id: string }[];
    createdAt: string;
  };
  postedBy: string;
}

// PostCard component: displays a single post with interactions (like, comment, share)
const PostCard: React.FC<PostCardProps> = ({ post }) => {
  // get current logged-in user from global state
  const currentUser = useRecoilValue(userAtom);
  // track whether current user has liked this post
  const [liked, setLiked] = useState(post.likes.includes(currentUser?._id));
  // prevent duplicate like/unlike requests
  const [liking, setLiking] = useState(false);
  // global posts state and setter
  const [posts, setPosts] = useRecoilState(postsAtom);
  const navigate = useNavigate();

  /**
   * handleLike: toggles like state for this post
   * - redirects to login if user not authenticated
   * - sends PUT request to server to update like
   * - updates local postsAtom state on success
   */
  const handleLike = async () => {
    if (!currentUser) {
      toast("Please login to like this post");
      navigate("/auth");
      return;
    }
    if (liking) return; // avoid double clicks

    setLiking(true);
    try {
      const res = await fetch(`${serverUrl}/api/posts/like/${post._id}`, {
        method: "PUT",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        // show error message to user
        toast(data.error);
        return;
      }
      // update Recoil posts state: add or remove current user's id
      const updated = posts.map(p =>
        p._id === post._id
          ? {
              ...p,
              likes: liked
                ? p.likes.filter(id => id !== currentUser._id)
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

  /**
   * formatPostText: parses markdown-like syntax in post text
   * - supports **bold**, *italic*, #tags, http links, and > quotes
   * - returns array of JSX elements for rendering
   */
  function formatPostText(text: string): JSX.Element[] {
    const lines = text.split(/\n/);
    return lines.flatMap((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={`br-${i}`} />;
      const isQuote = trimmed.startsWith(">");
      const content = isQuote ? trimmed.slice(1).trim() : line;
      const parts = content.split(/(\*\*[^*]+\*\*|\*[^*]+\*|#[^\s]+|https?:\/\/[^\s]+)/g);
      const elems = parts.map((part, j) => {
        // bold (**text**)
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
        // italic (*text*)
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <strong key={`${i}-${j}`} className="font-bold">
              {part.slice(1, -1)}
            </strong>
          );
        }
        // hashtag (#tag)
        if (part.startsWith("#")) {
          return (
            <span key={`${i}-${j}`} className="text-blue-700 dark:text-blue-400">
              {part}
            </span>
          );
        }
        // link
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
        // plain text
        return <span key={`${i}-${j}`}>{part}</span>;
      });
      // wrap quotes in blockquote
      if (isQuote) {
        return (
          <blockquote
            key={`bq-${i}`}
            className="border-l-4 border-gray-400 pl-4 italic text-gray-600 dark:text-gray-300 my-2"
          >
            {elems}
          </blockquote>
        );
      }
      // normal paragraph
      return (
        <p key={`p-${i}`} className="my-1">
          {elems}
        </p>
      );
    });
  }

  // manage "show more" toggle for long posts
  const [showMore, setShowMore] = useState(false);
  const allLines = post.text.split(/\n/);
  const truncated = allLines.slice(0, 20).join("\n");
  const onSeeMore = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMore(true);
  };

  // navigate to post comments
  const goToComments = () =>
    navigate(`/${post.postedBy.username}/post/${post._id}?scrollToComments=true`);

  // fallback avatar if user has no profile picture
  const fallbackAvatar =
    "https://ik.imagekit.io/mehedi004/Avatars/default3.jpg?updatedAt=1745079116757";

  // --- card UI ---
  return (
    <Card className="mb-8 bg-primary/5 dark:bg-neutral-950">
      <CardHeader className="flex justify-between flex-row">
        {/* user info: avatar, name, username */}
        <div
          className="flex gap-2 cursor-pointer"
          onClick={() => navigate(`/${post.postedBy.username}`)}
        >
          <img
            src={post.postedBy.profilePic || fallbackAvatar}
            alt="User avatar"
            className="h-10 w-10 rounded-full object-cover border border-gray-700 p-0.5"
          />
          <div>
            <CardTitle>{post.postedBy.name}</CardTitle>
            <CardDescription>@{post.postedBy.username}</CardDescription>
          </div>
        </div>

        {/* post timestamp and menu */}
        <div className="flex items-center gap-5">
          <small className="text-sm text-gray-900 dark:text-gray-400">
            {formatDistanceToNow(new Date(post.createdAt))} ago
          </small>
          <PostDropDownMenu post={post} />
        </div>
      </CardHeader>

      {/* post content: text with formatting and see more */}
      <CardContent
        className="cursor-pointer"
        onClick={() =>
          navigate(`/${post.postedBy.username}/post/${post._id}`)
        }
      >
        <pre className="bangla-text whitespace-pre-wrap text-neutral-900 dark:text-neutral-200">
          {formatPostText(showMore ? post.text : truncated)}
          {!showMore && allLines.length > 6 && (
            <span
              onClick={onSeeMore}
              className="block mt-1 text-blue-500 cursor-pointer"
            >
              see more..
            </span>
          )}
        </pre>
      </CardContent>

      {/* optional extra content: background image with overlay text */}
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

      {/* action buttons: like, comment, share */}
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
          <span className="text-sm dark:text-gray-100">
            {post.replies.length}
          </span>
        </div>
        <Share2 size={20} className="cursor-pointer" />
      </div>
    </Card>
  );
};

export default PostCard;
