import { computed, inject, Injectable, signal } from '@angular/core'
import { MatDialog }                            from '@angular/material/dialog'
import { ConfirmDialogComponent }               from '@shared/components/confirm-dialog/confirm-dialog.component'
import { booksPlaceholder }                     from '@shared/temp/books-placeholder'

import { Book, Maybe } from '../types/global'


@Injectable({
  providedIn: 'root',
})
export class BookService {
  private booksSignal = signal<Book[]>(booksPlaceholder)
  public books = computed(() => this.booksSignal())
  private dialog = inject(MatDialog)

  public addBook(book: Book): void {
    book.id = this.booksSignal().length + 1

    this.booksSignal.update((books: Book[]) => [...books, book])
  }

  public editBook(id: Maybe<number>, updatedBook: Book): void {
    if (!id) {return}

    this.booksSignal.update((books: Book[]) => {
      return books.map((book) =>
        book.id === id ? { ...book, ...updatedBook } : book,
      )
    })
  }

  public deleteBook(bookToDelete: Maybe<Book>): void {
    if (!bookToDelete) {return}

    this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      width: '100vw',
      data: {
        title: `Do you really want to delete ${bookToDelete.title}?`,
        action: () => {
          this.booksSignal.update((books: Book[]) => [
            ...books.filter((book: Book) => book.id !== bookToDelete.id),
          ])

          this.dialog.closeAll()
        },
      },
    })
  }
}
