import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
  templateUrl: './tasks.component.html',
})
export class TasksComponent {
@Input() selectedTask: Task | null = null;
@Input() tasks : Task[]=[];
@Output() onSelectTask = new EventEmitter<Task>();

onSelect(task: Task) {
  this.onSelectTask.emit(task);
}

}
