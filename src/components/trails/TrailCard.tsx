import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Trail } from "../../types";

interface TrailCardProps {
  trail: Trail;
}

const TrailCard = ({ trail }: TrailCardProps) => {
  const difficultyColors = {
    facile: "bg-green-100 text-green-800",
    modéré: "bg-yellow-100 text-yellow-800",
    difficile: "bg-orange-100 text-orange-800",
    "très difficile": "bg-red-100 text-red-800",
  };

  const difficultyClass = `text-xs px-2 py-1 rounded-full ${
    difficultyColors[trail.difficulte]
  }`;

  return (
    <Link to={`/trail/${trail.id_randonnee}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-md h-full hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          <img
            src={trail.image_url}
            alt={trail.nom}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold mb-1">{trail.nom}</h3>

          <div className="flex items-center gap-1 mb-2">
            <Star className="fill-yellow-400 stroke-yellow-400" size={16} />
            <span className="font-semibold">
              {trail.rating ? Number(trail.rating).toFixed(1) : "N/A"}
            </span>
            <span className="mx-2">•</span>
            <span className={difficultyClass}>
              {trail.difficulte.charAt(0).toUpperCase() +
                trail.difficulte.slice(1)}
            </span>
          </div>

          <div className="text-sm text-gray-600 mb-3">
            <p>{trail.parc_nom || trail.parc_localisation}</p>
          </div>

          <div className="flex justify-between text-xs text-gray-500">
            <div>
              <p className="font-semibold">{trail.distance} km</p>
              <p>Distance</p>
            </div>
            <div>
              <p className="font-semibold">{trail.denivele_positif} m</p>
              <p>Elevation gain</p>
            </div>
            <div>
              <p className="font-semibold">Est: {trail.duree_estimee}h</p>
              <p>Duration</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TrailCard;
