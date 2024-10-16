// Component representing a customer card with options to update or delete

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomerDTO } from '../../models/customer-dto';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss']
})
export class CustomerCardComponent {
  @Input()
  customer: CustomerDTO = {};

  @Input()
  customerIndex = 0;

  @Output()
  delete: EventEmitter<CustomerDTO> = new EventEmitter<CustomerDTO>();

  // Generates customer image URL based on gender and index
  get customerImage(): string {
    const gender = this.customer.gender === 'MALE' ? 'men' : 'women';
    return `https://randomuser.me/api/portraits/${gender}/${this.customerIndex}.jpg`;
  }

  // Emits delete event
  onDelete() {
    this.delete.emit(this.customer);
  }
}
