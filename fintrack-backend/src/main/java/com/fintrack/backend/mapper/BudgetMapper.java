package com.fintrack.backend.mapper;

import com.fintrack.backend.dto.BudgetResponseDTO;
import com.fintrack.backend.model.Budget;
import com.fintrack.backend.model.Category;
import com.fintrack.backend.model.User;
import org.springframework.stereotype.Component;

@Component
public class BudgetMapper {

    public Budget toEntity(Double monthlyLimit, Integer month, Integer year,
                           User user, Category category) {
        Budget budget = new Budget();
        budget.setMonthlyLimit(monthlyLimit);
        budget.setMonth(month);
        budget.setYear(year);
        budget.setUser(user);
        budget.setCategory(category);
        return budget;
    }

    public BudgetResponseDTO toResponseDTO(Budget budget, Double spentSoFar) {
        return new BudgetResponseDTO(
                budget.getId(),
                budget.getCategory().getName(),
                budget.getMonthlyLimit(),
                budget.getMonth(),
                budget.getYear(),
                spentSoFar
        );
    }
}
