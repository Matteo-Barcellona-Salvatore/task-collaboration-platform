import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.apiUrl}/tasks`)
      .pipe(
        tap(tasks => this.tasksSubject.next(tasks))
      );
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${environment.apiUrl}/tasks`, task)
      .pipe(
        tap(newTask => {
          const currentTasks = this.tasksSubject.value;
          this.tasksSubject.next([...currentTasks, newTask]);
        })
      );
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${environment.apiUrl}/tasks/${id}`, task)
      .pipe(
        tap(updatedTask => {
          const currentTasks = this.tasksSubject.value;
          const index = currentTasks.findIndex(t => t.id === id);
          if (index !== -1) {
            currentTasks[index] = updatedTask;
            this.tasksSubject.next([...currentTasks]);
          }
        })
      );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/tasks/${id}`)
      .pipe(
        tap(() => {
          const currentTasks = this.tasksSubject.value.filter(t => t.id !== id);
          this.tasksSubject.next(currentTasks);
        })
      );
  }

  getTasksByStatus(status: string): Task[] {
    return this.tasksSubject.value.filter(task => task.status === status);
  }
}