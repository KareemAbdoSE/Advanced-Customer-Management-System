package com.kareemabdo.auth;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // Marks this class as a REST controller
@RequestMapping("api/v1/auth") // Base URL for authentication endpoints
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    // Constructor injection for AuthenticationService
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("login") // Handles POST requests for login at /api/v1/auth/login
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest request) {
        // Calls the service layer to handle login logic
        AuthenticationResponse response = authenticationService.login(request);
        // Returns a response with the auth token in the headers and response body
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, response.token())
                .body(response);
    }
}
