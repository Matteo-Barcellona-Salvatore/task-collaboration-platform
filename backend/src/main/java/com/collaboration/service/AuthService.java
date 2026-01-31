package com.collaboration.service;

import com.collaboration.dto.AuthResponse;
import com.collaboration.dto.LoginRequest;
import com.collaboration.dto.RegisterRequest;
import com.collaboration.model.User;
import com.collaboration.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public AuthResponse register(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // Plain text (NO ENCRYPTION)
        user.setFullName(request.getFullName());

        userRepository.save(user);

        // Return fake token
        String token = "fake-token-" + user.getUsername();

        return new AuthResponse(token, user.getUsername(), user.getEmail(), user.getFullName());
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Return fake token
        String token = "fake-token-" + user.getUsername();

        return new AuthResponse(token, user.getUsername(), user.getEmail(), user.getFullName());
    }
}