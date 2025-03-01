




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
    <div>

      <div className="flex flex-col gap-2 border-b-2 border-gray-500 p-3">
        <h1 className="font-semibold text-lg">Replies</h1>
        <p className="text-sm text-gray-300">Join the discussion and share your thoughts</p>
      </div>



      {/* comments */}

      <div className="flex flex-row gap-3 p-3 border-b-2 border-gray-400">
          <img src="https://api.dicebear.com/9.x/rings/svg?seed=Fatima" alt="" />

          <div className="flex flex-col gap-1">
            <h2>Fatima</h2>
            <p>I also love medina. This place is so peaceful.</p>
          </div>
      </div>



      {/* your comment box */}
      




    </div>
  )
}

export default CommentsCard
