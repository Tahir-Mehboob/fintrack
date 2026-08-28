package com.fintrack.backend.service;

import com.fintrack.backend.dto.ChangePasswordRequest;
import com.fintrack.backend.dto.UpdateProfileRequest;
import com.fintrack.backend.dto.UserResponseDTO;

public interface UserService {
    UserResponseDTO getProfile(String email);
    UserResponseDTO updateProfile(String email, UpdateProfileRequest request);
    void changePassword(String email, ChangePasswordRequest request);
}
