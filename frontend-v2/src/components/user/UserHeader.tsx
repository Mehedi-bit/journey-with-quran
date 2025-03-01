
import { Button } from "../ui/button";
import { DropdownButton } from "./DropdownButton";
import SelectPostOrRepliesTabs from "./SelectPostOrRepliesTabs";



interface UserHeaderProps {
    name: string;
    username: string;
    bio?: string;
    profilePic?: string;
}


const UserHeader: React.FC<UserHeaderProps> = ({name, username, bio, profilePic}) => {
    
    return (

        <div className="">


            <div className="container flex flex-col md:flex-row gap-10 pb-4">

                <div className="rounded-full p-1 w-[100px] h-[100px]">
                    <img className="rounded-full w-full object-cover" src={profilePic} alt="" />
                </div>

                <div className="details-container flex flex-col gap-2">

                    <div className="name-container flex flex-row gap-5">
                        <h1 className="font-bold m-0">{name}</h1>
                        {/* @TODO: Show this only if it is NOT current user */}
                        <Button size="sm">Follow</Button>
                    </div>

                    <div className="following-container flex flex-row gap-8">
                        <p className="m-0 text-gray-400"> <span className="font-bold text-white">400</span> followers</p>
                        <p className="m-0 text-gray-400"><span className="font-bold text-white">25</span> following</p>
                    </div>
                    
                    <p className="text-gray-500">@{username}</p>
                    <p className="text-gray-300 text-sm">{bio}</p>
                    
                    {/* @TODO: Show this only if it is current user */}
                    {/* <Edit size={18  }/> */}

                    <DropdownButton text="Share" />
                    

                </div>



            </div>

            <SelectPostOrRepliesTabs />


        </div>
    );
};

export default UserHeader;