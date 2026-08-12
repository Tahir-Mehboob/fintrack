package com.fintrack.backend.mapper;

import com.fintrack.backend.dto.RegisterRequest;
import com.fintrack.backend.model.Role;
import com.fintrack.backend.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toEntity(RegisterRequest dto) {
        User user = new User();
        user.setFullName(dto.getFullName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword()); // will be hashed in service, not here
        user.setRole(Role.USER);
        return user;
    }
}
