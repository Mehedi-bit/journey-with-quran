import { useEffect, useState, useRef } from "react";
import PostCard from "../post/PostCard";
import PostCreateSurface from "../post/PostCreateSurface";
import { LoaderIcon, Plus } from "lucide-react";
import { toast } from "sonner";
import { userAtom } from "@/atoms/userAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import postsAtom from "@/atoms/postsAtom";
import { serverUrl } from "@/serverUrl";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const AsmaulHusna: React.FC = () => {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreator, setShowCreator] = useState(false);
  const creatorRef = useRef<HTMLDivElement>(null);
  const currentUserInfo = useRecoilValue(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${serverUrl}/api/posts/asmaul-husna`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch posts");
        setPosts(data);
      } catch (e: any) {
        setError(e.message);
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentUserInfo, setPosts]);

  useEffect(() => {
    if (showCreator && creatorRef.current) {
      creatorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showCreator]);

  const renderContent = () => {
    if (loading) return <div className="flex justify-center items-center h-40"><LoaderIcon className="animate-spin" /></div>;
    if (error) return <div className="text-center mt-4"><Button variant="link" onClick={() => navigate('/auth')}>{error}</Button></div>;
    return posts.length > 0 ? posts.map(post => (
      <PostCard key={post._id} post={post} postedBy={post.postedBy} />
    )) : <p className="text-center mt-5 text-gray-500">No posts found</p>;
  };

  return (
    <div className="relative px-[5%] md:px-[20%] py-5">
      {/* Floating plus button */}
      {!showCreator && (
        <button
          className="fixed bottom-6 right-6 bg-black text-white dark:bg-white dark:text-black rounded-full p-3 shadow-lg hover:scale-105 transition-transform"
          onClick={() => setShowCreator(true)}
        >
          <Plus size={24} />
        </button>
      )}

      {showCreator && (
        <div ref={creatorRef} className="mb-6">
          <PostCreateSurface currentUserInfo={currentUserInfo} isAsmaPage />
        </div>
      )}

      {renderContent()}
    </div>
  );
};

export default AsmaulHusna;
