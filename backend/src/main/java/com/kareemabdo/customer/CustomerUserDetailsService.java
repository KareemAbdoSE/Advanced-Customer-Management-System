package com.kareemabdo.customer;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// This service class implements UserDetailsService to load customer details by username (email).
// It throws a UsernameNotFoundException if the user is not found in the database.

@Service
public class CustomerUserDetailsService implements UserDetailsService {

    private final CustomerDao customerDao;

    public CustomerUserDetailsService(@Qualifier("jpa") CustomerDao customerDao) {
        this.customerDao = customerDao;
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        return customerDao.selectUserByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Username " + username + " not found"));
    }
}