import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Pipe({
  name: 'formControlPipe'
})
export class FormControlPipePipe implements PipeTransform {

  transform(value: AbstractControl<string | null, string | null>): FormControl<typeof value['value']> {
    return value as FormControl<typeof value['value']>;
  }

}
