package com.kareemabdo.auth;

import com.kareemabdo.customer.CustomerDTO;

public record AuthenticationResponse (
        String token,
        CustomerDTO customerDTO){
}