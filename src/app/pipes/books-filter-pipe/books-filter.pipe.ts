import { Pipe, PipeTransform } from '@angular/core'

import { Book }  from '../../types/book'
import { Maybe } from '../../types/global'


@Pipe({
  name: 'booksFilter',
  standalone: true,
})
export class BooksFilterPipe implements PipeTransform {
  transform(items: Maybe<Book[]>, searchText: string): Book[] {
    if (!items) {
      return []
    }

    if (!searchText) {
      return items
    }

    searchText = searchText.toLocaleLowerCase()

    const searchableBooks = new Set<Book>(['author', 'title']
      .map((key: string) => {
        return items
          .filter((item: Book) => {
            return (item[key as keyof Book] as string)
              .toLocaleLowerCase()
              .includes(searchText)
          })
      }).flat(2))

    return [...searchableBooks]
  }
}
