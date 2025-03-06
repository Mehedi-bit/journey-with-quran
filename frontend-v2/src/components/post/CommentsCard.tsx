import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import CommentCard from "./CommentCard"





const replies = [
  {
    userId: 1,
    text: "I also love medina",
    userProfilePic: "https://api.dicebear.com/9.x/rings/svg?seed=Fatima",
    username: "ahmad_nufais",
    name: "Ahmad Nufais",
  },

  {
    userId: 2,
    text: "I also love medina",
    userProfilePic: "https://api.dicebear.com/9.x/rings/svg?seed=Destiny",
    username: "ahmad_nufais",
    name: "Ahmad Nufais",
  },

  {
    userId: 3,
    text: "I also love medina",
    userProfilePic: "https://api.dicebear.com/9.x/rings/svg?seed=Destiny",
    username: "ahmad_nufais",
    name: "Ahmad Nufais",
  },

  
]



const CommentsCard = () => {



  return (

    <div className="p-5 flex flex-col gap-10">



      <div className="flex flex-col gap-2 border-b-0 border-gray-500">
        <h1 className="font-semibold text-lg">Replies</h1>
        <p className="text-sm text-gray-300">Join the discussion and share your thoughts</p>
      </div>



        {/* COMMENTER | your comment area */}

        <div className="flex flex-row gap-3">

          {/* current user */}
          <Avatar>
            <AvatarImage src="https://api.dicebear.com/9.x/rings/svg?seed=Destiny" alt="User" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col w-full gap-4">
            <Textarea placeholder="Type your comment here." />
            <Button className="w-24">Submit</Button>
          </div>

        </div>



      {/* comments or replies - TODO: make it dynamic */}


      <CommentCard
        comment="Looks really good. I love this place."
        name="Fatima"
        username="fatima"
        profilePic="https://api.dicebear.com/9.x/micah/svg?seed=Brian"
        likes={100}
      />

      <CommentCard
        comment="Looks really good. I love this place."
        name="Umar"
        username="umar_123"
        profilePic="https://api.dicebear.com/9.x/lorelei/svg?seed=Emery"
        likes={98}
      />


      <CommentCard
        comment="Looks really good. I love this place."
        name="Khalid"
        username="khalid"
        profilePic="https://api.dicebear.com/9.x/lorelei/svg?seed=Sawyer"
        likes={76}
      />






      
      




    </div>

  )
}

export default CommentsCard
