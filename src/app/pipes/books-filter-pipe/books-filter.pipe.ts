import { Pipe, PipeTransform } from '@angular/core'

import { Book } from '../../types/global'


@Pipe({
  name: 'booksFilterPipe',
  standalone: true,
})
export class BooksFilterPipe implements PipeTransform {
  transform(items: Book[], searchText: string): Book[] {
    if (!items) {
      return []
    }

    if (!searchText) {
      return items
    }

    searchText = searchText.toLocaleLowerCase()

    return ['author', 'title'].map((key: string) => {
      return items.filter((item: Book) => {
        return (item[key as keyof Book] as string).toLocaleLowerCase().includes(searchText)
      })
    }).flat(2)
  }
}
