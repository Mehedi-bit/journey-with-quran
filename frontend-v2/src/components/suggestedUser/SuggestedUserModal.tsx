import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { serverUrl } from "@/serverUrl";
import { toast } from "sonner";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/atoms/userAtom";
import { LoaderCircle } from "lucide-react"; // Spinner icon

interface SuggestedUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SuggestedUser {
  _id: string;
  name: string;
  username: string;
  profilePic: string;
  bio: string;
}

const fallbackAvatar = "https://ik.imagekit.io/mehedi004/Avatars/default2?updatedAt=1745075903036";

const SuggestedUsersModal = ({ isOpen, onClose }: SuggestedUsersModalProps) => {
  const navigate = useNavigate();
  const currentUserInfo = useRecoilValue(userAtom);
  const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>([]);
  const [followingStatus, setFollowingStatus] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!isOpen) return;

    const fetchSuggestedUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${serverUrl}/api/users/suggested`, {
          credentials: "include",
        });
        const data = await response.json();
        const topUsers = data.slice(0, 4);
        setSuggestedUsers(topUsers);

        const initialStatus: Record<string, boolean> = {};
        const initialLoading: Record<string, boolean> = {};
        topUsers.forEach((user: SuggestedUser) => {
          initialStatus[user._id] = false;
          initialLoading[user._id] = false;
        });
        setFollowingStatus(initialStatus);
        setButtonLoading(initialLoading);
      } catch (error) {
        console.error("Error fetching suggested users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedUsers();
  }, [isOpen]);

  const handleFollowToggle = async (userId: string) => {
    if (!currentUserInfo) {
      toast("You need to login first");
      return;
    }

    if (buttonLoading[userId]) return; // Block multiple clicks

    setButtonLoading((prev) => ({ ...prev, [userId]: true }));

    // Optimistic update
    setFollowingStatus((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));

    try {
      const res = await fetch(`${serverUrl}/api/users/follow/${userId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.error) {
        toast(data.error);
        // Revert toggle
        setFollowingStatus((prev) => ({
          ...prev,
          [userId]: !prev[userId],
        }));
      } else {
        toast(data.message || "Action successful");
      }
    } catch (error) {
      console.error(error);
      toast("Something went wrong. Please try again.");
      // Revert on error
      setFollowingStatus((prev) => ({
        ...prev,
        [userId]: !prev[userId],
      }));
    } finally {
      setButtonLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const handleSeeMore = () => {
    navigate("/suggested-users");
    onClose();
  };

  const renderSkeletons = () => {
    return Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className="flex items-center justify-between p-3 rounded-lg">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 rounded" />
            <Skeleton className="h-3 w-48 rounded" />
          </div>
        </div>
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary">
            Suggested Users
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Follow fellow learners sharing their Quran reflections and insights.
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 space-y-4">
          {loading ? (
            renderSkeletons()
          ) : suggestedUsers.length === 0 ? (
            <p className="text-center text-muted-foreground">No users found.</p>
          ) : (
            suggestedUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/30 transition-colors"
              >
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => navigate(`/${user.username}`)}
                >
                  <Avatar className="h-10 w-10 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
                    <AvatarImage
                      src={user.profilePic || fallbackAvatar}
                      alt={user.name}
                      className="object-cover"
                    />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-card-foreground">{user.name}</h3>
                    <p className="text-xs text-muted-foreground">@{user.username}</p>
                  </div>
                </div>
                <Button
                  variant={followingStatus[user._id] ? "outline" : "default"}
                  size="sm"
                  disabled={buttonLoading[user._id]}
                  className={
                    followingStatus[user._id]
                      ? "border-primary text-primary hover:bg-primary/10"
                      : ""
                  }
                  onClick={() => handleFollowToggle(user._id)}
                >
                  {buttonLoading[user._id] ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : followingStatus[user._id] ? (
                    "Following"
                  ) : (
                    "Follow"
                  )}
                </Button>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-center mt-2">
          <Button
            variant="link"
            className="text-primary font-medium"
            onClick={handleSeeMore}
          >
            See More Users
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuggestedUsersModal;
