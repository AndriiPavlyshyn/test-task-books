import { AsyncPipe, JsonPipe, NgIf }         from '@angular/common'
import { Component, inject, signal }         from '@angular/core'
import { FormsModule }                       from '@angular/forms'
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field'
import { MatGridList, MatGridTile }          from '@angular/material/grid-list'
import { MatIcon }                           from '@angular/material/icon'
import { MatInput }                          from '@angular/material/input'
import { BookService }                       from '@services/book.service'
import { BehaviorSubject }                   from 'rxjs'

import { fadeInOut }              from '../../../../animations/fadeInOut'
import { listAnimation }          from '../../../../animations/listAnimation'
import { BooksFilterPipe }        from '../../../../pipes/books-filter-pipe/books-filter.pipe'
import { Book }                   from '../../../../types/book'
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
    AsyncPipe,
    BooksFilterPipe,
    NgIf,
  ],
  animations: [
    fadeInOut,
    listAnimation,
  ],
  templateUrl: './books-grid.component.html',
  styleUrl: './books-grid.component.scss',
})
export class BooksGridComponent {
  private readonly bookService: BookService = inject(BookService)

  public readonly books: BehaviorSubject<Book[]> = this.bookService.books
  public search = signal<string>('')
}
