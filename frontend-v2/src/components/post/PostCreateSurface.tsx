

import  { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookMarked, Image as ImageIcon, Link, Loader2, UserRoundSearch, Send, BookA } from "lucide-react";
import { toast } from "sonner";
import { useRecoilState } from "recoil";
import postsAtom from "@/atoms/postsAtom";
import { serverUrl } from "@/serverUrl";
import { useNavigate } from "react-router-dom";
interface PostCreatorProps {
  currentUserInfo: any;
}

const PostCreateSurface = ({
  currentUserInfo
}: PostCreatorProps) => {
  const [content, setContent] = useState("");
  const [extraContentForPhoto, setExtraContentForPhoto] = useState("");
  const [activeTab, setActiveTab] = useState("write");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useRecoilState(postsAtom)
  const [showLoginWarning, setShowLoginWarning] = useState(false);
  const [dotCount, setDotCount] = useState(0);

  const navigate = useNavigate()






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
        setDotCount((prev) => (prev + 1) % 4); // cycles between 0 to 3
      }, 300); // update every 0.1s
      return () => clearInterval(interval);
    }
  }, [showLoginWarning]);



  const handleCreatePost = async () => {

    // if user not logged in navigate to auth page
    if (!currentUserInfo) {
      toast("Please login to create a post")
      navigate("/auth")
      return;
    }
    
    setLoading(true);

    if (!content) {
      toast("Write your journey through any ayah or any sign");
      setLoading(false);
      return
    }

    try {

      // server actions
      const res = await fetch(`${serverUrl}/api/posts/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include', // ✅ SEND COOKIE
        body: JSON.stringify({
          postedBy: currentUserInfo._id,
          text: content,
          extra: extraContentForPhoto,
          img: ""
        }),
      })


      const data = await res.json();

      if (data.error) {
        toast(data.error)
        return;
      }

      // otherwise ok, post created successfully
      toast("Your post is live now")

      // reset the form
      setContent("");
      setExtraContentForPhoto("");

      setPosts([data, ...posts])



    } catch (error) {
       console.log(error)
       toast(`${error}`)
    } finally {
      setLoading(false);
    }


  };


  console.log("posts after a new post from createSurface", posts)

  return (
    <Card className="w-full p-4 bg-card mb-3">
      <div className="flex items-start gap-4">
        
        <Avatar className="h-10 w-10 border cursor-pointer" onClick={(e) => {
            e.preventDefault();
            if (!currentUserInfo) {
              navigate("/auth");
            } else {
              navigate(`/${currentUserInfo?.username}`);
            }
              }}>
          <AvatarImage className="object-cover" src={currentUserInfo?.profilePic} alt={"Y"} />
          <AvatarFallback><UserRoundSearch/></AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="write">Write</TabsTrigger>
              {/* it was for showing post preview */}
              {/* <TabsTrigger value="preview">Preview</TabsTrigger>    */}
              <TabsTrigger value="verse">Verse</TabsTrigger>
            </TabsList>



            <TabsContent value="write">
              <Textarea
                placeholder="Share your Quran learning journey..."
                value={content}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (!currentUserInfo && newValue.length > 15) return setContent("Please login first to post..."); // Block typing after 15 chars
                  setContent(newValue);
                }}
                className="min-h-[120px] mb-4 bg-background"
              />
            </TabsContent>


            {showLoginWarning && (

                <p className="text-sm font-semibold mb-4 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/auth");
                    }}
                >
                Login please{".".repeat(dotCount)}</p>
              
            )}



            {/* it was for showing post preview */}
            {/* <TabsContent value="preview">
              <div className="min-h-[120px] mb-4 p-3 border rounded-md bg-background text-card-foreground">
                {content || "Preview will appear here"}
              </div>
            </TabsContent> */}


            <TabsContent value="verse">
            <Textarea
                placeholder="Mention a short verse or part of a verse..."
                value={extraContentForPhoto}
                onChange={(e) => setExtraContentForPhoto(e.target.value)}
                className="min-h-[120px] mb-4 bg-background"
              />
            </TabsContent>

          </Tabs>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="icon"
                onClick={()=> {
                  toast.info("Click on verse tab to visualize any quote.",
                    {
                      // description: "You can visualize any verse or part of a verse.",
                      action: {
                        label: "Thanks",
                        onClick: () => toast.dismiss(),
                      },
                    }
                  )
                }}
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon"
                onClick={()=> {
                  toast.info("Just attach the link with your post.",
                    {
                      // description: "You can attach any imp link with your post.",
                      action: {
                        label: "Thanks",
                        onClick: () => toast.dismiss(),
                      },
                    }
                  )
                }}  
              >
                <Link className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon"
                onClick={()=> {
                  toast(<div><h1>Bold: *text*</h1> <h1>Extra bold: **text**  </h1></div>,
                    {
                      // description: "You can format your post to make it more readable.",
                      action: {
                        label: "Thanks",
                        onClick: () => toast.dismiss(),
                      },
                    }
                  )
                }}
              >
                <BookA className="h-4 w-4" />
              </Button>
            </div>

            <Button
              onClick={handleCreatePost}
              className="bg-primary hover:bg-primary/90"
            >
              <Send />
              {
                loading ? <Loader2 className="animate-spin mx-auto" size={16} /> : "Share"
              }
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostCreateSurface;
