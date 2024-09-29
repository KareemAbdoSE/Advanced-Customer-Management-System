package com.kareemabdo.auth;

import com.kareemabdo.customer.Customer;
import com.kareemabdo.customer.CustomerDTO;
import com.kareemabdo.customer.CustomerDTOMapper;
import com.kareemabdo.jwt.JWTUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service // Marks this class as a Spring service
public class AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final CustomerDTOMapper customerDTOMapper;
    private final JWTUtil jwtUtil;

    // Constructor injection for dependencies
    public AuthenticationService(AuthenticationManager authenticationManager,
                                 CustomerDTOMapper customerDTOMapper,
                                 JWTUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.customerDTOMapper = customerDTOMapper;
        this.jwtUtil = jwtUtil;
    }

    // Handles the login logic
    public AuthenticationResponse login(AuthenticationRequest request) {
        // Authenticates the user using the provided credentials
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(),
                        request.password()
                )
        );
        // Retrieves the authenticated customer and maps it to a DTO
        Customer principal = (Customer) authentication.getPrincipal();
        CustomerDTO customerDTO = customerDTOMapper.apply(principal);
        // Issues a JWT token for the authenticated user
        String token = jwtUtil.issueToken(customerDTO.username(), customerDTO.roles());
        // Returns the token and customer details
        return new AuthenticationResponse(token, customerDTO);
    }
}

