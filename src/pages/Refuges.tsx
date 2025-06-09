import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Mountain, Bed, Phone } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SearchBar from "../components/shared/SearchBar";
import { Button } from "../components/ui/button";
import { refugesApi } from "../services/api";
import { Refuge } from "../types";

const Refuges = () => {
  const [refuges, setRefuges] = useState<Refuge[]>([]);
  const [filteredRefuges, setFilteredRefuges] = useState<Refuge[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRefuges = async () => {
      try {
        const refugesData = await refugesApi.getAll();
        setRefuges(refugesData);
        setFilteredRefuges(refugesData);
      } catch (error) {
        console.error("Error fetching refuges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRefuges();
  }, []);

  useEffect(() => {
    const filtered = refuges.filter(
      (refuge) =>
        refuge.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        refuge.localisation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        refuge.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRefuges(filtered);
  }, [searchTerm, refuges]);

  return (
    <div className="min-h-screen flex flex-col px-6 md:px-16 lg:px-24">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Mountain Refuges</h1>
            <p className="text-lg text-gray-600">
              Find and book mountain refuges for your hiking adventures in
              Morocco.
            </p>
          </div>

          <div className="max-w-lg mx-auto mb-12">
            <SearchBar
              placeholder="Search refuges..."
              className="w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p>Loading refuges...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredRefuges.map((refuge) => (
                <div
                  key={refuge.id_refuge}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <img
                    src={`/images/refuges/${refuge.id_refuge}.jpg`}
                    alt={refuge.nom}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{refuge.nom}</h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin size={16} className="mr-2" />
                        <span className="text-sm">{refuge.localisation}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Mountain size={16} className="mr-2" />
                        <span className="text-sm">
                          Altitude: {refuge.altitude}m
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Bed size={16} className="mr-2" />
                        <span className="text-sm">
                          Capacity: {refuge.capacite} people
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone size={16} className="mr-2" />
                        <span className="text-sm">{refuge.contact}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                      {refuge.description}
                    </p>

                    <div className="flex justify-between items-center mb-4">
                      <div className="text-sm">
                        <p className="font-semibold text-green-600">
                          From {refuge.prix_sans_restauration} DH/night
                        </p>
                        <p className="text-gray-500">Without meals</p>
                      </div>
                      <div className="text-sm text-right">
                        <p className="font-semibold text-green-600">
                          {refuge.prix_avec_restauration} DH/night
                        </p>
                        <p className="text-gray-500">With meals</p>
                      </div>
                    </div>

                    <Button
                      asChild
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <Link to={`/refuge/${refuge.id_refuge}`}>
                        View Details & Book
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Refuges;
