import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { testTaskData } from '../../data/test/task-test.data';
import { Task } from '../../models/task.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TASK_API_ROUTE } from '../../shared/constants/routes/api/api.routes.constants';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private httpClient: HttpClient){}

  getAllUserOwnedTasks(): Observable<Array<Task>>{
    return this.httpClient.get<Array<Task>>(`${environment.apiBaseUrl}/${TASK_API_ROUTE.getAllUserOwned}`);
  }

  getById(id: number | string): Observable<Task>{
    return this.httpClient.get<Task>(`${environment.apiBaseUrl}/${TASK_API_ROUTE.getById(id)}`);
  }
  
  add(formData:any){
    return this.httpClient.post(`${environment.apiBaseUrl}/${TASK_API_ROUTE.add}`, formData);
  }

  update(formData:any){
    return this.httpClient.put(`${environment.apiBaseUrl}/${TASK_API_ROUTE.update}`, formData);
  }

  delete(id: number | string) {
    return this.httpClient.delete(`${environment.apiBaseUrl}/${TASK_API_ROUTE.delete(id)}`);
  }
}
