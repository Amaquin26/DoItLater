import { AsyncPipe, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiAppearance, TuiButton, TuiError, TuiIcon, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { finalize, Subject, takeUntil } from 'rxjs';
import { TaskService } from '../../../../api-services/tasks/task.service';
import { ROUTES } from '../../../../shared/constants/routes/routes.constants';

@Component({
  selector: 'app-task-create.component',
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
    NgIf
  ],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css'
})
export class TaskCreateComponent {

  constructor(private router: Router, private taskService: TaskService){}

  private destroy$ = new Subject<void>();

  isSubmitting = signal(false);

  taskCreationForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    subtitle: new FormControl(''),
  });

  async handleSubmitForm(){
    this.isSubmitting.set(true);

    this.taskService
    .add(this.taskCreationForm.value)
    .pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isSubmitting.set(false))
    )
    .subscribe({
      next: _ => {
        this.router.navigateByUrl(`/${ROUTES.home}`);
      },
      error: _ => {
        // TODO: make a notification
      }
    });
  }

  cancelCreation(){
    this.router.navigateByUrl(`/${ROUTES.home}`);
  }
}
