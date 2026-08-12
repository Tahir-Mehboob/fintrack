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

    /**
     * @ManyToOne tells Hibernate: "Many Transaction records can belong to ONE User."
     *
     * Think about it in real terms — one user (say, you) will have hundreds of transactions over time.
     * So the relationship from Transaction → User is many-to-one: many transactions point to a single user.
     *
     */
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    /**
     * @JoinColumn(name = "user_id") tells Hibernate:
     * "In the database, create a column called user_id in the transactions table,
     * and use it as a foreign key pointing to the users table's primary key."
     */
    @ManyToOne
    @JoinColumn(name="category_id")
    private Category category;

    private double amount;
    private String description;
    private LocalDate transactionDate;

    @Enumerated(EnumType.STRING)
    private TransactionType type;

    @CreationTimestamp
    private LocalDate createAt;

}
