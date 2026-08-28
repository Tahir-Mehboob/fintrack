package com.fintrack.backend.service;

import com.fintrack.backend.dto.TransactionRequestDTO;
import com.fintrack.backend.dto.TransactionResponseDTO;

import java.util.List;

public interface TransactionService {
    TransactionResponseDTO create(TransactionRequestDTO dto, String userEmail);
    List<TransactionResponseDTO> getByUser(String userEmail);
    void delete(Long id, String userEmail);
    TransactionResponseDTO update(Long id, TransactionRequestDTO dto, String userEmail);
}
