import { inject, Injectable }     from '@angular/core'
import { MatDialog }              from '@angular/material/dialog'
import { MatSnackBar }            from '@angular/material/snack-bar'
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component'
import { booksPlaceholder }       from '@shared/temp/books-placeholder'
import { BehaviorSubject }        from 'rxjs'

import { Book }  from '../types/book'
import { Maybe } from '../types/global'


@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly dialog: MatDialog = inject(MatDialog)
  private readonly snackBar: MatSnackBar = inject(MatSnackBar)

  public books = new BehaviorSubject<Book[]>(booksPlaceholder)

  public addBook(book: Book): void {
    const books: Book[] = this.books.getValue()
    book.id = this.books.getValue().length + 1

    this.books.next([...books, book])
  }

  public editBook(id: Maybe<number>, updatedBook: Book): void {
    if (!id) {return}

    this.books.next(this.books.getValue().map((book) =>
      book.id === id ? { ...book, ...updatedBook } : book,
    ))
  }

  public deleteBook(bookToDelete: Maybe<Book>): void {
    if (!bookToDelete) {return}

    this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      width: '95vw',
      data: {
        title: `Do you really want to delete ${bookToDelete.title}?`,
        action: () => {
          const books: Book[] = this.books.getValue()

          this.books.next(books.filter((book: Book) => book.id !== bookToDelete.id))
          this.dialog.closeAll()
          this.snackBar.open('Book successfully deleted.', 'Close', {
            duration: 2000,
          })
        },
      },
    })
  }
}
