import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SearchBar from "../components/shared/SearchBar";
import { parksApi } from "../services/api";
import { Park } from "../types";

const Parks = () => {
  const [parks, setParks] = useState<Park[]>([]);
  const [filteredParks, setFilteredParks] = useState<Park[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const parksData = await parksApi.getAll();
        setParks(parksData);
        setFilteredParks(parksData);
      } catch (error) {
        console.error("Error fetching parks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParks();
  }, []);

  useEffect(() => {
    const filtered = parks.filter(
      (park) =>
        park.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        park.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredParks(filtered);
  }, [searchTerm, parks]);

  return (
    <div className="min-h-screen flex flex-col px-6 md:px-16 lg:px-24">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              National Parks of Morocco
            </h1>
            <p className="text-lg text-gray-600">
              Explore Morocco's diverse protected areas, from mountain ranges to
              coastal ecosystems.
            </p>
          </div>

          <div className="max-w-lg mx-auto mb-12">
            <SearchBar
              placeholder="Search national parks..."
              className="w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p>Loading parks...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 mb-16">
              {filteredParks.map((park) => (
                <div
                  key={park.id_parc}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="h-[400px] w-full overflow-hidden">
                      <img
                        src={`/images/parc_national/${park.id_parc}.jpg`}
                        alt={park.nom}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <h2 className="text-2xl font-bold">{park.nom}</h2>
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {park.trail_count || 0} trails
                        </div>
                      </div>

                      <p className="text-gray-600 mb-6">{park.description}</p>

                      <div className="mb-6">
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium flex items-center">
                            <MapPin size={16} className="mr-1 text-green-600" />
                            {park.localisation}
                          </p>
                        </div>
                      </div>

                      <Link
                        to={`/parks/${park.id_parc}`}
                        className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Explore Park
                      </Link>
                    </div>
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

export default Parks;
