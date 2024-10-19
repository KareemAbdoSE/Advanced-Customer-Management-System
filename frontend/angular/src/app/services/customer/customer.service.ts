// Service handling customer-related operations

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerDTO } from '../../models/customer-dto';
import { environment } from '../../../environments/environment';
import { CustomerRegistrationRequest } from '../../models/customer-registration-request';
import { CustomerUpdateRequest } from '../../models/customer-update-request';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly customerUrl = `${environment.api.baseUrl}/${environment.api.customerUrl}`;

  constructor(private http: HttpClient) { }

  // Retrieves all customers
  findAll(): Observable<CustomerDTO[]> {
    return this.http.get<CustomerDTO[]>(this.customerUrl);
  }

  // Registers a new customer
  registerCustomer(customer: CustomerRegistrationRequest): Observable<void> {
    return this.http.post<void>(this.customerUrl, customer);
  }

  // Deletes a customer by ID
  deleteCustomer(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.customerUrl}/${id}`);
  }

  //Updates a customer by ID
  updateCustomer(id: number | undefined, customer: CustomerUpdateRequest): Observable<void> {
    return this.http.put<void>(`${this.customerUrl}/${id}`, customer);
  }
}
