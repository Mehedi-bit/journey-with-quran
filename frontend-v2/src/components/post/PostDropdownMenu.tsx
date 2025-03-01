
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from "lucide-react"
import { toast } from "sonner"







export function PostDropDownMenu() {



  const currentTime = new Date().toLocaleTimeString().toString()

  


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical color="white" size={18} className="cursor-pointer"/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">

        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" onClick={()=>{
            
            toast("Coming soon", {
              description: currentTime,
              action: {
                label: "Thanks",
                onClick: () => console.log("Thanks"),
              },
            })

          }}>
            Save Post
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          
          <DropdownMenuItem>
            Report
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          
        </DropdownMenuGroup>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
