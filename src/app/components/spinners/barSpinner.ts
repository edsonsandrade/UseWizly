import { Component, Input} from "@angular/core";

@Component({
  selector: "barSpinner",
  template: `
      <div class="spinner" *ngIf="isLoading">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>`,
  styleUrls: ['./barSpinner.css']
})

export class BarSpinner {
  @Input('is-loading') isLoading =  true;
}
