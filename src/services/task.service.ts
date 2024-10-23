import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
 private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  getTasks(): Observable<Task[]> {
 return this.http.get<Task[]>(`${this.baseUrl}/tasks`);
 }
}
