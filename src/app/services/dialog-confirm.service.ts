import {Component} from '@angular/core';
import {MdDialogRef, MdDialogContainer} from '@angular/material';


@Component({
  selector: 'dialogConfirm',
  templateUrl: 'dialogConfirm.html',
})

export class DialogConfirmService {
  constructor(public dialogRef: MdDialogRef<DialogConfirmService>) {}
}
