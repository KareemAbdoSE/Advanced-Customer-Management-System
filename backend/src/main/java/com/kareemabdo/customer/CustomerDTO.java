package com.kareemabdo.customer;

import java.util.List;

// This record represents a Data Transfer Object (DTO) for Customer,
// encapsulating key customer details such as ID, name, email, gender, age, roles, and username.

public record CustomerDTO (
        Integer id,
        String name,
        String email,
        Gender gender,
        Integer age,
        List<String> roles,
        String username
){
}
