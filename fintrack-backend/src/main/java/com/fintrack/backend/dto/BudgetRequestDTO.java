package com.fintrack.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class BudgetRequestDTO {
    @NotNull(message = "Category ID is required")
    private Long categoryId;

    @NotNull @Positive(message = "Monthly limit must be positive")
    private Double monthlyLimit;

    @NotNull @Min(1) @Max(12)
    private Integer month;

    @NotNull
    private Integer year;
}