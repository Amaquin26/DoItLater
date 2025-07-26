import { Component, Input, OnInit, signal } from '@angular/core';
import {TuiTable} from '@taiga-ui/addon-table';
import {TuiButton, TuiIcon, TuiLink, TuiTitle} from '@taiga-ui/core';
import {TuiExpand} from '@taiga-ui/experimental';
import {TuiChevron, TuiProgress} from '@taiga-ui/kit';
import {TuiCard, TuiHeader} from '@taiga-ui/layout';
import { Task } from '../../../../models/task.model';
import { UtcToLocalPipe } from '../../../pipes/utc-to-local-pipe';
import { Subtask } from '../../../../models/subtask.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-task-cards',
  imports: [
      TuiButton,
      TuiCard,
      TuiChevron,
      TuiExpand,
      TuiHeader,
      TuiIcon,
      TuiLink,
      TuiTable,
      TuiTitle,
      UtcToLocalPipe,
      TuiProgress,
      NgFor,
      NgIf,
      UtcToLocalPipe
  ],
  templateUrl: './task-cards.component.html',
  styleUrl: './task-cards.component.css'
})
export class TaskCardsComponent {
  private _task!: Task;

  @Input()
  set task(value: Task) {
    if (!value) {
      throw new Error('Input "task" is required for TaskCardsComponent.');
    }
    this._task = value;
  }

  get task(): Task {
    return this._task;
  }

  public readonly collapsed = signal(true);

  trackBySubtaskId(index: number, task: Subtask): number {
    return task.id;
  }
}
