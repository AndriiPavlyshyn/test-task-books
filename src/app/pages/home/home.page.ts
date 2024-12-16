import { Component }       from '@angular/core'
import { RouterOutlet }    from '@angular/router'
import { HeaderComponent } from '@shared/components/header/header.component'

import { BooksGridComponent } from './components/books-grid/books-grid.component'


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, BooksGridComponent, HeaderComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export default class HomePage {

}
