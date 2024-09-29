package com.kareemabdo.customer;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

// This interface extends JpaRepository to handle CRUD operations for Customer entities.
// It also provides custom methods to check if a customer exists by email or ID, and to find a customer by email.

public interface CustomerRepository
        extends JpaRepository<Customer, Integer> {
    boolean existsCustomerByEmail(String email);
    boolean existsCustomerById(Integer id);
    Optional<Customer> findCustomerByEmail(String email);
}