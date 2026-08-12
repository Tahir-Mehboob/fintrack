package com.fintrack.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

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
    private Role role = Role.USER;

    /**
     * The mappedBy = "user" tells Hibernate: "Don't create a new foreign key —
     * the user field inside Transaction already owns this relationship, just map back to it."
     */

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Transaction> transactions;

    @CreationTimestamp
    private LocalDateTime createAt;




}

