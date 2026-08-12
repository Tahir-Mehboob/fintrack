package com.fintrack.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;        // Food, Rent, Salary, Utilities, etc.

    @Enumerated(EnumType.STRING)
    private TransactionType type;  // INCOME or EXPENSE


}
