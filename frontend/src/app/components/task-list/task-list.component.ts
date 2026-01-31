import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() taskEdit = new EventEmitter<Task>();
  @Output() taskDelete = new EventEmitter<number>();

  constructor(private taskService: TaskService) {}

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'HIGH': return 'text-red-600 bg-red-100';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100';
      case 'LOW': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }

  editTask(task: Task): void {
    this.taskEdit.emit(task);
  }

  deleteTask(task: Task): void {
    if (confirm(`Are you sure you want to delete task: ${task.title}?`)) {
      this.taskService.deleteTask(task.id!).subscribe({
        next: () => {
          this.taskDelete.emit(task.id);
        },
        error: (err) => {
          console.error('Error deleting task:', err);
          alert('Failed to delete task');
        }
      });
    }
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  }
}