
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Wrench, AlertTriangle, CheckCircle, Clock, Plus } from 'lucide-react';

interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  assignee: string;
}

const RefugeMaintenance: React.FC = () => {
  const [tasks, setTasks] = useState<MaintenanceTask[]>([
    {
      id: '1',
      title: 'Réparation de la plomberie',
      description: 'Fuite dans les toilettes du premier étage',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-06-25',
      assignee: 'Ahmed Bennani'
    },
    {
      id: '2',
      title: 'Maintenance chauffage',
      description: 'Vérification annuelle du système de chauffage',
      priority: 'medium',
      status: 'in-progress',
      dueDate: '2024-06-30',
      assignee: 'Sarah Martin'
    },
    {
      id: '3',
      title: 'Nettoyage des gouttières',
      description: 'Nettoyage des gouttières avant la saison des pluies',
      priority: 'low',
      status: 'completed',
      dueDate: '2024-06-20',
      assignee: 'Mohammed Alami'
    }
  ]);

  const updateTaskStatus = (taskId: string, newStatus: MaintenanceTask['status']) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));

    toast({
      title: "Statut mis à jour",
      description: `La tâche a été marquée comme ${newStatus === 'completed' ? 'terminée' : newStatus === 'in-progress' ? 'en cours' : 'en attente'}`,
    });
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge className="bg-red-600 text-white">Urgent</Badge>;
      case 'high':
        return <Badge className="bg-easyhike-orange text-white">Élevée</Badge>;
      case 'medium':
        return <Badge className="bg-easyhike-light-green text-white">Moyenne</Badge>;
      case 'low':
        return <Badge variant="secondary">Faible</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-easyhike-gray text-white">En attente</Badge>;
      case 'in-progress':
        return <Badge className="bg-easyhike-orange text-white">En cours</Badge>;
      case 'completed':
        return <Badge className="bg-easyhike-green text-white">Terminée</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} className="text-easyhike-gray" />;
      case 'in-progress':
        return <Wrench size={16} className="text-easyhike-orange" />;
      case 'completed':
        return <CheckCircle size={16} className="text-easyhike-green" />;
      default:
        return null;
    }
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-easyhike-gray/10 rounded-lg">
                <Clock className="text-easyhike-gray" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-easyhike-brown">{pendingTasks.length}</p>
                <p className="text-sm text-easyhike-gray">En attente</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-easyhike-orange/10 rounded-lg">
                <Wrench className="text-easyhike-orange" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-easyhike-brown">{inProgressTasks.length}</p>
                <p className="text-sm text-easyhike-gray">En cours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-easyhike-green/10 rounded-lg">
                <CheckCircle className="text-easyhike-green" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-easyhike-brown">{completedTasks.length}</p>
                <p className="text-sm text-easyhike-gray">Terminées</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-easyhike-brown flex items-center gap-2">
            <Wrench size={20} />
            Tâches de maintenance
          </CardTitle>
          <CardDescription>
            Gérez les tâches de maintenance de votre refuge
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button className="bg-easyhike-green hover:bg-easyhike-light-green">
              <Plus size={16} className="mr-2" />
              Nouvelle tâche
            </Button>

            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(task.status)}
                        <h3 className="font-semibold text-easyhike-brown">{task.title}</h3>
                      </div>
                      <p className="text-easyhike-gray mb-2">{task.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span>Assigné à: <strong>{task.assignee}</strong></span>
                        <span>Échéance: <strong>{new Date(task.dueDate).toLocaleDateString('fr-FR')}</strong></span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {getPriorityBadge(task.priority)}
                      {getStatusBadge(task.status)}
                    </div>
                  </div>

                  {task.status !== 'completed' && (
                    <div className="flex gap-2">
                      {task.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => updateTaskStatus(task.id, 'in-progress')}
                          className="bg-easyhike-orange hover:bg-easyhike-orange/80"
                        >
                          Commencer
                        </Button>
                      )}
                      {task.status === 'in-progress' && (
                        <Button
                          size="sm"
                          onClick={() => updateTaskStatus(task.id, 'completed')}
                          className="bg-easyhike-green hover:bg-easyhike-light-green"
                        >
                          Terminer
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

export default RefugeMaintenance;
