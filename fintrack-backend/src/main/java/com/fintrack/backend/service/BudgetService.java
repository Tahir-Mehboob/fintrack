package com.fintrack.backend.service;

import com.fintrack.backend.dto.BudgetRequestDTO;
import com.fintrack.backend.dto.BudgetResponseDTO;

import java.util.List;

public interface BudgetService {
    BudgetResponseDTO create(BudgetRequestDTO dto, String userEmail);
    List<BudgetResponseDTO> getByUserAndMonth(String userEmail, Integer month, Integer year);
    BudgetResponseDTO update(Long id, BudgetRequestDTO dto, String userEmail);
    void delete(Long id, String userEmail);
}
