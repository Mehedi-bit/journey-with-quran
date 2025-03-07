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




import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookMarked, Image as ImageIcon, Link, Send } from "lucide-react";

interface PostCreatorProps {
  onSubmit?: (content: string) => void;
  userAvatar?: string;
  username?: string;
}

const PostCreateSurface = ({
  onSubmit = () => {},
  userAvatar = "https://api.dicebear.com/9.x/micah/svg?seed=Luis",
  username = "User",
}: PostCreatorProps) => {
  const [content, setContent] = useState("");
  const [activeTab, setActiveTab] = useState("write");

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content);
      setContent("");
    }
  };

  return (
    <Card className="w-full p-4 bg-card mb-3">
      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={userAvatar} alt={username} />
          <AvatarFallback>{username[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="write">
              <Textarea
                placeholder="Share your Quran learning journey..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px] mb-4 bg-background"
              />
            </TabsContent>

            <TabsContent value="preview">
              <div className="min-h-[120px] mb-4 p-3 border rounded-md bg-background text-card-foreground">
                {content || "Preview will appear here"}
              </div>
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
              onClick={handleSubmit}
              className="bg-primary hover:bg-primary/90"
            >
              <Send />
              Share
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostCreateSurface;
