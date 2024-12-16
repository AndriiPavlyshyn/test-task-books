import { JsonPipe }                            from '@angular/common'
import { Component, computed, inject, signal } from '@angular/core'
import { FormsModule }                         from '@angular/forms'
import { MatFormField, MatLabel, MatPrefix }   from '@angular/material/form-field'
import { MatGridList, MatGridTile }            from '@angular/material/grid-list'
import { MatIcon }                             from '@angular/material/icon'
import { MatInput }                            from '@angular/material/input'
import { BookService }                         from '@services/book.service'
import { fadeInOut }                           from '../../../../animations/fadeInOut'
import { listAnimation }                       from '../../../../animations/listAnimation'

import { BooksGridItemComponent } from '../books-grid-item/books-grid-item.component'


@Component({
  selector: 'app-books-grid',
  standalone: true,
  imports: [
    BooksGridItemComponent,
    MatGridList,
    MatGridTile,
    JsonPipe,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    MatPrefix,
  ],
  animations: [
    fadeInOut,
    listAnimation,
  ],
  templateUrl: './books-grid.component.html',
  styleUrl: './books-grid.component.scss',
})
export class BooksGridComponent {
  public search = signal<string>('')
  filteredBooks = computed(() => {
    const searchTerm: string = this.search().toLowerCase()

    if (!searchTerm) {
      return this.books()
    }

    return this.books().filter((book) =>
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm),
    )
  })
  private bookService = inject(BookService)
  public books = this.bookService.books
}
