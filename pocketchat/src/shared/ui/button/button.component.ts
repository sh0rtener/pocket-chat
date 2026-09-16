import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class PrimaryButtonComponent {
  @Input() buttonType: 'button' | 'submit' | 'reset' = 'submit';
  @Input() type: 'primary' | 'warning' | 'alternative' | 'error' = 'primary';
  @Output() buttonClick = new EventEmitter<MouseEvent>();
}
