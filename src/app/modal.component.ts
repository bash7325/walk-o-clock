import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-alert-modal',
  template: `
    <div class="modal-wrapper" [hidden]="!show">
      <div class="modal">
        <h2>{{ title }}</h2>
        <p>{{ message }}</p>
        <button class="nes-btn is-error" (click)="hideModal()">Close</button>
      </div>
    </div>
  `
})
export class AlertModalComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() show!: boolean;
  @Output() close = new EventEmitter();

  hideModal() {
    this.close.emit();
  }
}
