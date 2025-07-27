import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { testTaskData } from '../../data/test/task-test.data';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private httpClient: HttpClient){}

  getTasksTestData(): Array<Task>{
    return testTaskData;
  }
}
