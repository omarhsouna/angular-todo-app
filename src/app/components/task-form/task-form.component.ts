import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../models/Task';
@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
 taskForm!: FormGroup;
@Input( ) task : Task|null = null ;
@Output() cancel = new EventEmitter();
@Output() addTask = new EventEmitter<Task>(); 
@Output() updateTask = new EventEmitter<Task>();
@Output() onSelectTask = new EventEmitter<Task>();
constructor(private formBuilder: FormBuilder) {}
ngOnInit() {
  this.taskForm = this.formBuilder.group({
    id: [''],
    title: ['', Validators.required],
    description: ['', Validators.required],
    isCompleted: [false],
  });
}
ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && !changes['task'].firstChange) {
      if (changes['task'].currentValue!==null) {
        this.taskForm.setValue({
          id: changes['task'].currentValue.id,
          title: changes['task'].currentValue.title,
          description: changes['task'].currentValue.description,
          isCompleted: changes['task'].currentValue.isCompleted
        });
      }else {
        this.taskForm.reset();  
      }
    }
  }

onCancel() {
  this.cancel.emit();
}
onAddTask() {
  const newTask: Task = {
      id: uuidv4(),
    title: this.taskForm.get('title')?.value || '',
    description: this.taskForm.get('description')?.value || '',
    isCompleted: false
  }
  this.addTask.emit(newTask);
  this.onSelectTask.emit(newTask);
  this.taskForm.reset();
}

onSubmit() {
    this.updateTask.emit(this.taskForm.value as Task);
}
 
}

