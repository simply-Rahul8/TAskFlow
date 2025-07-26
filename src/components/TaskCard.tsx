
import { useState } from 'react';
import { useTask, Task } from '@/contexts/TaskContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Calendar,
  User,
  MoreHorizontal,
  Edit,
  Trash,
  Clock
} from 'lucide-react';
import { format, isAfter, isBefore, addDays } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import TaskForm from './TaskForm';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { updateTask, deleteTask } = useTask();
  const { user } = useAuth();
  const { toast } = useToast();
  const [showEditDialog, setShowEditDialog] = useState(false);
  
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Complete';
  const isDueSoon = isAfter(new Date(task.dueDate), new Date()) && 
                   isBefore(new Date(task.dueDate), addDays(new Date(), 3));

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'To Do': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleStatusChange = (newStatus: Task['status']) => {
    updateTask(task.id, { status: newStatus });
    toast({
      title: "Status Updated",
      description: `Task status changed to ${newStatus}`,
    });
  };

  const handleDelete = () => {
    deleteTask(task.id);
    toast({
      title: "Task Deleted",
      description: "Task has been successfully deleted.",
      variant: "destructive",
    });
  };

  const canEdit = user?.role === 'Admin' || task.createdBy === user?.id || task.assignedTo === user?.id;

  return (
    <>
      <Card className={`transition-all duration-200 hover:shadow-lg ${
        isOverdue ? 'border-red-200 bg-red-50' : 
        isDueSoon ? 'border-orange-200 bg-orange-50' : ''
      }`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold line-clamp-1">
                {task.title}
              </CardTitle>
              <CardDescription className="line-clamp-2 mt-1">
                {task.description}
              </CardDescription>
            </div>
            {canEdit && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={handleDelete}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
            <Badge 
              className={`cursor-pointer ${getStatusColor(task.status)}`}
              onClick={() => {
                if (task.status === 'To Do') handleStatusChange('In Progress');
                else if (task.status === 'In Progress') handleStatusChange('Complete');
              }}
            >
              {task.status}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <User className="w-4 h-4 mr-2" />
              <span>Assigned to {task.assignedToName}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span className={isOverdue ? 'text-red-600 font-medium' : isDueSoon ? 'text-orange-600 font-medium' : ''}>
                Due {format(new Date(task.dueDate), 'MMM dd, yyyy')}
              </span>
              {(isOverdue || isDueSoon) && (
                <Clock className="w-4 h-4 ml-2 text-orange-500" />
              )}
            </div>
          </div>
          
          {task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {task.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Update task details and status
            </DialogDescription>
          </DialogHeader>
          <TaskForm 
            task={task} 
            onSuccess={() => setShowEditDialog(false)} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskCard;
