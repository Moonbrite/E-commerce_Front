import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTo',
  standalone: true
})
export class LimitToPipe implements PipeTransform {

  transform(array: any[]| undefined, limit: number): any[] {
    if (!Array.isArray(array)) {
      return [];
    }
    return array.slice(0, limit);
  }

}
