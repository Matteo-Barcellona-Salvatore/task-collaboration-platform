import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Task } from '../../models/task.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TaskListComponent, TaskFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentUser: any;
  tasks: Task[] = [];
  showTaskForm = false;
  editingTask: Task | null = null;
  
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private router: Router
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.loadTasks();
    
    const taskSub = this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      this.categorizeTasksByStatus();
    });

    this.subscriptions.push(taskSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe();
  }

  categorizeTasksByStatus(): void {
    this.todoTasks = this.tasks.filter(t => t.status === 'TODO');
    this.inProgressTasks = this.tasks.filter(t => t.status === 'IN_PROGRESS');
    this.doneTasks = this.tasks.filter(t => t.status === 'DONE');
  }

  openTaskForm(task?: Task): void {
    this.editingTask = task || null;
    this.showTaskForm = true;
  }

  closeTaskForm(): void {
    this.showTaskForm = false;
    this.editingTask = null;
  }

  onTaskSaved(): void {
    this.closeTaskForm();
    this.loadTasks();
  }

  onTaskDeleted(): void {
    this.loadTasks();
  }

  logout(): void {
    this.authService.logout();
  }
}