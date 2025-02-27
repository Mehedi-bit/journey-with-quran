import { House, DollarSign, Megaphone, MenuIcon, Settings, ShoppingBag, ShoppingCart, TrendingUp, Users } from "lucide-react"
import {motion, AnimatePresence} from 'framer-motion'
import { useState } from "react"
import { Link } from "react-router-dom"


const SIDEBAR_ITEMS = [
    { name: "Overview", icon: House, color: "#6366f1", href: "/" },
    { name: "Products", icon: ShoppingBag, color: "#8B5CF6", href: "/products" },
	{ name: "Users", icon: Users, color: "#EC4899", href: "/users" },
	{ name: "Sales", icon: DollarSign, color: "#10B981", href: "/sales" },
	{ name: "Orders", icon: ShoppingCart, color: "#F59E0B", href: "/orders" },
	{ name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/analytics" },
	{ name: "Ads", icon: Megaphone, color: "#EC4899", href: "/ads" },
	{ name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
]

const Sidebar = () => {

    const [isSidebarOpen, setSidebarOpen] = useState(false)
 
    return (
    <motion.div
        className={`relative ease-in-out flex-shrink-0`}
        animate={{ width: isSidebarOpen? 256 : 64 }}
    >


        <div className="flex flex-col h-full border-r border-gray-700 bg-black backdrop-blur-md shadow-2xl">

            {/* Button */}
            <motion.button
                whileHover={{ scale: 1.1}}
                whileTap={{ scale: 0.9 }}
                className="p-3 m-2 hover:bg-gray-900 rounded-full max-w-fit transition-colors duration-75 cursor-pointer"
                onClick={() => setSidebarOpen(!isSidebarOpen)}>

                <MenuIcon size={24} color="white"/>

            </motion.button>

            {/* Sidebar Items */}

            <nav className="mt-1 grow flex flex-col gap-5">
                {
                    SIDEBAR_ITEMS.map( (item, index) => (
                        <Link to={item.href} key={item.href}>
                            <motion.div
                                whileHover={{ scale: 1.05}}
                                whileTap={{ scale: 0.9 }}
                                className="flex items-center font-medium ml-3 p-2 gap-3 transition-colors duration-75"
                            >

                                <item.icon size={24} color={item.color}/>
                                <AnimatePresence>

                                    { isSidebarOpen && (
                                        <motion.span 
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto"}}
                                            exit={{ opacity: 0, width: 0}}
                                            transition={{ duration: 0.2, delay: 0.05*index }}
                                            className="overflow-x-hidden whitespace-nowrap text-white"
                                        >
                                            {item.name}
                                        </motion.span>
                                    ) }

                                </AnimatePresence>
                                

                            </motion.div>
                        </Link>
                    ) )
                }
            </nav>

            

        </div>
        
    </motion.div>
    )
}

export default Sidebar
