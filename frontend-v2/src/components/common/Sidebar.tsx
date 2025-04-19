
import { NavLink } from "react-router-dom";
import {
  Home,
  Calendar,
  Trophy,
  Book,
  BookOpen,
  User,
  BookText,
} from "lucide-react";
// import { ThemeSwitcher } from "../ThemeSwitcher";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Calendar, label: "Events", path: "/events" },
  { icon: Trophy, label: "Competitions", path: "/competitions" },
  { icon: Book, label: "Books", path: "/books" },
  { icon: BookOpen, label: "Surah Sections", path: "/surah-sections" },
  { icon: BookText, label: "Hadiths", path: "/hadith" },
];

const Sidebar = () => {
  return (
    <aside className="hidden md:flex w-[280px] flex-col bg-card border-r h-full">
      {/* Header Section */}
      <div className="p-6 border-b bg-card">
        <h1 className="text-2xl font-bold text-primary">QuranConnect</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Learn & Share Together
        </p>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 p-3">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `group flex h-10 w-full items-center rounded-md px-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`
              }
            >
              <item.icon className="mr-3 h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}

          {/* Profile Link */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `group flex h-10 w-full items-center rounded-md px-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`
            }
          >
            <User className="mr-3 h-4 w-4" />
            <span>Profile</span>
          </NavLink>
        </div>
      </nav>

      {/* Theme Switcher */}
      {/* <div className="p-4 border-t bg-card">
        <div className="flex items-center justify-between px-2">
          <span className="text-sm font-medium">Theme</span>
          <ThemeSwitcher />
        </div>
      </div> */}
    </aside>
  );
};

export default Sidebar;
