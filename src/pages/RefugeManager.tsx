
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import Navbar from '../components/Navbar';
import RefugeInfo from '../components/refuge/RefugeInfo';
import RefugeBookings from '../components/refuge/RefugeBookings';
import RefugeMaintenance from '../components/refuge/RefugeMaintenance';
import RefugeStats from '../components/refuge/RefugeStats';
import { Home, Calendar, Wrench, BarChart3 } from 'lucide-react';

const RefugeManager: React.FC = () => {
  return (
    <div className="min-h-screen bg-easyhike-beige">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl text-easyhike-brown">
                Tableau de bord du refuge
              </CardTitle>
              <CardDescription>
                Gérez votre refuge, les réservations et la maintenance
              </CardDescription>
            </CardHeader>
          </Card>

          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="info" className="flex items-center gap-2">
                <Home size={16} />
                Refuge
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex items-center gap-2">
                <Calendar size={16} />
                Réservations
              </TabsTrigger>
              <TabsTrigger value="maintenance" className="flex items-center gap-2">
                <Wrench size={16} />
                Maintenance
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center gap-2">
                <BarChart3 size={16} />
                Statistiques
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="mt-6">
              <RefugeInfo />
            </TabsContent>

            <TabsContent value="bookings" className="mt-6">
              <RefugeBookings />
            </TabsContent>

            <TabsContent value="maintenance" className="mt-6">
              <RefugeMaintenance />
            </TabsContent>

            <TabsContent value="stats" className="mt-6">
              <RefugeStats />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default RefugeManager;
