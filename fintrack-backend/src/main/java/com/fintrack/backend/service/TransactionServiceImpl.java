package com.fintrack.backend.service;

import com.fintrack.backend.dto.TransactionRequestDTO;
import com.fintrack.backend.dto.TransactionResponseDTO;
import com.fintrack.backend.exception.ResourceNotFoundException;
import com.fintrack.backend.mapper.TransactionMapper;
import com.fintrack.backend.model.Category;
import com.fintrack.backend.model.Transaction;
import com.fintrack.backend.model.User;
import com.fintrack.backend.repository.CategoryRepository;
import com.fintrack.backend.repository.TransactionRepository;
import com.fintrack.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final TransactionMapper transactionMapper;

    @Override
    public TransactionResponseDTO create(TransactionRequestDTO dto, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        Transaction transaction = transactionMapper.toEntity(
                dto.getAmount(), dto.getDescription(), dto.getTransactionDate(),
                dto.getType(), user, category
        );

        Transaction saved = transactionRepository.save(transaction);
        return transactionMapper.toResponseDTO(saved);
    }

    @Override
    public List<TransactionResponseDTO> getByUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return transactionRepository.findByUserId(user.getId())
                .stream()
                .map(transactionMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id, String userEmail) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));

        if (!transaction.getUser().getEmail().equals(userEmail)) {
            throw new SecurityException("Not authorized to delete this transaction");
        }

        transactionRepository.deleteById(id);
    }
}
