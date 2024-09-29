package com.kareemabdo.customer;

import java.util.List;
import java.util.Optional;

// This interface defines data access methods for performing CRUD operations on Customer entities.
// It includes methods for selecting, inserting, updating, and deleting customers,
// as well as checking existence by email or ID.

public interface CustomerDao {
    List<Customer> selectAllCustomers();
    Optional<Customer> selectCustomerById(Integer id);
    void insertCustomer(Customer customer);
    boolean existsCustomerWithEmail(String email);
    boolean existsCustomerById(Integer id);
    void deleteCustomerById(Integer customerId);
    void updateCustomer(Customer update);
    Optional<Customer> selectUserByEmail(String email);
}