package com.kareemabdo.auth;

public record AuthenticationRequest(
        String username,
        String password
) {
    // This record holds the login credentials (username and password) in an immutable way
}
