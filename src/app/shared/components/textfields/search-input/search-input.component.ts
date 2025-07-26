import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { TuiTooltip } from '@taiga-ui/kit';

@Component({
  selector: 'app-search-input',
  imports: [FormsModule, TuiTextfield],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
  inputValue = '';

  @Output() valueChanged = new EventEmitter<string>();
  @Input() placeholder = 'Search...';
  @Input() label = 'Search...';

  onInputChange() {
    this.valueChanged.emit(this.inputValue);
  }
}
