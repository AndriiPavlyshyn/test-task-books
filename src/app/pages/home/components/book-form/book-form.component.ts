import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
}                                                             from '@angular/forms'
import {
  MatButton,
}                                                             from '@angular/material/button'
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
}                                                             from '@angular/material/datepicker'
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
}                                                             from '@angular/material/dialog'
import {
  MatFormField,
}                                                             from '@angular/material/form-field'
import {
  MatInput,
  MatInputModule,
}                                                             from '@angular/material/input'
import {
  MatSnackBar,
}                                                             from '@angular/material/snack-bar'
import {
  BookService,
}                                                             from '@services/book.service'
import {
  ControlErrorsComponent,
}                                                             from '@shared/components/controls/control-errors/control-errors.component'
import {
  YearPickerComponent,
}                                                             from '@shared/components/controls/year-picker/year-picker.component'

import { Book } from '../../../../types/global'


@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatInputModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    ReactiveFormsModule,
    YearPickerComponent,
    ControlErrorsComponent,
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookFormComponent implements OnInit {
  public formGroup: FormGroup = new FormGroup({
    title: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    author: new FormControl<string>('', Validators.required),
    notes: new FormControl<string>('', [Validators.maxLength(500), Validators.minLength(10)]),
    year: new FormControl<Date>(new Date()),
  })
  public readonly dialogData: { isCreate: boolean, book?: Book } = inject(MAT_DIALOG_DATA)
  private readonly bookService: BookService = inject(BookService)
  private _snackBar = inject(MatSnackBar)
  private dialog = inject(MatDialog)

  ngOnInit(): void {
    this.setDefaultValuesOnEdit()
  }

  public addBook(): void {
    const formValue: Book = { ...this.formGroup.value, year: this.formGroup.value.year.getFullYear() }

    if (this.formGroup.valid) {
      this.bookService.addBook(formValue)

      this._snackBar.open('Book successfully created.', 'Close', {
        duration: 2000,
      })

      this.dialog.closeAll()
    }
    else {
      this.formGroup.markAllAsTouched()

      this._snackBar.open('Not all fields are valid.', 'Close', {
        duration: 2000,
      })
    }
  }

  public editBook(): void {
    const formValue: Book = { ...this.formGroup.value, year: this.formGroup.value.year.getFullYear() }

    if (this.formGroup.valid) {
      this.bookService.editBook(this.dialogData.book?.id, formValue)

      this._snackBar.open('Book completely edited.', 'Close', {
        duration: 2000,
      })

      this.dialog.closeAll()
    }
    else {
      this.formGroup.markAllAsTouched()

      this._snackBar.open('Not all fields are valid.', 'Close', {
        duration: 2000,
      })
    }
  }

  public deleteBook(): void {
    this.bookService.deleteBook(this.dialogData.book)
  }

  private setDefaultValuesOnEdit(): void {
    if (this.dialogData.isCreate || !this.dialogData.book) {
      return
    }

    const defaultBook: Book<Date> = {
      title: '',
      author: '',
      notes: '',
      year: new Date(),
    }

    const bookFromDialog: Book = this.dialogData.book

    const formattedYear = bookFromDialog.year
      ? new Date(bookFromDialog.year, 0, 1)
      : defaultBook.year

    const bookToSet: Book<Date> = {
      ...defaultBook,
      ...bookFromDialog,
      year: formattedYear,
    }

    delete bookToSet.id

    this.formGroup.setValue(bookToSet)
  }
}
