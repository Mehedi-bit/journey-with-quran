import { useEffect, useState } from "react";
import PostCard from "../post/PostCard";
import PostCreateSurface from "../post/PostCreateSurface";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { userAtom } from "@/atoms/userAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import postsAtom from "@/atoms/postsAtom";
import { serverUrl } from "@/serverUrl";
import feedAtom from "@/atoms/feedAtom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [posts, setPosts] = useRecoilState(postsAtom);
    const [feeds, setFeeds] = useRecoilState(feedAtom);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTab, setSelectedTab] = useState('forYou');
    const currentUserInfo = useRecoilValue(userAtom);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            
            try {
                if (selectedTab === 'forYou') {
                    const res = await fetch(`${serverUrl}/api/posts/all`);
                    const data = await res.json();
                    
                    if (!res.ok || data.error) throw new Error(data.error || "Failed to fetch posts");
                    setPosts(data);
                } else {
                    if (!currentUserInfo) throw new Error("Login to view feeds");
                    
                    const res = await fetch(`${serverUrl}/api/posts/feed`, {
                        credentials: 'include'
                    });
                    const data = await res.json();
                    
                    if (!res.ok || data.error) throw new Error(data.error || "Failed to fetch feed");
                    setFeeds(data);
                }
            } catch (error) {
                setError(error.message);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedTab, currentUserInfo, setPosts, setFeeds]);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center h-40">
                    <LoaderIcon className="animate-spin" />
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center mt-4">
                    <Button variant={"link"} onClick={() => navigate('/auth')} >{error}</Button>
                </div>
            );
        }

        const data = selectedTab === 'forYou' ? posts : feeds;
        const noPostsMessage = selectedTab === 'following' 
            ? 'No posts from followed users' 
            : 'No posts found';

        return data.length > 0 ? (
            data.map((post) => (
                <PostCard
                    key={post?._id}
                    post={post}
                    postedBy={post?.postedBy}
                />
            ))
        ) : (
            <p className="text-center mt-5 text-gray-500">{noPostsMessage}</p>
        );
    };

    return (
        <div className="px-[5%] md:px-[20%] py-5">
            <PostCreateSurface currentUserInfo={currentUserInfo} />
            
            <Tabs 
                defaultValue="forYou" 
                value={selectedTab}
                onValueChange={setSelectedTab}
                className="mb-4"
            >
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="forYou">Explore</TabsTrigger>
                    <TabsTrigger 
                        value="following"
                        // disabled={!currentUserInfo}
                    >
                        Following
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            {renderContent()}
        </div>
    );
};

export default Home;