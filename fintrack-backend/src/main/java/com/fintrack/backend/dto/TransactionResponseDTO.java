package com.fintrack.backend.dto;

import com.fintrack.backend.model.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionResponseDTO {
    private Long id;
    private String categoryName;
    private Double amount;
    private String description;
    private LocalDate transactionDate;
    private TransactionType type;
}