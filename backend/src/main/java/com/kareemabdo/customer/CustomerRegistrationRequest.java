package com.kareemabdo.customer;

// This record is used to capture customer registration data,
// containing the customer's name, email, password, age, and gender.

public record CustomerRegistrationRequest(
        String name,
        String email,
        String password,
        Integer age,
        Gender gender
) {
}