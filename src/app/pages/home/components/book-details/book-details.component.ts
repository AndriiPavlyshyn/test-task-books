import { Component, inject } from '@angular/core'
import {
  MatButton,
}                            from '@angular/material/button'
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
}                            from '@angular/material/dialog'
import {
  BookFormComponent,
}                            from '@pages/home/components/book-form/book-form.component'
import {
  BookService,
}                            from '@services/book.service'
import {
  Book,
}                            from '../../../../types/book'


@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
})
export class BookDetailsComponent {
  public readonly dialogData: { book: Book } = inject(MAT_DIALOG_DATA)
  private dialog: MatDialog = inject(MatDialog)
  private readonly bookService: BookService = inject(BookService)

  public onDelete(): void {
    this.bookService.deleteBook(this.dialogData.book)
  }

  public onEdit(): void {
    this.dialog.open(BookFormComponent, {
      maxWidth: '700px',
      width: '100vw',
      data: {
        isCreate: false,
        book: this.dialogData.book,
      },
    })
  }
}
