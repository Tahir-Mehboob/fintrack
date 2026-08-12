package com.fintrack.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BudgetResponseDTO {
    private Long id;
    private String categoryName;
    private Double monthlyLimit;
    private Integer month;
    private Integer year;

    /**
     * spentSoFar isn't a DB column — you'll calculate it in the service by summing related transactions.
     * This is a good detail to mention in interviews since it shows you're not just doing CRUD but actual business logic.
     */

    private Double spentSoFar; // calculated field — nice touch for interviews
}