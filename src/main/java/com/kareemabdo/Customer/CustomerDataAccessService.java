package com.kareemabdo.Customer;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class CustomerDataAccessService implements CustomerDao {

    private static List<Customer> customers;

    static {
        customers = new ArrayList<>();

        Customer alex = new Customer(1,
                "kareem",
                "kareemabdo@gmail.com",
                21);

        Customer alexa = new Customer(2,
                "kareem",
                "kareemabdo@gmail.com",
                22);
        customers.add(alex);
        customers.add(alexa);

    }

    @Override
    public List<Customer> selectAllCustomers() {
        return customers;
    }

    @Override
    public Optional<Customer> selectCustomerById(Integer id) {
        return customers.stream().filter(customers -> customers.getId().equals(id)).findFirst();
    }
}
