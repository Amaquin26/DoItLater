import { Pipe, PipeTransform } from '@angular/core';
import { format, parseISO } from 'date-fns';

@Pipe({
  name: 'utcToLocal'
})
export class UtcToLocalPipe implements PipeTransform {
  transform(value: string | Date | null | undefined): string {
    if (!value) return '';

    const utcDate = typeof value === 'string' ? parseISO(value) : value;
    const localDate = new Date(utcDate); // Date object auto converts to local time

    return format(localDate, 'MMMM d, yyyy h:mm a'); // Example: May 26, 2025 10:50 pm
  }
}
