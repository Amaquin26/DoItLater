import { Component, OnInit, signal } from '@angular/core';
import { TaskService } from '../../api-services/tasks/task.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/task.model';
import { TuiCard, TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { TuiAppearance, TuiButton, TuiIcon, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { NgFor, NgIf } from '@angular/common';
import { TuiCheckbox, TuiProgress } from '@taiga-ui/kit';
import { UtcToLocalPipe } from '../../shared/pipes/utc-to-local-pipe';
import { ROUTES } from '../../shared/constants/routes/routes.constants';
import { SpinnerComponent } from "../../shared/components/spinner/spinner.component";
import { SubtaskService } from '../../api-services/subtasks/subtask.service';
import { testTaskData } from '../../data/test/task-test.data';
import { Subtask } from '../../models/subtask.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  imports: [
    TuiButton,
    TuiCard,
    TuiCardLarge,
    TuiHeader,
    TuiIcon,
    TuiTitle,
    TuiProgress,
    NgIf,
    NgFor,
    UtcToLocalPipe,
    TuiAppearance,
    UtcToLocalPipe,
    SpinnerComponent,
    FormsModule,
    TuiTextfield
],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  constructor(
    private taskService: TaskService, 
    private subtaskService: SubtaskService, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  taskId!: string;
  task = signal<Task>({
    id: 0,
    title: '',
    subtitle: '',
    status: '',
    group: '',
    dateCreated: '',
    dateModified: '',
    estimatedEndDate: '',
    progress: 0,
    isOwner: false,
    taskOwner: ''
  });
  isFetching = signal(true);

  private destroy$ = new Subject<void>();

  readonly columns = [
    "Subtask",
  /*   "Begin Time",
    "End Time", */
    "Status",
  ];

  newSubtaskName = "";

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id')!;
    this.isFetching.set(true);

    // testing data
    this.task.set(testTaskData.find(task => task.id === Number(this.taskId))!);
    this.isFetching.set(false);
    // end testing data

    this.taskService
      .getById(this.taskId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isFetching.set(false))
      )
      .subscribe({
        next: (res) => {
          this.task.set(res);

          this.subtaskService.getAllByTaskId(res.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(subtasks => {
              this.task.update(
                (prev) => ({ ...prev, subtasks: subtasks })
              );
          });
        },
        error:(err) => {
          //TODO: show error message like task not found
        }
    });
  }

  goToEditTask(){
    this.router.navigateByUrl(`/${ROUTES.editTaskRoute(this.taskId)}`);
  }

  deleteTask(){
    this.taskService
      .delete(this.taskId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.router.navigateByUrl(`/${ROUTES.home}`);
        },
        error:(err) => {
          //TODO: show error message like task not found
        }
    });
  }

  trackBySubtaskId(index: number, subtask: Subtask): number {
    return subtask.id;
  }

  deleteSubtask(subtaskId: number){
    // testing data
    this.task.update(
      (prev) => (
        { 
          ...prev, 
          subtasks: prev.subtasks?.filter(subtask => subtask.id !== subtaskId)
        }
      )
    );
    this.task.update(prev => ({
      ...prev,
      progress: !prev.subtasks ? 0 : prev.subtasks.filter(subtask => subtask.isChecked).length / (prev.subtasks?.length || 1) * 100
    }));
    // end testing data

    /* this.subtaskService
      .delete(subtaskId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.task.update(
            (prev) => (
              { 
                ...prev, 
                subtasks: prev.subtasks?.filter(subtask => subtask.id !== subtaskId)
              }
            )
          );
        },
        error:(err) => {
          //TODO: show error message like task not found
        }
    }); */
  }

  toggleCheckSubtask(subtaskId: number){

    // testing data
    console.log("test")
    this.task.update(prev => ({
      ...prev,
      subtasks: prev.subtasks?.map(subtask =>
        subtask.id === subtaskId
          ? { ...subtask, isChecked: !subtask.isChecked }
          : subtask
        )
    }));
    this.task.update(prev => ({
      ...prev,
      progress: !prev.subtasks ? 0 : prev.subtasks.filter(subtask => subtask.isChecked).length / (prev.subtasks?.length || 1) * 100
    }));
    
    // end testing data

    /* this.subtaskService
      .toggleCheck(subtaskId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.task.update(prev => ({
            ...prev,
            subtasks: prev.subtasks?.map(subtask =>
              subtask.id === subtaskId
                ? { ...subtask, isChecked: !subtask.isChecked }
                : subtask
            )
          }));
        },
        error:(err) => {

        }
      }); */
  }

  addSubtask()
  {
    //testdata
    this.task.update(prev => ({
      ...prev,
        subtasks: prev.subtasks ? [...prev.subtasks, {
          id: prev.subtasks.length + 1,
          taskId: prev.id,
          name: this.newSubtaskName,
          dateCreated: new Date().toISOString(),
          isChecked: false
        }] : prev.subtasks
      }));
      this.task.update(prev => ({
        ...prev,
        progress: !prev.subtasks ? 0 : prev.subtasks.filter(subtask => subtask.isChecked).length / (prev.subtasks?.length || 1) * 100
      }));
      //end testdata
      this.newSubtaskName = "";
  }
}
