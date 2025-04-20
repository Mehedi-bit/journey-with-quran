import { Book, Menu, Sunset, Trees, Zap, UserRound, Users } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"


import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authStateAtom } from "@/atoms/authAtom";
import { userAtom } from "@/atoms/userAtom";
import LogoutButton from "../auth/LogoutButton";
import FullscreenButton from "./FullscreenButton";
import ThemeSwitcher from "./ThemeSwitcher";
import SuggestedUserButton from "../suggestedUser/SuggestedUserButton";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  mobileExtraLinks?: {
    name: string;
    url: string;
  }[];
  auth?: {
    login: {
      text: string;
      url: string;
    };
    signup: {
      text: string;
      url: string;
    };
  };
}

const Navbar = ({


  logo = {
    url: "/",
    src: "https://i.postimg.cc/Kz4R85sj/JWQ-LOGO.png",
    alt: "logo",
    title: "Journey with Quran",
  },



  menu = [
    { title: "Home", url: "/" },
    {
      title: "Quran",
      url: "#",
      items: [
        {
          title: "Surahs",
          description: "Read beautiful surahs of the Quran",
          icon: <Book className="size-5 shrink-0" />,
          url: "/surahs",
        },
        {
          title: "Tafsir",
          description: "Deep dive into the meanings of the Quranic verses",
          icon: <Trees className="size-5 shrink-0" />,
          url: "/tafsir",
        },
        {
          title: "Hadith",
          description: "Explore authentic hadith related to the Quran",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "hadith",
        },
      ],
    },
    {
      title: "Resources",
      url: "#",
      items: [
        {
          title: "Asma ul Husna",
          description: "Learn and Live by Allah’s beautiful names, and get into Jannah",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Dua & Azkar",
          description: "Daily supplications and remembrance",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Learning Center",
          description: "Courses, lectures, and guides for Quranic learning",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    // {
    //   title: "Blog",
    //   url: "#",
    // },
    {
      title: "Contact",
      url: "contact",
    },
    {
      title: "Guide",
      url: "guide",
    },
    ],
  





  // mobileExtraLinks = [
  //   { name: "Press", url: "#" },
  //   { name: "Contact", url: "#" },
  //   { name: "Imprint", url: "#" },
  //   { name: "Sitemap", url: "#" },
  // ],


  auth = {
    login: { text: "Log in", url: "#" },
    signup: { text: "Sign up", url: "#" },
  },
}: NavbarProps) => {

  const setAuthState = useSetRecoilState(authStateAtom)
  const userInfo = useRecoilValue(userAtom)



  return (
    <section className="py-4 px-10 mb-5">
      <div className="container mx-auto">
        <nav className="hidden justify-between lg:flex w-full">
          <div className="flex items-center gap-6">
            <Link to={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="w-8" alt={logo.alt} />
              <span className="text-lg font-semibold">{logo.title}</span>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>


          <div className="flex gap-10 items-center">

            {
              userInfo && (
              <Link to={`/${userInfo.username}`}>
                <UserRound size={20} />
              </Link>
              )
            }

            <SuggestedUserButton />

            <ThemeSwitcher className="" />

            <FullscreenButton className="" />



            {

                !userInfo ?
                (<Link to="/auth" >
                  <Button variant="outline" size="sm"
                    onClick={()=> setAuthState("login")}
                  >
                    {auth.login.text}
                    
                  </Button>
                </Link>)

                :
                
                <LogoutButton />


            }

            


            {
              
              !userInfo &&
              
              <Link to="/auth" >
                <Button  size="sm"
                  onClick={()=> setAuthState("signup")}
                >
                  {auth.signup.text}
                  
                </Button>
              </Link>
            
            }

          </div>



          {/* MOBILE NAV */}

        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link to={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="w-8" alt={logo.alt} />
              <span className="text-lg font-semibold">{logo.title}</span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link to={logo.url} className="flex items-center gap-2">
                      <img src={logo.src} className="w-8" alt={logo.alt} />
                      <span className="text-lg font-semibold">
                        {logo.title}
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-6 flex flex-col gap-6">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  {/* <div className="border-t py-4">
                    <div className="grid grid-cols-2 justify-start">
                      {mobileExtraLinks.map((link, idx) => (
                        <a
                          key={idx}
                          className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
                          href={link.url}
                        >
                          {link.name}
                        </a>
                      ))}
                    </div>
                  </div> */}


                  

                  <div className="flex flex-col gap-5">

                    <Link to="/suggested-users">
                      <Button variant={"outline"} className="w-full">
                        Suggested Users
                      </Button>
                    </Link>

                    <Button variant="secondary" className="">
                      <ThemeSwitcher className="w-1/2 "/>
                      <FullscreenButton className="w-1/2"/>
                    </Button>
                    

                    {
                      userInfo && (
                      <Button >
                        <Link to={`/${userInfo.username}`}>
                          <UserRound size={20} />
                        </Link>
                      </Button>
                      )
                    }
                    

                    {
                      !userInfo ?
                      <Link to="/auth" >
                      <Button variant="outline"
                        onClick={()=> setAuthState("login")}
                        className="w-full"
                        >
                        
                        {auth.login.text}
                        
                      </Button>
                      </Link>

                      :

                      <LogoutButton />

                    }

                    

                    {
                      
                      !userInfo &&

                      <Link to="/auth">
                        <Button
                          onClick={()=> setAuthState("signup")}
                          className="w-full"
                          >

                              {auth.signup.text}

                        </Button>
                      </Link>
                      
                    }


                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title} className="text-muted-foreground">
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-80 p-3">
            <NavigationMenuLink>
              {item.items.map((subItem) => (
                <li key={subItem.title}>
                  <Link
                    className="flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
                    to={subItem.url}
                  >
                    {subItem.icon}
                    <div>
                      <div className="text-sm font-semibold">
                        {subItem.title}
                      </div>
                      {subItem.description && (
                        <p className="text-sm leading-snug text-muted-foreground">
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </NavigationMenuLink>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <Link
      key={item.title}
      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
      to={item.url}
    >
      {item.title}
    </Link>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <Link
              key={subItem.title}
              className="flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
              to={subItem.url}
            >
              {subItem.icon}
              <div>
                <div className="text-sm font-semibold">{subItem.title}</div>
                {subItem.description && (
                  <p className="text-sm leading-snug text-muted-foreground">
                    {subItem.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={item.title} to={item.url} className="font-semibold">
      {item.title}
    </Link>
  );
};

export { Navbar };
