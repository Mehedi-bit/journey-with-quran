import React from "react";
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


// Local mock data for suggested users
const mockSuggestedUsers = [
  {
    id: "4",
    name: "Zainab Ali",
    username: "zainab_ali",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab",
    bio: "Quran memorization specialist",
    isFollowing: false,
  },
  {
    id: "5",
    name: "Yusuf Khan",
    username: "yusuf_khan",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yusuf",
    bio: "Tajweed instructor with 10 years experience",
    isFollowing: true,
  },
  {
    id: "6",
    name: "Aisha Rahman",
    username: "aisha_rahman",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
    bio: "Arabic language teacher and Quran enthusiast",
    isFollowing: false,
  },
  {
    id: "7",
    name: "Ibrahim Malik",
    username: "ibrahim_malik",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ibrahim",
    bio: "Hafiz and Islamic studies researcher",
    isFollowing: false,
  },
  {
    id: "8",
    name: "Maryam Siddiqui",
    username: "maryam_siddiqui",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maryam",
    bio: "Quran translation specialist and author",
    isFollowing: true,
  },
  {
    id: "9",
    name: "Hamza Ahmed",
    username: "hamza_ahmed",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hamza",
    bio: "Quran recitation coach and competition judge",
    isFollowing: false,
  },
  {
    id: "10",
    name: "Khadija Omar",
    username: "khadija_omar",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khadija",
    bio: "Islamic calligraphy artist and Quran teacher",
    isFollowing: false,
  },
];

interface SuggestedUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuggestedUsersModal = ({ isOpen, onClose }: SuggestedUsersModalProps) => {
  const navigate = useNavigate();
  const [suggestedUsers, setSuggestedUsers] = React.useState<SuggestedUser[]>(
    [],
  );
  const [followingStatus, setFollowingStatus] = React.useState<
    Record<string, boolean>
  >({});

  React.useEffect(() => {
    // Use local mock data instead of service
    const users = mockSuggestedUsers;
    setSuggestedUsers(users.slice(0, 5)); // Limit to 5 users

    // Initialize following status
    const initialStatus: Record<string, boolean> = {};
    users.forEach((user) => {
      initialStatus[user.id] = user.isFollowing;
    });
    setFollowingStatus(initialStatus);
  }, [isOpen]);

  // Handle follow/unfollow directly in the component
  const handleFollowToggle = (userId: string) => {
    // Update the following status locally
    setFollowingStatus((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));

    // In a real API implementation, you would make an API call here
    // Example: api.toggleFollow(userId).then(response => { ... })
  };

  const handleSeeMore = () => {
    navigate("/suggested-users");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary">
            Suggested Users
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Connect with these scholars and learners to enhance your Quranic
            journey
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-4">
          {suggestedUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-card-foreground">
                    {user.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{user.bio}</p>
                </div>
              </div>
              <Button
                variant={followingStatus[user.id] ? "outline" : "default"}
                size="sm"
                className={
                  followingStatus[user.id]
                    ? "border-primary text-primary hover:bg-primary/10"
                    : ""
                }
                onClick={() => handleFollowToggle(user.id)}
              >
                {followingStatus[user.id] ? "Following" : "Follow"}
              </Button>
            </div>
          ))}
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
