import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subtask } from '../../models/subtask.model';
import { Task } from '../../models/task.model';
import { environment } from '../../environments/environment';
import { SUBTASK_API_ROUTE } from '../../shared/constants/routes/api/api.routes.constants';

@Injectable({
  providedIn: 'root'
})
export class SubtaskService {
  constructor(private httpClient: HttpClient){}

  getAll(): Observable<Array<Subtask>>{
    return this.httpClient.get<Array<Subtask>>(`${environment.apiBaseUrl}/${SUBTASK_API_ROUTE.getAll}`);
  }

  getAllByTaskId(taskId: number | string): Observable<Array<Subtask>>{
    return this.httpClient.get<Array<Subtask>>(`${environment.apiBaseUrl}/${SUBTASK_API_ROUTE.getAllByTaskId(taskId)}`);
  }

  getById(taskId: number | string): Observable<Subtask>{
    return this.httpClient.get<Subtask>(`${environment.apiBaseUrl}/${SUBTASK_API_ROUTE.getById(taskId)}`);
  }

  toggleCheck(taskId: number | string): Observable<number>{
    return this.httpClient.post<number>(`${environment.apiBaseUrl}/${SUBTASK_API_ROUTE.toggleCheck(taskId)}`,undefined);
  }
  
  add(formData:any): Observable<number>{
    return this.httpClient.post<number>(`${environment.apiBaseUrl}/${SUBTASK_API_ROUTE.add}`, formData);
  }

  update(formData:any){
    return this.httpClient.put(`${environment.apiBaseUrl}/${SUBTASK_API_ROUTE.update}`, formData);
  }

  delete(id: number | string) {
    return this.httpClient.delete(`${environment.apiBaseUrl}/${SUBTASK_API_ROUTE.delete(id)}`);
  }
}
