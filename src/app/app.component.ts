import { Component, OnInit } from '@angular/core';
import { TasksComponent } from "./components/tasks/tasks.component";
import { TaskFormComponent } from "./components/task-form/task-form.component";
import { Task } from './models/Task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [ TasksComponent, TaskFormComponent],
})

export class AppComponent implements OnInit {
 tasks: Task[] = [];
 selectedTask: Task | null = null;
 constructor(private taskService: TaskService) {}
 ngOnInit(): void {
  this.taskService.getTasks().subscribe((tasks) => {
  this.tasks = tasks;
});

 }
 setSelectedTask(task: Task) {
  this.selectedTask = this.selectedTask?.id === task.id ? null : {...task} as Task;
 }
 cancel(){
  this.selectedTask = null;
 }
 addTask(task: Task) {
  this.tasks = [...this.tasks, task];
 }
 updateTask(task: Task) {
  this.tasks = this.tasks.map(item => item.id === task.id ? task : item);
 }

}
