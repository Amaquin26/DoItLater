import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toWholeNumber'
})
export class ToWholeNumberPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '0';
    }
    return Math.ceil(value).toString();
  }
}
