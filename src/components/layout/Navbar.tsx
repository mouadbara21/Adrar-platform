import { Link, useLocation } from "react-router-dom";
import { MapPin, Star, Search, User } from "lucide-react";
import { Button } from "../ui/button";
import SearchBar from "../shared/SearchBar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

const Navbar = () => {
  const location = useLocation();
  const showSearchInNav = location.pathname !== "/";

  return (
    <nav className="bg-white/90 backdrop-blur-sm py-2 px-6 flex items-center justify-between fixed top-0 left-0 right-0 z-50 shadow-sm md:px-16 lg:px-24">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img
            alt="ADRAR Logo"
            src="/logo.png"
            className="h-16 object-contain"
          />
        </Link>
      </div>

      {showSearchInNav && (
        <div className="hidden lg:block flex-1 max-w-md mx-8">
          <SearchBar className="h-8" onChange={() => {}} />
        </div>
      )}

      <div className="hidden md:flex items-center gap-4">
        <Link
          to="/explore"
          className="flex items-center gap-1 text-gray-700 hover:text-green-600 transition-colors py-1"
        >
          <MapPin size={16} />
          <span>Explore</span>
        </Link>
        <Link
          to="/saved"
          className="flex items-center gap-1 text-gray-700 hover:text-green-600 transition-colors py-1"
        >
          <Star size={16} />
          <span>Saved</span>
        </Link>
        <Link
          to="/refuges"
          className="flex items-center gap-1 text-gray-700 hover:text-green-600 transition-colors py-1"
        >
          <Search size={16} />
          <span>Find refuge</span>
        </Link>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="flex items-center gap-1 ml-2"
        >
          <Link to="/login">
            <User size={16} />
            <span>Login</span>
          </Link>
        </Button>
      </div>

      <div className="md:hidden">
        <Button variant="ghost" size="icon">
          <User size={18} />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
