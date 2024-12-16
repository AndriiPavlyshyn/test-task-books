import { Component, forwardRef, input }                                              from '@angular/core'
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms'
import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter }                          from '@angular/material/core'
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle }                    from '@angular/material/datepicker'
import { MatError, MatFormField, MatLabel, MatSuffix }                               from '@angular/material/form-field'
import { MatInput }                                                                  from '@angular/material/input'
import {
  ControlErrorsComponent,
}                                                                                    from '@shared/components/controls/control-errors/control-errors.component'
import { Maybe }                                                                     from '../../../../types/global'


class CustomDateAdapter extends NativeDateAdapter {
  override format(date: Date): string {
    return `${date.getFullYear()}`
  }
}

@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: ['./year-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YearPickerComponent),
      multi: true,
    },
    { provide: DateAdapter, useClass: CustomDateAdapter },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: { dateInput: 'YYYY' },
        display: { dateInput: 'YYYY', monthYearLabel: 'YYYY', dateA11yLabel: 'LL', monthYearA11yLabel: 'YYYY' },
      },
    },
  ],
  standalone: true,
  imports: [
    FormsModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    ControlErrorsComponent,
    MatError,
  ],
})
export class YearPickerComponent implements ControlValueAccessor {
  public selectedYear: Maybe<Date> = null
  public minDate = input<Date>(new Date())
  public label = input<string>('Year')

  public writeValue(year: Maybe<Date>): void {
    this.selectedYear = year
  }

  public onYearSelected(date: Date, datepicker: MatDatepicker<Date>): void {
    this.selectedYear = new Date(date.getFullYear(), 0, 1)
    this.onChange(this.selectedYear)
    this.onTouched()
    datepicker.close()
  }

  public registerOnChange(fn: (year: Maybe<Date>) => void): void {
    this.onChange = fn
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (year: Maybe<Date>) => void = () => {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched = () => {}
}
