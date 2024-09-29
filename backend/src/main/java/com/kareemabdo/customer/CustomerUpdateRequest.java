package com.kareemabdo.customer;

// This record captures the customer update data, containing the customer's name, email, and age.

public record CustomerUpdateRequest(
        String name,
        String email,
        Integer age
) {
}