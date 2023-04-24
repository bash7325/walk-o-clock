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
  `,
  styles: [`
    .modal-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .modal {
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    }
  `]
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
