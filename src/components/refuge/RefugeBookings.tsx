import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { toast } from '../ui/use-toast';
import { Calendar, Users, Phone, Mail, Check, X, Eye } from 'lucide-react';

interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
}

const RefugeBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      clientName: 'Ahmed Bennani',
      clientEmail: 'ahmed.bennani@email.com',
      clientPhone: '+212 6 XX XX XX XX',
      checkIn: '2024-06-20',
      checkOut: '2024-06-22',
      guests: 2,
      status: 'pending',
      totalPrice: 300
    },
    {
      id: '2',
      clientName: 'Sarah Martin',
      clientEmail: 'sarah.martin@email.com',
      clientPhone: '+33 6 XX XX XX XX',
      checkIn: '2024-06-25',
      checkOut: '2024-06-27',
      guests: 4,
      status: 'confirmed',
      totalPrice: 600
    },
    {
      id: '3',
      clientName: 'Mohammed Alami',
      clientEmail: 'mohammed.alami@email.com',
      clientPhone: '+212 6 XX XX XX XX',
      checkIn: '2024-06-30',
      checkOut: '2024-07-02',
      guests: 1,
      status: 'pending',
      totalPrice: 150
    }
  ]);

  const updateBookingStatus = (bookingId: string, newStatus: 'confirmed' | 'cancelled') => {
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

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
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
                <p className="text-2xl font-bold text-easyhike-brown">
                  {confirmedBookings.reduce((sum, b) => sum + b.guests, 0)}
                </p>
                <p className="text-sm text-easyhike-gray">Personnes attendues</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-easyhike-brown flex items-center gap-2">
            <Calendar size={20} />
            Gestion des réservations
          </CardTitle>
          <CardDescription>
            Consultez et gérez toutes les réservations de votre refuge
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Personnes</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">
                    {booking.clientName}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail size={12} />
                        {booking.clientEmail}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone size={12} />
                        {booking.clientPhone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>Du {formatDate(booking.checkIn)}</div>
                      <div>Au {formatDate(booking.checkOut)}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      {booking.guests}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {booking.totalPrice} MAD
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(booking.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {booking.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            className="bg-easyhike-green hover:bg-easyhike-light-green"
                          >
                            <Check size={14} />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X size={14} />
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline">
                        <Eye size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RefugeBookings;
