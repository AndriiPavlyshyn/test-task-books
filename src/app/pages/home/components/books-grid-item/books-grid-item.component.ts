import { ComponentType }                                                        from '@angular/cdk/overlay'
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

import { TruncatePipe } from '../../../../pipes/truncate-pipe/truncate.pipe'
import { Book }         from '../../../../types/book'


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
  private readonly bookService: BookService = inject(BookService)
  private readonly dialog: MatDialog = inject(MatDialog)
  public book = input<Book>()

  public onEdit(): void {
    this.openDialog(BookFormComponent, {
      isCreate: false,
      book: this.book(),
    })
  }

  public onDelete(): void {
    this.bookService.deleteBook(this.book())
  }

  public showDetails(): void {
    this.openDialog(BookDetailsComponent, {
      book: this.book(),
    })
  }

  openDialog<T, D>(component: ComponentType<T>, data: D): void {
    this.dialog.open(component, {
      maxWidth: '700px',
      width: '95vw',
      data,
    })
  }
}
