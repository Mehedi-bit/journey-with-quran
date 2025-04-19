import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { serverUrl } from "@/serverUrl";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Define the type for a suggested user
type SuggestedUser = {
  _id: string;
  name: string;
  username: string;
  profilePic: string;
  bio: string;
  following: string[];
  followers: string[];
};

const fallbackAvatar =
  "https://ik.imagekit.io/mehedi004/Avatars/default3.jpg?updatedAt=1745079116757";

const SuggestedUsersPage = () => {
  const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [followingStatus, setFollowingStatus] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState<Record<string, boolean>>({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${serverUrl}/api/users/suggested`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const users: SuggestedUser[] = await response.json();
        setSuggestedUsers(users);

        const initialStatus: Record<string, boolean> = {};
        users.forEach((user) => {
          initialStatus[user._id] = false;
        });
        setFollowingStatus(initialStatus);
      } catch (error) {
        console.error("Error fetching suggested users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedUsers();
  }, []);

  const handleFollowToggle = async (userId: string) => {
    setIsFollowing((prev) => ({ ...prev, [userId]: true }));

    // Optimistically toggle
    setFollowingStatus((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));

    try {
      const response = await fetch(`${serverUrl}/api/users/follow/${userId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.error) {
        toast(data.error);
        // Revert toggle on error
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
      // Revert on failure
      setFollowingStatus((prev) => ({
        ...prev,
        [userId]: !prev[userId],
      }));
    } finally {
      setIsFollowing((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const filteredUsers = suggestedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-primary mb-6">Suggested Users</h1>
      <p className="text-muted-foreground mb-8">
        Follow fellow learners sharing their Quran reflections and insights
      </p>

      {/* Search bar */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search users by name or bio"
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Users grid or loading state */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <UserCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="flex flex-col p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="h-12 w-12 ring-2 ring-primary/20 ring-offset-2 ring-offset-background"
                    onClick={() => navigate(`/${user.username}`)}
                  >
                    <AvatarImage
                      src={user.profilePic || fallbackAvatar || undefined}
                      alt={user.name}
                      className="object-cover cursor-pointer"
                    />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 cursor-pointer"  onClick={() => navigate(`/${user.username}`)}>
                    <h3 className="font-semibold text-card-foreground">{user.name}</h3>
                    <p className="text-xs text-muted-foreground">@{user.username}</p>
                  </div>
                  <Button
                    variant={followingStatus[user._id] ? "outline" : "default"}
                    size="sm"
                    className={
                      followingStatus[user._id]
                        ? "border-primary text-primary hover:bg-primary/10"
                        : ""
                    }
                    onClick={() => handleFollowToggle(user._id)}
                    disabled={isFollowing[user._id]}
                  >
                    {isFollowing[user._id] ? (
                      <LoaderCircle className="animate-spin h-5 w-5" />
                    ) : (
                      followingStatus[user._id] ? "Following" : "Follow"
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {user?.bio || "طالب العلم"}
                </p>
              </div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No users found matching your search.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Skeleton loading card
const UserCardSkeleton = () => (
  <div className="flex flex-col p-4 rounded-lg border bg-card animate-pulse">
    <div className="flex items-start gap-3 mb-3">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <Skeleton className="h-8 w-20 rounded-md" />
    </div>
    <Skeleton className="h-4 w-full mb-1" />
    <Skeleton className="h-4 w-3/4" />
  </div>
);

export default SuggestedUsersPage;
