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
import { userAtom } from "@/atoms/userAtom";
import { useRecoilValue } from "recoil";
import { Separator } from "../ui/separator";

type User = {
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
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [followingStatus, setFollowingStatus] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState<Record<string, boolean>>({});
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loadingAll, setLoadingAll] = useState(true);
  
  const currentUserInfo = useRecoilValue(userAtom);
  const navigate = useNavigate();

  // Fetch suggested users
  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${serverUrl}/api/users/suggested`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch users");
        const users: User[] = await response.json();

        setSuggestedUsers(users);

        const suggestedStatus: Record<string, boolean> = {};
        users.forEach(user => {
          suggestedStatus[user._id] = currentUserInfo 
            ? user.followers.includes(currentUserInfo._id)
            : false;
        });

        setFollowingStatus(prev => ({ ...prev, ...suggestedStatus }));
      } catch (error) {
        console.error("Error fetching suggested users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedUsers();
  }, [currentUserInfo?._id]);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingAll(true);
      try {
        const res = await fetch(`${serverUrl}/api/users/all`);
        const users: User[] = await res.json();
        setAllUsers(users);

        const allUsersStatus: Record<string, boolean> = {};
        users.forEach(user => {
          allUsersStatus[user._id] = currentUserInfo 
            ? user.followers.includes(currentUserInfo._id)
            : false;
        });

        setFollowingStatus(prev => ({ ...prev, ...allUsersStatus }));
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoadingAll(false);
      }
    };

    fetchUsers();
  }, [currentUserInfo?._id]);

  const handleFollowToggle = async (userId: string) => {
    if (!currentUserInfo) {
      toast("You need to login first");
      navigate("/auth");
      return;
    }

    setIsFollowing(prev => ({ ...prev, [userId]: true }));
    
    setFollowingStatus(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));

    try {
      const response = await fetch(`${serverUrl}/api/users/follow/${userId}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to update follow status");
      }

      toast(data.message || "Action successful");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
      setFollowingStatus(prev => ({
        ...prev,
        [userId]: !prev[userId]
      }));
    } finally {
      setIsFollowing(prev => ({ ...prev, [userId]: false }));
    }
  };

  const filteredUsers = suggestedUsers.filter(
    user => user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.bio.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-primary mb-6">Suggested Users</h1>
      <p className="text-muted-foreground mb-8">
        Follow fellow learners sharing their Quran reflections and insights
      </p>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search users by name or bio"
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Suggested Users Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <UserCardSkeleton key={i} />)}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map(user => (
              <SuggestedUserCard 
                key={user._id}
                user={user}
                followingStatus={followingStatus[user._id]}
                isFollowing={isFollowing[user._id]}
                onFollowToggle={handleFollowToggle}
                navigate={navigate}
              />
            ))}
          </div>
          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {!currentUserInfo ? "Please login" : "No users found"}
              </p>
            </div>
          )}
        </>
      )}

      <Separator className="mt-16" />

      {/* All Users Section */}
      <h2 className="text-xl text-center font-bold text-primary mb-6 mt-8">Featured Community Members</h2>
      {loadingAll ? (
        <LoaderCircle className="animate-spin mx-auto" />
      ) : (
        <div className="grid grid-cols-1 gap-4 px-0 md:px-28">
          {allUsers.map(user => (
            <AllUserCard
              key={user._id}
              user={user}
              followingStatus={followingStatus[user._id]}
              isFollowing={isFollowing[user._id]}
              onFollowToggle={handleFollowToggle}
              navigate={navigate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Suggested Users Card Component
const SuggestedUserCard = ({ user, followingStatus, isFollowing, onFollowToggle, navigate }) => (
  <div className="flex flex-col p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
    <div className="flex items-start gap-3 mb-3">
      <Avatar 
        className="h-12 w-12 ring-2 ring-primary/20 ring-offset-2 ring-offset-background cursor-pointer"
        onClick={() => navigate(`/${user.username}`)}
      >
        <AvatarImage
          src={user.profilePic || fallbackAvatar}
          alt={user.name}
          className="object-cover"
        />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <div 
        className="flex-1 cursor-pointer" 
        onClick={() => navigate(`/${user.username}`)}
      >
        <h3 className="font-semibold text-card-foreground">{user.name}</h3>
        <p className="text-xs text-muted-foreground">@{user.username}</p>
      </div>
      <Button
        variant={followingStatus ? "outline" : "default"}
        size="sm"
        className={followingStatus ? "border-primary text-primary hover:bg-primary/10" : ""}
        onClick={() => onFollowToggle(user._id)}
        disabled={isFollowing}
      >
        {isFollowing ? (
          <LoaderCircle className="animate-spin h-5 w-5" />
        ) : followingStatus ? "Following" : "Follow"}
      </Button>
    </div>
    <p className="text-sm text-muted-foreground mb-3 hidden md:block">
      {user?.bio || "طالب العلم"}
    </p>
  </div>
);

// All Users Card Component
const AllUserCard = ({ user, followingStatus, isFollowing, onFollowToggle, navigate }) => (
  <div className="flex items-center p-4 rounded-xl bg-card border border-muted/30 hover:border-primary/20 transition-all shadow-sm hover:shadow-md">
    <Avatar 
      className="h-16 w-16 ring-2 ring-primary/10 ring-offset-2 ring-offset-background cursor-pointer mr-4"
      onClick={() => navigate(`/${user.username}`)}
    >
      <AvatarImage
        src={user.profilePic || fallbackAvatar}
        alt={user.name}
        className="object-cover"
      />
      <AvatarFallback className="text-lg">{user.name[0]}</AvatarFallback>
    </Avatar>

    <div className="flex-1">
      <div className="flex items-center justify-between">
        <div 
          className="cursor-pointer space-y-1"
          onClick={() => navigate(`/${user.username}`)}
        >
          <h3 className="text-lg font-semibold text-card-foreground">{user.name}</h3>
          <p className="text-sm text-muted-foreground">@{user.username}</p>
        </div>
        <Button
          variant={followingStatus ? "outline" : "default"}
          size="sm"
          className={`rounded-full px-6 ${
            followingStatus 
              ? "border-primary text-primary hover:bg-primary/10" 
              : "hover:bg-primary/90"
          }`}
          onClick={() => onFollowToggle(user._id)}
          disabled={isFollowing}
        >
          {isFollowing ? (
            <LoaderCircle className="animate-spin h-5 w-5" />
          ) : followingStatus ? "Following" : "Follow"}
        </Button>
      </div>
      
      <div className="mt-3 flex items-center gap-4">
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">{user.followers.length}</span>
          <span className="text-sm text-muted-foreground">Followers</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">{user.following.length}</span>
          <span className="text-sm text-muted-foreground">Following</span>
        </div>
      </div>
      
      {user?.bio && (
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {user.bio}
        </p>
      )}
    </div>
  </div>
);

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