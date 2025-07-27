import { Component, OnInit, signal } from '@angular/core';
import { TuiTitle } from '@taiga-ui/core';
import { TuiHeader } from '@taiga-ui/layout';
import { SearchInputComponent } from "../../shared/components/textfields/search-input/search-input.component";
import { SORT_BY_FILTERS, SORT_BY_FILTERS_DEFAULT } from '../../shared/constants/filters/sort-filters.constants';
import { TaskCardsComponent } from "../../shared/components/cards/task-cards.component/task-cards.component";
import { TaskService } from '../../api-services/tasks/task.service';
import { Task } from '../../models/task.model';
import { NgFor, NgIf } from '@angular/common';
import { finalize, Subject, takeUntil } from 'rxjs';
import { SpinnerComponent } from "../../shared/components/spinner/spinner.component";

@Component({
  selector: 'app-home',
  imports: [
    TuiHeader,
    TuiTitle,
    SearchInputComponent,
    TaskCardsComponent,
    NgFor,
    NgIf,
    SpinnerComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  
  constructor(private taskService: TaskService) {}

  private destroy$ = new Subject<void>();

  isFetching = signal(true);
  searchInputValue = "";
  sortBy: string | null = SORT_BY_FILTERS_DEFAULT;
  tasks: Array<Task> = [];

  ngOnInit(): void {
    this.isFetching.set(true);

    this.taskService
      .getAllUserOwnedTasks()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isFetching.set(false))
      )
      .subscribe({
        next: (res) => {
          this.tasks = res
        }
      });
  }

  sortByFilters = SORT_BY_FILTERS

  onSearchInputValueChanged(value:string){
    this.searchInputValue = value;
  }

  onSortByFiltersValueChanged(value:string){
    this.sortBy = value;
  }

  trackByTaskId(index: number, task: Task): number {
    return task.id;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
