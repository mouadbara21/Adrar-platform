
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import Navbar from '../components/Navbar';
import ProfessionalInfo from '../components/guide/ProfessionalInfo';
import Availability from '../components/guide/Availability';
import Bookings from '../components/guide/Bookings';
import Reviews from '../components/guide/Reviews';
import { User, Calendar, BookOpen, Star } from 'lucide-react';

const GuideProfile: React.FC = () => {
  return (
    <div className="min-h-screen bg-easyhike-beige">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl text-easyhike-brown">
                Tableau de bord du guide
              </CardTitle>
              <CardDescription>
                Gérez vos informations professionnelles, disponibilités et réservations
              </CardDescription>
            </CardHeader>
          </Card>

          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="info" className="flex items-center gap-2">
                <User size={16} />
                Informations
              </TabsTrigger>
              <TabsTrigger value="availability" className="flex items-center gap-2">
                <Calendar size={16} />
                Disponibilités
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex items-center gap-2">
                <BookOpen size={16} />
                Réservations
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center gap-2">
                <Star size={16} />
                Avis
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="mt-6">
              <ProfessionalInfo />
            </TabsContent>

            <TabsContent value="availability" className="mt-6">
              <Availability />
            </TabsContent>

            <TabsContent value="bookings" className="mt-6">
              <Bookings />
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Reviews />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default GuideProfile;
