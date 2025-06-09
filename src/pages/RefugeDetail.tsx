import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Star,
  ArrowLeft,
  MapPin,
  Mountain,
  Phone,
  User,
  Bed,
  Utensils,
  Wifi,
  Zap,
  Droplets,
  Thermometer,
  Hammer,
  FileText,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { refugesApi } from "../services/api";
import { Refuge } from "../types";

const RefugeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [refuge, setRefuge] = useState<Refuge | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReservation, setShowReservation] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [reservationData, setReservationData] = useState({
    arrival: "",
    departure: "",
    people: 1,
    stay: "sans_restauration",
    guide: "0",
    clientName: "",
    clientSurname: "",
    clientPhone: "",
    clientEmail: "",
  });

  useEffect(() => {
    const fetchRefuge = async () => {
      if (!id) return;

      try {
        const refugeData = await refugesApi.getById(id);
        setRefuge(refugeData);
      } catch (error) {
        console.error("Error fetching refuge:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRefuge();
  }, [id]);

  // Fonction pour obtenir l'image du service
  const getServiceIcon = (serviceName: string) => {
    const icons: { [key: string]: string } = {
      "Eau potable":
        "https://refugedaverole.ffcam.fr/csx/scripts/resizer.php?filename=REFUGE_PRESTATIONS%2FpictoON%2F50%2F48%2Fefa81co9ae15o&mime=image%252Fpng&originalname=Icon_57-Eau-courante.png&geometry=56x56",
      Electricité:
        "https://refugedaverole.ffcam.fr/csx/scripts/resizer.php?filename=REFUGE_PRESTATIONS%2FpictoON%2Fb0%2F56%2Fefa81cp1yhd97&mime=image%252Fpng&originalname=Icon_64-Prises-electriques.png&geometry=56x56",
      Chauffage:
        "https://refugedaverole.ffcam.fr/csx/scripts/resizer.php?filename=REFUGE_PRESTATIONS%2FpictoON%2F34%2F66%2Fefa81col3idzj&mime=image%252Fpng&originalname=Icon_60-Chauffage.png&geometry=56x56",
      Restauration:
        "https://refugedaverole.ffcam.fr/csx/scripts/resizer.php?filename=REFUGE_PRESTATIONS%2FpictoON%2Fec%2F43%2Fefa81coy53bep&mime=image%252Fpng&originalname=Icon_63-Restauration.png&geometry=56x56",
      Couette:
        "https://refugedaverole.ffcam.fr/csx/scripts/resizer.php?filename=REFUGE_PRESTATIONS%2FpictoON%2F7d%2F03%2Fefa81cnoifo9r&mime=image%252Fpng&originalname=Icon_51-Couette.png&geometry=56x56",
      Couverture:
        "https://refugedaverole.ffcam.fr/csx/scripts/resizer.php?filename=REFUGE_PRESTATIONS%2FpictoON%2F5a%2Fca%2Fefa81cnstfepu&mime=image%252Fpng&originalname=Icon_52-Couverture.png&geometry=56x56",
      Douche:
        "https://refugedaverole.ffcam.fr/csx/scripts/resizer.php?filename=REFUGE_PRESTATIONS%2FpictoON%2Fb0%2F75%2Fefa81co5eoilr&mime=image%252Fpng&originalname=Icon_55-Douche.png&geometry=56x56",
      Vaisselle:
        "https://refugedaverole.ffcam.fr/csx/scripts/resizer.php?filename=REFUGE_PRESTATIONS%2FpictoON%2F17%2F50%2Fefa81codb8brv&mime=image%252Fpng&originalname=Icon_58-Vaisselle.png&geometry=56x56",
      "Équipement de cuisson":
        "https://refugedaverole.ffcam.fr/csx/scripts/resizer.php?filename=REFUGE_PRESTATIONS%2FpictoON%2F9f%2Fbf%2Fefa81coh8ef2l&mime=image%252Fpng&originalname=Icon_59-Equipement-de-cuisson.png&geometry=56x56",
      Internet:
        "https://chaletlaberarde.ffcam.fr/csx/scripts/resizer.php?filename=REFUGE_PRESTATIONS%2FpictoON%2F44%2F99%2Fefa81copkm6fj&mime=image%252Fpng&originalname=Icon_61-Wifi.png&geometry=56x56",
    };

    const src = icons[serviceName] || "/images/services/default.png";
    return <img src={src} alt={serviceName} className="w-6 h-6" />;
  };

  // Fonction pour obtenir l'image de l'équipement
  const getEquipmentIcon = (equipmentName: string) => {
    const icons: { [key: string]: string } = {
      Cordes: "/images/equipement/Cordes.png",
      Crampons: "/images/equipement/Crampons.png",
      Piolets: "/images/equipement/Piolets.png",
      Tentes: "/images/equipement/Tentes.png",
      Battons_de_randonnées: "/images/equipement/Battons_de_randonées.png",
    };

    const src = icons[equipmentName] || "/images/equipement/default.png";
    return <img src={src} alt={equipmentName} className="w-6 h-6" />;
  };

  const handleReservationSubmit = async () => {
    if (!refuge || !id) return;

    try {
      const reservation = await refugesApi.createReservation(id, {
        user_id: 1, // This should come from auth context
        id_refuge: refuge.id_refuge,
        date_debut: reservationData.arrival,
        date_fin: reservationData.departure,
        nombre_personne: reservationData.people,
        avec_restauration: reservationData.stay === "avec_restauration",
      });

      alert("Reservation confirmed!");
      setShowReservation(false);
      setCurrentStep(1);
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert("Error creating reservation. Please try again.");
    }
  };

  const calculateNights = (arrival: string, departure: string) => {
    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);
    const diffTime = Math.abs(departureDate.getTime() - arrivalDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTotalPrice = () => {
    if (!refuge || !reservationData.arrival || !reservationData.departure)
      return 0;

    const nights = calculateNights(
      reservationData.arrival,
      reservationData.departure
    );
    const basePrice =
      reservationData.stay === "avec_restauration"
        ? refuge.prix_avec_restauration
        : refuge.prix_sans_restauration;

    return nights * reservationData.people * basePrice;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16 flex items-center justify-center">
          <p>Loading refuge details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!refuge) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Refuge not found</h1>
          <Link to="/refuges" className="text-green-600 hover:underline">
            Return to refuges
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col px-6 md:px-16 lg:px-24">
      <Navbar />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <div
          className="bg-cover bg-center text-white py-28"
          style={{
            backgroundImage: `url(/images/refuges/default.jpg)`,
          }}
        >
          <div className="container mx-auto px-4">
            <Link
              to="/refuges"
              className="inline-flex items-center text-white hover:text-gray-200 mb-4"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to refuges
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {refuge.nom}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
              <div className="flex items-center">
                <MapPin size={20} className="mr-2" />
                <span>{refuge.localisation}</span>
              </div>
              <div className="flex items-center">
                <Mountain size={20} className="mr-2" />
                <span>Altitude: {refuge.altitude}m</span>
              </div>
              <div className="flex items-center">
                <Phone size={20} className="mr-2" />
                <span>Contact: {refuge.contact}</span>
              </div>
            </div>

            {refuge.gardien && (
              <div className="flex items-center mt-4">
                <User size={20} className="mr-2" />
                <span>Gardien: {refuge.gardien}</span>
              </div>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Description */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <FileText className="mr-3 text-600" size={32} />
              <h2 className="text-2xl font-bold">Description</h2>
            </div>
            <p className="text-lg text-gray-700">{refuge.description}</p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Services */}
            {refuge.services && refuge.services.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Utensils className="mr-3 text-600\" size={24} />
                  Available Services
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {refuge.services.map((service) => (
                    <div
                      key={service.id_service}
                      className="flex items-center p-4 bg-gray-50 rounded-lg"
                    >
                      {getServiceIcon(service.nom_service)}
                      <span className="ml-3 font-medium">
                        {service.nom_service}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Equipment */}
            {refuge.equipments && refuge.equipments.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Hammer className="mr-3 text-600" size={24} />
                  Available Equipment
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {refuge.equipments.map((equipment) => (
                    <div
                      key={equipment.id_equipement}
                      className="flex items-center p-4 bg-gray-50 rounded-lg"
                    >
                      {getEquipmentIcon(equipment.nom)}
                      <span className="ml-3 font-medium">{equipment.nom}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Capacity and Pricing */}
          <section className="mb-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Bed className="mr-3 text-600" size={24} />
              Capacity and Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600 mb-2">
                  {refuge.capacite}
                </p>
                <p className="text-gray-600">Total Capacity</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600 mb-2">
                  {refuge.prix_sans_restauration} DH
                </p>
                <p className="text-gray-600">Without Meals</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600 mb-2">
                  {refuge.prix_avec_restauration} DH
                </p>
                <p className="text-gray-600">With Meals</p>
              </div>
            </div>
          </section>

          {/* Guides */}
          {refuge.guides && refuge.guides.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <User className="mr-3 text-600" size={24} />
                Available Guides
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {refuge.guides.map((guide) => (
                  <Card key={guide.id_guide_profile} className="p-6">
                    <CardContent className="p-0">
                      <h3 className="font-bold text-lg mb-2">
                        {guide.nom} {guide.prenom}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        Experience: {guide.experience} years
                      </p>
                      {guide.specialite && (
                        <p className="text-gray-600 mb-2">
                          Specialty: {guide.specialite}
                        </p>
                      )}
                      <p className="text-gray-600 mb-4">
                        Contact: {guide.contact_guide}
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Contact Guide
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Summits */}
          {refuge.summits && refuge.summits.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <img
                  src="/images/icons/mountain.png"
                  alt="altitude icon"
                  className="w-12 h-12 mr-3"
                />
                Accessible Summits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {refuge.summits.map((summit) => (
                  <Card key={summit.id_sommet} className="p-6 text-center">
                    <CardContent className="p-0">
                      <img
                        src="/images/icons/mountain.png"
                        alt="altitude icon"
                        className="mx-auto mb-4 w-14 h-14"
                      />
                      <h3 className="font-bold text-lg mb-2">{summit.nom}</h3>
                      <p className="text-gray-600 mb-2">
                        Altitude: {summit.altitude}m
                      </p>
                      <p className="text-gray-600 mb-2">
                        Difficulty: {summit.difficulte}
                      </p>
                      <p className="text-gray-600">Time: {summit.temps}h</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Reservation Section */}
          <section className="mb-12">
            <div className="text-center">
              <Button
                onClick={() => setShowReservation(!showReservation)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
              >
                Make Reservation
              </Button>
            </div>

            {showReservation && (
              <div className="mt-8 bg-white border rounded-lg p-6">
                {/* Stepper */}
                <div className="flex justify-between mb-8">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`flex items-center ${
                        step <= currentStep ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                          step <= currentStep
                            ? "border-green-600 bg-green-600 text-white"
                            : "border-gray-300"
                        }`}
                      >
                        {step}
                      </div>
                      <span className="ml-2 hidden sm:block">
                        {step === 1 && "Dates"}
                        {step === 2 && "Services"}
                        {step === 3 && "Info"}
                        {step === 4 && "Summary"}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Step Content */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold mb-4">Select Dates</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Arrival Date
                        </label>
                        <input
                          type="date"
                          value={reservationData.arrival}
                          onChange={(e) =>
                            setReservationData({
                              ...reservationData,
                              arrival: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Departure Date
                        </label>
                        <input
                          type="date"
                          value={reservationData.departure}
                          onChange={(e) =>
                            setReservationData({
                              ...reservationData,
                              departure: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Number of People
                        </label>
                        <input
                          type="number"
                          min="1"
                          max={refuge.capacite}
                          value={reservationData.people}
                          onChange={(e) =>
                            setReservationData({
                              ...reservationData,
                              people: parseInt(e.target.value),
                            })
                          }
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold mb-4">Select Services</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Stay Type
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="stay"
                              value="sans_restauration"
                              checked={
                                reservationData.stay === "sans_restauration"
                              }
                              onChange={(e) =>
                                setReservationData({
                                  ...reservationData,
                                  stay: e.target.value,
                                })
                              }
                              className="mr-2"
                            />
                            Without meals ({refuge.prix_sans_restauration}{" "}
                            DH/night)
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="stay"
                              value="avec_restauration"
                              checked={
                                reservationData.stay === "avec_restauration"
                              }
                              onChange={(e) =>
                                setReservationData({
                                  ...reservationData,
                                  stay: e.target.value,
                                })
                              }
                              className="mr-2"
                            />
                            With meals ({refuge.prix_avec_restauration}{" "}
                            DH/night)
                          </label>
                        </div>
                      </div>

                      {refuge.guides && refuge.guides.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Select Guide (Optional)
                          </label>
                          <select
                            value={reservationData.guide}
                            onChange={(e) =>
                              setReservationData({
                                ...reservationData,
                                guide: e.target.value,
                              })
                            }
                            className="w-full p-2 border rounded-md"
                          >
                            <option value="0">No guide</option>
                            {refuge.guides.map((guide) => (
                              <option
                                key={guide.id_guide_profile}
                                value={guide.id_guide_profile}
                              >
                                {guide.nom} {guide.prenom} ({guide.experience}{" "}
                                years)
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold mb-4">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={reservationData.clientName}
                          onChange={(e) =>
                            setReservationData({
                              ...reservationData,
                              clientName: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={reservationData.clientSurname}
                          onChange={(e) =>
                            setReservationData({
                              ...reservationData,
                              clientSurname: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={reservationData.clientPhone}
                          onChange={(e) =>
                            setReservationData({
                              ...reservationData,
                              clientPhone: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={reservationData.clientEmail}
                          onChange={(e) =>
                            setReservationData({
                              ...reservationData,
                              clientEmail: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold mb-4">
                      Reservation Summary
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <p>
                        <strong>Arrival:</strong> {reservationData.arrival}
                      </p>
                      <p>
                        <strong>Departure:</strong> {reservationData.departure}
                      </p>
                      <p>
                        <strong>People:</strong> {reservationData.people}
                      </p>
                      <p>
                        <strong>Stay:</strong>{" "}
                        {reservationData.stay === "avec_restauration"
                          ? "With meals"
                          : "Without meals"}
                      </p>
                      <p>
                        <strong>Total Price:</strong> {calculateTotalPrice()} DH
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        onClick={handleReservationSubmit}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        Confirm Reservation
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowReservation(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                {currentStep < 4 && (
                  <div className="flex justify-between mt-8">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentStep(Math.max(1, currentStep - 1))
                      }
                      disabled={currentStep === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={() =>
                        setCurrentStep(Math.min(4, currentStep + 1))
                      }
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RefugeDetail;
