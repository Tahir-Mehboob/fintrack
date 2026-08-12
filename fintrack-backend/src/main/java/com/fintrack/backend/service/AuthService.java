package com.fintrack.backend.service;

import com.fintrack.backend.dto.LoginRequest;
import com.fintrack.backend.dto.RegisterRequest;

public interface AuthService {
    void register(RegisterRequest request);
    String login(LoginRequest request);
}