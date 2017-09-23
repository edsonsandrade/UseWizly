
import { Component, Output, EventEmitter } from '@angular/core';

@Component( {
  selector: "deleteMark",
  template: `<i class="material-icons toggleDelete"
              (click)="toggleDelete($event)"
              [class.lightgray-text]="!markedForDelete"
              [class.red-text]="markedForDelete">done</i>`,
  styleUrls: ['./toggle.delete.css']
})

export class DeleteMark {

  private markedForDelete = false;

  @Output() clickDelete = new EventEmitter();

  toggleDelete(e: Event) {
    this.markedForDelete = ! this.markedForDelete;
    e.stopPropagation();
    this.clickDelete.emit(this.markedForDelete);
  }

}
