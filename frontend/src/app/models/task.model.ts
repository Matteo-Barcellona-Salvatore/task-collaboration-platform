export interface Task {
  id?: number;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  assignedToId?: number;
  assignedToName?: string;
  createdById?: number;
  createdByName?: string;
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}