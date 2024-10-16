// Model for customer registration requests

export interface CustomerRegistrationRequest {
  name?: string;
  email?: string;
  password?: string;
  age?: number;
  gender?: 'MALE' | 'FEMALE';
}
