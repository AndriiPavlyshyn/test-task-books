import { Component, inject, input }                                             from '@angular/core'
import { MatButton }                                                            from '@angular/material/button'
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardModule } from '@angular/material/card'
import { MatDialog }                                                            from '@angular/material/dialog'
import {
  BookDetailsComponent,
}                                                                               from '@pages/home/components/book-details/book-details.component'
import {
  BookFormComponent,
}                                                                               from '@pages/home/components/book-form/book-form.component'
import { BookService }                                                          from '@services/book.service'
import {
  TruncatePipe,
}                                                                               from '../../../../pipes/truncate-pipe/truncate.pipe'

import { Book } from '../../../../types/global'


@Component({
  selector: 'app-books-grid-item',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardFooter,
    MatButton,
    MatCardModule,
    TruncatePipe,
  ],
  templateUrl: './books-grid-item.component.html',
  styleUrl: './books-grid-item.component.scss',
})
export class BooksGridItemComponent {
  public book = input<Book>()
  private dialog = inject(MatDialog)
  private bookService = inject(BookService)

  public onEdit(): void {
    this.dialog.open(BookFormComponent, {
      maxWidth: '700px',
      width: '100vw',
      data: {
        isCreate: false,
        book: this.book(),
      },
    })
  }

  public onDelete(): void {
    this.bookService.deleteBook(this.book())
  }

  public showDetails(): void {
    this.dialog.open(BookDetailsComponent, {
      maxWidth: '700px',
      width: '100vw',
      data: {
        book: this.book(),
      },
    })
  }
}
