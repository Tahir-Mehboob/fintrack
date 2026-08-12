package com.fintrack.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CollectionId;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name="users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true,nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String fullName;

    @Enumerated(EnumType.STRING)
    private Role role = Role.User;

    @CreationTimestamp
    private LocalDateTime createAt;




}

