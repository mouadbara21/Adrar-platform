import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SearchBar from "../components/shared/SearchBar";
import TrailCard from "../components/trails/TrailCard";
import { trailsApi, parksApi } from "../services/api";
import { Trail, Park } from "../types";

const Explore = () => {
  const [searchParams] = useSearchParams();
  const [trails, setTrails] = useState<Trail[]>([]);
  const [parks, setParks] = useState<Park[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedPark, setSelectedPark] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trailsData, parksData] = await Promise.all([
          trailsApi.getAll({
            search: searchTerm,
            difficulty: selectedDifficulty,
            parc: selectedPark,
          }),
          parksApi.getAll(),
        ]);
        setTrails(trailsData);
        setParks(parksData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, selectedDifficulty, selectedPark]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const trailsData = await trailsApi.getAll({
        search: searchTerm,
        difficulty: selectedDifficulty,
        parc: selectedPark,
      });
      setTrails(trailsData);
    } catch (error) {
      console.error("Error searching trails:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 md:px-16 lg:px-24">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Explore Morocco's Trails
            </h1>
            <p className="text-lg text-gray-600">
              Discover amazing hiking trails across Morocco's national parks and
              mountains.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <SearchBar
                  placeholder="Search trails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Difficulties</option>
                  <option value="facile">Easy</option>
                  <option value="modéré">Moderate</option>
                  <option value="difficile">Difficult</option>
                  <option value="très difficile">Very Difficult</option>
                </select>
              </div>

              <div>
                <select
                  value={selectedPark}
                  onChange={(e) => setSelectedPark(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Parks</option>
                  {parks.map((park) => (
                    <option key={park.id_parc} value={park.id_parc}>
                      {park.nom}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={handleSearch}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Search Trails
              </button>
            </div>
          </div>

          {/* Best Hikes Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Best Hikes in Morocco</h2>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <p className="text-gray-700">
                Morocco offers some of the world's most spectacular hiking
                experiences, from the snow-capped peaks of the High Atlas to the
                rugged landscapes of the Anti-Atlas. Discover trails that take
                you through traditional Berber villages, alpine meadows, and to
                the summit of North Africa's highest peak.
              </p>
            </div>
          </section>

          {/* Results */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {searchTerm
                  ? `Search Results for "${searchTerm}"`
                  : "All Trails"}
              </h2>
              <span className="text-gray-600">
                {trails.length} trails found
              </span>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p>Loading trails...</p>
              </div>
            ) : trails.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  No trails found. Try adjusting your search criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {trails.map((trail) => (
                  <TrailCard key={trail.id_randonnee} trail={trail} />
                ))}
              </div>
            )}
          </section>
        </div>
        {/*best parc section*/}
        <section className="mt-16 mb-12">
          <h2 className="text-2xl font-bold mb-6">Best Parks in Morocco</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {parks.slice(0, 3).map((park) => (
              <div
                key={park.id_parc}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={`/images/parc_national/${park.id_parc}.jpg`}
                    alt={park.nom}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{park.nom}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {park.localisation}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {park.description?.substring(0, 100)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
