import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  todoform !: FormGroup;
  Tasks : any[] = [];
  Schedule: any[] = [];
  Completed:any[] = [];
  updateid!:any;
  isedit:boolean=false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoform = this.fb.group({
      item : ['',Validators.required]
    })
  }
  addtask(){
    this.Tasks.push({
      description:this.todoform.value.item,
      done:false
    })
    this.todoform.reset()
  }
  edit(item:any, i:number){
    this.todoform.controls['item'].setValue(item.description);
    this.updateid=i;
    this.isedit= true;
  }
  deleteTask(i:number){
    this.Tasks.splice(i,1)
  }
  deleteSchedule(i:number){
    this.Schedule.splice(i,1)
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
