import { useRecoilState, useRecoilValue } from "recoil";
import postsAtom from "@/atoms/postsAtom";
import { userAtom } from "@/atoms/userAtom";
import { serverUrl } from "@/serverUrl";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

interface Reply {
  _id: string;
  userId: string;
  text: string;
  userProfilePic?: string;
  username?: string;
  name?: string;
}

interface Post {
  _id: string;
  replies: Reply[];
}

export function CommentDropdownMenu({
  post,
  comment,
  commentId,
}: {
  post: Post;
  comment: Reply;
  commentId: string;
}) {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const currentUser = useRecoilValue(userAtom);

  const handleCommentDelete = async () => {
    if (!currentUser) {
      toast.info("You need to login to delete a comment");
      return;
    }

    try {
      const res = await fetch(`${serverUrl}/api/posts/reply/delete/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ postId: post._id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete comment");
      }

      setPosts(prevPosts =>
        prevPosts.map(p =>
          p._id === post._id
            ? { ...p, replies: p.replies.filter(r => r._id !== commentId) }
            : p
        )
      );

      toast.success("Comment deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message);
    }
  };

  const isCommentOwner = currentUser?._id === comment.userId;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <EllipsisVertical
          size={18}
          className="rotate-90 cursor-pointer text-neutral-600 dark:text-neutral-200 hover:text-primary transition-colors"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuGroup>
          {isCommentOwner && (
            <DropdownMenuItem 
              onClick={handleCommentDelete}
              className="cursor-pointer"
            >
              Delete comment
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="cursor-pointer">Report comment</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}