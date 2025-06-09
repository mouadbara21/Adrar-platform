
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Button } from './ui/button';
import { Search, Map, Compass, User, Heart, BookMarked, Home } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white py-4 px-6 shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />
        
        <div className="hidden md:flex space-x-6">
          <NavItem to="/explore" icon={<Compass size={18} />} label="Explore" />
          <NavItem to="/find-refuge" icon={<Home size={18} />} label="Find Refuge" />
          <NavItem to="/find-guide" icon={<Map size={18} />} label="Find Guide" />
          <NavItem to="/saved" icon={<Heart size={18} />} label="Saved" />
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search size={20} />
          </Button>
          <Link to="/login">
            <Button variant="default" className="bg-easyhike-green hover:bg-easyhike-light-green">
              <User size={18} className="mr-2" />
              Login
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <Link 
      to={to} 
      className="flex items-center gap-1 text-easyhike-gray hover:text-easyhike-green transition-colors"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Navbar;
