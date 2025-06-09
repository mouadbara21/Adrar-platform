import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { toast } from '../../hooks/use-toast';
import { Calendar, Users, Phone, Mail, MapPin, Check, X, Eye } from 'lucide-react';

interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  activity: string;
  date: string;
  duration: string;
  groupSize: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  notes?: string;
}

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      clientName: 'Sarah Martin',
      clientEmail: 'sarah.martin@email.com',
      clientPhone: '+33 6 XX XX XX XX',
      activity: 'Trek Toubkal 2 jours',
      date: '2024-06-26',
      duration: '2 jours',
      groupSize: 4,
      status: 'confirmed',
      price: 1200,
      notes: 'Groupe expérimenté, demande niveau difficile'
    },
    {
      id: '2',
      clientName: 'Ahmed Alami',
      clientEmail: 'ahmed.alami@email.com',
      clientPhone: '+212 6 XX XX XX XX',
      activity: 'Randonnée Vallée Ourika',
      date: '2024-06-28',
      duration: '1 jour',
      groupSize: 2,
      status: 'pending',
      price: 400
    },
    {
      id: '3',
      clientName: 'Lisa Johnson',
      clientEmail: 'lisa.johnson@email.com',
      clientPhone: '+1 555 XXX XXXX',
      activity: 'Trek Sahara 3 jours',
      date: '2024-07-05',
      duration: '3 jours',
      groupSize: 6,
      status: 'pending',
      price: 1800
    }
  ]);

  const updateBookingStatus = (bookingId: string, newStatus: Booking['status']) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: newStatus }
        : booking
    ));

    toast({
      title: newStatus === 'confirmed' ? "Réservation confirmée" : "Réservation annulée",
      description: `La réservation a été ${newStatus === 'confirmed' ? 'confirmée' : 'annulée'} avec succès`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-easyhike-orange text-white">En attente</Badge>;
      case 'confirmed':
        return <Badge className="bg-easyhike-green text-white">Confirmée</Badge>;
      case 'completed':
        return <Badge className="bg-easyhike-light-green text-white">Terminée</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Annulée</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-easyhike-orange/10 rounded-lg">
                <Calendar className="text-easyhike-orange" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-easyhike-brown">{pendingBookings.length}</p>
                <p className="text-sm text-easyhike-gray">En attente</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-easyhike-green/10 rounded-lg">
                <Check className="text-easyhike-green" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-easyhike-brown">{confirmedBookings.length}</p>
                <p className="text-sm text-easyhike-gray">Confirmées</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-easyhike-light-green/10 rounded-lg">
                <Users className="text-easyhike-light-green" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-easyhike-brown">{totalRevenue} MAD</p>
                <p className="text-sm text-easyhike-gray">Revenus confirmés</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-easyhike-brown flex items-center gap-2">
            <Calendar size={20} />
            Mes réservations
          </CardTitle>
          <CardDescription>
            Consultez et gérez vos réservations de guidage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-easyhike-brown">{booking.activity}</h3>
                      {getStatusBadge(booking.status)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="space-y-2">
                        <p className="text-sm">
                          <strong>Client:</strong> {booking.clientName}
                        </p>
                        <div className="flex items-center gap-1 text-sm">
                          <Mail size={12} />
                          {booking.clientEmail}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone size={12} />
                          {booking.clientPhone}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar size={12} />
                          {formatDate(booking.date)} - {booking.duration}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Users size={12} />
                          {booking.groupSize} personne(s)
                        </div>
                        <p className="text-sm font-semibold text-easyhike-green">
                          {booking.price} MAD
                        </p>
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="text-sm text-easyhike-gray bg-easyhike-beige p-2 rounded">
                        <strong>Notes:</strong> {booking.notes}
                      </div>
                    )}
                  </div>
                </div>

                {booking.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                      className="bg-easyhike-green hover:bg-easyhike-light-green"
                    >
                      <Check size={14} className="mr-1" />
                      Confirmer
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X size={14} className="mr-1" />
                      Refuser
                    </Button>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button size="sm" variant="outline">
                    <Eye size={14} className="mr-1" />
                    Détails
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Bookings;
