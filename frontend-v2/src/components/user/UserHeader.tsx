
import { useRecoilValue } from "recoil";
import { Button } from "../ui/button";
import { DropdownButton } from "./DropdownButton";
import SelectPostOrRepliesTabs from "./SelectPostOrRepliesTabs";
import { userAtom } from "@/atoms/userAtom";
import { Dot, Edit, Loader, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { toast } from "sonner";


// interface
interface UserHeaderProps {
    userData: {
        _id: string;
        profilePic: string;
        name: string;
        username: string;
        bio: string;
        followers: Array<string>;
        following: Array<string>;
    };
}



const UserHeader: React.FC<UserHeaderProps> = ({userData}) => {  // user that we are looking at

    // get userInfo from the recoil atom
    const currentUserInfo = useRecoilValue(userAtom)  // logged in user
    const [following, setFollowing] = useState(userData.followers.includes(currentUserInfo?._id)) // if already following then useState will be true, otherwise false
    const [followLoading, setFollowLoading] = useState(false)

    const handleFollowAndUnFollow = async () => {

        if (!currentUserInfo) {
            toast("You need to login first")
            return;
        }

        if (followLoading) return;   // if already loading then return to get out of the function to get rid of multiple request at a time

        // set followLoading State
        setFollowLoading(true)


        try {


            // server actions
            const res = await fetch(`/api/users/follow/${userData._id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }
            })

            const data = await res.json()

            if (data.error) {
                toast(`${data.error}`)
                return;
            }

            // otherwise ok, data came

            
            // update the followers count (which is shown in the profile of everyone)
            if (following) {
                userData.followers.pop()   // will decrease the followers length by 1 , and followers count will be displayed
            } else {
                userData.followers.push(currentUserInfo?._id) // will increase the followers length by 1
            }



            console.log(data)
            // update the following state
            setFollowing(!following)

            



        } catch (error) {
            toast(`${error}`)
        }  finally {
            setFollowLoading(false)
        }

    }

    
    console.log("userData props value", userData)

    
    return (

        <div className="">


            <div className="container flex flex-col md:flex-row gap-10 pb-4">

                <div className="rounded-full p-1 w-[100px] h-[100px]">

                    {
                        userData.profilePic !== "" ? (
                            <img className="rounded-full w-full h-full object-cover" src={userData.profilePic} alt="" />
                        ) : (
                            <img className="rounded-full w-full h-full object-cover" src="https://api.dicebear.com/9.x/lorelei/svg?seed=Emery" alt="" />
                        )
                    }


                    {/* <img className="rounded-full w-full h-full object-cover" src={userData.profilePic} alt="" /> */}
                </div>

                <div className="details-container flex flex-col gap-2">

                    <div className="name-container flex flex-row items-center gap-5">
                        <h1 className="font-bold m-0">{userData.name}</h1>
                        {/* @TODO: Show this only if it is NOT current user */}

                        {
                            currentUserInfo?._id !== userData._id && (
                                // <Button size="sm" >
                                //     { !following ? "Follow" : "Unfollow" }
                                // </Button>
                                <Badge variant={following? "outline" : "default"} className="cursor-pointer min-w-12" onClick={handleFollowAndUnFollow} >

                                    {
                                        followLoading ? <Loader2 className="animate-spin mx-auto" size={16} />
                                            :
                                        (!following ? "Follow" : "Following")
                                    }
                                </Badge>
                            ) 
                        }

                        
                    </div>

                    <p className="text-gray-500">@{userData.username}</p>
                    
                    <div className="following-container flex flex-row gap-5 items-center">
                        <p className="m-0 text-gray-400"> <span className="mr-1">{userData.followers.length}</span>    followers</p>
                     
                        <p className="m-0 text-gray-400"><span className="mr-1">{userData.following.length}</span>  following</p>
                    </div>
                    
                    <p className="text-gray-300 text-sm">{userData.bio}</p>
                    
                    {/* @TODO: Show this only if it is current user */}
                    {/* <Edit size={18  }/> */}

                    <div className="flex flex-row gap-5 items-center">

                        <DropdownButton text="Share" />

                        {
                            currentUserInfo?._id === userData._id && (
                                <Link to="/update" >
                                    <Edit size={16} />
                                </Link>
                            )
                        }

                    </div>
                    

                </div>



            </div>

            <SelectPostOrRepliesTabs />


        </div>
    );
};

export default UserHeader;