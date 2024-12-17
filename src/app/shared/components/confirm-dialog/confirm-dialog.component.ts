import { Component, inject } from '@angular/core'
import {
  MatButton,
}                            from '@angular/material/button'
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
}                            from '@angular/material/dialog'


interface ConfirmDialogData {
  title: string,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  action: Function
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  public readonly dialogData: ConfirmDialogData = inject(MAT_DIALOG_DATA)

  public confirmDeletion(): void {
    this.dialogData.action()
  }
}
