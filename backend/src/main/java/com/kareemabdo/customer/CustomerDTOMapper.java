package com.kareemabdo.customer;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import java.util.function.Function;
import java.util.stream.Collectors;

// This service class implements a Function to map a Customer entity to a CustomerDTO.
// It converts customer details, including roles (authorities), into a DTO for data transfer.


@Service
public class CustomerDTOMapper implements Function<Customer, CustomerDTO> {
    @Override
    public CustomerDTO apply(Customer customer) {
        return new CustomerDTO(
                customer.getId(),
                customer.getName(),
                customer.getEmail(),
                customer.getGender(),
                customer.getAge(),
                customer.getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList()),
                customer.getUsername()
        );
    }
}