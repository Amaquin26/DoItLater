import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiAppearance, TuiButton, TuiError, TuiIcon, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { finalize, Subject, takeUntil } from 'rxjs';
import { TaskService } from '../../../../api-services/tasks/task.service';
import { ROUTES } from '../../../../shared/constants/routes/routes.constants';
import { Task } from '../../../../models/task.model';
import { SpinnerComponent } from "../../../../shared/components/spinner/spinner.component";

@Component({
  selector: 'app-task-edit',
  imports: [
    TuiAppearance,
    TuiButton,
    TuiCardLarge,
    TuiHeader,
    TuiTitle,
    TuiTextfield,
    TuiError,
    TuiIcon,
    TuiFieldErrorPipe,
    AsyncPipe,
    ReactiveFormsModule,
    NgIf,
    SpinnerComponent
],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent implements OnInit{
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private taskService: TaskService
  ){}

  taskId!: string;
  task!: Task;

  private destroy$ = new Subject<void>();

  isSubmitting = signal(false);
  isFetching = signal(true);
  
  taskEditForm = new FormGroup({
    id: new FormControl(0),
    title: new FormControl('', [Validators.required]),
    subtitle: new FormControl(''),
  });

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

          // Set initial values after task is loaded
          this.taskEditForm.patchValue({
            id: res.id,
            title: res.title,
            subtitle: res.subtitle,
          });
        },
        error:(err) => {
          //TODO: show error message like task not found
        }
      });
  }

  async handleSubmitForm(){
    this.isSubmitting.set(true);

    this.taskService
    .update(this.taskEditForm.value)
    .pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isSubmitting.set(false))
    )
    .subscribe({
      next: _ => {
        this.router.navigateByUrl(`/${ROUTES.getTask(this.task.id)}`);
      },
      error: _ => {
        // TODO: make a notification
      }
    });
  }

  cancelEdit(){
    this.router.navigateByUrl(`/${ROUTES.getTask(this.task.id)}`);
  }
}
