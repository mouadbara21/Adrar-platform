import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="-mx-6 md:-mx-16 lg:-mx-24 bg-gray-800 text-white">
      <div className="bg-blue-900">
        <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4">
          <div className="flex flex-wrap justify-between items-center">
            <p className="text-xl font-bold mb-2 md:mb-0">CONTACT US:</p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://facebook.com"
                className="flex items-center gap-2 hover:text-blue-300 transition-colors"
              >
                <Facebook size={24} />
                <span>Check out our Facebook</span>
              </a>
              <a
                href="https://twitter.com"
                className="flex items-center gap-2 hover:text-blue-300 transition-colors"
              >
                <Twitter size={24} />
                <span>See what we tweet about</span>
              </a>
              <a
                href="https://instagram.com"
                className="flex items-center gap-2 hover:text-blue-300 transition-colors"
              >
                <Instagram size={24} />
                <span>Join our Instagram</span>
              </a>
              <a
                href="https://linkedin.com"
                className="flex items-center gap-2 hover:text-blue-300 transition-colors"
              >
                <Linkedin size={24} />
                <span>Follow us on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Section principale */}
      <div className="container mx-auto py-8 px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* ABOUT US centré */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/">
              <img src="/logo.png" alt="ADRAR Logo" className="h-16 mb-4" />
            </Link>
            <h3 className="text-xl font-bold mb-2">ABOUT US</h3>
            <p className="text-gray-300 text-justify md:text-left">
              Adrar is a project created by two INPT students as the culmination
              of our first year. Passionate about nature and mountain
              adventures, we built this platform to help others explore
              Morocco's hiking trails.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xl font-bold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/explore"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Nearby Hikes
                </Link>
              </li>
              <li>
                <Link
                  to="/parks"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  National Parks
                </Link>
              </li>
            </ul>
          </div>

          {/* Find refuge */}
          <div>
            <h3 className="text-xl font-bold mb-4">Find refuge</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/refuges"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Search Refuges
                </Link>
              </li>
              <li>
                <Link
                  to="/refuges"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Browse by Area
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bas du footer */}
      <div className="container mx-auto py-4 border-t border-gray-700 px-6 md:px-16 lg:px-24">
        <p className="text-center text-gray-400">
          © ADRAR | 2025. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
