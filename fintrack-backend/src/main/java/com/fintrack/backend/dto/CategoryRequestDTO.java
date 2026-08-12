package com.fintrack.backend.dto;

import com.fintrack.backend.model.TransactionType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CategoryRequestDTO {
    @NotBlank(message = "Category name is required")
    private String name;

    @NotNull(message = "Type is required")
    private TransactionType type;
}