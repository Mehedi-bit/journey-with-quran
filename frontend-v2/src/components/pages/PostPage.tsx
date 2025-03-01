
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Heart, Share2, MessageCircle } from "lucide-react";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { PostDropDownMenu } from "../post/PostDropdownMenu";





const PostPage = () => {


  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1);

  const handleLike = () => {
      setLiked(!liked)
      setLikeCount( liked? likeCount-1 : likeCount+1)
  }





  return (

      <div className="px-4 md:px-[20%]">

          <Card className="mb-8 ">
              <CardHeader className="flex flex-row justify-between">
                  <div className="flex flex-row gap-2">
                      <img 
                          className="h-10 w-10 rounded-full object-cover border border-gray-700 p-0.5" 
                          src="https://api.dicebear.com/9.x/rings/svg?seed=Destiny" alt="" />
                      <div>
                          <CardTitle>Mehedi Hasan</CardTitle>
                          <CardDescription>@mehedi_hasan</CardDescription>
                      </div>
                  </div>

                  <PostDropDownMenu />
                  
              </CardHeader>


                <CardContent>
                    <p>
                        
                        I love medina

                    </p>
                </CardContent>



              <CardContent>
                      
                   <img className="rounded-lg object-cover" src="https://cdn.pixabay.com/photo/2015/12/10/14/17/desert-1086415_1280.jpg" alt="" />
                      

              </CardContent>

              {/* <CardContent className="flex flex-row gap-5">
                  <span className="text-sm text-gray-500">20 likes</span>
                  <span className="text-sm text-gray-500">5 comments</span>
              </CardContent> */}

              <Separator />

              {/* <CardFooter className="flex flex-row justify-between px-[5%] bg-rose-300"> */}
              <div className="flex flex-row justify-between px-[5%] py-2 cursor-pointer">

                  <div className="flex flex-row gap-1 items-center" onClick={handleLike}>
                      <Heart size={20}
                          onClick={handleLike}
                          className={`cursor-pointer ${liked? "text-red-500 fill-red-500" : "text-white" }`}
                      />
                      <span className="text-sm text-gray-100">
                          98
                      </span>
                  </div>

                  <div className="flex flex-row gap-1 items-center">
                      <MessageCircle size={20} />
                      <span className="text-sm text-gray-100">
                          12
                      </span>
                  </div>

                  <div>
                      <Share2 size={20} />
                  </div>

              </div>


              

              {/* COMMENTS HERE */}

              



              {/* </CardFooter> */}

          </Card> 



        </div>
  );
};

export default PostPage;