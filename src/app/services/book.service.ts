import { inject, Injectable }     from '@angular/core'
import { MatDialog }              from '@angular/material/dialog'
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component'
import { booksPlaceholder }       from '@shared/temp/books-placeholder'
import { BehaviorSubject }        from 'rxjs'

import { Book, Maybe } from '../types/global'


@Injectable({
  providedIn: 'root',
})
export class BookService {
  public books = new BehaviorSubject<Book[]>(booksPlaceholder)
  private dialog = inject(MatDialog)

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
      width: '100vw',
      data: {
        title: `Do you really want to delete ${bookToDelete.title}?`,
        action: () => {
          const books: Book[] = this.books.getValue()

          this.books.next(books.filter((book: Book) => book.id !== bookToDelete.id))
          this.dialog.closeAll()
        },
      },
    })
  }
}
