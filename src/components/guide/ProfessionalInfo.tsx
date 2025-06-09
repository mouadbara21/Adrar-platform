import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { toast } from '../../hooks/use-toast';
import { User, MapPin, Phone, Mail, Mountain, Award } from 'lucide-react';

const ProfessionalInfo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [guideData, setGuideData] = useState({
    name: 'Ahmed Bennani',
    email: 'ahmed.bennani@example.com',
    phone: '+212 6 XX XX XX XX',
    location: 'Marrakech, Maroc',
    experience: '8 ans',
    specializations: ['Haute montagne', 'Trek du Toubkal', 'Sahara', 'Atlas'],
    languages: ['Français', 'Anglais', 'Arabe', 'Berbère'],
    certifications: ['Guide certifié IFMGA', 'Secours en montagne'],
    description: 'Guide de montagne expérimenté spécialisé dans les treks du Haut Atlas et les expéditions dans le Sahara. Passionné par la culture berbère et la nature.',
    rate: 500
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations professionnelles ont été sauvegardées avec succès",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-easyhike-brown flex items-center gap-2">
            <User size={20} />
            Informations professionnelles
          </CardTitle>
          <CardDescription>
            Gérez vos informations de guide professionnel
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isEditing ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-easyhike-brown mb-2">Nom complet</h3>
                    <p className="text-lg">{guideData.name}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-easyhike-brown mb-2 flex items-center gap-2">
                      <MapPin size={16} />
                      Localisation
                    </h3>
                    <p>{guideData.location}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-easyhike-brown mb-2 flex items-center gap-2">
                      <Mountain size={16} />
                      Expérience
                    </h3>
                    <p>{guideData.experience}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-easyhike-brown mb-2">Tarif journalier</h3>
                    <p className="text-lg font-semibold text-easyhike-green">{guideData.rate} MAD/jour</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-easyhike-brown mb-2 flex items-center gap-2">
                      <Phone size={16} />
                      Contact
                    </h3>
                    <p>{guideData.phone}</p>
                    <p className="flex items-center gap-2 mt-1">
                      <Mail size={16} />
                      {guideData.email}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-easyhike-brown mb-2">Langues parlées</h3>
                    <div className="flex flex-wrap gap-2">
                      {guideData.languages.map((language, index) => (
                        <Badge key={index} className="bg-easyhike-light-green text-white">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-easyhike-brown mb-2 flex items-center gap-2">
                      <Award size={16} />
                      Certifications
                    </h3>
                    <div className="space-y-1">
                      {guideData.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Badge className="bg-easyhike-green text-white">
                            {cert}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-easyhike-brown mb-2">Spécialisations</h3>
                <div className="flex flex-wrap gap-2">
                  {guideData.specializations.map((spec, index) => (
                    <Badge key={index} className="bg-easyhike-orange text-white">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-easyhike-brown mb-2">Description</h3>
                <p className="text-easyhike-gray">{guideData.description}</p>
              </div>

              <Button 
                onClick={() => setIsEditing(true)}
                className="bg-easyhike-green hover:bg-easyhike-light-green"
              >
                Modifier le profil
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nom complet</Label>
                    <Input
                      id="name"
                      value={guideData.name}
                      onChange={(e) => setGuideData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={guideData.email}
                      onChange={(e) => setGuideData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={guideData.phone}
                      onChange={(e) => setGuideData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Localisation</Label>
                    <Input
                      id="location"
                      value={guideData.location}
                      onChange={(e) => setGuideData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="experience">Expérience</Label>
                    <Input
                      id="experience"
                      value={guideData.experience}
                      onChange={(e) => setGuideData(prev => ({ ...prev, experience: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="rate">Tarif journalier (MAD)</Label>
                    <Input
                      id="rate"
                      type="number"
                      value={guideData.rate}
                      onChange={(e) => setGuideData(prev => ({ ...prev, rate: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={guideData.description}
                  onChange={(e) => setGuideData(prev => ({ ...prev, description: e.target.value }))}
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

export default ProfessionalInfo;
