package com.fintrack.backend.mapper;

import com.fintrack.backend.dto.TransactionResponseDTO;
import com.fintrack.backend.model.Category;
import com.fintrack.backend.model.Transaction;
import com.fintrack.backend.model.User;
import org.springframework.stereotype.Component;

@Component
public class TransactionMapper {

    public Transaction toEntity(Double amount, String description,
                                java.time.LocalDate date,
                                com.fintrack.backend.model.TransactionType type,
                                User user, Category category) {
        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setDescription(description);
        transaction.setTransactionDate(date);
        transaction.setType(type);
        transaction.setUser(user);
        transaction.setCategory(category);
        return transaction;
    }

    public TransactionResponseDTO toResponseDTO(Transaction transaction) {
        return new TransactionResponseDTO(
                transaction.getId(),
                transaction.getCategory().getName(),
                transaction.getAmount(),
                transaction.getDescription(),
                transaction.getTransactionDate(),
                transaction.getType()
        );
    }
}
