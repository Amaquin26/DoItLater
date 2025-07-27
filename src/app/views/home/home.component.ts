import { Component, OnInit } from '@angular/core';
import { TuiTitle } from '@taiga-ui/core';
import { TuiHeader } from '@taiga-ui/layout';
import { SearchInputComponent } from "../../shared/components/textfields/search-input/search-input.component";
import { SORT_BY_FILTERS, SORT_BY_FILTERS_DEFAULT } from '../../shared/constants/filters/sort-filters.constants';
import { TaskCardsComponent } from "../../shared/components/cards/task-cards.component/task-cards.component";
import { TaskService } from '../../api-services/tasks/task.service';
import { Task } from '../../models/task.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    TuiHeader, 
    TuiTitle, 
    SearchInputComponent, 
    TaskCardsComponent,
    NgFor,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  
  constructor(private taskService: TaskService) {}

  searchInputValue = "";
  sortBy: string | null = SORT_BY_FILTERS_DEFAULT;
  tasks: Array<Task> = [];

  ngOnInit(): void {
    this.tasks = this.taskService.getTasksTestData();
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

  ngOnDestroy(){
    // TODO: Unsubscribe logic here.
  }
}
