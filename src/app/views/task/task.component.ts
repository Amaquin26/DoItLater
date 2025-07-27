import { Component, OnInit, signal } from '@angular/core';
import { TaskService } from '../../api-services/tasks/task.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/task.model';
import { TuiCard, TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { TuiAppearance, TuiButton, TuiIcon, TuiTitle } from '@taiga-ui/core';
import { NgFor, NgIf } from '@angular/common';
import { TuiProgress } from '@taiga-ui/kit';
import { UtcToLocalPipe } from '../../shared/pipes/utc-to-local-pipe';
import { TuiTable } from '@taiga-ui/addon-table';
import { ROUTES } from '../../shared/constants/routes/routes.constants';
import { SpinnerComponent } from "../../shared/components/spinner/spinner.component";

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
    TuiTable,
    UtcToLocalPipe,
    SpinnerComponent
],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  constructor(
    private taskService: TaskService, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  taskId!: string;
  task!: Task;
  isFetching = signal(true);

  private destroy$ = new Subject<void>();

  readonly columns = [
    "Subtask",
    "Begin Time",
    "End Time",
    "Status",
  ];

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id')!;
    this.isFetching.set(true);

    this.taskService
      .getById(this.taskId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isFetching.set(false))
      )
      .subscribe({
        next: (res) => {
          this.task = res
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
}
