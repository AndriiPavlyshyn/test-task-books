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

import { Book, BookForm } from '../../../../types/book'
import { Maybe }          from '../../../../types/global'


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
  private readonly bookService: BookService = inject(BookService)
  private readonly snackBar: MatSnackBar = inject(MatSnackBar)
  private readonly dialog: MatDialog = inject(MatDialog)

  public readonly dialogData: { isCreate: boolean, book?: Book } = inject(MAT_DIALOG_DATA)
  public bookForm = new FormGroup<BookForm>({
    title: new FormControl<Maybe<string>>(null, [Validators.required, Validators.minLength(3)]),
    author: new FormControl<Maybe<string>>(null, Validators.required),
    notes: new FormControl<Maybe<string>>(null, [Validators.maxLength(500), Validators.minLength(10)]),
    year: new FormControl<Maybe<Date>>(new Date()),
  })

  ngOnInit(): void {
    this.setDefaultValuesOnEdit()
  }

  public addBook(): void {
    const formValue: Book = this.getFormValue()

    if (this.bookForm.valid) {
      this.bookService.addBook(formValue)

      this.bookFormSnack('Book successfully created.')

      this.dialog.closeAll()
      return
    }

    this.bookForm.markAllAsTouched()

    this.bookFormSnack('Not all fields are valid.')
  }

  public editBook(): void {
    const formValue: Book = this.getFormValue()

    if (this.bookForm.valid) {
      this.bookService.editBook(this.dialogData.book?.id, formValue)

      this.bookFormSnack('Book completely edited.')

      this.dialog.closeAll()
      return
    }

    this.bookFormSnack('Not all fields are valid.')
  }

  public deleteBook(): void {
    this.bookService.deleteBook(this.dialogData.book)
  }

  private bookFormSnack(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    })
  }

  private getFormValue(): Book {
    return {
      ...this.bookForm.value as Book,
      year: (this.bookForm.value as Book<Date>).year?.getFullYear(),
    }
  }

  private setDefaultValuesOnEdit(): void {
    if (this.dialogData.isCreate || !this.dialogData.book) {
      return
    }

    const bookFromDialog: Book = this.dialogData.book

    const formattedYear: Date = bookFromDialog.year
      ? new Date(bookFromDialog.year, 0, 1)
      : new Date()

    this.bookForm.setValue({
      title: bookFromDialog.title || null,
      author: bookFromDialog.author || null,
      notes: bookFromDialog.notes || null,
      year: formattedYear,
    })
  }
}
