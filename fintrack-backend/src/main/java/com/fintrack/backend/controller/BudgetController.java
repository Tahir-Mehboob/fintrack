package com.fintrack.backend.controller;

import com.fintrack.backend.dto.BudgetRequestDTO;
import com.fintrack.backend.dto.BudgetResponseDTO;
import com.fintrack.backend.service.BudgetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class BudgetController {

    private final BudgetService budgetService;

    @PostMapping
    public ResponseEntity<BudgetResponseDTO> create(
            @Valid @RequestBody BudgetRequestDTO dto,
            Authentication authentication) {
        String userEmail = authentication.getName();
        //String userEmail = "tahir@test.com"; // TEMPORARY - replace with authentication.getName() later
        BudgetResponseDTO created = budgetService.create(dto, userEmail);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<BudgetResponseDTO>> getByMonth(
            @RequestParam Integer month,
            @RequestParam Integer year,
            Authentication authentication) {
        String userEmail = authentication.getName();
        //String userEmail = "tahir@test.com"; // TEMPORARY - replace with authentication.getName() later
        return ResponseEntity.ok(budgetService.getByUserAndMonth(userEmail, month, year));
    }
    @PutMapping("/{id}")
    public ResponseEntity<BudgetResponseDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody BudgetRequestDTO dto,
            Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(budgetService.update(id, dto, userEmail));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, Authentication authentication) {
        String userEmail = authentication.getName();
        budgetService.delete(id, userEmail);
        return ResponseEntity.noContent().build();
    }
}