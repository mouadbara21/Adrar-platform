
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Calendar } from 'lucide-react';

const RefugeStats: React.FC = () => {
  const stats = {
    monthlyRevenue: 15750,
    totalGuests: 245,
    occupancyRate: 78,
    averageStay: 2.3
  };

  const monthlyData = [
    { month: 'Jan', guests: 120, revenue: 8400 },
    { month: 'Fév', guests: 145, revenue: 10150 },
    { month: 'Mar', guests: 180, revenue: 12600 },
    { month: 'Avr', guests: 200, revenue: 14000 },
    { month: 'Mai', guests: 245, revenue: 15750 },
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-easyhike-green/10 rounded-lg">
                <TrendingUp className="text-easyhike-green" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-easyhike-brown">{stats.monthlyRevenue} MAD</p>
                <p className="text-sm text-easyhike-gray">Revenus du mois</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-easyhike-orange/10 rounded-lg">
                <Users className="text-easyhike-orange" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-easyhike-brown">{stats.totalGuests}</p>
                <p className="text-sm text-easyhike-gray">Visiteurs ce mois</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-easyhike-light-green/10 rounded-lg">
                <BarChart3 className="text-easyhike-light-green" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-easyhike-brown">{stats.occupancyRate}%</p>
                <p className="text-sm text-easyhike-gray">Taux d'occupation</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-easyhike-brown/10 rounded-lg">
                <Calendar className="text-easyhike-brown" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-easyhike-brown">{stats.averageStay}</p>
                <p className="text-sm text-easyhike-gray">Durée moyenne (jours)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-easyhike-brown">Évolution des visiteurs</CardTitle>
            <CardDescription>Nombre de visiteurs par mois</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={data.month} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{data.month}</span>
                  <div className="flex items-center gap-4 flex-1 mx-4">
                    <div className="w-full bg-easyhike-beige rounded-full h-2">
                      <div 
                        className="bg-easyhike-green h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(data.guests / 300) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-easyhike-brown font-semibold w-12 text-right">
                      {data.guests}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-easyhike-brown">Revenus mensuels</CardTitle>
            <CardDescription>Évolution des revenus en MAD</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={data.month} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{data.month}</span>
                  <div className="flex items-center gap-4 flex-1 mx-4">
                    <div className="w-full bg-easyhike-beige rounded-full h-2">
                      <div 
                        className="bg-easyhike-orange h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(data.revenue / 20000) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-easyhike-brown font-semibold w-16 text-right">
                      {data.revenue}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-easyhike-brown">Analyse détaillée</CardTitle>
          <CardDescription>Insights et tendances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-easyhike-green/5 rounded-lg">
              <h3 className="font-semibold text-easyhike-brown mb-2">Pic de fréquentation</h3>
              <p className="text-2xl font-bold text-easyhike-green">Mai</p>
              <p className="text-sm text-easyhike-gray">245 visiteurs</p>
            </div>
            
            <div className="text-center p-4 bg-easyhike-orange/5 rounded-lg">
              <h3 className="font-semibold text-easyhike-brown mb-2">Meilleur mois</h3>
              <p className="text-2xl font-bold text-easyhike-orange">15 750 MAD</p>
              <p className="text-sm text-easyhike-gray">Revenus de mai</p>
            </div>
            
            <div className="text-center p-4 bg-easyhike-light-green/5 rounded-lg">
              <h3 className="font-semibold text-easyhike-brown mb-2">Croissance</h3>
              <p className="text-2xl font-bold text-easyhike-light-green">+22%</p>
              <p className="text-sm text-easyhike-gray">Par rapport à avril</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RefugeStats;
