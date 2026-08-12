package com.fintrack.backend.repository;

import com.fintrack.backend.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUserId(Long userId);
    List<Transaction> findByUserIdAndTransactionDateBetween(Long userId, LocalDate start, LocalDate end);
    List<Transaction> findByUserIdAndCategoryId(Long userId, Long categoryId);
}
