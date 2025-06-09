import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { toast } from '../../hooks/use-toast';
import { Calendar, Clock, Plus } from 'lucide-react';

interface AvailabilitySlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'available' | 'booked' | 'blocked';
  activity?: string;
}

const Availability: React.FC = () => {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([
    {
      id: '1',
      date: '2024-06-25',
      startTime: '08:00',
      endTime: '18:00',
      status: 'available'
    },
    {
      id: '2',
      date: '2024-06-26',
      startTime: '07:00',
      endTime: '19:00',
      status: 'booked',
      activity: 'Trek Toubkal - Groupe de 4'
    },
    {
      id: '3',
      date: '2024-06-27',
      startTime: '08:00',
      endTime: '16:00',
      status: 'available'
    },
    {
      id: '4',
      date: '2024-06-28',
      startTime: '09:00',
      endTime: '17:00',
      status: 'blocked'
    }
  ]);

  const updateSlotStatus = (slotId: string, newStatus: AvailabilitySlot['status']) => {
    setSlots(prev => prev.map(slot => 
      slot.id === slotId ? { ...slot, status: newStatus } : slot
    ));

    toast({
      title: "Disponibilité mise à jour",
      description: `Le créneau a été marqué comme ${newStatus === 'available' ? 'disponible' : newStatus === 'blocked' ? 'bloqué' : 'réservé'}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-easyhike-green text-white">Disponible</Badge>;
      case 'booked':
        return <Badge className="bg-easyhike-orange text-white">Réservé</Badge>;
      case 'blocked':
        return <Badge variant="destructive">Indisponible</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const availableSlots = slots.filter(s => s.status === 'available');
  const bookedSlots = slots.filter(s => s.status === 'booked');
  const blockedSlots = slots.filter(s => s.status === 'blocked');

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-easyhike-green/10 rounded-lg">
                <Calendar className="text-easyhike-green" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-easyhike-brown">{availableSlots.length}</p>
                <p className="text-sm text-easyhike-gray">Jours disponibles</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-easyhike-orange/10 rounded-lg">
                <Clock className="text-easyhike-orange" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-easyhike-brown">{bookedSlots.length}</p>
                <p className="text-sm text-easyhike-gray">Réservations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/10 rounded-lg">
                <Calendar className="text-red-500" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-easyhike-brown">{blockedSlots.length}</p>
                <p className="text-sm text-easyhike-gray">Jours bloqués</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Availability Management */}
      <Card>
        <CardHeader>
          <CardTitle className="text-easyhike-brown flex items-center gap-2">
            <Calendar size={20} />
            Gestion des disponibilités
          </CardTitle>
          <CardDescription>
            Gérez vos créneaux de disponibilité pour les réservations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button className="bg-easyhike-green hover:bg-easyhike-light-green">
              <Plus size={16} className="mr-2" />
              Ajouter un créneau
            </Button>

            <div className="space-y-4">
              {slots.map((slot) => (
                <div key={slot.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-easyhike-brown">
                        {formatDate(slot.date)}
                      </h3>
                      <p className="text-easyhike-gray flex items-center gap-2">
                        <Clock size={16} />
                        {slot.startTime} - {slot.endTime}
                      </p>
                      {slot.activity && (
                        <p className="text-sm text-easyhike-orange mt-1">{slot.activity}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {getStatusBadge(slot.status)}
                    </div>
                  </div>

                  {slot.status !== 'booked' && (
                    <div className="flex gap-2">
                      {slot.status === 'available' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateSlotStatus(slot.id, 'blocked')}
                          className="text-red-600 hover:text-red-700"
                        >
                          Bloquer
                        </Button>
                      )}
                      {slot.status === 'blocked' && (
                        <Button
                          size="sm"
                          onClick={() => updateSlotStatus(slot.id, 'available')}
                          className="bg-easyhike-green hover:bg-easyhike-light-green"
                        >
                          Rendre disponible
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Availability;
