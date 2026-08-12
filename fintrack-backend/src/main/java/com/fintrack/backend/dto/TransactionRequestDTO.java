package com.fintrack.backend.dto;

import com.fintrack.backend.model.TransactionType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TransactionRequestDTO {
    @NotNull(message = "Category ID is required")
    private Long categoryId;

    @NotNull @Positive(message = "Amount must be positive")
    private Double amount;

    private String description;

    @NotNull(message = "Transaction date is required")
    private LocalDate transactionDate;

    @NotNull(message = "Type is required")
    private TransactionType type;
}
