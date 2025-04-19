// import {
//     Avatar,
//     AvatarFallback,
//     AvatarImage,
//   } from "@/components/ui/avatar"
// import { useEffect, useState } from "react";
// import { Textarea } from "../ui/textarea";
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
//   } from "@/components/ui/select"
// import { Button } from "../ui/button";

// const PostCreateSurface = () => {

//     const text = "Share your Quran Journey...";
//     const [displayedText, setDisplayedText] = useState("");
//     const [index, setIndex] = useState(0);
//     const [textaraExpanded, setTextareaExpanded] = useState(false);

//     useEffect(() => {
//         const timeout = setTimeout(() => {
//         if (index < text.length) {
//             setDisplayedText((prev) => prev + text[index]);
//             setIndex(index + 1);
//         } else {
//             setTimeout(() => {
//             setDisplayedText("");
//             setIndex(0);
//             }, 1000);
//         }
//         }, 100);
//         return () => clearTimeout(timeout);
//     }, [index, text]);
    



//     // names of the surahs of the Quran
//     const surahs = [
//         "Al-Fatihah", "Al-Baqarah", "Aal-E-Imran", "An-Nisa", "Al-Ma'idah", "Al-An'am", "Al-A'raf", "Al-Anfal", 
//         "At-Tawbah", "Yunus", "Hud", "Yusuf", "Ar-Ra'd", "Ibrahim", "Al-Hijr", "An-Nahl", "Al-Isra", "Al-Kahf", 
//         "Maryam", "Ta-Ha", "Al-Anbiya", "Al-Hajj", "Al-Mu’minun", "An-Nur", "Al-Furqan", "Ash-Shu'ara", 
//         "An-Naml", "Al-Qasas", "Al-Ankabut", "Ar-Rum", "Luqman", "As-Sajda", "Al-Ahzab", "Saba", "Fatir", 
//         "Ya-Sin", "As-Saffat", "Sad", "Az-Zumar", "Ghafir", "Fussilat", "Ash-Shura", "Az-Zukhruf", "Ad-Dukhan", 
//         "Al-Jathiya", "Al-Ahqaf", "Muhammad", "Al-Fath", "Al-Hujurat", "Qaf", "Adh-Dhariyat", "At-Tur", 
//         "An-Najm", "Al-Qamar", "Ar-Rahman", "Al-Waqia", "Al-Hadid", "Al-Mujadila", "Al-Hashr", "Al-Mumtahina", 
//         "As-Saff", "Al-Jumu'a", "Al-Munafiqun", "At-Taghabun", "At-Talaq", "At-Tahrim", "Al-Mulk", "Al-Qalam", 
//         "Al-Haqqa", "Al-Ma'arij", "Nuh", "Al-Jinn", "Al-Muzzammil", "Al-Muddathir", "Al-Qiyama", "Al-Insan", 
//         "Al-Mursalat", "An-Naba", "An-Nazi'at", "Abasa", "At-Takwir", "Al-Infitar", "Al-Mutaffifin", "Al-Inshiqaq", 
//         "Al-Buruj", "At-Tariq", "Al-A'la", "Al-Ghashiya", "Al-Fajr", "Al-Balad", "Ash-Shams", "Al-Lail", 
//         "Ad-Duhaa", "Ash-Sharh", "At-Tin", "Al-Alaq", "Al-Qadr", "Al-Bayyina", "Az-Zalzala", "Al-Adiyat", 
//         "Al-Qaria", "At-Takathur", "Al-Asr", "Al-Humaza", "Al-Fil", "Quraish", "Al-Ma'un", "Al-Kawthar", 
//         "Al-Kafiroon", "An-Nasr", "Al-Masad", "Al-Ikhlas", "Al-Falaq", "An-Nas"
//       ];




//   return (
//     <div className="flex gap-3 px-[10%]">
//         <Avatar>
//             <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Aiden" alt="@user" />
//             <AvatarFallback>CN</AvatarFallback>
//         </Avatar>


//         <div className="w-full flex flex-col gap-3">


//             <Textarea 
//                 placeholder={displayedText} 
//                 className={`w-full p-3 border rounded-lg text-lg  focus:outline-none transition-all transition-500 ${textaraExpanded? "h-40" : "h-12"} `}
//                 onClick={()=> setTextareaExpanded(true)}
//                 onBlur={()=> setTextareaExpanded(false)}
//             />


//             <div className="w-full flex flex-row gap-5">

            

//                 <Select>
//                     <SelectTrigger className="w-full">
//                         <SelectValue placeholder="Select the surah" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectGroup>
//                         <SelectLabel>Fruits</SelectLabel>
//                             {
//                                 surahs.map((surah, index) => (
//                                     <SelectItem key={surah} value={surah}>{surah}</SelectItem>
//                                 ))
//                             }
//                         </SelectGroup>
//                     </SelectContent>
//                 </Select>


//                 <Button variant={"secondary"} className="w-full">Post</Button>


//             </div>



//         </div>

//     </div>
//   )
// }

// export default PostCreateSurface




import  { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookMarked, Image as ImageIcon, Link, Loader2, UserRoundSearch, Send } from "lucide-react";
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
              <Button variant="outline" size="icon">
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Link className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <BookMarked className="h-4 w-4" />
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
