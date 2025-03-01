import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

  

const SelectPostOrRepliesTabs = () => {
  return (

    <Tabs defaultValue="account" className="my-2">
      <TabsList className="w-full flex justify-evenly">
        <TabsTrigger value="posts" className="w-full">Posts</TabsTrigger>
        <TabsTrigger value="replies" className="w-full">Replies</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">Here are the posts</TabsContent>
      <TabsContent value="replies">Here are the replies</TabsContent>
    </Tabs>


  )
}

export default SelectPostOrRepliesTabs
