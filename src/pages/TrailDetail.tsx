import { useParams, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  Star,
  ArrowLeft,
  Clock,
  Navigation,
  Mountain,
  Share,
  MapPin,
  Heart,
  Bed,
  User
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { trailsApi } from "../services/api";
import { Trail } from "../types";

const TrailDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [trail, setTrail] = useState<Trail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  const overviewRef = useRef<HTMLDivElement>(null);
  const conditionsRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const nearbyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTrail = async () => {
      if (!id) return;
      
      try {
        const trailData = await trailsApi.getById(id);
        setTrail(trailData);
      } catch (error) {
        console.error('Error fetching trail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrail();
  }, [id]);

  const scrollToSection = (sectionId: string) => {
    const sectionRef =
      sectionId === "overview" ? overviewRef :
      sectionId === "conditions" ? conditionsRef :
      sectionId === "reviews" ? reviewsRef :
      sectionId === "map" ? mapRef :
      nearbyRef;

    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      const isOverviewVisible = overviewRef.current && 
        scrollPosition >= overviewRef.current.offsetTop &&
        scrollPosition < (conditionsRef.current?.offsetTop || Infinity);
      
      const isConditionsVisible = conditionsRef.current && 
        scrollPosition >= conditionsRef.current.offsetTop &&
        scrollPosition < (reviewsRef.current?.offsetTop || Infinity);
      
      const isReviewsVisible = reviewsRef.current && 
        scrollPosition >= reviewsRef.current.offsetTop &&
        scrollPosition < (mapRef.current?.offsetTop || Infinity);
      
      const isMapVisible = mapRef.current && 
        scrollPosition >= mapRef.current.offsetTop &&
        scrollPosition < (nearbyRef.current?.offsetTop || Infinity);
      
      const isNearbyVisible = nearbyRef.current && 
        scrollPosition >= nearbyRef.current.offsetTop;
      
      if (isOverviewVisible) setActiveSection("overview");
      else if (isConditionsVisible) setActiveSection("conditions");
      else if (isReviewsVisible) setActiveSection("reviews");
      else if (isMapVisible) setActiveSection("map");
      else if (isNearbyVisible) setActiveSection("nearby");
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16 flex items-center justify-center">
          <p>Loading trail details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!trail) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Trail not found</h1>
          <Link to="/" className="text-green-600 hover:underline">
            Return to home page
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const difficultyColors = {
    'facile': 'bg-green-100 text-green-800',
    'modéré': 'bg-yellow-100 text-yellow-800',
    'difficile': 'bg-orange-100 text-orange-800',
    'très difficile': 'bg-red-100 text-red-800'
  };

  const difficultyClass = `text-xs px-2 py-1 rounded-full ${difficultyColors[trail.difficulte]}`;

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        {/* Breadcrumb */}
        <div className="bg-gray-100 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-green-600">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/explore" className="hover:text-green-600">Morocco</Link>
              <span className="mx-2">/</span>
              <Link to="/explore" className="hover:text-green-600">{trail.parc_nom}</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{trail.nom}</span>
            </div>
          </div>
        </div>

        {/* Trail header */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{trail.nom}</h1>
              <div className="flex items-center gap-2 mb-2">
                <Star className="fill-yellow-400 stroke-yellow-400" size={18} />
                <span className="font-bold">{trail.rating ? Number(trail.rating).toFixed(1) : "N/A"}</span>
                <span className="mx-2">•</span>
                <span className={difficultyClass}>
                  {trail.difficulte.charAt(0).toUpperCase() + trail.difficulte.slice(1)}
                </span>
                <span className="mx-2">•</span>
                <Link to="/explore" className="text-green-600 hover:underline">
                  {trail.parc_nom}
                </Link>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className={`flex items-center gap-2 ${isSaved ? 'text-red-500' : ''}`}
                onClick={handleSave}
              >
                <Heart size={16} className={isSaved ? 'fill-red-500' : ''} />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share size={16} />
                <span>Share</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="container mx-auto px-4 py-4">
          <div className="rounded-lg overflow-hidden h-[400px]">
            <img 
              src="https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg"
              alt={trail.nom} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Trail stats */}
        <div className="container mx-auto px-4 py-8 border-b">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold mb-1">{trail.distance} km</p>
              <p className="text-gray-600">Length</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold mb-1">{trail.denivele_positif} m</p>
              <p className="text-gray-600">Elevation gain</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="flex items-center">
                <ArrowLeft className="transform rotate-180" size={24} />
                <ArrowLeft size={24} />
              </div>
              <p className="text-gray-600">Out & back</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold mb-1">Est: {trail.duree_estimee}h</p>
              <p className="text-gray-600">Duration</p>
            </div>
          </div>
        </div>

        {/* Sticky navigation */}
        <div className="sticky top-16 bg-white border-b z-20">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto no-scrollbar">
              <button 
                onClick={() => scrollToSection("overview")} 
                className={`py-4 px-6 font-medium border-b-2 transition-colors ${activeSection === "overview" ? "border-green-600 text-green-600" : "border-transparent"}`}
              >
                Overview
              </button>
              <button 
                onClick={() => scrollToSection("conditions")} 
                className={`py-4 px-6 font-medium border-b-2 transition-colors ${activeSection === "conditions" ? "border-green-600 text-green-600" : "border-transparent"}`}
              >
                Conditions
              </button>
              <button 
                onClick={() => scrollToSection("reviews")} 
                className={`py-4 px-6 font-medium border-b-2 transition-colors ${activeSection === "reviews" ? "border-green-600 text-green-600" : "border-transparent"}`}
              >
                Reviews
              </button>
              <button 
                onClick={() => scrollToSection("map")} 
                className={`py-4 px-6 font-medium border-b-2 transition-colors ${activeSection === "map" ? "border-green-600 text-green-600" : "border-transparent"}`}
              >
                Map
              </button>
              <button 
                onClick={() => scrollToSection("nearby")} 
                className={`py-4 px-6 font-medium border-b-2 transition-colors ${activeSection === "nearby" ? "border-green-600 text-green-600" : "border-transparent"}`}
              >
                Nearby
              </button>
            </div>
          </div>
        </div>

        {/* Content sections */}
        <div className="container mx-auto px-4">
          {/* Overview section */}
          <div ref={overviewRef} id="overview" className="py-12">
            <h2 className="text-2xl font-bold mb-6">Overview</h2>
            <div className="prose max-w-none">
              <p className="text-lg">{trail.description}</p>
            </div>
            
            {/* Summits */}
            {trail.summits && trail.summits.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Summits</h3>
                <div className="space-y-4">
                  {trail.summits.map((summit) => (
                    <div key={summit.id_sommet} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-gray-200 w-16 h-16 flex items-center justify-center">
                            <Mountain size={24} />
                          </div>
                          <div>
                            <p className="font-semibold">{summit.nom}</p>
                            <p className="text-gray-600">{summit.altitude}m - {summit.difficulte}</p>
                            <p className="text-sm text-gray-500">Estimated time: {summit.temps}h</p>
                          </div>
                        </div>
                        <ArrowLeft className="transform rotate-180" size={20} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Refuges */}
            {trail.refuges && trail.refuges.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Bed className="mr-2" size={20} />
                  Refuge options
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {trail.refuges.map((refuge) => (
                    <div key={refuge.id_refuge} className="border rounded-lg p-4">
                      <h5 className="font-semibold">{refuge.nom}</h5>
                      <p className="text-sm text-gray-600 mb-2">Elevation: {refuge.altitude} m</p>
                      <p className="text-sm mb-2">{refuge.description}</p>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/refuge/${refuge.id_refuge}`}>View details</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Guides */}
            {trail.guides && trail.guides.length > 0 && (
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-3 flex items-center">
                  <User className="mr-2" size={20} />
                  Available guides
                </h4>
                <div className="border rounded-lg p-4 mb-4">
                  <h5 className="font-semibold mb-2">Professional guides</h5>
                  <ul className="space-y-3">
                    {trail.guides.map((guide) => (
                      <li key={guide.id_guide_profile} className="flex justify-between">
                        <div>
                          <p className="font-medium">{guide.nom} {guide.prenom}</p>
                          <p className="text-sm text-gray-600">{guide.experience}+ years experience</p>
                          {guide.specialite && (
                            <p className="text-sm text-gray-600">Specialty: {guide.specialite}</p>
                          )}
                        </div>
                        <Button size="sm" variant="outline">Contact</Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            <div className="flex gap-3 mt-8">
              <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                <MapPin className="mr-2" size={18} />
                Get directions
              </Button>
              <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                <Navigation className="mr-2" size={18} />
                Hit the trail
              </Button>
            </div>
          </div>
          
          {/* Conditions section */}
          <div ref={conditionsRef} id="conditions" className="py-12 border-t">
            <h2 className="text-2xl font-bold mb-6">Conditions</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-7 gap-4 mb-6">
                {['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
                  <div key={index} className={`text-center p-4 rounded-lg ${index === 0 ? 'border-2 border-green-600' : ''}`}>
                    <p className="font-medium">{day}</p>
                    <p className="text-xl font-bold">{10 + index}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white p-8 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-6xl font-bold">18°</div>
                    <div className="mt-4">Showers</div>
                    <div className="text-sm mt-2">H: 19° L: 11°</div>
                    <div className="flex items-center gap-2 mt-4">
                      <Clock size={16} />
                      <span>6:39 am</span>
                      <Clock size={16} className="ml-2" />
                      <span>8:17 pm</span>
                    </div>
                  </div>
                  
                  <div className="text-8xl">
                    ☁️
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1">
                  Get directions
                </Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  Hit the trail
                </Button>
              </div>
            </div>
          </div>
          
          {/* Reviews section */}
          <div ref={reviewsRef} id="reviews" className="py-12 border-t">
            <h2 className="text-2xl font-bold mb-6">Reviews</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-5xl font-bold">{trail.rating ? Number(trail.rating).toFixed(1) : "N/A"}</div>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="fill-yellow-400 stroke-yellow-400" size={16} />
                    ))}
                  </div>
                  <p className="text-gray-600 mt-1">{trail.review_count} reviews</p>
                </div>
                
                <Button variant="outline" className="bg-gray-800 text-white">
                  Review trail
                </Button>
              </div>
              
              {/* Sample Reviews */}
              {trail.reviews && trail.reviews.map((review) => (
                <div key={review.id_avis} className="border-t pt-6">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="font-bold">{review.nom.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-bold">{review.nom} {review.prenom}</p>
                        <div className="flex items-center">
                          {[...Array(review.note)].map((_, i) => (
                            <Star key={i} className="fill-yellow-400 stroke-yellow-400" size={12} />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">{review.date_avis}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="mt-3">{review.commentaire}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Map section */}
          <div ref={mapRef} id="map" className="py-12 border-t">
            <h2 className="text-2xl font-bold mb-6">Map</h2>
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <div className="w-full h-96 bg-gray-300 flex items-center justify-center">
                <p className="text-gray-600">Interactive map coming soon</p>
              </div>
              <div className="p-4 bg-white">
                <p className="text-sm text-gray-600">
                  Trail map of {trail.nom} showing the route from {trail.localisation_de_depart} to {trail.localisation_darrive}.
                </p>
              </div>
            </div>
          </div>
          
          {/* Nearby section */}
          <div ref={nearbyRef} id="nearby" className="py-12 border-t">
            <h2 className="text-2xl font-bold mb-6">Top trails nearby</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src="https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg"
                    alt="Nearby trail" 
                    className="w-full h-full object-cover"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 bg-white rounded-full"
                  >
                    <Star size={20} />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold mb-1">Similar Trail</h3>
                  <p className="text-sm text-gray-600 mb-1">{trail.parc_nom}</p>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="fill-yellow-400 stroke-yellow-400" size={14} />
                    <span>4.5</span>
                    <span className="mx-1">•</span>
                    <span className="font-medium">Moderate</span>
                    <span className="mx-1">•</span>
                    <span>8.2 km</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrailDetail;