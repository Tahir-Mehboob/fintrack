package com.fintrack.backend.service;

import com.fintrack.backend.dto.BudgetRequestDTO;
import com.fintrack.backend.dto.BudgetResponseDTO;
import com.fintrack.backend.exception.ResourceNotFoundException;
import com.fintrack.backend.mapper.BudgetMapper;
import com.fintrack.backend.model.Budget;
import com.fintrack.backend.model.Category;
import com.fintrack.backend.model.Transaction;
import com.fintrack.backend.model.User;
import com.fintrack.backend.repository.BudgetRepository;
import com.fintrack.backend.repository.CategoryRepository;
import com.fintrack.backend.repository.TransactionRepository;
import com.fintrack.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BudgetServiceImpl implements BudgetService {

    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final TransactionRepository transactionRepository;
    private final BudgetMapper budgetMapper;

    @Override
    public BudgetResponseDTO create(BudgetRequestDTO dto, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        Budget budget = budgetMapper.toEntity(dto.getMonthlyLimit(), dto.getMonth(), dto.getYear(), user, category);
        Budget saved = budgetRepository.save(budget);

        return budgetMapper.toResponseDTO(saved, 0.0);
    }

    @Override
    public List<BudgetResponseDTO> getByUserAndMonth(String userEmail, Integer month, Integer year) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Budget> budgets = budgetRepository.findByUserIdAndMonthAndYear(user.getId(), month, year);

        return budgets.stream()
                .map(budget -> {
                    LocalDate start = LocalDate.of(year, month, 1);
                    LocalDate end = start.withDayOfMonth(start.lengthOfMonth());

                    Double spent = transactionRepository
                            .findByUserIdAndCategoryId(user.getId(), budget.getCategory().getId())
                            .stream()
                            .filter(t -> !t.getTransactionDate().isBefore(start) && !t.getTransactionDate().isAfter(end))
                            .mapToDouble(Transaction::getAmount)
                            .sum();

                    return budgetMapper.toResponseDTO(budget, spent);
                })
                .collect(Collectors.toList());
    }
}
