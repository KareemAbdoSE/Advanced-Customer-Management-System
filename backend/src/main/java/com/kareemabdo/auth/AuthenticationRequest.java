package com.kareemabdo.auth;

public record AuthenticationRequest(
        String username,
        String password
) {
}
