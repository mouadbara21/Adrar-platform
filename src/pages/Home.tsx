import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Mountain, Users, Star } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SearchBar from "../components/shared/SearchBar";
import TrailCard from "../components/trails/TrailCard";
import { Button } from "../components/ui/button";
import { trailsApi } from "../services/api";
import { Trail } from "../types";
import { ArrowRight } from "phosphor-react";

const Home = () => {
  const [popularTrails, setPopularTrails] = useState<Trail[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularTrails = async () => {
      try {
        const trails = await trailsApi.getAll();
        // Get top 3 trails by rating
        const popular = trails.sort((a, b) => b.rating - a.rating).slice(0, 3);
        setPopularTrails(popular);
      } catch (error) {
        console.error("Error fetching popular trails:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularTrails();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      window.location.href = `/explore?search=${encodeURIComponent(
        searchTerm
      )}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/homepage.png')" }}
        ></div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Content container */}
        <div className="container mx-auto px-4 pt-16 relative z-10">
          <div className="max-w-3xl">
            <div className="space-y-6 animate-fade-in text-center">
              {/* Main heading */}
              <h1 className="text-6xl md:text-8xl font-black text-white hero-text-shadow">
                HIKE.
                <br />
                <span className="text-white">DISCOVERER.</span>
                <br />
                <span className="text-adrar-green">REPEAT.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-2xl text-white font-medium">
                Discover the most beautiful hiking trails in Morocco
              </p>

              {/* Search bar with button */}
              <div className="w-full max-w-lg mx-auto backdrop-blur-sm flex">
                <SearchBar
                  placeholder="Search trails, parks, refuges..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="flex-1"
                />
                <Button
                  onClick={handleSearchSubmit}
                  className="ml-2 bg-adrar-green hover:bg-adrar-dark-green flex items-center"
                >
                  Search
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap justify-center gap-4 pt-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-green-800 hover:bg-gray-100 flex items-center"
                >
                  <Link to="/explore" className="flex items-center">
                    <span>Explore Trails</span>
                    <ArrowRight
                      size={16}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-green-800 flex items-center"
                >
                  <Link to="/parks" className="flex items-center">
                    <span>National Parks</span>
                    <ArrowRight
                      size={16}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Mountain className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-2">50+</h3>
              <p className="text-gray-600">Hiking Trails</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-2">15+</h3>
              <p className="text-gray-600">Mountain Refuges</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-2">25+</h3>
              <p className="text-gray-600">Expert Guides</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Star className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-2">4.8</h3>
              <p className="text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Trails Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular Trails
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the most loved hiking trails in Morocco, rated by our
              community of adventurers.
            </p>
          </div>

          {loading ? (
            <div className="text-center">
              <p>Loading popular trails...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {popularTrails.map((trail) => (
                <TrailCard key={trail.id_randonnee} trail={trail} />
              ))}
            </div>
          )}

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700"
            >
              <Link to="/explore">View All Trails</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore Morocco's Mountains
            </h2>
            <p className="text-lg text-gray-600">
              Interactive map coming soon - discover trails by region
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div
              className="h-96 bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage:
                  "url(https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg)",
              }}
            >
              <div className="bg-white bg-opacity-90 p-8 rounded-lg text-center">
                <h3 className="text-2xl font-bold mb-4">Interactive Map</h3>
                <p className="text-gray-600 mb-4">Coming Soon</p>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link to="/parks">Explore Parks</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
