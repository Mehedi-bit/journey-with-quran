import PostCard from "../post/PostCard"
import PostCreateSurface from "../post/PostCreateSurface"

const Home = () => {
  return (
    <div className="px-[5%] md:px-[20%] py-5">
      <PostCreateSurface />
      <PostCard likes={45} replies={12} postText="This is my fourth post" postImg="https://cdn.pixabay.com/photo/2015/12/10/14/17/desert-1086415_1280.jpg" />
      <PostCard likes={24} replies={10} postText="This is my third post" postImg="https://cdn.pixabay.com/photo/2022/04/29/08/50/desert-7162926_1280.jpg" />
      <PostCard likes={43} replies={30} postText="This is my second post" postImg="https://cdn.pixabay.com/photo/2012/11/22/08/18/mecca-66966_1280.jpg" />
      <PostCard likes={75} replies={5} postText="This is my first post" />
    </div>
  )
}

export default Home
