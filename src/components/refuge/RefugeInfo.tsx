import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { toast } from '../../hooks/use-toast';
import { MapPin, Phone, Mail, Bed, Users, Mountain } from 'lucide-react';

const RefugeInfo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [refugeData, setRefugeData] = useState({
    name: 'Refuge du Toubkal',
    location: 'Haut Atlas, Maroc',
    altitude: '3207m',
    capacity: 80,
    phone: '+212 6 XX XX XX XX',
    email: 'refuge.toubkal@example.com',
    description: 'Refuge situé près du sommet du Toubkal, offrant un hébergement confortable pour les randonneurs.',
    services: ['Repas', 'Eau chaude', 'Électricité', 'Couvertures']
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Informations mises à jour",
      description: "Les informations du refuge ont été sauvegardées avec succès",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-easyhike-brown flex items-center gap-2">
            <Mountain size={20} />
            Informations du refuge
          </CardTitle>
          <CardDescription>
            Gérez les informations de votre refuge
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-easyhike-brown mb-2">Nom du refuge</h3>
                    <p className="text-lg">{refugeData.name}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-easyhike-brown mb-2 flex items-center gap-2">
                      <MapPin size={16} />
                      Localisation
                    </h3>
                    <p>{refugeData.location}</p>
                    <p className="text-sm text-easyhike-gray">Altitude: {refugeData.altitude}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-easyhike-brown mb-2 flex items-center gap-2">
                      <Users size={16} />
                      Capacité
                    </h3>
                    <p>{refugeData.capacity} personnes</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-easyhike-brown mb-2 flex items-center gap-2">
                      <Phone size={16} />
                      Contact
                    </h3>
                    <p>{refugeData.phone}</p>
                    <p className="flex items-center gap-2 mt-1">
                      <Mail size={16} />
                      {refugeData.email}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-easyhike-brown mb-2">Services disponibles</h3>
                    <div className="flex flex-wrap gap-2">
                      {refugeData.services.map((service, index) => (
                        <Badge key={index} className="bg-easyhike-light-green text-white">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-easyhike-brown mb-2">Description</h3>
                <p className="text-easyhike-gray">{refugeData.description}</p>
              </div>

              <Button 
                onClick={() => setIsEditing(true)}
                className="bg-easyhike-green hover:bg-easyhike-light-green"
              >
                Modifier les informations
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nom du refuge</Label>
                    <Input
                      id="name"
                      value={refugeData.name}
                      onChange={(e) => setRefugeData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Localisation</Label>
                    <Input
                      id="location"
                      value={refugeData.location}
                      onChange={(e) => setRefugeData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="altitude">Altitude</Label>
                    <Input
                      id="altitude"
                      value={refugeData.altitude}
                      onChange={(e) => setRefugeData(prev => ({ ...prev, altitude: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="capacity">Capacité</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={refugeData.capacity}
                      onChange={(e) => setRefugeData(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={refugeData.phone}
                      onChange={(e) => setRefugeData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={refugeData.email}
                      onChange={(e) => setRefugeData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={refugeData.description}
                  onChange={(e) => setRefugeData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleSave}
                  className="bg-easyhike-green hover:bg-easyhike-light-green"
                >
                  Sauvegarder
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Annuler
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RefugeInfo;
