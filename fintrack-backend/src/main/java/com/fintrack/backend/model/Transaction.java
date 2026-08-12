package com.fintrack.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

@Entity
@Data
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private double amount;
    private String description;
    private LocalDate transactionDate;

    @Enumerated(EnumType.STRING)
    private TransactionType type;

    @CreationTimestamp
    private LocalDate createAt;

}
