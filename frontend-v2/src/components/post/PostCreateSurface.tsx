import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image as ImageIcon, Link, Loader2, Send, BookA, UserRoundSearch } from "lucide-react";
import { toast } from "sonner";
import { useRecoilState } from "recoil";
import postsAtom from "@/atoms/postsAtom";
import { serverUrl } from "@/serverUrl";
import { useNavigate } from "react-router-dom";

interface PostCreatorProps {
  currentUserInfo: any;
  isAsmaPage?: boolean;  // new prop to indicate AsmaulHusna page
}

const PostCreateSurface: React.FC<PostCreatorProps> = ({ currentUserInfo, isAsmaPage = false }) => {
  const [content, setContent] = useState("");
  const [extraContentForPhoto, setExtraContentForPhoto] = useState("");
  const [activeTab, setActiveTab] = useState("write");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [showLoginWarning, setShowLoginWarning] = useState(false);
  const [dotCount, setDotCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (content.length > 0 && !currentUserInfo) {
      setShowLoginWarning(true);
    } else {
      setShowLoginWarning(false);
    }
  }, [content, currentUserInfo]);

  useEffect(() => {
    if (showLoginWarning) {
      const interval = setInterval(() => {
        setDotCount(prev => (prev + 1) % 4);
      }, 300);
      return () => clearInterval(interval);
    }
  }, [showLoginWarning]);

  const handleCreatePost = async () => {
    if (!currentUserInfo) {
      toast("Please login to create a post");
      navigate("/auth");
      return;
    }

    if (!content) {
      toast("Write your journey through any ayah or any sign");
      return;
    }

    let textToSend = content;
    // Auto-add tag for AsmaulHusna page
    if (isAsmaPage && !/#[Aa]smaul[_-]?husna/i.test(content)) {
      textToSend = textToSend.trimEnd() + "\n\n#asmaul_husna";
    }

    setLoading(true);
    try {
      const res = await fetch(`${serverUrl}/api/posts/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({
          postedBy: currentUserInfo._id,
          text: textToSend,
          extra: extraContentForPhoto,
          img: ""
        }),
      });

      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Your post is live now");
        setContent("");
        setExtraContentForPhoto("");
        setPosts(prev => [data, ...prev]);
      }
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full p-4 bg-card mb-3">
      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10 border cursor-pointer" onClick={e => {
          e.preventDefault();
          if (!currentUserInfo) navigate("/auth");
          else navigate(`/${currentUserInfo.username}`);
        }}>
          <AvatarImage src={currentUserInfo?.profilePic} alt="User" />
          <AvatarFallback><UserRoundSearch/></AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="verse">Verse</TabsTrigger>
            </TabsList>

            <TabsContent value="write">
              <Textarea
                placeholder="Share your Quran learning journey..."
                value={content}
                onChange={e => setContent(e.target.value)}
                className="min-h-[120px] mb-4 bg-background"
              />
            </TabsContent>
            <TabsContent value="verse">
              <Textarea
                placeholder="Mention a short verse or part of a verse..."
                value={extraContentForPhoto}
                onChange={e => setExtraContentForPhoto(e.target.value)}
                className="min-h-[120px] mb-4 bg-background"
              />
            </TabsContent>
          </Tabs>

          {showLoginWarning && (
            <p className="text-sm font-semibold mb-4 cursor-pointer" onClick={() => navigate("/auth")}>Login please{' .'.repeat(dotCount)}</p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => toast.info("Use verse tab to visualize any quote.")}> <ImageIcon size={16}/> </Button>
              <Button variant="outline" size="icon" onClick={() => toast.info("Attach any important link with your post.")}> <Link size={16}/> </Button>
              <Button variant="outline" size="icon" onClick={() => toast(
                <div>
                  <strong>Bold:</strong> *text* <br/>
                  <strong>Extra bold:</strong> **text** <br/>
                  <strong>Blockquote:</strong> {">"} line <br/>
                </div>
              )}> <BookA size={16}/> </Button>
            </div>
            <Button onClick={handleCreatePost} className="bg-primary hover:bg-primary/90">
              {loading ? <Loader2 className="animate-spin mx-auto" size={16}/> : <><Send size={16}/> Share</>}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostCreateSurface;