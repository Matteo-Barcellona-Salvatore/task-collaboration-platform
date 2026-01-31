import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task | null = null;
  @Output() taskSaved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  formData: Task = {
    title: '',
    description: '',
    status: 'TODO',
    priority: 'MEDIUM'
  };

  loading = false;
  error = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    if (this.task) {
      this.formData = { ...this.task };
    }
  }

  onSubmit(): void {
    this.error = '';
    this.loading = true;

    if (this.task?.id) {
      this.taskService.updateTask(this.task.id, this.formData).subscribe({
        next: () => {
          this.taskSaved.emit();
        },
        error: (err) => {
          this.error = 'Failed to update task';
          this.loading = false;
        }
      });
    } else {
      this.taskService.createTask(this.formData).subscribe({
        next: () => {
          this.taskSaved.emit();
        },
        error: (err) => {
          this.error = 'Failed to create task';
          this.loading = false;
        }
      });
    }
  }

  cancel(): void {
    this.cancelled.emit();
  }
}