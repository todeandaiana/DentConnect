import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent{
  @Input() showPanel = false;
  @Input() datasource: any[];
  @Input() doctor: string;
  @Output() closeEmitter : EventEmitter<any> = new EventEmitter();

  displayReviews() {
   return this.datasource.filter(review => review.doctor === this.doctor)
  }

  closePanel() {
    this.closeEmitter.emit(false)
  }
}
