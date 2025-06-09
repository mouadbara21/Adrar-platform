import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Star, User, Calendar } from 'lucide-react';

interface Review {
  id: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
  activity: string;
}

const Reviews: React.FC = () => {
  const reviews: Review[] = [
    {
      id: '1',
      clientName: 'Sarah Martin',
      rating: 5,
      comment: 'Excellent guide! Ahmed nous a fait découvrir des endroits magnifiques et a partagé ses connaissances sur la culture locale. Très professionnel et sécurisant.',
      date: '2024-05-15',
      activity: 'Trek Toubkal 2 jours'
    },
    {
      id: '2',
      clientName: 'Mohammed Alami',
      rating: 5,
      comment: 'Une expérience inoubliable dans le Sahara. Ahmed connaît parfaitement la région et nous a offert une aventure authentique. Je recommande vivement!',
      date: '2024-05-10',
      activity: 'Trek Sahara 3 jours'
    },
    {
      id: '3',
      clientName: 'Lisa Johnson',
      rating: 4,
      comment: 'Très bonne randonnée dans l\'Atlas. Ahmed est passionné et très compétent. Petit bémol sur l\'organisation du repas mais dans l\'ensemble excellente expérience.',
      date: '2024-04-28',
      activity: 'Randonnée Vallée Ourika'
    },
    {
      id: '4',
      clientName: 'Pierre Dubois',
      rating: 5,
      comment: 'Guide exceptionnel! Ahmed a su s\'adapter à notre niveau et nous a fait vivre une aventure mémorable. Sa connaissance de la montagne est impressionnante.',
      date: '2024-04-20',
      activity: 'Trek Toubkal 2 jours'
    }
  ];

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length
  }));

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'text-easyhike-orange fill-current' : 'text-gray-300'}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="space-y-6">
      {/* Rating Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-easyhike-brown">Note globale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-easyhike-brown">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center mt-2">
                  {renderStars(Math.round(averageRating))}
                </div>
                <p className="text-sm text-easyhike-gray mt-1">
                  {totalReviews} avis
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-easyhike-brown">Répartition des notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count }) => (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm">{rating}</span>
                    <Star size={12} className="text-easyhike-orange fill-current" />
                  </div>
                  <div className="flex-1 bg-easyhike-beige rounded-full h-2">
                    <div 
                      className="bg-easyhike-orange h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(count / totalReviews) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-easyhike-gray w-8 text-right">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-easyhike-brown flex items-center gap-2">
            <Star size={20} />
            Avis clients
          </CardTitle>
          <CardDescription>
            Consultez les retours de vos clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-easyhike-beige pb-6 last:border-b-0 last:pb-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-easyhike-light-green rounded-full flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-easyhike-brown">{review.clientName}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-sm text-easyhike-gray flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDate(review.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-easyhike-green text-white">
                    {review.activity}
                  </Badge>
                </div>
                
                <p className="text-easyhike-gray leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reviews;
