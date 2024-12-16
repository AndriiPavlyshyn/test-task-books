import { Component, inject, signal } from '@angular/core'
import { MatButton }                 from '@angular/material/button'
import { MatDialog }                 from '@angular/material/dialog'
import { ActivatedRoute }            from '@angular/router'
import { BookFormComponent }         from '@pages/home/components/book-form/book-form.component'


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButton,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public title = signal<string>('')
  private route = inject<ActivatedRoute>(ActivatedRoute)
  private dialog = inject(MatDialog)

  constructor() {
    this.title.set(this.route.snapshot.data['title'])
  }

  public onAdd(): void {
    this.dialog.open(BookFormComponent, {
      maxWidth: '700px',
      width: '100vw',
      data: {
        isCreate: true,
      },
    })
  }
}
