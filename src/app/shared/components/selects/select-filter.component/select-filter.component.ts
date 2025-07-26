import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiDataList, TuiTextfield } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiSelect } from '@taiga-ui/kit';

@Component({
  selector: 'app-select-filter',
  imports: [
      FormsModule,
      TuiChevron,
      TuiDataListWrapper,
      TuiSelect,
      TuiTextfield,
      TuiDataList,
      NgFor,
  ],
  templateUrl: './select-filter.component.html',
  styleUrl: './select-filter.component.css',
})
export class SelectFilterComponent {
  @Input() label = ""
  @Input() options:Array<{label: string, value: string}> = []
  @Output() filterValueChanged = new EventEmitter<string>();

  protected value: string | null = null;
  protected currentLabel: string | null = null;

  onSelectOption(option: {label: string, value: string}) {
    this.value = option.value;
    this.currentLabel = option.label 
    this.filterValueChanged.emit(option.value);
  }
}

