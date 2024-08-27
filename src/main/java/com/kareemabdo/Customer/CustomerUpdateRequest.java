package com.kareemabdo.Customer;


public record CustomerUpdateRequest(
        String name,
        String email,
        Integer age
) {
}
